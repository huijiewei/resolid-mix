import esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rollup } from 'rollup';
import type { PackageJson } from 'type-fest';
import type { Plugin, RollupCommonJSOptions } from 'vite';
import { buildPackageJson, buildRollupConfig } from '../base/utils';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const nodeBuild = (): Plugin => {
  let root = '';
  let outDir = '';
  let ssrExternal: string[] | undefined;
  let commonjsOptions: RollupCommonJSOptions;

  // noinspection JSUnusedGlobalSymbols
  return {
    name: 'vite-plugin-node-hono',
    apply(config, { command }) {
      return command === 'build' && !!config.build?.ssr;
    },
    enforce: 'post',
    configResolved(config) {
      root = config.root || process.cwd();
      outDir = config.build.outDir;
      ssrExternal = config.ssr.external;
      commonjsOptions = config.build.commonjsOptions;
    },
    async closeBundle() {
      console.log('bundle Node Server for production...');

      const outfile = join(outDir, 'entry.js');

      await esbuild
        .build({
          outfile: outfile,
          entryPoints: [join(__dirname, 'entry.ts')],
          define: {
            'process.env.NODE_ENV': '"production"',
          },
          external: ['./index.js'],
          platform: 'node',
          format: 'esm',
          packages: 'external',
          bundle: true,
        })
        .catch((error: unknown) => {
          console.error(error);
          process.exit(1);
        });

      const bundle = await rollup(buildRollupConfig(outfile, commonjsOptions, ssrExternal ?? []));

      await bundle.write({
        format: 'esm',
        file: join(outDir, 'serve.mjs'),
        inlineDynamicImports: true,
      });

      await bundle.close();

      const distPkg = buildPackageJson(
        JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as PackageJson,
        ssrExternal ?? [],
      );

      writeFileSync(join(outDir, 'package.json'), JSON.stringify(distPkg, null, 2), 'utf8');
    },
  };
};
