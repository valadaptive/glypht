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
const decompress = (data, onRange) => {
  const getByte = typeof data == "string" ? (data = atob(data), (i) => data.charCodeAt(i) || 0) : (i) => data[i] ?? 0;
  const readBits = (bitOffset2) => {
    const byteOffset = bitOffset2 >>> 3;
    const shift = bitOffset2 & 7;
    let word = getByte(byteOffset) << 24 | getByte(byteOffset + 1) << 16 | getByte(byteOffset + 2) << 8 | getByte(byteOffset + 3);
    if (shift) {
      word = word << shift | getByte(byteOffset + 4) >>> 8 - shift;
    }
    return word >>> 0;
  };
  const bitLength = data.length << 3;
  let bitOffset = 0;
  let pos = 0;
  let currentRunStart = 0;
  let symbolIsOne = false;
  const endRange = () => {
    if (currentRunStart) {
      onRange(currentRunStart - 1, pos - 1);
      currentRunStart = 0;
    }
  };
  let leadingZeros;
  while ((leadingZeros = Math.clz32(readBits(bitOffset))) < bitLength - bitOffset) {
    const dist = readBits(bitOffset + leadingZeros) >>> 31 - leadingZeros;
    bitOffset += leadingZeros * 2 + 1;
    if (dist > 1) {
      if (symbolIsOne) {
        if (!currentRunStart)
          currentRunStart = pos + 1;
      } else {
        endRange();
      }
      pos += dist - 1;
    }
    if (!symbolIsOne) {
      if (!currentRunStart)
        currentRunStart = pos + 1;
    } else {
      endRange();
    }
    pos++;
    symbolIsOne = symbolIsOne != (dist == 1);
  }
  endRange();
};
const createHarfbuzzWrapped = async (hbWasmUrl) => {
  const hb2 = await initWasm(hbWasmUrl);
  const freeBlob = hb2.addIndirectFunction(hb2._free);
  class HbBlob {
    _ptr;
    constructor(ptrOrData) {
      if (typeof ptrOrData === "number") {
        this._ptr = ptrOrData;
        return;
      }
      const dataPtr = hb2.malloc(ptrOrData.byteLength);
      hb2.HEAPU8.set(ptrOrData, dataPtr);
      const blobPtr = hb2._hb_blob_create_or_fail(dataPtr, ptrOrData.byteLength, 2, dataPtr, freeBlob);
      if (blobPtr === 0) {
        throw new Error("Failed to create blob");
      }
      this._ptr = blobPtr;
    }
    ptr() {
      return this._ptr;
    }
    destroy() {
      hb2._hb_blob_destroy(this._ptr);
    }
    data() {
      return hb2._hb_blob_get_data(this._ptr, this.length());
    }
    length() {
      return hb2._hb_blob_get_length(this._ptr);
    }
    asArray() {
      return hb2.withStack(() => {
        const lengthPtr = hb2.stackAlloc(4);
        const dataPtr = hb2._hb_blob_get_data(this._ptr, lengthPtr);
        const length = hb2.readUint32(lengthPtr);
        return hb2.HEAPU8.subarray(dataPtr, dataPtr + length);
      });
    }
    copyAsArray() {
      return this.asArray().slice();
    }
  }
  class HbSet {
    _ptr;
    constructor(ptr) {
      if (ptr === 0) {
        throw new Error("Tried to create an HbSet from a null pointer");
      }
      this._ptr = ptr ?? hb2._hb_set_create();
    }
    ptr() {
      return this._ptr;
    }
    add(item) {
      hb2._hb_set_add(this._ptr, item);
    }
    addRange(start, end) {
      hb2._hb_set_add_range(this._ptr, start, end);
    }
    del(item) {
      hb2._hb_set_del(this._ptr, item);
    }
    delRange(start, end) {
      hb2._hb_set_del_range(this._ptr, start, end);
    }
    clear() {
      hb2._hb_set_clear(this._ptr);
    }
    invert() {
      hb2._hb_set_invert(this._ptr);
    }
    reference() {
      hb2._hb_set_reference(this._ptr);
    }
    destroy() {
      if (this._ptr === 0) {
        throw new Error("Set already destroyed");
      }
      hb2._hb_set_destroy(this._ptr);
      this._ptr = 0;
    }
    union(other) {
      hb2._hb_set_union(this._ptr, other._ptr);
    }
    intersect(other) {
      hb2._hb_set_intersect(this._ptr, other._ptr);
    }
    subtract(other) {
      hb2._hb_set_subtract(this._ptr, other._ptr);
    }
    size() {
      return hb2._hb_set_get_population(this._ptr);
    }
    copy() {
      const newPtr = hb2._hb_set_copy(this._ptr);
      if (newPtr === 0) {
        throw new Error("Failed to copy set");
      }
      return new HbSet(newPtr);
    }
    setTo(other) {
      hb2._hb_set_set(this._ptr, other._ptr);
    }
    [Symbol.iterator]() {
      const ptr = this._ptr;
      return (function* () {
        const iter = new HbSetRangeIterator(ptr);
        for (const range of iter) {
          if (typeof range === "number") {
            yield range;
          } else {
            for (let i = range[0], end = range[1]; i <= end; i++) {
              yield i;
            }
          }
        }
      })();
    }
    iterRanges() {
      return new HbSetRangeIterator(this._ptr);
    }
  }
  class HbSetRangeIterator {
    _ptr;
    _last;
    constructor(ptr) {
      this._ptr = ptr;
      this._last = -1 >>> 0;
    }
    next() {
      return hb2.withStack(() => {
        const firstPtr = hb2.stackAlloc(4);
        const lastPtr = hb2.stackAlloc(4);
        hb2.writeUint32(lastPtr, this._last);
        const didIterate = !!hb2._hb_set_next_range(this._ptr, firstPtr, lastPtr);
        const first = hb2.readUint32(firstPtr);
        const last = hb2.readUint32(lastPtr);
        if (didIterate) {
          this._last = last;
          return { done: false, value: first === last ? first : [first, last] };
        }
        return { done: true, value: void 0 };
      });
    }
    [Symbol.iterator]() {
      return this;
    }
  }
  const wrappedMain = hb2;
  wrappedMain.HbBlob = HbBlob;
  wrappedMain.HbSet = HbSet;
  return wrappedMain;
};
const hbTag = (s) => {
  return (s.charCodeAt(0) & 255) << 24 | (s.charCodeAt(1) & 255) << 16 | (s.charCodeAt(2) & 255) << 8 | (s.charCodeAt(3) & 255) << 0;
};
const tagName = (tag) => {
  return String.fromCharCode(tag >> 24 & 255, tag >> 16 & 255, tag >> 8 & 255, tag >> 0 & 255);
};
const SUBSET_RANGES = {
  "adlam": "xgTj4maGZIaqCEWEAArICEADOnWclChOJFgBX0AELmFwAA3V/Al3E3A=",
  "ahom": "xgTAQAACUsAAHiaQ1j7hYA==",
  "anatolian-hieroglyphs": "xgTAQAAH2sAAJH6wBIw=",
  "arabic": "xgTAQAAVggP+BPgvgO+HnJAlB6ABcLpweAA3yAAGaHwOUfAN5g2mBDHwN8gCIgD4obgAtjh6BCqDa4AA3v+w414oqUpUlTX/6WQQUqFhKSjBKDOA",
  "armenian": "xgTGgcwBNAAimCXBluABp/CgAWoAAGqjyA==",
  "avestan": "xgTHAcguAB9VwAcRYAA3M6DWpg==",
  "balinese": "xgQYfAwgAaYIEwGcAJFVAC3o",
  "bamum": "xgTAQAAApgCBXgADBB4AjgA=",
  "bassa-vah": "xgTAQAACUsAACigkO5g=",
  "batak": "xgTAQAAGyCDOe4AQKqAFvQ==",
  "bengali": "xgTAQAAhwANK4Rw1YnWFhCq8TrJOXlwzAAloJ+IEsrqAMSqAqgAomAAIMlA=",
  "bhaiksuki": "xgTAQAAH2uoAW9AAHsaRALh8TDg=",
  "brahmi": "xgTAQAAH2uoAW9AAHUaQJtwRxAA=",
  "braille": "xgTAQAACdggP8A==",
  "buginese": "xgTAQAAGWCG9QAvVUALegACEAw==",
  "buhid": "xgTAQAAFpXEwnABFtUALeg==",
  "canadian-aboriginal": "xgTAQACRAMsEbgqAAh8wBP8ARfAiwAZqgAD05I8=",
  "carian": "xgTAQAXAA/RsAG6gAA1G+DA=",
  "caucasian-albanian": "xgTAQAAmQFoLQAETcAANhUj4Ab/gzig=",
  "chakma": "xgTAQAAJRomAGT4mAD8CoAW9AAHWaQaBMA==",
  "cham": "xgTq6yROwMI0AD69XAC3YAAhDSDaIjcVkA==",
  "cherokee": "xgTAQAAmClLhbF4AEG6BVzQABLuMCeA=",
  "chinese-hongkong": "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",
  "chinese-simplified": "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",
  "chinese-traditional": "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",
  "chorasmian": "xgTAQAAAQ8QhsA==",
  "coptic": "xgTGVFYGQLgCSabnCQcD7CeBsjYAGdwASGBDawArkAGtIHOSaARYOYAAz++oAS4hsA==",
  "cuneiform": "xgTAQAAAR9ggDmYGWBuNFQGG",
  "cypriot": "xgTAQAAAQBgq4LKiIAa/l8Fjpg==",
  "cypro-minoan": "xgTAQAAAQBgwAF0dAxA=",
  "cyrillic-ext": "xgTAQAA8CC/D2B+gAXT4qAEKAAaWQ/AAPB/AvwACvGw=",
  "cyrillic": "xgTAQAAmEB/wL8F+HsADjIA=",
  "deseret": "xgTAQAAAQNggTw==",
  "devanagari": "xgTAQAAhwAMiQP8ACafBTAGIVBqBkCINwAm4AAIJkiYClh+AAcf+JA==",
  "dives-akuru": "xgTAQAAARhgm6nYfeMiIkA==",
  "dogra": "xgTAQAAInQTxcAC01UALegACCZImAAb8WDs=",
  "duployan": "xgTAQAXAEoeGMADnNUALegAhwAADG4kDVJGVETROIA==",
  "egyptian-hieroglyphs": "xgTAQAAAS9ggBFWJgA+a",
  "elbasan": "xgTAQAXAEnAIyEBEF6QACHuAAG+aQTg=",
  "elymaic": "xgTAQAAAQ9AhYA==",
  "ethiopic": "xgTAQAAm4AHeUCQXOi4KS4IS50XHg6LgQ8EFQzAAzywtETCBAgQIECIAB9IZc2aImEQAAnlhMVhA",
  "garay": "xgTAQAAVsHkAACDkMEtQ5PA=",
  "georgian": "xgTAQAXACaQALF4JVI4L4ALj4KtwBzIAMpoJVIAQQA==",
  "glagolitic": "xgTAQAXAEmIAv7AIEAC3IAHr4ALpoF+AeIAA8FgAATmRmCWdmA==",
  "gothic": "xgTAQAXAEm6BSAAP//ho",
  "grantha": "xgTAQAAIscI4AkQWDGNgAQ21h6qwBiNQHCAE3AAB2mlidYWEMwvW+Y02epIAMWuA",
  "greek-ext": "xgTAQAAHmCFc2CbNiEkCDBqEB+YKbFA=",
  "greek": "xgTAQAAtCfNcyCoF4A==",
  "gujarati": "xgTAQAAIscI4BG6FEC4hmxRCcfeMmmgAVCqgKoAKJgACCZIk",
  "gunjala-gondi": "xgT2oiJVwL4XBACAAENuABalqJ1iAD2ADugAB7ykrBMzzRI=",
  "gurmukhi": "xgTAQAAIscI4Cbo96hUQ2/LeqoRamhCABWTqAqgAomBgAAEECRI=",
  "gurung-khema": "xgTAQAAIxQAAq83ByA==",
  "hanifi-rohingya": "xgTAQAsIABVEeQEIIAOgAGTeoAW9AAHOaQTzxIA=",
  "hanunoo": "xgTAQAAFoCFoAI06gBb0",
  "hatran": "xgTAQAAH2wAAdGpCTkkA",
  "hebrew": "xgTGgcwBM+AKIg2nhq5YAGhWWAmAApEAANVRhkybFg==",
  "imperial-aramaic": "xgTAQAAAQeghUUA=",
  "indic-siyaq-numbers": "xgTAQAAWHBzEwELEwAA8rtAhgA==",
  "inscriptional-pahlavi": "xgTAQAAAQrAhKSc=",
  "inscriptional-parthian": "xgTAQAAAQqghXEA=",
  "japanese": "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",
  "javanese": "xgTAQAAH2uoAW9AAEHaQJoy4",
  "kaithi": "xgTGgcwARjRMAC01XAC3YAIZQADz/xMAA0IsCFEg",
  "kana-extended": "xgTAQAAC/5uAAF/UrEMAkgA=",
  "kannada": "xgTAQAAIscI4AxqMIGBZsSQs2bkxRIAP21mDCAGL1AVQAUTAAEEySg==",
  "kawi": "xgTAQAAAR5ghAFVQ4A==",
  "kayah-li": "xgTGgcwAPtdcALdgACDNILw=",
  "kharoshthi": "xgTGgcwAPtdcALdgADkNLck5A9u4maIA",
  "khitan-small-script": "xgTAQAAAW9EAA2OQDqwUAA==",
  "khmer": "xgTg/D8EAtDgALYsC7ipYmAeWH4AYKqAFvQ=",
  "khojki": "xgTAQAAKRomABUaqAFvQABBMkTAANOLCIMA=",
  "khudawadi": "xgTAQAAIxMAC1NlwAtuAAIJkiYABqdYOpIk=",
  "kirat-rai": "xgTAQAAAWygg5A==",
  "korean": "xgTAQAADCRgXYHCHIEKG4AB5g4ACujA=",
  "lao": "xgTAQAAN4flDKDGVCBeSABEqqAFvQA==",
  "latin-ext": "xgTAQAGCDAEOAWcWcXJBI6wyYADOvAX8H8BPwKMbAI+AgIsKwKIALTYfgAHqfgK3SEwpGg==",
  "latin": "xgTgXoIIF+DAEOAWfEhRAk6rDJgAObJ0I3RKIMy4kDQB2A3oD+wABudQD+A=",
  "lepcha": "xgTAQAAG2CDeo6qgDuqgBb0=",
  "limbu": "xgTAQAAIxMAHzUPDbi7JFwA11UALeg==",
  "linear-a": "xgTAQAAAQBngsgBMuATaIhWJnA==",
  "linear-b": "xgTAQAAA/2CLDYUYQx0EMD1JVwWVEA==",
  "lisu": "xgTGgcwBDgRAA6hgA/6wADpiQXwAD1Xg",
  "lycian": "xgTAQAAH7oAAcRNDgA==",
  "lydian": "xgTAQAXAAWvQAA2u+GZA",
  "mahajani": "xgTAQAXABFbFwALTVQAt6AAIJkiYABpFYJg=",
  "makasar": "xgTAQAAAR5AhgA==",
  "malayalam": "xgTAQAAmcOABi7COAOajCA0Ie4/DUAHrIYAGM1AVQAUTAAEEyUA=",
  "mandaic": "xgTAQAAWgAEAQ3wAL1lQAt6A",
  "manichaean": "xgTAQAAWgAAzl1AC3oAA2DQAGYEE1xY=",
  "marchen": "xgTAQAACUsAAHtSQ/hYe",
  "masaram-gondi": "xgTrxMTLAvg3BAACG3AAtS1E6xAB7AB3QAA9zSZgtpcTPEg=",
  "math": "xgTgXoIDlKCYEAAgv6mTKMyPq0MOBEhARNDExMM6wAOEGGpqIyCTiAjqGh0GUZZIqPhJjAXQfw8DeK4BDJ7sS5YTgRFC5ochcZLASOATkhDEEoF4HKoBT4P4D/gH/jbh2HICwACGQAAzytAADUo4FQCQ+tWNQgCEXECA6UyqYAquASTBlAAr/2HGvFFSlKkqa//SyCClQsJSUYJQZw==",
  "mayan-numerals": "xgTAQAAAdJAhMA==",
  "medefaidrin": "xgTAQAAAW2ggWg==",
  "meetei-mayek": "xgTAQAAH2uoAW9AAEKKQtAZEFuKA",
  "mende-kikakui": "xgTAQAACUsAADhGkBiYQ",
  "meroitic-cursive": "xgTAQAAAQkAhe4TwXA==",
  "meroitic-hieroglyphs": "xgTAQAAH70AAdJHD4A==",
  "meroitic": "xgTDQGYAD8MDcAAdJHBvcJ4LgA==",
  "miao": "xgTAQAACUsAACkmkCVcHE0IA",
  "modi": "xgTAQAAH2uoAW9AAEEyRMAA24sCJFRI=",
  "mongolian": "xgTqTYSAwgAXYIZlgWJoKoAdfqTPhEM4AQWhOAVcAFGuWeAAM4s1cADA1GA=",
  "mro": "xgTAQAAAWmgh4Xc=",
  "multani": "xgTAQAAIxMAgETAACEB8yKEBgA==",
  "music": "xgTAQAACUsATs0AANTHwHrEwTYDChSBF",
  "myanmar": "xgTAQAAPYICfgA9qqAFvQABBsQCyh6Bgh+AAbE+EwA==",
  "nabataean": "xgTAQAAAQfgh6eIA",
  "nag-mundari": "xgTAQAAAeQwgpA==",
  "nandinagari": "xgTAQAAIxMAcBEwAf8CRAAAizaWAAcWmfBdiwA==",
  "new-tai-lue": "xgTAQAAGOCCu4ZliqwAxXUALeg==",
  "newa": "xgTAQAXAA6iACEKgBb0AAdxpAtmA",
  "nko": "xgTAQAAVsHkAlgFWg63AAwF3AC3YAIUMAAZ5BA==",
  "nushu": "xgTGULmhmWGYJAAPsWAD/xAAd/gABYCQABxzwACDHwDFgA==",
  "nyiakeng-puachue-hmong": "xgTAQAAAeBggsqNxVw==",
  "ogham": "xgTAQAAFeCHA",
  "ol-chiki": "xgTAQAAG7CC+AEOA",
  "ol-onal": "xgTAQAAIxMAAO41QVWA=",
  "old-hungarian": "xgTAQAAH20Ca8AG6QQAAG8fwZRkGU0o=",
  "old-italic": "xgTAQAAAQJggjiKA",
  "old-north-arabian": "xgTAQAAAQngh8A==",
  "old-permic": "xgTAQAXAEkmqJALgABxYACeIAA3YSCo=",
  "old-persian": "xgTAQAAAQMAgjuNA",
  "old-sogdian": "xgTAQAAAQ5ggnA==",
  "old-south-arabian": "xgTAQAAAQnAh8A==",
  "old-turkic": "xgTAQAAH7oAG6wAA3dCBIA==",
  "old-uyghur": "xgTAQAAWgAACCWQAR+hk",
  "oriya": "xgTAQAAIscI4Bm6E6wsIZsTrc1Xy4SgARYQwAMZqAqgAomA=",
  "osage": "xgTAQAAmFnAmgAInQAAb3JBHcEY=",
  "osmanya": "xgTAQAAAQPgh3FA=",
  "ottoman-siyaq-numbers": "xgTAQAAAexhg8A==",
  "pahawh-hmong": "xgTAQAAH2uoAW9AACimkCLExIgLSQkA=",
  "palmyrene": "xgTAQAAAQfAh8A==",
  "pau-cin-hau": "xgTAQAAARogg4A==",
  "phags-pa": "xgTAQAAF2GlABAJJCmIACzoAKNLQWgAHgjg3gAFWHA==",
  "phoenician": "xgTAQAAAQhghug==",
  "psalter-pahlavi": "xgTAQAAWgAAzl1AC3oAA5bSEZri5gA==",
  "rejang": "xgTAQAAH2uoAW9AAEGyQRxQ=",
  "runic": "xgTAQAAFgCBY",
  "samaritan": "xgTAQAAdggtx8ABL4g==",
  "saurashtra": "xgTAQAAH2uoAW9AAEFaQIs8W",
  "sharada": "xgTAQAAIsQAJwyegBldQAt6AAIJkl4ABpR4F8A==",
  "shavian": "xgTAQAXAACBzMF4=",
  "siddham": "xgTAQAAH2uoAW9AAHfaQa4Jg",
  "signwriting": "xgTAQAAAddggCi46QIA=",
  "sinhala": "xgTAQAAIxMAIN0E6hcUs9FlQmWJ3AB34AMZqAFvQAB2CsJg=",
  "sogdian": "xgTAQAAWgAAzl1AC3oAA6WSCkA==",
  "sora-sompeng": "xgTGgcwAPuAAA8MCGJok",
  "soyombo": "xgTAQAACUsAAHpCQKQA=",
  "sundanese": "xgTGgcwANcEH8B/zwBoVcALdgA==",
  "sunuwar": "xgTAQAAmDxLDpAAAjEfBDGxI",
  "syloti-nagri": "xgTAQAAIxMBARMACw1WoEIAK7gACCNILAA==",
  "symbols2": "xgTAQAAH2DUigDrJYBQYCfA=",
  "symbols": "gh5jRM0MywzcEMAD8AAu7JA1QZiLiYUBvFcEmB/BXUHEeJPhSBEhk0Jj4dliNg6hWKhSAn4CfgFkKHgTGwf1C4+BAgP+CDAvA+BYARWNuHYcgmwQAaFAAQ38H8AAWPxUAocCcOoGEFsBww3ABbHD0AAYiBCcXCcXArREMQAOQ0FdwMcXHY8IAmiYCtg3hmAQypDpRkQBCKUIxk27hFVUkkZFkokeNFHDK+TdhcJgmGsyIJuJIUl1cQqdkkV4Koy4CrhQCBBfMYjIFSn8TE1JPFSXUtQO1wL0sXYQi7g3niZYJ54dxl4PouC4WD4JAUwvApxcbjaiZIN5o7FyxE0BJAZw",
  "syriac": "xgTzWSJYeqBBFlFgCSNeFXU3UAWyP0g+LiomMoBIRoPdwCHxUACsYgBCMkKh4A5wA7oBSQ==",
  "tagalog": "xgTAQAAFmCFYgLYAI1KgBb0=",
  "tagbanwa": "xgTAQAAFpXBTGEcAES1QAt6A",
  "tai-le": "xgTAQAAmDLsAGmkTABILDuWAGlagBb0AFGuWwA==",
  "tai-tham": "xgTAQAAGYCD4PYuWJljYAVcqAIKAHZg=",
  "tai-viet": "xgTAQAAH2uoAW9AAEDf4AvOBCheQ",
  "takri": "xgTAQAAIxMAC1LUALegACCZImAAbkWDmWJA=",
  "tamil-supplement": "xgTAQAAAR8ggxjA=",
  "tamil": "xgTAQAAIxMAQ5zVRa+q3VRdyVReYfCkACgfUBVABRMA=",
  "tangsa": "xgTAQAAAWnQgThY=",
  "tangut": "xgTAQAAC9Qj4B7gAAnviCCABf3ngC/4B/4g=",
  "telugu": "xgTAQAAIscI4ApqMIGAjiSFm76vFTREACCyGABjNQAt6",
  "thaana": "xgTzaQzAyABWwfoCDGQCJQYwAMLEk+sALXAADYJhYA==",
  "thai": "xgTAQAAhwNgsBcACtCDm4cgARrqgBb0=",
  "tibetan": "xgTAQAAOYIEcEtwTAlCA6ABAvqAFvQAUeWA=",
  "tifinagh": "xgTAQAAicHX0oYHAAc2qh8ALPAB2SDebHA==",
  "tirhuta": "xgTAQAAIscI4COuABL5AGM1AC3oAAgmSJgAGxFgR54k=",
  "todhri": "xgTAQAAmFsUgJYAAQJigzA==",
  "toto": "xgTAQAAhwAAO/qQ8",
  "tulu-tigalari": "xgTAQAAMRomABABQAAizyWAugADVHxK8EwteQW54",
  "ugaritic": "xgTAQAAAQLgh1A==",
  "vai": "xgTAQAAApGCASsA=",
  "vietnamese": "xgTAQAGLGYWwfYNsbgFP6rDJgANu8CzANgA=",
  "vithkuqi": "xgTAQAAAQTQiggIYwICG",
  "wancho": "xgTRayQVVDiBGAB98wAtcAAG89IOZA==",
  "warang-citi": "xgTOB5AA+11AC3oAA8tSBSiw",
  "yezidi": "xgTAQAAVsHkAgxMDSAAEHrIKSaA=",
  "yi": "xgTAQAAicI+A5AAOJmsOgHqAEjwnAKuACjS1hSA3gADeCwAkZUG0AAsnABAculithxB68oA=",
  "zanabazar-square": "xgTAQAAH2uoAW9AAHoaQI4A=",
  "znamenny": "xgTAQAAAc5ggtwvEQOY="
};
const SUBSET_SLICES = {};
const subsetInfo = (subsetName) => {
  return {
    ranges(onRange) {
      return decompress(SUBSET_RANGES[subsetName], onRange);
    },
    slices() {
      const subsetSlices = SUBSET_SLICES[subsetName];
      if (!subsetSlices)
        return null;
      return subsetSlices.map((subsetSlice) => ((onRange) => decompress(subsetSlice, onRange)));
    }
  };
};
const SUBSET_NAMES = ["adlam", "ahom", "anatolian-hieroglyphs", "arabic", "armenian", "avestan", "balinese", "bamum", "bassa-vah", "batak", "bengali", "bhaiksuki", "brahmi", "braille", "buginese", "buhid", "canadian-aboriginal", "carian", "caucasian-albanian", "chakma", "cham", "cherokee", "chinese-hongkong", "chinese-simplified", "chinese-traditional", "chorasmian", "coptic", "cuneiform", "cypriot", "cypro-minoan", "cyrillic-ext", "cyrillic", "deseret", "devanagari", "dives-akuru", "dogra", "duployan", "egyptian-hieroglyphs", "elbasan", "elymaic", "ethiopic", "garay", "georgian", "glagolitic", "gothic", "grantha", "greek-ext", "greek", "gujarati", "gunjala-gondi", "gurmukhi", "gurung-khema", "hanifi-rohingya", "hanunoo", "hatran", "hebrew", "imperial-aramaic", "indic-siyaq-numbers", "inscriptional-pahlavi", "inscriptional-parthian", "japanese", "javanese", "kaithi", "kana-extended", "kannada", "kawi", "kayah-li", "kharoshthi", "khitan-small-script", "khmer", "khojki", "khudawadi", "kirat-rai", "korean", "lao", "latin-ext", "latin", "lepcha", "limbu", "linear-a", "linear-b", "lisu", "lycian", "lydian", "mahajani", "makasar", "malayalam", "mandaic", "manichaean", "marchen", "masaram-gondi", "math", "mayan-numerals", "medefaidrin", "meetei-mayek", "mende-kikakui", "meroitic-cursive", "meroitic-hieroglyphs", "meroitic", "miao", "modi", "mongolian", "mro", "multani", "music", "myanmar", "nabataean", "nag-mundari", "nandinagari", "new-tai-lue", "newa", "nko", "nushu", "nyiakeng-puachue-hmong", "ogham", "ol-chiki", "ol-onal", "old-hungarian", "old-italic", "old-north-arabian", "old-permic", "old-persian", "old-sogdian", "old-south-arabian", "old-turkic", "old-uyghur", "oriya", "osage", "osmanya", "ottoman-siyaq-numbers", "pahawh-hmong", "palmyrene", "pau-cin-hau", "phags-pa", "phoenician", "psalter-pahlavi", "rejang", "runic", "samaritan", "saurashtra", "sharada", "shavian", "siddham", "signwriting", "sinhala", "sogdian", "sora-sompeng", "soyombo", "sundanese", "sunuwar", "syloti-nagri", "symbols2", "symbols", "syriac", "tagalog", "tagbanwa", "tai-le", "tai-tham", "tai-viet", "takri", "tamil-supplement", "tamil", "tangsa", "tangut", "telugu", "thaana", "thai", "tibetan", "tifinagh", "tirhuta", "todhri", "toto", "tulu-tigalari", "ugaritic", "vai", "vietnamese", "vithkuqi", "wancho", "warang-citi", "yezidi", "yi", "zanabazar-square", "znamenny"];
var AxisValueFormat;
(function(AxisValueFormat2) {
  AxisValueFormat2[AxisValueFormat2["SingleValue"] = 1] = "SingleValue";
  AxisValueFormat2[AxisValueFormat2["Range"] = 2] = "Range";
  AxisValueFormat2[AxisValueFormat2["LinkedValue"] = 3] = "LinkedValue";
  AxisValueFormat2[AxisValueFormat2["MultipleValues"] = 4] = "MultipleValues";
})(AxisValueFormat || (AxisValueFormat = {}));
var AxisValueFlags;
(function(AxisValueFlags2) {
  AxisValueFlags2[AxisValueFlags2["OlderSibling"] = 1] = "OlderSibling";
  AxisValueFlags2[AxisValueFlags2["Elidable"] = 2] = "Elidable";
})(AxisValueFlags || (AxisValueFlags = {}));
const bytesToHex = (bytes) => {
  const arr = bytes instanceof ArrayBuffer ? new Uint8Array(bytes) : bytes;
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    const byte = arr[i];
    if (byte < 16)
      result += "0";
    result += byte.toString(16);
  }
  return result;
};
let hb;
const init = async (wasmUrl) => {
  hb = await createHarfbuzzWrapped(wasmUrl);
  for (const name of SUBSET_NAMES) {
    const set = new hb.HbSet();
    subsetInfo(name).ranges((start, end) => {
      if (start === end) {
        set.add(start);
      } else {
        set.addRange(start, end);
      }
    });
    SUBSET_HB_SETS[name] = set;
  }
  const subsetInput = hb._hb_subset_input_create_or_fail();
  if (subsetInput === 0) {
    throw new Error("Failed to create subset input");
  }
  const defaultLayoutFeatures = new hb.HbSet(hb._hb_subset_input_set(
    subsetInput,
    6
    /* SubsetSets.LAYOUT_FEATURE_TAG */
  ));
  defaultLayoutFeatures.reference();
  for (const featureTag of defaultLayoutFeatures) {
    defaultLayoutFeatureTags.add(tagName(featureTag));
  }
  hb._hb_subset_input_destroy(subsetInput);
};
const decoder = new TextDecoder();
const SUBSET_HB_SETS = {};
const defaultLayoutFeatureTags = /* @__PURE__ */ new Set();
const hashBlob = (data, salt) => {
  return hb.withStack(() => {
    const output = hb.stackAlloc(32);
    hb._blake3_hash_data(data.ptr(), data.length(), output, salt);
    return bytesToHex(hb.HEAPU8.subarray(output, output + 32));
  });
};
class Font {
  hbFace;
  hbFont;
  preprocessedFace = 0;
  _hash = null;
  faceCount;
  faceIndex;
  uid;
  familyName;
  subfamilyName;
  styleValues;
  styleAttributes;
  fileSize;
  /** Variable font axes. Does not include variable axes listed in {@link styleValues}. */
  axes;
  features;
  namedInstances;
  /**
   * Names of Unicode subsets for which this font has *any* coverage (it does not need to cover the entire subset).
   */
  subsetCoverage;
  /**
   * All the Unicode code points contained in the font.
   */
  codePoints;
  static manyFromData(data) {
    const bufs = [];
    for (const arr of data) {
      const blob = new hb.HbBlob(arr);
      const faceCount = hb._hb_face_count(blob.ptr());
      bufs.push({ blob, faceCount });
    }
    const fonts2 = [];
    try {
      for (const { blob, faceCount } of bufs) {
        for (let i = 0; i < faceCount; i++) {
          fonts2.push(new Font(blob, i, faceCount));
        }
      }
    } catch (err) {
      for (; ; ) {
        const font = fonts2.pop();
        if (!font)
          break;
        font.destroy();
      }
      throw err;
    } finally {
      for (const { blob } of bufs) {
        blob.destroy();
      }
    }
    return fonts2;
  }
  constructor(data, index, faceCount) {
    const face = hb._hb_face_create_or_fail(data.ptr(), index);
    if (face === 0) {
      throw new Error("Failed to create hb_face_t");
    }
    this.hbFace = face;
    this.hbFont = hb._hb_font_create(face);
    this.fileSize = data.length();
    this.faceIndex = index;
    this.faceCount = faceCount;
    let uid = this.getOpentypeName(
      3
      /* OtNameId.UNIQUE_ID */
    );
    if (!uid || uid === "") {
      uid = hashBlob(data, index);
    }
    this.uid = uid;
    this.familyName = this.getOpentypeName(
      21
      /* OtNameId.WWS_FAMILY */
    ) || this.getOpentypeName(
      16
      /* OtNameId.TYPOGRAPHIC_FAMILY */
    ) || this.getOpentypeName(
      1
      /* OtNameId.FONT_FAMILY */
    ) || "";
    this.subfamilyName = this.getOpentypeName(
      22
      /* OtNameId.WWS_SUBFAMILY */
    ) || this.getOpentypeName(
      17
      /* OtNameId.TYPOGRAPHIC_SUBFAMILY */
    ) || this.getOpentypeName(
      2
      /* OtNameId.FONT_SUBFAMILY */
    ) || "";
    const { styleValues, axisInfo, namedInstances } = this.getAxisAndStyleInfo();
    this.axes = axisInfo;
    this.styleValues = styleValues;
    this.namedInstances = namedInstances;
    this.styleAttributes = this.parseStatTable() ?? { designAxes: [], axisValues: [] };
    const featureInfo = [];
    const seenTags = /* @__PURE__ */ new Set();
    const featureSet = new hb.HbSet();
    for (const tableTag of [hbTag("GPOS"), hbTag("GSUB")]) {
      featureSet.clear();
      hb._hb_ot_layout_collect_features(face, tableTag, 0, 0, 0, featureSet.ptr());
      for (const featureIndex of featureSet) {
        hb.withStack(() => {
          const featureCountPtr = hb.stackAlloc(4);
          const featureTagsPtr = hb.stackAlloc(4);
          hb.writeUint32(featureCountPtr, 1);
          hb._hb_ot_layout_table_get_feature_tags(face, tableTag, featureIndex, featureCountPtr, featureTagsPtr);
          const featureTag = hb.readUint32(featureTagsPtr);
          if (seenTags.has(featureTag))
            return;
          seenTags.add(featureTag);
          const labelIdPtr = featureCountPtr;
          hb._hb_ot_layout_feature_get_name_ids(face, tableTag, featureIndex, labelIdPtr, 0, 0, 0, 0);
          const labelId = hb.readUint32(labelIdPtr);
          const featureLabel = this.getOpentypeName(labelId);
          const featureTagName = tagName(featureTag);
          featureInfo.push({
            tag: featureTagName,
            label: featureLabel,
            keepByDefault: defaultLayoutFeatureTags.has(featureTagName)
          });
        });
      }
    }
    this.features = featureInfo;
    const subsetCoverage = [];
    const coverageSet = featureSet;
    const faceCodepoints = new hb.HbSet();
    hb._hb_face_collect_unicodes(face, faceCodepoints.ptr());
    for (const subsetName of SUBSET_NAMES) {
      const subsetSet = SUBSET_HB_SETS[subsetName];
      coverageSet.setTo(faceCodepoints);
      for (const codepoint of [0, 13, 32, 160]) {
        coverageSet.del(codepoint);
      }
      coverageSet.intersect(subsetSet);
      let subsetCodepoints = coverageSet.size();
      if (subsetName === "khmer") {
        subsetCodepoints -= SUBSET_HB_SETS.latin.size();
      }
      const coverage = subsetCodepoints / subsetSet.size();
      const THRESHOLD = 0.5;
      const EXT_THRESHOLD = 0.05;
      subsetCoverage.push({
        name: subsetName,
        coverage,
        covered: coverage > (subsetName.endsWith("-ext") ? EXT_THRESHOLD : THRESHOLD)
      });
    }
    this.subsetCoverage = subsetCoverage;
    this.codePoints = faceCodepoints;
    coverageSet.destroy();
  }
  getAxisAndStyleInfo() {
    const face = this.hbFace;
    const styleValues = {};
    return hb.withStack(() => {
      const numAxisInfos = hb._hb_ot_var_get_axis_count(face);
      const axisInfoSize = 32;
      const axisInfo = [];
      const axisTags = [];
      const axisInfosRaw = hb.malloc(numAxisInfos * axisInfoSize);
      try {
        const numToFetch = hb.stackAlloc(4);
        hb.writeUint32(numToFetch, numAxisInfos);
        hb._hb_ot_var_get_axis_infos(face, 0, numToFetch, axisInfosRaw);
        for (let i = axisInfosRaw; i < axisInfosRaw + axisInfoSize * numAxisInfos; i += axisInfoSize) {
          const tag = tagName(hb.readUint32(i + 4));
          const nameId = hb.readUint32(i + 8);
          const min = hb.readFloat32(i + 16);
          const defaultValue = hb.readFloat32(i + 20);
          const max = hb.readFloat32(i + 24);
          switch (tag) {
            case "wght": {
              styleValues.weight = { type: "variable", value: { min, defaultValue, max } };
              break;
            }
            case "wdth": {
              styleValues.width = { type: "variable", value: { min, defaultValue, max } };
              break;
            }
            case "ital": {
              styleValues.italic = { type: "variable", value: { min, defaultValue, max } };
              break;
            }
            case "slnt": {
              styleValues.slant = { type: "variable", value: { min, defaultValue, max } };
              break;
            }
            default: {
              const name = this.getOpentypeName(nameId);
              axisInfo.push({
                tag,
                name,
                min,
                defaultValue,
                max
              });
            }
          }
          axisTags.push(tag);
        }
        if (!Object.prototype.hasOwnProperty.call(styleValues, "weight")) {
          styleValues.weight = {
            type: "single",
            value: hb._hb_style_get_value(this.hbFont, hbTag("wght"))
          };
        }
        if (!Object.prototype.hasOwnProperty.call(styleValues, "width")) {
          styleValues.width = {
            type: "single",
            value: hb._hb_style_get_value(this.hbFont, hbTag("wdth"))
          };
        }
        if (!Object.prototype.hasOwnProperty.call(styleValues, "italic")) {
          styleValues.italic = {
            type: "single",
            value: hb._hb_style_get_value(this.hbFont, hbTag("ital"))
          };
        }
        if (!Object.prototype.hasOwnProperty.call(styleValues, "slant")) {
          styleValues.slant = {
            type: "single",
            value: hb._hb_style_get_value(this.hbFont, hbTag("slnt"))
          };
        }
      } finally {
        hb._free(axisInfosRaw);
      }
      const numNamedInstances = hb._hb_ot_var_get_named_instance_count(face);
      const namedInstances = [];
      const coordsPtr = hb.malloc(4 * numAxisInfos);
      try {
        for (let i = 0; i < numNamedInstances; i++) {
          const subfamilyNameId = hb._hb_ot_var_named_instance_get_subfamily_name_id(face, i);
          const postscriptNameId = hb._hb_ot_var_named_instance_get_postscript_name_id(face, i);
          const subfamilyName = this.getOpentypeName(subfamilyNameId);
          const postscriptName = this.getOpentypeName(postscriptNameId);
          hb.withStack(() => {
            const numCoordsPtr = hb.stackAlloc(4);
            hb.writeUint32(numCoordsPtr, numAxisInfos);
            hb._hb_ot_var_named_instance_get_design_coords(face, i, numCoordsPtr, coordsPtr);
            const numCoords = hb.readUint32(numCoordsPtr);
            const coords = {};
            for (let i2 = 0; i2 < numCoords; i2++) {
              const value = hb.readFloat32(coordsPtr + (i2 << 2));
              coords[axisTags[i2]] = value;
            }
            namedInstances.push({
              subfamilyName,
              postscriptName,
              coords
            });
          });
        }
      } finally {
        hb._free(coordsPtr);
      }
      return {
        styleValues,
        axisInfo,
        namedInstances
      };
    });
  }
  /**
   * Fetch a name string from an OpenType font by ID.
   * @param id The ID of the name to fetch. Can be `HB_OT_NAME_ID_INVALID`.
   * @returns The name string, or null if it doesn't exist or is `HB_OT_NAME_ID_INVALID`.
   */
  getOpentypeName(id) {
    if (id === 65535) {
      return null;
    }
    const face = this.hbFace;
    return hb.withStack(() => {
      const nameSizePtr = hb.stackAlloc(4);
      const dummyNamePtr = hb.stackAlloc(1);
      hb.writeUint32(nameSizePtr, 1);
      let nameSize = hb._hb_ot_name_get_utf8(face, id, 0, nameSizePtr, dummyNamePtr);
      if (nameSize === 0) {
        return null;
      }
      const namePtr = hb.malloc(nameSize + 1);
      try {
        hb.writeUint32(nameSizePtr, nameSize + 1);
        hb._hb_ot_name_get_utf8(face, id, 0, nameSizePtr, namePtr);
        nameSize = hb.readUint32(nameSizePtr);
        const fontFamilyName = decoder.decode(hb.HEAPU8.subarray(namePtr, namePtr + nameSize));
        return fontFamilyName;
      } finally {
        hb._free(namePtr);
      }
    });
  }
  parseStatTable() {
    const ptr = hb._hb_face_reference_table(this.hbFace, hbTag("STAT"));
    if (!ptr)
      return null;
    const statBlob = new hb.HbBlob(ptr);
    try {
      const stat = statBlob.data();
      let offset = stat;
      const readU16 = () => {
        const result = hb.memoryView.getUint16(offset);
        offset += 2;
        return result;
      };
      const readU32 = () => {
        const result = hb.memoryView.getUint32(offset);
        offset += 4;
        return result;
      };
      const readFixed = () => {
        const result = hb.memoryView.getInt32(offset) / 65536;
        offset += 4;
        return result;
      };
      const seek = (to) => {
        offset = stat + to;
      };
      const __majorVersion = readU16();
      const __minorVersion = readU16();
      const designAxisSize = readU16();
      const designAxisCount = readU16();
      const designAxesOffset = readU32();
      const axisValueCount = readU16();
      const offsetToAxisValueOffsets = readU32();
      const designAxes = [];
      for (let i = 0; i < designAxisCount; i++) {
        seek(designAxesOffset + i * designAxisSize);
        const tag = tagName(readU32());
        const axisNameID = readU16();
        const ordering = readU16();
        const name = this.getOpentypeName(axisNameID);
        designAxes.push({ tag, name, ordering });
      }
      const axisValues = [];
      for (let i = 0; i < axisValueCount; i++) {
        seek(offsetToAxisValueOffsets + i * 2);
        const axisValueOffset = readU16();
        seek(offsetToAxisValueOffsets + axisValueOffset);
        const format = readU16();
        const axisIndexOrCount = readU16();
        const flags = readU16();
        const nameID = readU16();
        const name = this.getOpentypeName(nameID);
        const axisValue = { flags, name };
        switch (format) {
          case 1: {
            const value = readFixed();
            axisValues.push(Object.assign(axisValue, {
              format,
              axisIndex: axisIndexOrCount,
              value
            }));
            break;
          }
          case 2: {
            const nominalValue = readFixed();
            let min = readFixed();
            let max = readFixed();
            if (min === -32768)
              min = -Infinity;
            if (max === 32767.99998474121)
              max = Infinity;
            axisValues.push(Object.assign(axisValue, {
              format,
              axisIndex: axisIndexOrCount,
              nominalValue,
              min,
              max
            }));
            break;
          }
          case 3: {
            const value = readFixed();
            const linkedValue = readFixed();
            axisValues.push(Object.assign(axisValue, {
              format,
              axisIndex: axisIndexOrCount,
              value,
              linkedValue
            }));
            break;
          }
          case 4: {
            const values = [];
            for (let j = 0; j < axisIndexOrCount; j++) {
              values.push({ axisIndex: readU16(), value: readFixed() });
            }
            axisValues.push(Object.assign(axisValue, {
              format,
              axisCount: axisIndexOrCount,
              axisValues: values
            }));
            break;
          }
        }
      }
      return { designAxes, axisValues };
    } finally {
      statBlob.destroy();
    }
  }
  destroy() {
    if (this.preprocessedFace !== 0)
      hb._hb_face_destroy(this.preprocessedFace);
    hb._hb_font_destroy(this.hbFont);
    hb._hb_face_destroy(this.hbFace);
    this.codePoints.destroy();
  }
  subset(settings) {
    const subsetInput = hb._hb_subset_input_create_or_fail();
    if (subsetInput === 0) {
      throw new Error("Failed to create subset input");
    }
    let inputFace;
    if (settings.preprocess) {
      if (this.preprocessedFace === 0) {
        this.preprocessedFace = hb._hb_subset_preprocess(this.hbFace);
      }
      inputFace = this.preprocessedFace;
    } else {
      inputFace = this.hbFace;
    }
    try {
      const unicodeSet = new hb.HbSet(hb._hb_subset_input_unicode_set(subsetInput));
      unicodeSet.clear();
      if (settings.unicodeRanges === "all") {
        unicodeSet.invert();
      } else {
        for (const namedSubset of settings.unicodeRanges.named) {
          unicodeSet.union(SUBSET_HB_SETS[namedSubset]);
        }
        for (const rangeOrSingle of settings.unicodeRanges.custom) {
          if (typeof rangeOrSingle === "number") {
            unicodeSet.add(rangeOrSingle);
          } else {
            unicodeSet.addRange(rangeOrSingle[0], rangeOrSingle[1]);
          }
        }
      }
      if (settings.features) {
        const featuresSet = new hb.HbSet(hb._hb_subset_input_set(
          subsetInput,
          6
          /* SubsetSets.LAYOUT_FEATURE_TAG */
        ));
        for (const [featureTag, enable] of Object.entries(settings.features)) {
          if (enable) {
            featuresSet.add(hbTag(featureTag));
          } else {
            featuresSet.del(hbTag(featureTag));
          }
        }
      }
      if (settings.dropTables) {
        const dropTablesSet = new hb.HbSet(hb._hb_subset_input_set(
          subsetInput,
          3
          /* SubsetSets.DROP_TABLE_TAG */
        ));
        for (const tableTag of settings.dropTables) {
          dropTablesSet.add(hbTag(tableTag));
        }
      }
      for (const axisSetting of settings.axisValues) {
        switch (axisSetting.type) {
          case "single": {
            hb._hb_subset_input_pin_axis_location(subsetInput, inputFace, hbTag(axisSetting.tag), axisSetting.value);
            break;
          }
          case "variable": {
            hb._hb_subset_input_set_axis_range(subsetInput, inputFace, hbTag(axisSetting.tag), axisSetting.value.min, axisSetting.value.max, axisSetting.value.defaultValue ?? NaN);
          }
        }
      }
      const subsetFace = hb._hb_subset_or_fail(inputFace, subsetInput);
      if (subsetFace === 0) {
        throw new Error(`Failed to subset ${this.familyName} ${this.subfamilyName}`);
      }
      const faceBlob = hb._hb_face_reference_blob(subsetFace);
      hb._hb_face_destroy(subsetFace);
      const faceBlobObject = new hb.HbBlob(faceBlob);
      const data = faceBlobObject.copyAsArray();
      faceBlobObject.destroy();
      const styleValues = {
        weight: settings.axisValues.find((v) => v.tag === "wght") ?? this.styleValues.weight,
        width: settings.axisValues.find((v) => v.tag === "wdth") ?? this.styleValues.width,
        italic: settings.axisValues.find((v) => v.tag === "ital") ?? this.styleValues.italic,
        slant: settings.axisValues.find((v) => v.tag === "slnt") ?? this.styleValues.slant
      };
      for (const styleKey of ["weight", "width", "italic", "slant"]) {
        const styleValue = styleValues[styleKey];
        if (styleValue.type === "variable" && !styleValue.value.defaultValue) {
          styleValues[styleKey] = {
            type: "variable",
            value: {
              min: styleValue.value.min,
              max: styleValue.value.max,
              defaultValue: this.styleValues[styleKey].value.defaultValue
            }
          };
        }
      }
      const axes = [];
      for (const axis of this.axes) {
        const axisSetting = settings.axisValues.find((v) => v.tag === axis.tag);
        if (!axisSetting)
          continue;
        if (axisSetting.type === "variable") {
          axes.push({
            tag: axis.tag,
            name: axis.name,
            type: "variable",
            value: {
              min: axisSetting.value.min,
              max: axisSetting.value.max,
              defaultValue: axisSetting.value.defaultValue ?? axis.defaultValue
            }
          });
        } else {
          axes.push({
            tag: axis.tag,
            name: axis.name,
            type: "single",
            value: axisSetting.value
          });
        }
      }
      let subsetNamedInstance = null;
      if (this.namedInstances) {
        const variationCoords = {};
        for (const axisSetting of settings.axisValues) {
          if (axisSetting.type === "single") {
            variationCoords[axisSetting.tag] = axisSetting.value;
          }
        }
        outer: for (const namedInstance of this.namedInstances) {
          for (const [tag2, value] of Object.entries(namedInstance.coords)) {
            if (variationCoords[tag2] !== value) {
              continue outer;
            }
          }
          subsetNamedInstance = namedInstance;
          break;
        }
      }
      const styleAttributes = {
        designAxes: [],
        axisValues: []
      };
      for (const axis of this.styleAttributes.designAxes) {
        styleAttributes.designAxes.push(Object.assign({}, axis));
      }
      const axisSettingsByTag = /* @__PURE__ */ new Map();
      for (const axisSetting of settings.axisValues) {
        axisSettingsByTag.set(axisSetting.tag, axisSetting);
      }
      const axisValueOutsideRange = (tag2, value) => {
        const axisSetting = axisSettingsByTag.get(tag2);
        if (!axisSetting)
          return false;
        if (axisSetting.type === "single")
          return value !== axisSetting.value;
        return value < axisSetting.value.min || value > axisSetting.value.max;
      };
      for (const axisValue of this.styleAttributes.axisValues) {
        switch (axisValue.format) {
          case AxisValueFormat.SingleValue: {
            const tag2 = styleAttributes.designAxes[axisValue.axisIndex].tag;
            if (!axisValueOutsideRange(tag2, axisValue.value))
              styleAttributes.axisValues.push(axisValue);
            break;
          }
          case AxisValueFormat.Range: {
            const tag2 = styleAttributes.designAxes[axisValue.axisIndex].tag;
            if (!axisValueOutsideRange(tag2, axisValue.nominalValue)) {
              styleAttributes.axisValues.push(axisValue);
            }
            break;
          }
          case AxisValueFormat.LinkedValue: {
            const tag2 = styleAttributes.designAxes[axisValue.axisIndex].tag;
            if (!axisValueOutsideRange(tag2, axisValue.value))
              styleAttributes.axisValues.push(axisValue);
            break;
          }
          case AxisValueFormat.MultipleValues: {
            for (const subValue of axisValue.axisValues) {
              const tag2 = styleAttributes.designAxes[subValue.axisIndex].tag;
              if (!axisValueOutsideRange(tag2, subValue.value)) {
                styleAttributes.axisValues.push(axisValue);
                break;
              }
            }
            break;
          }
        }
      }
      const subsetCodepoints = new hb.HbSet();
      subsetCodepoints.setTo(this.codePoints);
      subsetCodepoints.intersect(unicodeSet);
      const unicodeRanges = Array.from(subsetCodepoints.iterRanges());
      subsetCodepoints.destroy();
      const tag = data[3] | data[2] << 8 | data[1] << 16 | data[0] << 24;
      return {
        familyName: this.familyName,
        subfamilyName: this.subfamilyName,
        format: tag === hbTag("OTTO") ? "opentype" : "truetype",
        data,
        styleValues,
        styleAttributes,
        axes,
        namedInstance: subsetNamedInstance,
        unicodeRanges
      };
    } finally {
      hb._hb_subset_input_destroy(subsetInput);
    }
  }
  /**
   * Get the TTF data for this font. This is a copy of the data, not a reference to the original. If this is part of a
   * TTC, this will create a new TTF file containing only this face from it. This returns a new Uint8Array every time,
   * so the result can be transferred.
   */
  getData() {
    if (this.faceCount > 1) {
      const builderFace = hb._hb_face_builder_create();
      const referencedTables = [];
      try {
        hb.withStack(() => {
          const tableCountPtr = hb.stackAlloc(4);
          const tableCount = hb._hb_face_get_table_tags(this.hbFace, 0, 0, 0);
          if (tableCount === 0)
            throw new Error("Could not get font table count");
          const tableTags = hb.malloc(tableCount * 4);
          hb.writeUint32(tableCountPtr, tableCount);
          hb._hb_face_get_table_tags(this.hbFace, 0, tableCountPtr, tableTags);
          const fetchedTableCount = hb.readUint32(tableCountPtr);
          for (let i = 0; i < fetchedTableCount; i++) {
            const tag = hb.readUint32(tableTags + i * 4);
            const tableBlob = hb._hb_face_reference_table(this.hbFace, tag);
            referencedTables.push(tableBlob);
            if (!hb._hb_face_builder_add_table(builderFace, tag, tableBlob)) {
              throw new Error(`Could not add table ${tagName(tag)}`);
            }
          }
        });
        const faceBlob = hb._hb_face_reference_blob(builderFace);
        const blob = new hb.HbBlob(faceBlob);
        try {
          const data = blob.copyAsArray();
          return data;
        } finally {
          blob.destroy();
        }
      } finally {
        for (const blob of referencedTables) {
          hb._hb_blob_destroy(blob);
        }
        hb._hb_face_destroy(builderFace);
      }
    } else {
      return this.getFileData();
    }
  }
  /**
   * Get the full file data for this font. This is a copy of the data, not a reference to the original. If this is
   * part of a TTC, this will return the *entire* contents of the TTC, unlike {@link getData}.
   */
  getFileData() {
    const faceBlob = hb._hb_face_reference_blob(this.hbFace);
    const blob = new hb.HbBlob(faceBlob);
    try {
      const data = blob.copyAsArray();
      return data;
    } finally {
      blob.destroy();
    }
  }
  /**
   * Get a hash for the full file data backing this font (e.g. for caching purposes). This is calculated once lazily.
   * If this font is part of a TTC, the hash will be for the *entire* file contents.
   */
  getFileHash() {
    if (this._hash !== null)
      return this._hash;
    const faceBlob = hb._hb_face_reference_blob(this.hbFace);
    const blob = new hb.HbBlob(faceBlob);
    try {
      this._hash = hashBlob(blob, 0);
      return this._hash;
    } finally {
      blob.destroy();
    }
  }
  static getSfntVersion(data) {
    const tag = data[3] | data[2] << 8 | data[1] << 16 | data[0] << 24;
    return tag === hbTag("OTTO") ? "opentype" : "truetype";
  }
}
const initPromise = init(new URL("/assets/hb-OMHrMeBZ.wasm", import.meta.url).href);
const listener = async (event) => {
  const message = event.data;
  try {
    switch (message.type) {
      case "update-fonts": {
        postMessageFromWorker({
          type: "updated-fonts",
          message: await updateFonts(message.message.loadFonts, message.message.unloadFonts),
          originId: message.id
        });
        break;
      }
      case "subset-font": {
        const { subsettedFont, transfer } = subsetFont(message.message.font, message.message.settings);
        postMessageFromWorker({
          type: "subsetted-font",
          message: subsettedFont,
          originId: message.id
        }, transfer);
        break;
      }
      case "get-font-data": {
        const font = getFont(message.message);
        const data = font.getData();
        const format = Font.getSfntVersion(data);
        postMessageFromWorker({
          type: "got-font-data",
          message: { data, format },
          originId: message.id
        }, [data]);
        break;
      }
      case "get-font-file-data": {
        const font = getFont(message.message);
        const data = font.getFileData();
        postMessageFromWorker({
          type: "got-font-file-data",
          message: data,
          originId: message.id
        }, [data]);
        break;
      }
      case "get-font-file-hash": {
        const font = getFont(message.message);
        const hash = font.getFileHash();
        postMessageFromWorker({
          type: "got-font-file-hash",
          message: hash,
          originId: message.id
        });
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
let fontRefId = 0;
const fonts = /* @__PURE__ */ new Map();
const getFont = (id) => {
  const font = fonts.get(id);
  if (!font) {
    throw new Error(`No font with ID ${id}`);
  }
  return font;
};
const updateFonts = async (loadFonts, unloadFonts) => {
  await initPromise;
  for (const oldFont of unloadFonts) {
    const font = fonts.get(oldFont);
    if (!font)
      continue;
    font.destroy();
    fonts.delete(oldFont);
  }
  const newFonts = Font.manyFromData(loadFonts);
  const newFontRefs = [];
  for (const newFont of newFonts) {
    const newFontRef = {
      id: fontRefId++,
      uid: newFont.uid,
      faceCount: newFont.faceCount,
      faceIndex: newFont.faceIndex,
      familyName: newFont.familyName,
      subfamilyName: newFont.subfamilyName,
      styleValues: newFont.styleValues,
      styleAttributes: newFont.styleAttributes,
      fileSize: newFont.fileSize,
      axes: newFont.axes,
      features: newFont.features,
      namedInstances: newFont.namedInstances,
      subsetCoverage: newFont.subsetCoverage,
      unicodeRanges: Array.from(newFont.codePoints.iterRanges())
    };
    newFontRefs.push(newFontRef);
    fonts.set(newFontRef.id, newFont);
  }
  return { fonts: newFontRefs };
};
const subsetFont = (fontId, settings) => {
  const font = fonts.get(fontId);
  if (!font) {
    throw new Error(`No font with ID ${font}`);
  }
  const subsettedFont = font.subset(settings);
  return { subsettedFont, transfer: [subsettedFont.data.buffer] };
};
