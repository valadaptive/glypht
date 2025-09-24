import type {SomeType, SignatureReflection} from 'typedoc';
import {TypeContext} from 'typedoc';
import type {JSX} from 'preact';
import {FormattedCodeBuilder, FormattedCodeGenerator, Wrap, type FormatterNode} from './formatter';
import type {SimpleThemeContext} from './context';

/**
 * Common options for signature rendering
 */
export interface SignatureRenderOptions {
    topLevelLinks?: boolean;
    hideName?: boolean;
    wrapMode?: Wrap;
    forceWrap?: boolean;
}

/**
 * Renders a formatted code tree to a JSX element using the standard FormattedCodeBuilder/Generator pattern
 */
export function renderFormattedCode(
    context: SimpleThemeContext,
    buildTree: (builder: FormattedCodeBuilder) => FormatterNode,
    options: SignatureRenderOptions = {},
): JSX.Element {
    const builder = new FormattedCodeBuilder(context.router, context.model);
    const tree = buildTree(builder);
    const generator = new FormattedCodeGenerator(context.options.typePrintWidth);

    if (options.forceWrap) {
        generator.forceWrap(builder.forceWrap);
    }

    generator.node(tree, options.wrapMode ?? Wrap.Detect);
    return generator.toElement();
}

/**
 * Renders a type using the standard pattern
 */
export function renderType(
    context: SimpleThemeContext,
    type: SomeType | undefined,
    options: SignatureRenderOptions = {},
): JSX.Element {
    return renderFormattedCode(
        context,
        (builder) => builder.type(type, TypeContext.none, {topLevelLinks: options.topLevelLinks ?? false}),
        options,
    );
}

/**
 * Renders a signature title using the standard pattern
 */
export function renderSignatureTitle(
    context: SimpleThemeContext,
    signature: SignatureReflection,
    options: SignatureRenderOptions = {},
): JSX.Element {
    return renderFormattedCode(
        context,
        (builder) => builder.signature(signature, options),
        options,
    );
}
