/**
 * Generates JS-readable Google Fonts metadata from the Google Fonts repo (https://github.com/google/fonts).
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import protobufjs from 'protobufjs';
const {load} = protobufjs;
import {parse} from 'pbtxtjs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import Worker from '@glypht/web-worker';

import {Schema, schemaToTypescript, typeToSchema} from './protobuf-tools.js';

import WorkerPool from '../glypht-core/src/worker-pool.js';
import RpcDispatcher from '../glypht-core/src/worker-rpc.js';
import {MetadataWorkerSchema} from './google-fonts-meta-worker.js';
import {compress} from '@smol-range/compress';

if (!(global as {isBundled?: boolean}).isBundled) {
    // eslint-disable-next-line @stylistic/max-len
    throw new Error('Because this script uses workers, you need to build it with Rollup in order to run it. See `npm run gen-google-fonts-list`.');
}

const SCRIPTS_DIR = path.resolve(import.meta.dirname, '../');

if (process.argv.length < 3) {
    throw new Error('Provide the path to a local copy of the https://github.com/google/fonts repo as an argument.');
}
const fontsDir = process.argv[2];

// This schema exists in the Google Fonts repo, but we load our own version because some fonts' metadata contains a
// field not present in the official schema.
const fontMetadataNamespace = await load(path.join(SCRIPTS_DIR, './fonts_public.proto'));
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

// Array of UTF-8 font descriptions (and byte offset to write the next one to). The frontend uses HTTP range
// requests to fetch one description at a time from a big text file of all concatenated descriptions, so we need
// UTF-8 byte offsets. The source files are already UTF-8, so we won't waste any time decoding and re-encoding them.
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

const sortedLocalMetadata: any[] = [];
for (const f of liveMetadata.familyMetadataList) {
    const localFamily = localFamilies.get(f.family);
    if (!localFamily) {
        // eslint-disable-next-line no-console
        console.warn(`${f.family} is not in the local repo`);
        continue;
    }
    localFamily.defaultSort = f.defaultSort;
    localFamily.popularity = f.popularity;
    localFamily.trending = f.trending;
    sortedLocalMetadata.push(localFamily);
}

logProgress('Reading and parsing all language metadata...');
const gflanguagesDir = path.join(fontsDir, 'lang/Lib/gflanguages');
const languageDataNamespace = await load(path.join(gflanguagesDir, 'languages_public.proto'));
const languageType = languageDataNamespace.lookupType('LanguageProto');
const scriptType = languageDataNamespace.lookupType('ScriptProto');
//const regionType = languageDataNamespace.lookupType('RegionProto');

const languagesData: any[] = [];
const languagesDir = path.join(gflanguagesDir, 'data/languages');
for (const langFile of await fs.readdir(languagesDir)) {
    const langFilePath = path.join(languagesDir, langFile);
    const langProto = await fs.readFile(langFilePath, 'utf-8');
    const langFileData = parse(langProto, languageType.create({})).toJSON();
    // We don't need the note or source
    delete langFileData.note;
    delete langFileData.source;
    // This text is quite long and not very compressible
    if (langFileData.sampleText) {
        /*delete langFileData.sampleText.specimen_48;
        delete langFileData.sampleText.specimen_36;
        delete langFileData.sampleText.specimen_32;
        delete langFileData.sampleText.specimen_21;
        delete langFileData.sampleText.specimen_16;*/
        langFileData.sampleText = {styles: langFileData.sampleText.styles};
    }
    languagesData.push(langFileData);
}
// For exemplar language calculation, the most popular language wins. We'll re-sort languagesData later down.
languagesData.sort((a, b) => (b.population ?? 0) - (a.population ?? 0));

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

const workers: RpcDispatcher<MetadataWorkerSchema>[] = [];
const numThreads = process.env.NUM_THREADS && Number.isFinite(Number(process.env.NUM_THREADS)) ?
    Number(process.env.NUM_THREADS) :
    navigator.hardwareConcurrency;
for (let i = 0; i < numThreads; i++) {
    const moduleUrl = new URL('./google-fonts-meta-worker.js', import.meta.url);
    const w = new Worker(moduleUrl, {type: 'module'});
    const r = new RpcDispatcher<MetadataWorkerSchema>(w, {'calcMetadata': 'calcedMetadata'});
    r.sendAndForget('init', {
        languagesData,
        fontsDir,
    });
    workers.push(r);
}
const pool = new WorkerPool(workers);

const {log, done} = logUpdate();

const startTime = performance.now();

let resolve: (v: void) => void;
let numCompleted = 0;
const allCompleted = new Promise(_resolve => {
    resolve = _resolve;
});
for (let i = 0; i < sortedLocalMetadata.length; i++) {
    void pool.enqueue(async(worker) => {
        const res = await worker.send('calcMetadata', sortedLocalMetadata[i]);
        sortedLocalMetadata[i] = res;
        numCompleted++;
        log(`\x1b[;100m${progressBar(numCompleted / sortedLocalMetadata.length)}\x1b[;0m ${numCompleted} / ${sortedLocalMetadata.length}`);
        if (numCompleted === sortedLocalMetadata.length) {
            resolve();
        }
    });

    await pool.backpressure(4);
}
await allCompleted;
done();

logProgress('Sorting languages by number of supported fonts...');
const langFontCoverage = new Map<string, number>();
for (const family of sortedLocalMetadata) {
    for (const langTag of family.languages) {
        const cur = langFontCoverage.get(langTag) ?? 0;
        langFontCoverage.set(langTag, cur + 1);
    }
}
// The final sort order for languages is by number of fonts that cover each language. This helps with compression since
// we store font language coverage using a run-length-esque encoding, and there will probably be long runs of
// supported/unsupported languages as a result of sorting/
languagesData.sort((a, b) => {
    const covA = langFontCoverage.get(a.id) ?? 0;
    const covB = langFontCoverage.get(b.id) ?? 0;
    return covB - covA;
});
const langIndices = new Map();
for (let i = 0; i < languagesData.length; i++) {
    langIndices.set(languagesData[i].id, i);
}

for (const family of sortedLocalMetadata) {
    const langsSorted = [];
    for (const lang of family.languages) {
        langsSorted.push(langIndices.get(lang));
    }
    langsSorted.sort((a, b) => a - b);
    const compressed = compress(langsSorted);

    const encoded = Buffer.from(compressed.buffer, compressed.byteOffset, compressed.byteLength).toString('base64');

    family.languages = encoded;
    family.primaryLanguage = langIndices.get(family.primaryLanguage);
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
FamilyProto.fields.push({name: 'defaultSort', type: 'number', optional: false});
FamilyProto.fields.push({name: 'trending', type: 'number', optional: false});
FamilyProto.fields.push({name: 'popularity', type: 'number', optional: false});
FamilyProto.fields = FamilyProto.fields.filter(f =>
    f.name !== 'source' &&
    f.name !== 'orderedSampleGlyphs' &&
    f.name !== 'subsets',
);

// Store languages in a base64'd compressed format to save space (340kB -> 250kB gzipped)
FamilyProto.fields
    .find(f => f.name === 'languages')!.type = 'string';

// Store the language's index instead of the language itself
FamilyProto.fields
    .find(f => f.name === 'primaryLanguage')!.type = 'number';
//mandatorify(FamilyProto, sortedLocalMetadata);

const AxisSegmentProto = tsRegistry.AxisSegmentProto as RecordSchema;
// An axis segment will always have a `tag` field
AxisSegmentProto.fields
    .find(f => f.name === 'tag')!.optional = false;

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
// Remove exemplarChars, source, and note for the webapp since they're never used there
LanguageProto.fields = LanguageProto.fields.filter(f =>
    f.name !== 'exemplarChars' && f.name !== 'note' && f.name !== 'source');
//mandatorify(LanguageProto, languagesData);

const SampleTextProto = tsRegistry.SampleTextProto as RecordSchema;
// We only use the "styles" field for previews
SampleTextProto.fields = SampleTextProto.fields.filter(f => f.name === 'styles');

const ScriptProto = tsRegistry.ScriptProto as RecordSchema;
// This field is never used in the webapp
ScriptProto.fields = ScriptProto.fields.filter(f => f.name !== 'summary');
// A script will always have an ID
ScriptProto.fields
    .find(f => f.name === 'id')!.optional = false;
// Used to determine which language sample to show when the font family has a `primary_script`
ScriptProto.fields.push({name: 'exemplarLang', type: 'string', optional: true});

const typescriptTypes = Object.entries(tsRegistry)
    .map(([name, type]) => {
        return `export type ${name} = ${schemaToTypescript(type)};`;
    })
    .join('\n\n');

logProgress('Writing generated metadata and type definitions...');

await fs.writeFile(
    path.join(SCRIPTS_DIR, '../glypht-web/src/generated/google-fonts.json'),
    JSON.stringify(sortedLocalMetadata),
);

const allDescriptions = new Uint8Array(descOffset);
let writeOffset = 0;
for (const desc of descriptions) {
    allDescriptions.set(desc, writeOffset);
    writeOffset += desc.byteLength;
}
await fs.writeFile(
    path.join(SCRIPTS_DIR, '../glypht-web/src/generated/google-fonts-descriptions.txt'),
    allDescriptions,
);
await fs.writeFile(
    path.join(SCRIPTS_DIR, '../glypht-web/src/generated/languages.json'),
    JSON.stringify(
        {languages: languagesData, scripts: scriptsData},
        (k, v) => k === 'exemplarChars' ? undefined : v,
    ),
);

await fs.writeFile(
    path.join(SCRIPTS_DIR, '../glypht-web/src/generated/axes.json'),
    JSON.stringify(axesData),
);

await fs.writeFile(
    path.join(SCRIPTS_DIR, '../glypht-web/src/generated/google-fonts-types.ts'),
    typescriptTypes,
);
