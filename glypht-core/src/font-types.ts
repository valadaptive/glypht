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
     * The instance's PostScript name. See [Adobe Technical Note
     * #5902](https://web.archive.org/web/20250701004451/https://adobe-type-tools.github.io/font-tech-notes/pdfs/5902.AdobePSNameGeneration.pdf)
     * for more information.
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
 * TODO: HarfBuzz can actually read the full STAT table. We can unify style values and axis values.
 */
export type StyleValues = Record<StyleKey, StyleValue>;

export type SfntVersion = 'truetype' | 'opentype';

/**
 * Design axis record from the [STAT table](https://learn.microsoft.com/en-us/typography/opentype/spec/stat).
 */
export type DesignAxisRecord = {
    /** A tag designating the axis (e.g. "wght", "opsz"). */
    tag: string;
    /** The axis' name (e.g. "Weight", "Optical Size"). */
    name: string | null;
    /**
     * The order of this axis relative to others, e.g. in a face name (for example, if "opsz" is 0 and "wght" is 1, then
     * a face's name might end in "Display Bold").
     */
    ordering: number;
};

/**
 * Format for an axis value record ({@link AxisValue}).
 */
export enum AxisValueFormat {
    SingleValue = 1,
    Range = 2,
    LinkedValue = 3,
    MultipleValues = 4,
};

/** Flags for an {@link AxisValue}. */
export enum AxisValueFlags {
    /**
     * If set, this axis value table provides axis value information that is applicable to other fonts within the same
     * font family. This is used if the other fonts were released earlier and did not include information about values
     * for some axis. If newer versions of the other fonts include the information themselves and are present, then this
     * table is ignored.
     */
    OlderSibling = 0x0001,
    /**
     * If set, it indicates that the axis value represents the “normal” value for the axis and may be omitted when
     * composing name strings.
     */
    Elidable = 0x0002,
}

/**
 * A record that associates a single axis value with a name.
 */
export type AxisValueSingle = {
    format: AxisValueFormat.SingleValue;
    flags: AxisValueFlags;
    name: string | null;
    axisIndex: number;
    value: number;
};

/**
 * A record that associates a range of axis values with a name.
 *
 * The range is inclusive, and may be open-ended, in which case min or max will be negative or positive infinity
 * respectively.
 *
 * The behavior when these ranges overlap with values in other axis value records is complicated, but described in the
 * OpenType spec:
 *
 * > The range specification of a format 2 table is inclusive: both the minimum and maximum values are included within
 * > the range. Two tables for a given axis may have ranges that touch (the rangeMaxValue of one range is the
 * > rangeMinValue of the other), but ranges should not overlap more than that. In the case of two ranges that touch:
 * >
 * >   - At most one of the ranges should have the nominalValue set to the axis value at which the ranges touch.
 * >   - When the requested axis value is the value at which the ranges touch, the higher range must be used unless the
 * >     nominalValue for the lower range is set to the value at which the ranges touch, and the nominalValue for the
 * >     higher range is greater than that value.
 * >
 * > Similar behavior is used if the value of a format 1 or format 3 table touches the range of a format 2 table:
 * >
 * >   - If the value of a format 1 or format 3 table is equal to the rangeMaxValue of a format 2 table, the format 1 or
 * >     format 3 table is used.
 * >   - If the value of a format 1 or format 3 table is equal to the rangeMinValue of a format 2 table, the format 1 or
 * >     format 3 table is used except if the nominalValue of the format 2 table is also equal to the rangeMinValue.
 * >
 * > If two format 2 tables have ranges for the same axis with non-zero overlap, then the following guidance is
 * > recommended for applications:
 * >
 * >   - If two tables have identical ranges, the application should consistently choose one and ignore the other, by
 * >     its own criteria.
 * >   - Else, if the range of one table is entirely contained within the range of other, then the table with the
 * >     smaller range should be ignored.
 * >   - Else, for axis values within the overlapping range, use the table with the higher range (both rangeMinValue and
 * >     rangeMaxValue are higher).
 */
export type AxisValueRange = {
    format: AxisValueFormat.Range;
    flags: AxisValueFlags;
    name: string | null;
    axisIndex: number;
    nominalValue: number;
    min: number;
    max: number;
};

/**
 * A record that associates an axis value to another linked axis value. This is primarily intended to link a regular
 * weight to a "Bold" weight, e,g. to know which weight to select if a user clicks the "Bold" button.
 */
export type AxisValueLinked = {
    format: AxisValueFormat.LinkedValue;
    flags: AxisValueFlags;
    name: string | null;
    axisIndex: number;
    value: number;
    linkedValue: number;
};

/**
 * A record that associates a set of axis values to a single name. There's some spec subtlety here:
 *
 * > When searching for an axis value table to match a particular combination of values, if two format 4 tables are
 * > found to be a partial match for that combination of values, the table that matches a greater number of values (the
 * > most specific match) should be used. If two matching format 4 tables are equally specific—the same number of values
 * > for a different set of axes—then the first matching table should be used.
 * >
 * > Similarly, if a format 1, format 2 or format 3 table has a (nominal) value used in a format 4 table that also has
 * > values for other axes, the format 4 table, being the more specific match, should be used.
 * >
 * > Because a format 4 table combines values on multiple axes, there can be ambiguity about axis ordering. This could
 * > arise when dynamically composing names using the labels provided by axis value tables, or in other situations in
 * > which the axisOrdering values of axis records are used. For a format 4 table, the axisOrdering value assumed should
 * > be the lowest axisOrdering value for the axes referenced by the format 4 table.
 */
export type AxisValueMultiple = {
    format: AxisValueFormat.MultipleValues;
    flags: AxisValueFlags;
    name: string | null;
    axisValues: {axisIndex: number; value: number}[];
};

/** An axis-value-to-name mapping. */
export type AxisValue = AxisValueSingle | AxisValueRange | AxisValueLinked | AxisValueMultiple;

/**
 * Values from the font's [STAT table](https://learn.microsoft.com/en-us/typography/opentype/spec/stat), if present.
 * These values describe a font's style axes (even those not present as *variation* axes), and the font's position in
 * the axis space.
 */
export type StyleAttributes = {
    /** The font's design axes. */
    designAxes: DesignAxisRecord[];
    /** Design axis value mappings. */
    axisValues: AxisValue[];
};

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
    data: Uint8Array<ArrayBuffer>;
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
    features?: Partial<Record<string, boolean>>;
    /**
     * Instead of subsetting tables with these tags, drop them completely.
     */
    dropTables?: string[];
    /**
     * Unicode character ranges to include in the subsetted font. You can choose to include all characters in the
     * original font, or select specific named character sets and custom ranges.
     */
    unicodeRanges: 'all' | {
        named: SubsetName[];
        custom: (readonly [number, number] | number)[];
    };
    /**
     * Whether to preprocess the font being subsetted. This provides a speedup if subsetting a font multiple times (e.g.
     * to instance it into multiple files).
     */
    preprocess?: boolean;
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
     * Values from the font's [STAT table](https://learn.microsoft.com/en-us/typography/opentype/spec/stat), if present.
     */
    styleAttributes: StyleAttributes | null;
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
    /**
     * Returns the original font file data behind this font. Unlike {@link subset} with `null` settings, this will not
     * extract single font faces from collections.
     */
    getFontFileData(): Promise<Uint8Array<ArrayBuffer>>;
    /**
     * Returns a hash (as a hex string) of the original font file data behind this font (if this font is part of a
     * collection, the hash will be the same for all the fonts in that collection). This can be helpful for e.g.
     * persisting fonts in a webapp.
     */
    getFontFileHash(): Promise<string>;
};
