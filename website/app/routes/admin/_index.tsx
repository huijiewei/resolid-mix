import { Outlet } from '@remix-run/react';
import { Button } from '@resolid-remix/ui';

export default function Index() {
  return (
    <>
      <h2>Resolid Remix Admin</h2>
      <p>Get your app up and running with Remix Run!</p>
      <p>
        <Button color={'green'}>Button</Button>
      </p>
      <Outlet />
    </>
  );
}
