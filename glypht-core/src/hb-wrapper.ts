import {initWasm} from './wrap-wasm';
import type {MainModule as OrigMainModule} from '../../c-libs-wrapper/hb';

type MainModuleKey =
    | '_free'
    | '_hb_blob_create_or_fail'
    | '_hb_blob_destroy'
    | '_hb_blob_get_data'
    | '_hb_blob_get_length'
    | '_hb_set_copy'
    | '_hb_set_create'
    | '_hb_set_destroy'
    | '_hb_set_get_population'
    | '_hb_set_next'
    | '_hb_set_next_range'
    | '_hb_set_add'
    | '_hb_set_add_range'
    | '_hb_set_clear'
    | '_hb_set_del'
    | '_hb_set_del_range'
    | '_hb_set_intersect'
    | '_hb_set_invert'
    | '_hb_set_reference'
    | '_hb_set_set'
    | '_hb_set_subtract'
    | '_hb_set_union';
type MinMainModule = Pick<OrigMainModule, MainModuleKey>;

const createHarfbuzzWrapped = async<T extends MinMainModule = OrigMainModule>(hbWasmUrl: string) => {
    const hb = await initWasm<T>(hbWasmUrl);

    const freeBlob = hb.addIndirectFunction(hb._free);

    class HbBlob {
        _ptr: number;

        constructor(ptr: number);
        constructor(data: Uint8Array);
        constructor(ptrOrData: number | Uint8Array) {
            if (typeof ptrOrData === 'number') {
                this._ptr = ptrOrData;
                return;
            }

            const dataPtr = hb.malloc(ptrOrData.byteLength);
            hb.HEAPU8.set(ptrOrData, dataPtr);
            const blobPtr = hb._hb_blob_create_or_fail(dataPtr, ptrOrData.byteLength, 2, dataPtr, freeBlob);
            if (blobPtr === 0) {
                throw new Error('Failed to create blob');
            }

            this._ptr = blobPtr;
        }

        ptr() {
            return this._ptr;
        }

        destroy() {
            hb._hb_blob_destroy(this._ptr);
        }

        data() {
            return hb._hb_blob_get_data(this._ptr, this.length());
        }

        length() {
            return hb._hb_blob_get_length(this._ptr);
        }

        asArray() {
            return hb.withStack(() => {
                const lengthPtr = hb.stackAlloc(4);
                const dataPtr = hb._hb_blob_get_data(this._ptr, lengthPtr);
                const length = hb.readUint32(lengthPtr);
                return hb.HEAPU8.subarray(dataPtr, dataPtr + length);
            });
        }

        copyAsArray() {
            return this.asArray().slice();
        }
    }

    class HbSet {
        _ptr: number;
        constructor(ptr?: number) {
            if (ptr === 0) {
                throw new Error('Tried to create an HbSet from a null pointer');
            }
            this._ptr = ptr ?? hb._hb_set_create();
        }

        ptr() {
            return this._ptr;
        }

        add(item: number) {
            hb._hb_set_add(this._ptr, item);
        }

        addRange(start: number, end: number) {
            hb._hb_set_add_range(this._ptr, start, end);
        }

        del(item: number) {
            hb._hb_set_del(this._ptr, item);
        }

        delRange(start: number, end: number) {
            hb._hb_set_del_range(this._ptr, start, end);
        }

        clear() {
            hb._hb_set_clear(this._ptr);
        }

        invert() {
            hb._hb_set_invert(this._ptr);
        }

        reference() {
            hb._hb_set_reference(this._ptr);
        }

        destroy() {
            if (this._ptr === 0) {
                throw new Error('Set already destroyed');
            }
            hb._hb_set_destroy(this._ptr);
            this._ptr = 0;
        }

        union(other: HbSet) {
            hb._hb_set_union(this._ptr, other._ptr);
        }

        intersect(other: HbSet) {
            hb._hb_set_intersect(this._ptr, other._ptr);
        }

        subtract(other: HbSet) {
            hb._hb_set_subtract(this._ptr, other._ptr);
        }

        size() {
            return hb._hb_set_get_population(this._ptr);
        }

        copy() {
            const newPtr = hb._hb_set_copy(this._ptr);
            if (newPtr === 0) {
                throw new Error('Failed to copy set');
            }
            return new HbSet(newPtr);
        }

        setTo(other: HbSet) {
            hb._hb_set_set(this._ptr, other._ptr);
        }

        [Symbol.iterator](): Iterator<number, void, void> {
            // We can save on JS->WASM calls by using a range iterator on the HB side.
            const ptr = this._ptr;
            return function*() {
                const iter = new HbSetRangeIterator(ptr);
                for (const range of iter) {
                    if (typeof range === 'number') {
                        yield range;
                    } else {
                        for (let i = range[0], end = range[1]; i <= end; i++) {
                            yield i;
                        }
                    }
                }
            }();
        }

        iterRanges(): IterableIterator<number | readonly [number, number], void, void> {
            return new HbSetRangeIterator(this._ptr);
        }
    }

    class HbSetRangeIterator {
        _ptr: number;
        _last: number;
        constructor(ptr: number) {
            this._ptr = ptr;
            this._last = -1 >>> 0;
        }

        next(): IteratorResult<number | readonly [number, number], void> {
            return hb.withStack(() => {
                const firstPtr = hb.stackAlloc(4);
                const lastPtr = hb.stackAlloc(4);
                hb.writeUint32(lastPtr, this._last);
                const didIterate = !!hb._hb_set_next_range(this._ptr, firstPtr, lastPtr);

                const first = hb.readUint32(firstPtr);
                const last = hb.readUint32(lastPtr);
                if (didIterate) {
                    this._last = last;
                    return {done: false as const, value: first === last ? first : [first, last] as const};
                }
                return {done: true as const, value: undefined};
            });
        }

        [Symbol.iterator]() {
            return this;
        }
    }

    type NewMain = typeof hb & {
        HbBlob: typeof HbBlob;
        HbSet: typeof HbSet;
    };
    const wrappedMain = hb as NewMain;
    wrappedMain.HbBlob = HbBlob;
    wrappedMain.HbSet = HbSet;

    return wrappedMain;
};

export default createHarfbuzzWrapped;
export type MainModule = typeof createHarfbuzzWrapped<OrigMainModule> extends (hbWasmUrl: string) => Promise<infer T> ?
    T :
    never;
export type HbBlob = InstanceType<MainModule['HbBlob']>;
export type HbSet = InstanceType<MainModule['HbSet']>;

export const enum OtNameId {
    COPYRIGHT = 0,
    FONT_FAMILY = 1,
    FONT_SUBFAMILY = 2,
    UNIQUE_ID = 3,
    FULL_NAME = 4,
    VERSION_STRING = 5,
    POSTSCRIPT_NAME = 6,
    TRADEMARK = 7,
    MANUFACTURER = 8,
    DESIGNER = 9,
    DESCRIPTION = 10,
    VENDOR_URL = 11,
    DESIGNER_URL = 12,
    LICENSE = 13,
    LICENSE_URL = 14,
    TYPOGRAPHIC_FAMILY = 16,
    TYPOGRAPHIC_SUBFAMILY = 17,
    MAC_FULL_NAME = 18,
    SAMPLE_TEXT = 19,
    CID_FINDFONT_NAME = 20,
    WWS_FAMILY = 21,
    WWS_SUBFAMILY = 22,
    LIGHT_BACKGROUND = 23,
    DARK_BACKGROUND = 24,
    VARIATIONS_PS_PREFIX = 25,
    INVALID = 0xFFFF,
}

export const enum SubsetSets {
    GLYPH_INDEX = 0,
    UNICODE = 1,
    NO_SUBSET_TABLE_TAG = 2,
    DROP_TABLE_TAG = 3,
    NAME_ID = 4,
    NAME_LANG_ID = 5,
    LAYOUT_FEATURE_TAG = 6,
    LAYOUT_SCRIPT_TAG = 7,
}

export const hbTag = (s: string) => {
    return (
        ((s.charCodeAt(0) & 0xFF) << 24) |
        ((s.charCodeAt(1) & 0xFF) << 16) |
        ((s.charCodeAt(2) & 0xFF) <<  8) |
        ((s.charCodeAt(3) & 0xFF) <<  0)
    );
};

export const tagName = (tag: number) => {
    return String.fromCharCode(
        (tag >> 24) & 0xFF,
        (tag >> 16) & 0xFF,
        (tag >> 8) & 0xFF,
        (tag >> 0) & 0xFF,
    );
};
