import { __DEV__ } from '@resolid-mix/utils';
import type { Props } from '../slot/Slot';

export const MenuGroup = (props: Props<'div'>) => {
  const { children, ...rest } = props;

  return (
    <div role={'group'} {...rest}>
      {children}
    </div>
  );
};

if (__DEV__) {
  MenuGroup.displayName = 'MenuGroup';
}
