import type {SimpleThemeContext} from './context';
import type {SignatureReflection} from 'typedoc';
import {renderSignatureTitle} from './signature-renderer';

export function memberSignatureTitle(
    context: SimpleThemeContext,
    props: SignatureReflection,
    options: {hideName?: boolean} = {},
) {
    return renderSignatureTitle(context, props, options);
}
