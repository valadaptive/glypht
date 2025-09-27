import type {
    DeclarationReflection,
    DocumentReflection,
    ProjectReflection,
    Reflection,
} from 'typedoc';
import type {JSX} from 'preact';
import {ReferenceReflection, ReflectionKind} from 'typedoc';
import classNames from 'clsx';
import {getMemberSections, getUniquePath, isNoneSection, join} from './lib';
import type {SimpleThemeContext} from './context';
import {anchorIcon} from './anchor-icon';
import {commentSummary, commentTags, commentShortSummary} from './comment';

/**
 * Removes the first header (H1) from markdown content to avoid duplicate headers
 * when TypeDoc already provides a page header.
 */
function stripFirstHeader(
    content: readonly import('typedoc').CommentDisplayPart[],
): readonly import('typedoc').CommentDisplayPart[] {
    if (!content?.length) return content;

    const firstPart = content[0];
    if (firstPart.kind === 'text' && firstPart.text) {
        const text = firstPart.text;
        // Check if it starts with an H1 header
        const headerMatch = text.match(/^#\s+.*$/m);
        if (headerMatch) {
            // Remove the header line and any immediately following empty lines
            const withoutHeader = text.replace(/^#\s+.*\n?/, '').replace(/^\n+/, '');
            return [
                {...firstPart, text: withoutHeader},
                ...content.slice(1),
            ];
        }
    }

    return content;
}

export function moduleReflection(context: SimpleThemeContext, mod: DeclarationReflection | ProjectReflection) {
    const sections = getMemberSections(mod);

    return (
        <>
            {mod.hasComment(context.options.notRenderedTags) && (
                <section class="tsd-panel tsd-comment">
                    {commentSummary(context, mod)}
                    {commentTags(context, mod)}
                </section>
            )}

            {mod.isDeclaration() && mod.kind === ReflectionKind.Module && !!mod.readme?.length && (
                <section class="tsd-panel tsd-typography">
                    <div dangerouslySetInnerHTML={{__html: context.markdown(stripFirstHeader(mod.readme))}} />
                </section>
            )}

            {sections.map((section) => {
                const content = (
                    <>
                        {section.description && (
                            <div class="tsd-comment tsd-typography">
                                <div dangerouslySetInnerHTML={{__html: context.markdown(section.description)}} />
                            </div>
                        )}
                        <dl class="tsd-member-summaries">
                            {section.children.map((item) => moduleMemberSummary(context, item))}
                        </dl>
                    </>
                );

                if (isNoneSection(section)) {
                    return (
                        <section class="tsd-panel-group tsd-member-group">
                            {content}
                        </section>
                    );
                }

                return (
                    <details class="tsd-panel-group tsd-member-group tsd-accordion" open>
                        <summary class="tsd-accordion-summary" data-key={'section-' + section.title}>
                            {context.icons.chevronDown()}
                            <h2>
                                {section.title}
                            </h2>
                        </summary>
                        {content}
                    </details>
                );
            })}
        </>
    );
}

export function moduleMemberSummary(
    context: SimpleThemeContext,
    member: DeclarationReflection | DocumentReflection,
) {
    const id = member.isReference() ? context.getAnchor(member)! : context.slugger.slug(member.name);

    let name: JSX.Element;
    if (member instanceof ReferenceReflection) {
        const target = member.getTargetReflectionDeep();

        name = (
            <span class="tsd-member-summary-name">
                {/* context.reflectionIcon would need to be implemented */}
                <span class={classNames({deprecated: member.isDeprecated()})}>{member.name}</span>
                <span>&nbsp;{'\u2192'}&nbsp;</span>
                {uniqueName(context, target)}
                {anchorIcon(context, id)}
            </span>
        );
    } else {
        name = (
            <span class="tsd-member-summary-name">
                {/* context.reflectionIcon would need to be implemented */}
                <a class={classNames({deprecated: member.isDeprecated()})} href={context.urlTo(member)}>
                    {member.name}
                </a>
                {anchorIcon(context, id)}
            </span>
        );
    }

    return (
        <>
            <dt class={classNames({'tsd-member-summary': true}, context.getReflectionClasses(member))} id={id}>
                {name}
            </dt>
            <dd class={classNames({'tsd-member-summary': true}, context.getReflectionClasses(member))}>
                {commentShortSummary(context, member)}
            </dd>
        </>
    );
}

// Note: This version of uniqueName does NOT include colors... they looked weird to me
// when looking at a module page.
function uniqueName(context: SimpleThemeContext, reflection: Reflection) {
    const name = join(
        '.',
        getUniquePath(reflection),
        (item) => (
            <a href={context.urlTo(item)} class={classNames({deprecated: item.isDeprecated()})}>
                {item.name}
            </a>
        ),
    );

    return <>{name}</>;
}
