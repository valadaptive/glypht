import {fetchFile} from './platform';

/* eslint-disable @typescript-eslint/no-explicit-any */
type EmscriptenDefinedExports = {
    addFunction(func: any, sig?: string): any;
    wasmMemory: any;
    wasmExports: any;
    stackAlloc(sz: any): any;
    stackRestore(val: any): any;
    stackSave(): any;
    _malloc(): any;
    HEAPU8: any;
    HEAPU32: any;
    HEAPF32: any;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

type WasmExportsOnly<T extends object> = Omit<T, keyof EmscriptenDefinedExports>;

export type AugmentedModule<T extends object> = WasmExportsOnly<T> & {
    wasmMemory: WebAssembly.Memory;
    HEAPU8: Uint8Array;
    stackAlloc(sz: number): number;
    stackRestore(val: number): number;
    stackSave(): number;
    withStack<T extends (...args: unknown[]) => unknown>(cb: T): ReturnType<T>;
    malloc(size: number): number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addIndirectFunction(f: (...args: any[]) => unknown): number;
    readUint32(addr: number): number;
    writeUint32(addr: number, value: number): void;
    readFloat32(addr: number): number;
    writeFloat32(addr: number, value: number): void;
};

const instantiateWasm = async(path: string | URL | BufferSource, imports: WebAssembly.Imports) => {
    if (typeof path === 'object' && ('byteLength' in path)) {
        return await WebAssembly.instantiate(path, imports);
    }
    if ('instantiateStreaming' in WebAssembly) {
        const pathUrl = typeof path === 'string' ? new URL(path) : path;
        if (pathUrl.protocol !== 'file:') {
            const response = await fetch(pathUrl);
            return await WebAssembly.instantiateStreaming(response, imports);
        }
    }
    return await WebAssembly.instantiate(await fetchFile(path), imports);
};

/**
 * Instantiate and initialize a WebAssembly module, adding some useful wrapper functions.
 * @param source The WebAssembly module path, provided as a string or URL, or its direct byte contents.
 * @returns An augmented WebAssembly module.
 */
export const initWasm = async <T extends object>(source: string | URL | BufferSource): Promise<AugmentedModule<T>> => {
    const stub = () => {throw new Error('Not implemented');};
    let memoryView: DataView;
    const importFns = {
        fd_seek: stub,
        fd_write: stub,
        fd_close: stub,
        proc_exit: stub,
        emscripten_notify_memory_growth: () => {
            memoryView = new DataView((instance.exports.memory as WebAssembly.Memory).buffer);
            augmentedModule.HEAPU8 = new Uint8Array((instance.exports.memory as WebAssembly.Memory).buffer);
        },
    };

    const imports = {
        env: importFns,
        wasi_snapshot_preview1: importFns,
    };
    const {module, instance} = await instantiateWasm(source, imports);
    memoryView = new DataView((instance.exports.memory as WebAssembly.Memory).buffer);

    const funcTable = instance.exports.__indirect_function_table as WebAssembly.Table;
    const augmentedModule: AugmentedModule<T> = {
        wasmMemory: instance.exports.memory as WebAssembly.Memory,
        HEAPU8: new Uint8Array((instance.exports.memory as WebAssembly.Memory).buffer),
        stackAlloc: instance.exports._emscripten_stack_alloc,
        stackRestore: instance.exports._emscripten_stack_restore,
        stackSave: instance.exports.emscripten_stack_get_current,
        addIndirectFunction(f) {
            const addr = funcTable.grow(1);
            funcTable.set(addr, f);
            return addr;
        },
        withStack(f) {
            const stack = (instance.exports.emscripten_stack_get_current as () => number)();
            try {
                return f();
            } finally {
                (instance.exports._emscripten_stack_restore as (sp: number) => void)(stack);
            }
        },
        readUint32(addr) {
            return memoryView.getUint32(addr, true);
        },
        writeUint32(addr, value) {
            memoryView.setUint32(addr, value, true);
        },
        readFloat32(addr) {
            return memoryView.getFloat32(addr, true);
        },
        writeFloat32(addr, value) {
            memoryView.setFloat32(addr, value, true);
        },
        malloc(size) {
            const ptr: number = (instance.exports.malloc as (size: number) => number)(size);
            if (ptr === 0) throw new Error('Out of WASM memory');
            return ptr;
        },
    } as AugmentedModule<T>;
    for (const exported of WebAssembly.Module.exports(module)) {
        switch (exported.name) {
            case 'memory':
            case '_emscripten_stack_alloc':
            case '_emscripten_stack_restore':
            case 'emscripten_stack_get_current':
            case 'malloc':
            case '__indirect_function_table':
            case '_initialize':
                continue;
            default:
                (augmentedModule as Record<string, WebAssembly.ExportValue>)[`_${exported.name}`] = instance.exports[exported.name];
                break;
        }
    }

    (instance.exports._initialize as () => void)();

    return augmentedModule;
};
