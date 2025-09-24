import type {
    CommentDisplayPart,
    DeclarationReflection,
    Reflection,
    SignatureReflection,
    ReferenceType,
    SomeType,
    TypeVisitor,
    TagString,
} from 'typedoc';
import {Comment, ReflectionKind} from 'typedoc';
import type {JSX} from 'preact';
import {classNames, getKindClass} from './lib';
import type {SimpleThemeContext} from './context';
import {anchorTargetIfPresent} from './anchor-icon';
import {commentSummary, commentTags, reflectionFlags, renderDisplayParts} from './comment';
import {memberSignatures} from './member.signatures';
import {renderSignatureTitle} from './signature-renderer';
import {memberSignatureBody} from './member.signature.body';
import {renderType} from './signature-renderer';

// Placeholder for i18n
const i18n = {
    theme_type_declaration: () => 'Type Declaration',
};

function renderingTypeDetailsIsUseful(
    container: Reflection,
    type: SomeType,
    notRenderedTags: readonly TagString[],
): boolean {
    const isUsefulVisitor: Partial<TypeVisitor<boolean>> = {
        array(type) {
            return renderingTypeDetailsIsUseful(container, type.elementType, notRenderedTags);
        },
        intersection(type) {
            return type.types.some(t => renderingTypeDetailsIsUseful(container, t, notRenderedTags));
        },
        union(type) {
            return !!type.elementSummaries ||
                type.types.some(t => renderingTypeDetailsIsUseful(container, t, notRenderedTags));
        },
        reflection(type) {
            return renderingChildIsUseful(type.declaration, notRenderedTags);
        },
        reference(type) {
            return shouldExpandReference(container, type);
        },
    };

    return type.visit(isUsefulVisitor) ?? false;
}

export function typeDeclaration(
    context: SimpleThemeContext,
    reflectionOwningType: Reflection,
    type: SomeType,
): JSX.Element | null {
    if (renderingTypeDetailsIsUseful(reflectionOwningType, type, context.options.notRenderedTags)) {
        return (
            <div class="tsd-type-declaration">
                <h4>{i18n.theme_type_declaration()}</h4>
                {typeDetails(context, reflectionOwningType, type, true)}
            </div>
        );
    }
    return null;
}

type ExpandTypeInfo = {expandType: Set<string>; preventExpand: Set<string>};
const expandTypeCache = new WeakMap<Reflection, ExpandTypeInfo>();

function getExpandTypeInfo(refl: Reflection): ExpandTypeInfo {
    const cache = expandTypeCache.get(refl);
    if (cache) return cache;

    const expandType = new Set<string>();
    const preventExpand = new Set<string>();
    if (!refl.isProject()) {
        const info = getExpandTypeInfo(refl.parent!);
        for (const item of info.expandType) {
            expandType.add(item);
        }
        for (const item of info.preventExpand) {
            preventExpand.add(item);
        }
    }

    for (const tag of refl.comment?.blockTags || []) {
        if (tag.tag === '@expandType') {
            const name = Comment.combineDisplayParts(tag.content);
            expandType.add(name);
            preventExpand.delete(name);
        } else if (tag.tag === '@preventExpand') {
            const name = Comment.combineDisplayParts(tag.content);
            preventExpand.add(name);
            expandType.delete(name);
        }
    }

    expandTypeCache.set(refl, {expandType, preventExpand});
    return {expandType, preventExpand};
}

const expanded = new Set<Reflection>();
function shouldExpandReference(container: Reflection, reference: ReferenceType) {
    const target = reference.reflection;
    if (!target) {
        // If it doesn't exist, expand only if there are specific properties
        // which the user annotated. Assume they know what they're doing.
        return reference.highlightedProperties !== undefined;
    }

    // Prevent expansion of non-types
    if (!target.kindOf(ReflectionKind.TypeAlias | ReflectionKind.Interface)) return false;

    // Prevent recursive expand
    if (expanded.has(target)) return false;

    const info = getExpandTypeInfo(container);

    // Expand if the user explicitly requested it with @param or @expand
    if (reference.highlightedProperties || target.comment?.hasModifier('@expand') || info.expandType.has(target.name)) {
        return !info.preventExpand.has(target.name);
    }

    return false;
}

export function typeDetails(
    context: SimpleThemeContext,
    reflectionOwningType: Reflection,
    type: SomeType,
    renderAnchors: boolean,
): JSX.Element | null {
    return typeDetailsImpl(context, reflectionOwningType, type, renderAnchors);
}

export function typeDetailsImpl(
    context: SimpleThemeContext,
    reflectionOwningType: Reflection,
    type: SomeType,
    renderAnchors: boolean,
    highlighted?: Map<string, CommentDisplayPart[]>,
): JSX.Element | null {
    const result = type.visit<JSX.Element | null>({
        array(type) {
            return typeDetails(context, reflectionOwningType, type.elementType, renderAnchors);
        },
        intersection(type) {
            const elements = type.types.map((t) => typeDetails(context, reflectionOwningType, t, renderAnchors))
                .filter(Boolean);
            return elements.length > 0 ? <>{elements}</> : null;
        },
        union(type) {
            const result: JSX.Element[] = [];
            for (let i = 0; i < type.types.length; ++i) {
                result.push(
                    <li>
                        <pre class="tsd-signature">{renderType(context, type.types[i])}</pre>
                        {renderDisplayParts(context, type.elementSummaries?.[i] || [])}
                        {typeDetailsIfUseful(context, reflectionOwningType, type.types[i])}
                    </li>,
                );
            }
            return <ul>{result}</ul>;
        },
        reflection(type) {
            const declaration = type.declaration;
            if (highlighted) {
                return highlightedDeclarationDetails(context, declaration, renderAnchors, highlighted);
            }
            return declarationDetails(context, declaration, renderAnchors);
        },
        reference(reference) {
            if (shouldExpandReference(reflectionOwningType, reference)) {
                const target = reference.reflection;
                if (!target?.isDeclaration()) {
                    return highlightedPropertyDetails(context, reference.highlightedProperties);
                }

                // Ensure we don't go into an infinite loop here
                expanded.add(target);
                const details = target.type ?
                    typeDetails(context, reflectionOwningType, target.type, renderAnchors) :
                    declarationDetails(context, target, renderAnchors);
                expanded.delete(target);
                return details;
            }
            return null;
        },
        // tuple??
    });

    if (!result && highlighted) {
        return highlightedPropertyDetails(context, highlighted);
    }

    return result ?? null;
}

export function typeDetailsIfUseful(
    context: SimpleThemeContext,
    reflectionOwningType: Reflection,
    type: SomeType | undefined,
): JSX.Element | null {
    if (type && renderingTypeDetailsIsUseful(reflectionOwningType, type, context.options.notRenderedTags)) {
        return typeDetails(context, reflectionOwningType, type, false);
    }
    return null;
}

function highlightedPropertyDetails(
    context: SimpleThemeContext,
    highlighted?: Map<string, CommentDisplayPart[]>,
) {
    if (!highlighted?.size) return null;

    return (
        <ul class="tsd-parameters">
            {Array.from(highlighted.entries(), ([name, parts]) => {
                return (
                    <li class="tsd-parameter">
                        <h5>
                            <span>{name}</span>
                        </h5>
                        {renderDisplayParts(context, parts)}
                    </li>
                );
            })}
        </ul>
    );
}

function highlightedDeclarationDetails(
    context: SimpleThemeContext,
    declaration: DeclarationReflection,
    renderAnchors: boolean,
    highlightedProperties?: Map<string, CommentDisplayPart[]>,
) {
    return (
        <ul class="tsd-parameters">
            {declaration
                .getProperties()
                ?.map(
                    (child) =>
                        highlightedProperties?.has(child.name) &&
                        renderChild(context, child, renderAnchors, highlightedProperties.get(child.name)),
                )}
        </ul>
    );
}

function declarationDetails(
    context: SimpleThemeContext,
    declaration: DeclarationReflection,
    renderAnchors: boolean,
): JSX.Element {
    return (
        <>
            {commentSummary(context, declaration)}
            <ul class="tsd-parameters">
                {declaration.signatures && (
                    <li class="tsd-parameter-signature">
                        <ul class={classNames({'tsd-signatures': true}, context.getReflectionClasses(declaration))}>
                            {declaration.signatures.map((item) => {
                                const anchor = context.router.hasUrl(item) ? context.getAnchor(item) : undefined;

                                return (
                                    <>
                                        <li class="tsd-signature" id={anchor}>
                                            {renderSignatureTitle(context, item, {
                                                hideName: true,
                                            })}
                                        </li>
                                        <li class="tsd-description">
                                            {memberSignatureBody(context, item, {
                                                hideSources: true,
                                            })}
                                        </li>
                                    </>
                                );
                            })}
                        </ul>
                    </li>
                )}
                {declaration.indexSignatures?.map((index) => renderIndexSignature(context, index))}
                {declaration.getProperties()?.map((child) => renderChild(context, child, renderAnchors))}
            </ul>
        </>
    );
}

function renderChild(
    context: SimpleThemeContext,
    child: DeclarationReflection,
    renderAnchors: boolean,
    highlight?: CommentDisplayPart[],
) {
    if (child.signatures) {
        return (
            <li class="tsd-parameter">
                <pre class="tsd-parameter-signature" id={anchorTargetIfPresent(context, child)}>
                    <code>
                        {child.flags.isRest && <span class="tsd-signature-symbol">...</span>}
                        <span class={getKindClass(child)}>{child.name}</span>
                        <span class="tsd-signature-symbol">{child.flags.isOptional && '?'}:</span> function
                    </code>
                </pre>

                {memberSignatures(context, child)}
            </li>
        );
    }

    function highlightOrComment(refl: Reflection) {
        if (highlight) {
            return renderDisplayParts(context, highlight);
        }
        return (
            <>
                {commentSummary(context, refl)}
                {commentTags(context, refl)}
            </>
        );
    }

    // standard type
    if (child.type) {
        const notRenderedTags = context.options.notRenderedTags;

        return (
            <li class="tsd-parameter">
                {reflectionFlags(context, child)}
                <pre class="tsd-parameter-signature" id={anchorTargetIfPresent(context, child)}>
                    <code>
                        {child.flags.isRest && <span class="tsd-signature-symbol">...</span>}
                        <span class={getKindClass(child)}>{child.name}</span>
                        <span class="tsd-signature-symbol">
                            {child.flags.isOptional && '?'}
                            {': '}
                        </span>
                        {renderType(context, child.type)}
                    </code>
                </pre>
                {highlightOrComment(child)}
                {child.getProperties().some(prop => renderingChildIsUseful(prop, notRenderedTags)) && (
                    <ul class="tsd-parameters">
                        {child.getProperties().map((c) => renderChild(context, c, renderAnchors))}
                    </ul>
                )}
            </li>
        );
    }

    // getter/setter
    return (
        <>
            {child.getSignature && (
                <li class="tsd-parameter">
                    <pre class="tsd-parameter-signature" id={anchorTargetIfPresent(context, child)}>
                        <code>
                            {reflectionFlags(context, child.getSignature)}
                            <span class="tsd-signature-keyword">get</span>{' '}
                            <span class={getKindClass(child)}>{child.name}</span>
                            <span class="tsd-signature-symbol">():</span> {renderType(context, child.getSignature.type)}
                        </code>
                    </pre>

                    {highlightOrComment(child.getSignature)}
                </li>
            )}
            {child.setSignature && (
                <li class="tsd-parameter">
                    <pre
                        class="tsd-parameter-signature"
                        id={!child.getSignature ? anchorTargetIfPresent(context, child) : undefined}
                    >
                        <code>
                            {reflectionFlags(context, child.setSignature)}
                            <span class="tsd-signature-keyword">set</span>{' '}
                            <span class={getKindClass(child)}>{child.name}</span>
                            <span class="tsd-signature-symbol">(</span>
                            {child.setSignature.parameters?.map((item) => (
                                <>
                                    {item.name}
                                    <span class="tsd-signature-symbol">:</span> {renderType(context, item.type)}
                                </>
                            ))}
                            <span class="tsd-signature-symbol">):</span> {renderType(context, child.setSignature.type)}
                        </code>
                    </pre>

                    {highlightOrComment(child.setSignature)}
                </li>
            )}
        </>
    );
}

function renderIndexSignature(context: SimpleThemeContext, index: SignatureReflection) {
    return (
        <li class="tsd-parameter-index-signature">
            <h5>
                {index.flags.isReadonly && (
                    <>
                        <span class="tsd-signature-keyword">readonly</span>
                        {' '}
                    </>
                )}
                <span class="tsd-signature-symbol">[</span>
                {index.parameters!.map((item) => (
                    <>
                        <span class={getKindClass(item)}>{item.name}</span>
                        {': '}
                        {renderType(context, item.type)}
                    </>
                ))}
                <span class="tsd-signature-symbol">]:</span> {renderType(context, index.type)}
            </h5>
            {commentSummary(context, index)}
            {commentTags(context, index)}
            {typeDeclaration(context, index, index.type!)}
        </li>
    );
}

function renderingChildIsUseful(refl: DeclarationReflection, notRenderedTags: readonly TagString[]) {
    // Object types directly under a variable/type alias will always be considered useful.
    // This probably isn't ideal, but it is an easy thing to check when assigning URLs
    // in the default theme, so we'll make the assumption that those properties ought to always
    // be rendered.
    // This should be kept in sync with the DefaultTheme.applyAnchorUrl function.
    if (
        refl.kindOf(ReflectionKind.TypeLiteral) &&
        refl.parent?.kindOf(ReflectionKind.SomeExport) &&
        (refl.parent as DeclarationReflection).type?.type === 'reflection'
    ) {
        return true;
    }

    if (renderingThisChildIsUseful(refl, notRenderedTags)) {
        return true;
    }

    return refl.getProperties().some(prop => renderingThisChildIsUseful(prop, notRenderedTags));
}

function renderingThisChildIsUseful(refl: DeclarationReflection, notRenderedTags: readonly TagString[]) {
    if (refl.hasComment(notRenderedTags)) return true;

    const declaration = refl.type?.type === 'reflection' ? refl.type.declaration : refl;
    if (declaration.hasComment(notRenderedTags)) return true;

    return declaration.getAllSignatures().some((sig) => {
        return sig.hasComment(notRenderedTags) || sig.parameters?.some((p) => p.hasComment(notRenderedTags));
    });
}
