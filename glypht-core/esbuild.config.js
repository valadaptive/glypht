import * as esbuild from 'esbuild';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

await esbuild.build({
    entryPoints: ['src/index.ts', 'src/compression-worker.worker.ts', 'src/font-worker.worker.ts'],
    bundle: true,
    outdir: 'dist',
    loader: {
        '.wasm': 'file',
    },
    format: 'esm',
    //external: ['module', 'webworker-shim'],
    packages: 'external',
});

for (const wasmFile of ['hb.wasm', 'woff1.wasm', 'woff2.wasm']) {
    await fs.copyFile(
        path.resolve(import.meta.dirname, '../c-libs-wrapper', wasmFile),
        path.resolve(import.meta.dirname, 'dist', wasmFile),
    );
}
