module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    extends: [
        'airbnb-typescript/base',
    ],
    rules: {
        '@typescript-eslint/no-useless-constructor': 'off',
        '@typescript-eslint/indent': 'off',
        'linebreak-style': ['error', 'unix'],
        'no-param-reassign': ['error', { props: false }],
        'no-unused-vars': ['error', { args: 'none', caughtErrors: 'all' }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'max-len': ['error', 180],
        'no-return-await': 'off',
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],
        'prefer-destructuring': 'off',
        'operator-linebreak': ['error', 'before', { overrides: { '=': 'after', '?': 'after', ':': 'after' } }],
        'arrow-parens': ['error', 'as-needed'],
        'object-curly-newline': ['error', { consistent: true }],
        '@typescript-eslint/no-unused-vars': ['error', { args: 'none', caughtErrors: 'all' }],
        'keyword-spacing': ['error', {
            overrides: {
                await: { before: false },
                new: { before: false },
            },
        }],
    },
    overrides: [
        { files: '*.test.ts', rules: { 'max-lines': 'off' } },
    ],
};
