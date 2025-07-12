import typescript from '@rollup/plugin-typescript';
import inject from '@rollup/plugin-inject';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

export default [
    {
        input: [
            'src/index.ts',
        ],
        output: {
            dir: 'dist',
            format: 'esm',
            sourcemap: true,
            entryFileNames: '[name].js',
        },
        plugins: [
            typescript({tsconfig: './tsconfig.main.json', filterRoot: false}),
            // Vite will only treat a worker as a JS entrypoint if it matches the pattern `new Worker(new URL(...,
            // import.meta.url))`. If we `import Worker from 'web-worker';` ponyfill-style, Rollup will rename it to
            // `Worker$1` and Vite won't recognize it. Instead, we need to use the inject plugin to name it `Worker`.
            inject({
                Worker: 'web-worker',
            }),
        ],
        external: ['web-worker', 'os'],
    },
    {
        input: [
            'src/compression-worker.worker.ts',
            'src/font-worker.worker.ts',
        ],
        output: {
            dir: 'dist',
            format: 'esm',
            sourcemap: true,
            entryFileNames: '[name].js',
        },
        plugins: [
            typescript({tsconfig: './tsconfig.json', filterRoot: false}),
            {
                name: 'copy-wasm',
                async generateBundle() {
                    for (const wasmFile of ['hb.wasm', 'woff1.wasm', 'woff2.wasm']) {
                        const source = await fs.readFile(path.resolve('../c-libs-wrapper', wasmFile));
                        this.emitFile({
                            type: 'asset',
                            fileName: wasmFile,
                            source,
                        });
                    }
                },
            },
        ],
        external: ['module'],
    },
];
