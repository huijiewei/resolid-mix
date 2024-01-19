import { defineVars } from '@stylexjs/stylex';

export const fonts = defineVars({
  sans: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Noto Sans"',
    'Helvetica',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
  ].join(','),
  serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'].join(','),
  mono: ['SFMono-Regular', 'Consolas', '"Liberation Mono"', 'Menlo', 'Courier', 'monospace'].join(','),
});
