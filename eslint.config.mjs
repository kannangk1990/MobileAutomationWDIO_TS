import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import wdio from 'eslint-plugin-wdio';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules/**', 'allure-report/**', 'allure-results/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  wdio.configs['flat/recommended'],
  prettier,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
);
