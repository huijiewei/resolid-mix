import { __DEV__ } from '@resolid/mix-utils';
import { forwardRef } from 'react';
import { clsx } from '../../utils/classed';
import { useFloatingAria } from '../floating/FloatingAriaContext';
import type { EmptyProps, Props } from '../slot/Slot';

export const PopoverBody = forwardRef<HTMLDivElement, Props<'div', EmptyProps, 'id'>>((props, ref) => {
  const { children, className, ...rest } = props;

  const { descriptionId } = useFloatingAria();

  return (
    <div id={descriptionId} ref={ref} className={clsx('px-3 py-2', className)} {...rest}>
      {children}
    </div>
  );
});

if (__DEV__) {
  PopoverBody.displayName = 'PopoverBody';
}
