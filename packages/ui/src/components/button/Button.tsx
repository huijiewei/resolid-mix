import { colors, type Colors } from '@resolid-remix/stylex/colors.stylex';
import { __DEV__ } from '@resolid-remix/utils';
import type { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

const styles = stylex.create({
  root: {
    color: colors.white,
  },
  color: (color: Colors) => ({
    backgroundColor: colors[`${color}500`],
  }),
});

export type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'style'> & {
  style?: StyleXStyles;
  color?: Colors;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { style, color = 'blue', children, ...rest } = props;
  return (
    <button ref={ref} {...stylex.props(styles.root, styles.color(color), style)} {...rest}>
      {children}
    </button>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
}
