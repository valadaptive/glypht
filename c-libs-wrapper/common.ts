type MainModule = {
    stackAlloc(sz: number): number;
    stackRestore(val: number): number;
    stackSave(): number;
    addFunction(fn: (...args: never[]) => unknown, sig: string): number;
    HEAPF32: Float32Array;
    HEAPU8: Uint8Array;
    HEAPU32: Uint32Array;
};

export type MainModuleExt<T> = Omit<T, keyof MainModule> & MainModule & {
    readUint32(addr: number): number;
    writeUint32(addr: number, value: number): void;
    readFloat32(addr: number): number;
    writeFloat32(addr: number, value: number): void;
    withStack<T extends (...args: unknown[]) => unknown>(cb: T): ReturnType<T>;
    malloc(size: number): number;
}

const debugAddr = (addr: number) => `0x${addr.toString(16).padStart(8, '0')}`;

export const wrapInitFunction = <T>(initFunction: (options?: unknown) => Promise<T>): (origUrl: string, wasmUrl: string) => Promise<MainModuleExt<T>> => {
    const wrappedInit = async (origUrl: string, wasmUrl: string): Promise<MainModuleExt<T>> => {
        const module = await initFunction({
            locateFile: (url: string) => {
                if (url === origUrl) {
                    return wasmUrl;
                }
                return url;
            },
        }) as MainModule;
        (module as MainModuleExt<T>).readUint32 = (addr: number) => {
            if (addr & 0b11) {
                throw new Error(`Tried to read uint32 at unaligned address: ${debugAddr(addr)}`);
            }
            return module.HEAPU32[addr >> 2];
        };

        (module as MainModuleExt<T>).writeUint32 = (addr: number, value: number) => {
            if (addr & 0b11) {
                throw new Error(`Tried to write uint32 at unaligned address: ${debugAddr(addr)}`);
            }
            module.HEAPU32[addr >> 2] = value;
        };

        (module as MainModuleExt<T>).readFloat32 = (addr: number) => {
            if (addr & 0b11) {
                throw new Error(`Tried to read float at unaligned address: ${debugAddr(addr)}`);
            }
            return module.HEAPF32[addr >> 2];
        };

        (module as MainModuleExt<T>).writeFloat32 = (addr: number, value: number) => {
            if (addr & 0b11) {
                throw new Error(`Tried to write float at unaligned address: ${debugAddr(addr)}`);
            }
            module.HEAPF32[addr >> 2] = value;
        };

        (module as MainModuleExt<T>).withStack = <T extends (...args: unknown[]) => unknown>(cb: T): ReturnType<T> => {
            const stack = module.stackSave();
            try {
                return cb() as ReturnType<T>;
            } finally {
                module.stackRestore(stack);
            }
        };

        (module as MainModuleExt<T>).malloc = (size: number): number => {
            const ptr = (module as (MainModule & {_malloc: any}))._malloc(size);
            if (ptr === 0) {
                throw new Error('Out of WASM memory');
            }
            return ptr;
        }

        return module as MainModuleExt<T>;
    }

    return wrappedInit;
}
