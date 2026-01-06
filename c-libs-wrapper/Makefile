# Experimental makefile for building using wasi-sdk instead of emscripten.

WASI_SDK_PATH ?= ~/Downloads/wasi-sdk-29.0-x86_64-linux
CC := $(WASI_SDK_PATH)/bin/clang
CXX := $(WASI_SDK_PATH)/bin/clang++
LD := $(WASI_SDK_PATH)/bin/wasm-ld

HB_SYMBOLS := $(shell cat hb.symbols)
WOFF1_SYMBOLS := $(shell cat woff1.symbols)
WOFF2_SYMBOLS := $(shell cat woff2.symbols)

all: hb-bundle woff2 woff1-bundle

.PHONY: harfbuzz
harfbuzz:
	$(CXX) \
		--target=wasm32-unknown-wasip1 \
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
		-DHB_CONFIG_OVERRIDE_H=\"config-override.h\" \
		-DHB_USE_INTERNAL_QSORT \
		-DHB_EXPERIMENTAL_API \
		-c \
		harfbuzz/src/harfbuzz-subset.cc

.PHONY: blake3
blake3:
	$(CC) \
		-c \
		-Oz \
		-flto \
		-IBLAKE3/c \
		BLAKE3/c/blake3.c \
		BLAKE3/c/blake3_dispatch.c \
		BLAKE3/c/blake3_portable.c \
		blake3-wrapper.c

.PHONY: hb-bundle
hb-bundle: harfbuzz blake3
	$(CXX) \
		-o hb2.wasm \
		-Oz \
		-flto \
		-Wl,--strip-all \
		-Wl,--no-entry \
		$(addprefix -Xlinker --export=,$(HB_SYMBOLS)) \
		harfbuzz-subset.o \
		blake3-wrapper.o \
		blake3.o \
		blake3_dispatch.o \
		blake3_portable.o

.PHONY: woff2
woff2:
	mkdir -p woff2-build
	cd woff2-build && cmake \
		-DBUILD_SHARED_LIBS=OFF \
		-DCMAKE_TOOLCHAIN_FILE=${WASI_SDK_PATH}/share/cmake/wasi-sdk-p1.cmake \
		-DCMAKE_CXX_FLAGS="-fno-exceptions" \
		-DCMAKE_INTERPROCEDURAL_OPTIMIZATION=TRUE \
    	-DBROTLI_STATIC_INIT=EARLY \
		-DCMAKE_BUILD_TYPE=MinSizeRel \
		../woff2
	cd woff2-build && $(MAKE)
	$(CXX) \
		-c \
		-Oz \
		-flto \
		-Iwoff2/include \
		woff2-wrapper.cc
	$(CXX) \
		-o woff2_2.wasm \
		-Oz \
		-flto \
		-Wl,--strip-all \
		-Wl,--no-entry \
		$(addprefix -Xlinker --export=,$(WOFF2_SYMBOLS)) \
		woff2-wrapper.o \
		woff2-build/libwoff2common.a \
		woff2-build/libwoff2dec.a \
		woff2-build/libwoff2enc.a \
		woff2-build/brotli/libbrotlicommon.a \
		woff2-build/brotli/libbrotlidec.a \
		woff2-build/brotli/libbrotlienc.a

.PHONY: zlib
zlib:
	mkdir -p zlib-build
	cd zlib-build && cmake \
		-DCMAKE_INTERPROCEDURAL_OPTIMIZATION=ON \
		-DCMAKE_TOOLCHAIN_FILE=${WASI_SDK_PATH}/share/cmake/wasi-sdk-p1.cmake \
		-DBUILD_SHARED_LIBS=OFF \
		-DCMAKE_BUILD_TYPE=MinSizeRel \
		-DZLIB_COMPAT=ON \
		-DZLIB_ENABLE_TESTS=OFF \
		-DWITH_GZFILEOP=OFF \
		-DWITH_RUNTIME_CPU_DETECTION=OFF \
		-DWITH_GTEST=OFF \
		../zlib-ng
	cd zlib-build && $(MAKE)

.PHONY: sfnt2woff-zopfli
sfnt2woff-zopfli: zlib
	cd sfnt2woff-zopfli && $(MAKE) CC=$(CC) ZLIB_CFLAGS="-I../zlib-build -Oz" CFLAGS="-Oz" woff

.PHONY: woff1-bundle
woff1-bundle: zlib sfnt2woff-zopfli
	$(CC) \
		-o woff1_2.wasm \
		-Oz \
		-flto \
		-Wl,--strip-all \
		-Wl,--no-entry \
		$(addprefix -Xlinker --export=,$(WOFF1_SYMBOLS)) \
		sfnt2woff-zopfli/*.o \
		zlib-build/libz.a

clean:
	rm -rf ./woff2-build ./zlib-build
