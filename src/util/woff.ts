import woff1Url from '../../c-libs-wrapper/woff1.wasm?url';
import woff2Url from '../../c-libs-wrapper/woff2.wasm?url';
import {MessageToWorker, postCompressFont, postDecompressFont} from './messages';

const init = (async() => {
    const [woff1BlobUrl, woff2BlobUrl] = await Promise.all([woff1Url, woff2Url]
        .map(url => fetch(url)
            .then(resp => resp.blob())
            .then(blob => URL.createObjectURL(blob))));

    const workers = [];
    for (let i = 0; i < navigator.hardwareConcurrency; i++) {
        const worker = new Worker(new URL('./compression-worker.js', import.meta.url), {type: 'module'});
        worker.postMessage({
            type: 'init-woff-wasm',
            message: {woff1: woff1BlobUrl, woff2: woff2BlobUrl},
            id: -1,
        } satisfies MessageToWorker);
        workers.push(worker);
    }

    return workers;
})();

const queuedOperations: {
    resolve: (value: Uint8Array) => void;
    reject: (err: unknown) => void;
    fn: (worker: Worker) => Promise<Uint8Array>;
}[] = [];

const doWork = (workers: Worker[]) => {
    while (workers.length > 0 && queuedOperations.length > 0) {
        const nextOperation = queuedOperations.pop()!;
        const worker = workers.pop()!;

        const onComplete = () => {
            workers.push(worker);
            queueMicrotask(() => {
                doWork(workers);
            });
        };

        nextOperation.fn(worker).then(
            value => {
                onComplete();
                nextOperation.resolve(value);
            },
            error => {
                onComplete();
                nextOperation.reject(error);
            },
        );
    }
};

export const compressFromTTF = async(
    ttf: Uint8Array,
    algorithm: 'woff' | 'woff2',
    quality: number,
): Promise<Uint8Array> => {
    const workers = await init;

    let resolve!: (value: Uint8Array) => void, reject!: (error: unknown) => void;
    const promise = new Promise((_resolve: (value: Uint8Array) => void, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });

    queuedOperations.push({
        resolve,
        reject,
        fn: async(worker) => {
            const compressed = await postCompressFont(worker, ttf, algorithm, quality);
            return compressed;
        },
    });

    doWork(workers);

    return promise;
};

export const decompressToTTF = async(compressed: Uint8Array, algorithm: 'woff' | 'woff2'): Promise<Uint8Array> => {
    const workers = await init;

    let resolve!: (value: Uint8Array) => void, reject!: (error: unknown) => void;
    const promise = new Promise((_resolve: (value: Uint8Array) => void, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });

    queuedOperations.push({
        resolve,
        reject,
        fn: async(worker) => {
            const decompressed = await postDecompressFont(worker, compressed, algorithm);
            return decompressed;
        },
    });

    doWork(workers);

    return promise;
};
