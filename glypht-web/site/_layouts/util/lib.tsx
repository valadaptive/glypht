import type {
    CommentDisplayPart,
    ContainerReflection,
    DocumentReflection,
    Reflection,
    TypeParameterReflection,
} from 'typedoc';
import {
    DeclarationReflection,
    ProjectReflection,
    ReferenceReflection,
    ReflectionKind,
    SignatureReflection,
} from 'typedoc';
import type {JSX as PreactJSX} from 'preact';

// Utility type to make JSX compatible with both TypeDoc and Preact
export type JSXChildren = PreactJSX.Element | PreactJSX.Element[] | string | number | null | undefined;

// Utility classes ported from TypeDoc
export class DefaultMap<K, V> extends Map<K, V> {
    constructor(private creator: (key: K) => V) {
        super();
    }

    override get(key: K): V {
        const saved = super.get(key);
        if (saved !== undefined) {
            return saved;
        }

        const created = this.creator(key);
        this.set(key, created);
        return created;
    }

    getNoInsert(key: K): V | undefined {
        return super.get(key);
    }
}

export function filterMap<T, U>(
    iter: Iterable<T> | undefined,
    fn: (item: T) => U | undefined,
): U[] {
    const result: U[] = [];

    for (const item of iter || []) {
        const newItem = fn(item);
        if (newItem !== void 0) {
            result.push(newItem);
        }
    }

    return result;
}

export function stringify(data: unknown): string {
    if (typeof data === 'bigint') {
        return data.toString() + 'n';
    }
    return JSON.stringify(data);
}

export function getDisplayName(refl: Reflection): string {
    let version = '';
    const hasPackageVersion = (refl instanceof DeclarationReflection || refl instanceof ProjectReflection) &&
        'packageVersion' in refl && refl.packageVersion;
    if (hasPackageVersion) {
        version = ` - v${refl.packageVersion}`;
    }

    return `${refl.name}${version}`;
}

export function toStyleClass(str: string): string {
    return str.replace(/(\w)([A-Z])/g, (_m, m1: string, m2: string) => m1 + '-' + m2).toLowerCase();
}

export function getKindClass(refl: Reflection): string {
    if (refl instanceof ReferenceReflection) {
        return getKindClass(refl.getTargetReflectionDeep());
    }
    return ReflectionKind.classString(refl.kind);
}

/**
 * Insert word break tags into the given string.
 * Breaks the given string at `_`, `-` and capital letters.
 */
export function wbr(str: string): (string | PreactJSX.Element)[] {
    const parts = str.split(/(?<=[^A-Z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|(?<=[_-])(?=[^_-])/);
    return parts.flatMap(p => [p, <wbr />]).slice(0, -1);
}

export function join<T>(joiner: JSXChildren, list: readonly T[], cb: (x: T) => JSXChildren): PreactJSX.Element {
    const result: JSXChildren[] = [];

    for (const item of list) {
        if (result.length > 0) {
            result.push(joiner);
        }
        result.push(cb(item));
    }

    return <>{...result}</>;
}

export function hasTypeParameters(
    reflection: Reflection,
): reflection is Reflection & {typeParameters: TypeParameterReflection[]} {
    return (
        (reflection instanceof DeclarationReflection || reflection instanceof SignatureReflection) &&
        'typeParameters' in reflection &&
        reflection.typeParameters !== null &&
        reflection.typeParameters !== undefined &&
        reflection.typeParameters.length > 0
    );
}

/**
 * Renders the reflection name with an additional `?` if optional.
 */
export function renderName(refl: Reflection): (string | PreactJSX.Element)[] {
    if (refl.flags.isOptional) {
        return [...wbr(refl.name), '?'];
    }

    return wbr(refl.name);
}

export function isNoneSection(section: MemberSection): boolean {
    return section.title.toLocaleLowerCase() === 'none';
}

function sortNoneSectionFirst(a: MemberSection, b: MemberSection): number {
    if (isNoneSection(a)) {
        return -1;
    }
    if (isNoneSection(b)) {
        return 1;
    }
    return 0;
}

export interface MemberSection {
    title: string;
    description?: CommentDisplayPart[];
    children: Array<DocumentReflection | DeclarationReflection>;
}

export function getMemberSections(
    parent: ContainerReflection,
    childFilter: (refl: Reflection) => boolean = () => true,
): MemberSection[] {
    if (parent.categories?.length) {
        return filterMap(parent.categories, (cat) => {
            const children = cat.children.filter(childFilter);
            if (!children.length) return;
            return {
                title: cat.title,
                description: cat.description,
                children,
            };
        }).sort(sortNoneSectionFirst);
    }

    if (parent.groups?.length) {
        return parent.groups.flatMap((group) => {
            if (group.categories?.length) {
                return filterMap(group.categories.slice().sort(sortNoneSectionFirst), (cat) => {
                    const children = cat.children.filter(childFilter);
                    if (!children.length) return;
                    return {
                        title: isNoneSection(cat) ? group.title : `${group.title} - ${cat.title}`,
                        description: cat.description,
                        children,
                    };
                });
            }

            const children = group.children.filter(childFilter);
            if (!children.length) return [];
            return {
                title: group.title,
                description: group.description,
                children,
            };
        }).sort(sortNoneSectionFirst);
    }

    if (parent.children?.length) {
        return [{
            title: 'none',
            children: parent.children || [],
        }];
    }

    return [];
}

// Cache for collision counting
const nameCollisionCache = new WeakMap<ProjectReflection, DefaultMap<string, number>>();

function getNameCollisionCount(project: ProjectReflection, name: string): number {
    let collisions = nameCollisionCache.get(project);
    if (collisions === undefined) {
        collisions = new DefaultMap(() => 0);
        for (const reflection of project.getReflectionsByKind(ReflectionKind.SomeExport)) {
            collisions.set(reflection.name, collisions.get(reflection.name) + 1);
        }
        nameCollisionCache.set(project, collisions);
    }
    return collisions.get(name);
}

function getNamespacedPath(reflection: Reflection): Reflection[] {
    const path = [reflection];
    let parent = reflection.parent;
    while (parent?.kindOf(ReflectionKind.Namespace)) {
        path.unshift(parent);
        parent = parent.parent;
    }
    return path;
}

/**
 * Returns a (hopefully) globally unique path for the given reflection.
 *
 * This only works for exportable symbols, so e.g. methods are not affected by this.
 *
 * If the given reflection has a globally unique name already, then it will be returned as is. If the name is
 * ambiguous (i.e. there are two classes with the same name in different namespaces), then the namespaces path of the
 * reflection will be returned.
 */
export function getUniquePath(reflection: Reflection): Reflection[] {
    if (reflection.kindOf(ReflectionKind.SomeExport)) {
        if (getNameCollisionCount(reflection.project, reflection.name) >= 2) {
            return getNamespacedPath(reflection);
        }
    }
    return [reflection];
}

export function assertNever(x: never): never {
    throw new Error('Unexpected value: ' + String(x));
}
