module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json'
  },
  ignorePatterns: ["vite.config.ts"],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 0,
    'react/function-component-definition': 0,
    'implicit-arrow-linebreak': 0,
    'arrow-body-style': 'off',
    'operator-linebreak': 0,
    'quotes': [0, 'double', { 'avoidEscape': true }],
    'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/no-unresolved': 'error',
    'import/extensions': 0,
    '@typescript-eslint/quotes': [2,'double'],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/comma-dangle': [
      'off',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'never',
        'exports': 'never',
        'functions': 'never'
      }
    ],
    'react-hooks/exhaustive-deps': 0,
    'no-promise-executor-return': 0,
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 0,
    '@typescript-eslint/indent': 0,
  }
}
