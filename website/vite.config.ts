import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import { stylexPlugin } from 'vite-plugin-stylex-dev';
import tsconfigPaths from 'vite-tsconfig-paths';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
      },
      ignoredRouteFiles: ['**/*'],
      routes: async (defineRoutes) => {
        return flatRoutes('routes', defineRoutes, { ignoredRouteFiles: ['**/.*'] });
      },
    }),
    Inspect(),
    tsconfigPaths(),
    stylexPlugin(),
  ],
});
