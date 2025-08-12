import {useSignal} from '@preact/signals';
import {useCallback} from 'preact/hooks';

const useVirtualList = <T>({items, itemHeight, extraItems = 0}: {
    items: T[];
    itemHeight: number;
    extraItems?: number;
}) => {
    const virtualItems = useSignal<{item: T; index: number}[]>([]);

    const parentRef = useCallback((container: HTMLElement | null) => {
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
        return () => {
            ro.unobserve(container);
            container.removeEventListener('scroll', scrollListener);
        };
    }, [items, itemHeight]);

    return {parentRef, items: virtualItems};
};

export default useVirtualList;
