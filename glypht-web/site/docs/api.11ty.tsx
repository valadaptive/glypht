import MarkdownIt from 'markdown-it';

import {DocsPage} from '../_data/apiDocs';
import {SimpleThemeContext} from '../_layouts/util/context';
import {reflectionTemplate} from '../_layouts/templates/reflection';

export default class {
    data() {
        return {
            pagination: {
                data: 'apiDocs',
                size: 1,
                alias: 'apiPage',
                addAllPagesToCollections: true,
            },
            layout: 'docs.11ty.tsx',
            permalink: (data: {apiPage: DocsPage}) => `docs/api/${data.apiPage.permalink}`,
            eleventyComputed: {
                title: (data: {apiPage: DocsPage}) => data.apiPage.name,
                eleventyNavigation: {
                    key: (data: {apiPage: DocsPage}) => data.apiPage.navKey,
                    title: (data: {apiPage: DocsPage}) => data.apiPage.name,
                    parent: (data: {apiPage: DocsPage}) => data.apiPage.navParent,
                    order: (data: {apiPage: DocsPage}) => data. apiPage.navOrder,
                },
            },
        };
    }

    render(data: {apiPage: DocsPage; mdLib: MarkdownIt}) {
        const {apiPage, mdLib} = data;

        const ctx = new SimpleThemeContext(apiPage.router, mdLib, apiPage.item, {
            typePrintWidth: 80,
            sourceLinkExternal: false,
            useFirstParagraphOfCommentAsSummary: false,
            notRenderedTags: [
                '@showCategories',
                '@showGroups',
                '@hideCategories',
                '@hideGroups',
                '@disableGroups',
                '@expand',
                '@preventExpand',
                '@expandType',
                '@summary',
                '@group',
                '@groupDescription',
                '@category',
                '@categoryDescription',
            ],
            includeHierarchySummary: false,
            visibilityFilters: {},
        }, {
            chevronDown: () => <span class="icon icon-arrow-down" />,
            anchor: () => <span class="icon icon-link" />,
        });

        return <div class="api-doc">{reflectionTemplate(ctx)}</div>;
    }
};
