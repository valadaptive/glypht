import style from './style.module.scss';

import {useCallback, useId, useMemo} from 'preact/hooks';
import {batch, Signal, useComputed, useSignal} from '@preact/signals';
import classNames from 'clsx';

import {useAppState} from '../../app-state';
import {CheckboxToggle, SelectableIcon, SpinBox, TextBox} from '../Widgets/Widgets';
import {
    AxisSetting,
    CopiedSettings,
    copyAxisSettings,
    copyFeatureSettings,
    copyIncludeCharactersSettings,
    copyStyleSettings,
    copySubsetSettings,
    FamilySettings,
    featureMetadata,
    pasteAxisSettings,
    pasteFeatureSettings,
    pasteIncludeCharactersSettings,
    pasteStyleSettings,
    pasteSubsetSettings,
    StyleSetting,
    StyleSettings,
} from '../../util/font-settings';
import {FontRef} from '../../util/messages';
import {useThrottledSignal} from '../../util/throttle';
import {parseRanges, parseUnicodeRanges} from '../../util/parse-ranges';
import Icon, {IconButton} from '../Icon/Icon';
import {copyText, pasteText} from '../../util/clipboard';
import {useAddErrorToast} from '../Toast/Toast';
import {Motif} from '../../util/motif';
import Loader from '../Loader/Loader';
import {showFontPicker} from '../../util/file-picker';
import {FeatureInfo} from '../../util/font';
import formatFileSize from '../../util/format-file-size';
import {ComponentChildren} from 'preact';
import {useLiveSignal} from '../../util/signal-utils';

const AxisSettingComponent = ({axis}: {axis: AxisSetting}) => {
    const step = axis.max >= 100 ? 1 : 0.25;
    const smartAim = axis.max >= 200 ?
        25 :
        axis.max >= 50 ?
            12.5 :
            0;
    const resetValue = useCallback(() => {
        axis.curSingle.value = axis.defaultValue;
    }, [axis.curSingle, axis.defaultValue]);

    let modeControl;
    switch (axis.mode.value) {
        case 'single': {
            modeControl = <>
                <SpinBox min={axis.min} max={axis.max} value={axis.curSingle} step={step} smartAim={smartAim} />
                <IconButton
                    type="reset"
                    title="Reset to default value"
                    onClick={resetValue}
                    disabled={axis.curSingle.value === axis.defaultValue}
                />
            </>;
            break;
        }
        case 'range': {
            modeControl = <div className={style.spinboxRange}>
                <SpinBox min={axis.min} max={axis.max} value={axis.curMin} step={step} smartAim={smartAim} />
                <span className={style.label}>to</span>
                <SpinBox min={axis.min} max={axis.max} value={axis.curMax} step={step} smartAim={smartAim} />
            </div>;
            break;
        }
        case 'multiple': {
            modeControl = <AxisRangeTextbox ranges={axis.curMultiValue} />;
            break;
        }
    }

    return (
        <div className={style.axisSetting}>
            <div className={style.axisSettingModes} role="radiogroup" aria-label="Axis modes">
                <SelectableIcon
                    type="range" title="Limit range of values" currentValue={axis.mode} value="range" />
                <SelectableIcon
                    type="pin" title="Pin to single value" currentValue={axis.mode} value="single" />
                <SelectableIcon
                    type="stack" title="Instance into multiple font files" currentValue={axis.mode} value="multiple" />
            </div>
            {modeControl}
        </div>
    );
};

const StyleSettingComponent = ({styleSetting, name, tag}: {styleSetting: StyleSetting; name: string; tag?: string}) => {
    return (
        <div className={style.styleSetting}>
            <div className={style.styleSettingName} title={tag}>{name}</div>
            {
                styleSetting.type === 'single' ?
                    <span className={style.staticSetting}>
                        {(Math.round(styleSetting.value * 1000) / 1000).toString()}
                    </span> :
                    <AxisSettingComponent axis={styleSetting.value} />
            }
        </div>
    );
};

const SingleFontSettings = ({font, styleSettings, enableSubsetting}: {
    font: FontRef;
    styleSettings: Partial<StyleSettings>;
    enableSubsetting: boolean;
}) => {
    const appState = useAppState();
    const addErrorToast = useAddErrorToast();
    const removeFont = useCallback(() => {
        appState.removeFont(font).catch(err => {
            addErrorToast('Failed to remove font', err);
        });
    }, [font]);

    const anySettingsNonStatic =
        (styleSettings.weight && styleSettings.weight.type !== 'single') ||
        (styleSettings.width && styleSettings.width.type !== 'single') ||
        (styleSettings.italic && styleSettings.italic.type !== 'single') ||
        (styleSettings.slant && styleSettings.slant.type !== 'single');

    return (
        <div className={style.singleFontSettings}>
            <div className={style.singleFontHeader}>
                <div className={style.singleFontName}>
                    <span className={style.singleFontFamily}>{font.familyName} </span>
                    <span className={style.singleFontSubfamily}>{font.subfamilyName} </span>
                    <span className={style.singleFontFileSize}>{formatFileSize(font.fileSize)}</span>
                </div>
                <IconButton
                    onClick={removeFont}
                    type="close"
                    title="Remove this font"
                    className={style.removeFont}
                />
            </div>
            {enableSubsetting && (
                styleSettings.weight || styleSettings.width || styleSettings.italic || styleSettings.slant) ?
                <div className={classNames(
                    style.singleFontSettingsBody,
                    anySettingsNonStatic && style.settingsGrid,
                    !anySettingsNonStatic && style.settingsList,
                )}>
                    {styleSettings.weight ?
                        <StyleSettingComponent styleSetting={styleSettings.weight} name="Weight" /> :
                        null}
                    {styleSettings.width ?
                        <StyleSettingComponent styleSetting={styleSettings.width} name="Width" /> :
                        null}
                    {styleSettings.italic ?
                        <StyleSettingComponent styleSetting={styleSettings.italic} name="Italic" /> :
                        null}
                    {styleSettings.slant ?
                        <StyleSettingComponent styleSetting={styleSettings.slant} name="Slant" /> :
                        null}
                </div> :
                null}
        </div>
    );
};

const UnicodeRangeTextbox = ({ranges, disabled}: {ranges: Signal<string>; disabled?: boolean}) => {
    const throttledRanges = useThrottledSignal(ranges, 500, true);
    const isValid = useMemo(
        () => parseUnicodeRanges(throttledRanges.value) !== null,
        [throttledRanges, throttledRanges.value],
    );

    return (
        <TextBox
            value={ranges}
            // eslint-disable-next-line @stylistic/max-len
            placeholder='Enter Unicode code points or ranges to include (e.g. "U+0020", "U+0025-U+00FF", "U+0025-00FF, U+0020, U+FFFD")'
            className={classNames(style.unicodeRangeTextbox, {[style.invalid]: !isValid})}
            disabled={disabled}
        />
    );
};

const AxisRangeTextbox = ({ranges, disabled}: {ranges: Signal<string>; disabled?: boolean}) => {
    const throttledRanges = useThrottledSignal(ranges, 500, true);
    const isValid = useMemo(
        () => parseRanges(throttledRanges.value) !== null,
        [throttledRanges, throttledRanges.value],
    );

    return (
        <TextBox
            value={ranges}
            placeholder='400, 500, 600-700'
            className={classNames(style.axisRangeTextbox, {[style.invalid]: !isValid})}
            disabled={disabled}
        />
    );
};

// eslint-disable-next-line @stylistic/comma-dangle
const CheckboxSection = <T, >({settings, name, mapping, disabled}: {
    settings: T[];
    name: string;
    mapping: (item: T) => {label: string; checked: Signal<boolean>; title?: string};
    disabled?: boolean;
}) => {
    const settingsSignal = useLiveSignal(settings);
    const numChecked = useComputed(() => settingsSignal.value.reduce(
        (count, setting) => count + (mapping(setting).checked.value ? 1 : 0),
        0,
    ));

    const toggleAll = useCallback(() => {
        const allChecked = numChecked.value === settings.length;
        batch(() => {
            for (const setting of settings) {
                mapping(setting).checked.value = !allChecked;
            }
        });
    }, [settings, numChecked]);

    return (
        <div className={classNames(style.settingsSubSection, style.checkboxSection, {[style.disabled]: disabled})}>
            <header><label>
                <input
                    type="checkbox"
                    checked={numChecked.value === settings.length}
                    indeterminate={numChecked.value > 0 && numChecked.value < settings.length}
                    onInput={toggleAll}
                    disabled={disabled}
                />
                {' '}{name}
            </label></header>
            <div className={style.checkboxes}>
                {settings.map((item) => {
                    const {label, checked, title} = mapping(item);
                    return (
                        <CheckboxToggle
                            label={label}
                            checked={checked}
                            title={title}
                            disabled={disabled}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const featureLabel = (feature: FeatureInfo) => {
    return feature.label ?? featureMetadata(feature.tag).name ?? feature.tag;
};

const mapIncludeFeatures = (item: {feature: FeatureInfo; include: Signal<boolean>}) => ({
    label: featureLabel(item.feature),
    checked: item.include,
    title: item.feature.tag,
});

const mapNamedSubsets = (item: {name: string; include: Signal<boolean>}) => ({
    label: item.name,
    checked: item.include,
});

// eslint-disable-next-line @stylistic/comma-dangle
const CopyPasteButtons = <T, >({settings, copyFunction, pasteFunction}: {
    settings: T;
    copyFunction: (settings: T) => unknown;
    pasteFunction: (dest: T, settings: CopiedSettings) => void;
}) => {
    const copySettings = useCallback(() => {
        void copyText(JSON.stringify(copyFunction(settings)));
    }, [settings]);

    const pasteSettings = useCallback(() => {
        void pasteText().then(text => {
            try {
                const newSettings = JSON.parse(text) as unknown;
                if (typeof newSettings === 'object') {
                    pasteFunction(settings, newSettings as CopiedSettings);
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error('Failed to paste settings:', e);
            }
        });
    }, [settings]);

    return (
        <div className={style.copyPasteButtons}>
            <IconButton onClick={copySettings} type="copy" title="Copy settings to clipboard" />
            <IconButton onClick={pasteSettings} type="paste" title="Paste settings from clipboard" />
        </div>
    );
};

// eslint-disable-next-line @stylistic/comma-dangle
const SettingsSection = <T, >({title, children, copyPasteFns, startCollapsed = false}: {
    title: ComponentChildren;
    children: ComponentChildren;
    copyPasteFns?: {
        settings: T;
        copy: (settings: T) => unknown;
        paste: (dest: T, settings: CopiedSettings) => void;
    };
    startCollapsed?: boolean;
}) => {
    const collapsed = useSignal(startCollapsed);
    const bodyId = useId();

    const toggleCollapsed = useCallback(() => {
        collapsed.value = !collapsed.value;
    }, [collapsed]);

    return (
        <section className={style.settingsSection}>
            <header>
                <button
                    className={style.settingsSectionTitle}
                    aria-expanded={collapsed.value ? 'false' : 'true'}
                    aria-controls={bodyId}
                    onClick={toggleCollapsed}
                >
                    <Icon type={collapsed.value ? 'arrow-right' : 'arrow-down'} title={null} motif={Motif.MONOCHROME} />
                    <span className={style.settingsSectionTitleText}>
                        {title}
                    </span>
                </button>

                {copyPasteFns && <CopyPasteButtons
                    settings={copyPasteFns.settings}
                    copyFunction={copyPasteFns.copy}
                    pasteFunction={copyPasteFns.paste}
                />}
            </header>
            <div className={style.settingsSectionBody} id={bodyId} hidden={collapsed.value}>
                {children}
            </div>
        </section>
    );
};

const FontFamilySettings = ({familySettings}: {familySettings: FamilySettings}) => {
    const appState = useAppState();
    const {name, fonts, settings} = familySettings;

    const addErrorToast = useAddErrorToast();

    const removeFamily = useCallback(() => {
        appState.removeFontFamily(familySettings).catch(err => {
            addErrorToast('Failed to remove font family', err);
        });
    }, [familySettings]);

    return (
        <div className={style.familySettings} aria-label={`Settings for ${name} font family`}>
            <div className={style.familyHeader}>
                <span className={style.familyName}>{name}</span>
                <CheckboxToggle
                    label="Subset"
                    title="Save space by reducing the number of glyphs, features, and variations in this font"
                    checked={familySettings.enableSubsetting}
                />
                <CopyPasteButtons
                    settings={familySettings}
                    copyFunction={copySubsetSettings}
                    pasteFunction={pasteSubsetSettings}
                />
                <IconButton
                    onClick={removeFamily}
                    type="close"
                    title="Remove this font family"
                    className={style.removeFontFamily}
                />
            </div>
            <div className={style.familySettingsBody}>
                {familySettings.enableSubsetting.value && <>
                    {settings.styleSettings.weight ||
                        settings.styleSettings.width ||
                        settings.styleSettings.italic ||
                        settings.styleSettings.slant ?
                        <SettingsSection title='Style settings'
                            copyPasteFns={{
                                settings: settings.styleSettings,
                                copy: copyStyleSettings,
                                paste: pasteStyleSettings,
                            }}>
                            <div className={style.settingsGrid}>
                                {settings.styleSettings.weight ?
                                    <StyleSettingComponent
                                        styleSetting={settings.styleSettings.weight}
                                        name="Weight"
                                    /> : null}
                                {settings.styleSettings.width ?
                                    <StyleSettingComponent
                                        styleSetting={settings.styleSettings.width}
                                        name="Width"
                                    /> : null}
                                {settings.styleSettings.italic ?
                                    <StyleSettingComponent
                                        styleSetting={settings.styleSettings.italic}
                                        name="Italic"
                                    /> : null}
                                {settings.styleSettings.slant ?
                                    <StyleSettingComponent
                                        styleSetting={settings.styleSettings.slant}
                                        name="Slant"
                                    /> : null}
                            </div>
                        </SettingsSection> :
                        null}

                    {settings.axisSettings.length > 0 ?
                        <SettingsSection title='Variation axis settings'
                            copyPasteFns={{
                                settings: settings.axisSettings,
                                copy: copyAxisSettings,
                                paste: pasteAxisSettings,
                            }}>
                            <div className={style.settingsGrid}>
                                {settings.axisSettings.map(({name, tag, range}) => (
                                    <StyleSettingComponent
                                        styleSetting={{type: 'variable', value: range}}
                                        name={name}
                                        tag={tag}
                                    />
                                ))}
                            </div>
                        </SettingsSection> :
                        null}

                    <SettingsSection title='Character sets'
                        copyPasteFns={{
                            settings: settings.includeCharacters,
                            copy: copyIncludeCharactersSettings,
                            paste: pasteIncludeCharactersSettings,
                        }}>
                        <div className={style.settingsSubSection}>
                            <CheckboxToggle
                                label="All characters"
                                checked={settings.includeCharacters.includeAllCharacters}
                            />
                        </div>
                        {settings.includeCharacters.includeNamedSubsets.length > 0 ?
                            <CheckboxSection
                                name='Named subsets'
                                settings={settings.includeCharacters.includeNamedSubsets}
                                mapping={mapNamedSubsets}
                                disabled={settings.includeCharacters.includeAllCharacters.value}
                            /> :
                            null}
                        <div className={style.settingsSubSection}>
                            <UnicodeRangeTextbox
                                ranges={settings.includeCharacters.includeUnicodeRanges}
                                disabled={settings.includeCharacters.includeAllCharacters.value}
                            />
                        </div>
                    </SettingsSection>

                    {settings.includeFeatures.features.length > 0 ||
                        settings.includeFeatures.characterVariants.length > 0 ||
                        settings.includeFeatures.stylisticSets.length > 0 ?
                        <SettingsSection title='Features'
                            copyPasteFns={{
                                settings: settings.includeFeatures,
                                copy: copyFeatureSettings,
                                paste: pasteFeatureSettings,
                            }}>
                            {settings.includeFeatures.features.length > 0 ?
                                <div className={style.settingsSubSection}>
                                    <div className={style.checkboxes}>
                                        {settings.includeFeatures.features.map(({feature, include}) => (
                                            <CheckboxToggle
                                                label={featureLabel(feature)}
                                                checked={include}
                                                title={feature.tag}
                                            />
                                        ))}
                                    </div>
                                </div> :
                                null}
                            {settings.includeFeatures.stylisticSets.length > 0 ?
                                <CheckboxSection
                                    name='Stylistic sets'
                                    settings={settings.includeFeatures.stylisticSets}
                                    mapping={mapIncludeFeatures}
                                /> :
                                null}
                            {settings.includeFeatures.characterVariants.length > 0 ?
                                <CheckboxSection
                                    name='Character variants'
                                    settings={settings.includeFeatures.characterVariants}
                                    mapping={mapIncludeFeatures}
                                /> :
                                null}
                        </SettingsSection> :
                        null
                    }
                </>}

                <SettingsSection
                    title={['Fonts', <span className={style.numFonts}>{fonts.length}</span>]}
                    startCollapsed={fonts.length > 6}
                >
                    {fonts.map(({font, styleSettings}) =>
                        <SingleFontSettings
                            font={font}
                            styleSettings={styleSettings}
                            enableSubsetting={familySettings.enableSubsetting.value}
                        />)}
                </SettingsSection>
            </div>
        </div>
    );
};

const hasFiles = (event: DragEvent): event is DragEvent & {dataTransfer: DataTransfer & {files: FileList}} => {
    // For most drag event types, dataTransfer.files will not be populated, but dataTransfer.items is
    if (!event.dataTransfer?.items) return false;
    for (const item of event.dataTransfer.items) {
        if (item.kind === 'file') {
            return true;
        }
    }
    return false;
};

const FontInfo = () => {
    const appState = useAppState();
    const {fonts, fontsBeingLoaded} = appState;
    const addErrorToast = useAddErrorToast();

    const onDragEnter = useCallback((event: DragEvent) => {
        if (!hasFiles(event)) return;
        event.preventDefault();
        event.stopPropagation();
    }, []);
    const onDragOver = useCallback((event: DragEvent) => {
        if (!hasFiles(event)) return;
        event.preventDefault();
        event.stopPropagation();
    }, []);
    const onDrop = useCallback((event: DragEvent) => {
        if (!hasFiles(event)) return;
        event.preventDefault();
        event.stopPropagation();
        const files = Array.from(event.dataTransfer.files);
        if (files.length > 0) {
            appState.addFonts(files.map(file => file as Blob)).catch(err => {
                addErrorToast('Failed to add fonts', err);
            });
        }
    }, []);
    const onDragLeave = useCallback((event: DragEvent) => {
        if (!hasFiles(event)) return;
        event.preventDefault();
        event.stopPropagation();
    }, []);
    const uploadFonts = useCallback(() => {
        showFontPicker().then(async files => {
            if (files) {
                await appState.addFonts(Array.from(files));
            }
        })
            .catch(err => {
                addErrorToast('Failed to upload fonts', err);
            });
    }, [appState]);

    if (fonts.value.length === 0) {
        if (fontsBeingLoaded.value > 0) {
            return <div className={style.loading}>
                <Loader size={320} />
            </div>;
        }

        return <div
            className={style.noFonts}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}
            onClick={uploadFonts}
        >
            <Icon type="upload" title="" className={style.uploadIcon} size='8rem' />
            <span className={style.uploadHeader}>Click to upload fonts</span>
            <span className={style.uploadSub}>or drag and drop</span>
        </div>;
    }

    return (
        <div
            className={style.families}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}
        >
            {fonts.value.map(family => <FontFamilySettings familySettings={family} />)}
        </div>
    );
};

export default FontInfo;
