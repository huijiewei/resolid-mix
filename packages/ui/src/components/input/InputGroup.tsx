import { __DEV__ } from '@resolid-remix/utils';
import { clsx } from '../../utils/classed';
import type { Props } from '../slot/Slot';
import { InputGroupProvider, type InputGroupContext } from './InputGroupContext';

export type InputGroupProps = Partial<InputGroupContext>;

export const InputGroup = (props: Props<'div', InputGroupProps>) => {
  const { children, className, size = 'md', ...rest } = props;

  return (
    <div className={clsx('relative flex w-full items-stretch', className)} {...rest}>
      <InputGroupProvider value={{ size }}>{children}</InputGroupProvider>
    </div>
  );
};

if (__DEV__) {
  InputGroup.displayName = 'InputGroup';
}
