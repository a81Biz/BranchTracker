const react = require('eslint-plugin-react');

module.exports = [
  {
    ignores: ['build/**'],
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
      'no-empty': 'warn',
      'no-cond-assign': ['error', 'always'],
      'valid-typeof': ['error', { requireStringLiterals: true }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
