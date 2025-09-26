const fetchFile = async (path) => {
  let pathUrl, filePath;
  if (typeof path === "string") {
    try {
      pathUrl = new URL(path);
    } catch {
      filePath = path;
    }
  } else {
    pathUrl = path;
  }
  if (pathUrl) {
    try {
      if (pathUrl.protocol === "file:") {
        filePath = (await import("./__vite-browser-external-Dhvy_jtL.js")).fileURLToPath(pathUrl);
      }
    } catch {
    }
  }
  if (filePath) {
    let fsp;
    try {
      fsp = await import("./__vite-browser-external-Dhvy_jtL.js");
    } catch {
    }
    if (fsp) {
      const buf = await fsp.readFile(filePath);
      return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
  }
  if (!pathUrl) {
    throw new Error(`Your runtime does not support any loading strategy for ${path}.`);
  }
  return new Uint8Array(await (await fetch(pathUrl)).arrayBuffer());
};
const instantiateWasm = async (path, imports) => {
  if (typeof path === "object" && "byteLength" in path) {
    return await WebAssembly.instantiate(path, imports);
  }
  if ("instantiateStreaming" in WebAssembly) {
    const pathUrl = typeof path === "string" ? new URL(path) : path;
    if (pathUrl.protocol !== "file:") {
      const response = await fetch(pathUrl);
      return await WebAssembly.instantiateStreaming(response, imports);
    }
  }
  return await WebAssembly.instantiate(await fetchFile(path), imports);
};
const initWasm = async (source) => {
  const stub = () => {
    throw new Error("Not implemented");
  };
  const importFns = {
    fd_seek: stub,
    fd_write: stub,
    fd_close: stub,
    proc_exit: stub,
    emscripten_notify_memory_growth: () => {
      augmentedModule.memoryView = new DataView(instance.exports.memory.buffer);
      augmentedModule.HEAPU8 = new Uint8Array(instance.exports.memory.buffer);
    }
  };
  const imports = {
    env: importFns,
    wasi_snapshot_preview1: importFns
  };
  const { module, instance } = await instantiateWasm(source, imports);
  const funcTable = instance.exports.__indirect_function_table;
  const augmentedModule = {
    wasmMemory: instance.exports.memory,
    HEAPU8: new Uint8Array(instance.exports.memory.buffer),
    memoryView: new DataView(instance.exports.memory.buffer),
    stackAlloc: instance.exports._emscripten_stack_alloc,
    stackRestore: instance.exports._emscripten_stack_restore,
    stackSave: instance.exports.emscripten_stack_get_current,
    addIndirectFunction(f) {
      const addr = funcTable.grow(1);
      funcTable.set(addr, f);
      return addr;
    },
    withStack(f) {
      const stack = instance.exports.emscripten_stack_get_current();
      try {
        return f();
      } finally {
        instance.exports._emscripten_stack_restore(stack);
      }
    },
    readUint32(addr) {
      return this.memoryView.getUint32(addr, true);
    },
    writeUint32(addr, value) {
      this.memoryView.setUint32(addr, value, true);
    },
    readFloat32(addr) {
      return this.memoryView.getFloat32(addr, true);
    },
    writeFloat32(addr, value) {
      this.memoryView.setFloat32(addr, value, true);
    },
    malloc(size) {
      const ptr = instance.exports.malloc(size);
      if (ptr === 0)
        throw new Error("Out of WASM memory");
      return ptr;
    }
  };
  for (const exported of WebAssembly.Module.exports(module)) {
    switch (exported.name) {
      case "memory":
      case "_emscripten_stack_alloc":
      case "_emscripten_stack_restore":
      case "emscripten_stack_get_current":
      case "malloc":
      case "__indirect_function_table":
      case "_initialize":
        continue;
      default:
        augmentedModule[`_${exported.name}`] = instance.exports[exported.name];
        break;
    }
  }
  instance.exports._initialize();
  return augmentedModule;
};
const postMessageFromWorker = (message, transfer = []) => {
  try {
    postMessage(message, void 0, transfer);
  } catch (error) {
    postMessage({ type: "error", message: error, originId: message.originId });
  }
};
let woff1Promise = null;
let woff2Promise = null;
const listener = async (event) => {
  const message = event.data;
  try {
    switch (message.type) {
      case "init-woff-wasm": {
        woff1Promise = initWasm(message.message.woff1);
        woff2Promise = initWasm(message.message.woff2);
        break;
      }
      case "compress-font": {
        let compressed;
        switch (message.message.algorithm) {
          case "woff":
            compressed = await compressWoff1(message.message.data, message.message.quality);
            break;
          case "woff2":
            compressed = await compressWoff2(message.message.data, message.message.quality);
            break;
        }
        postMessageFromWorker({ type: "compressed-font", message: compressed, originId: message.id }, [compressed.buffer]);
        break;
      }
      case "decompress-font": {
        let decompressed;
        switch (message.message.algorithm) {
          case "woff":
            decompressed = await decompressWoff1(message.message.data);
            break;
          case "woff2":
            decompressed = await decompressWoff2(message.message.data);
            break;
        }
        postMessageFromWorker({ type: "decompressed-font", message: decompressed, originId: message.id }, [decompressed.buffer]);
        break;
      }
      case "close": {
        removeEventListener("message", listener);
      }
    }
  } catch (error) {
    postMessage({
      type: "error",
      message: error,
      originId: message.id
    });
  }
};
addEventListener("message", listener);
const woffErrors = [
  "",
  // OK
  "Out of memory",
  "Invalid input file",
  "Compression failure",
  "Bad signature",
  "Buffer too small",
  "Bad parameter",
  "Improperly ordered chunks"
];
const compressWoff1 = async (ttf, numIterations) => {
  if (!woff1Promise) {
    throw new Error("WOFF1 module not initialized");
  }
  const woff1 = await woff1Promise;
  const dataPtr = woff1.malloc(ttf.byteLength);
  woff1.HEAPU8.set(ttf, dataPtr);
  try {
    return woff1.withStack(() => {
      const resultLengthPtr = woff1.stackAlloc(4);
      const statusPtr = woff1.stackAlloc(4);
      const resultPtr = woff1._woffEncode(dataPtr, ttf.byteLength, 0, 0, numIterations, resultLengthPtr, statusPtr);
      if (!resultPtr) {
        throw new Error("Failed to convert TTF to WOFF");
      }
      const status = woff1.readUint32(statusPtr);
      if ((status & 255) !== 0) {
        throw new Error(`Failed to convert TTF to WOFF: ${woffErrors[status]}`);
      }
      const result = woff1.HEAPU8.slice(resultPtr, resultPtr + woff1.readUint32(resultLengthPtr));
      woff1._free(resultPtr);
      return result;
    });
  } finally {
    woff1._free(dataPtr);
  }
};
const decompressWoff1 = async (woff) => {
  if (!woff1Promise) {
    throw new Error("WOFF1 module not initialized");
  }
  const woff1 = await woff1Promise;
  const dataPtr = woff1.malloc(woff.byteLength);
  woff1.HEAPU8.set(woff, dataPtr);
  try {
    return woff1.withStack(() => {
      const resultLengthPtr = woff1.stackAlloc(4);
      const statusPtr = woff1.stackAlloc(4);
      const resultPtr = woff1._woffDecode(dataPtr, woff.byteLength, resultLengthPtr, statusPtr);
      if (!resultPtr) {
        throw new Error("Failed to convert WOFF to TTF");
      }
      const status = woff1.readUint32(statusPtr);
      if ((status & 255) !== 0) {
        throw new Error(`Failed to convert WOFF to TTF: ${woffErrors[status]}`);
      }
      const result = woff1.HEAPU8.slice(resultPtr, resultPtr + woff1.readUint32(resultLengthPtr));
      woff1._free(resultPtr);
      return result;
    });
  } finally {
    woff1._free(dataPtr);
  }
};
const compressWoff2 = async (ttf, quality) => {
  if (!woff2Promise) {
    throw new Error("WOFF2 module not initialized");
  }
  const woff2 = await woff2Promise;
  const dataPtr = woff2.malloc(ttf.byteLength);
  woff2.HEAPU8.set(ttf, dataPtr);
  try {
    const maxCompressedSize = woff2._max_woff2_compressed_size(dataPtr, ttf.byteLength);
    const outPtr = woff2.malloc(maxCompressedSize);
    try {
      return woff2.withStack(() => {
        const resultLengthPtr = woff2.stackAlloc(4);
        woff2.writeUint32(resultLengthPtr, maxCompressedSize);
        const ok = !!woff2._convert_ttf_to_woff2(dataPtr, ttf.byteLength, outPtr, resultLengthPtr, quality);
        if (!ok) {
          throw new Error("Failed to convert TTF to WOFF2");
        }
        return woff2.HEAPU8.slice(outPtr, outPtr + woff2.readUint32(resultLengthPtr));
      });
    } finally {
      woff2._free(outPtr);
    }
  } finally {
    woff2._free(dataPtr);
  }
};
const decompressWoff2 = async (woff2Font) => {
  const MAX_DECOMPRESSED_SIZE = 60 * 1024 * 1024;
  if (!woff2Promise) {
    throw new Error("WOFF2 module not initialized");
  }
  const woff2 = await woff2Promise;
  const dataPtr = woff2.malloc(woff2Font.byteLength);
  woff2.HEAPU8.set(woff2Font, dataPtr);
  try {
    const initialDecompressedSize = woff2._compute_woff2_final_size(dataPtr, woff2Font.byteLength);
    let outPtr = woff2.malloc(initialDecompressedSize);
    try {
      return woff2.withStack(() => {
        const resultLengthPtr = woff2.stackAlloc(4);
        outPtr = woff2._convert_woff2_to_ttf(dataPtr, woff2Font.byteLength, resultLengthPtr, MAX_DECOMPRESSED_SIZE);
        return woff2.HEAPU8.slice(outPtr, outPtr + woff2.readUint32(resultLengthPtr));
      });
    } finally {
      woff2._free(outPtr);
    }
  } finally {
    woff2._free(dataPtr);
  }
};
