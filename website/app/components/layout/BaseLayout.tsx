import { clsx } from '@resolid-mix/ui';
import { type PropsWithChildren } from 'react';

export const BaseLayout = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <div className={clsx('mx-auto desktop:max-w-6xl', className)}>{children}</div>;
};
