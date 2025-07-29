import type {FamilySubsetSettings} from '@glypht/bundler';

export type GlyphtConfig = {
    /** One or more paths to input font files. These can be glob patterns. */
    input: string | string[];
    /** The directory where the optimized fonts and CSS will be written. */
    outDir: string;
    /** The path to write the CSS file to. If not specified, it will be written to `fonts.css` in `outDir`. */
    outCssFile?: string;
    /**
     * If you choose to output .ttf files, whether or not to include them in the output CSS as a `src`. Defaults to
     * `true`.
     */
    includeTtfInCss?: boolean;
    /** A path to prepend to the font URLs in the generated CSS file. */
    basePath?: string;
    /** Subset settings for each font family. */
    settings: Record<string, FamilySubsetSettings>;
    /** Which font formats to output. Defaults to `{woff2: true}`. */
    formats?: {
        ttf?: boolean;
        woff?: boolean;
        woff2?: boolean;
    };
    /** The Zopfli iteration count for WOFF compression (default: 15). */
    woffCompression?: number;
    /** The Brotli compression level for WOFF2 compression (default: 11). */
    woff2Compression?: number;
};

export {build} from './build';
