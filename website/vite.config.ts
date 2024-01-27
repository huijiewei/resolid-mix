import mdx from '@mdx-js/rollup';
import { unstable_vitePlugin as remix } from '@remix-run/dev';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
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
      ],
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
