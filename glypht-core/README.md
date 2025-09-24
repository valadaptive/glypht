# @glypht/core

A JavaScript library for subsetting and compressing font files. This library powers the [Glypht web application](https://github.com/valadaptive/glypht) and provides a programmatic API for font processing tasks. It mainly wraps the [HarfBuzz](https://github.com/harfbuzz/harfbuzz) and [woff2](https://github.com/google/woff2) libraries; the former for subsetting and the latter for compression.

Care has been taken to ensure compatibility across platforms and JS runtimes. Browsers, Node.js, Bun, and Deno should all function. Because this library makes heavy use of WebAssembly and Web Workers, if you want to *bundle* Glypht, you'll need a bundler that recognizes and transforms the `new URL('...', import.meta.url)` and `new Worker(new URL('...', import.meta.url), {type: 'module'})` patterns (such as Vite).

For higher-level functionality (such as sorting fonts into groups, instancing multiple output fonts from one input font, and CSS generation), see [@glypht/bundler](https://www.npmjs.com/package/@glypht/bundler).

## Installation

```bash
npm install @glypht/core
```

## Quick Start

For an example of using all this functionality end-to-end, see [the Glypht CLI's code](https://github.com/valadaptive/glypht/blob/main/glypht-cli/src/build.ts).

### Subsetting

```javascript
import { GlyphtContext } from '@glypht/core';

// Create a context for font processing
const context = new GlyphtContext();

try {
    // Load font file(s)
    const fontData = new Uint8Array(/* your font file data */);
    const fonts = await context.loadFonts([fontData], true /* Transfer the font data to the worker thread */);

    // Subset the font
    const subsettedFont = await fonts[0].subset({
        axisValues: [
            {type: 'single', tag: 'wdth', value: 100}, // Pin the width axis to 100
            {type: 'variable', tag: 'wght', value: {min: 400, max: 700}} // Clamp the weight axis between 400 and 700
        ],
        unicodeRanges: {
            named: ['latin', 'latin-ext'], // Include Latin character sets, as defined by Google Fonts
            custom: [] // No custom Unicode ranges
        }
    });

    console.log('Original size:', fontData.length);
    console.log('Subsetted size:', subsettedFont.data.length);

    // If the context is long-lived, you can free individual fonts from it
    for (const font of fonts) {
        font.destroy();
    }
} finally {
    // Clean up. When running in non-browser environments, this terminates
    // worker threads, allowing the process to exit.
    context.destroy();
}

```

### Compression

```javascript
import { WoffCompressionContext } from '@glypht/core';

// Create a compression context
const compressor = new WoffCompressionContext();

try {
    // Compress TTF to WOFF2
    const ttfData = [
        new Uint8Array(/* your TTF font data */),
        new Uint8Array(/* your TTF font data */),
        new Uint8Array(/* your TTF font data */),
    ];
    // This will compress the fonts in parallel using 3 worker threads (or fewer, if there are fewer than 3 cores)
    const woff2Data = await Promise.all(compressor.compressFromTTF(
        ttfData,
        'woff2',
        11, // Compression level. 11 is the maximum for WOFF2.
        true // Transfer the font data to the worker thread
    ));

    // Decompress back to TTF
    const decompressed = await Promise.all(compressor.decompressToTTF(woff2Data));
} finally {
    // Clean up. When running in non-browser environments, this terminates
    // worker threads, allowing the process to exit.
    compressor.destroy();
}

```

## Technical Details

This library uses WebAssembly-compiled versions of:
- [HarfBuzz](https://harfbuzz.github.io/) for font subsetting
- [WOFF2](https://github.com/google/woff2) reference implementation for WOFF2 compression
- [Zopfli](https://github.com/google/zopfli) for WOFF compression (via [sfnt2woff-zopfli](https://github.com/bramstein/sfnt2woff-zopfli))
