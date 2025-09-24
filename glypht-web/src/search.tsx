import {ComponentChild, JSX, render} from 'preact';
import {useRef} from 'preact/hooks';
import {useSignal, useComputed, useSignalEffect, signal, Signal} from '@preact/signals';

// pagefind-web is aliased to a relative import path, resolved by just copying the JS in via Eleventy. It seems to be
// the only way to get TypeScript to recognize the tyoe declarations, even though it kinda sucks.
import type * as pagefind from 'pagefind-web';

const SearchResults = ({results, resultsPerPage}: {
    results: Signal<pagefind.PagefindIndexesSearchResults | null>;
    resultsPerPage: number;
}) => {
    const page = useSignal(1);

    const prevResults = useRef<pagefind.PagefindIndexesSearchResults | null>(null);
    const renderedResults = useSignal<ComponentChild | null>(null);

    useSignalEffect(() => {
        if (!results.value) return;

        const resetPage = prevResults.current !== results.value;
        prevResults.current = results.value;
        void page.value;
        const curPage = resetPage ? 1 : page.value;
        const rangeStart = (curPage - 1) * resultsPerPage;
        const rangeEnd = curPage * resultsPerPage;

        const searchFragments = Promise.all(
            results.value.results.slice(rangeStart, rangeEnd)
                .map(result => result.data().then(data => ({result, data}))),
        );
        void searchFragments.then(searchFragments => {
            if (searchFragments.length === 0) {
                renderedResults.value = <div class="search-no-results">No results</div>;
                if (resetPage) page.value = 0;
                return;
            }
            if (resetPage) {
                page.value = 1;
            }
            renderedResults.value = searchFragments.map(({result, data}) => {
                const hasRootSubResult = data.sub_results[0]?.url === (data.meta?.url || data.url);
                const subResults = hasRootSubResult ? data.sub_results.slice(1, 4) : data.sub_results.slice(0, 3);

                return (
                    <a class="search-result" key={result.id} href={data.url}>
                        <header class="result-title">{data.meta.title ?? 'No Title'}</header>
                        <div class="result-excerpt" dangerouslySetInnerHTML={{__html: data.excerpt}} />
                        {subResults.map(subResult => {
                            return (
                                <a className="search-sub-result" href={subResult.url}>
                                    <header class="sub-result-title">{subResult.title}</header>
                                    <div
                                        class="sub-result-excerpt"
                                        dangerouslySetInnerHTML={{__html: subResult.excerpt}}
                                    />
                                </a>
                            );
                        })}
                    </a>
                );
            });
        });
    });

    const numPages = results.value ? Math.ceil(results.value.results.length / resultsPerPage) : 0;

    const prevPage = useComputed(() => () => {
        if (page.value > 1) page.value--;
    });

    const nextPage = useComputed(() => () => {
        if (page.value < numPages) page.value++;
    });

    const setPageFromEvent = useComputed(() => (event: JSX.TargetedEvent<HTMLInputElement>) => {
        const numValue = Number(event.currentTarget.value);
        if (!Number.isFinite(numValue)) {
            return;
        }
        page.value = Math.max(1, Math.min(numValue, numPages));
    });

    if (!results.value) return null;

    return (
        <div class="search-results">
            <div class="pagination">
                <button
                    class="icon-button arrow-left"
                    onClick={prevPage.value}
                    disabled={page.value <= 1}
                    title="Previous page"
                />
                <input
                    type="number"
                    class="search-results-page-input"
                    value={page.value}
                    onChange={setPageFromEvent.value}
                    disabled={numPages === 0}
                />
                <span> of {numPages}</span>
                <button
                    class="icon-button arrow-right"
                    onClick={nextPage.value}
                    disabled={page.value >= numPages}
                    title="Next page"
                />
            </div>
            <div class="search-results-list">
                {renderedResults.value}
            </div>
        </div>
    );
};

function main() {
    const searchInput = document.getElementById('search-input') as HTMLInputElement;

    let initializing = false;
    let initialized = false;
    let pagefindPromise: Promise<typeof pagefind>;
    const getAndInitPagefind = async() => {
        if (initializing) return pagefindPromise;
        initializing = true;

        const oldPlaceholder = searchInput.getAttribute('placeholder');
        // Display a loading animation (see CSS) while we wait for Pagefind. We wait 100ms beforehand so that on faster
        // connections, we don't show a distractingly-short flicker of text.
        setTimeout(() => {
            if (initialized) return;
            searchInput.setAttribute('placeholder', 'Loading...');
            searchInput.classList.add('loading');
        }, 100);

        pagefindPromise = import('pagefind-web').then(async pagefind => {
            await pagefind.init();
            // pagefind.init() doesn't wait for the WASM to load. Only remove the loading bar when it's loaded.
            void pagefind.preload('').then(() => {
                searchInput.setAttribute('placeholder', oldPlaceholder!);
                searchInput.classList.remove('loading');
            });

            initialized = true;
            return pagefind;
        });

        return pagefindPromise;
    };

    // We want to create a fixed-position container for the search results that spans from below the navbar to the
    // bottom of the screen. There doesn't seem to be any way to do that other than manually calculating the navbar's
    // height.
    const searchResultsContainer = document.getElementById('search-results-container')!;
    const observer = new ResizeObserver(([navbar]) => {
        searchResultsContainer.style.top = `${navbar.borderBoxSize[0].blockSize}px`;
    });
    observer.observe(document.getElementById('navigation-bar')!);

    const resultsSignal = signal<pagefind.PagefindIndexesSearchResults | null>(null);


    searchInput.addEventListener('input', event => {
        updateSearchClear();
        const text = (event.currentTarget as HTMLInputElement).value;
        if (!text) {
            resultsSignal.value = null;
            return;
        }
        void getAndInitPagefind()
            .then(pagefind =>  pagefind.debouncedSearch(text))
            .then(results => {
                if (results) {
                    resultsSignal.value = results;
                }
            });
    });


    searchInput.addEventListener('focus', () => {
        void getAndInitPagefind();
    }, {once: true});

    // The search bar in the HTML is disabled until this JS loads.
    searchInput.removeAttribute('disabled');

    // Clear previous form values (Firefox preserves them across reloads)
    searchInput.value = '';

    // On mobile, the search bar is hidden behind a toggle button. If the search area has the "open" class, we replace
    // the navbar with the search area. On desktop, the "open" class does nothing.
    const searchOpenButton = document.getElementById('search-open')!;
    const searchArea = document.getElementById('search-area')!;
    searchOpenButton.addEventListener('click', () => {
        if (searchArea.classList.contains('open')) {
            searchArea.classList.remove('open');
        } else {
            searchArea.classList.add('open');
            searchInput.focus();
        }
        updateSearchClear();
    });

    const searchClearButton = document.getElementById('search-clear')!;
    searchClearButton.addEventListener('click', () => {
        searchInput.value = '';
        resultsSignal.value = null;
        searchArea.classList.remove('open');
        updateSearchClear();
    });

    // Update whether the search clear button is visible. Since the search clear button is the only way to close the
    // search bar and get back to the navbar on mobile, if the search area has the "open" class, we show the clear
    // button regardless of whether there's any text in the search bar.
    const updateSearchClear = () => {
        if (searchArea.classList.contains('open') || searchInput.value.length > 0) {
            searchClearButton.classList.add('active');
        } else {
            searchClearButton.classList.remove('active');
        }
    };
    updateSearchClear();

    render(
        <SearchResults results={resultsSignal} resultsPerPage={5} />,
        searchResultsContainer,
    );
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}
