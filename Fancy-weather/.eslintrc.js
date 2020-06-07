module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "import/no-named-as-default": 0,
    "react/prop-types": 0,
    "react/destructuring-assignment": 0,
    "camelcase": 0,
    "react/jsx-props-no-spreading": 0,
    "no-underscore-dangle": 0
  },
};
