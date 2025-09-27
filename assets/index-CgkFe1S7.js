const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/GoogleFontsModalInner-__i_P9wQ.js","assets/search-ye_JGa7M.js","assets/search-CLlH7J7c.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload, d, T, A, y, K, E, w, n, x as x$1, u, q, a as _, g, b as useSignal, c as useComputed, k, e as d$1, r as r$1, f as E$1 } from "./search-ye_JGa7M.js";
const app = "_app_8jc7z_44";
const displayPane = "_display-pane_8jc7z_51";
const mainPane = "_main-pane_8jc7z_62";
const style$7 = {
  app,
  displayPane,
  mainPane
};
const loading$1 = "_loading_1n5sx_180";
const noFonts = "_no-fonts_1n5sx_282";
const uploadHeader = "_upload-header_1n5sx_294";
const uploadSub = "_upload-sub_1n5sx_299";
const uploadIcon = "_upload-icon_1n5sx_304";
const families = "_families_1n5sx_316";
const familySettings = "_family-settings_1n5sx_322";
const familyHeader = "_family-header_1n5sx_332";
const familyName = "_family-name_1n5sx_340";
const copyPasteButtons = "_copy-paste-buttons_1n5sx_345";
const removeFont = "_remove-font_1n5sx_349";
const removeFontFamily = "_remove-font-family_1n5sx_349";
const numFonts = "_num-fonts_1n5sx_353";
const singleFontSettings = "_single-font-settings_1n5sx_359";
const singleFontHeader = "_single-font-header_1n5sx_370";
const singleFontFileInfo = "_single-font-file-info_1n5sx_376";
const singleFontSubfamily = "_single-font-subfamily_1n5sx_381";
const familySettingsBody = "_family-settings-body_1n5sx_385";
const settingsSection = "_settings-section_1n5sx_390";
const settingsSectionBody = "_settings-section-body_1n5sx_419";
const settingsGrid = "_settings-grid_1n5sx_424";
const singleFontSettingsBody = "_single-font-settings-body_1n5sx_431";
const settingsSubSection = "_settings-sub-section_1n5sx_436";
const checkboxSection = "_checkbox-section_1n5sx_447";
const checkboxes = "_checkboxes_1n5sx_447";
const disabled$1 = "_disabled_1n5sx_450";
const styleSetting = "_style-setting_1n5sx_454";
const styleSettingName = "_style-setting-name_1n5sx_458";
const settingsList = "_settings-list_1n5sx_466";
const staticSetting = "_static-setting_1n5sx_475";
const axisSetting = "_axis-setting_1n5sx_479";
const axisSettingModes = "_axis-setting-modes_1n5sx_487";
const spinboxRange = "_spinbox-range_1n5sx_491";
const label = "_label_1n5sx_497";
const characterSetsHeader = "_character-sets-header_1n5sx_508";
const headerDivider = "_header-divider_1n5sx_514";
const characterSet = "_character-set_1n5sx_508";
const characterSetHeader = "_character-set-header_1n5sx_529";
const characterSetBody = "_character-set-body_1n5sx_536";
const characterSetName = "_character-set-name_1n5sx_540";
const unicodeRangeTextbox = "_unicode-range-textbox_1n5sx_544";
const axisRangeTextbox = "_axis-range-textbox_1n5sx_549";
const invalid = "_invalid_1n5sx_553";
const style$6 = {
  loading: loading$1,
  noFonts,
  uploadHeader,
  uploadSub,
  uploadIcon,
  families,
  familySettings,
  familyHeader,
  familyName,
  copyPasteButtons,
  removeFont,
  removeFontFamily,
  numFonts,
  singleFontSettings,
  singleFontHeader,
  singleFontFileInfo,
  singleFontSubfamily,
  familySettingsBody,
  settingsSection,
  settingsSectionBody,
  settingsGrid,
  singleFontSettingsBody,
  settingsSubSection,
  checkboxSection,
  checkboxes,
  disabled: disabled$1,
  styleSetting,
  styleSettingName,
  settingsList,
  staticSetting,
  axisSetting,
  axisSettingModes,
  spinboxRange,
  label,
  characterSetsHeader,
  headerDivider,
  characterSet,
  characterSetHeader,
  characterSetBody,
  characterSetName,
  unicodeRangeTextbox,
  axisRangeTextbox,
  invalid
};
function r(e) {
  var t, f, n2 = "";
  if ("string" == typeof e || "number" == typeof e) n2 += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n2 && (n2 += " "), n2 += f);
  } else for (f in e) e[f] && (n2 && (n2 += " "), n2 += f);
  return n2;
}
function clsx() {
  for (var e, t, f = 0, n2 = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n2 && (n2 += " "), n2 += t);
  return n2;
}
const Worker$1 = typeof Worker !== "undefined" ? Worker : void 0;
class RpcDispatcher {
  worker;
  map;
  sentMessageId = 0;
  /**
   * Number of messages we're waiting for the worker to respond to. If greater than 0, we will avoid terminating the
   * worker until this hits 0.
   *
   * Terminating a web worker *should* be straightforward--we just tell it to remove any event listeners on its side,
   * all event loops are done, and the process can exit. Unfortunately, there is either a bug in
   * https://github.com/valadaptive/web-worker or Node that causes the event loop to stay alive forever if too many
   * compression threads are created under certain timing conditions. So, we need to manually refcount the number of
   * messages we're waiting on.
   */
  inflightRequests = 0;
  /**
   * True if we're waiting to terminate the worker.
   */
  deferClose = false;
  constructor(worker, map) {
    this.worker = worker;
    this.map = map;
  }
  send(name, message, transfer) {
    const id = this.sentMessageId++;
    const worker = this.worker;
    const fullMessage = {
      type: name,
      message,
      id
    };
    worker.postMessage(fullMessage, transfer);
    this.inflightRequests++;
    return new Promise((resolve, reject) => {
      const ac = new AbortController();
      worker.addEventListener("message", (msg) => {
        const data = msg.data;
        if (data.originId !== id)
          return;
        this.inflightRequests--;
        if (this.inflightRequests === 0 && this.deferClose) {
          this.worker.terminate();
        }
        if (data.type === this.map[name]) {
          ac.abort();
          resolve(data.message);
        } else if (data.type === "error") {
          ac.abort();
          reject(data.message);
        }
      }, { signal: ac.signal });
    });
  }
  sendAndForget(name, message, transfer) {
    const id = this.sentMessageId++;
    const worker = this.worker;
    const fullMessage = {
      type: name,
      message,
      id
    };
    worker.postMessage(fullMessage, transfer);
  }
  close() {
    if (this.inflightRequests === 0) {
      this.worker.terminate();
    } else {
      this.deferClose = true;
    }
  }
}
class GlyphtContext {
  fontWorker;
  fontFinalizationRegistry;
  state = { destroyed: false };
  constructor() {
    this.fontWorker = new RpcDispatcher(new Worker$1(new URL(
      /* @vite-ignore */
      "/assets/font-worker.worker-CO4Dhj_1.js",
      import.meta.url
    ), { type: "module" }), {
      "update-fonts": "updated-fonts",
      "subset-font": "subsetted-font",
      "get-font-data": "got-font-data",
      "get-font-file-data": "got-font-file-data",
      "get-font-file-hash": "got-font-file-hash"
    });
    this.fontFinalizationRegistry = new FinalizationRegistry((fontId) => {
      this.fontWorker.sendAndForget("update-fonts", { loadFonts: [], unloadFonts: [fontId] });
    });
  }
  /**
   * Load a set of fonts. This will return a list of {@link FontRef}s that can be subset.
   *
   * There is no equivalent method for loading a single font, because a single font file could be a collection of
   * multiple fonts and hence have to return an array anyway.
   *
   * @param fontFiles Font files to load.
   * @param options Options object.
   * @returns A list of loaded fonts.
   */
  async loadFonts(fontFiles, options) {
    if (this.state.destroyed) {
      throw new DOMException("This GlyphtContext has been destroyed", "InvalidStateError");
    }
    return (await this.fontWorker.send("update-fonts", { loadFonts: fontFiles, unloadFonts: [] }, options?.transfer ? fontFiles.map((f) => f.buffer) : void 0)).fonts.map((fontMsg) => this.hydrateFont(fontMsg));
  }
  hydrateFont(fontMessage) {
    const registry = this.fontFinalizationRegistry;
    const fontWorker = this.fontWorker;
    const ctxState = this.state;
    const fontId = fontMessage.id;
    fontMessage.destroy = async () => {
      if (ctxState.destroyed)
        return;
      const res = fontWorker.send("update-fonts", { loadFonts: [], unloadFonts: [fontId] });
      registry.unregister(fontMessage);
      await res;
    };
    const checkCtxAlive = () => {
      if (ctxState.destroyed) {
        throw new DOMException("This font's GlyphtContext has been destroyed", "InvalidStateError");
      }
    };
    registry.register(fontMessage, fontId, fontMessage);
    fontMessage.subset = async (settings) => {
      checkCtxAlive();
      if (settings === null) {
        const { data: fontData, format } = await fontWorker.send("get-font-data", fontId);
        return {
          familyName: fontMessage.familyName,
          subfamilyName: fontMessage.subfamilyName,
          format,
          data: fontData,
          styleValues: fontMessage.styleValues,
          styleAttributes: fontMessage.styleAttributes,
          axes: fontMessage.axes.map((axis) => ({
            type: "variable",
            tag: axis.tag,
            name: axis.name,
            value: { min: axis.min, max: axis.max, defaultValue: axis.defaultValue }
          })),
          namedInstance: null,
          unicodeRanges: fontMessage.unicodeRanges
        };
      }
      return await fontWorker.send("subset-font", { font: fontId, settings });
    };
    fontMessage.getFontFileData = async () => {
      checkCtxAlive();
      return await fontWorker.send("get-font-file-data", fontId);
    };
    fontMessage.getFontFileHash = async () => {
      checkCtxAlive();
      return await fontWorker.send("get-font-file-hash", fontId);
    };
    return fontMessage;
  }
  /**
   * Destroy this context, meaning any previously-loaded {@link FontRef}s can no longer be subset. All promises
   * previously returned from {@link FontRef#subset} *will* resolve, but any further calls will error out.
   *
   * If running in Node, Bun, Deno, or another such runtime, this will allow the program to exit once all font
   * processing work is finished.
   */
  destroy() {
    this.fontWorker.close();
    this.state.destroyed = true;
  }
}
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
let parallelismResult = null;
const getParallelism = async () => {
  if (parallelismResult !== null) {
    return parallelismResult;
  }
  parallelismResult = 2;
  if (typeof navigator === "object" && typeof navigator.hardwareConcurrency === "number") {
    parallelismResult = navigator.hardwareConcurrency;
  } else {
    try {
      const os = await __vitePreload(() => import("./__vite-browser-external-2Ng8QIWW.js"), true ? [] : void 0);
      if (typeof os.availableParallelism === "function") {
        parallelismResult = os.availableParallelism();
      } else if (typeof os.cpus === "function") {
        parallelismResult = os.cpus().length;
      }
    } catch {
    }
  }
  return parallelismResult;
};
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
        filePath = (await __vitePreload(async () => {
          const { fileURLToPath } = await import("./__vite-browser-external-2Ng8QIWW.js");
          return { fileURLToPath };
        }, true ? [] : void 0)).fileURLToPath(pathUrl);
      }
    } catch {
    }
  }
  if (filePath) {
    let fsp;
    try {
      fsp = await __vitePreload(() => import("./__vite-browser-external-2Ng8QIWW.js"), true ? [] : void 0);
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
const filterArrayInPlace = (arr, predicate) => {
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
class WorkerPool {
  workers;
  allWorkers;
  queuedOperations = [];
  backpressureCallbacks = [];
  constructor(workers) {
    this.workers = workers;
    this.allWorkers = workers.slice(0);
  }
  doWork() {
    while (this.workers.length > 0 && this.queuedOperations.length > 0) {
      const nextOperation = this.queuedOperations.pop();
      const worker = this.workers.pop();
      filterArrayInPlace(this.backpressureCallbacks, ({ n: n2, cb }) => {
        if (this.queuedOperations.length <= n2) {
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
      nextOperation.fn(worker).then((value) => {
        onComplete();
        nextOperation.resolve(value);
      }, (error2) => {
        onComplete();
        nextOperation.reject(error2);
      });
    }
  }
  enqueue(operation) {
    let resolve, reject;
    const promise = new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    });
    this.queuedOperations.push({
      resolve,
      reject,
      fn: operation
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
  backpressure(n2) {
    if (this.queuedOperations.length <= n2)
      return Promise.resolve();
    return new Promise((resolve) => {
      this.backpressureCallbacks.push({ n: n2, cb: resolve });
    });
  }
}
class WoffCompressionContext {
  pool;
  destroyed = false;
  parallelism;
  /**
   * Create a new compression/decompression context.
   * @param parallelism The number of worker threads to create. If not given, this will default to the number of cores
   * on the system or `navigator.hardwareConcurrency`.
   */
  constructor(parallelism) {
    const resolvedParallelism = parallelism ?? getParallelism();
    this.parallelism = resolvedParallelism;
    this.pool = (async () => {
      const woffWasmUrls = [
        new URL("/assets/woff1-DBFllVu4.wasm", import.meta.url),
        new URL("/assets/woff2-koKwhiIF.wasm", import.meta.url)
      ];
      const [woff1, woff2] = await Promise.all(woffWasmUrls.map((url) => fetchFile(url)));
      const workers = [];
      for (let i = 0, parallelism2 = await resolvedParallelism; i < parallelism2; i++) {
        const worker = new Worker$1(new URL(
          /* @vite-ignore */
          "/assets/compression-worker.worker-JWlFULtE.js",
          import.meta.url
        ), { type: "module" });
        const dispatcher = new RpcDispatcher(worker, {
          "compress-font": "compressed-font",
          "decompress-font": "decompressed-font"
        });
        dispatcher.sendAndForget("init-woff-wasm", { woff1, woff2 });
        workers.push(dispatcher);
      }
      return new WorkerPool(workers);
    })();
  }
  /**
   * @returns The resolved number of worker threads, e.g. for ETA or progress estimation.
   */
  async getParallelism() {
    return await this.parallelism;
  }
  checkDestroyed() {
    if (this.destroyed) {
      throw new DOMException("This WoffCompressionContext has been destroyed", "InvalidStateError");
    }
  }
  /**
   * Compress an OpenType font file to WOFF or WOFF2.
   * @param ttf The font file to compress. This must be a single font, not a collection.
   * @param options Options object.
   * @returns Compressed font data.
   */
  async compressFromTTF(ttf, options) {
    this.checkDestroyed();
    const pool = await this.pool;
    const quality = options.level ?? (options.algorithm === "woff" ? 15 : 11);
    return await pool.enqueue(async (worker) => {
      const compressed = await worker.send("compress-font", { data: ttf, algorithm: options.algorithm, quality }, options.transfer ? [ttf.buffer] : void 0);
      return compressed;
    });
  }
  /**
   * Decompress a WOFF or WOFF2-compressed font file. Throws an error if the input font is not compressed.
   * @param compressed The compressed font file data.
   * @param options Options object.
   * @returns Decompressed font file data.
   */
  async decompressToTTF(compressed, options) {
    this.checkDestroyed();
    const algorithm = WoffCompressionContext.compressionType(compressed);
    if (algorithm === null) {
      throw new Error("This font file is not compressed");
    }
    const pool = await this.pool;
    return await pool.enqueue(async (worker) => {
      const decompressed = await worker.send("decompress-font", { data: compressed, algorithm }, options?.transfer ? [compressed.buffer] : void 0);
      return decompressed;
    });
  }
  /**
   * Return the compression type for a given font file.
   * @param fontData The font file to check.
   * @returns 'woff' if the file is compressed with WOFF1, 'woff2' if it's compressed with WOFF2, or null if it's not
   * compressed.
   */
  static compressionType(fontData) {
    if (fontData.length < 4) {
      return null;
    }
    const magic = fontData[3] | fontData[2] << 8 | fontData[1] << 16 | fontData[0] << 24;
    if (magic === 2001684038) {
      return "woff";
    } else if (magic === 2001684018) {
      return "woff2";
    }
    return null;
  }
  /**
   * Destroy this context. All previous calls to this context's compression and decompression methods *will* resolve,
   * but any further calls will error out.
   *
   * If running in Node, Bun, Deno, or another such runtime, this will allow the program to exit once all font
   * processing work is finished.
   */
  destroy() {
    void this.pool.then((pool) => pool.destroy());
    this.destroyed = true;
  }
}
const MAX_SUBSTRING_LENGTH = "u+000000-u+000000".length;
const parseUnicodeRanges = (ranges) => {
  const pointsOrRanges = ranges.trim().split(/(?:,\s*)|(?:\s+)/);
  if (pointsOrRanges.length === 1 && pointsOrRanges[0].length === 0) {
    return [];
  }
  const parsed = [];
  for (const pointOrRange of pointsOrRanges) {
    if (pointOrRange.length > MAX_SUBSTRING_LENGTH)
      return null;
    if (pointOrRange.length === 0)
      continue;
    const matchResult = /^(?:u\+)?([0-9a-f]{1,6})(?:-(?:u\+)?([0-9a-f]{1,6}))?$/i.exec(pointOrRange);
    if (!matchResult) {
      const wildcardResult = /^(?:u\+)?([\da-f]{0,6})(\?{1,5})$/i.exec(pointOrRange);
      if (!wildcardResult)
        return null;
      const [, hexDigits, questionMarks] = wildcardResult;
      if (hexDigits.length + questionMarks.length > 6)
        return null;
      const rangeStartHex = hexDigits + "0".repeat(questionMarks.length);
      const rangeEndHex = hexDigits + "f".repeat(questionMarks.length);
      const rangeStart2 = Math.min(parseInt(rangeStartHex, 16), 1114111);
      const rangeEnd = Math.min(parseInt(rangeEndHex, 16), 1114111);
      if (!Number.isFinite(rangeStart2) || !Number.isFinite(rangeEnd))
        return null;
      parsed.push([rangeStart2, rangeEnd]);
      continue;
    }
    const rangeStart = parseInt(matchResult[1], 16);
    if (!Number.isFinite(rangeStart))
      return null;
    if (typeof matchResult[2] === "string") {
      const rangeEnd = parseInt(matchResult[2], 16);
      if (!Number.isFinite(rangeEnd))
        return null;
      parsed.push([rangeStart, rangeEnd]);
    } else {
      parsed.push(rangeStart);
    }
  }
  return parsed;
};
const parseRanges = (ranges) => {
  const pointsOrRanges = ranges.trim().split(/,\s*/);
  if (pointsOrRanges.length === 1 && pointsOrRanges[0].length === 0) {
    return [];
  }
  const parsed = [];
  for (const pointOrRange of pointsOrRanges) {
    if (pointOrRange.length === 0)
      continue;
    const matchResult = /(-?\d+(?:\.\d+)?)(?:-(-?\d+(?:\.\d+)?))?/.exec(pointOrRange);
    if (!matchResult)
      return null;
    const firstPoint = Number(matchResult[1]);
    if (!Number.isFinite(firstPoint))
      return null;
    if (typeof matchResult[2] === "string") {
      const secondPoint = Number(matchResult[2]);
      if (!Number.isFinite(secondPoint))
        return null;
      parsed.push([firstPoint, secondPoint]);
    } else {
      parsed.push(firstPoint);
    }
  }
  return parsed;
};
const formatUnicodeRanges = (ranges) => {
  const result = [];
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    if (typeof range === "number") {
      result.push(`U+${range.toString(16)}`);
    } else {
      result.push(`U+${range[0].toString(16)}-${range[1].toString(16)}`);
    }
  }
  return result;
};
const FEATURES = {
  "aalt": {
    "title": "Access All Alternates",
    "registered": "Adobe",
    "done": true,
    "description": 'Allows the end user to access glyphs which are either not available, or not\neasily available, via other feature applications. The expectation is that this\nfeature will allow substituting a glyph with all possible "alternative" forms\nof the glyph provided in the font: for example, for the glyph `a`, it will\nprovide a substitution to small capital forms, swash alternates, superior forms,\nand so on. This is normally achieved through one-from-many (GSUB3) substitutions,\nbut where only a single alternate is provided, the use of a one-to-one (GSUB1)\nsubstitution may be appropriate.\n\n\nA layout application will not apply this feature in the ordinary course of layout,\nbut may use it to implement a "glyph picker" interface allowing the end user\nto choose the desired substitution, or to cycle through the alternates available\nfor a glyph. Because of way that the layout application will apply this feature,\nit is undefined what would happen to lookup types other than GSUB1 and GSUB3 if\nplaced inside an `aalt` feature.\n\n\n*Note*: AFDKO feature syntax offers special handling of the `aalt` feature.\nWithin the context an `aalt` feature block, the `feature` keyword can be used\nto reference the lookups of other features, arrange any GSUB1 or GSUB3 rules\nwithin those lookups by glyph, and combine them into one-from-many rules.\nThis allows the engineer to more easily generate an `aalt` feature by\ncombining the effects of other features.\n\n\nFor example, given a feature `smcp` which contains the rule `sub b by B.sc;` and a\nfeature `salt` which contains the rule `sub b by b.alt;`, the effect of\n\n\n```fea\nfeature aalt {\n  feature salt;\n  feature smcp;\n} aalt;\n```\n\nwould be to create the rule `sub b from [b.alt B.sc];`.\n',
    "fea": "feature aalt {\n  feature salt;\n  feature smcp;\n  feature swsh;\n  sub quoteleft by quoteleft.fr;\n  sub quoteright by quoteright.fr;\n} aalt;\n",
    "automatic": true,
    "state": "discretionary",
    "ui": 'In the OS X typography panel, this feature is accessed via "Glyph Variants".\n',
    "status": null
  },
  "abvf": {
    "title": "Above-base Forms",
    "registered": "Microsoft",
    "group": "Orthographic",
    "script": {
      "INDIC": {
        "order": 5
      },
      "khmr": {
        "order": 3
      },
      "USE": {
        "order": 0
      }
    },
    "description": "Replaces above-base forms with special forms. This feature is applied by\nIndic, Khmer and USE complex shapers as part of the orthographic unit\nshaping phase. The context of application is restricted to a syllabic cluster.\n\n\nThis feature was originally intended for a specific use case in Khmer, the\nOE vowel sign (U+17BE, ◌ើ), which has pre-base and above-base components.\nThe shaping engine [decomposes](https://github.com/n8willis/opentype-shaping-documents/blob/master/opentype-shaping-khmer.md#22-matra-decomposition)\nU+17BE into a pair of characters, U+17C1 (េ) and U+17BE (again). It then\nreorders the syllable to put the pre-base vowel part before the base consonant,\nleaving the U+17BE after the base. The font is responsible for turning the\nremaining ◌ើ glyph into the above-base part (ី), hence the example\nimplementation below.\n\n\nHowever, more generally, this feature is a good home for above-base\nsubstitutions such as choosing alternate widths of an above-base vowel mark.\n\n\nSee also `abvs` which applies to the whole run, rather than per-cluster.\n",
    "fea": "feature abvf {\n  sub uni17BE by uni17B8;\n} abvf;\n",
    "state": "required",
    "done": true,
    "example": {
      "font": "Noto Sans Khmer",
      "text": "យល់ឃើញ"
    },
    "status": null
  },
  "abvm": {
    "title": "Above-base Mark Positioning",
    "registered": "Microsoft",
    "group": "Common",
    "description": "This feature allows for mark positioning, similar to the `mark` feature; it\nwas intended for positioning marks which are placed over a base consonant in\na syllabic script, but while the OpenType Specification describes this feature\nas being used for Indic scripts, Harfbuzz applies the `abvm` feature as\npart of common feature processing for all scripts.\n\n\nThe only distinction between this feature and the `mark` feature is a subtle\none: in `abvm` processing, any ZWJ characters are skipped when matching input\nand any ZWNJ characters are skipped when matching context, whereas in `mark`\nprocessing, ZWJ/ZWNJ characters are not skipped. Other than that, the choice\nof `abvm` versus `mark` is a matter of notational convenience for the engineer.\n\n\nSee also `blwm`.\n",
    "automatic": true,
    "done": true,
    "state": "required",
    "example": {
      "font": "Hind",
      "text": "कंसं"
    },
    "status": null
  },
  "abvs": {
    "title": "Above-base Substitutions",
    "registered": "Microsoft",
    "group": "Typographic",
    "script": {
      "INDIC": {
        "order": 0
      },
      "khmr": {
        "order": 0
      },
      "USE": {
        "order": 0
      },
      "mym2": {
        "order": 0
      }
    },
    "description": "This feature is intended for substituting base glyphs and above marks with ligature forms, but may be used for any standard typographic substitutions; engineers may wish to restrict its use to substitutions concerning above-base marks for organisational purposes. As a typographic substitution, it will be applied after the `abvf` feature.\n\nThis feature is applied by the shaper as part of the standard typographic presentation phase for Indic scripts, Khmer, Myanmar, and scripts using the Universal Shaping Engine. It is applied with a per-syllable context for Indic scripts, but applied across the whole run in other scripts.\n",
    "fea": "feature abvs {\n  sub eCandraMatra-gujarati candraBindu-gujarati by eCandraMatraCandraBindu-gujarati;\n  sub eMatra-gujarati candraBindu-gujarati by eMatraCandraBindu-gujarati;\n  sub aiMatra-gujarati candraBindu-gujarati by aiMatraCandraBindu-gujarati;\n  # ...\n} abvs;\n",
    "done": true,
    "state": "required",
    "example": {
      "font": "Hind",
      "text": "रृ"
    },
    "status": null
  },
  "afrc": {
    "title": "Alternative Fractions",
    "registered": "Microsoft",
    "state": "discretionary",
    "description": "This feature is intended to provide alternative forms of a fraction; the feature should match numerals surrounded by a slash, and substitute them with a nut fraction.\n",
    "fea": "feature afrc {\n  sub one slash two by onehalf.nut;\n} afrc;\n",
    "ui": 'In the OS X typography panel, this feature is accessed via "Contextual Fractional Forms -> Vertical."\n',
    "done": true,
    "example": {
      "font": "Recursive",
      "text": "1/2"
    },
    "status": null
  },
  "akhn": {
    "group": "Preprocessing",
    "script": {
      "INDIC": {
        "order": 2
      },
      "USE": {
        "order": 0
      }
    },
    "title": "Akhand",
    "registered": "Microsoft",
    "state": "required",
    "description": 'This feature is intended to process ligatures of base characters in Indic scripts and scripts using the Universal Shaping Engine. It was designed for the processing of "Akhand" (unbreakable) character sequences in Devanagari, but may also be used for any substitutions which need to be applied early in the shaping process.\n',
    "fea": "feature akhn {\n  sub ka-deva halant-deva ssa-deva by kssa-deva;\n  sub ja-deva halant-deva nya-deva by jnya-deva;\n\n  sub ra-deva' halant-deva' zerowidthjoiner by eyelash-deva;\n} akhn;\n",
    "done": true,
    "example": {
      "font": "Hind",
      "text": "क्ष"
    },
    "status": null
  },
  "blwf": {
    "title": "Below-base Forms",
    "registered": "Microsoft",
    "group": "Orthographic",
    "script": {
      "INDIC": {
        "order": 4
      },
      "khmr": {
        "order": 2
      },
      "USE": {
        "order": 0
      },
      "mym2": {
        "order": 3
      }
    },
    "description": 'Replaces below-base forms with special forms. This feature is applied by\nIndic, Khmer, Myanmar and USE complex shapers as part of the orthographic unit\nshaping phase. The context of application is restricted to a syllabic cluster.\n\n\nThis is intended to be used for halant conjuncts, where consonant-virama-consonant\nsequences cause the second consonant to be displayed below the first.\n\n\nNote that in the Indic shaper, this feature is used as a "signal" to the shaping engine for reordering\npurposes: that is, if a virama-consonant pair would be substituted by this feature,\nthen that consonant is placed in the below-base position when the syllable is reordered.\n\n\nSee also `blws` which applies to the whole run, rather than per-cluster.\n',
    "fea": "feature blwf {\n  sub virama-myanmar @consonant by @conjunct_consonant;\n} blwf;\n",
    "state": "required",
    "done": true,
    "status": null
  },
  "blwm": {
    "title": "Below-base Mark Positioning",
    "registered": "Microsoft",
    "group": "Common",
    "description": "This feature allows for mark positioning, similar to the `mark` feature; it\nwas intended for positioning marks which are placed below a base consonant in\na syllabic script, but while the OpenType Specification describes this feature\nas being used for Indic scripts, Harfbuzz applies the `blwm` feature as\npart of common feature processing for all scripts.\n\n\nThe only distinction between this feature and the `mark` feature is a subtle\none: in `blwm` processing, any ZWJ characters are skipped when matching input\nand any ZWNJ characters are skipped when matching context, whereas in `mark`\nprocessing, ZWJ/ZWNJ characters are not skipped. Other than that, the choice\nof `blwm` versus `mark` is a matter of notational convenience for the engineer.\n\n\nSee also `abvm`.\n",
    "state": "required",
    "automatic": true,
    "done": true,
    "status": null
  },
  "blws": {
    "title": "Below-base Substitutions",
    "registered": "Microsoft",
    "group": "Typographic",
    "script": {
      "INDIC": {
        "order": 0
      },
      "khmr": {
        "order": 0
      },
      "USE": {
        "order": 0
      },
      "mym2": {
        "order": 0
      }
    },
    "description": "This feature is intended for substituting base glyphs and below marks\nwith ligature forms, but may be used for any standard typographic\nsubstitutions; engineers may wish to restrict its use to substitutions\nconcerning below-base marks for organisational purposes. As a typographic\nsubstitution, it will be applied after the `blwf` feature.\n\n\nThis feature is applied by the shaper as part of the standard typographic\npresentation phase for Indic scripts, Khmer, Myanmar, and scripts using the\nUniversal Shaping Engine. It is applied with a per-syllable context for\nIndic scripts, but applied across the whole run in other scripts.\n",
    "fea": "feature blws {\n    sub dvRA dvmU  by dvRA_mU;\n    sub dvRA dvmUU by dvRA_mUU;\n    sub dvHA dvmU  by dvHA_mU;\n    sub dvHA dvmUU by dvHA_mUU;\n    sub dvDA  dvmvR by dvDA_mvR;\n    sub dvSHA dvmvR by dvSHA_mvR;\n    sub dvHA  dvmvR by dvHA_mvR;\n} blws;\n",
    "done": true,
    "state": "required",
    "status": null
  },
  "c2pc": {
    "title": "Petite Capitals From Capitals",
    "registered": "Tiro Typeworks / Emigre",
    "state": "discretionary",
    "description": "Substitutes capital characters for petite capitals. See the `pcap` feature for a description of petite capitals. See also `c2sc`.\n",
    "fea": "feature c2pc {\n  sub A by A.pc;\n  sub B by B.pc;\n  # ...\n} c2pc;\n",
    "ui": 'In the OS X typography panel, this feature is accessed via "Uppercase ->\nPetite Capitals."\n\n\nIn CSS, this feature can be set with `font-variant-caps: all-petite-caps;`\n(although this also turns on `pcap`.)\n',
    "example": {
      "font": "EB Garamond",
      "text": "NASA and the FBI"
    },
    "done": true,
    "status": null
  },
  "c2sc": {
    "title": "Small Capitals From Capitals",
    "registered": "Adobe",
    "state": "discretionary",
    "automatic": true,
    "description": "Substitutes capital characters for small capitals. Small capitals are often used to set acronyms. Compare with `smcp`, which substitutes lowercase letters for small capitals.\n",
    "fea": "feature c2sc {\n  sub A by A.sc;\n  sub B by B.sc;\n  # ...\n} c2sc;\n",
    "example": {
      "font": "EB Garamond",
      "text": "NASA and the FBI"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Uppercase ->\nSmall Capitals." In Adobe applications, this feature is accessed via "All\nSmall Caps" in the OpenType panel (although this also turns on `smcp`).\n\n\nIn CSS, this feature can be set with `font-variant-caps: all-small-caps;`\n(although this also turns on `smcp`).\n',
    "done": true,
    "status": null
  },
  "calt": {
    "title": "Contextual Alternates",
    "registered": "Adobe",
    "state": "default",
    "group": "Typographic",
    "description": "This feature is used to substitute glyphs with alternate forms, generally on\na contextual basis. For example, a script font may wish to use joining forms\nof the letter `o` when followed by another letter starting at the x-height.\n\n\nThis feature is processed as part of the standard typographic presentation group;\nin the Indic and Arabic complex shapers, it is processed as part of the language\nform group.\n",
    "fea": "feature calt {\n  sub T' @letter by T.wide;\n  sub o' space by o.swash;\n  sub o' [i k m n o] by o.join;\n  sub [f o t v w] s' by s.noinstroke;\n} calt;\n",
    "example": {
      "font": "Kristi",
      "text": "Two hoots!"
    },
    "done": true,
    "ui": 'In the OS X typography panel, this feature is accessed via "Contextual Alternates -> Contextual Alternates." In Adobe applications, this feature is accessed via "Contextual Alternates" in the OpenType panel.\n',
    "status": null
  },
  "case": {
    "title": "Case-Sensitive Forms",
    "state": "discretionary",
    "group": "Typographic",
    "registered": "Adobe",
    "automatic": true,
    "description": "This features is intended to reposition glyphs (either by substitution or\npositioning), particularly punctuation glyphs, so that they are better\naligned within all-capital sequences or sequences of lining numerals.\nIt should also change oldstyle numerals to lining numerals.\n\n\nNote that while it was hoped that layout engines would automatically apply\nthis feature within all-capital sequences, this is not currently known to\nbe automatically applied, and must be applied manually by the typesetter.\n",
    "done": true,
    "fea": "feature case {\n  sub [guillemotleft guillemotright hyphen] by [guillemotleft.cap guillemotright.cap hyphen.cap];\n} case;\n",
    "example": {
      "font": "Zilla Slab",
      "text": "«A-Za-z»"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Case-Sensitive Layout -> Capital Forms."\n',
    "status": null
  },
  "ccmp": {
    "state": "required",
    "title": "Glyph Composition/Decomposition",
    "registered": "Microsoft",
    "group": "Common",
    "order": 0,
    "description": "After OpenType normalization but before the processing of other features,\nit may be useful to decompose single glyphs into sequences, or combine\nsequences into a single glyph. For example:\n\n\n* In Arabic fonts, treating the rasm letters and the nukta dots separately\nallows for more flexible positioning and reduces the number of glyphs which\nneed to be drawn. Using rules such as `sub beh-ar by behDotless-ar dotbelow;`\nin the `ccmp` feature decomposes the dots into separate glyphs.\n\n* The i acute character (í, U+00ED) is normalized to U+0069 U+0301 (i acutecomb).\nHowever, as the acute replaces the tittle on the `i`, it is useful to substitute\nthis for a dotless form: `sub i' acutecomb by idotless;`.\n\n* Conversely, multiple glyphs may be combined into one. In Tibetan, stacked\nletters such as གྷ (U+0F43) have their own Unicode codepoints, but can\nalternatively be encoded in documents using the decomposed form U+0F42 (ག)\n◌ྷ (U+0FB7). These two encodings can be unified in the font with a rule such\nas `sub uni0F42 uni0FB7 by uni0F43;`.\n",
    "fea": "feature ccmp {\n  sub alefHamzaabove-ar by alef-ar hamzaabove-ar;\n  sub alefHamzabelow-ar by alef-ar hamzabelow-ar;\n  sub beh-ar by behDotless-ar dotbelow-ar;\n  sub teh-ar by behDotless-ar twodotsabove-ar;\n  sub theh-ar by behDotless-ar threedotsabove-ar;\n  sub jeem-ar by hah-ar dotbelow-ar;\n  sub khah-ar by hah-ar dotabove-ar;\n  ...\n} ccmp;\n",
    "done": true,
    "status": null
  },
  "cfar": {
    "state": "required",
    "script": {
      "khmr": {
        "order": 5
      }
    },
    "group": "Orthographic",
    "title": "Conjunct Form After Ro",
    "registered": "Microsoft",
    "status": "discouraged",
    "description": "This feature is only applied during orthographic unit shaping in the Khmer\ncomplex shaper. In Khmer, the conjunct form of the letter ro (after a\ncoeng) is reordered to the left of the base consonant and displayed as a\ndeep letterform which can interact with below-base glyphs. This feature\nwas intended as offering an opportunity to fix up below-base glyphs to\navoid clashing with the coeng ro.\n\n\nNo examples of the use of this feature have been found. Consider using\n`blws` instead.\n",
    "done": true
  },
  "chws": {
    "state": "discretionary",
    "title": "Contextual Half-width Spacing",
    "registered": "Adobe/W3C",
    "description": "Layout engines which correctly support advanced typographic layout for CJK\n(see [JLREQ](https://www.w3.org/TR/jlreq/), [CLREQ](https://www.w3.org/TR/clreq),\n[KLREQ](https://www.w3.org/TR/klreq/)) will contain code to adjust the spacing\nof glyphs in certain circumstances. For example, punctuation sequences such as\n`。」` should be set with the full-stop taking up a half-em width instead of\na full em.\n\nThis feature is intended to improve the appearance of text set with software\nwhich does *not* implement these spacing adjustments, by moving the spacing\nlogic into the font.\n\nThis feature is relatively new as of 2021, and no implementations have been\nidentified.\n",
    "fea": "feature chws {\n  pos [comma-han period-han] -500 @closing_bracket;\n  pos @closing_bracket -500 [comma-han period_han];\n  pos [comma-han period-han @closing_bracket] 500 @opening_bracket;\n  pos @opening_bracket <500 0 0 0> @opening_bracket;\n  pos @closing_bracket @closing_bracket <-500 0 0 0>;\n} chws;\n",
    "done": true,
    "status": null
  },
  "cjct": {
    "title": "Conjunct Forms",
    "script": {
      "INDIC": {
        "order": 9
      },
      "USE": {
        "order": 7
      }
    },
    "group": "Orthographic",
    "registered": "Microsoft",
    "state": "required",
    "description": 'This feature is applied to Indic scripts and scripts using the Universal\nShaping Engine as the final feature in the orthographic unit shaping phase,\nbefore final reordering. It was intended for use in creating consonant\nconjunct groups. (Consonant + Virama + Consonant.)  The context of application\nis restricted to a syllabic cluster.\n\n\nThe difference between this feature and `blwf` is that the `blwf` feature\nis intended for substituting the "tail" (virama + consonant) for a below-base\nform, while this feature is intended for substituting the entire sequence\nwith a ligature.\n',
    "fea": "feature cjct {\n    # Actual implementation will depend on conjunct glyphs provided in your font.\n    sub nga-deva virama-deva ga-deva by ngga-deva;\n    sub nga-deva virama-deva ma-deva by ngma-deva;\n    sub nga-deva virama-deva ya-deva by ngya-deva;\n    sub tta-deva virama-deva tta-deva by tttta-deva;\n    sub tta-deva virama-deva ya-deva by ttya-deva;\n    # ...\n} cjct;\n",
    "done": true,
    "example": {
      "font": "Noto Sans Devanagari",
      "text": "ङ्म"
    },
    "status": null
  },
  "clig": {
    "title": "Contextual Ligatures",
    "registered": "Adobe",
    "group": "Typographic",
    "state": "default",
    "script": {
      "khmr": {
        "order": 5
      }
    },
    "done": true,
    "description": 'This feature has two distinct uses.\n\n\nIt was originally intended for ligature forms which are contextual in nature,\nfor example, for Latin script fonts, and typically made up of GSUB lookup 8 rules.\nHowever, these rules may also be placed in other discretionary ligature\nfeatures, such as `rlig` or `liga`, and these should be used instead. As such\nthis use is relatively rare.\n\n\nSeparately, in the Khmer complex shaper, this is a mandatory feature used\nfor "ligatures that are desired for typographical correctness". It is\ntherefore used widely in Khmer fonts for general typographic shaping.\n',
    "fea": "feature clig {\n  sub kho-khmer.conjunct aaSign-khmer by kho-khmer.conjunct.aa;\n  sub kho-khmer.conjunct auSign-khmer by kho-khmer.conjunct.au;\n  # ...\n  sub nyo-khmer' @conjuncts by nyo-khmer.alt;\n  sub nyo-khmer.alt nyo-khmer.conjunct' by nyo-khmer.conjunct.alt;\n  # ...\n}\n",
    "status": null
  },
  "cpct": {
    "title": "Centered CJK Punctuation",
    "description": "This feature is intended to center punctuation (typically the ideographic\ncomma 、 and ideographic full stop 。) in Chinese fonts. Where presented, it\nis often implemented as GPOS lookup 1 positioning rules to place these\nglyphs within the center of the em square.\n",
    "example": {
      "text": "か、か",
      "font": "Feature Sans"
    },
    "registered": "Adobe",
    "done": true,
    "fea": "feature cpct {\n   pos comma-han <328 350 0 0>;\n   pos period-han <359 350 0 0>;\n} cpct;\n",
    "state": null,
    "status": null
  },
  "cpsp": {
    "title": "Capital Spacing",
    "registered": "Adobe",
    "state": "discretionary",
    "description": "This feature inserts a small around of space (order of 5-10 units for a typical\nfont) around capital letters to improve the setting of all-capital runs.\n",
    "example": {
      "font": "Grenze",
      "text": "AAWW"
    },
    "fea": "feature cpsp {\n  pos @capitals <5 0 10 0>;\n} cpsp;\n",
    "ui": 'In the OS X typography panel, this feature is accessed via "Case-Sensitive\nLayout > Capital Spacing".\n',
    "done": true,
    "status": null
  },
  "cswh": {
    "title": "Contextual Swash",
    "registered": "Adobe",
    "state": "discretionary",
    "description": "This feature is similar to the `swsh` (Swash) feature, but is intended to be\nused for contextual (conditional) swash substitutions. For example, while\nAdobe Garamond Pro Italic uses the `swsh` feature to substitute *all*\ncapitals for swash forms, it uses the `cswh` feature to conditionally change\nonly capitals preceding a lowercase into swash forms.\n",
    "fea": "feature cswh {\n  sub @capitals' @lowercase by @capitals.swsh;\n} cswh;\n",
    "example": {
      "font": "Work Sans",
      "text": "WOWSERS!"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Contextual Alternates > Contextual Swash Alternates".',
    "done": true,
    "status": null
  },
  "curs": {
    "automatic": true,
    "title": "Cursive Positioning",
    "registered": "Microsoft",
    "state": "required",
    "group": "Positioning",
    "description": 'This feature is used to position glyphs with cursive connections.\n\n\nCertain scripts, in particular Arabic, are "connected" scripts, where the\nstart of a character has its position adjusted relative to the end of the previous\ncharacter. In font editors, this is normally defined by setting "exit" and\n"entry" anchor points. These are then converted to GPOS 3 cursive positioning\nrules.\n\n\nWhile this feature is not mandatory for designers - some styles of Arabic\nare aligned along the baseline, and so glyphs do not need to be repositioned\n- it is applied by default if present, and is not specific to Arabic script.\nIt is not impossible, but exceptionally uncommon, to use this feature for\nconnected "cursive" Latin fonts, and is often unnecessary because of the\npresence of a fixed baseline in Latin.\n',
    "example": {
      "font": "Aref Ruqaa",
      "text": "سمر"
    },
    "done": true,
    "fea": "feature curs {\n  pos cursive uni066F.medi <anchor 606 35> <anchor 0 35>;\n  pos cursive uni0640 <anchor 250 35> <anchor 0 35>;\n  pos cursive uni06A1.medi <anchor 606 35> <anchor 0 35>;\n  # ...\n} curs;\n",
    "status": null
  },
  "cv01": {
    "title": "Character Variant 1 – Character Variant 99",
    "registered": "Microsoft",
    "state": "discretionary",
    "automatic": true,
    "description": 'These features - ranging from `cv01` to `cv99` - allow for stylistic variations\nof individual characters.\n\nThey are similar to the Stylistic Set (`ss01`--`ss20`) features, but (as their)\nname implies, stylistic sets are intended to allow a *set* of glyphs to\nvary in a common way (for example, straightening the "leg" of glyphs such as\n`hnm`, or overlining `MCXLVI`  characters to form Roman numerals).\nCharacter variant features, on the other hand, do not imply any common\nvariations across a range of glyphs.\n\n\nWhen this feature is coded manually, character variant features may be given\nidentifying names to be displayed in the user interface. See the\n[Adobe feature file specification](http://adobe-type-tools.github.io/afdko/OpenTypeFeatureFileSpecification.html#8.d)\nfor the format of these names.\n',
    "example": {
      "font": "Source Code Pro",
      "text": "Java"
    },
    "fea": 'feature cv01 {\n  cvParameters {\n      FeatUILabelNameID {\n          name 3 1 0x0409 "single-storey a";\n          name 1 0 0 "single-storey a";\n      };\n      Character 0x61;\n  }\n  sub a by a.cv01;\n} cv01;\n',
    "ui": 'In the OS X typography panel, this feature is accessed via "Glyph Variants".\nIn CSS, this feature is accessed through the [`font-variant-alternates`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-alternates) property.\n',
    "done": true,
    "status": null
  },
  "dist": {
    "title": "Distances",
    "registered": "Microsoft",
    "state": "required",
    "group": "Positioning",
    "description": 'This feature provides positional adjustments between glyphs. It is largely\nequivalent to the `kern` feature, but should be considered as "required"\nkerning in that no user interface is provided to disable it.',
    "done": true,
    "example": {
      "font": "Noto Sans Devanagari",
      "text": "दॗकॗ"
    },
    "status": null
  },
  "dlig": {
    "title": "Discretionary Ligatures",
    "registered": "Adobe",
    "state": "discretionary",
    "description": "This feature is used for additional typographic ligatures which are selectable\nby the end-user.\n",
    "ui": 'In the OS X typography panel, this feature is accessed via "Ligatures -> Rare\nLigatures." (Not to be confused with the `rlig` feature, which is for required\nligatures...) In Adobe applications, this feature is\naccessed via "Discretionary Ligatures" in the OpenType panel.\n\n\nIn CSS, this feature can be accessed through the [`font-variant-ligatures`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures) property.\n',
    "fea": "sub dlig {\n  sub t h by t_h;\n  sub p p by p_p;\n} dlig;\n",
    "example": {
      "font": "Allura",
      "text": "coppersmith"
    },
    "done": true,
    "status": null
  },
  "dnom": {
    "title": "Denominators",
    "automatic": true,
    "state": "discretionary",
    "status": "deprecated",
    "registered": "Adobe",
    "description": 'This deprecated feature replaces numeric glyphs with denominator forms. See also `numr`.\n\nNote that, despite the description of this feature in the OpenType specification,\nthe application of the `frac` feature is independent of this feature. It was\noriginally intended that applying the `frac` feature would "trigger" the\napplication of the `numr` feature for glyphs before the division slash and\nthe `dnom` feature for glyphs after it. This behavior was never implemented in\nOpenType shaping, and instead contextual rules are used within the `frac` feature\nto choose appropriate glyphs for numerator and denominator.\n\nNew fonts should use the `frac` feature in preference to this feature.\n',
    "done": true
  },
  "dtls": {
    "title": "Dotless Forms",
    "script": {
      "math": null
    },
    "registered": "Microsoft",
    "description": "This feature is used by a math layout handler to substitute glyphs by dotless\nforms when accents are to be added to the base character.\n",
    "fea": "feature dtls {\n  sub i by i.dotless;\n  sub j by j.dotless;\n  sub uni2148 by uni2148.dotless;\n  sub uni2149 by uni2149.dotless;\n  sub u1D422 by u1D422.dotless;\n  sub u1D423 by u1D423.dotless;\n  # ...\n} dtls;\n",
    "example": {
      "math": '<mover accent="true"><mi> i </mi> <mo> &#x0005E; </mo> </mover>'
    },
    "done": true,
    "state": null,
    "status": null
  },
  "expt": {
    "title": "Expert Forms",
    "registered": "Adobe",
    "description": 'This feature is used to substitute Japanese kanji for alternative forms which\nare considered more "typographical". This includes the use of JIS78 forms\n(see `jp78`), but also a wide range of other substitutions.\n\n\nThe expected substitutions of the `expt` feature are defined in terms of the\n[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) glyphset.\nEngineers creating Japanese fonts according to that glyphset should read the\ninformation at the Adobe-Japan1 repository, and use the latest version of the\nfeature code provided there to implement this feature.\n\n\n(Thanks to Ken Lunde for the information about implementing this feature.)\n',
    "done": true,
    "example": {
      "font": "Kiwi Maru",
      "text": "曁堙僊"
    },
    "state": null,
    "status": null
  },
  "falt": {
    "title": "Final Glyph on Line Alternates",
    "registered": "Microsoft",
    "description": "This feature was intended to allow a justification system to substitute a\nglyph for another form when the glyph is the final one on a line of text,\nto improve the fitting of the line. (See also `jalt`.) No known layout\nengine supports activating this and it is unclear whether any fonts\nimplemented the feature.\n",
    "done": true,
    "status": "deprecated",
    "state": null
  },
  "fin2": {
    "title": "Terminal Form #2",
    "registered": "Microsoft",
    "group": "Topographical",
    "state": "required",
    "script": {
      "syrc": {
        "order": 3
      }
    },
    "description": "This feature is used by the Arabic complex shaper when processing the Syriac\nscript. The Syriac letter alaph (U+0710) has multiple final forms: the first\nfinal form, used when the preceding character is a joining\ncharacter, is selected using the `fina` feature, similar to an Arabic alif.\n\n\nHowever, when the preceding character is a non-joining character, the selection\nof the final form of alaph depends on whether the preceding character has\njoining group `Dalath_Rish`. If the preceding character (skipping all characters\nwith a transparent joining group) is either U+0715 (dalath), U+0716 (dotless\ndalath rish) or U+072A (rish), the `fin3` feature is applied. Otherwise,\nthis feature is applied.\n",
    "example": {
      "font": "Noto Sans Syriac",
      "text": "ܒܐ"
    },
    "fea": "feature fin2 {\n  lookupflag RightToLeft IgnoreMarks;\n  sub uni0710 by uni0710.Fina2;\n  } fin2;\n",
    "done": true,
    "status": null
  },
  "fin3": {
    "title": "Terminal Form #3",
    "registered": "Microsoft",
    "group": "Orthographic",
    "state": "required",
    "script": {
      "syrc": {
        "order": 3
      }
    },
    "description": "This feature is used by the Arabic complex shaper when processing the Syriac\nscript. The Syriac letter alaph (U+0710) has multiple final forms: the first\nfinal form, used when the preceding character is a joining\ncharacter, is selected using the `fina` feature, similar to an Arabic alif.\n\n\nHowever, when the preceding character is a non-joining character, the selection\nof the final form of alaph depends on whether the preceding character has\njoining group `Dalath_Rish`. If the preceding character (skipping all characters\nwith a transparent joining group) is either U+0715 (dalath), U+0716 (dotless\ndalath rish) or U+072A (rish), this feature is applied. Otherwise,\nthe `fin2` feature is applied.\n",
    "example": {
      "font": "Noto Sans Syriac",
      "text": "ܕܐ"
    },
    "fea": "feature fin3 {\n  lookupflag RightToLeft IgnoreMarks;\n  sub uni0710 by uni0710.Fina3;\n  } fin2;\n",
    "done": true,
    "status": null
  },
  "fina": {
    "title": "Terminal Forms",
    "registered": "Microsoft/Adobe",
    "group": "Topographical",
    "state": "required",
    "script": {
      "arab": {
        "order": 2
      },
      "syrc": {
        "order": 2
      },
      "USE": {
        "order": 4
      }
    },
    "description": "This feature is used by the Arabic and USE complex shapers as part of topographic\nshaping. It is *not* appropriate for general end-of-word detection, but is\ndesigned to replace joining characters with final forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n",
    "example": {
      "font": "Aref Ruqaa",
      "text": "جر"
    },
    "automatic": true,
    "fea": "feature fina {\n  lookupflag RightToLeft IgnoreMarks;\n  sub alef-ar by alef-ar.fina;\n  sub beh-ar by beh-ar.fina;\n  # ...\n}\n",
    "done": true,
    "status": null
  },
  "flac": {
    "title": "Flattened accent forms",
    "script": {
      "math": null
    },
    "example": {
      "math": "x&#x00301; X&#x00301;"
    },
    "registered": "Microsoft",
    "description": "This feature replaces accents with flatter forms allowing them to fit within\nthe line when placed over a tall base character. This feature is automatically\napplied by the math layout engine when an accent is placed over a base character\nat a height of more than `MATH.MathConstants.FlattenedAccentBaseHeight`.\n",
    "done": true,
    "fea": "feature flac {\n  sub uni0300 by uni0300.mathcap;\n  sub uni0301 by uni0301.mathcap;\n  sub uni0302 by uni0302.mathcap;\n  sub uni0303 by uni0303.mathcap;\n  sub uni0304 by uni0304.mathcap;\n  sub uni0306 by uni0306.mathcap;\n  sub uni0307 by uni0307.mathcap;\n  sub uni0308 by uni0308.mathcap;\n  sub uni030A by uni030A.mathcap;\n  sub uni030C by uni030C.mathcap;\n} flac;\n",
    "state": null,
    "status": null
  },
  "frac": {
    "title": "Fractions",
    "state": "discretionary",
    "registered": "Microsoft/Adobe",
    "description": "The feature is used to set fractions, both those fractions for which there is a precomposed glyph in the font (for example, `sub three slash four by threequarters;`) and those made up of numerator and denominator forms of numerals.",
    "example": {
      "font": "Recursive",
      "text": "3/4 cup (145/793g)"
    },
    "fea": "feature frac {\n  sub one slash four by onequarter;\n  sub three slash four by threequarters;\n  # ...\n\n  # This implementation due to Tal Leming and Ben Kiel\n  lookup FractionBar {\n      ignore sub slash @figures @figures @figures @figures @figures @figures @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures @figures @figures @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures @figures @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures slash;\n      ignore sub slash @figures @figures slash';\n      ignore sub slash' @figures @figures slash;\n      ignore sub slash @figures slash';\n      ignore sub slash' @figures slash;\n      ignore sub slash slash';\n      ignore sub slash' slash;\n      sub @figures slash' @figures by fraction;\n  } FractionBar;\n\n  lookup Numerator1 {\n      sub @figures' fraction by @figuresNumerator;\n  } Numerator1;\n\n  lookup Numerator2 {\n      sub @figures' @figuresNumerator fraction by @figuresNumerator;\n  } Numerator2;\n\n  lookup Numerator3 {\n      sub @figures' @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator3;\n\n  lookup Numerator4 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator4;\n\n  lookup Numerator5 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator5;\n\n  lookup Numerator6 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator6;\n\n  lookup Numerator7 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator7;\n\n  lookup Numerator8 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator8;\n\n  lookup Numerator9 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator9;\n\n  lookup Numerator10 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator10;\n\n  lookup Denominator {\n      sub [fraction @figuresDenominator] @figures' by @figuresDenominator;\n  } Denominator;\n\n  sub @figures space' @figuresNumerator by space.frac;\n} frac;\n",
    "ui": 'In the OS X Typography panel, this feature is accessed via "Contextual Fraction\nForms -> Diagonal."\n\nIn Adobe applications, this feature is accessed via "Fractions" in the OpenType\npanel.\n',
    "done": true,
    "status": null
  },
  "fwid": {
    "title": "Full Widths",
    "automatic": true,
    "state": "discretionary",
    "registered": "Adobe",
    "description": "This feature replaces glyphs with variants which fill the em square. This is\ngenerally used with CJK fonts for setting text within an em-square grid (*hanmen*).\n",
    "fea": "feature qwid {\n  sub one by uniFF11;\n  sub two by uniFF12;\n  # ...\n  sub a by uniFF41;\n  sub b by uniFF42;\n}\n",
    "example": {
      "font": "Shippori Mincho",
      "text": "か12かab"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Text spacing > Full Width".',
    "done": true,
    "status": null
  },
  "half": {
    "title": "Half Forms",
    "registered": "Microsoft",
    "group": "Orthographic",
    "script": {
      "INDIC": {
        "order": 6
      },
      "USE": {
        "order": 0
      }
    },
    "description": "This feature produces half forms of conjuncts. It is processed in the Indic\nand USE complex shapers as part of the orthographic shaping group.\n\n\nHalf forms are used in scripts such as Devanagari to display dead (unvoiced)\nconsonants after a virama in conjuncts which do not have a predetermined\nconjunct form. Half forms should be provided for all base consonants. These\nhalf forms can then be substituted into conjuncts later using the `pres`\nfeature. For example:\n\n```\nfeature half {\n  sub ka-deva halant-deva by k-deva;\n  ...\n} half;\nfeature pres {\n  sub k-deva sa-deva by ksa-deva;\n  ...\n} pres;\n```\n",
    "example": {
      "font": "Hind",
      "text": "ग्त"
    },
    "state": "required",
    "done": true,
    "fea": "feature half {\n  sub ka-deva halant-deva by k-deva;\n  sub kha-deva halant-deva by kh-deva;\n  sub ga-deva halant-deva by g-deva;\n  sub gha-deva halant-deva by gh-deva;\n  ...\n} half;\n",
    "status": null
  },
  "haln": {
    "title": "Halant Forms",
    "registered": "Microsoft",
    "state": "required",
    "group": "Typographic",
    "script": {
      "INDIC": {
        "order": 6
      }
    },
    "description": 'This feature is applied by the Indic shaper during the typographic presentation\nphase, and is intended to "clean up" dead consonant sequences which have not\nbeen formed into conjuncts, by replacing them with correct dead consonant forms.\n\n\nFor example, consider the two sequences "tta nukta virama ra" and "tta nukta virama"\nwithout the final ra. In Noto Sans Devanagari, the "tta nukta virama" sequence is\nfirst composed into `ttanuktadeva` by the `nukt` feature, leaving\n`ttanuktadeva viramadeva radeva` and `ttanuktadeva viramadeva` respectively.\n\n\nWhen the final ra is present, the `rkrf` feature creates a conjunct form\n`ttanuktaradeva`. But without the final ra, we are left with `ttanuktadeva viramadeva`.\nIn this case, the default positioning of the nukta underneath the tta is\nincorrect, as it needs to move to the left to accommodate the virama. A\nprecomposed glyph `ttanuktaprehalfdeva` is substituted in the `haln`\nfeature to tidy up this dead consonant sequence.\n',
    "example": {
      "font": "Noto Sans Devanagari",
      "text": "ट़्र ट़्"
    },
    "done": true,
    "status": null
  },
  "halt": {
    "title": "Alternate Half Widths",
    "automatic": true,
    "state": "discretionary",
    "registered": "Adobe",
    "description": "This feature is similar to the `hwid` feature, but instead of replacing half-width\nglyphs with proportional equivalents, it re-spaces the glyphs using positioning\nrules.\n",
    "fea": "feature halt {\n  pos [degree.full minute.full quotedblright.full quoteright.full second.full uni3001 uni3002 uni3009 uni300B uni300D uni300F uni3011 uni3015 uni301F uniFF09 uniFF0C uniFF0E uniFF3D uniFF5D] -500;\n  pos [quotedblleft.full quoteleft.full uni3008 uni300A uni300C uni300E uni3010 uni3014 uni301D uniFF08 uniFF3B uniFF5B] <-500 0 -500 0>;\n  pos [uni30FB uniFF01 uniFF1A uniFF1B] <-250 0 -500 0>;\n} halt;\n",
    "example": {
      "font": "Reggae One",
      "text": "か、が。さ"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Text spacing > Alternative Half Width".',
    "done": true,
    "status": null
  },
  "hist": {
    "title": "Historical Forms",
    "registered": "Microsoft",
    "state": "discretionary",
    "description": 'Substitutes forms of letters which are no longer commonly used, or which\ngive the text a "historical" feel. See also the `hlig` feature.\n',
    "fea": "feature hist {\n  sub J by J.hist;\n  sub s by longs;\n} hist;\n",
    "example": {
      "font": "EB Garamond",
      "text": "Justice"
    },
    "done": true,
    "status": null
  },
  "hkna": {
    "title": "Horizontal Kana Alternates",
    "registered": "Adobe",
    "state": "discretionary",
    "description": 'This feature replaces standard kana forms with glyphs which are designed\nspecifically for horizontal layout. For example, while "generic" kana may\nhave curving crossbars for characters such as さ and た, horizontal variants\nmay use straight crossbars.\n',
    "example": {
      "font": "Feature Sans",
      "text": "か12か"
    },
    "fea": "feature hkna {\n  sub ka-hira by ka-hira.vkna;\n  sub sa-hira by sa-hira.vkna;\n  sub ta-hira by ta-hira.vkna;\n  # ...\n} hkna;\n",
    "ui": 'In the Mac OS X typography panel, this feature is accessed via "Optimized\nKana Alternatives -> Horizontal Alternatives".\n',
    "done": true,
    "status": null
  },
  "hlig": {
    "title": "Historical Ligatures",
    "registered": "Microsoft",
    "state": "discretionary",
    "description": 'Substitutes ligature forms which are no longer commonly used, or which\ngive the text a "historical" feel: for example, the "st" ligature. See\nalso the `hist` feature.\n',
    "fea": "feature hlig {\n  sub s t by s_t;\n} hlig;\n",
    "example": {
      "font": "EB Garamond",
      "text": "aſſiſt"
    },
    "done": true,
    "ui": 'In the OS X typography panel, this feature is accessed via "Ligatures -> Historical\nLigatures."\n',
    "status": null
  },
  "hngl": {
    "status": "deprecated",
    "title": "Hangul",
    "registered": "Adobe",
    "description": "This feature is deprecated and should not be used. The idea of this\nfeature was to replace hanja (Chinese Han characters) with hangul\nsyllables. But such semantic behavior should be processed at the\ninput method environment level, not at the font level, meaning this\nfeature was never a good idea.\n",
    "done": true,
    "state": null
  },
  "hojo": {
    "title": "Hojo Kanji Forms (JIS X 0212-1990 Kanji Forms)",
    "registered": "Adobe",
    "description": "The expected form of Japanese kanji characters in an OpenType font are the\nforms specified in JIS X 0213 (which replaces the older standard, JIS X\n0208). As well as JIS X 0208, an additional standard, JIS X 0212, defined\nsupplementary characters, including 5,801 kanji characters. 2,743 of those\ncharacters were included in the JIS X 0213 standard, but in some cases,\nthe representative forms are different between the 1990 revision of JIS X\n0212 and the current revision (2004) of JIS X 0213. This feature is used to\nselect the JIS X 0212-1990 representative forms of these characters.\n\n\nThe best source of information about which glyph forms differ, and how this\nfeature should be implemented, is the\n[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) repository.\n",
    "fea": "feature hojo {\n  sub uni7462 by uni7462.hojo;\n  sub uni7626 by uni7626.hojo;\n  # ...\n} jp83;\n",
    "done": true,
    "example": {
      "font": "Kiwi Maru",
      "text": "瑢瘦"
    },
    "ui": 'In the Mac OS X typography panel, this feature is accessed via the "character\nshape" radio buttons.\n\nIn Adobe InDesign with CJK functionality, this feature can be accessed via\nthe "Alternate Glyphs" dropdown in the Advanced Character Formats panel of\nthe character style options dialog.\n',
    "state": null,
    "status": null
  },
  "hwid": {
    "title": "Half Widths",
    "automatic": true,
    "state": "discretionary",
    "registered": "Adobe",
    "description": "This feature replaces glyphs (normally figures and punctuation) with variants\nwhich are one-half of the em square. This is generally used with CJK fonts\nand in the context of vertical typesetting. (For placing a sequence of two\nnumbers horizontally across an em-width vertical column.)\n\nSee also `fwid`, `qwid`, `twid`.\n",
    "fea": "feature hwid {\n  sub one by one.hwid;\n  sub two by two.hwid;\n  # ...\n}\n",
    "example": {
      "font": "Feature Sans",
      "text": "か12か"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Text spacing > Half Width".',
    "done": true,
    "status": null
  },
  "init": {
    "title": "Initial Forms",
    "registered": "Microsoft/Adobe",
    "group": "Topographical",
    "state": "required",
    "script": {
      "arab": {
        "order": 7
      },
      "syrc": {
        "order": 7
      },
      "INDIC": {
        "order": 0
      },
      "USE": {
        "order": 2
      }
    },
    "description": "This feature is used by the Arabic, Indic, and USE complex shapers as part of topographic\nshaping. It is *not* appropriate for general start-of-word detection, but is\ndesigned to replace joining characters with initial forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n\n\nIn the Indic shaper, the feature is expected to apply in word-initial context\nas identified by the shaping engine.\n",
    "example": {
      "font": "Aref Ruqaa",
      "text": "جر"
    },
    "automatic": true,
    "fea": "feature init {\n  lookupflag RightToLeft IgnoreMarks;\n  sub beh-ar by beh-ar.init;\n  sub jeem-ar by jeem-ar.init;\n  # ...\n}\n",
    "done": true,
    "status": null
  },
  "isol": {
    "title": "Isolated Forms",
    "registered": "Microsoft/Adobe",
    "group": "Topographical",
    "state": "required",
    "script": {
      "arab": {
        "order": 1
      },
      "syrc": {
        "order": 1
      },
      "USE": {
        "order": 1
      }
    },
    "description": "This feature is used by the Arabic and USE complex shapers as part of topographic\nshaping. It is designed to replace joining characters with isolated forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n",
    "example": {
      "font": "Aref Ruqaa",
      "text": "یڽہ"
    },
    "automatic": true,
    "fea": "feature isol {\n  sub yehHamzaabove-ar by CH_YEu1 HAMZA_ABOVE;\n  sub tehMarbutagoal-ar by HAYCu1 dda;\n  sub hah-ar by JIMu1;\n  sub noon-ar by NUNu1 sdi;\n} isol;\n",
    "done": true,
    "status": null
  },
  "ital": {
    "title": "Italics",
    "registered": "Adobe",
    "state": "discretionary",
    "description": "This feature is used in *very particular circumstances*. Despite its name, it\nis not a general mechanism for activating italic glyphs.\n\n\nHistorically CJK fonts, particular Japanese fonts, shipped with a glyphset\nwhich contained the Latin alphabet (usually full-width but sometimes proportional).\nAs will as upright forms, these fonts *also* included Latin italic glyphs.\n\n\nCJK fonts with both upright and italic Latin glyphs in the same font should use\nthis feature to select the italic forms\n",
    "fea": "feature ital {\n  sub a by a.ital;\n  sub b by b.ital;\n  # ...\n} ital;\n",
    "ui": 'In the OS X typography panel, this feature is accessed via "Italics -> On".\nIn Adobe applications, this feature is accessed via "Roman Italics" in the OpenType panel.\nNote that in neither case can the italic feature be accessed from the "Italicise"\nbutton or the "Font Style" menu.\n',
    "example": {
      "font": "Feature Sans",
      "text": "か123か"
    },
    "done": true,
    "status": null
  },
  "jalt": {
    "title": "Justification Alternates",
    "registered": "Microsoft",
    "state": "discretionary",
    "description": "This feature is intended to allow text layout engines to improve line justification\nby selecting alternate glyphs. A layout engine can set a line of text, and then\ntry applying the `jalt` feature to the line to see if the resulting glyphs have\na better fit. It is rarely implemented in layout engines, with Adobe InDesign\nand Photoshop being the only known implementations.\n",
    "fea": "feature jalt {\n  sub qaf-ar by qaf-ar.jalt;\n  sub seen-ar by seen-ar.jalt;\n  # ...\n} jalt;\n",
    "example": {
      "font": "Aref Ruqaa",
      "text": "سارق الغنم"
    },
    "done": true,
    "ui": 'In Adobe InDesign, this can be automatically applied at the paragraph level by choosing "Justification" from the paragraph panel menu and selecting "Justification Alternates (Naskh)" in the Justification dropdown. It can also be manually applied at the character level by choosing the Justification Alternate option from the character panel menu.\nIn Adobe Photoshop, it can be manually applied at the character level by choosing "Justification Alternates" from the character panel.',
    "status": null
  },
  "jp04": {
    "title": "JIS04 Forms",
    "registered": "Adobe",
    "description": "The expected form of Japanese kanji characters in an OpenType font are the\nforms specified in JIS X 0213 (which replaces the older standard, JIS X\n0208). In the course of revision of this standard, the expected forms of a\nnumber of kanji characters have changed over time.\n\n\nFonts should target the most recent revision of the standard (currently the\n2004 revision). However, features may be used to access forms specified in\nearlier revisions. If the `jp04` feature is applied, kanji should be\nreplaced by variant forms representing those specified in the 2004 revision\nof the standard. As 2004 is the current revision, this feature should only\nbe implemented when providing updates to older fonts or to provide remappings\nfor glyphs where both older and newer forms are encoded in Unicode and provided\nin the font (for example, `sub uni5516 by uni555E;`).\n\n\nA historical comparison between different character forms in JIS revisions\ncan be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).\n",
    "done": true,
    "ui": 'In the Mac OS X typography panel, this feature is accessed via the "character\nshape" radio buttons.\n\nIn Adobe InDesign with CJK functionality, this feature can be accessed via\nthe "Alternate Glyphs" dropdown in the Advanced Character Formats panel of\nthe character style options dialog.\n',
    "state": null,
    "status": null
  },
  "jp78": {
    "title": "JIS78 Forms",
    "registered": "Adobe",
    "description": 'The expected form of Japanese kanji characters in an OpenType font are the\nforms specified in JIS X 0213 (which replaces the older standard, JIS X\n0208). In the course of revision of this standard, the expected forms of a\nnumber of kanji characters have changed over time. For example, between\nthe 1978 and 1983 revisions, the "road" radical (*shinnyō*) changed form\nin some characters, moving from two initial dots to one dot. (This change\nwas reversed in the 2004 revision.)\n\n\nFonts should target the most recent revision of the standard (currently the\n2004 revision). However, features may be used to access forms specified in\nearlier revisions.\n\n\nA historical comparison between different character forms in JIS revisions\ncan be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).\n\n\nIf the `jp78` feature is applied, kanji should be replaced by variant forms\nrepresenting those specified in the 1978 revision of the standard.\n',
    "fea": "feature jp78 {\n  sub uni5049 by uni5049.jp78;\n  sub uni5275 by uni5275.jp78;\n  sub uni8328 by uni8328.jp78;\n  # ...\n} jp83;\n",
    "done": true,
    "example": {
      "font": "Shippori Mincho",
      "text": "偉茨創"
    },
    "ui": 'In the Mac OS X typography panel, this feature is accessed via the "character\nshape" radio buttons.\n\nIn Adobe InDesign with CJK functionality, this feature can be accessed via\nthe "Alternate Glyphs" dropdown in the Advanced Character Formats panel of\nthe character style options dialog.\n',
    "state": null,
    "status": null
  },
  "jp83": {
    "title": "JIS83 Forms",
    "registered": "Adobe",
    "description": 'The expected form of Japanese kanji characters in an OpenType font are the\nforms specified in JIS X 0213 (which replaces the older standard, JIS X\n0208). In the course of revision of this standard, the expected forms of a\nnumber of kanji characters have changed over time. For example, between\nthe 1983 and 1990 revisions, the "eight" radical (*hachigashira*) changed form,\nlosing its top horizontal line.\n\n\nFonts should target the most recent revision of the standard (currently the\n2004 revision). However, features may be used to access forms specified in\nearlier revisions.\n\n\nA historical comparison between different character forms in JIS revisions\ncan be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).\n\n\nIf the `jp83` feature is applied, kanji should be replaced by variant forms\nrepresenting those specified in the 1983 revision of the standard.\n',
    "fea": "feature jp83 {\n  sub uni82A6 by uni82A6.jp83;\n  sub uni9022 by uni9022.jp83;\n  # ...\n} jp83;\n",
    "done": true,
    "example": {
      "font": "Shippori Mincho",
      "text": "逢芦晦"
    },
    "ui": 'In the Mac OS X typography panel, this feature is accessed via the "character\nshape" radio buttons.\n\nIn Adobe InDesign with CJK functionality, this feature can be accessed via\nthe "Alternate Glyphs" dropdown in the Advanced Character Formats panel of\nthe character style options dialog.\n',
    "state": null,
    "status": null
  },
  "jp90": {
    "title": "JIS90 Forms",
    "registered": "Adobe",
    "description": 'The expected form of Japanese kanji characters in an OpenType font are the\nforms specified in JIS X 0213 (which replaces the older standard, JIS X\n0208). In the course of revision of this standard, the expected forms of a\nnumber of kanji characters have changed over time. For example, between\nthe 1983 and 1990 revisions, the "long stride" radical (*innyō*) changed form\nin some characters, losing the upstroke on the third stroke.\n\n\nFonts should target the most recent revision of the standard (currently the\n2004 revision). However, features may be used to access forms specified in\nearlier revisions.\n\n\nA historical comparison between different character forms in JIS revisions\ncan be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).\n\n\nIf the `jp90` feature is applied, kanji should be replaced by variant forms\nrepresenting those specified in the 1990 revision of the standard.\n',
    "fea": "feature jp90 {\n  sub uni853D by uni853D.jp90;\n  sub uni8AB9 by uni8AB9.jp90;\n  sub uni990C by uni990C.jp90;\n  # ...\n} jp90;\n",
    "ui": 'In the Mac OS X typography panel, this feature is accessed via the "character\nshape" radio buttons.\n\nIn Adobe InDesign with CJK functionality, this feature can be accessed via\nthe "Alternate Glyphs" dropdown in the Advanced Character Formats panel of\nthe character style options dialog.\n',
    "done": true,
    "example": {
      "font": "Kiwi Maru",
      "text": "餌誹蔽"
    },
    "state": null,
    "status": null
  },
  "kern": {
    "title": "Kerning",
    "registered": "Microsoft/Adobe",
    "automatic": true,
    "state": "default",
    "group": "Positioning",
    "description": "This feature is one of the two facilities for kerning within OpenType.\nThe original TrueType `kern` *table* in the font implements simple,\nnon-contextual pair-based and class-based kerning, and a pair-based (format 0)\n`kern` table was historically required for kerning to function in applications\nsuch as Microsoft PowerPoint.\n\n\nHowever, modern fonts tend to implement kerning through the use of\nthis feature instead (see [discussion](https://typedrawers.com/discussion/comment/15218)).\nThe standard implementation is to use GPOS 2 pair positioning rules to adjustment\nthe X advance of the first glyph in the pair, although note that when\ngenerating a `kern` feature for right-to-left text, the adjustment is\ngenerally made to both advance *and* placement:\n\n```\npos period parentheses <-30 0 -30 0>;\n```\n\n\nSee also the `vkrn` feature for kerning in vertical settings. Kerning may\nbe disabled based on user preference; for mandatory adjustments, use the\n`dist` feature instead.\n",
    "example": {
      "font": "Vollkorn",
      "text": "AVATAR"
    },
    "ui": 'In the OS X typography panel, this feature is *disabled* via "Text Spacing > No Kerning".',
    "done": true,
    "status": null
  },
  "lfbd": {
    "title": "Left Bounds",
    "registered": "Adobe",
    "status": "deprecated",
    "description": "This feature was intended as part of the implementation of character\nprotrusion (see `opbd`); the idea being that it would be applied to the initial\ncharacter on a line to alter the bounds of that character allowing it to\nprotrude into the right margin. However, this would require an interaction\nbetween the line breaking engine and the shaping engine which has only once\nbeen implemented, in the LuaTeX layout system.\n\nThis feature should therefore be regarded as prematurely specified and\nhence deprecated.\n",
    "done": true,
    "state": null
  },
  "liga": {
    "title": "Standard Ligatures",
    "registered": "Microsoft/Adobe",
    "state": "default",
    "description": "Ligatures provide typographic refinement by replacing multiple glyphs with a\nsingle, ligated form. This feature is used for standard ligatures, which are\nto be applied by default; in Latin text, this is generally sequences such as\n`f f`, `f f l`, `f f`, `f i`, and `f f i`.\n\nLigature code is often automatically generated by the font editor based on\ndetecting sequences of glyph names combined with underscores; note, however,\nthat the common ligature glyph `fi` does *not* contain an underscore.\n",
    "automatic": true,
    "fea": "feature liga {\n  sub f f i by f_f_i;\n  sub f f l by f_f_l;\n  sub f f by f_f;\n  sub f i by fi;\n  sub f l by f_l;\n}\n",
    "example": {
      "font": "EB Garamond",
      "text": "Official"
    },
    "done": true,
    "ui": 'In the OS X typography panel, this feature is *disabled* via "Ligatures >\nCommon Ligatures".\n',
    "status": null
  },
  "ljmo": {
    "title": "Leading Jamo Forms",
    "registered": "Microsoft",
    "group": "Topographical",
    "state": "required",
    "script": {
      "hang": 1
    },
    "description": "The Korean Hangul script is encoded in Unicode in two ways: first, as a series\nof precomposed syllable graphemes (encoded from U+AC00 to U+D7AF); second, as\na series of indivdual, conjoining *jamo*. Korean syllables form a LVT?\n(leading consonant, vowel, optional trailing consonant) pattern; the leading consonant\n(*choseong*) jamo are encoded between U+1100 and U+115F, the vowel (*jungseong*)\njamo are encoded between U+1160 and U+11A7, and the optional trailing consonant\n(*jongseong*) jamo between U+11A8 and U+11FF. (At least in the primary Hangul\nJamo Unicode block; other jamo are encoded in extension blocks.)\n\n\nThe Hangul shaper will first attempt to compose any sequences of conjoining jamo\ninto an encoded form in the precomposed syllable block. But where this is not\nsuccessful - for example, in an Old Korean form which is not encoded in Unicode\nas a precomposed syllable - then the shaper will instead *decompose* any LV\nsyllables to break the syllable into separate L, V, and T? characters, and then\napply the Korean shaping features (`ljmo`, `vjmo`, `tjmo`) to select forms of\nthe jamo which are appropriately positioned and sized to combine into the correct\ngrapheme-image.\n\n\nFor example, the Old Korean syllable ᄒᆞᆯ is not encoded in Unicode as a precomposed\nsyllable, and so must be encoded with the three individual jamo. The Hangul\nshaper applies the `ljmo` feature to the *choseong*, the `vjmo` feature to the\n*jungseong* and the `tjmo` feature to the *jongseong*. The resulting sequence\nproduces a glyph which renders the syllable correctly, with the `vjmo` and\n`tjmo` generally producing zero-width mark glyphs positioned appropriately. An\nalternative to this technique is to use the `ccmp` feature to turn decomposed\njamo into a precomposed glyph.\n\n\nFor further information, see sections 3.12 and 18.6 of the Unicode Standard.\n",
    "done": true,
    "status": null
  },
  "lnum": {
    "automatic": true,
    "state": "discretionary",
    "title": "Lining Figures",
    "registered": "Adobe",
    "description": "This feature substitutes digits for lining forms. Lining figures are\ndesigned to fit in all-capital settings.\n\nIn theory, this feature should not just substitute the default form\nof figures (e.g. `one`, `two`) for lining forms, but also any alternate\nnon-lining forms (such as oldstyle figures) for lining forms. Where\nlining forms are the default, implementing a substitution from oldstyle\nfigures to lining figures is not typographically necessary but will cause\nthe UI of layout programs to display lining figures as an option.\n\nSee also `onum`, `pnum`, `tnum`.\n",
    "fea": "feature lnum {\n  sub one by one.lf;\n  sub two by two.lf;\n  # ...\n} lnum;\n",
    "example": {
      "font": "Baskervville",
      "text": "ABC1234"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Number Case >\nLining Figures". In Adobe applications, selecting "Tabular lining" from the\nOpenType panel will apply this feature and the `tnum` feature, while selecting\n"Proportional lining" will apply this feature and the `pnum` feature.\n\n\nIn CSS, this feature can be accessed through the `font-variant-numeric: lining-nums` property.\n',
    "done": true,
    "status": null
  },
  "locl": {
    "title": "Localized Forms",
    "registered": "Tiro Typeworks",
    "state": "required",
    "group": "Common",
    "order": 0,
    "description": 'This feature allows for localization of glyph forms by making substitutions\nconditional on the script and language selected by the user. Typical uses\nof this feature include:\n\n\n* Substituting Cyrillic glyphs with Bulgarian and Serbian variants.\n\n* In Turkish, Azeri, Kazakh, Tatar and Crimean Tartar, substituting the `i` by\nan `idotaccent` glyph so that when uppercased through case conversion features\nsuch as `smcp`, the dot can be preserved.\n(See [this tutorial](https://glyphsapp.com/learn/localize-your-font-turkish).)\n\n* In Romanian and Moldovan, substituting the `scedilla` (U+015E) with `scommaaccent`.\n\n* Repositioning the ogonek to the center of the glyph in Navajo.\n\n* In Dutch, substituting the j in an `íj` pair with `íj́` (see [thread](https://typedrawers.com/discussion/1294/how-do-you-implement-ijacute-and-ijacute).)\n\n* Substituting the Catalan "punt volat" for `ldot` ([tutorial](https://glyphsapp.com/learn/localize-your-font-catalan-punt-volat))\n\n* In a font which has multiple scripts with different spacing conventions,\n  such as Latin and Urdu, conditionally resizing the advance width of the\n  space character to meet the expectations of the script in use.\n',
    "fea": "feature locl {\n  script latn;\n  language ROM;\n  sub Scedilla by Scommaaccent;\n  sub scedilla by scommaaccent;\n  language MOL;\n  sub Scedilla by Scommaaccent;\n  sub scedilla by scommaaccent;\n  language CAT;\n  sub l' periodcentered' l by ldot;\n  sub L' periodcentered' L by Ldot;\n} locl;\n",
    "done": true,
    "status": null
  },
  "ltra": {
    "title": "Left-to-right alternate forms",
    "registered": "Adobe",
    "group": "Preprocessing",
    "order": 2,
    "description": "This feature - by analogy with the `rtla` feature - is intended for\nright-to-left scripts which can also be expressed in a left-to-right line\nlayout, but which require glyph transformations such as mirroring when\nwritten left-to-right. As detailed in the `ltrm` feature, such scripts\nare extremely rare, and no implementations have been found.\n",
    "done": true,
    "state": null,
    "status": null
  },
  "ltrm": {
    "title": "Left-to-right mirrored forms",
    "registered": "Adobe",
    "group": "Preprocessing",
    "order": 3,
    "description": "This feature - by analogy with the `rtlm` feature - was intended for\nright-to-left scripts which can also be expressed in a left-to-right line\nlayout, but which require glyph transformations such as mirroring when\nwritten left-to-right.\n\n\nSuch scripts are exceptionally rare. Noto Sans Old Hungarian uses this\nfeature to horizontally mirror the glyphs when laying out Old Hungarian\nleft-to-right, although it is disputed that Old Hungarian was ever written\nleft-to-right. The Old South Arabian script is usually written RTL but\ncan also be laid out LTR; but Noto Sans Old South Arabian does not include\nmirroring substitutions. Oh well.\n",
    "done": true,
    "state": null,
    "status": null
  },
  "mark": {
    "title": "Mark Positioning",
    "registered": "Microsoft",
    "group": "Positioning",
    "state": "required",
    "automatic": true,
    "description": "This feature is used to position mark glyphs with respect to their base glyphs.\n\n\nGenerally speaking, this is automatically generated by font editing software\nbased on the positions of anchors in the base and mark glyphs. The editor will\nemit mark-to-base (GPOS4) and mark-to-ligature (GPOS5) rules for this feature.\n",
    "example": {
      "font": "Markazi Text",
      "text": "تَشْكِيل"
    },
    "done": true,
    "status": null
  },
  "med2": {
    "title": "Medial Forms #2",
    "registered": "Microsoft",
    "group": "Topographical",
    "state": "required",
    "script": {
      "syrc": {
        "order": 3
      }
    },
    "description": "This feature is used by the Arabic complex shaper when processing the Syriac\nscript. The Syriac letter alaph (U+0710) is not normally a joining character\nbut can join to the right in the middle of a word if the preceding character\nis right-joining.\n",
    "example": {
      "font": "Noto Sans Syriac",
      "text": "ܒܐܬܪܐ"
    },
    "fea": "feature fin2 {\n  lookupflag RightToLeft IgnoreMarks;\n  sub uni0710 by uni0710.Medi2;\n  } fin2;\n",
    "done": true,
    "status": null
  },
  "medi": {
    "title": "Medial Forms",
    "registered": "Microsoft/Adobe",
    "group": "Topographical",
    "state": "required",
    "script": {
      "arab": {
        "order": 0
      },
      "syrc": {
        "order": 0
      },
      "USE": {
        "order": 0
      }
    },
    "description": "This feature is used by the Arabic and USE complex shapers as part of topographic\nshaping. It is *not* appropriate for general middle-of-word detection, but is\ndesigned to replace joining characters with medial forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n",
    "example": {
      "font": "Aref Ruqaa",
      "text": "جسر"
    },
    "automatic": true,
    "fea": "feature medi {\n  lookupflag RightToLeft IgnoreMarks;\n  sub beh-ar by beh-ar.medi;\n  sub jeem-ar by jeem-ar.medi;\n  # ...\n}\n",
    "done": true,
    "status": null
  },
  "mgrk": {
    "title": "Mathematical Greek",
    "registered": "Adobe",
    "state": "discretionary",
    "description": "This feature replaces Greek glyphs with mathematical symbols: for example,\n`Sigma` is replaced by the `summation` glyph.\n",
    "fea": "feature mgrk {\n  sub uni0394 by uni2206;\n  sub Pi by product;\n  sub Sigma by summation;\n  sub uni03A9 by uni2126;\n  sub uni03BC by uni00B5;\n  sub phi by uni03D5;\n} mgrk;\n",
    "ui": 'In the OS X typography panel, this feature is accessed via "Mathematical Extras\n-> Mathematical Greek Letter Forms".\n',
    "example": {
      "font": "Vollkorn",
      "text": "φ(n)=Σ Δn"
    },
    "done": true,
    "status": null
  },
  "mkmk": {
    "title": "Mark-to-Mark Positioning",
    "registered": "Microsoft",
    "group": "Positioning",
    "state": "required",
    "automatic": true,
    "description": 'This feature is used to position mark glyphs with respect to other mark glyphs.\nThis can be used for example to position arbitrary combinations of marks used\nin scholarly transliteration systems, as well as positioning\nArabic secondary marks relative to primary marks, such as *fathah* over *shadda*\nand vice versa.\n\n\nGenerally speaking, this is automatically generated by font editing software\nbased on the positions of anchors in the mark glyphs, if the mark glyphs have\nboth a "mark anchor" (e.g. `_bottom`) *and* an "attachment anchor" (`bottom`).\nThe editor will then emit mark-to-mark (GPOS6) rules for this feature.\n',
    "example": {
      "font": "Work Sans",
      "text": "é̤̤̱̃̃"
    },
    "done": true,
    "status": null
  },
  "mset": {
    "status": "deprecated",
    "group": "Typographic",
    "title": "Mark Positioning via substitution",
    "script": {
      "arab": {
        "order": 4
      }
    },
    "registered": "Microsoft",
    "description": "This feature is used by the Arabic shaping as the final phase of the typographic\nshaping group. It was intended for substitutions which combine marks and bases\ninto precomposed forms as an alternative to using positioning rules in the `mark`\nfeature; however, it is possible to use *substitution* rules in the `mark`\nfeature, making the `mset` feature redundant.\n\nIt was used in Microsoft's Windows 95 Arabic fonts, and practically no other font.\nNew fonts should use `mark`, `ccmp`, `rlig` or other features instead.\n",
    "done": true,
    "state": null
  },
  "nalt": {
    "state": "discretionary",
    "title": "Alternate Annotation Forms",
    "registered": "Adobe",
    "description": 'This feature replaces glyphs with "notational" forms - glyphs in boxes,\ncircles, etc. It is often used in CJK fonts to access characters in the Unicode\n"Enclosed CJK Letters and Months" block (for example, `sub uni3131 by uni3200;`),\nbut may also be used to access other enclosed forms (`sub one by uni2460;`).\n\n\nNote that although the OT Specification describes this as implementable via\nalternate substitution lookups, no interface supports this, and single substitutions\nshould be used instead.\n',
    "ui": "No user interface to this feature has been found.\n",
    "done": true,
    "example": {
      "font": "Work Sans",
      "text": 12345
    },
    "status": null
  },
  "nlck": {
    "title": "NLC Kanji Forms",
    "registered": "Adobe",
    "description": 'In 2000, the Japanese National Language Council (now the Japanese language\ndivision of the Agency for Cultural Affairs) prescribed new glyph forms for\nJapanese kanji. In particular, the shape of the "father" and "long stride"\n(*innyo*) radicals changed to remove a small stroke.\n\n\nThe expected substitutions of the `nlck` feature are defined in terms of the\n[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) glyphset.\nEngineers creating Japanese fonts according to that glyphset should read the\ninformation at the Adobe-Japan1 repository, and use the latest version of the\nfeature code provided there to implement this feature.\n',
    "example": {
      "text": "咬廻挺爺",
      "font": "Shippori Mincho"
    },
    "done": true,
    "state": null,
    "status": null
  },
  "nukt": {
    "group": "Preprocessing",
    "state": "required",
    "script": {
      "INDIC": {
        "order": 1
      },
      "USE": {
        "order": 0
      }
    },
    "title": "Nukta Forms",
    "description": "This feature is used to replace `consonant + nukta` with a precombined nukta\nform glyph in Indic and USE scripts. It is called during the preprocessing\ngroup - after initial reordering in Indic scripts, but before processing in the\nUSE.\n\n\nWhile nukta marks may be positioned using the normal mark positioning functionality\n(`mark`), the font designer may choose to create specific precomposed nukta glyphs,\neither for ease of positioning or to facilitate later lookups.\n",
    "fea": "feature nukt {\n  sub ka-deva   nukta-deva by ka-deva.nukt;\n  sub kha-deva  nukta-deva by kha-deva.nukt;\n  sub ga-deva   nukta-deva by ga-deva.nukt;\n  sub ja-deva   nukta-deva by ja-deva.nukt;\n  sub dda-deva  nukta-deva by dda-deva.nukt;\n  sub ddha-deva nukta-deva by ddha-deva.nukt;\n  sub pha-deva  nukta-deva by pha-deva.nukt;\n  sub ra-deva   nukta-deva by ra-deva.nukt;\n} nukt;\n",
    "done": true,
    "status": null
  },
  "numr": {
    "title": "Numerators",
    "automatic": true,
    "state": "discretionary",
    "status": "deprecated",
    "registered": "Adobe",
    "description": 'This deprecated feature replaces numeric glyphs with numerator forms. See also `dnom`.\n\nNote that, despite the description of this feature in the OpenType specification,\nthe application of the `frac` feature is independent of this feature. It was\noriginally intended that applying the `frac` feature would "trigger" the\napplication of the `numr` feature for glyphs before the division slash and\nthe `dnom` feature for glyphs after it. This behavior was never implemented in\nOpenType shaping, and instead contextual rules are used within the `frac` feature\nto choose appropriate glyphs for numerator and denominator.\n\nNew fonts should use the `frac` feature in preference to this feature.\n',
    "done": true
  },
  "onum": {
    "automatic": true,
    "state": "discretionary",
    "title": "Oldstyle Figures",
    "registered": "Adobe",
    "description": "This feature substitutes digits for oldstyle forms. Oldstyle figures are\ndesigned to fit in mixed case text settings.\n\nIn theory, this feature should not just substitute the default form\nof figures (e.g. `one`, `two`) for oldstyle forms, but also any alternate\nlining forms (such as lining figures) for oldstyle forms. Where\noldstyle forms are the default, implementing a substitution from lining\nfigures to oldstyle figures is not typographically necessary but will cause\nthe UI of layout programs to display oldstyle figures as an option.\n\nSee also `onum`, `pnum`, `tnum`.\n",
    "fea": "feature lnum {\n  sub one by one.osf;\n  sub two by two.osf;\n  # ...\n} lnum;\n",
    "example": {
      "font": "Cardo",
      "text": "ABC1234"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Number Case >\nOld-Style Figures". In Adobe applications, selecting "Tabular oldstyle" from the\nOpenType panel will apply this feature and the `tnum` feature, while selecting\n"Proportional oldstyle" will apply this feature and the `pnum` feature.\n\n\nIn CSS, this feature can be accessed through the `font-variant-numeric: oldstyle-nums` property.\n',
    "done": true,
    "status": null
  },
  "opbd": {
    "title": "Optical Bounds",
    "registered": "Adobe",
    "status": "deprecated",
    "description": 'This feature was intended for implementing what TeX users call "character\nprotrusion" or "margin kerning": improving the fit of lines in a paragraph by\naltering the apparent advance width or positioning of certain characters\nbased on their optical edges rather than bounding boxes.\n\n\nConsider, for example, a serif letter D appearing at the beginning of a line.\nBy altering the positioning of the glyph, the serifs can be protruded outside\nthe margin so that the stem aligns with the left edge of the text, to give a\nmore visually "tight" justification.\n\n\nThis feature was originally intended to automatically "call" the `lfbd` and\n`rtbd` features to achieve margin kerning; however, the OpenType feature\nmodel did not develop as planned, and so this feature was never implemented.\n',
    "done": true,
    "state": null
  },
  "ordn": {
    "title": "Ordinals",
    "registered": "Adobe",
    "state": "discretionary",
    "description": 'In some languages, alphabetic glyphs are used to abbreviate ordinal numerals.\nFor example, in Italian, the word for "second" is written 2º when referring\nto a gramatically masculine noun and 2ª when referring to a gramatically\nfeminine noun. While this can be encoded with the Unicode FEMININE ORDINAL INDICATOR\n(U+00AA) and MASCULINE ORDINAL INDICATOR (U+00BA) codepoints as in this\nparagraph, it is more common to use the standard Latin `a` and `o` characters\nand use a font feature to form the ordinal indicators.\n\nAdditionally, the numero sign (№, U+2116) is more commonly written with the\nLatin sequence `No.`. This feature is applied to convert it to the numero\nglyph.\n\nSome fonts also use this feature to place other Latin glyphs in "ordinal\nposition".\n',
    "fea": "feature ordn {\n  sub @numeral [A a] by ordfeminine;\n  sub @numeral [o o] by ordmasculine;\n\n  sub N o period by numero;\n} ordn;\n",
    "example": {
      "font": "Alegreya Sans",
      "text": "No. 2a"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Vertical Position\n> Ordinals".\n',
    "done": true,
    "status": null
  },
  "ornm": {
    "title": "Ornaments",
    "description": "This feature has two uses, both of which are used to select ornament glyphs\nfrom within the font's glyphset.\n\n\nIn the first use, all ornamental glyphs (fleurons, manicules, dingbats and\nso on) are made available through a GSUB3 alternate substitution from the\nbullet character (U+2022).\n\n\nIn the second use, ASCII characters are substituted for ornamental forms using\na GSUB1 substitution.\n",
    "registered": "Adobe",
    "state": "discretionary",
    "fea": "feature ornm {\n  sub bullet from @ornaments;\n\n\n  sub less by arrowleft;\n  sub greater by arrowright;\n  sub plus by arrowup;\n  # ...\n} ornm;\n",
    "example": {
      "font": "Spectral",
      "text": "+×=<>"
    },
    "done": true,
    "status": null
  },
  "palt": {
    "title": "Proportional Alternate Widths",
    "automatic": true,
    "state": "discretionary",
    "registered": "Adobe",
    "description": "This feature is similar to the `pwid` feature, but instead of replaces full-width\nglyphs with proportional equivalents, it re-spaces the glyphs using positioning\nrules.\n",
    "fea": "feature palt {\n  pos uniFF41 <-186 0 -373 0>;\n  pos uniFF42 <-148 0 -346 0>;\n  pos uniFF43 <-220 0 -441 0>;\n  pos uniFF44 <-176 0 -353 0>;\n  # ...\n} palt;\n",
    "example": {
      "font": "Shippori Mincho",
      "text": "かａｂｃか"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Text spacing > Alternative Proportional Widths".',
    "done": true,
    "status": null
  },
  "pcap": {
    "title": "Petite Capitals",
    "registered": "Tiro Typeworks / Emigre",
    "state": "discretionary",
    "automatic": true,
    "description": 'Substitutes lowercase characters for petite capitals. Petite capitals are an additional set of capital letters found in some founds which are smaller than the "small caps" set, designed to harmonize better with the lowercase letters. (See, for example, [Mrs Eaves](https://fonts.adobe.com/fonts/mrs-eaves) and [Filosophia](https://fonts.adobe.com/fonts/filosofia).)\n\nCompare with `c2pc`, which substitutes uppercase letters for petite capitals.\n\nNote that as this feature changes the case of the glyph, font engineers should ensure that any language-specific localisations are taken into account during case conversion - for example, when applying this feature to the letter `i` in Turkish, the returned form should appear with a dot above. (This is often achieved by replacing i with `idotless dotaccent` or similar in the `locl` feature.)\n',
    "fea": "feature pcap {\n  sub a by A.pc;\n  sub b by B.pc;\n  # ...\n} pcap;\n",
    "example": {
      "font": "EB Garamond",
      "text": "This"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Lowercase ->\nPetite Capitals."\n\n\nIn CSS, this feature can be set with `font-variant-caps: petite-caps;`\n',
    "done": true,
    "status": null
  },
  "pkna": {
    "title": "Proportional Kana",
    "registered": "Adobe",
    "state": "discretionary",
    "description": "Japanese characters are usually typeset on a fix-width em square grid. However,\nfor display purposes, it may be preferable to set the glyphs proportionally.\nThis feature either replaces the kana glyphs with alternate glyphs with reduced\nsidebearings, or uses positioning rules to achieve the same effect. See also\n`pwid`.\n",
    "fea": "feature pkna {\n  sub ka-hira by ka-hira.pkna;\n  sub ki-hira by ki-hira.pkna;\n  # ...\n} pkna;\n\n# OR\n\nfeature pkna {\n  pos ka-hira <-75 0 -75 0>;\n  pos ki-hira <-15 0 -35 0>;\n  # ...\n} pkna;\n",
    "example": {
      "font": "Feature Sans",
      "text": "かりかり"
    },
    "done": true,
    "status": null
  },
  "pnum": {
    "title": "Proportional Figures",
    "registered": "Microsoft/Adobe",
    "automatic": true,
    "description": "This feature replaces tabular (fixed-width) figures by proportional variants.\nSee also the `onum`, `lnum` and `tnum` features. Note that where the default\nform is proportional, this feature has no effect, although some font editors\nprovide rules for this feature in any case.\n",
    "fea": "feature pnum {\n  sub one.tf by one;\n  sub two.tf by two;\n  sub three.tf by three;\n  #...\n} pnum;\n",
    "done": true,
    "ui": 'In the OS X typography panel, this feature is accessed via "Number Spacing >\nProportional Numbers".\n\n\nIn CSS, this feature can be accessed through the `font-variant-numeric: proportional-nums` property.\n',
    "state": null,
    "status": null
  },
  "pref": {
    "title": "Pre-base Forms",
    "registered": "Microsoft",
    "group": "Orthographic",
    "script": {
      "INDIC": {
        "order": 2
      },
      "USE": {
        "order": 2
      },
      "mym2": {
        "order": 1
      },
      "khmer": {
        "order": 0
      }
    },
    "state": "required",
    "description": 'This feature is intended to form pre-base ligatures. In the Indic shaper, its\napplication is scoped to\nthe virama-consonant pair ordered before the base consonant. It is most often\nused in Khmer fonts to replace the `coeng ro` sequence with a pre-base form\nof the ra (see also `cfar`), or as a generic orthographic feature in Myanmar (Burmese).\n\n\nNote that in the Indic shaper, this feature is also used as a "signal" to the shaping engine for reordering\npurposes: that is, if a virama-consonant pair would be substituted by this feature,\nthen that consonant is placed in the *post*-base position when the syllable is reordered.\n(Note: not the pre-base position, as one might expect!)\n',
    "fea": "feature pref {\n  sub coeng-khmer ro-khmer by coeng-ro;\n\n  # This could alternately be in cfar\n  sub coeng-ro @consonant @subjoined by coeng-ro.longer;\n}\n",
    "done": true,
    "status": null
  },
  "pres": {
    "title": "Pre-base Substitutions",
    "registered": "Microsoft",
    "state": "required",
    "group": "Typographic",
    "script": {
      "INDIC": {
        "order": 0
      },
      "khmr": {
        "order": 0
      },
      "USE": {
        "order": 0
      },
      "mym2": {
        "order": 0
      }
    },
    "description": "This feature is used in Indic, Khmer, Myanmar and USE scripts to form pre-base\nconjunct ligatures. For example, in Devanagari or Gujarati, the sequence\n`ka + virama + consonant` is first substituted by the half form `k + consonant`\nin the `half` feature, but then is further ligated to a conjunct form in this\nfeature.\n\n\nThe feature may also be used for other presentational adjustments\nconcerning pre-base forms, such as selecting the correct width of the i-matra.\n",
    "fea": "feature pres {\n    sub k-deva ka-deva by kka-deva;\n    sub k-deva kha-deva by kkha-deva;\n    # ...\n    sub g-deva ga-deva by gga-deva;\n    # ...\n    sub iMatra-deva' @width1 by iMatra-deva.1;\n    sub iMatra-deva' @width2 by iMatra-deva.2;\n    # ...\n} pres;\n",
    "example": {
      "font": "Hind",
      "text": "त्ति"
    },
    "done": true,
    "status": null
  },
  "pstf": {
    "title": "Post-base Forms",
    "registered": "Microsoft",
    "group": "Orthographic",
    "script": {
      "INDIC": {
        "order": 6
      },
      "USE": {
        "order": 3
      },
      "mym2": {
        "order": 3
      },
      "khmer": {
        "order": 0
      }
    },
    "state": "required",
    "description": 'This feature is intended to replace glyphs by their post-base forms. For example,\nin Bengali and Gurmukhi, the ya consonant has a post-base form when followed\nby a virama.\n\nNote that in the Indic shaper, this feature is also used as a "signal" to the shaping engine for reordering\npurposes: that is, if a virama-consonant pair would be substituted by this feature,\nthen that consonant is placed in the post-base position when the syllable is reordered.\n',
    "fea": "feature pstf {\n    sub viramabeng yabeng by yabeng_viramabeng.pstf;\n} pstf;\n",
    "example": {
      "font": "Lohit Bengali",
      "text": "ব্য্"
    },
    "done": true,
    "status": null
  },
  "psts": {
    "title": "Post-base Substitutions",
    "registered": "Microsoft",
    "state": "required",
    "group": "Typographic",
    "script": {
      "INDIC": {
        "order": 0
      },
      "khmr": {
        "order": 0
      },
      "USE": {
        "order": 0
      },
      "mym2": {
        "order": 0
      }
    },
    "description": "This feature is intended to replace base + post-base sequences with a ligature\nglyph. It can also be used to perform any contextual post-base substitution\nrequired (for example, in Devanagari or Bengali, replacing the ii-matra (ी)\nwith appropriate width glyphs to point to the stem of the consonant).\n",
    "fea": "feature psts {\n  sub ka-javanese cakra by ka_cakra;\n  sub ta-javanese cakra by ta_cakra;\n  # ...\n} psts;\n",
    "example": {
      "font": "Noto Sans Javanese",
      "text": "ꦏꦿꦛꦿ"
    },
    "done": true,
    "status": null
  },
  "pwid": {
    "title": "Proportional Widths",
    "automatic": true,
    "state": "discretionary",
    "registered": "Adobe",
    "description": "This feature replaces glyphs (normally figures and punctuation) sized to\nthe em-square with variants which are proportionally spaced. This is generally\nused with CJK fonts. It is the opposite of the `fwid` feature.\n",
    "fea": "feature pwid {\n  sub uniFF11 by one;\n  sub uniFF12 by two;\n  # ...\n  sub uniFF41 by a;\n  sub uniFF42 by b;\n  # ...\n} pwid;\n",
    "example": {
      "font": "Kiwi Maru",
      "text": "かａｂｃか"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Text spacing > Proportional Widths".',
    "done": true,
    "status": null
  },
  "qwid": {
    "title": "Quarter Widths",
    "automatic": true,
    "state": "discretionary",
    "registered": "Adobe",
    "description": "This feature replaces glyphs (normally figures and punctuation) with variants\nwhich are one-quarter of the em square. This is generally used with CJK fonts\nand in the context of vertical typesetting. (For placing a sequence of four\nnumbers horizontally across an em-width vertical column.)\n\nSee also `fwid`, `hwid`, `twid`.\n",
    "fea": "feature qwid {\n  sub one by one.qwid;\n  sub two by two.qwid;\n  # ...\n}\n",
    "example": {
      "font": "Feature Sans",
      "text": "か1231か"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Text spacing > Quarter Width".',
    "done": true,
    "status": null
  },
  "rand": {
    "title": "Randomize",
    "registered": "Adobe",
    "state": "default",
    "description": "The randomize feature, which is *currently only implemented in the Harfbuzz shaping engine*,\nallows font designers to randomly replace glyphs with variants from a selection,\nusing a GSUB3 alternate substitution. This can be useful for handwriting or\ndisplay style fonts. This feature is applied by default (at least in Harfbuzz),\nand there is no user interface to disabling it; use tastefully.\n\n\nNote that because of the limited implementation of this feature, it is still\nrecommended to use one of the other deterministic alternate selection strategies\ndescribed in the [OpenType Cookbook](http://opentypecookbook.com/common-techniques/#randomization)\nin a `calt` feature. Also note that to avoid problems with reflowing text,\nthe Harfbuzz shaping engine applies the same random seed to each shaping run.\nThis means that while the glyphs within a run are chosen (pseudo)randomly, the\nresults will be consistent each time the same text is shaped.\n",
    "fea": "feature rand {\n  # But you probably want to use one of the OpenType Cookbook recipes\n  # in a calt feature instead\n  sub A from [A a.rand1 A.rand2 A.rand3];\n} rand;\n",
    "example": {
      "font": "Feature Sans",
      "text": "AAAA"
    },
    "done": true,
    "status": null
  },
  "rclt": {
    "group": "Typographic",
    "state": "required",
    "script": {
      "arab": {
        "order": 2
      },
      "syrc": {
        "order": 2
      }
    },
    "title": "Required Contextual Alternates",
    "registered": "Microsoft",
    "description": "This feature is intended for required contextual alternates (contextual\nalternates which should not be subject to user control). Note that in the\nArabic shaper it is processed early in the typographic presentation phase;\nin other shapers, it is processed along with the common feature group.\n\n\nIn the example, Reem Kufi uses the `rclt` feature to swap repeated *beh*\nglyphs for glyphs with raised teeth.\n",
    "fea": "feature rclt {\n  lookupflag IgnoreMarks;\n    sub [behDotless-ar.init behDotless-ar.medi]\n         behDotless-ar.medi'\n        [behDotless-ar.medi behDotless-ar.fina]\n     by  behDotless-ar.medi.high;\n    sub [seen-ar.init seen-ar.medi]\n         behDotless-ar.medi'\n     by  behDotless-ar.medi.high;\n    sub  behDotless-ar.init\n         behDotless-ar.medi'\n         noonghunna-ar.fina\n     by  behDotless-ar.medi.high;\n} rclt;\n",
    "example": {
      "font": "Reem Kufi",
      "text": "ببببب"
    },
    "done": true,
    "status": null
  },
  "rkrf": {
    "title": "Rakar Forms",
    "registered": "Microsoft",
    "group": "Orthographic",
    "script": {
      "INDIC": {
        "order": 2
      },
      "USE": {
        "order": 3
      }
    },
    "state": "required",
    "description": 'This feature is used in the Indic and USE complex shapers to replace\nconsonant clusters involving "ra" with conjunct forms. For example, in Devanagari,\nthe sequence `ka virama ra` should be replaced by the conjunct form `kra`.\nWhile this substitution was previously achieved in the v1 shaper by the combination\nof the `bwlf` and `vatu` features, the v2 shaper allows for a simpler way to\nsubstitute the entire sequence.\n\n\nThe `half` feature is processed after this feature, so any conjuncts created\nin `rkrf` must also be included in the half-form rules in `half`.\n',
    "fea": "sub rkrf {\n    sub ka-deva   virama-deva ra-deva by   kra-deva;\n    sub kha-deva  virama-deva ra-deva by  khra-deva;\n    sub ga-deva   virama-deva ra-deva by   gra-deva;\n    # ...\n} rkrf;\n",
    "done": true,
    "status": null
  },
  "rlig": {
    "group": "Typographic",
    "state": "required",
    "script": {
      "arab": {
        "order": 1
      },
      "syrc": {
        "order": 1
      }
    },
    "title": "Required Ligatures",
    "registered": "Microsoft",
    "description": "This feature is intended for required ligatures (ligatures which should not\nbe subject to user control). Note that in the Arabic shaper it is processed\nearly in the typographic presentation phase; in other shapers, it is processed\nalong with the common feature group.\n",
    "fea": "feature rlig {\n  lookupflag IgnoreMarks RightToLeft;\n  sub lam-ar.init alef-ar.fina by lam_alef-ar;\n  sub lam-ar.medi alef-ar.fina by lam_alef-ar.fina;\n  sub lam-ar.init alefHamzaabove-ar.fina by lam_alefHamzaabove-ar;\n  sub lam-ar.medi alefHamzaabove-ar.fina by lam_alefHamzaabove-ar.fina;\n  sub lam-ar.init alefHamzabelow-ar.fina by lam_alefHamzabelow-ar;\n  sub lam-ar.medi alefHamzabelow-ar.fina by lam_alefHamzabelow-ar.fina;\n  sub lam-ar.init alefMadda-ar.fina by lam_alefMadda-ar;\n  sub lam-ar.medi alefMadda-ar.fina by lam_alefMadda-ar.fina;\n  sub lam-ar.init alefWasla-ar.fina by lam_alefWasla-ar;\n  sub lam-ar.medi alefWasla-ar.fina by lam_alefWasla-ar.fina;\n} rlig;\n",
    "example": {
      "font": "El Messiri",
      "text": "لا"
    },
    "done": true,
    "status": null
  },
  "rphf": {
    "title": "Reph Form",
    "registered": "Microsoft",
    "group": "Orthographic",
    "script": {
      "INDIC": {
        "order": 8
      },
      "USE": {
        "order": 0
      },
      "mym2": {
        "order": 0
      }
    },
    "state": "required",
    "description": 'This feature replaces consonant+virama with the reph form of the consonant.\nIn Devanagari, non-final ra+virama should be substituted by reph. The context\nof application is restricted to a syllabic cluster.\n\n\nNote that in the Universal Shaping Engine, this feature is also used as a\n"signal" to the shaping engine for reordering purposes: after this feature\nhas been processed, any glyphs substituted in by this feature are considered\nto have USE category `R`.\n',
    "fea": "feature rphf {\n  sub ra-deva halant-deva by reph-deva;\n} rphf;\n",
    "done": true,
    "status": null
  },
  "rtbd": {
    "title": "Right Bounds",
    "registered": "Adobe",
    "status": "deprecated",
    "description": "This feature was intended as part of the implementation of character\nprotrusion (see `opbd`); the idea being that it would be applied to the final\ncharacter on a line to alter the bounds of that character allowing it to\nprotrude into the right margin. However, this would require an interaction\nbetween the line breaking engine and the shaping engine which has only once\nbeen implemented, in the LuaTeX layout system.\n\n\nThis feature should therefore be regarded as prematurely specified and\nhence deprecated.\n",
    "done": true,
    "state": null
  },
  "rtla": {
    "title": "Right-to-left alternates",
    "registered": "Adobe",
    "state": "required",
    "group": "Preprocessing",
    "order": 2,
    "description": "This feature is applied to right-to-left texts as part of the glyph preprocessing\nstage. It is intended for substituting variants which are appropriate for\nright-to-left text, but which are not mirrored substitutions. (Mirrored forms\nof glyphs should be handled by the `rtlm` feature.)\n\n\nNo examples of this feature being used as described have been found; Noto\nSans Tifinagh uses the feature to mirror glyphs when Tifinagh is being set\nright-to-left (e.g. when used to write Tuareg).\n",
    "done": true,
    "example": {
      "font": "Noto Sans Tifinagh",
      "text": "ⵎⵉⴷⴷⵏ"
    },
    "status": null
  },
  "rtlm": {
    "title": "Right-to-left mirrored forms",
    "registered": "Adobe",
    "group": "Preprocessing",
    "order": 3,
    "state": "required",
    "description": "When a bidirectional text is being laid out, any characters which have the\n`Bidi_Mirrored` Unicode property and whose directionality is resolved to RTL\nwill be replaced by their mirrored equivalents. This mirroring is specified\nby the [Unicode Bidirectional Algorithm](https://unicode.org/reports/tr9/#L4),\nand is performed by the layout engine prior to shaping.\n\n\nHowever, a font may contain mirrored glyphs for characters which do *not* have\nthe `Bidi_Mirrored` property (and thus are not handled by the Unicode bidirectional\nalgorithm), but which are required to be mirrored when displayed in right-to-left settings.\nFor example, mathematical characters such as the square root sign (√) and\nintergral sign (∫) do not have mirrored forms encoded in Unicode, but should be\nmirrored in right-to-left text.\n",
    "done": true,
    "example": {
      "font": "Noto Sans Math",
      "text": "∫√x"
    },
    "status": null
  },
  "ruby": {
    "title": "Ruby Notation Forms",
    "registered": "Adobe",
    "description": "In Japanese typesetting, words written in kanji may be superscripted by\nthe kana transliteration of the words to aid with reading. (In vertical\nsettings, the transliteration is placed to the right.) These subscripted\nkana, called *furigana* or ruby, are scaled down to a reduced size relative\nto the main text. Scaling and positioning is applied by the typesetting\nengine, but the font may wish to provide alternate forms of the kana\nwhen they are being used in a ruby context - for example, slightly bolder\nforms such that they will maintain the correct weight when scaled down to\nruby size, or different forms that are more legible when displayed at a\nsmaller size.\n",
    "fea": "feature ruby {\n  sub ka-hira by ka-hira.ruby;\n  sub sa-hira by sa-hira.ruby;\n  # ...\n} ruby;\n",
    "done": true,
    "ui": 'In the OS X typography panel, this feature is accessed via "Ruby Glyphs".\n',
    "state": null,
    "status": null
  },
  "rvrn": {
    "title": "Required Variation Alternates",
    "group": "Preprocessing",
    "order": 0,
    "registered": "Microsoft",
    "state": "required",
    "description": 'OpenType Font Variations provides for the ability for different features to\napply at different point of the variation space. For example, consider a\nfont with a weight axis - when the weight is greater than 600, the designer\nwants the `dollar` glyph to be substituted for a simplified form to avoid\ncrowding the internal counterspace. This facility is called "feature variation",\nand because it is implemented by substitution, it allows for different portions\nof the variation space to represent the same character using different glyphs\nand therefore different outlines; this in turn means that designers can implement\nvariations without being forced to make the outlines compatible between\ndramatically different forms.\n\n\nAccording to the OpenType specification, feature variation can be applied to\n*any* feature. However, Microsoft registered the `rvrn` feature specifically\nfor processing feature variations early in the shaping process. This may not\nturn out to be the best approach, as future rules now need to take into account\nnot just the original glyph but any substitutions; it may be better to perform\ndesign-specific substitutions *after* all orthographic substitutions have between\ncompleted.\n\n\nBoth Harfbuzz and CoreText process feature variations in features other than\nthe `rvrn` feature. I have not been able to ascertain whether or not the Microsoft\nshapers process feature variation tables in other features. If they do - and\nif font creation tools allow for creating feature variation tables in other\nfeatures - then this feature could be considered technically redundant.\n',
    "done": true,
    "status": null
  },
  "salt": {
    "title": "Stylistic Alternates",
    "registered": "Adobe",
    "state": "discretionary",
    "status": "discouraged",
    "automatic": true,
    "description": "Prior to the introduction of multiple stylistic sets (see the `ss01` feature),\nthis feature was used to select alternate aesthetic forms of glyphs which do\nnot correspond to the descriptions of other features. Currently, this feature\nis generally implemented by font editors either by replicating the rules of `ss01`\nor by combining *all* stylistic alternate substitutions.\n\n\nStylistic sets (`ss01`...`ss20`) should be used in current fonts in preference\nto this feature, as UI support for the `salt` feature is not always available.\n",
    "done": true
  },
  "sinf": {
    "title": "Scientific Inferiors",
    "registered": "Microsoft/Adobe",
    "state": "discretionary",
    "automatic": true,
    "description": "This feature replaces glyphs with subscript forms, similar to the `subs` feature,\nbut in theory for a wider range of glyphs (including Latin letters),\ngenerally for chemical or mathematical notation.\n\n\nAlso, in theory, subscript numerals should sit on the baseline, while scientific\ninferiors should bisect the baseline\n\nIn practice, the same substitutions are often made as those in the `subs` feature.\n",
    "example": {
      "font": "Alegreya",
      "text": "H2O"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Vertical Position > Scientific Inferiors".',
    "done": true,
    "status": null
  },
  "size": {
    "status": "deprecated",
    "registered": "Adobe",
    "title": "Optical size",
    "description": "This feature was intended as a way to store information about the optical size of the font\nand the font's relationship to other optical size variants in the same family. It has\nbeen entirely superseded by the `STAT` table, and should not be used.\n",
    "done": true,
    "state": null
  },
  "smcp": {
    "title": "Small Capitals",
    "registered": "Adobe",
    "state": "discretionary",
    "automatic": true,
    "description": "Substitutes lowercase characters for small capitals. Small capitals are often used to set acronyms. Compare with `c2sc`, which substitutes uppercase letters for small capitals.\n\nNote that as this feature changes the case of the glyph, font engineers should ensure that any language-specific localisations are taken into account during case conversion - for example, when applying this feature to the letter `i` in Turkish, the returned form should appear with a dot above. (This is often achieved by replacing i with `idotless dotaccent` or similar in the `locl` feature.)\n",
    "fea": "feature smcp {\n  sub a by A.sc;\n  sub b by B.sc;\n  # ...\n} smcp;\n",
    "example": {
      "font": "EB Garamond",
      "text": "This"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Lowercase ->\nSmall Capitals."\n\n\nIn CSS, this feature can be set with `font-variant-caps: small-caps;`\n',
    "done": true,
    "status": null
  },
  "smpl": {
    "title": "Simplified Forms",
    "registered": "Adobe",
    "description": "This feature was intended for converting Chinese or Japanese glyphs to simplified forms.\nNo fonts implementing this feature have been identified and it is not\nspecified in the Adobe Japan1 glyph set. As with the `hngl` feature,\ncharacter semantics should be selected using the input method environment,\nrather than the font, and hence this feature is discouraged.\n",
    "status": "discouraged",
    "done": true,
    "state": null
  },
  "ss01": {
    "title": "Stylistic Set 1 - Stylistic Set 20",
    "registered": "Tiro Typeworks",
    "state": "discretionary",
    "automatic": true,
    "description": "These features - ranging from `ss01` to `ss20` - allow for stylistic variations\nof *sets* of characters to vary in a common way. This is distinct from the\n`cv01`-`cv99` features which allow characters to vary arbitrarily with no\nimplication of any common variations across a range of glyphs.\n\n\nFor example, in the font Cormorant, stylistic set 01 changes the terminals\nof capital letters; stylistic set 02 opens the counters of glyphs with\ncounters; stylistic set 03 replaces double-storey glyphs (`g`, `a`) with\nsingle-storey forms, and so on.\n\n\nWhen this feature is coded manually, stylistic sets may be given\nidentifying names to be displayed in the user interface. See the\n[Adobe feature file specification](http://adobe-type-tools.github.io/afdko/OpenTypeFeatureFileSpecification.html#8.c)\nfor the format of these names.\n\n\nThese features are an extension to (and repacement for) the `salt` feature,\nwhich only provides access to a single stylistic set.\n",
    "fea": 'feature ss01 {\n  featureNames {\n    name "Alternate terminals";\n  }\n  sub A by A.ss01;\n  sub B by A.ss01;\n} ss01;\n',
    "example": {
      "font": "Cormorant",
      "text": "QUACK"
    },
    "done": true,
    "ui": 'In the OS X typography panel, this feature is accessed via "Alternative Stylistic Sets".',
    "status": null
  },
  "ssty": {
    "title": "Math script style alternates",
    "registered": "Microsoft",
    "script": {
      "math": null
    },
    "example": {
      "math": "<msup> <mi>x</mi> <msup> <mi> x </mi> <mi>x</mi> </msup> </msup>"
    },
    "description": "This feature is used by the math layout engine to select glyph variants\nused in subscripts and superscripts. When the engine lays out a glyph as\na superscript or subscript, it will first determine the script level: 1\nfor first-level sub-/superscripts and 2 for higher levels. It will then\nsupply the script level as a parameter to a GSUB3 alternate substitution\nrule in this feature to obtain the correct glyph variant.\n\n\nThe glyph variant will then be scaled by the math layout engine based on\nthe factor specified in the MATH table (`MATH.MathConstants.scriptPercentScaleDown`\nfor first-level sub-/superscripts and `MATH.MathConstants.scriptScriptPercentScaleDown`\nfor higher level scripts). As the scaling will be performed by the layout\nengine, the form of the glyphs substituted in this feature should not be\nscaled or repositioned. For example, the STIX Math Two font shown in the\nexample uses slightly bolder script alternates so that the glyph weights\nappear consistent when scaled down.\n",
    "done": true,
    "state": null,
    "status": null
  },
  "stch": {
    "title": "Stretching Glyph Decomposition",
    "registered": "Microsoft",
    "state": "required",
    "group": "Common",
    "script": {
      "arab": {
        "order": 0
      },
      "syrc": {
        "order": 0
      }
    },
    "description": 'Right.\n\n\nThe `stch` feature is part of the Arabic complex shaper. (It is the first\nfeature processed in the glyph preprocessing phase). It was designed to\nimplement the Syriac Abbreviation Mark (U+070F), which stretches to fill the\nwidth of the enclosed text.\n\n\nThe feature should be implemented by the font engineer as a multiple substitution,\nreplacing the glyph mapped to U+070F with an *odd number of glyphs*. When applying\nthe feature, the shaper performs the following actions:\n\n\n  * The substitution rules specified in the `stch` feature are applied, and the\n  sequence of glyphs returned by the rule applications are collected.\n\n  * The first glyph in the returned sequence is placed at the start of the glyph stream.\n\n  * The final glyph in the returned sequence is placed at the end of the glyph stream.\n\n  * At the end of processing, after positioning rules have been applied, the\n    width of the whole glyph stream is calculated.\n\n  * Next, odd-numbered glyphs inside the returned sequence other than the\n    first and final glyph are positioned such that they are distributed\n    evenly across the glyph stream. (For example, if there are five glyphs in the\n    sequence returned from `stch`, the third glyph is positioned horizontally\n    to appear in the middle of the glyph stream. If there are seven glyphs, the\n    third glyph is positioned to appear one-third of the way along the glyph\n    stream, and the fifth to appear two-thirds of the way along.)\n\n  * Finally, even-numbered glyphs inside the returned sequence are positioned\n    and *repeated* such that their widths completely fill the spaces between\n    the odd-numbered glyphs.\n\nFurther: the first and last glyphs in the returned sequence may be base glyphs\nor mark glyphs, and should have a non-zero horizontal advance. The\nremaining glyphs must be set as mark glyphs, but should also have a non-zero\nhorizontal advance.\n\n\nNote that although the OpenType specification describes this feature as having\nno "script/language sensitivity", and in theory can be applied to any situation\nwhere a glyph is decomposed and repeated to stretch over an enclosed sequence\nof glyphs (for example, enclosed numbers, Arabic year or end-of-aya marks, etc.),\nit is only processed as part of the Arabic complex shaper.\n\n\nNote also that as of macOS 11.4, the CoreText shaper does not apply this feature,\nand even if the feature is manually applied, the CoreText shaper does not implement\nthe distribution and stretching algorithm required to make the feature operated\nas expected. This has led some font engineers to create their own, manual\nimplementation inside the font; while this is an interesting engineering exercise,\nadding in the repeated glyphs manually inside the `stch` feature leads to\nerroneous results when such a font is used with a shaping engine which *does*\nimplement `stch` as specified, and cannot be recommended.\n',
    "fea": "feature stch {\n  sub abbreviation-syriac by\n    abbreviation-syriac.start\n    abbreviation-syriac.line\n    abbreviation-syriac.linedot\n    abbreviation-syriac.line\n    abbreviation-syriac.end;\n} stch;\n",
    "done": true,
    "status": null
  },
  "subs": {
    "title": "Subscript",
    "registered": "Microsoft/Adobe",
    "state": "discretionary",
    "automatic": true,
    "description": "This feature replaces glyphs, typically numerals, with subscript forms.\n",
    "example": {
      "font": "Alegreya",
      "text": "H2O"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Vertical Position > Inferiors/Subscripts".',
    "done": true,
    "status": null
  },
  "sups": {
    "title": "Superscript",
    "registered": "Microsoft/Adobe",
    "state": "discretionary",
    "automatic": true,
    "description": "This feature replaces glyphs with superscript forms, typically for use as footnote\nreferences.\n",
    "example": {
      "font": "Alegreya",
      "text": "2 HI. a,b,c"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Vertical Position > Superiors/Superscripts".',
    "done": true,
    "status": null
  },
  "swsh": {
    "title": "Swash",
    "registered": "Microsoft/Adobe",
    "state": "discretionary",
    "automatic": true,
    "description": "This feature is used to replace glyphs with swash forms - typically, but not\nexclusively, swash capitals. Although the OpenType standard suggests that\nmultiple swash alternates may be selected by providing a GSUB3 (`sub ... from ...`)\nrule for this feature, in reality most implementations expect a single swash\nalternate, and users may have difficulty accessing glyphs other than the first\nalternate. For this reason, we recommend using GSUB1 (`sub @chars by @chars.swsh`)\nrules for this feature.\n\n\nSee also the `cswh` feature for contextual swash forms.\n",
    "example": {
      "font": "Playball",
      "text": "Fake It"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Contextual Alternates > Swash Alternates".',
    "done": true,
    "status": null
  },
  "titl": {
    "title": "Titling",
    "registered": "Adobe",
    "state": "discretionary",
    "automatic": true,
    "description": "This feature substitutes glyphs for alternate forms designed for titling,\ntypically some or all capital letters.\n",
    "example": {
      "font": "Work Sans",
      "text": "PÖW"
    },
    "done": true,
    "ui": 'In the Mac OS X typography panel, this feature is accessed via "Style Options >\nTitling Capitals".\n',
    "status": null
  },
  "tjmo": {
    "title": "Trailing Jamo Forms",
    "registered": "Microsoft",
    "group": "Topographical",
    "state": "required",
    "script": {
      "hang": 3
    },
    "description": "The Korean Hangul script is encoded in Unicode in two ways: first, as a series\nof precomposed syllable graphemes (encoded from U+AC00 to U+D7AF); second, as\na series of indivdual, conjoining *jamo*. Korean syllables form a LVT?\n(leading consonant, vowel, optional trailing consonant) pattern; the leading consonant\n(*choseong*) jamo are encoded between U+1100 and U+115F, the vowel (*jungseong*)\njamo are encoded between U+1160 and U+11A7, and the optional trailing consonant\n(*jongseong*) jamo between U+11A8 and U+11FF. (At least in the primary Hangul\nJamo Unicode block; other jamo are encoded in extension blocks.)\n\n\nThe Hangul shaper will first attempt to compose any sequences of conjoining jamo\ninto an encoded form in the precomposed syllable block. But where this is not\nsuccessful - for example, in an Old Korean form which is not encoded in Unicode\nas a precomposed syllable - then the shaper will instead *decompose* any LV\nsyllables to break the syllable into separate L, V, and T? characters, and then\napply the Korean shaping features (`ljmo`, `vjmo`, `tjmo`) to select forms of\nthe jamo which are appropriately positioned and sized to combine into the correct\ngrapheme-image.\n\n\nFor example, the Old Korean syllable ᄒᆞᆯ is not encoded in Unicode as a precomposed\nsyllable, and so must be encoded with the three individual jamo. The Hangul\nshaper applies the `ljmo` feature to the *choseong*, the `vjmo` feature to the\n*jungseong* and the `tjmo` feature to the *jongseong*. The resulting sequence\nproduces a glyph which renders the syllable correctly, with the `vjmo` and\n`tjmo` generally producing zero-width mark glyphs positioned appropriately. An\nalternative to this technique is to use the `ccmp` feature to turn decomposed\njamo into a precomposed glyph.\n\n\nFor further information, see sections 3.12 and 18.6 of the Unicode Standard.\n",
    "done": true,
    "status": null
  },
  "tnam": {
    "title": "Traditional Name Forms",
    "registered": "Adobe",
    "status": "discouraged",
    "description": "This feature was intended for selecting traditional forms of kanji used in personal\nnames. No fonts implementing this feature have been identified and it is not\nspecified in the Adobe Japan1 glyph set; font developers should place any such\nsubstitutions in the `trad` feature instead.\n",
    "done": true,
    "state": null
  },
  "tnum": {
    "title": "Tabular Figures",
    "registered": "Microsoft/Adobe",
    "automatic": true,
    "description": "This feature replaces proportional figures by tabular (fixed-width) variants.\nSee also the `onum`, `lnum` and `pnum` features. Note that where the default\nform is tabular, this feature has no effect, although some font editors\nprovide rules for this feature in any case.\n",
    "fea": "feature tnum {\n  sub one by one.tf;\n  sub two by two.tf;\n  sub three by three.tf;\n  #...\n} tnum;\n",
    "done": true,
    "example": {
      "font": "Work Sans",
      "text": "|1|2|3|4|"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Number Spacing >\nMonospaced Numbers".\n\n\nIn CSS, this feature can be accessed through the `font-variant-numeric: tabular-nums` property.\n',
    "state": null,
    "status": null
  },
  "trad": {
    "title": "Traditional Forms",
    "registered": "Adobe",
    "description": 'The expected forms of Japanese kanji have evolved and simplified over time. However,\nin particular situations - often in the display of personal names - older,\n"traditional" forms (*kyujitai*) are still preferred. This feature allows a user to enter\ntext as normal (i.e. with the Unicode codepoint for a more common, simplified\nform) but have it substituted typographically for the traditional glyph. For\nexample, to typeset the name Sakae as 榮 (a variant found in south west Japan),\nthe user would enter the reading さかえ in their input method environment, and\nhave it converted to 栄, the usual kanji for this word. Applying the `trad`\nfeature would replace 栄 with 榮.\n\n\nNote that where traditional forms have their own Unicode codepoints, using these\ncodepoints directly is preferred, to avoid ambiguity and to preserve the distinction\nin the source text. In some cases (for example, the traditional form of 朗),\n*kyujitai* were not separately encoded in Unicode due to Han unification, and\nso the `trad` feature is necessary to access these glyphs.\n\n\nThe expected substitutions of the `trad` feature are defined in terms of the\n[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) glyphset.\nEngineers creating Japanese fonts according to that glyphset should read the\ninformation at the Adobe-Japan1 repository, and use the latest version of the\nfeature code provided there to implement this feature.\n',
    "fea": "feature trad {\n  sub uni4E9C by uni4E9E;\n  sub uni60AA by uni60E1;\n  sub uni9BF5 by uni9C3A;\n  sub uni5727 by uni58D3;\n  sub uni56F2 by uni570D;\n  sub uni7AC3 by uni7AC3.jp78;\n  sub uni6717 by uni6717.trad;\n  # ...\n} trad;\n",
    "example": {
      "text": "朗栄圧",
      "font": "Kiwi Maru"
    },
    "done": true,
    "state": null,
    "status": null
  },
  "twid": {
    "title": "Third Widths",
    "automatic": true,
    "state": "discretionary",
    "registered": "Adobe",
    "description": "This feature replaces glyphs (normally figures and punctuation) with variants\nwhich are one-third of the em square. This is generally used with CJK fonts\nand in the context of vertical typesetting. (For placing a sequence of three\nnumbers horizontally across an em-width vertical column.)\n\nSee also `fwid`, `hwid`, `qwid`.\n",
    "fea": "feature twid {\n  sub one by one.twid;\n  sub two by two.twid;\n  # ...\n}\n",
    "example": {
      "font": "Feature Sans",
      "text": "か123か"
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Text spacing > Third Width".',
    "done": true,
    "status": null
  },
  "unic": {
    "title": "Unicase",
    "registered": "Tiro Typeworks",
    "description": "This feature was intended for mapping both upper- and lowercase letters\nto a \"unicase\" alphabet, a set of glyphs with a common glyph height using\na mix of upper- and lowercase glyph forms. (For example, a font may use\nthe lowercase style of `a` but the uppercase style of `B`, but both glyphs\nwill have the same height; see Bradbury Thompson's [Alphabet 26](https://en.wikipedia.org/wiki/Bradbury_Thompson#Alphabet_26)\nor Zuzana Licko's [Filosofia Unicase](https://www.emigre.com/Fonts/Filosofia).)\n",
    "ui": "This feature can be activated using the CSS rule `font-variant-caps: unicase`,\nsubject to browser support.\n",
    "done": true,
    "state": null,
    "status": null
  },
  "valt": {
    "title": "Alternate Vertical Metrics",
    "registered": "Adobe",
    "status": "discouraged",
    "description": "The intention behind this feature was to reposition full-width glyphs\n(e.g. U+FF01-U+FF60) so that they would be visually\ncentered inside the em-square in vertical typesetting context.\n\n\nHowever, a more appropriate way to achieve this visual repositioning is to\nsupply alternate metrics for these glyphs in the `vmtx` and `VORG` tables.\nAs such, this feature has only been implemented extremely rarely, and,\ndespite the description in the OpenType standard, Harfbuzz does not apply\nit by default in vertical layout.\n",
    "done": true,
    "state": null
  },
  "vatu": {
    "title": "Vattu Variants",
    "registered": "Microsoft",
    "group": "Orthographic",
    "script": {
      "INDIC": {
        "order": 8
      },
      "USE": {
        "order": 0
      }
    },
    "state": "required",
    "description": 'This feature is intended to replace consonant + below-base (vattu) sequences\nwith ligature forms for fonts supporting the legacy (v1) shaping engine.\n\n\nFor example, in Devanagari, the `<virama> <ra>` sequence is normally replaced\nby a below-base Ra by the `blwf` feature. However, "for certain consonants,\nthe mark RAsub may graphically combine with the consonant to form a conjunct\nligature form." (Unicode Standard, [section 12.1](https://www.unicode.org/versions/Unicode13.0.0/ch12.pdf), "Rendering Rules", R7.)\nThis combination is performed by the `vatu` feature in the v1 shaping engine\n(e.g. `deva` script).\n\n\nFor fonts using the new shaper (`dev2`), the `rkrf` feature is used instead to\nsubstitute the whole `<consonant> <virama> <ra>` sequence for a ligature in one rule.\nFonts which wish to support both v1 and v2 shapers should provide both `rkrf`\n(in the `dev2` script) and `blwf`/`vatu` (in `deva` script).\n\n\nAs an orthographic feature, the scope of application of this feature is\nscoped to each syllabic cluster.\n\n\nNote that this feature is also used as a "signal" to the shaping engine for reordering\npurposes: that is, if a virama-consonant pair would be substituted by this feature,\nthen that consonant is placed in the below-base position when the syllable is reordered.\n',
    "fea": "feature vatu {\n  script deva;\n  sub Ka.dv Vattu.dv by KaRa.dv;\n  sub Kha.dv Vattu.dv by KhaRa.dv;\n  sub Ga.dv Vattu.dv by GaRa.dv;\n  # ...\n} vatu;\n",
    "done": true,
    "status": null
  },
  "vchw": {
    "state": "discretionary",
    "title": "Vertical Contextual Half-width Spacing",
    "registered": "Adobe/W3C",
    "description": "This feature is the vertical equivalent of `chws`; it is intended to improve\nthe appearance of text set with software which does *not* implement the full\nJLREQ spacing rules, but does implement vertical typesetting.\n\nThis feature is relatively new as of 2021, no implementations have been\nidentified, and to be honest, any layout engine which bothers to support\nvertical typesetting correctly is probably also going to implement JLREQ\nspacing as well.\n",
    "done": true,
    "status": null
  },
  "vert": {
    "title": "Vertical Alternates",
    "registered": "Microsoft/Adobe",
    "state": "required",
    "group": "Typographic",
    "description": "This feature is applied automatically by the shaping engine at the end of\nrequired processing and before discretionary processing when the script\ndirection is set to vertical; it replaces the horizontal positioning and\ntypographic presentation group (`calt`/`clig`/`curs`/`dist`/`kern`/`liga`/`rclt`).\n\n\nIt should be used to replace any glyphs with forms which are more appropriate\nto vertical presentation. For example, punctuation such as ellipses and parenthesis\nshould be replaced with rotated forms, Japanese small kana should be positioned in the\nupper right quadrant of the em square, and Japanese ligature forms (U+32FF-33FF) should\nbe replaced with versions which preserve reading order when read vertically.\n\n\nNote that, aside from supporting CJK vertical presentation, this feature\nshould also be used for typographic presentation rules for fonts supporting\nother vertical writing systems, such as Mongolian.\n\n\nNot also that if the `vrt2` feature is present, this feature will be used instead\nby Microsoft shaping engines. Indeed, Windows 2000 and NT4.1 *require* the use\nof a `vrt2` feature for CFF-outline fonts. However, Harfbuzz and Adobe shapers\nuse `vert` exclusively. See discussion in `vrt2`.\n",
    "fea": "feature vert {\n  sub ellipsis by uniFE19;\n  sub twodotenleader by twodotenleader.vert;\n  sub uniFF08 by uniFE35;\n  sub uniFF09 by uniFE36;\n\n  sub uni32FF by uni32FF.vert;\n  # ...\n} vert;\n",
    "example": {
      "font": "Reggae One",
      "text": "（㌀）"
    },
    "done": true,
    "status": null
  },
  "vhal": {
    "title": "Alternate Vertical Half Widths",
    "automatic": true,
    "state": "discretionary",
    "registered": "Adobe",
    "description": "This feature is similar to the `halt` feature, in that it re-spaces full-width\nglyphs to fit on a half-em, but `vhal` is used in vertical typesetting,\nre-spacing heights instead of widths.\n",
    "fea": "feature vhal {\n  pos [degree.full minute.full quotedblright.full quoteright.full second.full uni3001 uni3002 uni3009 uni300B uni300D uni300F uni3011 uni3015 uni301F uniFF09 uniFF0C uniFF0E uniFF3D uniFF5D] <0 -500 0 0>;\n  pos [quotedblleft.full quoteleft.full uni3008 uni300A uni300C uni300E uni3010 uni3014 uni301D uniFF08 uniFF3B uniFF5B] <0 -500 0 -500>;\n  pos [uni30FB uniFF01 uniFF1A uniFF1B] <0 -250 0 -500>;\n} vhal;\n",
    "done": true,
    "ui": "Unknown. Contributions welcome.",
    "status": null
  },
  "vjmo": {
    "title": "Vowel Jamo Forms",
    "registered": "Microsoft",
    "group": "Topographical",
    "state": "required",
    "script": {
      "hang": 2
    },
    "description": "The Korean Hangul script is encoded in Unicode in two ways: first, as a series\nof precomposed syllable graphemes (encoded from U+AC00 to U+D7AF); second, as\na series of indivdual, conjoining *jamo*. Korean syllables form a LVT?\n(leading consonant, vowel, optional trailing consonant) pattern; the leading consonant\n(*choseong*) jamo are encoded between U+1100 and U+115F, the vowel (*jungseong*)\njamo are encoded between U+1160 and U+11A7, and the optional trailing consonant\n(*jongseong*) jamo between U+11A8 and U+11FF. (At least in the primary Hangul\nJamo Unicode block; other jamo are encoded in extension blocks.)\n\n\nThe Hangul shaper will first attempt to compose any sequences of conjoining jamo\ninto an encoded form in the precomposed syllable block. But where this is not\nsuccessful - for example, in an Old Korean form which is not encoded in Unicode\nas a precomposed syllable - then the shaper will instead *decompose* any LV\nsyllables to break the syllable into separate L, V, and T? characters, and then\napply the Korean shaping features (`ljmo`, `vjmo`, `tjmo`) to select forms of\nthe jamo which are appropriately positioned and sized to combine into the correct\ngrapheme-image.\n\n\nFor example, the Old Korean syllable ᄒᆞᆯ is not encoded in Unicode as a precomposed\nsyllable, and so must be encoded with the three individual jamo. The Hangul\nshaper applies the `ljmo` feature to the *choseong*, the `vjmo` feature to the\n*jungseong* and the `tjmo` feature to the *jongseong*. The resulting sequence\nproduces a glyph which renders the syllable correctly, with the `vjmo` and\n`tjmo` generally producing zero-width mark glyphs positioned appropriately. An\nalternative to this technique is to use the `ccmp` feature to turn decomposed\njamo into a precomposed glyph.\n\n\nFor further information, see sections 3.12 and 18.6 of the Unicode Standard.\n",
    "done": true,
    "status": null
  },
  "vkna": {
    "title": "Vertical Kana Alternates",
    "registered": "Adobe",
    "state": "discretionary",
    "description": 'This feature replaces standard kana forms with glyphs which are designed\nspecifically for vertical layout. This may take a variety of forms: fonts\ndesigned with proportional kana might provide fixed-width em-square kana\nglyphs; glyphs may be raised from the horizontal baseline and centered\nwithin the em-square; or structural changes may be made analogous to the\n`hkna` feature. In many fonts, vertical alternates are only provided for\nthe "small" kana.\n',
    "example": {
      "font": "Cherry Bomb One",
      "text": "シャットアップ"
    },
    "fea": "feature hkna {\n  sub ka-hira by ka-hira.vkna;\n  sub sa-hira by sa-hira.vkna;\n  sub ta-hira by ta-hira.vkna;\n  # ...\n} hkna;\n",
    "ui": 'In the Mac OS X typography panel, this feature is accessed via "Optimized\nKana Alternatives -> Vertical Alternatives".\n',
    "done": true,
    "status": null
  },
  "vkrn": {
    "title": "Vertical Kerning",
    "registered": "Adobe",
    "description": "This feature is the equivalent to kerning (see `kern`) for vertical layout, with\nthe exception of the fact that this is *not* necessarily applied by default.\nHarfbuzz and Adobe shapers do not apply it by default in vertical settings,\nand font designers should consider using the `vert` feature instead for maxium compatibility.\n",
    "done": true,
    "state": null,
    "status": null
  },
  "vpal": {
    "title": "Proportional Alternate Vertical Metrics",
    "registered": "Adobe",
    "description": "This feature is the vertical equivalent of the `palt` feature; it uses\npositioning rules to convert full-em glyphs into proportional glyphs\nby aftering their position and Y-advance.\n",
    "fea": "feature vpal {\n  pos uniFF41 <0 -186 0 -373>;\n  pos uniFF42 <0 -148 0 -346>;\n  pos uniFF43 <0 -220 0 -441>;\n  pos uniFF44 <0 -176 0 -353>;\n  # ...\n} vpal;\n",
    "done": true,
    "state": null,
    "status": null
  },
  "vrt2": {
    "title": "Vertical Alternates and Rotation",
    "status": "discouraged",
    "registered": "Adobe",
    "description": "This feature was intended as a replacement for the `vert` feature. The idea\nwas that this feature would contain rules for vertical alternates as per `vert`\nand also rules which replace Latin glyphs by rotated forms; this would mean\nthat the layout process for vertical text would be greatly simplified:\nthe layout engine could simply apply the `vrt2` feature to both CJK and\nLatin text, and not need to rotate any glyphs.\n\n\nHowever, this model of layout [was not widely accepted](https://lists.freedesktop.org/archives/harfbuzz/2013-August/003490.html),\nand the older `vert` feature continues to be the most compatible approach to\nvertical typesetting. For that reason, the use of this feature is *discouraged*\nin favour of `vert`.\n",
    "done": true,
    "state": null
  },
  "vrtr": {
    "title": "Vertical Alternates for Rotation",
    "registered": "Adobe/Microsoft/W3C",
    "description": "This feature is intended to select alternate glyphs to be used in vertical\ntypesetting. When the `writing-mode` CSS property is set to `vertical-lr`\nor `vertical-rl`, certain glyphs are rotated 90 degrees clockwise by the\nrendering engine.\n\nHowever, prior to rotation, the font may wish to substitute glyphs which\nare designed for vertical settings. These glyphs will still be rotated by\nthe rendering engine, but will be visually distinct from the original forms.\n\n\nThis feature is relatively new as of 2021, and no implementations have been\nidentified.\n",
    "done": true,
    "state": null,
    "status": null
  },
  "zero": {
    "title": "Slashed Zero",
    "registered": "Adobe",
    "description": "This feature allows the user to change between the default form of zero\n(without a slash) to a form with a slash through the counter.\n",
    "automatic": true,
    "fea": "feature zero {\n  sub zero by zero.zero;\n}\n",
    "example": {
      "font": "Work Sans",
      "text": 2021
    },
    "ui": 'In the OS X typography panel, this feature is accessed via "Typographic\nExtras > Slashed Zero".\n',
    "done": true,
    "state": null,
    "status": null
  }
};
const featureMetadataMemo = /* @__PURE__ */ new Map();
const featureMetadata = (tag) => {
  const cached = featureMetadataMemo.get(tag);
  if (cached)
    return cached;
  let lookupTag;
  switch (tag.slice(0, 2)) {
    case "ss":
      lookupTag = "ss01";
      break;
    case "cv":
      lookupTag = "cv01";
      break;
    default:
      lookupTag = tag;
      break;
  }
  const metadata = Object.prototype.hasOwnProperty.call(FEATURES, lookupTag) ? FEATURES[lookupTag] : null;
  let featureName;
  switch (tag.slice(0, 2)) {
    case "ss": {
      featureName = `Stylistic Set ${Number(tag.slice(2))}`;
      break;
    }
    case "cv": {
      featureName = `Character Variant ${Number(tag.slice(2))}`;
      break;
    }
    default: {
      featureName = metadata?.title ?? null;
    }
  }
  const featureInfo = {
    name: featureName,
    description: metadata?.description ?? "",
    required: metadata?.state === "required"
  };
  featureMetadataMemo.set(tag, featureInfo);
  return featureInfo;
};
var NodeType;
(function(NodeType2) {
  NodeType2[NodeType2["Whitespace"] = 0] = "Whitespace";
  NodeType2[NodeType2["DefinitionKeyword"] = 1] = "DefinitionKeyword";
  NodeType2[NodeType2["OperatorKeyword"] = 2] = "OperatorKeyword";
  NodeType2[NodeType2["Keyword"] = 3] = "Keyword";
  NodeType2[NodeType2["PropertyName"] = 4] = "PropertyName";
  NodeType2[NodeType2["Paren"] = 5] = "Paren";
  NodeType2[NodeType2["Brace"] = 6] = "Brace";
  NodeType2[NodeType2["Punctuation"] = 7] = "Punctuation";
  NodeType2[NodeType2["String"] = 8] = "String";
  NodeType2[NodeType2["Number"] = 9] = "Number";
  NodeType2[NodeType2["Separator"] = 10] = "Separator";
})(NodeType || (NodeType = {}));
class CSSEmitter {
  indent = 0;
  listIndent = 0;
  indentString;
  textLength = 0;
  spans = [];
  constructor(indentString = "  ") {
    this.indentString = indentString;
  }
  pushSpan(text, type) {
    if (this.spans.length > 0 && this.spans[this.spans.length - 1].type === type) {
      this.spans[this.spans.length - 1].text += text;
    } else if (text.length > 0) {
      this.spans.push({ text, type });
    }
    this.textLength += text.length;
  }
  pushIndent() {
    this.pushSpan(this.indentString.repeat(this.indent), NodeType.Whitespace);
  }
  pushSpace() {
    this.pushSpan(" ", NodeType.Whitespace);
  }
  pushNewline() {
    this.pushSpan("\n", NodeType.Whitespace);
  }
  pushString(contents) {
    const hasDoubleQuotes = contents.includes('"');
    const escaped = hasDoubleQuotes ? contents.replace(/(\\|'|\n)/g, "\\$1") : contents.replace(/(\\|\n)/g, "\\$1");
    this.pushSpan(hasDoubleQuotes ? `'${escaped}'` : `"${escaped}"`, NodeType.String);
  }
  atRule(rule) {
    this.pushSpan(rule, NodeType.DefinitionKeyword);
    this.pushSpace();
    this.pushSpan("{", NodeType.Brace);
    this.indent++;
    this.pushNewline();
  }
  endRule() {
    this.indent--;
    this.pushSpan("}", NodeType.Brace);
    this.pushNewline();
    this.pushNewline();
  }
  declaration(property) {
    this.pushIndent();
    this.pushSpan(property, NodeType.PropertyName);
    this.pushSpan(":", NodeType.Punctuation);
    this.pushSpace();
  }
  indentedList() {
    this.listIndent++;
    this.indent++;
    this.pushNewline();
    this.pushIndent();
  }
  endIndentedList() {
    this.listIndent--;
    this.indent--;
  }
  endDeclaration() {
    if (this.spans[this.spans.length - 1].type === NodeType.Whitespace) {
      this.spans.pop();
    }
    this.pushSpan(";", NodeType.Separator);
    this.pushNewline();
  }
  keyword(kw) {
    this.pushSpan(kw, NodeType.Keyword);
    this.pushSpace();
  }
  number(n2) {
    this.pushSpan(String(n2), NodeType.Number);
    this.pushSpace();
  }
  string(s) {
    this.pushString(s);
    this.pushSpace();
  }
  parenthesized(callee) {
    this.pushSpan(callee, NodeType.OperatorKeyword);
    this.pushSpan("(", NodeType.Paren);
  }
  endParenthesized() {
    if (this.spans[this.spans.length - 1].type === NodeType.Whitespace) {
      this.spans.pop();
    }
    this.pushSpan(")", NodeType.Paren);
    this.pushSpace();
  }
  comma() {
    if (this.spans[this.spans.length - 1].type === NodeType.Whitespace) {
      this.spans.pop();
    }
    this.pushSpan(",", NodeType.Separator);
    if (this.listIndent > 0) {
      this.pushNewline();
      this.pushIndent();
    } else {
      this.pushSpace();
    }
  }
  getString() {
    let finalString = "";
    for (const span of this.spans) {
      finalString += span.text;
    }
    return finalString;
  }
}
const styleValuesEqual = (a, b) => {
  if (a.type === "single" && b.type === "single") {
    return a.value === b.value;
  }
  if (a.type === "variable" && b.type === "variable") {
    return a.value.min === b.value.min && a.value.max === b.value.max && a.value.defaultValue === b.value.defaultValue;
  }
  return false;
};
const sortFontsIntoFamilies = (fonts) => {
  const families2 = {};
  for (const font of fonts) {
    if (!Object.prototype.hasOwnProperty.call(families2, font.familyName)) {
      families2[font.familyName] = [font];
    } else {
      families2[font.familyName].push(font);
    }
  }
  const axisUnion = (a, b) => {
    if (a.tag !== b.tag) {
      throw new Error(`Tried to union two different axes (${a.tag}, ${b.tag})`);
    }
    return {
      tag: a.tag,
      name: a.name ?? b.name,
      min: Math.min(a.min, b.min),
      defaultValue: a.defaultValue,
      max: Math.max(a.max, b.max)
    };
  };
  const familySettings2 = [];
  for (const [familyName2, fonts2] of Object.entries(families2)) {
    const processedFonts = [];
    let sharedStyleValues = null;
    const axisInstanceValues = /* @__PURE__ */ new Map();
    const axes = /* @__PURE__ */ new Map();
    const namedSubsets = /* @__PURE__ */ new Set();
    const namedFeatures = /* @__PURE__ */ new Map();
    for (const font of fonts2) {
      const uniqueStyleValues = {};
      if (sharedStyleValues === null) {
        sharedStyleValues = Object.assign({}, font.styleValues);
      } else {
        for (const styleName of ["weight", "width", "italic", "slant"]) {
          if (Object.prototype.hasOwnProperty.call(sharedStyleValues, styleName)) {
            if (!styleValuesEqual(sharedStyleValues[styleName], font.styleValues[styleName])) {
              for (const processedFont of processedFonts) {
                processedFont.uniqueStyleValues[styleName] = sharedStyleValues[styleName];
              }
              delete sharedStyleValues[styleName];
              uniqueStyleValues[styleName] = font.styleValues[styleName];
            }
          } else {
            uniqueStyleValues[styleName] = font.styleValues[styleName];
          }
        }
      }
      processedFonts.push({ font, uniqueStyleValues });
      for (const axis of font.axes) {
        const existingAxis = axes.get(axis.tag);
        if (existingAxis) {
          axes.set(axis.tag, axisUnion(axis, existingAxis));
        } else {
          axes.set(axis.tag, Object.assign({}, axis));
        }
      }
      for (const coverage of font.subsetCoverage) {
        if (coverage.covered) {
          namedSubsets.add(coverage.name);
        }
      }
      for (const feature of font.features) {
        if (!namedFeatures.has(feature.tag)) {
          namedFeatures.set(feature.tag, feature);
        }
      }
      for (const namedInstance of font.namedInstances) {
        for (const [tag, value] of Object.entries(namedInstance.coords)) {
          let instanceValues = axisInstanceValues.get(tag);
          if (!instanceValues) {
            instanceValues = /* @__PURE__ */ new Set();
            axisInstanceValues.set(tag, instanceValues);
          }
          instanceValues.add(value);
        }
      }
    }
    const axisInstanceValuesSorted = {};
    for (const [tag, instanceValues] of axisInstanceValues) {
      const valuesArr = Array.from(instanceValues);
      if (tag === "slnt") {
        valuesArr.sort((a, b) => b - a);
      } else {
        valuesArr.sort((a, b) => a - b);
      }
      axisInstanceValuesSorted[tag] = valuesArr;
    }
    const sortedSubsets = Array.from(namedSubsets.values());
    sortedSubsets.sort((a, b) => a.localeCompare(b));
    const fontsSettings = [];
    for (const font of processedFonts) {
      fontsSettings.push({
        font: font.font,
        styleValues: font.uniqueStyleValues
      });
    }
    fontsSettings.sort((a, b) => {
      const getStyleSetting = (setting2) => {
        const settingA = a.styleValues[setting2] ?? sharedStyleValues[setting2];
        const settingB = b.styleValues[setting2] ?? sharedStyleValues[setting2];
        const settingAValue = settingA.type === "variable" ? settingA.value.defaultValue : settingA.value;
        const settingBValue = settingB.type === "variable" ? settingB.value.defaultValue : settingB.value;
        return [settingAValue, settingBValue];
      };
      const [widthA, widthB] = getStyleSetting("width");
      if (widthA !== widthB)
        return widthA - widthB;
      const [weightA, weightB] = getStyleSetting("weight");
      if (weightA !== weightB)
        return weightA - weightB;
      const [italA, italB] = getStyleSetting("italic");
      if (italA !== italB)
        return italA - italB;
      const [slantA, slantB] = getStyleSetting("slant");
      if (slantA !== slantB)
        return slantB - slantA;
      return a.font.subfamilyName.localeCompare(b.font.subfamilyName);
    });
    familySettings2.push({
      name: familyName2,
      fonts: fontsSettings,
      styleValues: sharedStyleValues,
      axes: Array.from(axes.values()),
      axisInstanceValues: axisInstanceValuesSorted,
      features: Array.from(namedFeatures.values()),
      namedSubsets: sortedSubsets
    });
  }
  return familySettings2;
};
const axisRangeProduct = (axisRanges) => {
  if (axisRanges.length === 0) {
    return [];
  }
  const iterIndices = [];
  const results = [];
  for (let i = 0; i < axisRanges.length; i++) {
    iterIndices.push(0);
  }
  outer: for (; ; ) {
    const current = [];
    for (let i = 0; i < axisRanges.length; i++) {
      const axisRange = axisRanges[i];
      switch (axisRange.type) {
        case "single":
        case "variable": {
          current.push(axisRange);
          break;
        }
        case "multiple": {
          const range = axisRange.value.ranges[iterIndices[i]];
          if (typeof range === "number") {
            current.push({ type: "single", tag: axisRange.tag, value: range });
          } else if (typeof range === "undefined") {
            throw new Error("Empty instanced range");
          } else {
            current.push({
              type: "variable",
              tag: axisRange.tag,
              value: {
                min: range[0],
                defaultValue: axisRange.value.defaultValue,
                max: range[1]
              }
            });
          }
          break;
        }
      }
    }
    results.push(current);
    for (let i = 0; i < iterIndices.length; i++) {
      const axisRange = axisRanges[i];
      const numRanges = axisRange.type === "multiple" ? axisRange.value.ranges.length : 1;
      iterIndices[i]++;
      if (iterIndices[i] >= numRanges) {
        iterIndices[i] = 0;
        if (i === iterIndices.length - 1) {
          break outer;
        }
      } else {
        break;
      }
    }
  }
  return results;
};
const STYLE_SUBFAMILIES = [
  "Thin",
  "Hairline",
  "Extra(?:\\s|-)?Light",
  "Ultra(?:\\s|-)?Light",
  "Light",
  "Normal",
  "Regular",
  "Book",
  "Medium",
  "Semi(?:\\s|-)?Bold",
  "Demi(?:\\s|-)?Bold",
  "Bold",
  "Extra(?:\\s|-)?Bold",
  "Ultra(?:\\s|-)?Bold",
  "Black",
  "Heavy",
  "Extra(?:\\s|-)?Black",
  "Ultra(?:\\s|-)?Black",
  "Italic",
  "Oblique",
  "Ultra(?:\\s|-)?(?:Condensed|Narrow)",
  "Extra(?:\\s|-)?(?:Condensed|Narrow)",
  "(?:Condensed|Narrow)",
  "Semi(?:\\s|-)?(?:Condensed|Narrow)",
  "Semi(?:\\s|-)?(?:Expanded|Narrow)",
  "Expanded",
  "Extra(?:\\s|-)?Expanded",
  "Ultra(?:\\s|-)?Expanded"
];
const STYLE_SUBFAMILY_END_REGEX = new RegExp(`(?:${STYLE_SUBFAMILIES.join("|")}\\s*)+$`, "g");
const WEIGHT_NAMES = /* @__PURE__ */ new Map([
  [100, "Thin"],
  [200, "ExtraLight"],
  [300, "Light"],
  [400, "Regular"],
  [500, "Medium"],
  [600, "SemiBold"],
  [700, "Bold"],
  [800, "ExtraBold"],
  [900, "Black"],
  [950, "ExtraBlack"]
]);
const WIDTH_NAMES = /* @__PURE__ */ new Map([
  [50, "UltraCondensed"],
  [62.5, "ExtraCondensed"],
  [75, "Condensed"],
  [87.5, "SemiCondensed"],
  [100, "Normal"],
  [112.5, "SemiExpanded"],
  [125, "Expanded"],
  [150, "ExtraExpanded"],
  [200, "UltraExpanded"]
]);
const instanceSubsetSettings = (settings) => {
  const settingsByFont = /* @__PURE__ */ new Map();
  const styleKeyToTag = (styleKey) => {
    switch (styleKey) {
      case "weight":
        return "wght";
      case "width":
        return "wdth";
      case "italic":
        return "ital";
      case "slant":
        return "slnt";
    }
  };
  for (const family of settings) {
    for (const font of family.fonts) {
      if (!family.enableSubsetting) {
        settingsByFont.set(font.font.id, [null]);
        continue;
      }
      const axisValues = [];
      for (const [tag, value] of Object.entries(family.axes)) {
        axisValues.push({ tag, ...value });
      }
      for (const [settingName, styleValue] of Object.entries(family.styleValues)) {
        axisValues.push({ tag: styleKeyToTag(settingName), ...styleValue });
      }
      if (font.styleValues) {
        for (const [settingName, styleValue] of Object.entries(font.styleValues)) {
          axisValues.push({ tag: styleKeyToTag(settingName), ...styleValue });
        }
      }
      let unicodeRangeSets = [];
      const charSettings = family.includeCharacters;
      if (charSettings === "all") {
        unicodeRangeSets = ["all"];
      } else {
        const charSettingsArr = Array.isArray(charSettings) ? charSettings : [charSettings];
        for (const charsetSettings of charSettingsArr) {
          let charsetName = charsetSettings.name ?? null;
          let parsedUnicodeRanges;
          if (typeof charsetSettings.includeUnicodeRanges === "string") {
            parsedUnicodeRanges = parseUnicodeRanges(charsetSettings.includeUnicodeRanges);
            if (!parsedUnicodeRanges)
              throw new Error(`Invalid Unicode ranges: ${charsetSettings.includeUnicodeRanges}`);
          } else {
            parsedUnicodeRanges = charsetSettings.includeUnicodeRanges ?? [];
          }
          if (charsetName === "" || charsetName === null) {
            if (!parsedUnicodeRanges.length && charsetSettings.includeNamedSubsets) {
              charsetName = charsetSettings.includeNamedSubsets.join("-");
            }
          }
          unicodeRangeSets.push({
            named: charsetSettings.includeNamedSubsets ?? [],
            custom: parsedUnicodeRanges,
            charsetName
          });
        }
      }
      const flattenedAxisSettings = axisRangeProduct(axisValues);
      const flattenedSettings = [];
      for (const axisValues2 of flattenedAxisSettings) {
        for (let i = 0; i < unicodeRangeSets.length; i++) {
          const unicodeRanges = unicodeRangeSets[i];
          flattenedSettings.push({
            axisValues: axisValues2,
            features: family.features ?? {},
            unicodeRanges,
            // We only need to name/number fonts by character set if we're exporting more than one character
            // set
            charsetNameOrIndex: unicodeRangeSets.length === 1 ? null : typeof unicodeRanges !== "string" && unicodeRanges.charsetName !== null ? unicodeRanges.charsetName : i,
            preprocess: flattenedAxisSettings.length * unicodeRangeSets.length > 1
          });
        }
      }
      settingsByFont.set(font.font.id, flattenedSettings);
    }
  }
  return settingsByFont;
};
const findVaryingAxes = (fonts) => {
  const varyingAxesByFamily = /* @__PURE__ */ new Map();
  const axesByFamily = /* @__PURE__ */ new Map();
  const styleToAxisNames = {
    italic: "ital",
    slant: "slnt",
    weight: "wght",
    width: "wdth"
  };
  for (const font of fonts) {
    let axesInfo = axesByFamily.get(font.familyName);
    if (!axesInfo) {
      axesInfo = { axes: /* @__PURE__ */ new Map(), styleValues: {} };
      axesByFamily.set(font.familyName, axesInfo);
    }
    const { axes, styleValues } = axesInfo;
    let varyingAxes = varyingAxesByFamily.get(font.familyName);
    if (!varyingAxes) {
      varyingAxes = /* @__PURE__ */ new Set();
      varyingAxesByFamily.set(font.familyName, varyingAxes);
    }
    for (const axis of font.axes) {
      const existingAxis = axes.get(axis.tag);
      if (existingAxis) {
        if (!styleValuesEqual(existingAxis, axis)) {
          varyingAxes.add(axis.tag);
        }
      } else {
        axes.set(axis.tag, axis);
      }
    }
    for (const styleName of ["italic", "slant", "weight", "width"]) {
      const styleValue = font.styleValues[styleName];
      if ((styleName === "italic" || styleName === "slant") && styleValue.type === "single" && styleValue.value === 0) {
        continue;
      }
      if (!styleValues[styleName]) {
        styleValues[styleName] = styleValue;
        continue;
      }
      if (!styleValuesEqual(styleValues[styleName], styleValue)) {
        varyingAxes.add(styleToAxisNames[styleName]);
        styleValues[styleName] = styleValue;
      }
    }
  }
  return varyingAxesByFamily;
};
const fontFilenames = (fonts) => {
  const varyingAxesByFamily = findVaryingAxes(fonts.map((font) => font.font));
  const filenames = /* @__PURE__ */ new Map();
  for (const { font, charsetNameOrIndex, overrideName } of fonts) {
    const varyingAxes = varyingAxesByFamily.get(font.familyName);
    filenames.set(font, fontFilename(font, varyingAxes, charsetNameOrIndex, overrideName));
  }
  return filenames;
};
const roundDecimal$1 = (v) => Math.round(v * 1e3) / 1e3;
const getInstanceLabels = (font, varyingAxes, includeStyleValues) => {
  if (font.namedInstance?.subfamilyName != null) {
    return [font.namedInstance?.subfamilyName];
  }
  const styleValueTags = /* @__PURE__ */ new Set(["ital", "slnt", "wght", "wdth"]);
  const axisValuesByTag = /* @__PURE__ */ new Map([
    ["ital", font.styleValues.italic],
    ["slnt", font.styleValues.slant],
    ["wght", font.styleValues.weight],
    ["wdth", font.styleValues.width]
  ]);
  for (const axisSetting2 of font.axes) {
    axisValuesByTag.set(axisSetting2.tag, axisSetting2);
  }
  const remainingAxes = new Set(axisValuesByTag.keys());
  const axisLabels = [];
  const matchingMultiAxisRecords = [];
  outer: for (const axisValue of font.styleAttributes.axisValues) {
    if (axisValue.format !== AxisValueFormat.MultipleValues) {
      continue;
    }
    let allValuesAreStyleValues = true;
    let anyAxesVary = false;
    for (const subValue of axisValue.axisValues) {
      const axis = font.styleAttributes.designAxes[subValue.axisIndex];
      const fontAxisValue = axisValuesByTag.get(axis.tag);
      if (typeof fontAxisValue === "undefined")
        continue outer;
      if (fontAxisValue.type !== "single" || fontAxisValue.value !== subValue.value) {
        continue outer;
      }
      if (!styleValueTags.has(axis.tag))
        allValuesAreStyleValues = false;
      if (varyingAxes.has(axis.tag))
        anyAxesVary = true;
    }
    if (
      // Any of the axis values specified in this record vary among different fonts in this family, and are worth
      // including in order to disambiguate this font from others
      anyAxesVary && // Either this label includes some non-style-value-related (weight/width/slope) axis values, or we want to
      // include style-value-related names anyway
      (includeStyleValues || !allValuesAreStyleValues) && // This label is not "elidable" (can be omitted when composing name strings like we're doing here)
      !(axisValue.flags & AxisValueFlags.Elidable)
    ) {
      matchingMultiAxisRecords.push(axisValue);
    }
  }
  matchingMultiAxisRecords.sort((a, b) => b.axisValues.length - a.axisValues.length);
  for (const axisValue of matchingMultiAxisRecords) {
    if (!axisValue.name)
      continue;
    if (!axisValue.axisValues.every(({ axisIndex }) => remainingAxes.has(font.styleAttributes.designAxes[axisIndex].tag))) {
      continue;
    }
    for (const subValue of axisValue.axisValues) {
      remainingAxes.delete(font.styleAttributes.designAxes[subValue.axisIndex].tag);
    }
    const ordering = axisValue.axisValues.reduce((prev, { axisIndex }) => {
      return Math.min(prev, font.styleAttributes.designAxes[axisIndex].ordering);
    }, Infinity);
    axisLabels.push({ label: axisValue.name, ordering });
  }
  for (const axisValue of font.styleAttributes.axisValues) {
    if (!(axisValue.format === AxisValueFormat.SingleValue || axisValue.format === AxisValueFormat.LinkedValue)) {
      continue;
    }
    if (!axisValue.name)
      continue;
    const axis = font.styleAttributes.designAxes[axisValue.axisIndex];
    if (!remainingAxes.has(axis.tag))
      continue;
    const fontAxisValue = axisValuesByTag.get(axis.tag);
    if (typeof fontAxisValue === "undefined")
      continue;
    if (fontAxisValue.type !== "single" || fontAxisValue.value !== axisValue.value) {
      continue;
    }
    remainingAxes.delete(axis.tag);
    const elide = styleValueTags.has(axis.tag) && !includeStyleValues || axisValue.flags & AxisValueFlags.Elidable || !varyingAxes.has(axis.tag);
    if (!elide)
      axisLabels.push({ label: axisValue.name, ordering: axis.ordering });
  }
  for (const axisValue of font.styleAttributes.axisValues) {
    if (axisValue.format !== AxisValueFormat.Range)
      continue;
    if (!axisValue.name)
      continue;
    const axis = font.styleAttributes.designAxes[axisValue.axisIndex];
    if (!remainingAxes.has(axis.tag))
      continue;
    const fontAxisValue = axisValuesByTag.get(axis.tag);
    if (typeof fontAxisValue === "undefined")
      continue;
    if (fontAxisValue.type !== "variable" || fontAxisValue.value.min !== axisValue.min || fontAxisValue.value.max !== axisValue.max) {
      continue;
    }
    remainingAxes.delete(axis.tag);
    const elide = styleValueTags.has(axis.tag) && !includeStyleValues || axisValue.flags & AxisValueFlags.Elidable || !varyingAxes.has(axis.tag);
    if (!elide)
      axisLabels.push({ label: axisValue.name, ordering: axis.ordering });
  }
  let lowestOrdering = 0;
  let highestOrdering = 0;
  const axisOrderings = /* @__PURE__ */ new Map();
  for (const axis of font.styleAttributes.designAxes) {
    lowestOrdering = Math.min(lowestOrdering, axis.ordering);
    highestOrdering = Math.max(highestOrdering, axis.ordering);
    axisOrderings.set(axis.tag, axis.ordering);
  }
  for (const axis of font.axes) {
    if (axisOrderings.has(axis.tag))
      continue;
    axisOrderings.set(axis.tag, ++highestOrdering);
  }
  if (!axisOrderings.has("wdth"))
    axisOrderings.set("wdth", lowestOrdering - 2);
  if (!axisOrderings.has("wght"))
    axisOrderings.set("wght", lowestOrdering - 1);
  if (!axisOrderings.has("ital"))
    axisOrderings.set("ital", highestOrdering + 1);
  if (!axisOrderings.has("slnt"))
    axisOrderings.set("slnt", highestOrdering + 2);
  for (const axisTag of varyingAxes) {
    if (!remainingAxes.has(axisTag))
      continue;
    const fontAxis = axisValuesByTag.get(axisTag);
    if (!fontAxis)
      continue;
    remainingAxes.delete(axisTag);
    const elide = styleValueTags.has(axisTag) && !includeStyleValues;
    if (elide)
      continue;
    let name = void 0;
    if (fontAxis.type === "single") {
      const roundValue = roundDecimal$1(fontAxis.value);
      if (axisTag === "wght") {
        name = WEIGHT_NAMES.get(roundValue);
      } else if (axisTag === "wdth") {
        name = WIDTH_NAMES.get(roundValue);
      } else if (axisTag === "opsz") {
        name = `${roundValue}pt`;
      }
      if (!name) {
        name = `${axisTag}${roundValue}`;
      }
    } else {
      name = `${axisTag}${roundDecimal$1(fontAxis.value.min)}_${roundDecimal$1(fontAxis.value.max)}`;
    }
    axisLabels.push({ label: name, ordering: axisOrderings.get(axisTag) ?? 0 });
  }
  if (includeStyleValues) {
    if (font.styleValues.italic.type === "single" && font.styleValues.italic.value !== 0 && !varyingAxes.has("ital")) {
      axisLabels.push({ label: "Italic", ordering: axisOrderings.get("ital") });
    } else if (font.styleValues.slant.type === "single" && font.styleValues.slant.value !== 0 && !varyingAxes.has("slnt")) {
      axisLabels.push({ label: "Oblique", ordering: axisOrderings.get("slnt") });
    }
  }
  axisLabels.sort((a, b) => a.ordering - b.ordering);
  return axisLabels.map(({ label: label2 }) => label2);
};
const fontFilename = (font, varyingAxes, charsetNameOrIndex, overrideName) => {
  const familyName2 = overrideName ?? font.familyName.replace(STYLE_SUBFAMILY_END_REGEX, "").replaceAll(" ", "");
  let filename = familyName2.replaceAll(" ", "");
  const instanceLabels = getInstanceLabels(font, varyingAxes, true);
  if (instanceLabels.length > 0) {
    for (let i = 0; i < instanceLabels.length; i++) {
      instanceLabels[i] = instanceLabels[i].replaceAll(" ", "-");
    }
    filename += `-${instanceLabels.join("-")}`;
  }
  if (typeof charsetNameOrIndex === "string") {
    filename += `-${charsetNameOrIndex}`;
  } else if (typeof charsetNameOrIndex === "number") {
    filename += `-charset${charsetNameOrIndex}`;
  }
  filename = filename.replace(/[\x00-\x1f\x80-\x9f/\\?<>:*|"]/g, "_");
  return filename;
};
const exportedFontsToCSS = (fonts, fontPathPrefix, includeUncompressed) => {
  const emitter = new CSSEmitter();
  if (fontPathPrefix.length > 0 && !fontPathPrefix.endsWith("/")) {
    fontPathPrefix += "/";
  }
  const varyingAxes = findVaryingAxes(fonts.map((f) => f.font));
  for (const { font, data, filename, charsetNameOrIndex, overrideName } of fonts) {
    emitter.atRule("@font-face");
    emitter.declaration("font-family");
    let familyName2 = overrideName ?? font.familyName;
    const instanceLabels = getInstanceLabels(font, varyingAxes.get(font.familyName), false);
    if (instanceLabels.length > 0) {
      familyName2 += ` ${instanceLabels.join(" ")}`;
    }
    emitter.string(familyName2);
    emitter.endDeclaration();
    emitter.declaration("font-display");
    emitter.keyword("swap");
    emitter.endDeclaration();
    emitter.declaration("font-style");
    const { width, weight, italic, slant } = font.styleValues;
    if (slant.type === "variable") {
      emitter.keyword("oblique");
      emitter.number(`${-roundDecimal$1(slant.value.min)}deg`);
      emitter.number(`${-roundDecimal$1(slant.value.max)}deg`);
    } else if (italic.type === "variable") {
      emitter.keyword("oblique");
      emitter.number("0deg");
      emitter.number("14deg");
    } else {
      if (italic.value !== 0 && Math.abs(slant.value + 9.4) < 1e-4) {
        emitter.keyword("italic");
      } else if (slant.value !== 0) {
        emitter.keyword("oblique");
        emitter.number(`${-roundDecimal$1(slant.value)}deg`);
      } else {
        emitter.keyword("normal");
      }
    }
    emitter.endDeclaration();
    emitter.declaration("font-weight");
    if (weight.type === "variable") {
      emitter.number(roundDecimal$1(weight.value.min));
      emitter.number(roundDecimal$1(weight.value.max));
    } else {
      emitter.number(roundDecimal$1(weight.value));
    }
    emitter.endDeclaration();
    emitter.declaration("font-stretch");
    if (width.type === "variable") {
      emitter.number(roundDecimal$1(width.value.min));
      emitter.number(roundDecimal$1(width.value.max));
    } else {
      emitter.number(roundDecimal$1(width.value));
    }
    emitter.endDeclaration();
    emitter.declaration("src");
    const numFormats = Number(data.opentype !== null && includeUncompressed) + Number(data.woff !== null) + Number(data.woff2 !== null);
    if (numFormats > 1) {
      emitter.indentedList();
    }
    if (numFormats === 1 && data.opentype && !includeUncompressed) {
      throw new Error("includeUncompressed is false, but there is no compressed font file to include instead");
    }
    for (const format of ["woff2", "woff", "opentype"]) {
      if (format === "opentype" && !includeUncompressed)
        continue;
      if (data[format]) {
        emitter.parenthesized("url");
        let extension = format;
        if (format === "opentype") {
          extension = font.format === "opentype" ? "otf" : "ttf";
        }
        emitter.string(fontPathPrefix + filename + "." + extension);
        emitter.endParenthesized();
        emitter.parenthesized("format");
        emitter.string(format === "opentype" ? font.format : format);
        emitter.endParenthesized();
        emitter.comma();
      }
    }
    emitter.spans.pop();
    emitter.spans.pop();
    if (numFormats > 1) {
      emitter.endIndentedList();
    }
    emitter.endDeclaration();
    if (charsetNameOrIndex !== null) {
      emitter.declaration("unicode-range");
      const ranges = formatUnicodeRanges(font.unicodeRanges);
      for (let i = 0; i < ranges.length; i++) {
        emitter.number(ranges[i]);
        if (i !== ranges.length - 1)
          emitter.comma();
      }
      emitter.endDeclaration();
    }
    emitter.endRule();
  }
  return emitter;
};
const exportFonts = async (compressionContext2, families2, { formats, woffCompression = 15, woff2Compression = 11, onProgress }) => {
  const fontList = [];
  const subsetSettingsByFont = instanceSubsetSettings(families2);
  for (const family of families2) {
    for (const font of family.fonts) {
      const settings = subsetSettingsByFont.get(font.font.id);
      for (const flattenedSettings of settings) {
        fontList.push({ font: font.font, overrideName: family.overrideName, settings: flattenedSettings });
      }
    }
  }
  const subsetProgressProportion = 1;
  const parallelism = await compressionContext2?.getParallelism() ?? 1;
  const woff1ProgressProportion = 2 * woffCompression / Math.min(parallelism, fontList.length);
  const woff2ProgressProportion = 32 / Math.min(parallelism, fontList.length);
  let totalProgressProportion = 0;
  for (const font of fontList) {
    if (font.settings) {
      totalProgressProportion += subsetProgressProportion;
    }
  }
  if (formats.woff) {
    totalProgressProportion += woff1ProgressProportion * fontList.length;
  }
  if (formats.woff2) {
    totalProgressProportion += woff2ProgressProportion * fontList.length;
  }
  let progress = 0;
  onProgress?.(0);
  let cancelled = false;
  const fontPromises = fontList.map(async ({ font, overrideName, settings }) => {
    const subsettedFont = await font.subset(settings);
    if (cancelled)
      throw new Error("Aborted");
    const dataInFormats = {
      opentype: formats.ttf ? subsettedFont.data : null,
      woff: null,
      woff2: null
    };
    progress += subsetProgressProportion;
    onProgress?.(progress / totalProgressProportion);
    const compressionPromises = [];
    if ((formats.woff || formats.woff2) && compressionContext2 === null) {
      throw new Error("woff or woff2 formats enabled but no compression context provided");
    }
    if (formats.woff) {
      compressionPromises.push(compressionContext2.compressFromTTF(subsettedFont.data, { algorithm: "woff", level: woffCompression }).then((compressed) => {
        if (cancelled)
          throw new Error("Aborted");
        progress += woff1ProgressProportion;
        onProgress?.(progress / totalProgressProportion);
        dataInFormats.woff = compressed;
      }));
    }
    if (formats.woff2) {
      compressionPromises.push(compressionContext2.compressFromTTF(subsettedFont.data, { algorithm: "woff2", level: woff2Compression }).then((compressed) => {
        if (cancelled)
          throw new Error("Aborted");
        progress += woff2ProgressProportion;
        onProgress?.(progress / totalProgressProportion);
        dataInFormats.woff2 = compressed;
      }));
    }
    if (compressionPromises.length > 0)
      await Promise.all(compressionPromises);
    return {
      font: subsettedFont,
      overrideName,
      filename: "",
      // This will be filled in later. It's just to get TypeScript to shut up.
      data: dataInFormats,
      charsetNameOrIndex: settings ? settings.charsetNameOrIndex : null,
      extension(format) {
        if (format === "opentype") {
          return subsettedFont.format === "opentype" ? "otf" : "ttf";
        }
        return format;
      }
    };
  });
  return Promise.all(fontPromises).then((exportedFonts2) => {
    const filenames = fontFilenames(exportedFonts2);
    for (const exportedFont of exportedFonts2) {
      const filename = filenames.get(exportedFont.font);
      exportedFont.filename = filename;
    }
    return exportedFonts2;
  }, (error2) => {
    cancelled = true;
    throw error2;
  });
};
const axesListJson = /* @__PURE__ */ JSON.parse(`[{"tag":"ARRR","minValue":10,"defaultValue":10,"maxValue":60,"precision":0,"fallback":[{"name":"Default","value":10}],"displayName":"AR Retinal Resolution","description":" Resolution-specific enhancements in AR/VR typefaces to optimize rendering across the different resolutions of the headsets making designs accessible and easy to read.","fallbackOnly":false,"popularity":1},{"tag":"BLED","minValue":0,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Bleed","description":"Bleed adjusts the overall darkness in the typographic color of strokes or other forms, without any changes in overall width, line breaks, or page layout. Negative values make the font appearance lighter, while positive values make it darker, similarly to ink bleed or dot gain on paper.","fallbackOnly":false,"popularity":3},{"tag":"BNCE","minValue":-100,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Bounce","description":"Shift glyphs up and down in the Y dimension, resulting in an uneven, bouncy baseline.","fallbackOnly":false,"popularity":1},{"tag":"CASL","minValue":0,"defaultValue":0,"maxValue":1,"precision":-2,"fallback":[{"name":"Linear","value":0},{"name":"Casual","value":1}],"displayName":"Casual","description":"Adjust stroke curvature, contrast, and terminals from a sturdy, rational Linear style to a friendly, energetic Casual style.","fallbackOnly":false,"illustrationUrl":"casual.svg","popularity":1},{"tag":"CTRS","minValue":-100,"defaultValue":0,"maxValue":100,"precision":1,"fallback":[{"name":"Reversed","value":-100},{"name":"None","value":0},{"name":"High","value":100}],"displayName":"Contrast","description":"Contrast describes the stroke width difference between the thick and thin parts of the font glyphs. A value of zero indicates no visible/apparent contrast. A positive number indicates an increase in contrast relative to the zero-contrast thickness, achieved by making the thin stroke thinner. A value of 100 indicates that the thin stroke has disappeared completely. A negative value indicates “reverse contrast”: the strokes which would conventionally be thick in the writing system are instead made thinner. In western-language fonts this might be perceived as a 19th-century, “circus” or “old West” effect. A value of -100 indicates that the strokes which would normally be thick have disappeared completely.","fallbackOnly":false,"illustrationUrl":"contrast.svg","popularity":0},{"tag":"CRSV","minValue":0,"defaultValue":0.5,"maxValue":1,"precision":-1,"fallback":[{"name":"Roman","value":0,"displayName":"Off"},{"name":"Auto","value":0.5},{"name":"Cursive","value":1,"displayName":"On"}],"displayName":"Cursive","description":"Control the substitution of cursive forms along the Slant axis. 'Off' (0) maintains Roman letterforms such as a double-storey a and g, 'Auto' (0.5) allows for Cursive substitution, and 'On' (1) asserts cursive forms even in upright text with a Slant of 0.","fallbackOnly":true,"illustrationUrl":"cursive.svg","popularity":10},{"tag":"EHLT","minValue":0,"defaultValue":12,"maxValue":1000,"precision":0,"fallback":[{"name":"Default","value":12}],"displayName":"Edge Highlight","description":"Controls thickness of edge highlight details.","fallbackOnly":false,"popularity":1},{"tag":"ELXP","minValue":0,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Element Expansion","description":"As the Element Expansion axis progresses, the elements move apart.","fallbackOnly":false,"popularity":8},{"tag":"ELGR","minValue":1,"defaultValue":1,"maxValue":2,"precision":-1,"fallback":[{"name":"Default","value":1}],"displayName":"Element Grid","description":"In modular fonts, where glyphs are composed using multiple copies of the same element, this axis controls how many elements are used per one grid unit.","fallbackOnly":false,"popularity":1},{"tag":"ELSH","minValue":0,"defaultValue":0,"maxValue":100,"precision":-1,"fallback":[{"name":"Default","value":0}],"displayName":"Element Shape","description":"In modular fonts, where glyphs are composed using multiple copies of the same element, this axis controls the shape of the element","fallbackOnly":false,"popularity":10},{"tag":"EDPT","minValue":0,"defaultValue":100,"maxValue":1000,"precision":0,"fallback":[{"name":"Default","value":100}],"displayName":"Extrusion Depth","description":"Controls the 3D depth on contours.","fallbackOnly":false,"popularity":1},{"tag":"FILL","minValue":0,"defaultValue":0,"maxValue":1,"precision":-2,"fallback":[{"name":"Normal","value":0},{"name":"Filled","value":1}],"displayName":"Fill","description":"Fill in transparent forms with opaque ones. Sometimes interior opaque forms become transparent, to maintain contrasting shapes. This can be useful in animation or interaction to convey a state transition. Ranges from 0 (no treatment) to 1 (completely filled).","fallbackOnly":false,"illustrationUrl":"fill.svg","popularity":0},{"tag":"FLAR","minValue":0,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Flare","description":"As the flare axis grows, the stem terminals go from straight (0%) to develop a swelling (100%).","fallbackOnly":false,"popularity":1},{"tag":"GRAD","minValue":-1000,"defaultValue":0,"maxValue":1000,"precision":0,"fallback":[{"name":"Normal","value":0}],"displayName":"Grade","description":"Finesse the style from lighter to bolder in typographic color, without any changes overall width, line breaks or page layout. Negative grade makes the style lighter, while positive grade makes it bolder. The units are the same as in the Weight axis.","fallbackOnly":false,"illustrationUrl":"grade.svg","popularity":3},{"tag":"HEXP","minValue":0,"defaultValue":0,"maxValue":100,"precision":-1,"fallback":[{"name":"Default","value":0}],"displayName":"Hyper Expansion","description":"Expansion of inner and outer space of glyphs.","fallbackOnly":false,"popularity":1},{"tag":"INFM","minValue":0,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Informality","description":"Adjusts overall design from formal and traditional (0%) to informal and unconventional (up to 100%).","fallbackOnly":false,"popularity":1},{"tag":"ital","minValue":0,"defaultValue":0,"maxValue":1,"precision":0,"fallback":[{"name":"Roman","value":0},{"name":"Italic","value":1}],"displayName":"Italic","description":"Adjust the style from roman to italic. This can be provided as a continuous range within a single font file, like most axes, or as a toggle between two roman and italic files that form a family as a pair.","fallbackOnly":true,"illustrationUrl":"italic.svg","popularity":0},{"tag":"MONO","minValue":0,"defaultValue":0,"maxValue":1,"precision":-2,"fallback":[{"name":"Proportional","value":0},{"name":"Monospace","value":1}],"displayName":"Monospace","description":"Adjust the style from Proportional (natural widths, default) to Monospace (fixed width). With proportional spacing, each glyph takes up a unique amount of space on a line, while monospace is when all glyphs have the same total character width.","fallbackOnly":false,"illustrationUrl":"monospace.svg","popularity":2},{"tag":"MORF","minValue":0,"defaultValue":0,"maxValue":60,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Morph","description":"Letterforms morph: Changing in unconventional ways, that don't alter other attributes, like width or weight. The range from 0 to 60 can be understood as seconds.","fallbackOnly":false,"popularity":3},{"tag":"opsz","minValue":5,"defaultValue":14,"maxValue":1200,"precision":-1,"fallback":[{"name":"6pt","value":6},{"name":"7pt","value":7},{"name":"8pt","value":8},{"name":"9pt","value":9},{"name":"10pt","value":10},{"name":"11pt","value":11},{"name":"12pt","value":12},{"name":"14pt","value":14},{"name":"16pt","value":16},{"name":"17pt","value":17},{"name":"18pt","value":18},{"name":"20pt","value":20},{"name":"24pt","value":24},{"name":"28pt","value":28},{"name":"36pt","value":36},{"name":"48pt","value":48},{"name":"60pt","value":60},{"name":"72pt","value":72},{"name":"96pt","value":96},{"name":"120pt","value":120},{"name":"144pt","value":144}],"displayName":"Optical Size","description":"Adapt the style to specific text sizes. At smaller sizes, letters typically become optimized for more legibility. At larger sizes, optimized for headlines, with more extreme weights and widths. In CSS this axis is activated automatically when it is available.","fallbackOnly":false,"illustrationUrl":"optical_size.svg","popularity":27},{"tag":"ROND","minValue":0,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Roundness","description":"Adjust shapes from angular defaults (0%) to become increasingly rounded (up to 100%).","fallbackOnly":false,"popularity":2},{"tag":"SCAN","minValue":-100,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Scanlines","description":"Break up shapes into horizontal segments without any changes in overall width, letter spacing, or kerning, so there are no line breaks or page layout changes. Negative values make the scanlines thinner, and positive values make them thicker.","fallbackOnly":false,"popularity":3},{"tag":"SHLN","minValue":0,"defaultValue":50,"maxValue":100,"precision":-1,"fallback":[{"name":"Default","value":50}],"displayName":"Shadow Length","description":"Adjusts the font's shadow length from no shadow visible (0 %) to a maximum shadow applied (100%) relative to each family design.","fallbackOnly":false,"popularity":1},{"tag":"SHRP","minValue":0,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Sharpness","description":"Adjust shapes from angular or blunt default shapes (0%) to become increasingly sharped forms (up to 100%).","fallbackOnly":false,"popularity":1},{"tag":"SZP1","minValue":-100,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Size of Paint 1","description":"Modifies the size of a paint element going from an initial size (0) to positive values that increase the size (100%) or negative values that shrink it down (-100%). Reducing the size can create transparency.","fallbackOnly":false,"popularity":2},{"tag":"SZP2","minValue":-100,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Size of Paint 2","description":"Modifies the size of a paint element going from an initial size (0) to positive values that increase the size (100%) or negative values that shrink it down (-100%). Reducing the size can create transparency. Paint 2 is in front of Paint 1.","fallbackOnly":false,"popularity":2},{"tag":"slnt","minValue":-90,"defaultValue":0,"maxValue":90,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Slant","description":"Adjust the style from upright to slanted. Negative values produce right-leaning forms, also known to typographers as an 'oblique' style. Positive values produce left-leaning forms, also called a 'backslanted' or 'reverse oblique' style.","fallbackOnly":false,"illustrationUrl":"slant.svg","popularity":17},{"tag":"SOFT","minValue":0,"defaultValue":0,"maxValue":100,"precision":-1,"fallback":[{"name":"Sharp","value":0},{"name":"Soft","value":50},{"name":"SuperSoft","value":100}],"displayName":"Softness","description":"Adjust letterforms to become more and more soft and rounded.","fallbackOnly":false,"illustrationUrl":"softness.svg","popularity":1},{"tag":"SPAC","minValue":-100,"defaultValue":0,"maxValue":100,"precision":-1,"fallback":[{"name":"Default","value":0}],"displayName":"Spacing","description":"Adjusts the overall letter spacing of a font. The range is a relative percentage change from the family’s default spacing, so the default value is 0.","fallbackOnly":false,"popularity":1},{"tag":"VOLM","minValue":0,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Volume","description":"Expands and exaggerates details of a typeface to emphasize the personality. Understood in a percentage amount, it goes from a neutral state (0%) to a maximum level (100%).","fallbackOnly":false,"popularity":1},{"tag":"wght","minValue":1,"defaultValue":400,"maxValue":1000,"precision":0,"fallback":[{"name":"Thin","value":100},{"name":"ExtraLight","value":200},{"name":"Light","value":300},{"name":"Regular","value":400},{"name":"Medium","value":500},{"name":"SemiBold","value":600},{"name":"Bold","value":700},{"name":"ExtraBold","value":800},{"name":"Black","value":900}],"displayName":"Weight","description":"Adjust the style from lighter to bolder in typographic color, by varying stroke weights, spacing and kerning, and other aspects of the type. This typically changes overall width, and so may be used in conjunction with Width and Grade axes.","fallbackOnly":false,"illustrationUrl":"weight.svg","popularity":499},{"tag":"wdth","minValue":25,"defaultValue":100,"maxValue":200,"precision":-1,"fallback":[{"name":"SuperCondensed","value":25},{"name":"UltraCondensed","value":50},{"name":"ExtraCondensed","value":62.5},{"name":"Condensed","value":75},{"name":"SemiCondensed","value":87.5},{"name":"Normal","value":100},{"name":"SemiExpanded","value":112.5},{"name":"Expanded","value":125},{"name":"ExtraExpanded","value":150},{"name":"UltraExpanded","value":200}],"displayName":"Width","description":"Adjust the style from narrower to wider, by varying the proportions of counters, strokes, spacing and kerning, and other aspects of the type. This typically changes the typographic color in a subtle way, and so may be used in conjunction with Weight and Grade axes.","fallbackOnly":false,"illustrationUrl":"width.svg","popularity":90},{"tag":"WONK","minValue":0,"defaultValue":0,"maxValue":1,"precision":0,"fallback":[{"name":"NonWonky","value":0},{"name":"Wonky","value":1}],"displayName":"Wonky","description":"Toggle the substitution of wonky forms. 'Off' (0) maintains more conventional letterforms, while 'On' (1) maintains wonky letterforms, such as leaning stems in roman, or flagged ascenders in italic. These forms are also controlled by Optical Size.","fallbackOnly":true,"illustrationUrl":"wonky.svg","popularity":1},{"tag":"XELA","minValue":-100,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Horizontal Element Alignment","description":"Align glyph elements from their default position (0%), usually the baseline, to a rightmost (100%) or leftmost (-100%) position.","fallbackOnly":false,"popularity":1},{"tag":"XOPQ","minValue":-1000,"defaultValue":88,"maxValue":2000,"precision":0,"fallback":[{"name":"Normal","value":88}],"displayName":"Thick Stroke","description":"A parametric axis for varying thick stroke weights, such as stems.","fallbackOnly":false,"illustrationUrl":"x_opaque.svg","popularity":1},{"tag":"XPN1","minValue":-100,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Horizontal Position of Paint 1","description":"The position of the paint moves left and right. Negative values move to the left and positive values move to the right, in the X dimension. Paint 1 is behind Paint 2.","fallbackOnly":false,"popularity":2},{"tag":"XPN2","minValue":-100,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Horizontal Position of Paint 2","description":"The position of the paint moves left and right. Negative values move to the left and positive values move to the right, in the X dimension. Paint 2 is in front of Paint 1.","fallbackOnly":false,"popularity":2},{"tag":"XROT","minValue":-180,"defaultValue":0,"maxValue":180,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Rotation in X","description":"Glyphs rotate left and right, negative values to the left and positive values to the right, in the X dimension.","fallbackOnly":false,"popularity":3},{"tag":"XTRA","minValue":-1000,"defaultValue":400,"maxValue":2000,"precision":0,"fallback":[{"name":"Normal","value":400}],"displayName":"Counter Width","description":"A parametric axis for varying counter widths in the X dimension.","fallbackOnly":false,"illustrationUrl":"x_transparent.svg","popularity":1},{"tag":"XTFI","minValue":-1000,"defaultValue":400,"maxValue":2000,"precision":0,"fallback":[{"name":"Normal","value":400}],"displayName":"X transparent figures","description":"Assigns a 'white' per mille value to each instance of the design space.","fallbackOnly":false,"popularity":0},{"tag":"YELA","minValue":-100,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Vertical Element Alignment","description":"Align glyphs elements from their default position (0%), usually the baseline, to an upper (100%) or lower (-100%) position.","fallbackOnly":false,"popularity":2},{"tag":"YOPQ","minValue":-1000,"defaultValue":116,"maxValue":2000,"precision":0,"fallback":[{"name":"Normal","value":116}],"displayName":"Thin Stroke","description":"A parametric axis for varying thin stroke weights, such as bars and hairlines.","fallbackOnly":false,"illustrationUrl":"y_opaque.svg","popularity":2},{"tag":"YPN1","minValue":-100,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Vertical Position of Paint 1","description":"The position of the paint moves up and down. Negative values move down and positive values move up. Paint 1 is behind Paint 2.","fallbackOnly":false,"popularity":2},{"tag":"YPN2","minValue":-100,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Vertical Position of Paint 2","description":"The position of the paint moves up and down. Negative values move down and positive values move up. Paint 2 is in front of Paint 1.","fallbackOnly":false,"popularity":2},{"tag":"YROT","minValue":-180,"defaultValue":0,"maxValue":180,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Rotation in Y","description":"Glyphs rotate up and down, negative values tilt down and positive values tilt up, in the Y dimension.","fallbackOnly":false,"popularity":3},{"tag":"YTAS","minValue":0,"defaultValue":750,"maxValue":1000,"precision":0,"fallback":[{"name":"Normal","value":750}],"displayName":"Ascender Height","description":"A parametric axis for varying the height of lowercase ascenders.","fallbackOnly":false,"illustrationUrl":"y_transparent_ascender.svg","popularity":1},{"tag":"YTDE","minValue":-1000,"defaultValue":-250,"maxValue":0,"precision":0,"fallback":[{"name":"Normal","value":-250}],"displayName":"Descender Depth","description":"A parametric axis for varying the depth of lowercase descenders.","fallbackOnly":false,"illustrationUrl":"y_transparent_descender.svg","popularity":1},{"tag":"YTFI","minValue":-1000,"defaultValue":600,"maxValue":2000,"precision":0,"fallback":[{"name":"Normal","value":600}],"displayName":"Figure Height","description":"A parametric axis for varying the height of figures.","fallbackOnly":false,"illustrationUrl":"y_transparent_figures.svg","popularity":1},{"tag":"YTLC","minValue":0,"defaultValue":500,"maxValue":1000,"precision":0,"fallback":[{"name":"Normal","value":500}],"displayName":"Lowercase Height","description":"A parametric axis for varying the height of the lowercase.","fallbackOnly":false,"illustrationUrl":"y_transparent_lowercase.svg","popularity":2},{"tag":"YTUC","minValue":0,"defaultValue":725,"maxValue":1000,"precision":0,"fallback":[{"name":"Normal","value":725}],"displayName":"Uppercase Height","description":"A parametric axis for varying the heights of uppercase letterforms.","fallbackOnly":false,"illustrationUrl":"y_transparent_uppercase.svg","popularity":1},{"tag":"YEXT","minValue":0,"defaultValue":0,"maxValue":100,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Vertical Extension","description":"The axis extends glyphs in the Y dimension, such as the Cap Height, Ascender and Descender lengths. This is a relative axis, starting at 0% and going to the typeface's individual maximum extent at 100%.","fallbackOnly":false,"popularity":0},{"tag":"YEAR","minValue":-4000,"defaultValue":2000,"maxValue":4000,"precision":0,"fallback":[{"name":"Default","value":2000}],"displayName":"Year","description":"Axis that shows in a metaphoric way the effect of time on a chosen topic.","fallbackOnly":false,"popularity":1},{"tag":"ZROT","minValue":-180,"defaultValue":0,"maxValue":180,"precision":0,"fallback":[{"name":"Default","value":0}],"displayName":"Rotation in Z","description":"Glyphs rotate left and right, negative values to the left and positive values to the right, in the Z dimension.","fallbackOnly":false,"popularity":0}]`);
const axesList = axesListJson;
axesList.sort((a, b) => b.popularity - a.popularity);
const axisMetadata = /* @__PURE__ */ new Map();
for (const axis of axesList) {
  axisMetadata.set(axis.tag, axis);
}
const settingsFromFonts = (fonts) => {
  const instanceValuesSetting = (axis, axisInstanceValues) => {
    if (Object.prototype.hasOwnProperty.call(axisInstanceValues, axis.tag)) {
      const instanceValues = axisInstanceValues[axis.tag];
      if (instanceValues.length > 0) return instanceValues.map((v) => roundDecimal(v)).join(", ");
    }
    return `${roundDecimal(axis.min)}, ${roundDecimal(axis.max)}`;
  };
  const styleValuesToSettings = (styleValues, axisInstanceValues) => {
    const styleSettings = {};
    for (const [styleName, styleValue] of Object.entries(styleValues)) {
      let styleSetting2;
      switch (styleValue.type) {
        case "single": {
          styleSetting2 = { type: "single", value: styleValue.value };
          break;
        }
        case "variable": {
          const axis = {
            weight: "wght",
            width: "wdth",
            italic: "ital",
            slant: "slnt"
          }[styleName];
          styleSetting2 = {
            type: "variable",
            value: {
              min: styleValue.value.min,
              defaultValue: styleValue.value.defaultValue,
              max: styleValue.value.max,
              curMin: d(styleValue.value.min),
              curMax: d(styleValue.value.max),
              curSingle: d(styleValue.value.defaultValue),
              curMultiValue: d(axis ? instanceValuesSetting({ tag: axis, ...styleValue.value }, axisInstanceValues) : ""),
              mode: d("range")
            }
          };
          break;
        }
      }
      styleSettings[styleName] = styleSetting2;
    }
    return styleSettings;
  };
  const filenames = /* @__PURE__ */ new Map();
  for (const { font, filename } of fonts) {
    filenames.set(font, filename);
  }
  return sortFontsIntoFamilies(fonts.map(({ font }) => font)).map((family) => {
    const includeFeatures = {
      features: [],
      stylisticSets: [],
      characterVariants: []
    };
    for (const feature of family.features) {
      if (featureMetadata(feature.tag).required) continue;
      const isNumeric = /(?:ss|cv)\d{2}/.test(feature.tag);
      const dest = isNumeric && feature.tag.slice(0, 2) === "ss" ? includeFeatures.stylisticSets : isNumeric && feature.tag.slice(0, 2) === "cv" ? includeFeatures.characterVariants : includeFeatures.features;
      dest.push({ feature, include: d(feature.keepByDefault) });
    }
    return {
      name: family.name,
      fonts: family.fonts.map(({ font, styleValues }) => ({
        font,
        styleSettings: styleValuesToSettings(styleValues, family.axisInstanceValues),
        filename: filenames.get(font)
      })),
      settings: {
        styleSettings: styleValuesToSettings(family.styleValues, family.axisInstanceValues),
        axisSettings: family.axes.map((axis) => {
          let axisName = axis.name ?? void 0;
          if (axis.name === axis.tag || typeof axis.name === "undefined") {
            axisName = axisMetadata.get(axis.tag)?.displayName;
          }
          return {
            tag: axis.tag,
            name: axisName ?? axis.tag,
            range: {
              min: axis.min,
              defaultValue: axis.defaultValue,
              max: axis.max,
              curMin: d(axis.min),
              curMax: d(axis.max),
              curSingle: d(axis.defaultValue),
              curMultiValue: d(instanceValuesSetting(axis, family.axisInstanceValues)),
              mode: d("range")
            }
          };
        }),
        includeFeatures,
        includeCharacters: {
          includeAllCharacters: d(false),
          characterSets: d([{
            includeNamedSubsets: family.namedSubsets.map((name) => ({ name, include: d(true) })),
            includeUnicodeRanges: d(""),
            name: d("")
          }])
        }
      },
      enableSubsetting: d(true)
    };
  });
};
const roundDecimal = (v) => Math.round(v * 1e3) / 1e3;
const saveAxisSetting = (axis) => {
  return {
    curMin: axis.curMin.value,
    curMax: axis.curMax.value,
    curSingle: axis.curSingle.value,
    curMultiValue: axis.curMultiValue.value,
    mode: axis.mode.value
  };
};
const saveStyleSetting = (setting2) => {
  if (setting2.type === "single") {
    return setting2;
  }
  return {
    type: "variable",
    value: saveAxisSetting(setting2.value)
  };
};
const saveStyleSettings = (settings) => {
  const styleSettings = {};
  for (const key of ["weight", "width", "italic", "slant"]) {
    if (settings[key]) {
      styleSettings[key] = saveStyleSetting(settings[key]);
    }
  }
  return styleSettings;
};
const saveSubsetSettings = (settings) => {
  const saveIncludeFeatures = (features) => {
    return features.map(({ feature, include }) => ({ tag: feature.tag, include: include.value }));
  };
  return {
    styleSettings: saveStyleSettings(settings.styleSettings),
    axisSettings: settings.axisSettings.map(({ tag, name, range }) => ({ tag, name, range: saveAxisSetting(range) })),
    includeFeatures: {
      features: saveIncludeFeatures(settings.includeFeatures.features),
      stylisticSets: saveIncludeFeatures(settings.includeFeatures.stylisticSets),
      characterVariants: saveIncludeFeatures(settings.includeFeatures.characterVariants)
    },
    includeCharacters: {
      includeAllCharacters: settings.includeCharacters.includeAllCharacters.value,
      characterSets: settings.includeCharacters.characterSets.value.map(({
        includeNamedSubsets,
        includeUnicodeRanges,
        name
      }) => ({
        includeNamedSubsets: includeNamedSubsets.map(({ name: name2, include }) => ({ name: name2, include: include.value })),
        includeUnicodeRanges: includeUnicodeRanges.value,
        name: name.value
      }))
    }
  };
};
const saveSettings = (settings) => {
  const fonts = [];
  for (const { font, styleSettings } of settings.fonts) {
    fonts.push({ fontUid: font.uid, styleSettings: saveStyleSettings(styleSettings) });
  }
  return {
    name: settings.name,
    fonts,
    settings: saveSubsetSettings(settings.settings),
    enableSubsetting: settings.enableSubsetting.value
  };
};
const loadAxisSetting = (dest, axis) => {
  dest.curMin.value = Math.max(axis.curMin, dest.min);
  dest.curMax.value = Math.min(axis.curMax, dest.max);
  dest.curSingle.value = Math.max(dest.min, Math.min(axis.curSingle, dest.max));
  dest.curMultiValue.value = axis.curMultiValue;
  dest.mode.value = axis.mode;
};
const loadAxisSettings = (dest, settings) => {
  for (const { tag, range } of settings) {
    const destSetting = dest.find(({ tag: destTag }) => destTag === tag);
    if (!destSetting) continue;
    loadAxisSetting(destSetting.range, range);
  }
};
const loadStyleSetting = (dest, setting2) => {
  if (dest.type === "single") return;
  if (setting2.type === "single") {
    dest.value.curSingle.value = Math.max(dest.value.min, Math.min(setting2.value, dest.value.max));
    dest.value.mode.value = "single";
  } else {
    loadAxisSetting(dest.value, setting2.value);
  }
};
const loadStyleSettings = (dest, settings) => {
  for (const key of ["weight", "width", "italic", "slant"]) {
    if (!dest[key] || !settings[key]) continue;
    loadStyleSetting(dest[key], settings[key]);
  }
};
const loadIncludeFeatures = (dest, features) => {
  for (const { tag, include } of features) {
    const destFeature = dest.find(({ feature: destInfo }) => destInfo.tag === tag);
    if (!destFeature || featureMetadata(destFeature.feature.tag).required) continue;
    destFeature.include.value = include;
  }
};
const loadNamedSubsets = (dest, namedSubsets) => {
  for (const { name, include } of namedSubsets) {
    const destSubset = dest.find(({ name: destName }) => destName === name);
    if (!destSubset) continue;
    destSubset.include.value = include;
  }
};
const loadCharacterSetSettings = (settings) => {
  const destCharacterSet = {
    includeNamedSubsets: [],
    includeUnicodeRanges: d(settings.includeUnicodeRanges),
    name: d(settings.name ?? "")
  };
  loadNamedSubsets(destCharacterSet.includeNamedSubsets, settings.includeNamedSubsets);
  return destCharacterSet;
};
const loadIncludeCharacters = (dest, settings) => {
  dest.includeAllCharacters.value = settings.includeAllCharacters;
  if ("characterSets" in settings) {
    settings.characterSets.map((charSet) => loadCharacterSetSettings(charSet));
  } else {
    dest.characterSets.value = [loadCharacterSetSettings(settings)];
  }
};
const loadSubsetSettings = (dest, settings) => {
  loadStyleSettings(dest.styleSettings, settings.styleSettings);
  loadAxisSettings(dest.axisSettings, settings.axisSettings);
  loadIncludeFeatures(dest.includeFeatures.features, settings.includeFeatures.features);
  loadIncludeFeatures(dest.includeFeatures.stylisticSets, settings.includeFeatures.stylisticSets);
  loadIncludeFeatures(
    dest.includeFeatures.characterVariants,
    settings.includeFeatures.characterVariants
  );
  loadIncludeCharacters(dest.includeCharacters, settings.includeCharacters);
};
const loadSettings = (dest, settings) => {
  loadSubsetSettings(dest.settings, settings.settings);
  for (const { font, styleSettings } of dest.fonts) {
    loadStyleSettings(styleSettings, settings.settings.styleSettings);
    const srcFont = settings.fonts.find(({ fontUid }) => fontUid === font.uid);
    if (!srcFont) continue;
    loadStyleSettings(styleSettings, srcFont.styleSettings);
  }
  dest.enableSubsetting.value = settings.enableSubsetting;
};
const copySubsetSettings = (settings) => {
  return {
    settings: saveSubsetSettings(settings.settings),
    type: "subsetSettingsV1"
  };
};
const copyStyleSettings = (settings) => {
  return {
    settings: saveStyleSettings(settings),
    type: "styleSettingsV1"
  };
};
const copyAxisSettings = (settings) => {
  return {
    settings: settings.map(({ tag, name, range }) => ({
      tag,
      name,
      range: saveAxisSetting(range)
    })),
    type: "axisSettingsV1"
  };
};
const copyFeatureSettings = (settings) => {
  return {
    settings: {
      features: settings.features.map(({ feature, include }) => ({
        tag: feature.tag,
        include: include.value
      })),
      stylisticSets: settings.stylisticSets.map(({ feature, include }) => ({
        tag: feature.tag,
        include: include.value
      })),
      characterVariants: settings.characterVariants.map(({ feature, include }) => ({
        tag: feature.tag,
        include: include.value
      }))
    },
    type: "featureSettingsV1"
  };
};
const copyIncludeCharactersSettings = (settings) => {
  return {
    settings: {
      includeAllCharacters: settings.includeAllCharacters.value,
      characterSets: settings.characterSets.value.map(({ includeNamedSubsets, includeUnicodeRanges, name }) => ({
        includeNamedSubsets: includeNamedSubsets.map(({ name: name2, include }) => ({ name: name2, include: include.value })),
        includeUnicodeRanges: includeUnicodeRanges.value,
        name: name.value
      }))
    },
    type: "includeCharactersSettingsV2"
  };
};
const pasteSubsetSettings = (dest, settings) => {
  switch (settings.type) {
    case "subsetSettingsV1": {
      loadSubsetSettings(dest.settings, settings.settings);
      break;
    }
    case "styleSettingsV1": {
      loadStyleSettings(dest.settings.styleSettings, settings.settings);
      for (const font of dest.fonts) {
        loadStyleSettings(font.styleSettings, settings.settings);
      }
      break;
    }
    case "axisSettingsV1": {
      loadAxisSettings(dest.settings.axisSettings, settings.settings);
      break;
    }
    case "featureSettingsV1": {
      loadIncludeFeatures(dest.settings.includeFeatures.features, settings.settings.features);
      loadIncludeFeatures(dest.settings.includeFeatures.stylisticSets, settings.settings.stylisticSets);
      loadIncludeFeatures(
        dest.settings.includeFeatures.characterVariants,
        settings.settings.characterVariants
      );
      break;
    }
  }
};
const pasteStyleSettings = (dest, settings) => {
  switch (settings.type) {
    case "subsetSettingsV1": {
      loadStyleSettings(dest, settings.settings.styleSettings);
      break;
    }
    case "styleSettingsV1": {
      loadStyleSettings(dest, settings.settings);
      break;
    }
  }
};
const pasteAxisSettings = (dest, settings) => {
  switch (settings.type) {
    case "subsetSettingsV1": {
      loadAxisSettings(dest, settings.settings.axisSettings);
      break;
    }
    case "axisSettingsV1": {
      loadAxisSettings(dest, settings.settings);
      break;
    }
  }
};
const pasteFeatureSettings = (dest, settings) => {
  switch (settings.type) {
    case "subsetSettingsV1": {
      loadIncludeFeatures(dest.features, settings.settings.includeFeatures.features);
      loadIncludeFeatures(
        dest.stylisticSets,
        settings.settings.includeFeatures.stylisticSets
      );
      loadIncludeFeatures(
        dest.characterVariants,
        settings.settings.includeFeatures.characterVariants
      );
      break;
    }
    case "featureSettingsV1": {
      loadIncludeFeatures(dest.features, settings.settings.features);
      loadIncludeFeatures(dest.stylisticSets, settings.settings.stylisticSets);
      loadIncludeFeatures(
        dest.characterVariants,
        settings.settings.characterVariants
      );
      break;
    }
  }
};
const pasteIncludeCharactersSettings = (dest, settings) => {
  switch (settings.type) {
    case "subsetSettingsV1": {
      loadIncludeCharacters(dest, settings.settings.includeCharacters);
      break;
    }
    case "includeCharactersSettingsV1":
    case "includeCharactersSettingsV2": {
      loadIncludeCharacters(dest, settings.settings);
      break;
    }
  }
};
const throttle = (fn, delay, debounce = false) => {
  let timeout;
  let lastExecutionTime = 0;
  const throttle2 = (...args) => {
    if (typeof timeout === "number") {
      window.clearTimeout(timeout);
    }
    const now = Date.now();
    const run = () => {
      fn(...args);
      lastExecutionTime = now;
    };
    if (now - lastExecutionTime >= delay && !debounce) {
      run();
    } else {
      timeout = window.setTimeout(run, delay);
    }
  };
  throttle2.cancel = () => {
    if (typeof timeout === "number") {
      window.clearTimeout(timeout);
    }
  };
  return throttle2;
};
const useThrottledSignal = (input, delay, debounce = false) => {
  const throttled = T(() => d(input.peek()), [input]);
  const updateValueThrottled = A();
  y(() => {
    const newThrottleFn = throttle((newValue) => {
      throttled.value = newValue;
    }, delay, debounce);
    updateValueThrottled.current = newThrottleFn;
    return () => {
      newThrottleFn.cancel();
    };
  }, [input, delay, debounce, throttle]);
  y(() => {
    if (updateValueThrottled.current && throttled.peek() !== input.value) {
      updateValueThrottled.current(input.value);
    }
  }, [input, input.value]);
  return throttled;
};
const stringlequote = (s, quotes) => {
  const doubleQuoted = JSON.stringify(s);
  const stringified = doubleQuoted.slice(1, -1);
  return `'${stringified.replace(/\\"|'/g, (c) => c === "'" ? "\\'" : '"')}'`;
};
const maybeQuoteIdentifier = (s, quotes) => {
  if (/[a-z_][a-z0-9_]*/i.test(s)) return s;
  return stringlequote(s);
};
const generateConfig = ({ settings, quotes }) => {
  const inputFiles = /* @__PURE__ */ new Set();
  for (const family of settings.fonts.value) {
    for (const { filename } of family.fonts) {
      inputFiles.add(filename);
    }
  }
  let result = `/**
* @import {GlyphtConfig} from '@glypht/cli'
*/

/** @satisfies {GlyphtConfig} */
export default {
    // You can also use glob patterns here. These paths are resolved relative to this config file.
    input: [${Array.from(inputFiles).map((fontPath) => stringlequote(fontPath)).join(", ")}],
    outDir: 'assets/fonts',
`;
  if (!settings.exportSettings.includeTTFinCSS.value) {
    result += "    includeTtfInCss: false,\n";
  }
  if (settings.cssPathPrefix.value !== "") {
    result += `    basePath: ${stringlequote(settings.cssPathPrefix.value)},
`;
  }
  result += `    formats: {
        ttf: ${settings.exportSettings.formats.ttf.value},
        woff: ${settings.exportSettings.formats.woff.value},
        woff2: ${settings.exportSettings.formats.woff2.value},
    },
`;
  if (settings.exportSettings.woffCompression.value !== 15) {
    result += `    woffCompression: ${settings.exportSettings.woffCompression.value},
`;
  }
  if (settings.exportSettings.woff2Compression.value !== 15) {
    result += `    woff2Compression: ${settings.exportSettings.woff2Compression.value},
`;
  }
  result += `    settings: {
`;
  for (const family of settings.fonts.value) {
    if (!family.enableSubsetting.value) {
      result += `        ${stringlequote(family.name)}: {enableSubsetting: false},
`;
      continue;
    }
    result += `        ${stringlequote(family.name)}: {
            enableSubsetting: true,
`;
    const serializeRanges = (ranges) => {
      if (ranges === null) return "[]";
      const result2 = [];
      for (const range of ranges) {
        if (Array.isArray(range)) {
          result2.push(`[${range[0]}, ${range[1]}]`);
        } else {
          result2.push(String(range));
        }
      }
      return `[${result2.join(", ")}]`;
    };
    const serializeAxisSetting = (setting2) => {
      switch (setting2.mode.value) {
        case "single":
          return `{type: ${stringlequote("single")}, value: ${setting2.curSingle.value}}`;
        case "range":
          return `{type: ${stringlequote("variable")}, value: {min: ${setting2.curMin.value}, max: ${setting2.curMax.value}}}`;
        case "multiple":
          return `{type: ${stringlequote("multiple")}, value: {ranges: ${serializeRanges(parseRanges(setting2.curMultiValue.value))}}}`;
      }
    };
    const styleEntries = Object.entries(family.settings.styleSettings);
    const anyVariableStyleValues = styleEntries.some(
      ([, styleValue]) => styleValue.type === "variable"
    );
    if (anyVariableStyleValues) {
      result += "            styleValues: {\n";
      for (const [styleKey, styleValue] of styleEntries) {
        if (styleValue.type === "single") continue;
        result += `                ${styleKey}: {type: 'variable', value: ${serializeAxisSetting(styleValue.value)},
`;
      }
      result += `            },
`;
    }
    if (family.settings.axisSettings.length > 0) {
      result += "            axes: {\n";
      for (const axisInfo of family.settings.axisSettings) {
        const axisComment = axisInfo.name ? ` // ${axisInfo.name}` : "";
        result += `                ${maybeQuoteIdentifier(axisInfo.tag)}: ${serializeAxisSetting(axisInfo.range)},${axisComment}
`;
      }
      result += `            },
`;
    }
    result += "            features: {\n";
    const printLabeledFeatures = (features) => {
      for (const { feature, include } of features) {
        const metadata = featureMetadata(feature.tag);
        if (metadata.required) continue;
        const featureLabel2 = feature.label ?? metadata.name;
        const featureComment = featureLabel2 ? ` // ${featureLabel2}` : "";
        result += `                ${maybeQuoteIdentifier(feature.tag)}: ${include.value},${featureComment}
`;
      }
    };
    printLabeledFeatures(family.settings.includeFeatures.features);
    if (family.settings.includeFeatures.characterVariants.length > 0) {
      result += "\n                // Character variants\n";
      printLabeledFeatures(family.settings.includeFeatures.characterVariants);
    }
    if (family.settings.includeFeatures.stylisticSets.length > 0) {
      result += "\n                // Stylistic sets\n";
      printLabeledFeatures(family.settings.includeFeatures.stylisticSets);
    }
    result += "            },\n";
    const formatIncludeCharactersSettings = (settings2, indent) => {
      const formattedSubsets = [];
      for (const { include, name } of settings2.includeNamedSubsets) {
        if (include.value) {
          formattedSubsets.push(name);
        }
      }
      const hasName = settings2.name.value !== "";
      const hasNamedSubsets = formattedSubsets.length > 0;
      const hasUnicodeRanges = settings2.includeUnicodeRanges.value !== "";
      const formattedKeys = [];
      if (hasName) formattedKeys.push(`name: ${stringlequote(settings2.name.value)}`);
      if (hasNamedSubsets) formattedKeys.push(`includeNamedSubsets: [${formattedSubsets.map((subset) => stringlequote(subset)).join(", ")}]`);
      if (hasUnicodeRanges) formattedKeys.push(`includeUnicodeRanges: ${stringlequote(settings2.includeUnicodeRanges.value)}`);
      if (formattedKeys.length === 1) return `{${formattedKeys[0]}}`;
      let result2 = "{\n";
      for (const formattedKey of formattedKeys) {
        result2 += `${" ".repeat(indent + 4)}${formattedKey},
`;
      }
      result2 += `${" ".repeat(indent)}}`;
      return result2;
    };
    if (family.settings.includeCharacters.includeAllCharacters.value) {
      result += `            includeCharacters: ${stringlequote("all")},
`;
    } else if (family.settings.includeCharacters.characterSets.value.length === 1) {
      result += `            includeCharacters: ${formatIncludeCharactersSettings(family.settings.includeCharacters.characterSets.value[0], 12)},
`;
    } else {
      result += `            includeCharacters: [
`;
      for (const characterSet2 of family.settings.includeCharacters.characterSets.value) {
        result += `                ${formatIncludeCharactersSettings(characterSet2, 16)},
`;
      }
      result += "            ],\n";
    }
    result += "            // Change the name this font is given in the output CSS.\n";
    if (family.name.endsWith("Variable")) {
      result += `            overrideName: ${stringlequote(family.name.replace(/\s*Variable$/, ""))},
`;
    } else {
      result += `            // overrideName: ${stringlequote("MyCustomFontName")},
`;
    }
    result += `        },
`;
  }
  result += `    },
};
`;
  return result;
};
var ch2 = {};
var wk = function(c, id, msg, transfer, cb) {
  var w2 = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
    c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
  ], { type: "text/javascript" }))));
  w2.onmessage = function(e) {
    var d2 = e.data, ed = d2.$e$;
    if (ed) {
      var err2 = new Error(ed[0]);
      err2["code"] = ed[1];
      err2.stack = ed[2];
      cb(err2, null);
    } else
      cb(null, d2);
  };
  w2.postMessage(msg, transfer);
  return w2;
};
var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r2 = new i32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r2[j] = j - b[i] << 5 | i;
    }
  }
  return { b, r: r2 };
};
var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), revfd = _b.r;
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
  var x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var hMap = function(cd, mb, r2) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i) {
    if (cd[i])
      ++l[cd[i] - 1];
  }
  var le = new u16(mb);
  for (i = 1; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r2) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (var i = 0; i < 144; ++i)
  flt[i] = 8;
for (var i = 144; i < 256; ++i)
  flt[i] = 9;
for (var i = 256; i < 280; ++i)
  flt[i] = 7;
for (var i = 280; i < 288; ++i)
  flt[i] = 8;
var fdt = new u8(32);
for (var i = 0; i < 32; ++i)
  fdt[i] = 5;
var flm = /* @__PURE__ */ hMap(flt, 9, 0);
var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  return new u8(v.subarray(s, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var wbits = function(d2, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d2[o] |= v;
  d2[o + 1] |= v >> 8;
};
var wbits16 = function(d2, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d2[o] |= v;
  d2[o + 1] |= v >> 8;
  d2[o + 2] |= v >> 16;
};
var hTree = function(d2, mb) {
  var t = [];
  for (var i = 0; i < d2.length; ++i) {
    if (d2[i])
      t.push({ s: i, f: d2[i] });
  }
  var s = t.length;
  var t2 = t.slice();
  if (!s)
    return { t: et, l: 0 };
  if (s == 1) {
    var v = new u8(t[0].s + 1);
    v[t[0].s] = 1;
    return { t: v, l: 1 };
  }
  t.sort(function(a, b) {
    return a.f - b.f;
  });
  t.push({ s: -1, f: 25001 });
  var l = t[0], r2 = t[1], i0 = 0, i1 = 1, i2 = 2;
  t[0] = { s: -1, f: l.f + r2.f, l, r: r2 };
  while (i1 != s - 1) {
    l = t[t[i0].f < t[i2].f ? i0++ : i2++];
    r2 = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
    t[i1++] = { s: -1, f: l.f + r2.f, l, r: r2 };
  }
  var maxSym = t2[0].s;
  for (var i = 1; i < s; ++i) {
    if (t2[i].s > maxSym)
      maxSym = t2[i].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i = 0, dt = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t2.sort(function(a, b) {
      return tr[b.s] - tr[a.s] || a.f - b.f;
    });
    for (; i < s; ++i) {
      var i2_1 = t2[i].s;
      if (tr[i2_1] > mb) {
        dt += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt >>= lft;
    while (dt > 0) {
      var i2_2 = t2[i].s;
      if (tr[i2_2] < mb)
        dt -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i;
    }
    for (; i >= 0 && dt; --i) {
      var i2_3 = t2[i].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt;
      }
    }
    mbt = mb;
  }
  return { t: new u8(tr), l: mbt };
};
var ln = function(n2, l, d2) {
  return n2.s == -1 ? Math.max(ln(n2.l, l, d2 + 1), ln(n2.r, l, d2 + 1)) : l[n2.s] = d2;
};
var lc = function(c) {
  var s = c.length;
  while (s && !c[--s])
    ;
  var cl = new u16(++s);
  var cli = 0, cln = c[0], cls = 1;
  var w2 = function(v) {
    cl[cli++] = v;
  };
  for (var i = 1; i <= s; ++i) {
    if (c[i] == cln && i != s)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138)
          w2(32754);
        if (cls > 2) {
          w2(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w2(cln), --cls;
        for (; cls > 6; cls -= 6)
          w2(8304);
        if (cls > 2)
          w2(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w2(cln);
      cls = 1;
      cln = c[i];
    }
  }
  return { c: cl.subarray(0, cli), n: s };
};
var clen = function(cf, cl) {
  var l = 0;
  for (var i = 0; i < cl.length; ++i)
    l += cf[i] * cl[i];
  return l;
};
var wfblk = function(out, pos, dat) {
  var s = dat.length;
  var o = shft(pos + 2);
  out[o] = s & 255;
  out[o + 1] = s >> 8;
  out[o + 2] = out[o] ^ 255;
  out[o + 3] = out[o + 1] ^ 255;
  for (var i = 0; i < s; ++i)
    out[o + i + 4] = dat[i];
  return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
  wbits(out, p++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
  var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
  var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
  var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
  var lcfreq = new u16(19);
  for (var i = 0; i < lclt.length; ++i)
    ++lcfreq[lclt[i] & 31];
  for (var i = 0; i < lcdt.length; ++i)
    ++lcfreq[lcdt[i] & 31];
  var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
  if (bs >= 0 && flen <= ftlen && flen <= dtlen)
    return wfblk(out, p, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p, nlc - 257);
    wbits(out, p + 5, ndc - 1);
    wbits(out, p + 10, nlcc - 4);
    p += 14;
    for (var i = 0; i < nlcc; ++i)
      wbits(out, p + 3 * i, lct[clim[i]]);
    p += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it = 0; it < 2; ++it) {
      var clct = lcts[it];
      for (var i = 0; i < clct.length; ++i) {
        var len = clct[i] & 31;
        wbits(out, p, llm[len]), p += lct[len];
        if (len > 15)
          wbits(out, p, clct[i] >> 5 & 127), p += clct[i] >> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i = 0; i < li; ++i) {
    var sym = syms[i];
    if (sym > 255) {
      var len = sym >> 18 & 31;
      wbits16(out, p, lm[len + 257]), p += ll[len + 257];
      if (len > 7)
        wbits(out, p, sym >> 23 & 31), p += fleb[len];
      var dst = sym & 31;
      wbits16(out, p, dm[dst]), p += dl[dst];
      if (dst > 3)
        wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
    } else {
      wbits16(out, p, lm[sym]), p += ll[sym];
    }
  }
  wbits16(out, p, lm[256]);
  return p + ll[256];
};
var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = /* @__PURE__ */ new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, st) {
  var s = st.z || dat.length;
  var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
  var w2 = o.subarray(pre, o.length - post);
  var lst = st.l;
  var pos = (st.r || 0) & 7;
  if (lvl) {
    if (pos)
      w2[0] = st.r >> 3;
    var opt = deo[lvl - 1];
    var n2 = opt >> 13, c = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i2) {
      return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
    };
    var syms = new i32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
    for (; i + 2 < s; ++i) {
      var hv = hsh(i);
      var imod = i & 32767, pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i) {
        var rem = s - i;
        if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
          pos = wblk(dat, w2, 0, syms, lf, df, eb, li, bs, i - bs, pos);
          li = lc_1 = eb = 0, bs = i;
          for (var j = 0; j < 286; ++j)
            lf[j] = 0;
          for (var j = 0; j < 30; ++j)
            df[j] = 0;
        }
        var l = 2, d2 = 0, ch_1 = c, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i - dif)) {
          var maxn = Math.min(n2, rem) - 1;
          var maxd = Math.min(32767, i);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i + l] == dat[i + l - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                ;
              if (nl > l) {
                l = nl, d2 = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j = 0; j < mmd; ++j) {
                  var ti = i - dif + j & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod & 32767;
          }
        }
        if (d2) {
          syms[li++] = 268435456 | revfl[l] << 18 | revfd[d2];
          var lin = revfl[l] & 31, din = revfd[d2] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i + l;
          ++lc_1;
        } else {
          syms[li++] = dat[i];
          ++lf[dat[i]];
        }
      }
    }
    for (i = Math.max(i, wi); i < s; ++i) {
      syms[li++] = dat[i];
      ++lf[dat[i]];
    }
    pos = wblk(dat, w2, lst, syms, lf, df, eb, li, bs, i - bs, pos);
    if (!lst) {
      st.r = pos & 7 | w2[pos / 8 | 0] << 3;
      pos -= 7;
      st.h = head, st.p = prev, st.i = i, st.w = wi;
    }
  } else {
    for (var i = st.w || 0; i < s + lst; i += 65535) {
      var e = i + 65535;
      if (e >= s) {
        w2[pos / 8 | 0] = lst;
        e = s;
      }
      pos = wfblk(w2, pos + 1, dat.subarray(i, e));
    }
    st.i = s;
  }
  return slc(o, 0, pre + shft(pos) + post);
};
var crct = /* @__PURE__ */ function() {
  var t = new Int32Array(256);
  for (var i = 0; i < 256; ++i) {
    var c = i, k2 = 9;
    while (--k2)
      c = (c & 1 && -306674912) ^ c >>> 1;
    t[i] = c;
  }
  return t;
}();
var crc = function() {
  var c = -1;
  return {
    p: function(d2) {
      var cr = c;
      for (var i = 0; i < d2.length; ++i)
        cr = crct[cr & 255 ^ d2[i]] ^ cr >>> 8;
      c = cr;
    },
    d: function() {
      return ~c;
    }
  };
};
var dopt = function(dat, opt, pre, post, st) {
  if (!st) {
    st = { l: 1 };
    if (opt.dictionary) {
      var dict = opt.dictionary.subarray(-32768);
      var newDat = new u8(dict.length + dat.length);
      newDat.set(dict);
      newDat.set(dat, dict.length);
      dat = newDat;
      st.w = dict.length;
    }
  }
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
};
var mrg = function(a, b) {
  var o = {};
  for (var k2 in a)
    o[k2] = a[k2];
  for (var k2 in b)
    o[k2] = b[k2];
  return o;
};
var wcln = function(fn, fnStr, td2) {
  var dt = fn();
  var st = fn.toString();
  var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\s+/g, "").split(",");
  for (var i = 0; i < dt.length; ++i) {
    var v = dt[i], k2 = ks[i];
    if (typeof v == "function") {
      fnStr += ";" + k2 + "=";
      var st_1 = v.toString();
      if (v.prototype) {
        if (st_1.indexOf("[native code]") != -1) {
          var spInd = st_1.indexOf(" ", 8) + 1;
          fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
        } else {
          fnStr += st_1;
          for (var t in v.prototype)
            fnStr += ";" + k2 + ".prototype." + t + "=" + v.prototype[t].toString();
        }
      } else
        fnStr += st_1;
    } else
      td2[k2] = v;
  }
  return fnStr;
};
var ch = [];
var cbfs = function(v) {
  var tl = [];
  for (var k2 in v) {
    if (v[k2].buffer) {
      tl.push((v[k2] = new v[k2].constructor(v[k2])).buffer);
    }
  }
  return tl;
};
var wrkr = function(fns, init, id, cb) {
  if (!ch[id]) {
    var fnStr = "", td_1 = {}, m = fns.length - 1;
    for (var i = 0; i < m; ++i)
      fnStr = wcln(fns[i], fnStr, td_1);
    ch[id] = { c: wcln(fns[m], fnStr, td_1), e: td_1 };
  }
  var td2 = mrg({}, ch[id].e);
  return wk(ch[id].c + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td2, cbfs(td2), cb);
};
var bDflt = function() {
  return [u8, u16, i32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf];
};
var pbf = function(msg) {
  return postMessage(msg, [msg.buffer]);
};
var astrm = function(strm) {
  strm.ondata = function(dat, final) {
    return postMessage([dat, final], [dat.buffer]);
  };
  return function(ev) {
    if (ev.data.length) {
      strm.push(ev.data[0], ev.data[1]);
      postMessage([ev.data[0].length]);
    } else
      strm.flush();
  };
};
var astrmify = function(fns, strm, opts, init, id, flush, ext) {
  var t;
  var w2 = wrkr(fns, init, id, function(err2, dat) {
    if (err2)
      w2.terminate(), strm.ondata.call(strm, err2);
    else if (!Array.isArray(dat))
      ext(dat);
    else if (dat.length == 1) {
      strm.queuedSize -= dat[0];
      if (strm.ondrain)
        strm.ondrain(dat[0]);
    } else {
      if (dat[1])
        w2.terminate();
      strm.ondata.call(strm, err2, dat[0], dat[1]);
    }
  });
  w2.postMessage(opts);
  strm.queuedSize = 0;
  strm.push = function(d2, f) {
    if (!strm.ondata)
      err(5);
    if (t)
      strm.ondata(err(4, 0, 1), null, !!f);
    strm.queuedSize += d2.length;
    w2.postMessage([d2, t = f], [d2.buffer]);
  };
  strm.terminate = function() {
    w2.terminate();
  };
  {
    strm.flush = function() {
      w2.postMessage([]);
    };
  }
};
var wbytes = function(d2, b, v) {
  for (; v; ++b)
    d2[b] = v, v >>>= 8;
};
function StrmOpt(opts, cb) {
  if (typeof opts == "function")
    cb = opts, opts = {};
  this.ondata = cb;
  return opts;
}
var Deflate = /* @__PURE__ */ function() {
  function Deflate2(opts, cb) {
    if (typeof opts == "function")
      cb = opts, opts = {};
    this.ondata = cb;
    this.o = opts || {};
    this.s = { l: 0, i: 32768, w: 32768, z: 32768 };
    this.b = new u8(98304);
    if (this.o.dictionary) {
      var dict = this.o.dictionary.subarray(-32768);
      this.b.set(dict, 32768 - dict.length);
      this.s.i = 32768 - dict.length;
    }
  }
  Deflate2.prototype.p = function(c, f) {
    this.ondata(dopt(c, this.o, 0, 0, this.s), f);
  };
  Deflate2.prototype.push = function(chunk, final) {
    if (!this.ondata)
      err(5);
    if (this.s.l)
      err(4);
    var endLen = chunk.length + this.s.z;
    if (endLen > this.b.length) {
      if (endLen > 2 * this.b.length - 32768) {
        var newBuf = new u8(endLen & -32768);
        newBuf.set(this.b.subarray(0, this.s.z));
        this.b = newBuf;
      }
      var split = this.b.length - this.s.z;
      this.b.set(chunk.subarray(0, split), this.s.z);
      this.s.z = this.b.length;
      this.p(this.b, false);
      this.b.set(this.b.subarray(-32768));
      this.b.set(chunk.subarray(split), 32768);
      this.s.z = chunk.length - split + 32768;
      this.s.i = 32766, this.s.w = 32768;
    } else {
      this.b.set(chunk, this.s.z);
      this.s.z += chunk.length;
    }
    this.s.l = final & 1;
    if (this.s.z > this.s.w + 8191 || final) {
      this.p(this.b, final || false);
      this.s.w = this.s.i, this.s.i -= 2;
    }
  };
  Deflate2.prototype.flush = function() {
    if (!this.ondata)
      err(5);
    if (this.s.l)
      err(4);
    this.p(this.b, false);
    this.s.w = this.s.i, this.s.i -= 2;
  };
  return Deflate2;
}();
var AsyncDeflate = /* @__PURE__ */ function() {
  function AsyncDeflate2(opts, cb) {
    astrmify([
      bDflt,
      function() {
        return [astrm, Deflate];
      }
    ], this, StrmOpt.call(this, opts, cb), function(ev) {
      var strm = new Deflate(ev.data);
      onmessage = astrm(strm);
    }, 6);
  }
  return AsyncDeflate2;
}();
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
function strToU8(str, latin1) {
  var i;
  if (te)
    return te.encode(str);
  var l = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w2 = function(v) {
    ar[ai++] = v;
  };
  for (var i = 0; i < l; ++i) {
    if (ai + 5 > ar.length) {
      var n2 = new u8(ai + 8 + (l - i << 1));
      n2.set(ar);
      ar = n2;
    }
    var c = str.charCodeAt(i);
    if (c < 128 || latin1)
      w2(c);
    else if (c < 2048)
      w2(192 | c >> 6), w2(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w2(240 | c >> 18), w2(128 | c >> 12 & 63), w2(128 | c >> 6 & 63), w2(128 | c & 63);
    else
      w2(224 | c >> 12), w2(128 | c >> 6 & 63), w2(128 | c & 63);
  }
  return slc(ar, 0, ai);
}
var dbf = function(l) {
  return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0;
};
var exfl = function(ex) {
  var le = 0;
  if (ex) {
    for (var k2 in ex) {
      var l = ex[k2].length;
      if (l > 65535)
        err(9);
      le += l + 4;
    }
  }
  return le;
};
var wzh = function(d2, b, f, fn, u2, c, ce, co) {
  var fl2 = fn.length, ex = f.extra, col = co && co.length;
  var exl = exfl(ex);
  wbytes(d2, b, ce != null ? 33639248 : 67324752), b += 4;
  if (ce != null)
    d2[b++] = 20, d2[b++] = f.os;
  d2[b] = 20, b += 2;
  d2[b++] = f.flag << 1 | (c < 0 && 8), d2[b++] = u2 && 8;
  d2[b++] = f.compression & 255, d2[b++] = f.compression >> 8;
  var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y2 = dt.getFullYear() - 1980;
  if (y2 < 0 || y2 > 119)
    err(10);
  wbytes(d2, b, y2 << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
  if (c != -1) {
    wbytes(d2, b, f.crc);
    wbytes(d2, b + 4, c < 0 ? -c - 2 : c);
    wbytes(d2, b + 8, f.size);
  }
  wbytes(d2, b + 12, fl2);
  wbytes(d2, b + 14, exl), b += 16;
  if (ce != null) {
    wbytes(d2, b, col);
    wbytes(d2, b + 6, f.attrs);
    wbytes(d2, b + 10, ce), b += 14;
  }
  d2.set(fn, b);
  b += fl2;
  if (exl) {
    for (var k2 in ex) {
      var exf = ex[k2], l = exf.length;
      wbytes(d2, b, +k2);
      wbytes(d2, b + 2, l);
      d2.set(exf, b + 4), b += 4 + l;
    }
  }
  if (col)
    d2.set(co, b), b += col;
  return b;
};
var wzf = function(o, b, c, d2, e) {
  wbytes(o, b, 101010256);
  wbytes(o, b + 8, c);
  wbytes(o, b + 10, c);
  wbytes(o, b + 12, d2);
  wbytes(o, b + 16, e);
};
var ZipPassThrough = /* @__PURE__ */ function() {
  function ZipPassThrough2(filename) {
    this.filename = filename;
    this.c = crc();
    this.size = 0;
    this.compression = 0;
  }
  ZipPassThrough2.prototype.process = function(chunk, final) {
    this.ondata(null, chunk, final);
  };
  ZipPassThrough2.prototype.push = function(chunk, final) {
    if (!this.ondata)
      err(5);
    this.c.p(chunk);
    this.size += chunk.length;
    if (final)
      this.crc = this.c.d();
    this.process(chunk, final || false);
  };
  return ZipPassThrough2;
}();
var AsyncZipDeflate = /* @__PURE__ */ function() {
  function AsyncZipDeflate2(filename, opts) {
    var _this = this;
    if (!opts)
      opts = {};
    ZipPassThrough.call(this, filename);
    this.d = new AsyncDeflate(opts, function(err2, dat, final) {
      _this.ondata(err2, dat, final);
    });
    this.compression = 8;
    this.flag = dbf(opts.level);
    this.terminate = this.d.terminate;
  }
  AsyncZipDeflate2.prototype.process = function(chunk, final) {
    this.d.push(chunk, final);
  };
  AsyncZipDeflate2.prototype.push = function(chunk, final) {
    ZipPassThrough.prototype.push.call(this, chunk, final);
  };
  return AsyncZipDeflate2;
}();
var Zip = /* @__PURE__ */ function() {
  function Zip2(cb) {
    this.ondata = cb;
    this.u = [];
    this.d = 1;
  }
  Zip2.prototype.add = function(file) {
    var _this = this;
    if (!this.ondata)
      err(5);
    if (this.d & 2)
      this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, false);
    else {
      var f = strToU8(file.filename), fl_1 = f.length;
      var com = file.comment, o = com && strToU8(com);
      var u2 = fl_1 != file.filename.length || o && com.length != o.length;
      var hl_1 = fl_1 + exfl(file.extra) + 30;
      if (fl_1 > 65535)
        this.ondata(err(11, 0, 1), null, false);
      var header = new u8(hl_1);
      wzh(header, 0, file, f, u2, -1);
      var chks_1 = [header];
      var pAll_1 = function() {
        for (var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++) {
          var chk = chks_2[_i];
          _this.ondata(null, chk, false);
        }
        chks_1 = [];
      };
      var tr_1 = this.d;
      this.d = 0;
      var ind_1 = this.u.length;
      var uf_1 = mrg(file, {
        f,
        u: u2,
        o,
        t: function() {
          if (file.terminate)
            file.terminate();
        },
        r: function() {
          pAll_1();
          if (tr_1) {
            var nxt = _this.u[ind_1 + 1];
            if (nxt)
              nxt.r();
            else
              _this.d = 1;
          }
          tr_1 = 1;
        }
      });
      var cl_1 = 0;
      file.ondata = function(err2, dat, final) {
        if (err2) {
          _this.ondata(err2, dat, final);
          _this.terminate();
        } else {
          cl_1 += dat.length;
          chks_1.push(dat);
          if (final) {
            var dd = new u8(16);
            wbytes(dd, 0, 134695760);
            wbytes(dd, 4, file.crc);
            wbytes(dd, 8, cl_1);
            wbytes(dd, 12, file.size);
            chks_1.push(dd);
            uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, uf_1.size = file.size;
            if (tr_1)
              uf_1.r();
            tr_1 = 1;
          } else if (tr_1)
            pAll_1();
        }
      };
      this.u.push(uf_1);
    }
  };
  Zip2.prototype.end = function() {
    var _this = this;
    if (this.d & 2) {
      this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, true);
      return;
    }
    if (this.d)
      this.e();
    else
      this.u.push({
        r: function() {
          if (!(_this.d & 1))
            return;
          _this.u.splice(-1, 1);
          _this.e();
        },
        t: function() {
        }
      });
    this.d = 3;
  };
  Zip2.prototype.e = function() {
    var bt = 0, l = 0, tl = 0;
    for (var _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
      var f = _a2[_i];
      tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
    }
    var out = new u8(tl + 22);
    for (var _b2 = 0, _c = this.u; _b2 < _c.length; _b2++) {
      var f = _c[_b2];
      wzh(out, bt, f, f.f, f.u, -f.c - 2, l, f.o);
      bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
    }
    wzf(out, bt, this.u.length, tl, l);
    this.ondata(null, out, true);
    this.d = 2;
  };
  Zip2.prototype.terminate = function() {
    for (var _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
      var f = _a2[_i];
      f.t();
    }
    this.d = 2;
  };
  return Zip2;
}();
const compressionContext = new WoffCompressionContext();
const glyphtContext = new GlyphtContext();
class AppState {
  fonts = d([]);
  loadedFamilies = w(() => new Set(this.fonts.value.map((font) => font.name)));
  fontsBeingLoaded = d(0);
  _exportedFonts = d({ state: "not_loaded" });
  exportedFonts = w(() => this._exportedFonts.value);
  // Set if there are multiple "save settings" calls in flight.
  saveQueued = false;
  savingPromise = null;
  exportSettings = {
    formats: {
      ttf: d(true),
      woff: d(false),
      woff2: d(true)
    },
    woffCompression: d(15),
    woff2Compression: d(11),
    includeTTFinCSS: d(true)
  };
  cssPathPrefix = d("");
  googleFontsModalState = {
    open: d(false),
    state: d({ state: "not_loaded" }),
    searchValue: d(""),
    previewedFamily: d(null),
    customPreviewText: d(""),
    searchFilters: {
      monospace: d(true),
      proportional: d(true),
      sansSerif: d(true),
      serif: d(true),
      noClassification: d(true),
      display: d(true),
      handwriting: d(true),
      symbols: d(true)
    }
  };
  constructor() {
  }
  async removeFontFamily(family) {
    this.fonts.value = this.fonts.value.filter((f) => f !== family);
    await Promise.all(family.fonts.map(({ font }) => font.destroy()));
  }
  async removeFont(font) {
    const familyIndex = this.fonts.peek().findIndex((family2) => family2.fonts.some((otherFont) => otherFont.font.id === font.id));
    if (familyIndex === -1) return;
    const family = this.fonts.peek()[familyIndex];
    const fonts = [];
    for (const fontSettings of family.fonts) {
      if (fontSettings.font.id !== font.id) {
        fonts.push(fontSettings);
      }
    }
    if (fonts.length === 0) {
      return await this.removeFontFamily(family);
    }
    const newFamilies = this.fonts.peek().slice(0);
    const newSettings = settingsFromFonts(fonts);
    for (const newFamily of newSettings) {
      loadSettings(newFamily, saveSettings(family));
    }
    newFamilies.splice(familyIndex, 1, ...newSettings);
    this.fonts.value = newFamilies;
    return await font.destroy();
  }
  async addFontFiles(fontFiles) {
    const namedFonts = [];
    for (const file of fontFiles) {
      namedFonts.push({ data: file, filename: file.name });
    }
    await this.addFonts(namedFonts);
  }
  async addFonts(fonts) {
    this.fontsBeingLoaded.value += fonts.length;
    try {
      const fontData = await Promise.all(fonts.map((font) => font.data.arrayBuffer().then((ab) => new Uint8Array(ab))));
      const decompressionPromises = [];
      for (let i = 0; i < fontData.length; i++) {
        const compressionType = WoffCompressionContext.compressionType(fontData[i]);
        if (compressionType !== null) {
          decompressionPromises.push(
            compressionContext.decompressToTTF(fontData[i], { transfer: true }).then((decompressed) => {
              fontData[i] = decompressed;
            })
          );
        }
      }
      if (decompressionPromises.length > 0) await Promise.all(decompressionPromises);
      const addedFonts = [];
      for (let i = 0; i < fontData.length; i++) {
        const loadedFonts = await glyphtContext.loadFonts([fontData[i]], { transfer: true });
        for (const font of loadedFonts) {
          addedFonts.push({ font, filename: fonts[i].filename });
        }
      }
      const existingFonts = this.fonts.peek().flatMap((family) => family.fonts);
      const existingFontIds = new Set(existingFonts.map((f) => f.font.uid));
      const duplicateFonts = [];
      for (const addedFont of addedFonts) {
        if (existingFontIds.has(addedFont.font.uid)) {
          duplicateFonts.push(addedFont);
        } else {
          existingFonts.push(addedFont);
        }
      }
      const existingSettings = /* @__PURE__ */ new Map();
      for (const family of this.fonts.peek()) {
        existingSettings.set(family.name, saveSettings(family));
      }
      const newSettings = settingsFromFonts(existingFonts);
      for (const newFamily of newSettings) {
        const existingSetting = existingSettings.get(newFamily.name);
        if (existingSetting) {
          loadSettings(newFamily, existingSetting);
        }
      }
      this.fonts.value = newSettings;
      if (duplicateFonts.length > 0) {
        await Promise.all(duplicateFonts.map((font) => font.font.destroy()));
      }
    } finally {
      this.fontsBeingLoaded.value -= fonts.length;
    }
  }
  addCharacterSet(familySettings2) {
    const { characterSets } = familySettings2.settings.includeCharacters;
    const templateSet = characterSets.value[0];
    const newSet = {
      includeNamedSubsets: templateSet.includeNamedSubsets.map(({ name }) => ({ name, include: d(false) })),
      includeUnicodeRanges: d(""),
      name: d("")
    };
    characterSets.value = [...characterSets.value, newSet];
  }
  removeCharacterSet(familySettings2, characterSet2) {
    const { characterSets } = familySettings2.settings.includeCharacters;
    characterSets.value = characterSets.value.filter((s) => s !== characterSet2);
  }
  exportFonts() {
    const axisSettingStateToSetting = (state) => {
      switch (state.mode.value) {
        case "single":
          return {
            type: "single",
            value: state.curSingle.value
          };
        case "range":
          return {
            type: "variable",
            value: {
              min: state.curMin.value,
              max: state.curMax.value,
              defaultValue: state.defaultValue
            }
          };
        case "multiple": {
          const parsedRanges = parseRanges(state.curMultiValue.value);
          if (!parsedRanges) return {
            type: "single",
            value: state.defaultValue
          };
          return {
            type: "multiple",
            value: { ranges: parsedRanges, defaultValue: state.defaultValue }
          };
        }
      }
    };
    const styleSettingsStateToSettings = (state) => {
      const styleSettings = {};
      for (const [styleKey, styleValue] of Object.entries(state)) {
        styleSettings[styleKey] = styleValue.type === "single" ? styleValue : axisSettingStateToSetting(styleValue.value);
      }
      return styleSettings;
    };
    const exportSettings = this.fonts.peek().map((family) => {
      const fonts = family.fonts.map(({ font, styleSettings }) => {
        return {
          font,
          styleValues: styleSettingsStateToSettings(styleSettings)
        };
      });
      if (!family.enableSubsetting.value) {
        return { fonts, enableSubsetting: false };
      }
      const axes = {};
      for (const axisSettingState of family.settings.axisSettings) {
        axes[axisSettingState.tag] = axisSettingStateToSetting(axisSettingState.range);
      }
      const features = {};
      for (const featureList of [
        family.settings.includeFeatures.characterVariants,
        family.settings.includeFeatures.stylisticSets,
        family.settings.includeFeatures.features
      ]) {
        for (const featureSettingState of featureList) {
          features[featureSettingState.feature.tag] = featureSettingState.include.value;
        }
      }
      const includeCharacters = family.settings.includeCharacters.includeAllCharacters.value ? "all" : family.settings.includeCharacters.characterSets.value.map((characterSet2) => {
        const includeNamedSubsets = [];
        for (const namedSubsetState of characterSet2.includeNamedSubsets) {
          if (namedSubsetState.include.value) includeNamedSubsets.push(namedSubsetState.name);
        }
        return {
          includeNamedSubsets,
          // Swallow parsing errors for the web version
          includeUnicodeRanges: parseUnicodeRanges(characterSet2.includeUnicodeRanges.value) ?? [],
          name: characterSet2.name.value || void 0
        };
      });
      return {
        fonts,
        enableSubsetting: true,
        styleValues: styleSettingsStateToSettings(family.settings.styleSettings),
        axes,
        features,
        includeCharacters
      };
    });
    const formats = {
      ttf: this.exportSettings.formats.ttf.peek(),
      woff: this.exportSettings.formats.woff.peek(),
      woff2: this.exportSettings.formats.woff2.peek()
    };
    return exportFonts(compressionContext, exportSettings, {
      formats,
      woffCompression: this.exportSettings.woffCompression.value,
      woff2Compression: this.exportSettings.woff2Compression.value,
      onProgress: (progress) => {
        this._exportedFonts.value = { state: "loading", progress };
      }
    }).then(
      (exportedFonts2) => {
        this._exportedFonts.value = { state: "loaded", exportedFonts: exportedFonts2, exportedFormats: formats };
      },
      (error2) => {
        this._exportedFonts.value = { state: "error", error: error2 };
      }
    );
  }
  saveAllSettings() {
    const familySettings2 = this.fonts.value.map((family) => saveSettings(family));
    return {
      familySettings: familySettings2,
      cssPathPrefix: this.cssPathPrefix.value,
      exportSettings: {
        formats: {
          ttf: this.exportSettings.formats.ttf.value,
          woff: this.exportSettings.formats.woff.value,
          woff2: this.exportSettings.formats.woff2.value
        },
        woffCompression: this.exportSettings.woffCompression.value,
        woff2Compression: this.exportSettings.woff2Compression.value,
        includeTTFinCSS: this.exportSettings.includeTTFinCSS.value
      },
      type: "AllSettingsV1"
    };
  }
  loadAllSettings(settingsUnk) {
    if (typeof settingsUnk !== "object" || settingsUnk === null || !("type" in settingsUnk) || settingsUnk.type !== "AllSettingsV1") {
      return;
    }
    const settings = settingsUnk;
    if (settings.familySettings) {
      const familySettingsByFamily = /* @__PURE__ */ new Map();
      for (const familySettings2 of settings.familySettings) {
        familySettingsByFamily.set(familySettings2.name, familySettings2);
      }
      for (const family of this.fonts.value) {
        const familySettings2 = familySettingsByFamily.get(family.name);
        if (familySettings2) {
          loadSettings(family, familySettings2);
        }
      }
    }
    if (typeof settings.cssPathPrefix !== "undefined") {
      this.cssPathPrefix.value = settings.cssPathPrefix;
    }
    if (typeof settings.exportSettings?.formats.ttf !== "undefined") {
      this.exportSettings.formats.ttf.value = settings.exportSettings.formats.ttf;
    }
    if (typeof settings.exportSettings?.formats.woff !== "undefined") {
      this.exportSettings.formats.woff.value = settings.exportSettings.formats.woff;
    }
    if (typeof settings.exportSettings?.formats.woff2 !== "undefined") {
      this.exportSettings.formats.woff2.value = settings.exportSettings.formats.woff2;
    }
    if (typeof settings.exportSettings?.woffCompression !== "undefined") {
      this.exportSettings.woffCompression.value = settings.exportSettings.woffCompression;
    }
    if (typeof settings.exportSettings?.woff2Compression !== "undefined") {
      this.exportSettings.woff2Compression.value = settings.exportSettings.woff2Compression;
    }
    if (typeof settings.exportSettings?.includeTTFinCSS !== "undefined") {
      this.exportSettings.includeTTFinCSS.value = settings.exportSettings.includeTTFinCSS;
    }
  }
  async saveCliSettings() {
    const config = generateConfig({ settings: this, quotes: "single" });
    const fontFiles = /* @__PURE__ */ new Map();
    const chunks = [];
    let zipResolve, zipReject;
    const zipPromise = new Promise((resolve, reject) => {
      zipResolve = resolve;
      zipReject = reject;
    });
    const zip = new Zip((err2, data, final) => {
      if (err2) {
        zip.terminate();
        zipReject(err2);
        return;
      }
      chunks.push(data);
      if (final) {
        const blob = new Blob(chunks, { type: "application/zip" });
        zipResolve(blob);
      }
    });
    for (const family of this.fonts.value) {
      for (const { font, filename } of family.fonts) {
        if (fontFiles.has(filename)) continue;
        const deflate = new AsyncZipDeflate(filename);
        zip.add(deflate);
        fontFiles.set(filename, (async () => {
          const data = await font.getFontFileData();
          deflate.push(data, true);
        })());
      }
    }
    const zipConfig = new AsyncZipDeflate("glypht.config.js");
    zip.add(zipConfig);
    zipConfig.push(new TextEncoder().encode(config), true);
    zip.end();
    await Promise.all(Array.from(fontFiles.values()));
    return await zipPromise;
  }
  async saveSettingsToDisk() {
    if (this.savingPromise) {
      this.saveQueued = true;
      return await this.savingPromise;
    }
    const thisSave = (async () => {
      const filenameMap = {};
      const persistedSettings = {
        settings: this.saveAllSettings(),
        filenames: filenameMap
      };
      const families2 = this.fonts.value;
      const storageDir = await navigator.storage.getDirectory();
      const SETTINGS_DIR_NAME = "settings";
      const settingsDir = await storageDir.getDirectoryHandle(SETTINGS_DIR_NAME, { create: true });
      const currentlySavedFonts = await Array.fromAsync(settingsDir.entries());
      const savedFontHashes = /* @__PURE__ */ new Set();
      const newlySavedFontHashes = /* @__PURE__ */ new Set();
      for (const [filename] of currentlySavedFonts) {
        if (filename === "settings.json") continue;
        savedFontHashes.add(filename.split(".")[0]);
      }
      const fontSavePromises = [];
      for (const family of families2) {
        for (const font of family.fonts) {
          try {
            const fontHash = await font.font.getFontFileHash();
            const savedFileName = `${fontHash}.ttf`;
            filenameMap[savedFileName] = font.filename;
            if (savedFontHashes.delete(fontHash) || newlySavedFontHashes.has(fontHash)) {
              continue;
            }
            newlySavedFontHashes.add(fontHash);
            fontSavePromises.push((async () => {
              try {
                const fontData = await font.font.getFontFileData();
                const dest = await settingsDir.getFileHandle(savedFileName, { create: true });
                const destStream = await dest.createWritable();
                await destStream.write(fontData);
                await destStream.close();
              } catch (err2) {
                if (!(err2 instanceof DOMException && err2.name === "InvalidStateError")) {
                  throw err2;
                }
              }
            })());
          } catch (err2) {
            if (!(err2 instanceof DOMException && err2.name === "InvalidStateError")) {
              throw err2;
            }
          }
        }
      }
      for (const noLongerSaved of savedFontHashes) {
        fontSavePromises.push(settingsDir.removeEntry(`${noLongerSaved}.ttf`));
      }
      fontSavePromises.push((async () => {
        const dest = await settingsDir.getFileHandle(`settings.json`, { create: true });
        const destStream = await dest.createWritable();
        await destStream.write(new TextEncoder().encode(JSON.stringify(persistedSettings)));
        await destStream.close();
      })());
      await Promise.all(fontSavePromises);
    })();
    const onSaveFinished = () => {
      this.savingPromise = null;
      if (this.saveQueued) {
        this.saveQueued = false;
        return this.saveSettingsToDisk();
      }
    };
    this.savingPromise = thisSave.then(onSaveFinished, onSaveFinished);
    await thisSave;
  }
  async loadSettingsFromDisk() {
    try {
      this.fontsBeingLoaded.value++;
      const storageDir = await navigator.storage.getDirectory();
      const SETTINGS_DIR_NAME = "settings";
      let settingsDir;
      try {
        settingsDir = await storageDir.getDirectoryHandle(SETTINGS_DIR_NAME);
      } catch (err2) {
        if (!(err2 instanceof Error && err2.name === "NotFoundError")) throw err2;
        return;
      }
      const settingsHandle = await settingsDir.getFileHandle("settings.json");
      const settingsBlob = await settingsHandle.getFile();
      const settingsJson = JSON.parse(await settingsBlob.text());
      const fonts = [];
      for await (const [name, handle] of settingsDir.entries()) {
        if (name === "settings.json" || handle.kind !== "file") continue;
        const fontBlob = await handle.getFile();
        fonts.push({ data: fontBlob, filename: settingsJson.filenames[name] });
      }
      await this.addFonts(fonts);
      this.loadAllSettings(settingsJson.settings);
    } finally {
      this.fontsBeingLoaded.value--;
    }
  }
}
const trackAllSettings = (state) => {
  for (const font of state.fonts.value) {
    void font.enableSubsetting.value;
    const touchAxisSetting = (setting2) => {
      switch (setting2.mode.value) {
        case "single":
          void setting2.curSingle.value;
          break;
        case "range":
          void setting2.curMin.value;
          void setting2.curMax.value;
          break;
        case "multiple":
          void setting2.curMultiValue.value;
          break;
      }
    };
    for (const styleKey of ["weight", "width", "italic", "slant"]) {
      const styleSetting2 = font.settings.styleSettings[styleKey];
      if (!styleSetting2) continue;
      if (styleSetting2.type === "single") continue;
      touchAxisSetting(styleSetting2.value);
    }
    for (const axisSetting2 of font.settings.axisSettings) {
      touchAxisSetting(axisSetting2.range);
    }
    for (const featureSet of [
      font.settings.includeFeatures.features,
      font.settings.includeFeatures.characterVariants,
      font.settings.includeFeatures.stylisticSets
    ]) {
      for (const feature of featureSet) {
        void feature.include.value;
      }
    }
    if (!font.settings.includeCharacters.includeAllCharacters.value) {
      for (const characterSet2 of font.settings.includeCharacters.characterSets.value) {
        void characterSet2.name.value;
        void characterSet2.includeUnicodeRanges.value;
        for (const namedSubset of characterSet2.includeNamedSubsets) {
          void namedSubset.include.value;
        }
      }
    }
  }
  void state.exportSettings.formats.ttf.value;
  void state.exportSettings.formats.woff.value;
  void state.exportSettings.formats.woff2.value;
  void state.exportSettings.includeTTFinCSS.value;
  void state.exportSettings.woffCompression.value;
  void state.exportSettings.woff2Compression.value;
  void state.cssPathPrefix.value;
};
const AppContext = K(void 0);
const useAppState = () => {
  const context = x$1(AppContext);
  if (!context) throw new Error("No AppState provided");
  return context;
};
const createStore = () => {
  const store2 = new AppState();
  const saveSettingsThrottled = throttle(() => void store2.saveSettingsToDisk(), 1e3, true);
  E(() => {
    trackAllSettings(store2);
    n(saveSettingsThrottled);
  });
  void store2.loadSettingsFromDisk();
  return store2;
};
const selectWrapper = "_select-wrapper_1vsnc_285";
const select = "_select_1vsnc_285";
const spinboxWrapper = "_spinbox-wrapper_1vsnc_309";
const spinboxDisplay = "_spinbox-display_1vsnc_338";
const spinboxField = "_spinbox-field_1vsnc_338";
const spinboxButtons = "_spinbox-buttons_1vsnc_361";
const spinboxButton = "_spinbox-button_1vsnc_361";
const spinboxButtonDivider = "_spinbox-button-divider_1vsnc_384";
const spinboxUp = "_spinbox-up_1vsnc_389";
const spinboxDown = "_spinbox-down_1vsnc_389";
const iconButton = "_icon-button_1vsnc_406";
const toggleIcon = "_toggle-icon_1vsnc_419";
const toggledOn = "_toggledOn_1vsnc_419";
const buttonContents = "_button-contents_1vsnc_423";
const checkboxToggle = "_checkbox-toggle_1vsnc_430";
const disabled = "_disabled_1vsnc_434";
const button = "_button_1vsnc_423";
const small = "_small_1vsnc_507";
const collapsibleHeaderTitle = "_collapsible-header-title_1vsnc_512";
const collapsibleHeaderTitleText = "_collapsible-header-title-text_1vsnc_520";
const searchableDropdownWrapper = "_searchable-dropdown-wrapper_1vsnc_524";
const searchableDropdownButton = "_searchable-dropdown-button_1vsnc_528";
const open = "_open_1vsnc_561";
const searchableDropdownButtonText = "_searchable-dropdown-button-text_1vsnc_565";
const searchableDropdownArrow = "_searchable-dropdown-arrow_1vsnc_574";
const searchableDropdownPanel = "_searchable-dropdown-panel_1vsnc_578";
const searchableDropdownSearch = "_searchable-dropdown-search_1vsnc_589";
const searchableDropdownSearchInput = "_searchable-dropdown-search-input_1vsnc_596";
const searchableDropdownOptions = "_searchable-dropdown-options_1vsnc_626";
const searchableDropdownOption = "_searchable-dropdown-option_1vsnc_626";
const searchableDropdownCheckbox = "_searchable-dropdown-checkbox_1vsnc_643";
const searchableDropdownOptionText = "_searchable-dropdown-option-text_1vsnc_649";
const searchableDropdownNoResults = "_searchable-dropdown-no-results_1vsnc_654";
const style$5 = {
  selectWrapper,
  select,
  spinboxWrapper,
  spinboxDisplay,
  spinboxField,
  spinboxButtons,
  spinboxButton,
  spinboxButtonDivider,
  spinboxUp,
  spinboxDown,
  iconButton,
  toggleIcon,
  toggledOn,
  buttonContents,
  checkboxToggle,
  disabled,
  button,
  small,
  collapsibleHeaderTitle,
  collapsibleHeaderTitleText,
  searchableDropdownWrapper,
  searchableDropdownButton,
  open,
  searchableDropdownButtonText,
  searchableDropdownArrow,
  searchableDropdownPanel,
  searchableDropdownSearch,
  searchableDropdownSearchInput,
  searchableDropdownOptions,
  searchableDropdownOption,
  searchableDropdownCheckbox,
  searchableDropdownOptionText,
  searchableDropdownNoResults
};
const slider = "_slider_1xfr1_44";
const slider$1 = {
  slider
};
var Motif = /* @__PURE__ */ ((Motif2) => {
  Motif2[Motif2["PRIMARY"] = 0] = "PRIMARY";
  Motif2[Motif2["SUCCESS"] = 1] = "SUCCESS";
  Motif2[Motif2["WARNING"] = 2] = "WARNING";
  Motif2[Motif2["ERROR"] = 3] = "ERROR";
  Motif2[Motif2["MONOCHROME"] = 4] = "MONOCHROME";
  return Motif2;
})(Motif || {});
const Icon = ({ type, title, size: size2, motif, className, clickableStyle }) => {
  const cssSize = typeof size2 === "string" ? size2 : typeof size2 === "number" ? `${size2}px` : void 0;
  const inlineStyle = cssSize ? {
    width: cssSize,
    height: cssSize
  } : void 0;
  return /* @__PURE__ */ u(
    "div",
    {
      className: clsx(
        "icon",
        `icon-${type}`,
        {
          "motif-primary": motif === Motif.PRIMARY,
          "motif-success": motif === Motif.SUCCESS,
          "motif-warning": motif === Motif.WARNING,
          "motif-error": motif === Motif.ERROR,
          "motif-monochrome": motif === Motif.MONOCHROME,
          "icon-clickable": clickableStyle
        },
        className
      ),
      style: inlineStyle,
      title: title ?? void 0
    }
  );
};
const IconButton = ({
  type,
  title,
  size: size2,
  onClick,
  disabled: disabled2,
  motif,
  className
}) => {
  return /* @__PURE__ */ u(
    "button",
    {
      className: clsx(
        "icon-button",
        {
          "icon-disabled": disabled2,
          "motif-primary": motif === Motif.PRIMARY,
          "motif-success": motif === Motif.SUCCESS,
          "motif-warning": motif === Motif.WARNING,
          "motif-error": motif === Motif.ERROR,
          "motif-monochrome": motif === Motif.MONOCHROME
        },
        className
      ),
      onClick: disabled2 ? void 0 : onClick,
      title,
      disabled: disabled2,
      tabIndex: 0,
      children: /* @__PURE__ */ u(
        Icon,
        {
          type,
          title: null,
          size: size2,
          motif
        }
      )
    }
  );
};
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
const oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y: y2,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y2,
    left: x,
    right: x + width,
    bottom: y2 + height,
    x,
    y: y2
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y: y2
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y: y2,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y2 = nextY != null ? nextY : y2;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y: y2
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y: y2,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y: y2,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const flip$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d2) => d2.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d2) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d2.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d2) => [d2.placement, d2.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$1 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y: y2,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y2 + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y: y2,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y3
            } = _ref;
            return {
              x: x2,
              y: y3
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y: y2
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y2,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
const size$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y2 = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y2 || !Number.isFinite(y2)) {
    y2 = 1;
  }
  return {
    x,
    y: y2
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y2 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y2 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y2 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y: y2
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect)
  ));
  const y2 = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y: y2
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y2 = -scroll.scrollTop;
  if (getComputedStyle(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y: y2
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y: y2
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y2 = top * scale.y;
  return {
    width,
    height,
    x,
    y: y2
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y2 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y: y2,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const offset = offset$1;
const shift = shift$1;
const flip = flip$1;
const size = size$1;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
const useFloating = (options) => {
  const autoUpdateCleanup = A(() => {
  });
  const referenceRef = A(null);
  const referenceCallback = q((newReference) => {
    referenceRef.current = newReference;
    autoUpdateCleanup.current();
    if (floatingRef.current !== null && newReference !== null) {
      autoUpdateCleanup.current = autoUpdate(newReference, floatingRef.current, onUpdate);
    }
  }, []);
  const floatingRef = A(null);
  const floatingCallback = q((newFloating) => {
    floatingRef.current = newFloating;
    autoUpdateCleanup.current();
    if (newFloating !== null && referenceRef.current !== null) {
      autoUpdateCleanup.current = autoUpdate(referenceRef.current, newFloating, onUpdate);
    }
  }, []);
  const onUpdate = q(() => {
    if (!referenceRef.current || !floatingRef.current) return;
    const floating = floatingRef.current;
    void computePosition(referenceRef.current, floatingRef.current, options?.()).then(({ x, y: y2 }) => {
      floating.style.left = `${x}px`;
      floating.style.top = `${y2}px`;
    });
  }, []);
  _(() => {
    return () => autoUpdateCleanup.current();
  }, []);
  return { reference: referenceCallback, floating: floatingCallback };
};
const cmp = (a, b) => a > b ? 1 : a < b ? -1 : 0;
const inf = Infinity;
const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const EXACT_HERE = "eexxaacctt";
const PUNCT_RE = new RegExp("\\p{P}", "gu");
const LATIN_UPPER = "A-Z";
const LATIN_LOWER = "a-z";
const COLLATE_ARGS = ["en", { numeric: true, sensitivity: "base" }];
const swapAlpha = (str, upper, lower) => str.replace(LATIN_UPPER, upper).replace(LATIN_LOWER, lower);
const OPTS = {
  // whether regexps use a /u unicode flag
  unicode: false,
  alpha: null,
  // term segmentation & punct/whitespace merging
  interSplit: "[^A-Za-z\\d']+",
  intraSplit: "[a-z][A-Z]",
  // inter bounds that will be used to increase lft2/rgt2 info counters
  interBound: "[^A-Za-z\\d]",
  // intra bounds that will be used to increase lft1/rgt1 info counters
  intraBound: "[A-Za-z]\\d|\\d[A-Za-z]|[a-z][A-Z]",
  // inter-bounds mode
  // 2 = strict (will only match 'man' on whitepace and punct boundaries: Mega Man, Mega_Man, mega.man)
  // 1 = loose  (plus allowance for alpha-num and case-change boundaries: MegaMan, 0007man)
  // 0 = any    (will match 'man' as any substring: megamaniac)
  interLft: 0,
  interRgt: 0,
  // allowance between terms
  interChars: ".",
  interIns: inf,
  // allowance between chars in terms
  intraChars: "[a-z\\d']",
  // internally case-insensitive
  intraIns: null,
  intraContr: "'[a-z]{1,2}\\b",
  // multi-insert or single-error mode
  intraMode: 0,
  // single-error bounds for errors within terms, default requires exact first char
  intraSlice: [1, inf],
  // single-error tolerance toggles
  intraSub: null,
  intraTrn: null,
  intraDel: null,
  // can post-filter matches that are too far apart in distance or length
  // (since intraIns is between each char, it can accum to nonsense matches)
  intraFilt: (term, match, index) => true,
  // should this also accept WIP info?
  toUpper: (str) => str.toLocaleUpperCase(),
  toLower: (str) => str.toLocaleLowerCase(),
  compare: null,
  // final sorting fn
  sort: (info, haystack, needle, compare = cmp) => {
    let {
      idx,
      chars,
      terms,
      interLft2,
      interLft1,
      //	interRgt2,
      //	interRgt1,
      start,
      intraIns,
      interIns,
      cases
    } = info;
    return idx.map((v, i) => i).sort((ia, ib) => (
      // most contig chars matched
      chars[ib] - chars[ia] || // least char intra-fuzz (most contiguous)
      intraIns[ia] - intraIns[ib] || // most prefix bounds, boosted by full term matches
      terms[ib] + interLft2[ib] + 0.5 * interLft1[ib] - (terms[ia] + interLft2[ia] + 0.5 * interLft1[ia]) || // highest density of match (least span)
      //	span[ia] - span[ib] ||
      // highest density of match (least term inter-fuzz)
      interIns[ia] - interIns[ib] || // earliest start of match
      start[ia] - start[ib] || // case match
      cases[ib] - cases[ia] || // alphabetic
      compare(haystack[idx[ia]], haystack[idx[ib]])
    ));
  }
};
const lazyRepeat = (chars, limit) => limit == 0 ? "" : limit == 1 ? chars + "??" : limit == inf ? chars + "*?" : chars + `{0,${limit}}?`;
const mode2Tpl = "(?:\\b|_)";
function uFuzzy(opts) {
  opts = Object.assign({}, OPTS, opts);
  let {
    unicode,
    interLft,
    interRgt,
    intraMode,
    intraSlice,
    intraIns,
    intraSub,
    intraTrn,
    intraDel,
    intraContr,
    intraSplit: _intraSplit,
    interSplit: _interSplit,
    intraBound: _intraBound,
    interBound: _interBound,
    intraChars,
    toUpper,
    toLower,
    compare
  } = opts;
  intraIns ??= intraMode;
  intraSub ??= intraMode;
  intraTrn ??= intraMode;
  intraDel ??= intraMode;
  compare ??= typeof Intl == "undefined" ? cmp : new Intl.Collator(...COLLATE_ARGS).compare;
  let alpha = opts.letters ?? opts.alpha;
  if (alpha != null) {
    let upper = toUpper(alpha);
    let lower = toLower(alpha);
    _interSplit = swapAlpha(_interSplit, upper, lower);
    _intraSplit = swapAlpha(_intraSplit, upper, lower);
    _interBound = swapAlpha(_interBound, upper, lower);
    _intraBound = swapAlpha(_intraBound, upper, lower);
    intraChars = swapAlpha(intraChars, upper, lower);
    intraContr = swapAlpha(intraContr, upper, lower);
  }
  let uFlag = unicode ? "u" : "";
  const quotedAny = '".+?"';
  const EXACTS_RE = new RegExp(quotedAny, "gi" + uFlag);
  const NEGS_RE = new RegExp(`(?:\\s+|^)-(?:${intraChars}+|${quotedAny})`, "gi" + uFlag);
  let { intraRules } = opts;
  if (intraRules == null) {
    intraRules = (p) => {
      let _intraSlice = OPTS.intraSlice, _intraIns = 0, _intraSub = 0, _intraTrn = 0, _intraDel = 0;
      if (/[^\d]/.test(p)) {
        let plen = p.length;
        if (plen <= 4) {
          if (plen >= 3) {
            _intraTrn = Math.min(intraTrn, 1);
            if (plen == 4)
              _intraIns = Math.min(intraIns, 1);
          }
        } else {
          _intraSlice = intraSlice;
          _intraIns = intraIns, _intraSub = intraSub, _intraTrn = intraTrn, _intraDel = intraDel;
        }
      }
      return {
        intraSlice: _intraSlice,
        intraIns: _intraIns,
        intraSub: _intraSub,
        intraTrn: _intraTrn,
        intraDel: _intraDel
      };
    };
  }
  let withIntraSplit = !!_intraSplit;
  let intraSplit = new RegExp(_intraSplit, "g" + uFlag);
  let interSplit = new RegExp(_interSplit, "g" + uFlag);
  let trimRe = new RegExp("^" + _interSplit + "|" + _interSplit + "$", "g" + uFlag);
  let contrsRe = new RegExp(intraContr, "gi" + uFlag);
  const split = (needle, keepCase = false) => {
    let exacts = [];
    needle = needle.replace(EXACTS_RE, (m) => {
      exacts.push(m);
      return EXACT_HERE;
    });
    needle = needle.replace(trimRe, "");
    if (!keepCase)
      needle = toLower(needle);
    if (withIntraSplit)
      needle = needle.replace(intraSplit, (m) => m[0] + " " + m[1]);
    let j = 0;
    return needle.split(interSplit).filter((t) => t != "").map((v) => v === EXACT_HERE ? exacts[j++] : v);
  };
  const NUM_OR_ALPHA_RE = /[^\d]+|\d+/g;
  const prepQuery = (needle, capt = 0, interOR = false) => {
    let parts = split(needle);
    if (parts.length == 0)
      return [];
    let contrs = Array(parts.length).fill("");
    parts = parts.map((p, pi) => p.replace(contrsRe, (m) => {
      contrs[pi] = m;
      return "";
    }));
    let reTpl;
    if (intraMode == 1) {
      reTpl = parts.map((p, pi) => {
        if (p[0] === '"')
          return escapeRegExp(p.slice(1, -1));
        let reTpl2 = "";
        for (let m of p.matchAll(NUM_OR_ALPHA_RE)) {
          let p2 = m[0];
          let {
            intraSlice: intraSlice2,
            intraIns: intraIns2,
            intraSub: intraSub2,
            intraTrn: intraTrn2,
            intraDel: intraDel2
          } = intraRules(p2);
          if (intraIns2 + intraSub2 + intraTrn2 + intraDel2 == 0)
            reTpl2 += p2 + contrs[pi];
          else {
            let [lftIdx, rgtIdx] = intraSlice2;
            let lftChar = p2.slice(0, lftIdx);
            let rgtChar = p2.slice(rgtIdx);
            let chars = p2.slice(lftIdx, rgtIdx);
            if (intraIns2 == 1 && lftChar.length == 1 && lftChar != chars[0])
              lftChar += "(?!" + lftChar + ")";
            let numChars = chars.length;
            let variants = [p2];
            if (intraSub2) {
              for (let i = 0; i < numChars; i++)
                variants.push(lftChar + chars.slice(0, i) + intraChars + chars.slice(i + 1) + rgtChar);
            }
            if (intraTrn2) {
              for (let i = 0; i < numChars - 1; i++) {
                if (chars[i] != chars[i + 1])
                  variants.push(lftChar + chars.slice(0, i) + chars[i + 1] + chars[i] + chars.slice(i + 2) + rgtChar);
              }
            }
            if (intraDel2) {
              for (let i = 0; i < numChars; i++)
                variants.push(lftChar + chars.slice(0, i + 1) + "?" + chars.slice(i + 1) + rgtChar);
            }
            if (intraIns2) {
              let intraInsTpl = lazyRepeat(intraChars, 1);
              for (let i = 0; i < numChars; i++)
                variants.push(lftChar + chars.slice(0, i) + intraInsTpl + chars.slice(i) + rgtChar);
            }
            reTpl2 += "(?:" + variants.join("|") + ")" + contrs[pi];
          }
        }
        return reTpl2;
      });
    } else {
      let intraInsTpl = lazyRepeat(intraChars, intraIns);
      if (capt == 2 && intraIns > 0) {
        intraInsTpl = ")(" + intraInsTpl + ")(";
      }
      reTpl = parts.map((p, pi) => p[0] === '"' ? escapeRegExp(p.slice(1, -1)) : p.split("").map((c, i, chars) => {
        if (intraIns == 1 && i == 0 && chars.length > 1 && c != chars[i + 1])
          c += "(?!" + c + ")";
        return c;
      }).join(intraInsTpl) + contrs[pi]);
    }
    let preTpl = interLft == 2 ? mode2Tpl : "";
    let sufTpl = interRgt == 2 ? mode2Tpl : "";
    let interCharsTpl = sufTpl + lazyRepeat(opts.interChars, opts.interIns) + preTpl;
    if (capt > 0) {
      if (interOR) {
        reTpl = preTpl + "(" + reTpl.join(")" + sufTpl + "|" + preTpl + "(") + ")" + sufTpl;
      } else {
        reTpl = "(" + reTpl.join(")(" + interCharsTpl + ")(") + ")";
        reTpl = "(.??" + preTpl + ")" + reTpl + "(" + sufTpl + ".*)";
      }
    } else {
      reTpl = reTpl.join(interCharsTpl);
      reTpl = preTpl + reTpl + sufTpl;
    }
    return [new RegExp(reTpl, "i" + uFlag), parts, contrs];
  };
  const filter = (haystack, needle, idxs) => {
    let [query] = prepQuery(needle);
    if (query == null)
      return null;
    let out = [];
    if (idxs != null) {
      for (let i = 0; i < idxs.length; i++) {
        let idx = idxs[i];
        query.test(haystack[idx]) && out.push(idx);
      }
    } else {
      for (let i = 0; i < haystack.length; i++)
        query.test(haystack[i]) && out.push(i);
    }
    return out;
  };
  let withIntraBound = !!_intraBound;
  let interBound = new RegExp(_interBound, uFlag);
  let intraBound = new RegExp(_intraBound, uFlag);
  const info = (idxs, haystack, needle) => {
    let [query, parts, contrs] = prepQuery(needle, 1);
    let partsCased = split(needle, true);
    let [queryR] = prepQuery(needle, 2);
    let partsLen = parts.length;
    let _terms = Array(partsLen);
    let _termsCased = Array(partsLen);
    for (let j = 0; j < partsLen; j++) {
      let part = parts[j];
      let partCased = partsCased[j];
      let term = part[0] == '"' ? part.slice(1, -1) : part + contrs[j];
      let termCased = partCased[0] == '"' ? partCased.slice(1, -1) : partCased + contrs[j];
      _terms[j] = term;
      _termsCased[j] = termCased;
    }
    let len = idxs.length;
    let field = Array(len).fill(0);
    let info2 = {
      // idx in haystack
      idx: Array(len),
      // start of match
      start: field.slice(),
      // length of match
      //	span: field.slice(),
      // contiguous chars matched
      chars: field.slice(),
      // case matched in term (via term.includes(match))
      cases: field.slice(),
      // contiguous (no fuzz) and bounded terms (intra=0, lft2/1, rgt2/1)
      // excludes terms that are contiguous but have < 2 bounds (substrings)
      terms: field.slice(),
      // cumulative length of unmatched chars (fuzz) within span
      interIns: field.slice(),
      // between terms
      intraIns: field.slice(),
      // within terms
      // interLft/interRgt counters
      interLft2: field.slice(),
      interRgt2: field.slice(),
      interLft1: field.slice(),
      interRgt1: field.slice(),
      ranges: Array(len)
    };
    let mayDiscard = interLft == 1 || interRgt == 1;
    let ii = 0;
    for (let i = 0; i < idxs.length; i++) {
      let mhstr = haystack[idxs[i]];
      let m = mhstr.match(query);
      let start = m.index + m[1].length;
      let idxAcc = start;
      let disc = false;
      let lft2 = 0;
      let lft1 = 0;
      let rgt2 = 0;
      let rgt1 = 0;
      let chars = 0;
      let terms = 0;
      let cases = 0;
      let inter = 0;
      let intra = 0;
      let refine = [];
      for (let j = 0, k2 = 2; j < partsLen; j++, k2 += 2) {
        let group = toLower(m[k2]);
        let term = _terms[j];
        let termCased = _termsCased[j];
        let termLen = term.length;
        let groupLen = group.length;
        let fullMatch = group == term;
        if (m[k2] == termCased)
          cases++;
        if (!fullMatch && m[k2 + 1].length >= termLen) {
          let idxOf = toLower(m[k2 + 1]).indexOf(term);
          if (idxOf > -1) {
            refine.push(idxAcc, groupLen, idxOf, termLen);
            idxAcc += refineMatch(m, k2, idxOf, termLen);
            group = term;
            groupLen = termLen;
            fullMatch = true;
            if (j == 0)
              start = idxAcc;
          }
        }
        if (mayDiscard || fullMatch) {
          let lftCharIdx = idxAcc - 1;
          let rgtCharIdx = idxAcc + groupLen;
          let isPre = false;
          let isSuf = false;
          if (lftCharIdx == -1 || interBound.test(mhstr[lftCharIdx])) {
            fullMatch && lft2++;
            isPre = true;
          } else {
            if (interLft == 2) {
              disc = true;
              break;
            }
            if (withIntraBound && intraBound.test(mhstr[lftCharIdx] + mhstr[lftCharIdx + 1])) {
              fullMatch && lft1++;
              isPre = true;
            } else {
              if (interLft == 1) {
                let junk = m[k2 + 1];
                let junkIdx = idxAcc + groupLen;
                if (junk.length >= termLen) {
                  let idxOf = 0;
                  let found = false;
                  let re = new RegExp(term, "ig" + uFlag);
                  let m2;
                  while (m2 = re.exec(junk)) {
                    idxOf = m2.index;
                    let charIdx = junkIdx + idxOf;
                    let lftCharIdx2 = charIdx - 1;
                    if (lftCharIdx2 == -1 || interBound.test(mhstr[lftCharIdx2])) {
                      lft2++;
                      found = true;
                      break;
                    } else if (intraBound.test(mhstr[lftCharIdx2] + mhstr[charIdx])) {
                      lft1++;
                      found = true;
                      break;
                    }
                  }
                  if (found) {
                    isPre = true;
                    refine.push(idxAcc, groupLen, idxOf, termLen);
                    idxAcc += refineMatch(m, k2, idxOf, termLen);
                    group = term;
                    groupLen = termLen;
                    fullMatch = true;
                    if (j == 0)
                      start = idxAcc;
                  }
                }
                if (!isPre) {
                  disc = true;
                  break;
                }
              }
            }
          }
          if (rgtCharIdx == mhstr.length || interBound.test(mhstr[rgtCharIdx])) {
            fullMatch && rgt2++;
            isSuf = true;
          } else {
            if (interRgt == 2) {
              disc = true;
              break;
            }
            if (withIntraBound && intraBound.test(mhstr[rgtCharIdx - 1] + mhstr[rgtCharIdx])) {
              fullMatch && rgt1++;
              isSuf = true;
            } else {
              if (interRgt == 1) {
                disc = true;
                break;
              }
            }
          }
          if (fullMatch) {
            chars += termLen;
            if (isPre && isSuf)
              terms++;
          }
        }
        if (groupLen > termLen)
          intra += groupLen - termLen;
        if (j > 0)
          inter += m[k2 - 1].length;
        if (!opts.intraFilt(term, group, idxAcc)) {
          disc = true;
          break;
        }
        if (j < partsLen - 1)
          idxAcc += groupLen + m[k2 + 1].length;
      }
      if (!disc) {
        info2.idx[ii] = idxs[i];
        info2.interLft2[ii] = lft2;
        info2.interLft1[ii] = lft1;
        info2.interRgt2[ii] = rgt2;
        info2.interRgt1[ii] = rgt1;
        info2.chars[ii] = chars;
        info2.terms[ii] = terms;
        info2.cases[ii] = cases;
        info2.interIns[ii] = inter;
        info2.intraIns[ii] = intra;
        info2.start[ii] = start;
        let m2 = mhstr.match(queryR);
        let idxAcc2 = m2.index + m2[1].length;
        let refLen = refine.length;
        let ri = refLen > 0 ? 0 : Infinity;
        let lastRi = refLen - 4;
        for (let i2 = 2; i2 < m2.length; ) {
          let len2 = m2[i2].length;
          if (ri <= lastRi && refine[ri] == idxAcc2) {
            let groupLen = refine[ri + 1];
            let idxOf = refine[ri + 2];
            let termLen = refine[ri + 3];
            let j = i2;
            let v = "";
            for (let _len = 0; _len < groupLen; j++) {
              v += m2[j];
              _len += m2[j].length;
            }
            m2.splice(i2, j - i2, v);
            idxAcc2 += refineMatch(m2, i2, idxOf, termLen);
            ri += 4;
          } else {
            idxAcc2 += len2;
            i2++;
          }
        }
        idxAcc2 = m2.index + m2[1].length;
        let ranges = info2.ranges[ii] = [];
        let from = idxAcc2;
        let to = idxAcc2;
        for (let i2 = 2; i2 < m2.length; i2++) {
          let len2 = m2[i2].length;
          idxAcc2 += len2;
          if (i2 % 2 == 0)
            to = idxAcc2;
          else if (len2 > 0) {
            ranges.push(from, to);
            from = to = idxAcc2;
          }
        }
        if (to > from)
          ranges.push(from, to);
        ii++;
      }
    }
    if (ii < idxs.length) {
      for (let k2 in info2)
        info2[k2] = info2[k2].slice(0, ii);
    }
    return info2;
  };
  const refineMatch = (m, k2, idxInNext, termLen) => {
    let prepend = m[k2] + m[k2 + 1].slice(0, idxInNext);
    m[k2 - 1] += prepend;
    m[k2] = m[k2 + 1].slice(idxInNext, idxInNext + termLen);
    m[k2 + 1] = m[k2 + 1].slice(idxInNext + termLen);
    return prepend.length;
  };
  const OOO_TERMS_LIMIT = 5;
  const _search = (haystack, needle, outOfOrder, infoThresh = 1e3, preFiltered) => {
    outOfOrder = !outOfOrder ? 0 : outOfOrder === true ? OOO_TERMS_LIMIT : outOfOrder;
    let needles = null;
    let matches = null;
    let negs = [];
    needle = needle.replace(NEGS_RE, (m) => {
      let neg = m.trim().slice(1);
      neg = neg[0] === '"' ? escapeRegExp(neg.slice(1, -1)) : neg.replace(PUNCT_RE, "");
      if (neg != "")
        negs.push(neg);
      return "";
    });
    let terms = split(needle);
    let negsRe;
    if (negs.length > 0) {
      negsRe = new RegExp(negs.join("|"), "i" + uFlag);
      if (terms.length == 0) {
        let idxs = [];
        for (let i = 0; i < haystack.length; i++) {
          if (!negsRe.test(haystack[i]))
            idxs.push(i);
        }
        return [idxs, null, null];
      }
    } else {
      if (terms.length == 0)
        return [null, null, null];
    }
    if (outOfOrder > 0) {
      let terms2 = split(needle);
      if (terms2.length > 1) {
        let terms22 = terms2.slice().sort((a, b) => b.length - a.length);
        for (let ti = 0; ti < terms22.length; ti++) {
          if (preFiltered?.length == 0)
            return [[], null, null];
          preFiltered = filter(haystack, terms22[ti], preFiltered);
        }
        if (terms2.length > outOfOrder)
          return [preFiltered, null, null];
        needles = permute(terms2).map((perm) => perm.join(" "));
        matches = [];
        let matchedIdxs = /* @__PURE__ */ new Set();
        for (let ni = 0; ni < needles.length; ni++) {
          if (matchedIdxs.size < preFiltered.length) {
            let preFiltered2 = preFiltered.filter((idx) => !matchedIdxs.has(idx));
            let matched = filter(haystack, needles[ni], preFiltered2);
            for (let j = 0; j < matched.length; j++)
              matchedIdxs.add(matched[j]);
            matches.push(matched);
          } else
            matches.push([]);
        }
      }
    }
    if (needles == null) {
      needles = [needle];
      matches = [preFiltered?.length > 0 ? preFiltered : filter(haystack, needle)];
    }
    let retInfo = null;
    let retOrder = null;
    if (negs.length > 0)
      matches = matches.map((idxs) => idxs.filter((idx) => !negsRe.test(haystack[idx])));
    let matchCount = matches.reduce((acc, idxs) => acc + idxs.length, 0);
    if (matchCount <= infoThresh) {
      retInfo = {};
      retOrder = [];
      for (let ni = 0; ni < matches.length; ni++) {
        let idxs = matches[ni];
        if (idxs == null || idxs.length == 0)
          continue;
        let needle2 = needles[ni];
        let _info = info(idxs, haystack, needle2);
        let order = opts.sort(_info, haystack, needle2, compare);
        if (ni > 0) {
          for (let i = 0; i < order.length; i++)
            order[i] += retOrder.length;
        }
        for (let k2 in _info)
          retInfo[k2] = (retInfo[k2] ?? []).concat(_info[k2]);
        retOrder = retOrder.concat(order);
      }
    }
    return [
      [].concat(...matches),
      retInfo,
      retOrder
    ];
  };
  return {
    search: (...args) => {
      let out = _search(...args);
      return out;
    },
    split,
    filter,
    info,
    sort: opts.sort
  };
}
const latinize = (() => {
  let accents = {
    A: "ÁÀÃÂÄĄ",
    a: "áàãâäą",
    E: "ÉÈÊËĖ",
    e: "éèêëę",
    I: "ÍÌÎÏĮ",
    i: "íìîïį",
    O: "ÓÒÔÕÖ",
    o: "óòôõö",
    U: "ÚÙÛÜŪŲ",
    u: "úùûüūų",
    C: "ÇČĆ",
    c: "çčć",
    L: "Ł",
    l: "ł",
    N: "ÑŃ",
    n: "ñń",
    S: "ŠŚ",
    s: "šś",
    Z: "ŻŹ",
    z: "żź"
  };
  let accentsMap = /* @__PURE__ */ new Map();
  let accentsTpl = "";
  for (let r2 in accents) {
    accents[r2].split("").forEach((a) => {
      accentsTpl += a;
      accentsMap.set(a, r2);
    });
  }
  let accentsRe = new RegExp(`[${accentsTpl}]`, "g");
  let replacer = (m) => accentsMap.get(m);
  return (strings) => {
    if (typeof strings == "string")
      return strings.replace(accentsRe, replacer);
    let out = Array(strings.length);
    for (let i = 0; i < strings.length; i++)
      out[i] = strings[i].replace(accentsRe, replacer);
    return out;
  };
})();
function permute(arr) {
  arr = arr.slice();
  let length = arr.length, result = [arr.slice()], c = new Array(length).fill(0), i = 1, k2, p;
  while (i < length) {
    if (c[i] < i) {
      k2 = i % 2 && c[i];
      p = arr[i];
      arr[i] = arr[k2];
      arr[k2] = p;
      ++c[i];
      i = 1;
      result.push(arr.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}
const _mark = (part, matched) => matched ? `<mark>${part}</mark>` : part;
const _append = (acc, part) => acc + part;
function highlight(str, ranges, mark = _mark, accum = "", append = _append) {
  accum = append(accum, mark(str.substring(0, ranges[0]), false)) ?? accum;
  for (let i = 0; i < ranges.length; i += 2) {
    let fr = ranges[i];
    let to = ranges[i + 1];
    accum = append(accum, mark(str.substring(fr, to), true)) ?? accum;
    if (i < ranges.length - 3)
      accum = append(accum, mark(str.substring(ranges[i + 1], ranges[i + 2]), false)) ?? accum;
  }
  accum = append(accum, mark(str.substring(ranges[ranges.length - 1]), false)) ?? accum;
  return accum;
}
uFuzzy.latinize = latinize;
uFuzzy.permute = (arr) => {
  let idxs = permute([...Array(arr.length).keys()]).sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] != b[i])
        return a[i] - b[i];
    }
    return 0;
  });
  return idxs.map((pi) => pi.map((i) => arr[i]));
};
uFuzzy.highlight = highlight;
const overlays = "_overlays_1ovwj_1";
const style$4 = {
  overlays
};
const OverlayContext = K(void 0);
const Overlay = ({ children }) => {
  const context = x$1(OverlayContext);
  if (!context) return null;
  const childrenRef = A(children);
  if (childrenRef.current !== children) {
    childrenRef.current = children;
    context.generation.value++;
  }
  _(() => {
    context.children.push(childrenRef);
    context.generation.value++;
    return () => {
      const refIndex = context.children.indexOf(childrenRef);
      if (refIndex !== -1) {
        context.children.splice(refIndex, 1);
        context.generation.value++;
      }
    };
  }, []);
  return null;
};
const OverlayContainerInner = () => {
  const context = x$1(OverlayContext);
  if (!context) return null;
  void context.generation.value;
  if (context.children.length === 0) {
    return null;
  }
  return /* @__PURE__ */ u("div", { className: style$4.overlays, children: context.children.map((ref) => ref.current) });
};
const OverlayProvider = ({ children }) => {
  const ctx = A();
  if (!ctx.current) {
    ctx.current = {
      children: [],
      generation: d(0)
    };
  }
  return /* @__PURE__ */ u(OverlayContext.Provider, { value: ctx.current, children: [
    children,
    /* @__PURE__ */ u(OverlayContainerInner, {})
  ] });
};
const Dropdown = ({ value, options, className, disabled: disabled2 }) => {
  const handleChange = q((event) => {
    const select2 = event.target;
    if (select2.selectedIndex !== -1) {
      value.value = options[select2.selectedIndex].id;
    }
  }, [value, options]);
  return /* @__PURE__ */ u("div", { className: clsx(style$5.selectWrapper, className), children: /* @__PURE__ */ u("select", { className: style$5.select, onChange: handleChange, disabled: disabled2, children: options.map(({ id, name }) => /* @__PURE__ */ u("option", { value: id, selected: id === value.value, children: name }, id)) }) });
};
const SpinBox = ({ value, min: min2, max: max2, step = 1, smartAim = 0, className }) => {
  const handleInput = q((event) => {
    const newValue = Number(event.target.value);
    value.value = newValue;
  }, [value]);
  const handleDrag = q((event) => {
    event.preventDefault();
  }, []);
  const increment = q(() => {
    value.value = Math.min(value.value + (step === "any" ? 1 : step), max2);
  }, [value, step]);
  const decrement = q(() => {
    value.value = Math.max(value.value - (step === "any" ? 1 : step), min2);
  }, [value, step]);
  const spinboxId = g();
  const isEditing = useSignal(false);
  const pointerListeners = A(null);
  y(() => {
    return () => {
      if (pointerListeners.current) {
        window.removeEventListener("pointermove", pointerListeners.current.move);
        window.removeEventListener("pointerup", pointerListeners.current.up);
      }
    };
  }, []);
  const deadZone = A({ bottom: 0, top: 0 });
  const valueStart = A(0);
  const isDragging = A(false);
  const handlePointerDown = q((event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    deadZone.current = { bottom: rect.bottom, top: rect.top };
    valueStart.current = value.value;
    const onMove = (event2) => {
      let mouseDelta = 0;
      if (event2.clientY < deadZone.current.top) {
        mouseDelta = event2.clientY - deadZone.current.top;
      } else if (event2.clientY > deadZone.current.bottom) {
        mouseDelta = event2.clientY - deadZone.current.bottom;
      }
      isDragging.current = mouseDelta !== 0;
      if (!isDragging.current) return;
      document.getSelection()?.empty();
      const valueDelta = mouseDelta * (max2 - min2) / 200;
      const newValue = valueStart.current - valueDelta;
      const clampedValue = Math.max(min2, Math.min(newValue, max2));
      let roundedValue = step === "any" ? clampedValue : Math.round(clampedValue / step) * step;
      if (smartAim > 0) {
        const roundedToAim = Math.round(newValue / smartAim) * smartAim;
        if (Math.abs(roundedToAim - newValue) < smartAim / 4) {
          roundedValue = Math.max(min2, Math.min(roundedToAim, max2));
        }
      }
      value.value = roundedValue;
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    pointerListeners.current = { move: onMove, up: onUp };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, [min2, max2, value]);
  const handleFocus = q(() => {
    isEditing.value = true;
  }, [isEditing]);
  const handleBlur = q(() => {
    isEditing.value = false;
    value.value = Math.max(min2, Math.min(value.value, max2));
  }, [isEditing, value, min2, max2]);
  const onCreateInput = q((elem) => {
    elem?.focus();
  }, []);
  const valueText = Number(value.value.toFixed(12)).toString();
  return /* @__PURE__ */ u("div", { className: clsx(style$5.spinboxWrapper, className), children: [
    isEditing.value ? /* @__PURE__ */ u(
      "input",
      {
        className: style$5.spinboxField,
        type: "number",
        min: min2,
        max: max2,
        step,
        value: Number(value.value.toFixed(12)),
        onInput: handleInput,
        id: spinboxId,
        onBlur: handleBlur,
        ref: onCreateInput
      }
    ) : /* @__PURE__ */ u(
      "div",
      {
        className: clsx(style$5.spinboxDisplay, "tabular-nums"),
        onInput: handleInput,
        onDragCapture: handleDrag,
        id: spinboxId,
        onPointerDown: handlePointerDown,
        tabIndex: 0,
        onFocus: handleFocus,
        "aria-valuemin": min2,
        "aria-valuemax": max2,
        "aria-valuenow": value.value,
        "aria-valuetext": valueText,
        role: "spinbutton",
        children: valueText
      }
    ),
    /* @__PURE__ */ u("div", { className: style$5.spinboxButtons, children: [
      /* @__PURE__ */ u(
        "div",
        {
          onClick: increment,
          className: style$5.spinboxButton,
          role: "button",
          "aria-controls": spinboxId,
          "aria-label": "Increment",
          children: /* @__PURE__ */ u("div", { className: style$5.spinboxUp })
        }
      ),
      /* @__PURE__ */ u("div", { className: style$5.spinboxButtonDivider }),
      /* @__PURE__ */ u(
        "div",
        {
          onClick: decrement,
          className: style$5.spinboxButton,
          role: "button",
          "aria-controls": spinboxId,
          "aria-label": "Decrement",
          children: /* @__PURE__ */ u("div", { className: style$5.spinboxDown })
        }
      )
    ] })
  ] });
};
const Slider = ({ value, min: min2, max: max2, step = 1, className }) => {
  const sliderInput = A(null);
  const handleInput = q((event) => {
    const newValue = Number(event.target.value);
    value.value = newValue;
  }, [value]);
  _(() => {
    const slider2 = sliderInput.current;
    slider2.style.setProperty("--min", String(min2));
    slider2.style.setProperty("--max", String(max2));
    slider2.style.setProperty("--val", String(value.value));
  }, [value.value, min2, max2]);
  return /* @__PURE__ */ u(
    "input",
    {
      className: clsx(slider$1.slider, className),
      type: "range",
      min: min2,
      max: max2,
      step,
      value: value.value,
      onInput: handleInput,
      ref: sliderInput
    }
  );
};
const ToggleIcon = ({ type, title, toggled, innerRef, className }) => {
  const handleClick = q(() => {
    toggled.value = !toggled.value;
  }, [toggled]);
  return /* @__PURE__ */ u(
    "button",
    {
      className: clsx(style$5.iconButton, style$5.toggleIcon, toggled.value && style$5.toggledOn, className),
      onClick: handleClick,
      role: "checkbox",
      "aria-checked": toggled.value,
      title,
      ref: innerRef,
      tabindex: 0,
      children: /* @__PURE__ */ u(Icon, { type, title })
    }
  );
};
const SelectableIcon = ({ type, title, currentValue, value }) => {
  const handleClick = q(() => {
    currentValue.value = value;
  }, [currentValue]);
  return /* @__PURE__ */ u(
    "button",
    {
      className: clsx(
        style$5.iconButton,
        style$5.toggleIcon,
        { [style$5.toggledOn]: currentValue.value === value }
      ),
      onClick: handleClick,
      role: "radio",
      "aria-checked": currentValue.value === value,
      title,
      tabindex: 0,
      children: /* @__PURE__ */ u(Icon, { type, title })
    }
  );
};
const CheckboxToggle = ({ label: label2, title, checked, disabled: disabled2, indeterminate, className }) => {
  const handleInput = q((event) => {
    event.preventDefault();
    checked.value = event.currentTarget.checked;
  }, [checked]);
  const preventSelection = q((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);
  return /* @__PURE__ */ u(
    "label",
    {
      className: clsx(style$5.checkboxToggle, disabled2 && style$5.disabled, className),
      title: title ?? void 0,
      "aria-disabled": disabled2,
      children: [
        /* @__PURE__ */ u(
          "input",
          {
            type: "checkbox",
            checked: checked.value,
            onInput: handleInput,
            disabled: disabled2,
            indeterminate
          }
        ),
        /* @__PURE__ */ u("span", { className: style$5.checkboxLabel, onMouseDown: preventSelection, children: label2 })
      ]
    }
  );
};
const TextBox = ({
  value,
  small: small2,
  className,
  ...props
}) => {
  const updateTextbox = q((event) => {
    value.value = event.currentTarget.value;
  }, [value]);
  return /* @__PURE__ */ u(
    "input",
    {
      type: "text",
      className: clsx(className, small2 && style$5.small),
      ...props,
      value,
      onInput: updateTextbox
    }
  );
};
const Button = ({ children, className, ...props }) => {
  return /* @__PURE__ */ u("button", { ...props, className: clsx(style$5.button, className), children: /* @__PURE__ */ u("span", { className: style$5.buttonContents, children }) });
};
const CollapsibleHeader = ({ collapsed, bodyId, children, auxiliaryItems, className }) => {
  const toggleCollapsed = q(() => {
    collapsed.value = !collapsed.value;
  }, [collapsed]);
  return /* @__PURE__ */ u("header", { className, children: [
    /* @__PURE__ */ u(
      "button",
      {
        className: style$5.collapsibleHeaderTitle,
        "aria-expanded": collapsed.value ? "false" : "true",
        "aria-controls": bodyId,
        onClick: toggleCollapsed,
        children: [
          /* @__PURE__ */ u(Icon, { type: collapsed.value ? "arrow-right" : "arrow-down", title: null, motif: Motif.MONOCHROME }),
          /* @__PURE__ */ u("span", { className: style$5.collapsibleHeaderTitleText, children })
        ]
      }
    ),
    auxiliaryItems
  ] });
};
const searcher = new uFuzzy({});
const SearchableCheckboxDropdown = ({
  options,
  selectedOptions,
  placeholder = "Search...",
  className,
  id,
  renderOption
}) => {
  const isOpen = useSignal(false);
  const searchValue = useSignal("");
  const buttonRef = A(null);
  const { reference, floating } = useFloating(() => ({
    placement: "bottom-start",
    middleware: [
      offset(4),
      shift({ padding: 8 }),
      size({
        apply({ availableHeight, elements }) {
          const { floating: floating2, reference: reference2 } = elements;
          floating2.style.width = `${reference2.getBoundingClientRect().width}px`;
          floating2.style.maxHeight = `${Math.max(availableHeight - 8, 320)}px`;
        },
        padding: 8
      }),
      flip()
    ]
  }));
  const setButtonRef = q((button2) => {
    reference(button2);
    buttonRef.current = button2;
  }, []);
  const optionNames = T(() => options.map((option) => option.searchable ?? option.name), [options]);
  const filteredOptions = T(() => {
    if (!searchValue.value) return options;
    const [idxs, info, order] = searcher.search(optionNames, searchValue.value);
    if (!info) return options;
    const searchResults = order.map((i) => options[idxs[i]]);
    return searchResults;
  }, [options, searchValue.value]);
  const selectedItemsText = T(() => {
    return w(() => {
      const optionsText = [];
      for (const option of options) {
        if (selectedOptions[option.id].value) {
          optionsText.push(option.name);
        }
      }
      return optionsText.length === 0 ? null : optionsText.join(", ");
    });
  }, [options, selectedOptions]);
  const focusSearchInput = q((searchInput) => {
    if (searchInput) searchInput.focus();
  }, []);
  const handleToggleDropdown = q(() => {
    isOpen.value = !isOpen.value;
    if (!isOpen.value) {
      searchValue.value = "";
    }
  }, [isOpen, searchValue]);
  const handleSearchChange = q((event) => {
    const input = event.currentTarget;
    searchValue.value = input.value;
  }, [searchValue]);
  const handleOptionToggle = q((optionId) => {
    const signal = selectedOptions[optionId];
    signal.value = !signal.value;
  }, [selectedOptions]);
  const handleFocusOut = q((event) => {
    if (!event.relatedTarget || event.relatedTarget !== buttonRef.current && event.currentTarget?.contains(event.relatedTarget) === false) {
      isOpen.value = false;
      searchValue.value = "";
    }
  }, []);
  const handleKeyDown = q((event) => {
    if (event.key === "Escape") {
      isOpen.value = false;
      searchValue.value = "";
      buttonRef.current?.focus();
    }
  }, [isOpen, searchValue]);
  y(() => {
    if (isOpen.value) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen.value, handleKeyDown]);
  const buttonText = selectedItemsText.value ?? placeholder;
  return /* @__PURE__ */ u("div", { className: clsx(style$5.searchableDropdownWrapper, className), id, children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: setButtonRef,
        className: clsx(style$5.searchableDropdownButton, isOpen.value && style$5.open),
        onClick: handleToggleDropdown,
        type: "button",
        role: "select",
        children: [
          /* @__PURE__ */ u(
            "span",
            {
              className: style$5.searchableDropdownButtonText,
              title: selectedItemsText.value ?? void 0,
              children: buttonText
            }
          ),
          /* @__PURE__ */ u(
            Icon,
            {
              type: isOpen.value ? "arrow-up" : "arrow-down",
              title: "",
              className: style$5.searchableDropdownArrow
            }
          )
        ]
      }
    ),
    isOpen.value && /* @__PURE__ */ u(Overlay, { children: /* @__PURE__ */ u(
      "div",
      {
        ref: floating,
        className: style$5.searchableDropdownPanel,
        onFocusOut: handleFocusOut,
        tabIndex: 0,
        role: "menu",
        children: [
          /* @__PURE__ */ u("div", { className: style$5.searchableDropdownSearch, children: /* @__PURE__ */ u(
            "input",
            {
              ref: focusSearchInput,
              type: "text",
              placeholder: "Search...",
              role: "searchbox",
              value: searchValue.value,
              onInput: handleSearchChange,
              className: style$5.searchableDropdownSearchInput
            }
          ) }),
          /* @__PURE__ */ u("div", { className: style$5.searchableDropdownOptions, children: [
            filteredOptions.map((option) => /* @__PURE__ */ u(
              "label",
              {
                className: style$5.searchableDropdownOption,
                onClick: (e) => e.stopPropagation(),
                role: "menuitem",
                children: [
                  /* @__PURE__ */ u(
                    "input",
                    {
                      type: "checkbox",
                      checked: selectedOptions[option.id]?.value || false,
                      onChange: () => handleOptionToggle(option.id),
                      className: style$5.searchableDropdownCheckbox
                    }
                  ),
                  /* @__PURE__ */ u("span", { className: style$5.searchableDropdownOptionText, children: renderOption ? renderOption(option) : option.name })
                ]
              },
              option.id
            )),
            filteredOptions.length === 0 && /* @__PURE__ */ u("div", { className: style$5.searchableDropdownNoResults, children: "No results found" })
          ] })
        ]
      }
    ) })
  ] });
};
let fakeClipboard = "";
const copyText = (text) => {
  fakeClipboard = text;
  return navigator.clipboard.writeText(text);
};
const pasteText = async () => {
  try {
    return await navigator.clipboard.readText();
  } catch (err2) {
    if (err2 instanceof Error && err2.name === "NotAllowedError") {
      return fakeClipboard;
    }
    throw err2;
  }
};
const toastContainer = "_toast-container_r5va1_44";
const toastWrapper = "_toast-wrapper_r5va1_60";
const toast = "_toast_r5va1_44";
const success = "_success_r5va1_87";
const warning = "_warning_r5va1_92";
const error = "_error_r5va1_98";
const toastRow = "_toast-row_r5va1_104";
const toastIcon = "_toast-icon_r5va1_112";
const toastContents = "_toast-contents_r5va1_116";
const separateContents = "_separate-contents_r5va1_120";
const toastTitle = "_toast-title_r5va1_124";
const plain = "_plain_r5va1_127";
const timeoutBar = "_timeout-bar_r5va1_131";
const toastPlaceholder = "_toast-placeholder_r5va1_146";
const errorMessage = "_error-message_r5va1_151";
const errorStack = "_error-stack_r5va1_156";
const style$3 = {
  toastContainer,
  toastWrapper,
  toast,
  success,
  warning,
  error,
  toastRow,
  toastIcon,
  toastContents,
  separateContents,
  toastTitle,
  plain,
  timeoutBar,
  toastPlaceholder,
  errorMessage,
  errorStack
};
class FakeImmutable {
  inner;
  constructor(value) {
    this.inner = value;
  }
  static create(initial) {
    return new FakeImmutable(initial);
  }
  update(mutator) {
    const result = mutator(this.inner);
    if (typeof result === "undefined") return this;
    return new FakeImmutable(result);
  }
  get value() {
    return this.inner;
  }
}
const ToastContext = K(void 0);
const Toast = ({ children, toastRef, closeToast, showCloseButton, timeout, motif = Motif.PRIMARY, title }) => {
  let iconType, iconTitle;
  switch (motif) {
    case Motif.SUCCESS:
      iconType = "check";
      iconTitle = "Success";
      break;
    case Motif.WARNING:
      iconType = "warning";
      iconTitle = "Warning";
      break;
    case Motif.ERROR:
      iconType = "error";
      iconTitle = "Error";
      break;
  }
  _(() => {
    if (typeof timeout === "number") {
      const timeoutId = setTimeout(closeToast, timeout);
      return () => clearTimeout(timeoutId);
    }
  }, []);
  return /* @__PURE__ */ u("div", { className: style$3.toastWrapper, ref: toastRef, children: /* @__PURE__ */ u("div", { className: clsx(style$3.toast, {
    [style$3.primary]: motif === Motif.PRIMARY,
    [style$3.success]: motif === Motif.SUCCESS,
    [style$3.warning]: motif === Motif.WARNING,
    [style$3.error]: motif === Motif.ERROR
  }), children: [
    /* @__PURE__ */ u("div", { className: style$3.toastRow, children: [
      motif === Motif.PRIMARY ? null : (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        /* @__PURE__ */ u(Icon, { type: iconType, title: iconTitle, className: style$3.toastIcon })
      ),
      typeof title === "undefined" || title === null ? /* @__PURE__ */ u("div", { className: style$3.toastContents, children }) : /* @__PURE__ */ u("div", { className: clsx(style$3.toastTitle, typeof title !== "object" && style$3.plain), children: title }),
      showCloseButton && /* @__PURE__ */ u(
        IconButton,
        {
          type: "close",
          title: "Close",
          onClick: closeToast,
          className: style$3.toastIcon
        }
      )
    ] }),
    typeof title === "undefined" || title === "null" ? null : /* @__PURE__ */ u("div", { className: clsx(style$3.toastContents, style$3.separateContents), children }),
    typeof timeout === "number" && /* @__PURE__ */ u("div", { className: style$3.timeoutBar, style: { animationDuration: `${timeout}ms` } })
  ] }) });
};
const ToastDisplay = () => {
  const context = x$1(ToastContext);
  if (!context) throw new Error("ToastDisplay must be placed under a ToastProvider");
  const toasts = useComputed(() => context.toasts.value.value.map((t) => t.inner));
  return /* @__PURE__ */ u(Overlay, { children: /* @__PURE__ */ u("div", { className: style$3.toastContainer, children: toasts }) });
};
const useAddToast = () => {
  const context = x$1(ToastContext);
  if (!context) throw new Error("useAddToast requires a ToastProvider");
  return q((options) => {
    context.addToast(options);
  }, [context]);
};
const useAddErrorToast = () => {
  const addToast = useAddToast();
  return q((title, error2) => {
    addToast({
      motif: Motif.ERROR,
      title,
      contents: /* @__PURE__ */ u(k, { children: [
        /* @__PURE__ */ u("div", { className: style$3.errorMessage, children: String(error2) }),
        typeof error2 === "object" && error2 !== null && "stack" in error2 ? /* @__PURE__ */ u("div", { className: style$3.errorStack, children: error2.stack }) : null
      ] })
    });
  }, []);
};
const ToastPlaceholder = ({ height: initialHeight, onTransitionEnd }) => {
  const [height, setHeight] = d$1(`${initialHeight}px`);
  const node = A(null);
  _(() => {
    void node.current?.scrollTop;
    setHeight("0");
  }, []);
  return /* @__PURE__ */ u(
    "div",
    {
      className: style$3.toastPlaceholder,
      style: { minHeight: height },
      onTransitionEnd,
      ref: node
    }
  );
};
const ToastProvider = ({ children }) => {
  const toastsSignal = useSignal(FakeImmutable.create([]));
  const ctx = A(void 0);
  const idCounter = A(0);
  const addToast = q((options) => {
    let ref = null;
    const id = idCounter.current++;
    const updateRef = (elem) => {
      ref = elem;
    };
    const transformOffset = d(0);
    const closeToast = () => {
      toastsSignal.value = toastsSignal.value.update((toasts) => {
        const toastIndex = toasts.indexOf(box);
        if (toastIndex === -1) return;
        const removedHeight = ref?.getBoundingClientRect()?.height ?? 0;
        const onTransitionEnd = () => {
          toastsSignal.value = toastsSignal.value.update((toasts2) => {
            const toastIndex2 = toasts2.indexOf(box);
            if (toastIndex2 === -1) return;
            toasts2.splice(toastIndex2, 1);
            return toasts2;
          });
        };
        const toastPlaceholder2 = /* @__PURE__ */ u(
          ToastPlaceholder,
          {
            height: removedHeight,
            onTransitionEnd
          },
          id
        );
        toasts[toastIndex].inner = toastPlaceholder2;
        return toasts;
      });
    };
    const ToastTitle = options.title;
    const ToastContents = options.contents;
    const box = {
      inner: /* @__PURE__ */ u(
        Toast,
        {
          toastRef: updateRef,
          motif: options.motif,
          showCloseButton: options.showCloseButton ?? true,
          timeout: options.timeout,
          closeToast,
          title: typeof ToastTitle === "function" ? /* @__PURE__ */ u(ToastTitle, { closeToast }) : ToastTitle,
          children: typeof ToastContents === "function" ? /* @__PURE__ */ u(ToastContents, { closeToast }) : ToastContents
        },
        id
      ),
      transformOffset
    };
    toastsSignal.value = toastsSignal.value.update((toasts) => {
      toasts.push(box);
      return toasts;
    });
  }, []);
  if (!ctx.current) {
    ctx.current = {
      toasts: toastsSignal,
      addToast
    };
  }
  return /* @__PURE__ */ u(ToastContext.Provider, { value: ctx.current, children: [
    /* @__PURE__ */ u(ToastDisplay, {}),
    children
  ] });
};
const Loader = ({ progress, size: size2 = 100, className }) => {
  const STROKE_WIDTH = Math.min(size2 / 10, 10);
  const radius = (size2 - STROKE_WIDTH) * 0.5;
  const circumference = 2 * Math.PI * radius;
  let dashArray, dashOffset;
  if (typeof progress === "number") {
    progress = Math.max(0, Math.min(1, progress));
    dashArray = circumference;
    dashOffset = circumference - progress * circumference;
  } else {
    dashArray = circumference / 2;
    dashOffset = 0;
  }
  const spinnerStyle = typeof progress !== "number" ? {
    animation: "spin 1.5s linear infinite"
  } : void 0;
  return /* @__PURE__ */ u("svg", { xmlns: "http://www.w3.org/2000/svg", className, width: size2, height: size2, viewBox: `0 0 ${size2} ${size2}`, children: [
    /* @__PURE__ */ u("style", { children: `
                @keyframes spin {
                    from {
                        stroke-dashoffset: ${circumference};
                    }
                    to {
                        stroke-dashoffset: 0;
                    }
                }
            ` }),
    typeof progress === "number" && size2 >= 64 && /* @__PURE__ */ u(
      "text",
      {
        x: "50%",
        y: "50%",
        "text-anchor": "middle",
        dy: ".3em",
        "font-size": `${size2 * 0.2}px`,
        "font-weight": 600,
        fill: "currentColor",
        className: "tabular-nums",
        children: Math.round(progress * 100).toString().padStart(2, "0") + "%"
      }
    ),
    /* @__PURE__ */ u(
      "circle",
      {
        cx: "50%",
        cy: "50%",
        r: radius,
        "stroke-width": STROKE_WIDTH,
        stroke: "currentColor",
        fill: "none",
        "stroke-dasharray": dashArray,
        "stroke-dashoffset": dashOffset,
        style: spinnerStyle
      }
    )
  ] });
};
const showOpenFilePicker = async (options) => {
  const input = document.createElement("input");
  input.type = "file";
  if (options.accept) {
    input.accept = options.accept;
  }
  if (options.multiple) {
    input.multiple = true;
  }
  return new Promise((resolve) => {
    input.onchange = () => {
      resolve(input.files);
    };
    input.oncancel = () => {
      resolve(null);
    };
    input.click();
  });
};
const showFontPicker = () => showOpenFilePicker({
  accept: ".ttf,.otf,.ttc,.otc,.woff,.woff2",
  multiple: true
});
const UNITS = [" bytes", "KB", "MB", "GB"];
const DIVISOR = 1e3;
const formatFileSize = (bytes) => {
  let unitIndex = 0;
  let sizeInUnits = bytes;
  while (sizeInUnits > DIVISOR && unitIndex < UNITS.length) {
    sizeInUnits /= DIVISOR;
    unitIndex++;
  }
  const fixedUnits = unitIndex < 2 ? sizeInUnits.toFixed(0) : sizeInUnits.toFixed(2);
  return `${fixedUnits} ${UNITS[unitIndex]}`;
};
const useLiveSignal = (value) => {
  const s = useSignal(value);
  if (s.peek() !== value) s.value = value;
  return s;
};
const axisSpinboxParams = (axisMax) => {
  const step = axisMax >= 200 ? 1 : axisMax > 1 ? 0.25 : 0.01;
  const smartAim = axisMax >= 200 ? 25 : axisMax >= 50 ? 12.5 : 0;
  return { step, smartAim };
};
const AxisSettingComponent = ({ axis }) => {
  const { step, smartAim } = axisSpinboxParams(axis.max);
  const resetValue = q(() => {
    axis.curSingle.value = axis.defaultValue;
  }, [axis.curSingle, axis.defaultValue]);
  let modeControl;
  switch (axis.mode.value) {
    case "single": {
      modeControl = /* @__PURE__ */ u(k, { children: [
        /* @__PURE__ */ u(SpinBox, { min: axis.min, max: axis.max, value: axis.curSingle, step, smartAim }),
        /* @__PURE__ */ u(
          IconButton,
          {
            type: "reset",
            title: "Reset to default value",
            onClick: resetValue,
            disabled: axis.curSingle.value === axis.defaultValue
          }
        )
      ] });
      break;
    }
    case "range": {
      modeControl = /* @__PURE__ */ u("div", { className: style$6.spinboxRange, children: [
        /* @__PURE__ */ u(SpinBox, { min: axis.min, max: axis.max, value: axis.curMin, step, smartAim }),
        /* @__PURE__ */ u("span", { className: style$6.label, children: "to" }),
        /* @__PURE__ */ u(SpinBox, { min: axis.min, max: axis.max, value: axis.curMax, step, smartAim })
      ] });
      break;
    }
    case "multiple": {
      modeControl = /* @__PURE__ */ u(AxisRangeTextbox, { ranges: axis.curMultiValue });
      break;
    }
  }
  return /* @__PURE__ */ u("div", { className: style$6.axisSetting, children: [
    /* @__PURE__ */ u("div", { className: style$6.axisSettingModes, role: "radiogroup", "aria-label": "Axis modes", children: [
      /* @__PURE__ */ u(
        SelectableIcon,
        {
          type: "range",
          title: "Limit range of values",
          currentValue: axis.mode,
          value: "range"
        }
      ),
      /* @__PURE__ */ u(
        SelectableIcon,
        {
          type: "pin",
          title: "Pin to single value",
          currentValue: axis.mode,
          value: "single"
        }
      ),
      /* @__PURE__ */ u(
        SelectableIcon,
        {
          type: "stack",
          title: "Instance into multiple font files",
          currentValue: axis.mode,
          value: "multiple"
        }
      )
    ] }),
    modeControl
  ] });
};
const StyleSettingComponent = ({ styleSetting: styleSetting2, name, tag }) => {
  return /* @__PURE__ */ u("div", { className: style$6.styleSetting, children: [
    /* @__PURE__ */ u("div", { className: style$6.styleSettingName, title: tag, children: name }),
    styleSetting2.type === "single" ? /* @__PURE__ */ u("span", { className: style$6.staticSetting, children: (Math.round(styleSetting2.value * 1e3) / 1e3).toString() }) : /* @__PURE__ */ u(AxisSettingComponent, { axis: styleSetting2.value })
  ] });
};
const SingleFontSettings = ({ font, styleSettings, filename, enableSubsetting }) => {
  const appState = useAppState();
  const addErrorToast = useAddErrorToast();
  const removeFont2 = q(() => {
    appState.removeFont(font).catch((err2) => {
      addErrorToast("Failed to remove font", err2);
    });
  }, [font]);
  const anySettingsNonStatic = styleSettings.weight && styleSettings.weight.type !== "single" || styleSettings.width && styleSettings.width.type !== "single" || styleSettings.italic && styleSettings.italic.type !== "single" || styleSettings.slant && styleSettings.slant.type !== "single";
  return /* @__PURE__ */ u("div", { className: style$6.singleFontSettings, children: [
    /* @__PURE__ */ u("div", { className: style$6.singleFontHeader, children: [
      /* @__PURE__ */ u("div", { className: style$6.singleFontName, children: [
        /* @__PURE__ */ u("span", { className: style$6.singleFontFamily, children: [
          font.familyName,
          " "
        ] }),
        /* @__PURE__ */ u("span", { className: style$6.singleFontSubfamily, children: [
          font.subfamilyName,
          " "
        ] }),
        /* @__PURE__ */ u("span", { className: style$6.singleFontFileInfo, children: [
          "(",
          filename,
          ", ",
          formatFileSize(font.fileSize),
          ")"
        ] })
      ] }),
      /* @__PURE__ */ u(
        IconButton,
        {
          onClick: removeFont2,
          type: "close",
          title: "Remove this font",
          className: style$6.removeFont
        }
      )
    ] }),
    enableSubsetting && (styleSettings.weight || styleSettings.width || styleSettings.italic || styleSettings.slant) ? /* @__PURE__ */ u("div", { className: clsx(
      style$6.singleFontSettingsBody,
      anySettingsNonStatic && style$6.settingsGrid,
      !anySettingsNonStatic && style$6.settingsList
    ), children: [
      styleSettings.weight ? /* @__PURE__ */ u(StyleSettingComponent, { styleSetting: styleSettings.weight, name: "Weight" }) : null,
      styleSettings.width ? /* @__PURE__ */ u(StyleSettingComponent, { styleSetting: styleSettings.width, name: "Width" }) : null,
      styleSettings.italic ? /* @__PURE__ */ u(StyleSettingComponent, { styleSetting: styleSettings.italic, name: "Italic" }) : null,
      styleSettings.slant ? /* @__PURE__ */ u(StyleSettingComponent, { styleSetting: styleSettings.slant, name: "Slant" }) : null
    ] }) : null
  ] });
};
const UnicodeRangeTextbox = ({ ranges, disabled: disabled2 }) => {
  const throttledRanges = useThrottledSignal(ranges, 500, true);
  const isValid = T(
    () => parseUnicodeRanges(throttledRanges.value) !== null,
    [throttledRanges, throttledRanges.value]
  );
  return /* @__PURE__ */ u(
    TextBox,
    {
      value: ranges,
      placeholder: 'Enter Unicode code points or ranges to include (e.g. "U+0020", "U+0025-U+00FF", "U+0025-00FF, U+0020, U+FFFD")',
      className: clsx(style$6.unicodeRangeTextbox, { [style$6.invalid]: !isValid }),
      disabled: disabled2
    }
  );
};
const AxisRangeTextbox = ({ ranges, disabled: disabled2 }) => {
  const throttledRanges = useThrottledSignal(ranges, 500, true);
  const isValid = T(
    () => parseRanges(throttledRanges.value) !== null,
    [throttledRanges, throttledRanges.value]
  );
  return /* @__PURE__ */ u(
    TextBox,
    {
      value: ranges,
      placeholder: "400, 500, 600-700",
      className: clsx(style$6.axisRangeTextbox, { [style$6.invalid]: !isValid }),
      disabled: disabled2
    }
  );
};
const CheckboxSection = ({ settings, name, mapping, disabled: disabled2 }) => {
  const settingsSignal = useLiveSignal(settings);
  const numChecked = useComputed(() => settingsSignal.value.reduce(
    (count, setting2) => count + (mapping(setting2).checked.value ? 1 : 0),
    0
  ));
  const toggleAll = q(() => {
    const allChecked = numChecked.value === settings.length;
    r$1(() => {
      for (const setting2 of settings) {
        mapping(setting2).checked.value = !allChecked;
      }
    });
  }, [settings, numChecked]);
  return /* @__PURE__ */ u("div", { className: clsx(style$6.settingsSubSection, style$6.checkboxSection, { [style$6.disabled]: disabled2 }), children: [
    /* @__PURE__ */ u("header", { children: /* @__PURE__ */ u("label", { children: [
      /* @__PURE__ */ u(
        "input",
        {
          type: "checkbox",
          checked: numChecked.value === settings.length,
          indeterminate: numChecked.value > 0 && numChecked.value < settings.length,
          onInput: toggleAll,
          disabled: disabled2
        }
      ),
      " ",
      name
    ] }) }),
    /* @__PURE__ */ u("div", { className: style$6.checkboxes, children: settings.map((item) => {
      const { label: label2, checked, title } = mapping(item);
      return /* @__PURE__ */ u(
        CheckboxToggle,
        {
          label: label2,
          checked,
          title,
          disabled: disabled2
        }
      );
    }) })
  ] });
};
const featureLabel = (feature) => {
  return feature.label ?? featureMetadata(feature.tag).name ?? feature.tag;
};
const mapIncludeFeatures = (item) => ({
  label: featureLabel(item.feature),
  checked: item.include,
  title: item.feature.tag
});
const mapNamedSubsets = (item) => ({
  label: item.name,
  checked: item.include
});
const CopyPasteButtons = ({ settings, copyFunction, pasteFunction }) => {
  const copySettings = q(() => {
    void copyText(JSON.stringify(copyFunction(settings)));
  }, [settings]);
  const pasteSettings = q(() => {
    void pasteText().then((text) => {
      try {
        const newSettings = JSON.parse(text);
        if (typeof newSettings === "object") {
          pasteFunction(settings, newSettings);
        }
      } catch (e) {
        console.error("Failed to paste settings:", e);
      }
    });
  }, [settings]);
  return /* @__PURE__ */ u("div", { className: style$6.copyPasteButtons, children: [
    /* @__PURE__ */ u(IconButton, { onClick: copySettings, type: "copy", title: "Copy settings to clipboard" }),
    /* @__PURE__ */ u(IconButton, { onClick: pasteSettings, type: "paste", title: "Paste settings from clipboard" })
  ] });
};
const SettingsSection = ({ title, children, copyPasteFns, startCollapsed = false }) => {
  const collapsed = useSignal(startCollapsed);
  const bodyId = g();
  return /* @__PURE__ */ u("section", { className: style$6.settingsSection, children: [
    /* @__PURE__ */ u(
      CollapsibleHeader,
      {
        bodyId,
        auxiliaryItems: copyPasteFns && /* @__PURE__ */ u(
          CopyPasteButtons,
          {
            settings: copyPasteFns.settings,
            copyFunction: copyPasteFns.copy,
            pasteFunction: copyPasteFns.paste
          }
        ),
        collapsed,
        children: title
      }
    ),
    /* @__PURE__ */ u("div", { className: style$6.settingsSectionBody, id: bodyId, hidden: collapsed.value, children })
  ] });
};
const CharacterSet = ({ settings, disabled: disabled2, isMultiple, onRemove }) => {
  const handleRemove = q(() => {
    onRemove?.(settings);
  }, [onRemove, settings]);
  const placeholderText = useComputed(() => {
    if (settings.includeUnicodeRanges.value !== "") return "";
    let text = "";
    for (const named of settings.includeNamedSubsets) {
      if (named.include.value) {
        text += `${named.name}-`;
      }
    }
    return text.slice(0, -1);
  });
  return /* @__PURE__ */ u("div", { className: style$6.characterSet, children: [
    isMultiple ? /* @__PURE__ */ u("div", { className: style$6.characterSetHeader, children: [
      /* @__PURE__ */ u(
        TextBox,
        {
          value: settings.name,
          small: true,
          placeholder: placeholderText.value || "Name this character set (optional)",
          className: style$6.characterSetName
        }
      ),
      /* @__PURE__ */ u(IconButton, { type: "close", title: "Remove this character set", onClick: handleRemove })
    ] }) : null,
    /* @__PURE__ */ u("div", { className: style$6.characterSetBody, children: [
      settings.includeNamedSubsets.length > 0 ? /* @__PURE__ */ u(
        CheckboxSection,
        {
          name: "Named subsets",
          settings: settings.includeNamedSubsets,
          mapping: mapNamedSubsets,
          disabled: disabled2
        }
      ) : null,
      /* @__PURE__ */ u("div", { className: style$6.settingsSubSection, children: /* @__PURE__ */ u(
        UnicodeRangeTextbox,
        {
          ranges: settings.includeUnicodeRanges,
          disabled: disabled2
        }
      ) })
    ] })
  ] });
};
const FontFamilySettings = ({ familySettings: familySettings2 }) => {
  const appState = useAppState();
  const { name, fonts, settings } = familySettings2;
  const addErrorToast = useAddErrorToast();
  const removeFamily = q(() => {
    appState.removeFontFamily(familySettings2).catch((err2) => {
      addErrorToast("Failed to remove font family", err2);
    });
  }, [familySettings2]);
  const addCharacterSet = q(() => {
    appState.addCharacterSet(familySettings2);
  }, [appState, familySettings2]);
  const removeCharacterSet = q((characterSet2) => {
    appState.removeCharacterSet(familySettings2, characterSet2);
  }, [appState, familySettings2]);
  return /* @__PURE__ */ u("div", { className: style$6.familySettings, "aria-label": `Settings for ${name} font family`, children: [
    /* @__PURE__ */ u("div", { className: style$6.familyHeader, children: [
      /* @__PURE__ */ u("span", { className: style$6.familyName, children: name }),
      /* @__PURE__ */ u(
        CheckboxToggle,
        {
          label: "Subset",
          title: "Save space by reducing the number of glyphs, features, and variations in this font",
          checked: familySettings2.enableSubsetting
        }
      ),
      /* @__PURE__ */ u(
        CopyPasteButtons,
        {
          settings: familySettings2,
          copyFunction: copySubsetSettings,
          pasteFunction: pasteSubsetSettings
        }
      ),
      /* @__PURE__ */ u(
        IconButton,
        {
          onClick: removeFamily,
          type: "close",
          title: "Remove this font family",
          className: style$6.removeFontFamily
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { className: style$6.familySettingsBody, children: [
      familySettings2.enableSubsetting.value && /* @__PURE__ */ u(k, { children: [
        settings.styleSettings.weight || settings.styleSettings.width || settings.styleSettings.italic || settings.styleSettings.slant ? /* @__PURE__ */ u(
          SettingsSection,
          {
            title: "Style settings",
            copyPasteFns: {
              settings: settings.styleSettings,
              copy: copyStyleSettings,
              paste: pasteStyleSettings
            },
            children: /* @__PURE__ */ u("div", { className: style$6.settingsGrid, children: [
              settings.styleSettings.weight ? /* @__PURE__ */ u(
                StyleSettingComponent,
                {
                  styleSetting: settings.styleSettings.weight,
                  name: "Weight"
                }
              ) : null,
              settings.styleSettings.width ? /* @__PURE__ */ u(
                StyleSettingComponent,
                {
                  styleSetting: settings.styleSettings.width,
                  name: "Width"
                }
              ) : null,
              settings.styleSettings.italic ? /* @__PURE__ */ u(
                StyleSettingComponent,
                {
                  styleSetting: settings.styleSettings.italic,
                  name: "Italic"
                }
              ) : null,
              settings.styleSettings.slant ? /* @__PURE__ */ u(
                StyleSettingComponent,
                {
                  styleSetting: settings.styleSettings.slant,
                  name: "Slant"
                }
              ) : null
            ] })
          }
        ) : null,
        settings.axisSettings.length > 0 ? /* @__PURE__ */ u(
          SettingsSection,
          {
            title: "Variation axis settings",
            copyPasteFns: {
              settings: settings.axisSettings,
              copy: copyAxisSettings,
              paste: pasteAxisSettings
            },
            children: /* @__PURE__ */ u("div", { className: style$6.settingsGrid, children: settings.axisSettings.map(({ name: name2, tag, range }) => /* @__PURE__ */ u(
              StyleSettingComponent,
              {
                styleSetting: { type: "variable", value: range },
                name: name2,
                tag
              }
            )) })
          }
        ) : null,
        /* @__PURE__ */ u(
          SettingsSection,
          {
            title: "Character sets",
            copyPasteFns: {
              settings: settings.includeCharacters,
              copy: copyIncludeCharactersSettings,
              paste: pasteIncludeCharactersSettings
            },
            children: [
              /* @__PURE__ */ u("div", { className: style$6.characterSetsHeader, children: [
                /* @__PURE__ */ u(IconButton, { type: "plus", title: "Add character set", onClick: addCharacterSet }),
                /* @__PURE__ */ u("div", { className: style$6.headerDivider }),
                /* @__PURE__ */ u(
                  CheckboxToggle,
                  {
                    label: "Include all characters",
                    checked: settings.includeCharacters.includeAllCharacters
                  }
                )
              ] }),
              /* @__PURE__ */ u("div", { className: style$6.characterSets, children: settings.includeCharacters.characterSets.value.map(
                (charSet) => /* @__PURE__ */ u(
                  CharacterSet,
                  {
                    settings: charSet,
                    disabled: settings.includeCharacters.includeAllCharacters.value,
                    isMultiple: settings.includeCharacters.characterSets.value.length > 1,
                    onRemove: removeCharacterSet
                  },
                  charSet
                )
              ) })
            ]
          }
        ),
        settings.includeFeatures.features.length > 0 || settings.includeFeatures.characterVariants.length > 0 || settings.includeFeatures.stylisticSets.length > 0 ? /* @__PURE__ */ u(
          SettingsSection,
          {
            title: "Features",
            copyPasteFns: {
              settings: settings.includeFeatures,
              copy: copyFeatureSettings,
              paste: pasteFeatureSettings
            },
            children: [
              settings.includeFeatures.features.length > 0 ? /* @__PURE__ */ u("div", { className: style$6.settingsSubSection, children: /* @__PURE__ */ u("div", { className: style$6.checkboxes, children: settings.includeFeatures.features.map(({ feature, include }) => /* @__PURE__ */ u(
                CheckboxToggle,
                {
                  label: featureLabel(feature),
                  checked: include,
                  title: feature.tag
                }
              )) }) }) : null,
              settings.includeFeatures.stylisticSets.length > 0 ? /* @__PURE__ */ u(
                CheckboxSection,
                {
                  name: "Stylistic sets",
                  settings: settings.includeFeatures.stylisticSets,
                  mapping: mapIncludeFeatures
                }
              ) : null,
              settings.includeFeatures.characterVariants.length > 0 ? /* @__PURE__ */ u(
                CheckboxSection,
                {
                  name: "Character variants",
                  settings: settings.includeFeatures.characterVariants,
                  mapping: mapIncludeFeatures
                }
              ) : null
            ]
          }
        ) : null
      ] }),
      /* @__PURE__ */ u(
        SettingsSection,
        {
          title: ["Fonts", /* @__PURE__ */ u("span", { className: style$6.numFonts, children: fonts.length })],
          startCollapsed: fonts.length > 6,
          children: fonts.map(({ font, styleSettings, filename }) => /* @__PURE__ */ u(
            SingleFontSettings,
            {
              font,
              styleSettings,
              filename,
              enableSubsetting: familySettings2.enableSubsetting.value
            }
          ))
        }
      )
    ] })
  ] });
};
const hasFiles = (event) => {
  if (!event.dataTransfer?.items) return false;
  for (const item of event.dataTransfer.items) {
    if (item.kind === "file") {
      return true;
    }
  }
  return false;
};
const FontInfo = () => {
  const appState = useAppState();
  const { fonts, fontsBeingLoaded } = appState;
  const addErrorToast = useAddErrorToast();
  const onDragEnter = q((event) => {
    if (!hasFiles(event)) return;
    event.preventDefault();
    event.stopPropagation();
  }, []);
  const onDragOver = q((event) => {
    if (!hasFiles(event)) return;
    event.preventDefault();
    event.stopPropagation();
  }, []);
  const onDrop = q((event) => {
    if (!hasFiles(event)) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      appState.addFontFiles(event.dataTransfer.files).catch((err2) => {
        addErrorToast("Failed to add fonts", err2);
      });
    }
  }, []);
  const onDragLeave = q((event) => {
    if (!hasFiles(event)) return;
    event.preventDefault();
    event.stopPropagation();
  }, []);
  const uploadFonts = q(() => {
    showFontPicker().then(async (files) => {
      if (files) {
        await appState.addFontFiles(files);
      }
    }).catch((err2) => {
      addErrorToast("Failed to upload fonts", err2);
    });
  }, [appState]);
  const openGoogleFontsModal = q((event) => {
    appState.googleFontsModalState.open.value = true;
    event.stopPropagation();
  }, [appState]);
  if (fonts.value.length === 0) {
    if (fontsBeingLoaded.value > 0) {
      return /* @__PURE__ */ u("div", { className: style$6.loading, children: /* @__PURE__ */ u(Loader, { size: 320 }) });
    }
    return /* @__PURE__ */ u(
      "div",
      {
        className: style$6.noFonts,
        onDragEnter,
        onDragOver,
        onDrop,
        onDragLeave,
        onClick: uploadFonts,
        children: [
          /* @__PURE__ */ u("div", { className: style$6.uploadFonts, children: [
            /* @__PURE__ */ u(Icon, { type: "upload", title: "", className: style$6.uploadIcon, size: "8rem" }),
            /* @__PURE__ */ u("div", { className: style$6.uploadHeader, children: "Click to upload fonts" }),
            /* @__PURE__ */ u("div", { className: style$6.uploadSub, children: "or drag and drop" })
          ] }),
          /* @__PURE__ */ u(Button, { onClick: openGoogleFontsModal, children: [
            /* @__PURE__ */ u(Icon, { type: "globe", title: "" }),
            "Browse Google Fonts"
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ u(
    "div",
    {
      className: style$6.families,
      onDragEnter,
      onDragOver,
      onDrop,
      onDragLeave,
      children: fonts.value.map((family) => /* @__PURE__ */ u(FontFamilySettings, { familySettings: family }))
    }
  );
};
const exportPanel = "_export-panel_mzs1e_270";
const horizontal = "_horizontal_mzs1e_277";
const spacer = "_spacer_mzs1e_281";
const splitter = "_splitter_mzs1e_285";
const vertical = "_vertical_mzs1e_299";
const row = "_row_mzs1e_355";
const growButton = "_grow-button_mzs1e_361";
const cssPathPrefixBar = "_css-path-prefix-bar_mzs1e_365";
const cssPathPrefix = "_css-path-prefix_mzs1e_365";
const cssPreview = "_css-preview_mzs1e_381";
const exportButtons = "_export-buttons_mzs1e_389";
const loaderWrapper = "_loader-wrapper_mzs1e_397";
const exportFormats = "_export-formats_mzs1e_405";
const buttonRow = "_button-row_mzs1e_411";
const exportResults = "_export-results_mzs1e_423";
const exportedFonts = "_exported-fonts_mzs1e_430";
const exportedCss = "_exported-css_mzs1e_430";
const exportedFontFiles = "_exported-font-files_mzs1e_444";
const fontFileTable = "_font-file-table_mzs1e_452";
const fontName$1 = "_font-name_mzs1e_468";
const fontFileSize = "_font-file-size_mzs1e_471";
const moreSettings = "_more-settings_mzs1e_502";
const setting = "_setting_mzs1e_518";
const spinboxSetting = "_spinbox-setting_mzs1e_528";
const footer = "_footer_mzs1e_536";
const style$2 = {
  exportPanel,
  horizontal,
  spacer,
  splitter,
  vertical,
  row,
  growButton,
  cssPathPrefixBar,
  cssPathPrefix,
  cssPreview,
  exportButtons,
  loaderWrapper,
  exportFormats,
  buttonRow,
  exportResults,
  exportedFonts,
  exportedCss,
  exportedFontFiles,
  fontFileTable,
  fontName: fontName$1,
  fontFileSize,
  moreSettings,
  setting,
  spinboxSetting,
  footer
};
const packageFonts = (fonts, css) => {
  const chunks = [];
  let zipResolve, zipReject;
  const zipPromise = new Promise((resolve, reject) => {
    zipResolve = resolve;
    zipReject = reject;
  });
  const zip = new Zip((err2, data, final) => {
    if (err2) {
      zip.terminate();
      zipReject(err2);
      return;
    }
    chunks.push(data);
    if (final) {
      const blob = new Blob(chunks, { type: "application/zip" });
      zipResolve(blob);
    }
  });
  const cssFile = new AsyncZipDeflate("fonts.css");
  zip.add(cssFile);
  cssFile.push(new TextEncoder().encode(css), true);
  for (const { filename, data, font: { format } } of fonts) {
    if (data.opentype) {
      const extension = format === "opentype" ? ".otf" : ".ttf";
      const file = new AsyncZipDeflate(filename + extension);
      zip.add(file);
      file.push(data.opentype.slice(), true);
    }
    if (data.woff) {
      const file = new ZipPassThrough(filename + ".woff");
      zip.add(file);
      file.push(data.woff, true);
    }
    if (data.woff2) {
      const file = new ZipPassThrough(filename + ".woff2");
      zip.add(file);
      file.push(data.woff2, true);
    }
  }
  zip.end();
  return zipPromise;
};
const saveToFile = (name, blob) => {
  const a = document.createElement("a");
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 0);
};
const useResizablePanel = (initialSize, minSize, maxSize, direction) => {
  const panelSize = useSignal(initialSize);
  const ac = A(null);
  const panel = A(null);
  const panelRef = q((element) => {
    panel.current = element;
  }, [panelSize]);
  const refCallback = q((element) => {
    if (ac.current) {
      ac.current.abort();
      ac.current = null;
    }
    if (!element) return;
    const abortController = new AbortController();
    ac.current = abortController;
    let onMouseMove, onMouseUp;
    const onMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const startPos = direction === "vertical" ? event.clientY : event.clientX;
      const rect = panel.current?.getBoundingClientRect();
      if (!rect) return;
      const startSize = direction === "vertical" ? rect.height : rect.width;
      onMouseMove = (moveEvent) => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();
        const delta = (direction === "vertical" ? moveEvent.clientY : moveEvent.clientX) - startPos;
        const newSize = startSize - delta;
        if (newSize >= minSize && newSize <= maxSize) {
          panelSize.value = newSize;
        }
      };
      onMouseUp = () => {
        document.removeEventListener("pointermove", onMouseMove);
        document.removeEventListener("pointerup", onMouseUp);
        document.removeEventListener("pointerleave", onMouseUp);
      };
      document.addEventListener("pointermove", onMouseMove, { signal: abortController.signal });
      document.addEventListener("pointerup", onMouseUp, { signal: abortController.signal });
      document.addEventListener("pointerleave", onMouseUp, { signal: abortController.signal });
    };
    if (element) {
      element.addEventListener("pointerdown", onMouseDown, { signal: abortController.signal });
    }
  }, [minSize, maxSize, panelSize, direction]);
  return {
    resizerRef: refCallback,
    panelRef,
    panelSize
  };
};
const blobCat = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='128'%20height='128'%3e%3cpath%20fill='%23fcc21b'%20d='M125.74%2074.99c7.79-29.66-8.507-56.66-38.005-62.083C24.313%201.249-3.8%2053.67.83%2094.54c0%2013.63%2028.17%2024.69%2062.93%2024.69%2032.58%200%2059.37-9.73%2062.59-22.17q.33-1.245.33-2.52c.01-6.48-4.12-7.46-.94-19.55'/%3e%3cpath%20fill='%232f2f2f'%20d='M28.073%2042.118c2.28-4.54%207.2-6.69%2010.99-4.84%203.78%201.86%205.01%207.03%202.74%2011.56s-7.18%206.69-10.97%204.83c-3.78-1.86-5.02-7.04-2.76-11.55M93.541%2053.449c-1.09%205.07-5.41%208.47-9.65%207.59-4.27-.89-6.84-5.72-5.77-10.79%201.09-5.08%205.41-8.48%209.67-7.59%204.25.87%206.83%205.69%205.75%2010.79'/%3e%3cpath%20fill='%23fcc21b'%20d='M10.415%2046.678c1.349-9.29%201.124-28.397%202.622-35.664C14.536%203.746%2017.721.823%2025.1%206.594c6.955%205.439%2012.337%2010.322%2014.386%2011.528M102.41%2018.649c5.563-3.656%2014.517-8%2018.119-8.636%203.548-.626%207.682-.212%207.1%205.404-.678%206.53-3.391%2020.132-3.286%2027.338'/%3e%3cpath%20fill='none'%20stroke='%232f2f2f'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='6'%20d='M38.677%2063.99c1.309%204.264%204.257%2011.373%206.04%2013.249%202.967-2.225%209.093-8.665%209.94-9.725%202.506%202.594%205.863%208.868%208.59%2012.043%203.39-2.119%209.473-7.929%2011.28-9.673'/%3e%3cpath%20fill='%232f2f2f'%20d='M28.621%2061.813c.317%203.329-20.531%202.594-20.455%201.124.08-1.53%2020.224-3.549%2020.455-1.124M25.699%2070.3c2.007%202.675-19.201%2012.794-20.05%2010.383-.706-2.005%2019.418-11.226%2020.05-10.383M89.517%2069.914c.45-3.314%2020.957%202.485%2020.548%203.9-.426%201.472-20.875-1.486-20.548-3.9M88.278%2079.466c.905-.914%2019.818%2010.186%2018.207%2011.94-2.587%202.817-19.439-10.697-18.207-11.94'/%3e%3c/svg%3e";
const nodeTypeClassNames = {
  [NodeType.Whitespace]: null,
  [NodeType.DefinitionKeyword]: "dk",
  [NodeType.OperatorKeyword]: "ok",
  [NodeType.Keyword]: "kw",
  [NodeType.PropertyName]: "pn",
  [NodeType.Paren]: "p",
  [NodeType.Brace]: "b",
  [NodeType.Punctuation]: "pu",
  [NodeType.String]: "s",
  [NodeType.Number]: "n",
  [NodeType.Separator]: "se"
};
const CssPreview = ({ fonts }) => {
  const { cssPathPrefix: cssPathPrefix2, exportSettings } = useAppState();
  const throttledPathPrefix = useThrottledSignal(cssPathPrefix2, 500, true);
  const css = T(() => {
    const css2 = exportedFontsToCSS(fonts, throttledPathPrefix.value, exportSettings.includeTTFinCSS.value);
    if (css2.spans.length > 0 && css2.spans[css2.spans.length - 1].type === NodeType.Whitespace) {
      css2.spans.pop();
    }
    return css2;
  }, [
    fonts,
    throttledPathPrefix.value,
    exportSettings.includeTTFinCSS.value
  ]);
  const appendCss = (element) => {
    if (!element) return;
    const fragment = new DocumentFragment();
    for (const span of css.spans) {
      const elem = document.createElement("span");
      const className = nodeTypeClassNames[span.type];
      if (className !== null) elem.setAttribute("class", `hl-${className}`);
      elem.append(span.text);
      fragment.appendChild(elem);
    }
    element.replaceChildren(fragment);
  };
  return T(() => /* @__PURE__ */ u("pre", { className: style$2.cssPreview, ref: appendCss }), [css]);
};
const ExportedFonts = ({ fonts, exportedFormats }) => {
  const { cssPathPrefix: cssPathPrefix2, exportSettings } = useAppState();
  const downloading = useSignal(false);
  const downloadZip = q(async () => {
    downloading.value = true;
    const zip = await packageFonts(fonts, exportedFontsToCSS(
      fonts,
      cssPathPrefix2.value,
      exportSettings.includeTTFinCSS.value
    ).getString());
    saveToFile("fonts.zip", zip);
    downloading.value = false;
  }, [fonts, cssPathPrefix2, exportSettings.includeTTFinCSS]);
  return /* @__PURE__ */ u("div", { className: style$2.exportedFonts, children: [
    /* @__PURE__ */ u("div", { className: style$2.exportedFontFiles, children: /* @__PURE__ */ u("table", { className: clsx(style$2.fontFileTable, "fancy-table"), children: [
      /* @__PURE__ */ u("thead", { children: /* @__PURE__ */ u("tr", { children: [
        /* @__PURE__ */ u("th", { scope: "col", children: "Filename" }),
        exportedFormats.ttf && /* @__PURE__ */ u("th", { scope: "col", children: "TTF/OTF" }),
        exportedFormats.woff && /* @__PURE__ */ u("th", { scope: "col", children: "WOFF" }),
        exportedFormats.woff2 && /* @__PURE__ */ u("th", { scope: "col", children: "WOFF2" })
      ] }) }),
      /* @__PURE__ */ u("tbody", { children: fonts.map(({ filename, data }) => /* @__PURE__ */ u("tr", { children: [
        /* @__PURE__ */ u("td", { className: style$2.fontName, children: filename }),
        exportedFormats.ttf && /* @__PURE__ */ u("td", { className: style$2.fontFileSize, children: data.opentype ? /* @__PURE__ */ u(k, { children: [
          /* @__PURE__ */ u("span", { children: [
            formatFileSize(data.opentype.length),
            " "
          ] }),
          /* @__PURE__ */ u(
            IconButton,
            {
              type: "download",
              title: "Download",
              onClick: () => saveToFile(
                filename + ".ttf",
                new Blob([data.opentype], { type: "font/ttf" })
              )
            }
          )
        ] }) : null }),
        exportedFormats.woff && /* @__PURE__ */ u("td", { className: style$2.fontFileSize, children: data.woff ? /* @__PURE__ */ u(k, { children: [
          /* @__PURE__ */ u("span", { children: [
            formatFileSize(data.woff.length),
            " "
          ] }),
          /* @__PURE__ */ u(
            IconButton,
            {
              type: "download",
              title: "Download",
              onClick: () => saveToFile(
                filename + ".woff",
                new Blob([data.woff], { type: "font/woff" })
              )
            }
          )
        ] }) : null }),
        exportedFormats.woff2 && /* @__PURE__ */ u("td", { className: style$2.fontFileSize, children: data.woff2 ? /* @__PURE__ */ u(k, { children: [
          /* @__PURE__ */ u("span", { children: [
            formatFileSize(data.woff2.length),
            " "
          ] }),
          /* @__PURE__ */ u(
            IconButton,
            {
              type: "download",
              title: "Download",
              onClick: () => saveToFile(
                filename + ".woff2",
                new Blob([data.woff2], { type: "font/woff2" })
              )
            }
          )
        ] }) : null })
      ] })) })
    ] }) }),
    /* @__PURE__ */ u(Button, { onClick: downloadZip, disabled: downloading.value, children: [
      downloading.value ? /* @__PURE__ */ u(Loader, { size: 24 }) : /* @__PURE__ */ u(Icon, { type: "download", title: "" }),
      /* @__PURE__ */ u("span", { children: "Download .zip" })
    ] })
  ] });
};
const ExportedCss = ({ fonts }) => {
  const { cssPathPrefix: cssPathPrefix2, exportSettings } = useAppState();
  const copyCSS = q(() => {
    void copyText(exportedFontsToCSS(fonts, cssPathPrefix2.value, exportSettings.includeTTFinCSS.value).getString());
  }, [fonts, cssPathPrefix2, exportSettings.includeTTFinCSS]);
  return /* @__PURE__ */ u("div", { className: style$2.exportedCss, children: [
    /* @__PURE__ */ u("div", { className: style$2.cssPathPrefixBar, children: [
      /* @__PURE__ */ u("label", { children: "CSS path prefix:" }),
      /* @__PURE__ */ u(TextBox, { className: style$2.cssPathPrefix, value: cssPathPrefix2 }),
      /* @__PURE__ */ u(IconButton, { type: "copy", title: "Copy CSS to clipboard", onClick: copyCSS })
    ] }),
    /* @__PURE__ */ u(CssPreview, { fonts })
  ] });
};
const MoreSettings = ({ relativeTo, active }) => {
  const { reference, floating } = useFloating(() => ({
    placement: "bottom",
    middleware: [
      offset(4),
      shift({ padding: 8 }),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          const { floating: floating2 } = elements;
          floating2.style.maxWidth = `${availableWidth}px`;
          floating2.style.maxHeight = `${availableHeight}px`;
        },
        padding: 8
      }),
      flip()
    ]
  }));
  reference(relativeTo.current);
  const popupRef = (elem) => {
    floating(elem);
    elem?.focus();
  };
  const handleBlur = q((event) => {
    if (!event.relatedTarget || event.relatedTarget !== relativeTo.current && event.currentTarget?.contains(event.relatedTarget) === false) {
      active.value = false;
    }
  }, []);
  const { exportSettings } = useAppState();
  if (!active.value) return null;
  return /* @__PURE__ */ u(Overlay, { children: /* @__PURE__ */ u("div", { className: style$2.moreSettings, tabIndex: 0, ref: popupRef, onBlur: handleBlur, children: [
    /* @__PURE__ */ u("div", { className: clsx(style$2.setting, style$2.spinboxSetting), children: [
      /* @__PURE__ */ u("label", { children: "WOFF compression level" }),
      /* @__PURE__ */ u(SpinBox, { min: 1, max: 100, step: 1, value: exportSettings.woffCompression })
    ] }),
    /* @__PURE__ */ u("div", { className: clsx(style$2.setting, style$2.spinboxSetting), children: [
      /* @__PURE__ */ u("label", { children: "WOFF2 compression level" }),
      /* @__PURE__ */ u(SpinBox, { min: 1, max: 11, step: 1, value: exportSettings.woff2Compression })
    ] }),
    /* @__PURE__ */ u("div", { className: style$2.setting, children: /* @__PURE__ */ u(
      CheckboxToggle,
      {
        label: "Include .ttf/.otf in CSS",
        checked: exportSettings.includeTTFinCSS
      }
    ) })
  ] }) });
};
const ExportPanel = () => {
  const appState = useAppState();
  const { fonts, fontsBeingLoaded, exportSettings } = appState;
  const addErrorToast = useAddErrorToast();
  const exportFonts2 = q(() => {
    appState.exportFonts().catch((err2) => {
      addErrorToast("Failed to export fonts", err2);
    });
  }, [appState]);
  const uploadMore = q(() => {
    showFontPicker().then(async (files) => {
      if (files) {
        await appState.addFontFiles(files);
      }
    }).catch((err2) => {
      addErrorToast("Failed to upload fonts", err2);
    });
  }, [appState, addErrorToast]);
  const browseGoogleFonts = q(() => {
    appState.googleFontsModalState.open.value = true;
  }, [appState.googleFontsModalState.open]);
  const saveSettingsToFile = q(() => {
    const savedSettings = appState.saveAllSettings();
    const settingsFile = new Blob(
      [new TextEncoder().encode(JSON.stringify(savedSettings))],
      { type: "application/json" }
    );
    saveToFile("settings.json", settingsFile);
  }, [appState]);
  const savingCliSettings = useSignal(false);
  const saveSettingsForCli = q(async () => {
    try {
      savingCliSettings.value = true;
      const savedZip = await appState.saveCliSettings();
      saveToFile("settings.zip", savedZip);
    } catch (err2) {
      addErrorToast("Failed to save CLI settings", err2);
    }
    savingCliSettings.value = false;
  }, [appState, addErrorToast, savingCliSettings]);
  const loadSettingsFromFile = q(() => {
    showOpenFilePicker({ accept: ".json" }).then(async (files) => {
      if (files && files.length > 0) {
        const file = files[0];
        const text = await file.text();
        const settings = JSON.parse(text);
        appState.loadAllSettings(settings);
      }
    }).catch((err2) => {
      addErrorToast("Failed to load settings", err2);
    });
  }, [appState, addErrorToast]);
  const settingsOpen = useSignal(false);
  const moreSettingsButtonRef = A(null);
  const [isPortrait, setIsPortrait] = d$1(() => window.matchMedia("(orientation: portrait)").matches);
  y(() => {
    const mediaQueryList = window.matchMedia("(orientation: portrait)");
    const handleOrientationChange = (event) => {
      setIsPortrait(event.matches);
    };
    mediaQueryList.addEventListener("change", handleOrientationChange);
    return () => {
      mediaQueryList.removeEventListener("change", handleOrientationChange);
    };
  }, [isPortrait]);
  const { resizerRef, panelRef, panelSize } = useResizablePanel(
    500,
    isPortrait ? 200 : 400,
    1e4,
    isPortrait ? "vertical" : "horizontal"
  );
  if (fonts.value.length === 0) {
    return null;
  }
  let exportResults2 = null;
  if (appState.exportedFonts.value.state === "loaded") {
    const { exportedFonts: exportedFonts2, exportedFormats } = appState.exportedFonts.value;
    exportResults2 = /* @__PURE__ */ u("div", { className: style$2.exportResults, children: [
      /* @__PURE__ */ u(ExportedFonts, { fonts: exportedFonts2, exportedFormats }),
      /* @__PURE__ */ u(ExportedCss, { fonts: exportedFonts2 })
    ] });
  } else if (appState.exportedFonts.value.state === "loading") {
    const { progress } = appState.exportedFonts.value;
    exportResults2 = /* @__PURE__ */ u("div", { className: style$2.loaderWrapper, children: /* @__PURE__ */ u(Loader, { size: 128, className: style$2.exportLoader, progress }) });
  }
  return /* @__PURE__ */ u(
    "div",
    {
      className: clsx(style$2.exportPanel, isPortrait ? style$2.vertical : style$2.horizontal),
      ref: panelRef,
      style: { [isPortrait ? "height" : "width"]: `${panelSize.value}px` },
      children: [
        /* @__PURE__ */ u("div", { className: style$2.splitter, ref: resizerRef }),
        /* @__PURE__ */ u("div", { className: style$2.exportButtons, children: [
          /* @__PURE__ */ u("div", { className: style$2.row, children: [
            /* @__PURE__ */ u(
              Button,
              {
                onClick: exportFonts2,
                disabled: appState.exportedFonts.value.state === "loading",
                className: style$2.growButton,
                children: "Export"
              }
            ),
            /* @__PURE__ */ u("div", { className: style$2.exportFormats, children: [
              /* @__PURE__ */ u(CheckboxToggle, { label: "TTF/OTF", checked: exportSettings.formats.ttf }),
              /* @__PURE__ */ u(CheckboxToggle, { label: "WOFF", checked: exportSettings.formats.woff }),
              /* @__PURE__ */ u(CheckboxToggle, { label: "WOFF2", checked: exportSettings.formats.woff2 })
            ] }),
            /* @__PURE__ */ u(
              ToggleIcon,
              {
                type: "gear",
                title: "More settings",
                toggled: settingsOpen,
                innerRef: moreSettingsButtonRef
              }
            )
          ] }),
          /* @__PURE__ */ u(
            MoreSettings,
            {
              relativeTo: moreSettingsButtonRef,
              active: settingsOpen
            }
          ),
          /* @__PURE__ */ u("div", { className: style$2.buttonRow, children: [
            /* @__PURE__ */ u(Button, { onClick: saveSettingsToFile, children: [
              /* @__PURE__ */ u(Icon, { type: "download", title: "" }),
              "Save settings"
            ] }),
            /* @__PURE__ */ u(Button, { onClick: loadSettingsFromFile, children: [
              /* @__PURE__ */ u(Icon, { type: "upload", title: "" }),
              "Load settings"
            ] }),
            /* @__PURE__ */ u(Button, { onClick: saveSettingsForCli, disabled: savingCliSettings.value, children: [
              savingCliSettings.value ? /* @__PURE__ */ u(Loader, { size: 24 }) : /* @__PURE__ */ u(Icon, { type: "download", title: "" }),
              "Save CLI config"
            ] })
          ] }),
          /* @__PURE__ */ u("div", { className: style$2.buttonRow, children: [
            /* @__PURE__ */ u(Button, { onClick: uploadMore, children: [
              fontsBeingLoaded.value > 0 ? /* @__PURE__ */ u(Loader, { size: 24 }) : /* @__PURE__ */ u(Icon, { type: "plus", title: "" }),
              "Upload more fonts"
            ] }),
            /* @__PURE__ */ u(Button, { onClick: browseGoogleFonts, children: [
              /* @__PURE__ */ u(Icon, { type: "globe", title: "" }),
              "Browse Google Fonts"
            ] })
          ] })
        ] }),
        exportResults2,
        /* @__PURE__ */ u("div", { className: style$2.spacer }),
        /* @__PURE__ */ u("div", { className: style$2.footer, children: /* @__PURE__ */ u("span", { children: [
          "Made with ",
          /* @__PURE__ */ u("img", { src: blobCat, alt: "blobCat", width: "128", height: "128", style: "width: 1em; height: 1em; vertical-align: middle" }),
          " by ",
          /* @__PURE__ */ u("a", { href: "https://github.com/valadaptive", children: "valadaptive" })
        ] }) })
      ]
    }
  );
};
const tabularNums = "_tabular-nums_pfhh5_120";
const loading = "_loading_pfhh5_180";
const loader = "_loader_pfhh5_279";
const spin = "_spin_pfhh5_1";
const fancyTable = "_fancy-table_pfhh5_211";
const hlDk = "_hl-dk_pfhh5_230";
const hlOk = "_hl-ok_pfhh5_234";
const hlKw = "_hl-kw_pfhh5_238";
const hlPn = "_hl-pn_pfhh5_242";
const hlP = "_hl-p_pfhh5_242";
const hlB = "_hl-b_pfhh5_250";
const hlPu = "_hl-pu_pfhh5_254";
const hlS = "_hl-s_pfhh5_258";
const hlN = "_hl-n_pfhh5_262";
const hlSe = "_hl-se_pfhh5_266";
const fontsModal = "_fonts-modal_pfhh5_270";
const loaderPositioner = "_loader-positioner_pfhh5_279";
const topBar = "_top-bar_pfhh5_286";
const searchBox = "_search-box_pfhh5_295";
const panes = "_panes_pfhh5_299";
const mobileBackButton = "_mobile-back-button_pfhh5_305";
const mobileFiltersButton = "_mobile-filters-button_pfhh5_306";
const listAndPreview = "_list-and-preview_pfhh5_310";
const fontsList = "_fonts-list_pfhh5_314";
const fontsListSort = "_fonts-list-sort_pfhh5_323";
const fontsListFonts = "_fonts-list-fonts_pfhh5_330";
const fontsListFontsInner = "_fonts-list-fonts-inner_pfhh5_335";
const fontItem = "_font-item_pfhh5_339";
const selected = "_selected_pfhh5_351";
const addFontButton = "_add-font-button_pfhh5_354";
const fontName = "_font-name_pfhh5_361";
const addFontLoader = "_add-font-loader_pfhh5_372";
const fontPreviewHeader = "_font-preview-header_pfhh5_380";
const fontPreviewTitle = "_font-preview-title_pfhh5_389";
const fontMeta = "_font-meta_pfhh5_394";
const fontMetaLine = "_font-meta-line_pfhh5_400";
const fontPreview = "_font-preview_pfhh5_380";
const filtersPane = "_filters-pane_pfhh5_413";
const filterGroup = "_filter-group_pfhh5_420";
const filterGroupTitle = "_filter-group-title_pfhh5_427";
const filterToggle = "_filter-toggle_pfhh5_434";
const previewControls = "_preview-controls_pfhh5_438";
const previewTextInput = "_preview-text-input_pfhh5_444";
const previewFontSize = "_preview-font-size_pfhh5_453";
const previewFontSizeSlider = "_preview-font-size-slider_pfhh5_463";
const previewContent = "_preview-content_pfhh5_467";
const previewSamples = "_preview-samples_pfhh5_474";
const fontSample = "_font-sample_pfhh5_480";
const fontStyleName = "_font-style-name_pfhh5_487";
const fontStylePreview = "_font-style-preview_pfhh5_495";
const sectionHeader = "_section-header_pfhh5_500";
const supportedLanguages = "_supported-languages_pfhh5_505";
const scriptLangs = "_script-langs_pfhh5_510";
const supportedLang = "_supported-lang_pfhh5_505";
const scriptTitle = "_script-title_pfhh5_524";
const axisControls = "_axis-controls_pfhh5_528";
const axisControlsBody = "_axis-controls-body_pfhh5_536";
const axisControlsTitle = "_axis-controls-title_pfhh5_542";
const axisLabel = "_axis-label_pfhh5_549";
const axisInputs = "_axis-inputs_pfhh5_556";
const axisSlider = "_axis-slider_pfhh5_562";
const axisSpinBox = "_axis-spin-box_pfhh5_566";
const hide = "_hide_pfhh5_570";
const mobilePreview = "_mobile-preview_pfhh5_586";
const filtersExpanded = "_filters-expanded_pfhh5_606";
const style$1 = {
  "tabular-nums": "_tabular-nums_pfhh5_120",
  tabularNums,
  loading,
  loader,
  spin,
  "fancy-table": "_fancy-table_pfhh5_211",
  fancyTable,
  "hl-dk": "_hl-dk_pfhh5_230",
  hlDk,
  "hl-ok": "_hl-ok_pfhh5_234",
  hlOk,
  "hl-kw": "_hl-kw_pfhh5_238",
  hlKw,
  "hl-pn": "_hl-pn_pfhh5_242",
  hlPn,
  "hl-p": "_hl-p_pfhh5_242",
  hlP,
  "hl-b": "_hl-b_pfhh5_250",
  hlB,
  "hl-pu": "_hl-pu_pfhh5_254",
  hlPu,
  "hl-s": "_hl-s_pfhh5_258",
  hlS,
  "hl-n": "_hl-n_pfhh5_262",
  hlN,
  "hl-se": "_hl-se_pfhh5_266",
  hlSe,
  "fonts-modal": "_fonts-modal_pfhh5_270",
  fontsModal,
  "loader-positioner": "_loader-positioner_pfhh5_279",
  loaderPositioner,
  "top-bar": "_top-bar_pfhh5_286",
  topBar,
  "search-box": "_search-box_pfhh5_295",
  searchBox,
  panes,
  "mobile-back-button": "_mobile-back-button_pfhh5_305",
  mobileBackButton,
  "mobile-filters-button": "_mobile-filters-button_pfhh5_306",
  mobileFiltersButton,
  "list-and-preview": "_list-and-preview_pfhh5_310",
  listAndPreview,
  "fonts-list": "_fonts-list_pfhh5_314",
  fontsList,
  "fonts-list-sort": "_fonts-list-sort_pfhh5_323",
  fontsListSort,
  "fonts-list-fonts": "_fonts-list-fonts_pfhh5_330",
  fontsListFonts,
  "fonts-list-fonts-inner": "_fonts-list-fonts-inner_pfhh5_335",
  fontsListFontsInner,
  "font-item": "_font-item_pfhh5_339",
  fontItem,
  selected,
  "add-font-button": "_add-font-button_pfhh5_354",
  addFontButton,
  "font-name": "_font-name_pfhh5_361",
  fontName,
  "add-font-loader": "_add-font-loader_pfhh5_372",
  addFontLoader,
  "font-preview-header": "_font-preview-header_pfhh5_380",
  fontPreviewHeader,
  "font-preview-title": "_font-preview-title_pfhh5_389",
  fontPreviewTitle,
  "font-meta": "_font-meta_pfhh5_394",
  fontMeta,
  "font-meta-line": "_font-meta-line_pfhh5_400",
  fontMetaLine,
  "font-preview": "_font-preview_pfhh5_380",
  fontPreview,
  "filters-pane": "_filters-pane_pfhh5_413",
  filtersPane,
  "filter-group": "_filter-group_pfhh5_420",
  filterGroup,
  "filter-group-title": "_filter-group-title_pfhh5_427",
  filterGroupTitle,
  "filter-toggle": "_filter-toggle_pfhh5_434",
  filterToggle,
  "preview-controls": "_preview-controls_pfhh5_438",
  previewControls,
  "preview-text-input": "_preview-text-input_pfhh5_444",
  previewTextInput,
  "preview-font-size": "_preview-font-size_pfhh5_453",
  previewFontSize,
  "preview-font-size-slider": "_preview-font-size-slider_pfhh5_463",
  previewFontSizeSlider,
  "preview-content": "_preview-content_pfhh5_467",
  previewContent,
  "preview-samples": "_preview-samples_pfhh5_474",
  previewSamples,
  "font-sample": "_font-sample_pfhh5_480",
  fontSample,
  "font-style-name": "_font-style-name_pfhh5_487",
  fontStyleName,
  "font-style-preview": "_font-style-preview_pfhh5_495",
  fontStylePreview,
  "section-header": "_section-header_pfhh5_500",
  sectionHeader,
  "supported-languages": "_supported-languages_pfhh5_505",
  supportedLanguages,
  "script-langs": "_script-langs_pfhh5_510",
  scriptLangs,
  "supported-lang": "_supported-lang_pfhh5_505",
  supportedLang,
  "script-title": "_script-title_pfhh5_524",
  scriptTitle,
  "axis-controls": "_axis-controls_pfhh5_528",
  axisControls,
  "axis-controls-body": "_axis-controls-body_pfhh5_536",
  axisControlsBody,
  "axis-controls-title": "_axis-controls-title_pfhh5_542",
  axisControlsTitle,
  "axis-label": "_axis-label_pfhh5_549",
  axisLabel,
  "axis-inputs": "_axis-inputs_pfhh5_556",
  axisInputs,
  "axis-slider": "_axis-slider_pfhh5_562",
  axisSlider,
  "axis-spin-box": "_axis-spin-box_pfhh5_566",
  axisSpinBox,
  hide,
  "mobile-preview": "_mobile-preview_pfhh5_586",
  mobilePreview,
  "filters-expanded": "_filters-expanded_pfhh5_606",
  filtersExpanded
};
const modalWrapper = "_modal-wrapper_1klsm_44";
const modalBg = "_modal-bg_1klsm_53";
const modalPositioner = "_modal-positioner_1klsm_62";
const modal = "_modal_1klsm_44";
const style = {
  modalWrapper,
  modalBg,
  modalPositioner,
  modal
};
const Modal = ({ onClose, children, className }) => {
  return /* @__PURE__ */ u("div", { className: style.modalWrapper, children: [
    /* @__PURE__ */ u("div", { className: style.modalBg, onClick: onClose }),
    /* @__PURE__ */ u("div", { className: style.modalPositioner, children: /* @__PURE__ */ u("div", { className: clsx(style.modal, className), children }) })
  ] });
};
const GoogleFontsModal = () => {
  const appState = useAppState();
  const { googleFontsModalState } = appState;
  const fontsListState = googleFontsModalState.state.value;
  if (fontsListState.state === "not_loaded") {
    __vitePreload(async () => {
      const { default: ModalComponent, langList } = await import("./GoogleFontsModalInner-__i_P9wQ.js");
      return { default: ModalComponent, langList };
    }, true ? __vite__mapDeps([0,1,2]) : void 0).then(
      ({ default: ModalComponent, langList }) => {
        const selectedAxes = {};
        for (const axis of axesList) {
          selectedAxes[axis.tag] = d(false);
        }
        const selectedLanguages = {};
        for (const lang of langList.languages) {
          selectedLanguages[lang.id] = d(false);
        }
        googleFontsModalState.state.value = {
          state: "loaded",
          selectedAxes,
          selectedLanguages,
          ModalComponent
        };
      },
      (error2) => {
        googleFontsModalState.state.value = { state: "error", error: error2 };
      }
    );
  }
  let inner;
  switch (fontsListState.state) {
    case "loading":
    case "not_loaded":
      inner = /* @__PURE__ */ u("div", { className: style$1.loaderPositioner, children: /* @__PURE__ */ u(Loader, {}) });
      break;
    case "error":
      inner = String(fontsListState.error);
      break;
    case "loaded": {
      const { ModalComponent } = fontsListState;
      inner = /* @__PURE__ */ u(ModalComponent, { fontsListState });
      break;
    }
  }
  const onCloseModal = q(() => {
    googleFontsModalState.open.value = false;
  }, [googleFontsModalState.open]);
  return /* @__PURE__ */ u(Modal, { onClose: onCloseModal, className: style$1.fontsModal, children: inner });
};
const App$1 = () => {
  const appState = useAppState();
  return /* @__PURE__ */ u("div", { className: style$7.app, children: [
    /* @__PURE__ */ u("div", { className: style$7.displayPane, children: [
      /* @__PURE__ */ u("div", { className: style$7.mainPane, children: /* @__PURE__ */ u(FontInfo, {}) }),
      /* @__PURE__ */ u(ExportPanel, {})
    ] }),
    appState.googleFontsModalState.open.value ? /* @__PURE__ */ u(GoogleFontsModal, {}) : null
  ] });
};
const store = createStore();
function App() {
  return /* @__PURE__ */ u(AppContext.Provider, { value: store, children: /* @__PURE__ */ u(OverlayProvider, { children: /* @__PURE__ */ u(ToastProvider, { children: /* @__PURE__ */ u(App$1, {}) }) }) });
}
const appContainer = document.getElementById("main");
if (appContainer) E$1(/* @__PURE__ */ u(App, {}), appContainer);
export {
  Button as B,
  CheckboxToggle as C,
  Dropdown as D,
  IconButton as I,
  Loader as L,
  Slider as S,
  TextBox as T,
  useThrottledSignal as a,
  uFuzzy as b,
  clsx as c,
  ToggleIcon as d,
  axisMetadata as e,
  SpinBox as f,
  SearchableCheckboxDropdown as g,
  axesList as h,
  useAddErrorToast as i,
  Icon as j,
  axisSpinboxParams as k,
  CollapsibleHeader as l,
  style$1 as s,
  useAppState as u
};
