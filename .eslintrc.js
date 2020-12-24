module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': [
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript',
        'airbnb/hooks'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module',
        'ecmaFeatures': {
            'modules': true
        },
        'project': './tsconfig.json'
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'settings': {
        'react': {
          'pragma': 'h'
        }
    },
    'rules': {
        'indent': [
            'error',
            2,
            { "SwitchCase": 1 } 
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-use-before-define': 0,
        'import/prefer-default-export': 0,
        'import/no-cycle': 0,
        'no-plusplus': 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'arrow-parens': 0,
        'consistent-return': 0,
        'import/no-named-as-default': 0,
        'class-methods-use-this': 0,
        '@typescript-eslint/no-unused-expressions': 0,
        '@typescript-eslint/lines-between-class-members': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-namespace': "off",
        'react/prop-types': 0,
        'react/jsx-props-no-spreading': 0,
        'react/prefer-stateless-function': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        '@typescript-eslint/ban-types': 0,
        'max-classes-per-file': 0,
        'react/jsx-boolean-value': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        'react/no-danger': 0,
        'no-console': 0,
        "@typescript-eslint/no-explicit-any": 0
    }
}
