export type FeatureMetadata = {
    title: string,
    description: string,
    state: "discretionary" | "required" | "default" | null,
    status: null | "discouraged" | "deprecated",
};

export const FEATURES = {
    "aalt": {
        "title": "Access All Alternates",
        "registered": "Adobe",
        "done": true,
        "description": "Allows the end user to access glyphs which are either not available, or not\neasily available, via other feature applications. The expectation is that this\nfeature will allow substituting a glyph with all possible \"alternative\" forms\nof the glyph provided in the font: for example, for the glyph `a`, it will\nprovide a substitution to small capital forms, swash alternates, superior forms,\nand so on. This is normally achieved through one-from-many (GSUB3) substitutions,\nbut where only a single alternate is provided, the use of a one-to-one (GSUB1)\nsubstitution may be appropriate.\n\n\nA layout application will not apply this feature in the ordinary course of layout,\nbut may use it to implement a \"glyph picker\" interface allowing the end user\nto choose the desired substitution, or to cycle through the alternates available\nfor a glyph. Because of way that the layout application will apply this feature,\nit is undefined what would happen to lookup types other than GSUB1 and GSUB3 if\nplaced inside an `aalt` feature.\n\n\n*Note*: AFDKO feature syntax offers special handling of the `aalt` feature.\nWithin the context an `aalt` feature block, the `feature` keyword can be used\nto reference the lookups of other features, arrange any GSUB1 or GSUB3 rules\nwithin those lookups by glyph, and combine them into one-from-many rules.\nThis allows the engineer to more easily generate an `aalt` feature by\ncombining the effects of other features.\n\n\nFor example, given a feature `smcp` which contains the rule `sub b by B.sc;` and a\nfeature `salt` which contains the rule `sub b by b.alt;`, the effect of\n\n\n```fea\nfeature aalt {\n  feature salt;\n  feature smcp;\n} aalt;\n```\n\nwould be to create the rule `sub b from [b.alt B.sc];`.\n",
        "fea": "feature aalt {\n  feature salt;\n  feature smcp;\n  feature swsh;\n  sub quoteleft by quoteleft.fr;\n  sub quoteright by quoteright.fr;\n} aalt;\n",
        "automatic": true,
        "state": "discretionary",
        "ui": "In the OS X typography panel, this feature is accessed via \"Glyph Variants\".\n",
        "status": null
    },
    "abvf": {
        "title": "Above-base Forms",
        "registered": "Microsoft",
        "group": "Orthographic",
        "script": {
            "INDIC": {
                "order": 5
            },
            "khmr": {
                "order": 3
            },
            "USE": {
                "order": 0
            }
        },
        "description": "Replaces above-base forms with special forms. This feature is applied by\nIndic, Khmer and USE complex shapers as part of the orthographic unit\nshaping phase. The context of application is restricted to a syllabic cluster.\n\n\nThis feature was originally intended for a specific use case in Khmer, the\nOE vowel sign (U+17BE, ◌ើ), which has pre-base and above-base components.\nThe shaping engine [decomposes](https://github.com/n8willis/opentype-shaping-documents/blob/master/opentype-shaping-khmer.md#22-matra-decomposition)\nU+17BE into a pair of characters, U+17C1 (េ) and U+17BE (again). It then\nreorders the syllable to put the pre-base vowel part before the base consonant,\nleaving the U+17BE after the base. The font is responsible for turning the\nremaining ◌ើ glyph into the above-base part (ី), hence the example\nimplementation below.\n\n\nHowever, more generally, this feature is a good home for above-base\nsubstitutions such as choosing alternate widths of an above-base vowel mark.\n\n\nSee also `abvs` which applies to the whole run, rather than per-cluster.\n",
        "fea": "feature abvf {\n  sub uni17BE by uni17B8;\n} abvf;\n",
        "state": "required",
        "done": true,
        "example": {
            "font": "Noto Sans Khmer",
            "text": "យល់ឃើញ"
        },
        "status": null
    },
    "abvm": {
        "title": "Above-base Mark Positioning",
        "registered": "Microsoft",
        "group": "Common",
        "description": "This feature allows for mark positioning, similar to the `mark` feature; it\nwas intended for positioning marks which are placed over a base consonant in\na syllabic script, but while the OpenType Specification describes this feature\nas being used for Indic scripts, Harfbuzz applies the `abvm` feature as\npart of common feature processing for all scripts.\n\n\nThe only distinction between this feature and the `mark` feature is a subtle\none: in `abvm` processing, any ZWJ characters are skipped when matching input\nand any ZWNJ characters are skipped when matching context, whereas in `mark`\nprocessing, ZWJ/ZWNJ characters are not skipped. Other than that, the choice\nof `abvm` versus `mark` is a matter of notational convenience for the engineer.\n\n\nSee also `blwm`.\n",
        "automatic": true,
        "done": true,
        "state": "required",
        "example": {
            "font": "Hind",
            "text": "कंसं"
        },
        "status": null
    },
    "abvs": {
        "title": "Above-base Substitutions",
        "registered": "Microsoft",
        "group": "Typographic",
        "script": {
            "INDIC": {
                "order": 0
            },
            "khmr": {
                "order": 0
            },
            "USE": {
                "order": 0
            },
            "mym2": {
                "order": 0
            }
        },
        "description": "This feature is intended for substituting base glyphs and above marks with ligature forms, but may be used for any standard typographic substitutions; engineers may wish to restrict its use to substitutions concerning above-base marks for organisational purposes. As a typographic substitution, it will be applied after the `abvf` feature.\n\nThis feature is applied by the shaper as part of the standard typographic presentation phase for Indic scripts, Khmer, Myanmar, and scripts using the Universal Shaping Engine. It is applied with a per-syllable context for Indic scripts, but applied across the whole run in other scripts.\n",
        "fea": "feature abvs {\n  sub eCandraMatra-gujarati candraBindu-gujarati by eCandraMatraCandraBindu-gujarati;\n  sub eMatra-gujarati candraBindu-gujarati by eMatraCandraBindu-gujarati;\n  sub aiMatra-gujarati candraBindu-gujarati by aiMatraCandraBindu-gujarati;\n  # ...\n} abvs;\n",
        "done": true,
        "state": "required",
        "example": {
            "font": "Hind",
            "text": "रृ"
        },
        "status": null
    },
    "afrc": {
        "title": "Alternative Fractions",
        "registered": "Microsoft",
        "state": "discretionary",
        "description": "This feature is intended to provide alternative forms of a fraction; the feature should match numerals surrounded by a slash, and substitute them with a nut fraction.\n",
        "fea": "feature afrc {\n  sub one slash two by onehalf.nut;\n} afrc;\n",
        "ui": "In the OS X typography panel, this feature is accessed via \"Contextual Fractional Forms -> Vertical.\"\n",
        "done": true,
        "example": {
            "font": "Recursive",
            "text": "1/2"
        },
        "status": null
    },
    "akhn": {
        "group": "Preprocessing",
        "script": {
            "INDIC": {
                "order": 2
            },
            "USE": {
                "order": 0
            }
        },
        "title": "Akhand",
        "registered": "Microsoft",
        "state": "required",
        "description": "This feature is intended to process ligatures of base characters in Indic scripts and scripts using the Universal Shaping Engine. It was designed for the processing of \"Akhand\" (unbreakable) character sequences in Devanagari, but may also be used for any substitutions which need to be applied early in the shaping process.\n",
        "fea": "feature akhn {\n  sub ka-deva halant-deva ssa-deva by kssa-deva;\n  sub ja-deva halant-deva nya-deva by jnya-deva;\n\n  sub ra-deva' halant-deva' zerowidthjoiner by eyelash-deva;\n} akhn;\n",
        "done": true,
        "example": {
            "font": "Hind",
            "text": "क्ष"
        },
        "status": null
    },
    "blwf": {
        "title": "Below-base Forms",
        "registered": "Microsoft",
        "group": "Orthographic",
        "script": {
            "INDIC": {
                "order": 4
            },
            "khmr": {
                "order": 2
            },
            "USE": {
                "order": 0
            },
            "mym2": {
                "order": 3
            }
        },
        "description": "Replaces below-base forms with special forms. This feature is applied by\nIndic, Khmer, Myanmar and USE complex shapers as part of the orthographic unit\nshaping phase. The context of application is restricted to a syllabic cluster.\n\n\nThis is intended to be used for halant conjuncts, where consonant-virama-consonant\nsequences cause the second consonant to be displayed below the first.\n\n\nNote that in the Indic shaper, this feature is used as a \"signal\" to the shaping engine for reordering\npurposes: that is, if a virama-consonant pair would be substituted by this feature,\nthen that consonant is placed in the below-base position when the syllable is reordered.\n\n\nSee also `blws` which applies to the whole run, rather than per-cluster.\n",
        "fea": "feature blwf {\n  sub virama-myanmar @consonant by @conjunct_consonant;\n} blwf;\n",
        "state": "required",
        "done": true,
        "status": null
    },
    "blwm": {
        "title": "Below-base Mark Positioning",
        "registered": "Microsoft",
        "group": "Common",
        "description": "This feature allows for mark positioning, similar to the `mark` feature; it\nwas intended for positioning marks which are placed below a base consonant in\na syllabic script, but while the OpenType Specification describes this feature\nas being used for Indic scripts, Harfbuzz applies the `blwm` feature as\npart of common feature processing for all scripts.\n\n\nThe only distinction between this feature and the `mark` feature is a subtle\none: in `blwm` processing, any ZWJ characters are skipped when matching input\nand any ZWNJ characters are skipped when matching context, whereas in `mark`\nprocessing, ZWJ/ZWNJ characters are not skipped. Other than that, the choice\nof `blwm` versus `mark` is a matter of notational convenience for the engineer.\n\n\nSee also `abvm`.\n",
        "state": "required",
        "automatic": true,
        "done": true,
        "status": null
    },
    "blws": {
        "title": "Below-base Substitutions",
        "registered": "Microsoft",
        "group": "Typographic",
        "script": {
            "INDIC": {
                "order": 0
            },
            "khmr": {
                "order": 0
            },
            "USE": {
                "order": 0
            },
            "mym2": {
                "order": 0
            }
        },
        "description": "This feature is intended for substituting base glyphs and below marks\nwith ligature forms, but may be used for any standard typographic\nsubstitutions; engineers may wish to restrict its use to substitutions\nconcerning below-base marks for organisational purposes. As a typographic\nsubstitution, it will be applied after the `blwf` feature.\n\n\nThis feature is applied by the shaper as part of the standard typographic\npresentation phase for Indic scripts, Khmer, Myanmar, and scripts using the\nUniversal Shaping Engine. It is applied with a per-syllable context for\nIndic scripts, but applied across the whole run in other scripts.\n",
        "fea": "feature blws {\n    sub dvRA dvmU  by dvRA_mU;\n    sub dvRA dvmUU by dvRA_mUU;\n    sub dvHA dvmU  by dvHA_mU;\n    sub dvHA dvmUU by dvHA_mUU;\n    sub dvDA  dvmvR by dvDA_mvR;\n    sub dvSHA dvmvR by dvSHA_mvR;\n    sub dvHA  dvmvR by dvHA_mvR;\n} blws;\n",
        "done": true,
        "state": "required",
        "status": null
    },
    "c2pc": {
        "title": "Petite Capitals From Capitals",
        "registered": "Tiro Typeworks / Emigre",
        "state": "discretionary",
        "description": "Substitutes capital characters for petite capitals. See the `pcap` feature for a description of petite capitals. See also `c2sc`.\n",
        "fea": "feature c2pc {\n  sub A by A.pc;\n  sub B by B.pc;\n  # ...\n} c2pc;\n",
        "ui": "In the OS X typography panel, this feature is accessed via \"Uppercase ->\nPetite Capitals.\"\n\n\nIn CSS, this feature can be set with `font-variant-caps: all-petite-caps;`\n(although this also turns on `pcap`.)\n",
        "example": {
            "font": "EB Garamond",
            "text": "NASA and the FBI"
        },
        "done": true,
        "status": null
    },
    "c2sc": {
        "title": "Small Capitals From Capitals",
        "registered": "Adobe",
        "state": "discretionary",
        "automatic": true,
        "description": "Substitutes capital characters for small capitals. Small capitals are often used to set acronyms. Compare with `smcp`, which substitutes lowercase letters for small capitals.\n",
        "fea": "feature c2sc {\n  sub A by A.sc;\n  sub B by B.sc;\n  # ...\n} c2sc;\n",
        "example": {
            "font": "EB Garamond",
            "text": "NASA and the FBI"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Uppercase ->\nSmall Capitals.\" In Adobe applications, this feature is accessed via \"All\nSmall Caps\" in the OpenType panel (although this also turns on `smcp`).\n\n\nIn CSS, this feature can be set with `font-variant-caps: all-small-caps;`\n(although this also turns on `smcp`).\n",
        "done": true,
        "status": null
    },
    "calt": {
        "title": "Contextual Alternates",
        "registered": "Adobe",
        "state": "default",
        "group": "Typographic",
        "description": "This feature is used to substitute glyphs with alternate forms, generally on\na contextual basis. For example, a script font may wish to use joining forms\nof the letter `o` when followed by another letter starting at the x-height.\n\n\nThis feature is processed as part of the standard typographic presentation group;\nin the Indic and Arabic complex shapers, it is processed as part of the language\nform group.\n",
        "fea": "feature calt {\n  sub T' @letter by T.wide;\n  sub o' space by o.swash;\n  sub o' [i k m n o] by o.join;\n  sub [f o t v w] s' by s.noinstroke;\n} calt;\n",
        "example": {
            "font": "Kristi",
            "text": "Two hoots!"
        },
        "done": true,
        "ui": "In the OS X typography panel, this feature is accessed via \"Contextual Alternates -> Contextual Alternates.\" In Adobe applications, this feature is accessed via \"Contextual Alternates\" in the OpenType panel.\n",
        "status": null
    },
    "case": {
        "title": "Case-Sensitive Forms",
        "state": "discretionary",
        "group": "Typographic",
        "registered": "Adobe",
        "automatic": true,
        "description": "This features is intended to reposition glyphs (either by substitution or\npositioning), particularly punctuation glyphs, so that they are better\naligned within all-capital sequences or sequences of lining numerals.\nIt should also change oldstyle numerals to lining numerals.\n\n\nNote that while it was hoped that layout engines would automatically apply\nthis feature within all-capital sequences, this is not currently known to\nbe automatically applied, and must be applied manually by the typesetter.\n",
        "done": true,
        "fea": "feature case {\n  sub [guillemotleft guillemotright hyphen] by [guillemotleft.cap guillemotright.cap hyphen.cap];\n} case;\n",
        "example": {
            "font": "Zilla Slab",
            "text": "«A-Za-z»"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Case-Sensitive Layout -> Capital Forms.\"\n",
        "status": null
    },
    "ccmp": {
        "state": "required",
        "title": "Glyph Composition/Decomposition",
        "registered": "Microsoft",
        "group": "Common",
        "order": 0,
        "description": "After OpenType normalization but before the processing of other features,\nit may be useful to decompose single glyphs into sequences, or combine\nsequences into a single glyph. For example:\n\n\n* In Arabic fonts, treating the rasm letters and the nukta dots separately\nallows for more flexible positioning and reduces the number of glyphs which\nneed to be drawn. Using rules such as `sub beh-ar by behDotless-ar dotbelow;`\nin the `ccmp` feature decomposes the dots into separate glyphs.\n\n* The i acute character (í, U+00ED) is normalized to U+0069 U+0301 (i acutecomb).\nHowever, as the acute replaces the tittle on the `i`, it is useful to substitute\nthis for a dotless form: `sub i' acutecomb by idotless;`.\n\n* Conversely, multiple glyphs may be combined into one. In Tibetan, stacked\nletters such as གྷ (U+0F43) have their own Unicode codepoints, but can\nalternatively be encoded in documents using the decomposed form U+0F42 (ག)\n◌ྷ (U+0FB7). These two encodings can be unified in the font with a rule such\nas `sub uni0F42 uni0FB7 by uni0F43;`.\n",
        "fea": "feature ccmp {\n  sub alefHamzaabove-ar by alef-ar hamzaabove-ar;\n  sub alefHamzabelow-ar by alef-ar hamzabelow-ar;\n  sub beh-ar by behDotless-ar dotbelow-ar;\n  sub teh-ar by behDotless-ar twodotsabove-ar;\n  sub theh-ar by behDotless-ar threedotsabove-ar;\n  sub jeem-ar by hah-ar dotbelow-ar;\n  sub khah-ar by hah-ar dotabove-ar;\n  ...\n} ccmp;\n",
        "done": true,
        "status": null
    },
    "cfar": {
        "state": "required",
        "script": {
            "khmr": {
                "order": 5
            }
        },
        "group": "Orthographic",
        "title": "Conjunct Form After Ro",
        "registered": "Microsoft",
        "status": "discouraged",
        "description": "This feature is only applied during orthographic unit shaping in the Khmer\ncomplex shaper. In Khmer, the conjunct form of the letter ro (after a\ncoeng) is reordered to the left of the base consonant and displayed as a\ndeep letterform which can interact with below-base glyphs. This feature\nwas intended as offering an opportunity to fix up below-base glyphs to\navoid clashing with the coeng ro.\n\n\nNo examples of the use of this feature have been found. Consider using\n`blws` instead.\n",
        "done": true
    },
    "chws": {
        "state": "discretionary",
        "title": "Contextual Half-width Spacing",
        "registered": "Adobe/W3C",
        "description": "Layout engines which correctly support advanced typographic layout for CJK\n(see [JLREQ](https://www.w3.org/TR/jlreq/), [CLREQ](https://www.w3.org/TR/clreq),\n[KLREQ](https://www.w3.org/TR/klreq/)) will contain code to adjust the spacing\nof glyphs in certain circumstances. For example, punctuation sequences such as\n`。」` should be set with the full-stop taking up a half-em width instead of\na full em.\n\nThis feature is intended to improve the appearance of text set with software\nwhich does *not* implement these spacing adjustments, by moving the spacing\nlogic into the font.\n\nThis feature is relatively new as of 2021, and no implementations have been\nidentified.\n",
        "fea": "feature chws {\n  pos [comma-han period-han] -500 @closing_bracket;\n  pos @closing_bracket -500 [comma-han period_han];\n  pos [comma-han period-han @closing_bracket] 500 @opening_bracket;\n  pos @opening_bracket <500 0 0 0> @opening_bracket;\n  pos @closing_bracket @closing_bracket <-500 0 0 0>;\n} chws;\n",
        "done": true,
        "status": null
    },
    "cjct": {
        "title": "Conjunct Forms",
        "script": {
            "INDIC": {
                "order": 9
            },
            "USE": {
                "order": 7
            }
        },
        "group": "Orthographic",
        "registered": "Microsoft",
        "state": "required",
        "description": "This feature is applied to Indic scripts and scripts using the Universal\nShaping Engine as the final feature in the orthographic unit shaping phase,\nbefore final reordering. It was intended for use in creating consonant\nconjunct groups. (Consonant + Virama + Consonant.)  The context of application\nis restricted to a syllabic cluster.\n\n\nThe difference between this feature and `blwf` is that the `blwf` feature\nis intended for substituting the \"tail\" (virama + consonant) for a below-base\nform, while this feature is intended for substituting the entire sequence\nwith a ligature.\n",
        "fea": "feature cjct {\n    # Actual implementation will depend on conjunct glyphs provided in your font.\n    sub nga-deva virama-deva ga-deva by ngga-deva;\n    sub nga-deva virama-deva ma-deva by ngma-deva;\n    sub nga-deva virama-deva ya-deva by ngya-deva;\n    sub tta-deva virama-deva tta-deva by tttta-deva;\n    sub tta-deva virama-deva ya-deva by ttya-deva;\n    # ...\n} cjct;\n",
        "done": true,
        "example": {
            "font": "Noto Sans Devanagari",
            "text": "ङ्म"
        },
        "status": null
    },
    "clig": {
        "title": "Contextual Ligatures",
        "registered": "Adobe",
        "group": "Typographic",
        "state": "default",
        "script": {
            "khmr": {
                "order": 5
            }
        },
        "done": true,
        "description": "This feature has two distinct uses.\n\n\nIt was originally intended for ligature forms which are contextual in nature,\nfor example, for Latin script fonts, and typically made up of GSUB lookup 8 rules.\nHowever, these rules may also be placed in other discretionary ligature\nfeatures, such as `rlig` or `liga`, and these should be used instead. As such\nthis use is relatively rare.\n\n\nSeparately, in the Khmer complex shaper, this is a mandatory feature used\nfor \"ligatures that are desired for typographical correctness\". It is\ntherefore used widely in Khmer fonts for general typographic shaping.\n",
        "fea": "feature clig {\n  sub kho-khmer.conjunct aaSign-khmer by kho-khmer.conjunct.aa;\n  sub kho-khmer.conjunct auSign-khmer by kho-khmer.conjunct.au;\n  # ...\n  sub nyo-khmer' @conjuncts by nyo-khmer.alt;\n  sub nyo-khmer.alt nyo-khmer.conjunct' by nyo-khmer.conjunct.alt;\n  # ...\n}\n",
        "status": null
    },
    "cpct": {
        "title": "Centered CJK Punctuation",
        "description": "This feature is intended to center punctuation (typically the ideographic\ncomma 、 and ideographic full stop 。) in Chinese fonts. Where presented, it\nis often implemented as GPOS lookup 1 positioning rules to place these\nglyphs within the center of the em square.\n",
        "example": {
            "text": "か、か",
            "font": "Feature Sans"
        },
        "registered": "Adobe",
        "done": true,
        "fea": "feature cpct {\n   pos comma-han <328 350 0 0>;\n   pos period-han <359 350 0 0>;\n} cpct;\n",
        "state": null,
        "status": null
    },
    "cpsp": {
        "title": "Capital Spacing",
        "registered": "Adobe",
        "state": "discretionary",
        "description": "This feature inserts a small around of space (order of 5-10 units for a typical\nfont) around capital letters to improve the setting of all-capital runs.\n",
        "example": {
            "font": "Grenze",
            "text": "AAWW"
        },
        "fea": "feature cpsp {\n  pos @capitals <5 0 10 0>;\n} cpsp;\n",
        "ui": "In the OS X typography panel, this feature is accessed via \"Case-Sensitive\nLayout > Capital Spacing\".\n",
        "done": true,
        "status": null
    },
    "cswh": {
        "title": "Contextual Swash",
        "registered": "Adobe",
        "state": "discretionary",
        "description": "This feature is similar to the `swsh` (Swash) feature, but is intended to be\nused for contextual (conditional) swash substitutions. For example, while\nAdobe Garamond Pro Italic uses the `swsh` feature to substitute *all*\ncapitals for swash forms, it uses the `cswh` feature to conditionally change\nonly capitals preceding a lowercase into swash forms.\n",
        "fea": "feature cswh {\n  sub @capitals' @lowercase by @capitals.swsh;\n} cswh;\n",
        "example": {
            "font": "Work Sans",
            "text": "WOWSERS!"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Contextual Alternates > Contextual Swash Alternates\".",
        "done": true,
        "status": null
    },
    "curs": {
        "automatic": true,
        "title": "Cursive Positioning",
        "registered": "Microsoft",
        "state": "required",
        "group": "Positioning",
        "description": "This feature is used to position glyphs with cursive connections.\n\n\nCertain scripts, in particular Arabic, are \"connected\" scripts, where the\nstart of a character has its position adjusted relative to the end of the previous\ncharacter. In font editors, this is normally defined by setting \"exit\" and\n\"entry\" anchor points. These are then converted to GPOS 3 cursive positioning\nrules.\n\n\nWhile this feature is not mandatory for designers - some styles of Arabic\nare aligned along the baseline, and so glyphs do not need to be repositioned\n- it is applied by default if present, and is not specific to Arabic script.\nIt is not impossible, but exceptionally uncommon, to use this feature for\nconnected \"cursive\" Latin fonts, and is often unnecessary because of the\npresence of a fixed baseline in Latin.\n",
        "example": {
            "font": "Aref Ruqaa",
            "text": "سمر"
        },
        "done": true,
        "fea": "feature curs {\n  pos cursive uni066F.medi <anchor 606 35> <anchor 0 35>;\n  pos cursive uni0640 <anchor 250 35> <anchor 0 35>;\n  pos cursive uni06A1.medi <anchor 606 35> <anchor 0 35>;\n  # ...\n} curs;\n",
        "status": null
    },
    "cv01": {
        "title": "Character Variant 1 – Character Variant 99",
        "registered": "Microsoft",
        "state": "discretionary",
        "automatic": true,
        "description": "These features - ranging from `cv01` to `cv99` - allow for stylistic variations\nof individual characters.\n\nThey are similar to the Stylistic Set (`ss01`--`ss20`) features, but (as their)\nname implies, stylistic sets are intended to allow a *set* of glyphs to\nvary in a common way (for example, straightening the \"leg\" of glyphs such as\n`hnm`, or overlining `MCXLVI`  characters to form Roman numerals).\nCharacter variant features, on the other hand, do not imply any common\nvariations across a range of glyphs.\n\n\nWhen this feature is coded manually, character variant features may be given\nidentifying names to be displayed in the user interface. See the\n[Adobe feature file specification](http://adobe-type-tools.github.io/afdko/OpenTypeFeatureFileSpecification.html#8.d)\nfor the format of these names.\n",
        "example": {
            "font": "Source Code Pro",
            "text": "Java"
        },
        "fea": "feature cv01 {\n  cvParameters {\n      FeatUILabelNameID {\n          name 3 1 0x0409 \"single-storey a\";\n          name 1 0 0 \"single-storey a\";\n      };\n      Character 0x61;\n  }\n  sub a by a.cv01;\n} cv01;\n",
        "ui": "In the OS X typography panel, this feature is accessed via \"Glyph Variants\".\nIn CSS, this feature is accessed through the [`font-variant-alternates`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-alternates) property.\n",
        "done": true,
        "status": null
    },
    "dist": {
        "title": "Distances",
        "registered": "Microsoft",
        "state": "required",
        "group": "Positioning",
        "description": "This feature provides positional adjustments between glyphs. It is largely\nequivalent to the `kern` feature, but should be considered as \"required\"\nkerning in that no user interface is provided to disable it.",
        "done": true,
        "example": {
            "font": "Noto Sans Devanagari",
            "text": "दॗकॗ"
        },
        "status": null
    },
    "dlig": {
        "title": "Discretionary Ligatures",
        "registered": "Adobe",
        "state": "discretionary",
        "description": "This feature is used for additional typographic ligatures which are selectable\nby the end-user.\n",
        "ui": "In the OS X typography panel, this feature is accessed via \"Ligatures -> Rare\nLigatures.\" (Not to be confused with the `rlig` feature, which is for required\nligatures...) In Adobe applications, this feature is\naccessed via \"Discretionary Ligatures\" in the OpenType panel.\n\n\nIn CSS, this feature can be accessed through the [`font-variant-ligatures`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures) property.\n",
        "fea": "sub dlig {\n  sub t h by t_h;\n  sub p p by p_p;\n} dlig;\n",
        "example": {
            "font": "Allura",
            "text": "coppersmith"
        },
        "done": true,
        "status": null
    },
    "dnom": {
        "title": "Denominators",
        "automatic": true,
        "state": "discretionary",
        "status": "deprecated",
        "registered": "Adobe",
        "description": "This deprecated feature replaces numeric glyphs with denominator forms. See also `numr`.\n\nNote that, despite the description of this feature in the OpenType specification,\nthe application of the `frac` feature is independent of this feature. It was\noriginally intended that applying the `frac` feature would \"trigger\" the\napplication of the `numr` feature for glyphs before the division slash and\nthe `dnom` feature for glyphs after it. This behavior was never implemented in\nOpenType shaping, and instead contextual rules are used within the `frac` feature\nto choose appropriate glyphs for numerator and denominator.\n\nNew fonts should use the `frac` feature in preference to this feature.\n",
        "done": true
    },
    "dtls": {
        "title": "Dotless Forms",
        "script": {
            "math": null
        },
        "registered": "Microsoft",
        "description": "This feature is used by a math layout handler to substitute glyphs by dotless\nforms when accents are to be added to the base character.\n",
        "fea": "feature dtls {\n  sub i by i.dotless;\n  sub j by j.dotless;\n  sub uni2148 by uni2148.dotless;\n  sub uni2149 by uni2149.dotless;\n  sub u1D422 by u1D422.dotless;\n  sub u1D423 by u1D423.dotless;\n  # ...\n} dtls;\n",
        "example": {
            "math": "<mover accent=\"true\"><mi> i </mi> <mo> &#x0005E; </mo> </mover>"
        },
        "done": true,
        "state": null,
        "status": null
    },
    "expt": {
        "title": "Expert Forms",
        "registered": "Adobe",
        "description": "This feature is used to substitute Japanese kanji for alternative forms which\nare considered more \"typographical\". This includes the use of JIS78 forms\n(see `jp78`), but also a wide range of other substitutions.\n\n\nThe expected substitutions of the `expt` feature are defined in terms of the\n[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) glyphset.\nEngineers creating Japanese fonts according to that glyphset should read the\ninformation at the Adobe-Japan1 repository, and use the latest version of the\nfeature code provided there to implement this feature.\n\n\n(Thanks to Ken Lunde for the information about implementing this feature.)\n",
        "done": true,
        "example": {
            "font": "Kiwi Maru",
            "text": "曁堙僊"
        },
        "state": null,
        "status": null
    },
    "falt": {
        "title": "Final Glyph on Line Alternates",
        "registered": "Microsoft",
        "description": "This feature was intended to allow a justification system to substitute a\nglyph for another form when the glyph is the final one on a line of text,\nto improve the fitting of the line. (See also `jalt`.) No known layout\nengine supports activating this and it is unclear whether any fonts\nimplemented the feature.\n",
        "done": true,
        "status": "deprecated",
        "state": null
    },
    "fin2": {
        "title": "Terminal Form #2",
        "registered": "Microsoft",
        "group": "Topographical",
        "state": "required",
        "script": {
            "syrc": {
                "order": 3
            }
        },
        "description": "This feature is used by the Arabic complex shaper when processing the Syriac\nscript. The Syriac letter alaph (U+0710) has multiple final forms: the first\nfinal form, used when the preceding character is a joining\ncharacter, is selected using the `fina` feature, similar to an Arabic alif.\n\n\nHowever, when the preceding character is a non-joining character, the selection\nof the final form of alaph depends on whether the preceding character has\njoining group `Dalath_Rish`. If the preceding character (skipping all characters\nwith a transparent joining group) is either U+0715 (dalath), U+0716 (dotless\ndalath rish) or U+072A (rish), the `fin3` feature is applied. Otherwise,\nthis feature is applied.\n",
        "example": {
            "font": "Noto Sans Syriac",
            "text": "ܒܐ"
        },
        "fea": "feature fin2 {\n  lookupflag RightToLeft IgnoreMarks;\n  sub uni0710 by uni0710.Fina2;\n  } fin2;\n",
        "done": true,
        "status": null
    },
    "fin3": {
        "title": "Terminal Form #3",
        "registered": "Microsoft",
        "group": "Orthographic",
        "state": "required",
        "script": {
            "syrc": {
                "order": 3
            }
        },
        "description": "This feature is used by the Arabic complex shaper when processing the Syriac\nscript. The Syriac letter alaph (U+0710) has multiple final forms: the first\nfinal form, used when the preceding character is a joining\ncharacter, is selected using the `fina` feature, similar to an Arabic alif.\n\n\nHowever, when the preceding character is a non-joining character, the selection\nof the final form of alaph depends on whether the preceding character has\njoining group `Dalath_Rish`. If the preceding character (skipping all characters\nwith a transparent joining group) is either U+0715 (dalath), U+0716 (dotless\ndalath rish) or U+072A (rish), this feature is applied. Otherwise,\nthe `fin2` feature is applied.\n",
        "example": {
            "font": "Noto Sans Syriac",
            "text": "ܕܐ"
        },
        "fea": "feature fin3 {\n  lookupflag RightToLeft IgnoreMarks;\n  sub uni0710 by uni0710.Fina3;\n  } fin2;\n",
        "done": true,
        "status": null
    },
    "fina": {
        "title": "Terminal Forms",
        "registered": "Microsoft/Adobe",
        "group": "Topographical",
        "state": "required",
        "script": {
            "arab": {
                "order": 2
            },
            "syrc": {
                "order": 2
            },
            "USE": {
                "order": 4
            }
        },
        "description": "This feature is used by the Arabic and USE complex shapers as part of topographic\nshaping. It is *not* appropriate for general end-of-word detection, but is\ndesigned to replace joining characters with final forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n",
        "example": {
            "font": "Aref Ruqaa",
            "text": "جر"
        },
        "automatic": true,
        "fea": "feature fina {\n  lookupflag RightToLeft IgnoreMarks;\n  sub alef-ar by alef-ar.fina;\n  sub beh-ar by beh-ar.fina;\n  # ...\n}\n",
        "done": true,
        "status": null
    },
    "flac": {
        "title": "Flattened accent forms",
        "script": {
            "math": null
        },
        "example": {
            "math": "x&#x00301; X&#x00301;"
        },
        "registered": "Microsoft",
        "description": "This feature replaces accents with flatter forms allowing them to fit within\nthe line when placed over a tall base character. This feature is automatically\napplied by the math layout engine when an accent is placed over a base character\nat a height of more than `MATH.MathConstants.FlattenedAccentBaseHeight`.\n",
        "done": true,
        "fea": "feature flac {\n  sub uni0300 by uni0300.mathcap;\n  sub uni0301 by uni0301.mathcap;\n  sub uni0302 by uni0302.mathcap;\n  sub uni0303 by uni0303.mathcap;\n  sub uni0304 by uni0304.mathcap;\n  sub uni0306 by uni0306.mathcap;\n  sub uni0307 by uni0307.mathcap;\n  sub uni0308 by uni0308.mathcap;\n  sub uni030A by uni030A.mathcap;\n  sub uni030C by uni030C.mathcap;\n} flac;\n",
        "state": null,
        "status": null
    },
    "frac": {
        "title": "Fractions",
        "state": "discretionary",
        "registered": "Microsoft/Adobe",
        "description": "The feature is used to set fractions, both those fractions for which there is a precomposed glyph in the font (for example, `sub three slash four by threequarters;`) and those made up of numerator and denominator forms of numerals.",
        "example": {
            "font": "Recursive",
            "text": "3/4 cup (145/793g)"
        },
        "fea": "feature frac {\n  sub one slash four by onequarter;\n  sub three slash four by threequarters;\n  # ...\n\n  # This implementation due to Tal Leming and Ben Kiel\n  lookup FractionBar {\n      ignore sub slash @figures @figures @figures @figures @figures @figures @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures @figures @figures @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures @figures @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures @figures slash;\n      ignore sub slash @figures @figures @figures slash';\n      ignore sub slash' @figures @figures @figures slash;\n      ignore sub slash @figures @figures slash';\n      ignore sub slash' @figures @figures slash;\n      ignore sub slash @figures slash';\n      ignore sub slash' @figures slash;\n      ignore sub slash slash';\n      ignore sub slash' slash;\n      sub @figures slash' @figures by fraction;\n  } FractionBar;\n\n  lookup Numerator1 {\n      sub @figures' fraction by @figuresNumerator;\n  } Numerator1;\n\n  lookup Numerator2 {\n      sub @figures' @figuresNumerator fraction by @figuresNumerator;\n  } Numerator2;\n\n  lookup Numerator3 {\n      sub @figures' @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator3;\n\n  lookup Numerator4 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator4;\n\n  lookup Numerator5 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator5;\n\n  lookup Numerator6 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator6;\n\n  lookup Numerator7 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator7;\n\n  lookup Numerator8 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator8;\n\n  lookup Numerator9 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator9;\n\n  lookup Numerator10 {\n      sub @figures' @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator @figuresNumerator fraction by @figuresNumerator;\n  } Numerator10;\n\n  lookup Denominator {\n      sub [fraction @figuresDenominator] @figures' by @figuresDenominator;\n  } Denominator;\n\n  sub @figures space' @figuresNumerator by space.frac;\n} frac;\n",
        "ui": "In the OS X Typography panel, this feature is accessed via \"Contextual Fraction\nForms -> Diagonal.\"\n\nIn Adobe applications, this feature is accessed via \"Fractions\" in the OpenType\npanel.\n",
        "done": true,
        "status": null
    },
    "fwid": {
        "title": "Full Widths",
        "automatic": true,
        "state": "discretionary",
        "registered": "Adobe",
        "description": "This feature replaces glyphs with variants which fill the em square. This is\ngenerally used with CJK fonts for setting text within an em-square grid (*hanmen*).\n",
        "fea": "feature qwid {\n  sub one by uniFF11;\n  sub two by uniFF12;\n  # ...\n  sub a by uniFF41;\n  sub b by uniFF42;\n}\n",
        "example": {
            "font": "Shippori Mincho",
            "text": "か12かab"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Text spacing > Full Width\".",
        "done": true,
        "status": null
    },
    "half": {
        "title": "Half Forms",
        "registered": "Microsoft",
        "group": "Orthographic",
        "script": {
            "INDIC": {
                "order": 6
            },
            "USE": {
                "order": 0
            }
        },
        "description": "This feature produces half forms of conjuncts. It is processed in the Indic\nand USE complex shapers as part of the orthographic shaping group.\n\n\nHalf forms are used in scripts such as Devanagari to display dead (unvoiced)\nconsonants after a virama in conjuncts which do not have a predetermined\nconjunct form. Half forms should be provided for all base consonants. These\nhalf forms can then be substituted into conjuncts later using the `pres`\nfeature. For example:\n\n```\nfeature half {\n  sub ka-deva halant-deva by k-deva;\n  ...\n} half;\nfeature pres {\n  sub k-deva sa-deva by ksa-deva;\n  ...\n} pres;\n```\n",
        "example": {
            "font": "Hind",
            "text": "ग्त"
        },
        "state": "required",
        "done": true,
        "fea": "feature half {\n  sub ka-deva halant-deva by k-deva;\n  sub kha-deva halant-deva by kh-deva;\n  sub ga-deva halant-deva by g-deva;\n  sub gha-deva halant-deva by gh-deva;\n  ...\n} half;\n",
        "status": null
    },
    "haln": {
        "title": "Halant Forms",
        "registered": "Microsoft",
        "state": "required",
        "group": "Typographic",
        "script": {
            "INDIC": {
                "order": 6
            }
        },
        "description": "This feature is applied by the Indic shaper during the typographic presentation\nphase, and is intended to \"clean up\" dead consonant sequences which have not\nbeen formed into conjuncts, by replacing them with correct dead consonant forms.\n\n\nFor example, consider the two sequences \"tta nukta virama ra\" and \"tta nukta virama\"\nwithout the final ra. In Noto Sans Devanagari, the \"tta nukta virama\" sequence is\nfirst composed into `ttanuktadeva` by the `nukt` feature, leaving\n`ttanuktadeva viramadeva radeva` and `ttanuktadeva viramadeva` respectively.\n\n\nWhen the final ra is present, the `rkrf` feature creates a conjunct form\n`ttanuktaradeva`. But without the final ra, we are left with `ttanuktadeva viramadeva`.\nIn this case, the default positioning of the nukta underneath the tta is\nincorrect, as it needs to move to the left to accommodate the virama. A\nprecomposed glyph `ttanuktaprehalfdeva` is substituted in the `haln`\nfeature to tidy up this dead consonant sequence.\n",
        "example": {
            "font": "Noto Sans Devanagari",
            "text": "ट़्र ट़्"
        },
        "done": true,
        "status": null
    },
    "halt": {
        "title": "Alternate Half Widths",
        "automatic": true,
        "state": "discretionary",
        "registered": "Adobe",
        "description": "This feature is similar to the `hwid` feature, but instead of replacing half-width\nglyphs with proportional equivalents, it re-spaces the glyphs using positioning\nrules.\n",
        "fea": "feature halt {\n  pos [degree.full minute.full quotedblright.full quoteright.full second.full uni3001 uni3002 uni3009 uni300B uni300D uni300F uni3011 uni3015 uni301F uniFF09 uniFF0C uniFF0E uniFF3D uniFF5D] -500;\n  pos [quotedblleft.full quoteleft.full uni3008 uni300A uni300C uni300E uni3010 uni3014 uni301D uniFF08 uniFF3B uniFF5B] <-500 0 -500 0>;\n  pos [uni30FB uniFF01 uniFF1A uniFF1B] <-250 0 -500 0>;\n} halt;\n",
        "example": {
            "font": "Reggae One",
            "text": "か、が。さ"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Text spacing > Alternative Half Width\".",
        "done": true,
        "status": null
    },
    "hist": {
        "title": "Historical Forms",
        "registered": "Microsoft",
        "state": "discretionary",
        "description": "Substitutes forms of letters which are no longer commonly used, or which\ngive the text a \"historical\" feel. See also the `hlig` feature.\n",
        "fea": "feature hist {\n  sub J by J.hist;\n  sub s by longs;\n} hist;\n",
        "example": {
            "font": "EB Garamond",
            "text": "Justice"
        },
        "done": true,
        "status": null
    },
    "hkna": {
        "title": "Horizontal Kana Alternates",
        "registered": "Adobe",
        "state": "discretionary",
        "description": "This feature replaces standard kana forms with glyphs which are designed\nspecifically for horizontal layout. For example, while \"generic\" kana may\nhave curving crossbars for characters such as さ and た, horizontal variants\nmay use straight crossbars.\n",
        "example": {
            "font": "Feature Sans",
            "text": "か12か"
        },
        "fea": "feature hkna {\n  sub ka-hira by ka-hira.vkna;\n  sub sa-hira by sa-hira.vkna;\n  sub ta-hira by ta-hira.vkna;\n  # ...\n} hkna;\n",
        "ui": "In the Mac OS X typography panel, this feature is accessed via \"Optimized\nKana Alternatives -> Horizontal Alternatives\".\n",
        "done": true,
        "status": null
    },
    "hlig": {
        "title": "Historical Ligatures",
        "registered": "Microsoft",
        "state": "discretionary",
        "description": "Substitutes ligature forms which are no longer commonly used, or which\ngive the text a \"historical\" feel: for example, the \"st\" ligature. See\nalso the `hist` feature.\n",
        "fea": "feature hlig {\n  sub s t by s_t;\n} hlig;\n",
        "example": {
            "font": "EB Garamond",
            "text": "aſſiſt"
        },
        "done": true,
        "ui": "In the OS X typography panel, this feature is accessed via \"Ligatures -> Historical\nLigatures.\"\n",
        "status": null
    },
    "hngl": {
        "status": "deprecated",
        "title": "Hangul",
        "registered": "Adobe",
        "description": "This feature is deprecated and should not be used. The idea of this\nfeature was to replace hanja (Chinese Han characters) with hangul\nsyllables. But such semantic behavior should be processed at the\ninput method environment level, not at the font level, meaning this\nfeature was never a good idea.\n",
        "done": true,
        "state": null
    },
    "hojo": {
        "title": "Hojo Kanji Forms (JIS X 0212-1990 Kanji Forms)",
        "registered": "Adobe",
        "description": "The expected form of Japanese kanji characters in an OpenType font are the\nforms specified in JIS X 0213 (which replaces the older standard, JIS X\n0208). As well as JIS X 0208, an additional standard, JIS X 0212, defined\nsupplementary characters, including 5,801 kanji characters. 2,743 of those\ncharacters were included in the JIS X 0213 standard, but in some cases,\nthe representative forms are different between the 1990 revision of JIS X\n0212 and the current revision (2004) of JIS X 0213. This feature is used to\nselect the JIS X 0212-1990 representative forms of these characters.\n\n\nThe best source of information about which glyph forms differ, and how this\nfeature should be implemented, is the\n[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) repository.\n",
        "fea": "feature hojo {\n  sub uni7462 by uni7462.hojo;\n  sub uni7626 by uni7626.hojo;\n  # ...\n} jp83;\n",
        "done": true,
        "example": {
            "font": "Kiwi Maru",
            "text": "瑢瘦"
        },
        "ui": "In the Mac OS X typography panel, this feature is accessed via the \"character\nshape\" radio buttons.\n\nIn Adobe InDesign with CJK functionality, this feature can be accessed via\nthe \"Alternate Glyphs\" dropdown in the Advanced Character Formats panel of\nthe character style options dialog.\n",
        "state": null,
        "status": null
    },
    "hwid": {
        "title": "Half Widths",
        "automatic": true,
        "state": "discretionary",
        "registered": "Adobe",
        "description": "This feature replaces glyphs (normally figures and punctuation) with variants\nwhich are one-half of the em square. This is generally used with CJK fonts\nand in the context of vertical typesetting. (For placing a sequence of two\nnumbers horizontally across an em-width vertical column.)\n\nSee also `fwid`, `qwid`, `twid`.\n",
        "fea": "feature hwid {\n  sub one by one.hwid;\n  sub two by two.hwid;\n  # ...\n}\n",
        "example": {
            "font": "Feature Sans",
            "text": "か12か"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Text spacing > Half Width\".",
        "done": true,
        "status": null
    },
    "init": {
        "title": "Initial Forms",
        "registered": "Microsoft/Adobe",
        "group": "Topographical",
        "state": "required",
        "script": {
            "arab": {
                "order": 7
            },
            "syrc": {
                "order": 7
            },
            "INDIC": {
                "order": 0
            },
            "USE": {
                "order": 2
            }
        },
        "description": "This feature is used by the Arabic, Indic, and USE complex shapers as part of topographic\nshaping. It is *not* appropriate for general start-of-word detection, but is\ndesigned to replace joining characters with initial forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n\n\nIn the Indic shaper, the feature is expected to apply in word-initial context\nas identified by the shaping engine.\n",
        "example": {
            "font": "Aref Ruqaa",
            "text": "جر"
        },
        "automatic": true,
        "fea": "feature init {\n  lookupflag RightToLeft IgnoreMarks;\n  sub beh-ar by beh-ar.init;\n  sub jeem-ar by jeem-ar.init;\n  # ...\n}\n",
        "done": true,
        "status": null
    },
    "isol": {
        "title": "Isolated Forms",
        "registered": "Microsoft/Adobe",
        "group": "Topographical",
        "state": "required",
        "script": {
            "arab": {
                "order": 1
            },
            "syrc": {
                "order": 1
            },
            "USE": {
                "order": 1
            }
        },
        "description": "This feature is used by the Arabic and USE complex shapers as part of topographic\nshaping. It is designed to replace joining characters with isolated forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n",
        "example": {
            "font": "Aref Ruqaa",
            "text": "یڽہ"
        },
        "automatic": true,
        "fea": "feature isol {\n  sub yehHamzaabove-ar by CH_YEu1 HAMZA_ABOVE;\n  sub tehMarbutagoal-ar by HAYCu1 dda;\n  sub hah-ar by JIMu1;\n  sub noon-ar by NUNu1 sdi;\n} isol;\n",
        "done": true,
        "status": null
    },
    "ital": {
        "title": "Italics",
        "registered": "Adobe",
        "state": "discretionary",
        "description": "This feature is used in *very particular circumstances*. Despite its name, it\nis not a general mechanism for activating italic glyphs.\n\n\nHistorically CJK fonts, particular Japanese fonts, shipped with a glyphset\nwhich contained the Latin alphabet (usually full-width but sometimes proportional).\nAs will as upright forms, these fonts *also* included Latin italic glyphs.\n\n\nCJK fonts with both upright and italic Latin glyphs in the same font should use\nthis feature to select the italic forms\n",
        "fea": "feature ital {\n  sub a by a.ital;\n  sub b by b.ital;\n  # ...\n} ital;\n",
        "ui": "In the OS X typography panel, this feature is accessed via \"Italics -> On\".\nIn Adobe applications, this feature is accessed via \"Roman Italics\" in the OpenType panel.\nNote that in neither case can the italic feature be accessed from the \"Italicise\"\nbutton or the \"Font Style\" menu.\n",
        "example": {
            "font": "Feature Sans",
            "text": "か123か"
        },
        "done": true,
        "status": null
    },
    "jalt": {
        "title": "Justification Alternates",
        "registered": "Microsoft",
        "state": "discretionary",
        "description": "This feature is intended to allow text layout engines to improve line justification\nby selecting alternate glyphs. A layout engine can set a line of text, and then\ntry applying the `jalt` feature to the line to see if the resulting glyphs have\na better fit. It is rarely implemented in layout engines, with Adobe InDesign\nand Photoshop being the only known implementations.\n",
        "fea": "feature jalt {\n  sub qaf-ar by qaf-ar.jalt;\n  sub seen-ar by seen-ar.jalt;\n  # ...\n} jalt;\n",
        "example": {
            "font": "Aref Ruqaa",
            "text": "سارق الغنم"
        },
        "done": true,
        "ui": "In Adobe InDesign, this can be automatically applied at the paragraph level by choosing \"Justification\" from the paragraph panel menu and selecting \"Justification Alternates (Naskh)\" in the Justification dropdown. It can also be manually applied at the character level by choosing the Justification Alternate option from the character panel menu.\nIn Adobe Photoshop, it can be manually applied at the character level by choosing \"Justification Alternates\" from the character panel.",
        "status": null
    },
    "jp04": {
        "title": "JIS04 Forms",
        "registered": "Adobe",
        "description": "The expected form of Japanese kanji characters in an OpenType font are the\nforms specified in JIS X 0213 (which replaces the older standard, JIS X\n0208). In the course of revision of this standard, the expected forms of a\nnumber of kanji characters have changed over time.\n\n\nFonts should target the most recent revision of the standard (currently the\n2004 revision). However, features may be used to access forms specified in\nearlier revisions. If the `jp04` feature is applied, kanji should be\nreplaced by variant forms representing those specified in the 2004 revision\nof the standard. As 2004 is the current revision, this feature should only\nbe implemented when providing updates to older fonts or to provide remappings\nfor glyphs where both older and newer forms are encoded in Unicode and provided\nin the font (for example, `sub uni5516 by uni555E;`).\n\n\nA historical comparison between different character forms in JIS revisions\ncan be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).\n",
        "done": true,
        "ui": "In the Mac OS X typography panel, this feature is accessed via the \"character\nshape\" radio buttons.\n\nIn Adobe InDesign with CJK functionality, this feature can be accessed via\nthe \"Alternate Glyphs\" dropdown in the Advanced Character Formats panel of\nthe character style options dialog.\n",
        "state": null,
        "status": null
    },
    "jp78": {
        "title": "JIS78 Forms",
        "registered": "Adobe",
        "description": "The expected form of Japanese kanji characters in an OpenType font are the\nforms specified in JIS X 0213 (which replaces the older standard, JIS X\n0208). In the course of revision of this standard, the expected forms of a\nnumber of kanji characters have changed over time. For example, between\nthe 1978 and 1983 revisions, the \"road\" radical (*shinnyō*) changed form\nin some characters, moving from two initial dots to one dot. (This change\nwas reversed in the 2004 revision.)\n\n\nFonts should target the most recent revision of the standard (currently the\n2004 revision). However, features may be used to access forms specified in\nearlier revisions.\n\n\nA historical comparison between different character forms in JIS revisions\ncan be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).\n\n\nIf the `jp78` feature is applied, kanji should be replaced by variant forms\nrepresenting those specified in the 1978 revision of the standard.\n",
        "fea": "feature jp78 {\n  sub uni5049 by uni5049.jp78;\n  sub uni5275 by uni5275.jp78;\n  sub uni8328 by uni8328.jp78;\n  # ...\n} jp83;\n",
        "done": true,
        "example": {
            "font": "Shippori Mincho",
            "text": "偉茨創"
        },
        "ui": "In the Mac OS X typography panel, this feature is accessed via the \"character\nshape\" radio buttons.\n\nIn Adobe InDesign with CJK functionality, this feature can be accessed via\nthe \"Alternate Glyphs\" dropdown in the Advanced Character Formats panel of\nthe character style options dialog.\n",
        "state": null,
        "status": null
    },
    "jp83": {
        "title": "JIS83 Forms",
        "registered": "Adobe",
        "description": "The expected form of Japanese kanji characters in an OpenType font are the\nforms specified in JIS X 0213 (which replaces the older standard, JIS X\n0208). In the course of revision of this standard, the expected forms of a\nnumber of kanji characters have changed over time. For example, between\nthe 1983 and 1990 revisions, the \"eight\" radical (*hachigashira*) changed form,\nlosing its top horizontal line.\n\n\nFonts should target the most recent revision of the standard (currently the\n2004 revision). However, features may be used to access forms specified in\nearlier revisions.\n\n\nA historical comparison between different character forms in JIS revisions\ncan be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).\n\n\nIf the `jp83` feature is applied, kanji should be replaced by variant forms\nrepresenting those specified in the 1983 revision of the standard.\n",
        "fea": "feature jp83 {\n  sub uni82A6 by uni82A6.jp83;\n  sub uni9022 by uni9022.jp83;\n  # ...\n} jp83;\n",
        "done": true,
        "example": {
            "font": "Shippori Mincho",
            "text": "逢芦晦"
        },
        "ui": "In the Mac OS X typography panel, this feature is accessed via the \"character\nshape\" radio buttons.\n\nIn Adobe InDesign with CJK functionality, this feature can be accessed via\nthe \"Alternate Glyphs\" dropdown in the Advanced Character Formats panel of\nthe character style options dialog.\n",
        "state": null,
        "status": null
    },
    "jp90": {
        "title": "JIS90 Forms",
        "registered": "Adobe",
        "description": "The expected form of Japanese kanji characters in an OpenType font are the\nforms specified in JIS X 0213 (which replaces the older standard, JIS X\n0208). In the course of revision of this standard, the expected forms of a\nnumber of kanji characters have changed over time. For example, between\nthe 1983 and 1990 revisions, the \"long stride\" radical (*innyō*) changed form\nin some characters, losing the upstroke on the third stroke.\n\n\nFonts should target the most recent revision of the standard (currently the\n2004 revision). However, features may be used to access forms specified in\nearlier revisions.\n\n\nA historical comparison between different character forms in JIS revisions\ncan be found at [this site](http://www.asahi-net.or.jp/~ax2s-kmtn/ref/jisrev.html).\n\n\nIf the `jp90` feature is applied, kanji should be replaced by variant forms\nrepresenting those specified in the 1990 revision of the standard.\n",
        "fea": "feature jp90 {\n  sub uni853D by uni853D.jp90;\n  sub uni8AB9 by uni8AB9.jp90;\n  sub uni990C by uni990C.jp90;\n  # ...\n} jp90;\n",
        "ui": "In the Mac OS X typography panel, this feature is accessed via the \"character\nshape\" radio buttons.\n\nIn Adobe InDesign with CJK functionality, this feature can be accessed via\nthe \"Alternate Glyphs\" dropdown in the Advanced Character Formats panel of\nthe character style options dialog.\n",
        "done": true,
        "example": {
            "font": "Kiwi Maru",
            "text": "餌誹蔽"
        },
        "state": null,
        "status": null
    },
    "kern": {
        "title": "Kerning",
        "registered": "Microsoft/Adobe",
        "automatic": true,
        "state": "default",
        "group": "Positioning",
        "description": "This feature is one of the two facilities for kerning within OpenType.\nThe original TrueType `kern` *table* in the font implements simple,\nnon-contextual pair-based and class-based kerning, and a pair-based (format 0)\n`kern` table was historically required for kerning to function in applications\nsuch as Microsoft PowerPoint.\n\n\nHowever, modern fonts tend to implement kerning through the use of\nthis feature instead (see [discussion](https://typedrawers.com/discussion/comment/15218)).\nThe standard implementation is to use GPOS 2 pair positioning rules to adjustment\nthe X advance of the first glyph in the pair, although note that when\ngenerating a `kern` feature for right-to-left text, the adjustment is\ngenerally made to both advance *and* placement:\n\n```\npos period parentheses <-30 0 -30 0>;\n```\n\n\nSee also the `vkrn` feature for kerning in vertical settings. Kerning may\nbe disabled based on user preference; for mandatory adjustments, use the\n`dist` feature instead.\n",
        "example": {
            "font": "Vollkorn",
            "text": "AVATAR"
        },
        "ui": "In the OS X typography panel, this feature is *disabled* via \"Text Spacing > No Kerning\".",
        "done": true,
        "status": null
    },
    "lfbd": {
        "title": "Left Bounds",
        "registered": "Adobe",
        "status": "deprecated",
        "description": "This feature was intended as part of the implementation of character\nprotrusion (see `opbd`); the idea being that it would be applied to the initial\ncharacter on a line to alter the bounds of that character allowing it to\nprotrude into the right margin. However, this would require an interaction\nbetween the line breaking engine and the shaping engine which has only once\nbeen implemented, in the LuaTeX layout system.\n\nThis feature should therefore be regarded as prematurely specified and\nhence deprecated.\n",
        "done": true,
        "state": null
    },
    "liga": {
        "title": "Standard Ligatures",
        "registered": "Microsoft/Adobe",
        "state": "default",
        "description": "Ligatures provide typographic refinement by replacing multiple glyphs with a\nsingle, ligated form. This feature is used for standard ligatures, which are\nto be applied by default; in Latin text, this is generally sequences such as\n`f f`, `f f l`, `f f`, `f i`, and `f f i`.\n\nLigature code is often automatically generated by the font editor based on\ndetecting sequences of glyph names combined with underscores; note, however,\nthat the common ligature glyph `fi` does *not* contain an underscore.\n",
        "automatic": true,
        "fea": "feature liga {\n  sub f f i by f_f_i;\n  sub f f l by f_f_l;\n  sub f f by f_f;\n  sub f i by fi;\n  sub f l by f_l;\n}\n",
        "example": {
            "font": "EB Garamond",
            "text": "Official"
        },
        "done": true,
        "ui": "In the OS X typography panel, this feature is *disabled* via \"Ligatures >\nCommon Ligatures\".\n",
        "status": null
    },
    "ljmo": {
        "title": "Leading Jamo Forms",
        "registered": "Microsoft",
        "group": "Topographical",
        "state": "required",
        "script": {
            "hang": 1
        },
        "description": "The Korean Hangul script is encoded in Unicode in two ways: first, as a series\nof precomposed syllable graphemes (encoded from U+AC00 to U+D7AF); second, as\na series of indivdual, conjoining *jamo*. Korean syllables form a LVT?\n(leading consonant, vowel, optional trailing consonant) pattern; the leading consonant\n(*choseong*) jamo are encoded between U+1100 and U+115F, the vowel (*jungseong*)\njamo are encoded between U+1160 and U+11A7, and the optional trailing consonant\n(*jongseong*) jamo between U+11A8 and U+11FF. (At least in the primary Hangul\nJamo Unicode block; other jamo are encoded in extension blocks.)\n\n\nThe Hangul shaper will first attempt to compose any sequences of conjoining jamo\ninto an encoded form in the precomposed syllable block. But where this is not\nsuccessful - for example, in an Old Korean form which is not encoded in Unicode\nas a precomposed syllable - then the shaper will instead *decompose* any LV\nsyllables to break the syllable into separate L, V, and T? characters, and then\napply the Korean shaping features (`ljmo`, `vjmo`, `tjmo`) to select forms of\nthe jamo which are appropriately positioned and sized to combine into the correct\ngrapheme-image.\n\n\nFor example, the Old Korean syllable ᄒᆞᆯ is not encoded in Unicode as a precomposed\nsyllable, and so must be encoded with the three individual jamo. The Hangul\nshaper applies the `ljmo` feature to the *choseong*, the `vjmo` feature to the\n*jungseong* and the `tjmo` feature to the *jongseong*. The resulting sequence\nproduces a glyph which renders the syllable correctly, with the `vjmo` and\n`tjmo` generally producing zero-width mark glyphs positioned appropriately. An\nalternative to this technique is to use the `ccmp` feature to turn decomposed\njamo into a precomposed glyph.\n\n\nFor further information, see sections 3.12 and 18.6 of the Unicode Standard.\n",
        "done": true,
        "status": null
    },
    "lnum": {
        "automatic": true,
        "state": "discretionary",
        "title": "Lining Figures",
        "registered": "Adobe",
        "description": "This feature substitutes digits for lining forms. Lining figures are\ndesigned to fit in all-capital settings.\n\nIn theory, this feature should not just substitute the default form\nof figures (e.g. `one`, `two`) for lining forms, but also any alternate\nnon-lining forms (such as oldstyle figures) for lining forms. Where\nlining forms are the default, implementing a substitution from oldstyle\nfigures to lining figures is not typographically necessary but will cause\nthe UI of layout programs to display lining figures as an option.\n\nSee also `onum`, `pnum`, `tnum`.\n",
        "fea": "feature lnum {\n  sub one by one.lf;\n  sub two by two.lf;\n  # ...\n} lnum;\n",
        "example": {
            "font": "Baskervville",
            "text": "ABC1234"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Number Case >\nLining Figures\". In Adobe applications, selecting \"Tabular lining\" from the\nOpenType panel will apply this feature and the `tnum` feature, while selecting\n\"Proportional lining\" will apply this feature and the `pnum` feature.\n\n\nIn CSS, this feature can be accessed through the `font-variant-numeric: lining-nums` property.\n",
        "done": true,
        "status": null
    },
    "locl": {
        "title": "Localized Forms",
        "registered": "Tiro Typeworks",
        "state": "required",
        "group": "Common",
        "order": 0,
        "description": "This feature allows for localization of glyph forms by making substitutions\nconditional on the script and language selected by the user. Typical uses\nof this feature include:\n\n\n* Substituting Cyrillic glyphs with Bulgarian and Serbian variants.\n\n* In Turkish, Azeri, Kazakh, Tatar and Crimean Tartar, substituting the `i` by\nan `idotaccent` glyph so that when uppercased through case conversion features\nsuch as `smcp`, the dot can be preserved.\n(See [this tutorial](https://glyphsapp.com/learn/localize-your-font-turkish).)\n\n* In Romanian and Moldovan, substituting the `scedilla` (U+015E) with `scommaaccent`.\n\n* Repositioning the ogonek to the center of the glyph in Navajo.\n\n* In Dutch, substituting the j in an `íj` pair with `íj́` (see [thread](https://typedrawers.com/discussion/1294/how-do-you-implement-ijacute-and-ijacute).)\n\n* Substituting the Catalan \"punt volat\" for `ldot` ([tutorial](https://glyphsapp.com/learn/localize-your-font-catalan-punt-volat))\n\n* In a font which has multiple scripts with different spacing conventions,\n  such as Latin and Urdu, conditionally resizing the advance width of the\n  space character to meet the expectations of the script in use.\n",
        "fea": "feature locl {\n  script latn;\n  language ROM;\n  sub Scedilla by Scommaaccent;\n  sub scedilla by scommaaccent;\n  language MOL;\n  sub Scedilla by Scommaaccent;\n  sub scedilla by scommaaccent;\n  language CAT;\n  sub l' periodcentered' l by ldot;\n  sub L' periodcentered' L by Ldot;\n} locl;\n",
        "done": true,
        "status": null
    },
    "ltra": {
        "title": "Left-to-right alternate forms",
        "registered": "Adobe",
        "group": "Preprocessing",
        "order": 2,
        "description": "This feature - by analogy with the `rtla` feature - is intended for\nright-to-left scripts which can also be expressed in a left-to-right line\nlayout, but which require glyph transformations such as mirroring when\nwritten left-to-right. As detailed in the `ltrm` feature, such scripts\nare extremely rare, and no implementations have been found.\n",
        "done": true,
        "state": null,
        "status": null
    },
    "ltrm": {
        "title": "Left-to-right mirrored forms",
        "registered": "Adobe",
        "group": "Preprocessing",
        "order": 3,
        "description": "This feature - by analogy with the `rtlm` feature - was intended for\nright-to-left scripts which can also be expressed in a left-to-right line\nlayout, but which require glyph transformations such as mirroring when\nwritten left-to-right.\n\n\nSuch scripts are exceptionally rare. Noto Sans Old Hungarian uses this\nfeature to horizontally mirror the glyphs when laying out Old Hungarian\nleft-to-right, although it is disputed that Old Hungarian was ever written\nleft-to-right. The Old South Arabian script is usually written RTL but\ncan also be laid out LTR; but Noto Sans Old South Arabian does not include\nmirroring substitutions. Oh well.\n",
        "done": true,
        "state": null,
        "status": null
    },
    "mark": {
        "title": "Mark Positioning",
        "registered": "Microsoft",
        "group": "Positioning",
        "state": "required",
        "automatic": true,
        "description": "This feature is used to position mark glyphs with respect to their base glyphs.\n\n\nGenerally speaking, this is automatically generated by font editing software\nbased on the positions of anchors in the base and mark glyphs. The editor will\nemit mark-to-base (GPOS4) and mark-to-ligature (GPOS5) rules for this feature.\n",
        "example": {
            "font": "Markazi Text",
            "text": "تَشْكِيل"
        },
        "done": true,
        "status": null
    },
    "med2": {
        "title": "Medial Forms #2",
        "registered": "Microsoft",
        "group": "Topographical",
        "state": "required",
        "script": {
            "syrc": {
                "order": 3
            }
        },
        "description": "This feature is used by the Arabic complex shaper when processing the Syriac\nscript. The Syriac letter alaph (U+0710) is not normally a joining character\nbut can join to the right in the middle of a word if the preceding character\nis right-joining.\n",
        "example": {
            "font": "Noto Sans Syriac",
            "text": "ܒܐܬܪܐ"
        },
        "fea": "feature fin2 {\n  lookupflag RightToLeft IgnoreMarks;\n  sub uni0710 by uni0710.Medi2;\n  } fin2;\n",
        "done": true,
        "status": null
    },
    "medi": {
        "title": "Medial Forms",
        "registered": "Microsoft/Adobe",
        "group": "Topographical",
        "state": "required",
        "script": {
            "arab": {
                "order": 0
            },
            "syrc": {
                "order": 0
            },
            "USE": {
                "order": 0
            }
        },
        "description": "This feature is used by the Arabic and USE complex shapers as part of topographic\nshaping. It is *not* appropriate for general middle-of-word detection, but is\ndesigned to replace joining characters with medial forms. This means characters\nwhich have the Unicode joining type `Right_Joining` or `Dual_Joining` in a\nright-to-left script, and characters which have the Unicode joining type `Left_Joining`\nor `Dual_Joining` in a left-to-right script. These joining type properties\ncan be found in [`ArabicShaping.txt`](https://www.unicode.org/Public/UCD/latest/ucd/ArabicShaping.txt)\nin the Unicode Character Database.\n",
        "example": {
            "font": "Aref Ruqaa",
            "text": "جسر"
        },
        "automatic": true,
        "fea": "feature medi {\n  lookupflag RightToLeft IgnoreMarks;\n  sub beh-ar by beh-ar.medi;\n  sub jeem-ar by jeem-ar.medi;\n  # ...\n}\n",
        "done": true,
        "status": null
    },
    "mgrk": {
        "title": "Mathematical Greek",
        "registered": "Adobe",
        "state": "discretionary",
        "description": "This feature replaces Greek glyphs with mathematical symbols: for example,\n`Sigma` is replaced by the `summation` glyph.\n",
        "fea": "feature mgrk {\n  sub uni0394 by uni2206;\n  sub Pi by product;\n  sub Sigma by summation;\n  sub uni03A9 by uni2126;\n  sub uni03BC by uni00B5;\n  sub phi by uni03D5;\n} mgrk;\n",
        "ui": "In the OS X typography panel, this feature is accessed via \"Mathematical Extras\n-> Mathematical Greek Letter Forms\".\n",
        "example": {
            "font": "Vollkorn",
            "text": "φ(n)=Σ Δn"
        },
        "done": true,
        "status": null
    },
    "mkmk": {
        "title": "Mark-to-Mark Positioning",
        "registered": "Microsoft",
        "group": "Positioning",
        "state": "required",
        "automatic": true,
        "description": "This feature is used to position mark glyphs with respect to other mark glyphs.\nThis can be used for example to position arbitrary combinations of marks used\nin scholarly transliteration systems, as well as positioning\nArabic secondary marks relative to primary marks, such as *fathah* over *shadda*\nand vice versa.\n\n\nGenerally speaking, this is automatically generated by font editing software\nbased on the positions of anchors in the mark glyphs, if the mark glyphs have\nboth a \"mark anchor\" (e.g. `_bottom`) *and* an \"attachment anchor\" (`bottom`).\nThe editor will then emit mark-to-mark (GPOS6) rules for this feature.\n",
        "example": {
            "font": "Work Sans",
            "text": "é̤̤̱̃̃"
        },
        "done": true,
        "status": null
    },
    "mset": {
        "status": "deprecated",
        "group": "Typographic",
        "title": "Mark Positioning via substitution",
        "script": {
            "arab": {
                "order": 4
            }
        },
        "registered": "Microsoft",
        "description": "This feature is used by the Arabic shaping as the final phase of the typographic\nshaping group. It was intended for substitutions which combine marks and bases\ninto precomposed forms as an alternative to using positioning rules in the `mark`\nfeature; however, it is possible to use *substitution* rules in the `mark`\nfeature, making the `mset` feature redundant.\n\nIt was used in Microsoft's Windows 95 Arabic fonts, and practically no other font.\nNew fonts should use `mark`, `ccmp`, `rlig` or other features instead.\n",
        "done": true,
        "state": null
    },
    "nalt": {
        "state": "discretionary",
        "title": "Alternate Annotation Forms",
        "registered": "Adobe",
        "description": "This feature replaces glyphs with \"notational\" forms - glyphs in boxes,\ncircles, etc. It is often used in CJK fonts to access characters in the Unicode\n\"Enclosed CJK Letters and Months\" block (for example, `sub uni3131 by uni3200;`),\nbut may also be used to access other enclosed forms (`sub one by uni2460;`).\n\n\nNote that although the OT Specification describes this as implementable via\nalternate substitution lookups, no interface supports this, and single substitutions\nshould be used instead.\n",
        "ui": "No user interface to this feature has been found.\n",
        "done": true,
        "example": {
            "font": "Work Sans",
            "text": 12345
        },
        "status": null
    },
    "nlck": {
        "title": "NLC Kanji Forms",
        "registered": "Adobe",
        "description": "In 2000, the Japanese National Language Council (now the Japanese language\ndivision of the Agency for Cultural Affairs) prescribed new glyph forms for\nJapanese kanji. In particular, the shape of the \"father\" and \"long stride\"\n(*innyo*) radicals changed to remove a small stroke.\n\n\nThe expected substitutions of the `nlck` feature are defined in terms of the\n[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) glyphset.\nEngineers creating Japanese fonts according to that glyphset should read the\ninformation at the Adobe-Japan1 repository, and use the latest version of the\nfeature code provided there to implement this feature.\n",
        "example": {
            "text": "咬廻挺爺",
            "font": "Shippori Mincho"
        },
        "done": true,
        "state": null,
        "status": null
    },
    "nukt": {
        "group": "Preprocessing",
        "state": "required",
        "script": {
            "INDIC": {
                "order": 1
            },
            "USE": {
                "order": 0
            }
        },
        "title": "Nukta Forms",
        "description": "This feature is used to replace `consonant + nukta` with a precombined nukta\nform glyph in Indic and USE scripts. It is called during the preprocessing\ngroup - after initial reordering in Indic scripts, but before processing in the\nUSE.\n\n\nWhile nukta marks may be positioned using the normal mark positioning functionality\n(`mark`), the font designer may choose to create specific precomposed nukta glyphs,\neither for ease of positioning or to facilitate later lookups.\n",
        "fea": "feature nukt {\n  sub ka-deva   nukta-deva by ka-deva.nukt;\n  sub kha-deva  nukta-deva by kha-deva.nukt;\n  sub ga-deva   nukta-deva by ga-deva.nukt;\n  sub ja-deva   nukta-deva by ja-deva.nukt;\n  sub dda-deva  nukta-deva by dda-deva.nukt;\n  sub ddha-deva nukta-deva by ddha-deva.nukt;\n  sub pha-deva  nukta-deva by pha-deva.nukt;\n  sub ra-deva   nukta-deva by ra-deva.nukt;\n} nukt;\n",
        "done": true,
        "status": null
    },
    "numr": {
        "title": "Numerators",
        "automatic": true,
        "state": "discretionary",
        "status": "deprecated",
        "registered": "Adobe",
        "description": "This deprecated feature replaces numeric glyphs with numerator forms. See also `dnom`.\n\nNote that, despite the description of this feature in the OpenType specification,\nthe application of the `frac` feature is independent of this feature. It was\noriginally intended that applying the `frac` feature would \"trigger\" the\napplication of the `numr` feature for glyphs before the division slash and\nthe `dnom` feature for glyphs after it. This behavior was never implemented in\nOpenType shaping, and instead contextual rules are used within the `frac` feature\nto choose appropriate glyphs for numerator and denominator.\n\nNew fonts should use the `frac` feature in preference to this feature.\n",
        "done": true
    },
    "onum": {
        "automatic": true,
        "state": "discretionary",
        "title": "Oldstyle Figures",
        "registered": "Adobe",
        "description": "This feature substitutes digits for oldstyle forms. Oldstyle figures are\ndesigned to fit in mixed case text settings.\n\nIn theory, this feature should not just substitute the default form\nof figures (e.g. `one`, `two`) for oldstyle forms, but also any alternate\nlining forms (such as lining figures) for oldstyle forms. Where\noldstyle forms are the default, implementing a substitution from lining\nfigures to oldstyle figures is not typographically necessary but will cause\nthe UI of layout programs to display oldstyle figures as an option.\n\nSee also `onum`, `pnum`, `tnum`.\n",
        "fea": "feature lnum {\n  sub one by one.osf;\n  sub two by two.osf;\n  # ...\n} lnum;\n",
        "example": {
            "font": "Cardo",
            "text": "ABC1234"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Number Case >\nOld-Style Figures\". In Adobe applications, selecting \"Tabular oldstyle\" from the\nOpenType panel will apply this feature and the `tnum` feature, while selecting\n\"Proportional oldstyle\" will apply this feature and the `pnum` feature.\n\n\nIn CSS, this feature can be accessed through the `font-variant-numeric: oldstyle-nums` property.\n",
        "done": true,
        "status": null
    },
    "opbd": {
        "title": "Optical Bounds",
        "registered": "Adobe",
        "status": "deprecated",
        "description": "This feature was intended for implementing what TeX users call \"character\nprotrusion\" or \"margin kerning\": improving the fit of lines in a paragraph by\naltering the apparent advance width or positioning of certain characters\nbased on their optical edges rather than bounding boxes.\n\n\nConsider, for example, a serif letter D appearing at the beginning of a line.\nBy altering the positioning of the glyph, the serifs can be protruded outside\nthe margin so that the stem aligns with the left edge of the text, to give a\nmore visually \"tight\" justification.\n\n\nThis feature was originally intended to automatically \"call\" the `lfbd` and\n`rtbd` features to achieve margin kerning; however, the OpenType feature\nmodel did not develop as planned, and so this feature was never implemented.\n",
        "done": true,
        "state": null
    },
    "ordn": {
        "title": "Ordinals",
        "registered": "Adobe",
        "state": "discretionary",
        "description": "In some languages, alphabetic glyphs are used to abbreviate ordinal numerals.\nFor example, in Italian, the word for \"second\" is written 2º when referring\nto a gramatically masculine noun and 2ª when referring to a gramatically\nfeminine noun. While this can be encoded with the Unicode FEMININE ORDINAL INDICATOR\n(U+00AA) and MASCULINE ORDINAL INDICATOR (U+00BA) codepoints as in this\nparagraph, it is more common to use the standard Latin `a` and `o` characters\nand use a font feature to form the ordinal indicators.\n\nAdditionally, the numero sign (№, U+2116) is more commonly written with the\nLatin sequence `No.`. This feature is applied to convert it to the numero\nglyph.\n\nSome fonts also use this feature to place other Latin glyphs in \"ordinal\nposition\".\n",
        "fea": "feature ordn {\n  sub @numeral [A a] by ordfeminine;\n  sub @numeral [o o] by ordmasculine;\n\n  sub N o period by numero;\n} ordn;\n",
        "example": {
            "font": "Alegreya Sans",
            "text": "No. 2a"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Vertical Position\n> Ordinals\".\n",
        "done": true,
        "status": null
    },
    "ornm": {
        "title": "Ornaments",
        "description": "This feature has two uses, both of which are used to select ornament glyphs\nfrom within the font's glyphset.\n\n\nIn the first use, all ornamental glyphs (fleurons, manicules, dingbats and\nso on) are made available through a GSUB3 alternate substitution from the\nbullet character (U+2022).\n\n\nIn the second use, ASCII characters are substituted for ornamental forms using\na GSUB1 substitution.\n",
        "registered": "Adobe",
        "state": "discretionary",
        "fea": "feature ornm {\n  sub bullet from @ornaments;\n\n\n  sub less by arrowleft;\n  sub greater by arrowright;\n  sub plus by arrowup;\n  # ...\n} ornm;\n",
        "example": {
            "font": "Spectral",
            "text": "+×=<>"
        },
        "done": true,
        "status": null
    },
    "palt": {
        "title": "Proportional Alternate Widths",
        "automatic": true,
        "state": "discretionary",
        "registered": "Adobe",
        "description": "This feature is similar to the `pwid` feature, but instead of replaces full-width\nglyphs with proportional equivalents, it re-spaces the glyphs using positioning\nrules.\n",
        "fea": "feature palt {\n  pos uniFF41 <-186 0 -373 0>;\n  pos uniFF42 <-148 0 -346 0>;\n  pos uniFF43 <-220 0 -441 0>;\n  pos uniFF44 <-176 0 -353 0>;\n  # ...\n} palt;\n",
        "example": {
            "font": "Shippori Mincho",
            "text": "かａｂｃか"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Text spacing > Alternative Proportional Widths\".",
        "done": true,
        "status": null
    },
    "pcap": {
        "title": "Petite Capitals",
        "registered": "Tiro Typeworks / Emigre",
        "state": "discretionary",
        "automatic": true,
        "description": "Substitutes lowercase characters for petite capitals. Petite capitals are an additional set of capital letters found in some founds which are smaller than the \"small caps\" set, designed to harmonize better with the lowercase letters. (See, for example, [Mrs Eaves](https://fonts.adobe.com/fonts/mrs-eaves) and [Filosophia](https://fonts.adobe.com/fonts/filosofia).)\n\nCompare with `c2pc`, which substitutes uppercase letters for petite capitals.\n\nNote that as this feature changes the case of the glyph, font engineers should ensure that any language-specific localisations are taken into account during case conversion - for example, when applying this feature to the letter `i` in Turkish, the returned form should appear with a dot above. (This is often achieved by replacing i with `idotless dotaccent` or similar in the `locl` feature.)\n",
        "fea": "feature pcap {\n  sub a by A.pc;\n  sub b by B.pc;\n  # ...\n} pcap;\n",
        "example": {
            "font": "EB Garamond",
            "text": "This"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Lowercase ->\nPetite Capitals.\"\n\n\nIn CSS, this feature can be set with `font-variant-caps: petite-caps;`\n",
        "done": true,
        "status": null
    },
    "pkna": {
        "title": "Proportional Kana",
        "registered": "Adobe",
        "state": "discretionary",
        "description": "Japanese characters are usually typeset on a fix-width em square grid. However,\nfor display purposes, it may be preferable to set the glyphs proportionally.\nThis feature either replaces the kana glyphs with alternate glyphs with reduced\nsidebearings, or uses positioning rules to achieve the same effect. See also\n`pwid`.\n",
        "fea": "feature pkna {\n  sub ka-hira by ka-hira.pkna;\n  sub ki-hira by ki-hira.pkna;\n  # ...\n} pkna;\n\n# OR\n\nfeature pkna {\n  pos ka-hira <-75 0 -75 0>;\n  pos ki-hira <-15 0 -35 0>;\n  # ...\n} pkna;\n",
        "example": {
            "font": "Feature Sans",
            "text": "かりかり"
        },
        "done": true,
        "status": null
    },
    "pnum": {
        "title": "Proportional Figures",
        "registered": "Microsoft/Adobe",
        "automatic": true,
        "description": "This feature replaces tabular (fixed-width) figures by proportional variants.\nSee also the `onum`, `lnum` and `tnum` features. Note that where the default\nform is proportional, this feature has no effect, although some font editors\nprovide rules for this feature in any case.\n",
        "fea": "feature pnum {\n  sub one.tf by one;\n  sub two.tf by two;\n  sub three.tf by three;\n  #...\n} pnum;\n",
        "done": true,
        "ui": "In the OS X typography panel, this feature is accessed via \"Number Spacing >\nProportional Numbers\".\n\n\nIn CSS, this feature can be accessed through the `font-variant-numeric: proportional-nums` property.\n",
        "state": null,
        "status": null
    },
    "pref": {
        "title": "Pre-base Forms",
        "registered": "Microsoft",
        "group": "Orthographic",
        "script": {
            "INDIC": {
                "order": 2
            },
            "USE": {
                "order": 2
            },
            "mym2": {
                "order": 1
            },
            "khmer": {
                "order": 0
            }
        },
        "state": "required",
        "description": "This feature is intended to form pre-base ligatures. In the Indic shaper, its\napplication is scoped to\nthe virama-consonant pair ordered before the base consonant. It is most often\nused in Khmer fonts to replace the `coeng ro` sequence with a pre-base form\nof the ra (see also `cfar`), or as a generic orthographic feature in Myanmar (Burmese).\n\n\nNote that in the Indic shaper, this feature is also used as a \"signal\" to the shaping engine for reordering\npurposes: that is, if a virama-consonant pair would be substituted by this feature,\nthen that consonant is placed in the *post*-base position when the syllable is reordered.\n(Note: not the pre-base position, as one might expect!)\n",
        "fea": "feature pref {\n  sub coeng-khmer ro-khmer by coeng-ro;\n\n  # This could alternately be in cfar\n  sub coeng-ro @consonant @subjoined by coeng-ro.longer;\n}\n",
        "done": true,
        "status": null
    },
    "pres": {
        "title": "Pre-base Substitutions",
        "registered": "Microsoft",
        "state": "required",
        "group": "Typographic",
        "script": {
            "INDIC": {
                "order": 0
            },
            "khmr": {
                "order": 0
            },
            "USE": {
                "order": 0
            },
            "mym2": {
                "order": 0
            }
        },
        "description": "This feature is used in Indic, Khmer, Myanmar and USE scripts to form pre-base\nconjunct ligatures. For example, in Devanagari or Gujarati, the sequence\n`ka + virama + consonant` is first substituted by the half form `k + consonant`\nin the `half` feature, but then is further ligated to a conjunct form in this\nfeature.\n\n\nThe feature may also be used for other presentational adjustments\nconcerning pre-base forms, such as selecting the correct width of the i-matra.\n",
        "fea": "feature pres {\n    sub k-deva ka-deva by kka-deva;\n    sub k-deva kha-deva by kkha-deva;\n    # ...\n    sub g-deva ga-deva by gga-deva;\n    # ...\n    sub iMatra-deva' @width1 by iMatra-deva.1;\n    sub iMatra-deva' @width2 by iMatra-deva.2;\n    # ...\n} pres;\n",
        "example": {
            "font": "Hind",
            "text": "त्ति"
        },
        "done": true,
        "status": null
    },
    "pstf": {
        "title": "Post-base Forms",
        "registered": "Microsoft",
        "group": "Orthographic",
        "script": {
            "INDIC": {
                "order": 6
            },
            "USE": {
                "order": 3
            },
            "mym2": {
                "order": 3
            },
            "khmer": {
                "order": 0
            }
        },
        "state": "required",
        "description": "This feature is intended to replace glyphs by their post-base forms. For example,\nin Bengali and Gurmukhi, the ya consonant has a post-base form when followed\nby a virama.\n\nNote that in the Indic shaper, this feature is also used as a \"signal\" to the shaping engine for reordering\npurposes: that is, if a virama-consonant pair would be substituted by this feature,\nthen that consonant is placed in the post-base position when the syllable is reordered.\n",
        "fea": "feature pstf {\n    sub viramabeng yabeng by yabeng_viramabeng.pstf;\n} pstf;\n",
        "example": {
            "font": "Lohit Bengali",
            "text": "ব্য্"
        },
        "done": true,
        "status": null
    },
    "psts": {
        "title": "Post-base Substitutions",
        "registered": "Microsoft",
        "state": "required",
        "group": "Typographic",
        "script": {
            "INDIC": {
                "order": 0
            },
            "khmr": {
                "order": 0
            },
            "USE": {
                "order": 0
            },
            "mym2": {
                "order": 0
            }
        },
        "description": "This feature is intended to replace base + post-base sequences with a ligature\nglyph. It can also be used to perform any contextual post-base substitution\nrequired (for example, in Devanagari or Bengali, replacing the ii-matra (ी)\nwith appropriate width glyphs to point to the stem of the consonant).\n",
        "fea": "feature psts {\n  sub ka-javanese cakra by ka_cakra;\n  sub ta-javanese cakra by ta_cakra;\n  # ...\n} psts;\n",
        "example": {
            "font": "Noto Sans Javanese",
            "text": "ꦏꦿꦛꦿ"
        },
        "done": true,
        "status": null
    },
    "pwid": {
        "title": "Proportional Widths",
        "automatic": true,
        "state": "discretionary",
        "registered": "Adobe",
        "description": "This feature replaces glyphs (normally figures and punctuation) sized to\nthe em-square with variants which are proportionally spaced. This is generally\nused with CJK fonts. It is the opposite of the `fwid` feature.\n",
        "fea": "feature pwid {\n  sub uniFF11 by one;\n  sub uniFF12 by two;\n  # ...\n  sub uniFF41 by a;\n  sub uniFF42 by b;\n  # ...\n} pwid;\n",
        "example": {
            "font": "Kiwi Maru",
            "text": "かａｂｃか"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Text spacing > Proportional Widths\".",
        "done": true,
        "status": null
    },
    "qwid": {
        "title": "Quarter Widths",
        "automatic": true,
        "state": "discretionary",
        "registered": "Adobe",
        "description": "This feature replaces glyphs (normally figures and punctuation) with variants\nwhich are one-quarter of the em square. This is generally used with CJK fonts\nand in the context of vertical typesetting. (For placing a sequence of four\nnumbers horizontally across an em-width vertical column.)\n\nSee also `fwid`, `hwid`, `twid`.\n",
        "fea": "feature qwid {\n  sub one by one.qwid;\n  sub two by two.qwid;\n  # ...\n}\n",
        "example": {
            "font": "Feature Sans",
            "text": "か1231か"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Text spacing > Quarter Width\".",
        "done": true,
        "status": null
    },
    "rand": {
        "title": "Randomize",
        "registered": "Adobe",
        "state": "default",
        "description": "The randomize feature, which is *currently only implemented in the Harfbuzz shaping engine*,\nallows font designers to randomly replace glyphs with variants from a selection,\nusing a GSUB3 alternate substitution. This can be useful for handwriting or\ndisplay style fonts. This feature is applied by default (at least in Harfbuzz),\nand there is no user interface to disabling it; use tastefully.\n\n\nNote that because of the limited implementation of this feature, it is still\nrecommended to use one of the other deterministic alternate selection strategies\ndescribed in the [OpenType Cookbook](http://opentypecookbook.com/common-techniques/#randomization)\nin a `calt` feature. Also note that to avoid problems with reflowing text,\nthe Harfbuzz shaping engine applies the same random seed to each shaping run.\nThis means that while the glyphs within a run are chosen (pseudo)randomly, the\nresults will be consistent each time the same text is shaped.\n",
        "fea": "feature rand {\n  # But you probably want to use one of the OpenType Cookbook recipes\n  # in a calt feature instead\n  sub A from [A a.rand1 A.rand2 A.rand3];\n} rand;\n",
        "example": {
            "font": "Feature Sans",
            "text": "AAAA"
        },
        "done": true,
        "status": null
    },
    "rclt": {
        "group": "Typographic",
        "state": "required",
        "script": {
            "arab": {
                "order": 2
            },
            "syrc": {
                "order": 2
            }
        },
        "title": "Required Contextual Alternates",
        "registered": "Microsoft",
        "description": "This feature is intended for required contextual alternates (contextual\nalternates which should not be subject to user control). Note that in the\nArabic shaper it is processed early in the typographic presentation phase;\nin other shapers, it is processed along with the common feature group.\n\n\nIn the example, Reem Kufi uses the `rclt` feature to swap repeated *beh*\nglyphs for glyphs with raised teeth.\n",
        "fea": "feature rclt {\n  lookupflag IgnoreMarks;\n    sub [behDotless-ar.init behDotless-ar.medi]\n         behDotless-ar.medi'\n        [behDotless-ar.medi behDotless-ar.fina]\n     by  behDotless-ar.medi.high;\n    sub [seen-ar.init seen-ar.medi]\n         behDotless-ar.medi'\n     by  behDotless-ar.medi.high;\n    sub  behDotless-ar.init\n         behDotless-ar.medi'\n         noonghunna-ar.fina\n     by  behDotless-ar.medi.high;\n} rclt;\n",
        "example": {
            "font": "Reem Kufi",
            "text": "ببببب"
        },
        "done": true,
        "status": null
    },
    "rkrf": {
        "title": "Rakar Forms",
        "registered": "Microsoft",
        "group": "Orthographic",
        "script": {
            "INDIC": {
                "order": 2
            },
            "USE": {
                "order": 3
            }
        },
        "state": "required",
        "description": "This feature is used in the Indic and USE complex shapers to replace\nconsonant clusters involving \"ra\" with conjunct forms. For example, in Devanagari,\nthe sequence `ka virama ra` should be replaced by the conjunct form `kra`.\nWhile this substitution was previously achieved in the v1 shaper by the combination\nof the `bwlf` and `vatu` features, the v2 shaper allows for a simpler way to\nsubstitute the entire sequence.\n\n\nThe `half` feature is processed after this feature, so any conjuncts created\nin `rkrf` must also be included in the half-form rules in `half`.\n",
        "fea": "sub rkrf {\n    sub ka-deva   virama-deva ra-deva by   kra-deva;\n    sub kha-deva  virama-deva ra-deva by  khra-deva;\n    sub ga-deva   virama-deva ra-deva by   gra-deva;\n    # ...\n} rkrf;\n",
        "done": true,
        "status": null
    },
    "rlig": {
        "group": "Typographic",
        "state": "required",
        "script": {
            "arab": {
                "order": 1
            },
            "syrc": {
                "order": 1
            }
        },
        "title": "Required Ligatures",
        "registered": "Microsoft",
        "description": "This feature is intended for required ligatures (ligatures which should not\nbe subject to user control). Note that in the Arabic shaper it is processed\nearly in the typographic presentation phase; in other shapers, it is processed\nalong with the common feature group.\n",
        "fea": "feature rlig {\n  lookupflag IgnoreMarks RightToLeft;\n  sub lam-ar.init alef-ar.fina by lam_alef-ar;\n  sub lam-ar.medi alef-ar.fina by lam_alef-ar.fina;\n  sub lam-ar.init alefHamzaabove-ar.fina by lam_alefHamzaabove-ar;\n  sub lam-ar.medi alefHamzaabove-ar.fina by lam_alefHamzaabove-ar.fina;\n  sub lam-ar.init alefHamzabelow-ar.fina by lam_alefHamzabelow-ar;\n  sub lam-ar.medi alefHamzabelow-ar.fina by lam_alefHamzabelow-ar.fina;\n  sub lam-ar.init alefMadda-ar.fina by lam_alefMadda-ar;\n  sub lam-ar.medi alefMadda-ar.fina by lam_alefMadda-ar.fina;\n  sub lam-ar.init alefWasla-ar.fina by lam_alefWasla-ar;\n  sub lam-ar.medi alefWasla-ar.fina by lam_alefWasla-ar.fina;\n} rlig;\n",
        "example": {
            "font": "El Messiri",
            "text": "لا"
        },
        "done": true,
        "status": null
    },
    "rphf": {
        "title": "Reph Form",
        "registered": "Microsoft",
        "group": "Orthographic",
        "script": {
            "INDIC": {
                "order": 8
            },
            "USE": {
                "order": 0
            },
            "mym2": {
                "order": 0
            }
        },
        "state": "required",
        "description": "This feature replaces consonant+virama with the reph form of the consonant.\nIn Devanagari, non-final ra+virama should be substituted by reph. The context\nof application is restricted to a syllabic cluster.\n\n\nNote that in the Universal Shaping Engine, this feature is also used as a\n\"signal\" to the shaping engine for reordering purposes: after this feature\nhas been processed, any glyphs substituted in by this feature are considered\nto have USE category `R`.\n",
        "fea": "feature rphf {\n  sub ra-deva halant-deva by reph-deva;\n} rphf;\n",
        "done": true,
        "status": null
    },
    "rtbd": {
        "title": "Right Bounds",
        "registered": "Adobe",
        "status": "deprecated",
        "description": "This feature was intended as part of the implementation of character\nprotrusion (see `opbd`); the idea being that it would be applied to the final\ncharacter on a line to alter the bounds of that character allowing it to\nprotrude into the right margin. However, this would require an interaction\nbetween the line breaking engine and the shaping engine which has only once\nbeen implemented, in the LuaTeX layout system.\n\n\nThis feature should therefore be regarded as prematurely specified and\nhence deprecated.\n",
        "done": true,
        "state": null
    },
    "rtla": {
        "title": "Right-to-left alternates",
        "registered": "Adobe",
        "state": "required",
        "group": "Preprocessing",
        "order": 2,
        "description": "This feature is applied to right-to-left texts as part of the glyph preprocessing\nstage. It is intended for substituting variants which are appropriate for\nright-to-left text, but which are not mirrored substitutions. (Mirrored forms\nof glyphs should be handled by the `rtlm` feature.)\n\n\nNo examples of this feature being used as described have been found; Noto\nSans Tifinagh uses the feature to mirror glyphs when Tifinagh is being set\nright-to-left (e.g. when used to write Tuareg).\n",
        "done": true,
        "example": {
            "font": "Noto Sans Tifinagh",
            "text": "ⵎⵉⴷⴷⵏ"
        },
        "status": null
    },
    "rtlm": {
        "title": "Right-to-left mirrored forms",
        "registered": "Adobe",
        "group": "Preprocessing",
        "order": 3,
        "state": "required",
        "description": "When a bidirectional text is being laid out, any characters which have the\n`Bidi_Mirrored` Unicode property and whose directionality is resolved to RTL\nwill be replaced by their mirrored equivalents. This mirroring is specified\nby the [Unicode Bidirectional Algorithm](https://unicode.org/reports/tr9/#L4),\nand is performed by the layout engine prior to shaping.\n\n\nHowever, a font may contain mirrored glyphs for characters which do *not* have\nthe `Bidi_Mirrored` property (and thus are not handled by the Unicode bidirectional\nalgorithm), but which are required to be mirrored when displayed in right-to-left settings.\nFor example, mathematical characters such as the square root sign (√) and\nintergral sign (∫) do not have mirrored forms encoded in Unicode, but should be\nmirrored in right-to-left text.\n",
        "done": true,
        "example": {
            "font": "Noto Sans Math",
            "text": "∫√x"
        },
        "status": null
    },
    "ruby": {
        "title": "Ruby Notation Forms",
        "registered": "Adobe",
        "description": "In Japanese typesetting, words written in kanji may be superscripted by\nthe kana transliteration of the words to aid with reading. (In vertical\nsettings, the transliteration is placed to the right.) These subscripted\nkana, called *furigana* or ruby, are scaled down to a reduced size relative\nto the main text. Scaling and positioning is applied by the typesetting\nengine, but the font may wish to provide alternate forms of the kana\nwhen they are being used in a ruby context - for example, slightly bolder\nforms such that they will maintain the correct weight when scaled down to\nruby size, or different forms that are more legible when displayed at a\nsmaller size.\n",
        "fea": "feature ruby {\n  sub ka-hira by ka-hira.ruby;\n  sub sa-hira by sa-hira.ruby;\n  # ...\n} ruby;\n",
        "done": true,
        "ui": "In the OS X typography panel, this feature is accessed via \"Ruby Glyphs\".\n",
        "state": null,
        "status": null
    },
    "rvrn": {
        "title": "Required Variation Alternates",
        "group": "Preprocessing",
        "order": 0,
        "registered": "Microsoft",
        "state": "required",
        "description": "OpenType Font Variations provides for the ability for different features to\napply at different point of the variation space. For example, consider a\nfont with a weight axis - when the weight is greater than 600, the designer\nwants the `dollar` glyph to be substituted for a simplified form to avoid\ncrowding the internal counterspace. This facility is called \"feature variation\",\nand because it is implemented by substitution, it allows for different portions\nof the variation space to represent the same character using different glyphs\nand therefore different outlines; this in turn means that designers can implement\nvariations without being forced to make the outlines compatible between\ndramatically different forms.\n\n\nAccording to the OpenType specification, feature variation can be applied to\n*any* feature. However, Microsoft registered the `rvrn` feature specifically\nfor processing feature variations early in the shaping process. This may not\nturn out to be the best approach, as future rules now need to take into account\nnot just the original glyph but any substitutions; it may be better to perform\ndesign-specific substitutions *after* all orthographic substitutions have between\ncompleted.\n\n\nBoth Harfbuzz and CoreText process feature variations in features other than\nthe `rvrn` feature. I have not been able to ascertain whether or not the Microsoft\nshapers process feature variation tables in other features. If they do - and\nif font creation tools allow for creating feature variation tables in other\nfeatures - then this feature could be considered technically redundant.\n",
        "done": true,
        "status": null
    },
    "salt": {
        "title": "Stylistic Alternates",
        "registered": "Adobe",
        "state": "discretionary",
        "status": "discouraged",
        "automatic": true,
        "description": "Prior to the introduction of multiple stylistic sets (see the `ss01` feature),\nthis feature was used to select alternate aesthetic forms of glyphs which do\nnot correspond to the descriptions of other features. Currently, this feature\nis generally implemented by font editors either by replicating the rules of `ss01`\nor by combining *all* stylistic alternate substitutions.\n\n\nStylistic sets (`ss01`...`ss20`) should be used in current fonts in preference\nto this feature, as UI support for the `salt` feature is not always available.\n",
        "done": true
    },
    "sinf": {
        "title": "Scientific Inferiors",
        "registered": "Microsoft/Adobe",
        "state": "discretionary",
        "automatic": true,
        "description": "This feature replaces glyphs with subscript forms, similar to the `subs` feature,\nbut in theory for a wider range of glyphs (including Latin letters),\ngenerally for chemical or mathematical notation.\n\n\nAlso, in theory, subscript numerals should sit on the baseline, while scientific\ninferiors should bisect the baseline\n\nIn practice, the same substitutions are often made as those in the `subs` feature.\n",
        "example": {
            "font": "Alegreya",
            "text": "H2O"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Vertical Position > Scientific Inferiors\".",
        "done": true,
        "status": null
    },
    "size": {
        "status": "deprecated",
        "registered": "Adobe",
        "title": "Optical size",
        "description": "This feature was intended as a way to store information about the optical size of the font\nand the font's relationship to other optical size variants in the same family. It has\nbeen entirely superseded by the `STAT` table, and should not be used.\n",
        "done": true,
        "state": null
    },
    "smcp": {
        "title": "Small Capitals",
        "registered": "Adobe",
        "state": "discretionary",
        "automatic": true,
        "description": "Substitutes lowercase characters for small capitals. Small capitals are often used to set acronyms. Compare with `c2sc`, which substitutes uppercase letters for small capitals.\n\nNote that as this feature changes the case of the glyph, font engineers should ensure that any language-specific localisations are taken into account during case conversion - for example, when applying this feature to the letter `i` in Turkish, the returned form should appear with a dot above. (This is often achieved by replacing i with `idotless dotaccent` or similar in the `locl` feature.)\n",
        "fea": "feature smcp {\n  sub a by A.sc;\n  sub b by B.sc;\n  # ...\n} smcp;\n",
        "example": {
            "font": "EB Garamond",
            "text": "This"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Lowercase ->\nSmall Capitals.\"\n\n\nIn CSS, this feature can be set with `font-variant-caps: small-caps;`\n",
        "done": true,
        "status": null
    },
    "smpl": {
        "title": "Simplified Forms",
        "registered": "Adobe",
        "description": "This feature was intended for converting Chinese or Japanese glyphs to simplified forms.\nNo fonts implementing this feature have been identified and it is not\nspecified in the Adobe Japan1 glyph set. As with the `hngl` feature,\ncharacter semantics should be selected using the input method environment,\nrather than the font, and hence this feature is discouraged.\n",
        "status": "discouraged",
        "done": true,
        "state": null
    },
    "ss01": {
        "title": "Stylistic Set 1 - Stylistic Set 20",
        "registered": "Tiro Typeworks",
        "state": "discretionary",
        "automatic": true,
        "description": "These features - ranging from `ss01` to `ss20` - allow for stylistic variations\nof *sets* of characters to vary in a common way. This is distinct from the\n`cv01`-`cv99` features which allow characters to vary arbitrarily with no\nimplication of any common variations across a range of glyphs.\n\n\nFor example, in the font Cormorant, stylistic set 01 changes the terminals\nof capital letters; stylistic set 02 opens the counters of glyphs with\ncounters; stylistic set 03 replaces double-storey glyphs (`g`, `a`) with\nsingle-storey forms, and so on.\n\n\nWhen this feature is coded manually, stylistic sets may be given\nidentifying names to be displayed in the user interface. See the\n[Adobe feature file specification](http://adobe-type-tools.github.io/afdko/OpenTypeFeatureFileSpecification.html#8.c)\nfor the format of these names.\n\n\nThese features are an extension to (and repacement for) the `salt` feature,\nwhich only provides access to a single stylistic set.\n",
        "fea": "feature ss01 {\n  featureNames {\n    name \"Alternate terminals\";\n  }\n  sub A by A.ss01;\n  sub B by A.ss01;\n} ss01;\n",
        "example": {
            "font": "Cormorant",
            "text": "QUACK"
        },
        "done": true,
        "ui": "In the OS X typography panel, this feature is accessed via \"Alternative Stylistic Sets\".",
        "status": null
    },
    "ssty": {
        "title": "Math script style alternates",
        "registered": "Microsoft",
        "script": {
            "math": null
        },
        "example": {
            "math": "<msup> <mi>x</mi> <msup> <mi> x </mi> <mi>x</mi> </msup> </msup>"
        },
        "description": "This feature is used by the math layout engine to select glyph variants\nused in subscripts and superscripts. When the engine lays out a glyph as\na superscript or subscript, it will first determine the script level: 1\nfor first-level sub-/superscripts and 2 for higher levels. It will then\nsupply the script level as a parameter to a GSUB3 alternate substitution\nrule in this feature to obtain the correct glyph variant.\n\n\nThe glyph variant will then be scaled by the math layout engine based on\nthe factor specified in the MATH table (`MATH.MathConstants.scriptPercentScaleDown`\nfor first-level sub-/superscripts and `MATH.MathConstants.scriptScriptPercentScaleDown`\nfor higher level scripts). As the scaling will be performed by the layout\nengine, the form of the glyphs substituted in this feature should not be\nscaled or repositioned. For example, the STIX Math Two font shown in the\nexample uses slightly bolder script alternates so that the glyph weights\nappear consistent when scaled down.\n",
        "done": true,
        "state": null,
        "status": null
    },
    "stch": {
        "title": "Stretching Glyph Decomposition",
        "registered": "Microsoft",
        "state": "required",
        "group": "Common",
        "script": {
            "arab": {
                "order": 0
            },
            "syrc": {
                "order": 0
            }
        },
        "description": "Right.\n\n\nThe `stch` feature is part of the Arabic complex shaper. (It is the first\nfeature processed in the glyph preprocessing phase). It was designed to\nimplement the Syriac Abbreviation Mark (U+070F), which stretches to fill the\nwidth of the enclosed text.\n\n\nThe feature should be implemented by the font engineer as a multiple substitution,\nreplacing the glyph mapped to U+070F with an *odd number of glyphs*. When applying\nthe feature, the shaper performs the following actions:\n\n\n  * The substitution rules specified in the `stch` feature are applied, and the\n  sequence of glyphs returned by the rule applications are collected.\n\n  * The first glyph in the returned sequence is placed at the start of the glyph stream.\n\n  * The final glyph in the returned sequence is placed at the end of the glyph stream.\n\n  * At the end of processing, after positioning rules have been applied, the\n    width of the whole glyph stream is calculated.\n\n  * Next, odd-numbered glyphs inside the returned sequence other than the\n    first and final glyph are positioned such that they are distributed\n    evenly across the glyph stream. (For example, if there are five glyphs in the\n    sequence returned from `stch`, the third glyph is positioned horizontally\n    to appear in the middle of the glyph stream. If there are seven glyphs, the\n    third glyph is positioned to appear one-third of the way along the glyph\n    stream, and the fifth to appear two-thirds of the way along.)\n\n  * Finally, even-numbered glyphs inside the returned sequence are positioned\n    and *repeated* such that their widths completely fill the spaces between\n    the odd-numbered glyphs.\n\nFurther: the first and last glyphs in the returned sequence may be base glyphs\nor mark glyphs, and should have a non-zero horizontal advance. The\nremaining glyphs must be set as mark glyphs, but should also have a non-zero\nhorizontal advance.\n\n\nNote that although the OpenType specification describes this feature as having\nno \"script/language sensitivity\", and in theory can be applied to any situation\nwhere a glyph is decomposed and repeated to stretch over an enclosed sequence\nof glyphs (for example, enclosed numbers, Arabic year or end-of-aya marks, etc.),\nit is only processed as part of the Arabic complex shaper.\n\n\nNote also that as of macOS 11.4, the CoreText shaper does not apply this feature,\nand even if the feature is manually applied, the CoreText shaper does not implement\nthe distribution and stretching algorithm required to make the feature operated\nas expected. This has led some font engineers to create their own, manual\nimplementation inside the font; while this is an interesting engineering exercise,\nadding in the repeated glyphs manually inside the `stch` feature leads to\nerroneous results when such a font is used with a shaping engine which *does*\nimplement `stch` as specified, and cannot be recommended.\n",
        "fea": "feature stch {\n  sub abbreviation-syriac by\n    abbreviation-syriac.start\n    abbreviation-syriac.line\n    abbreviation-syriac.linedot\n    abbreviation-syriac.line\n    abbreviation-syriac.end;\n} stch;\n",
        "done": true,
        "status": null
    },
    "subs": {
        "title": "Subscript",
        "registered": "Microsoft/Adobe",
        "state": "discretionary",
        "automatic": true,
        "description": "This feature replaces glyphs, typically numerals, with subscript forms.\n",
        "example": {
            "font": "Alegreya",
            "text": "H2O"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Vertical Position > Inferiors/Subscripts\".",
        "done": true,
        "status": null
    },
    "sups": {
        "title": "Superscript",
        "registered": "Microsoft/Adobe",
        "state": "discretionary",
        "automatic": true,
        "description": "This feature replaces glyphs with superscript forms, typically for use as footnote\nreferences.\n",
        "example": {
            "font": "Alegreya",
            "text": "2 HI. a,b,c"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Vertical Position > Superiors/Superscripts\".",
        "done": true,
        "status": null
    },
    "swsh": {
        "title": "Swash",
        "registered": "Microsoft/Adobe",
        "state": "discretionary",
        "automatic": true,
        "description": "This feature is used to replace glyphs with swash forms - typically, but not\nexclusively, swash capitals. Although the OpenType standard suggests that\nmultiple swash alternates may be selected by providing a GSUB3 (`sub ... from ...`)\nrule for this feature, in reality most implementations expect a single swash\nalternate, and users may have difficulty accessing glyphs other than the first\nalternate. For this reason, we recommend using GSUB1 (`sub @chars by @chars.swsh`)\nrules for this feature.\n\n\nSee also the `cswh` feature for contextual swash forms.\n",
        "example": {
            "font": "Playball",
            "text": "Fake It"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Contextual Alternates > Swash Alternates\".",
        "done": true,
        "status": null
    },
    "titl": {
        "title": "Titling",
        "registered": "Adobe",
        "state": "discretionary",
        "automatic": true,
        "description": "This feature substitutes glyphs for alternate forms designed for titling,\ntypically some or all capital letters.\n",
        "example": {
            "font": "Work Sans",
            "text": "PÖW"
        },
        "done": true,
        "ui": "In the Mac OS X typography panel, this feature is accessed via \"Style Options >\nTitling Capitals\".\n",
        "status": null
    },
    "tjmo": {
        "title": "Trailing Jamo Forms",
        "registered": "Microsoft",
        "group": "Topographical",
        "state": "required",
        "script": {
            "hang": 3
        },
        "description": "The Korean Hangul script is encoded in Unicode in two ways: first, as a series\nof precomposed syllable graphemes (encoded from U+AC00 to U+D7AF); second, as\na series of indivdual, conjoining *jamo*. Korean syllables form a LVT?\n(leading consonant, vowel, optional trailing consonant) pattern; the leading consonant\n(*choseong*) jamo are encoded between U+1100 and U+115F, the vowel (*jungseong*)\njamo are encoded between U+1160 and U+11A7, and the optional trailing consonant\n(*jongseong*) jamo between U+11A8 and U+11FF. (At least in the primary Hangul\nJamo Unicode block; other jamo are encoded in extension blocks.)\n\n\nThe Hangul shaper will first attempt to compose any sequences of conjoining jamo\ninto an encoded form in the precomposed syllable block. But where this is not\nsuccessful - for example, in an Old Korean form which is not encoded in Unicode\nas a precomposed syllable - then the shaper will instead *decompose* any LV\nsyllables to break the syllable into separate L, V, and T? characters, and then\napply the Korean shaping features (`ljmo`, `vjmo`, `tjmo`) to select forms of\nthe jamo which are appropriately positioned and sized to combine into the correct\ngrapheme-image.\n\n\nFor example, the Old Korean syllable ᄒᆞᆯ is not encoded in Unicode as a precomposed\nsyllable, and so must be encoded with the three individual jamo. The Hangul\nshaper applies the `ljmo` feature to the *choseong*, the `vjmo` feature to the\n*jungseong* and the `tjmo` feature to the *jongseong*. The resulting sequence\nproduces a glyph which renders the syllable correctly, with the `vjmo` and\n`tjmo` generally producing zero-width mark glyphs positioned appropriately. An\nalternative to this technique is to use the `ccmp` feature to turn decomposed\njamo into a precomposed glyph.\n\n\nFor further information, see sections 3.12 and 18.6 of the Unicode Standard.\n",
        "done": true,
        "status": null
    },
    "tnam": {
        "title": "Traditional Name Forms",
        "registered": "Adobe",
        "status": "discouraged",
        "description": "This feature was intended for selecting traditional forms of kanji used in personal\nnames. No fonts implementing this feature have been identified and it is not\nspecified in the Adobe Japan1 glyph set; font developers should place any such\nsubstitutions in the `trad` feature instead.\n",
        "done": true,
        "state": null
    },
    "tnum": {
        "title": "Tabular Figures",
        "registered": "Microsoft/Adobe",
        "automatic": true,
        "description": "This feature replaces proportional figures by tabular (fixed-width) variants.\nSee also the `onum`, `lnum` and `pnum` features. Note that where the default\nform is tabular, this feature has no effect, although some font editors\nprovide rules for this feature in any case.\n",
        "fea": "feature tnum {\n  sub one by one.tf;\n  sub two by two.tf;\n  sub three by three.tf;\n  #...\n} tnum;\n",
        "done": true,
        "example": {
            "font": "Work Sans",
            "text": "|1|2|3|4|"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Number Spacing >\nMonospaced Numbers\".\n\n\nIn CSS, this feature can be accessed through the `font-variant-numeric: tabular-nums` property.\n",
        "state": null,
        "status": null
    },
    "trad": {
        "title": "Traditional Forms",
        "registered": "Adobe",
        "description": "The expected forms of Japanese kanji have evolved and simplified over time. However,\nin particular situations - often in the display of personal names - older,\n\"traditional\" forms (*kyujitai*) are still preferred. This feature allows a user to enter\ntext as normal (i.e. with the Unicode codepoint for a more common, simplified\nform) but have it substituted typographically for the traditional glyph. For\nexample, to typeset the name Sakae as 榮 (a variant found in south west Japan),\nthe user would enter the reading さかえ in their input method environment, and\nhave it converted to 栄, the usual kanji for this word. Applying the `trad`\nfeature would replace 栄 with 榮.\n\n\nNote that where traditional forms have their own Unicode codepoints, using these\ncodepoints directly is preferred, to avoid ambiguity and to preserve the distinction\nin the source text. In some cases (for example, the traditional form of 朗),\n*kyujitai* were not separately encoded in Unicode due to Han unification, and\nso the `trad` feature is necessary to access these glyphs.\n\n\nThe expected substitutions of the `trad` feature are defined in terms of the\n[Adobe-Japan1](https://github.com/adobe-type-tools/Adobe-Japan1) glyphset.\nEngineers creating Japanese fonts according to that glyphset should read the\ninformation at the Adobe-Japan1 repository, and use the latest version of the\nfeature code provided there to implement this feature.\n",
        "fea": "feature trad {\n  sub uni4E9C by uni4E9E;\n  sub uni60AA by uni60E1;\n  sub uni9BF5 by uni9C3A;\n  sub uni5727 by uni58D3;\n  sub uni56F2 by uni570D;\n  sub uni7AC3 by uni7AC3.jp78;\n  sub uni6717 by uni6717.trad;\n  # ...\n} trad;\n",
        "example": {
            "text": "朗栄圧",
            "font": "Kiwi Maru"
        },
        "done": true,
        "state": null,
        "status": null
    },
    "twid": {
        "title": "Third Widths",
        "automatic": true,
        "state": "discretionary",
        "registered": "Adobe",
        "description": "This feature replaces glyphs (normally figures and punctuation) with variants\nwhich are one-third of the em square. This is generally used with CJK fonts\nand in the context of vertical typesetting. (For placing a sequence of three\nnumbers horizontally across an em-width vertical column.)\n\nSee also `fwid`, `hwid`, `qwid`.\n",
        "fea": "feature twid {\n  sub one by one.twid;\n  sub two by two.twid;\n  # ...\n}\n",
        "example": {
            "font": "Feature Sans",
            "text": "か123か"
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Text spacing > Third Width\".",
        "done": true,
        "status": null
    },
    "unic": {
        "title": "Unicase",
        "registered": "Tiro Typeworks",
        "description": "This feature was intended for mapping both upper- and lowercase letters\nto a \"unicase\" alphabet, a set of glyphs with a common glyph height using\na mix of upper- and lowercase glyph forms. (For example, a font may use\nthe lowercase style of `a` but the uppercase style of `B`, but both glyphs\nwill have the same height; see Bradbury Thompson's [Alphabet 26](https://en.wikipedia.org/wiki/Bradbury_Thompson#Alphabet_26)\nor Zuzana Licko's [Filosofia Unicase](https://www.emigre.com/Fonts/Filosofia).)\n",
        "ui": "This feature can be activated using the CSS rule `font-variant-caps: unicase`,\nsubject to browser support.\n",
        "done": true,
        "state": null,
        "status": null
    },
    "valt": {
        "title": "Alternate Vertical Metrics",
        "registered": "Adobe",
        "status": "discouraged",
        "description": "The intention behind this feature was to reposition full-width glyphs\n(e.g. U+FF01-U+FF60) so that they would be visually\ncentered inside the em-square in vertical typesetting context.\n\n\nHowever, a more appropriate way to achieve this visual repositioning is to\nsupply alternate metrics for these glyphs in the `vmtx` and `VORG` tables.\nAs such, this feature has only been implemented extremely rarely, and,\ndespite the description in the OpenType standard, Harfbuzz does not apply\nit by default in vertical layout.\n",
        "done": true,
        "state": null
    },
    "vatu": {
        "title": "Vattu Variants",
        "registered": "Microsoft",
        "group": "Orthographic",
        "script": {
            "INDIC": {
                "order": 8
            },
            "USE": {
                "order": 0
            }
        },
        "state": "required",
        "description": "This feature is intended to replace consonant + below-base (vattu) sequences\nwith ligature forms for fonts supporting the legacy (v1) shaping engine.\n\n\nFor example, in Devanagari, the `<virama> <ra>` sequence is normally replaced\nby a below-base Ra by the `blwf` feature. However, \"for certain consonants,\nthe mark RAsub may graphically combine with the consonant to form a conjunct\nligature form.\" (Unicode Standard, [section 12.1](https://www.unicode.org/versions/Unicode13.0.0/ch12.pdf), \"Rendering Rules\", R7.)\nThis combination is performed by the `vatu` feature in the v1 shaping engine\n(e.g. `deva` script).\n\n\nFor fonts using the new shaper (`dev2`), the `rkrf` feature is used instead to\nsubstitute the whole `<consonant> <virama> <ra>` sequence for a ligature in one rule.\nFonts which wish to support both v1 and v2 shapers should provide both `rkrf`\n(in the `dev2` script) and `blwf`/`vatu` (in `deva` script).\n\n\nAs an orthographic feature, the scope of application of this feature is\nscoped to each syllabic cluster.\n\n\nNote that this feature is also used as a \"signal\" to the shaping engine for reordering\npurposes: that is, if a virama-consonant pair would be substituted by this feature,\nthen that consonant is placed in the below-base position when the syllable is reordered.\n",
        "fea": "feature vatu {\n  script deva;\n  sub Ka.dv Vattu.dv by KaRa.dv;\n  sub Kha.dv Vattu.dv by KhaRa.dv;\n  sub Ga.dv Vattu.dv by GaRa.dv;\n  # ...\n} vatu;\n",
        "done": true,
        "status": null
    },
    "vchw": {
        "state": "discretionary",
        "title": "Vertical Contextual Half-width Spacing",
        "registered": "Adobe/W3C",
        "description": "This feature is the vertical equivalent of `chws`; it is intended to improve\nthe appearance of text set with software which does *not* implement the full\nJLREQ spacing rules, but does implement vertical typesetting.\n\nThis feature is relatively new as of 2021, no implementations have been\nidentified, and to be honest, any layout engine which bothers to support\nvertical typesetting correctly is probably also going to implement JLREQ\nspacing as well.\n",
        "done": true,
        "status": null
    },
    "vert": {
        "title": "Vertical Alternates",
        "registered": "Microsoft/Adobe",
        "state": "required",
        "group": "Typographic",
        "description": "This feature is applied automatically by the shaping engine at the end of\nrequired processing and before discretionary processing when the script\ndirection is set to vertical; it replaces the horizontal positioning and\ntypographic presentation group (`calt`/`clig`/`curs`/`dist`/`kern`/`liga`/`rclt`).\n\n\nIt should be used to replace any glyphs with forms which are more appropriate\nto vertical presentation. For example, punctuation such as ellipses and parenthesis\nshould be replaced with rotated forms, Japanese small kana should be positioned in the\nupper right quadrant of the em square, and Japanese ligature forms (U+32FF-33FF) should\nbe replaced with versions which preserve reading order when read vertically.\n\n\nNote that, aside from supporting CJK vertical presentation, this feature\nshould also be used for typographic presentation rules for fonts supporting\nother vertical writing systems, such as Mongolian.\n\n\nNot also that if the `vrt2` feature is present, this feature will be used instead\nby Microsoft shaping engines. Indeed, Windows 2000 and NT4.1 *require* the use\nof a `vrt2` feature for CFF-outline fonts. However, Harfbuzz and Adobe shapers\nuse `vert` exclusively. See discussion in `vrt2`.\n",
        "fea": "feature vert {\n  sub ellipsis by uniFE19;\n  sub twodotenleader by twodotenleader.vert;\n  sub uniFF08 by uniFE35;\n  sub uniFF09 by uniFE36;\n\n  sub uni32FF by uni32FF.vert;\n  # ...\n} vert;\n",
        "example": {
            "font": "Reggae One",
            "text": "（㌀）"
        },
        "done": true,
        "status": null
    },
    "vhal": {
        "title": "Alternate Vertical Half Widths",
        "automatic": true,
        "state": "discretionary",
        "registered": "Adobe",
        "description": "This feature is similar to the `halt` feature, in that it re-spaces full-width\nglyphs to fit on a half-em, but `vhal` is used in vertical typesetting,\nre-spacing heights instead of widths.\n",
        "fea": "feature vhal {\n  pos [degree.full minute.full quotedblright.full quoteright.full second.full uni3001 uni3002 uni3009 uni300B uni300D uni300F uni3011 uni3015 uni301F uniFF09 uniFF0C uniFF0E uniFF3D uniFF5D] <0 -500 0 0>;\n  pos [quotedblleft.full quoteleft.full uni3008 uni300A uni300C uni300E uni3010 uni3014 uni301D uniFF08 uniFF3B uniFF5B] <0 -500 0 -500>;\n  pos [uni30FB uniFF01 uniFF1A uniFF1B] <0 -250 0 -500>;\n} vhal;\n",
        "done": true,
        "ui": "Unknown. Contributions welcome.",
        "status": null
    },
    "vjmo": {
        "title": "Vowel Jamo Forms",
        "registered": "Microsoft",
        "group": "Topographical",
        "state": "required",
        "script": {
            "hang": 2
        },
        "description": "The Korean Hangul script is encoded in Unicode in two ways: first, as a series\nof precomposed syllable graphemes (encoded from U+AC00 to U+D7AF); second, as\na series of indivdual, conjoining *jamo*. Korean syllables form a LVT?\n(leading consonant, vowel, optional trailing consonant) pattern; the leading consonant\n(*choseong*) jamo are encoded between U+1100 and U+115F, the vowel (*jungseong*)\njamo are encoded between U+1160 and U+11A7, and the optional trailing consonant\n(*jongseong*) jamo between U+11A8 and U+11FF. (At least in the primary Hangul\nJamo Unicode block; other jamo are encoded in extension blocks.)\n\n\nThe Hangul shaper will first attempt to compose any sequences of conjoining jamo\ninto an encoded form in the precomposed syllable block. But where this is not\nsuccessful - for example, in an Old Korean form which is not encoded in Unicode\nas a precomposed syllable - then the shaper will instead *decompose* any LV\nsyllables to break the syllable into separate L, V, and T? characters, and then\napply the Korean shaping features (`ljmo`, `vjmo`, `tjmo`) to select forms of\nthe jamo which are appropriately positioned and sized to combine into the correct\ngrapheme-image.\n\n\nFor example, the Old Korean syllable ᄒᆞᆯ is not encoded in Unicode as a precomposed\nsyllable, and so must be encoded with the three individual jamo. The Hangul\nshaper applies the `ljmo` feature to the *choseong*, the `vjmo` feature to the\n*jungseong* and the `tjmo` feature to the *jongseong*. The resulting sequence\nproduces a glyph which renders the syllable correctly, with the `vjmo` and\n`tjmo` generally producing zero-width mark glyphs positioned appropriately. An\nalternative to this technique is to use the `ccmp` feature to turn decomposed\njamo into a precomposed glyph.\n\n\nFor further information, see sections 3.12 and 18.6 of the Unicode Standard.\n",
        "done": true,
        "status": null
    },
    "vkna": {
        "title": "Vertical Kana Alternates",
        "registered": "Adobe",
        "state": "discretionary",
        "description": "This feature replaces standard kana forms with glyphs which are designed\nspecifically for vertical layout. This may take a variety of forms: fonts\ndesigned with proportional kana might provide fixed-width em-square kana\nglyphs; glyphs may be raised from the horizontal baseline and centered\nwithin the em-square; or structural changes may be made analogous to the\n`hkna` feature. In many fonts, vertical alternates are only provided for\nthe \"small\" kana.\n",
        "example": {
            "font": "Cherry Bomb One",
            "text": "シャットアップ"
        },
        "fea": "feature hkna {\n  sub ka-hira by ka-hira.vkna;\n  sub sa-hira by sa-hira.vkna;\n  sub ta-hira by ta-hira.vkna;\n  # ...\n} hkna;\n",
        "ui": "In the Mac OS X typography panel, this feature is accessed via \"Optimized\nKana Alternatives -> Vertical Alternatives\".\n",
        "done": true,
        "status": null
    },
    "vkrn": {
        "title": "Vertical Kerning",
        "registered": "Adobe",
        "description": "This feature is the equivalent to kerning (see `kern`) for vertical layout, with\nthe exception of the fact that this is *not* necessarily applied by default.\nHarfbuzz and Adobe shapers do not apply it by default in vertical settings,\nand font designers should consider using the `vert` feature instead for maxium compatibility.\n",
        "done": true,
        "state": null,
        "status": null
    },
    "vpal": {
        "title": "Proportional Alternate Vertical Metrics",
        "registered": "Adobe",
        "description": "This feature is the vertical equivalent of the `palt` feature; it uses\npositioning rules to convert full-em glyphs into proportional glyphs\nby aftering their position and Y-advance.\n",
        "fea": "feature vpal {\n  pos uniFF41 <0 -186 0 -373>;\n  pos uniFF42 <0 -148 0 -346>;\n  pos uniFF43 <0 -220 0 -441>;\n  pos uniFF44 <0 -176 0 -353>;\n  # ...\n} vpal;\n",
        "done": true,
        "state": null,
        "status": null
    },
    "vrt2": {
        "title": "Vertical Alternates and Rotation",
        "status": "discouraged",
        "registered": "Adobe",
        "description": "This feature was intended as a replacement for the `vert` feature. The idea\nwas that this feature would contain rules for vertical alternates as per `vert`\nand also rules which replace Latin glyphs by rotated forms; this would mean\nthat the layout process for vertical text would be greatly simplified:\nthe layout engine could simply apply the `vrt2` feature to both CJK and\nLatin text, and not need to rotate any glyphs.\n\n\nHowever, this model of layout [was not widely accepted](https://lists.freedesktop.org/archives/harfbuzz/2013-August/003490.html),\nand the older `vert` feature continues to be the most compatible approach to\nvertical typesetting. For that reason, the use of this feature is *discouraged*\nin favour of `vert`.\n",
        "done": true,
        "state": null
    },
    "vrtr": {
        "title": "Vertical Alternates for Rotation",
        "registered": "Adobe/Microsoft/W3C",
        "description": "This feature is intended to select alternate glyphs to be used in vertical\ntypesetting. When the `writing-mode` CSS property is set to `vertical-lr`\nor `vertical-rl`, certain glyphs are rotated 90 degrees clockwise by the\nrendering engine.\n\nHowever, prior to rotation, the font may wish to substitute glyphs which\nare designed for vertical settings. These glyphs will still be rotated by\nthe rendering engine, but will be visually distinct from the original forms.\n\n\nThis feature is relatively new as of 2021, and no implementations have been\nidentified.\n",
        "done": true,
        "state": null,
        "status": null
    },
    "zero": {
        "title": "Slashed Zero",
        "registered": "Adobe",
        "description": "This feature allows the user to change between the default form of zero\n(without a slash) to a form with a slash through the counter.\n",
        "automatic": true,
        "fea": "feature zero {\n  sub zero by zero.zero;\n}\n",
        "example": {
            "font": "Work Sans",
            "text": 2021
        },
        "ui": "In the OS X typography panel, this feature is accessed via \"Typographic\nExtras > Slashed Zero\".\n",
        "done": true,
        "state": null,
        "status": null
    }
} as const;
