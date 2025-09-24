import {type Reflection, type CommentDisplayPart, type Router, ReflectionKind, TagString} from 'typedoc';
import type {JSX} from 'preact';
import MarkdownIt from 'markdown-it';
import {assertNever, toStyleClass} from './lib';

// Simplified options interface
export interface SimpleOptions {
    typePrintWidth: number;
    sourceLinkExternal: boolean;
    useFirstParagraphOfCommentAsSummary: boolean;
    notRenderedTags: readonly `@${string}`[];
    includeHierarchySummary: boolean;
    visibilityFilters: Record<string, string>;
}

// Simplified icons interface
export interface SimpleIcons {
    chevronDown: () => JSX.Element;
    anchor: () => JSX.Element;
}

// Our own simple context class
export class SimpleThemeContext {
    public router: Router;
    private mdLib: MarkdownIt;
    public model: Reflection;
    public options: SimpleOptions;
    public icons: SimpleIcons;

    constructor(
        router: Router,
        mdLib: MarkdownIt,
        model: Reflection,
        options: SimpleOptions,
        icons: SimpleIcons,
    ) {
        this.router = router;
        this.mdLib = mdLib;
        this.model = model;
        this.options = options;
        this.icons = icons;
    }

    relativeURL(url: string) {
        return this.router.baseRelativeUrl(this.model, url);
    }

    // Core functionality that context provides
    urlTo(reflection: Reflection): string {
        return this.router.relativeUrl(this.model, reflection);
    }

    getAnchor(reflection: Reflection): string | undefined {
        return this.router.getAnchor(reflection);
    }

    getReflectionClasses(reflection: Reflection): string {
        const classes = new Set<string>();

        // Filter classes should match up with the settings function in
        // partials/navigation.tsx.
        for (const key of Object.keys(this.options.visibilityFilters)) {
            if (key === 'inherited') {
                if (reflection.flags.isInherited) {
                    classes.add('tsd-is-inherited');
                }
            } else if (key === 'protected') {
                if (reflection.flags.isProtected) {
                    classes.add('tsd-is-protected');
                }
            } else if (key === 'private') {
                if (reflection.flags.isPrivate) {
                    classes.add('tsd-is-private');
                }
            } else if (key === 'external') {
                if (reflection.flags.isExternal) {
                    classes.add('tsd-is-external');
                }
            } else if (key.startsWith('@')) {
                if (key === '@deprecated') {
                    if (reflection.isDeprecated()) {
                        classes.add(toStyleClass(`tsd-is-${key.substring(1)}`));
                    }
                } else if (
                    reflection.comment?.hasModifier(key as TagString) ||
                    reflection.comment?.getTag(key as TagString)
                ) {
                    classes.add(toStyleClass(`tsd-is-${key.substring(1)}`));
                } else if (reflection.isDeclaration()) {
                    const ownSignatures = reflection.getNonIndexSignatures();
                    // Check methods and accessors, find common tags, elevate
                    if (
                        ownSignatures.length &&
                        ownSignatures.every(
                            (refl) => refl.comment?.hasModifier(key as TagString) ||
                                refl.comment?.getTag(key as TagString),
                        )
                    ) {
                        classes.add(toStyleClass(`tsd-is-${key.substring(1)}`));
                    }
                }
            }
        }

        return Array.from(classes).join(' ');
    }

    markdown(parts: readonly CommentDisplayPart[]): string {
        return this.mdLib.render(this.displayPartsToMarkdown(parts));
    }

    private displayPartsToMarkdown(parts: readonly CommentDisplayPart[]): string {
        const useHtml = !!this.mdLib.options.html;
        const result: string[] = [];

        for (const part of parts) {
            switch (part.kind) {
                case 'text':
                case 'code':
                    result.push(part.text);
                    break;
                case 'inline-tag':
                    switch (part.tag) {
                        case '@label':
                        case '@inheritdoc': // Shouldn't happen
                            break; // Not rendered.
                        case '@link':
                        case '@linkcode':
                        case '@linkplain': {
                            if (part.target) {
                                let url: string | undefined;
                                let kindClass: string | undefined;
                                if (typeof part.target === 'string') {
                                    url = part.target === '#' ? undefined : part.target;
                                } else if ('id' in part.target) {
                                    // No point in trying to resolve a ReflectionSymbolId at this point, we've already
                                    // tried and failed during the resolution step. Warnings related to those broken
                                    // links have already been emitted.
                                    kindClass = ReflectionKind.classString(part.target.kind);
                                    if (this.router.hasUrl(part.target)) {
                                        url = this.urlTo(part.target);
                                    }

                                    // If we don't have a URL the user probably linked to some deeply nested property
                                    // which doesn't get an assigned URL. We'll walk upwards until we find a reflection
                                    // which has a URL and link to that instead.
                                    if (typeof url === 'undefined') {
                                        // Walk upwards to find something we can link to.
                                        let target = part.target.parent!;
                                        while (!this.router.hasUrl(target)) {
                                            target = target.parent!;
                                        }

                                        // We know we'll always end up with a URL here eventually as the
                                        // project always has a URL.
                                        url = this.urlTo(target);
                                    }

                                    // If the url goes to this page, render as `#`
                                    // to go to the top of the page.
                                    if (url === '') {
                                        url = '#';
                                    }
                                }

                                if (useHtml) {
                                    const text = part.tag === '@linkcode' ? `<code>${part.text}</code>` : part.text;
                                    result.push(
                                        url ?
                                            `<a href="${url}"${kindClass ? ` class="${kindClass}"` : ''}>${text}</a>` :
                                            part.text,
                                    );
                                } else {
                                    const text = part.tag === '@linkcode' ? '`' + part.text + '`' : part.text;
                                    result.push(url ? `[${text}](${url})` : text);
                                }
                            } else {
                                result.push(part.text);
                            }
                            break;
                        }
                        default:
                            // Hmm... probably want to be able to render these somehow, so custom inline tags can be
                            // given special rendering rules. Future capability. For now, just render their text.
                            result.push(`{${part.tag} ${part.text}}`);
                            break;
                    }
                    break;
                case 'relative-link':
                    switch (typeof part.target) {
                        case 'number': {
                            const refl = this.model.project.files.resolve(part.target, this.model.project);
                            let url: string | undefined;
                            if (typeof refl === 'object') {
                                // #3006, this is an unfortunate heuristic. If there is a relative link to the project
                                // the user probably created it by linking to the directory of the project or to
                                // the project's readme. Since the readme doesn't get its own reflection, we can't
                                // reliably disambiguate this and instead will arbitrarily decide to reference the
                                // root index page in this case.
                                if (refl.isProject()) {
                                    url = this.relativeURL('./');
                                } else {
                                    url = this.urlTo(refl);
                                }
                            } else {
                                const fileName = this.model.project.files.getName(part.target);
                                if (fileName) {
                                    url = this.relativeURL(`media/${fileName}`);
                                }
                            }

                            if (typeof url !== 'undefined') {
                                if (part.targetAnchor) {
                                    url += '#' + part.targetAnchor;
                                }
                                result.push(url);
                                break;
                            }
                        }
                        // fall through
                        case 'undefined':
                            result.push(part.text);
                            break;
                    }
                    break;
                default:
                    assertNever(part);
            }
        }

        return result.join('');
    }

    // Slugger for anchor generation
    get slugger() {
        return this.router.getSlugger(this.model);
    };
}
