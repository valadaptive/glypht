import {test, expect} from 'vitest';
import {readFixtureFile, testGlyphtContext} from './helpers.js';

const context = testGlyphtContext();

test('font loads and has proper metadata', async() => {
    const recursive = await readFixtureFile('../../test-fixtures/Recursive_VF_1.085.ttf', import.meta.url);
    const fonts = await context.loadFontsInTest([recursive]);

    expect(fonts).toHaveLength(1);

    const font = fonts[0];

    expect(font).toMatchObject({
        faceCount: 1,
        faceIndex: 0,
        familyName: 'Recursive',
        subfamilyName: 'Sans Linear Light',
    });

    expect(font.fileSize).toBeGreaterThan(0);

    expect(font.styleValues).toMatchObject({
        weight: {
            type: 'variable',
            value: {min: 300, max: 1000, defaultValue: 300},
        },
        slant: {
            type: 'variable',
            value: {min: -15, max: 0, defaultValue: 0},
        },
        width: {
            type: 'single',
            value: 100,
        },
        italic: {
            type: 'single',
            value: 0,
        },
    });

    expect(font.axes).toHaveLength(3);
    expect(font.axes).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                tag: 'MONO',
                name: 'Monospace',
                min: 0,
                max: 1,
                defaultValue: 0,
            }),
            expect.objectContaining({
                tag: 'CASL',
                name: 'Casual',
                min: 0,
                max: 1,
                defaultValue: 0,
            }),
            expect.objectContaining({
                tag: 'CRSV',
                name: 'Cursive',
                min: 0,
                max: 1,
                defaultValue: 0.5,
            }),
        ]),
    );

    expect(font.features).toHaveLength(33);

    const featuresByTag = new Map(font.features.map(f => [f.tag, f]));

    expect(featuresByTag.get('kern')).toMatchObject({keepByDefault: true});
    expect(featuresByTag.get('mark')).toMatchObject({keepByDefault: true});
    expect(featuresByTag.get('mkmk')).toMatchObject({keepByDefault: true});
    expect(featuresByTag.get('aalt')).toMatchObject({keepByDefault: false});

    expect(font.namedInstances).toHaveLength(64);

    expect(font.subsetCoverage.length).toBeGreaterThan(0);

    const latinSubset = font.subsetCoverage.find(s => s.name === 'latin');
    expect(latinSubset).toMatchObject({
        name: 'latin',
    });
    expect(latinSubset?.coverage).toBeGreaterThan(0);

    expect(font.unicodeRanges.length).toBeGreaterThan(0);

    expect(font.unicodeRanges).toContainEqual([32, 126]);
});

test('named instances matched', async() => {
    const recursive = await readFixtureFile('../../test-fixtures/Recursive_VF_1.085.ttf', import.meta.url);
    const fonts = await context.loadFontsInTest([recursive]);
    expect(fonts).toHaveLength(1);
    const font = fonts[0];
    //console.log(font.namedInstances);

    const sansLinearLight = await font.subset({
        axisValues: [
            {tag: 'MONO', type: 'single', value: 0},
            {tag: 'CASL', type: 'single', value: 0},
            {tag: 'wght', type: 'single', value: 300},
            {tag: 'slnt', type: 'single', value: 0},
            {tag: 'CRSV', type: 'single', value: 0.5},
        ],
        unicodeRanges: 'all',
    });
    const sansLinearLightItalic = await font.subset({
        axisValues: [
            {tag: 'MONO', type: 'single', value: 0},
            {tag: 'CASL', type: 'single', value: 0},
            {tag: 'wght', type: 'single', value: 300},
            {tag: 'slnt', type: 'single', value: -15},
            {tag: 'CRSV', type: 'single', value: 1},
        ],
        unicodeRanges: 'all',
    });
    const monoCasualExtraBold = await font.subset({
        axisValues: [
            {tag: 'MONO', type: 'single', value: 1},
            {tag: 'CASL', type: 'single', value: 1},
            {tag: 'wght', type: 'single', value: 800},
            {tag: 'slnt', type: 'single', value: 0},
            {tag: 'CRSV', type: 'single', value: 0.5},
        ],
        unicodeRanges: 'all',
    });
    expect(sansLinearLight.namedInstance).toMatchObject({
        subfamilyName: 'Sans Linear Light',
        postscriptName: 'RecursiveSansLnr-Light',
        coords: {MONO: 0, CASL: 0, wght: 300, slnt: 0, CRSV: 0.5},
    });
    expect(sansLinearLightItalic.namedInstance).toMatchObject({
        subfamilyName: 'Sans Linear Light Italic',
        postscriptName: 'RecursiveSansLnr-LightItalic',
        coords: {MONO: 0, CASL: 0, wght: 300, slnt: -15, CRSV: 1},
    });
    expect(monoCasualExtraBold.namedInstance).toMatchObject({
        subfamilyName: 'Mono Casual ExtraBold',
        postscriptName: 'RecursiveMonoCsl-ExtraBd',
        coords: {MONO: 1, CASL: 1, wght: 800, slnt: 0, CRSV: 0.5},
    });
});

test('font collection loads all fonts', async() => {
    const interCollection = await readFixtureFile('../../test-fixtures/Inter.ttc', import.meta.url);
    const fonts = await context.loadFontsInTest([interCollection]);
    expect(fonts.length).toBe(36);

    const firstFont = fonts[0];
    expect(firstFont.faceCount).toBe(36);
    expect(firstFont.faceIndex).toBe(0);

    for (let i = 0; i < fonts.length; i++) {
        expect(fonts[i].faceIndex).toBe(i);
    }
});

test('subsetting a font from a collection picks that font\'s tables', async() => {
    const interCollection = await readFixtureFile('../../test-fixtures/Inter.ttc', import.meta.url);
    const fonts = await context.loadFontsInTest([interCollection]);
    expect(fonts.length).toBe(36);

    const firstFont = fonts[0];
    const subsetted = await firstFont.subset(null);
    expect(subsetted.data.length).toBeLessThan(firstFont.fileSize);
});
