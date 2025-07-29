import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

export default {
    input: [
        'src/index.ts',
        'src/bin.ts',
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
        // valibot contains ~1.7MB of stuff like email, timestamp, and IP/MAC address validation, but we only use very
        // basic features
        nodeResolve({resolveOnly: ['valibot']}),
    ],
};
