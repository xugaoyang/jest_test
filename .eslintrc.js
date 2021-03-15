module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    "comma-dangle": 0,
    "no-extra-semi": 0,
    "no-bitwise": 0,
    "prettier/prettier": 0,
    "lines-between-class-members": 0,
    "semi": [
      2,
      "never"
    ],
    "arrow-body-style": [
      "error",
      "always"
    ],
    "operator-assignment": [
      0,
      "never"
    ],
    "import/no-dynamic-require": 0,
    "global-require": 0,
    "linebreak-style": 0,
    "no-unused-expressions": 0,
    "no-undef": 0,
    "no-constant-condition": 0,
    "no-param-reassign": 0,
    "no-new": 0,
    "no-console": 0,
    "no-case-declarations": 0,
    "import/extensions": [
      "error",
      "always",
      {
        "js": "never",
        "vue": "never"
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "optionalDependencies": [
          "test/unit/index.js"
        ]
      }
    ]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        '**/src/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true,
      },
    },
  ],
};
