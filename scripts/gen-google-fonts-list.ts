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

const fontMetadataNamespace = await load('./fonts_public.proto');
const fontMetadataType = fontMetadataNamespace.lookupType('FamilyProto');

if (process.argv.length < 2) {
    throw new Error('Provide the path to a local copy of the https://github.com/google/fonts repo as an argument.');
}

// Wrapper for console.log statements that we want to keep
// eslint-disable-next-line no-console
const logProgress = console.log;

const fontsDir = process.argv[2];

logProgress('Fetching live Google Fonts metadata for font statistics...');
const liveMetadata = await fetch('https://fonts.google.com/metadata/fonts').then(resp => resp.json()) as {
    familyMetadataList: {
        family: string;
        popularity: number;
        trending: number;
        defaultSort: number;
    }[];
};

liveMetadata.familyMetadataList.sort((a, b) => a.defaultSort - b.defaultSort);

const localMetadata = [];

logProgress('Reading and parsing all METADATA.pb files...');
const fontsFiles = await fs.readdir(fontsDir, {recursive: true});
for (const file of fontsFiles) {
    if (!file.endsWith('METADATA.pb')) continue;
    const metaPath = path.join(fontsDir, file);
    const contents = await fs.readFile(metaPath, 'utf-8');
    const metadata = parse(contents, fontMetadataType.create({}));
    const obj = metadata.toJSON();
    obj.path = path.dirname(file);
    localMetadata.push(obj);
}

const allCategories = new Set<string>();
const allClassifications = new Set<string>();
const allStrokes = new Set<string>();

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
}

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
//const scriptType = languageDataNamespace.lookupType('ScriptProto');
//const regionType = languageDataNamespace.lookupType('RegionProto');

const languagesData: any[] = [];
const langTags = [];
const langIndices = new Map();
const languagesDir = path.join(gflanguagesDir, 'data/languages');
for (const langFile of await fs.readdir(languagesDir)) {
    const langFilePath = path.join(languagesDir, langFile);
    const langProto = await fs.readFile(langFilePath, 'utf-8');
    const langFileData = parse(langProto, languageType.create({})).toJSON();
    languagesData.push(langFileData);
    if (langFileData.exemplarChars) langTags.push(langFileData.id);
    langIndices.set(langFileData.id, languagesData.length - 1);
}

logProgress('Using HarfBuzz to compute language coverage and PANOSE data for all fonts...');
const hb = await createHarfbuzz<HbShapeModule>(new URL('../c-libs-wrapper/hb-shape.wasm', import.meta.url).href);
/*
const coverageSet = new hb.HbSet();
const scratchSet = new hb.HbSet();

// TODO: use https://docs.rs/shaperglot instead
// TODO: Chiron Hei HK uses the English preview text
const langCoverageSets = [];
for (const lang of languagesData) {
    const coverageSet = new hb.HbSet();
    for (const key of ['base', 'numerals', 'punctuation', 'index']) {
        if (!lang.exemplarChars || !(key in lang.exemplarChars)) {
            continue;
        }
        for (const exemplarChar of lang.exemplarChars[key].split(' ')) {
            const charStr = exemplarChar as string;
            if (charStr[0] === '{' || charStr[0] === '◌') continue;
            coverageSet.add(charStr.codePointAt(0)!);
        }
    }
    langCoverageSets.push(coverageSet);
}
*/

for (const f of sortedLocalMetadata) {
    if (!f.category || f.category.length === 0) {
        throw new Error(`${f.name} has no category`);
    }
    if (!f.fonts || f.category.length === 0) {
        throw new Error(`${f.name} has no fonts`);
    }

    const supportedLanguages = f.languages ?
        new Set(f.languages.map((lang: string) => langIndices.get(lang))) :
        new Set();
    // Some fonts have language lists that contain languages not in the Google Fonts data??
    supportedLanguages.delete(undefined);
    let hasMonospace = false;
    let hasProportional = false;
    if (!f.languages) {
        for (let i = 0; i < languagesData.length; i++) {
            if (languagesData[i].exemplarChars) supportedLanguages.add(i);
        }
    }

    for (const font of f.fonts) {
        const fontFilePath = path.join(fontsDir, f.path, font.filename);
        const fontData = await fs.readFile(fontFilePath);
        const blob = new hb.HbBlob(fontData);
        const face = hb._hb_face_create_or_fail(blob.ptr(), 0);
        if (!face) {
            throw new Error(`Could not load font from ${fontFilePath}`);
        }
        const hbFont = hb._hb_font_create(face);

        const os2Table = new hb.HbBlob(hb._hb_face_reference_table(face, hbTag('OS/2')));
        const panose = os2Table.asArray().subarray(32, 42);
        hasMonospace ||= panose[3] === 9;
        hasProportional ||= panose[3] !== 9;
        os2Table.destroy();

        if (!f.languages) {
            for (let i = 0; i < languagesData.length; i++) {
                const buf = hb._hb_buffer_create();
                const lang = languagesData[i];
                if (!lang.exemplarChars) {
                    supportedLanguages.delete(i);
                    continue;
                }
                for (const key of ['base', /*'auxiliary', 'marks',*/ 'numerals', 'punctuation', 'index']) {
                    if (!lang.exemplarChars[key]) continue;
                    for (const c of lang.exemplarChars[key] as string) {
                        hb._hb_buffer_add(buf, c.codePointAt(0)!, 0xFFFFFFFF);
                        //console.log(c, c.codePointAt(0));
                    }
                }
                hb._hb_shape(hbFont, buf, 0, 0);
                let supportsLang = true;
                hb.withStack(() => {
                    const glyphInfosLenPtr = hb.stackAlloc(1);
                    const glyphInfosPtr = hb._hb_buffer_get_glyph_infos(buf, glyphInfosLenPtr);
                    const GLYPH_INFO_SIZE = 20;
                    const glyphInfosLen = hb.readUint32(glyphInfosLenPtr);
                    for (let i = 0; i < glyphInfosLen; i++) {
                        const glyphId = hb.readUint32(glyphInfosPtr + (i * GLYPH_INFO_SIZE));
                        if (glyphId === 0) {
                            supportsLang = false;
                            break;
                        }
                    }
                });

                if (!supportsLang) {
                    supportedLanguages.delete(i);
                }
                hb._hb_buffer_destroy(buf);
            }
        }

        /*
        if (!f.languages) {
            coverageSet.clear();
            hb._hb_face_collect_unicodes(face, coverageSet.ptr());


            for (let i = 0; i < languagesData.length; i++) {
                //const languageData = languagesData[i];
                const langExemplars = langCoverageSets[i];
                if (langExemplars.size() === 0) continue;
                scratchSet.setTo(langExemplars);
                scratchSet.subtract(coverageSet);
                if (scratchSet.size() !== 0) {
                    //supportedLanguages.delete(languageData.id);
                    supportedLanguages.delete(i);
                }
            }
        }
        */

        hb._hb_font_destroy(hbFont);
        hb._hb_face_destroy(face);
        blob.destroy();
    }

    if (f.axes?.some((axis: any) => axis.tag === 'MONO')) {
        hasMonospace = true;
        hasProportional = true;
    }

    f.languages = Array.from(supportedLanguages);
    f.languages.sort((a: number, b: number) => (languagesData[b].population ?? 0) - (languagesData[a].population ?? 0));
    f.primaryLanguage = langIndices.get(f.primaryLanguage);
    f.proportion = hasMonospace && hasProportional ? 'BOTH' : hasMonospace ? 'MONOSPACE' : 'PROPORTIONAL';
}
//scratchSet.destroy();
//coverageSet.destroy();

logProgress('Reading and parsing all variation axis metadata...');
const axisRegistryDir = path.join(fontsDir, 'axisregistry/Lib/axisregistry');
const axisDataNamespace = await load(path.join(axisRegistryDir, 'axes.proto'));
const axisType = axisDataNamespace.lookupType('AxisProto');
//const scriptType = languageDataNamespace.lookupType('ScriptProto');
//const regionType = languageDataNamespace.lookupType('RegionProto');

const axesData: any[] = [];
const axesDir = path.join(axisRegistryDir, 'data');
for (const axisFile of await fs.readdir(axesDir)) {
    if (!axisFile.endsWith('.textproto')) continue;
    const axisFilePath = path.join(axesDir, axisFile);
    const axisProto = await fs.readFile(axisFilePath, 'utf-8');
    const axisFileData = parse(axisProto, axisType.create({})).toJSON();
    axesData.push(axisFileData);
}

const tsRegistry: Record<string, Schema> = {};
typeToSchema(fontMetadataType, tsRegistry);
typeToSchema(languageType, tsRegistry);
typeToSchema(axisType, tsRegistry);

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
// Added during processing here from the PANOSE table.
tsRegistry.Proportion = {
    type: 'enum',
    values: ['MONOSPACE', 'PROPORTIONAL', 'BOTH'],
};
type RecordSchema = Exclude<Schema, string> & {type: 'record'};
type ArraySchema = Exclude<Schema, string> & {type: 'array'};
const FamilyProto = tsRegistry.FamilyProto as RecordSchema;
// Refine enum field types to not just be "string"
(FamilyProto.fields
    .find(f => f.name === 'category')?.type as ArraySchema).elements = 'Category';
(FamilyProto.fields
    .find(f => f.name === 'classifications')?.type as ArraySchema).elements = 'Classification';
FamilyProto.fields
    .find(f => f.name === 'stroke')!.type = 'Stroke';

FamilyProto.fields
    .find(f => f.name === 'category')!.optional = false;
FamilyProto.fields
    .find(f => f.name === 'fonts')!.optional = false;
// Add custom fields
FamilyProto.fields.push({name: 'path', type: 'string', optional: false});
FamilyProto.fields.push({name: 'proportion', type: 'Proportion', optional: false});
// Store language indices instead of languages to save space (even when gzipped)
(FamilyProto.fields
    .find(f => f.name === 'languages')?.type as ArraySchema).elements = 'number';
FamilyProto.fields
    .find(f => f.name === 'primaryLanguage')!.type = 'number';

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

await fs.writeFile(
    path.join(import.meta.dirname, '../glypht-web/src/generated/languages.json'),
    JSON.stringify(languagesData),
);

await fs.writeFile(
    path.join(import.meta.dirname, '../glypht-web/src/generated/axes.json'),
    JSON.stringify(axesData),
);

await fs.writeFile(
    path.join(import.meta.dirname, '../glypht-web/src/generated/google-fonts-types.ts'),
    typescriptTypes,
);
