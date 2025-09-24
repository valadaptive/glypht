import type {SimpleThemeContext} from './context';
import type {DeclarationReflection} from 'typedoc';
import {classNames} from './lib';
import {renderSignatureTitle} from './signature-renderer';
import {memberSignatureBody} from './member.signature.body';

export const memberSignatures = (context: SimpleThemeContext, props: DeclarationReflection) => (
    <>
        <ul class={classNames({'tsd-signatures': true}, context.getReflectionClasses(props))}>
            {props.signatures?.map((item) => (
                <li class={context.getReflectionClasses(item)}>
                    <pre class='tsd-signature' id={context.getAnchor(item)}>
                        {renderSignatureTitle(context, item)}
                        {/*anchorIcon(context, context.getAnchor(item))*/}
                    </pre>
                    <div class='tsd-description'>{memberSignatureBody(context, item)}</div>
                </li>
            ))}
        </ul>
    </>
);
