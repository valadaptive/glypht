# @glypht/cli

This is the command-line interface for Glypht, a modern toolkit for subsetting and optimizing fonts for the web.

Glypht is to fonts what Vite and Rollup are to JavaScript. It takes your fonts as input, and bundles and transforms them into a web-suitable and efficient format.

Like a lot of other web frontend tooling, Glypht is configured using JavaScript. It can generate a config file for your fonts that you can then customize to your liking--see below.

In addition to generating a config from this CLI, you can also use [the webapp](https://glypht.valadaptive.dev).

## Installation

```bash
npm install -g @glypht/cli
```

## Usage

There are two main commands: `gen-config` and `build`. For a full list of options, use `glypht [subcommand] --help` (e.g. `glypht gen-config --help`).

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

### `build`

This command takes a configuration file and produces optimized font files, along with a CSS file for using them on the web.

```bash
glypht build -c glypht.config.js
```

This will read your configuration, process the fonts, and write the output to the directory specified in `outDir`.
