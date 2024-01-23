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

export const fontSizes = defineVars({
  xs: '0.813rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
});

export const lineHeights = defineVars({
  xs: '1.25',
  sm: '1.375',
  md: '1.5',
  lg: '1.625',
  xl: '1.75',
});
