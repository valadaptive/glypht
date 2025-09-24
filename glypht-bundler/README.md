# @glypht/bundler

A JavaScript library for advanced font bundling and CSS generation. This library provides higher-level functionality on top of [@glypht/core](https://www.npmjs.com/package/@glypht/core), namely:

- Font family organization. This library will group fonts by family name and analyze which style values are shared among all fonts in the family and which are unique.
- Font instancing. `@glypht/core` lets you pin variable fonts' axes to specific values and subset the characters included in fonts. This library extends that by letting you provide multiple axis locations and character sets, and will generate the full matrix of fonts across all of them.
- CSS generation and file naming. Once you've generated the fonts, this library will give them all non-colliding filenames and generate CSS that includes them all, with the proper attributes (like `unicode-range`) present according to the input settings. The CSS output supports syntax highlighting.[^1]
- Various niceties for making the configuration format a bit friendlier (for instance, parsing Unicode range strings).

This library powers the export functionality in the [Glypht web application](https://glypht.valadaptive.dev) and [Glypht CLI](https://www.npmjs.com/package/@glypht/cli).

## Installation

```bash
npm install @glypht/bundler
```

## Quick Start

### Font Family Organization

```javascript
import { GlyphtContext } from '@glypht/core';
import { sortFontsIntoFamilies } from '@glypht/bundler';

const context = new GlyphtContext();

try {
    // Load multiple font files
    const fontFiles = [
        new Uint8Array(/* Inter-Regular.ttf */),
        new Uint8Array(/* Inter-Bold.ttf */),
        new Uint8Array(/* Inter-Italic.ttf */),
    ];

    const fonts = await context.loadFonts(fontFiles, true);

    // Organize fonts into families
    const families = sortFontsIntoFamilies(fonts);

    for (const family of families) {
        console.log(`Family: ${family.name}`);
        console.log(`Fonts: ${family.fonts.length}`);
        console.log(`Shared axes: ${family.axes.map(a => a.tag).join(', ')}`);
        console.log(`Named character subsets: ${family.namedSubsets.join(', ')}`);
    }
} finally {
    context.destroy();
}
```

### Multi-Format Font Export

```javascript
import { WoffCompressionContext } from '@glypht/core';
import { exportFonts } from '@glypht/bundler';

const compressionContext = new WoffCompressionContext();

try {
    // Define family settings with subsetting options
    const familySettings = families.map(family => ({
        enableSubsetting: true,
        fonts: family.fonts,
        styleValues: {}, // Keep all style axes as-is
        axes: {}, // Keep all variation axes as-is
        features: {}, // Use default feature settings
        includeCharacters: {
            includeNamedSubsets: ['latin', 'latin-ext'],
            includeUnicodeRanges: []
        }
    }));

    // Export in multiple formats
    const exportedFonts = await exportFonts(
        compressionContext,
        familySettings,
        {
            formats: { ttf: true, woff: true, woff2: true },
            woffCompression: 15,
            woff2Compression: 11,
            onProgress: (progress) => console.log(`Progress: ${Math.round(progress * 100)}%`)
        }
    );

    // Access font data in different formats
    for (const font of exportedFonts) {
        console.log(`${font.filename}:`);
        console.log(`- TTF: ${font.data.opentype?.length} bytes`);
        console.log(`- WOFF: ${font.data.woff?.length} bytes`);
        console.log(`- WOFF2: ${font.data.woff2?.length} bytes`);
    }
} finally {
    compressionContext.destroy();
}
```

### CSS Generation with Syntax Highlighting

```javascript
import { exportedFontsToCSS } from '@glypht/bundler';

// Generate CSS from exported fonts
const cssOutput = exportedFontsToCSS(
    exportedFonts,
    './fonts/', // Font path prefix
    true // Include uncompressed formats
);

// Get the complete CSS string
const cssString = cssOutput.getString();
console.log(cssString);

// Or use syntax-highlighted spans for rendering
for (const span of cssOutput.spans) {
    console.log(`${span.text} (${span.type})`);
}
```

### Unicode Range Parsing

```javascript
import { parseUnicodeRanges, formatUnicodeRanges } from '@glypht/bundler';

// Parse Unicode ranges from strings
const ranges = parseUnicodeRanges('U+0020-007F, U+00A0-00FF, U+0100-017F');
console.log(ranges); // [[32, 127], [160, 255], [256, 383]]

// Format back to CSS format
const cssRanges = formatUnicodeRanges(ranges);
console.log(cssRanges); // ['U+20-7f', 'U+a0-ff', 'U+100-17f']
```

## Module Exports

The library provides specialized export paths:

- **`@glypht/bundler`**: Main functionality including family organization and font export
- **`@glypht/bundler/unicode-ranges.js`**: Unicode range parsing and formatting utilities
- **`@glypht/bundler/feature-metadata.js`**: OpenType feature information and metadata

[^1]: Because this package is responsible for generating the CSS itself, it knows the type of every CSS token it generates. This means there is no dependency on any third-party syntax highlighting library.
