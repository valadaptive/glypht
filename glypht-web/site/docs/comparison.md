---
layout: docs.11ty.tsx
title: Comparison with other tools
description: A comparison between Glypht and other web font-related tools
eleventyNavigation:
    key: comparison
    title: Comparison with other tools
    parent: api
---

There are many tools for subsetting, compressing, and otherwise working with web fonts. I developed Glypht because I wasn't quite satisfied with any of them. Here are some comparisons between them:

## Glypht

- Performs subsetting, instancing, conversion, and packaging.
- Performs conversion in parallel using web workers.
- Runs in the browser and as a CLI tool. Implemented entirely in JavaScript and WebAssembly--no fonts are ever uploaded to a third-party server, and there are no dependencies on external tools.
- Is designed with **first-class support for variable fonts.** Many older tools don't support variable fonts at all, and those that do (e.g. pyftsubset) don't support subsetting the variable axes themselves.
- As a webapp, provides access to the Google Fonts collection, but performs its own subsetting. This allows you to include [font features that Google Fonts strips out](https://github.com/google/fonts/issues/1335).

## Multi-function tools

- [FontSquirrel's webfont generator](https://www.fontsquirrel.com/tools/webfont-generator):
  - Performs subsetting, hinting, conversion, feature flattening/freezing, and packaging.
  - Seems to perform its own secret-sauce autohinting by default, even if the font already has hinting.
  - "Auto-adjusts" vertical metrics by default. It is not clear what this implies.
  - May also do other processing steps that are geared towards the legacy web and are of dubious merit today.
  - Runs server-side, and is extremely slow (10 seconds just to upload small font files, around a minute to process them).
  - Doesn't support variable fonts; just returns a .zip containing no font files at all (after the requisite 1-minute wait).

- [pyftsubset](https://fonttools.readthedocs.io/en/latest/subset/index.html):
  - Does both subsetting and WOFF(2) conversion, as a command-line tool.
  - Written in Python and hence may be tricky to install.
  - Unlike Glypht, doesn't support instancing, pinning, or restricting the range of OpenType variation axes (for variable fonts).
  - The subsetting part is slower than Glypht.

- [glyphhanger](https://github.com/zachleat/glyphhanger):
  - Command-line tool; shells out to `pyftsubset` for the subsetting part.
  - Allows for very precise subsetting by scanning for all characters used in a given file or set of files. This is great for static sites, but you need to make sure you don't miss any page content, and it breaks once you introduce any dynamic content.

- [subfont](https://github.com/Munter/subfont):
  - Command-line tool like glyphhanger. Unlike glyphhanger, it doesn't shell out to any external tools; everything is done using WebAssembly.
  - Has similar downsides to glyphhanger with regards to figuring out exactly which characters to include.
  - Seems to automatically scan CSS to determine which variation axes to include and instance.

## Subsetters

- [Everything Fonts' subsetter](https://everythingfonts.com/subsetter):
  - Performs character subsetting only; doesn't do any conversion.
  - Runs server-side; quite fast, but appears to have a hidden file size limit that it doesn't tell you about, and fails silently if you exceed it.

- [HarfBuzz' `hb-subset`](https://harfbuzz.github.io/utilities.html#utilities-command-line-hbsubset):
  - Command-line interface for the same API that Glypht uses internally.
  - Supports all the same subsetting operations as Glypht does.
  - Performs subsetting only, no conversion.

## Converters

- [kombu](https://kombu.kanejaku.org/):
  - Performs conversion only; no subsetting.
  - Doesn't generate CSS.
  - Runs client-side, but only uses one thread (Glypht can convert multiple fonts in parallel).

- [Fontsource's webfont converter](https://fontsource.org/tools/converter):
  - Performs conversion only; no subsetting.
  - Doesn't generate CSS.
  - Uses Glypht internally, so it *does* compress fonts in parallel.

## Other utilities

- [google-webfonts-helper](https://gwfh.mranftl.com/):
  - Performs packaging of fonts available from Google Fonts, allowing them to be self-hosted.
  - Instancing is required; variable fonts will be converted into static fonts, increasing the total download size. This is not Google Fonts' fault, but rather a limitation of google-webfonts-helper itself.
  - Doesn't support any non-default OpenType features (like character variants, stylistic sets, tabular figures, small caps, etc), since Google Fonts [strips them](https://github.com/google/fonts/issues/1335).

- [OpenType Feature Freezer](https://github.com/twardoch/fonttools-opentype-feature-freezer):
  - Permanently bakes certain types of OpenType features (like small caps, character variants, and other stylistic alternates) into fonts. Glypht currently cannot do this.
  - Written in Python and uses Python `fonttools`.


## Comparison table

| Feature | **Glypht** | FontSquirrel | pyftsubset | glyphhanger | subfont | Everything Fonts | hb-subset | kombu | gwfh | OTFF |
|---------|------------|--------------|------------|-------------|---------|------------------|-----------|-------|------|------|
| **Subsetting** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Variable Fonts** | ✅ | ❌ | ✅[^1] | ✅ | ✅[^2] | ? | ✅ | N/A | ❌[^3] | N/A |
| **Compression** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ✅ | N/A |
| **CSS Generation** | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | N/A |
| **Pure JS/WASM** | ✅ | ❌[^4] | ❌[^5] | ❌[^5] | ✅ | ❌[^4] | ❌[^6] | ✅ | ❌[^4] | ❌[^5] |
| **Parallel Processing** | ✅ | ? | ❌ | ❌ | ? | N/A | N/A | ❌ | N/A | N/A |
| **Feature Freezing** | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌[^7] | ✅ |

[^1]: Does not support limiting variation axes' ranges
[^2]: Auto-detects axes and ranges from CSS
[^3]: Always gives you static instances, even if the font is variable
[^4]: Server-side processing
[^5]: Depends on Python `fonttools`
[^6]: Depends on native HarfBuzz
[^7]: Does not even ship any non-default OpenType features