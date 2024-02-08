import { nodeFileTrace } from '@vercel/nft';
import { copyFile, cp, mkdir, readFile, readdir, realpath, rm, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { PackageJson } from 'type-fest';
import type { ConfigEnv, Plugin, RollupCommonJSOptions, UserConfig } from 'vite';
import { buildPackageJson, bundleServer } from '../base/utils';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const vercelServerlessBuild = (): Plugin => {
  let root = '';
  let outDir = '';
  let ssrExternal: string[] | boolean | undefined;
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

      const bundleFile = await bundleServer(outDir, join(__dirname, 'entry.ts'), commonjsOptions, ssrExternal ?? []);

      const distPkg = buildPackageJson(
        JSON.parse(await readFile(join(root, 'package.json'), 'utf8')) as PackageJson,
        ssrExternal ?? [],
      );

      /*
      * # .vercel/
        #   project.json
        #   output/
        #     config.json
        #     static/              = build/client
        #     functions/
        #       _serverless.func/
        #         .vc-config.json
        #         index.mjs         = entry.ts
      * */

      const vercelRoot = join(root, '.vercel');
      await rm(vercelRoot, { recursive: true, force: true });

      await mkdir(vercelRoot, { recursive: true });
      await writeFile(join(vercelRoot, 'package.json'), JSON.stringify(distPkg, null, 2), 'utf8');

      const vercelOutput = join(vercelRoot, 'output');
      await mkdir(vercelOutput, { recursive: true });

      await copyFile(join(__dirname, 'config.json'), join(vercelOutput, 'config.json'));

      const vercelOutputStatic = join(vercelOutput, 'static');
      await mkdir(vercelOutputStatic, { recursive: true });
      await cp(resolve(outDir, '../client'), vercelOutputStatic, { recursive: true });
      await rm(join(vercelOutputStatic, '.vite'), { recursive: true });

      const vercelOutputFunc = join(vercelOutput, 'functions', '_serverless.func');
      await mkdir(vercelOutputFunc, { recursive: true });

      const traced = await nodeFileTrace([bundleFile], {
        base: root,
      });

      for (const file of traced.fileList) {
        const source = join(root, file);

        if (source == bundleFile) {
          continue;
        }

        const dest = join(vercelOutputFunc, relative(root, source));
        const real = await realpath(source);

        if (real.endsWith('@node-rs/bcrypt')) {
          const parent = join(real, '..');

          for (const dir of (await readdir(parent)).filter((d) => !d.startsWith('.'))) {
            const realPath = await realpath(join(parent, dir));
            const realDest = join(dest, '..', dir);

            await cp(realPath, realDest, { recursive: true });
          }
        } else {
          await cp(real, dest, { recursive: true });
        }
      }

      await cp(join(__dirname, '.vc-config.json'), join(vercelOutputFunc, '.vc-config.json'));

      await cp(bundleFile, join(vercelOutputFunc, 'index.mjs'));
    },
  };
};
