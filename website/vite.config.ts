import mdx from '@mdx-js/rollup';
import { unstable_vitePlugin as remix } from '@remix-run/dev';
import rehypeShiki from '@shikijs/rehype';
import { resolve } from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig, type AliasOptions, type UserConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodeBuild } from './misc/node-hono/build';
import { vercelServerlessBuild } from './misc/vercel-serverless/build';
import { chunkSplitPlugin } from './misc/vite-split-chunk/splitChunk';

// noinspection JSUnusedGlobalSymbols
export default defineConfig(({ command }) => {
  const isBuild = command == 'build';
  const buildEnv = process.env.BUILD_ENV;

  const __dirname = fileURLToPath(new URL('.', import.meta.url));

  const config: UserConfig = {
    plugins: [
      mdx({
        providerImportSource: '@mdx-js/react',
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeShiki,
            {
              themes: {
                light: 'github-light',
                dark: 'github-dark',
              },
            },
          ],
        ],
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      }),
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
        ignoredRouteFiles: ['**/*'],
        routes: async (defineRoutes) => {
          return flatRoutes('routes', defineRoutes, {
            ignoredRouteFiles: ['**/.*', '**/__*.*', '**/*.demo.tsx'],
          });
        },
      }),
      !isBuild && tsconfigPaths(),
      !isBuild && Inspect(),
      isBuild && !buildEnv && nodeBuild(),
      isBuild && buildEnv == 'vercel' && vercelServerlessBuild(),
      chunkSplitPlugin({
        manualChunks: (id) => {
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/react-is/') ||
            id.includes('/node_modules/scheduler/') ||
            id.includes('/node_modules/prop-types/')
          ) {
            return 'react';
          }

          if (id.includes('/node_modules/')) {
            return 'vendor';
          }

          if (id.includes('/node_modules/@resolid/') || id.includes('/packages/')) {
            return 'resolid';
          }
        },
      }),
    ].filter(Boolean),
    build: {
      minify: true,
      cssMinify: true,
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) {
            return;
          }
          defaultHandler(warning);
        },
      },
    },
    resolve: {
      alias: [isBuild && { find: '~', replacement: resolve(__dirname, './app') }].filter(Boolean) as AliasOptions,
    },
    ssr: {
      external: ['@node-rs/bcrypt'],
    },
    optimizeDeps: {
      holdUntilCrawlEnd: false,
      exclude: ['@node-rs/bcrypt'],
      include: ['@mdx-js/react'],
    },
  };

  return config;
});
