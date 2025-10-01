import {
    AxisValueFlags,
    AxisValueFormat,
    AxisValueMultiple,
    type AxisInfo,
    type FeatureInfo,
    type FontRef,
    type StyleKey,
    type StyleValue,
    type StyleValues,
    type SubsetAxisInfo,
    type SubsetName,
    type SubsettedFont,
    type WoffCompressionContext,
} from '@glypht/core';

import CSSEmitter, {CSSOutput} from './css';
import {formatUnicodeRanges, parseUnicodeRanges} from './unicode-ranges';

export type * from './css';
export {NodeType} from './css';
export {formatUnicodeRanges, parseUnicodeRanges, parseRanges} from './unicode-ranges';
export {FeatureMetadata, featureMetadata} from './feature-metadata';

/**
 * Information about a font family. Style values are split between those that are consistent within the family and those
 * that vary between fonts. Variation axes, feature tags, and character subsets are unified from all fonts in the
 * family.
 */
export type FamilyInfo = {
    /** Family name, shared amongst all fonts contained within. */
    name: string;
    fonts: {
        font: FontRef;
        /**
         * The font's unique style values--those that are specific to the font but not the family. For instance, a font
         * family with variable weight but separate upright and italic faces would have just the italic and slant style
         * values here.
         */
        styleValues: Partial<StyleValues>;
    }[];
    /**
     * Style values shared among all fonts in the family.
     */
    styleValues: Partial<StyleValues>;
    /**
     * If this family has named instances, this contains every axis' instance values across all fonts in the family.
     */
    axisInstanceValues: Partial<Record<string, number[]>>;
    /**
     * Variation axes for all fonts in the family. Does not include weight, width, italic, or slant.
     */
    axes: AxisInfo[];
    /**
     * Feature tags for all fonts in the family.
     */
    features: FeatureInfo[];
    /**
     * Named subsets for which any fonts in the family have coverage.
     */
    namedSubsets: SubsetName[];
};

const styleValuesEqual = (a: StyleValue, b: StyleValue) => {
    if (a.type === 'single' && b.type === 'single') {
        return a.value === b.value;
    }
    if (a.type === 'variable' && b.type === 'variable') {
        return a.value.min === b.value.min &&
            a.value.max === b.value.max &&
            a.value.defaultValue === b.value.defaultValue;
    }
    return false;
};

/**
 * Given a list of fonts, sort them into families by name, unifying feature tags and shared style values and axes. Fonts
 * within each family will be sorted by style values.
 * @param fonts All input fonts.
 * @returns Font families.
 */
export const sortFontsIntoFamilies = (fonts: FontRef[]): FamilyInfo[] => {
    const families: Record<string, FontRef[]> = {};
    for (const font of fonts) {
        if (!Object.prototype.hasOwnProperty.call(families, font.familyName)) {
            families[font.familyName] = [font];
        } else {
            families[font.familyName].push(font);
        }
    }

    const axisUnion = (a: AxisInfo, b: AxisInfo) => {
        if (a.tag !== b.tag) {
            throw new Error(`Tried to union two different axes (${a.tag}, ${b.tag})`);
        }

        return {
            tag: a.tag,
            name: a.name ?? b.name,
            min: Math.min(a.min, b.min),
            defaultValue: a.defaultValue,
            max: Math.max(a.max, b.max),
        };
    };

    const familySettings: FamilyInfo[] = [];
    for (const [familyName, fonts] of Object.entries(families)) {
        const processedFonts: {font: FontRef; uniqueStyleValues: Partial<Record<string, StyleValue>>}[] = [];
        let sharedStyleValues: Partial<Record<StyleKey, StyleValue>> | null = null;
        const axisInstanceValues = new Map<string, Set<number>>();
        const axes: Map<string, AxisInfo> = new Map();
        const namedSubsets: Set<SubsetName> = new Set();
        const namedFeatures: Map<string, FeatureInfo> = new Map();
        // Separate the style values shared among fonts with those that differ among fonts
        for (const font of fonts) {
            const uniqueStyleValues: Partial<Record<string, StyleValue>> = {};
            if (sharedStyleValues === null) {
                sharedStyleValues = Object.assign({}, font.styleValues);
            } else {
                for (const styleName of ['weight', 'width', 'italic', 'slant'] as const) {
                    if (Object.prototype.hasOwnProperty.call(sharedStyleValues, styleName)) {
                        // First time we encountered a different style value. Copy it into all the already-processed
                        // fonts' unique style values and remove it from the shared style values.
                        if (!styleValuesEqual(sharedStyleValues[styleName]!, font.styleValues[styleName])) {
                            for (const processedFont of processedFonts) {
                                processedFont.uniqueStyleValues[styleName] = sharedStyleValues[styleName];
                            }
                            delete sharedStyleValues[styleName];
                            uniqueStyleValues[styleName] = font.styleValues[styleName];
                        }
                    } else {
                        uniqueStyleValues[styleName] = font.styleValues[styleName];
                    }
                }
            }

            processedFonts.push({font, uniqueStyleValues});

            for (const axis of font.axes) {
                const existingAxis = axes.get(axis.tag);
                if (existingAxis) {
                    axes.set(axis.tag, axisUnion(axis, existingAxis));
                } else {
                    // We will add a property to this later, so make sure not to modify the original
                    axes.set(axis.tag, Object.assign({}, axis));
                }
            }

            for (const coverage of font.subsetCoverage) {
                if (coverage.covered) {
                    namedSubsets.add(coverage.name);
                }
            }

            for (const feature of font.features) {
                if (!namedFeatures.has(feature.tag)) {
                    namedFeatures.set(feature.tag, feature);
                }
            }

            for (const namedInstance of font.namedInstances) {
                for (const [tag, value] of Object.entries(namedInstance.coords)) {
                    let instanceValues = axisInstanceValues.get(tag);
                    if (!instanceValues) {
                        instanceValues = new Set();
                        axisInstanceValues.set(tag, instanceValues);
                    }
                    instanceValues.add(value!);
                }
            }
        }

        const axisInstanceValuesSorted: Partial<Record<string, number[]>> = {};
        for (const [tag, instanceValues] of axisInstanceValues) {
            const valuesArr = Array.from(instanceValues);
            if (tag === 'slnt') {
                // The comparator is backwards here--because a *negative* slant means italic, we want that to appear
                // later
                valuesArr.sort((a, b) => b - a);
            } else {
                valuesArr.sort((a, b) => a - b);
            }
            axisInstanceValuesSorted[tag] = valuesArr;
        }

        const sortedSubsets = Array.from(namedSubsets.values());
        sortedSubsets.sort((a, b) => a.localeCompare(b));

        const fontsSettings = [];
        for (const font of processedFonts) {
            fontsSettings.push({
                font: font.font,
                styleValues: font.uniqueStyleValues,
            });
        }

        fontsSettings.sort((a, b) => {
            const getStyleSetting = (setting: 'weight' | 'width' | 'italic' | 'slant') => {
                const settingA = a.styleValues[setting] ?? sharedStyleValues![setting]!;
                const settingB = b.styleValues[setting] ?? sharedStyleValues![setting]!;
                const settingAValue = settingA.type === 'variable' ? settingA.value.defaultValue : settingA.value;
                const settingBValue = settingB.type === 'variable' ? settingB.value.defaultValue : settingB.value;
                return [settingAValue, settingBValue];
            };

            const [widthA, widthB] = getStyleSetting('width');
            if (widthA !== widthB) return widthA - widthB;

            const [weightA, weightB] = getStyleSetting('weight');
            if (weightA !== weightB) return weightA - weightB;

            const [italA, italB] = getStyleSetting('italic');
            if (italA !== italB) return italA - italB;

            const [slantA, slantB] = getStyleSetting('slant');
            // The comparator is backwards here--because a *negative* slant means italic, we want that to appear later
            if (slantA !== slantB) return slantB - slantA;

            return a.font.subfamilyName.localeCompare(b.font.subfamilyName);
        });

        familySettings.push({
            name: familyName,
            fonts: fontsSettings,
            styleValues: sharedStyleValues!,
            axes: Array.from(axes.values()),
            axisInstanceValues: axisInstanceValuesSorted,
            features: Array.from(namedFeatures.values()),
            namedSubsets: sortedSubsets,
        });
    }
    return familySettings;
};

// ============================================================================

/**
 * Setting for an axis or style value, which can be pinned to a single value, clamped, or instanced into multiple font
 * files.
 *
 * @group Settings
 */
export type SubsetAxisSetting = {
    /** Pin this axis to a single value. */
    type: 'single';
    value: number;
} | {
    /** Clamp this axis's range (or just preserve it, if min and max are kept at their original values). */
    type: 'variable';
    value: {
        min: number;
        defaultValue?: number;
        max: number;
    };
} | {
    /** Instance this axis into multiple output font files, with each one containing a pinned or clamped axis. */
    type: 'multiple';
    value: {ranges: (readonly [number, number] | number)[]; defaultValue?: number};
};


type MultiSubsetAxis = SubsetAxisSetting & {tag: string};
type InstancedSubsetAxisSetting = Exclude<MultiSubsetAxis, {type: 'multiple'}>;

/**
 * Subset settings for one instance of a font (axis settings with `{type: 'multiple}` have been resolved).
 *
 * @group Settings
 */
type InstanceSubsetSettings = {
    /** All instanced axis values, including weight, width, italic, and slant. */
    axisValues: InstancedSubsetAxisSetting[];
    /** Which features are enabled or disabled. */
    features: Partial<Record<string, boolean>>;
    /** Output character sets and ranges to include. */
    unicodeRanges: 'all' | {
        named: SubsetName[];
        custom: (readonly [number, number] | number)[];
    };
    /**
     * Used in naming the font files. When instancing a font into multiple character sets, each one is named or
     * numbered.
     */
    charsetNameOrIndex: string | number | null;
    /**
     * True if we should preprocess this font before subsetting it. This speeds up the subsetting operation if it's done
     * multiple times, e.g. when instancing fonts.
     */
    preprocess: boolean;
};

/**
 * Cartesian product of all axes being instanced into multiple font files.
 * @param axisRanges All axes, in non-instanced form.
 * @returns All the sets of axis settings necessary to fully instance the font.
 */
const axisRangeProduct = (axisRanges: MultiSubsetAxis[]): InstancedSubsetAxisSetting[][] => {
    if (axisRanges.length === 0) {
        return [];
    }
    const iterIndices = [];
    const results: InstancedSubsetAxisSetting[][] = [];
    for (let i = 0; i < axisRanges.length; i++) {
        iterIndices.push(0);
    }

    outer:
    for (;;) {
        const current: InstancedSubsetAxisSetting[] = [];
        for (let i = 0; i < axisRanges.length; i++) {
            const axisRange = axisRanges[i];
            switch (axisRange.type) {
                case 'single':
                case 'variable': {
                    current.push(axisRange);
                    break;
                }
                case 'multiple': {
                    const range = axisRange.value.ranges[iterIndices[i]];
                    if (typeof range === 'number') {
                        current.push({type: 'single', tag: axisRange.tag, value: range});
                    } else if (typeof range === 'undefined') {
                        throw new Error('Empty instanced range');
                    } else {
                        current.push({
                            type: 'variable',
                            tag: axisRange.tag,
                            value: {
                                min: range[0],
                                defaultValue: axisRange.value.defaultValue,
                                max: range[1],
                            },
                        });
                    }
                    break;
                }
            }
        }

        results.push(current);

        for (let i = 0; i < iterIndices.length; i++) {
            const axisRange = axisRanges[i];
            const numRanges = axisRange.type === 'multiple' ?
                axisRange.value.ranges.length : 1;
            iterIndices[i]++;
            if (iterIndices[i] >= numRanges) {
                iterIndices[i] = 0;
                if (i === iterIndices.length - 1) {
                    break outer;
                }
            } else {
                break;
            }
        }
    }

    return results;
};

/**
 * An exported font, in all its formats.
 */
export type ExportedFont = {
    /** The subsetted font. */
    font: SubsettedFont;
    /** Info shared among all exported fonts within a family. */
    familyInfo: {
        /**
         * Axes that differ among font faces within this family (for example, axes that were instanced into multiple
         * fonts, or where there were multiple static input fonts to begin with). This includes "wght", "wdth", "ital",
         * and "slnt" axes.
         */
        differingAxes: Set<string>;
        /** If set, ignore `font.familyName` and treat this as the family name instead. */
        overrideName: string | null;
    };
    /** The font's filename, sans extension. */
    filename: string;
    /** The font file data, in all the formats requested to export to. */
    data: {
        /** This aliases to `font.data`, but is only present if the `'ttf'` format was enabled during export. */
        opentype: Uint8Array<ArrayBuffer> | null;
        woff: Uint8Array<ArrayBuffer> | null;
        woff2: Uint8Array<ArrayBuffer> | null;
    };
    /**
     * If this font's source file was instanced into multiple character sets, this tells you which one this exported
     * font is. Used for disambiguating filenames.
     */
    charsetNameOrIndex: string | number | null;
    /**
     * Return this font's filename's extension for a given format, without a leading dot. For woff and woff2, this is
     * simple, but for the uncompressed `'opentype'` format, it can be either `'ttf'` or `'otf'`.
     * @param format The format to get the extension for.
     */
    extension(format: 'opentype' | 'woff' | 'woff2'): string;
};


const STYLE_SUBFAMILIES = [
    'Thin',
    'Hairline',
    'Extra(?:\\s|-)?Light',
    'Ultra(?:\\s|-)?Light',
    'Light',
    'Normal',
    'Regular',
    'Book',
    'Medium',
    'Semi(?:\\s|-)?Bold',
    'Demi(?:\\s|-)?Bold',
    'Bold',
    'Extra(?:\\s|-)?Bold',
    'Ultra(?:\\s|-)?Bold',
    'Black',
    'Heavy',
    'Extra(?:\\s|-)?Black',
    'Ultra(?:\\s|-)?Black',
    'Italic',
    'Oblique',
    'Ultra(?:\\s|-)?(?:Condensed|Narrow)',
    'Extra(?:\\s|-)?(?:Condensed|Narrow)',
    '(?:Condensed|Narrow)',
    'Semi(?:\\s|-)?(?:Condensed|Narrow)',
    'Semi(?:\\s|-)?(?:Expanded|Narrow)',
    'Expanded',
    'Extra(?:\\s|-)?Expanded',
    'Ultra(?:\\s|-)?Expanded',
];
const STYLE_SUBFAMILY_END_REGEX = new RegExp(`(?:${STYLE_SUBFAMILIES.join('|')}\\s*)+$`, 'g');
const WEIGHT_NAMES = new Map([
    [100, 'Thin'],
    [200, 'ExtraLight'],
    [300, 'Light'],
    [400, 'Regular'],
    [500, 'Medium'],
    [600, 'SemiBold'],
    [700, 'Bold'],
    [800, 'ExtraBold'],
    [900, 'Black'],
    [950, 'ExtraBlack'],
]);
const WIDTH_NAMES = new Map([
    [50, 'UltraCondensed'],
    [62.5, 'ExtraCondensed'],
    [75, 'Condensed'],
    [87.5, 'SemiCondensed'],
    [100, 'Normal'],
    [112.5, 'SemiExpanded'],
    [125, 'Expanded'],
    [150, 'ExtraExpanded'],
    [200, 'UltraExpanded'],
]);
/**
 * Settings for the characters to include in a single output font face.
 *
 * @group Settings
 */
export type CharacterSetSettings = {
    /** Include these named Google Fonts character sets. */
    includeNamedSubsets?: SubsetName[];
    /**
     * Include these custom Unicode code point ranges. You can specify an array of ranges, or a string in a format
     * similar to the CSS `unicode-range` property (see {@link parseUnicodeRanges} for details on how it's parsed).
     */
    includeUnicodeRanges?: string | (number | readonly [number, number])[];
    /** The custom name of this character set, used in font filenames and CSS comments. */
    name?: string;
};

/**
 * Settings for subsetting (or not subsetting) a font family.
 *
 * @group Settings
 */
export type FamilySubsetSettings = {
    enableSubsetting: true;
    /**
     * Settings for style values: weight, width, and italic/slant.
     */
    styleValues: Partial<Record<StyleKey, SubsetAxisSetting>>;
    /**
     * Settings for variation axes, keyed by tag.
     */
    axes: Partial<Record<string, SubsetAxisSetting>>;
    /**
     * Feature tags to explicitly include or exclude. If not specified here, features will be included or excluded based
     * on what HarfBuzz thinks.
     */
    features?: Partial<Record<string, boolean>>;
    /**
     * Include these character sets. If multiple are provided, the font(s) will be instanced into multiple files, each
     * containing one of the character sets. If `"all"` is passed, all characters from the input font(s) will be
     * included.
     */
    includeCharacters: CharacterSetSettings | CharacterSetSettings[] | 'all';
    /** Override the name of this font family in the output filenames and generated CSS. */
    overrideName?: string;
} | {
    enableSubsetting: false;
    /** Override the name of this font family in the output filenames and generated CSS. */
    overrideName?: string;
};

/**
 * Settings for exporting a font family.
 *
 * @group Settings
 */
export type FamilySettings = {
    /** All fonts within the family. */
    fonts: {
        font: FontRef;
        /**
         * In some very rare cases, one font in a family *may* have variable style values whereas another font doesn't.
         * In such a case, you can specify settings for them here.
         */
        styleValues?: Partial<Record<StyleKey, SubsetAxisSetting>>;
    }[];
} & FamilySubsetSettings;

const instanceSubsetSettings = (family: FamilySettings): {
    font: FontRef;
    settings: InstanceSubsetSettings | null;
}[] => {
    const settingsByFont: {
        font: FontRef;
        settings: InstanceSubsetSettings | null;
    }[] = [];

    const styleKeyToTag = (styleKey: StyleKey): string => {
        switch (styleKey) {
            case 'weight': return 'wght';
            case 'width': return 'wdth';
            case 'italic': return 'ital';
            case 'slant': return 'slnt';
        }
    };

    for (const {font, styleValues} of family.fonts) {
        if (!family.enableSubsetting) {
            settingsByFont.push({font, settings: null});
            continue;
        }

        const axisValues: MultiSubsetAxis[] = [];
        for (const [tag, value] of Object.entries(family.axes)) {
            axisValues.push({tag, ...value!});
        }

        for (const [settingName, styleValue] of Object.entries(family.styleValues)) {
            axisValues.push({tag: styleKeyToTag(settingName as StyleKey), ...styleValue});
        }

        if (styleValues) {
            for (const [settingName, styleValue] of Object.entries(styleValues)) {
                axisValues.push({tag: styleKeyToTag(settingName as StyleKey), ...styleValue});
            }
        }

        let unicodeRangeSets = [];
        const charSettings = family.includeCharacters;
        if (charSettings === 'all') {
            unicodeRangeSets = ['all'] as const;
        } else {
            const charSettingsArr = Array.isArray(charSettings) ? charSettings : [charSettings];
            for (const charsetSettings of charSettingsArr) {
                let charsetName: string | null = charsetSettings.name ?? null;
                let parsedUnicodeRanges;
                if (typeof charsetSettings.includeUnicodeRanges === 'string') {
                    parsedUnicodeRanges = parseUnicodeRanges(charsetSettings.includeUnicodeRanges);
                    if (!parsedUnicodeRanges) throw new Error(`Invalid Unicode ranges: ${charsetSettings.includeUnicodeRanges}`);
                } else {
                    parsedUnicodeRanges = charsetSettings.includeUnicodeRanges ?? [];
                }
                if (charsetName === '' || charsetName === null) {
                    // If the character set consists exclusively of pre-named Google Fonts character subsets, we can
                    // fall back to the names of those
                    if (!parsedUnicodeRanges.length && charsetSettings.includeNamedSubsets) {
                        // TODO: sort if user-provided?
                        charsetName = charsetSettings.includeNamedSubsets.join('-');
                    }
                }
                unicodeRangeSets.push({
                    named: charsetSettings.includeNamedSubsets ?? [],
                    custom: parsedUnicodeRanges,
                    charsetName,
                });
            }

        }

        // Instantiate for the cartesian product of all instanced variation axes...
        const flattenedAxisSettings = axisRangeProduct(axisValues);

        // Then once for each character set
        for (const axisValues of flattenedAxisSettings) {
            for (let i = 0; i < unicodeRangeSets.length; i++) {
                const unicodeRanges = unicodeRangeSets[i];
                settingsByFont.push({
                    font,
                    settings: {
                        axisValues,
                        features: family.features ?? {},
                        unicodeRanges,
                        // We only need to name/number fonts by character set if we're exporting more than one character
                        // set
                        charsetNameOrIndex: unicodeRangeSets.length === 1 ?
                            null :
                            typeof unicodeRanges !== 'string' && unicodeRanges.charsetName !== null ?
                                unicodeRanges.charsetName :
                                i,
                        preprocess: flattenedAxisSettings.length * unicodeRangeSets.length > 1,
                    },
                });
            }
        }
    }

    return settingsByFont;
};

/**
 * Find axes and style values that vary among fonts within the same family. These style values will become part of the
 * fonts' filenames, keeping them unique.
 * @param fonts The fonts to search within.
 * @returns A map of family names -> axes and style values that vary within that family.
 */
const findDifferingAxes = (fonts: SubsettedFont[]) => {
    const varyingAxes = new Set<string>();
    const axesInfo = {
        axes: new Map<string, SubsetAxisInfo>(),
        styleValues: {} as Partial<Record<StyleKey, StyleValue>>,
    };
    const styleToAxisNames = {
        italic: 'ital',
        slant: 'slnt',
        weight: 'wght',
        width: 'wdth',
    } as const;

    for (const font of fonts) {
        const {axes, styleValues} = axesInfo;
        for (const axis of font.axes) {
            const existingAxis = axes.get(axis.tag);
            if (existingAxis) {
                if (!styleValuesEqual(existingAxis, axis)) {
                    varyingAxes.add(axis.tag);
                }
            } else {
                axes.set(axis.tag, axis);
            }
        }
        for (const styleName of ['italic', 'slant', 'weight', 'width'] as const) {
            const styleValue = font.styleValues[styleName];
            // If one value is 0 for italic or slant, we want to name the other one "Oblique" or "Italic" regardless of
            // its exact value, so don't count it as varying.
            if (
                (styleName === 'italic' || styleName === 'slant') &&
                styleValue.type === 'single' &&
                styleValue.value === 0
            ) {
                continue;
            }
            if (!styleValues[styleName]) {
                styleValues[styleName] = styleValue;
                continue;
            }
            if (!styleValuesEqual(styleValues[styleName], styleValue)) {
                varyingAxes.add(styleToAxisNames[styleName]);
                styleValues[styleName] = styleValue;
            }
        }
    }

    return varyingAxes;
};

const roundDecimal = (v: number) => Math.round(v * 1000) / 1000;

/**
 * Return a list of instance labels necessary to disambiguate this from other fonts in the family, for filenames or CSS
 * family names.
 *
 * For filename purposes, this might return something like ["Condensed", "Bold", "Italic", "Casual"]. For CSS, where
 * weight/width/slope properties are part of the `@font-face` declaration but other axes are not, it might return
 * something like ["Casual"].
 *
 * TODO: Add tests for this. Good test fonts would be Recursive (lots of axes), Nunito Sans (has both "ital" and "slnt"
 * axes, which is not best practice), Inter ("opsz" axis).
 *
 * @param font The font to operate on.
 * @param varyingAxes Axis tags that vary over all fonts in this family.
 * @param includeStyleValues Whether to include weight/width/slope labels in the output. This should be true for
 * filenames, where every single instance needs to be unique, but false for CSS family names, where we only need to give
 * a unique name to every instance with different non-WWS values.
 * @returns A list of labels.
 */
const getInstanceLabels = (
    font: SubsettedFont,
    varyingAxes: Set<string>,
    includeStyleValues: boolean,
): string[] => {
    // eslint-disable-next-line eqeqeq
    if (font.namedInstance?.subfamilyName != null) {
        return [font.namedInstance?.subfamilyName];
    }
    const styleValueTags = new Set(['ital', 'slnt', 'wght', 'wdth']);

    const axisValuesByTag = new Map<string, StyleValue>([
        ['ital', font.styleValues.italic],
        ['slnt', font.styleValues.slant],
        ['wght', font.styleValues.weight],
        ['wdth', font.styleValues.width],
    ]);
    for (const axisSetting of font.axes) {
        axisValuesByTag.set(axisSetting.tag, axisSetting);
    }

    // We'll eliminate axes as we go
    const remainingAxes = new Set(axisValuesByTag.keys());

    const axisLabels: {label: string; ordering: number}[] = [];

    // First check for multi-value axis value labels
    const matchingMultiAxisRecords: AxisValueMultiple[] = [];
    outer:
    for (const axisValue of font.styleAttributes.axisValues) {
        if (axisValue.format !== AxisValueFormat.MultipleValues) {
            continue;
        }
        let allValuesAreStyleValues = true;
        let anyAxesVary = false;
        for (const subValue of axisValue.axisValues) {
            const axis = font.styleAttributes.designAxes[subValue.axisIndex];

            const fontAxisValue = axisValuesByTag.get(axis.tag);
            // This multi-value label requires an axis value not in the font (this shouldn't happen, I think?)
            if (typeof fontAxisValue === 'undefined') continue outer;
            // This multi-value label specifies an axis value different from what's in this font
            if (fontAxisValue.type !== 'single' || fontAxisValue.value !== subValue.value) {
                continue outer;
            }

            if (!styleValueTags.has(axis.tag)) allValuesAreStyleValues = false;
            if (varyingAxes.has(axis.tag)) anyAxesVary = true;
        }
        if (
            // Any of the axis values specified in this record vary among different fonts in this family, and are worth
            // including in order to disambiguate this font from others
            anyAxesVary &&
            // Either this label includes some non-style-value-related (weight/width/slope) axis values, or we want to
            // include style-value-related names anyway
            (includeStyleValues || !allValuesAreStyleValues) &&
            // This label is not "elidable" (can be omitted when composing name strings like we're doing here)
            !(axisValue.flags & AxisValueFlags.Elidable)
        ) {
            matchingMultiAxisRecords.push(axisValue);
        }
    }
    // Sort in descending order by most values matched:
    //
    // "When searching for an axis value table to match a particular combination of values, if two format 4 tables are
    // found to be a partial match for that combination of values, the table that matches a greater number of values
    // (the most specific match) should be used."
    matchingMultiAxisRecords.sort((a, b) => b.axisValues.length - a.axisValues.length);

    for (const axisValue of matchingMultiAxisRecords) {
        if (!axisValue.name) continue;
        // We may have already pushed an axis label that "used up" some of the axes
        if (!axisValue.axisValues.every(
            ({axisIndex}) => remainingAxes.has(font.styleAttributes.designAxes[axisIndex].tag))) {
            continue;
        }
        // These axes are being mapped to a label
        for (const subValue of axisValue.axisValues) {
            remainingAxes.delete(font.styleAttributes.designAxes[subValue.axisIndex].tag);
        }
        // "Because a format 4 table combines values on multiple axes, there can be ambiguity about axis ordering. This
        // could arise when dynamically composing names using the labels provided by axis value tables, or in other
        // situations in which the axisOrdering values of axis records are used. For a format 4 table, the axisOrdering
        // value assumed should be the lowest axisOrdering value for the axes referenced by the format 4 table."
        const ordering = axisValue.axisValues.reduce((prev, {axisIndex}) => {
            return Math.min(prev, font.styleAttributes.designAxes[axisIndex].ordering);
        }, Infinity);
        axisLabels.push({label: axisValue.name, ordering});
    }

    // Format 1 and 3 axis values
    for (const axisValue of font.styleAttributes.axisValues) {
        if (!(axisValue.format === AxisValueFormat.SingleValue || axisValue.format === AxisValueFormat.LinkedValue)) {
            continue;
        }
        if (!axisValue.name) continue;

        const axis = font.styleAttributes.designAxes[axisValue.axisIndex];
        if (!remainingAxes.has(axis.tag)) continue;

        const fontAxisValue = axisValuesByTag.get(axis.tag);
        if (typeof fontAxisValue === 'undefined') continue;
        if (fontAxisValue.type !== 'single' || fontAxisValue.value !== axisValue.value) {
            continue;
        }

        // We've mapped this axis value to a label, whether or not we elide it
        remainingAxes.delete(axis.tag);

        const elide = (styleValueTags.has(axis.tag) && !includeStyleValues) ||
            (axisValue.flags & AxisValueFlags.Elidable) ||
            !varyingAxes.has(axis.tag);

        if (!elide) axisLabels.push({label: axisValue.name, ordering: axis.ordering});
    }

    // Format 2 axis values
    //
    // TODO: If multiple fonts are instanced to have axis values within the same range, we need to disambiguate them
    // some other way, but if only one output font has an axis value within one of these ranges, we can just give it
    // that range's label and that's sufficient.
    for (const axisValue of font.styleAttributes.axisValues) {
        if (axisValue.format !== AxisValueFormat.Range) continue;
        if (!axisValue.name) continue;

        const axis = font.styleAttributes.designAxes[axisValue.axisIndex];
        if (!remainingAxes.has(axis.tag)) continue;

        const fontAxisValue = axisValuesByTag.get(axis.tag);
        if (typeof fontAxisValue === 'undefined') continue;
        if (fontAxisValue.type !== 'variable' ||
            fontAxisValue.value.min !== axisValue.min || fontAxisValue.value.max !== axisValue.max) {
            continue;
        }

        // We've mapped this axis value to a label, whether or not we elide it
        remainingAxes.delete(axis.tag);

        const elide = (styleValueTags.has(axis.tag) && !includeStyleValues) ||
            (axisValue.flags & AxisValueFlags.Elidable) ||
            !varyingAxes.has(axis.tag);

        if (!elide) axisLabels.push({label: axisValue.name, ordering: axis.ordering});
    }

    // Fall back for anything not in the STAT table

    let lowestOrdering = 0;
    let highestOrdering = 0;
    const axisOrderings = new Map<string, number>();
    for (const axis of font.styleAttributes.designAxes) {
        lowestOrdering = Math.min(lowestOrdering, axis.ordering);
        highestOrdering = Math.max(highestOrdering, axis.ordering);
        axisOrderings.set(axis.tag, axis.ordering);
    }
    // Default orderings if the font has no STAT table
    for (const axis of font.axes) {
        if (axisOrderings.has(axis.tag)) continue;
        axisOrderings.set(axis.tag, ++highestOrdering);
    }
    if (!axisOrderings.has('wdth')) axisOrderings.set('wdth', lowestOrdering - 2);
    if (!axisOrderings.has('wght')) axisOrderings.set('wght', lowestOrdering - 1);
    if (!axisOrderings.has('ital')) axisOrderings.set('ital', highestOrdering + 1);
    if (!axisOrderings.has('slnt')) axisOrderings.set('slnt', highestOrdering + 2);

    for (const axisTag of varyingAxes) {
        if (!remainingAxes.has(axisTag)) continue;
        const fontAxis = axisValuesByTag.get(axisTag);
        if (!fontAxis) continue;

        remainingAxes.delete(axisTag);

        const elide = styleValueTags.has(axisTag) && !includeStyleValues;
        if (elide) continue;

        let name = undefined;
        if (fontAxis.type === 'single') {
            const roundValue = roundDecimal(fontAxis.value);
            if (axisTag === 'wght') {
                name = WEIGHT_NAMES.get(roundValue);
            } else if (axisTag === 'wdth') {
                name = WIDTH_NAMES.get(roundValue);
            } else if (axisTag === 'opsz') {
                // Convention for optical size seems to be "[n]pt"
                name = `${roundValue}pt`;
            }

            if (!name) {
                name = `${axisTag}${roundValue}`;
            }
        } else {
            name = `${axisTag}${roundDecimal(fontAxis.value.min)}_${roundDecimal(fontAxis.value.max)}`;
        }
        axisLabels.push({label: name, ordering: axisOrderings.get(axisTag) ?? 0});
    }
    // As a special case, the ital and slnt axes don't count as "varying" if there's only one non-zero value. Add the
    // "Italic" or "Oblique" labels manually.
    if (includeStyleValues) {
        if (
            font.styleValues.italic.type === 'single' &&
            font.styleValues.italic.value !== 0 &&
            !varyingAxes.has('ital')
        ) {
            axisLabels.push({label: 'Italic', ordering: axisOrderings.get('ital')!});
        } else if (
            font.styleValues.slant.type === 'single' &&
            font.styleValues.slant.value !== 0 &&
            !varyingAxes.has('slnt')
        ) {
            // This should be independent of the ital axis (it's not recommended for fonts to have both an ital and slnt
            // axis), but e.g. Nunito Sans has two static faces: an upright one with ital 0 and slnt 0, and an "Italic"
            // one with ital 1 and slnt -9. We only want to name that "Nunito Sans Italic", not "Nunito Sans Italic
            // Oblique".
            axisLabels.push({label: 'Oblique', ordering: axisOrderings.get('slnt')!});
        }
    }

    axisLabels.sort((a, b) => a.ordering - b.ordering);
    return axisLabels.map(({label}) => label);
};

const fontFilename = (
    font: SubsettedFont,
    varyingAxes: Set<string>,
    charsetNameOrIndex: number | string | null,
    overrideName: string | null,
) => {
    // Don't include the subfamily name; the axis values should serve the same purpose
    // TODO: we should now have access to the family name without any of this...
    const familyName = overrideName ?? font.familyName.replace(STYLE_SUBFAMILY_END_REGEX, '').replaceAll(' ', '');
    let filename = familyName.replaceAll(' ', '');

    const instanceLabels = getInstanceLabels(font, varyingAxes, true);
    if (instanceLabels.length > 0) {
        for (let i = 0; i < instanceLabels.length; i++) {
            instanceLabels[i] = instanceLabels[i].replaceAll(' ', '-');
        }
        filename += `-${instanceLabels.join('-')}`;
    }

    if (typeof charsetNameOrIndex === 'string') {
        filename += `-${charsetNameOrIndex}`;
    } else if (typeof charsetNameOrIndex === 'number') {
        filename += `-charset${charsetNameOrIndex}`;
    }


    filename = filename.replace(/[\x00-\x1f\x80-\x9f/\\?<>:*|"]/g, '_');

    return filename;
};

/**
 * Takes a list of exported fonts and generates a stylesheet containing `@font-face` declarations for them all.
 * @param fonts Exported fonts.
 * @param fontPathPrefix Path under which the fonts will be located--this will be prefixed to the `url(...)` in the
 * `src` property of each font. A trailing slash may be present or absent; both are handled correctly.
 * @param includeUncompressed Whether to include the uncompressed .ttf files in the CSS.
 * @returns CSS output, that can be used as a list of typed tokens (for syntax highlighting) or as a string.
 *
 * @group CSS
 */
export const exportedFontsToCSS = (
    fonts: ExportedFont[],
    fontPathPrefix: string,
    includeUncompressed: boolean,
): CSSOutput => {
    const emitter = new CSSEmitter();

    if (fontPathPrefix.length > 0 && !fontPathPrefix.endsWith('/')) {
        fontPathPrefix += '/';
    }

    for (const {font, data, filename, charsetNameOrIndex, familyInfo} of fonts) {
        emitter.atRule('@font-face');

        emitter.declaration('font-family');
        let familyName = familyInfo.overrideName ?? font.familyName;
        // CSS @font-face declarations can map a single family name to multiple static fonts of varying weight, width,
        // and slope, but they cannot do this for arbitrary axes, so we need to disambiguate their names.
        const instanceLabels = getInstanceLabels(font, familyInfo.differingAxes, false);
        if (instanceLabels.length > 0) {
            familyName += ` ${instanceLabels.join(' ')}`;
        }
        emitter.string(familyName);
        emitter.endDeclaration();

        emitter.declaration('font-display');
        emitter.keyword('swap');
        emitter.endDeclaration();

        emitter.declaration('font-style');
        const {width, weight, italic, slant} = font.styleValues;

        if (slant.type === 'variable') {
            emitter.keyword('oblique');
            // The `slnt` axis is reversed from the CSS `font-style: oblique [n]deg` value.
            emitter.number(`${-roundDecimal(slant.value.min)}deg`);
            emitter.number(`${-roundDecimal(slant.value.max)}deg`);
        } else if (italic.type === 'variable') {
            emitter.keyword('oblique');
            emitter.number('0deg');
            emitter.number('14deg');
        } else {
            // If the font style's italic property is variable, it should have been resolved to a variable `slnt` or
            // `ital` axis above.
            if (italic.value !== 0 && Math.abs(slant.value + 9.4) < 1e-4) {
                emitter.keyword('italic');
            } else if (slant.value !== 0) {
                emitter.keyword('oblique');
                emitter.number(`${-roundDecimal(slant.value)}deg`);
            } else {
                emitter.keyword('normal');
            }
        }
        emitter.endDeclaration();

        emitter.declaration('font-weight');
        if (weight.type === 'variable') {
            emitter.number(roundDecimal(weight.value.min));
            emitter.number(roundDecimal(weight.value.max));
        } else {
            emitter.number(roundDecimal(weight.value));
        }
        emitter.endDeclaration();

        // TODO: only emit this if the font-stretch varies over the family
        emitter.declaration('font-stretch');
        if (width.type === 'variable') {
            emitter.number(roundDecimal(width.value.min));
            emitter.number(roundDecimal(width.value.max));
        } else {
            emitter.number(roundDecimal(width.value));
        }
        emitter.endDeclaration();

        emitter.declaration('src');
        const numFormats =
            Number(data.opentype !== null && includeUncompressed) +
            Number(data.woff !== null) +
            Number(data.woff2 !== null);
        if (numFormats > 1) {
            emitter.indentedList();
        }
        if (numFormats === 1 && data.opentype && !includeUncompressed) {
            throw new Error('includeUncompressed is false, but there is no compressed font file to include instead');
        }
        for (const format of ['woff2', 'woff', 'opentype'] as const) {
            if (format === 'opentype' && !includeUncompressed) continue;
            if (data[format]) {
                emitter.parenthesized('url');
                let extension: string = format;
                if (format === 'opentype') {
                    extension = font.format === 'opentype' ? 'otf' : 'ttf';
                }
                emitter.string(fontPathPrefix + filename + '.' + extension);
                emitter.endParenthesized();

                emitter.parenthesized('format');
                emitter.string(format === 'opentype' ? font.format : format);
                emitter.endParenthesized();
                emitter.comma();
            }
        }
        // Remove the last comma and following whitespace
        emitter.spans.pop();
        emitter.spans.pop();

        if (numFormats > 1) {
            emitter.endIndentedList();
        }

        emitter.endDeclaration();

        // If exporting multiple character sets, we need to specify the Unicode ranges of each
        if (charsetNameOrIndex !== null) {
            emitter.declaration('unicode-range');
            const ranges = formatUnicodeRanges(font.unicodeRanges);
            for (let i = 0; i < ranges.length; i++) {
                emitter.number(ranges[i]);
                if (i !== ranges.length - 1) emitter.comma();
            }
            emitter.endDeclaration();
        }

        emitter.endRule();
    }

    return emitter;
};

/**
 * Settings for exporting families to font files.
 */
export type ExportFontsSettings = {
    /** Compression formats to include. */
    formats: {
        ttf?: boolean;
        woff?: boolean;
        woff2?: boolean;
    };
    /** Zopfli iteration count for WOFF1 (default 15). */
    woffCompression?: number;
    /** Brotli compression level for WOFF2, from 0 to 11 (default 11). */
    woff2Compression?: number;
    /**
     * Callback for subsetting/compression progress.
     * @param progress Total subsetting and compression progress estimate, as a number between 0 and 1.
     */
    onProgress?: (progress: number) => unknown;
};

/**
 * Export (subset and compress) font families using the given settings.
 * @param compressionContext WOFF/WOFF2 compression context to use. This can be null if no compressed formats are
 * enabled in the output, but will throw an error if it isn't provided and there *are* compressed formats enabled.
 * @param families Font families to export, and their subsetting settings.
 * @param {ExportFontsSettings} settings Export-wide settings.
 * @returns A promise that resolves to all the exported fonts. These can then be written to disk, used to generate CSS,
 * etc.
 */
export const exportFonts = async(
    compressionContext: WoffCompressionContext | null,
    families: FamilySettings[],
    {
        formats,
        woffCompression = 15,
        woff2Compression = 11,
        onProgress,
    }: ExportFontsSettings,
): Promise<ExportedFont[]> => {
    let totalOutputFonts = 0;
    let totalProgressProportion = 0;
    const subsetProgressProportion = 1;

    const instancedFamilies = families.map(family => {
        const instances = instanceSubsetSettings(family);
        totalOutputFonts += instances.length;
        for (const font of instances) {
            if (font.settings) {
                totalProgressProportion += subsetProgressProportion;
            }
        }
        return {family, instances};
    });

    const parallelism = (await compressionContext?.getParallelism()) ?? 1;
    // TODO: Probably not an accurate estimate since cores can't work on both WOFF1 and WOFF2 at the same time
    const woff1ProgressProportion = (2 * woffCompression) /
        Math.min(parallelism, totalOutputFonts);
    // TODO: the speed varies by compression level
    const woff2ProgressProportion = 32 / Math.min(parallelism, totalOutputFonts);
    if (formats.woff) {
        totalProgressProportion += woff1ProgressProportion * totalOutputFonts;
    }
    if (formats.woff2) {
        totalProgressProportion += woff2ProgressProportion * totalOutputFonts;
    }
    let progress = 0;
    onProgress?.(0);

    let cancelled = false;
    const cancelOnError = (err: unknown) => {
        cancelled = true;
        throw err;
    };

    const compressionPromises: Promise<void>[] = [];

    const familyPromises = instancedFamilies.map(({family, instances}) => {
        const instancePromises = instances.map(async({font, settings}) => {
            const subsettedFont = await font.subset(settings);
            if (cancelled) throw new DOMException('Operation cancelled', 'AbortError');
            const dataInFormats: ExportedFont['data'] = {
                opentype: formats.ttf ? subsettedFont.data : null,
                woff: null,
                woff2: null,
            };

            progress += subsetProgressProportion;
            onProgress?.(progress / totalProgressProportion);
            if ((formats.woff || formats.woff2) && compressionContext === null) {
                throw new Error('woff or woff2 formats enabled but no compression context provided');
            }
            if (formats.woff) {
                compressionPromises.push(compressionContext!.compressFromTTF(
                    subsettedFont.data,
                    {algorithm: 'woff', level: woffCompression},
                ).then(compressed => {
                    if (cancelled) throw new DOMException('Operation cancelled', 'AbortError');
                    progress += woff1ProgressProportion;
                    onProgress?.(progress / totalProgressProportion);
                    dataInFormats.woff = compressed;
                }, cancelOnError));
            }
            if (formats.woff2) {
                compressionPromises.push(compressionContext!.compressFromTTF(
                    subsettedFont.data,
                    {algorithm: 'woff2', level: woff2Compression},
                ).then(compressed => {
                    if (cancelled) throw new DOMException('Operation cancelled', 'AbortError');
                    progress += woff2ProgressProportion;
                    onProgress?.(progress / totalProgressProportion);
                    dataInFormats.woff2 = compressed;
                }, cancelOnError));
            }
            const charsetNameOrIndex = settings?.charsetNameOrIndex ?? null;

            return {subsettedFont, dataInFormats, charsetNameOrIndex};
        });

        return Promise.all(instancePromises).then(subsettedFonts => {
            const differingAxes = findDifferingAxes(subsettedFonts.map(f => f.subsettedFont));
            const overrideName = family.overrideName ?? null;
            const familyInfo = {overrideName, differingAxes};

            return subsettedFonts.map(({subsettedFont, dataInFormats, charsetNameOrIndex}) => {
                return {
                    font: subsettedFont,
                    familyInfo,
                    filename: fontFilename(
                        subsettedFont,
                        differingAxes,
                        charsetNameOrIndex,
                        overrideName,
                    ),
                    data: dataInFormats,
                    charsetNameOrIndex,
                    extension(format: 'opentype' | 'woff' | 'woff2') {
                        if (format === 'opentype') {
                            return subsettedFont.format === 'opentype' ? 'otf' : 'ttf';
                        }
                        return format;
                    },
                };
            });
        });
    });

    const exportedFamilies = await Promise.all(familyPromises).then(undefined, cancelOnError);
    await Promise.all(compressionPromises);
    const exportedFonts = exportedFamilies.flat();
    return exportedFonts;
};
