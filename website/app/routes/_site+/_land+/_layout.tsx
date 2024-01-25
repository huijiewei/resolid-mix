import { Outlet } from '@remix-run/react';

export default function Layout() {
  return (
    <>
      <div className={'desktop:max-w-6xl mx-auto min-h-[calc(100vh-13rem)] p-4'}>
        <Outlet />
      </div>
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
