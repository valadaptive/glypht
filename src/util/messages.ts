import type {AxisInfo, FeatureInfo, NamedInstance, StyleValues, SubsetInfo, SubsettedFont} from './font';
import {SubsetSettings} from './font-settings';

export type UpdateFonts = {
    loadFonts: Uint8Array[];
    unloadFonts: FontRef[];
};

export type UpdatedFonts = {
    fonts: FontRef[];
};

export type ExportedFonts = {
    fonts: Map<number, Uint8Array>;
};

export type MessageToWorker =
    | {type: 'update-fonts'; message: UpdateFonts; id: number}
    | {type: 'subset-font'; message: {font: number; settings: SubsetSettings}; id: number}
    | {type: 'get-font-data'; message: number; id: number}
    | {type: 'init-woff-wasm'; message: {woff1: string; woff2: string}; id: number}
    | {type: 'compress-font'; message: {data: Uint8Array; algorithm: 'woff' | 'woff2'; quality: number}; id: number}
    | {type: 'decompress-font'; message: {data: Uint8Array; algorithm: 'woff' | 'woff2'}; id: number};

export type MessageFromWorker =
    | {type: 'updated-fonts'; message: UpdatedFonts; originId: number}
    | {type: 'subsetted-font'; message: SubsettedFont; originId: number}
    | {type: 'got-font-data'; message: Uint8Array; originId: number}
    | {type: 'progress'; message: number; originId: number}
    | {type: 'compressed-font'; message: Uint8Array; originId: number}
    | {type: 'decompressed-font'; message: Uint8Array; originId: number}
    | {type: 'error'; message: unknown; originId: number};

export type Message = MessageToWorker | MessageFromWorker;

export type FontRef = {
    id: number;
    uid: string;
    familyName: string;
    subfamilyName: string;
    styleValues: StyleValues;
    fileSize: number;
    /** Variable font axes. Does not include variable axes listed in {@link styleValues}. */
    axes: AxisInfo[];
    features: FeatureInfo[];
    namedInstances: NamedInstance[];
    /**
     * Names of Unicode subsets for which this font has *any* coverage (it does not need to cover the entire subset).
     */
    subsetCoverage: SubsetInfo[];
};

// We use the same incrementing ID for both the HarfBuzz worker and WOFF2 compression workers--no need to have different
// ID counters for each
let sentMessageId = 0;

export const postUpdateFonts = (
    worker: Worker,
    loadFonts: Uint8Array[],
    unloadFonts: FontRef[],
): Promise<FontRef[]> => {
    const id = sentMessageId++;
    worker.postMessage({
        type: 'update-fonts',
        message: {loadFonts, unloadFonts},
        id,
    } satisfies MessageToWorker, loadFonts.map(font => font.buffer));

    return new Promise((resolve, reject) => {
        const ac = new AbortController();
        worker.addEventListener('message', msg => {
            const data = msg.data as MessageFromWorker;
            if (data.originId !== id) return;

            if (data.type === 'updated-fonts') {
                ac.abort();
                resolve(data.message.fonts);
            } else if (data.type === 'error') {
                ac.abort();
                reject(data.message as Error);
            }
        }, {signal: ac.signal});
    });
};

export const postSubsetFont = (
    worker: Worker,
    font: number,
    settings: SubsetSettings,
): Promise<SubsettedFont> => {
    const id = sentMessageId++;
    worker.postMessage({
        type: 'subset-font',
        message: {font, settings},
        id,
    } satisfies MessageToWorker);

    return new Promise((resolve, reject) => {
        const ac = new AbortController();
        worker.addEventListener('message', msg => {
            const data = msg.data as MessageFromWorker;
            if (data.originId !== id) return;

            if (data.type === 'subsetted-font') {
                ac.abort();
                resolve(data.message);
            } else if (data.type === 'error') {
                ac.abort();
                reject(data.message as Error);
            }
        }, {signal: ac.signal});
    });
};

export const postGetFontData = (
    worker: Worker,
    font: number,
): Promise<Uint8Array> => {
    const id = sentMessageId++;
    worker.postMessage({
        type: 'get-font-data',
        message: font,
        id,
    } satisfies MessageToWorker);

    return new Promise((resolve, reject) => {
        const ac = new AbortController();
        worker.addEventListener('message', msg => {
            const data = msg.data as MessageFromWorker;
            if (data.originId !== id) return;

            if (data.type === 'got-font-data') {
                ac.abort();
                resolve(data.message);
            } else if (data.type === 'error') {
                ac.abort();
                reject(data.message as Error);
            }
        }, {signal: ac.signal});
    });
};

export const postCompressFont = (
    worker: Worker,
    data: Uint8Array,
    algorithm: 'woff' | 'woff2',
    quality: number,
): Promise<Uint8Array> => {
    // We don't transfer the buffer here because we want to keep the original font loaded
    const id = sentMessageId++;
    worker.postMessage({
        type: 'compress-font',
        message: {data, algorithm, quality},
        id,
    } satisfies MessageToWorker);

    return new Promise((resolve, reject) => {
        const ac = new AbortController();
        worker.addEventListener('message', msg => {
            const data = msg.data as MessageFromWorker;
            if (data.originId !== id) return;

            if (data.type === 'compressed-font') {
                ac.abort();
                resolve(data.message);
            } else if (data.type === 'error') {
                ac.abort();
                reject(data.message as Error);
            }
        }, {signal: ac.signal});
    });
};

export const postDecompressFont = (
    worker: Worker,
    data: Uint8Array,
    algorithm: 'woff' | 'woff2',
): Promise<Uint8Array> => {
    const id = sentMessageId++;
    worker.postMessage({
        type: 'decompress-font',
        message: {data, algorithm},
        id,
    } satisfies MessageToWorker, [data.buffer]);

    return new Promise((resolve, reject) => {
        const ac = new AbortController();
        worker.addEventListener('message', msg => {
            const data = msg.data as MessageFromWorker;
            if (data.originId !== id) return;

            if (data.type === 'decompressed-font') {
                ac.abort();
                resolve(data.message);
            } else if (data.type === 'error') {
                ac.abort();
                reject(data.message as Error);
            }
        }, {signal: ac.signal});
    });
};

export const postMessageFromWorker = (message: MessageFromWorker, transfer: Transferable[] = []) => {
    try {
        (postMessage as (...args: unknown[]) => unknown)(message, undefined, transfer);
    } catch (error) {
        postMessage({type: 'error', message: error, originId: message.originId} satisfies MessageFromWorker);
    }
};
