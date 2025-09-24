---
layout: docs.11ty.tsx
title: Web app
description: Glypht webapp documentation
nav-slug: docs
eleventyNavigation:
    key: webapp
    title: Web app
    parent: api
---

## Font Upload and Management

You can upload fonts by dragging and dropping them onto the interface, or by clicking the upload area to open a file picker. The application accepts TTF+TTC (TrueType), OTF+OTC (OpenType), WOFF, and WOFF2 files.

Uploaded fonts are automatically grouped into families based on their family name metadata. Each font family appears as a separate section, with individual font files listed within their respective families. The interface displays the family name, subfamily name (style), and original file size for each font.

## Google Fonts Integration

The Google Fonts modal provides access to Google Fonts' full library (over 1,400 font families) with filtering and preview capabilities. You can browse, preview, and download fonts directly within the application. Unlike the official Google Fonts browser, this one lets you filter by supported variation axes (if you want to choose a font with e.g. a weight or a width axis).

The fonts come directly from [the Google Fonts source repo](https://github.com/google/fonts), without any Google-side preprocessing. This means that unlike the ones served from Google Fonts' CDN, [all OpenType features are supported if you enable them when exporting.](https://github.com/google/fonts/issues/1335)

Unlike [the google-webfonts-helper tool](https://gwfh.mranftl.com/fonts), variable fonts are also fully supported.

## Font Subsetting

### Character Set Management

You can create multiple character sets per font family, each targeting different use cases or languages rather than applying the same character subset to an entire family.

There are two methods for defining character sets: named subsets and custom Unicode ranges. Named subsets are standardized character collections like Latin, Latin Extended, Cyrillic, Greek, Arabic, and other language groups. These predefined subsets [are the same ones that Google Fonts uses](https://github.com/googlefonts/nam-files/).

For custom control, you can define Unicode ranges using standard Unicode notation. The system accepts individual codepoints (like U+0041 for the letter 'A'), ranges (like U+0041-005A for uppercase Latin letters), and wildcard patterns (like U+20?? for general punctuation). Multiple ranges can be combined using commas.

Each character set can be given a custom name for organization when creating multiple subsets for different languages or use cases. This custom name will be used in the outputted fonts' filenames.

The "Include all characters" option preserves the complete original character set. This is useful when you need full Unicode coverage or when working with fonts that have already been optimized.

When you define multiple character sets for a font family, the system generates CSS `unicode-range` properties for each subset. This enables browsers to download only the character sets needed for a given page, which can reduce initial page load times for multilingual sites or sites using special characters sparingly.

### Axis Control Modes

Variable fonts contain one or more variation axes that allow continuous adjustment of font properties. There are three modes for handling each axis:

- **Range mode** limits a variable axis to a smaller range while keeping it variable. For example, if a font's weight axis spans from 100 to 900, you can restrict it to 400-700 to reduce file size while maintaining variability within that range.

- **Pin mode** converts a variable axis to a static value, creating a static font at a specific point along that axis. This reduces file size when you only need one specific weight, width, or style variant.

- **Multiple/instance mode** creates multiple static font files from a single variable axis, each pinned to a different value or range. This is useful when you need specific points along an axis but don't need continuous variability between them. For example, you can instance a weight axis at 400, 600, and 700 to create separate Regular, SemiBold, and Bold font files.

  Multiple instance specifications use comma-separated lists like `400,500,600,700` to create four separate static font files. You can mix ranges and static values: `100-300,400,600-900` creates a variable font for the thin range (100-300), a static font at regular weight (400), and another variable font for the bold range (600-900).

## OpenType Features

The feature management interface provides control over which OpenType features are included in subsetted fonts. Each available feature appears as a checkbox that you can enable or disable independently. This allows you to remove unused features to reduce file size, or preserve specific typography capabilities.

When you disable a feature, it's removed from the output font, which can reduce file size for fonts with many complex features you don't need. This is useful for display fonts or fonts with extensive alternate character sets that might not be relevant to your use case.

## Export and Compression

The application supports three primary output formats for different deployment scenarios and browser support requirements.

**TTF/OTF (TrueType/OpenType)** formats provide broad compatibility and are supported by virtually all systems and browsers. These uncompressed formats are larger than web font formats but offer the widest compatibility. They're suitable for desktop applications, PDF embedding, or situations requiring guaranteed support across all platforms.

**WOFF (Web Open Font Format)** is the first-generation web font format, providing compression while maintaining broad browser support. WOFF files are smaller than TTF/OTF while being supported by all modern browsers and many older ones. The application uses Zopfli compression for WOFF output, which provides better compression than standard gzip while maintaining compatibility. **You probably don't need this format**, so it's disabled by default.

The Zopfli iteration count is configurable. Higher iteration counts produce smaller files but require more processing time. The default setting is 15 iterations.

**WOFF2** is the current web font standard, offering better compression ratios through Brotli compression. WOFF2 files are typically 20-30% smaller than WOFF files and are supported by all modern browsers. This format is the primary choice for web deployment unless you need to support legacy browsers.

The compression quality level for WOFF2 ranges from 0 to 11 (it is not iteration-based like Zopfli). The default is 11, the maximum. For faster iteration, you can decrease the quality level. A setting of 10, for instance, is a few times faster while only a few percent larger. I've kept the default at 11 because that's probably what you want for production use cases, and I don't want to game any benchmarks since other tools probably default to 11 as well.

You can select any combination of these formats for simultaneous export. The system will generate all requested formats from the same subsetted font data. Under the advanced settings (the gear icon in the exported fonts sidebar), you can control the compression levels for the WOFF and WOFF2 formats, and choose to exclude uncompressed font formats from the generated CSS even if you choose to export them.

Compression is performed in parallel across font files and formats using web workers. This greatly reduces export times when working with large font collections.

### CSS Generation

The application automatically generates a CSS file containing `@font-face` declarations for all exported fonts.

For fonts that have been split into multiple character sets, the system automatically generates `unicode-range` properties that specify exactly which characters each font file contains. This enables browsers to download only the font files they actually need, significantly improving page load performance for sites with complex typography needs.

The font file path prefix setting allows you to specify where your font files will be hosted relative to your CSS file. This might be a simple relative path like `fonts/` or a complete URL like `https://cdn.example.com/fonts/`.
