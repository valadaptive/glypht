import {defineConfig} from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        preact(),
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
    ],
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },
    worker: {
        format: 'es',
    },
    resolve: {
        alias: {
            'pagefind-web': '../public/pagefind/pagefind.js',
        },
    },
    build: {
        minify: 'esbuild',
    },
});
