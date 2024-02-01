import { __DEV__ } from '@resolid-mix/utils';
import { clsx } from '../../utils/classed';
import { useFloatingAria } from '../floating/FloatingAriaContext';
import type { EmptyProps, Props } from '../slot/Slot';

export const PopoverHeader = (props: Props<'header', EmptyProps, 'id'>) => {
  const { children, className, ...rest } = props;

  const { labelId } = useFloatingAria();

  return (
    <header id={labelId} className={clsx('border-b border-b-bg-subtle px-3 py-2', className)} {...rest}>
      {children}
    </header>
  );
};

if (__DEV__) {
  PopoverHeader.displayName = 'PopoverHeader';
}
