#!/bin/bash
set -e

# brotli + woff2

mkdir -p brotli-build
cd brotli-build
emcmake cmake -DCMAKE_POLICY_DEFAULT_CMP0069=NEW -DCMAKE_INTERPROCEDURAL_OPTIMIZATION=TRUE -DBUILD_SHARED_LIBS=OFF -DBROTLI_BUNDLED_MODE=OFF -DCMAKE_BUILD_TYPE=Release ../woff2/brotli
emmake make -j16 brotlicommon-static brotlienc-static brotlidec-static

cd ..

mkdir -p woff2-build
cd woff2-build
emcmake cmake -DCMAKE_POLICY_DEFAULT_CMP0069=NEW -DCMAKE_INTERPROCEDURAL_OPTIMIZATION=TRUE -DNOISY_LOGGING=OFF -DBUILD_SHARED_LIBS=OFF -DBROTLIENC_INCLUDE_DIRS=../woff2/brotli/c/include  -DBROTLIDEC_INCLUDE_DIRS=../woff2/brotli/c/include -DBROTLIENC_LIBRARIES="../brotli-build/libbrotlienc-static.a;../brotli-build/libbrotlicommon-static.a" -DBROTLIDEC_LIBRARIES="../brotli-build/libbrotlidec-static.a;../brotli-build/libbrotlicommon-static.a" -DCMAKE_BUILD_TYPE=Release ../woff2
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
    -s MAIN_MODULE=2 \
    -s TEXTDECODER=2 \
    -s DYNAMIC_EXECUTION=0 \
    -s ASSERTIONS=0 \
    -o woff2.js \
    --emit-tsd woff2.d.ts \
    -Oz \
    -flto \
    --no-entry \
    woff2-wrapper.o \
    woff2-build/libwoff2common.a \
    woff2-build/libwoff2dec.a \
    woff2-build/libwoff2enc.a \
    brotli-build/libbrotlicommon-static.a \
    brotli-build/libbrotlidec-static.a \
    brotli-build/libbrotlienc-static.a

# zlib(-ng) + zopfli + woff1

mkdir -p zlib-build
cd zlib-build
emcmake cmake -DCMAKE_INTERPROCEDURAL_OPTIMIZATION=ON -DCMAKE_POSITION_INDEPENDENT_CODE=ON -DBUILD_SHARED_LIBS=OFF -DCMAKE_BUILD_TYPE=MinSizeRel -DZLIB_COMPAT=ON -DZLIB_ENABLE_TESTS=OFF -DWITH_GZFILEOP=OFF -DWITH_RUNTIME_CPU_DETECTION=OFF -DWITH_GTEST=OFF ../zlib-ng
emmake make -j16 zlib CFLAGS="-Oz -fPIC"

cd ../sfnt2woff-zopfli
emmake make -j16 ZLIB_LIBS=-lz ZLIB_CFLAGS=-I../zlib-build CFLAGS="-L../zlib-build -Oz -fPIC" woff

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
    -s MAIN_MODULE=2 \
    -s TEXTDECODER=2 \
    -s DYNAMIC_EXECUTION=0 \
    -s ASSERTIONS=0 \
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
    -s MODULARIZE \
    -s EXPORT_ES6 \
    -s EXPORT_NAME=createHarfBuzz \
    -s EXPORTED_FUNCTIONS=@hb.symbols \
    -s EXPORTED_RUNTIME_METHODS='["addFunction", "wasmMemory", "wasmExports", "stackAlloc", "stackRestore", "stackSave", "HEAPU8", "HEAPU32", "HEAPF32"]' \
    -s INITIAL_MEMORY=65MB \
    -s ALLOW_TABLE_GROWTH \
    -s ALLOW_MEMORY_GROWTH \
    -s MAIN_MODULE=2 \
    -s TEXTDECODER=2 \
    -s DYNAMIC_EXECUTION=0 \
    -s ASSERTIONS=0 \
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
