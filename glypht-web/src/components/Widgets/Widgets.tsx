import style from './style.module.scss';
import slider from './slider.module.scss';

import type {ComponentChildren, JSX, Ref} from 'preact';
import {useCallback, useEffect, useId, useLayoutEffect, useRef, useMemo} from 'preact/hooks';
import {computed, useSignal, type Signal} from '@preact/signals';
import classNames from 'clsx';
import Icon, {IconType} from '../Icon/Icon';
import type {ButtonHTMLAttributes, InputHTMLAttributes, TargetedEvent} from 'preact/compat';
import {Motif} from '../../util/motif';
import useFloating from '../../util/floating';
import {flip, offset, shift, size} from '@floating-ui/dom';
import uFuzzy from '@leeoniya/ufuzzy';
import {Overlay} from '../Overlay/Overlay';

export const Dropdown = <T extends string | number>({value, options, className, disabled}: {
    value: Signal<T>;
    options: readonly {
        id: T;
        name: string;
    }[];
    className?: string;
    disabled?: boolean;
}): JSX.Element => {
    const handleChange = useCallback((event: Event) => {
        const select = event.target as HTMLSelectElement;
        if (select.selectedIndex !== -1) {
            value.value = options[select.selectedIndex].id;
        }
    }, [value, options]);

    return (
        <div className={classNames(style.selectWrapper, className)}>
            <select className={style.select} onChange={handleChange} disabled={disabled}>
                {options.map(({id, name}) => (
                    <option value={id} key={id} selected={id === value.value}>{name}</option>
                ))}
            </select>
        </div>
    );
};

export const SpinBox = ({value, min, max, step = 1, smartAim = 0, className}: {
    value: Signal<number>;
    min: number;
    max: number;
    step?: number | 'any';
    smartAim?: number;
    className?: string;
}): JSX.Element => {
    const handleInput = useCallback((event: Event) => {
        const newValue = Number((event.target as HTMLInputElement).value);
        value.value = newValue;
    }, [value]);

    const handleDrag = useCallback((event: Event) => {
        event.preventDefault();
    }, []);

    const increment = useCallback(() => {
        value.value = Math.min(value.value + (step === 'any' ? 1 : step), max);
    }, [value, step]);

    const decrement = useCallback(() => {
        value.value = Math.max(value.value - (step === 'any' ? 1 : step), min);
    }, [value, step]);

    const spinboxId = useId();

    const isEditing = useSignal(false);

    const pointerListeners = useRef<{
        move: (event: PointerEvent) => unknown;
        up: (event: PointerEvent) => unknown;
    } | null>(null);
    useEffect(() => {
        return () => {
            if (pointerListeners.current) {
                window.removeEventListener('pointermove', pointerListeners.current.move);
                window.removeEventListener('pointerup', pointerListeners.current.up);
            }
        };
    }, []);

    // Drag up/down to change the value
    const deadZone = useRef({bottom: 0, top: 0});
    const valueStart = useRef(0);
    const isDragging = useRef(false);
    const handlePointerDown = useCallback((event: TargetedEvent<HTMLInputElement, PointerEvent>) => {
        // Don't count up/down drags if the cursor is inside the spinbox
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        deadZone.current = {bottom: rect.bottom, top: rect.top};
        valueStart.current = value.value;

        const onMove = (event: PointerEvent) => {
            let mouseDelta = 0;
            if (event.clientY < deadZone.current.top) {
                mouseDelta = event.clientY - deadZone.current.top;
            } else if (event.clientY > deadZone.current.bottom) {
                mouseDelta = event.clientY - deadZone.current.bottom;
            }
            isDragging.current = mouseDelta !== 0;
            if (!isDragging.current) return;

            document.getSelection()?.empty();

            // 200px (in either direction; it's the "radius", not "diameter") for the slider to go from min to max
            const valueDelta = mouseDelta * (max - min) / 200;

            const newValue = valueStart.current - valueDelta;
            const clampedValue = Math.max(min, Math.min(newValue, max));
            let roundedValue = step === 'any' ? clampedValue : Math.round(clampedValue / step) * step;
            if (smartAim > 0) {
                const roundedToAim = Math.round(newValue / smartAim) * smartAim;
                if (Math.abs(roundedToAim - newValue) < smartAim / 4) {
                    roundedValue = Math.max(min, Math.min(roundedToAim, max));
                }
            }
            value.value = roundedValue;
        };

        const onUp = () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        };
        pointerListeners.current = {move: onMove, up: onUp};

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
    }, [min, max, value]);

    const handleFocus = useCallback(() => {
        isEditing.value = true;
    }, [isEditing]);
    const handleBlur = useCallback(() => {
        isEditing.value = false;
        // Ensure the value is clamped to min/max when editing ends
        value.value = Math.max(min, Math.min(value.value, max));
    }, [isEditing, value, min, max]);
    const onCreateInput = useCallback((elem: HTMLInputElement | null) => {
        elem?.focus();
    }, []);

    const valueText = Number(value.value.toFixed(12)).toString();

    return (
        <div className={classNames(style.spinboxWrapper, className)}>
            {isEditing.value ? <input
                className={style.spinboxField}
                type="number"
                min={min}
                max={max}
                step={step}
                value={Number(value.value.toFixed(12))}
                onInput={handleInput}
                id={spinboxId}
                onBlur={handleBlur}
                ref={onCreateInput}
            /> :
                <div
                    className={classNames(style.spinboxDisplay, 'tabular-nums')}
                    onInput={handleInput}
                    onDragCapture={handleDrag}
                    id={spinboxId}
                    onPointerDown={handlePointerDown}
                    tabIndex={0}
                    onFocus={handleFocus}
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuenow={value.value}
                    aria-valuetext={valueText}
                    role='spinbutton'
                >{valueText}</div>}
            <div className={style.spinboxButtons}>
                <div
                    onClick={increment}
                    className={style.spinboxButton}
                    role="button"
                    aria-controls={spinboxId}
                    aria-label="Increment"
                >
                    <div className={style.spinboxUp} />
                </div>
                <div className={style.spinboxButtonDivider} />
                <div
                    onClick={decrement}
                    className={style.spinboxButton}
                    role="button"
                    aria-controls={spinboxId}
                    aria-label="Decrement"
                >
                    <div className={style.spinboxDown} />
                </div>
            </div>
        </div>
    );
};

export const Slider = ({value, min, max, step = 1, className}: {
    value: Signal<number>;
    min: number;
    max: number;
    step?: number | 'any';
    className?: string;
}): JSX.Element => {
    const sliderInput = useRef<HTMLInputElement>(null);
    const handleInput = useCallback((event: Event) => {
        const newValue = Number((event.target as HTMLInputElement).value);
        value.value = newValue;
    }, [value]);

    useLayoutEffect(() => {
        const slider = sliderInput.current!;
        slider.style.setProperty('--min', String(min));
        slider.style.setProperty('--max', String(max));
        slider.style.setProperty('--val', String(value.value));
    }, [value.value, min, max]);

    return (
        <input
            className={classNames(slider.slider, className)}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value.value}
            onInput={handleInput}
            ref={sliderInput}
        />
    );
};

export const ToggleIcon = ({type, title, toggled, innerRef, className}: {
    type: IconType;
    title: string;
    toggled: Signal<boolean>;
    innerRef?: Ref<HTMLButtonElement>;
    className?: string;
}) => {
    const handleClick = useCallback(() => {
        toggled.value = !toggled.value;
    }, [toggled]);
    return (
        <button
            className={classNames(style.iconButton, style.toggleIcon, toggled.value && style.toggledOn, className)}
            onClick={handleClick}
            role="checkbox"
            aria-checked={toggled.value}
            title={title}
            ref={innerRef}
            tabindex={0}
        >
            <Icon type={type} title={title} />
        </button>
    );
};

// eslint-disable-next-line @stylistic/comma-dangle
export const SelectableIcon = <const T, >({type, title, currentValue, value}: {
    type: IconType;
    title: string;
    currentValue: Signal<T>;
    value: T;
}) => {
    const handleClick = useCallback(() => {
        currentValue.value = value;
    }, [currentValue]);
    return (
        <button
            className={classNames(
                style.iconButton,
                style.toggleIcon,
                {[style.toggledOn]: currentValue.value === value},
            )}
            onClick={handleClick}
            role="radio"
            aria-checked={currentValue.value === value}
            title={title}
            tabindex={0}
        >
            <Icon type={type} title={title} />
        </button>
    );
};

export const CheckboxToggle = ({label, title, checked, disabled, indeterminate, className}: {
    label: string;
    title?: string | null;
    checked: Signal<boolean>;
    disabled?: boolean;
    indeterminate?: boolean;
    className?: string;
}) => {
    const handleInput = useCallback((event: TargetedEvent<HTMLInputElement>) => {
        event.preventDefault();
        checked.value = event.currentTarget.checked;
    }, [checked]);

    const preventSelection = useCallback((event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    return (
        <label
            className={classNames(style.checkboxToggle, disabled && style.disabled, className)}
            title={title ?? undefined}
            aria-disabled={disabled}
        >
            <input
                type="checkbox"
                checked={checked.value}
                onInput={handleInput}
                disabled={disabled}
                indeterminate={indeterminate}
            />
            <span className={style.checkboxLabel} onMouseDown={preventSelection}>{label}</span>
        </label>
    );
};

export const TextBox = ({
    value,
    small,
    className,
    ...props
}: {value: Signal<string>; small?: boolean} & InputHTMLAttributes) => {
    const updateTextbox = useCallback((event: TargetedEvent<HTMLInputElement>) => {
        value.value = event.currentTarget.value;
    }, [value]);

    return (
        <input
            type="text"
            className={classNames(className, small && style.small)}
            {...props}
            value={value}
            onInput={updateTextbox}
        />
    );
};

export const Button = ({children, className, ...props}: {children: ComponentChildren} & ButtonHTMLAttributes) => {
    return (
        <button {...props} className={classNames(style.button, className)}>
            <span className={style.buttonContents}>
                {children}
            </span>
        </button>
    );
};

export const CollapsibleHeader = ({collapsed, bodyId, children, auxiliaryItems, className}: {
    collapsed: Signal<boolean>;
    bodyId: string;
    children: ComponentChildren;
    auxiliaryItems?: ComponentChildren;
    className?: string;
}) => {
    const toggleCollapsed = useCallback(() => {
        collapsed.value = !collapsed.value;
    }, [collapsed]);

    return (
        <header className={className}>
            <button
                className={style.collapsibleHeaderTitle}
                aria-expanded={collapsed.value ? 'false' : 'true'}
                aria-controls={bodyId}
                onClick={toggleCollapsed}
            >
                <Icon type={collapsed.value ? 'arrow-right' : 'arrow-down'} title={null} motif={Motif.MONOCHROME} />
                <span className={style.collapsibleHeaderTitleText}>
                    {children}
                </span>
            </button>
            {auxiliaryItems}
        </header>
    );
};

const searcher = new uFuzzy({});

export const SearchableCheckboxDropdown = <T extends string | number>({
    options,
    selectedOptions,
    placeholder = 'Search...',
    className,
    id,
    renderOption,
}: {
    options: Array<{
        id: T;
        name: string;
        searchable?: string;
    }>;
    selectedOptions: Record<T, Signal<boolean>>;
    placeholder?: string;
    className?: string;
    id?: string;
    renderOption?: (option: {id: T; name: string; searchable?: string}) => ComponentChildren;
}) => {
    const isOpen = useSignal(false);
    const searchValue = useSignal('');
    const buttonRef = useRef<HTMLButtonElement>(null);

    const {reference, floating} = useFloating(() => ({
        placement: 'bottom-start',
        middleware: [
            offset(4),
            shift({padding: 8}),
            size({
                apply({availableHeight, elements}) {
                    const {floating, reference} = elements;
                    floating.style.width = `${reference.getBoundingClientRect().width}px`;
                    floating.style.maxHeight = `${Math.max(availableHeight - 8, 320)}px`;
                },
                padding: 8,
            }),
            flip(),
        ],
    }));
    const setButtonRef = useCallback((button: HTMLButtonElement | null) => {
        reference(button);
        buttonRef.current = button;
    }, []);

    const optionNames = useMemo(() => options.map(option => option.searchable ?? option.name), [options]);

    // Filter options based on search
    const filteredOptions = useMemo(() => {
        if (!searchValue.value) return options;

        const [idxs, info, order] = searcher.search(optionNames, searchValue.value) as
            uFuzzy.RankedResult | uFuzzy.AbortedResult;
        if (!info) return options;
        const searchResults = order.map(i => options[idxs[i]]);
        return searchResults;
    }, [options, searchValue.value]);

    // Get selected options for display
    const selectedItemsText = useMemo(() => {
        return computed(() => {
            const optionsText = [];
            for (const option of options) {
                if (selectedOptions[option.id].value) {
                    optionsText.push(option.name);
                }
            }
            return optionsText.length === 0 ? null : optionsText.join(', ');
        });
    }, [options, selectedOptions]);

    const focusSearchInput = useCallback((searchInput: HTMLInputElement | null) => {
        if (searchInput) searchInput.focus();
    }, []);

    const handleToggleDropdown = useCallback(() => {
        isOpen.value = !isOpen.value;
        if (!isOpen.value) {
            // Clear search when closing
            searchValue.value = '';
        }
    }, [isOpen, searchValue]);

    const handleSearchChange = useCallback((event: TargetedEvent<HTMLInputElement>) => {
        const input = event.currentTarget;
        searchValue.value = input.value;
    }, [searchValue]);

    const handleOptionToggle = useCallback((optionId: T) => {
        const signal = selectedOptions[optionId];
        signal.value = !signal.value;
    }, [selectedOptions]);

    const handleFocusOut = useCallback((event: TargetedEvent<HTMLDivElement, FocusEvent>) => {
        if (!event.relatedTarget || (
            event.relatedTarget !== buttonRef.current &&
            event.currentTarget?.contains(event.relatedTarget as HTMLElement) === false
        )) {
            isOpen.value = false;
            searchValue.value = '';
        }
    }, []);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            isOpen.value = false;
            searchValue.value = '';
            buttonRef.current?.focus();
        }
    }, [isOpen, searchValue]);

    useEffect(() => {
        if (isOpen.value) {
            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen.value, handleKeyDown]);

    const buttonText = selectedItemsText.value ?? placeholder;

    return (
        <div className={classNames(style.searchableDropdownWrapper, className)} id={id}>
            <button
                ref={setButtonRef}
                className={classNames(style.searchableDropdownButton, isOpen.value && style.open)}
                onClick={handleToggleDropdown}
                type="button"
                role="select"
            >
                <span
                    className={style.searchableDropdownButtonText}
                    title={selectedItemsText.value ?? undefined}
                >{buttonText}</span>
                <Icon
                    type={isOpen.value ? 'arrow-up' : 'arrow-down'}
                    title=""
                    className={style.searchableDropdownArrow}
                />
            </button>

            {isOpen.value && (
                <Overlay>
                    <div
                        ref={floating}
                        className={style.searchableDropdownPanel}
                        onFocusOut={handleFocusOut}
                        tabIndex={0}
                        role="menu"
                    >
                        <div className={style.searchableDropdownSearch}>
                            <input
                                ref={focusSearchInput}
                                type="text"
                                placeholder="Search..."
                                role="searchbox"
                                value={searchValue.value}
                                onInput={handleSearchChange}
                                className={style.searchableDropdownSearchInput}
                            />
                        </div>
                        <div className={style.searchableDropdownOptions}>
                            {filteredOptions.map((option: {id: T; name: string; searchable?: string}) => (
                                <label
                                    key={option.id}
                                    className={style.searchableDropdownOption}
                                    onClick={(e) => e.stopPropagation()}
                                    role="menuitem"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions[option.id]?.value || false}
                                        onChange={() => handleOptionToggle(option.id)}
                                        className={style.searchableDropdownCheckbox}
                                    />
                                    <span className={style.searchableDropdownOptionText}>
                                        {renderOption ? renderOption(option) : option.name}
                                    </span>
                                </label>
                            ))}
                            {filteredOptions.length === 0 && (
                                <div className={style.searchableDropdownNoResults}>
                                    No results found
                                </div>
                            )}
                        </div>
                    </div>
                </Overlay>
            )}
        </div>
    );
};
