import {parseRanges} from '@glypht/bundler-utils';
import {featureMetadata} from '@glypht/bundler-utils/feature-metadata.js';
import {FeatureInfo} from '@glypht/core';
import {AxisSettingState, CharacterSetSettingsState} from './font-settings';
import {Signal} from '@preact/signals';
import {AppState} from '../app-state';

export type Quotes = 'single' | 'double';

const stringlequote = (s: string, quotes: Quotes) => {
    const doubleQuoted = JSON.stringify(s);
    if (quotes === 'double') return doubleQuoted;
    const stringified = doubleQuoted.slice(1, -1);
    return `'${stringified.replace(/\\"|'/g, c => c === '\'' ? '\\\'' : '"')}'`;
};

const maybeQuoteIdentifier = (s: string, quotes: Quotes) => {
    if (/[a-z_][a-z0-9_]*/i.test(s)) return s;
    return stringlequote(s, quotes);
};


const generateConfig = ({settings, quotes}: {
    settings: AppState;
    quotes: Quotes;
}) => {
    const inputFiles = new Set<string>();
    for (const family of settings.fonts.value) {
        for (const {filename} of family.fonts) {
            inputFiles.add(filename);
        }
    }

    let result = `/**
* @import {GlyphtConfig} from '@glypht/cli'
*/

/** @satisfies {GlyphtConfig} */
export default {
    // You can also use glob patterns here. These paths are resolved relative to this config file.
    input: [${Array.from(inputFiles)
        .map(fontPath => stringlequote(fontPath, quotes))
        .join(', ')}],
    outDir: 'assets/fonts',\n`;

    if (!settings.exportSettings.includeTTFinCSS.value) {
        result += '    includeTtfInCss: false,\n';
    }

    if (settings.cssPathPrefix.value !== '') {
        result += `    basePath: ${stringlequote(settings.cssPathPrefix.value, quotes)},\n`;
    }

    result += `    formats: {
        ttf: ${settings.exportSettings.formats.ttf.value},
        woff: ${settings.exportSettings.formats.woff.value},
        woff2: ${settings.exportSettings.formats.woff2.value},
    },\n`;

    if (settings.exportSettings.woffCompression.value !== 15) {
        result += `    woffCompression: ${settings.exportSettings.woffCompression.value},\n`;
    }

    if (settings.exportSettings.woff2Compression.value !== 15) {
        result += `    woff2Compression: ${settings.exportSettings.woff2Compression.value},\n`;
    }

    result += `    settings: {\n`;

    for (const family of settings.fonts.value) {
        if (!family.enableSubsetting.value) {
            result += `        ${stringlequote(family.name, quotes)}: {enableSubsetting: false},\n`;
            continue;
        }
        result += `        ${stringlequote(family.name, quotes)}: {
            enableSubsetting: true,\n`;

        const serializeRanges = (ranges: (number | readonly [number, number])[] | null) => {
            if (ranges === null) return '[]';
            const result = [];
            for (const range of ranges) {
                if (Array.isArray(range)) {
                    result.push(`[${range[0]}, ${range[1]}]`);
                } else {
                    result.push(String(range));
                }
            }
            return `[${result.join(', ')}]`;
        };

        const serializeAxisSetting = (setting: AxisSettingState) => {
            switch (setting.mode.value) {
                case 'single': return `{type: ${stringlequote('single', quotes)}, value: ${setting.curSingle.value}}`;
                case 'range': return `{type: ${stringlequote('variable', quotes)}, value: {min: ${setting.curMin.value}, max: ${setting.curMax.value}}}`;
                case 'multiple': return `{type: ${stringlequote('multiple', quotes)}, value: {ranges: ${serializeRanges(parseRanges(setting.curMultiValue.value))}}}`;
            }
        };

        const styleEntries = Object.entries(family.settings.styleSettings);
        const anyVariableStyleValues = styleEntries.some(
            ([, styleValue]) => styleValue.type === 'variable');

        if (anyVariableStyleValues) {
            result += '            styleValues: {\n';
            for (const [styleKey, styleValue] of styleEntries) {
                if (styleValue.type === 'single') continue;
                result += `                ${styleKey}: {type: 'variable', value: ${serializeAxisSetting(styleValue.value)},\n`;
            }
            result += `            },\n`;
        }

        if (family.settings.axisSettings.length > 0) {
            result += '            axes: {\n';
            for (const axisInfo of family.settings.axisSettings) {
                const axisComment = axisInfo.name ? ` // ${axisInfo.name}` : '';
                result += `                ${maybeQuoteIdentifier(axisInfo.tag, quotes)}: ${serializeAxisSetting(axisInfo.range)},${axisComment}\n`;
            }
            result += `            },\n`;
        }

        result += '            features: {\n';

        const printLabeledFeatures = (features: {feature: FeatureInfo; include: Signal<boolean>}[]) => {
            for (const {feature, include} of features) {
                const metadata = featureMetadata(feature.tag);
                if (metadata.required) continue;
                const featureLabel = feature.label ?? metadata.name;
                const featureComment = featureLabel ? ` // ${featureLabel}` : '';
                result += `                ${maybeQuoteIdentifier(feature.tag, quotes)}: ${include.value},${featureComment}\n`;
            }
        };

        printLabeledFeatures(family.settings.includeFeatures.features);
        if (family.settings.includeFeatures.characterVariants.length > 0) {
            result += '\n                // Character variants\n';
            printLabeledFeatures(family.settings.includeFeatures.characterVariants);
        }
        if (family.settings.includeFeatures.stylisticSets.length > 0) {
            result += '\n                // Stylistic sets\n';
            printLabeledFeatures(family.settings.includeFeatures.stylisticSets);
        }

        result += '            },\n';

        const formatIncludeCharactersSettings = (settings: CharacterSetSettingsState, indent: number) => {
            const formattedSubsets = [];
            for (const {include, name} of settings.includeNamedSubsets) {
                if (include.value) {
                    formattedSubsets.push(name);
                }
            }

            const hasName = settings.name.value !== '';
            const hasNamedSubsets = formattedSubsets.length > 0;
            const hasUnicodeRanges = settings.includeUnicodeRanges.value !== '';

            const formattedKeys = [];
            if (hasName) formattedKeys.push(`name: ${stringlequote(settings.name.value, quotes)}`);
            if (hasNamedSubsets) formattedKeys.push(`includeNamedSubsets: [${formattedSubsets.map(subset => stringlequote(subset, quotes)).join(', ')}]`);
            if (hasUnicodeRanges) formattedKeys.push(`includeUnicodeRanges: ${stringlequote(settings.includeUnicodeRanges.value, quotes)}`);

            if (formattedKeys.length === 1) return `{${formattedKeys[0]}}`;
            let result = '{\n';
            for (const formattedKey of formattedKeys) {
                result += `${' '.repeat(indent + 4)}${formattedKey},\n`;
            }
            result += `${' '.repeat(indent)}}`;
            return result;

        };

        if (family.settings.includeCharacters.includeAllCharacters.value) {
            result += `            includeCharacters: ${stringlequote('all', quotes)},\n`;
        } else if (family.settings.includeCharacters.characterSets.value.length === 1) {
            result += `            includeCharacters: ${formatIncludeCharactersSettings(family.settings.includeCharacters.characterSets.value[0], 12)},\n`;
        } else {
            result += `            includeCharacters: [\n`;
            for (const characterSet of family.settings.includeCharacters.characterSets.value) {
                result += `                ${formatIncludeCharactersSettings(characterSet, 16)},\n`;
            }
            result += '            ],\n';
        }

        result += '            // Change the name this font is given in the output CSS.\n';
        if (family.name.endsWith('Variable')) {
            result += `            overrideName: ${stringlequote(family.name.replace(/\s*Variable$/, ''), quotes)},\n`;
        } else {
            result += `            // overrideName: ${stringlequote('MyCustomFontName', quotes)},\n`;
        }

        result += `        },\n`;
    }

    result += `    },
};\n`;
    return result;
};

export default generateConfig;
