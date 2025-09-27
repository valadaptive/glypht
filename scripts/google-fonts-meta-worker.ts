/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import createHarfbuzz, {hbTag} from '../glypht-core/src/hb-wrapper.js';
import {
    MessageFromWorker,
    MessageToWorker,
    postMessageFromWorker,
} from '../glypht-core/src/worker-rpc.js';
import type {MainModule as HbShapeModule} from '../c-libs-wrapper/hb-shape.js';

const hb = createHarfbuzz<HbShapeModule>(new URL('../../c-libs-wrapper/hb-shape.wasm', import.meta.url).href);

export type MetadataWorkerSchema =
    | {
        request: {
            name: 'init';
            message: {
                languagesData: any[];
                fontsDir: string;
            };
        };
        response: never;
    }
    | {
        request: {
            name: 'calcMetadata';
            message: any;
        };
        response: {
            name: 'calcedMetadata';
            message: any;
        };
    };

const populateFontMetadata = async(
    f: any,
    hb: ReturnType<typeof createHarfbuzz<HbShapeModule>> extends Promise<infer T> ? T : never,
    languagesData: any[],
    allLangTags: Set<string>,
    fontsDir: string,
) => {
    const ENCODER = new TextEncoder();
    if (!f.category || f.category.length === 0) {
        throw new Error(`${f.name} has no category`);
    }
    if (!f.fonts || f.category.length === 0) {
        throw new Error(`${f.name} has no fonts`);
    }

    // If the font doesn't explicitly enumerate its supported languages, we initialize this set to contain every
    // language with exemplar characters, and then remove all those which fail to shape.
    const supportedLanguages: Set<string> = new Set();
    if (f.languages) {
        for (const langTag of f.languages) {
            // Some fonts have language lists that contain languages not in the Google Fonts data??
            if (allLangTags.has(langTag)) {
                supportedLanguages.add(langTag);
            }
        }
    } else {
        for (let i = 0; i < languagesData.length; i++) {
            if (languagesData[i].exemplarChars) supportedLanguages.add(languagesData[i].id);
        }
    }

    let hasMonospace = false;
    let hasProportional = false;
    for (const font of f.fonts) {
        const fontFilePath = path.join(fontsDir, f.path, font.filename);
        const fontData = await fs.readFile(fontFilePath);
        const blob = new hb.HbBlob(fontData);
        const face = hb._hb_face_create_or_fail(blob.ptr(), 0);
        if (!face) {
            throw new Error(`Could not load font from ${fontFilePath}`);
        }
        const hbFont = hb._hb_font_create(face);

        // TODO: I think Google gives us this already...
        const os2Table = new hb.HbBlob(hb._hb_face_reference_table(face, hbTag('OS/2')));
        const panose = os2Table.asArray().subarray(32, 42);
        hasMonospace ||= panose[3] === 9;
        hasProportional ||= panose[3] !== 9;
        os2Table.destroy();

        // Shape every language and mark as unsupported any language where the shaping result contains a missing
        // glyph
        if (!f.languages) {
            const buf = hb._hb_buffer_create();
            for (let j = 0; j < languagesData.length; j++) {
                const lang = languagesData[j];
                // We already tried and failed to shape using this language using a previous font in this family
                if (!supportedLanguages.has(lang.id)) continue;

                if (!lang.exemplarChars) continue;

                // Explicitly set the buffer's language
                let hbLang = null;
                if (lang.language) {
                    const langTagUtf8 = ENCODER.encode(lang.language);
                    const hbLangDest = hb.malloc(langTagUtf8.length);
                    hb.HEAPU8.set(langTagUtf8, hbLangDest);
                    hbLang = hb._hb_language_from_string(hbLangDest, langTagUtf8.length);
                    hb._free(hbLangDest);
                }
                let supportsLang = true;
                // Testing any set of exemplar characters other than the base set is unreliable
                // https://github.com/googlefonts/shaperglot/issues/167
                const baseExemplar = lang.exemplarChars.base;
                const exemplarSnippets = [];
                if (baseExemplar) {
                    // Exemplars can be really big. Better to start with a small chunk and then shape the rest
                    // separately for an early out if we find any missing characters. This especially speeds up CJK,
                    // which contains really long exemplar text but which most fonts don't support.
                    let subExemplar = baseExemplar.slice(0, baseExemplar.indexOf(' ', 10));
                    const lastCharCode = subExemplar.charCodeAt(subExemplar.length - 1);
                    if (lastCharCode >= 0xDC00 && lastCharCode <= 0xDCFF) {
                        subExemplar = subExemplar.slice(0, -1);
                    }
                    exemplarSnippets.push(subExemplar);
                    exemplarSnippets.push(baseExemplar.slice(subExemplar.length));
                }
                for (const exemplar of exemplarSnippets) {
                    const utf8Chars = ENCODER.encode(exemplar);
                    if (utf8Chars.length === 0) continue;
                    const utf8Dest = hb.malloc(utf8Chars.length);
                    hb.HEAPU8.set(utf8Chars, utf8Dest);
                    hb._hb_buffer_reset(buf);
                    hb._hb_buffer_add_utf8(buf, utf8Dest, utf8Chars.length, 0, utf8Chars.length);

                    // Set segment properties from the language metadata and then from guessing as a fallback
                    if (lang.script) hb._hb_buffer_set_script(
                        buf,
                        hb._hb_script_from_iso15924_tag(hbTag(lang.script)),
                    );
                    if (hbLang !== null) hb._hb_buffer_set_language(buf, hbLang);
                    hb._hb_buffer_guess_segment_properties(buf);

                    hb._hb_shape(hbFont, buf, 0, 0);

                    const shouldBreak = hb.withStack(() => {
                        const glyphInfosLenPtr = hb.stackAlloc(4);
                        const glyphInfosPtr = hb._hb_buffer_get_glyph_infos(buf, glyphInfosLenPtr);
                        const GLYPH_INFO_SIZE = 20;
                        const glyphInfosLen = hb.readUint32(glyphInfosLenPtr);
                        for (let i = 0; i < glyphInfosLen; i++) {
                            const glyphId = hb.readUint32(glyphInfosPtr + (i * GLYPH_INFO_SIZE));
                            if (glyphId === 0) {
                                /*const clusterId = hb.readUint32(glyphInfosPtr + (i * GLYPH_INFO_SIZE) + 8);
                                const clusterChar = String.fromCodePoint(new TextDecoder()
                                    .decode(utf8Chars.subarray(clusterId))
                                    .codePointAt(0)!);
                                /console.log(`${f.name} failed at ${clusterChar} on lang ${lang.id}`);*/
                                supportsLang = false;
                                return true;
                            }
                        }
                        return false;
                    });
                    hb._free(utf8Dest);
                    if (shouldBreak) break;
                }

                if (!supportsLang) {
                    supportedLanguages.delete(lang.id);
                }
            }
            hb._hb_buffer_destroy(buf);
        }

        hb._hb_font_destroy(hbFont);
        hb._hb_face_destroy(face);
        blob.destroy();
    }

    if (f.axes?.some((axis: any) => axis.tag === 'MONO')) {
        hasMonospace = true;
        hasProportional = true;
    }

    f.languages = supportedLanguages;
    f.proportion = hasMonospace && hasProportional ? 'BOTH' : hasMonospace ? 'MONOSPACE' : 'PROPORTIONAL';
};

let languagesData: any[] | null = null;
let allLangTags: Set<string> | null = null;
let fontsDir: string;

const listener = async(event: MessageEvent) => {
    const message = event.data as MessageToWorker<MetadataWorkerSchema>;
    try {
        switch (message.type) {
            case 'init': {
                languagesData = message.message.languagesData;
                allLangTags = new Set();
                for (const lang of languagesData) {
                    allLangTags.add(lang.id);
                }
                fontsDir = message.message.fontsDir;
                break;
            }
            case 'calcMetadata': {
                const metadata = message.message;
                if (!languagesData) throw new Error('languagesData not initialized');
                if (!allLangTags) throw new Error('allLangTags not initialized');
                await populateFontMetadata(metadata, await hb, languagesData, allLangTags, fontsDir!);
                postMessageFromWorker({type: 'calcedMetadata', message: metadata, originId: message.id});
                break;
            }
            case 'close': {
                removeEventListener('message', listener);
            }
        }
    } catch (error) {
        postMessage({
            type: 'error',
            message: error,
            originId: message.id,
        } satisfies MessageFromWorker<MetadataWorkerSchema>);
    }
};

addEventListener('message', listener);
