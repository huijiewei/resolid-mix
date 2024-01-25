import { __DEV__ } from '@resolid-remix/utils';
import { forwardRef } from 'react';
import { clsx } from '../../utils/classed';
import { Slot, type AsChildProps } from '../slot/Slot';
import { buttonStyles, type ButtonStyleProps } from './Button.styles';
import { useButtonGroup } from './ButtonGroupContext';

export type ButtonProps = {
  disabled?: boolean;
} & ButtonStyleProps;

export const Button = forwardRef<HTMLButtonElement, AsChildProps<'button', ButtonProps>>((props, ref) => {
  const group = useButtonGroup();

  const {
    asChild,
    color = group?.color ?? 'primary',
    size = group?.size ?? 'md',
    variant = group?.variant ?? 'solid',
    type,
    disabled,
    fullWidth,
    aspectSquare,
    className,
    children,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={clsx(
        buttonStyles({ variant, size, color, aspectSquare, fullWidth }),
        group
          ? group.vertical
            ? 'border-y-[0.5px] first:rounded-t first:border-t last:rounded-b last:border-b'
            : 'border-x-[0.5px] first:rounded-s first:border-s last:rounded-e last:border-e'
          : 'rounded',
        className,
      )}
      type={type ?? asChild ? undefined : 'button'}
      ref={ref}
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
