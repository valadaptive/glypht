import type {TypeParameterReflection} from 'typedoc';
import {anchorTargetIfPresent} from './anchor-icon';
import {SimpleThemeContext} from './context';
import {renderType} from './signature-renderer';
import {commentSummary, commentTags} from './comment';

// Placeholder for i18n
const i18n = {
    kind_plural_type_parameter: () => 'Type Parameters',
};

export function typeParameters(context: SimpleThemeContext, typeParameters: TypeParameterReflection[]) {
    return (
        <>
            <section class='tsd-panel'>
                <h4>{i18n.kind_plural_type_parameter()}</h4>
                <ul class='tsd-type-parameter-list'>
                    {typeParameters.map((item) => (
                        <li>
                            <span id={anchorTargetIfPresent(context, item)}>
                                {item.flags.isConst && (
                                    <>
                                        <span class='tsd-signature-keyword'>const</span>
                                        {' '}
                                    </>
                                )}
                                {item.varianceModifier && (
                                    <>
                                        <span class='tsd-signature-keyword'>{item.varianceModifier}</span>
                                        {' '}
                                    </>
                                )}
                                <span class='tsd-kind-type-parameter'>{item.name}</span>
                                {!!item.type && (
                                    <>
                                        {' '}
                                        <span class='tsd-signature-keyword'>extends</span>{' '}
                                        {renderType(context, item.type)}
                                    </>
                                )}
                                {!!item.default && (
                                    <>
                                        {' = '}
                                        {renderType(context, item.default)}
                                    </>
                                )}
                            </span>
                            {commentSummary(context, item)}
                            {commentTags(context, item)}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
