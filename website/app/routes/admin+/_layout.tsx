import { Outlet } from '@remix-run/react';

export default function Layout() {
  return (
    <div className={'bg-blue-400'}>
      <Outlet />
    </div>
  );
}
