/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'clsx';

type NavEntry = {
    data: unknown;
    key: string;
    title: string;
    url: string;
    children: NavEntry[];
};

const NavSidebarPage = ({entry, activeKey, path}: {entry: NavEntry; activeKey?: string; path?: NavEntry[]}) => {
    const title = <a
        class={classNames('navigation-sidebar-entry-title', entry.key === activeKey && 'navigation-active')}
        href={entry.url}
    >{entry.title}</a>;

    return (
        <li class="navigation-sidebar-page">
            {entry.children.length > 0 ?
                <details open={path?.some(pathEntry => pathEntry.key === entry.key)}>
                    <summary>{title}</summary>
                    {entry.children.length > 0 ?
                        <ul>
                            {entry.children.map(child =>
                                <NavSidebarPage entry={child} activeKey={activeKey} path={path} />)}
                        </ul> :
                        null}
                </details> :
                title
            }

        </li>
    );
};

export default class {
    data() {
        return {
            layout: 'base.html',
            'nav-slug': 'docs',
        };
    }

    render(this: {
        eleventyNavigation(pages: unknown): NavEntry[];
        eleventyNavigationBreadcrumb(pages: unknown, activeKey: string, options?: {includeSelf: boolean}): NavEntry[];
    }, data: any) {
        const navEntries = this.eleventyNavigation(data.collections.all);
        const navKey: string | undefined = data.eleventyNavigation?.key;
        const navPath = navKey ?
            this.eleventyNavigationBreadcrumb(data.collections.all, navKey, {includeSelf: true}) :
            undefined;

        return <>
            <div class="nav-cols">
                <details class="navigation-details" open>
                    <summary class="navigation-summary">Navigation</summary>
                    <div class="navigation-sidebar">
                        <ul>{navEntries.map(entry =>
                            <NavSidebarPage entry={entry} activeKey={navKey} path={navPath} />)}</ul>
                    </div>
                </details>
                <div id="content" data-pagefind-body>
                    <h1>{data.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: data.content as string}} />
                </div>
            </div>
            <script type="module" src="/src/docs.tsx"></script>
        </>;
    }
};
