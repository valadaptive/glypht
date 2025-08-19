# Glypht: a Webfont Converter / Subsetter / Instancer

This is a webapp for working with web fonts and deploying them to production. It's intended to provide the full pipeline: you put your source fonts in, and get web-ready fonts out. There are many existing tools for various steps in this pipeline, but putting them all together is a tedious manual process. Glypht provides a pipeline that can output Google Fonts-quality web-ready fonts, but fully self-hostable:

1. **Subsetting:** Reduce the character set of the fonts to only languages used on your website, and remove unnecessary OpenType features, saving space.
2. **Instancing:** Convert variable fonts to sets of static fonts, or separate out different character sets into different font files to be downloaded as needed. The latter also entails generating [the CSS `unicode-range` property](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range) for each output font, which Glypht will do for you.
3. **Converting:** Convert TTF/OTF fonts to WOFF2 (and optionally WOFF, if you need to support older browsers). Glypht does this in parallel, using all available CPU threads. As a bonus, Glypht also accepts WOFF and WOFF2 as input, so you can also use it as a WOFF(2) -> TTF converter in a pinch.
4. **Packaging:** Do all of the above and generate a CSS file containing `@font-face` declarations for all the fonts. You can then download all the fonts and use them for your site.

Unlike all similar web-based tools that I'm aware of, this runs **entirely client-side** via WebAssembly. Despite the performance penalty of running in WebAssembly compared to native code, this is actually significantly *faster* than other web-based tools I've tested, and probably all the Python ones too.

The actual font subsetting/instancing is done via [the HarfBuzz library](https://harfbuzz.github.io), compiled to WebAssembly.

## Comparison

- Glypht:
  - Performs subsetting, instancing, conversion, and packaging.
  - Performs conversion in parallel using web workers.
  - Is browser-based, but runs client-side--no fonts are ever uploaded to a third-party server.
  - Is designed with **first-class support for variable fonts.** Many similar tools don't support variable fonts at all, and those that do (e.g. pyftsubset) don't support subsetting the variable axes themselves.

- [FontSquirrel's webfont generator](https://www.fontsquirrel.com/tools/webfont-generator):
  - Performs subsetting, hinting, conversion, feature flattening/freezing, and packaging.
  - Seems to perform its own secret-sauce autohinting by default, even if the font already has hinting.
  - "Auto-adjusts" vertical metrics by default.
  - May also do other processing steps that are geared towards the legacy web and are of dubious merit today.
  - Runs server-side, and is extremely slow (10 seconds just to upload small font files, around a minute to process them).
  - Doesn't support variable fonts; just returns a .zip containing no font files at all (after the requisite 1-minute wait).

- [Everything Fonts' subsetter](https://everythingfonts.com/subsetter):
  - Performs character subsetting only; doesn't do any conversion.
  - Runs server-side; quite fast, but appears to have a hidden file size limit that it doesn't tell you about, and fails silently if you exceed it.

- [pyftsubset](https://fonttools.readthedocs.io/en/latest/subset/index.html):
  - Does both subsetting and conversion, as a command-line tool.
  - Written in Python and hence may be tricky to install.
  - Unlike Glypht, doesn't support instancing, pinning, or restricting the range of OpenType variation axes (for variable fonts).

- [glyphhanger](https://github.com/zachleat/glyphhanger):
  - Command-line tool; shells out to `pyftsubset` for the subsetting part.
  - Allows for very precise subsetting by scanning for all characters used in a given file or set of files.

- [HarfBuzz' `hb-subset`](https://harfbuzz.github.io/utilities.html#utilities-command-line-hbsubset):
  - Command-line interface for the same API that Glypht uses internally.
  - Supports all the same subsetting operations as Glypht does.
  - Performs subsetting only, no conversion.

- [kombu](https://kombu.kanejaku.org/):
  - Performs conversion only; no subsetting.
  - Doesn't generate CSS.
  - Runs client-side, but only uses one thread (Glypht can convert multiple fonts in parallel).

- [google-webfonts-helper](https://gwfh.mranftl.com/):
  - Performs packaging of fonts available from Google Fonts, allowing them to be self-hosted.
  - Instancing is required; variable fonts will be converted into static fonts, increasing the total download size. This is not Google Fonts' fault, but rather a limitation of google-webfonts-helper itself.
  - Doesn't support any non-default OpenType features (like character variants, stylistic sets, tabular figures, small caps, etc), since Google Fonts [strips them](https://github.com/google/fonts/issues/1335).

## Variable fonts

Variable font support is so useful because variable fonts are smaller than static fonts. One variable font in a variety of styles is typically smaller than the equivalent split into several static fonts, and can be served with just one HTTP request.

Take [Inter](https://rsms.me/inter/), for example. It's a variable font with a weight that ranges from 100 to 900.

With Glypht's default subsetting settings, the font (in WOFF2 format) is **235KB** at this full range of weights.

Let's say you only need certain weights, say, 400 (regular) to 700 (bold). If you export those weights as two separate static fonts with weights 400 and 700, the "regular" weight is 101KB and the "bold" weight is 103KB, for a total of **204KB**.

However, Glypht lets you go even further and limit the font's weight range while keeping it a variable font. As far as I know, `hb-subset` is the only other tool which can do this.

If Inter's weight range is limited to 400-700, with the other settings remaining the same, the font is now **163KB**, smaller than both the full variable font and the pair of static fonts! As an added bonus, you get all the weights between 400 and 700 for free.


## Future ideas

- Instance different character sets into different font files, using the `@font-face` rule's `unicode-range` property
- Allow for "freezing" OpenType features (see https://twardoch.github.io/fonttools-opentype-feature-freezer/)
- Autohinting
  - This is tricky because we may need different autohinters for CFF/CFF2 and TrueType outlines
- Move the core functionality into a library and expose a CLI for it as well
- Preview the glyphs in a font
- Preview font features (see https://fontdrop.info/)
- Make use of the data in https://github.com/google/fonts/ for font preview text, axis descriptions, etc.
- Support the new [incremental font transfer](https://w3c.github.io/IFT/Overview.html) standard
  - Probably should wait for it to be actually standardized though
- Use the feature tag info registry more (show explanations of font features)
- Allow users to choose fonts from Google Fonts' list (https://github.com/google/fonts has versions *without* the features removed!)
  - We can probably hotlink to the GitHub CDN files and just have a static list of them
