import {Signal, useSignal} from '@preact/signals';

export const useLiveSignal = <T>(value: T): Signal<T> => {
    const s = useSignal(value);
    if (s.peek() !== value) s.value = value;
    return s;
};
