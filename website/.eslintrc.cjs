/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'react-refresh'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      rules: {
        'react/prop-types': 'off',
        'react-hooks/exhaustive-deps': [
          'warn',
          {
            additionalHooks: '(useIsomorphicEffect)',
          },
        ],
        'react-refresh/only-export-components': [
          'warn',
          {
            allowConstantExport: true,
            allowExportNames: ['meta', 'links', 'headers', 'loader', 'action', 'shouldRevalidate'],
          },
        ],
      },
      settings: {
        react: {
          version: '18',
        },
      },
    },
  ],
};
