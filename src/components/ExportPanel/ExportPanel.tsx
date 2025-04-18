import {useCallback, useMemo, useRef} from 'preact/hooks';
import {ExportedFont, useAppState} from '../../app-state';
import style from './style.module.scss';
import {settingsToCSS} from '../../util/font-settings';
import {NodeType} from '../../util/css-emitter';
import {Button, CheckboxToggle, SpinBox, TextBox, ToggleIcon} from '../Widgets/Widgets';
import {useThrottledSignal} from '../../util/throttle';
import formatFileSize from '../../util/format-file-size';
import classNames from 'clsx';
import {packageFonts} from '../../util/package-fonts';
import {Signal, useSignal} from '@preact/signals';
import Loader from '../Loader/Loader';
import saveToFile from '../../util/save-to-file';
import Icon, {IconButton} from '../Icon/Icon';
import showOpenFilePicker, {showFontPicker} from '../../util/file-picker';
import {useAddToast} from '../Toast/Toast';
import {Motif} from '../../util/motif';
import {RefObject} from 'preact';
import useFloating from '../../util/floating';
import {flip, offset, shift, size} from '@floating-ui/dom';
import {Overlay} from '../Overlay/Overlay';
import type {TargetedEvent} from 'preact/compat';
import useResizablePanel from '../../util/resizable-panel';
import {copyText} from '../../util/clipboard';

import blobCat from '../../assets/blobcat.svg';

const CssPreview = ({fonts}: {fonts: ExportedFont[]}) => {
    const {cssPathPrefix, exportSettings} = useAppState();
    const throttledPathPrefix = useThrottledSignal(cssPathPrefix, 500, true);
    const css = useMemo(() => {
        const css = settingsToCSS(fonts, throttledPathPrefix.value, exportSettings.includeTTFinCSS.value);
        // Remove the trailing newline since it adds space at the bottom
        if (css.spans.length > 0 && css.spans[css.spans.length - 1].type === NodeType.Whitespace) {
            css.spans.pop();
        }
        return css;
    }, [
        fonts,
        throttledPathPrefix.value,
        exportSettings.includeTTFinCSS.value,
    ]);

    const appendCss = (element: HTMLElement | null) => {
        if (!element) return;
        element.replaceChildren(css.getNodes());
    };

    return useMemo(() => (
        <pre className={style.cssPreview} ref={appendCss} />
    ), [css]);
};

const ExportedFonts = ({fonts, exportedFormats}: {
    fonts: ExportedFont[];
    exportedFormats: {ttf: boolean; woff: boolean; woff2: boolean};
}) => {
    const {cssPathPrefix, exportSettings} = useAppState();
    const downloading = useSignal(false);
    const downloadZip = useCallback(async() => {
        downloading.value = true;
        const zip = await packageFonts(fonts, settingsToCSS(
            fonts, cssPathPrefix.value, exportSettings.includeTTFinCSS.value).getString());
        saveToFile('fonts.zip', zip);
        downloading.value = false;
    }, [fonts, cssPathPrefix, exportSettings.includeTTFinCSS]);

    return (
        <div className={style.exportedFonts}>
            <div className={style.exportedFontFiles}>
                <table className={classNames(style.fontFileTable, 'fancy-table')}>
                    <thead>
                        <tr>
                            <th scope="col">Filename</th>
                            {exportedFormats.ttf && <th scope="col">TTF</th>}
                            {exportedFormats.woff && <th scope="col">WOFF</th>}
                            {exportedFormats.woff2 && <th scope="col">WOFF2</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {fonts.map(({filename, data}) => (
                            <tr>
                                <td className={style.fontName}>{filename}</td>
                                {exportedFormats.ttf && <td className={style.fontFileSize}>{
                                    data.ttf ? <>
                                        <span>{formatFileSize(data.ttf.length)}{' '}</span>
                                        <IconButton
                                            type="download"
                                            title="Download"
                                            onClick={() => saveToFile(
                                                filename + '.ttf',
                                                new Blob([data.ttf!], {type: 'font/ttf'}),
                                            )}
                                        />
                                    </> : null
                                }</td>}
                                {exportedFormats.woff && <td className={style.fontFileSize}>{
                                    data.woff ? <>
                                        <span>{formatFileSize(data.woff.length)}{' '}</span>
                                        <IconButton
                                            type="download"
                                            title="Download"
                                            onClick={() => saveToFile(
                                                filename + '.woff',
                                                new Blob([data.woff!], {type: 'font/woff'}),
                                            )}
                                        />
                                    </> : null
                                }</td>}
                                {exportedFormats.woff2 && <td className={style.fontFileSize}>{
                                    data.woff2 ? <>
                                        <span>{formatFileSize(data.woff2.length)}{' '}</span>
                                        <IconButton
                                            type="download"
                                            title="Download"
                                            onClick={() => saveToFile(
                                                filename + '.woff2',
                                                new Blob([data.woff2!], {type: 'font/woff2'}),
                                            )}
                                        />
                                    </> : null
                                }</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Button onClick={downloadZip} disabled={downloading.value}>
                {downloading.value ? <Loader size={24} /> : <Icon type="download" title="" />}
                <span>Download .zip</span>
            </Button>
        </div>
    );
};

const ExportedCss = ({fonts}: {fonts: ExportedFont[]}) => {
    const {cssPathPrefix, exportSettings} = useAppState();

    const copyCSS = useCallback(() => {
        void copyText(settingsToCSS(fonts, cssPathPrefix.value, exportSettings.includeTTFinCSS.value).getString());
    }, [fonts, cssPathPrefix, exportSettings.includeTTFinCSS]);

    return (
        <div className={style.exportedCss}>
            <div className={style.cssPathPrefixBar}>
                <label>CSS path prefix:</label>
                <TextBox className={style.cssPathPrefix} value={cssPathPrefix} />
                <IconButton type='copy' title='Copy CSS to clipboard' onClick={copyCSS} />
            </div>
            <CssPreview fonts={fonts} />
        </div>
    );
};

const MoreSettings = ({relativeTo, active}: {relativeTo: RefObject<HTMLElement>; active: Signal<boolean>}) => {
    const {reference, floating} = useFloating(() => ({
        placement: 'bottom',
        middleware: [
            offset(4),
            shift({padding: 8}),
            size({
                apply({availableWidth, availableHeight, elements}) {
                    const {floating} = elements;
                    floating.style.maxWidth = `${availableWidth}px`;
                    floating.style.maxHeight = `${availableHeight}px`;
                },
                padding: 8,
            }),
            flip(),
        ],
    }));
    reference(relativeTo.current);

    const popupRef = (elem: HTMLElement | null) => {
        floating(elem);
        elem?.focus();
    };

    const handleBlur = useCallback((event: TargetedEvent<HTMLDivElement, FocusEvent>) => {
        if (!event.relatedTarget || (
            event.relatedTarget !== relativeTo.current &&
            event.currentTarget?.contains(event.relatedTarget as HTMLElement) === false
        )) {
            active.value = false;
        }
    }, []);

    const {exportSettings} = useAppState();

    if (!active.value) return null;

    return (
        <Overlay>
            <div className={style.moreSettings} tabIndex={0} ref={popupRef} onBlur={handleBlur}>
                <div className={classNames(style.setting, style.spinboxSetting)}>
                    <label>WOFF compression level</label>
                    <SpinBox min={1} max={100} step={1} value={exportSettings.woffCompression} />
                </div>
                <div className={classNames(style.setting, style.spinboxSetting)}>
                    <label>WOFF2 compression level</label>
                    <SpinBox min={1} max={11} step={1} value={exportSettings.woff2Compression} />
                </div>
                <div className={style.setting}>
                    <CheckboxToggle
                        label="Include .ttf in CSS"
                        checked={exportSettings.includeTTFinCSS}
                    />
                </div>
            </div>
        </Overlay>
    );
};

const ExportPanel = () => {
    const appState = useAppState();
    const {fonts, fontsBeingLoaded, exportSettings} = appState;
    const addToast = useAddToast();

    const exportFonts = useCallback(() => {
        appState.exportFonts();
    }, [appState]);

    const uploadMore = useCallback(() => {
        showFontPicker().then(async files => {
            if (files) {
                await appState.addFonts(Array.from(files));
            }
        })
            .catch(err => {
                addToast({
                    title: 'Failed to upload fonts',
                    contents: String(err),
                    motif: Motif.ERROR,
                });
            });
    }, [appState, addToast]);

    const saveSettingsToFile = useCallback(() => {
        const savedSettings = appState.saveAllSettings();
        const settingsFile = new Blob(
            [new TextEncoder().encode(JSON.stringify(savedSettings))],
            {type: 'application/json'},
        );
        saveToFile('settings.json', settingsFile);
    }, [appState]);

    const loadSettingsFromFile = useCallback(() => {
        showOpenFilePicker({accept: '.json'}).then(async files => {
            if (files && files.length > 0) {
                const file = files[0];
                const text = await file.text();
                const settings = JSON.parse(text) as unknown;
                appState.loadAllSettings(settings);
            }
        })
            .catch(err => {
                addToast({
                    title: 'Failed to load settings',
                    contents: String(err),
                    motif: Motif.ERROR,
                });
            });
    }, [appState, addToast]);

    const {resizerRef, panelRef, panelSize} = useResizablePanel(500, 400, 10000, 'horizontal');

    const settingsOpen = useSignal(false);

    const moreSettingsButtonRef = useRef(null);

    if (fonts.value.length === 0) {
        return null;
    }

    let exportResults = null;
    if (appState.exportedFonts.value.state === 'loaded') {
        const {exportedFonts, exportedFormats} = appState.exportedFonts.value;

        exportResults = (
            <div className={style.exportResults}>
                <ExportedFonts fonts={exportedFonts} exportedFormats={exportedFormats} />
                <ExportedCss fonts={exportedFonts} />
            </div>
        );
    } else if (appState.exportedFonts.value.state === 'loading') {
        const {progress} = appState.exportedFonts.value;
        exportResults = (
            <div className={style.loaderWrapper}>
                <Loader size={128} className={style.exportLoader} progress={progress} />
            </div>
        );
    }

    return (
        <div className={style.exportPanel} ref={panelRef} style={{width: `${panelSize.value}px`}}>
            <div className={style.splitter} ref={resizerRef} />
            <div className={style.exportButtons}>
                <div className={style.row}>
                    <Button
                        onClick={exportFonts}
                        disabled={appState.exportedFonts.value.state === 'loading'}
                        className={style.growButton}
                    >Export</Button>
                    <div className={style.exportFormats}>
                        <CheckboxToggle label="TTF" checked={exportSettings.formats.ttf} />
                        <CheckboxToggle label="WOFF" checked={exportSettings.formats.woff} />
                        <CheckboxToggle label="WOFF2" checked={exportSettings.formats.woff2} />
                        <ToggleIcon
                            type="gear"
                            title="More settings"
                            toggled={settingsOpen}
                            innerRef={moreSettingsButtonRef}
                        />
                    </div>
                </div>
                <MoreSettings
                    relativeTo={moreSettingsButtonRef}
                    active={settingsOpen}
                />
                <div className={style.saveLoadSettings}>
                    <Button onClick={saveSettingsToFile}>
                        <Icon type="download" title="" />
                        Save settings
                    </Button>
                    <Button onClick={loadSettingsFromFile}>
                        <Icon type="upload" title="" />
                        Load settings
                    </Button>
                </div>
                <div className={style.uploadMore}>
                    <Button
                        onClick={uploadMore}
                        className={style.growButton}
                    >
                        {fontsBeingLoaded.value > 0 ? <Loader size={24} /> : <Icon type="upload" title="" />}
                        Upload more fonts
                    </Button>
                </div>
            </div>
            {exportResults}
            <div className={style.spacer} />
            <div className={style.footer}>
                <span>Made with <img src={blobCat} alt='blobCat' width='128' height='128' style='width: 1em; height: 1em; vertical-align: middle' /> by <a href='https://github.com/valadaptive'>valadaptive</a></span>
                <div className={style.spacer} />
                <a href='https://github.com/valadaptive/glypht' className={style.githubLink}><Icon type='github' title='View this project on GitHub' clickableStyle={true} size='1rem' /></a>
            </div>
        </div>
    );
};

export default ExportPanel;
