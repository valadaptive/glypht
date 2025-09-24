import {SimpleThemeContext} from './context';
import {classNames, getMemberSections, isNoneSection, type MemberSection, renderName} from './lib';
import type {ContainerReflection} from 'typedoc';

// Placeholder for i18n
const i18n = {
    theme_index: () => 'Index',
};

function renderSection(
    ctx: SimpleThemeContext,
    item: MemberSection,
) {
    return (
        <section class='tsd-index-section'>
            {!isNoneSection(item) && <h3 class='tsd-index-heading'>{item.title}</h3>}
            {item.description && (
                <div class='tsd-comment tsd-typography'>
                    <div dangerouslySetInnerHTML={{__html: ctx.markdown(item.description)}} />
                </div>
            )}
            <div class='tsd-index-list'>
                {item.children.map((item) => (
                    <>
                        <a
                            href={ctx.urlTo(item)}
                            class={classNames(
                                {'tsd-index-link': true, deprecated: item.isDeprecated()},
                                ctx.getReflectionClasses(item),
                            )}
                        >
                            {/**ctx.reflectionIcon(item)*/}
                            <span>{renderName(item)}</span>
                        </a>
                        {'\n'}
                    </>
                ))}
            </div>
        </section>
    );
}

export function index(context: SimpleThemeContext, props: ContainerReflection) {
    const sections = getMemberSections(props);

    return (
        <>
            <section class='tsd-panel-group tsd-index-group'>
                <section class='tsd-panel tsd-index-panel'>
                    <details class='tsd-index-content tsd-accordion' open={true}>
                        <summary class='tsd-accordion-summary tsd-index-summary'>
                            {context.icons.chevronDown()}
                            <h5 class='tsd-index-heading uppercase'>
                                {i18n.theme_index()}
                            </h5>
                        </summary>
                        <div class='tsd-accordion-details'>{sections.map(s => renderSection(context, s))}</div>
                    </details>
                </section>
            </section>
        </>
    );
}
