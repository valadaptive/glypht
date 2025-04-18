// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
declare namespace RuntimeExports {
    /** @param {string=} sig */
    function addFunction(func: any, sig?: string | undefined): any;
    let wasmMemory: any;
    let wasmExports: any;
    function stackAlloc(sz: any): any;
    function stackRestore(val: any): any;
    function stackSave(): any;
}
interface WasmModule {
  _malloc(_0: number): number;
  _free(_0: number): void;
  _woffEncode(_0: number, _1: number, _2: number, _3: number, _4: number, _5: number, _6: number): number;
  _woffDecode(_0: number, _1: number, _2: number, _3: number): number;
}

export type MainModule = WasmModule & typeof RuntimeExports;
export default function MainModuleFactory (options?: unknown): Promise<MainModule>;
