import {useSignal} from '@preact/signals';
import {useCallback, useRef} from 'preact/hooks';

const useVirtualList = <T>({items, itemHeight, extraItems = 0}: {
    items: T[];
    itemHeight: number;
    extraItems?: number;
}) => {
    const virtualItems = useSignal<{item: T; index: number}[]>([]);
    const listenerState = useRef<{
        observer: ResizeObserver;
        listener: () => unknown;
        container: HTMLElement;
    } | null>(null);

    const parentRef = useCallback((container: HTMLElement | null) => {
        if (listenerState.current) {
            const {observer, listener, container} = listenerState.current;
            observer.unobserve(container);
            container.removeEventListener('scroll', listener);
            listenerState.current = null;
        }
        if (!container) return;

        const rerender = () => {
            const offset = container.scrollTop;
            const height = container.clientHeight;
            const start = Math.max(0, Math.floor((offset / itemHeight)) - extraItems);
            const end = Math.min(Math.ceil((offset + height) / itemHeight) + extraItems, items.length);

            const newItems = [];
            for (let i = start; i < end; i++) {
                newItems.push({item: items[i], index: i});
            }
            virtualItems.value = newItems;
        };

        const ro = new ResizeObserver(() => {
            rerender();
        });

        const scrollListener = () => {
            rerender();
        };

        ro.observe(container);
        container.addEventListener('scroll', scrollListener);
        listenerState.current = {
            observer: ro,
            listener: scrollListener,
            container,
        };
    }, [items, itemHeight]);

    return {parentRef, items: virtualItems};
};

export default useVirtualList;
