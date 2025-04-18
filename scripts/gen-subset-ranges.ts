import {readdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';

const dirname = import.meta.dirname;

const namFileFolder = join(dirname, '../nam-files/Lib/gfsubsets/data');

const namFileNames = await readdir(namFileFolder);

const subsetRanges: Record<string, (readonly [number, number] | number)[]> = {};
for (const filename of namFileNames) {
    const matchResult = /^([a-zA-Z0-9-]+)_unique-glyphs.nam$/.exec(filename);
    if (!matchResult) continue;

    const filePath = join(namFileFolder, filename);
    const contents = await readFile(filePath, {encoding: 'utf-8'});
    const subsetName = matchResult[1];

    const ranges: (readonly [number, number] | number)[] = [];
    let rangeStart: number | null = null;
    let rangePrev: number | null = null;

    const pushRange = () => {
        if (rangeStart && rangePrev) {
            if (rangeStart === rangePrev) {
                ranges.push(rangeStart);
            } else {
                ranges.push([rangeStart, rangePrev] as const);
            }
        }
    };

    for (const line of contents.split('\n')) {
        const codePointMatch = /^0x[0-9a-fA-F]{4,6}/.exec(line);
        if (!codePointMatch) continue;
        const codePoint = Number(codePointMatch[0]);
        if (codePoint - 1 === rangePrev) {
            // Continuation of the previous character range.
        } else {
            pushRange();
            rangeStart = codePoint;
        }
        rangePrev = codePoint;
    }
    pushRange();

    subsetRanges[subsetName] = ranges;
}

let subsetRangesLiteral = '{\n';

for (const [name, ranges] of Object.entries(subsetRanges)) {
    subsetRangesLiteral += `    '${name}': [\n`;
    for (const range of ranges) {
        if (typeof range === 'number') {
            subsetRangesLiteral += `        ${range},\n`;
        } else {
            subsetRangesLiteral += `        [${range[0]}, ${range[1]}],\n`;
        }
    }
    subsetRangesLiteral += '    ],\n';
}
subsetRangesLiteral += '}';

const fileContents = `export const SUBSET_RANGES = ${subsetRangesLiteral};

export const SUBSET_NAMES = ${JSON.stringify(Object.keys(subsetRanges))} as const;

export type SubsetName = keyof typeof SUBSET_RANGES;
`;

const outFilePath = join(dirname, '../src/generated/subset-ranges.ts');
await writeFile(outFilePath, fileContents, {encoding: 'utf-8'});
