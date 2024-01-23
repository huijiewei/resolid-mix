/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
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
      },
      settings: {
        react: {
          version: '18',
        },
      },
    },
  ],
};
