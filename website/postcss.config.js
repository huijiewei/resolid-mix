/** @type {import("postcss-load-config").Config} */

// noinspection JSUnusedGlobalSymbols
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {}),
  },
};
