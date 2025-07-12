import Worker from 'web-worker';

let workerBlobSupport: boolean | null = null;

/**
 * Tests whether this environment's web worker implementation supports fetching blob URLs.
 * @returns whether fetching blob URLs from workers is supported.
 */
export const workerSupportsBlobUrls = async(): Promise<boolean> => {
    if (workerBlobSupport !== null) {
        return workerBlobSupport;
    }
    const testUrl = URL.createObjectURL(new Blob([]));
    // We can't just use a data: URI for the worker source since those are considered opaque origins and all blob
    // requests from it will fail:
    // https://stackoverflow.com/questions/72091273/fetch-from-web-worker-does-not-send-same-origin
    // This means that Node (at the time of writing) will error immediately. That's OK because it doesn't support
    // fetching blobs from workers anyway.
    const workerUrl = URL.createObjectURL(new Blob([`
        try {await fetch(${JSON.stringify(testUrl)}); postMessage(true)} catch (err) {postMessage(err)}`], {type: 'text/javascript'}));

    try {
        workerBlobSupport = await new Promise((resolve, reject) => {
            const ac = new AbortController();
            const testWorker = new Worker(workerUrl, {type: 'module'});
            testWorker.addEventListener('message', event => {
                testWorker.terminate();
                resolve(event.data as boolean);
                ac.abort();
            }, {signal: ac.signal});
            testWorker.addEventListener('error', event => {
                testWorker.terminate();
                reject(event.error as Error);
                ac.abort();
            });
        });
    } catch {
        workerBlobSupport = false;
    } finally {
        URL.revokeObjectURL(testUrl);
        URL.revokeObjectURL(workerUrl);
    }
    return workerBlobSupport!;
};

let parallelismResult: number | null = null;

/**
 * Returns the number of available CPU cores. Defaults to 2 otherwise.
 * @returns THe number of available CPU cores, or an approximation that should tell you how many worker threads to
 * create.
 */
export const getParallelism = async(): Promise<number> => {
    if (parallelismResult !== null) {
        return parallelismResult;
    }

    parallelismResult = 2;
    if (typeof navigator === 'object' && typeof navigator.hardwareConcurrency === 'number') {
        parallelismResult = navigator.hardwareConcurrency;
    } else {
        try {
            const os = await import('os');
            if (typeof os.availableParallelism === 'function') {
                parallelismResult = os.availableParallelism();
            } else if (typeof os.cpus === 'function') {
                parallelismResult = os.cpus().length;
            }
        } catch {
            // Ignore errors and just stick with the default parallelism value
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return parallelismResult!;
};
