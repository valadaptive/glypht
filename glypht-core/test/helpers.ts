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
