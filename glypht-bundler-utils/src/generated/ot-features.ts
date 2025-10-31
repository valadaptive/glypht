export type FeatureMetadata = {
    title: string,
    state: "discretionary" | "required" | "default" | null,
    status: null | "discouraged" | "deprecated",
};
export type FeatureTag = "aalt" | "abvf" | "abvm" | "abvs" | "afrc" | "akhn" | "blwf" | "blwm" | "blws" | "c2pc" | "c2sc" | "calt" | "case" | "ccmp" | "cfar" | "chws" | "cjct" | "clig" | "cpct" | "cpsp" | "cswh" | "curs" | "cv01" | "dist" | "dlig" | "dnom" | "dtls" | "expt" | "falt" | "fin2" | "fin3" | "fina" | "flac" | "frac" | "fwid" | "half" | "haln" | "halt" | "hist" | "hkna" | "hlig" | "hngl" | "hojo" | "hwid" | "init" | "isol" | "ital" | "jalt" | "jp04" | "jp78" | "jp83" | "jp90" | "kern" | "lfbd" | "liga" | "ljmo" | "lnum" | "locl" | "ltra" | "ltrm" | "mark" | "med2" | "medi" | "mgrk" | "mkmk" | "mset" | "nalt" | "nlck" | "nukt" | "numr" | "onum" | "opbd" | "ordn" | "ornm" | "palt" | "pcap" | "pkna" | "pnum" | "pref" | "pres" | "pstf" | "psts" | "pwid" | "qwid" | "rand" | "rclt" | "rkrf" | "rlig" | "rphf" | "rtbd" | "rtla" | "rtlm" | "ruby" | "rvrn" | "salt" | "sinf" | "size" | "smcp" | "smpl" | "ss01" | "ssty" | "stch" | "subs" | "sups" | "swsh" | "titl" | "tjmo" | "tnam" | "tnum" | "trad" | "twid" | "unic" | "valt" | "vatu" | "vchw" | "vert" | "vhal" | "vjmo" | "vkna" | "vkrn" | "vpal" | "vrt2" | "vrtr" | "zero";
export const FEATURES: Record<FeatureTag, FeatureMetadata> = {
    "aalt": {
        "title": "Access All Alternates",
        "state": "discretionary",
        "status": null
    },
    "abvf": {
        "title": "Above-base Forms",
        "state": "required",
        "status": null
    },
    "abvm": {
        "title": "Above-base Mark Positioning",
        "state": "required",
        "status": null
    },
    "abvs": {
        "title": "Above-base Substitutions",
        "state": "required",
        "status": null
    },
    "afrc": {
        "title": "Alternative Fractions",
        "state": "discretionary",
        "status": null
    },
    "akhn": {
        "title": "Akhand",
        "state": "required",
        "status": null
    },
    "blwf": {
        "title": "Below-base Forms",
        "state": "required",
        "status": null
    },
    "blwm": {
        "title": "Below-base Mark Positioning",
        "state": "required",
        "status": null
    },
    "blws": {
        "title": "Below-base Substitutions",
        "state": "required",
        "status": null
    },
    "c2pc": {
        "title": "Petite Capitals From Capitals",
        "state": "discretionary",
        "status": null
    },
    "c2sc": {
        "title": "Small Capitals From Capitals",
        "state": "discretionary",
        "status": null
    },
    "calt": {
        "title": "Contextual Alternates",
        "state": "default",
        "status": null
    },
    "case": {
        "title": "Case-Sensitive Forms",
        "state": "discretionary",
        "status": null
    },
    "ccmp": {
        "title": "Glyph Composition/Decomposition",
        "state": "required",
        "status": null
    },
    "cfar": {
        "title": "Conjunct Form After Ro",
        "state": "required",
        "status": "discouraged"
    },
    "chws": {
        "title": "Contextual Half-width Spacing",
        "state": "discretionary",
        "status": null
    },
    "cjct": {
        "title": "Conjunct Forms",
        "state": "required",
        "status": null
    },
    "clig": {
        "title": "Contextual Ligatures",
        "state": "default",
        "status": null
    },
    "cpct": {
        "title": "Centered CJK Punctuation",
        "state": null,
        "status": null
    },
    "cpsp": {
        "title": "Capital Spacing",
        "state": "discretionary",
        "status": null
    },
    "cswh": {
        "title": "Contextual Swash",
        "state": "discretionary",
        "status": null
    },
    "curs": {
        "title": "Cursive Positioning",
        "state": "required",
        "status": null
    },
    "cv01": {
        "title": "Character Variant 1 – Character Variant 99",
        "state": "discretionary",
        "status": null
    },
    "dist": {
        "title": "Distances",
        "state": "required",
        "status": null
    },
    "dlig": {
        "title": "Discretionary Ligatures",
        "state": "discretionary",
        "status": null
    },
    "dnom": {
        "title": "Denominators",
        "state": "discretionary",
        "status": "deprecated"
    },
    "dtls": {
        "title": "Dotless Forms",
        "state": null,
        "status": null
    },
    "expt": {
        "title": "Expert Forms",
        "state": null,
        "status": null
    },
    "falt": {
        "title": "Final Glyph on Line Alternates",
        "state": null,
        "status": "deprecated"
    },
    "fin2": {
        "title": "Terminal Form #2",
        "state": "required",
        "status": null
    },
    "fin3": {
        "title": "Terminal Form #3",
        "state": "required",
        "status": null
    },
    "fina": {
        "title": "Terminal Forms",
        "state": "required",
        "status": null
    },
    "flac": {
        "title": "Flattened accent forms",
        "state": null,
        "status": null
    },
    "frac": {
        "title": "Fractions",
        "state": "discretionary",
        "status": null
    },
    "fwid": {
        "title": "Full Widths",
        "state": "discretionary",
        "status": null
    },
    "half": {
        "title": "Half Forms",
        "state": "required",
        "status": null
    },
    "haln": {
        "title": "Halant Forms",
        "state": "required",
        "status": null
    },
    "halt": {
        "title": "Alternate Half Widths",
        "state": "discretionary",
        "status": null
    },
    "hist": {
        "title": "Historical Forms",
        "state": "discretionary",
        "status": null
    },
    "hkna": {
        "title": "Horizontal Kana Alternates",
        "state": "discretionary",
        "status": null
    },
    "hlig": {
        "title": "Historical Ligatures",
        "state": "discretionary",
        "status": null
    },
    "hngl": {
        "title": "Hangul",
        "state": null,
        "status": "deprecated"
    },
    "hojo": {
        "title": "Hojo Kanji Forms (JIS X 0212-1990 Kanji Forms)",
        "state": null,
        "status": null
    },
    "hwid": {
        "title": "Half Widths",
        "state": "discretionary",
        "status": null
    },
    "init": {
        "title": "Initial Forms",
        "state": "required",
        "status": null
    },
    "isol": {
        "title": "Isolated Forms",
        "state": "required",
        "status": null
    },
    "ital": {
        "title": "Italics",
        "state": "discretionary",
        "status": null
    },
    "jalt": {
        "title": "Justification Alternates",
        "state": "discretionary",
        "status": null
    },
    "jp04": {
        "title": "JIS04 Forms",
        "state": null,
        "status": null
    },
    "jp78": {
        "title": "JIS78 Forms",
        "state": null,
        "status": null
    },
    "jp83": {
        "title": "JIS83 Forms",
        "state": null,
        "status": null
    },
    "jp90": {
        "title": "JIS90 Forms",
        "state": null,
        "status": null
    },
    "kern": {
        "title": "Kerning",
        "state": "default",
        "status": null
    },
    "lfbd": {
        "title": "Left Bounds",
        "state": null,
        "status": "deprecated"
    },
    "liga": {
        "title": "Standard Ligatures",
        "state": "default",
        "status": null
    },
    "ljmo": {
        "title": "Leading Jamo Forms",
        "state": "required",
        "status": null
    },
    "lnum": {
        "title": "Lining Figures",
        "state": "discretionary",
        "status": null
    },
    "locl": {
        "title": "Localized Forms",
        "state": "required",
        "status": null
    },
    "ltra": {
        "title": "Left-to-right alternate forms",
        "state": null,
        "status": null
    },
    "ltrm": {
        "title": "Left-to-right mirrored forms",
        "state": null,
        "status": null
    },
    "mark": {
        "title": "Mark Positioning",
        "state": "required",
        "status": null
    },
    "med2": {
        "title": "Medial Forms #2",
        "state": "required",
        "status": null
    },
    "medi": {
        "title": "Medial Forms",
        "state": "required",
        "status": null
    },
    "mgrk": {
        "title": "Mathematical Greek",
        "state": "discretionary",
        "status": null
    },
    "mkmk": {
        "title": "Mark-to-Mark Positioning",
        "state": "required",
        "status": null
    },
    "mset": {
        "title": "Mark Positioning via substitution",
        "state": null,
        "status": "deprecated"
    },
    "nalt": {
        "title": "Alternate Annotation Forms",
        "state": "discretionary",
        "status": null
    },
    "nlck": {
        "title": "NLC Kanji Forms",
        "state": null,
        "status": null
    },
    "nukt": {
        "title": "Nukta Forms",
        "state": "required",
        "status": null
    },
    "numr": {
        "title": "Numerators",
        "state": "discretionary",
        "status": "deprecated"
    },
    "onum": {
        "title": "Oldstyle Figures",
        "state": "discretionary",
        "status": null
    },
    "opbd": {
        "title": "Optical Bounds",
        "state": null,
        "status": "deprecated"
    },
    "ordn": {
        "title": "Ordinals",
        "state": "discretionary",
        "status": null
    },
    "ornm": {
        "title": "Ornaments",
        "state": "discretionary",
        "status": null
    },
    "palt": {
        "title": "Proportional Alternate Widths",
        "state": "discretionary",
        "status": null
    },
    "pcap": {
        "title": "Petite Capitals",
        "state": "discretionary",
        "status": null
    },
    "pkna": {
        "title": "Proportional Kana",
        "state": "discretionary",
        "status": null
    },
    "pnum": {
        "title": "Proportional Figures",
        "state": null,
        "status": null
    },
    "pref": {
        "title": "Pre-base Forms",
        "state": "required",
        "status": null
    },
    "pres": {
        "title": "Pre-base Substitutions",
        "state": "required",
        "status": null
    },
    "pstf": {
        "title": "Post-base Forms",
        "state": "required",
        "status": null
    },
    "psts": {
        "title": "Post-base Substitutions",
        "state": "required",
        "status": null
    },
    "pwid": {
        "title": "Proportional Widths",
        "state": "discretionary",
        "status": null
    },
    "qwid": {
        "title": "Quarter Widths",
        "state": "discretionary",
        "status": null
    },
    "rand": {
        "title": "Randomize",
        "state": "default",
        "status": null
    },
    "rclt": {
        "title": "Required Contextual Alternates",
        "state": "required",
        "status": null
    },
    "rkrf": {
        "title": "Rakar Forms",
        "state": "required",
        "status": null
    },
    "rlig": {
        "title": "Required Ligatures",
        "state": "required",
        "status": null
    },
    "rphf": {
        "title": "Reph Form",
        "state": "required",
        "status": null
    },
    "rtbd": {
        "title": "Right Bounds",
        "state": null,
        "status": "deprecated"
    },
    "rtla": {
        "title": "Right-to-left alternates",
        "state": "required",
        "status": null
    },
    "rtlm": {
        "title": "Right-to-left mirrored forms",
        "state": "required",
        "status": null
    },
    "ruby": {
        "title": "Ruby Notation Forms",
        "state": null,
        "status": null
    },
    "rvrn": {
        "title": "Required Variation Alternates",
        "state": "required",
        "status": null
    },
    "salt": {
        "title": "Stylistic Alternates",
        "state": "discretionary",
        "status": "discouraged"
    },
    "sinf": {
        "title": "Scientific Inferiors",
        "state": "discretionary",
        "status": null
    },
    "size": {
        "title": "Optical size",
        "state": null,
        "status": "deprecated"
    },
    "smcp": {
        "title": "Small Capitals",
        "state": "discretionary",
        "status": null
    },
    "smpl": {
        "title": "Simplified Forms",
        "state": null,
        "status": "discouraged"
    },
    "ss01": {
        "title": "Stylistic Set 1 - Stylistic Set 20",
        "state": "discretionary",
        "status": null
    },
    "ssty": {
        "title": "Math script style alternates",
        "state": null,
        "status": null
    },
    "stch": {
        "title": "Stretching Glyph Decomposition",
        "state": "required",
        "status": null
    },
    "subs": {
        "title": "Subscript",
        "state": "discretionary",
        "status": null
    },
    "sups": {
        "title": "Superscript",
        "state": "discretionary",
        "status": null
    },
    "swsh": {
        "title": "Swash",
        "state": "discretionary",
        "status": null
    },
    "titl": {
        "title": "Titling",
        "state": "discretionary",
        "status": null
    },
    "tjmo": {
        "title": "Trailing Jamo Forms",
        "state": "required",
        "status": null
    },
    "tnam": {
        "title": "Traditional Name Forms",
        "state": null,
        "status": "discouraged"
    },
    "tnum": {
        "title": "Tabular Figures",
        "state": null,
        "status": null
    },
    "trad": {
        "title": "Traditional Forms",
        "state": null,
        "status": null
    },
    "twid": {
        "title": "Third Widths",
        "state": "discretionary",
        "status": null
    },
    "unic": {
        "title": "Unicase",
        "state": null,
        "status": null
    },
    "valt": {
        "title": "Alternate Vertical Metrics",
        "state": null,
        "status": "discouraged"
    },
    "vatu": {
        "title": "Vattu Variants",
        "state": "required",
        "status": null
    },
    "vchw": {
        "title": "Vertical Contextual Half-width Spacing",
        "state": "discretionary",
        "status": null
    },
    "vert": {
        "title": "Vertical Alternates",
        "state": "required",
        "status": null
    },
    "vhal": {
        "title": "Alternate Vertical Half Widths",
        "state": "discretionary",
        "status": null
    },
    "vjmo": {
        "title": "Vowel Jamo Forms",
        "state": "required",
        "status": null
    },
    "vkna": {
        "title": "Vertical Kana Alternates",
        "state": "discretionary",
        "status": null
    },
    "vkrn": {
        "title": "Vertical Kerning",
        "state": null,
        "status": null
    },
    "vpal": {
        "title": "Proportional Alternate Vertical Metrics",
        "state": null,
        "status": null
    },
    "vrt2": {
        "title": "Vertical Alternates and Rotation",
        "state": null,
        "status": "discouraged"
    },
    "vrtr": {
        "title": "Vertical Alternates for Rotation",
        "state": null,
        "status": null
    },
    "zero": {
        "title": "Slashed Zero",
        "state": null,
        "status": null
    }
};
