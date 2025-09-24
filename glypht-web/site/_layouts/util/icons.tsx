import type {JSX as PreactJSX} from 'preact';
import {ReflectionKind} from 'typedoc';
import type {IconType} from '../../../src/components/Icon/Icon';

// Icon mapping from TypeDoc icons to your icon system
const iconMapping: Record<string, IconType> = {
    chevronDown: 'arrow-down',
    chevronSmall: 'arrow-down',
    menu: 'stack',
    search: 'search',
    anchor: 'link',
    folder: 'stack',
    checkbox: 'check',
    // Note: Your current icon set doesn't have specific icons for reflection kinds,
    // so we'll use generic icons or add them as needed
};

// TypeDoc uses ReflectionKind enum values as icon keys
const reflectionKindIconMapping: Partial<Record<ReflectionKind, IconType>> = {
    [ReflectionKind.Accessor]: 'gear',
    [ReflectionKind.CallSignature]: 'arrow-right',
    [ReflectionKind.Class]: 'stack',
    [ReflectionKind.Constructor]: 'plus',
    [ReflectionKind.ConstructorSignature]: 'plus',
    [ReflectionKind.Enum]: 'stack',
    [ReflectionKind.EnumMember]: 'arrow-right',
    [ReflectionKind.Function]: 'arrow-right',
    [ReflectionKind.GetSignature]: 'arrow-right',
    [ReflectionKind.IndexSignature]: 'arrow-right',
    [ReflectionKind.Interface]: 'stack',
    [ReflectionKind.Method]: 'arrow-right',
    [ReflectionKind.Module]: 'stack',
    [ReflectionKind.Namespace]: 'stack',
    [ReflectionKind.Parameter]: 'arrow-right',
    [ReflectionKind.Project]: 'stack',
    [ReflectionKind.Property]: 'arrow-right',
    [ReflectionKind.Reference]: 'link',
    [ReflectionKind.SetSignature]: 'arrow-right',
    [ReflectionKind.TypeAlias]: 'arrow-right',
    [ReflectionKind.TypeLiteral]: 'stack',
    [ReflectionKind.TypeParameter]: 'arrow-right',
    [ReflectionKind.Variable]: 'arrow-right',
    [ReflectionKind.Document]: 'stack',
};

// Alert icon mappings
const alertIconMapping: Record<string, IconType> = {
    alertNote: 'stack',
    alertTip: 'check',
    alertImportant: 'warning',
    alertWarning: 'warning',
    alertCaution: 'error',
};

/**
 * Creates an icon function compatible with TypeDoc's icon system
 */
function createIconFunction(iconType: IconType, title?: string): () => PreactJSX.Element {
    return () => (
        <div
            class={`icon icon-${iconType}`}
            title={title || undefined}
        />
    );
}

/**
 * Creates a dummy icon for missing/unsupported icons
 */
function createDummyIcon(): () => PreactJSX.Element {
    return () => (
        <span
            class="tsd-kind-icon"
            style={{
                display: 'inline-block',
                width: '24px',
                height: '24px',
            }}
        />
    );
}

/**
 * TypeDoc-compatible icon provider that uses your existing icon system
 */
export function createTypeDocIcons() {
    const icons: Record<string, () => PreactJSX.Element> = {};

    // Add standard icons
    Object.entries(iconMapping).forEach(([key, iconType]) => {
        icons[key] = createIconFunction(iconType);
    });

    // Add alert icons
    Object.entries(alertIconMapping).forEach(([key, iconType]) => {
        icons[key] = createIconFunction(iconType);
    });

    // Add reflection kind icons
    Object.entries(reflectionKindIconMapping).forEach(([kind, iconType]) => {
        if (iconType) {
            icons[kind] = createIconFunction(iconType);
        }
    });

    // Add missing icons as dummies for now
    const requiredIcons = [
        'chevronDown', 'checkbox', 'menu', 'search', 'chevronSmall', 'anchor', 'folder',
        'alertNote', 'alertTip', 'alertImportant', 'alertWarning', 'alertCaution',
    ];

    requiredIcons.forEach(key => {
        if (!icons[key]) {
            icons[key] = createDummyIcon();
        }
    });

    // Ensure all reflection kinds have icons
    Object.values(ReflectionKind).forEach(kind => {
        if (typeof kind === 'number' && !icons[kind]) {
            icons[kind] = createDummyIcon();
        }
    });

    return icons;
}
