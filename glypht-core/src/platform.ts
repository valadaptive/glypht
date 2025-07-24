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

/**
 * Load a file from a specific path, across browsers and JS runtimes.
 * @param path The path string or URL to load from.
 * @returns The file contents.
 */
export const fetchFile = async(path: string | URL): Promise<Uint8Array> => {
    let pathUrl: URL | undefined, filePath: string | undefined;
    if (typeof path === 'string') {
        try {
            pathUrl = new URL(path);
        } catch {
            // The module path isn't a URL
            filePath = path;
        }
    } else {
        pathUrl = path;
    }
    if (pathUrl) {
        try {
            // Node, at least, does not support `fetch`ing a file: URI. If we get one of those, always try to load it
            // using Node's filesystem APIs.
            if (pathUrl.protocol === 'file:') {
                filePath = (await import('node:url')).fileURLToPath(pathUrl);
            }
        } catch {
            // We're running in an environment which doesn't support node:url or fileURLToPath. Maybe it'll at least
            // support `fetch`ing a file: URI.
        }
    }

    if (filePath) {
        try {
            const buf = await (await import('node:fs/promises')).readFile(filePath);
            // We return a Uint8Array instead of an ArrayBuffer just in case Node pools buffers for file loads. I don't
            // think it does, but you never know...
            return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
        } catch {
            // *sigh* We're running in a CloudFlare worker, which does not have documented support for Node's fs API.
            // You know, this entire song and dance (*three* try/catch blocks' worth!) could be avoided if Node would
            // just implement support for fetching $&#! file URIs...
        }
    }
    if (!pathUrl) {
        throw new Error(`Your runtime does not support any loading strategy for ${path}.`);
    }
    return new Uint8Array(await (await fetch(pathUrl)).arrayBuffer());
};
