import {Font, init} from './font.js';
import {SubsetSettings, SubsettedFont} from './font-types.js';
import {
    FontMessage,
    FontWorkerSchema,
    MessageFromWorker,
    MessageToWorker,
    postMessageFromWorker,
} from './worker-rpc.js';

const initPromise = init(new URL('./hb.wasm', import.meta.url).href);

const listener = async(event: MessageEvent) => {
    const message = event.data as MessageToWorker<FontWorkerSchema>;

    try {
        switch (message.type) {
            case 'update-fonts': {
                postMessageFromWorker({
                    type: 'updated-fonts',
                    message: await updateFonts(message.message.loadFonts, message.message.unloadFonts),
                    originId: message.id,
                });
                break;
            }
            case 'subset-font': {
                const {subsettedFont, transfer} = subsetFont(message.message.font, message.message.settings);
                postMessageFromWorker({
                    type: 'subsetted-font',
                    message: subsettedFont,
                    originId: message.id,
                }, transfer);
                break;
            }
            case 'get-font-data': {
                const font = getFont(message.message);
                const data = font.getData();
                const format = Font.getSfntVersion(data);
                postMessageFromWorker({
                    type: 'got-font-data',
                    message: {data, format},
                    originId: message.id,
                }, [data]);
                break;
            }
            case 'get-font-file-data': {
                const font = getFont(message.message);
                const data = font.getFileData();
                postMessageFromWorker({
                    type: 'got-font-file-data',
                    message: data,
                    originId: message.id,
                }, [data]);
                break;
            }
            case 'get-font-file-hash': {
                const font = getFont(message.message);
                const hash = font.getFileHash();
                postMessageFromWorker({
                    type: 'got-font-file-hash',
                    message: hash,
                    originId: message.id,
                });
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
        } satisfies MessageFromWorker<FontWorkerSchema>);
    }
};

addEventListener('message', listener);

let fontRefId = 0;
const fonts = new Map<number, Font>();

const getFont = (id: number): Font => {
    const font = fonts.get(id);
    if (!font) {
        throw new Error(`No font with ID ${id}`);
    }
    return font;
};

const updateFonts = async(
    loadFonts: Uint8Array[],
    unloadFonts: number[],
): Promise<{
    fonts: FontMessage[];
}> => {
    await initPromise;
    for (const oldFont of unloadFonts) {
        const font = fonts.get(oldFont);
        if (!font) continue;
        font.destroy();
        fonts.delete(oldFont);
    }
    const newFonts = Font.manyFromData(loadFonts);
    const newFontRefs = [];
    for (const newFont of newFonts) {
        const newFontRef: FontMessage = {
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
            unicodeRanges: Array.from(newFont.codePoints.iterRanges()),
        };
        newFontRefs.push(newFontRef);
        fonts.set(newFontRef.id, newFont);
    }
    return {fonts: newFontRefs};
};

const subsetFont = (fontId: number, settings: SubsetSettings): {
    subsettedFont: SubsettedFont;
    transfer: Transferable[];
} => {
    const font = fonts.get(fontId);
    if (!font) {
        throw new Error(`No font with ID ${font}`);
    }
    const subsettedFont = font.subset(settings);
    return {subsettedFont, transfer: [subsettedFont.data.buffer]};
};
