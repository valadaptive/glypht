import type {DeclarationReflection, DocumentReflection} from 'typedoc';
import classNames from 'clsx';

import {wbr} from './lib';
import type {SimpleThemeContext} from './context';
import {reflectionFlags} from './comment';
import {memberSignatures} from './member.signatures';
import {memberDeclaration} from './member.declaration';
import {memberGetterSetter} from './member.getterSetter';

export function member(context: SimpleThemeContext, props: DeclarationReflection | DocumentReflection) {
    const anchor = context.getAnchor(props);

    // With the default url derivation, we'll never hit this case as documents are always placed into their
    // own pages. Handle it here in case someone creates a custom url scheme which embeds guides within the page.
    if (props.isDocument()) {
        return (
            <section class={classNames({'tsd-panel': true, 'tsd-member': true}, context.getReflectionClasses(props))}>
                {!!props.name && (
                    <h3 id={anchor}>
                        <a class="header-anchor" href={`#${anchor}`}>
                            {reflectionFlags(context, props)}
                            <span class={classNames({deprecated: props.isDeprecated()})}>{wbr(props.name)}</span>
                        </a>
                    </h3>
                )}
                <div class='tsd-comment tsd-typography'>
                    <div dangerouslySetInnerHTML={{__html: context.markdown(props.content)}} />
                </div>
            </section>
        );
    }

    return (
        <section class={classNames({'tsd-panel': true, 'tsd-member': true}, context.getReflectionClasses(props))}>
            {!!props.name && (
                <h3 id={anchor}>
                    <a class="header-anchor" href={`#${anchor}`}>
                        {reflectionFlags(context, props)}
                        <span class={classNames({deprecated: props.isDeprecated()})}>{wbr(props.name)}</span>
                    </a>
                </h3>
            )}
            {props.signatures ?
                memberSignatures(context, props) :
                props.hasGetterOrSetter() ?
                    memberGetterSetter(context, props) :
                    memberDeclaration(context, props)}

            {props.groups?.map((item) =>
                item.children.map((item) => !context.router.hasOwnDocument(item) && member(context, item)),
            )}
        </section>
    );
}
