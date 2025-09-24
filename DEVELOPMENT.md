# Development

This project uses Git submodules heavily--if you cloned it without them, use `git submodule update --init --recursive` to initialize them.

## Project Structure

This is a monorepo with four packages:

- `@glypht/core` - Font subsetting and compression logic
- `@glypht/bundler` - Higher-level functionality for bundling, splitting, and transforming font files
- `@glypht/cli` - Command-line interface for font processing
- `@glypht/web` - Web application frontend and documentation site

## Building

To build all packages, run `npm run build` from the root directory. This builds the packages in dependency order.

## Web Development

The `glypht-web` package contains both the interactive web application and a static site:

- **Just the web app**: Use `npm run dev` for a dev server and `npm run build` for a production build
- **The full static site**: Use `npm run site:dev` for live development and `npm run site:build` to generate static files

The static site uses a multi-step build process:
1. TypeDoc generates API documentation from source code
2. Eleventy combines the API docs with manually-written documentation into static pages
3. Vite builds the final site, including dynamic components and CSS compilation from SCSS

Because bundling assets like WebAssembly and worker scripts is complex, you may need to run `npm run watch` in `glypht-core` (maybe other subpackages too?) when working on the web frontend to ensure dependencies are rebuilt properly.

This project uses web workers, and Vite's implementation [only works in Chrome for dev builds](https://v3.vitejs.dev/guide/features.html#web-workers). For Firefox, you'll need to use a regular production build (e.g. via `vite build --watch` and `vite preview` in separate terminals).

## WebAssembly Development

The C/WebAssembly components use Emscripten. Compiled WebAssembly blobs are checked into the repository, but you'll need to rebuild them if you modify C code or need to export additional functions.

The easiest way to build is using Docker: `npm run build-wasm` from the root directory.

You can also build without Docker by [setting up the Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html) and running the `build.sh` script inside `c-libs-wrapper`. You should install the Emscripten SDK version used in the Dockerfile--Emscripten does not respect semver and regularly makes breaking changes.

When switching between local and Docker builds, you may get some errors about the CMake cache. Delete the `brotli-build`, `woff2-build`, and `zlib-build` folders, and it should work.
