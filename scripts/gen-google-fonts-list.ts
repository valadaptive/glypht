/**
 * Generates JS-readable Google Fonts metadata from the Google Fonts repo (https://github.com/google/fonts).
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {load} from 'protobufjs';
import {parse} from 'pbtxtjs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import {Schema, schemaToTypescript, typeToSchema} from './protobuf-tools';

import createHarfbuzz, {hbTag} from '../glypht-core/src/hb-wrapper';
import type {MainModule as HbShapeModule} from '../c-libs-wrapper/hb-shape';

if (process.argv.length < 2) {
    throw new Error('Provide the path to a local copy of the https://github.com/google/fonts repo as an argument.');
}
const fontsDir = process.argv[2];

// This schema exists in the Google Fonts repo, but we load our own version because some fonts' metadata contains a
// field not present in the official schema.
const fontMetadataNamespace = await load('./fonts_public.proto');
const fontMetadataType = fontMetadataNamespace.lookupType('FamilyProto');

// Wrapper for console.log statements that we want to keep
// eslint-disable-next-line no-console
const logProgress = console.log;

const progressBar = (progress: number, width: number = 25) => {
    const proportionDone = Math.max(0, Math.min(progress, 1)) * width;
    const numFullBlocks = Math.floor(proportionDone);
    let barString = '\u2588'.repeat(proportionDone);
    if (numFullBlocks < width) {
        // -1 for "none", 0-6 for block fractions. This should never be 7 because proportionDone - numFullBlocks
        // will never reach 1.
        const fractionalBlock = Math.floor((proportionDone - numFullBlocks) * 8) - 1;
        const fractionalBlockChar = fractionalBlock === -1 ?
            ' ' :
            String.fromCharCode(0x258f - fractionalBlock);
        barString += fractionalBlockChar;
        barString += ' '.repeat(width - (numFullBlocks + 1));
    };
    return barString;
};

const logUpdate = () => {
    let prevLen = 0;
    return {
        log(this: void, text: string) {
            const spaces = ' '.repeat(Math.max(prevLen - text.length, 0));
            prevLen = text.length;
            process.stdout.write(`\r${text}${spaces}`);
        },
        done(this: void) {
            const spaces = ' '.repeat(prevLen);
            process.stdout.write(`\r${spaces}\r`);
        },
    };
};

logProgress('Fetching live Google Fonts metadata for font statistics...');
const liveMetadata = await fetch('https://fonts.google.com/metadata/fonts').then(resp => resp.json()) as {
    familyMetadataList: {
        family: string;
        popularity: number;
        trending: number;
        defaultSort: number;
    }[];
};

// We'll eventually order the final fonts list by Google's sort order as well
liveMetadata.familyMetadataList.sort((a, b) => a.defaultSort - b.defaultSort);

// Array of metadata for all fonts.
const localMetadata = [];

// Array of UTF-8 font descriptions (and byte offset to write the next one to). The frontend uses HTTP range requests to
// fetch one description at a time from a big text file of all concatenated descriptions, so we need UTF-8 byte offsets.
// The source files are already UTF-8, so we won't waste any time decoding and re-encoding them.
let descOffset = 0;
const descriptions: Uint8Array[] = [];

const readFileIfExists = async(path: string): Promise<Buffer | null> => {
    try {
        return await fs.readFile(path);
    } catch {
        return null;
    }
};

logProgress('Reading and parsing all METADATA.pb files...');
const fontsFiles = await fs.readdir(fontsDir, {recursive: true});
for (const file of fontsFiles) {
    // We're interested in the METADATA.pb file for every font in the directory (recursively)
    if (!file.endsWith('METADATA.pb')) continue;
    const metaPath = path.join(fontsDir, file);
    const contents = await fs.readFile(metaPath, 'utf-8');
    const metadata = parse(contents, fontMetadataType.create({}));
    const obj = metadata.toJSON();
    // Path to the font directory, relative to the Google Fonts repository root.
    obj.path = path.dirname(file);
    // The frontend doesn't use this metadata and it's quite large and hard to compress
    delete obj.source;

    // Some fonts don't have a description but *do* have an article. I believe the article is longer?
    const descriptionPath = path.join(path.dirname(metaPath), 'DESCRIPTION.en_us.html');
    const articlePath = path.join(path.dirname(metaPath), 'article', 'ARTICLE.en_us.html');
    let description = await readFileIfExists(descriptionPath);
    // The Teachers font has an empty description. Trying to read it via a range request seems to result in a server
    // error.
    if (!description || description.length === 0) {
        description = await readFileIfExists(articlePath);
    }
    if (description && description.length > 0) {
        descriptions.push(new Uint8Array(description.buffer, description.byteOffset, description.byteLength));
        obj.descriptionRange = [descOffset, descOffset + description.byteLength];
        descOffset += description.byteLength;
    }

    localMetadata.push(obj);
}

// We'll later construct enums from all encountered values for these
const allCategories = new Set<string>();
const allClassifications = new Set<string>();
const allStrokes = new Set<string>();
const allLicenses = new Set<string>();

for (const f of localMetadata) {
    if (Array.isArray(f.category)) {
        for (const c of f.category) {
            allCategories.add(c);
        }
    }
    if (Array.isArray(f.classifications)) {
        for (const c of f.classifications) {
            allClassifications.add(c);
        }
    }
    if (typeof f.stroke === 'string') {
        allStrokes.add(f.stroke);
    }
    allLicenses.add(f.license);
}

// Take the list of fonts from the live Google Fonts site and map them to our local metadata
const localFamilies = new Map();
const liveFamilies = new Map();
for (const f of liveMetadata.familyMetadataList) {
    liveFamilies.set(f.family, f);
}
for (const f of localMetadata) {
    localFamilies.set(f.name, f);

    if (!liveFamilies.has(f.name)) {
        // eslint-disable-next-line no-console
        console.warn(`${f.name} is not live on Google Fonts`);
    }
}

const sortedLocalMetadata = [];
for (const f of liveMetadata.familyMetadataList) {
    if (!localFamilies.has(f.family)) {
        // eslint-disable-next-line no-console
        console.warn(`${f.family} is not in the local repo`);
        continue;
    }
    sortedLocalMetadata.push(localFamilies.get(f.family));
}

logProgress('Reading and parsing all language metadata...');
const gflanguagesDir = path.join(fontsDir, 'lang/Lib/gflanguages');
const languageDataNamespace = await load(path.join(gflanguagesDir, 'languages_public.proto'));
const languageType = languageDataNamespace.lookupType('LanguageProto');
const scriptType = languageDataNamespace.lookupType('ScriptProto');
//const regionType = languageDataNamespace.lookupType('RegionProto');

const languagesData: any[] = [];
const langIndices = new Map();
const languagesDir = path.join(gflanguagesDir, 'data/languages');
for (const langFile of await fs.readdir(languagesDir)) {
    const langFilePath = path.join(languagesDir, langFile);
    const langProto = await fs.readFile(langFilePath, 'utf-8');
    const langFileData = parse(langProto, languageType.create({})).toJSON();
    // We don't need the note
    delete langFileData.note;
    // This text is quite long and not very compressible
    if (langFileData.sampleText) {
        delete langFileData.sampleText.specimen_48;
        delete langFileData.sampleText.specimen_36;
        delete langFileData.sampleText.specimen_32;
        delete langFileData.sampleText.specimen_21;
        delete langFileData.sampleText.specimen_16;
    }
    languagesData.push(langFileData);
}
// Sorting by population is useful in the frontend, and also helps with compression--we store languages as a bitset, and
// putting more popular languages towards the front means the "tail" of the bitest will contain long strings of zeroes.
// Population is not a perfect proxy for number of fonts supporting the language, but it helps.
languagesData.sort((a, b) => (b.population ?? 0) - (a.population ?? 0));
for (let i = 0; i < languagesData.length; i++) {
    langIndices.set(languagesData[i].id, i);
}

logProgress('Reading and parsing all script metadata...');

const scriptsData: any[] = [];
const scriptsDir = path.join(gflanguagesDir, 'data/scripts');
for (const scriptFile of await fs.readdir(scriptsDir)) {
    const scriptFilePath = path.join(scriptsDir, scriptFile);
    const scriptProto = await fs.readFile(scriptFilePath, 'utf-8');
    const scriptFileData = parse(scriptProto, scriptType.create({})).toJSON();
    delete scriptFileData.summary;
    scriptFileData.exemplarLang = languagesData.find(lang => lang.script === scriptFileData.id)?.id;
    scriptsData.push(scriptFileData);
}

logProgress('Using HarfBuzz to compute language coverage and PANOSE data for all fonts...');
const hb = await createHarfbuzz<HbShapeModule>(new URL('../c-libs-wrapper/hb-shape.wasm', import.meta.url).href);

const {log, done} = logUpdate();

const startTime = performance.now();

const ENCODER = new TextEncoder();
const shapingTimes = new Map<string, number>();
for (let i = 0; i < sortedLocalMetadata.length; i++) {
    const f = sortedLocalMetadata[i];
    if (!f.category || f.category.length === 0) {
        throw new Error(`${f.name} has no category`);
    }
    if (!f.fonts || f.category.length === 0) {
        throw new Error(`${f.name} has no fonts`);
    }

    // If the font doesn't explicitly enumerate its supported languages, we initialize this set to contain every
    // language with exemplar characters, and then remove all those which fail to shape.
    const supportedLanguages: Set<number> = f.languages ?
        new Set(f.languages.map((lang: string) => langIndices.get(lang))) :
        new Set();
    // Some fonts have language lists that contain languages not in the Google Fonts data??
    (supportedLanguages as Set<number | undefined>).delete(undefined);
    if (!f.languages) {
        for (let i = 0; i < languagesData.length; i++) {
            if (languagesData[i].exemplarChars) supportedLanguages.add(i);
        }
    }

    let hasMonospace = false;
    let hasProportional = false;
    for (const font of f.fonts) {
        const fontFilePath = path.join(fontsDir, f.path, font.filename);
        const fontData = await fs.readFile(fontFilePath);
        const blob = new hb.HbBlob(fontData);
        const face = hb._hb_face_create_or_fail(blob.ptr(), 0);
        if (!face) {
            throw new Error(`Could not load font from ${fontFilePath}`);
        }
        const hbFont = hb._hb_font_create(face);

        // TODO: I think Google gives us this already...
        const os2Table = new hb.HbBlob(hb._hb_face_reference_table(face, hbTag('OS/2')));
        const panose = os2Table.asArray().subarray(32, 42);
        hasMonospace ||= panose[3] === 9;
        hasProportional ||= panose[3] !== 9;
        os2Table.destroy();

        // Shape every language and mark as unsupported any language where the shaping result contains a missing glyph
        if (!f.languages) {
            const buf = hb._hb_buffer_create();
            for (let j = 0; j < languagesData.length; j++) {
                // We already tried and failed to shape using this language using a previous font in this family
                if (!supportedLanguages.has(j)) continue;

                const lang = languagesData[j];
                if (!lang.exemplarChars) continue;

                const startTime = performance.now();

                // Explicitly set the buffer's language
                let hbLang = null;
                if (lang.language) {
                    const langTagUtf8 = ENCODER.encode(lang.language);
                    const hbLangDest = hb.malloc(langTagUtf8.length);
                    hb.HEAPU8.set(langTagUtf8, hbLangDest);
                    hbLang = hb._hb_language_from_string(hbLangDest, langTagUtf8.length);
                    hb._free(hbLangDest);
                }
                let supportsLang = true;
                // Testing any set of exemplar characters other than the base set is unreliable
                // https://github.com/googlefonts/shaperglot/issues/167
                const baseExemplar = lang.exemplarChars.base;
                const exemplarSnippets = [];
                if (baseExemplar) {
                    // Exemplars can be really big. Better to start with a small chunk and then shape the rest
                    // separately for an early out if we find any missing characters. This especially speeds up CJK,
                    // which contains really long exemplar text but which most fonts don't support.
                    let subExemplar = baseExemplar.slice(0, baseExemplar.indexOf(' ', 10));
                    const lastCharCode = subExemplar.charCodeAt(subExemplar.length - 1);
                    if (lastCharCode >= 0xDC00 && lastCharCode <= 0xDCFF) {
                        subExemplar = subExemplar.slice(0, -1);
                    }
                    exemplarSnippets.push(subExemplar);
                    exemplarSnippets.push(baseExemplar.slice(subExemplar.length));
                }
                for (const exemplar of exemplarSnippets) {
                    const utf8Chars = ENCODER.encode(exemplar);
                    if (utf8Chars.length === 0) continue;
                    const utf8Dest = hb.malloc(utf8Chars.length);
                    hb.HEAPU8.set(utf8Chars, utf8Dest);
                    hb._hb_buffer_reset(buf);
                    hb._hb_buffer_add_utf8(buf, utf8Dest, utf8Chars.length, 0, utf8Chars.length);

                    // Set segment properties from the language metadata and then from guessing as a fallback
                    if (lang.script) hb._hb_buffer_set_script(buf, hb._hb_script_from_iso15924_tag(hbTag(lang.script)));
                    if (hbLang !== null) hb._hb_buffer_set_language(buf, hbLang);
                    hb._hb_buffer_guess_segment_properties(buf);

                    hb._hb_shape(hbFont, buf, 0, 0);

                    const shouldBreak = hb.withStack(() => {
                        const glyphInfosLenPtr = hb.stackAlloc(4);
                        const glyphInfosPtr = hb._hb_buffer_get_glyph_infos(buf, glyphInfosLenPtr);
                        const GLYPH_INFO_SIZE = 20;
                        const glyphInfosLen = hb.readUint32(glyphInfosLenPtr);
                        for (let i = 0; i < glyphInfosLen; i++) {
                            const glyphId = hb.readUint32(glyphInfosPtr + (i * GLYPH_INFO_SIZE));
                            if (glyphId === 0) {
                                /*const clusterId = hb.readUint32(glyphInfosPtr + (i * GLYPH_INFO_SIZE) + 8);
                                const clusterChar = String.fromCodePoint(new TextDecoder()
                                    .decode(utf8Chars.subarray(clusterId))
                                    .codePointAt(0)!);
                                /console.log(`${f.name} failed at ${clusterChar} on lang ${lang.id}`);*/
                                supportsLang = false;
                                return true;
                            }
                        }
                        return false;
                    });
                    hb._free(utf8Dest);
                    if (shouldBreak) break;
                }

                if (!supportsLang) {
                    supportedLanguages.delete(j);
                }

                // Record performance metrics
                const endTime = performance.now();
                const prevShapeTime = shapingTimes.get(lang.id) ?? 0;
                shapingTimes.set(lang.id, prevShapeTime + (endTime - startTime));
            }
            hb._hb_buffer_destroy(buf);
        }

        hb._hb_font_destroy(hbFont);
        hb._hb_face_destroy(face);
        blob.destroy();
    }

    if (f.axes?.some((axis: any) => axis.tag === 'MONO')) {
        hasMonospace = true;
        hasProportional = true;
    }

    // Store language data as a base64-encoded dense bitset
    const langsBitset = new Uint8Array((languagesData.length + 7) >> 3);
    const setBitAt = (idx: number) => {
        const bucket = idx >> 3;
        const bitIdx = idx & 7;
        langsBitset[bucket] |= 1 << bitIdx;
    };

    for (const lang of supportedLanguages) {
        setBitAt(lang);
    }

    const encoded = Buffer.from(langsBitset).toString('base64');

    f.languages = encoded;
    f.primaryLanguage = langIndices.get(f.primaryLanguage);
    f.proportion = hasMonospace && hasProportional ? 'BOTH' : hasMonospace ? 'MONOSPACE' : 'PROPORTIONAL';

    const completed = i + 1;
    log(`\x1b[;100m${progressBar(completed / sortedLocalMetadata.length)}\x1b[;0m ${completed} / ${sortedLocalMetadata.length}`);
}
done();

for (const [lang, time] of shapingTimes) {
    logProgress(`${lang}: ${time.toFixed(1)}ms`);
}
logProgress(`Total shaping and analysis time: ${((performance.now() - startTime) / 1000).toFixed(1)}s`);

logProgress('Reading and parsing all variation axis metadata...');
const axisRegistryDir = path.join(fontsDir, 'axisregistry/Lib/axisregistry');
const axisDataNamespace = await load(path.join(axisRegistryDir, 'axes.proto'));
const axisType = axisDataNamespace.lookupType('AxisProto');

const axesData: any[] = [];
const axesDir = path.join(axisRegistryDir, 'data');
for (const axisFile of await fs.readdir(axesDir)) {
    if (!axisFile.endsWith('.textproto')) continue;
    const axisFilePath = path.join(axesDir, axisFile);
    const axisProto = await fs.readFile(axisFilePath, 'utf-8');
    const axisFileData = parse(axisProto, axisType.create({})).toJSON();
    axesData.push(axisFileData);
}

// Sort axes by the number of fonts they're used in, and store the axis popularity on the metadata itself
const axisPopularities = new Map();
for (const f of sortedLocalMetadata) {
    if (!f.axes) continue;
    for (const axis of f.axes) {
        const popularity = axisPopularities.get(axis.tag) ?? 0;
        axisPopularities.set(axis.tag, popularity + 1);
    }
}
for (const axis of axesData) {
    axis.popularity = axisPopularities.get(axis.tag) ?? 0;
}

// Convert all our Protobuf schemas to TypeScript schemas (with modifications)
const tsRegistry: Record<string, Schema> = {};
typeToSchema(fontMetadataType, tsRegistry);
typeToSchema(languageType, tsRegistry);
typeToSchema(axisType, tsRegistry);
typeToSchema(scriptType, tsRegistry);

// Enum-ify certain string values from earlier
tsRegistry.Category = {
    type: 'enum',
    values: Array.from(allCategories),
};
tsRegistry.Classification = {
    type: 'enum',
    values: Array.from(allClassifications),
};
tsRegistry.Stroke = {
    type: 'enum',
    values: Array.from(allStrokes),
};
tsRegistry.License = {
    type: 'enum',
    values: Array.from(allLicenses),
};
// Added during processing here from the PANOSE table.
tsRegistry.Proportion = {
    type: 'enum',
    values: ['MONOSPACE', 'PROPORTIONAL', 'BOTH'],
};
type RecordSchema = Exclude<Schema, string> & {type: 'record'};
type ArraySchema = Exclude<Schema, string> & {type: 'array'};

// TODO: this doesn't work and marks some fields as mandatory even if they're sometimes missing.
/*const mandatorify = (schema: Schema, examples: unknown[]) => {
    if (typeof schema === 'object' && schema.type === 'record') {
        const fieldsMandatory: Record<string, boolean> = {};
        for (const field of schema.fields) {
            fieldsMandatory[field.name] = true;
        }
        for (const example of examples) {
            if (typeof example === 'object') {
                for (const field of schema.fields) {
                    if (!Object.prototype.hasOwnProperty.call(example, field.name)) {
                        fieldsMandatory[field.name] = false;
                        break;
                    }
                }
            }
        }
        for (const field of schema.fields) {
            if (fieldsMandatory[field.name]) {
                field.optional = false;
            }
        }
    }
};*/

const FamilyProto = tsRegistry.FamilyProto as RecordSchema;
// Refine enum field types to not just be "string"
(FamilyProto.fields
    .find(f => f.name === 'category')?.type as ArraySchema).elements = 'Category';
(FamilyProto.fields
    .find(f => f.name === 'classifications')?.type as ArraySchema).elements = 'Classification';
FamilyProto.fields
    .find(f => f.name === 'stroke')!.type = 'Stroke';
FamilyProto.fields
    .find(f => f.name === 'license')!.type = 'License';

// These fields will always exist
FamilyProto.fields
    .find(f => f.name === 'category')!.optional = false;
FamilyProto.fields
    .find(f => f.name === 'fonts')!.optional = false;
// Add custom fields
FamilyProto.fields.push({name: 'path', type: 'string', optional: false});
FamilyProto.fields.push({name: 'proportion', type: 'Proportion', optional: false});
FamilyProto.fields.push({name: 'descriptionRange', type: '[number, number]', optional: true});
FamilyProto.fields = FamilyProto.fields.filter(f => f.name !== 'source');

// Store languages as a base64'd bitset to save space (340kB -> 250kB gzipped)
FamilyProto.fields
    .find(f => f.name === 'languages')!.type = 'string';

// Store the language's index instead of the language itself
FamilyProto.fields
    .find(f => f.name === 'primaryLanguage')!.type = 'number';
//mandatorify(FamilyProto, sortedLocalMetadata);

const AxisProto = tsRegistry.AxisProto as RecordSchema;
// An axis will always have a `tag` field
AxisProto.fields
    .find(f => f.name === 'tag')!.optional = false;
// We added this ourselves earlier
AxisProto.fields.push({name: 'popularity', type: 'number', optional: false});

const LanguageProto = tsRegistry.LanguageProto as RecordSchema;
// A language will always have an ID
LanguageProto.fields
    .find(f => f.name === 'id')!.optional = false;
// Remove exemplarChars and note for the webapp since they're never used there
LanguageProto.fields = LanguageProto.fields.filter(f => f.name !== 'exemplarChars' && f.name !== 'note');
//mandatorify(LanguageProto, languagesData);

const SampleTextProto = tsRegistry.SampleTextProto as RecordSchema;
// These take up tons of space
SampleTextProto.fields = SampleTextProto.fields.filter(f => !f.name.startsWith('specimen'));

const ScriptProto = tsRegistry.ScriptProto as RecordSchema;
// This field is never used in the webapp
ScriptProto.fields = ScriptProto.fields.filter(f => f.name !== 'summary');
// Used to determine which language sample to show when the font family has a `primary_script`
ScriptProto.fields.push({name: 'exemplarLang', type: 'string', optional: true});

const typescriptTypes = Object.entries(tsRegistry)
    .map(([name, type]) => {
        return `export type ${name} = ${schemaToTypescript(type)};`;
    })
    .join('\n\n');

logProgress('Writing generated metadata and type definitions...');

await fs.writeFile(
    path.join(import.meta.dirname, '../glypht-web/src/generated/google-fonts.json'),
    JSON.stringify(sortedLocalMetadata),
);

const allDescriptions = new Uint8Array(descOffset);
let writeOffset = 0;
for (const desc of descriptions) {
    allDescriptions.set(desc, writeOffset);
    writeOffset += desc.byteLength;
}
await fs.writeFile(
    path.join(import.meta.dirname, '../glypht-web/src/generated/google-fonts-descriptions.txt'),
    allDescriptions,
);
await fs.writeFile(
    path.join(import.meta.dirname, '../glypht-web/src/generated/languages.json'),
    JSON.stringify({languages: languagesData, scripts: scriptsData}, (k, v) => k === 'exemplarChars' ? undefined : v),
);

await fs.writeFile(
    path.join(import.meta.dirname, '../glypht-web/src/generated/axes.json'),
    JSON.stringify(axesData),
);

await fs.writeFile(
    path.join(import.meta.dirname, '../glypht-web/src/generated/google-fonts-types.ts'),
    typescriptTypes,
);
