import typescript from '@rollup/plugin-typescript';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

export default {
    input: [
        'src/index.ts',
        'src/unicode-ranges.ts',
        'src/feature-metadata.ts',
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
    ],
    external: ['@glypht/core'],
};
