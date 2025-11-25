import typescript from '@rollup/plugin-typescript';
import inject from '@rollup/plugin-inject';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

/**
* @import {RollupOptions[]} from 'rollup'
*/

/** @type {RollupOptions[]} */
export default [
    {
        input: [
            'src/index.ts',
            'src/compression.ts',
            'src/subsetting.ts',
        ],
        output: {
            dir: 'dist',
            format: 'esm',
            entryFileNames: '[name].js',
        },
        plugins: [
            {
                name: 'clean-dist',
                async buildStart() {
                    await fs.rm(path.resolve(import.meta.dirname, 'dist'), {recursive: true, force: true});
                },
            },
            typescript({tsconfig: './tsconfig.main.json', filterRoot: false}),
            // Vite will only treat a worker as a JS entrypoint if it matches the pattern `new Worker(new URL(...,
            // import.meta.url))`. If we `import Worker from 'web-worker';` ponyfill-style, Rollup will rename it to
            // `Worker$1` and Vite won't recognize it. Instead, we need to use the inject plugin to name it `Worker`.
            inject({
                Worker: '@glypht/web-worker',
            }),
        ],
        external: ['@glypht/web-worker', 'os', 'node:url', 'node:fs/promises', '@smol-range/decompress'],
    },
    {
        input: [
            'src/compression-worker.worker.ts',
            'src/font-worker.worker.ts',
        ],
        output: {
            dir: 'dist',
            format: 'esm',
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
        external: ['module', 'os', 'node:url', 'node:fs/promises', '@smol-range/decompress'],
    },
];
