import {test, expect} from 'vitest';
import {readFixtureFile, sfntTables, testGlyphtContext} from './helpers.js';

/**
 * Tests for font formats whose subsetting support HarfBuzz gates behind its own build-time flags.
 */

const context = testGlyphtContext();

const UPPERCASE_LATIN = {named: [], custom: [[0x41, 0x5a] as const]};

test('CFF outlines survive subsetting', async() => {
    const nacelle = await readFixtureFile('../../test-fixtures/Nacelle-Regular.otf', import.meta.url);
    const [font] = await context.loadFontsInTest([nacelle]);

    const subsetted = await font.subset({axisValues: [], unicodeRanges: UPPERCASE_LATIN});
    expect(subsetted.format).toBe('opentype');

    const before = sfntTables(nacelle);
    const after = sfntTables(subsetted.data);

    // With HB_NO_SUBSET_CFF enabled, HarfBuzz drops "CFF " entirely, leaving a font with no outlines at all.
    expect(after.has('CFF ')).toBe(true);
    expect(after.get('CFF ')!).toBeLessThan(before.get('CFF ')!);
    expect(after.has('glyf')).toBe(false);

    // The subsetted font should still be a loadable OpenType font covering exactly what we asked for.
    const [reloaded] = await context.loadFontsInTest([subsetted.data]);
    expect(reloaded.familyName).toBe('Nacelle');
    expect(reloaded.unicodeRanges).toEqual([[0x41, 0x5a]]);
});

test('COLRv0 color tables survive subsetting', async() => {
    const bungee = await readFixtureFile('../../test-fixtures/BungeeColor-Regular.ttf', import.meta.url);
    const [font] = await context.loadFontsInTest([bungee]);

    const subsetted = await font.subset({axisValues: [], unicodeRanges: UPPERCASE_LATIN});

    const before = sfntTables(bungee);
    const after = sfntTables(subsetted.data);

    expect(after.has('COLR')).toBe(true);
    expect(after.has('CPAL')).toBe(true);
    // The layer records for the dropped glyphs should be gone, but the palettes are kept as-is.
    expect(after.get('COLR')!).toBeLessThan(before.get('COLR')!);
    expect(after.get('CPAL')!).toBe(before.get('CPAL')!);

    const [reloaded] = await context.loadFontsInTest([subsetted.data]);
    expect(reloaded.unicodeRanges).toEqual([[0x41, 0x5a]]);
});

test('COLRv1 color tables survive subsetting and instancing', async() => {
    const sixtyfour = await readFixtureFile('../../test-fixtures/SixtyfourConvergence.ttf', import.meta.url);
    const [font] = await context.loadFontsInTest([sixtyfour]);

    // Sixtyfour Convergence is a variable COLRv1 font, so this also covers subsetting the COLR table's variation store.
    expect(font.axes.map(axis => axis.tag).sort()).toEqual(['BLED', 'SCAN', 'XELA', 'YELA']);

    const subsetted = await font.subset({axisValues: [], unicodeRanges: UPPERCASE_LATIN});
    const before = sfntTables(sixtyfour);
    const after = sfntTables(subsetted.data);

    expect(after.has('COLR')).toBe(true);
    expect(after.has('CPAL')).toBe(true);
    expect(after.get('COLR')!).toBeLessThan(before.get('COLR')!);

    // Pinning every axis should leave the color tables intact while dropping the variation tables.
    const instanced = await font.subset({
        axisValues: [
            {tag: 'BLED', type: 'single', value: 0},
            {tag: 'SCAN', type: 'single', value: 0},
            {tag: 'XELA', type: 'single', value: 0},
            {tag: 'YELA', type: 'single', value: 0},
        ],
        unicodeRanges: UPPERCASE_LATIN,
    });
    const instancedTables = sfntTables(instanced.data);
    expect(instancedTables.has('COLR')).toBe(true);
    expect(instancedTables.has('CPAL')).toBe(true);
    expect(instancedTables.has('fvar')).toBe(false);
    expect(instancedTables.has('gvar')).toBe(false);

    const [reloaded] = await context.loadFontsInTest([instanced.data]);
    expect(reloaded.axes).toHaveLength(0);
    expect(reloaded.unicodeRanges).toEqual([[0x41, 0x5a]]);
});

test('sbix bitmap strikes survive subsetting', async() => {
    const bungeeSbix = await readFixtureFile('../../test-fixtures/BungeeColor-sbix.ttf', import.meta.url);
    const [font] = await context.loadFontsInTest([bungeeSbix]);

    // This font only has glyphs for "X" and "Y", each with a full set of PNG strikes.
    expect(font.unicodeRanges).toEqual([[0x58, 0x59]]);

    const subsetted = await font.subset({axisValues: [], unicodeRanges: {named: [], custom: [0x58]}});

    const before = sfntTables(bungeeSbix);
    const after = sfntTables(subsetted.data);

    expect(after.has('sbix')).toBe(true);
    // Dropping "Y" should drop its PNGs from every strike, which is most of the file.
    expect(after.get('sbix')!).toBeLessThan(before.get('sbix')!);

    const [reloaded] = await context.loadFontsInTest([subsetted.data]);
    expect(reloaded.unicodeRanges).toEqual([0x58]);
});

test('CBDT bitmap tables survive subsetting', async() => {
    const emoji = await readFixtureFile('../../test-fixtures/NotoColorEmoji-subset.ttf', import.meta.url);
    const [font] = await context.loadFontsInTest([emoji]);

    // This is a five-glyph cut of Noto Color Emoji, each glyph drawn by CBDT strikes rather than outlines.
    expect(font.unicodeRanges).toEqual([[0x38, 0x39], 0xae, 0x2049, 0x20e3]);

    const subsetted = await font.subset({
        axisValues: [],
        unicodeRanges: {named: [], custom: [0x39, 0x20e3]},
    });

    const before = sfntTables(emoji);
    const after = sfntTables(subsetted.data);

    expect(after.has('CBDT')).toBe(true);
    expect(after.has('CBLC')).toBe(true);
    expect(after.get('CBDT')!).toBeLessThan(before.get('CBDT')!);
    expect(after.get('CBLC')!).toBeLessThan(before.get('CBLC')!);

    const [reloaded] = await context.loadFontsInTest([subsetted.data]);
    expect(reloaded.familyName).toBe('Noto Color Emoji');
    expect(reloaded.unicodeRanges).toEqual([0x39, 0x20e3]);
});

test('color tables can be explicitly dropped', async() => {
    const bungee = await readFixtureFile('../../test-fixtures/BungeeColor-Regular.ttf', import.meta.url);
    const [font] = await context.loadFontsInTest([bungee]);

    const subsetted = await font.subset({
        axisValues: [],
        unicodeRanges: UPPERCASE_LATIN,
        dropTables: ['COLR', 'CPAL'],
    });

    const after = sfntTables(subsetted.data);
    expect(after.has('COLR')).toBe(false);
    expect(after.has('CPAL')).toBe(false);
    // The monochrome outlines the color layers were built from should still be there.
    expect(after.has('glyf')).toBe(true);
});
