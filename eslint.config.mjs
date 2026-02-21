import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import nextPlugin from '@next/eslint-plugin-next'

export default tseslint.config(
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@next/next': nextPlugin
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react/prop-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'react/no-unescaped-entities': 'off'
    }
  },
  {
    files: ['emails/**/*.{ts,tsx}'],
    rules: {
      '@next/next/no-head-element': 'off'
    }
  },
  {
    files: ['scripts/**/*.mjs'],
    rules: {
      'no-console': 'off'
    }
  }
)
