import {
    AxisInfo,
    FeatureInfo,
    NamedInstance,
    SfntVersion,
    StyleValues,
    SubsetInfo,
    SubsetSettings,
    SubsettedFont,
} from './font-types';

export type MessageSchema = {
    readonly request: {
        readonly name: string;
        readonly message: unknown;
    };
    readonly response: {
        readonly name: string;
        readonly message: unknown;
    };
};

export type RpcSchema = MessageSchema[];

export type FontMessage = {
    id: number;
    uid: string;
    faceCount: number;
    faceIndex: number;
    familyName: string;
    subfamilyName: string;
    styleValues: StyleValues;
    fileSize: number;
    axes: AxisInfo[];
    features: FeatureInfo[];
    namedInstances: NamedInstance[];
    subsetCoverage: SubsetInfo[];
    unicodeRanges: (number | readonly [number, number])[];
};

export type FontWorkerSchema =
    | {
        request: {
            name: 'update-fonts';
            message: {
                loadFonts: Uint8Array[];
                unloadFonts: number[];
            };
        };
        response: {
            name: 'updated-fonts';
            message: {
                fonts: FontMessage[];
            };
        };
    }
    | {
        request: {
            name: 'subset-font';
            message: {font: number; settings: SubsetSettings};
        };
        response: {
            name: 'subsetted-font';
            message: SubsettedFont;
        };
    }
    | {
        request: {name: 'get-font-data'; message: number};
        response: {name: 'got-font-data'; message: {data: Uint8Array; format: SfntVersion}};
    };

export type CompressionWorkerSchema =
    | {
        request: {
            name: 'init-woff-wasm';
            message: {woff1: ArrayBuffer | string; woff2: ArrayBuffer | string};
        };
        response: never;
    }
    | {
        request: {
            name: 'compress-font';
            message: {data: Uint8Array; algorithm: 'woff' | 'woff2'; quality: number};
        };
        response: {
            name: 'compressed-font';
            message: Uint8Array;
        };
    }
    | {
        request: {
            name: 'decompress-font';
            message: {data: Uint8Array; algorithm: 'woff' | 'woff2'};
        };
        response: {
            name: 'decompressed-font';
            message: Uint8Array;
        };
    };

type ReqRespMap<T extends MessageSchema> = {
    [M in T as M['response']['name'] extends never ? never : M['request']['name']]: M['response']['name']
};

export type MessageToWorker<T extends MessageSchema> = (T extends unknown ?
    {
        type: T['request']['name'];
        message: T['request']['message'];
        id: number;
    } :
    never) | {type: 'close'; message: null; id: number};

export type MessageFromWorker<T extends MessageSchema> = (T extends unknown ?
    {
        type: T['response']['name'];
        message: T['response']['message'];
        originId: number;
    } :
    never) | {type: 'error'; message: unknown; originId: number};

export default class RpcDispatcher<T extends MessageSchema> {
    private worker: Worker;
    private map: ReqRespMap<T>;
    private sentMessageId = 0;
    /**
     * Number of messages we're waiting for the worker to respond to. If greater
     * than 0, we will avoid terminating the worker until this hits 0.
     */
    private inflightRequests = 0;
    /**
     * True if we're waiting to terminate the worker.
     */
    private deferClose = false;

    constructor(worker: Worker, map: ReqRespMap<T>) {
        this.worker = worker;
        this.map = map;
    }

    send<
        Name extends T['request']['name'],
        Message extends Extract<T, {request: {name: Name}}>['request']['message'],
    >(
        name: Name,
        message: Message,
        transfer?: Transferable[],
    ): Promise<Extract<T, {request: {name: Name}}>['response']['message']> {
        const id = this.sentMessageId++;
        const worker = this.worker;
        const fullMessage = {
            type: name,
            message,
            id,
        };
        worker.postMessage(fullMessage, transfer!);

        this.inflightRequests++;
        return new Promise((resolve, reject) => {
            const ac = new AbortController();
            worker.addEventListener('message', msg => {
                const data = msg.data as MessageFromWorker<T>;
                if (data.originId !== id) return;

                this.inflightRequests--;
                if (this.inflightRequests === 0 && this.deferClose) {
                    this.worker.terminate();
                }
                if (data.type === this.map[name as unknown as keyof ReqRespMap<T>]) {
                    ac.abort();
                    resolve(data.message);
                } else if (data.type === 'error') {
                    ac.abort();
                    reject(data.message as Error);
                }
            }, {signal: ac.signal});
        });
    }

    sendAndForget<
        Name extends string,
        Message extends Extract<T, {request: {name: Name}}>['request']['message'],
    >(
        name: Name,
        message: Message,
        transfer?: Transferable[],
    ): void {
        const id = this.sentMessageId++;
        const worker = this.worker;
        const fullMessage = {
            type: name,
            message,
            id,
        };
        worker.postMessage(fullMessage, transfer!);
    }

    close() {
        if (this.inflightRequests === 0) {
            this.worker.terminate();
        } else {
            this.deferClose = true;
        }
    }
}

export const postMessageFromWorker = <T extends MessageSchema>(
    message: MessageFromWorker<T>,
    transfer: Transferable[] = [],
) => {
    try {
        (postMessage as (...args: unknown[]) => unknown)(message, undefined, transfer);
    } catch (error) {
        postMessage({type: 'error', message: error, originId: message.originId} satisfies MessageFromWorker<T>);
    }
};
