import type {ContainerReflection} from 'typedoc';
import {getMemberSections, isNoneSection} from './lib';
import {member} from './member';
import {SimpleThemeContext} from './context';

export function members(context: SimpleThemeContext, props: ContainerReflection) {
    const sections = getMemberSections(props, (child) => !context.router.hasOwnDocument(child));

    return (
        <>
            {sections.map((section) => {
                if (isNoneSection(section)) {
                    return (
                        <section class='tsd-panel-group tsd-member-group'>
                            {section.children.map((item) => member(context, item))}
                        </section>
                    );
                }

                return (
                    <details class='tsd-panel-group tsd-member-group tsd-accordion' open>
                        <summary class='tsd-accordion-summary' data-key={'section-' + section.title}>
                            {context.icons.chevronDown()}
                            <h2>
                                {section.title}
                            </h2>
                        </summary>
                        <section>{section.children.map((item) => member(context, item))}</section>
                    </details>
                );
            })}
        </>
    );
}
