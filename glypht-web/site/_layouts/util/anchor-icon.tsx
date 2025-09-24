import type {SimpleThemeContext} from './context';
import type {Reflection} from 'typedoc';

// Placeholder for i18n
const i18n = {
    theme_permalink: () => 'Permalink',
};

export function anchorIcon(context: SimpleThemeContext, anchor: string | undefined) {
    if (!anchor) return <></>;

    return (
        <a href={`#${anchor}`} aria-label={i18n.theme_permalink()} class='tsd-anchor-icon'>
            {context.icons.anchor()}
        </a>
    );
}

export function anchorTargetIfPresent(context: SimpleThemeContext, refl: Reflection) {
    return context.router.hasUrl(refl) ? context.router.getAnchor(refl) : undefined;
}
