export type AxisPositionProto = {
    tag: string;
    position: number;
};

export type FontProto = {
    name: string;
    style: string;
    weight: number;
    filename: string;
    postScriptName: string;
    fullName: string;
    copyright?: string;
    position?: AxisPositionProto;
};

export type AxisSegmentProto = {
    tag: string;
    minValue?: number;
    maxValue?: number;
};

export type SourceFileProto = {
    sourceFile?: string;
    destFile?: string;
};

export type SourceProto = {
    repositoryUrl?: string;
    branch?: string;
    commit?: string;
    archiveUrl?: string;
    configYaml?: string;
    files?: SourceFileProto[];
};

export type TargetTypeProto = "TARGET_UNSPECIFIED" | "TARGET_OS_WINDOWS" | "TARGET_OS_MAC" | "TARGET_OS_LINUX" | "TARGET_OS_ANDROID" | "TARGET_OS_IOS";

export type TargetProto = {
    targetType?: TargetTypeProto;
};

export type FamilyFallbackProto = {
    axisTarget?: AxisSegmentProto[];
    target?: TargetProto[];
    sizeAdjustPct?: number;
    ascentOverridePct?: number;
    localSrc?: string[];
};

export type SampleTextProto = {
    mastheadFull?: string;
    mastheadPartial?: string;
    styles?: string;
    tester?: string;
    posterSm?: string;
    posterMd?: string;
    posterLg?: string;
    note?: string;
};

export type GlyphGroupProto = {
    name?: string;
    glyphs?: string;
};

export type FamilyProto = {
    name: string;
    designer: string;
    license: License;
    category: Category[];
    dateAdded: string;
    fonts: FontProto[];
    aliases?: string[];
    subsets?: string[];
    ttfAutohintArgs?: string;
    axes?: AxisSegmentProto[];
    registryDefaultOverrides?: Record<string, number>;
    isNoto?: boolean;
    languages?: string;
    fallbacks?: FamilyFallbackProto[];
    sampleGlyphs?: Record<string, string>;
    sampleText?: SampleTextProto;
    displayName?: string;
    orderedSampleGlyphs?: GlyphGroupProto[];
    minisiteUrl?: string;
    primaryScript?: string;
    primaryLanguage?: number;
    stroke?: Stroke;
    classifications?: Classification[];
    path: string;
    proportion: Proportion;
    descriptionRange?: [number, number];
    defaultSort: number;
    trending: number;
    popularity: number;
};

export type ExemplarCharsProto = {
    base?: string;
    auxiliary?: string;
    marks?: string;
    numerals?: string;
    punctuation?: string;
    index?: string;
    notRequired?: string;
};

export type LanguageProto = {
    id: string;
    language?: string;
    script?: string;
    name?: string;
    preferredName?: string;
    autonym?: string;
    population?: number;
    region?: string[];
    sampleText?: SampleTextProto;
    historical?: boolean;
    source?: string[];
};

export type FallbackProto = {
    name?: string;
    value?: number;
    displayName?: string;
};

export type AxisProto = {
    tag: string;
    displayName?: string;
    minValue?: number;
    defaultValue?: number;
    maxValue?: number;
    precision?: number;
    fallback?: FallbackProto[];
    description?: string;
    fallbackOnly?: boolean;
    illustrationUrl?: string;
    popularity: number;
};

export type ScriptProto = {
    id: string;
    name?: string;
    historical?: boolean;
    fictional?: boolean;
    family?: string;
    exemplarLang?: string;
};

export type Category = "MONOSPACE" | "SANS_SERIF" | "SERIF" | "HANDWRITING" | "DISPLAY";

export type Classification = "MONOSPACE" | "DISPLAY" | "HANDWRITING" | "SYMBOLS";

export type Stroke = "SANS_SERIF" | "SLAB_SERIF" | "SERIF";

export type License = "UFL" | "OFL" | "APACHE2";

export type Proportion = "MONOSPACE" | "PROPORTIONAL" | "BOTH";