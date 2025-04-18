#include <algorithm>
#include <cstddef>
#include <cstring>
#include <cstdint>

#include "woff2/decode.h"
#include "woff2/encode.h"

// Returns an upper bound on the size of the compressed file.
extern "C" size_t max_woff2_compressed_size(const uint8_t *data,
                                            size_t length) {
  return woff2::MaxWOFF2CompressedSize(data, length);
}

// Compresses the font into the target buffer. *result_length should be at least
// the value returned by MaxWOFF2CompressedSize(), upon return, it is set to the
// actual compressed size. Returns true on successful compression.
extern "C" bool convert_ttf_to_woff2(const uint8_t *data, size_t length,
                                     uint8_t *result, size_t *result_length, int brotli_quality) {
  woff2::WOFF2Params params;
  params.brotli_quality = brotli_quality;
  return woff2::ConvertTTFToWOFF2(data, length, result, result_length, params);
}

// Returns an approximation of the final size of the decompressed font.
extern "C" size_t compute_woff2_final_size(const uint8_t *data, size_t length) {
  return woff2::ComputeWOFF2FinalSize(data, length);
}

class WOFF2BufferOut : public woff2::WOFF2Out {
public:
  // Create a writer that writes its data to buf. This takes ownership of the
  // buffer, but will never free it. After calling ConvertWOFF2ToTTF, take
  // ownership back with `WOFF2BufferOut::Buffer()` as it may have been
  // reallocated.
  WOFF2BufferOut(uint8_t *buf, size_t buf_size, size_t max_size)
      : buf_(buf), buf_size_(buf_size), max_size_(max_size), offset_(0) {}

  bool Write(const void *buf, size_t n) override {
    return Write(buf, offset_, n);
  }
  bool Write(const void *buf, size_t offset, size_t n) override {
    // This check should prevent overflow
    if (offset > max_size_ || n > max_size_ - offset) {
      return false;
    }
    if (offset + n > buf_size_) {
      while (offset + n > buf_size_) {
        buf_size_ *= 2;
      }
      uint8_t *new_buf = static_cast<uint8_t *>(realloc(buf_, buf_size_));
      if (!new_buf) {
        return false;
      }
      buf_ = new_buf;
    }
    memcpy(buf_ + offset, buf, n);
    offset_ = std::max(offset_, offset + n);

    return true;
  }
  size_t Size() override { return offset_; }
  size_t MaxSize() { return max_size_; }
  void SetMaxSize(size_t max_size) {
    max_size_ = max_size;
    if (offset_ > max_size_) {
      offset_ = max_size_;
    }
  }

  uint8_t *Buffer() { return buf_; }

private:
  uint8_t *buf_;
  size_t buf_size_;
  size_t max_size_;
  size_t offset_;
};

// Compresses the font into the target buffer. *result_length is set to the
// actual compressed size. Returns a pointer to the decompressed buffer on
// successful compression, which may differ from the original buffer if
// reallocation occurred.
extern "C" uint8_t *convert_woff2_to_ttf(const uint8_t *data, size_t length,
                                         size_t *result_length,
                                         size_t max_size) {

  size_t initial_size =
      std::min(woff2::ComputeWOFF2FinalSize(data, length), max_size);
  uint8_t *output = static_cast<uint8_t *>(malloc(initial_size));
  if (!output) {
    return nullptr;
  }
  WOFF2BufferOut out(output, initial_size, max_size);
  const bool ok = woff2::ConvertWOFF2ToTTF(data, length, &out);
  if (!ok) {
    free(out.Buffer());
    return nullptr;
  }

  *result_length = out.Size();
  return out.Buffer();
}
