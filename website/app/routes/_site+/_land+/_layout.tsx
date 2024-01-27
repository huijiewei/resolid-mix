import { Outlet } from '@remix-run/react';
import { Suspense } from 'react';
import { BaseLayout } from '~/components/layout/BaseLayout';
import { LazySpinner } from '~/components/LazySpinner';

export default function Layout() {
  return (
    <>
      <BaseLayout className={'min-h-[calc(100vh-13rem)] p-4'}>
        <Suspense fallback={<LazySpinner />}>
          <Outlet />
        </Suspense>
      </BaseLayout>
      <footer className={'mt-12 border-t py-4 text-center'}>
        <p>Released under the MIT License</p>
        <p className={'mt-1'}>
          Proudly made in
          <span className={'mx-1'} aria-label="中国" role="img">
            🇨🇳
          </span>
          by Resolid Tech, 2024
        </p>
      </footer>
    </>
  );
}
