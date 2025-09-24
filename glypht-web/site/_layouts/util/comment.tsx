import {join} from './lib';
import type {CommentDisplayPart, Reflection, TranslatedString} from 'typedoc';
import type {SimpleThemeContext} from './context';
import {ReflectionKind} from 'typedoc';

// Placeholder for translateTagName function
function translateTagName(tag: string): TranslatedString {
    return tag.substring(1) as TranslatedString; // Remove @ prefix
}

// Note: Comment modifiers are handled in `renderFlags`

export function renderDisplayParts(
    ctx: SimpleThemeContext,
    parts: readonly CommentDisplayPart[] | undefined,
) {
    if (!parts?.length) return;

    return (
        <div class='tsd-comment tsd-typography'>
            <div dangerouslySetInnerHTML={{__html: ctx.markdown(parts)}} />
        </div>
    );
}

export function commentShortSummary(context: SimpleThemeContext, props: Reflection) {
    let shortSummary: readonly CommentDisplayPart[] | undefined;
    if (props.isDocument()) {
        if (typeof props.frontmatter['summary'] === 'string') {
            shortSummary = [{kind: 'text', text: props.frontmatter['summary']}];
        }
    } else {
        const useFirstParagraph = context.options.useFirstParagraphOfCommentAsSummary;
        shortSummary = props.comment?.getShortSummary(useFirstParagraph);
    }

    if (!shortSummary?.length && props.isDeclaration() && props.signatures?.length) {
        return commentShortSummary(context, props.signatures[0]);
    }

    if (!shortSummary?.some((part) => part.text)) return;

    return renderDisplayParts(context, shortSummary);
}

export function commentSummary(context: SimpleThemeContext, props: Reflection) {
    if (props.comment?.summary.some((part) => part.text)) {
        return renderDisplayParts(context, props.comment.summary);
    }

    const target = (props.isDeclaration() || props.isParameter()) && props.type?.type === 'reference' ?
        props.type.reflection :
        undefined;

    if (target?.comment?.hasModifier('@expand') && target?.comment?.summary.some((part) => part.text)) {
        return renderDisplayParts(context, target.comment.summary);
    }
}

export function commentTags(context: SimpleThemeContext, props: Reflection) {
    if (!props.comment) return;

    const skipSave = props.comment.blockTags.map((tag) => tag.skipRendering);

    const skippedTags = context.options.notRenderedTags;

    const tags = props.kindOf(ReflectionKind.SomeSignature) ?
        props.comment.blockTags.filter(
            (tag) => tag.tag !== '@returns' && !tag.skipRendering && !skippedTags.includes(tag.tag),
        ) :
        props.comment.blockTags.filter((tag) => !tag.skipRendering && !skippedTags.includes(tag.tag));

    skipSave.forEach((skip, i) => (props.comment!.blockTags[i].skipRendering = skip));

    const tagsContents = tags.map((item) => {
        const name = item.name ?
            `${translateTagName(item.tag)}: ${item.name}` :
            translateTagName(item.tag);

        const anchor = context.slugger.slug(name);

        return (
            <>
                <div class={`tsd-tag-${item.tag.substring(1)}`}>
                    <h4 id={anchor}>
                        <a class="header-anchor" href={`#${anchor}`}>
                            <span>{name}</span>
                        </a>
                    </h4>
                    <div dangerouslySetInnerHTML={{__html: context.markdown(item.content)}} />
                </div>
            </>
        );
    });

    return (
        <>
            {tagsContents.length > 0 && (
                <div class='tsd-comment tsd-typography'>
                    {tagsContents}
                </div>
            )}
        </>
    );
}

export function reflectionFlags(context: SimpleThemeContext, props: Reflection) {
    const flagsNotRendered = context.options.notRenderedTags;
    const allFlags = props.flags.getFlagStrings();
    if (props.comment) {
        for (const tag of props.comment.modifierTags) {
            if (!flagsNotRendered.includes(tag)) {
                allFlags.push(translateTagName(tag));
            }
        }
    }

    return join(' ', allFlags, (item) => <code class='tsd-tag'>{item}</code>);
}
