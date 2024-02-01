import { __DEV__ } from '@resolid/mix-utils';
import { forwardRef } from 'react';
import { clsx } from '../../utils/classed';
import { CloseButton } from '../close-button/CloseButton';
import { useFloatingDispatch } from '../floating/FloatingDispatchContext';
import type { Props } from '../slot/Slot';

export const ModalCloseButton = forwardRef<HTMLButtonElement, Props<'button'>>((props, ref) => {
  const { children, className, ...rest } = props;

  const { close } = useFloatingDispatch();

  return (
    <CloseButton
      onClick={() => close()}
      ref={ref}
      className={clsx('absolute right-2 top-2 rounded p-1 text-lg', className)}
      {...rest}
    >
      {children}
    </CloseButton>
  );
});

if (__DEV__) {
  ModalCloseButton.displayName = 'ModalCloseButton';
}
