---
layout: docs.11ty.tsx
title: Documentation
description: Glypht documentation and guides
nav-slug: docs
eleventyNavigation:
    key: api
    title: Documentation
---

Glypht is a toolkit for working with web fonts and deploying them to production. It provides the full pipeline: you put your source fonts in, and get web-ready fonts out. There are many existing tools for various steps in this pipeline, but putting them all together is a tedious manual process. Glypht provides a pipeline that can output Google Fonts-quality web-ready fonts, but fully self-hostable.

You can use Glypht as a webapp or a CLI. The webapp is good for static sites or other use cases where you don't want to add a build step--you upload your input fonts, and download a static set of web-ready fonts. If you want to integrate Glypht into your build process, you can use the CLI. It functions like a bundler: you specify the list of input fonts and processing settings using a JavaScript config file.

You can export CLI settings from the webapp, which lets you use Glypht to access the Google Fonts library, graphically configure all the settings, then save the fonts and the settings for use in your own build pipeline.

## What it does

Packaging fonts for the web involves multiple steps:

1. Subsetting. This is the part that tools like `pyftsubset` and `hb-subset` can do already. You give them a single font file, and they output a *subset* of it with, say, only the glyphs that cover your website's language, and maybe paring down or removing unused axes in variable fonts.

    `hb-subset` and Glypht support limiting the range of variable fonts' axes, but `pyftsubset` does not. See the section below for why this is so useful.

2. Instancing. The CSS `@font-face` declaration lets you map multiple font *files* to the same family name. This means that you can split up your fonts by language script, or by weight/width/other attributes.

    Google Fonts splits up all its fonts by language to improve load times, and Glypht lets you do the same for self-hosted fonts. It lets you specify [the same language sets](https://github.com/googlefonts/nam-files) as Google Fonts, as well as your own custom lists of codepoints to include.

    You can also instance variable fonts into static fonts. Say, for instance, you have a variable font with a "slant" axis that goes from 0 (upright) to 14 (italic). With Glypht, you can instance that font into two different faces, an upright face and an italic one. If you instance across multiple axes or character sets, Glypht will compute and output the full matrix of font faces.

3. Compression. `pyftsubset` supports WOFF and WOFF2 compression, but `hb-subset` does not. Glypht does, and will automatically use multiple threads when compressing multiple font files. Glypht will export WOFF2 by default (it's supported by all modern browsers), but also supports WOFF and uncompressed TTF output.

4. Packaging. Once you have your font files, you'll need some CSS to act as glue code. As mentioned above, the `@font-face` declaration maps a single font face to part of a font family, but also allows specifying *where* in that family the font is, with properties like `font-weight` and `unicode-range`. Glypht will generate a CSS file containing all the font faces, in all the formats you specify, each properly mapped into their position in their font families.

Unlike many similar tools that I'm aware of, this is pure JavaScript/WebAssembly. For the webapp, this means it runs entirely client-side (no fonts are uploaded to any external server, and there are no worries about that server ever going down or being exceptionally slow). For the CLI app, this means you don't need to worry about installing any native dependencies. The actual font subsetting/instancing is done via [the venerable HarfBuzz library](https://harfbuzz.github.io), compiled to WebAssembly, and compression is done via WebAssembly as well.

## Why variable fonts?

Variable font support is so useful because variable fonts are small. One variable font in a variety of styles is typically smaller than the equivalent split into several static fonts, and can be served with just one HTTP request.

Take [Inter](https://rsms.me/inter/), for example. It's a variable font with a weight that ranges from 100 to 900.

With Glypht's default subsetting settings, the font (in WOFF2 format) is **235KB** at this full range of weights.

Let's say you only need certain weights, say, 400 (regular) to 700 (bold). If you export those weights as two separate static fonts with weights 400 and 700, the "regular" weight is 101KB and the "bold" weight is 103KB, for a total of **204KB**.

However, Glypht lets you go even further and limit the font's weight range while keeping it a variable font. As far as I know, `hb-subset` is the only other tool which can do this.

If Inter's weight range is limited to 400-700, with the other settings remaining the same, the font is now **163KB**, smaller than both the full variable font and the pair of static fonts! As an added bonus, you get all the weights between 400 and 700 for free.
