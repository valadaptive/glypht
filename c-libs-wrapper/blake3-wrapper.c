#include "blake3/blake3.h"
#include <stdint.h>

struct blake3_output {
    uint8_t output[32];
};

void blake3_hash_data(const void* data, size_t len, struct blake3_output* out, size_t extra_index) {
    blake3_hasher h = {0};
    blake3_hasher_init(&h);
    blake3_hasher_update(&h, data, len);
    blake3_hasher_update(&h, &extra_index, sizeof(extra_index));
    blake3_hasher_finalize(&h, out->output, 32);
}
