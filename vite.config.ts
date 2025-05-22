import {defineConfig, HtmlTagDescriptor, Plugin} from 'vite';
import preact from '@preact/preset-vite';

// import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
//import {analyzer} from 'vite-bundle-analyzer';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        preact(),
        //wasm() as Plugin,
        topLevelAwait(),
        {
            name: 'isolation',
            configureServer(server) {
                server.middlewares.use((_req, res, next) => {
                    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
                    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
                    next();
                });
            },
        },
        preloadPlugin([
            {
                regex: /-worker-[^.]+\.js$/,
                attrs: {rel: 'modulepreload', crossorigin: 'anonymous'},
            },
        ]),
        //analyzer(),
    ],
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },
    build: {
        minify: false,
        modulePreload: {polyfill: false},
    },
});

type ModulePreloadMatch = {
    regex: RegExp;
    attrs: {rel: 'preload' | 'modulepreload'} & Record<string, string>;
};

// Adapted from https://github.com/nstringham/othello-web-app/commit/942e70a5892e386c60035790a474ba22ef05d30f
function preloadPlugin(match: ModulePreloadMatch[]): Plugin {
    let baseUrl: string;
    return {
        name: 'modulePreload',

        configResolved({base}) {
            baseUrl = base;
        },

        transformIndexHtml(html, {bundle}) {
            if (!bundle) return;
            const newTags: HtmlTagDescriptor[] = [];

            for (const chunk of Object.values(bundle)) {
                // eslint-disable-next-line prefer-const
                for (let {regex, attrs} of match) {
                    if (!regex.test(chunk.fileName)) continue;

                    newTags.push({
                        tag: 'link',
                        attrs: {href: baseUrl + chunk.fileName, ...attrs},
                        injectTo: 'head-prepend',
                    });
                }
            }

            return newTags;
        },
    };
}
