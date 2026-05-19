/**
 * TypeScript port of fonts_public.proto, describing the JSON shape protobuf.js produces when parsing a METADATA.pb.
 * Field names are camelCased per protobuf.js convention.
 */

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
    tag?: string;
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
    filesInGfontsPr?: number;
    sourceFiles?: string[];
};

export type TargetTypeProto =
    | 'TARGET_UNSPECIFIED'
    | 'TARGET_OS_WINDOWS'
    | 'TARGET_OS_MAC'
    | 'TARGET_OS_LINUX'
    | 'TARGET_OS_ANDROID'
    | 'TARGET_OS_IOS';

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
    specimen48?: string;
    specimen36?: string;
    specimen32?: string;
    specimen21?: string;
    specimen16?: string;
    note?: string;
};

export type GlyphGroupProto = {
    name?: string;
    glyphs?: string;
};

export type FamilyProto = {
    name: string;
    designer: string;
    license: string;
    category?: string[];
    dateAdded: string;
    fonts?: FontProto[];
    aliases?: string[];
    subsets?: string[];
    ttfAutohintArgs?: string;
    axes?: AxisSegmentProto[];
    registryDefaultOverrides?: Record<string, number>;
    source?: SourceProto;
    isNoto?: boolean;
    languages?: string[];
    fallbacks?: FamilyFallbackProto[];
    sampleGlyphs?: Record<string, string>;
    sampleText?: SampleTextProto;
    displayName?: string;
    orderedSampleGlyphs?: GlyphGroupProto[];
    minisiteUrl?: string;
    primaryScript?: string;
    primaryLanguage?: string;
    stroke?: string;
    classifications?: string[];
};
