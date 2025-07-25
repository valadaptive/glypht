import {computed, signal, Signal} from '@preact/signals';
import {createContext} from 'preact';
import {useContext} from 'preact/hooks';
import {FontRef, GlyphtContext, type SubsettedFont} from '@glypht/core/subsetting.js';
import {WoffCompressionContext} from '@glypht/core/compression.js';

import {
    CharacterSetSettings,
    FamilySettings,
    fontFilenames,
    loadSettings,
    makeSubsetSettings,
    saveSettings,
    settingsFromFonts,
    StaticFamilySettings,
} from './util/font-settings';

export type FontDataState =
    | {state: 'not_loaded'}
    | {state: 'loading'; progress: number}
    | {state: 'loaded'; families: FamilySettings[]}
    | {state: 'error'; error: unknown};

export type ExportedFont = {
    font: SubsettedFont;
    filename: string;
    data: {
        opentype: Uint8Array | null;
        woff: Uint8Array | null;
        woff2: Uint8Array | null;
    };
    charsetNameOrIndex: string | number | null;
};

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
    public fonts: Signal<FamilySettings[]> = signal([]);
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

    constructor() {}

    async removeFontFamily(family: FamilySettings) {
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

    addCharacterSet(familySettings: FamilySettings) {
        const {characterSets} = familySettings.settings.includeCharacters;
        const templateSet = characterSets.value[0];
        const newSet: CharacterSetSettings = {
            includeNamedSubsets: templateSet.includeNamedSubsets.map(({name}) => ({name, include: signal(false)})),
            includeUnicodeRanges: signal(''),
            name: signal(''),
        };
        characterSets.value = [...characterSets.value, newSet];
    }

    removeCharacterSet(familySettings: FamilySettings, characterSet: CharacterSetSettings) {
        const {characterSets} = familySettings.settings.includeCharacters;
        characterSets.value = characterSets.value.filter(s => s !== characterSet);
    }

    exportFonts() {
        const formats = {
            ttf: this.exportSettings.formats.ttf.peek(),
            woff: this.exportSettings.formats.woff.peek(),
            woff2: this.exportSettings.formats.woff2.peek(),
        };
        const families = this.fonts.peek();

        const fontList = [];
        const subsetSettingsByFont = makeSubsetSettings(families);
        for (const family of families) {
            for (const font of family.fonts) {
                const settings = subsetSettingsByFont.get(font.font.id)!;
                for (const flattenedSettings of settings) {
                    fontList.push({font: font.font, settings: flattenedSettings});
                }
            }
        }

        const subsetProgressProportion = 1;
        // TODO: Probably not an accurate estimate since cores can't work on both WOFF1 and WOFF2 at the same time
        const woff1ProgressProportion = (2 * this.exportSettings.woffCompression.value) /
            Math.min(navigator.hardwareConcurrency, fontList.length);
        // TODO: the speed varies by compression level
        const woff2ProgressProportion = 32 / Math.min(navigator.hardwareConcurrency, fontList.length);
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
        this._exportedFonts.value = {state: 'loading', progress: 0};

        let cancelled = false;

        const fontPromises = fontList.map(async({font, settings}) => {
            const subsettedFont = await font.subset(settings);
            if (cancelled) throw new Error('Aborted');
            const dataInFormats: ExportedFont['data'] = {
                opentype: formats.ttf ? subsettedFont.data : null,
                woff: null,
                woff2: null,
            };

            progress += subsetProgressProportion;
            this._exportedFonts.value = {state: 'loading', progress: progress / totalProgressProportion};
            const compressionPromises = [];
            if (formats.woff) {
                compressionPromises.push(compressionContext.compressFromTTF(
                    subsettedFont.data,
                    'woff',
                    this.exportSettings.woffCompression.value,
                ).then(compressed => {
                    if (cancelled) throw new Error('Aborted');
                    progress += woff1ProgressProportion;
                    this._exportedFonts.value = {state: 'loading', progress: progress / totalProgressProportion};
                    dataInFormats.woff = compressed;
                }));
            }
            if (formats.woff2) {
                compressionPromises.push(compressionContext.compressFromTTF(
                    subsettedFont.data,
                    'woff2',
                    this.exportSettings.woff2Compression.value,
                ).then(compressed => {
                    if (cancelled) throw new Error('Aborted');
                    progress += woff2ProgressProportion;
                    this._exportedFonts.value = {state: 'loading', progress: progress / totalProgressProportion};
                    dataInFormats.woff2 = compressed;
                }));
            }
            if (compressionPromises.length > 0) await Promise.all(compressionPromises);

            return {
                font: subsettedFont,
                filename: '', // This will be filled in later. It's just to get TypeScript to shut up.
                data: dataInFormats,
                charsetNameOrIndex: settings ? settings.charsetNameOrIndex : null,
            };
        });

        return Promise.all(fontPromises).then(exportedFonts => {
            const filenames = fontFilenames(exportedFonts);
            for (const exportedFont of exportedFonts) {
                const filename = filenames.get(exportedFont.font)!;
                exportedFont.filename = filename;
            }
            this._exportedFonts.value = {state: 'loaded', exportedFonts, exportedFormats: formats};
        }, error => {
            cancelled = true;
            // eslint-disable-next-line no-console
            console.error(error);
            this._exportedFonts.value = {state: 'error', error};
            throw error;
        });
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
