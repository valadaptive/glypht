import style from './style.module.scss';

import {LoadedGoogleFontsModalState, useAppState} from '../../app-state';
import {
    CheckboxToggle,
    TextBox,
    Slider,
    SpinBox,
    CollapsibleHeader,
    SearchableCheckboxDropdown,
    ToggleIcon,
    Dropdown,
    Button,
} from '../Widgets/Widgets';
import {AxisSegmentProto, FamilyProto, FontProto, LanguageProto, ScriptProto} from '../../generated/google-fonts-types';
import Icon, {IconButton} from '../Icon/Icon';
import {useCallback, useId, useMemo} from 'preact/hooks';
import {useAddErrorToast} from '../Toast/Toast';

import classnames from 'clsx';
import uFuzzy from '@leeoniya/ufuzzy';
import {signal, Signal, useComputed, useSignal} from '@preact/signals';
import DOMPurify from 'dompurify';
import type {ComponentChildren, JSX} from 'preact';

import axisSpinboxParams from '../../util/axis-spinbox-params';
import {useThrottledSignal} from '../../util/throttle';

import fontsListJson from '../../generated/google-fonts.json';
import langListJson from '../../generated/languages.json';
import Loader from '../Loader/Loader';
import useVirtualList from '../../util/virtual-list';
import axisMetadata, {axesList} from '../../util/axis-metadata';

const descriptionsUrl = new URL('../../generated/google-fonts-descriptions.txt', import.meta.url);

export type GoogleFontsFamily = Omit<FamilyProto, 'languages'> & {languages: number[]};

const langList = langListJson as {languages: LanguageProto[]; scripts: ScriptProto[]};
const languagesById = new Map<string, LanguageProto>();
for (const language of langList.languages) {
    languagesById.set(language.id, language);
}
const scriptsById = new Map<string, ScriptProto>();
for (const script of langList.scripts) {
    scriptsById.set(script.id, script);
}
/** List of language metadata, sorted by font coverage. This is the ordering that a font's language indices refer to. */
const languagesByCoverage = langList.languages;

/**
 * List of language metadata, sorted by population. This is the ordering to use for dropdowns and other user-facing
 * elements.
 */
const languagesByPopulation = langList.languages.slice(0);
languagesByPopulation.sort((a, b) => (b.population ?? 0) - (a.population ?? 0));

const fontsList: GoogleFontsFamily[] = [];
for (const font of fontsListJson as FamilyProto[]) {
    const languageTags = [];
    if (font.languages) {
        const bitset = atob(font.languages);
        for (let i = 0; i < bitset.length; i++) {
            const byte = bitset.charCodeAt(i);
            for (let j = 0; j < 8; j++) {
                const bit = byte & (1 << j);
                if (bit !== 0) {
                    const bitIdx = (i << 3) + j;
                    languageTags.push(bitIdx);
                }
            }
        };
    }
    (font as unknown as GoogleFontsFamily).languages = languageTags;
    fontsList.push(font as unknown as GoogleFontsFamily);
}

export {fontsList, languagesByPopulation as languages};

// TODO: Intel One Mono has variable and static versions side-by-side; not sure how to tell which is which
// TODO: add a reset button for the filters

const searcher = new uFuzzy({});

let fullContent: Uint8Array | null = null;
const DECODER = new TextDecoder();
const isFirefox = navigator.userAgent.includes('Firefox');
const fetchDescription = async(family: GoogleFontsFamily) => {
    if (!family.descriptionRange) return null;

    if (fullContent) {
        return DECODER.decode(fullContent.subarray(...family.descriptionRange));
    }

    // Whoever originally implemented this in Firefox just changed the WPT tests instead of implementing it correctly...
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1983387
    const headers = isFirefox ? undefined : {range: `bytes=${family.descriptionRange[0]}-${family.descriptionRange[1] - 1}`};
    const resp = await fetch(descriptionsUrl, {headers});
    if (!resp.ok) {
        throw new Error(resp.statusText);
    }
    const respData = new Uint8Array(await resp.arrayBuffer());
    if (resp.status !== 206) {
        fullContent = respData;
        return DECODER.decode(fullContent.subarray(...family.descriptionRange));
    }

    return DECODER.decode(respData);
};

const rawFontLink = (family: GoogleFontsFamily, font: FontProto): string => `http://cdn.jsdelivr.net/gh/google/fonts@main/${family.path}/${font.filename}`;

const ScriptLangList = ({script, langs}: {script: string; langs: string[]}) => {
    const collapsed = useSignal(true);
    const bodyId = useId();

    return (
        <div className={style.supportedScript}>
            <CollapsibleHeader
                className={style.scriptTitle}
                collapsed={collapsed}
                bodyId={bodyId}
            >{script}</CollapsibleHeader>
            <div className={classnames(style.scriptLangs, collapsed.value && style.hide)}>
                {langs.map(lang => <div className={style.supportedLang}>{lang}</div>)}
            </div>
        </div>
    );
};

const AxisSlider = ({
    axisSegment,
    axisValue,
    defaultValue,
}: {
    axisSegment: AxisSegmentProto;
    axisValue: Signal<number>;
    defaultValue: number;
}) => {
    // Find the full axis metadata
    const fullAxis = axisMetadata.get(axisSegment.tag);

    const resetValue = useCallback(() => {
        axisValue.value = defaultValue ?? 100;
    }, [axisValue, defaultValue]);

    const resetButtonDisabled = typeof defaultValue !== 'number' ||
        defaultValue === axisValue.value;

    return useMemo(() => {
        const {step, smartAim} = axisSpinboxParams(axisSegment.maxValue ?? 1000);

        // Use values from AxisSegmentProto (family-specific) with fallbacks from AxisProto (global metadata)
        const minValue = axisSegment.minValue ?? fullAxis?.minValue ?? 0;
        const maxValue = axisSegment.maxValue ?? fullAxis?.maxValue ?? 1000;
        const displayName = fullAxis?.displayName ?? axisSegment.tag.toUpperCase();

        return <div className={style.axisControl}>
            <label className={style.axisLabel}>
                {displayName}
            </label>
            <div className={style.axisInputs}>
                <Slider
                    value={axisValue}
                    min={minValue}
                    max={maxValue}
                    step={step}
                    className={style.axisSlider}
                />
                <SpinBox
                    value={axisValue}
                    min={minValue}
                    max={maxValue}
                    step={step}
                    smartAim={smartAim}
                    className={style.axisSpinBox}
                />
                <IconButton
                    type='reset'
                    title='Reset axis to default value'
                    disabled={resetButtonDisabled}
                    onClick={resetValue}
                />
            </div>
        </div>;
    }, [axisSegment, axisValue, resetValue, resetButtonDisabled]);
};

const FontPreview = ({family}: {
    family: GoogleFontsFamily | null;
}) => {
    const appState = useAppState();
    const {customPreviewText} = appState.googleFontsModalState;

    const variationValues = useMemo(() => {
        const familyVariationValues: Record<string, {default: number; value: Signal<number>}> = {};
        if (family?.axes) {
            for (const axis of family.axes) {
                let defaultValue = family.registryDefaultOverrides?.[axis.tag];
                if (typeof defaultValue === 'undefined') {
                    const fullAxis = axisMetadata.get(axis.tag);
                    defaultValue = fullAxis?.defaultValue ?? 100;
                }

                familyVariationValues[axis.tag] = {default: defaultValue, value: signal(defaultValue)};
            }
        }

        return familyVariationValues;
    }, [family]);

    const description = useMemo(() => {
        const description = signal<
            | {state: 'loading'}
            | {state: 'loaded'; description: string | null}
            | {state: 'error'; error: Error}
        >({state: 'loading'});

        if (family) {
            fetchDescription(family).then(
                descriptionText => {
                    description.value = {state: 'loaded', description: descriptionText};
                },
                err => {
                    description.value = {state: 'error', error: err as Error};
                },
            );
        }
        return description;
    }, [family]);

    const defaultFontSize = 24;
    const fontSize = useSignal(defaultFontSize);
    const resetFontSize = useCallback(() => {
        fontSize.value = defaultFontSize;
    }, [fontSize]);

    if (!family) {
        return <div className={style.fontPreview} />;
    }

    let fontCss = '';
    for (const font of family.fonts) {
        fontCss += `@font-face { font-family: ${JSON.stringify('__loaded_' + font.name)}; src: url(${JSON.stringify(rawFontLink(family, font))}); font-style: ${font.style}; font-weight: ${font.weight}; font-display: block; } `;
    }
    let previewText = customPreviewText.value;
    if (!previewText) {
        let preferredLanguage;
        if (family.primaryLanguage) {
            preferredLanguage = languagesByCoverage[family.primaryLanguage];
        }
        if (!preferredLanguage && family.primaryScript) {
            const exemplarLangTag = scriptsById.get(family.primaryScript)?.exemplarLang;
            preferredLanguage = exemplarLangTag && languagesById.get(exemplarLangTag);
        }
        if (preferredLanguage) {
            if (preferredLanguage.sampleText?.styles) {
                previewText = preferredLanguage.sampleText.styles;
            }
        }
        if (!previewText) {
            let bestPopulation = 0;
            for (const lang of family.languages) {
                const langMeta = languagesByCoverage[lang];
                if (typeof langMeta.population !== 'number' || langMeta.population <= bestPopulation) {
                    continue;
                }
                if (!langMeta.sampleText?.styles) {
                    continue;
                }
                previewText = langMeta.sampleText.styles;
                bestPopulation = langMeta.population;
            }
        }
        if (!previewText) {
            previewText = 'The quick brown fox jumps over the lazy dog';
        }
    }

    // Apply variation settings to font styles
    let fontVariationSettings = '';
    if (family.axes && Object.keys(variationValues).length > 0) {
        const variations = [];
        for (const axis of family.axes) {
            if (variationValues[axis.tag] !== undefined) {
                variations.push(`"${axis.tag}" ${variationValues[axis.tag].value.value}`);
            }
        }
        if (variations.length > 0) {
            fontVariationSettings = variations.join(', ');
        }
    }

    const previews = family.fonts.map(font => {
        // Generate a readable style name from font properties
        const styleName = font.fullName.replace(family.name, '').trim() ||
            `${font.style === 'italic' ? 'Italic' : ''} ${font.weight === 400 ? 'Regular' : font.weight}`.trim() ||
            'Regular';

        return <div key={font} className={style.fontSample}>
            <div className={style.fontStyleName}>{styleName}</div>
            <div
                className={style.fontStylePreview}
                style={{
                    // Assigning this as a property *doesn't* quote it for us!
                    // https://stackoverflow.com/a/8951680
                    fontFamily: JSON.stringify('__loaded_' + font.name),
                    fontStyle: font.style,
                    fontWeight: font.weight,
                    fontVariationSettings,
                    fontSize: `${fontSize.value}px`,
                }}
            >
                {previewText}
            </div>
        </div>;
    });

    // Variation axes controls
    const axisControls = useMemo(() => {
        if (!family.axes) return null;
        return <div className={style.axisControls}>
            <div className={style.axisControlsTitle}>Variable Axes</div>
            <div className={style.axisControlsBody}>
                {family.axes.map(axisSegment => <AxisSlider
                    axisSegment={axisSegment}
                    axisValue={variationValues[axisSegment.tag].value}
                    defaultValue={variationValues[axisSegment.tag].default}
                    key={axisSegment.tag}
                />)}
            </div>
        </div>;
    }, [family, variationValues]);

    const supportedLanguages = useMemo(() => {
        const byScript = new Map<string, string[]>();
        for (const langIndex of family.languages) {
            const lang = languagesByCoverage[langIndex];
            let script = lang.script && scriptsById.get(lang.script)?.name;
            if (!script) script = 'Other';
            let byThisScript = byScript.get(script);
            if (!byThisScript) {
                byThisScript = [];
                byScript.set(script, byThisScript);
            }
            byThisScript.push(lang.name ?? lang.id);
        }
        const scripts = Array.from(byScript);
        scripts.sort(([a], [b]) => {
            if (a === 'Other' && b !== 'Other') return 1;
            if (b === 'Other' && a !== 'Other') return -1;
            return a.localeCompare(b);
        });
        for (const [, langs] of scripts) {
            langs.sort((a, b) => a.localeCompare(b));
        }
        return (
            <div className={style.supportedLanguages}>
                {scripts.map(([scriptName, langs]) =>
                    <ScriptLangList key={scriptName} script={scriptName} langs={langs} />)}
            </div>
        );
    }, [family]);

    const descriptionElem = useMemo(() => {
        switch (description.value.state) {
            case 'loading':
                return <p><Loader size={48} /></p>;
            case 'loaded': {
                if (!description.value.description) return  <p>No description</p>;

                const sanitized = DOMPurify.sanitize(description.value.description, {
                    FORBID_TAGS: ['img', 'video', 'hr'],
                });
                return <div dangerouslySetInnerHTML={{__html: sanitized}} />;
            }
            case 'error':
                return description.value.error.message;
        }
    }, [description, description.value]);

    // Format license display name
    const formatLicense = (license: string) => {
        switch (license) {
            case 'OFL':
                return 'Open Font License';
            case 'APACHE2':
                return 'Apache License 2.0';
            case 'UFL':
                return 'Ubuntu Font License';
            default:
                return license;
        }
    };

    return (
        <div className={style.fontPreview}>
            <style>{fontCss}</style>
            <header className={style.fontPreviewHeader}>
                <div className={style.fontPreviewTitle}>{family.name}</div>
                <AddFontButton family={family} fullSize={true} />
            </header>
            <div className={style.fontMeta}>
                <div className={style.fontMetaLine}>
                    By {family.designer}
                </div>
                <div className={style.fontMetaLine}>
                    <div>
                        License: {formatLicense(family.license)}
                    </div>
                    <div>
                        <a
                            href={`https://github.com/google/fonts/tree/main/${family.path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on GitHub
                        </a>
                    </div>
                </div>
            </div>
            {axisControls}
            <div className={style.previewControls}>
                <TextBox
                    value={customPreviewText}
                    placeholder="Type custom preview text..."
                    className={style.previewTextInput}
                />
            </div>
            <div className={style.previewFontSize}>
                <Slider value={fontSize} min={9} max={144} step={1} className={style.previewFontSizeSlider} />
                <SpinBox value={fontSize} min={9} max={144} step={1} />
                <IconButton
                    type='reset'
                    title='Reset to default value'
                    disabled={fontSize.value === defaultFontSize}
                    onClick={resetFontSize}
                />
                Font size
            </div>
            <div className={style.previewContent}>
                <div className={style.previewSamples}>
                    {previews}
                </div>
            </div>
            <div>
                <header className={style.sectionHeader}>Supported languages</header>
                <div>{supportedLanguages}</div>
            </div>
            <div>
                <header className={style.sectionHeader}>Description</header>
                <div>{descriptionElem}</div>
            </div>
        </div>
    );
};

const AddFontButton = ({family, fullSize}: {family: GoogleFontsFamily; fullSize?: boolean}) => {
    const appState = useAppState();
    const addErrorToast = useAddErrorToast();
    const isAdding = useSignal(false);
    const handleAdd = useCallback((event: Event) => {
        event.stopPropagation();
        isAdding.value = true;
        const doneAdding = () => {
            isAdding.value = false;
        };

        const all = [];
        for (const font of family.fonts) {
            const fontUrl = rawFontLink(family, font);
            all.push(fetch(fontUrl)
                .then(resp => resp.blob())
                .then(fontData => appState.addFonts([{data: fontData, filename: font.filename}]))
                .then(
                    null,
                    error => {
                        addErrorToast('Failed to add font from Google Fonts', error);
                    },
                ));
        }
        Promise.all(all).then(doneAdding, doneAdding);
    }, [appState, family, isAdding]);

    if (fullSize) {
        return <Button
            className={style.addFontButton} disabled={isAdding.value || appState.loadedFamilies.value.has(family.name)}
            onClick={handleAdd}
        >
            {isAdding.value ?
                <>
                    <Loader size={24} />
                    Add font
                </> :
                appState.loadedFamilies.value.has(family.name) ?
                    <>
                        <Icon type='check' title='' />
                        Added
                    </> :
                    <>
                        <Icon type='plus' title='' />
                        Add font
                    </>
            }
        </Button>;
    }

    return (
        <div className={style.addFontButton}>
            {isAdding.value ?
                <div class={style.addFontLoader}><Loader size={18} /></div> :
                appState.loadedFamilies.value.has(family.name) ?
                    <IconButton size={24} type='check' title='Font added' disabled={true} className={style.addFont} /> :
                    <IconButton size={24} type='plus' title='Add font' onClick={handleAdd} className={style.addFont} />}
        </div>
    );
};

const FontItem = ({family, onClick, selected, style: cssStyle, highlightRanges}: {
    family: GoogleFontsFamily;
    onClick: (family: GoogleFontsFamily) => void;
    selected: boolean;
    style?: JSX.CSSProperties;
    highlightRanges?: number[];
}) => {
    const handleClick = useCallback((event: Event) => {
        event.stopPropagation();
        onClick(family);
    }, [onClick, family]);

    const fontName = family.displayName ?? family.name;
    let fontNameElems: ComponentChildren;
    if (highlightRanges && highlightRanges.length >= 2) {
        fontNameElems = uFuzzy.highlight(
            fontName,
            highlightRanges,

            (part, matched) => matched ? <mark>{part}</mark> : part,
            [] as ComponentChildren[],
            (accum, part) => {accum.push(part); return accum;},
        );
    } else {
        fontNameElems = fontName;
    }

    return (
        <div
            className={classnames(style.fontItem, selected && style.selected)}
            role="listitem"
            onClick={handleClick}
            style={cssStyle}
        >
            <span class={style.fontName}>{fontNameElems}</span>
            <AddFontButton family={family} />
        </div>
    );
};

const FiltersPane = ({modalState}: {modalState: LoadedGoogleFontsModalState}) => {
    const {selectedLanguages, selectedAxes} = modalState;
    const appState = useAppState();
    const {searchFilters} = appState.googleFontsModalState;

    return <>
        <div className={style.filterGroup}>
            <div className={style.filterGroupTitle}>Proportion</div>
            <CheckboxToggle label="Proportional" checked={searchFilters.proportional} className={style.filterToggle} />
            <CheckboxToggle label="Monospace" checked={searchFilters.monospace} className={style.filterToggle} />
        </div>
        <div className={style.filterGroup}>
            <div className={style.filterGroupTitle}>Stroke</div>
            <CheckboxToggle label="Sans-serif" checked={searchFilters.sansSerif} className={style.filterToggle} />
            <CheckboxToggle label="Serif" checked={searchFilters.serif} className={style.filterToggle} />
        </div>
        <div className={style.filterGroup}>
            <div className={style.filterGroupTitle}>Classification</div>
            <CheckboxToggle label="Normal" checked={searchFilters.noClassification} className={style.filterToggle} />
            <CheckboxToggle label="Display" checked={searchFilters.display} className={style.filterToggle} />
            <CheckboxToggle label="Handwriting" checked={searchFilters.handwriting} className={style.filterToggle} />
            <CheckboxToggle label="Symbols" checked={searchFilters.symbols} className={style.filterToggle} />
        </div>
        <div className={style.filterGroup}>
            <div className={style.filterGroupTitle}>Languages</div>
            <SearchableCheckboxDropdown
                options={languagesByPopulation.map(lang => ({
                    id: lang.id,
                    name: lang.name ?? lang.id,
                    searchable: lang.name ?? lang.id,
                }))}
                selectedOptions={selectedLanguages}
                placeholder="Search languages..."
                className={style.filterToggle}
            />
        </div>
        <div className={style.filterGroup}>
            <div className={style.filterGroupTitle}>Variable Axes</div>
            <SearchableCheckboxDropdown
                options={axesList.map(axis => ({
                    id: axis.tag,
                    name: axis.displayName ?? axis.tag,
                    searchable: `${axis.displayName ?? axis.tag} ${axis.tag}`,
                }))}
                selectedOptions={selectedAxes}
                placeholder="Search axes..."
                className={style.filterToggle}
            />
        </div>
    </>;
};

const GoogleFontsModalInner = ({fontsListState}: {fontsListState: LoadedGoogleFontsModalState}) => {
    const appState = useAppState();
    const {googleFontsModalState} = appState;

    // Mobile view state management
    const mobileView = useSignal<'list' | 'preview'>('list');
    const filtersExpanded = useSignal(false);

    const closeModal = useCallback(() => {
        appState.googleFontsModalState.open.value = false;
    }, [appState.googleFontsModalState.open]);

    const onSelectFont = useCallback((family: GoogleFontsFamily) => {
        googleFontsModalState.previewedFamily.value = family;
        // Switch to preview view on mobile when font is selected
        mobileView.value = 'preview';
    }, [googleFontsModalState.previewedFamily, mobileView]);

    const goBackToList = useCallback(() => {
        mobileView.value = 'list';
    }, [mobileView]);

    // Close filters when clicking outside
    const closeFilters = useCallback(() => {
        filtersExpanded.value = false;
    }, [filtersExpanded]);

    const handleFiltersClick = useCallback((event: Event) => {
        // Prevent the filters panel from closing when clicking inside it
        event.stopPropagation();
    }, []);

    const sortOrder = useSignal<'trending' | 'popular' | 'newest' | 'name'>('trending');
    const sortOptions = useMemo(() => [
        {name: 'Trending', id: 'trending'},
        {name: 'Popular', id: 'popular'},
        {name: 'Newest', id: 'newest'},
        {name: 'Name', id: 'name'},
    ], []);

    const sortedFonts = useComputed(() => {
        switch (sortOrder.value) {
            case 'trending': return fontsList;
            case 'popular': {
                const sorted = fontsList.slice(0);
                sorted.sort((a, b) => a.popularity - b.popularity);
                return sorted;
            }
            case 'newest': {
                const sorted = fontsList.slice(0);
                sorted.sort((a, b) => Date.parse(b.dateAdded) - Date.parse(a.dateAdded));
                return sorted;
            }
            case 'name': {
                const sorted = fontsList.slice(0);
                sorted.sort((a, b) => (a.displayName ?? a.name).localeCompare(b.displayName ?? b.name));
                return sorted;
            }
        }
    });

    const throttledSearchValue = useThrottledSignal(googleFontsModalState.searchValue, 100, true);
    const filteredFonts = useComputed(() => {
        const monospace = googleFontsModalState.searchFilters.monospace.value;
        const proportional = googleFontsModalState.searchFilters.proportional.value;
        const sansSerif = googleFontsModalState.searchFilters.sansSerif.value;
        const serif = googleFontsModalState.searchFilters.serif.value;
        const noClassification = googleFontsModalState.searchFilters.noClassification.value;
        const display = googleFontsModalState.searchFilters.display.value;
        const handwriting = googleFontsModalState.searchFilters.handwriting.value;
        const symbols = googleFontsModalState.searchFilters.symbols.value;
        const selectedLanguages = fontsListState.selectedLanguages;
        const selectedAxes = fontsListState.selectedAxes;
        const selectedLanguagesList: string[] = [];
        for (const [langTag, selected] of Object.entries(selectedLanguages)) {
            if (selected.value) selectedLanguagesList.push(langTag);
        }
        const selectedAxesList: string[] = [];
        for (const [tag, selected] of Object.entries(selectedAxes)) {
            if (selected.value) selectedAxesList.push(tag);
        }

        if (
            monospace &&
            proportional &&
            sansSerif &&
            serif &&
            noClassification &&
            display &&
            handwriting &&
            symbols &&
            selectedLanguagesList.length === 0 &&
            selectedAxesList.length === 0
        ) {
            return sortedFonts.value;
        }

        return sortedFonts.value.filter(family => {
            // Proportion filtering
            let proportionMatch = false;
            if (monospace && family.proportion === 'MONOSPACE') proportionMatch = true;
            if (proportional && family.proportion === 'PROPORTIONAL') proportionMatch = true;
            if (monospace && proportional) proportionMatch = true;
            if (!monospace && !proportional) proportionMatch = true;
            if (!proportionMatch) return false;

            // Stroke/category filtering
            let strokeMatch = false;
            if (
                sansSerif && (
                    family.category.includes('SANS_SERIF') ||
                    family.stroke === 'SANS_SERIF'
                )
            ) strokeMatch = true;
            if (
                serif && (
                    family.category.includes('SERIF') ||
                    family.stroke === 'SERIF' ||
                    family.stroke === 'SLAB_SERIF'
                )
            ) strokeMatch = true;
            if (!sansSerif && !serif) strokeMatch = true;
            if (sansSerif && serif) strokeMatch = true;
            if (!strokeMatch) return false;

            // Classification filtering
            let classificationMatch = false;
            if (
                display && (
                    family.category.includes('DISPLAY') ||
                    family.classifications?.includes('DISPLAY')
                )
            ) classificationMatch = true;
            if (
                handwriting && (
                    family.category.includes('HANDWRITING') ||
                    family.classifications?.includes('HANDWRITING')
                )
            ) classificationMatch = true;
            if (symbols && family.classifications?.includes('SYMBOLS')) classificationMatch = true;
            if (
                noClassification &&
                !family.category.some(c => c === 'DISPLAY' || c === 'HANDWRITING') &&
                !family.classifications?.some(c => c === 'DISPLAY' || c === 'HANDWRITING' || c === 'SYMBOLS')
            ) classificationMatch = true;
            if (!display && !handwriting && !symbols && !noClassification) classificationMatch = true;
            if (display && handwriting && symbols && noClassification) classificationMatch = true;
            if (!classificationMatch) return false;

            // Language filtering
            if (selectedLanguagesList.length) {
                const hasAllSelectedLanguages = !selectedLanguagesList
                    .some(selectedLangTag =>
                        !family.languages ||
                        !family.languages?.some(langIndex => languagesByCoverage[langIndex].id === selectedLangTag),
                    );
                if (!hasAllSelectedLanguages) return false;
            }

            // Variation axes filtering
            if (selectedAxesList.length) {
                const hasAllSelectedAxes = !selectedAxesList
                    .some(selectedAxis =>
                        !family.axes || !family.axes?.some(axis => axis.tag === selectedAxis));
                if (!hasAllSelectedAxes) return false;
            }

            return true;
        });
    });

    const fontNames = useMemo(() => {
        return filteredFonts.value.map(f => f.displayName ?? f.name);
    }, [filteredFonts.value]);
    const searchedFonts = useMemo(() => {
        if (throttledSearchValue.value.length === 0) {
            return {fonts: filteredFonts.value, info: null, order: null};
        }
        const searchedText = throttledSearchValue.value;
        const [idxs, info, order] = searcher.search(fontNames, searchedText) as
            uFuzzy.RankedResult | uFuzzy.AbortedResult;
        if (!info) return {fonts: filteredFonts.value, info: null, order: null};
        const filteredFontsList = filteredFonts.value;
        const searchResults = order.map(i => filteredFontsList[idxs[i]]);
        return {fonts: searchResults, info, order};
    }, [throttledSearchValue.value, filteredFonts.value]);

    const fontItemHeight = 32;
    const {parentRef, items} = useVirtualList({items: searchedFonts.fonts, itemHeight: fontItemHeight, extraItems: 10});

    const fontsListElem = useMemo(() => (
        <div className={style.fontsList}>
            <div className={style.fontsListSort}>
                <Dropdown
                    value={sortOrder}
                    options={sortOptions}
                    disabled={searchedFonts.fonts !== filteredFonts.value}
                />
            </div>
            <div className={style.fontsListFonts} ref={parentRef}>
                <div className={style.fontsListFontsInner} style={{height: `${searchedFonts.fonts.length * fontItemHeight}px`}}>
                    {items.value.map(({item: font, index}) => {
                        return <FontItem
                            key={font.name}
                            highlightRanges={searchedFonts.info ?
                                searchedFonts.info.ranges[searchedFonts.order[index]] :
                                undefined}
                            family={font}
                            onClick={onSelectFont}
                            selected={font === googleFontsModalState.previewedFamily.value}
                            style={{
                                position: 'absolute',
                                top: `${index * fontItemHeight}px`,
                                height: `${fontItemHeight}px`,
                            }}
                        />;
                    })}
                </div>
            </div>
        </div>
    ), [searchedFonts, googleFontsModalState.previewedFamily.value, parentRef, items.value]);
    const fontPreview = useMemo(() =>
        <FontPreview family={googleFontsModalState.previewedFamily.value} />,
    [googleFontsModalState.previewedFamily.value]);

    return <>
        <div className={classnames(style.topBar, style[`mobile-${mobileView.value}`])}>
            <IconButton
                type="arrow-left"
                title="Back to fonts list"
                onClick={goBackToList}
                className={style.mobileBackButton}
            />
            <TextBox
                value={googleFontsModalState.searchValue}
                className={style.searchBox}
                placeholder='Search...'
            />
            <ToggleIcon
                type="funnel"
                title="Show filters"
                toggled={filtersExpanded}
                className={style.mobileFiltersButton}
            />
            <IconButton type="close" title="Close Google Fonts browser" onClick={closeModal} />
        </div>
        <div className={classnames(style.panes, style[`mobile-${mobileView.value}`])} onClick={closeFilters}>
            <div
                className={classnames(style.filtersPane, filtersExpanded.value && style.filtersExpanded)}
                onClick={handleFiltersClick}
            >
                <FiltersPane modalState={fontsListState} />
            </div>
            <div className={style.listAndPreview}>
                {fontsListElem}
                {fontPreview}
            </div>
        </div>
    </>;
};

export default GoogleFontsModalInner;
