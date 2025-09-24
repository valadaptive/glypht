import {
    Application,
    DeclarationReflection,
    ProjectReflection,
    KindRouter,
} from 'typedoc';
import * as path from 'path';

const resolvePath = (p: string) => path.resolve(import.meta.dirname, p);

interface Node {
    name: string;
    children?: Node[];
}

export type DocsPage = {
    name: string;
    permalink: string;
    navKey: string;
    navParent?: string;
    navOrder: number;
    item: DeclarationReflection;
    router: KindRouter;
    project: ProjectReflection;
    application: Application;
};

async function genApiDocs(): Promise<DocsPage[]> {
    const tdApp = await Application.bootstrapWithPlugins({
        entryPointStrategy: 'packages',
        entryPoints: [
            resolvePath('../../../glypht-core'),
            resolvePath('../../../glypht-bundler'),
            resolvePath('../../../glypht-cli'),
        ],
        tsconfig: resolvePath('../../../tsconfig.docs.json'),
        sort: [
            'kind',
            'instance-first',
            'source-order',
        ],
        name: 'api',
        navigation: {
            includeGroups: true,
        },
        categorizeByGroup: true,
        plugin: ['typedoc-plugin-mdn-links'],
    });
    const project = await tdApp.convert();
    if (!project) throw new Error('No TypeDoc project present');
    const router = new KindRouter(tdApp);
    router.buildPages(project);
    tdApp.renderer.router = router;

    const docsPages: DocsPage[] = [];

    const traverseChild = (item: DeclarationReflection, index: number): Node => {
        if (router.hasOwnDocument(item)) {
            docsPages.push({
                name: item.name,
                permalink: router.getFullUrl(item),
                navKey: item.getFullName().replace(/[^a-zA-Z0-9_]/g, '_'),
                navParent: item.parent?.getFullName().replace(/[^a-zA-Z0-9_]/g, '_') ?? 'api',
                navOrder: index,
                item,
                router,
                project,
                application: tdApp,
            });
        }

        const children: Node[] = [];
        if (item.children) {
            for (let i = 0; i < item.children.length; i++) {
                children.push(traverseChild(item.children[i], i));
            }
        }
        return {name: item.name, children: children.length > 0 ? children : undefined};
    };

    const projectChildren = project.children!;
    for (let i = 0; i < projectChildren.length; i++) {
        traverseChild(projectChildren[i], i);
    }

    return docsPages;
}

export default genApiDocs;
