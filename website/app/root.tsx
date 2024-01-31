import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/server-runtime';
import { ColorModeScript, ResolidProvider } from '@resolid-remix/ui';
import commonIcon from '~/assets/icons/common.svg';
import { RouteProgressBar } from '~/components/RouteProgressBar';
import { AuthProvider } from '~/extensions/auth/AuthProvider';
import { AuthUserProvider } from '~/extensions/auth/AuthUserProvider';
import { useTypeLoaderData } from '~/extensions/remix/useData';
import { getSessionUser, type SessionUser } from '~/foundation/session.server';

import './root.css';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await getSessionUser(request);
};

// noinspection JSUnusedGlobalSymbols
export const shouldRevalidate = () => false;

// noinspection JSUnusedGlobalSymbols
export const links: LinksFunction = () => {
  return [
    {
      rel: 'preload',
      href: commonIcon,
      as: 'image',
      type: 'image/svg+xml',
    },
  ];
};

// noinspection JSUnusedGlobalSymbols
export default function App() {
  const user = useTypeLoaderData<SessionUser, typeof loader>();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4586be" />
        <Meta />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <Links />
      </head>
      <body className={'min-h-screen overflow-y-scroll antialiased'}>
        <RouteProgressBar />
        <ResolidProvider>
          <AuthUserProvider user={user}>
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          </AuthUserProvider>
        </ResolidProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <ColorModeScript />
      </body>
    </html>
  );
}
