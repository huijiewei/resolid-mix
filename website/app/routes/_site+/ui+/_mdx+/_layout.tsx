import { Outlet } from '@remix-run/react';
import { Suspense } from 'react';
import { LazySpinner } from '~/components/LazySpinner';

export default function Layout() {
  return (
    <div className={'flex justify-between'}>
      <article className={'prose w-full max-w-none desktop:w-[calc(100%-11rem)]'}>
        <Suspense fallback={<LazySpinner />}>
          <Outlet />
        </Suspense>
      </article>
      <nav className={'hidden w-40 desktop:block'}>
        <ul className={'sticky top-20 space-y-1 border-s'}>
          <li>
            <a
              className={
                'border-link -ml-px block border-s py-1 ps-4 text-fg-muted hover:border-fg-subtle hover:text-fg-subtle'
              }
              aria-label={'Intro'}
              href={'#intro'}
            >
              Intro
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
