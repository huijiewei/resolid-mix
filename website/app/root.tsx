import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { fonts } from '@resolid-remix/stylex/fonts.stylex';
import * as stylex from '@stylexjs/stylex';

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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body {...stylex.props(styles.root)}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
