import { __DEV__ } from '@resolid-remix/utils';
import { clsx } from '../../utils/classed';
import type { Props } from '../slot/Slot';

export const PopoverFooter = (props: Props<'footer'>) => {
  const { children, className, ...rest } = props;

  return (
    <footer className={clsx('border-t border-t-bg-subtle px-3 py-2', className)} {...rest}>
      {children}
    </footer>
  );
};

if (__DEV__) {
  PopoverFooter.displayName = 'PopoverFooter';
}
