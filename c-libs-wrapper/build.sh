#!/bin/bash
set -e

# brotli + woff2

mkdir -p woff2-build
cd woff2-build
emcmake cmake \
    -DCMAKE_POLICY_DEFAULT_CMP0069=NEW \
    -DCMAKE_INTERPROCEDURAL_OPTIMIZATION=TRUE \
    -DNOISY_LOGGING=OFF \
    -DBUILD_SHARED_LIBS=OFF \
    -DBROTLI_STATIC_INIT=EARLY \
    -DCMAKE_BUILD_TYPE=MinSizeRel \
    ../woff2
emmake make -j16 woff2enc woff2dec

cd ..

em++ \
    -std=c++11 \
    -fno-exceptions \
    -fno-rtti \
    -fno-threadsafe-statics \
    -flto \
    -Oz \
    -Iwoff2/include \
    --no-entry \
    -c \
    woff2-wrapper.cc

em++ \
    -s MODULARIZE \
    -s EXPORT_ES6 \
    -s EXPORT_NAME=createWoff2 \
    -s EXPORTED_FUNCTIONS=@woff2.symbols \
    -s EXPORTED_RUNTIME_METHODS='["addFunction", "wasmMemory", "wasmExports", "stackAlloc", "stackRestore", "stackSave", "HEAPU8", "HEAPU32", "HEAPF32"]' \
    -s INITIAL_MEMORY=65MB \
    -s ALLOW_TABLE_GROWTH \
    -s ALLOW_MEMORY_GROWTH \
    -s MAIN_MODULE=0 \
    -s TEXTDECODER=2 \
    -s DYNAMIC_EXECUTION=0 \
    -s ASSERTIONS=0 \
    -s STANDALONE_WASM=1 \
    -s FILESYSTEM=0 \
    -s ENVIRONMENT=web,webview,worker,node \
    -o woff2.js \
    --emit-tsd woff2.d.ts \
    -Oz \
    -flto \
    --no-entry \
    woff2-wrapper.o \
    woff2-build/libwoff2common.a \
    woff2-build/libwoff2dec.a \
    woff2-build/libwoff2enc.a \
    woff2-build/brotli/libbrotlicommon.a \
    woff2-build/brotli/libbrotlidec.a \
    woff2-build/brotli/libbrotlienc.a

# zlib(-ng) + zopfli + woff1

mkdir -p zlib-build
cd zlib-build
emcmake cmake \
    -DCMAKE_INTERPROCEDURAL_OPTIMIZATION=ON \
    -DBUILD_SHARED_LIBS=OFF \
    -DCMAKE_BUILD_TYPE=MinSizeRel \
    -DZLIB_COMPAT=ON \
    -DZLIB_ENABLE_TESTS=OFF \
    -DWITH_GZFILEOP=OFF \
    -DWITH_RUNTIME_CPU_DETECTION=OFF \
    -DWITH_GTEST=OFF \
    ../zlib-ng
emmake make -j16 zlib CFLAGS="-Oz"

cd ../sfnt2woff-zopfli
emmake make -j16 ZLIB_CFLAGS=-I../zlib-build CFLAGS="-Oz" woff

cd ..

emcc \
    -s MODULARIZE \
    -s EXPORT_ES6 \
    -s EXPORT_NAME=createWoff1 \
    -s EXPORTED_FUNCTIONS=@woff1.symbols \
    -s EXPORTED_RUNTIME_METHODS='["addFunction", "wasmMemory", "wasmExports", "stackAlloc", "stackRestore", "stackSave", "HEAPU8", "HEAPU32", "HEAPF32"]' \
    -s INITIAL_MEMORY=65MB \
    -s ALLOW_TABLE_GROWTH \
    -s ALLOW_MEMORY_GROWTH \
    -s MAIN_MODULE=0 \
    -s TEXTDECODER=2 \
    -s DYNAMIC_EXECUTION=0 \
    -s ASSERTIONS=0 \
    -s STANDALONE_WASM=1 \
    -s FILESYSTEM=0 \
    -s ENVIRONMENT=web,webview,worker,node \
    -o woff1.js \
    --emit-tsd woff1.d.ts \
    -Oz \
    -flto \
    --no-entry \
    sfnt2woff-zopfli/*.o \
    zlib-build/libz.a

# blake3 (for hashing fonts with no UID)

emcc \
    -Oz \
    -c \
    -fPIC \
    --no-entry \
    -IBLAKE3/c \
    BLAKE3/c/blake3.c \
    BLAKE3/c/blake3_dispatch.c \
    BLAKE3/c/blake3_portable.c \
    blake3-wrapper.c

# harfbuzz (+ blake3 in the same file)

em++ \
    -std=c++11 \
    -fno-exceptions \
    -fno-rtti \
    -fno-threadsafe-statics \
    -fvisibility-inlines-hidden \
    -flto \
    -Oz \
    -I. \
    --no-warnings \
    -DHB_TINY \
    -DHB_USE_INTERNAL_QSORT \
    -DHB_CONFIG_OVERRIDE_H=\"config-override.h\" \
    -DHB_EXPERIMENTAL_API \
    --no-entry \
    -c \
    harfbuzz/src/harfbuzz-subset.cc

em++ \
    -fno-exceptions \
    -fno-rtti \
    -fno-threadsafe-statics \
    -fvisibility-inlines-hidden \
    -s MODULARIZE \
    -s EXPORT_ES6 \
    -s EXPORT_NAME=createHarfBuzz \
    -s EXPORTED_FUNCTIONS=@hb.symbols \
    -s EXPORTED_RUNTIME_METHODS='["addFunction", "wasmMemory", "wasmExports", "stackAlloc", "stackRestore", "stackSave", "HEAPU8", "HEAPU32", "HEAPF32"]' \
    -s INITIAL_MEMORY=65MB \
    -s ALLOW_TABLE_GROWTH \
    -s ALLOW_MEMORY_GROWTH \
    -s MAIN_MODULE=0 \
    -s TEXTDECODER=2 \
    -s DYNAMIC_EXECUTION=0 \
    -s ASSERTIONS=0 \
    -s STANDALONE_WASM=1 \
    -s FILESYSTEM=0 \
    -s ENVIRONMENT=web,webview,worker,node \
    -o hb.js \
    --emit-tsd hb.d.ts \
    -Oz \
    -flto \
    --no-entry \
    harfbuzz-subset.o \
    blake3-wrapper.o \
    blake3.o \
    blake3_dispatch.o \
    blake3_portable.o \

# harfbuzz for shaping (used when generating Google Fonts metadata)

em++ \
    -fno-exceptions \
    -fno-rtti \
    -fno-threadsafe-statics \
    -fvisibility-inlines-hidden \
    -s MODULARIZE \
    -s EXPORT_ES6 \
    -s EXPORT_NAME=createHarfBuzz \
    -s EXPORTED_FUNCTIONS=@hb-shape.symbols \
    -s EXPORTED_RUNTIME_METHODS='["addFunction", "wasmMemory", "wasmExports", "stackAlloc", "stackRestore", "stackSave", "HEAPU8", "HEAPU32", "HEAPF32"]' \
    -s INITIAL_MEMORY=65MB \
    -s ALLOW_TABLE_GROWTH \
    -s ALLOW_MEMORY_GROWTH \
    -s MAIN_MODULE=0 \
    -s TEXTDECODER=2 \
    -s DYNAMIC_EXECUTION=0 \
    -s ASSERTIONS=0 \
    -s STANDALONE_WASM=1 \
    -s FILESYSTEM=0 \
    -s ENVIRONMENT=node \
    -o hb-shape.js \
    --emit-tsd hb-shape.d.ts \
    -O3 \
    -flto \
    --no-entry \
    harfbuzz-subset.o
