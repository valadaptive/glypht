import {readdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {parse} from 'yaml';

const dirname = import.meta.dirname;

const featureTagsFolder = join(dirname, '../feature-tags');

const featureTagFilenames = await readdir(featureTagsFolder);

const seenStates = new Set();
const seenStatuses = new Set();
const features: Record<string, unknown> = {};
for (const filename of featureTagFilenames) {
    const matchResult = /^([a-zA-Z0-9]{4})\.ya?ml$/.exec(filename);
    if (!matchResult) continue;

    const filePath = join(featureTagsFolder, filename);
    const contents = await readFile(filePath, {encoding: 'utf-8'});
    const featureTag = matchResult[1];
    const featureInfo: Record<string, unknown> = parse(contents) as Record<string, unknown>;
    if (!featureInfo.title) throw new Error(`Schema ${filename} has no feature title`);
    if (!featureInfo.description) throw new Error(`Schema ${filename} has no feature description`);
    if (typeof featureInfo.state === 'undefined') featureInfo.state = null;
    if (typeof featureInfo.status === 'undefined') featureInfo.status = null;
    seenStates.add(featureInfo.state);
    seenStatuses.add(featureInfo.status);
    features[featureTag] = featureInfo;
}

const featureInfoType = `{
    title: string,
    description: string,
    state: ${Array.from(seenStates.values())
        .map(v => JSON.stringify(v))
        .join(' | ')},
    status: ${Array.from(seenStatuses.values())
        .map(v => JSON.stringify(v))
        .join(' | ')},
}`;

const fileContents = `export type FeatureMetadata = ${featureInfoType};

export const FEATURES = ${JSON.stringify(features, null, 4)} as const;
`;

const outFilePath = join(dirname, '../glypht-bundler-utils/src/generated/ot-features.ts');
await writeFile(outFilePath, fileContents, {encoding: 'utf-8'});
