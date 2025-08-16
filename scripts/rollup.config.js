import typescript from '@rollup/plugin-typescript';
import * as path from 'node:path';

// This config is for building the gen-google-fonts-list script so we can more easily run the HarfBuzz shaping stuff in
// worker threads (it takes forever single-threaded). Multithreaded JS is, as you know, a famous unsolved problem in
// computer science, and tools like jiti and vite-node are simply not up to the task of running web workers.
export default {
    input: [
        path.join(import.meta.dirname, 'gen-google-fonts-list.ts'),
        path.join(import.meta.dirname, 'google-fonts-meta-worker.ts'),
    ],
    output: {
        dir: path.join(import.meta.dirname, 'dist'),
        format: 'esm',
        entryFileNames: '[name].js',
        banner: 'global.isBundled = true;',
    },
    plugins: [
        typescript({tsconfig: path.join(import.meta.dirname, 'tsconfig.gflist.json'), filterRoot: false}),
    ],
    external: modulePath => {
        return !/^\.{0,2}\//.test(modulePath);
    },
};
