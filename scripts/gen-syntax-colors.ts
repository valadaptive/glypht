/* eslint-disable no-console */
import * as fs from 'node:fs/promises';

import type {ThemeRegistration} from '@shikijs/core';
import {bundledThemes} from 'shiki/themes';

/**
 * Utility script to generate CSS variables from Shiki themes. These variables are used for highlighting generated CSS,
 * TypeDoc's type signatures, and highlighted code blocks.
 */

const OUTPUT_PATH = '../glypht-web/src/generated/syntax-colors.scss';
const SHIKI_THEME_OUTPUT_PATH = '../glypht-web/src/generated/shiki-theme.json';

/**
 * A single theme setting.
 */
interface IRawThemeSetting {
    readonly scope?: string | string[];
    readonly settings: {
        readonly fontStyle?: string;
        readonly foreground?: string;
        readonly background?: string;
    };
}

type Colors = {
    foreground?: string;
    background?: string;
    tokenColors: Partial<Record<string, string>>;
};

// Extract key colors from the theme
function extractColors(theme: ThemeRegistration): Colors {
    const colors = {
        // Base colors
        foreground: theme.colors?.['editor.foreground'],
        background: theme.colors?.['editor.background'],

        // Semantic token colors
        ...theme.semanticTokenColors,
    };

    // Extract colors from token scopes
    const tokenColors: Partial<Record<string, string>> = {};

    theme.tokenColors?.forEach(token => {
        if (!token.settings?.foreground) return;

        const scopes = Array.isArray(token.scope) ? token.scope : [token.scope];
        scopes.forEach(scope => {
            if (scope) {
                tokenColors[scope] = token.settings.foreground;
            }
        });
    });

    return {...colors, tokenColors};
}

// Map TypeScript/TypeDoc elements to appropriate colors
function mapTypeScriptColors(colors: Colors) {
    const {tokenColors} = colors;

    // Helper to find color by scope pattern
    const findColor = (patterns: string[]) => {
        for (const pattern of patterns) {
            if (tokenColors[pattern]) {
                return tokenColors[pattern];
            }
        }
        // Fallback patterns
        for (const pattern of patterns) {
            for (const [scope, color] of Object.entries(tokenColors)) {
                if (scope.includes(pattern)) {
                    return color;
                }
            }
        }
        console.warn(`No color found in ${patterns.join(', ')}`);
        return colors.foreground; // Default fallback
    };

    return {
        // Basic syntax elements
        'hl-keyword': findColor(['keyword', 'storage.type', 'storage.modifier']),
        'hl-string': findColor(['string', 'string.quoted']),
        'hl-number': findColor(['constant.numeric', 'constant.language.numeric']),
        'hl-comment': findColor(['comment', 'comment.line', 'comment.block']),
        'hl-punctuation': colors.foreground,

        // Types and classes
        'hl-type': findColor(['support.type', 'entity.name.type', 'storage.type']),
        'hl-class': findColor(['entity.name.type.class', 'support.class']),
        'hl-interface': findColor(['entity.name.type.interface', 'support.class']),
        'hl-enum': findColor(['entity.name.type.enum', 'support.type']),
        'hl-type-parameter': findColor(['entity.name.type.parameter', 'support.type']),
        'hl-type-alias': findColor(['entity.name.type.alias', 'support.type']),

        // Functions and methods
        'hl-function': findColor(['entity.name.function', 'support.function']),
        'hl-method': findColor(['entity.name.function.member', 'entity.name.function']),
        'hl-constructor': findColor(['entity.name.function.constructor', 'entity.name.function']),
        'hl-call-signature': findColor(['entity.name.function', 'support.function']),
        'hl-constructor-signature': findColor(['entity.name.function.constructor', 'entity.name.function']),
        'hl-index-signature': findColor(['entity.name.function', 'support.function']),
        'hl-get-signature': findColor(['entity.name.function.getter', 'entity.name.function']),
        'hl-set-signature': findColor(['entity.name.function.setter', 'entity.name.function']),
        'hl-accessor': findColor(['entity.name.function.getter', 'entity.name.function']),

        // Variables and properties
        'hl-variable': findColor(['variable', 'variable.other']),
        'hl-parameter': findColor(['variable.parameter', 'variable.other.readwrite', 'variable']),
        'hl-property': findColor(
            ['variable.object.property', 'variable.other.property', 'variable.other.enummember']),
        'hl-enum-member': findColor(['variable.other.enummember', 'constant.other.enum']),

        // Modules and namespaces
        'hl-module': findColor(['entity.name.namespace', 'entity.name.type.module']),
        'hl-namespace': findColor(['entity.name.namespace', 'entity.name.type.namespace']),
        'hl-project': findColor(['entity.name.namespace', 'entity.name.type.module']),
        'hl-reference': findColor(['variable.other.readwrite', 'variable']),

        'hl-operator': findColor(['keyword.operator', 'punctuation.definition.operator']),

        'hl-foreground': colors.foreground,
        'hl-background': colors.background,
    };
}

// Generate SCSS content
function generateSCSS(colorMap: Partial<Record<string, string>>) {
    let scss = `/**
 * TypeScript/TypeDoc/CSS syntax highlighting colors
 * Generated from scripts/gen-syntax-colors.ts
 */

:root {
`;

    // Sort keys for consistent output
    const sortedKeys = Object.keys(colorMap).sort();

    sortedKeys.forEach(key => {
        const value = colorMap[key];
        scss += `    --${key}: ${value};\n`;
    });

    scss += '}\n';

    return scss;
}

// Generate Shiki theme with CSS variables. This means we're converting a Shiki theme to...a Shiki theme, but one that
// uses the same CSS variables as everything else that's syntax-highlighted.
function generateShikiTheme(originalTheme: ThemeRegistration) {
    // Define the same scope patterns as in mapTypeScriptColors
    const scopePatternToCssVar = {
        // Basic syntax elements
        'hl-keyword': ['keyword', 'storage.type', 'storage.modifier', 'constant.language'],
        'hl-string': ['string'],
        'hl-number': ['constant.numeric'],
        'hl-comment': ['comment'],

        // Types and classes
        'hl-type': ['support.type', 'entity.name.type', 'storage.type'],
        'hl-class': ['entity.name.type.class', 'support.class'],
        'hl-interface': ['entity.name.type.interface'],
        'hl-enum': ['entity.name.type.enum'],
        'hl-type-parameter': ['entity.name.type.parameter'],
        'hl-type-alias': ['entity.name.type.alias'],

        // Functions and methods
        'hl-function': ['entity.name.function', 'support.function'],

        // Variables and properties
        'hl-variable': ['variable', 'meta.object-literal.key'],
        'hl-property': ['variable.object.property', 'variable.other.property', 'variable.other.enummember'],

        // Modules and namespaces
        'hl-module': ['entity.name.namespace', 'entity.name.type.module'],

        'hl-operator': ['keyword.operator', 'punctuation.definition.operator'],
    };

    // Helper function to find the best CSS variable for a scope
    const findCssVarForScope = (scope: string): string | undefined => {
        // Check for exact matches first
        for (const [cssVar, patterns] of Object.entries(scopePatternToCssVar)) {
            if (patterns.includes(scope)) {
                return `var(--${cssVar})`;
            }
        }

        // Check for partial matches
        for (const [cssVar, patterns] of Object.entries(scopePatternToCssVar)) {
            for (const pattern of patterns) {
                if (scope.includes(pattern)) {
                    return `var(--${cssVar})`;
                }
            }
        }

        return undefined;
    };

    // Special cases for punctuation that should inherit from their context
    const getSpecialCaseColor = (scopes: string[]): string | undefined => {
        const hasString = scopes.some(s => s.includes('string'));
        const hasComment = scopes.some(s => s.includes('comment'));

        if (hasString || scopes.includes('punctuation.definition.string')) {
            return 'var(--hl-string)';
        }
        if (hasComment || scopes.includes('punctuation.definition.comment')) {
            return 'var(--hl-comment)';
        }
        return undefined;
    };

    // Process the original theme's token colors, preserving order
    const mappedTokenColors: IRawThemeSetting[] = [];

    for (const tokenColor of originalTheme.tokenColors ?? []) {
        if (!tokenColor.settings?.foreground) continue;

        const scopes = Array.isArray(tokenColor.scope) ?
            tokenColor.scope.filter((s): s is string => s !== undefined) :
            [tokenColor.scope].filter((s): s is string => s !== undefined);

        if (scopes.length === 0) continue;

        // Check for special cases first
        let cssVar = getSpecialCaseColor(scopes);

        // If no special case, find the best CSS variable for any of the scopes
        if (!cssVar) {
            for (const scope of scopes) {
                cssVar = findCssVarForScope(scope);
                if (cssVar) break;
            }
        }

        if (cssVar) {
            // Create a new token color rule with CSS variable, preserving original scope grouping
            const mappedTokenColor: IRawThemeSetting = {
                scope: tokenColor.scope, // Keep original scope (could be string or array)
                settings: {
                    foreground: cssVar,
                    ...(tokenColor.settings.fontStyle && {fontStyle: tokenColor.settings.fontStyle}),
                    ...(tokenColor.settings.background && {background: tokenColor.settings.background}),
                },
            };
            mappedTokenColors.push(mappedTokenColor);
        }
        // If no CSS variable mapping exists, we drop the rule
    }

    const theme = {
        name: 'glypht-css-variables',
        displayName: 'Glypht (CSS Variables)',
        type: originalTheme.type,
        colors: {
            'editor.background': 'var(--hl-background)',
            'editor.foreground': 'var(--hl-foreground)',
        },
        tokenColors: mappedTokenColors,
    };

    return JSON.stringify(theme, null, 2);
}

async function main() {
    const theme = (await bundledThemes['dark-plus']()).default;

    console.log('Extracting colors from theme...');
    const extractedColors = extractColors(theme);

    console.log('Mapping TypeScript colors...');
    const tsColorMap = mapTypeScriptColors(extractedColors);

    // Log the color mappings for verification
    console.log('\nColor mappings:');
    Object.entries(tsColorMap).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
    });

    console.log('\nGenerating SCSS...');
    const scss = generateSCSS(tsColorMap);

    console.log('Generating Shiki theme...');
    const shikiTheme = generateShikiTheme(theme);

    // Write to output files
    const outputPath = new URL(OUTPUT_PATH, import.meta.url);
    await fs.writeFile(outputPath, scss, 'utf-8');

    const shikiOutputPath = new URL(SHIKI_THEME_OUTPUT_PATH, import.meta.url);
    await fs.writeFile(shikiOutputPath, shikiTheme, 'utf-8');

    console.log(`\nGenerated syntax colors written to: ${OUTPUT_PATH}`);
    console.log(`Generated Shiki theme written to: ${SHIKI_THEME_OUTPUT_PATH}`);
}

await main();
