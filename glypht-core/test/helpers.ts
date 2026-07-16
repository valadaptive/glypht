import {afterAll, onTestFinished} from 'vitest';
import * as fs from 'node:fs/promises';
import {GlyphtContext, WoffCompressionContext} from '../dist/index.js';

export const testGlyphtContext = () => {
    const ctx = new GlyphtContext();
    afterAll(() => {
        ctx.destroy();
    });

    return {
        ctx,
        async loadFontsInTest(...args: Parameters<GlyphtContext['loadFonts']>) {
            const fonts = await ctx.loadFonts(...args);
            onTestFinished(async() => {await Promise.all(fonts.map(font => font.destroy()));});
            return fonts;
        },
        async loadFontsInSuite(...args: Parameters<GlyphtContext['loadFonts']>) {
            const fonts = await ctx.loadFonts(...args);
            afterAll(async() => {await Promise.all(fonts.map(font => font.destroy()));});
            return fonts;
        },
    };
};

export const testCompressionContext = () => {
    const ctx = new WoffCompressionContext();
    afterAll(() => {
        ctx.destroy();
    });

    return ctx;
};

export const readFixtureFile = async(path: string, base: string) => {
    const contents = await fs.readFile(new URL(path, base)) as Buffer<ArrayBuffer>;
    return new Uint8Array(contents.buffer, contents.byteOffset, contents.byteLength);
};

/**
 * Parses an sfnt's table directory, returning a map of table tags to their lengths in bytes. Note that tags are exactly
 * four characters long, so some are space-padded (e.g. "CFF ").
 */
export const sfntTables = (data: Uint8Array): Map<string, number> => {
    const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    const numTables = view.getUint16(4);
    const tables = new Map<string, number>();
    for (let i = 0; i < numTables; i++) {
        const recordOffset = 12 + (i * 16);
        const tag = String.fromCharCode(...data.subarray(recordOffset, recordOffset + 4));
        tables.set(tag, view.getUint32(recordOffset + 12));
    }
    return tables;
};
