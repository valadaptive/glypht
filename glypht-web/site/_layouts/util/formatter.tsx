// Heavily based on https://yorickpeterse.com/articles/how-to-write-a-code-formatter/
// Implements roughly the same algorithm as Prettier

import {
    LiteralType,
    ReferenceType,
    type SomeType,
    TypeContext,
    type TypeVisitor,
    type DeclarationReflection,
    type ParameterReflection,
    type Reflection,
    ReflectionKind,
    type SignatureReflection,
    type TypeParameterReflection,
    Router,
} from 'typedoc';
import {assertNever, getKindClass, getUniquePath, stringify} from './lib';
import type {JSX} from 'preact';

// Utility functions that were imported from TypeDoc utils
function aggregate<T>(array: readonly T[], cb: (item: T) => number): number {
    return array.reduce((sum, item) => sum + cb(item), 0);
}

// Non breaking space
const INDENT = '\u00A0\u00A0\u00A0\u00A0';

export type SpanClass = string;

export type FormatterNode =
    | {type: 'text'; content: string}
    | {type: 'span'; kind: SpanClass | SpanClass[]; content: string; linkTarget: string | null; external?: boolean}
    | {type: 'line'}
    | {type: 'space_or_line'}
    | {type: 'indent'; content: FormatterNode[]}
    | {type: 'group'; id: number; content: FormatterNode[]}
    | {type: 'nodes'; content: FormatterNode[]}
    | {
        type: 'if_wrap';
        id: number;
        true: FormatterNode;
        false: FormatterNode;
    };

const emptyNode = textNode('');

function space() {
    return textNode(' ');
}
function textNode(content: string): FormatterNode {
    return {type: 'text', content};
}
function spanNode(
    kind: SpanClass | SpanClass[],
    content: string,
    linkTarget: string | null = null,
    external = false,
): FormatterNode {
    return {type: 'span', kind, content, linkTarget, external};
}
function line(): FormatterNode {
    return {type: 'line'};
}
function spaceOrLine(): FormatterNode {
    return {type: 'space_or_line'};
}
function indent(content: FormatterNode[]): FormatterNode {
    return {type: 'indent', content};
}
function group(id: number, content: FormatterNode[]): FormatterNode {
    return {type: 'group', id, content};
}
function nodes(...content: FormatterNode[]): FormatterNode {
    return {type: 'nodes', content};
}
function ifWrap(
    id: number,
    trueBranch: FormatterNode,
    falseBranch: FormatterNode = emptyNode,
): FormatterNode {
    return {type: 'if_wrap', id, true: trueBranch, false: falseBranch};
}

function join<T>(
    joiner: FormatterNode,
    list: readonly T[],
    cb: (x: T) => FormatterNode,
): FormatterNode {
    const content: FormatterNode[] = [];

    for (const item of list) {
        if (content.length > 0) {
            content.push(joiner);
        }
        content.push(cb(item));
    }

    return {type: 'nodes', content};
}

function nodeWidth(node: FormatterNode, wrapped: Set<number>): number {
    switch (node.type) {
        case 'text':
        case 'span':
            return node.content.length;
        case 'line':
            return 0;
        case 'space_or_line':
            return 1;
        case 'indent':
        case 'group':
        case 'nodes':
            return aggregate(node.content, (n) => nodeWidth(n, wrapped));
        case 'if_wrap':
            return wrapped.has(node.id) ?
                nodeWidth(node.true, wrapped) :
                nodeWidth(node.false, wrapped);
    }
}

export enum Wrap {
    Detect = 0,
    Enable = 1,
}

/**
 * Responsible for rendering nodes
 */
export class FormattedCodeGenerator {
    private buffer: Array<JSX.Element | string> = [];
    /** Indentation level, not number of chars */
    private indent = 0;
    /** The number of characters on the current line */
    private size: number;
    /** Maximum number of characters allowed per line */
    private max: number;
    /** Groups which need to be wrapped */
    private wrapped = new Set<number>();

    constructor(maxWidth: number = 80, startWidth = 0) {
        this.max = maxWidth;
        this.size = startWidth;
    }

    forceWrap(wrapped: Set<number>) {
        for (const id of wrapped) {
            this.wrapped.add(id);
        }
    }

    toElement(): JSX.Element {
        return <>{this.buffer}</>;
    }

    node(node: FormatterNode, wrap: Wrap): void {
        switch (node.type) {
            case 'nodes': {
                for (const n of node.content) {
                    this.node(n, wrap);
                }
                break;
            }
            case 'group': {
                const width = aggregate(node.content, (n) => nodeWidth(n, this.wrapped));
                let wrap: Wrap;
                if (this.size + width > this.max || this.wrapped.has(node.id)) {
                    this.wrapped.add(node.id);
                    wrap = Wrap.Enable;
                } else {
                    wrap = Wrap.Detect;
                }
                for (const n of node.content) {
                    this.node(n, wrap);
                }
                break;
            }
            case 'if_wrap': {
                if (this.wrapped.has(node.id)) {
                    this.node(node.true, Wrap.Enable);
                } else {
                    this.node(node.false, wrap);
                }
                break;
            }
            case 'text': {
                this.text(node.content, node.content.length);
                break;
            }
            case 'span': {
                let jsxNode;
                let classNames = Array.isArray(node.kind) ? node.kind.join(' ') : node.kind;
                if (node.external) classNames += 'external';
                if (node.linkTarget !== null) {
                    jsxNode = (
                        <a class={classNames} href={node.linkTarget} target={node.external ? '_blank' : undefined}>
                            {node.content}
                        </a>
                    );
                } else {
                    jsxNode = <span class={classNames}>{node.content}</span>;
                }
                this.text(jsxNode, node.content.length);
                break;
            }
            case 'line': {
                if (wrap === Wrap.Enable) {
                    this.newLine();
                }
                break;
            }
            case 'space_or_line': {
                if (wrap === Wrap.Enable) {
                    this.newLine();
                } else {
                    this.text(' ', 1);
                }
                break;
            }
            case 'indent': {
                if (wrap === Wrap.Enable) {
                    this.size += INDENT.length;
                    this.indent += 1;
                    this.buffer.push(INDENT);
                    for (const n of node.content) {
                        this.node(n, wrap);
                    }
                    this.indent -= 1;
                } else {
                    for (const n of node.content) {
                        this.node(n, wrap);
                    }
                }
                break;
            }
            default:
                assertNever(node);
        }
    }

    private text(value: string | JSX.Element, chars: number) {
        this.size += chars;
        this.buffer.push(value);
    }

    private newLine() {
        this.size = INDENT.length + this.indent;
        const last = this.buffer[this.buffer.length - 1];
        if (typeof last === 'string') {
            this.buffer[this.buffer.length - 1] = last.trimEnd();
        }
        this.buffer.push(<br />);
        this.buffer.push(INDENT.repeat(this.indent));
    }
}

const typeBuilder: TypeVisitor<
    FormatterNode,
    [FormattedCodeBuilder, {topLevelLinks: boolean}]
> = {
    array(type, builder) {
        return nodes(
            builder.type(type.elementType, TypeContext.arrayElement),
            spanNode('tsd-signature-symbol', '[]'),
        );
    },
    conditional(type, builder) {
        const id = builder.newId();
        return group(id, [
            builder.type(type.checkType, TypeContext.conditionalCheck),
            space(),
            spanNode('tsd-signature-keyword', 'extends'),
            space(),
            builder.type(type.extendsType, TypeContext.conditionalExtends),
            spaceOrLine(),
            indent([
                spanNode('tsd-signature-symbol', '?'),
                space(),
                builder.type(type.trueType, TypeContext.conditionalTrue),
                spaceOrLine(),
                spanNode('tsd-signature-symbol', ':'),
                space(),
                builder.type(type.falseType, TypeContext.conditionalFalse),
            ]),
        ]);
    },
    indexedAccess(type, builder) {
        let indexType = builder.type(type.indexType, TypeContext.indexedIndex);

        if (
            type.objectType instanceof ReferenceType &&
            type.objectType.reflection &&
            type.indexType instanceof LiteralType &&
            typeof type.indexType.value === 'string'
        ) {
            const childReflection = type.objectType.reflection.getChildByName([
                type.indexType.value,
            ]);
            if (childReflection) {
                const displayed = stringify(type.indexType.value);

                indexType = spanNode(
                    'tsd-signature-type',
                    displayed,
                    builder.router.hasUrl(childReflection) ? builder.urlTo(childReflection) : null,
                );
            }
        }

        return nodes(
            builder.type(type.objectType, TypeContext.indexedObject),
            spanNode('tsd-signature-symbol', '['),
            indexType,
            spanNode('tsd-signature-symbol', ']'),
        );
    },
    inferred(type, builder) {
        const simple = nodes(
            spanNode('tsd-signature-keyword', 'infer'),
            space(),
            spanNode('tsd-kind-type-parameter', type.name),
        );

        if (type.constraint) {
            const id = builder.newId();
            return group(id, [
                simple,
                space(),
                spanNode('tsd-signature-keyword', 'extends'),
                spaceOrLine(),
                indent([
                    builder.type(
                        type.constraint,
                        TypeContext.inferredConstraint,
                    ),
                ]),
            ]);
        }

        return simple;
    },
    intersection(type, builder) {
        // Prettier doesn't do smart wrapping here like we do with unions
        // so... TypeDoc won't either, at least for now.
        return join(
            nodes(
                space(),
                spanNode('tsd-signature-symbol', '&amp;'),
                space(),
            ),
            type.types,
            (type) => builder.type(type, TypeContext.intersectionElement),
        );
    },
    intrinsic(type) {
        return spanNode('tsd-signature-type', type.name);
    },
    literal(type) {
        return spanNode('tsd-signature-type', stringify(type.value));
    },
    mapped(type, builder) {
        const parts: FormatterNode[] = [];

        switch (type.readonlyModifier) {
            case '+':
                parts.push(
                    spanNode('tsd-signature-keyword', 'readonly'),
                    space(),
                );
                break;
            case '-':
                parts.push(
                    spanNode('tsd-signature-symbol', '-'),
                    spanNode('tsd-signature-keyword', 'readonly'),
                    space(),
                );
                break;
        }

        parts.push(
            spanNode('tsd-signature-symbol', '['),
            spanNode('tsd-kind-type-parameter', type.parameter),
            space(),
            spanNode('tsd-signature-keyword', 'in'),
            space(),
            builder.type(type.parameterType, TypeContext.mappedParameter),
        );

        if (type.nameType) {
            parts.push(
                space(),
                spanNode('tsd-signature-keyword', 'as'),
                space(),
                builder.type(type.nameType, TypeContext.mappedName),
            );
        }

        parts.push(spanNode('tsd-signature-symbol', ']'));

        switch (type.optionalModifier) {
            case '+':
                parts.push(
                    spanNode('tsd-signature-symbol', '?:'),
                );
                break;
            case '-':
                parts.push(
                    spanNode('tsd-signature-symbol', '-?:'),
                );
                break;
            default:
                parts.push(
                    spanNode('tsd-signature-symbol', ':'),
                );
        }

        parts.push(
            space(),
            builder.type(type.templateType, TypeContext.mappedTemplate),
        );

        return group(builder.newId(), [
            spanNode('tsd-signature-symbol', '{'),
            spaceOrLine(),
            indent(parts),
            spaceOrLine(),
            spanNode('tsd-signature-symbol', '}'),
        ]);
    },
    namedTupleMember(type, builder) {
        return nodes(
            textNode(type.name),
            type.isOptional ?
                spanNode('tsd-signature-symbol', '?:') :
                spanNode('tsd-signature-symbol', ':'),
            space(),
            builder.type(type.element, TypeContext.none),
        );
    },
    optional(type, builder) {
        return nodes(
            builder.type(type.elementType, TypeContext.optionalElement),
            spanNode('tsd-signature-symbol', '?'),
        );
    },
    predicate(type, builder) {
        const content: FormatterNode[] = [];
        if (type.asserts) {
            content.push(
                spanNode('tsd-signature-keyword', 'asserts'),
                space(),
            );
        }

        content.push(
            spanNode('tsd-kind-parameter', type.name),
        );

        if (type.targetType) {
            content.push(
                space(),
                spanNode('tsd-signature-keyword', 'is'),
                space(),
                builder.type(type.targetType, TypeContext.predicateTarget),
            );
        }

        return nodes(...content);
    },
    query(type, builder) {
        return nodes(
            spanNode('tsd-signature-keyword', 'typeof'),
            space(),
            builder.type(type.queryType, TypeContext.queryTypeTarget),
        );
    },
    reference(type, builder) {
        const reflection = type.reflection;
        let name: FormatterNode;

        if (reflection) {
            if (reflection.kindOf(ReflectionKind.TypeParameter)) {
                name = spanNode(
                    ['tsd-signature-type', 'tsd-kind-type-parameter'],
                    reflection.name,
                    builder.router.hasUrl(reflection) ? builder.urlTo(reflection) : null,
                );
            } else {
                name = join(
                    spanNode('tsd-signature-symbol', '.'),
                    getUniquePath(reflection),
                    (item) => {
                        return spanNode(
                            ['tsd-signature-type', getKindClass(item)],
                            item.name,
                            builder.router.hasUrl(reflection) ? builder.urlTo(reflection) : null,
                        );
                    },
                );
            }
        } else if (type.externalUrl) {
            if (type.externalUrl === '#') {
                name = spanNode('tsd-signature-type', type.name, null, true);
            } else {
                name = spanNode('tsd-signature-type', type.name, type.externalUrl, true);
            }
        } else if (type.refersToTypeParameter) {
            name = spanNode(['tsd-signature-type', 'tsd-kind-type-parameter'], type.name);
        } else {
            name = spanNode('tsd-signature-type', type.name);
        }

        if (type.typeArguments?.length) {
            const id = builder.newId();
            return group(id, [
                name,
                spanNode('tsd-signature-symbol', '<'),
                line(),
                indent([
                    join(
                        nodes(
                            spanNode('tsd-signature-symbol', ','),
                            spaceOrLine(),
                        ),
                        type.typeArguments,
                        (item) =>
                            builder.type(
                                item,
                                TypeContext.referenceTypeArgument,
                            ),
                    ),
                    ifWrap(
                        id,
                        spanNode('tsd-signature-symbol', ','),
                    ),
                ]),
                line(),
                spanNode('tsd-signature-symbol', '>'),
            ]);
        }

        return name;
    },
    reflection(type, builder, options) {
        return builder.reflection(type.declaration, options);
    },
    rest(type, builder) {
        return nodes(
            spanNode('tsd-signature-symbol', '...'),
            builder.type(type.elementType, TypeContext.restElement),
        );
    },
    templateLiteral(type, builder) {
        const content: FormatterNode[] = [];
        content.push(
            spanNode('tsd-signature-symbol', '`'),
        );

        if (type.head) {
            content.push(
                spanNode('tsd-signature-type', type.head),
            );
        }

        for (const item of type.tail) {
            content.push(
                spanNode('tsd-signature-symbol', '${'),
                builder.type(item[0], TypeContext.templateLiteralElement),
                spanNode('tsd-signature-symbol', '}'),
            );
            if (item[1]) {
                content.push(
                    spanNode('tsd-signature-type', item[1]),
                );
            }
        }

        content.push(
            spanNode('tsd-signature-symbol', '`'),
        );

        return nodes(...content);
    },
    tuple(type, builder) {
        const id = builder.newId();

        return group(id, [
            spanNode('tsd-signature-symbol', '['),
            line(),
            indent([
                join(
                    nodes(
                        spanNode('tsd-signature-symbol', ','),
                        spaceOrLine(),
                    ),
                    type.elements,
                    (item) => builder.type(item, TypeContext.tupleElement),
                ),
            ]),
            ifWrap(
                id,
                spanNode('tsd-signature-symbol', ','),
            ),
            line(),
            spanNode('tsd-signature-symbol', ']'),
        ]);
    },
    typeOperator(type, builder) {
        return nodes(
            spanNode('tsd-signature-keyword', type.operator),
            space(),
            builder.type(type.target, TypeContext.typeOperatorTarget),
        );
    },
    union(type, builder) {
        const parentId = builder.id;
        const id = builder.newId();
        const pipe = spanNode('tsd-signature-symbol', '|');

        const elements = type.types.flatMap((type, i) => [
            i === 0 ? ifWrap(id, nodes(pipe, space())) : space(),
            builder.type(type, TypeContext.unionElement),
            spaceOrLine(),
            pipe,
        ]);
        elements.pop(); // Remove last pipe
        elements.pop(); // Remove last spaceOrLine

        return group(id, [
            ifWrap(parentId, emptyNode, line()),
            ifWrap(parentId, nodes(...elements), indent(elements)),
        ]);
    },
    unknown(type) {
        return textNode(type.name);
    },
};

/**
 * Responsible for generating Nodes from a type tree.
 */
export class FormattedCodeBuilder {
    forceWrap = new Set<number>();
    id = 0;

    constructor(
        readonly router: Router,
        readonly relativeReflection: Reflection,
    ) {}

    urlTo(refl: Reflection) {
        return this.router.relativeUrl(this.relativeReflection, refl);
    }

    newId() {
        return ++this.id;
    }

    type(
        type: SomeType | undefined,
        where: TypeContext,
        options: {topLevelLinks: boolean} = {topLevelLinks: false},
    ): FormatterNode {
        if (!type) {
            return spanNode('tsd-signature-type', 'any');
        }

        if (type.needsParenthesis(where)) {
            const id = this.newId();
            return group(id, [
                textNode('('),
                line(),
                indent([type.visit(typeBuilder, this, options)]),
                line(),
                textNode(')'),
            ]);
        }
        return type.visit(typeBuilder, this, options);
    }

    reflection(
        reflection: DeclarationReflection,
        options: {topLevelLinks: boolean},
    ): FormatterNode {
        const members: FormatterNode[] = [];
        const children = reflection.getProperties();

        for (const item of children) {
            this.member(members, item, options);
        }

        if (reflection.indexSignatures) {
            for (const index of reflection.indexSignatures) {
                members.push(
                    nodes(
                        ...(index.flags.isReadonly ?
                            [
                                spanNode('tsd-signature-keyword', 'readonly'),
                                space(),
                            ] :
                            []),
                        spanNode('tsd-signature-symbol', '['),
                        spanNode(
                            getKindClass(index),
                            index.parameters![0].name,
                        ),
                        spanNode('tsd-signature-symbol', ':'),
                        space(),
                        this.type(index.parameters![0].type, TypeContext.none),
                        spanNode('tsd-signature-symbol', ']:'),
                        space(),
                        this.type(index.type, TypeContext.none),
                    ),
                );
            }
        }

        if (!members.length && reflection.signatures?.length === 1) {
            return this.signature(reflection.signatures[0], {
                hideName: true,
                arrowStyle: true,
            });
        }

        for (const item of reflection.signatures || []) {
            members.push(this.signature(item, {hideName: true}));
        }

        if (members.length) {
            const id = this.newId();
            if (options.topLevelLinks) {
                this.forceWrap.add(id);
            }
            return group(id, [
                spanNode('tsd-signature-symbol', '{'),
                spaceOrLine(),
                indent([
                    join(
                        nodes(
                            spanNode('tsd-signature-symbol', ';'),
                            spaceOrLine(),
                        ),
                        members,
                        (node) => node,
                    ),
                ]),
                ifWrap(
                    id,
                    spanNode('tsd-signature-symbol', ';'),
                ),
                spaceOrLine(),
                spanNode('tsd-signature-symbol', '}'),
            ]);
        }

        return spanNode('tsd-signature-symbol', '{}');
    }

    typeAlias(item: DeclarationReflection) {
        return nodes(
            spanNode('tsd-signature-keyword', 'type'),
            space(),
            spanNode(getKindClass(item), item.name),
            this.typeParameters(item),
            space(),
            spanNode('tsd-signature-symbol', '='),
            space(),
            this.reflection(item, {topLevelLinks: true}),
        );
    }

    interface(item: DeclarationReflection) {
        return nodes(
            spanNode('tsd-signature-keyword', 'interface'),
            space(),
            spanNode(getKindClass(item), item.name),
            this.typeParameters(item),
            space(),
            this.reflection(item, {topLevelLinks: true}),
        );
    }

    member(
        members: FormatterNode[],
        item: DeclarationReflection,
        options: {topLevelLinks: boolean},
    ): void {
        if (item.getSignature && item.setSignature) {
            members.push(
                this.signature(item.getSignature, options),
                this.signature(item.setSignature, options),
            );
            return;
        }

        if (item.getSignature) {
            members.push(this.signature(item.getSignature, options));
            return;
        }

        if (item.setSignature) {
            members.push(this.signature(item.setSignature, options));
            return;
        }

        if (item.signatures) {
            members.push(
                ...item.signatures.map((sig) => this.signature(sig, options)),
            );
            return;
        }

        members.push(
            nodes(
                this.propertyName(item, options),
                spanNode('tsd-signature-symbol', item.flags.isOptional ? '?:' : ':'),
                space(),
                this.type(item.type, TypeContext.none),
            ),
        );
    }

    signature(
        sig: SignatureReflection,
        options: {
            topLevelLinks?: boolean;
            hideName?: boolean;
            arrowStyle?: boolean;
        },
    ): FormatterNode {
        let name: FormatterNode = options.hideName ?
            emptyNode :
            this.propertyName(sig, options);
        switch (sig.kind) {
            case ReflectionKind.ConstructorSignature: {
                let label = emptyNode;
                if (sig.flags.isAbstract) {
                    label = nodes(
                        spanNode('tsd-signature-keyword', 'abstract'),
                        space(),
                    );
                }
                label = nodes(
                    label,
                    spanNode('tsd-signature-keyword', 'new'),
                    space(),
                );
                name = nodes(label, name);
                break;
            }
            case ReflectionKind.GetSignature: {
                name = nodes(
                    spanNode('tsd-signature-keyword', 'get'),
                    space(),
                    name,
                );
                break;
            }
            case ReflectionKind.SetSignature: {
                name = nodes(
                    spanNode('tsd-signature-keyword', 'set'),
                    space(),
                    name,
                );
                break;
            }
        }

        const id = this.newId();
        return group(id, [
            name,
            sig.parent.flags.isOptional ? spanNode('tsd-signature-symbol', '?') : emptyNode,
            this.typeParameters(sig),
            ...this.parameters(sig, id),
            nodes(
                options.arrowStyle ? space() : emptyNode,
                spanNode('tsd-signature-symbol', options.arrowStyle ? '=>' : ':'),
                space(),
                this.type(sig.type, TypeContext.none),
            ),
        ]);
    }

    private typeParameters(
        sig: SignatureReflection | DeclarationReflection,
    ): FormatterNode {
        if (!sig.typeParameters?.length) {
            return emptyNode;
        }

        const id = this.newId();
        return group(id, [
            spanNode('tsd-signature-symbol', '<'),
            line(),
            indent([
                join(
                    nodes(
                        spanNode('tsd-signature-symbol', ','),
                        spaceOrLine(),
                    ),
                    sig.typeParameters,
                    (item) => this.typeParameter(item),
                ),
            ]),
            ifWrap(
                id,
                spanNode('tsd-signature-symbol', ','),
            ),
            line(),
            spanNode('tsd-signature-symbol', '>'),
        ]);
    }

    private typeParameter(param: TypeParameterReflection) {
        let prefix = emptyNode;
        if (param.flags.isConst) {
            prefix = nodes(
                spanNode('tsd-signature-keyword', 'const'),
                space(),
            );
        }
        if (param.varianceModifier) {
            prefix = nodes(
                prefix,
                spanNode('tsd-signature-keyword', param.varianceModifier),
                space(),
            );
        }

        const content = [prefix];

        content.push(spanNode(
            ['tsd-signature-type', 'tsd-kind-type-parameter'],
            param.name,
            this.router.hasUrl(param) ? this.urlTo(param) : null,
        ));

        if (param.type) {
            content.push(
                space(),
                spanNode('tsd-signature-keyword', 'extends'),
                spaceOrLine(),
                indent([this.type(param.type, TypeContext.none)]),
            );
        }

        if (param.default) {
            content.push(
                space(),
                spanNode('tsd-signature-symbol', '='),
                space(),
                this.type(param.default, TypeContext.none),
            );
        }

        return group(this.newId(), content);
    }

    private parameters(sig: SignatureReflection, id: number): FormatterNode[] {
        if (!sig.parameters?.length) {
            return [
                spanNode('tsd-signature-symbol', '()'),
            ];
        }

        return [
            spanNode('tsd-signature-symbol', '('),
            line(),
            indent([
                join(
                    nodes(
                        spanNode('tsd-signature-symbol', ','),
                        spaceOrLine(),
                    ),
                    sig.parameters,
                    (item) => this.parameter(item),
                ),
            ]),
            ifWrap(
                id,
                spanNode('tsd-signature-symbol', ','),
            ),
            line(),
            spanNode('tsd-signature-symbol', ')'),
        ];
    }

    private parameter(param: ParameterReflection) {
        const content: FormatterNode[] = [];
        if (param.flags.isRest) {
            content.push(
                spanNode('tsd-signature-symbol', '...'),
            );
        }
        content.push(
            spanNode('tsd-kind-parameter', param.name),
        );

        if (param.flags.isOptional || param.defaultValue) {
            content.push(
                spanNode('tsd-signature-symbol', '?:'),
            );
        } else {
            content.push(
                spanNode('tsd-signature-symbol', ':'),
            );
        }
        // Tricky: We don't introduce a branch here via group()
        // the branch may be introduced by the union type if the parameter
        // value is a union.
        const id = this.newId();
        content.push(ifWrap(id, emptyNode, space()));
        content.push(this.type(param.type, TypeContext.none));
        return nodes(...content);
    }

    private propertyName(
        reflection: Reflection,
        options: {topLevelLinks?: boolean},
    ): FormatterNode {
        const entityName = /^[A-Z_$][\w$]*$/i.test(reflection.name) ?
            reflection.name :
            JSON.stringify(reflection.name);

        return spanNode(getKindClass(reflection), entityName, options.topLevelLinks ? this.urlTo(reflection) : null);
    }
}
