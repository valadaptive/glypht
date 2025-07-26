import {readdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import assert from 'node:assert';

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

const decodeRanges = function* (rangesBase64: string) : Generator<(number | [number, number])> {
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

for (const [name, ranges] of Object.entries(subsetRanges)) {
    const buffer = new ArrayBuffer(1, {maxByteLength: 65536});
    const dstBuf = new Uint8Array(buffer);

    let offset = 0;
    let prev = 0;
    for (let i = 0; i < ranges.length;) {
        const ri = ranges[i];
        if (typeof ri === 'number') {
            const n = (ri - prev) << 1;
            const firstOffset = writeVarint(n, dstBuf, offset);
            if (firstOffset === -1) {
                dstBuf.buffer.resize(dstBuf.buffer.byteLength * 2);
                continue;
            }
            offset = firstOffset;
            prev = ri;
        } else {
            const start = ri[0] - prev;
            const n1 = (start << 1) | 1;
            const n2 = ri[1] - ri[0];
            const firstOffset = writeVarint(n1, dstBuf, offset);
            if (firstOffset === -1) {
                dstBuf.buffer.resize(dstBuf.buffer.byteLength * 2);
                continue;
            }
            const secondOffset = writeVarint(n2, dstBuf, firstOffset);
            if (secondOffset === -1) {
                dstBuf.buffer.resize(dstBuf.buffer.byteLength * 2);
                continue;
            }
            offset = secondOffset;
            prev = ri[0];
        }

        i++;
    }
    const encoded = Buffer.from(dstBuf.subarray(0, offset)).toString('base64');
    assert(
        JSON.stringify(Array.from(decodeRanges(encoded))) ===
        JSON.stringify(ranges));

    subsetRangesLiteral += `    '${name}': ${JSON.stringify(encoded)},\n`;
}
subsetRangesLiteral += '}';

const fileContents = `const SUBSET_RANGES: Record<SubsetName, string> = ${subsetRangesLiteral};

const readVarint: (buffer: string, ctx: {offset: number}) => number = ${readVarint.toString()};
const decodeRanges: (rangesBase64: string) => Generator<number | readonly [number, number], void, void> = ${decodeRanges.toString()};

export const subsetRanges = (subsetName: SubsetName): Generator<number | readonly [number, number], void, void> => decodeRanges(SUBSET_RANGES[subsetName]);

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
