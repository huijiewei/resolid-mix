import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import resolidRemix from '../packages/tailwind/src';

// noinspection JSUnusedGlobalSymbols
export default {
  presets: [resolidRemix.preset()],
  content: [
    './app/**/*.{js,ts,tsx}',
    './node_modules/@resolid-remix/ui/dist/*.{js,cjs,mjs}',
    './node_modules/@resolid-remix/ui/src/**/*.{ts,tsx,mdx}',
  ],
  theme: {},
  plugins: [typography],
} satisfies Config;
