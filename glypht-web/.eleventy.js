import {defu as merge} from 'defu';
import Shiki from '@shikijs/markdown-it';

import * as path from 'path';
import * as fs from 'node:fs/promises';
import renderPreact from 'preact-render-to-string';
import * as pagefind from 'pagefind';
import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItFootnote from 'markdown-it-footnote';
import 'tsx/esm';

import {eleventyImageTransformPlugin} from '@11ty/eleventy-img';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import {RenderPlugin} from '@11ty/eleventy';
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';

/**
 * @typedef { import("@11ty/eleventy/UserConfig").default } UserConfig
 */

/**
 * @typedef { import("typedoc").ProjectReflection } ProjectReflection
 */

/**
 *
 * @param {UserConfig} eleventyConfig
 */
export default async function(eleventyConfig) {
    // Add passthrough copies for static assets
    eleventyConfig.addPassthroughCopy('site/assets');
    eleventyConfig.addPassthroughCopy('src');
    eleventyConfig.addPassthroughCopy('public');

    // We need to generate the Pagefind files *before* the Vite build, always.
    eleventyConfig.setEventEmitterMode('sequential');

    eleventyConfig.addDataExtension('ts', async(contents, filePath) => {
        const imported = await import(filePath);
        return imported.default();
    });

    const shikiTheme = JSON.parse(await fs.readFile(new URL(import.meta.resolve('./src/generated/shiki-theme.json'))));

    const mdLib = new MarkdownIt({html: true})
        .use(markdownItAttrs)
        .use(markdownItAnchor, {permalink: markdownItAnchor.permalink.headerLink({safariReaderFix: true})})
        .use(markdownItFootnote)
        .use(await Shiki({theme: shikiTheme}));
    eleventyConfig.addGlobalData('mdLib', mdLib);
    eleventyConfig.setLibrary('md', mdLib);

    // Add template formats for TypeScript/JSX files
    eleventyConfig.addTemplateFormats(['11ty.jsx', '11ty.ts', '11ty.tsx']);

    eleventyConfig.addExtension(['11ty.jsx', '11ty.ts', '11ty.tsx'], {
        key: '11ty.js',
        compile: function() {
            return async function(data) {
                const content = await this.defaultRenderer(data);
                return renderPreact(content);
            };
        },
    });

    eleventyConfig.addPlugin(RenderPlugin);

    // Add image processing plugin
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        widths: ['auto'],
        formats: ['svg', 'webp'],
        svgShortCircuit: true,
        urlPath: '/assets/images/',
        outputDir: '_site/assets/images/',
        htmlOptions: {
            imgAttributes: {
                loading: 'lazy',
                decoding: 'async',
            },
        },
        transformOnRequest: false,
    });

    eleventyConfig.addPlugin(eleventyNavigationPlugin);


    eleventyConfig.addCollection('indexablePages', function(collectionsApi) {
        return collectionsApi.getAll().filter(function(item) {
            return item.page.outputFileExtension === 'html';
        });
    });

    eleventyConfig.on('eleventy.after', async function({dir, outputMode, results}) {
        if (outputMode !== 'fs') return;

        const {errors, index} = await pagefind.createIndex();
        if (errors.length > 0) throw new Error(errors.join('\n'));

        for (const result of results) {
            if (result.outputPath.endsWith('.html')) {
                const {errors} = await index.addHTMLFile({url: result.url, content: result.content});
                for (const error of errors) {
                    // eslint-disable-next-line no-console
                    console.warn(error);
                }
            }
        }

        await index.writeFiles({outputPath: path.join(dir.output, 'public', 'pagefind')});
        // We don't use these
        await Promise.all([
            fs.unlink(path.join(dir.output, 'public', 'pagefind', 'pagefind-ui.js')),
            fs.unlink(path.join(dir.output, 'public', 'pagefind', 'pagefind-ui.css')),
            fs.unlink(path.join(dir.output, 'public', 'pagefind', 'pagefind-modular-ui.js')),
            fs.unlink(path.join(dir.output, 'public', 'pagefind', 'pagefind-modular-ui.css')),
            fs.unlink(path.join(dir.output, 'public', 'pagefind', 'pagefind-highlight.js')),
        ]);
        await index.deleteIndex();
    });

    const viteConfig = (await import('./vite.config.ts')).default;
    // Add Vite plugin for building the webapp
    eleventyConfig.addPlugin(EleventyVitePlugin, {
        tempFolderName: '.11ty-vite',
        viteOptions: merge(viteConfig, {
            clearScreen: false,
            build: {
                emptyOutDir: true,
                minify: false,
            },
        }),
    });

    return {
        dir: {
            input: 'site',
            output: '_site',
            includes: '_includes',
            layouts: '_layouts',
            data: '_data',
        },
    };
}
