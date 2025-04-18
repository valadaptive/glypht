import {
    postMessageFromWorker,
    type FontRef,
    type MessageFromWorker,
    type MessageToWorker,
    type UpdatedFonts,
} from './messages';
import {Font, init, SubsettedFont} from './font';
import {SubsetSettings} from './font-settings';

addEventListener('message', async event => {
    const message = event.data as MessageToWorker;

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
                postMessageFromWorker({
                    type: 'got-font-data',
                    message: data,
                    originId: message.id,
                }, [data]);
                break;
            }
        }
    } catch (error) {
        postMessage({type: 'error', message: error, originId: message.id} satisfies MessageFromWorker);
    }
});

let fontRefId = 0;
const fonts = new Map<number, Font>();

const updateFonts = async(
    loadFonts: Uint8Array[],
    unloadFonts: FontRef[],
): Promise<UpdatedFonts> => {
    await init();
    const newFonts = Font.manyFromData(loadFonts);
    const newFontRefs = [];
    for (const newFont of newFonts) {
        const newFontRef: FontRef = {
            id: fontRefId++,
            uid: newFont.uid,
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
    for (const oldFont of unloadFonts) {
        const font = fonts.get(oldFont.id);
        if (!font) continue;
        font.destroy();
        fonts.delete(oldFont.id);
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
