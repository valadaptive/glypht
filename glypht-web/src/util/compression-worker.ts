import createWoff1, {MainModule as Woff1MainModule} from '../../../c-libs-wrapper/woff1-wrapper';
import createWoff2, {MainModule as Woff2MainModule} from '../../../c-libs-wrapper/woff2-wrapper';
import {MessageFromWorker, MessageToWorker, postMessageFromWorker} from './messages';

let woff1Promise: Promise<Woff1MainModule> | null = null;
let woff2Promise: Promise<Woff2MainModule> | null = null;
addEventListener('message', async event => {
    const message = event.data as MessageToWorker;

    try {
        switch (message.type) {
            case 'init-woff-wasm': {
                woff1Promise = createWoff1('woff1.wasm', message.message.woff1);
                woff2Promise = createWoff2('woff2.wasm', message.message.woff2);
                break;
            }
            case 'compress-font': {
                let compressed;
                switch (message.message.algorithm) {
                    case 'woff':
                        compressed = await compressWoff1(message.message.data, message.message.quality);
                        break;
                    case 'woff2':
                        compressed = await compressWoff2(message.message.data, message.message.quality);
                        break;
                }
                postMessageFromWorker(
                    {type: 'compressed-font', message: compressed, originId: message.id},
                    [compressed.buffer],
                );
                break;
            }
            case 'decompress-font': {
                let decompressed;
                switch (message.message.algorithm) {
                    case 'woff':
                        decompressed = await decompressWoff1(message.message.data);
                        break;
                    case 'woff2':
                        decompressed = await decompressWoff2(message.message.data);
                        break;
                }
                postMessageFromWorker(
                    {type: 'decompressed-font', message: decompressed, originId: message.id},
                    [decompressed.buffer],
                );
                break;
            }
        }
    } catch (error) {
        postMessage({type: 'error', message: error, originId: message.id} satisfies MessageFromWorker);
    }
});

const woffErrors = [
    '', // OK
    'Out of memory',
    'Invalid input file',
    'Compression failure',
    'Bad signature',
    'Buffer too small',
    'Bad parameter',
    'Improperly ordered chunks',
];

const compressWoff1 = async(ttf: Uint8Array, numIterations: number) => {
    if (!woff1Promise) {
        throw new Error('WOFF1 module not initialized');
    }

    const woff1 = await woff1Promise;

    const dataPtr = woff1._malloc(ttf.byteLength);
    woff1.HEAPU8.set(ttf, dataPtr);
    try {
        return woff1.withStack(() => {
            const resultLengthPtr = woff1.stackAlloc(4);
            const statusPtr = woff1.stackAlloc(4);
            const resultPtr = woff1._woffEncode(
                dataPtr, ttf.byteLength, 0, 0, numIterations, resultLengthPtr, statusPtr);
            if (!resultPtr) {
                throw new Error('Failed to convert TTF to WOFF');
            }
            const status = woff1.readUint32(statusPtr);
            if ((status & 0xff) !== 0) {
                throw new Error(`Failed to convert TTF to WOFF: ${woffErrors[status]}`);
            }
            const result = woff1.HEAPU8.slice(resultPtr, resultPtr + woff1.readUint32(resultLengthPtr));
            woff1._free(resultPtr);
            return result;
        });
    } finally {
        woff1._free(dataPtr);
    }
};

const decompressWoff1 = async(woff: Uint8Array) => {
    if (!woff1Promise) {
        throw new Error('WOFF1 module not initialized');
    }

    const woff1 = await woff1Promise;

    const dataPtr = woff1._malloc(woff.byteLength);
    woff1.HEAPU8.set(woff, dataPtr);
    try {
        return woff1.withStack(() => {
            const resultLengthPtr = woff1.stackAlloc(4);
            const statusPtr = woff1.stackAlloc(4);
            const resultPtr = woff1._woffDecode(dataPtr, woff.byteLength, resultLengthPtr, statusPtr);
            if (!resultPtr) {
                throw new Error('Failed to convert WOFF to TTF');
            }
            const status = woff1.readUint32(statusPtr);
            if ((status & 0xff) !== 0) {
                throw new Error(`Failed to convert WOFF to TTF: ${woffErrors[status]}`);
            }
            const result = woff1.HEAPU8.slice(resultPtr, resultPtr + woff1.readUint32(resultLengthPtr));
            woff1._free(resultPtr);
            return result;
        });
    } finally {
        woff1._free(dataPtr);
    }
};

const compressWoff2 = async(ttf: Uint8Array, quality: number) => {
    if (!woff2Promise) {
        throw new Error('WOFF2 module not initialized');
    }

    const woff2 = await woff2Promise;

    const dataPtr = woff2._malloc(ttf.byteLength);
    woff2.HEAPU8.set(ttf, dataPtr);
    try {
        const maxCompressedSize = woff2._max_woff2_compressed_size(dataPtr, ttf.byteLength);
        const outPtr = woff2._malloc(maxCompressedSize);
        try {
            return woff2.withStack(() => {
                const resultLengthPtr = woff2.stackAlloc(4);
                woff2.writeUint32(resultLengthPtr, maxCompressedSize);
                const ok = !!woff2._convert_ttf_to_woff2(dataPtr, ttf.byteLength, outPtr, resultLengthPtr, quality);
                if (!ok) {
                    throw new Error('Failed to convert TTF to WOFF2');
                }
                return woff2.HEAPU8.slice(outPtr, outPtr + woff2.readUint32(resultLengthPtr));
            });
        } finally {
            woff2._free(outPtr);
        }
    } finally {
        woff2._free(dataPtr);
    }
};

const decompressWoff2 = async(woff2Font: Uint8Array) => {
    const MAX_DECOMPRESSED_SIZE = 60 * 1024 * 1024;
    if (!woff2Promise) {
        throw new Error('WOFF2 module not initialized');
    }

    const woff2 = await woff2Promise;
    const dataPtr = woff2.malloc(woff2Font.byteLength);
    woff2.HEAPU8.set(woff2Font, dataPtr);
    try {
        const initialDecompressedSize = woff2._compute_woff2_final_size(dataPtr, woff2Font.byteLength);
        let outPtr = woff2.malloc(initialDecompressedSize);
        try {
            return woff2.withStack(() => {
                const resultLengthPtr = woff2.stackAlloc(4);
                outPtr = woff2._convert_woff2_to_ttf(
                    dataPtr,
                    woff2Font.byteLength,
                    resultLengthPtr,
                    MAX_DECOMPRESSED_SIZE,
                );
                return woff2.HEAPU8.slice(outPtr, outPtr + woff2.readUint32(resultLengthPtr));
            });
        } finally {
            woff2._free(outPtr);
        }
    } finally {
        woff2._free(dataPtr);
    }
};
