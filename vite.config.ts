import {defineConfig} from 'vite';
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
        //analyzer(),
    ],
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },
});
