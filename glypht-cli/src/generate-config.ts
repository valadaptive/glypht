import {sortFontsIntoFamilies} from '@glypht/bundler-utils';
import {featureMetadata} from '@glypht/bundler-utils/feature-metadata.js';
import {FeatureInfo, GlyphtContext} from '@glypht/core';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

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


const generateConfig = async({inputFiles, output, force, quotes, instanceCharacterSets}: {
    inputFiles: string[];
    output?: string;
    force: boolean;
    quotes: Quotes;
    instanceCharacterSets: boolean;
}) => {
    const ctx = new GlyphtContext();
    try {
        const inputs = await Promise.all(inputFiles.map(path => fs.readFile(path)));
        const fonts = await ctx.loadFonts(inputs, {transfer: true});
        const families = sortFontsIntoFamilies(fonts);
        const outputDir = output ? path.dirname(output) : null;
        let result = `/**
* @import {GlyphtConfig} from '@glypht/cli'
*/

/** @satisfies {GlyphtConfig} */
export default {
    // You can also use glob patterns here. These paths are resolved relative to this config file.
    input: [${inputFiles.map(fontPath => {
        if (!path.isAbsolute(fontPath) && outputDir !== null) {
            fontPath = path.relative(outputDir, fontPath);
        }
        return stringlequote(fontPath, quotes);
    }).join(', ')}],
    outDir: 'assets/fonts',
    settings: {\n`;

        for (const family of families) {
            result += `        ${stringlequote(family.name, quotes)}: {
            enableSubsetting: true,\n`;

            const styleEntries = Object.entries(family.styleValues);
            const anyVariableStyleValues = styleEntries.some(
                ([, styleValue]) => styleValue.type === 'variable');

            if (anyVariableStyleValues) {
                result += '            styleValues: {\n';
                for (const [styleKey, styleValue] of styleEntries) {
                    if (styleValue.type === 'single') continue;
                    result += `                ${styleKey}: {type: 'variable', value: {min: ${styleValue.value.min}, max: ${styleValue.value.max}}},\n`;
                }
                result += `            },\n`;
            }

            if (family.axes.length > 0) {
                result += '            axes: {\n';
                for (const axisInfo of family.axes) {
                    const axisComment = axisInfo.name ? ` // ${axisInfo.name}` : '';
                    result += `                ${maybeQuoteIdentifier(axisInfo.tag, quotes)}: {type: 'variable', value: {min: ${axisInfo.min}, max: ${axisInfo.max}}},${axisComment}\n`;
                }
                result += `            },\n`;
            }

            result += '            // These start out as the default settings for which features to keep.\n';
            result += '            features: {\n';

            const sortedFeatures = {
                characterVariants: [] as FeatureInfo[],
                stylisticSets: [] as FeatureInfo[],
                features: [] as FeatureInfo[],
            };

            for (const featureInfo of family.features) {
                if (/cv\d{2}/.test(featureInfo.tag)) {
                    sortedFeatures.characterVariants.push(featureInfo);
                } else if (/ss\d{2}/.test(featureInfo.tag)) {
                    sortedFeatures.stylisticSets.push(featureInfo);
                } else {
                    sortedFeatures.features.push(featureInfo);
                }
            }
            for (const featList of [sortedFeatures.characterVariants, sortedFeatures.stylisticSets]) {
                featList.sort((a, b) => Number(a.tag.slice(2)) - Number(b.tag.slice(2)));
            }

            const printLabeledFeatures = (features: FeatureInfo[]) => {
                for (const featureInfo of features) {
                    const metadata = featureMetadata(featureInfo.tag);
                    if (metadata.required) continue;
                    const featureLabel = featureInfo.label ?? metadata.name;
                    const featureComment = featureLabel ? ` // ${featureLabel}` : '';
                    result += `                ${maybeQuoteIdentifier(featureInfo.tag, quotes)}: ${featureInfo.keepByDefault},${featureComment}\n`;
                }
            };

            printLabeledFeatures(sortedFeatures.features);
            if (sortedFeatures.characterVariants.length > 0) {
                result += '\n                // Character variants\n';
                printLabeledFeatures(sortedFeatures.characterVariants);
            }
            if (sortedFeatures.stylisticSets.length > 0) {
                result += '\n                // Stylistic sets\n';
                printLabeledFeatures(sortedFeatures.stylisticSets);
            }

            result += '            },\n';

            if (instanceCharacterSets) {
                result += '            includeCharacters: [\n';
                for (const subsetName of family.namedSubsets) {
                    result += `                    {includeNamedSubsets: [${stringlequote(subsetName, quotes)}]},\n`;
                }
                result += '            ],\n';
            } else {
                // eslint-disable-next-line @stylistic/max-len
                result += '            // You can specify this as an array, in which case Glypht will split up the font by character set.\n';
                result += '            includeCharacters: {\n';
                result += `                includeNamedSubsets: [${family.namedSubsets.map(s => stringlequote(s, quotes)).join(', ')}],\n`;
                result += `                // includeUnicodeRanges: ${stringlequote('U+0041, U+0050-U+0060, ...', quotes)},\n`;
                result += '            },\n';
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
        if (!output) {
            process.stdout.write(result);
        } else {
            await fs.writeFile(output, result, {flag: force ? 'w' : 'wx'});
        }
    } finally {
        ctx.destroy();
    }
};

export default generateConfig;
