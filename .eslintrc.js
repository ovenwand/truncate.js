module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        jasmine: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
    ],
    rules: {
        'indent': [
            'error',
            2,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
    },
};
