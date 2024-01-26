import mdx from '@mdx-js/rollup';
import { unstable_vitePlugin as remix } from '@remix-run/dev';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import tsconfigPaths from 'vite-tsconfig-paths';
import { deployBuild } from './plugins/node-deploy/build';

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
    mdx({
      rehypePlugins: [],
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    }),
    Inspect(),
    tsconfigPaths(),
    deployBuild({ entryPoints: ['plugins/node-deploy/entry.ts'] }),
  ],
  build: {
    minify: true,
  },
  ssr: {
    external: ['@node-rs/bcrypt'],
  },
  optimizeDeps: {
    exclude: ['@node-rs/bcrypt'],
  },
});
