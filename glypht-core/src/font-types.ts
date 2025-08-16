import {SubsetName} from './generated/subset-ranges.js';
export {SUBSET_NAMES, SubsetName} from './generated/subset-ranges.js';

/**
 * Information about a font's variation axis.
 */
export type AxisInfo = {
    /** The axis' tag name, a four-character string (e.g. "wght", "wdth"). */
    tag: string;
    /** The axis' human-readable name, if provided in the font file. */
    name: string | null;
    /** The axis' minimum value. */
    min: number;
    /** The axis' default value. */
    defaultValue: number;
    /** The axis' maximum value. */
    max: number;
};

/**
 * Like {@link AxisInfo}, except if the axis was pinned to a value, it keeps that value.
 */
export type SubsetAxisInfo = StyleValue & {
    tag: string;
    name: string | null;
};

/**
 * A style attribute in a font (weight, width, italic, or slant). This can be variable or static.
 */
export type StyleValue = {
    type: 'single';
    value: number;
} | {
    type: 'variable';
    value: {
        min: number;
        defaultValue: number;
        max: number;
    };
};

/**
 * Information about an OpenType feature in a font.
 */
export type FeatureInfo = {
    /** The feature's tag name, a four-character string (e.g. "kern", "cv01"). */
    tag: string;
    /** The feature's human-readable name, if provided in the font file. */
    label: string | null;
    /** True if this feature should be kept by default when subsetting this font. */
    keepByDefault: boolean;
};

/**
 * Information about a named/predefined instance in a variable font.
 */
export type NamedInstance = {
    /** The instance's subfamily name (e.g. "Bold Condensed Display"). */
    subfamilyName: string | null;
    /**
     * The instance's PostScript name.
     * See https://web.archive.org/web/20250701004451/https://adobe-type-tools.github.io/font-tech-notes/pdfs/5902.AdobePSNameGeneration.pdf for more information.
     */
    postscriptName: string | null;
    /** The OpenType variation axis coordinates that correspond to this named instance. */
    coords: Partial<Record<string, number>>;
};

export type StyleKey =
    | 'weight'
    | 'width'
    | 'italic'
    | 'slant';

/**
 * Values of the properties of a font that can be specified in a CSS `@font-face` declaration. These may be variation
 * axes or static values; if they are the former, those variation axes will not appear under {@link FontRef#axes}.
 *
 * - Font weight (`wght` axis if variable; `font-weight` in CSS)
 * - Font width (`wdth` axis if variable; `font-stretch` in CSS, eventually will be renamed to `font-width`)
 * - Italics and slant (`ital` and `slnt` if variable; `font-style` in CSS)
 *
 * @todo HarfBuzz can actually read the full STAT table. We can unify style values and axis values.
 */
export type StyleValues = Record<StyleKey, StyleValue>;

export type SfntVersion = 'truetype' | 'opentype';

/**
 * Output font after subsetting.
 */
export type SubsettedFont = {
    /**
     * This font's family name, not including any weight, width, or style modifiers (e.g. "Inter Display"). This should
     * be used for the filename and CSS 'font-family'.
     */
    familyName: string;
    /** This font's subfamily name (e.g. "Light Italic"). */
    subfamilyName: string;
    /** Whether this font contains TrueType (glyf) outlines or OpenType (CFF or CFF2) outlines. */
    format: SfntVersion;
    /** The actual subsetted font file data. */
    data: Uint8Array;
    /** The font's style values (weight, width, italic, slant), either variable or fixed. */
    styleValues: StyleValues;
    /**
     * Information about the non-style variation axes. All axes from the original font are included here, even if they
     * were pinned to fixed values.
     */
    axes: SubsetAxisInfo[];
    /**
     * If all variation axes were pinned, and the values they were pinned to correspond to a named instance, this is
     * that named instance.
     */
    namedInstance: NamedInstance | null;
    /**
     * All the Unicode code points contained in the subsetted font.
     */
    unicodeRanges: (number | readonly [number, number])[];
};

/**
 * Information about a Google Fonts-defined character subset with regards to a certain font.
 */
export type SubsetInfo = {
    /** Google Fonts' name for this character subset (e.g. "latin", "latin-ext", "adlam"). */
    name: SubsetName;
    /** Percentage of code points in this subset included in this font. */
    coverage: number;
    /**
     * Whether this subset counts as partially covered by this font. The threshold is different for different subsets.
     */
    covered: boolean;
};

/**
 * Setting for a single variation axis in a font to be subset. It can be pinned to a single value or clamped to a
 * smaller range than the original axis.
 */
export type SubsetAxisSetting = {
    type: 'single';
    tag: string;
    value: number;
} | {
    type: 'variable';
    tag: string;
    value: {
        min: number;
        defaultValue?: number;
        max: number;
    };
};

/**
 * Settings to use when subsetting a font file.
 */
export type SubsetSettings = {
    /**
     * OpenType variation axis settings, including ones for style values. You can preserve variation axes, reduce their
     * ranges, or pin them to specific values.
     */
    axisValues: SubsetAxisSetting[];
    /**
     * Map of feature tags to whether they should be included or not. Any features not accounted here will be included
     * or omitted depending on their {@link FeatureInfo#keepByDefault} values.
     */
    features: Partial<Record<string, boolean>>;
    /**
     * Unicode character ranges to include in the subsetted font. You can choose to include all characters in the
     * original font, or select specific named character sets and custom ranges.
     */
    unicodeRanges: 'all' | {
        named: SubsetName[];
        custom: (readonly [number, number] | number)[];
    };
    preprocess: boolean;
};

/**
 * A font loaded by Glypht.
 */
export type FontRef = {
    /** Identifier for a specific font face. Unique per {@link GlyphtContext}. */
    id: number;
    /** The OpenType unique font ID (name ID 3), or a hash of the font if it is absent. */
    uid: string;
    /** Number of faces in the file that this font face comes from (will be more than 1 if you load a .ttc or .otc). */
    faceCount: number;
    /** Index of this face in the file that this font face comes from. */
    faceIndex: number;
    /** This font's family name, not including any weight, width, or style modifiers (e.g. "Inter Display"). */
    familyName: string;
    /** This font's subfamily name (e.g. "Light Italic"). */
    subfamilyName: string;
    /** This font's style values (weight, width, italic, slant). These may be static or variable. */
    styleValues: StyleValues;
    /**
     * The size of the file this font comes from. If this font comes from a collection file, this will be the size of
     * the entire collection.
     */
    fileSize: number;
    /** Variable font axes. Does not include variable axes listed in {@link FontRef#styleValues}. */
    axes: AxisInfo[];
    /** List of all font features. */
    features: FeatureInfo[];
    /** List of all named font instances. */
    namedInstances: NamedInstance[];
    /**
     * Unicode subsets for which this font has some coverage. It does not need to cover the entire subset, just a small
     * portion.
     */
    subsetCoverage: SubsetInfo[];
    /**
     * All the Unicode code points contained in the font.
     */
    unicodeRanges: (number | readonly [number, number])[];
    /**
     * Unload this font, freeing any memory used for it.
     *
     * While this object does have a finalizer that may eventually run, it is recommended to explicitly unload fonts
     * when you're done with them.
     *
     * This method returns a `Promise` that resolves once the font is definitely unloaded. You probably don't need to
     * await it.
     */
    destroy(): Promise<void>;
    /**
     * Subset this font according to the provided settings. If null, the font's data will be returned as-is (but if the
     * font is part of a collection, only that particular font's data will be included).
     */
    subset(settings: SubsetSettings | null): Promise<SubsettedFont>;
};
