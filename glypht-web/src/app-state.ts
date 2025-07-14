import {computed, signal, Signal} from '@preact/signals';
import {createContext} from 'preact';
import {useContext} from 'preact/hooks';
import {FontRef, GlyphtContext, StyleKey, SubsetName} from '@glypht/core/subsetting.js';
import {
    ExportedFont,
    exportFonts,
    FamilySettings,
    parseRanges,
    parseUnicodeRanges,
    SubsetAxisSetting,
} from '@glypht/bundler';
import {WoffCompressionContext} from '@glypht/core/compression.js';

import {
    AxisSettingState,
    CharacterSetSettingsState,
    FamilySettingsState,
    loadSettings,
    saveSettings,
    settingsFromFonts,
    StaticFamilySettings,
    StyleSettingsState,
} from './util/font-settings';
import {FamilyProto, LanguageProto} from './generated/google-fonts-types';

export type FontDataState =
    | {state: 'not_loaded'}
    | {state: 'loading'; progress: number}
    | {state: 'loaded'; families: FamilySettingsState[]}
    | {state: 'error'; error: unknown};

export type FontExportState =
    | {state: 'not_loaded'}
    | {state: 'loading'; progress: number}
    | {state: 'loaded';  exportedFonts: ExportedFont[]; exportedFormats: {ttf: boolean; woff: boolean; woff2: boolean}}
    | {state: 'error'; error: unknown};

type AllSavedSettings = {
    familySettings: StaticFamilySettings[];
    cssPathPrefix: string;
    exportSettings: {
        formats: {
            ttf: boolean;
            woff: boolean;
            woff2: boolean;
        };
        woffCompression: number;
        woff2Compression: number;
        includeTTFinCSS: boolean;
    };
    type: 'AllSettingsV1';
};

const compressionContext = new WoffCompressionContext();
const glyphtContext = new GlyphtContext();

export class AppState {
    public fonts: Signal<FamilySettingsState[]> = signal([]);
    public fontsBeingLoaded = signal(0);

    private _exportedFonts: Signal<FontExportState> = signal({state: 'not_loaded'});
    public exportedFonts = computed(() => this._exportedFonts.value);

    public exportSettings = {
        formats: {
            ttf: signal(true),
            woff: signal(false),
            woff2: signal(true),
        },
        // The default in sfnt2woff-zopfli is 15, but there does not seem to be any difference in output size
        woffCompression: signal(1),
        woff2Compression: signal(11),
        includeTTFinCSS: signal(true),
    };

    public cssPathPrefix = signal('');

    public googleFontsModalState: {
        open: Signal<boolean>;
        state: Signal<
            | {state: 'not_loaded'}
            | {state: 'loading'}
            | {
                state: 'loaded';
                fontsList: FamilyProto[];
                langList: LanguageProto[];
            }
            | {state: 'error'; error: unknown}
        >;
        searchValue: Signal<string>;
        searchFilters: {
            monospace: Signal<boolean>;
            proportional: Signal<boolean>;
            sansSerif: Signal<boolean>;
            serif: Signal<boolean>;
            noClassification: Signal<boolean>;
            display: Signal<boolean>;
            handwriting: Signal<boolean>;
            symbols: Signal<boolean>;
        };
        previewedFamily: Signal<FamilyProto | null>;
    } = {
            open: signal(false),
            state: signal({state: 'not_loaded'}),
            searchValue: signal(''),
            previewedFamily: signal(null),
            searchFilters: {
                monospace: signal(true),
                proportional: signal(true),
                sansSerif: signal(true),
                serif: signal(true),
                noClassification: signal(true),
                display: signal(true),
                handwriting: signal(true),
                symbols: signal(true),
            },
        };

    constructor() {}

    async removeFontFamily(family: FamilySettingsState) {
        this.fonts.value = this.fonts.value.filter(f => f !== family);
        await Promise.all(family.fonts.map(({font}) => font.destroy()));
    }

    async removeFont(font: FontRef) {
        const familyIndex = this.fonts.peek()
            .findIndex(family => family.fonts.some(otherFont => otherFont.font.id === font.id));
        if (familyIndex === -1) return;
        const family = this.fonts.peek()[familyIndex];
        const fonts = [];
        for (const fontSettings of family.fonts) {
            if (fontSettings.font.id !== font.id) {
                fonts.push(fontSettings.font);
            }
        }
        if (fonts.length === 0) {
            return await this.removeFontFamily(family);
        }

        const newFamilies = this.fonts.peek().slice(0);
        // Removing a font from a family may split/merge some style settings, so recreate them
        const newSettings = settingsFromFonts(fonts);
        for (const newFamily of newSettings) {
            loadSettings(newFamily, saveSettings(family));
        }
        newFamilies.splice(familyIndex, 1, ...newSettings);

        this.fonts.value = newFamilies;

        return await font.destroy();
    }

    async addFonts(fonts: Blob[]) {
        this.fontsBeingLoaded.value += fonts.length;
        try {
            const fontData = await Promise.all(fonts.map(font => font.arrayBuffer().then(ab => new Uint8Array(ab))));

            const decompressionPromises = [];
            for (let i = 0; i < fontData.length; i++) {
                const compressionType = WoffCompressionContext.compressionType(fontData[i]);
                if (compressionType !== null) {
                    decompressionPromises.push(
                        compressionContext.decompressToTTF(fontData[i]).then(decompressed => {
                            fontData[i] = decompressed;
                        }));
                }
            }

            // TODO: rework font loading progress so decompression counts towards it
            if (decompressionPromises.length > 0) await Promise.all(decompressionPromises);

            const addedFonts = await glyphtContext.loadFonts(fontData);

            const existingFonts = this.fonts.peek().flatMap(family => family.fonts.map(f => f.font));
            const existingFontIds = new Set(existingFonts.map(f => f.uid));
            const duplicateFonts = [];
            for (const addedFont of addedFonts) {
                if (existingFontIds.has(addedFont.uid)) {
                    duplicateFonts.push(addedFont);
                } else {
                    existingFonts.push(addedFont);
                }
            }

            const existingSettings = new Map<string, StaticFamilySettings>();
            for (const family of this.fonts.peek()) {
                existingSettings.set(family.name, saveSettings(family));
            }

            const newSettings = settingsFromFonts(existingFonts);
            for (const newFamily of newSettings) {
                const existingSetting = existingSettings.get(newFamily.name);
                if (existingSetting) {
                    loadSettings(newFamily, existingSetting);
                }
            }
            this.fonts.value = newSettings;

            if (duplicateFonts.length > 0) {
                await Promise.all(duplicateFonts.map(font => font.destroy()));
            }
        } finally {
            this.fontsBeingLoaded.value -= fonts.length;
        }
    }

    addCharacterSet(familySettings: FamilySettingsState) {
        const {characterSets} = familySettings.settings.includeCharacters;
        const templateSet = characterSets.value[0];
        const newSet: CharacterSetSettingsState = {
            includeNamedSubsets: templateSet.includeNamedSubsets.map(({name}) => ({name, include: signal(false)})),
            includeUnicodeRanges: signal(''),
            name: signal(''),
        };
        characterSets.value = [...characterSets.value, newSet];
    }

    removeCharacterSet(familySettings: FamilySettingsState, characterSet: CharacterSetSettingsState) {
        const {characterSets} = familySettings.settings.includeCharacters;
        characterSets.value = characterSets.value.filter(s => s !== characterSet);
    }

    exportFonts() {
        const axisSettingStateToSetting = (state: AxisSettingState): SubsetAxisSetting => {
            switch (state.mode.value) {
                case 'single': return {
                    type: 'single',
                    value: state.curSingle.value,
                };
                case 'range': return {
                    type: 'variable',
                    value: {
                        min: state.curMin.value,
                        max: state.curMax.value,
                        defaultValue: state.defaultValue,
                    },
                };
                case 'multiple': {
                    const parsedRanges = parseRanges(state.curMultiValue.value);
                    if (!parsedRanges) return {
                        type: 'single' as const,
                        value: state.defaultValue,
                    };
                    return {
                        type: 'multiple' as const,
                        value: {ranges: parsedRanges, defaultValue: state.defaultValue},
                    };
                }
            }
        };
        const styleSettingsStateToSettings = (state: Partial<StyleSettingsState>):
        Partial<Record<StyleKey, SubsetAxisSetting>> => {
            const styleSettings: Partial<Record<StyleKey, SubsetAxisSetting>> = {};
            for (const [styleKey, styleValue] of Object.entries(state)) {
                styleSettings[styleKey as StyleKey] = styleValue.type === 'single' ?
                    styleValue :
                    axisSettingStateToSetting(styleValue.value);
            }
            return styleSettings;
        };

        const exportSettings: FamilySettings[] = this.fonts.peek().map(family => {
            const fonts = family.fonts.map(({font, styleSettings}) => {
                return {
                    font,
                    styleValues: styleSettingsStateToSettings(styleSettings),
                };
            });
            if (!family.enableSubsetting.value) {
                return {fonts, enableSubsetting: false} satisfies FamilySettings;
            }
            const axes: Partial<Record<string, SubsetAxisSetting>> = {};
            for (const axisSettingState of family.settings.axisSettings) {
                axes[axisSettingState.tag] = axisSettingStateToSetting(axisSettingState.range);
            }
            const features: Partial<Record<string, boolean>> = {};
            for (const featureList of [
                family.settings.includeFeatures.characterVariants,
                family.settings.includeFeatures.stylisticSets,
                family.settings.includeFeatures.features,
            ]) {
                for (const featureSettingState of featureList) {
                    features[featureSettingState.feature.tag] = featureSettingState.include.value;
                }
            }
            const includeCharacters = family.settings.includeCharacters.includeAllCharacters.value ?
                'all' :
                family.settings.includeCharacters.characterSets.value.map(characterSet => {
                    const includeNamedSubsets: SubsetName[] = [];
                    for (const namedSubsetState of characterSet.includeNamedSubsets) {
                        if (namedSubsetState.include.value) includeNamedSubsets.push(namedSubsetState.name);
                    }
                    return {
                        includeNamedSubsets,
                        // Swallow parsing errors for the web version
                        includeUnicodeRanges: parseUnicodeRanges(characterSet.includeUnicodeRanges.value) ?? [],
                        name: characterSet.name.value || undefined,
                    };
                });

            return {
                fonts,
                enableSubsetting: true,
                styleValues: styleSettingsStateToSettings(family.settings.styleSettings),
                axes,
                features,
                includeCharacters,
            } satisfies FamilySettings;
        });

        const formats = {
            ttf: this.exportSettings.formats.ttf.peek(),
            woff: this.exportSettings.formats.woff.peek(),
            woff2: this.exportSettings.formats.woff2.peek(),
        };

        return exportFonts(compressionContext, exportSettings, {
            formats,
            woffCompression: this.exportSettings.woffCompression.value,
            woff2Compression: this.exportSettings.woff2Compression.value,
            onProgress: progress => {
                this._exportedFonts.value = {state: 'loading', progress};
            },
        }).then(
            exportedFonts => {
                this._exportedFonts.value = {state: 'loaded', exportedFonts, exportedFormats: formats};
            },
            error => {
                this._exportedFonts.value = {state: 'error', error};
            },
        );
    }

    saveAllSettings(): AllSavedSettings {
        const familySettings = this.fonts.value.map(family => saveSettings(family));
        return {
            familySettings,
            cssPathPrefix: this.cssPathPrefix.value,
            exportSettings: {
                formats: {
                    ttf: this.exportSettings.formats.ttf.value,
                    woff: this.exportSettings.formats.woff.value,
                    woff2: this.exportSettings.formats.woff2.value,
                },
                woffCompression: this.exportSettings.woffCompression.value,
                woff2Compression: this.exportSettings.woff2Compression.value,
                includeTTFinCSS: this.exportSettings.includeTTFinCSS.value,
            },
            type: 'AllSettingsV1',
        };
    }

    loadAllSettings(settingsUnk: unknown) {
        if (
            typeof settingsUnk !== 'object' ||
            settingsUnk === null ||
            !('type' in settingsUnk) ||
            settingsUnk.type !== 'AllSettingsV1'
        ) {
            return;
        }
        const settings = settingsUnk as Partial<AllSavedSettings>;

        if (settings.familySettings) {
            const familySettingsByFamily = new Map<string, StaticFamilySettings>();
            for (const familySettings of settings.familySettings) {
                familySettingsByFamily.set(familySettings.name, familySettings);
            }
            for (const family of this.fonts.value) {
                const familySettings = familySettingsByFamily.get(family.name);
                if (familySettings) {
                    loadSettings(family, familySettings);
                }
            }
        }
        if (settings.cssPathPrefix) {
            this.cssPathPrefix.value = settings.cssPathPrefix;
        }
        if (settings.exportSettings?.formats.ttf) {
            this.exportSettings.formats.ttf.value = settings.exportSettings.formats.ttf;
        }
        if (settings.exportSettings?.formats.woff) {
            this.exportSettings.formats.woff.value = settings.exportSettings.formats.woff;
        }
        if (settings.exportSettings?.formats.woff2) {
            this.exportSettings.formats.woff2.value = settings.exportSettings.formats.woff2;
        }
        if (settings.exportSettings?.woffCompression) {
            this.exportSettings.woffCompression.value = settings.exportSettings.woffCompression;
        }
        if (settings.exportSettings?.woff2Compression) {
            this.exportSettings.woff2Compression.value = settings.exportSettings.woff2Compression;
        }
        if (settings.exportSettings?.includeTTFinCSS) {
            this.exportSettings.includeTTFinCSS.value = settings.exportSettings.includeTTFinCSS;
        }
    }
}

export const AppContext = createContext<AppState | undefined>(undefined);

/**
 * Hook for accessing global application state
 */
export const useAppState = (): AppState => {
    const context = useContext(AppContext);
    if (!context) throw new Error('No AppState provided');
    return context;
};

export const createStore = (): AppState => {
    const store = new AppState();

    return store;
};
