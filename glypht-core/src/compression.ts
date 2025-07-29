import {fetchFile, getParallelism} from './platform';
import RpcDispatcher, {CompressionWorkerSchema, MessageSchema} from './worker-rpc';

class WorkerPool<S extends MessageSchema> {
    private workers: RpcDispatcher<S>[];
    private allWorkers: RpcDispatcher<S>[];
    private queuedOperations: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolve: (value: any) => void;
        reject: (err: unknown) => void;
        fn: (worker: RpcDispatcher<S>) => Promise<unknown>;
    }[] = [];

    constructor(workers: RpcDispatcher<S>[]) {
        this.workers = workers;
        this.allWorkers = workers.slice(0);
    }
    private doWork() {
        while (this.workers.length > 0 && this.queuedOperations.length > 0) {
            const nextOperation = this.queuedOperations.pop()!;
            const worker = this.workers.pop()!;

            const onComplete = () => {
                this.workers.push(worker);
                queueMicrotask(() => {
                    this.doWork();
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
    }

    enqueue<T>(operation: (worker: RpcDispatcher<S>) => Promise<T>) {
        let resolve!: (value: T) => void, reject!: (error: unknown) => void;
        const promise = new Promise((_resolve: (value: T) => void, _reject) => {
            resolve = _resolve;
            reject = _reject;
        });

        this.queuedOperations.push({
            resolve,
            reject,
            fn: operation,
        });

        this.doWork();
        return promise;
    }

    destroy() {
        for (const worker of this.allWorkers) {
            worker.close();
        }
        this.allWorkers.length = 0;
    }
}

/**
 * Context object for font compression and decompression. All operations are done off-thread using a worker pool. If
 * running in an environment where your program is meant to exit by itself (e.g. on the command line), you must call
 * {@link WoffCompressionContext#destroy} to close the worker threads and allow the program to exit.
 */
export class WoffCompressionContext {
    private pool: Promise<WorkerPool<CompressionWorkerSchema>>;
    private destroyed = false;
    private parallelism: number | Promise<number>;

    /**
     * Create a new compression/decompression context.
     * @param parallelism The number of worker threads to create. If not given, this will default to the number of cores
     * on the system or `navigator.hardwareConcurrency`.
     */
    public constructor(parallelism?: number) {
        const resolvedParallelism = parallelism ?? getParallelism();
        this.parallelism = resolvedParallelism;

        this.pool = (async() => {
            const woffWasmUrls = [
                new URL('./woff1.wasm', import.meta.url),
                new URL('./woff2.wasm', import.meta.url),
            ];
            const [woff1, woff2] = await Promise.all(woffWasmUrls.map(url => fetchFile(url)));

            const workers = [];
            for (let i = 0, parallelism = await resolvedParallelism; i < parallelism; i++) {
                const worker = new Worker(new URL('./compression-worker.worker.js', import.meta.url), {type: 'module'});
                const dispatcher = new RpcDispatcher<CompressionWorkerSchema>(worker, {
                    'compress-font': 'compressed-font',
                    'decompress-font': 'decompressed-font',
                });
                dispatcher.sendAndForget('init-woff-wasm', {woff1, woff2});
                workers.push(dispatcher);
            }
            return new WorkerPool(workers);
        })();
    }

    /**
     * @returns The resolved number of worker threads, e.g. for ETA or progress estimation.
     */
    public async getParallelism() {
        return await this.parallelism;
    }

    private checkDestroyed() {
        if (this.destroyed) {
            throw new DOMException('This WoffCompressionContext has been destroyed', 'InvalidStateError');
        }
    }

    /**
     * Compress an OpenType font file to WOFF or WOFF2.
     * @param ttf The font file to compress. This must be a single font, not a collection.
     * @param algorithm The compression algorithm to use, either `woff` or `woff2`.
     * @param quality The compression quality. For WOFF2, this can range from 1 to 11. For WOFF, this means the number
     * of Zopfli iterations and can theoretically go up to any value, although 15 is a good default.
     * @returns Compressed font data.
     */
    public async compressFromTTF(
        ttf: Uint8Array,
        algorithm: 'woff' | 'woff2',
        quality: number,
    ): Promise<Uint8Array> {
        this.checkDestroyed();
        const pool = await this.pool;
        return await pool.enqueue((async worker => {
            const compressed = await worker.send('compress-font', {data: ttf, algorithm, quality});
            return compressed;
        }));
    }

    /**
     * Decompress a WOFF or WOFF2-compressed font file. Throws an error if the input font is not compressed.
     * @param compressed The compressed font file data.
     * @returns Decompressed font file data.
     */
    public async decompressToTTF(compressed: Uint8Array): Promise<Uint8Array> {
        this.checkDestroyed();
        const algorithm = WoffCompressionContext.compressionType(compressed);
        if (algorithm === null) {
            throw new Error('This font file is not compressed');
        }
        const pool = await this.pool;
        return await pool.enqueue((async worker => {
            const decompressed = await worker.send('decompress-font', {data: compressed, algorithm});
            return decompressed;
        }));
    }

    /**
     * Return the compression type for a given font file.
     * @param fontData The font file to check.
     * @returns 'woff' if the file is compressed with WOFF1, 'woff2' if it's compressed with WOFF2, or null if it's not
     * compressed.
     */
    public static compressionType(fontData: Uint8Array): 'woff' | 'woff2' | null {
        if (fontData.length < 4) {
            return null;
        }
        const magic = (
            fontData[3] |
            (fontData[2] << 8) |
            (fontData[1] << 16) |
            (fontData[0] << 24)
        );
        // WOFF1
        if (magic === 0x774F4646) {
            return 'woff';
        }
        // WOFF2
        else if (magic === 0x774F4632) {
            return 'woff2';
        }

        return null;
    }

    /**
     * Destroy this context. All previous calls to this context's compression and decompression methods *will* resolve,
     * but any further calls will error out.
     *
     * If running in Node, Bun, Deno, or another such runtime, this will allow the program to exit once all font
     * processing work is finished.
     */
    public destroy() {
        void this.pool.then(pool => pool.destroy());
        this.destroyed = true;
    }
}
