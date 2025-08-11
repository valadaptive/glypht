import style from './style.module.scss';

import {LoadedGoogleFontsModalState, useAppState} from '../../app-state';
import {
    CheckboxToggle,
    TextBox,
    Slider,
    SpinBox,
    CollapsibleHeader,
    SearchableCheckboxDropdown,
} from '../Widgets/Widgets';
import {FamilyProto, FontProto, LanguageProto, AxisProto, ScriptProto} from '../../generated/google-fonts-types';
import {IconButton} from '../Icon/Icon';
import {useCallback, useId, useMemo} from 'preact/hooks';
import {useAddErrorToast} from '../Toast/Toast';

import classnames from 'clsx';
import uFuzzy from '@leeoniya/ufuzzy';
import {signal, Signal, useComputed, useSignal} from '@preact/signals';
import DOMPurify from 'dompurify';

import axisSpinboxParams from '../../util/axis-spinbox-params';
import {useThrottledSignal} from '../../util/throttle';

import fontsListJson from '../../generated/google-fonts.json';
import langListJson from '../../generated/languages.json';
import axesListJson from '../../generated/axes.json';
import Loader from '../Loader/Loader';

const descriptionsUrl = new URL('../../generated/google-fonts-descriptions.txt', import.meta.url);

export type GoogleFontsFamily = Omit<FamilyProto, 'languages'> & {languages: number[]};

const langList = langListJson as {languages: LanguageProto[]; scripts: ScriptProto[]};
const axesList = axesListJson as AxisProto[];

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

export {fontsList, langList, axesList};

// TODO: Handjet doesn't display; Roboto Flex looks weird
// TODO: Intel One Mono has variable and static versions side-by-side; not sure how to tell which is which

// TODO: add a reset button for the filters
// TODO: "download for CLI" button?

const searcher = new uFuzzy({});

let fullContent: Uint8Array | null = null;
const DECODER = new TextDecoder();
const fetchDescription = async(family: GoogleFontsFamily) => {
    if (!family.descriptionRange) return null;

    if (fullContent) {
        return DECODER.decode(fullContent.subarray(...family.descriptionRange));
    }

    const resp = await fetch(descriptionsUrl, {headers: {range: `bytes=${family.descriptionRange[0]}-${family.descriptionRange[1] - 1}`, 'Accept-Encoding': 'identity'}});
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

const rawFontLink = (family: GoogleFontsFamily, font: FontProto): string => `https://raw.githubusercontent.com/google/fonts/main/${family.path}/${font.filename}`;

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

const FontPreview = ({family}: {
    family: GoogleFontsFamily | null;
}) => {
    const appState = useAppState();
    const {customPreviewText} = appState.googleFontsModalState;

    const variationValues = useMemo(() => {
        const familyVariationValues: Record<string, Signal<number>> = {};
        if (family?.axes) {
            for (const axis of family.axes) {
                const axisMeta = axesList.find(axisMeta => axisMeta.tag === axis.tag);
                familyVariationValues[axis.tag!] = signal(axisMeta?.defaultValue ?? 100);
            }
        }

        return familyVariationValues;
    }, [family]);

    const description = useMemo(() => {
        const description = useSignal<
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
            preferredLanguage = langList.languages[family.primaryLanguage];
        }
        if (!preferredLanguage && family.primaryScript) {
            const exemplarLangTag = langList.scripts.find(script => script.id === family.primaryScript)?.exemplarLang;
            preferredLanguage = langList.languages.find(lang => lang.id === exemplarLangTag);
        }
        if (preferredLanguage) {
            if (preferredLanguage.sampleText?.styles) {
                previewText = preferredLanguage.sampleText.styles;
            }
        }
        if (!previewText) {
            for (const lang of family.languages) {
                const langMeta = langList.languages[lang];
                if (langMeta.sampleText?.styles) {
                    previewText = langMeta.sampleText.styles;
                    break;
                }
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
            if (axis.tag && variationValues[axis.tag] !== undefined) {
                variations.push(`"${axis.tag}" ${variationValues[axis.tag].value}`);
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
                }}
            >
                {previewText}
            </div>
        </div>;
    });

    // Variation axes controls
    const axisControls = family.axes ? <div className={style.axisControls}>
        <div className={style.axisControlsTitle}>Variable Axes</div>
        <div className={style.axisControlsBody}>
            {family.axes.map(axisSegment => {
                if (!axisSegment.tag) return null;
                const {step, smartAim} = axisSpinboxParams(axisSegment.maxValue ?? 1000);

                // Find the full axis metadata from axesList
                const fullAxis = axesList.find(ax => ax.tag === axisSegment.tag);

                // Use values from AxisSegmentProto (family-specific) with fallbacks from AxisProto (global metadata)
                const minValue = axisSegment.minValue ?? fullAxis?.minValue ?? 0;
                const maxValue = axisSegment.maxValue ?? fullAxis?.maxValue ?? 1000;
                const displayName = fullAxis?.displayName ?? axisSegment.tag?.toUpperCase();

                const axisValue = variationValues[axisSegment.tag];
                return <div key={axisSegment.tag} className={style.axisControl}>
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
                            disabled={typeof fullAxis?.defaultValue !== 'number' ||
                                fullAxis?.defaultValue === axisValue.value}
                            onClick={() => axisValue.value = fullAxis?.defaultValue ?? 0}
                        />
                    </div>
                </div>;
            })}
        </div>
    </div> : null;

    const supportedLanguages = useMemo(() => {
        const byScript = new Map<string, string[]>();
        for (const langIndex of family.languages) {
            const lang = langList.languages[langIndex];
            let script = lang.script && langList.scripts.find(script => script.id === lang.script)?.name;
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

    let descriptionElem;
    switch (description.value.state) {
        case 'loading':
            descriptionElem = 'Loading';
            break;
        case 'loaded':
            if (description.value.description) {
                const sanitized = DOMPurify.sanitize(description.value.description, {
                    FORBID_TAGS: ['img', 'video', 'hr'],
                });
                descriptionElem = <div dangerouslySetInnerHTML={{__html: sanitized}} />;
            } else {
                descriptionElem = description.value.description ?? 'No description';
            }
            break;
        case 'error':
            descriptionElem = description.value.error.message;
            break;
    }

    // Generate GitHub repository link
    const githubLink = `https://github.com/google/fonts/tree/main/${family.path}`;

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
            <header className={style.familyName}>{family.name}</header>
            <div className={style.fontMeta}>
                <div className={style.fontLicense}>
                    License: {formatLicense(family.license)}
                </div>
                <div className={style.fontGithubLink}>
                    <a href={githubLink} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                    </a>
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

const FontItem = ({family, onAdd, onClick, selected}: {
    family: GoogleFontsFamily;
    onAdd: (family: GoogleFontsFamily) => Promise<void>;
    onClick: (family: GoogleFontsFamily) => void;
    selected: boolean;
}) => {
    const isAdding = useSignal(false);
    const handleAdd = useCallback((event: Event) => {
        event.stopPropagation();
        isAdding.value = true;
        const doneAdding = () => {
            isAdding.value = false;
        };
        onAdd(family).then(doneAdding, doneAdding);
    }, [onAdd, family, isAdding]);
    const handleClick = useCallback((event: Event) => {
        event.stopPropagation();
        onClick(family);
    }, [onClick, family]);

    return (
        <div className={classnames(style.fontItem, selected && style.selected)} role="listitem" onClick={handleClick}>
            <span class={style.fontName}>{family.displayName ?? family.name}</span>
            <div className={style.addFont}>
                {isAdding.value ?
                    <div class={style.addFontLoader}><Loader size={18} /></div> :
                    <IconButton size={24} type='plus' title='Add font' onClick={handleAdd} className={style.addFont} />}
            </div>
        </div>
    );
};

const FiltersPane = ({modalState}: {modalState: LoadedGoogleFontsModalState}) => {
    const {selectedLanguages, selectedAxes} = modalState;
    const appState = useAppState();
    const {searchFilters} = appState.googleFontsModalState;

    // Get popular languages for filtering
    const popularLanguages = useMemo(() => {
        return langList
            .languages
            .slice(0)
            .sort((a, b) => (b.population ?? 0) - (a.population ?? 0));
    }, [langList]);

    return <div className={style.filtersPane}>
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
                options={popularLanguages.map(lang => ({
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
    </div>;
};

const GoogleFontsModalInner = ({fontsListState}: {fontsListState: LoadedGoogleFontsModalState}) => {
    const appState = useAppState();
    const {googleFontsModalState} = appState;
    const addErrorToast = useAddErrorToast();

    const onAddFont = useCallback((family: GoogleFontsFamily) => {
        const all = [];
        for (const font of family.fonts) {
            const fontUrl = rawFontLink(family, font);
            all.push(fetch(fontUrl)
                .then(resp => resp.blob())
                .then(fontData => appState.addFonts([fontData]))
                .then(
                    null,
                    error => {
                        addErrorToast('Failed to add font from Google Fonts', error);
                    },
                ));
        }
        return Promise.all(all).then(() => {});
    }, [addErrorToast, appState]);
    const onSelectFont = useCallback((family: GoogleFontsFamily) => {
        googleFontsModalState.previewedFamily.value = family;
    }, [googleFontsModalState.previewedFamily]);

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
            return fontsList;
        }

        return fontsList.filter(family => {
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
                        !family.languages?.some(langIndex => langList.languages[langIndex].id === selectedLangTag),
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
            return filteredFonts.value;
        }
        const searchedText = throttledSearchValue.value;
        const [idxs, info, order] = searcher.search(fontNames, searchedText) as
            uFuzzy.RankedResult | uFuzzy.AbortedResult;
        if (!info) return filteredFonts.value;
        const filteredFontsList = filteredFonts.value;
        const searchResults = order.map(i => filteredFontsList[idxs[i]]);
        return searchResults;
    }, [throttledSearchValue.value, filteredFonts.value]);

    const fontsListElem = useMemo(() => <div className={style.fontsList}>{searchedFonts.map(
        font => <FontItem
            key={font.name}
            family={font}
            onAdd={onAddFont}
            onClick={onSelectFont}
            selected={font === googleFontsModalState.previewedFamily.value}
        />)}</div>, [searchedFonts, googleFontsModalState.previewedFamily.value]);
    const fontPreview = useMemo(() =>
        <FontPreview family={googleFontsModalState.previewedFamily.value} />,
    [googleFontsModalState.previewedFamily.value]);
    const filtersPane = useMemo(() => {
        return <FiltersPane modalState={fontsListState} />;
    }, [fontsListState]);

    return <>
        <div className={style.searchBarWrapper}>
            <TextBox
                value={googleFontsModalState.searchValue}
                placeholder='Search...'
            />
        </div>
        <div className={style.panes}>
            {filtersPane}
            {fontsListElem}
            {fontPreview}
        </div>
    </>;
};

export default GoogleFontsModalInner;
