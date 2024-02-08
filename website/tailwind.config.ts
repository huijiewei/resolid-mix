import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import resolidMix from '../packages/tailwind/src';

// noinspection JSUnusedGlobalSymbols
export default <Partial<Config>>{
  presets: [resolidMix.preset()],
  content: [
    './app/**/*.{js,ts,tsx,mdx}',
    './node_modules/@resolid/mix-ui/dist/*.js',
    './node_modules/@resolid/mix-ui/src/**/*.{ts,tsx}',
  ],
  safelist: ['scroll-mt-20', 'text-green-500', 'ml-2', 'group-hover:opacity-100'],
  theme: {},
  plugins: [typography],
};
