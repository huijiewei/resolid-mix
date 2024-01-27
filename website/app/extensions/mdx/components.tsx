import type { ComponentPropsWithoutRef } from 'react';

export const components = {
  pre: ({ children }: ComponentPropsWithoutRef<'pre'>) => {
    return (
      <pre translate={'no'} className={'overflow-x-auto scrollbar scrollbar-thin'} tabIndex={-1}>
        {children}
      </pre>
    );
  },
};
