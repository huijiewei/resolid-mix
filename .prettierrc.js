/** @type {import('prettier').Options} */
const config = {
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  tailwindConfig: './website/tailwind.config.ts',
  tailwindFunctions: ['clsx', 'classed'],
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
};

// noinspection JSUnusedGlobalSymbols
export default config;
