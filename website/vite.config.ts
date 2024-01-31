import mdx from '@mdx-js/rollup';
import { unstable_vitePlugin as remix } from '@remix-run/dev';
import rehypeShiki from '@shikijs/rehype';
import { resolve } from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig, type AliasOptions, type UserConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import tsconfigPaths from 'vite-tsconfig-paths';
import { deployBuild } from './plugins/node-deploy/build';

// noinspection JSUnusedGlobalSymbols
export default defineConfig(({ command }) => {
  const isBuild = command == 'build';

  const __dirname = fileURLToPath(new URL('.', import.meta.url));

  const config: UserConfig = {
    plugins: [
      mdx({
        providerImportSource: '@mdx-js/react',
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'append',
              headingProperties: { className: 'group scroll-mt-20 reHeadings' },
              properties: { className: 'ml-2 text-green-500 opacity-0 transition-opacity group-hover:opacity-100' },
              content: { type: 'text', value: '#' },
              test: (element: Element) => {
                return element.tagName != 'h1';
              },
            },
          ],
          [
            rehypeShiki,
            {
              theme: 'github-dark',
            },
          ],
        ],
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      }),
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
      !isBuild && tsconfigPaths(),
      !isBuild && Inspect(),
      deployBuild({ entryPoints: ['plugins/node-deploy/entry.ts'] }),
    ].filter(Boolean),
    build: {
      minify: true,
    },
    resolve: {
      alias: [isBuild && { find: '~', replacement: resolve(__dirname, './app') }].filter(Boolean) as AliasOptions,
    },
    ssr: {
      external: ['@node-rs/bcrypt', 'better-sqlite3'],
    },
    optimizeDeps: {
      exclude: ['@node-rs/bcrypt'],
    },
  };

  return config;
});
