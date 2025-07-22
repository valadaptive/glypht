import {Font, init} from './font';
import {SubsetSettings, SubsettedFont} from './font-types';
import {FontMessage, FontWorkerSchema, MessageFromWorker, MessageToWorker, postMessageFromWorker} from './worker-rpc';

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
                const font = fonts.get(message.message);
                if (!font) {
                    throw new Error(`No font with ID ${message.message}`);
                }
                const data = font.getData();
                const format = Font.getSfntVersion(data);
                postMessageFromWorker({
                    type: 'got-font-data',
                    message: {data, format},
                    originId: message.id,
                }, [data]);
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
            fileSize: newFont.fileSize,
            axes: newFont.axes,
            features: newFont.features,
            namedInstances: newFont.namedInstances,
            subsetCoverage: newFont.subsetCoverage,
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
