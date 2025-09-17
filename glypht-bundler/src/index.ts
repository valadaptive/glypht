import type {
    AxisInfo,
    FeatureInfo,
    FontRef,
    StyleKey,
    StyleValue,
    StyleValues,
    SubsetAxisInfo,
    SubsetName,
    SubsettedFont,
    WoffCompressionContext,
} from '@glypht/core';

import CSSEmitter, {CSSOutput} from './css';
import {formatUnicodeRanges, parseUnicodeRanges} from './unicode-ranges';

export type * from './css';
export {NodeType} from './css';
export {formatUnicodeRanges, parseUnicodeRanges, parseRanges} from './unicode-ranges';

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
    /** If set, ignore `font.familyName` and treat this as the family name instead. */
    overrideName?: string;
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
    includeNamedSubsets: SubsetName[];
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

const instanceSubsetSettings = (settings: FamilySettings[]): Map<number, (InstanceSubsetSettings | null)[]> => {
    const settingsByFont = new Map<number, (InstanceSubsetSettings | null)[]>();

    const styleKeyToTag = (styleKey: StyleKey): string => {
        switch (styleKey) {
            case 'weight': return 'wght';
            case 'width': return 'wdth';
            case 'italic': return 'ital';
            case 'slant': return 'slnt';
        }
    };

    for (const family of settings) {
        for (const font of family.fonts) {
            if (!family.enableSubsetting) {
                settingsByFont.set(font.font.id, [null]);
                continue;
            }

            const axisValues: MultiSubsetAxis[] = [];
            for (const [tag, value] of Object.entries(family.axes)) {
                axisValues.push({tag, ...value!});
            }

            for (const [settingName, styleValue] of Object.entries(family.styleValues)) {
                axisValues.push({tag: styleKeyToTag(settingName as StyleKey), ...styleValue});
            }

            if (font.styleValues) {
                for (const [settingName, styleValue] of Object.entries(font.styleValues)) {
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
                        if (!parsedUnicodeRanges.length) {
                            // TODO: sort if user-provided?
                            charsetName = charsetSettings.includeNamedSubsets.join('-');
                        }
                    }
                    unicodeRangeSets.push({
                        named: charsetSettings.includeNamedSubsets,
                        custom: parsedUnicodeRanges,
                        charsetName,
                    });
                }

            }

            // Instantiate for the cartesian product of all instanced variation axes...
            const flattenedAxisSettings = axisRangeProduct(axisValues);

            // Then once for each character set
            const flattenedSettings = [];
            for (const axisValues of flattenedAxisSettings) {
                for (let i = 0; i < unicodeRangeSets.length; i++) {
                    const unicodeRanges = unicodeRangeSets[i];
                    flattenedSettings.push({
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
                    });
                }
            }

            settingsByFont.set(font.font.id, flattenedSettings);
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
const findVaryingAxes = (fonts: SubsettedFont[]) => {
    const varyingAxesByFamily = new Map<string, {
        varyingAxes: Set<string>;
        varyingStyleValues: {weight: boolean; width: boolean; italic: boolean; slant: boolean};
    }>();
    const axesByFamily = new Map<string, {
        axes: Map<string, SubsetAxisInfo>;
        styleValues: Partial<Record<StyleKey, StyleValue>>;
    }>();

    for (const font of fonts) {
        let axesInfo = axesByFamily.get(font.familyName);
        if (!axesInfo) {
            axesInfo = {axes: new Map(), styleValues: {}};
            axesByFamily.set(font.familyName, axesInfo);
        }
        const {axes, styleValues} = axesInfo;
        let varyingInfo = varyingAxesByFamily.get(font.familyName);
        if (!varyingInfo) {
            varyingInfo = {
                varyingAxes: new Set(),
                varyingStyleValues: {weight: false, width: false, italic: false, slant: false},
            };
            varyingAxesByFamily.set(font.familyName, varyingInfo);
        }
        const {varyingAxes} = varyingInfo;
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
                varyingInfo.varyingStyleValues[styleName] = true;
                styleValues[styleName] = styleValue;
            }
        }
    }

    return varyingAxesByFamily;
};

const fontFilenames = (fonts: ExportedFont[]) => {
    const varyingAxesByFamily = findVaryingAxes(fonts.map(font => font.font));

    const filenames = new Map<SubsettedFont, string>();
    for (const {font, charsetNameOrIndex, overrideName} of fonts) {
        const varyingInfo = varyingAxesByFamily.get(font.familyName)!;
        filenames.set(font, fontFilename(
            font,
            varyingInfo.varyingAxes,
            varyingInfo.varyingStyleValues,
            charsetNameOrIndex,
            overrideName,
        ));
    }

    return filenames;
};

const roundDecimal = (v: number) => Math.round(v * 1000) / 1000;

const fontFilename = (
    font: SubsettedFont,
    varyingAxes: Set<string>,
    styleValuesVary: {weight: boolean; width: boolean; italic: boolean; slant: boolean},
    charsetNameOrIndex: number | string | null,
    overrideName?: string,
) => {
    const {weight, width, italic, slant} = font.styleValues;

    // Don't include the subfamily name; the axis values should serve the same purpose
    // TODO: we should now have access to the family name without any of this...
    const familyName = overrideName ?? font.familyName.replace(STYLE_SUBFAMILY_END_REGEX, '').replaceAll(' ', '');
    let filename = familyName.replaceAll(' ', '');

    if (font.namedInstance && font.namedInstance.subfamilyName) {
        filename += `-${font.namedInstance.subfamilyName.replaceAll(' ', '-')}`;
    } else {
        if (width.type === 'single') {
            const roundedWidth = Math.round(width.value * 2) / 2;
            if (roundedWidth !== 100) {
                filename += `-${WIDTH_NAMES.get(roundedWidth) ?? roundedWidth}`;
            }
        } else if (styleValuesVary.width) {
            filename += `-wdth${roundDecimal(width.value.min)}_${roundDecimal(width.value.max)}`;
        }

        if (weight.type === 'single') {
            filename += `-${WEIGHT_NAMES.get(roundDecimal(weight.value)) ?? roundDecimal(weight.value)}`;
        } else if (styleValuesVary.weight) {
            filename += `-wght${roundDecimal(weight.value.min)}_${roundDecimal(weight.value.max)}`;
        }

        for (const axis of font.axes) {
            if (!varyingAxes.has(axis.tag)) continue;
            if (axis.type === 'single') {
                filename += `-${axis.tag}${roundDecimal(axis.value)}`;
            } else {
                filename += `-${axis.tag}${roundDecimal(axis.value.min)}_${roundDecimal(axis.value.max)}`;
            }
        }

        let slantStyleName = '';
        if (slant.type === 'variable') {
            if (styleValuesVary.slant) slantStyleName = `slnt${roundDecimal(slant.value.min)}_${roundDecimal(slant.value.max)}`;
        } else if (italic.type === 'variable') {
            if (styleValuesVary.italic) slantStyleName = `ital${roundDecimal(italic.value.min)}_${roundDecimal(italic.value.max)}`;
        } else if (styleValuesVary.italic || styleValuesVary.slant) {
            // We instanced a font with a variable `slnt` or `ital` axis into multiple fonts with static `slnt` or
            // `ital` values.
            if (styleValuesVary.italic) {
                slantStyleName += `ital${roundDecimal(italic.value)}`;
            }
            if (styleValuesVary.slant) {
                slantStyleName += `slnt${roundDecimal(slant.value)}`;
            }
        } else {
            // If the font style's italic property is variable, it should have been resolved to a variable `slnt` or
            // `ital` axis above.
            if (italic.value !== 0) {
                slantStyleName = `Italic`;
            } else if (slant.value !== 0) {
                slantStyleName = `Oblique`;
            }
        }

        if (slantStyleName.length > 0) {
            filename += `-${slantStyleName}`;
        }
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

    for (const {font, data, filename, charsetNameOrIndex, overrideName} of fonts) {
        emitter.atRule('@font-face');

        emitter.declaration('font-family');
        emitter.string(overrideName ?? font.familyName);
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
    const fontList = [];
    const subsetSettingsByFont = instanceSubsetSettings(families);
    for (const family of families) {
        for (const font of family.fonts) {
            const settings = subsetSettingsByFont.get(font.font.id)!;
            for (const flattenedSettings of settings) {
                fontList.push({font: font.font, overrideName: family.overrideName, settings: flattenedSettings});
            }
        }
    }

    const subsetProgressProportion = 1;
    const parallelism = (await compressionContext?.getParallelism()) ?? 1;
    // TODO: Probably not an accurate estimate since cores can't work on both WOFF1 and WOFF2 at the same time
    const woff1ProgressProportion = (2 * woffCompression) /
        Math.min(parallelism, fontList.length);
    // TODO: the speed varies by compression level
    const woff2ProgressProportion = 32 / Math.min(parallelism, fontList.length);
    let totalProgressProportion = 0;
    for (const font of fontList) {
        if (font.settings) {
            totalProgressProportion += subsetProgressProportion;
        }
    }
    if (formats.woff) {
        totalProgressProportion += woff1ProgressProportion * fontList.length;
    }
    if (formats.woff2) {
        totalProgressProportion += woff2ProgressProportion * fontList.length;
    }
    let progress = 0;
    onProgress?.(0);

    let cancelled = false;

    const fontPromises = fontList.map(async({font, overrideName, settings}) => {
        const subsettedFont = await font.subset(settings);
        if (cancelled) throw new Error('Aborted');
        const dataInFormats: ExportedFont['data'] = {
            opentype: formats.ttf ? subsettedFont.data : null,
            woff: null,
            woff2: null,
        };

        progress += subsetProgressProportion;
        onProgress?.(progress / totalProgressProportion);
        const compressionPromises = [];
        if ((formats.woff || formats.woff2) && compressionContext === null) {
            throw new Error('woff or woff2 formats enabled but no compression context provided');
        }
        if (formats.woff) {
            compressionPromises.push(compressionContext!.compressFromTTF(
                subsettedFont.data,
                'woff',
                woffCompression,
            ).then(compressed => {
                if (cancelled) throw new Error('Aborted');
                progress += woff1ProgressProportion;
                onProgress?.(progress / totalProgressProportion);
                dataInFormats.woff = compressed;
            }));
        }
        if (formats.woff2) {
            compressionPromises.push(compressionContext!.compressFromTTF(
                subsettedFont.data,
                'woff2',
                woff2Compression,
            ).then(compressed => {
                if (cancelled) throw new Error('Aborted');
                progress += woff2ProgressProportion;
                onProgress?.(progress / totalProgressProportion);
                dataInFormats.woff2 = compressed;
            }));
        }
        if (compressionPromises.length > 0) await Promise.all(compressionPromises);

        return {
            font: subsettedFont,
            overrideName,
            filename: '', // This will be filled in later. It's just to get TypeScript to shut up.
            data: dataInFormats,
            charsetNameOrIndex: settings ? settings.charsetNameOrIndex : null,
            extension: (format: 'opentype' | 'woff' | 'woff2') => {
                if (format === 'opentype') {
                    return subsettedFont.format === 'opentype' ? 'otf' : 'ttf';
                }
                return format;
            },
        };
    });

    return Promise.all(fontPromises).then(exportedFonts => {
        const filenames = fontFilenames(exportedFonts);
        for (const exportedFont of exportedFonts) {
            const filename = filenames.get(exportedFont.font)!;
            exportedFont.filename = filename;
        }
        return exportedFonts;
    }, error => {
        cancelled = true;
        throw error;
    });
};
