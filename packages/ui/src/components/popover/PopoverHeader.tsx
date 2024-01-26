import { __DEV__ } from '@resolid-remix/utils';
import { forwardRef } from 'react';
import { clsx } from '../../utils/classed';
import { useFloatingAria } from '../floating/FloatingAriaContext';
import type { EmptyProps, Props } from '../slot/Slot';

export const PopoverHeader = forwardRef<HTMLDivElement, Props<'header', EmptyProps, 'id'>>((props, ref) => {
  const { children, className, ...rest } = props;

  const { labelId } = useFloatingAria();

  return (
    <header id={labelId} ref={ref} className={clsx('border-b-bg-subtle border-b px-3 py-2', className)} {...rest}>
      {children}
    </header>
  );
});

if (__DEV__) {
  PopoverHeader.displayName = 'PopoverHeader';
}
