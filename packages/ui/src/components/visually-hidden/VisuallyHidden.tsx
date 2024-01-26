import { __DEV__ } from '@resolid-remix/utils';
import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export const VisuallyHidden = (props: ComponentPropsWithoutRef<'span'>) => {
  const { children, className, ...rest } = props;

  return (
    <span {...rest} className={clsx('sr-only', className)}>
      {children}
    </span>
  );
};

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}
