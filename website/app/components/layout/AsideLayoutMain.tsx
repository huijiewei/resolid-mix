import { clsx } from '@resolid-mix/ui';
import type { HTMLProps } from 'react';

export const AsideLayoutMain = (props: HTMLProps<HTMLDivElement>) => {
  const { className, children, ...rest } = props;
  return (
    <div className={'tablet:ps-52'}>
      <main className={clsx('mx-auto min-h-[calc(100vh-10em)] p-4 pt-16 tablet:pt-4', className)} {...rest}>
        {children}
      </main>
      <footer className={'mt-6 border-t px-5 py-3 text-fg-muted'}>
        <div className={'flex justify-between text-sm font-medium'}>
          <div>Copyright © 2024</div>
          <div>
            Proudly made in
            <span className={'mx-1'} aria-label="中国" role="img">
              🇨🇳
            </span>
            by Resolid Tech
          </div>
        </div>
      </footer>
    </div>
  );
};
