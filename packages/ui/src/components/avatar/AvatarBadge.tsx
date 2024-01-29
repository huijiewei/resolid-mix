import { __DEV__ } from '@resolid-remix/utils';
import { clsx } from '../../utils/classed';
import type { Props } from '../slot/Slot';

export const AvatarBadge = (props: Props<'span'>) => {
  const { className, ...rest } = props;
  return (
    <span
      className={clsx(
        'absolute bottom-0 right-0 flex translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full',
        className,
      )}
      {...rest}
    />
  );
};

if (__DEV__) {
  AvatarBadge.displayName = 'AvatarBadge';
}
