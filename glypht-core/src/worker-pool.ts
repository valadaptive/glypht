import RpcDispatcher, {MessageSchema} from './worker-rpc.js';

const filterArrayInPlace = <T>(
    arr: T[],
    predicate: (item: T) => boolean,
): void => {
    let nextKeptIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (predicate(item)) {
            arr[nextKeptIndex] = item;
            nextKeptIndex++;
        }
    }
    arr.length = nextKeptIndex;
};

export default class WorkerPool<S extends MessageSchema> {
    private workers: RpcDispatcher<S>[];
    private allWorkers: RpcDispatcher<S>[];
    private queuedOperations: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolve: (value: any) => void;
        reject: (err: unknown) => void;
        fn: (worker: RpcDispatcher<S>) => Promise<unknown>;
    }[] = [];
    private backpressureCallbacks: {n: number; cb: () => void}[] = [];

    constructor(workers: RpcDispatcher<S>[]) {
        this.workers = workers;
        this.allWorkers = workers.slice(0);
    }
    private doWork() {
        while (this.workers.length > 0 && this.queuedOperations.length > 0) {
            const nextOperation = this.queuedOperations.pop()!;
            const worker = this.workers.pop()!;
            filterArrayInPlace(this.backpressureCallbacks, ({n, cb}) => {
                if (this.queuedOperations.length <= n) {
                    cb();
                    return false;
                }
                return true;
            });

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

    backpressure(n: number) {
        if (this.queuedOperations.length <= n) return Promise.resolve();
        return new Promise(resolve => {
            this.backpressureCallbacks.push({n, cb: resolve as () => void});
        });
    }
}
