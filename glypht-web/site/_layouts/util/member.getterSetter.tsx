import type {DeclarationReflection} from 'typedoc';
import {classNames} from './lib';
import {renderSignatureTitle} from './signature-renderer';
import {memberSignatureBody} from './member.signature.body';
import {SimpleThemeContext} from './context';

export const memberGetterSetter = (context: SimpleThemeContext, props: DeclarationReflection) => (
    <>
        <ul
            class={classNames(
                {
                    'tsd-signatures': true,
                },
                context.getReflectionClasses(props),
            )}
        >
            {!!props.getSignature && (
                <li>
                    <div class='tsd-signature' id={context.getAnchor(props.getSignature)}>
                        {renderSignatureTitle(context, props.getSignature)}
                    </div>
                    <div class='tsd-description'>{memberSignatureBody(context, props.getSignature)}</div>
                </li>
            )}
            {!!props.setSignature && (
                <li>
                    <div class='tsd-signature' id={context.getAnchor(props.setSignature)}>
                        {renderSignatureTitle(context, props.setSignature)}
                    </div>
                    <div class='tsd-description'>{memberSignatureBody(context, props.setSignature)}</div>
                </li>
            )}
        </ul>
    </>
);
