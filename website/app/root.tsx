import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import { ColorModeScript, ResolidProvider } from '@resolid-remix/ui';
import { RouteProgressBar } from '~/components/RouteProgressBar';
import './root.css';

// noinspection JSUnusedGlobalSymbols
export default function App() {
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
        <Outlet />
      </ResolidProvider>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
      <ColorModeScript />
    </body>
    </html>
  );
}
