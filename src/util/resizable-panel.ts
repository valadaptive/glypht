import {Signal, useSignal} from '@preact/signals';
import {useCallback, useRef} from 'preact/hooks';

export const useResizablePanel = (
    initialSize: number,
    minSize: number,
    maxSize: number,
    direction: 'horizontal' | 'vertical',
):  {
        resizerRef: (element: HTMLElement | null) => void;
        panelRef: (element: HTMLElement | null) => void;
        panelSize: Signal<number>;
    } => {
    const panelSize = useSignal(initialSize);
    const ac = useRef<AbortController>(null);
    const panel = useRef<HTMLElement | null>(null);
    const panelRef = useCallback((element: HTMLElement | null) => {
        panel.current = element;
    }, [panelSize]);

    const refCallback = useCallback((element: HTMLElement | null) => {
        if (ac.current) {
            ac.current.abort();
            ac.current = null;
        }
        if (!element) return;
        const abortController = new AbortController();
        ac.current = abortController;
        let onMouseMove: (event: MouseEvent) => void, onMouseUp: (event: MouseEvent) => void;
        const onMouseDown = (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
            const startPos = direction === 'vertical' ? event.clientY : event.clientX;
            const rect = panel.current?.getBoundingClientRect();
            if (!rect) return;
            const startSize = direction === 'vertical' ? rect.height : rect.width;
            onMouseMove = (moveEvent: MouseEvent) => {
                moveEvent.preventDefault();
                moveEvent.stopPropagation();
                const delta = (direction === 'vertical' ? moveEvent.clientY : moveEvent.clientX) - startPos;
                const newSize = startSize - delta;
                if (newSize >= minSize && newSize <= maxSize) {
                    panelSize.value = newSize;
                }
            };
            onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            document.addEventListener('mousemove', onMouseMove, {signal: abortController.signal});
            document.addEventListener('mouseup', onMouseUp, {signal: abortController.signal});
        };

        if (element) {
            element.addEventListener('mousedown', onMouseDown);
        }
    }, [minSize, maxSize, panelSize]);

    return {
        resizerRef: refCallback,
        panelRef,
        panelSize: panelSize,
    };
};

export default useResizablePanel;
