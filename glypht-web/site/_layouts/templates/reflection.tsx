import {classNames, getKindClass, hasTypeParameters} from '../util/lib';
import type {SimpleThemeContext} from '../util/context';
import {
    DeclarationReflection,
    SignatureReflection,
} from 'typedoc';
import {ReflectionKind} from 'typedoc';
import {memberDeclaration} from '../util/member.declaration';
import {moduleReflection} from '../util/module.reflection';
import {commentSummary, commentTags} from '../util/comment';
import {typeParameters} from '../util/typeParameters';
import {hierarchy} from '../util/hierarchy';
import {renderFormattedCode, renderType} from '../util/signature-renderer';
import {memberSignatures} from '../util/member.signatures';
import {memberSources} from '../util/member.sources';
import {index} from '../util/index';
import {members} from '../util/members';
import {typeDetailsIfUseful} from '../util/typeDetails';
import {Wrap} from '../util/formatter';

// Placeholder for i18n
const i18n = {
    theme_implements: () => 'Implements',
    theme_implemented_by: () => 'Implemented by',
    theme_indexable: () => 'Indexable',
};

export function reflectionTemplate(context: SimpleThemeContext) {
    const model = context.model;

    if (
        model.kindOf(ReflectionKind.TypeAlias | ReflectionKind.Variable) &&
        model instanceof DeclarationReflection &&
        model.type
    ) {
        return memberDeclaration(context, model);
    }

    if (
        model.kindOf(ReflectionKind.ExportContainer) &&
        (model.isDeclaration() || model.isProject())
    ) {
        return moduleReflection(context, model);
    }

    return (
        <>
            {model.hasComment(context.options.notRenderedTags) && (
                <section class="tsd-panel tsd-comment">
                    {commentSummary(context, model)}
                    {commentTags(context, model)}
                </section>
            )}

            {model instanceof DeclarationReflection &&
                (model.kindOf(ReflectionKind.Interface) || model.kindOf(ReflectionKind.TypeAlias)) &&
                <pre class="tsd-signature">{renderFormattedCode(
                    context,
                    (builder) => {
                        if (model.kindOf(ReflectionKind.Interface)) {
                            return builder.interface(model);
                        }
                        if (model.kindOf(ReflectionKind.TypeAlias)) {
                            return builder.typeAlias(model);
                        }

                        throw new Error(`Unhandled declaration kind: ${ReflectionKind.singularString(model.kind)}`);
                    },
                    {forceWrap: true, wrapMode: Wrap.Enable},
                )}</pre>}

            {hasTypeParameters(model) && <>{typeParameters(context, model.typeParameters)}</>}
            {model instanceof DeclarationReflection && (
                <>
                    {hierarchy(context, model.typeHierarchy)}

                    {!!model.implementedTypes && (
                        <section class="tsd-panel">
                            <h4>{i18n.theme_implements()}</h4>
                            <ul class="tsd-hierarchy">
                                {model.implementedTypes.map((item) => <li>{renderType(context, item)}</li>)}
                            </ul>
                        </section>
                    )}
                    {!!model.implementedBy && (
                        <section class="tsd-panel">
                            <h4>{i18n.theme_implemented_by()}</h4>
                            <ul class="tsd-hierarchy">
                                {model.implementedBy.map((item) => <li>{renderType(context, item)}</li>)}
                            </ul>
                        </section>
                    )}
                    {!!model.signatures?.length && (
                        <section class="tsd-panel">{memberSignatures(context, model)}</section>
                    )}
                    {!!model.indexSignatures?.length && (
                        <section class="tsd-panel">
                            <h4 class="tsd-before-signature">{i18n.theme_indexable()}</h4>
                            <ul class="tsd-signatures">
                                {model.indexSignatures.map((index) => renderIndexSignature(context, index))}
                            </ul>
                        </section>
                    )}
                    {!model.signatures && memberSources(context, model)}
                </>
            )}
            {model.isContainer() && !!model.childrenIncludingDocuments?.length && index(context, model)}
            {model.isContainer() && members(context, model)}
        </>
    );
}

function renderIndexSignature(context: SimpleThemeContext, index: SignatureReflection) {
    return (
        <li class={classNames({'tsd-index-signature': true}, context.getReflectionClasses(index))}>
            <pre class="tsd-signature">
                {index.flags.isReadonly && (
                    <>
                        <span class="tsd-signature-keyword">readonly</span>
                        {' '}
                    </>
                )}
                <span class="tsd-signature-symbol">[</span>
                {index.parameters!.map((item) => (
                    <>
                        <span class={getKindClass(item)}>{item.name}</span>: {renderType(context, item.type)}
                    </>
                ))}
                <span class="tsd-signature-symbol">]:</span> {renderType(context, index.type)}
            </pre>
            {commentSummary(context, index)}
            {commentTags(context, index)}
            {typeDetailsIfUseful(context, index, index.type)}
        </li>
    );
}
