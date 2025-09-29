import * as v from 'valibot';
import {GlyphtConfig} from '.';
import {SUBSET_NAMES} from '@glypht/core';

const SubsetAxisSettingSchema = v.variant('type', [
    v.object({
        type: v.literal('single'),
        value: v.number(),
    }),
    v.object({
        type: v.literal('variable'),
        value: v.object({
            min: v.number(),
            defaultValue: v.optional(v.number()),
            max: v.number(),
        }),
    }),
    v.object({
        type: v.literal('multiple'),
        value: v.object({
            ranges: v.array(v.union([v.tuple([v.number(), v.number()]), v.number()])),
            defaultValue: v.optional(v.number()),
        }),
    }),
]);

const SubsetNameSchema = v.picklist(SUBSET_NAMES);

const CharacterSetSettingsSchema = v.object({
    includeNamedSubsets: v.optional(v.array(SubsetNameSchema)),
    includeUnicodeRanges: v.optional(
        v.union([v.string(), v.array(v.union([v.number(), v.tuple([v.number(), v.number()])]))])),
    name: v.optional(v.string()),
});

const FamilySubsetSettingsSchema = v.variant('enableSubsetting', [
    v.object({
        enableSubsetting: v.literal(true),
        styleValues: v.record(v.string(), SubsetAxisSettingSchema),
        axes: v.record(v.string(), SubsetAxisSettingSchema),
        features: v.optional(v.record(v.string(), v.boolean())),
        includeCharacters: v.union([v.array(CharacterSetSettingsSchema), CharacterSetSettingsSchema, v.literal('all')]),
        overrideName: v.optional(v.string()),
    }),
    v.object({
        enableSubsetting: v.literal(false),
        overrideName: v.optional(v.string()),
    }),
]);

const GlyphtConfigSchema = v.object({
    input: v.union([v.string(), v.array(v.string())]),
    outDir: v.string(),
    outCssFile: v.optional(v.string()),
    includeTtfInCss: v.optional(v.boolean()),
    basePath: v.optional(v.string()),
    settings: v.record(v.string(), FamilySubsetSettingsSchema),
    formats: v.optional(v.record(v.string(), v.boolean())),
    woffCompression: v.optional(v.number()),
    woff2Compression: v.optional(v.number()),
});

const GlyphtArrayConfigSchema = v.array(GlyphtConfigSchema);

export const parseSettings = (settings: unknown): GlyphtConfig | GlyphtConfig[] => {
    // This gives better error messages than parsing a `v.union` of GlyphtConfigSchema and GlyphtArrayConfigSchema.
    const result = Array.isArray(settings) ?
        v.safeParse(GlyphtArrayConfigSchema, settings) :
        v.safeParse(GlyphtConfigSchema, settings);
    if (result.issues) {
        throw new Error(v.summarize(result.issues));
    }
    return result.output;
};
