import { nodeFileTrace } from '@vercel/nft';
import esbuild from 'esbuild';
import { copy, ensureDir, remove } from 'fs-extra/esm';
import { readFileSync, readdirSync, realpathSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rollup } from 'rollup';
import type { PackageJson } from 'type-fest';
import type { ConfigEnv, Plugin, RollupCommonJSOptions, UserConfig } from 'vite';
import { buildPackageJson, buildRollupConfig } from '../base/utils';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const vercelServerlessBuild = (): Plugin => {
  let root = '';
  let outDir = '';
  let ssrExternal: string[] | undefined;
  let commonjsOptions: RollupCommonJSOptions;

  // noinspection JSUnusedGlobalSymbols
  return {
    name: 'vite-plugin-vercel-serverless-post',
    apply(config: UserConfig, { command }: ConfigEnv) {
      return command === 'build' && !!config.build?.ssr;
    },
    enforce: 'post',
    async configResolved(config) {
      root = config.root || process.cwd();
      outDir = config.build.outDir;
      ssrExternal = config.ssr.external;
      commonjsOptions = config.build.commonjsOptions;
    },
    async closeBundle() {
      console.log('bundle Vercel Serverless for production...');

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

      const bundleFile = join(outDir, 'serve.mjs');

      await bundle.write({
        format: 'esm',
        file: bundleFile,
        inlineDynamicImports: true,
      });

      const distPkg = buildPackageJson(
        JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as PackageJson,
        ssrExternal ?? [],
      );

      /*
      * # .vercel/
        #   project.json
        #   output/
        #     config.json
        #     static/              = build/client
        #     functions/
        #       index.func/
        #         .vc-config.json
        #         index.js         = app/adapters/vercel-serverless.ts
      * */

      const vercelRoot = join(root, '.vercel');
      await remove(vercelRoot);

      await ensureDir(vercelRoot);
      writeFileSync(join(vercelRoot, 'package.json'), JSON.stringify(distPkg, null, 2), 'utf8');

      const vercelOutput = join(vercelRoot, 'output');
      await ensureDir(vercelOutput);

      await copy(join(__dirname, 'config.json'), join(vercelOutput, 'config.json'));

      const vercelOutputStatic = join(vercelOutput, 'static');
      await ensureDir(vercelOutputStatic);

      await copy(resolve(outDir, '../client'), vercelOutputStatic);
      await remove(join(vercelOutputStatic, '.vite'));

      const vercelOutputFunc = join(vercelOutput, 'functions/server.func');
      await ensureDir(vercelOutputFunc);

      const traced = await nodeFileTrace([bundleFile], {
        base: root,
      });

      for (const file of traced.fileList) {
        const source = join(root, file);

        if (source == bundleFile) {
          continue;
        }

        const dest = join(vercelOutputFunc, relative(root, source));
        const real = realpathSync(source);

        if (real.endsWith('@node-rs/bcrypt')) {
          const parent = join(real, '..');

          for (const dir of readdirSync(parent).filter((d) => !d.startsWith('.'))) {
            const realPath = realpathSync(join(parent, dir));
            const realDest = join(dest, '..', dir);

            await copy(realPath, realDest);
          }
        } else {
          await copy(real, dest);
        }
      }

      await copy(join(__dirname, '.vc-config.json'), join(vercelOutputFunc, '.vc-config.json'));

      await copy(bundleFile, join(vercelOutputFunc, 'index.mjs'));
    },
  };
};
