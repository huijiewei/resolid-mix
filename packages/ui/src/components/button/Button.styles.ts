import { colors, type Colors } from '@resolid-remix/stylex/colors.stylex';
import { fontSizes, lineHeights } from '@resolid-remix/stylex/fonts.stylex';
import { heights, rounded } from '@resolid-remix/stylex/sizes.stylex';
import * as stylex from '@stylexjs/stylex';

export const buttonStyles = stylex.create({
  base: {
    borderRadius: rounded.md,
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
  aspectSquare: {
    paddingLeft: 0,
    paddingRight: 0,
    aspectRatio: '1/1',
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

export const buttonVariantStyles = stylex.create({
  solid: {},
  outline: {},
  light: {},
  subtle: {},
  link: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    textDecoration: 'underline',
  },
});

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

export const buttonVariantLightStyles = stylex.create({
  color: (color: Colors) => ({
    color: colors[`${color}700`],
    borderColor: {
      default: colors[`${color}50`],
      ':hover': colors[`${color}100`],
      ':active': colors[`${color}200`],
    },
    backgroundColor: {
      default: colors[`${color}50`],
      ':hover': colors[`${color}100`],
      ':active': colors[`${color}200`],
    },
  }),
});

export const buttonVariantSubtleStyles = stylex.create({
  color: (color: Colors) => ({
    color: colors[`${color}700`],
    borderColor: {
      default: colors.transparent,
      ':hover': colors[`${color}100`],
      ':active': colors[`${color}200`],
    },
    backgroundColor: {
      default: colors.white,
      ':hover': colors[`${color}100`],
      ':active': colors[`${color}200`],
    },
  }),
});

export const buttonVariantLinkStyles = stylex.create({
  color: (color: Colors) => ({
    color: {
      default: colors[`${color}700`],
      ':hover': colors[`${color}800`],
      ':active': colors[`${color}900`],
    },
  }),
});

export const buttonSizeStyles = stylex.create({
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    height: heights.xs,
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    height: heights.sm,
  },
  md: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    height: heights.md,
  },
  lg: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.lg,
    paddingLeft: '1rem',
    paddingRight: '1rem',
    height: heights.lg,
  },
  xl: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.xl,
    paddingLeft: '1rem',
    paddingRight: '1rem',
    height: heights.xl,
  },
});
