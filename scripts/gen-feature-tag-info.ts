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
    const parsed = {
        title: featureInfo.title,
        state: featureInfo.state ?? null,
        status: featureInfo.status ?? null,
    };
    seenStates.add(parsed.state);
    seenStatuses.add(parsed.status);
    features[featureTag] = parsed;
}

const featureInfoType = `{
    title: string,
    state: ${Array.from(seenStates.values())
        .map(v => JSON.stringify(v))
        .join(' | ')},
    status: ${Array.from(seenStatuses.values())
        .map(v => JSON.stringify(v))
        .join(' | ')},
}`;

const featureTagType = Object.keys(features)
    .map(featName => JSON.stringify(featName))
    .join(' | ');

const fileContents = `export type FeatureMetadata = ${featureInfoType};
export type FeatureTag = ${featureTagType};
export const FEATURES: Record<FeatureTag, FeatureMetadata> = ${JSON.stringify(features, null, 4)};
`;

const outFilePath = join(dirname, '../glypht-bundler-utils/src/generated/ot-features.ts');
await writeFile(outFilePath, fileContents, {encoding: 'utf-8'});
