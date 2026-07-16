/**
 * Generates JS-readable Google Fonts metadata from the Google Fonts repo (https://github.com/google/fonts).
 */

import protobufjs from 'protobufjs';
const {load} = protobufjs;
import {parse} from 'pbtxtjs';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import Worker from '@glypht/web-worker';

import WorkerPool from '../glypht-core/src/worker-pool.js';
import RpcDispatcher from '../glypht-core/src/worker-rpc.js';
import {
    MetadataLanguageProto,
    MetadataWorkerSchema,
    ProcessedFamilyProto,
    ProcessingFamilyProto,
} from './google-fonts-meta-worker.js';
import {compress} from '@smol-range/compress';
import type {FamilyProto as InputFamilyProto} from './fonts_public.js';
import type {AxisProto, ScriptProto} from '../glypht-web/src/google-fonts-types.js';

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

type LiveFamilyMetadata = {
    family: string;
    popularity: number;
    trending: number;
    defaultSort: number;
};

type ParsedFamily = InputFamilyProto & {
    path: string;
    descriptionRange?: [number, number];
};

// After the worker phase we mutate `languages` into the base64-compressed index string and `primaryLanguage` into a
// numeric index. This represents that final on-disk shape.
type FinalFamily = Omit<ProcessedFamilyProto, 'languages' | 'primaryLanguage'> & {
    languages: string;
    primaryLanguage?: number;
};

type ParsedAxisProto = Omit<AxisProto, 'popularity'> & {popularity?: number};
type ParsedScriptProto = ScriptProto & {summary?: string};

logProgress('Fetching live Google Fonts metadata for font statistics...');
const liveMetadata = await fetch('https://fonts.google.com/metadata/fonts').then(resp => resp.json()) as {
    familyMetadataList: LiveFamilyMetadata[];
};

// We'll eventually order the final fonts list by Google's sort order as well
liveMetadata.familyMetadataList.sort((a, b) => a.defaultSort - b.defaultSort);

// Array of metadata for all fonts.
const localMetadata: ParsedFamily[] = [];

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
    const obj = metadata.toJSON() as ParsedFamily;
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

// Take the list of fonts from the live Google Fonts site and map them to our local metadata
const localFamilies = new Map<string, ParsedFamily>();
const liveFamilies = new Map<string, LiveFamilyMetadata>();
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

const sortedLocalMetadata: ProcessingFamilyProto[] = [];
for (const f of liveMetadata.familyMetadataList) {
    const localFamily = localFamilies.get(f.family) as ProcessingFamilyProto | undefined;
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
const languageDataNamespace = await load(path.join(fontsDir, 'lang/resources/protos/languages_public.proto'));
const languageType = languageDataNamespace.lookupType('LanguageProto');
const scriptType = languageDataNamespace.lookupType('ScriptProto');
//const regionType = languageDataNamespace.lookupType('RegionProto');

type LanguageProtoRaw = MetadataLanguageProto & {note?: string; source?: string};

const languagesData: MetadataLanguageProto[] = [];
const languagesDir = path.join(gflanguagesDir, 'data/languages');
for (const langFile of await fs.readdir(languagesDir)) {
    const langFilePath = path.join(languagesDir, langFile);
    const langProto = await fs.readFile(langFilePath, 'utf-8');
    const langFileData = parse(langProto, languageType.create({})).toJSON() as LanguageProtoRaw;
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

const scriptsData: ParsedScriptProto[] = [];
const scriptsDir = path.join(gflanguagesDir, 'data/scripts');
for (const scriptFile of await fs.readdir(scriptsDir)) {
    const scriptFilePath = path.join(scriptsDir, scriptFile);
    const scriptProto = await fs.readFile(scriptFilePath, 'utf-8');
    const scriptFileData = parse(scriptProto, scriptType.create({})).toJSON() as ParsedScriptProto;
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

const processedFamilies: ProcessedFamilyProto[] = new Array<ProcessedFamilyProto>(sortedLocalMetadata.length);

let resolve: (v: void) => void;
let numCompleted = 0;
const allCompleted = new Promise(_resolve => {
    resolve = _resolve;
});
for (let i = 0; i < sortedLocalMetadata.length; i++) {
    void pool.enqueue(async(worker) => {
        processedFamilies[i] = await worker.send('calcMetadata', sortedLocalMetadata[i]);
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
for (const family of processedFamilies) {
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
const langIndices = new Map<string, number>();
for (let i = 0; i < languagesData.length; i++) {
    langIndices.set(languagesData[i].id, i);
}

const finalFamilies = processedFamilies as unknown as FinalFamily[];
for (let i = 0; i < processedFamilies.length; i++) {
    const family = processedFamilies[i];
    const langsSorted: number[] = [];
    for (const lang of family.languages) {
        langsSorted.push(langIndices.get(lang)!);
    }
    langsSorted.sort((a, b) => a - b);
    const compressed = compress(langsSorted);

    const encoded = Buffer.from(compressed.buffer, compressed.byteOffset, compressed.byteLength).toString('base64');

    const primaryLanguage = family.primaryLanguage;
    finalFamilies[i].languages = encoded;
    finalFamilies[i].primaryLanguage = primaryLanguage === undefined ? undefined : langIndices.get(primaryLanguage);
}

logProgress(`Total shaping and analysis time: ${((performance.now() - startTime) / 1000).toFixed(1)}s`);

logProgress('Reading and parsing all variation axis metadata...');
const axisRegistryDir = path.join(fontsDir, 'axisregistry/Lib/axisregistry');
const axisDataNamespace = await load(path.join(SCRIPTS_DIR, 'axes.proto'));
const axisType = axisDataNamespace.lookupType('AxisProto');

const axesData: ParsedAxisProto[] = [];
const axesDir = path.join(axisRegistryDir, 'data');
for (const axisFile of await fs.readdir(axesDir)) {
    if (!axisFile.endsWith('.textproto')) continue;
    const axisFilePath = path.join(axesDir, axisFile);
    const axisProto = await fs.readFile(axisFilePath, 'utf-8');
    const axisFileData = parse(axisProto, axisType.create({})).toJSON() as ParsedAxisProto;
    axesData.push(axisFileData);
}

// Sort axes by the number of fonts they're used in, and store the axis popularity on the metadata itself
const axisPopularities = new Map<string | undefined, number>();
for (const f of finalFamilies) {
    if (!f.axes) continue;
    for (const axis of f.axes) {
        const popularity = axisPopularities.get(axis.tag) ?? 0;
        axisPopularities.set(axis.tag, popularity + 1);
    }
}
for (const axis of axesData) {
    axis.popularity = axisPopularities.get(axis.tag) ?? 0;
}

logProgress('Writing generated metadata...');

await fs.writeFile(
    path.join(SCRIPTS_DIR, '../glypht-web/src/generated/google-fonts.json'),
    JSON.stringify(finalFamilies),
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
        (k, v: unknown) => k === 'exemplarChars' ? undefined : v,
    ),
);

await fs.writeFile(
    path.join(SCRIPTS_DIR, '../glypht-web/src/generated/axes.json'),
    JSON.stringify(axesData),
);
