import {test, expect, describe, beforeAll} from 'vitest';
import {sortFontsIntoFamilies, exportFonts, type ExportedFont} from '../src/index.js';
import {testGlyphtContext, readFixtureFile} from './helpers.js';

const context = testGlyphtContext();

describe('Recursive font export with MONO, CASL, and weight variations', () => {
    let exportedFonts: ExportedFont[];

    beforeAll(async() => {
        // Load and export fonts once for all tests in this suite
        const recursiveVF = await readFixtureFile('../../test-fixtures/Recursive_VF_1.085.ttf', import.meta.url);
        const fonts = await context.loadFontsInSuite([recursiveVF]);
        const families = sortFontsIntoFamilies(fonts);

        // Set up family settings to create instances along MONO, CASL, and wght axes
        const familySettings = families.map(family => ({
            enableSubsetting: true as const,
            fonts: family.fonts,
            styleValues: {
                // Include weight variations
                weight: {type: 'multiple' as const, value: {ranges: [400, 700]}}, // Regular and Bold
            },
            axes: {
                // Create variations along MONO and CASL axes
                MONO: {type: 'multiple' as const, value: {ranges: [0, 1]}}, // Sans and Mono
                CASL: {type: 'multiple' as const, value: {ranges: [0, 1]}}, // Linear and Casual
            },
            features: {},
            includeCharacters: 'all' as const,
        }));

        // Export the fonts (uncompressed for speed)
        exportedFonts = await exportFonts(
            null,
            familySettings,
            {
                formats: {ttf: true},
            },
        );
    });

    test('exported fonts have correct cssName for axis variations', () => {
        // This test verifies that exported fonts get the correct cssName field
        // when instancing along MONO and CASL axes.
        // We expect: "Recursive Sans Linear", "Recursive Sans Casual",
        //           "Recursive Mono Linear", "Recursive Mono Casual"

        // We expect multiple fonts (should be at least 4 for MONO × CASL combinations)
        expect(exportedFonts.length).toBeGreaterThan(1);

        // Extract CSS names for easier testing
        const cssNames = exportedFonts.map(font => font.cssName).sort();

        // We get 8 fonts (2 weights × 4 axis combinations) but only 4 unique CSS names
        // because weight is handled via font-weight CSS property, not the family name
        expect(exportedFonts.length).toBe(8);

        // Get unique CSS names
        const uniqueCssNames = Array.from(new Set(cssNames));
        expect(uniqueCssNames).toHaveLength(4);

        // Test for the exact CSS names we expect from getInstanceLabels
        expect(uniqueCssNames).toContain('Recursive Sans Linear');
        expect(uniqueCssNames).toContain('Recursive Sans Casual');
        expect(uniqueCssNames).toContain('Recursive Mono Linear');
        expect(uniqueCssNames).toContain('Recursive Mono Casual');

        // Verify these are the only four names (no extras)
        expect(uniqueCssNames.sort()).toEqual([
            'Recursive Mono Casual',
            'Recursive Mono Linear',
            'Recursive Sans Casual',
            'Recursive Sans Linear',
        ]);
    });

    test('exported fonts have unique filenames including weight information', () => {
        // This test verifies that all exported fonts get unique filenames that include
        // weight information, unlike CSS names which use font-weight property instead.
        // Filenames must be truly unique for file system storage.

        // Extract filenames
        const filenames = exportedFonts.map(font => font.filename).sort();

        // All 8 filenames should be unique (unlike CSS names which have duplicates)
        expect(filenames.length).toBe(8);
        expect(new Set(filenames).size).toBe(8);

        // Filenames should contain weight information to distinguish them
        const regularFilenames = filenames.filter(name => !name.includes('Bold'));
        const boldFilenames = filenames.filter(name => name.includes('Bold'));

        // Should have 4 regular (no Bold suffix) and 4 bold (with Bold suffix) variants
        expect(regularFilenames).toHaveLength(4);
        expect(boldFilenames).toHaveLength(4);

        // Verify specific filenames exist
        expect(filenames).toContain('Recursive-Sans-Linear');
        expect(filenames).toContain('Recursive-Sans-Linear-Bold');
        expect(filenames).toContain('Recursive-Sans-Casual');
        expect(filenames).toContain('Recursive-Sans-Casual-Bold');
        expect(filenames).toContain('Recursive-Mono-Linear');
        expect(filenames).toContain('Recursive-Mono-Linear-Bold');
        expect(filenames).toContain('Recursive-Mono-Casual');
        expect(filenames).toContain('Recursive-Mono-Casual-Bold');

        // All filenames should start with "Recursive" (no extension in filename field)
        for (const filename of filenames) {
            expect(filename).toMatch(/^Recursive-/);
        }
    });
});

describe('Inter Variable font export with wght and opsz axes', () => {
    let exportedFonts: ExportedFont[];

    beforeAll(async() => {
        // Load and export fonts once for all tests in this suite
        const interVariable = await readFixtureFile('../../test-fixtures/InterVariable.ttf', import.meta.url);
        const fonts = await context.loadFontsInSuite([interVariable]);
        const families = sortFontsIntoFamilies(fonts);

        // Set up family settings to create instances along wght and opsz axes
        const familySettings = families.map(family => ({
            enableSubsetting: true as const,
            fonts: family.fonts,
            styleValues: {
                // Include weight variations
                weight: {type: 'multiple' as const, value: {ranges: [400, 700]}}, // Regular and Bold
            },
            axes: {
                // Create variations along opsz axis only (weight handled by styleValues)
                opsz: {type: 'multiple' as const, value: {ranges: [14, 32]}}, // Text and Display optical sizes
            },
            features: {},
            includeCharacters: 'all' as const,
        }));

        // Export the fonts (uncompressed for speed)
        exportedFonts = await exportFonts(
            null,
            familySettings,
            {
                formats: {ttf: true},
            },
        );
    });

    test('exported fonts have correct cssName for Inter Variable Text and Display', () => {
        // This test verifies that exported fonts get the correct cssName field
        // when instancing along wght and opsz axes.
        // We expect: "Inter Variable Text" and "Inter Variable Display"

        expect(exportedFonts.length).toBeGreaterThan(1);

        // Extract CSS names for easier testing
        const cssNames = exportedFonts.map(font => font.cssName).sort();

        // Get unique CSS names
        const uniqueCssNames = Array.from(new Set(cssNames));
        expect(uniqueCssNames).toHaveLength(2);

        // Test for the exact CSS names we expect
        expect(uniqueCssNames).toContain('Inter Variable Text');
        expect(uniqueCssNames).toContain('Inter Variable Display');

        // Verify these are the only two names (no extras)
        expect(uniqueCssNames.sort()).toEqual([
            'Inter Variable Display',
            'Inter Variable Text',
        ]);
    });

    test('exported fonts have correct filenames with weight information', () => {
        // This test verifies that all exported fonts get the expected filenames:
        // "InterVariable-Regular", "InterVariable-Display", "InterVariable-Bold", and "InterVariable-Display-Bold"
        // Note: There is a named instance called "Regular" which affects filename generation

        // Extract filenames
        const filenames = exportedFonts.map(font => font.filename).sort();

        // Should have 4 fonts total (2 optical sizes × 2 weights)
        expect(filenames.length).toBe(4);
        expect(new Set(filenames).size).toBe(4);

        // Verify specific filenames exist
        expect(filenames).toContain('InterVariable-Regular');
        expect(filenames).toContain('InterVariable-Display');
        expect(filenames).toContain('InterVariable-Bold');
        expect(filenames).toContain('InterVariable-Display-Bold');

        // Verify these are the only filenames (no extras)
        expect(filenames.sort()).toEqual([
            'InterVariable-Bold',
            'InterVariable-Display',
            'InterVariable-Display-Bold',
            'InterVariable-Regular',
        ]);

        // All filenames should start with "InterVariable"
        for (const filename of filenames) {
            expect(filename).toMatch(/^InterVariable-/);
        }
    });
});

describe('Nunito Sans font export with ital and slnt axes', () => {
    let exportedFonts: ExportedFont[];

    beforeAll(async() => {
        // Load both regular and italic variants of Nunito Sans
        const nunitoSansRegular = await readFixtureFile('../../test-fixtures/NunitoSans.ttf', import.meta.url);
        const nunitoSansItalic = await readFixtureFile('../../test-fixtures/NunitoSans-Italic.ttf', import.meta.url);
        const fonts = await context.loadFontsInSuite([nunitoSansRegular, nunitoSansItalic]);
        const families = sortFontsIntoFamilies(fonts);

        // Set up family settings for both regular and italic variants
        const familySettings = families.map(family => ({
            enableSubsetting: true as const,
            fonts: family.fonts,
            styleValues: {},
            axes: {},
            features: {},
            includeCharacters: 'all' as const,
        }));

        // Export the fonts (uncompressed for speed)
        exportedFonts = await exportFonts(
            null,
            familySettings,
            {
                formats: {ttf: true},
            },
        );
    });

    test('exported fonts have correct filenames without Oblique duplication', () => {
        // This test verifies that when both ital and slnt axes are present,
        // we get "NunitoSans" and "NunitoSans-Italic" filenames,
        // NOT "NunitoSans-Oblique-Italic" (no duplication).

        // Extract filenames
        const filenames = exportedFonts.map(font => font.filename).sort();

        // Should have 2 fonts total (regular and italic)
        expect(filenames.length).toBe(2);
        expect(new Set(filenames).size).toBe(2);

        // Verify specific filenames exist
        expect(filenames).toContain('NunitoSans');
        expect(filenames).toContain('NunitoSans-Italic');

        // Verify these are the only filenames (no extras, no "Oblique")
        expect(filenames.sort()).toEqual([
            'NunitoSans',
            'NunitoSans-Italic',
        ]);

        // Ensure no filename contains "Oblique" when both ital and slnt are present
        for (const filename of filenames) {
            expect(filename).not.toContain('Oblique');
        }
    });

    test('exported fonts have correct CSS names', () => {
        // This test verifies the CSS family names are correct for Nunito Sans variants

        // Extract CSS names
        const cssNames = exportedFonts.map(font => font.cssName).sort();

        // Get unique CSS names - should be just "Nunito Sans" for both variants
        // (italic is handled via CSS font-style property, not family name)
        const uniqueCssNames = Array.from(new Set(cssNames));
        expect(uniqueCssNames).toHaveLength(1);

        // Should be "Nunito Sans" for both regular and italic
        expect(uniqueCssNames).toContain('Nunito Sans');
        expect(uniqueCssNames).toEqual(['Nunito Sans']);
    });
});
