import style from './style.module.scss';

import type {JSX} from 'preact';
import classNames from 'clsx';

import {Motif} from '../../util/motif';

export type IconType =
    | 'arrow-down'
    | 'arrow-right'
    | 'check'
    | 'close'
    | 'copy'
    | 'download'
    | 'error'
    | 'gear'
    | 'github'
    | 'paste'
    | 'pin'
    | 'plus'
    | 'range'
    | 'reset'
    | 'stack'
    | 'upload'
    | 'warning';

const Icon = ({type, title, size, motif, className, noPointer, clickableStyle}: {
    type: IconType;
    title: string | null;
    size?: string | number;
    motif?: Motif;
    className?: string;
    noPointer?: boolean;
    clickableStyle?: boolean;
}): JSX.Element => {
    const cssSize = typeof size === 'string' ? size : typeof size === 'number' ? `${size}px` : undefined;
    const inlineStyle = cssSize ? {
        width: cssSize,
        height: cssSize,
    } : undefined;
    return (
        <div
            className={classNames(
                style.icon,
                style[type],
                {
                    [style.motifPrimary]: motif === Motif.PRIMARY,
                    [style.motifSuccess]: motif === Motif.SUCCESS,
                    [style.motifWarning]: motif === Motif.WARNING,
                    [style.motifError]: motif === Motif.ERROR,
                    [style.motifMonochrome]: motif === Motif.MONOCHROME,
                    [style.noPointer]: noPointer,
                    [style.clickable]: clickableStyle,
                },
                className,
            )}
            style={inlineStyle}
            title={title ?? undefined}
        />
    );
};

export default Icon;

export const IconButton = ({
    type,
    title,
    size,
    onClick,
    disabled,
    motif,
    className,
}: {
    type: IconType;
    title: string;
    size?: string | number;
    onClick?: (event: MouseEvent) => unknown;
    disabled?: boolean;
    motif?: Motif;
    className?: string;
}): JSX.Element => {
    return (
        <button
            className={classNames(
                style.iconButton,
                {
                    [style.disabled]: disabled,
                    [style.motifPrimary]: motif === Motif.PRIMARY,
                    [style.motifSuccess]: motif === Motif.SUCCESS,
                    [style.motifWarning]: motif === Motif.WARNING,
                    [style.motifError]: motif === Motif.ERROR,
                    [style.motifMonochrome]: motif === Motif.MONOCHROME,
                },
                className,
            )}
            onClick={disabled ? undefined : onClick}
            title={title}
            disabled={disabled}
            tabIndex={0}
        >
            <Icon
                type={type}
                title={null}
                size={size}
                motif={motif}
                noPointer={true}
            />
        </button>
    );
};
