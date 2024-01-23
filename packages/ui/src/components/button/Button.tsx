import { type Colors } from '@resolid-remix/stylex/colors.stylex';
import { __DEV__ } from '@resolid-remix/utils';
import type { StyleXStyles } from '@stylexjs/stylex';
import * as stylex from '@stylexjs/stylex';
import { forwardRef } from 'react';
import { Slot, type AsChildProps } from '../slot/Slot';
import {
  buttonSizeStyles,
  buttonStyles,
  buttonVariantLightStyles,
  buttonVariantLinkStyles,
  buttonVariantOutlineStyles,
  buttonVariantSolidStyles,
  buttonVariantStyles,
  buttonVariantSubtleStyles,
} from './Button.styles';

export type ButtonProps = {
  styles?: StyleXStyles;
  color?: Colors;
  variant?: keyof typeof buttonVariantStyles;
  size?: keyof typeof buttonSizeStyles;
  disabled?: boolean;
  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, AsChildProps<'button', ButtonProps>>((props, ref) => {
  const {
    asChild,
    styles,
    type,
    color = 'blue',
    size = 'md',
    variant = 'solid',
    disabled,
    fullWidth,
    children,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type={type ?? asChild ? undefined : 'button'}
      ref={ref}
      {...stylex.props(
        buttonStyles.base,
        disabled && buttonStyles.disabled,
        fullWidth && buttonStyles.fullWidth,
        buttonStyles.color(color),
        buttonVariantStyles[variant],
        variant == 'solid' && buttonVariantSolidStyles.color(color),
        variant == 'outline' && buttonVariantOutlineStyles.color(color),
        variant == 'light' && buttonVariantLightStyles.color(color),
        variant == 'subtle' && buttonVariantSubtleStyles.color(color),
        variant == 'link' && buttonVariantLinkStyles.color(color),
        buttonSizeStyles[size],
        styles,
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Comp>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
}
