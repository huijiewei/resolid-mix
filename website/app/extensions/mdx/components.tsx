import { clsx } from '@resolid/mix-ui';
import { isExternalUrl } from '@resolid/mix-utils';
import type { ComponentPropsWithoutRef } from 'react';
import { ClipboardCopyButton } from '~/components/ClipboardCopyButton';
import { SpriteIcon } from '~/components/SpriteIcon';

// noinspection JSUnusedGlobalSymbols
export const components = {
  h2: ({ id, children, className, ...rest }: ComponentPropsWithoutRef<'h2'>) => {
    return (
      <h2 id={id} className={clsx('reHeadings group flex scroll-mt-20 items-center', className)} {...rest}>
        {children}
        <a
          tabIndex={-1}
          className={'ml-1 opacity-0 transition-opacity group-hover:opacity-100'}
          aria-hidden={true}
          href={`#${id}`}
        >
          <SpriteIcon size={'0.875em'} name={'link'} />
        </a>
      </h2>
    );
  },
  h3: ({ id, children, className, ...rest }: ComponentPropsWithoutRef<'h3'>) => {
    return (
      <h3 id={id} className={clsx('reHeadings group flex scroll-mt-20 items-center', className)} {...rest}>
        {children}
        <a
          tabIndex={-1}
          className={'ml-1 opacity-0 transition-opacity group-hover:opacity-100'}
          aria-hidden={true}
          href={`#${id}`}
        >
          <SpriteIcon size={'0.875em'} name={'link'} />
        </a>
      </h3>
    );
  },
  pre: ({ children, className, ...rest }: ComponentPropsWithoutRef<'pre'>) => {
    return (
      <div className={'relative'}>
        <pre
          translate={'no'}
          className={clsx(
            'overflow-x-auto rounded border scrollbar scrollbar-thin group-[.demo]:mt-0 group-[.demo]:rounded-t-none group-[.demo]:border-t-0',
            className,
          )}
          tabIndex={-1}
          {...rest}
        >
          {children}
        </pre>
        <div className={'absolute right-1.5 top-1.5'}>
          <ClipboardCopyButton content={children} />
        </div>
      </div>
    );
  },
  a: ({ children, href = '', className, ...rest }: ComponentPropsWithoutRef<'a'>) => {
    const external = isExternalUrl(href);

    return (
      <a
        href={href}
        className={clsx(
          'inline-flex items-center text-link no-underline hover:text-link-hovered hover:underline active:text-link-pressed',
          className,
        )}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...rest}
      >
        {children}
        {external && <SpriteIcon className={'ml-1'} name={'external-link'} />}
      </a>
    );
  },
};
