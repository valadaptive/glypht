import {readdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import protobufjs from 'protobufjs';
const {parse: parseProto} = protobufjs;
import {parse} from 'pbtxtjs';
import {compress} from '@smol-range/compress';

const GEN_SUBSET_SLICES = false;

const ns = parseProto(`
// The slicing strategy, composed of slices.
message SlicingStrategy {
  repeated Subset subsets = 1;
}

// One subset of all codepoints.
message Subset {
  // Set of unique codepoints.
  repeated int32 codepoints = 1;
}`).root;
const SlicingStrategyType = ns.lookupType('SlicingStrategy');

const dirname = import.meta.dirname;

const namFileFolder = join(dirname, '../nam-files/Lib/gfsubsets/data');
const subsetSliceFolder = join(dirname, '../nam-files/slices');

const namFileNames = await readdir(namFileFolder);
const subsetSliceNames = await readdir(subsetSliceFolder);

const subsetRanges: Record<string, Generator<number>> = {};
for (const filename of namFileNames) {
    const matchResult = /^([a-zA-Z0-9-]+)_unique-glyphs.nam$/.exec(filename);
    if (!matchResult) continue;

    const filePath = join(namFileFolder, filename);
    const contents = await readFile(filePath, {encoding: 'utf-8'});
    const subsetName = matchResult[1];

    const codePoints = function*() {
        for (const line of contents.split('\n')) {
            const codePointMatch = /^0x[0-9a-fA-F]{4,6}/.exec(line);
            if (!codePointMatch) continue;
            const codePoint = Number(codePointMatch[0]);
            yield codePoint;
        }
    };

    subsetRanges[subsetName] = codePoints();
}

const sliceSubsets = {
    'hongkong-chinese_default.txt': 'chinese-hongkong',
    'simplified-chinese_default.txt': 'chinese-simplified',
    'traditional-chinese_default.txt': 'chinese-traditional',
    'japanese_default.txt': 'japanese',
    'korean_default.txt': 'korean',
};

const subsetSlices = new Map<string, number[][]>();

for (const filename of subsetSliceNames) {
    if (!Object.prototype.hasOwnProperty.call(sliceSubsets, filename)) {
        if (filename.endsWith('.txt')) {
            // eslint-disable-next-line no-console
            console.warn(`Unmapped subset slice file: ${filename}`);
        }
        continue;
    }

    const filePath = join(subsetSliceFolder, filename);
    const contents = await readFile(filePath, {encoding: 'utf-8'});
    const dest: protobufjs.Message & {subsets: {codepoints: number[]}[]} =
        SlicingStrategyType.create() as unknown as protobufjs.Message & {subsets: {codepoints: number[]}[]};
    parse(contents, dest);
    const sliceRanges = dest.subsets.map(({codepoints}) => codepoints);
    subsetSlices.set(sliceSubsets[filename as keyof typeof sliceSubsets], sliceRanges);
}

const encodeToBase64 = (ranges: Iterable<number, void, void>): string => {
    const encoded = compress(ranges);
    const stringified = Buffer.from(encoded.buffer, encoded.byteOffset, encoded.byteLength).toString('base64');
    return stringified;
};

let subsetRangesLiteral = '{\n';
for (const [name, ranges] of Object.entries(subsetRanges)) {
    subsetRangesLiteral += `    '${name}': ${JSON.stringify(encodeToBase64(ranges))},\n`;
}
subsetRangesLiteral += '}';

const subsetSlicesRecord: Record<string, string[]> = {};
if (GEN_SUBSET_SLICES) {
    for (const [subsetName, slices] of subsetSlices) {
        subsetSlicesRecord[subsetName] = slices.map(subsetSlice => encodeToBase64(subsetSlice));
    }
}

const subsetSlicesLiteral = JSON.stringify(subsetSlicesRecord, null, 4);

const fileContents = `import {decompress} from '@smol-range/decompress';

const SUBSET_RANGES: Record<SubsetName, string> = ${subsetRangesLiteral};

// Temporarily disabled since we don't use these currently
const SUBSET_SLICES: Partial<Record<SubsetName, string[]>> = ${subsetSlicesLiteral};

export type CharacterSubsetInfo = {
    ranges(onRange: (start: number, end: number) => unknown): void;
    slices(): ((onRange: (start: number, end: number) => unknown) => void)[] | null;
};

export const subsetInfo = (subsetName: SubsetName): CharacterSubsetInfo => {
    return {
        ranges(onRange) {
            return decompress(SUBSET_RANGES[subsetName], onRange);
        },
        slices() {
            const subsetSlices = SUBSET_SLICES[subsetName];
            if (!subsetSlices) return null;
            return subsetSlices.map(subsetSlice => (onRange => decompress(subsetSlice, onRange)));
        },
    };
};

/**
 * The names of every named character set from Google Fonts.
 */
export const SUBSET_NAMES = ${JSON.stringify(Object.keys(subsetRanges))} as const;

/**
 * The name of a Google Fonts-defined character set.
 */
export type SubsetName = ${Object.keys(subsetRanges)
    .map(rangeName => JSON.stringify(rangeName))
    .join(' | ')};
`;

const outFilePath = join(dirname, '../glypht-core/src/generated/subset-ranges.ts');
await writeFile(outFilePath, fileContents, {encoding: 'utf-8'});
