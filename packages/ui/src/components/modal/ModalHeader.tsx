import { __DEV__ } from '@resolid/mix-utils';
import { clsx } from '../../utils/classed';
import { useFloatingAria } from '../floating/FloatingAriaContext';
import type { EmptyProps, Props } from '../slot/Slot';

export const ModalHeader = (props: Props<'header', EmptyProps, 'id'>) => {
  const { children, className, ...rest } = props;

  const { labelId } = useFloatingAria();

  return (
    <header id={labelId} className={clsx('flex-0 p-3 text-lg font-bold', className)} {...rest}>
      {children}
    </header>
  );
};

if (__DEV__) {
  ModalHeader.displayName = 'ModalHeader';
}
