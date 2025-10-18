import {readdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import assert from 'node:assert';
import protobufjs from 'protobufjs';
const {parse: parseProto} = protobufjs;
import {parse} from 'pbtxtjs';

type Range = (readonly [number, number] | number);

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

const sortedCodePointsToRanges = (codePoints: Iterable<number>): Range[] => {
    const ranges: Range[] = [];
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

    for (const codePoint of codePoints) {
        if (rangePrev !== null && codePoint <= rangePrev) {
            throw new Error('Code points are not sorted');
        }
        if (codePoint - 1 === rangePrev) {
            // Continuation of the previous character range.
        } else {
            pushRange();
            rangeStart = codePoint;
        }
        rangePrev = codePoint;
    }
    pushRange();
    return ranges;
};

const subsetRanges: Record<string, Range[]> = {};
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

    const ranges = sortedCodePointsToRanges(codePoints());
    subsetRanges[subsetName] = ranges;
}

const sliceSubsets = {
    'hongkong-chinese_default.txt': 'chinese-hongkong',
    'simplified-chinese_default.txt': 'chinese-simplified',
    'traditional-chinese_default.txt': 'chinese-traditional',
    'japanese_default.txt': 'japanese',
    'korean_default.txt': 'korean',
};

const subsetSlices = new Map<string, Range[][]>();

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
    const sliceRanges = dest.subsets.map(({codepoints}) => sortedCodePointsToRanges(codepoints));
    subsetSlices.set(sliceSubsets[filename as keyof typeof sliceSubsets], sliceRanges);
}

const readVarint = (buffer: string, ctx: {offset: number}): number => {
    let n = 0;
    for (let i = 0; i < 4; i++, ctx.offset++) {
        if (ctx.offset === buffer.length) {
            throw new Error('Truncated buffer');
        }
        const chunk = buffer.charCodeAt(ctx.offset) & 0x7F;
        n |= chunk << (i * 7);
        if ((buffer.charCodeAt(ctx.offset) & 0x80) === 0) {
            ctx.offset++;
            return n >>> 0;
        }
    }

    throw new Error(`Varint at offset ${ctx.offset} exceeds maximum encodable length of 4`);
};

const writeVarint = (n: number, buffer: Uint8Array, offset: number): number => {
    while (true) {
        if (offset === buffer.byteLength) return -1;
        if ((n & ~0x7F) === 0) {
            buffer[offset++] = n;
            return offset;
        } else {
            buffer[offset++] = (n & 0x7F) | 0x80;
            n >>>= 7;
        }
    }
};

const decodeRanges = function* (rangesBase64: string): Generator<(number | [number, number])> {
    let prev = 0;
    const ranges = atob(rangesBase64);
    const ctx = {offset: 0};

    while (ctx.offset < ranges.length) {
        const firstEnc = readVarint(ranges, ctx);
        const isRange = !!(firstEnc & 1);
        const first = (firstEnc >>> 1) + prev;
        if (isRange) {
            const second = readVarint(ranges, ctx) + first;
            yield [first, second];
        } else {
            yield first;
        }
        prev = first;
    }
};

class OutStream {
    private buffer: Uint8Array<ArrayBuffer>;
    private cursor = 0;
    constructor() {
        const buf = new ArrayBuffer(1, {maxByteLength: 65536});
        this.buffer = new Uint8Array(buf);
    }

    writeVarint(n: number) {
        for (;;) {
            const newOffset = writeVarint(n, this.buffer, this.cursor);
            if (newOffset !== -1) {
                this.cursor = newOffset;
                break;
            }
            this.buffer.buffer.resize(this.buffer.byteLength * 2);
        }
    }

    writeBytes(bytes: Uint8Array) {
        if (this.cursor + bytes.length > this.buffer.byteLength) {
            this.buffer.buffer.resize(Math.max(this.buffer.byteLength * 2, this.cursor + bytes.length));
        }
        this.buffer.set(bytes, this.cursor);
        this.cursor += bytes.byteLength;
    }

    data() {
        return this.buffer.subarray(0, this.cursor);
    }
}

const encodeRanges = (ranges: Range[]): Uint8Array<ArrayBuffer> => {
    let prev = 0;
    const output = new OutStream();
    for (let i = 0; i < ranges.length;) {
        const ri = ranges[i];
        if (typeof ri === 'number') {
            const n = (ri - prev) << 1;
            output.writeVarint(n);
            prev = ri;
        } else {
            const start = ri[0] - prev;
            const n1 = (start << 1) | 1;
            const n2 = ri[1] - ri[0];
            output.writeVarint(n1);
            output.writeVarint(n2);
            prev = ri[0];
        }

        i++;
    }
    return output.data();
};

const encodeToBase64 = (ranges: Range[]): string => {
    const encoded = encodeRanges(ranges);
    const stringified = Buffer.from(encoded).toString('base64');
    assert(
        JSON.stringify(Array.from(decodeRanges(stringified))) ===
        JSON.stringify(ranges));
    return stringified;
};

let subsetRangesLiteral = '{\n';
for (const [name, ranges] of Object.entries(subsetRanges)) {
    subsetRangesLiteral += `    '${name}': ${JSON.stringify(encodeToBase64(ranges))},\n`;
}
subsetRangesLiteral += '}';

const subsetSlicesRecord: Record<string, string[]> = {};
for (const [subsetName, slices] of subsetSlices) {
    subsetSlicesRecord[subsetName] = slices.map(subsetSlice => encodeToBase64(subsetSlice));
}
const subsetSlicesLiteral = JSON.stringify(subsetSlicesRecord, null, 4);

const fileContents = `const SUBSET_RANGES: Record<SubsetName, string> = ${subsetRangesLiteral};

const SUBSET_SLICES: Partial<Record<SubsetName, string[]>> = ${subsetSlicesLiteral};

const readVarint: (buffer: string, ctx: {offset: number}) => number = ${readVarint.toString()};
const decodeRanges: (rangesBase64: string) => Generator<number | readonly [number, number], void, void> = ${decodeRanges.toString()};

export type CharacterSubsetInfo = {
    ranges(): Generator<number | readonly [number, number], void, void>;
    slices(): (Generator<number | readonly [number, number], void, void>)[] | null;
};

export const subsetInfo = (subsetName: SubsetName): CharacterSubsetInfo => {
    return {
        ranges() {
            return decodeRanges(SUBSET_RANGES[subsetName]);
        },
        slices() {
            const subsetSlices = SUBSET_SLICES[subsetName];
            if (!subsetSlices) return null;
            return subsetSlices.map(subsetSlice => decodeRanges(subsetSlice));
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
