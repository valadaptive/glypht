import {signal, Signal} from '@preact/signals';
import type {FeatureInfo, FontRef, StyleKey, StyleValues, SubsetName} from '@glypht/core/subsetting.js';
import {FamilyInfo, sortFontsIntoFamilies} from '@glypht/bundler';
import {featureMetadata} from '@glypht/bundler/feature-metadata.js';

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
export type AxisSettingState = {
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

/**
 * Setting for a style value (weight, width, italic, slant) which can be either static or variable.
 */
export type StyleSettingState = {
    type: 'single';
    value: number;
} | {
    type: 'variable';
    value: AxisSettingState;
};

export type StyleSettingsState = Record<StyleKey, StyleSettingState>;

export type FeatureSetKey = 'features' | 'stylisticSets' | 'characterVariants';
export type FeatureSettingsState = Record<FeatureSetKey, {feature: FeatureInfo; include: Signal<boolean>}[]>;

export type IncludeCharactersSettingsState = {
    /** Ignore the other settings and include all characters found in the input. */
    includeAllCharacters: Signal<boolean>;
    characterSets: Signal<CharacterSetSettingsState[]>;
};

export type CharacterSetSettingsState = {
    /** Toggles for the named Google Fonts character sets. */
    includeNamedSubsets: {name: SubsetName; include: Signal<boolean>}[];
    /** Custom Unicode ranges. */
    includeUnicodeRanges: Signal<string>;
    /** The custom name of this character set, used in font filenames and CSS comments. */
    name: Signal<string>;
};

export type SubsetSettingsState = {
    /** Style settings for a font family that are shared between all fonts in the family. */
    styleSettings: Partial<StyleSettingsState>;
    axisSettings: {tag: string; name: string; range: AxisSettingState}[];
    includeFeatures: FeatureSettingsState;
    includeCharacters: IncludeCharactersSettingsState;
};

export type FamilySettingsState = {
    name: string;
    /** Fonts in this family. */
    fonts: {
        font: FontRef;
        /** Style settings unique to this font within the broader family. */
        styleSettings: Partial<StyleSettingsState>;
        /** This font's original filename. */
        filename: string;
    }[];
    settings: SubsetSettingsState;
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
    } | {
        includeAllCharacters: boolean;
        characterSets: {
            includeNamedSubsets: {name: SubsetName; include: boolean}[];
            includeUnicodeRanges: string;
            name: string;
        }[];
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
    } | {
        settings: {
            includeAllCharacters: boolean;
            characterSets: {
                includeNamedSubsets: {name: SubsetName; include: boolean}[];
                includeUnicodeRanges: string;
                name: string;
            }[];
        };
        type: 'includeCharactersSettingsV2';
    };

export const settingsFromFonts = (fonts: {font: FontRef; filename: string}[]): FamilySettingsState[] => {
    const instanceValuesSetting = (
        axis: Omit<FamilyInfo['axes'][number], 'name'>,
        axisInstanceValues: FamilyInfo['axisInstanceValues'],
    ): string => {
        if (Object.prototype.hasOwnProperty.call(axisInstanceValues, axis.tag)) {
            const instanceValues = axisInstanceValues[axis.tag]!;
            if (instanceValues.length > 0) return instanceValues.map(v => roundDecimal(v)).join(', ');
        }
        return `${roundDecimal(axis.min)}, ${roundDecimal(axis.max)}`;
    };

    const styleValuesToSettings = (
        styleValues: Partial<StyleValues>,
        axisInstanceValues: FamilyInfo['axisInstanceValues'],
    ): Partial<StyleSettingsState> => {
        const styleSettings: Partial<StyleSettingsState> = {};
        for (const [styleName, styleValue] of Object.entries(styleValues)) {
            let styleSetting: StyleSettingState;
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
                            curMultiValue: signal(axis ?
                                instanceValuesSetting({tag: axis, ...styleValue.value}, axisInstanceValues) :
                                ''),
                            mode: signal('range'),
                        },
                    };
                    break;
                }
            }
            styleSettings[styleName as keyof StyleSettingsState] = styleSetting;
        }
        return styleSettings;
    };

    const filenames = new Map<FontRef, string>();
    for (const {font, filename} of fonts) {
        filenames.set(font, filename);
    }

    return sortFontsIntoFamilies(fonts.map(({font}) => font)).map(family => {
        const includeFeatures: FeatureSettingsState = {
            features: [],
            stylisticSets: [],
            characterVariants: [],
        };
        for (const feature of family.features) {
            if (featureMetadata(feature.tag).required) continue;
            const isNumeric = /(?:ss|cv)\d{2}/.test(feature.tag);
            const dest = isNumeric && feature.tag.slice(0, 2) === 'ss' ?
                includeFeatures.stylisticSets :
                isNumeric && feature.tag.slice(0, 2) === 'cv' ?
                    includeFeatures.characterVariants :
                    includeFeatures.features;
            dest.push({feature, include: signal(feature.keepByDefault)});
        }

        return {
            name: family.name,
            fonts: family.fonts.map(({font, styleValues}) => ({
                font,
                styleSettings: styleValuesToSettings(styleValues, family.axisInstanceValues),
                filename: filenames.get(font)!,
            })),
            settings: {
                styleSettings: styleValuesToSettings(family.styleValues, family.axisInstanceValues),
                axisSettings: family.axes.map(axis => {
                    return {
                        tag: axis.tag,
                        name: axis.name ?? axis.tag,
                        range: {
                            min: axis.min,
                            defaultValue: axis.defaultValue,
                            max: axis.max,
                            curMin: signal(axis.min),
                            curMax: signal(axis.max),
                            curSingle: signal(axis.defaultValue),
                            curMultiValue: signal(instanceValuesSetting(axis, family.axisInstanceValues)),
                            mode: signal('range'),
                        },
                    };
                }),
                includeFeatures,
                includeCharacters: {
                    includeAllCharacters: signal(false),
                    characterSets: signal([{
                        includeNamedSubsets: family.namedSubsets.map(name => ({name, include: signal(true)})),
                        includeUnicodeRanges: signal(''),
                        name: signal(''),
                    }]),
                },
            },
            enableSubsetting: signal(true),
        } satisfies FamilySettingsState;
    });
};

const roundDecimal = (v: number) => Math.round(v * 1000) / 1000;

const saveAxisSetting = (axis: AxisSettingState): StaticAxisSetting => {
    return {
        curMin: axis.curMin.value,
        curMax: axis.curMax.value,
        curSingle: axis.curSingle.value,
        curMultiValue: axis.curMultiValue.value,
        mode: axis.mode.value,
    };
};
const saveStyleSetting = (setting: StyleSettingState): StaticStyleSetting => {
    if (setting.type === 'single') {
        return setting;
    }
    return {
        type: 'variable',
        value: saveAxisSetting(setting.value),
    };
};
const saveStyleSettings = (settings: Partial<StyleSettingsState>): StaticStyleSettings => {
    const styleSettings: StaticStyleSettings = {};
    for (const key of ['weight', 'width', 'italic', 'slant'] as const) {
        if (settings[key]) {
            styleSettings[key] = saveStyleSetting(settings[key]);
        }
    }
    return styleSettings;
};

export const saveSubsetSettings = (settings: SubsetSettingsState): StaticSubsetSettings => {
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
            includeAllCharacters: settings.includeCharacters.includeAllCharacters.value,
            characterSets: settings.includeCharacters.characterSets.value.map(({
                includeNamedSubsets,
                includeUnicodeRanges,
                name,
            }) => ({
                includeNamedSubsets: includeNamedSubsets.map(({name, include}) => ({name, include: include.value})),
                includeUnicodeRanges: includeUnicodeRanges.value,
                name: name.value,
            })),
        },
    };
};

export const saveSettings = (settings: FamilySettingsState): StaticFamilySettings => {
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

const loadAxisSetting = (dest: AxisSettingState, axis: StaticAxisSetting) => {
    dest.curMin.value = Math.max(axis.curMin, dest.min);
    dest.curMax.value = Math.min(axis.curMax, dest.max);
    dest.curSingle.value = Math.max(dest.min, Math.min(axis.curSingle, dest.max));
    dest.curMultiValue.value = axis.curMultiValue;
    dest.mode.value = axis.mode;
};
const loadAxisSettings = (
    dest: {tag: string; name: string; range: AxisSettingState}[],
    settings: StaticAxisSettings,
) => {
    for (const {tag, range} of settings) {
        const destSetting = dest.find(({tag: destTag}) => destTag === tag);
        if (!destSetting) continue;
        loadAxisSetting(destSetting.range, range);
    }
};
const loadStyleSetting = (dest: StyleSettingState, setting: StaticStyleSetting) => {
    if (dest.type === 'single') return;

    if (setting.type === 'single') {
        dest.value.curSingle.value = Math.max(dest.value.min, Math.min(setting.value, dest.value.max));
        dest.value.mode.value = 'single';
    } else {
        loadAxisSetting(dest.value, setting.value);
    }
};
const loadStyleSettings = (dest: Partial<StyleSettingsState>, settings: StaticStyleSettings) => {
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
const loadCharacterSetSettings = (settings: {
    includeNamedSubsets: {name: SubsetName; include: boolean}[];
    includeUnicodeRanges: string;
    name?: string;
}): CharacterSetSettingsState => {
    const destCharacterSet: CharacterSetSettingsState = {
        includeNamedSubsets: [],
        includeUnicodeRanges: signal(settings.includeUnicodeRanges),
        name: signal(settings.name ?? ''),
    };

    loadNamedSubsets(destCharacterSet.includeNamedSubsets, settings.includeNamedSubsets);
    return destCharacterSet;
};
const loadIncludeCharacters = (
    dest: IncludeCharactersSettingsState,
    settings: StaticSubsetSettings['includeCharacters'],
) => {
    dest.includeAllCharacters.value = settings.includeAllCharacters;
    if ('characterSets' in settings) {
        settings.characterSets.map(charSet => loadCharacterSetSettings(charSet));
    } else {
        dest.characterSets.value = [loadCharacterSetSettings(settings)];
    }
};
export const loadSubsetSettings = (dest: SubsetSettingsState, settings: StaticSubsetSettings) => {
    loadStyleSettings(dest.styleSettings, settings.styleSettings);
    loadAxisSettings(dest.axisSettings, settings.axisSettings);
    loadIncludeFeatures(dest.includeFeatures.features, settings.includeFeatures.features);
    loadIncludeFeatures(dest.includeFeatures.stylisticSets, settings.includeFeatures.stylisticSets);
    loadIncludeFeatures(
        dest.includeFeatures.characterVariants, settings.includeFeatures.characterVariants);
    loadIncludeCharacters(dest.includeCharacters, settings.includeCharacters);
};

export const loadSettings = (dest: FamilySettingsState, settings: StaticFamilySettings) => {
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

export const copySubsetSettings = (settings: FamilySettingsState): CopiedSettings => {
    return {
        settings: saveSubsetSettings(settings.settings),
        type: 'subsetSettingsV1',
    };
};

export const copyStyleSettings = (settings: Partial<StyleSettingsState>): CopiedSettings => {
    return {
        settings: saveStyleSettings(settings),
        type: 'styleSettingsV1',
    };
};

export const copyAxisSettings = (settings: {tag: string; name: string; range: AxisSettingState}[]): CopiedSettings => {
    return {
        settings: settings.map(({tag, name, range}) => ({
            tag,
            name,
            range: saveAxisSetting(range),
        })),
        type: 'axisSettingsV1',
    };
};

export const copyFeatureSettings = (settings: FeatureSettingsState): CopiedSettings => {
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

export const copyIncludeCharactersSettings = (settings: IncludeCharactersSettingsState): CopiedSettings => {
    return {
        settings: {
            includeAllCharacters: settings.includeAllCharacters.value,
            characterSets: settings.characterSets.value.map(({includeNamedSubsets, includeUnicodeRanges, name}) => ({
                includeNamedSubsets: includeNamedSubsets.map(({name, include}) => ({name, include: include.value})),
                includeUnicodeRanges: includeUnicodeRanges.value,
                name: name.value,
            })),
        },
        type: 'includeCharactersSettingsV2',
    };
};

export const pasteSubsetSettings = (dest: FamilySettingsState, settings: CopiedSettings) => {
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

export const pasteStyleSettings = (dest: Partial<StyleSettingsState>, settings: CopiedSettings) => {
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
    dest: {tag: string; name: string; range: AxisSettingState}[],
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

export const pasteFeatureSettings = (dest: FeatureSettingsState, settings: CopiedSettings) => {
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
    dest: IncludeCharactersSettingsState,
    settings: CopiedSettings,
) => {
    switch (settings.type) {
        case 'subsetSettingsV1': {
            loadIncludeCharacters(dest, settings.settings.includeCharacters);
            break;
        }
        case 'includeCharactersSettingsV1':
        case 'includeCharactersSettingsV2': {
            loadIncludeCharacters(dest, settings.settings);
            break;
        }
    }
};
