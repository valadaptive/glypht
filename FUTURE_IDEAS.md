# Future ideas

- Allow for "freezing" OpenType features (see https://twardoch.github.io/fonttools-opentype-feature-freezer/)
- Autohinting
  - This is tricky because we may need different autohinters for CFF/CFF2 and TrueType outlines
- Preview the glyphs in a font
- Preview font features (see https://fontdrop.info/)
  - E.g. for stylistic alternates, use HarfBuzz to optionally gather which characters they apply to
- Make use of the data in https://github.com/google/fonts/ for font preview text, axis descriptions, etc.
- Support the new [incremental font transfer](https://w3c.github.io/IFT/Overview.html) standard
  - Probably should wait for it to be actually standardized though
- Use the feature tag info registry more (show explanations of font features)
- Drop legacy `kern` table if HarfBuzz doesn't already
- Use the Google Fonts repo's style tags in the browser
- Use the STAT table to get static names for instances (e.g. "Linear" and "Casual")
