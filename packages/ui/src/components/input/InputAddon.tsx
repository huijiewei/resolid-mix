import { __DEV__ } from '@resolid-mix/utils';
import { clsx } from '../../utils/classed';
import type { Props } from '../slot/Slot';
import { inputSizeStyles } from './Input.style';
import { useInputGroup } from './InputGroupContext';

export const InputAddon = (props: Props<'span'>) => {
  const { className, children, ...rest } = props;

  const group = useInputGroup();

  if (group == undefined) {
    throw new Error(`useInputGroup returned \`undefined\`. Seems you forgot to wrap component within InputGroup`);
  }

  return (
    <span
      className={clsx(
        'flex items-center rounded border !border-border-default bg-bg-subtlest first:rounded-br-none first:rounded-tr-none last:rounded-bl-none last:rounded-tl-none [&:not(:first-child)]:-ml-px [&:not(:first-child,:last-child)]:rounded-none',
        inputSizeStyles[group.size],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

if (__DEV__) {
  InputAddon.displayName = 'InputAddon';
}
