// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
declare namespace RuntimeExports {
    /** @param {string=} sig */
    function addFunction(func: any, sig?: string | undefined): any;
    let wasmMemory: any;
    let wasmExports: any;
    function stackAlloc(sz: any): any;
    function stackRestore(val: any): any;
    function stackSave(): any;
    let HEAPU8: any;
    let HEAPU32: any;
    let HEAPF32: any;
}
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
