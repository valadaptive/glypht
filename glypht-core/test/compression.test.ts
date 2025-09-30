import {test} from 'vitest';
import {Buffer} from 'node:buffer';
import {readFixtureFile, testCompressionContext} from './helpers.js';
import {WoffCompressionContext} from '../src/compression.js';


const context = testCompressionContext();
const recursive = await readFixtureFile('../../test-fixtures/Recursive_VF_1.085.ttf', import.meta.url);
const compressedWoff2 = await readFixtureFile('../../test-fixtures/Recursive_VF_1.085.woff2', import.meta.url);
const compressedWoff = await readFixtureFile('../../test-fixtures/Recursive_VF_1.085.woff', import.meta.url);

test.concurrent('compress to woff2', {timeout: 20000}, async({expect}) => {
    const [level10, level5] = await Promise.all([
        context.compressFromTTF(recursive, {algorithm: 'woff2', level: 10, transfer: false}),
        context.compressFromTTF(recursive, {algorithm: 'woff2', level: 5, transfer: false}),
    ]);

    expect(level10.byteLength).toBeLessThan(level5.byteLength);
    expect(level5.byteLength).toBeLessThan(recursive.byteLength);
});

test.concurrent('compress to woff1', {timeout: 20000}, async({expect}) => {
    const [level2, level1] = await Promise.all([
        context.compressFromTTF(recursive, {algorithm: 'woff', level: 2, transfer: false}),
        context.compressFromTTF(recursive, {algorithm: 'woff', level: 1, transfer: false}),
    ]);

    expect(level2.byteLength).toBeLessThan(level1.byteLength);
    expect(level1.byteLength).toBeLessThan(recursive.byteLength);
});

test.concurrent('decompress from woff2', {timeout: 20000}, async({expect}) => {
    const decompressed = await context.decompressToTTF(compressedWoff2);
    expect(decompressed.byteLength).toBeCloseTo(recursive.byteLength, -4);
});

test.concurrent('decompress from woff1', {timeout: 20000}, async({expect}) => {
    const decompressed = await context.decompressToTTF(compressedWoff);
    expect(Buffer.compare(decompressed, recursive)).toBe(0);
});

test.concurrent('compression type detection', ({expect}) => {
    expect(WoffCompressionContext.compressionType(recursive)).toBe(null);
    expect(WoffCompressionContext.compressionType(new Uint8Array(2))).toBe(null);
    expect(WoffCompressionContext.compressionType(compressedWoff)).toBe('woff');
    expect(WoffCompressionContext.compressionType(compressedWoff2)).toBe('woff2');
});
