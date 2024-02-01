import { __DEV__ } from '@resolid-mix/utils';
import { clsx } from '../../utils/classed';
import type { Props } from '../slot/Slot';
import { useMenuItemIndicator } from './MenuItemIndicatorContext';

export const MenuItemIndicator = (props: Props<'span'>) => {
  const { className, children, ...rest } = props;

  const context = useMenuItemIndicator();

  return context.checked ? (
    <span className={clsx('absolute left-0 inline-flex w-6 items-center justify-center', className)} {...rest}>
      {children}
    </span>
  ) : null;
};

if (__DEV__) {
  MenuItemIndicator.displayName = 'MenuItemIndicator';
}
