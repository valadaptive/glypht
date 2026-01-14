import type {SignatureReflection} from 'typedoc';
import {hasTypeParameters} from './lib';
import {reflectionFlags, commentSummary, commentTags} from './comment';
import {typeParameters} from './typeParameters';
import {renderType} from './signature-renderer';
import {memberSources} from './member.sources';
import {SimpleThemeContext} from './context';
import {typeDetailsIfUseful} from './typeDetails';

// Placeholder for i18n
const i18n = {
    kind_plural_parameter: () => 'Parameters',
    theme_returns: () => 'Returns',
};

export function memberSignatureBody(
    context: SimpleThemeContext,
    props: SignatureReflection,
    {hideSources = false}: {hideSources?: boolean} = {},
) {
    const returnsTag = props.comment?.getTag('@returns');

    return (
        <>
            {reflectionFlags(context, props)}
            {commentSummary(context, props)}

            {hasTypeParameters(props) && typeParameters(context, props.typeParameters)}

            {props.parameters && props.parameters.length > 0 && (
                <div class='tsd-parameters'>
                    <h4 class='tsd-parameters-title'>{i18n.kind_plural_parameter()}</h4>
                    <ul class='tsd-parameter-list'>
                        {props.parameters.map((item) => (
                            <li>
                                <pre class="tsd-signature">
                                    {reflectionFlags(context, item)}
                                    {item.flags.isRest && <span class='tsd-signature-operator'>...</span>}
                                    <span class='tsd-kind-parameter'>{item.name}</span>
                                    <span class='tsd-signature-punctuation'>{': '}</span>
                                    {renderType(context, item.type)}
                                    {item.defaultValue && (
                                        <span class='tsd-signature-operator'>
                                            {' = '}
                                            {item.defaultValue}
                                        </span>
                                    )}
                                </pre>
                                {commentSummary(context, item)}
                                {commentTags(context, item)}
                                {typeDetailsIfUseful(context, item, item.type)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {props.type && (
                <>
                    <h4 class='tsd-returns-title'>
                        {i18n.theme_returns()} <code>{renderType(context, props.type)}</code>
                    </h4>
                    {returnsTag && <div dangerouslySetInnerHTML={{__html: context.markdown(returnsTag.content)}} />}
                    {typeDetailsIfUseful(context, props, props.type)}
                </>
            )}

            {commentTags(context, props)}

            {!hideSources && memberSources(context, props)}
        </>
    );
}
