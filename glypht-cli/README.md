# @glypht/cli

This is the command-line interface for Glypht, a modern toolkit for subsetting and optimizing fonts for the web.

Glypht is to fonts what Vite and Rollup are to JavaScript. It takes your fonts as input, and bundles and transforms them into a web-suitable and efficient format.

## Why use Glypht?

There already exist tools like `pyftsubset` and `hb-subset` but they aren't well-integrated with the web ecosystem and are limited in scope. Packaging fonts for the web involves multiple steps:

1. Subsetting. This is the part that `pyftsubset` and `hb-subset` can do already. You give them a single font file, and they output a *subset* of it with, say, only the glyphs that cover your website's language, and maybe paring down or removing unused axes in variable fonts.

2. Instancing. The CSS `@font-face` declaration lets you map multiple font *files* to the same family name. This means that you can split up your fonts by language script, or by weight/width/other attributes.

    Google Fonts splits up all its fonts by language to improve load times, and Glypht lets you do the same for self-hosted fonts. It lets you specify [the same language sets](https://github.com/googlefonts/nam-files) as Google Fonts, as well as your own custom lists of codepoints to include.

    You can also instance variable fonts into static fonts. Say, for instance, you have a variable font with a "slant" axis that goes from 0 (upright) to 14 (italic). With Glypht, you can instance that font into two different faces, an upright face and an italic one. If you instance across multiple axes or character sets, Glypht will compute and output the full matrix of font faces.

3. Compression. `pyftsubset` supports WOFF and WOFF2 compression, but `hb-subset` does not. Glypht does, and will automatically use multiple threads when compressing multiple font files. Glypht will export WOFF2 by default (it's supported by all modern browsers), but also supports WOFF and uncompressed TTF output.

4. Packaging. Once you have your font files, you'll need some CSS to act as glue code. As mentioned above, the `@font-face` declaration maps a single font face to part of a font family, but also allows specifying *where* in that family the font is, with properties like `font-weight` and `unicode-range`. Glypht will generate a CSS file containing all the font faces, in all the formats you specify, each properly mapped into their position in their font families.

Like a lot of other web frontend tooling, Glypht is configured using JavaScript. It can generate a config file for your fonts that you can then customize to your liking--see below.

## Installation

```bash
npm install -g @glypht/cli
```

## Usage

There are two main commands: `gen-config` and `build`.

### `gen-config`

This command inspects one or more font files and generates a configuration file (to the location specified by `-o, --output`, or stdout if not given).

```bash
glypht gen-config -o glypht.config.js my/first/font.ttf my/second/font.ttf
```

This will produce a file that looks something like this:

```js
/**
* @import {GlyphtConfig} from '@glypht/cli'
*/

/** @satisfies {GlyphtConfig} */
export default {
    // You can also use glob patterns here. These paths are resolved relative to this config file.
    input: ['my/first/font.ttf', 'my/second/font.ttf'],
    outDir: 'assets/fonts',
    settings: {
        'YourFont': {
            enableSubsetting: true,
            styleValues: {
                weight: {type: 'variable', value: {min: 400, max: 700}},
            },
            // These start out as the default settings for which features to keep.
            features: {
                'liga': true, // Standard Ligatures
                'onum': false, // Oldstyle Figures
                /* ... */
            },
            // You can specify this as an array, in which case Glypht will split up the font by character set.
            includeCharacters: {
                includeNamedSubsets: ['latin', 'latin-ext'],
                // includeUnicodeRanges: 'U+0041, U+0050-U+0060, ...',
            },
        },
    },
};
```

This file is where you can fine-tune the build process.

### `build`

This command takes a configuration file and produces optimized font files, along with a CSS file for using them on the web.

```bash
glypht build -c glypht.config.js
```

This will read your configuration, process the fonts, and write the output to the directory specified in `outDir`.
