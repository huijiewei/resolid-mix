import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { fonts } from '@resolid-remix/stylex/fonts.stylex';
import * as stylex from '@stylexjs/stylex';

import { RouteProgressBar } from '~/components/RouteProgressBar';
import './root.css';

const styles = stylex.create({
  root: {
    fontFamily: fonts.sans,
    margin: 0,
  },
});

// noinspection JSUnusedGlobalSymbols
export default function App() {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4586be" />
        <Meta />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <Links />
      </head>
      <body {...stylex.props(styles.root)}>
        <RouteProgressBar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
