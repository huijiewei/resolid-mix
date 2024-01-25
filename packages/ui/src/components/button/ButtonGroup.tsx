import { __DEV__, type Overwrite } from '@resolid-remix/utils';
import { useMemo, type ComponentPropsWithoutRef } from 'react';
import { clsx } from '../../utils/klass';
import { ButtonGroupProvider, type ButtonGroupContext } from './ButtonGroupContext';

export type ButtonGroupProps = ButtonGroupContext;

export const ButtonGroup = (props: Overwrite<ComponentPropsWithoutRef<'div'>, ButtonGroupProps>) => {
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
