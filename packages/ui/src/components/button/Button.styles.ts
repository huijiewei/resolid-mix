import { colors, type Colors } from '@resolid-remix/stylex/colors.stylex';
import * as stylex from '@stylexjs/stylex';

export const buttonStyles = stylex.create({
  base: {
    borderRadius: '3px',
    borderStyle: 'solid',
    borderWidth: 1,
    transitionProperty: 'color,background-color,border-color,text-decoration-color,fill,stroke',
    transitionDuration: 200,
    width: 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'inherit',
    outline: `2px solid ${colors.transparent}`,
    outlineOffset: 2,
    appearance: 'none',
    cursor: 'pointer',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    pointerEvents: 'none',
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  color: (color: Colors) => ({
    boxShadow: {
      ':focus-visible': `0 0 0 0 #fff,0 0 0 3px rgb(from ${colors[`${color}500`]} r g b / 35%),0 0 #0000`,
    },
  }),
});

export type ButtonVariant = 'solid' | 'outline' | 'light' | 'subtle' | 'link';

export const buttonVariantSolidStyles = stylex.create({
  color: (color: Colors) => ({
    color: colors.white,
    borderColor: {
      default: colors[`${color}500`],
      ':hover': colors[`${color}600`],
      ':active': colors[`${color}700`],
    },
    backgroundColor: {
      default: colors[`${color}500`],
      ':hover': colors[`${color}600`],
      ':active': colors[`${color}700`],
    },
  }),
});

export const buttonVariantOutlineStyles = stylex.create({
  color: (color: Colors) => ({
    color: colors[`${color}700`],
    borderColor: {
      default: colors[`${color}500`],
      ':hover': colors[`${color}600`],
      ':active': colors[`${color}700`],
    },
    backgroundColor: {
      default: colors.white,
      ':hover': colors[`${color}100`],
      ':active': colors[`${color}200`],
    },
  }),
});

export const buttonSizeStyles = stylex.create({
  xs: {
    fontSize: '.8125rem',
    lineHeight: '1.25rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    height: '1.5rem',
  },
  sm: {
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    height: '1.75rem',
  },
  md: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    height: '2rem',
  },
  lg: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    height: '2.25rem',
  },
  xl: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    height: '2.5rem',
  },
});
