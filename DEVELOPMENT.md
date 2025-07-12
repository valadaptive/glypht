# Development

The code is a bit of a mess and not very well commented. Feel free to open an issue if you need help understanding any of it.

This project uses Git submodules heavily--if you cloned it without them, use `git submodule update --init --recursive` to initialize them.

There are currently two packages, `@glypht/core` (the font subsetting and compression logic) and `@glypht/web` (the webapp frontend).

Because bundling assets like WebAssembly and worker scripts is a famous unsolved problem in computer science, it's currently not possible to run a dev build with one command. If you're working on the web frontend, you'll need to run `npm run watch` in `glypht-core` in order to make sure everything is *really* getting rebuilt.

The `glypht-web` part is a standard Vite project--use `npm run dev` for a dev server and `npm run build` for a production build.

This project uses web workers, and Vite's implementation [only works in Chrome for dev builds](https://v3.vitejs.dev/guide/features.html#web-workers). For Firefox, you'll need to use a regular production build (e.g. via `vite build --watch` and `vite preview` in separate terminals).

The C/WebAssembly half uses Emscripten. While the compiled WebAssembly blobs are checked into the repository, you'll need to rebuild them if you touch the C code or need to export more functions. The easiest way to get the Emscripten SDK environment set up is to build using Docker (`npm run build-wasm`). You can also build them without Docker by [following the instructions for setting up the Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html) and then running the `build.sh` script inside `c-libs-wrapper`.

When switching between local and Docker builds, you may get some errors about the CMake cache. Delete the `brotli-build`, `woff2-build`, and `zlib-build` folders, and it should work.
