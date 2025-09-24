import type {DeclarationReflection, SignatureReflection, SourceReference} from 'typedoc';
import type {JSX} from 'preact';
import {SimpleThemeContext} from './context';
import {typeAndParent} from './typeAndParent';

// Placeholder for i18n
const i18n = {
    theme_defined_in: () => 'Defined in',
    theme_implementation_of: () => 'Implementation of',
    theme_inherited_from: () => 'Inherited from',
    theme_overrides: () => 'Overrides',
};

function sourceLink(context: SimpleThemeContext, item: SourceReference) {
    if (!item.url) {
        return (
            <li>
                {i18n.theme_defined_in()} {item.fileName}:{item.line}
            </li>
        );
    }

    if (context.options.sourceLinkExternal) {
        return (
            <li>
                {i18n.theme_defined_in()}{' '}
                <a href={item.url} class='external' target='_blank'>
                    {item.fileName}:{item.line}
                </a>
            </li>
        );
    }

    return (
        <li>
            {i18n.theme_defined_in()}{' '}
            <a href={item.url}>
                {item.fileName}:{item.line}
            </a>
        </li>
    );
}

export const memberSources = (
    context: SimpleThemeContext,
    props: SignatureReflection | DeclarationReflection,
) => {
    const sources: JSX.Element[] = [];

    if (props.implementationOf) {
        sources.push(
            <p>
                {i18n.theme_implementation_of()} {typeAndParent(context, props.implementationOf)}
            </p>,
        );
    }
    if (props.inheritedFrom) {
        sources.push(
            <p>
                {i18n.theme_inherited_from()} {typeAndParent(context, props.inheritedFrom)}
            </p>,
        );
    }
    if (props.overwrites) {
        sources.push(
            <p>
                {i18n.theme_overrides()} {typeAndParent(context, props.overwrites)}
            </p>,
        );
    }
    if (props.sources?.length) {
        sources.push(<ul>{props.sources.map((item) => sourceLink(context, item))}</ul>);
    }

    if (sources.length === 0) {
        return <></>;
    }

    return <aside class='tsd-sources'>{sources}</aside>;
};
