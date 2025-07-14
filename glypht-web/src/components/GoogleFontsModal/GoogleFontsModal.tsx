import style from './style.module.scss';

import {useAppState} from '../../app-state';
import Loader from '../Loader/Loader';
import {CheckboxToggle, TextBox} from '../Widgets/Widgets';
import {FamilyProto, FontProto, LanguageProto} from '../../generated/google-fonts-types';
import {IconButton} from '../Icon/Icon';
import {useCallback, useMemo} from 'preact/hooks';
import Modal from '../Modal/Modal';
import {useAddErrorToast} from '../Toast/Toast';

import classnames from 'clsx';
import uFuzzy from '@leeoniya/ufuzzy';
import {useComputed} from '@preact/signals';

// TODO: M PLUS 1p does not load
// TODO: Manufacturing Consent Oxygen, and Lusitana don't have Latin coverage?
// TODO: Baloo 2's CSS font-family never appears in the inline style

const searcher = new uFuzzy({});

const rawFontLink = (family: FamilyProto, font: FontProto): string => `https://raw.githubusercontent.com/google/fonts/main/${family.path}/${font.filename}`;

const FontPreview = ({family, langList}: {
    family: FamilyProto | null;
    langList: LanguageProto[];
}) => {
    let inner = null;
    if (family) {
        let fontCss = '';
        for (const font of family.fonts) {
            fontCss += `@font-face { font-family: ${JSON.stringify('__loaded_' + font.name)}; src: url(${JSON.stringify(rawFontLink(family, font))}); font-style: ${font.style}; font-weight: ${font.weight} } `;
        }
        /*const rawLinks = family.fonts.map(font => {
            const rawUrl = `https://raw.githubusercontent.com/google/fonts/main/${family.path}/${font.filename}`;
            return <a href={rawUrl} key={font.fullName}>{font.name}</a>;
        })*/;
        //inner = rawLinks;
        let previewText = null;
        if (family.primaryLanguage) {
            const langMeta = langList[family.primaryLanguage];
            if (langMeta.sampleText?.styles) {
                previewText = langMeta.sampleText.styles;
            }
        }
        if (previewText === null) {
            for (const lang of family.languages!) {
                const langMeta = langList[lang];
                if (langMeta.sampleText?.styles) {
                    previewText = langMeta.sampleText.styles;
                    break;
                }
            }
        }
        if (previewText === null) {
            previewText = 'The quick brown fox jumps over the lazy dog';
        }

        const previews = family.fonts.map((font, i) => {
            return <div key={font.fullName + String(i)} style={{
                fontFamily: '__loaded_' + font.name,
                fontStyle: font.style,
                fontWeight: font.weight,
            }}>{previewText}</div>;
        });
        inner = <>
            <style>{fontCss}</style>
            {previews}
        </>;
    }
    return (
        <div className={style.fontPreview}>{inner}</div>
    );
};

const FontItem = ({family, onAdd, onClick, selected}: {
    family: FamilyProto;
    onAdd: (family: FamilyProto) => void;
    onClick: (family: FamilyProto) => void;
    selected: boolean;
}) => {
    const handleAdd = useCallback((event: Event) => {
        event.stopPropagation();
        onAdd(family);
    }, [onAdd, family]);
    const handleClick = useCallback((event: Event) => {
        event.stopPropagation();
        onClick(family);
    }, [onClick, family]);

    return (
        <div className={classnames(style.fontItem, selected && style.selected)} role="listitem" onClick={handleClick}>
            <span class={style.fontName}>{family.displayName ?? family.name}</span>
            <IconButton type='plus' title='Add font' onClick={handleAdd} className={style.addFont} />
        </div>
    );
};

const FiltersPane = () => {
    const appState = useAppState();
    const {searchFilters} = appState.googleFontsModalState;

    return <div className={style.filtersPane}>
        <div className={style.filterGroup}>
            <div className={style.filterGroupTitle}>Proportion</div>
            <CheckboxToggle label="Proportional" checked={searchFilters.proportional} />
            <CheckboxToggle label="Monospace" checked={searchFilters.monospace} />
        </div>
        <div className={style.filterGroup}>
            <div className={style.filterGroupTitle}>Stroke</div>
            <CheckboxToggle label="Sans-serif" checked={searchFilters.sansSerif} />
            <CheckboxToggle label="Serif" checked={searchFilters.serif} />
        </div>
        <div className={style.filterGroup}>
            <div className={style.filterGroupTitle}>Classification</div>
            <CheckboxToggle label="Normal" checked={searchFilters.noClassification} />
            <CheckboxToggle label="Display" checked={searchFilters.display} />
            <CheckboxToggle label="Handwriting" checked={searchFilters.handwriting} />
            <CheckboxToggle label="Symbols" checked={searchFilters.symbols} />
        </div>
    </div>;
};

const GoogleFontsModal = () => {
    const appState = useAppState();
    const {googleFontsModalState} = appState;
    const addErrorToast = useAddErrorToast();

    const fontsListState = googleFontsModalState.state.value;
    if (fontsListState.state === 'not_loaded') {
        Promise.all([
            fetch(new URL('../../generated/google-fonts.json', import.meta.url))
                .then(resp => resp.json() as Promise<FamilyProto[]>),
            fetch(new URL('../../generated/languages.json', import.meta.url))
                .then(resp => resp.json() as Promise<LanguageProto[]>),
        ] as const).then(
            ([fontsList, langList]) => {
                googleFontsModalState.state.value = {state: 'loaded', fontsList, langList};
            },
            error => {
                googleFontsModalState.state.value = {state: 'error', error};
            },
        );
    }
    if (fontsListState.state === 'loading' || fontsListState.state === 'not_loaded') {
        return <Loader />;
    }
    if (fontsListState.state === 'error') {
        // TODO: pretty error display
        return String(fontsListState.error);
    }

    const onAddFont = useCallback((family: FamilyProto) => {
        for (const font of family.fonts) {
            const fontUrl = rawFontLink(family, font);
            fetch(fontUrl)
                .then(resp => resp.blob())
                .then(fontData => appState.addFonts([fontData]))
                .then(
                    null,
                    error => {
                        addErrorToast('Failed to add font from Google Fonts', error);
                    },
                );
        }
    }, [addErrorToast, appState]);
    const onSelectFont = useCallback((family: FamilyProto) => {
        googleFontsModalState.previewedFamily.value = family;
    }, [googleFontsModalState.previewedFamily]);
    const onCloseModal = useCallback(() => {
        googleFontsModalState.open.value = false;
    }, [googleFontsModalState.open]);

    const filteredFonts = useComputed(() => {
        const allFonts = fontsListState.fontsList;
        const monospace = googleFontsModalState.searchFilters.monospace.value;
        const proportional = googleFontsModalState.searchFilters.proportional.value;
        const sansSerif = googleFontsModalState.searchFilters.sansSerif.value;
        const serif = googleFontsModalState.searchFilters.serif.value;
        const noClassification = googleFontsModalState.searchFilters.noClassification.value;
        const display = googleFontsModalState.searchFilters.display.value;
        const handwriting = googleFontsModalState.searchFilters.handwriting.value;
        const symbols = googleFontsModalState.searchFilters.symbols.value;

        if (monospace && proportional && sansSerif && serif && noClassification && display && handwriting && symbols) {
            return allFonts;
        }

        /*return allFonts.filter(family => {
            if (!monospace) {
                if (!family.category.some(c => c !== 'MONOSPACE')) {
                    return false;
                }
                if (family.proportion === 'MONOSPACE') {
                    return false;
                }
                if (family.classifications?.some(c => c === 'MONOSPACE')) {
                    return false;
                }
            }
            if (!proportional) {
                if (!family.category.some(c => c === 'MONOSPACE')) {
                    return false;
                }
                if (family.proportion === 'PROPORTIONAL') {
                    return false;
                }
            }

            if (!sansSerif) {
                if (!family.category.some(c => c !== 'SANS_SERIF')) {
                    return false;
                }
                if (family.stroke === 'SANS_SERIF') {
                    return false;
                }
            }
            if (!serif) {
                if (!family.category.some(c => c !== 'SERIF')) {
                    return false;
                }
                if (family.stroke === 'SERIF' || family.stroke === 'SLAB_SERIF') {
                    return false;
                }
            }

            if (!display) {
                if (!family.category.some(c => c !== 'DISPLAY')) {
                    return false;
                }
                if (family.classifications?.some(c => c === 'DISPLAY')) {
                    return false;
                }
            }
            if (!handwriting) {
                if (!family.category.some(c => c !== 'HANDWRITING')) {
                    return false;
                }
                if (family.classifications?.some(c => c === 'HANDWRITING')) {
                    return false;
                }
            }
            if (!symbols) {
                if (family.classifications?.some(c => c === 'SYMBOLS')) {
                    return false;
                }
            }
            if (!noClassification) {
                // The family has no category that isn't "handwriting" or "display"
                if (!family.category.some(c => c === 'HANDWRITING' || c === 'DISPLAY')) {
                    return false;
                }
                if (family.classifications && !family.classifications.some(c => c !== 'MONOSPACE')) {
                    return false;
                }
            }

            return true;
        });*/
        return allFonts;
    });

    const fontNames = useMemo(() => {
        return filteredFonts.value.map(f => f.name);
    }, [filteredFonts.value]);
    const searchedFonts = useMemo(() => {
        if (googleFontsModalState.searchValue.value.length === 0) {
            return filteredFonts.value;
        }
        const searchedText = googleFontsModalState.searchValue.value;
        const [idxs, info, order] = searcher.search(fontNames, searchedText) as
            uFuzzy.RankedResult | uFuzzy.AbortedResult;
        if (!info) return filteredFonts.value;
        const filteredFontsList = filteredFonts.value;
        const searchResults = order.map(i => filteredFontsList[idxs[i]]);
        return searchResults;
    }, [googleFontsModalState.searchValue.value, filteredFonts.value]);

    const fontsList = useMemo(() => searchedFonts.map(
        (font, i) => <FontItem
            key={i}
            family={font}
            onAdd={onAddFont}
            onClick={onSelectFont}
            selected={font === googleFontsModalState.previewedFamily.value}
        />), [fontsListState, searchedFonts, googleFontsModalState.previewedFamily.value]);
    const fontPreview = useMemo(() =>
        <FontPreview family={googleFontsModalState.previewedFamily.value} langList={fontsListState.langList} />,
    [googleFontsModalState.previewedFamily.value]);

    return <Modal onClose={onCloseModal} className={style.fontsModal}>
        <div className={style.searchBarWrapper}>
            <TextBox
                value={googleFontsModalState.searchValue}
                placeholder='Search...'
            />
        </div>
        <div className={style.panes}>
            <FiltersPane />
            <div className={style.fontsList}>
                {fontsList}
            </div>
            {fontPreview}
        </div>
    </Modal>;
};

export default GoogleFontsModal;
