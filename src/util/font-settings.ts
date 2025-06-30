import {signal, Signal} from '@preact/signals';
import {SubsetName} from '../generated/subset-ranges';
import {AxisInfo, FeatureInfo, StyleKey, StyleValue, SubsetAxisInfo, SubsettedFont} from './font';
import {FontRef} from './messages';
import {parseRanges, parseUnicodeRanges} from './parse-ranges';
import CSSEmitter from './css-emitter';
import {ExportedFont} from '../app-state';
import {FEATURES} from '../generated/ot-features';

/**
 * Type of a variation axis setting mode.
 *
 * - `range`: The axis is a range, with a minimum and maximum value.
 * - `single`: The axis is a single value, with no range.
 * - `multiple`: The axis is instanced into multiple static values, which will be exported as multiple fonts.
 */
export type AxisSettingMode = 'range' | 'single' | 'multiple';

/**
 * Dynamic (UI) settings for a variation axis (whether one of the style axes or a custom one).
 */
export type AxisSetting = {
    /** Minimum value that this axis can take. */
    min: number;
    /** This axis's default value. */
    defaultValue: number;
    /** Maximum value that this axis can take. */
    max: number;
    /** Current minimum value that this axis will be exported with, in "range" mode. */
    curMin: Signal<number>;
    /** Current maximum value that this axis will be exported with, in "range" mode. */
    curMax: Signal<number>;
    /** Current single value that this axis will be exported with, in "single" mode. */
    curSingle: Signal<number>;
    /** Current multiple values that this axis will be exported with, in "multiple" mode. */
    curMultiValue: Signal<string>;
    /** Current mode of this axis. */
    mode: Signal<AxisSettingMode>;
};

export type FeatureMetadata = {
    name: string | null;
    description: string | null;
    required: boolean;
};

/**
 * Setting for a style value (weight, width, italic, slant) which can be either static or variable.
 */
export type StyleSetting = {
    type: 'single';
    value: number;
} | {
    type: 'variable';
    value: AxisSetting;
};

export type StyleSettings = Record<StyleKey, StyleSetting>;

type FeatureSetKey = 'features' | 'stylisticSets' | 'characterVariants';
type FeatureSettings = Record<FeatureSetKey, {feature: FeatureInfo; include: Signal<boolean>}[]>;

type IncludeCharactersSettings = {
    /** Toggles for the named Google Fonts character sets. */
    includeNamedSubsets: {name: SubsetName; include: Signal<boolean>}[];
    /** Custom Unicode ranges. */
    includeUnicodeRanges: Signal<string>;
    /** Ignore the other settings and include all characters found in the input. */
    includeAllCharacters: Signal<boolean>;
};

export type SubsetSettingsSignal = {
    /** Style settings for a font family that are shared between all fonts in the family. */
    styleSettings: Partial<StyleSettings>;
    axisSettings: {tag: string; name: string; range: AxisSetting}[];
    includeFeatures: FeatureSettings;
    includeCharacters: IncludeCharactersSettings;
};

export type FamilySettings = {
    name: string;
    /** Fonts in this family. */
    fonts: {
        font: FontRef;
        /** Style settings unique to this font within the broader family. */
        styleSettings: Partial<StyleSettings>;
    }[];
    settings: SubsetSettingsSignal;
    enableSubsetting: Signal<boolean>;
};

export type StaticAxisSetting = {
    curMin: number;
    curMax: number;
    curSingle: number;
    curMultiValue: string;
    mode: AxisSettingMode;
};

export type StaticStyleSetting = {
    type: 'single';
    value: number;
} | {
    type: 'variable';
    value: StaticAxisSetting;
};

export type StaticStyleSettings = Partial<Record<StyleKey, StaticStyleSetting>>;

type StaticAxisSettings = {tag: string; name: string; range: StaticAxisSetting}[];
type StaticFeatureSettings = Record<FeatureSetKey, {tag: string; include: boolean}[]>;

export type StaticSubsetSettings = {
    styleSettings: StaticStyleSettings;
    axisSettings: StaticAxisSettings;
    includeFeatures: StaticFeatureSettings;
    includeCharacters: {
        includeNamedSubsets: {name: SubsetName; include: boolean}[];
        includeUnicodeRanges: string;
        includeAllCharacters: boolean;
    };
};

export type StaticFamilySettings = {
    name: string;
    fonts: {
        fontUid: string;
        styleSettings: StaticStyleSettings;
    }[];
    settings: StaticSubsetSettings;
    enableSubsetting: boolean;
};

export type CopiedSettings =
    | {settings: StaticSubsetSettings; type: 'subsetSettingsV1'}
    | {settings: StaticStyleSettings; type: 'styleSettingsV1'}
    | {settings: StaticAxisSettings; type: 'axisSettingsV1'}
    | {settings: StaticFeatureSettings; type: 'featureSettingsV1'}
    | {
        settings: {
            includeNamedSubsets: {name: SubsetName; include: boolean}[];
            includeUnicodeRanges: string;
            includeAllCharacters: boolean;
        };
        type: 'includeCharactersSettingsV1';
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

export const settingsFromFonts = (fonts: FontRef[]): FamilySettings[] => {
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

    const styleValuesToSettings = (
        styleValues: Partial<Record<string, StyleValue>>,
        instanceValueSettings: Map<string, string>,
    ): Partial<StyleSettings> => {
        const styleSettings: Partial<StyleSettings> = {};
        for (const [styleName, styleValue] of Object.entries(styleValues)) {
            if (!styleValue) continue;
            let styleSetting: StyleSetting;
            switch (styleValue.type) {
                case 'single': {
                    styleSetting = {type: 'single', value: styleValue.value};
                    break;
                }
                case 'variable': {
                    const axis = {
                        weight: 'wght',
                        width: 'wdth',
                        italic: 'ital',
                        slant: 'slnt',
                    }[styleName];
                    styleSetting = {
                        type: 'variable',
                        value: {
                            min: styleValue.value.min,
                            defaultValue: styleValue.value.defaultValue,
                            max: styleValue.value.max,
                            curMin: signal(styleValue.value.min),
                            curMax: signal(styleValue.value.max),
                            curSingle: signal(styleValue.value.defaultValue),
                            curMultiValue: signal((axis && instanceValueSettings.get(axis)) ?? ''),
                            mode: signal('range'),
                        },
                    };
                    break;
                }
            }
            styleSettings[styleName as keyof StyleSettings] = styleSetting;
        }
        return styleSettings;
    };

    const familySettings: FamilySettings[] = [];
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
                let existingAxis = axes.get(axis.tag);
                if (existingAxis) {
                    axes.set(axis.tag, axisUnion(axis, existingAxis));
                } else {
                    existingAxis = axis;
                    axes.set(axis.tag, existingAxis);
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

        const instanceValueSettings = new Map<string, string>();
        for (const [tag, values] of axisInstanceValues.entries()) {
            const valuesArr = Array.from(values);
            if (tag === 'slnt') {
                // The comparator is backwards here--because a *negative* slant means italic, we want that to appear
                // later
                valuesArr.sort((a, b) => b - a);
            } else {
                valuesArr.sort((a, b) => a - b);
            }
            instanceValueSettings.set(tag, valuesArr.join(', '));
        }

        const axisSettings: {tag: string; name: string; range: AxisSetting}[] = [];
        for (const axis of axes.values()) {
            let instanceDefault = instanceValueSettings.get(axis.tag);
            if (!instanceDefault) {
                instanceDefault = `${axis.min}, ${axis.max}`;
            }
            axisSettings.push({
                tag: axis.tag,
                name: axis.name ?? axis.tag,
                range: {
                    min: axis.min,
                    defaultValue: axis.defaultValue,
                    max: axis.max,
                    curMin: signal(axis.min),
                    curMax: signal(axis.max),
                    curSingle: signal(axis.defaultValue),
                    curMultiValue: signal(instanceDefault),
                    mode: signal('range'),
                },
            });
        }

        const subsetToggles: {name: SubsetName; include: Signal<boolean>}[] = [];
        const sortedSubsets = Array.from(namedSubsets.values());
        sortedSubsets.sort((a, b) => a.localeCompare(b));
        for (const subsetName of sortedSubsets) {
            subsetToggles.push({name: subsetName, include: signal(true)});
        }

        const featureToggles: {feature: FeatureInfo; include: Signal<boolean>}[] = [];
        const stylisticSetToggles: {feature: FeatureInfo; include: Signal<boolean>}[] = [];
        const charVariantToggles: {feature: FeatureInfo; include: Signal<boolean>}[] = [];
        for (const feature of namedFeatures.values()) {
            if (featureMetadata(feature.tag).required) continue;
            const isNumeric = /(?:ss|cv)\d{2}/.test(feature.tag);
            const dest = isNumeric && feature.tag.slice(0, 2) === 'ss' ?
                stylisticSetToggles :
                isNumeric && feature.tag.slice(0, 2) === 'cv' ?
                    charVariantToggles :
                    featureToggles;
            dest.push({feature, include: signal(feature.keepByDefault)});
        }

        for (const featureSet of [stylisticSetToggles, charVariantToggles]) {
            featureSet.sort((a, b) => Number(a.feature.tag.slice(2)) - Number(b.feature.tag.slice(2)));
        }

        const sharedStyleSettings = styleValuesToSettings(sharedStyleValues!, instanceValueSettings);

        const fontsSettings = [];
        for (const font of processedFonts) {
            fontsSettings.push({
                font: font.font,
                styleSettings: styleValuesToSettings(font.uniqueStyleValues, instanceValueSettings),
            });
        }

        fontsSettings.sort((a, b) => {
            const getStyleSetting = (setting: 'weight' | 'width' | 'italic' | 'slant') => {
                const settingA = a.styleSettings[setting] ?? sharedStyleSettings[setting]!;
                const settingB = b.styleSettings[setting] ?? sharedStyleSettings[setting]!;
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
            settings: {
                styleSettings: sharedStyleSettings,
                axisSettings: axisSettings,
                includeFeatures: {
                    features: featureToggles,
                    stylisticSets: stylisticSetToggles,
                    characterVariants: charVariantToggles,
                },
                includeCharacters: {
                    includeNamedSubsets: subsetToggles,
                    includeUnicodeRanges: signal(''),
                    includeAllCharacters: signal(subsetToggles.length === 0),
                },
            },
            enableSubsetting: signal(true),
        });
    }
    return familySettings;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributiveOmit<T, K extends keyof any> = T extends any
    ? Omit<T, K>
    : never;

type SubsetAxisSetting = DistributiveOmit<SubsetAxisInfo, 'name'>;

type MultiSubsetAxis = SubsetAxisSetting | {
    type: 'multiple';
    tag: string;
    value: {ranges: (readonly [number, number] | number)[]; defaultValue: number};
};
export type SubsetSettings = {
    axisValues: SubsetAxisSetting[];
    features: Partial<Record<string, boolean>>;
    unicodeRanges: 'all' | {
        named: SubsetName[];
        custom: (readonly [number, number] | number)[];
    };
};

const axisRangeProduct = (axisRanges: MultiSubsetAxis[]) => {
    if (axisRanges.length === 0) {
        throw new Error('axisRangeProduct should be given at least one variable axis');
    }
    const iterIndices = [];
    const results: SubsetAxisSetting[][] = [];
    for (let i = 0; i < axisRanges.length; i++) {
        iterIndices.push(0);
    }

    outer:
    for (;;) {
        const current: SubsetAxisSetting[] = [];
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

export const makeSubsetSettings = (settings: FamilySettings[]): Map<number, (SubsetSettings | null)[]> => {
    const settingsByFont = new Map<number, (SubsetSettings | null)[]>();

    const axisSettingToValue = (axisSetting: {tag: string; range: AxisSetting}): MultiSubsetAxis => {
        switch (axisSetting.range.mode.value) {
            case 'single': return {
                type: 'single' as const,
                tag: axisSetting.tag,
                value: axisSetting.range.curSingle.value,
            };

            case 'range': return {
                type: 'variable' as const,
                tag: axisSetting.tag,
                value: {
                    min: axisSetting.range.curMin.value,
                    max: axisSetting.range.curMax.value,
                    defaultValue: axisSetting.range.defaultValue,
                },
            };

            case 'multiple': {
                const parsedRanges = parseRanges(axisSetting.range.curMultiValue.value);
                if (!parsedRanges) return {
                    type: 'single' as const,
                    tag: axisSetting.tag,
                    value: axisSetting.range.defaultValue,
                };

                return {
                    type: 'multiple' as const,
                    tag: axisSetting.tag,
                    value: {ranges: parsedRanges, defaultValue: axisSetting.range.defaultValue},
                };
            }
        }
    };

    const styleSettingToValue = (settingName: string, styleSetting: StyleSetting) => {
        if (styleSetting.type !== 'variable') return null;

        let axisTag;
        switch (settingName) {
            case 'weight': {
                axisTag = 'wght';
                break;
            }
            case 'width': {
                axisTag = 'wdth';
                break;
            }
            case 'italic': {
                axisTag = 'ital';
                break;
            }
            case 'slant': {
                axisTag = 'slnt';
                break;
            }
            default: {
                throw new Error(`Unhandled style setting name: ${settingName}`);
            }
        }

        return axisSettingToValue({tag: axisTag, range: styleSetting.value});
    };

    for (const family of settings) {
        for (const font of family.fonts) {
            if (!family.enableSubsetting.value) {
                settingsByFont.set(font.font.id, [null]);
                continue;
            }

            const axisValues = family.settings.axisSettings.map(axisSetting => axisSettingToValue(axisSetting));

            for (const [settingName, styleSetting] of Object.entries(family.settings.styleSettings)) {
                const styleValue = styleSettingToValue(settingName, styleSetting);
                if (styleValue) axisValues.push(styleValue);
            }

            for (const [settingName, styleSetting] of Object.entries(font.styleSettings)) {
                const styleValue = styleSettingToValue(settingName, styleSetting);
                if (styleValue) axisValues.push(styleValue);
            }

            const features: Partial<Record<string, boolean>> = {};
            for (const featureSettings of [
                family.settings.includeFeatures.features,
                family.settings.includeFeatures.characterVariants,
                family.settings.includeFeatures.stylisticSets,
            ]) {
                for (const feature of featureSettings) {
                    if (featureMetadata(feature.feature.tag).required) {
                        continue;
                    }
                    features[feature.feature.tag] = feature.include.value;
                }
            }

            let unicodeRanges;
            const charSettings = family.settings.includeCharacters;
            if (charSettings.includeAllCharacters.value) {
                unicodeRanges = 'all' as const;
            } else {
                const named: SubsetName[] = [];
                for (const namedSubset of charSettings.includeNamedSubsets) {
                    if (namedSubset.include.value) {
                        named.push(namedSubset.name);
                    }
                }
                unicodeRanges = {
                    named,
                    custom: parseUnicodeRanges(charSettings.includeUnicodeRanges.value) ?? [],
                };
            }

            const flattenedSettings = axisValues.length > 0 ? axisRangeProduct(axisValues).map(axisValues => ({
                axisValues,
                features,
                unicodeRanges,
            })) : [{
                axisValues: [],
                features,
                unicodeRanges,
            }];

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

export const fontFilenames = (fonts: SubsettedFont[]) => {
    const varyingAxesByFamily = findVaryingAxes(fonts);

    const filenames = new Map<SubsettedFont, string>();
    for (const font of fonts) {
        const varyingInfo = varyingAxesByFamily.get(font.familyName)!;
        filenames.set(font, fontFilename(font, varyingInfo.varyingAxes, varyingInfo.varyingStyleValues));
    }

    return filenames;
};

const roundDecimal = (v: number) => Math.round(v * 1000) / 1000;

const fontFilename = (
    font: SubsettedFont,
    varyingAxes: Set<string>,
    styleValuesVary: {weight: boolean; width: boolean; italic: boolean; slant: boolean},
) => {
    const {weight, width, italic, slant} = font.styleValues;

    // Don't include the subfamily name; the axis values should serve the same purpose
    const familyName = font.familyName.replace(STYLE_SUBFAMILY_END_REGEX, '').replaceAll(' ', '');
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


    filename = filename.replace(/[\x00-\x1f\x80-\x9f/\\?<>:*|"]/g, '_');

    return filename;
};

export const settingsToCSS = (
    fonts: ExportedFont[],
    fontPathPrefix: string,
    includeUncompressed: boolean,
): CSSEmitter => {
    const emitter = new CSSEmitter();

    if (fontPathPrefix.length > 0 && !fontPathPrefix.endsWith('/')) {
        fontPathPrefix += '/';
    }

    for (const {font, data, filename} of fonts) {
        emitter.atRule('@font-face');

        emitter.declaration('font-family');
        emitter.string(font.familyName);
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
        for (const format of ['opentype', 'woff', 'woff2'] as const) {
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

        emitter.endRule();
    }

    return emitter;
};

const saveAxisSetting = (axis: AxisSetting): StaticAxisSetting => {
    return {
        curMin: axis.curMin.value,
        curMax: axis.curMax.value,
        curSingle: axis.curSingle.value,
        curMultiValue: axis.curMultiValue.value,
        mode: axis.mode.value,
    };
};
const saveStyleSetting = (setting: StyleSetting): StaticStyleSetting => {
    if (setting.type === 'single') {
        return setting;
    }
    return {
        type: 'variable',
        value: saveAxisSetting(setting.value),
    };
};
const saveStyleSettings = (settings: Partial<StyleSettings>): StaticStyleSettings => {
    const styleSettings: StaticStyleSettings = {};
    for (const key of ['weight', 'width', 'italic', 'slant'] as const) {
        if (settings[key]) {
            styleSettings[key] = saveStyleSetting(settings[key]);
        }
    }
    return styleSettings;
};

export const saveSubsetSettings = (settings: SubsetSettingsSignal): StaticSubsetSettings => {
    const saveIncludeFeatures = (features: {feature: FeatureInfo; include: Signal<boolean>}[]) => {
        return features.map(({feature, include}) => ({tag: feature.tag, include: include.value}));
    };

    return {
        styleSettings: saveStyleSettings(settings.styleSettings),
        axisSettings: settings.axisSettings
            .map(({tag, name, range}) => ({tag, name, range: saveAxisSetting(range)})),
        includeFeatures: {
            features: saveIncludeFeatures(settings.includeFeatures.features),
            stylisticSets: saveIncludeFeatures(settings.includeFeatures.stylisticSets),
            characterVariants: saveIncludeFeatures(settings.includeFeatures.characterVariants),
        },
        includeCharacters: {
            includeNamedSubsets: settings.includeCharacters.includeNamedSubsets
                .map(({name, include}) => ({name, include: include.value})),
            includeUnicodeRanges: settings.includeCharacters.includeUnicodeRanges.value,
            includeAllCharacters: settings.includeCharacters.includeAllCharacters.value,
        },
    };
};

export const saveSettings = (settings: FamilySettings): StaticFamilySettings => {
    const fonts = [];
    for (const {font, styleSettings} of settings.fonts) {
        fonts.push({fontUid: font.uid, styleSettings: saveStyleSettings(styleSettings)});
    }

    return {
        name: settings.name,
        fonts,
        settings: saveSubsetSettings(settings.settings),
        enableSubsetting: settings.enableSubsetting.value,
    };
};

const loadAxisSetting = (dest: AxisSetting, axis: StaticAxisSetting) => {
    dest.curMin.value = Math.max(axis.curMin, dest.min);
    dest.curMax.value = Math.min(axis.curMax, dest.max);
    dest.curSingle.value = Math.max(dest.min, Math.min(axis.curSingle, dest.max));
    dest.curMultiValue.value = axis.curMultiValue;
    dest.mode.value = axis.mode;
};
const loadAxisSettings = (
    dest: {tag: string; name: string; range: AxisSetting}[],
    settings: StaticAxisSettings,
) => {
    for (const {tag, range} of settings) {
        const destSetting = dest.find(({tag: destTag}) => destTag === tag);
        if (!destSetting) continue;
        loadAxisSetting(destSetting.range, range);
    }
};
const loadStyleSetting = (dest: StyleSetting, setting: StaticStyleSetting) => {
    if (dest.type === 'single') return;

    if (setting.type === 'single') {
        dest.value.curSingle.value = Math.max(dest.value.min, Math.min(setting.value, dest.value.max));
        dest.value.mode.value = 'single';
    } else {
        loadAxisSetting(dest.value, setting.value);
    }
};
const loadStyleSettings = (dest: Partial<StyleSettings>, settings: StaticStyleSettings) => {
    for (const key of ['weight', 'width', 'italic', 'slant'] as const) {
        if (!dest[key] || !settings[key]) continue;
        loadStyleSetting(dest[key], settings[key]);
    }
};
const loadIncludeFeatures = (
    dest: {feature: FeatureInfo; include: Signal<boolean>}[],
    features: {tag: string; include: boolean}[],
) => {
    for (const {tag, include} of features) {
        // O(n^2), but fonts don't have *that* many features...
        const destFeature = dest.find(({feature: destInfo}) => destInfo.tag === tag);
        if (!destFeature || featureMetadata(destFeature.feature.tag).required) continue;
        destFeature.include.value = include;
    }
};
const loadNamedSubsets = (
    dest: {name: SubsetName; include: Signal<boolean>}[],
    namedSubsets: {name: SubsetName; include: boolean}[],
) => {
    for (const {name, include} of namedSubsets) {
        // O(n^2), but fonts don't have *that* many features...
        const destSubset = dest.find(({name: destName}) => destName === name);
        if (!destSubset) continue;
        destSubset.include.value = include;
    }
};
const loadIncludeCharacters = (dest: {
    includeNamedSubsets: {name: SubsetName; include: Signal<boolean>}[];
    includeUnicodeRanges: Signal<string>;
    includeAllCharacters: Signal<boolean>;
}, settings: {
    includeNamedSubsets: {name: SubsetName; include: boolean}[];
    includeUnicodeRanges: string;
    includeAllCharacters: boolean;
}) => {
    loadNamedSubsets(dest.includeNamedSubsets, settings.includeNamedSubsets);
    dest.includeUnicodeRanges.value = settings.includeUnicodeRanges;
    dest.includeAllCharacters.value = settings.includeAllCharacters;
};
export const loadSubsetSettings = (dest: SubsetSettingsSignal, settings: StaticSubsetSettings) => {
    loadStyleSettings(dest.styleSettings, settings.styleSettings);
    loadAxisSettings(dest.axisSettings, settings.axisSettings);
    loadIncludeFeatures(dest.includeFeatures.features, settings.includeFeatures.features);
    loadIncludeFeatures(dest.includeFeatures.stylisticSets, settings.includeFeatures.stylisticSets);
    loadIncludeFeatures(
        dest.includeFeatures.characterVariants, settings.includeFeatures.characterVariants);
    loadIncludeCharacters(dest.includeCharacters, settings.includeCharacters);
};

export const loadSettings = (dest: FamilySettings, settings: StaticFamilySettings) => {
    loadSubsetSettings(dest.settings, settings.settings);
    for (const {font, styleSettings} of dest.fonts) {
        // Load/paste the family-wide style settings first
        loadStyleSettings(styleSettings, settings.settings.styleSettings);
        const srcFont = settings.fonts
            .find(({fontUid}) => fontUid === font.uid);
        if (!srcFont) continue;
        loadStyleSettings(styleSettings, srcFont.styleSettings);
    };
    dest.enableSubsetting.value = settings.enableSubsetting;
};

export const copySubsetSettings = (settings: FamilySettings): CopiedSettings => {
    return {
        settings: saveSubsetSettings(settings.settings),
        type: 'subsetSettingsV1',
    };
};

export const copyStyleSettings = (settings: Partial<StyleSettings>): CopiedSettings => {
    return {
        settings: saveStyleSettings(settings),
        type: 'styleSettingsV1',
    };
};

export const copyAxisSettings = (settings: {tag: string; name: string; range: AxisSetting}[]): CopiedSettings => {
    return {
        settings: settings.map(({tag, name, range}) => ({
            tag,
            name,
            range: saveAxisSetting(range),
        })),
        type: 'axisSettingsV1',
    };
};

export const copyFeatureSettings = (settings: FeatureSettings): CopiedSettings => {
    return {
        settings: {
            features: settings.features.map(({feature, include}) => ({
                tag: feature.tag,
                include: include.value,
            })),
            stylisticSets: settings.stylisticSets.map(({feature, include}) => ({
                tag: feature.tag,
                include: include.value,
            })),
            characterVariants: settings.characterVariants.map(({feature, include}) => ({
                tag: feature.tag,
                include: include.value,
            })),
        },
        type: 'featureSettingsV1',
    };
};

export const copyIncludeCharactersSettings = (settings: IncludeCharactersSettings): CopiedSettings => {
    return {
        settings: {
            includeNamedSubsets: settings.includeNamedSubsets.map(({name, include}) => ({
                name,
                include: include.value,
            })),
            includeUnicodeRanges: settings.includeUnicodeRanges.value,
            includeAllCharacters: settings.includeAllCharacters.value,
        },
        type: 'includeCharactersSettingsV1',
    };
};

export const pasteSubsetSettings = (dest: FamilySettings, settings: CopiedSettings) => {
    switch (settings.type) {
        case 'subsetSettingsV1': {
            loadSubsetSettings(dest.settings, settings.settings);
            break;
        }
        case 'styleSettingsV1': {
            loadStyleSettings(dest.settings.styleSettings, settings.settings);
            for (const font of dest.fonts) {
                loadStyleSettings(font.styleSettings, settings.settings);
            }
            break;
        }
        case 'axisSettingsV1': {
            loadAxisSettings(dest.settings.axisSettings, settings.settings);
            break;
        }
        case 'featureSettingsV1': {
            loadIncludeFeatures(dest.settings.includeFeatures.features, settings.settings.features);
            loadIncludeFeatures(dest.settings.includeFeatures.stylisticSets, settings.settings.stylisticSets);
            loadIncludeFeatures(
                dest.settings.includeFeatures.characterVariants, settings.settings.characterVariants);
            break;
        }
    }
};

export const pasteStyleSettings = (dest: Partial<StyleSettings>, settings: CopiedSettings) => {
    switch (settings.type) {
        case 'subsetSettingsV1': {
            loadStyleSettings(dest, settings.settings.styleSettings);
            break;
        }
        case 'styleSettingsV1': {
            loadStyleSettings(dest, settings.settings);
            break;
        }
    }
};

export const pasteAxisSettings = (
    dest: {tag: string; name: string; range: AxisSetting}[],
    settings: CopiedSettings,
) => {
    switch (settings.type) {
        case 'subsetSettingsV1': {
            loadAxisSettings(dest, settings.settings.axisSettings);
            break;
        }
        case 'axisSettingsV1': {
            loadAxisSettings(dest, settings.settings);
            break;
        }
    }
};

export const pasteFeatureSettings = (dest: FeatureSettings, settings: CopiedSettings) => {
    switch (settings.type) {
        case 'subsetSettingsV1': {
            loadIncludeFeatures(dest.features, settings.settings.includeFeatures.features);
            loadIncludeFeatures(dest.stylisticSets,
                settings.settings.includeFeatures.stylisticSets);
            loadIncludeFeatures(
                dest.characterVariants, settings.settings.includeFeatures.characterVariants);
            break;
        }
        case 'featureSettingsV1': {
            loadIncludeFeatures(dest.features, settings.settings.features);
            loadIncludeFeatures(dest.stylisticSets, settings.settings.stylisticSets);
            loadIncludeFeatures(
                dest.characterVariants, settings.settings.characterVariants);
            break;
        }
    }
};

export const pasteIncludeCharactersSettings = (
    dest: IncludeCharactersSettings,
    settings: CopiedSettings,
) => {
    switch (settings.type) {
        case 'subsetSettingsV1': {
            loadIncludeCharacters(dest, settings.settings.includeCharacters);
            break;
        }
        case 'includeCharactersSettingsV1': {
            loadIncludeCharacters(dest, settings.settings);
            break;
        }
    }
};

const featureMetadataMemo = new Map<string, FeatureMetadata>();
export const featureMetadata = (tag: string): FeatureMetadata => {
    const cached = featureMetadataMemo.get(tag);
    if (cached) return cached;
    const metadata = Object.prototype.hasOwnProperty.call(FEATURES, tag) ?
        FEATURES[tag as keyof typeof FEATURES] :
        null;

    let featureName: string | null;
    switch (tag.slice(0, 2)) {
        case 'ss': {
            featureName = `Stylistic Set ${Number(tag.slice(2))}`;
            break;
        }
        case 'cv': {
            featureName = `Character Variant ${Number(tag.slice(2))}`;
            break;
        }
        default: {
            featureName = metadata?.title ?? null;
        }
    }

    const featureInfo: FeatureMetadata = {
        name: featureName,
        description: metadata?.description ?? '',
        required: metadata?.state === 'required',
    };
    featureMetadataMemo.set(tag, featureInfo);
    return featureInfo;
};
