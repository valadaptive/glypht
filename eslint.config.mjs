// @ts-check
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

export default tseslint.config(
    {
        ignores: [
            '**/public/**/*.{cjs,mjs,js,ts,jsx,tsx}',
            '**/c-libs-wrapper/**/*',
            'glypht-web/src/generated/**/*',
            'woff2/**/*',
            'glypht-web/dist/**/*',
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        plugins: {
            '@stylistic': stylistic,
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['error', {
                args: 'after-used',
                varsIgnorePattern: '__.*$',
            }],

            'no-constant-condition': ['error', {
                checkLoops: false,
            }],
            'no-control-regex': ['off'],

            '@stylistic/array-bracket-spacing': ['error', 'never'],
            '@stylistic/block-spacing': ['error', 'never'],

            camelcase: ['error', {
                properties: 'never',
            }],

            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/comma-spacing': ['error'],
            '@stylistic/comma-style': ['error'],
            '@stylistic/eol-last': ['error', 'always'],
            eqeqeq: ['warn'],
            '@stylistic/func-call-spacing': ['error', 'never'],

            '@stylistic/indent': ['error', 4, {
                SwitchCase: 1,
            }],

            '@stylistic/key-spacing': ['error', {
                beforeColon: false,
                afterColon: true,
                mode: 'strict',
            }],

            '@stylistic/keyword-spacing': ['error', {
                before: true,
                after: true,
            }],

            '@stylistic/max-len': [1, {
                code: 120,
                tabWidth: 4,
                ignoreUrls: true,
                ignoreTemplateLiterals: true,
            }],

            '@stylistic/new-parens': ['error'],
            '@stylistic/newline-per-chained-call': ['error'],
            'no-console': ['error'],
            'no-mixed-operators': ['error'],

            'no-multiple-empty-lines': ['error', {
                max: 2,
                maxBOF: 0,
                maxEOF: 0,
            }],

            'no-throw-literal': ['error'],

            '@stylistic/no-trailing-spaces': ['error', {
                skipBlankLines: true,
            }],

            'no-unneeded-ternary': ['error'],
            '@stylistic/object-curly-spacing': ['error'],

            '@stylistic/object-property-newline': ['error', {
                allowMultiplePropertiesPerLine: true,
            }],

            '@stylistic/operator-linebreak': ['error', 'after'],
            'prefer-const': ['error'],

            '@stylistic/quotes': ['error', 'single', {
                allowTemplateLiterals: true,
                avoidEscape: true,
            }],

            '@stylistic/semi': ['error', 'always'],
            '@stylistic/semi-spacing': ['error'],
            '@stylistic/space-before-function-paren': ['error', 'never'],
            '@stylistic/space-in-parens': ['error'],
            '@stylistic/space-infix-ops': ['error'],
            '@stylistic/space-unary-ops': ['error'],
            '@stylistic/member-delimiter-style': ['error'],

            '@typescript-eslint/no-misused-promises': ['error', {
                checksVoidReturn: false,
            }],
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        ...tseslint.configs.disableTypeChecked,
    },
    {
        files: ['scripts/**/*'],
        languageOptions: {
            parserOptions: {
                project: 'scripts/tsconfig.json',
            },
            globals: {
                ...globals.node,
            },
        },
    },
    {
        files: ['glypht-web/**/*'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },
    {
        files: ['**/*.cjs'],
        languageOptions: {
            sourceType: 'commonjs',
        },
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
);
