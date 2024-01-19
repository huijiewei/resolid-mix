import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { defineConfig, splitVendorChunkPlugin, type UserConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import { stylexPlugin } from 'vite-plugin-stylex-dev';
import tsconfigPaths from 'vite-tsconfig-paths';

// noinspection JSUnusedGlobalSymbols
export default defineConfig(({ isSsrBuild }) => {
  const config: UserConfig = {
    plugins: [
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
        },
      }),
      Inspect(),
      tsconfigPaths(),
      stylexPlugin(),
      !isSsrBuild && splitVendorChunkPlugin(),
    ],
  };

  if (!isSsrBuild) {
    config.build = {
      rollupOptions: {
        output: {
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
          },
        },
      },
    };
  }

  return config;
});
