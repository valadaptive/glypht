import {closeWorker, FontMessage, postGetFontData, postSubsetFont, postUpdateFonts} from './messages';
import {FontRef, SubsetSettings} from './font-types';

/**
 * Context object for all font processing. This is what you use to load fonts.
 *
 * All subsetting is done off-thread using a worker. If running in an environment where your program is meant to exit by
 * itself (e.g. on the command line), you must call {@link GlyphtContext#destroy} after subsetting your fonts to close
 * the worker thread and allow the program to exit.
 */
export class GlyphtContext {
    private fontWorker: Worker;
    private fontFinalizationRegistry: FinalizationRegistry<number>;
    private state = {destroyed: false};

    constructor() {
        this.fontWorker = new Worker(new URL('./font-worker.worker.js', import.meta.url), {type: 'module'});
        // Automatically garbage-collect fonts
        this.fontFinalizationRegistry = new FinalizationRegistry(fontId => {
            void postUpdateFonts(this.fontWorker, [], [fontId], true);
        });
    }

    /**
     * Load a set of fonts. This will return a list of {@link FontRef}s that can be subset.
     *
     * There is no equivalent method for loading a single font because a single font file could be a collection of
     * multiple fonts.
     *
     * @param fontFiles Font files to load.
     * @param transfer If true, all `Uint8Array`s passed in as font files will be transferred to the worker thread and
     * no longer usable on this thread.
     * @returns A list of loaded fonts.
     */
    async loadFonts(fontFiles: Uint8Array[], transfer = true): Promise<FontRef[]> {
        if (this.state.destroyed) {
            throw new DOMException('This GlyphtContext has been destroyed', 'InvalidStateError');
        }
        return (await postUpdateFonts(
            this.fontWorker,
            fontFiles,
            [],
            transfer,
        )).map(fontMsg => this.hydrateFont(fontMsg));
    }

    private hydrateFont(fontMessage: FontMessage): FontRef {
        const registry = this.fontFinalizationRegistry;
        const fontWorker = this.fontWorker;
        const ctxState = this.state;
        const fontId = fontMessage.id;
        (fontMessage as FontRef).destroy = async() => {
            if (ctxState.destroyed) return;
            const res = postUpdateFonts(fontWorker, [], [fontId], true);
            registry.unregister(fontMessage);
            await res;
        };
        registry.register(fontMessage, fontId, fontMessage);
        (fontMessage as FontRef).subset = async(settings: SubsetSettings | null) => {
            if (ctxState.destroyed) {
                throw new DOMException('This font\'s GlyphtContext has been destroyed', 'InvalidStateError');
            }
            if (settings === null) {
                const {data: fontData, format} = await postGetFontData(fontWorker, fontId);
                return {
                    familyName: fontMessage.familyName,
                    subfamilyName: fontMessage.subfamilyName,
                    format,
                    data: fontData,
                    styleValues: fontMessage.styleValues,
                    axes: fontMessage.axes.map(axis => ({
                        type: 'variable',
                        tag: axis.tag,
                        name: axis.name,
                        value: {min: axis.min, max: axis.max, defaultValue: axis.defaultValue},
                    })),
                    namedInstance: null,
                };
            }
            return await postSubsetFont(fontWorker, fontId, settings);
        };
        return fontMessage as FontRef;
    }

    /**
     * Destroy this context, meaning any previously-loaded {@link FontRef}s can no longer be subset. All promises
     * previously returned from {@link FontRef#subset} *will* resolve, but any further calls will error out.
     *
     * If running in Node, Bun, Deno, or another such runtime, this will allow the program to exit once all font
     * processing work is finished.
     */
    public destroy() {
        closeWorker(this.fontWorker);
        this.state.destroyed = true;
    }
};
