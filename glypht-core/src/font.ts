import createHarfbuzz, {
    type MainModule,
    type HbBlob,
    type HbSet,
    SubsetSets,
    OtNameId,
    tagName,
    hbTag,
} from './hb-wrapper.js';
import {
    AxisInfo,
    FeatureInfo,
    NamedInstance,
    SfntVersion,
    StyleValue,
    StyleValues,
    SubsetAxisInfo,
    SubsetInfo,
    SubsetSettings,
    SubsettedFont,
} from './font-types';
import {SUBSET_NAMES, subsetRanges, SubsetName} from './generated/subset-ranges';
import bytesToHex from './util/bytes-to-hex';

let hb!: MainModule;

export const init = async(wasmUrl: string) => {
    hb = await createHarfbuzz(wasmUrl);
    for (const name of SUBSET_NAMES) {
        const set = new hb.HbSet();
        for (const range of subsetRanges(name)) {
            if (typeof range === 'number') {
                set.add(range);
            } else {
                set.addRange(range[0], range[1]);
            }
        }
        SUBSET_HB_SETS[name as SubsetName] = set;
    }

    const subsetInput = hb._hb_subset_input_create_or_fail();
    if (subsetInput === 0) {
        throw new Error('Failed to create subset input');
    }

    const defaultLayoutFeatures = new hb.HbSet(
        hb._hb_subset_input_set(subsetInput, SubsetSets.LAYOUT_FEATURE_TAG));
    defaultLayoutFeatures.reference();
    for (const featureTag of defaultLayoutFeatures) {
        defaultLayoutFeatureTags.add(tagName(featureTag));
    }
    hb._hb_subset_input_destroy(subsetInput);
};

const decoder = new TextDecoder();

/** Mapping of Google Fonts subset names to their sets of code point ranges. */
const SUBSET_HB_SETS: Record<SubsetName, HbSet> = {} as Record<SubsetName, HbSet>;

const defaultLayoutFeatureTags = new Set<string>();

export class Font {
    private hbFace: number;
    private hbFont: number;
    private preprocessedFace: number = 0;

    public readonly faceCount: number;
    public readonly faceIndex: number;
    public readonly uid: string;
    public readonly familyName: string;
    public readonly subfamilyName: string;
    public readonly styleValues: StyleValues;
    public readonly fileSize: number;
    /** Variable font axes. Does not include variable axes listed in {@link styleValues}. */
    public readonly axes: AxisInfo[];
    public readonly features: FeatureInfo[];
    public readonly namedInstances: NamedInstance[];
    /**
     * Names of Unicode subsets for which this font has *any* coverage (it does not need to cover the entire subset).
     */
    public readonly subsetCoverage: SubsetInfo[];
    /**
     * All the Unicode code points contained in the font.
     */
    public readonly codePoints: HbSet;

    static manyFromData(data: Uint8Array[]) {
        const bufs = [];
        for (const arr of data) {
            const blob = new hb.HbBlob(arr);
            const faceCount = hb._hb_face_count(blob.ptr());
            bufs.push({blob, faceCount});
        }

        const fonts = [];
        try {
            for (const {blob, faceCount} of bufs) {
                for (let i = 0; i < faceCount; i++) {
                    fonts.push(new Font(blob, i, faceCount));
                }
            }
        } catch (err) {
            for (;;) {
                const font = fonts.pop();
                if (!font) break;
                font.destroy();
            }
            throw err;
        } finally {
            // The font faces reference the blobs themselves. We don't need to hold onto them.
            for (const {blob} of bufs) {
                blob.destroy();
            }
        }
        return fonts;
    }

    constructor(data: HbBlob, index: number, faceCount: number) {
        const face = hb._hb_face_create_or_fail(data.ptr(), index);
        if (face === 0) {
            throw new Error('Failed to create hb_face_t');
        }

        this.hbFace = face;
        this.hbFont = hb._hb_font_create(face);
        this.fileSize = data.length();
        this.faceIndex = index;
        this.faceCount = faceCount;

        let uid = this.getOpentypeName(OtNameId.UNIQUE_ID);
        if (!uid || uid === '') {
            // If the UID is absent for every font in a .ttc, this will hash the entire .ttc over and over. However,
            // fonts without a UID and .ttc files are both quite rare.
            uid = hb.withStack(() => {
                const output = hb.stackAlloc(32);
                hb._blake3_hash_data(data.ptr(), data.length(), output, index);
                return bytesToHex(hb.HEAPU8.subarray(output, output + 32));
            });
        }
        this.uid = uid;

        // Use family names in this order:
        // 1. WWS family name. "WWS" stands for "weight, width, slope", and the WWS family name excludes only those
        //    attributes. This is what we want when exporting, since we will add those back to the filename ourselves.
        // 2. Typographic family name. The "modern" version of the family name field. Unlike the WWS family name, it
        //    excludes all qualifiers. The OT spec gives the example of "Minion Pro Caption" and "Minion Pro Display";
        //    their WWS family names would *include* "Caption" and "Display", but their typographic family names would
        //    both be "Minion Pro". We can expect this fallback to be present often, as most fonts won't include non-WWS
        //    qualifiers in their names.
        // 3. Family name. Legacy and only useful in families with 4 styles (regular, bold, italic, both) or fewer.
        this.familyName = this.getOpentypeName(OtNameId.WWS_FAMILY) ||
            this.getOpentypeName(OtNameId.TYPOGRAPHIC_FAMILY) ||
            this.getOpentypeName(OtNameId.FONT_FAMILY) ||
            '';
        this.subfamilyName = this.getOpentypeName(OtNameId.WWS_SUBFAMILY) ||
            this.getOpentypeName(OtNameId.TYPOGRAPHIC_SUBFAMILY) ||
            this.getOpentypeName(OtNameId.FONT_SUBFAMILY) ||
            '';

        const {styleValues, axisInfo, namedInstances} = this.getAxisAndStyleInfo();
        this.axes = axisInfo;
        this.styleValues = styleValues;
        this.namedInstances = namedInstances;

        const featureInfo: FeatureInfo[] = [];
        const seenTags = new Set();
        const featureSet = new hb.HbSet();
        for (const tableTag of [hbTag('GPOS'), hbTag('GSUB')]) {
            featureSet.clear();

            hb._hb_ot_layout_collect_features(
                face,
                tableTag,
                0,
                0,
                0,
                featureSet.ptr(),
            );

            for (const featureIndex of featureSet) {
                hb.withStack(() => {
                    const featureCountPtr = hb.stackAlloc(4);
                    const featureTagsPtr = hb.stackAlloc(4);
                    hb.writeUint32(featureCountPtr, 1);
                    hb._hb_ot_layout_table_get_feature_tags(
                        face,
                        tableTag,
                        featureIndex,
                        featureCountPtr,
                        featureTagsPtr,
                    );
                    const featureTag = hb.readUint32(featureTagsPtr);

                    // The same feature tag can appear multiple times in different scripts.
                    if (seenTags.has(featureTag)) return;
                    seenTags.add(featureTag);

                    const labelIdPtr = featureCountPtr;
                    hb._hb_ot_layout_feature_get_name_ids(
                        face,
                        tableTag,
                        featureIndex,
                        labelIdPtr,
                        0,
                        0,
                        0,
                        0,
                    );
                    const labelId = hb.readUint32(labelIdPtr);
                    const featureLabel = this.getOpentypeName(labelId);
                    const featureTagName = tagName(featureTag);

                    featureInfo.push({
                        tag: featureTagName,
                        label: featureLabel,
                        keepByDefault: defaultLayoutFeatureTags.has(featureTagName),
                    });
                });
            }
        }

        this.features = featureInfo;

        // Calculate named subsets that the font counts as supporting. Based on googlefonts/nam-files' SubsetsInFont:
        // https://github.com/googlefonts/nam-files/blob/4df3b183d43682d28ec83232f20f7d56c81362d4/Lib/gfsubsets/__init__.py#L172
        const subsetCoverage: SubsetInfo[] = [];
        const coverageSet = featureSet;
        const faceCodepoints = new hb.HbSet();
        hb._hb_face_collect_unicodes(face, faceCodepoints.ptr());
        for (const subsetName of SUBSET_NAMES) {
            const subsetSet = SUBSET_HB_SETS[subsetName];
            coverageSet.setTo(faceCodepoints);

            // These characters are in many fonts and should not count towards subsets.
            // https://github.com/googlefonts/nam-files/issues/14#issuecomment-2076693612
            for (const codepoint of [0x0000, 0x000D, 0x0020, 0x00A0]) {
                coverageSet.del(codepoint);
            }

            coverageSet.intersect(subsetSet);

            let subsetCodepoints = coverageSet.size();
            // Khmer includes latin but we only want to report support for non-Latin.
            if (subsetName === 'khmer') {
                subsetCodepoints -= SUBSET_HB_SETS.latin.size();
            }

            const coverage = subsetCodepoints / subsetSet.size();
            // Thersholds determined experimentally
            const THRESHOLD = 0.5;
            const EXT_THRESHOLD = 0.05;
            subsetCoverage.push({
                name: subsetName,
                coverage,
                covered: coverage > (subsetName.endsWith('-ext') ? EXT_THRESHOLD : THRESHOLD),
            });
        }

        this.subsetCoverage = subsetCoverage;
        this.codePoints = faceCodepoints;

        // TODO: this shouldn't introduce any weird crashes but just make sure
        coverageSet.destroy();
    }

    private getAxisAndStyleInfo() {
        const face = this.hbFace;
        const styleValues: Partial<StyleValues> = {};

        return hb.withStack(() => {
            const numAxisInfos = hb._hb_ot_var_get_axis_count(face);
            const axisInfoSize = 32;
            const axisInfo: AxisInfo[] = [];
            const axisTags: string[] = [];
            const axisInfosRaw = hb.malloc(numAxisInfos * axisInfoSize);
            try {
                const numToFetch = hb.stackAlloc(4);
                hb.writeUint32(numToFetch, numAxisInfos);
                hb._hb_ot_var_get_axis_infos(face, 0, numToFetch, axisInfosRaw);
                for (let i = axisInfosRaw; i < axisInfosRaw + (axisInfoSize * numAxisInfos); i += 32) {
                    const tag = tagName(hb.readUint32(i + 4));
                    const nameId = hb.readUint32(i + 8);
                    const min = hb.readFloat32(i + 16);
                    const defaultValue = hb.readFloat32(i + 20);
                    const max = hb.readFloat32(i + 24);

                    switch (tag) {
                        case 'wght': {
                            styleValues.weight = {type: 'variable', value: {min, defaultValue, max}};
                            break;
                        }
                        case 'wdth': {
                            styleValues.width = {type: 'variable', value: {min, defaultValue, max}};
                            break;
                        }
                        case 'ital': {
                            styleValues.italic = {type: 'variable', value: {min, defaultValue, max}};
                            break;
                        }
                        case 'slnt': {
                            styleValues.slant = {type: 'variable', value: {min, defaultValue, max}};
                            break;
                        }

                        default: {
                            const name = this.getOpentypeName(nameId);
                            axisInfo.push({
                                tag,
                                name,
                                min,
                                defaultValue,
                                max,
                            });
                        }
                    }

                    axisTags.push(tag);
                }

                // hb_style_get_value always returns a single value, even if the given style axis is variable. Set the
                // style values from variation axes if they exist, and only fall back to the hb-style API if they don't.
                if (!Object.prototype.hasOwnProperty.call(styleValues, 'weight')) {
                    styleValues.weight = {
                        type: 'single',
                        value: hb._hb_style_get_value(this.hbFont, hbTag('wght')),
                    };
                }
                if (!Object.prototype.hasOwnProperty.call(styleValues, 'width')) {
                    styleValues.width = {
                        type: 'single',
                        value: hb._hb_style_get_value(this.hbFont, hbTag('wdth')),
                    };
                }
                if (!Object.prototype.hasOwnProperty.call(styleValues, 'italic')) {
                    styleValues.italic = {
                        type: 'single',
                        value: hb._hb_style_get_value(this.hbFont, hbTag('ital')),
                    };
                }
                if (!Object.prototype.hasOwnProperty.call(styleValues, 'slant')) {
                    styleValues.slant = {
                        type: 'single',
                        value: hb._hb_style_get_value(this.hbFont, hbTag('slnt')),
                    };
                }
            } finally {
                hb._free(axisInfosRaw);
            }

            const numNamedInstances = hb._hb_ot_var_get_named_instance_count(face);
            const namedInstances: NamedInstance[] = [];
            const coordsPtr = hb.malloc(4 * numAxisInfos);
            try {
                for (let i = 0; i < numNamedInstances; i++) {
                    const subfamilyNameId = hb._hb_ot_var_named_instance_get_subfamily_name_id(face, i);
                    const postscriptNameId = hb._hb_ot_var_named_instance_get_postscript_name_id(face, i);
                    const subfamilyName = this.getOpentypeName(subfamilyNameId);
                    const postscriptName = this.getOpentypeName(postscriptNameId);
                    hb.withStack(() => {
                        const numCoordsPtr = hb.stackAlloc(4);
                        hb.writeUint32(numCoordsPtr, numAxisInfos);
                        hb._hb_ot_var_named_instance_get_design_coords(face, i, numCoordsPtr, coordsPtr);
                        const numCoords = hb.readUint32(numCoordsPtr);

                        const coords: Partial<Record<string, number>> = {};
                        for (let i = 0; i < numCoords; i++) {
                            const value = hb.readFloat32(coordsPtr + (i << 2));
                            coords[axisTags[i]] = value;
                        }


                        namedInstances.push({
                            subfamilyName,
                            postscriptName,
                            coords,
                        });
                    });
                }
            } finally {
                hb._free(coordsPtr);
            }

            return {
                styleValues: styleValues as StyleValues,
                axisInfo,
                namedInstances,
            };
        });
    }

    /**
     * Fetch a name string from an OpenType font by ID.
     * @param id The ID of the name to fetch. Can be `HB_OT_NAME_ID_INVALID`.
     * @returns The name string, or null if it doesn't exist or is `HB_OT_NAME_ID_INVALID`.
     */
    private getOpentypeName(id: number) {
        if (id === OtNameId.INVALID as number) {
            return null;
        }

        const face = this.hbFace;

        return hb.withStack(() => {
            // First call to `hb_ot_name_get_utf8` just tells us how much to allocate
            const nameSizePtr = hb.stackAlloc(4);
            const dummyNamePtr = hb.stackAlloc(1);
            hb.writeUint32(nameSizePtr, 1);
            let nameSize = hb._hb_ot_name_get_utf8(face, id, 0, nameSizePtr, dummyNamePtr);
            if (nameSize === 0) {
                return null;
            }
            const namePtr = hb.malloc(nameSize + 1);
            try {
                hb.writeUint32(nameSizePtr, nameSize + 1);
                hb._hb_ot_name_get_utf8(face, id, 0, nameSizePtr, namePtr);
                nameSize = hb.readUint32(nameSizePtr);
                const fontFamilyName = decoder.decode(hb.HEAPU8.subarray(namePtr, namePtr + nameSize));
                return fontFamilyName;
            } finally {
                hb._free(namePtr);
            }
        });
    }

    destroy() {
        if (this.preprocessedFace !== 0) hb._hb_face_destroy(this.preprocessedFace);
        hb._hb_font_destroy(this.hbFont);
        // This also unreferences the blob
        hb._hb_face_destroy(this.hbFace);
        this.codePoints.destroy();
    }

    subset(settings: SubsetSettings): SubsettedFont {
        const subsetInput = hb._hb_subset_input_create_or_fail();
        if (subsetInput === 0) {
            throw new Error('Failed to create subset input');
        }

        let inputFace: number;
        if (settings.preprocess) {
            if (this.preprocessedFace === 0) {
                this.preprocessedFace = hb._hb_subset_preprocess(this.hbFace);
            }
            inputFace = this.preprocessedFace;
        } else {
            inputFace = this.hbFace;
        }

        try {
            const unicodeSet = new hb.HbSet(hb._hb_subset_input_unicode_set(subsetInput));
            unicodeSet.clear();

            if (settings.unicodeRanges === 'all') {
                unicodeSet.invert();
            } else {
                for (const namedSubset of settings.unicodeRanges.named) {
                    unicodeSet.union(SUBSET_HB_SETS[namedSubset]);
                }

                for (const rangeOrSingle of settings.unicodeRanges.custom) {
                    if (typeof rangeOrSingle === 'number') {
                        unicodeSet.add(rangeOrSingle);
                    } else {
                        unicodeSet.addRange(rangeOrSingle[0], rangeOrSingle[1]);
                    }
                }
            }

            const featuresSet = new hb.HbSet(
                hb._hb_subset_input_set(subsetInput, SubsetSets.LAYOUT_FEATURE_TAG),
            );
            for (const [featureTag, enable] of Object.entries(settings.features)) {
                if (enable) {
                    featuresSet.add(hbTag(featureTag));
                } else {
                    featuresSet.del(hbTag(featureTag));
                }
            }

            for (const axisSetting of settings.axisValues) {
                switch (axisSetting.type) {
                    case 'single': {
                        hb._hb_subset_input_pin_axis_location(
                            subsetInput,
                            inputFace,
                            hbTag(axisSetting.tag),
                            axisSetting.value,
                        );
                        break;
                    }
                    case 'variable' : {
                        hb._hb_subset_input_set_axis_range(
                            subsetInput,
                            inputFace,
                            hbTag(axisSetting.tag),
                            axisSetting.value.min,
                            axisSetting.value.max,
                            axisSetting.value.defaultValue ?? NaN,
                        );
                    }
                }
            }

            const subsetFace = hb._hb_subset_or_fail(inputFace, subsetInput);
            if (subsetFace === 0) {
                throw new Error(`Failed to subset ${this.familyName} ${this.subfamilyName}`);
            }
            const faceBlob = hb._hb_face_reference_blob(subsetFace);
            // Now that we have the blob, we don't need the face
            hb._hb_face_destroy(subsetFace);
            const faceBlobObject = new hb.HbBlob(faceBlob);
            const data = faceBlobObject.copyAsArray();
            faceBlobObject.destroy();

            const styleValues = {
                weight: settings.axisValues.find(v => v.tag === 'wght') ??
                    this.styleValues.weight,
                width: settings.axisValues.find(v => v.tag === 'wdth') ??
                    this.styleValues.width,
                italic: settings.axisValues.find(v => v.tag === 'ital') ??
                    this.styleValues.italic,
                slant: settings.axisValues.find(v => v.tag === 'slnt') ??
                    this.styleValues.slant,
            };
            for (const styleKey of ['weight', 'width', 'italic', 'slant'] as const) {
                const styleValue = styleValues[styleKey];
                if (styleValue.type === 'variable' && !styleValue.value.defaultValue) {
                    styleValues[styleKey] = {
                        type: 'variable',
                        value: {
                            min: styleValue.value.min,
                            max: styleValue.value.max,
                            defaultValue: (
                                this.styleValues[styleKey] as Extract<StyleValue, {type: 'variable'}>)
                                .value.defaultValue,
                        },
                    };
                }
            }

            const axes: SubsetAxisInfo[] = [];
            for (const axis of this.axes) {
                const axisSetting = settings.axisValues.find(v => v.tag === axis.tag);
                if (!axisSetting) continue;
                if (axisSetting.type === 'variable') {
                    axes.push({
                        tag: axis.tag,
                        name: axis.name,
                        type: 'variable',
                        value: {
                            min: axisSetting.value.min,
                            max: axisSetting.value.max,
                            defaultValue: axisSetting.value.defaultValue ?? axis.defaultValue,
                        },
                    });
                } else {
                    axes.push({
                        tag: axis.tag,
                        name: axis.name,
                        type: 'single',
                        value: axisSetting.value,
                    });
                }
            }

            // Check if the pinned axis settings correspond to any named instance
            let subsetNamedInstance = null;
            if (this.namedInstances) {
                // Convert axis settings (array) to variation coords (map of tag -> value)
                const variationCoords: Partial<Record<string, number>> = {};
                for (const axisSetting of settings.axisValues) {
                    if (axisSetting.type === 'single') {
                        variationCoords[axisSetting.tag] = axisSetting.value;
                    }
                }

                outer:
                for (const namedInstance of this.namedInstances) {
                    for (const [tag, value] of Object.entries(namedInstance.coords)) {
                        // If the subset settings do not pin the axis to a single value, it will be undefined and not
                        // match
                        if (variationCoords[tag] !== value) {
                            continue outer;
                        }
                    }

                    // All variation coords exist and match
                    subsetNamedInstance = namedInstance;
                    break;
                }
            }

            const subsetCodepoints = new hb.HbSet();
            subsetCodepoints.setTo(this.codePoints);
            subsetCodepoints.intersect(unicodeSet);
            const unicodeRanges = Array.from(subsetCodepoints.iterRanges());
            subsetCodepoints.destroy();

            const tag = data[3] | (data[2] << 8) | (data[1] << 16) | (data[0] << 24);

            return {
                familyName: this.familyName,
                subfamilyName: this.subfamilyName,
                format: tag === hbTag('OTTO') ? 'opentype' : 'truetype',
                data,
                styleValues: styleValues as StyleValues,
                axes,
                namedInstance: subsetNamedInstance,
                unicodeRanges,
            };
        } finally {
            hb._hb_subset_input_destroy(subsetInput);
        }
    }

    /**
     * Get the TTF data for this font. This is a copy of the data, not a reference to the original. If this is part of a
     * TTC, this will create a new TTF file containing only this face from it. This returns a new Uint8Array every time,
     * so the result can be transferred.
     */
    getData() {
        // This face is part of a .ttc file. Just fetching the blob directly would return the entire collection.
        if (this.faceCount > 1) {
            const builderFace = hb._hb_face_builder_create();
            const referencedTables: number[] = [];

            try {
                // Create a new face with just the tables from this specific face
                hb.withStack(() => {
                    const tableCountPtr = hb.stackAlloc(4);
                    const tableCount = hb._hb_face_get_table_tags(this.hbFace, 0, 0, 0);

                    if (tableCount === 0) throw new Error('Could not get font table count');
                    const tableTags = hb.malloc(tableCount * 4);
                    hb.writeUint32(tableCountPtr, tableCount);
                    hb._hb_face_get_table_tags(this.hbFace, 0, tableCountPtr, tableTags);
                    const fetchedTableCount = hb.readUint32(tableCountPtr);

                    for (let i = 0; i < fetchedTableCount; i++) {
                        const tag = hb.readUint32(tableTags + (i * 4));
                        const tableBlob = hb._hb_face_reference_table(this.hbFace, tag);
                        referencedTables.push(tableBlob);
                        if (!hb._hb_face_builder_add_table(builderFace, tag, tableBlob)) {
                            throw new Error(`Could not add table ${tagName(tag)}`);
                        }
                    }
                });

                const faceBlob = hb._hb_face_reference_blob(builderFace);
                const blob = new hb.HbBlob(faceBlob);
                try {
                    const data = blob.copyAsArray();
                    return data;
                } finally {
                    blob.destroy();
                }
            } finally {
                for (const blob of referencedTables) {
                    hb._hb_blob_destroy(blob);
                }
                hb._hb_face_destroy(builderFace);
            }
        }

        const faceBlob = hb._hb_face_reference_blob(this.hbFace);
        const blob = new hb.HbBlob(faceBlob);
        try {
            const data = blob.copyAsArray();
            return data;
        } finally {
            blob.destroy();
        }
    }

    static getSfntVersion(data: Uint8Array): SfntVersion {
        const tag = data[3] | (data[2] << 8) | (data[1] << 16) | (data[0] << 24);
        return tag === hbTag('OTTO') ? 'opentype' : 'truetype';
    }
}
