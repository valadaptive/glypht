// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
declare var RuntimeExports: {
    /** @param {string=} sig */
    addFunction: (func: any, sig?: string | undefined) => any;
    stackAlloc: (sz: any) => any;
    stackRestore: (val: any) => any;
    stackSave: () => any;
    /** @type {!Uint8Array} */
    HEAPU8: Uint8Array;
    /** @type {!Uint32Array} */
    HEAPU32: Uint32Array;
    /** @type {!Float32Array} */
    HEAPF32: Float32Array;
};
interface WasmModule {
  _max_woff2_compressed_size(_0: number, _1: number): number;
  _convert_ttf_to_woff2(_0: number, _1: number, _2: number, _3: number, _4: number): number;
  _compute_woff2_final_size(_0: number, _1: number): number;
  _convert_woff2_to_ttf(_0: number, _1: number, _2: number, _3: number): number;
  _malloc(_0: number): number;
  _free(_0: number): void;
  __initialize(): void;
}

export type MainModule = WasmModule & typeof RuntimeExports;
export default function MainModuleFactory (options?: unknown): Promise<MainModule>;
