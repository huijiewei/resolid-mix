import { __DEV__ } from '@resolid-mix/utils';
import { clsx } from '../../utils/classed';
import type { Props } from '../slot/Slot';

export const MenuGroupLabel = (props: Props<'div'>) => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={clsx('flex w-full items-center p-1.5 leading-none text-fg-muted outline-none', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

if (__DEV__) {
  MenuGroupLabel.displayName = 'MenuGroupLabel';
}
