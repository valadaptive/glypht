/* Included AFTER hb-config.hh's "closure of options" (config-subset.h runs
 * before it).
 *
 * HarfBuzz broke CFF subsetting with `HB_TINY` enabled in
 * https://github.com/harfbuzz/harfbuzz/pull/6009.
 */
#undef HB_NO_CFF
#undef HB_NO_SUBSET_CFF
