import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import resolidMix from '../packages/tailwind/src';

// noinspection JSUnusedGlobalSymbols
export default {
  presets: [resolidMix.preset()],
  content: [
    './app/**/*.{js,ts,tsx}',
    './node_modules/@resolid-mix/ui/dist/*.{js,cjs,mjs}',
    './node_modules/@resolid-mix/ui/src/**/*.{ts,tsx,mdx}',
  ],
  safelist: ['scroll-mt-20', 'text-green-500', 'ml-2', 'group-hover:opacity-100'],
  theme: {},
  plugins: [typography],
} satisfies Config;
