import { __DEV__ } from '@resolid-remix/utils';
import { forwardRef } from 'react';
import { clsx } from '../../utils/classed';
import { CloseButton } from '../close-button/CloseButton';
import { useFloatingDispatch } from '../floating/FloatingDispatchContext';
import type { Props } from '../slot/Slot';

export const PopoverCloseButton = forwardRef<HTMLButtonElement, Props<'button'>>((props, ref) => {
  const { children, className, ...rest } = props;

  const { close } = useFloatingDispatch();

  return (
    <CloseButton
      onClick={() => close()}
      ref={ref}
      className={clsx('absolute right-1 top-1 rounded p-0.5 text-lg', className)}
      {...rest}
    >
      {children}
    </CloseButton>
  );
});

if (__DEV__) {
  PopoverCloseButton.displayName = 'PopoverCloseButton';
}
