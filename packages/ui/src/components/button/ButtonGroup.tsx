import { __DEV__ } from '@resolid-remix/utils';
import { useMemo } from 'react';
import { clsx } from '../../utils/classed';
import type { Props } from '../slot/Slot';
import { ButtonGroupProvider, type ButtonGroupContext } from './ButtonGroupContext';

export type ButtonGroupProps = ButtonGroupContext;

export const ButtonGroup = (props: Props<'div', ButtonGroupProps, 'role'>) => {
  const { children, vertical = false, disabled, size, color, variant, className, ...rest } = props;

  const context = useMemo(
    () => ({ size, color, variant, disabled, vertical }),
    [size, color, variant, disabled, vertical],
  );

  return (
    <div role={'group'} className={clsx('inline-flex', vertical ? 'flex-col' : 'flex-row', className)} {...rest}>
      <ButtonGroupProvider value={context}>{children}</ButtonGroupProvider>
    </div>
  );
};

if (__DEV__) {
  ButtonGroup.displayName = 'ButtonGroup';
}
