import { __DEV__ } from '@resolid-remix/utils';
import { clsx } from '../../utils/classed';
import type { Props } from '../slot/Slot';

export const ModalFooter = (props: Props<'footer'>) => {
  const { children, className, ...rest } = props;

  return (
    <footer className={clsx('p-3', className)} {...rest}>
      {children}
    </footer>
  );
};

if (__DEV__) {
  ModalFooter.displayName = 'ModalFooter';
}
