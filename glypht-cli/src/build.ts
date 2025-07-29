import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import {glob} from 'tinyglobby';
import {consola} from 'consola';
import {colorize} from 'consola/utils';

import {GlyphtContext, WoffCompressionContext} from '@glypht/core';
import {exportedFontsToCSS, exportFonts, FamilySettings, sortFontsIntoFamilies} from '@glypht/bundler';

import formatFileSize from './format-file-size';
import type {GlyphtConfig} from '.';

const progressBar = (progress: number, width: number = 25) => {
    const proportionDone = Math.max(0, Math.min(progress, 1)) * width;
    const numFullBlocks = Math.floor(proportionDone);
    let barString = '\u2588'.repeat(proportionDone);
    if (numFullBlocks < width) {
        // -1 for "none", 0-6 for block fractions. This should never be 7 because proportionDone - numFullBlocks
        // will never reach 1.
        const fractionalBlock = Math.floor((proportionDone - numFullBlocks) * 8) - 1;
        const fractionalBlockChar = fractionalBlock === -1 ?
            ' ' :
            String.fromCharCode(0x258f - fractionalBlock);
        barString += fractionalBlockChar;
        barString += ' '.repeat(width - (numFullBlocks + 1));
    };
    return barString;
};

const logUpdate = () => {
    let prevText = '';
    return {
        log(this: void, text: string) {
            const spaces = ' '.repeat(Math.max(prevText.length - text.length, 0));
            prevText = text;
            process.stdout.write(`\r${text}${spaces}`);
        },
        done(this: void) {
            const spaces = ' '.repeat(prevText.length);
            process.stdout.write(`\r${spaces}\r`);
        },
    };
};

export const build = async(config: GlyphtConfig, baseDir: string) => {
    const inputs = await glob(config.input, {cwd: baseDir});

    consola.start('Building fonts:', inputs.map(inp => colorize('bold', inp)).join(', '));

    const fontFiles = await Promise.all(inputs.map(input => fs.readFile(input)));
    const outDir = path.resolve(baseDir, config.outDir);
    const outCssPath = typeof config.outCssFile === 'string' ?
        path.resolve(baseDir, config.outCssFile) :
        path.join(outDir, 'fonts.css');

    const ctx = new GlyphtContext();
    const formats = config.formats ?? {woff2: true};
    const cctx = formats.woff || formats.woff2 ? new WoffCompressionContext() : null;
    try {
        const fonts = await ctx.loadFonts(fontFiles, true);
        const families = sortFontsIntoFamilies(fonts);
        const familySettings: FamilySettings[] = [];
        for (const family of families) {
            const familyConfig = config.settings[family.name];
            if (!familyConfig) {
                // TODO: "wildcard" config?
                throw new Error(`No configuration for font family "${family.name}"`);
            }
            familySettings.push({
                fonts: family.fonts,
                ...familyConfig,
            });
        }
        const {log, done} = logUpdate();
        const exportedFonts = await exportFonts(cctx, familySettings, {
            formats,
            woffCompression: config.woffCompression,
            woff2Compression: config.woff2Compression,
            onProgress: progress => {
                const bar = colorize('bgBlackBright', progressBar(progress, 25));
                const percent = (Math.floor(progress * 100) + '%').padStart(5, ' ');
                log(bar + percent);
            },
        });
        done();
        consola.success(`Built ${exportedFonts.length} fonts`);
        const cssPrefix = path.join(config.basePath ?? '', config.outDir);
        const exportedCSS = exportedFontsToCSS(exportedFonts, cssPrefix, config.includeTtfInCss !== false);
        await fs.mkdir(config.outDir, {recursive: true});
        const writePromises = [];
        const outputFiles: {name: string; size: number}[] = [];
        let maxFilenameLen = 0;
        for (const font of exportedFonts) {
            for (const format of ['opentype', 'woff', 'woff2'] as const) {
                if (font.data[format]) {
                    const fileName = path.join(outDir, `${font.filename}.${font.extension(format)}`);
                    const prettyFileName = path.relative(baseDir, fileName);
                    writePromises.push(fs.writeFile(fileName, font.data[format]));
                    outputFiles.push({name: prettyFileName, size: font.data[format].byteLength});
                    maxFilenameLen = Math.max(maxFilenameLen, prettyFileName.length);
                }
            }
        }
        const cssText = new TextEncoder().encode(exportedCSS.getString());
        writePromises.push(fs.writeFile(outCssPath, cssText));
        outputFiles.push({name: path.relative(baseDir, outCssPath), size: cssText.byteLength});
        await Promise.all(writePromises);

        consola.success(`Converted and wrote ${outputFiles.length} files`);
        consola.box(outputFiles.map(f =>
            f.name.padEnd(maxFilenameLen + 1, ' ') +
            colorize('bold', formatFileSize(f.size).padStart(6, ' ')),
        ).join('\n'));
    } finally {
        ctx.destroy();
        cctx?.destroy();
    }
};

export default build;
