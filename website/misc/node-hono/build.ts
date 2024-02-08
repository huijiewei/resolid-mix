import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { PackageJson } from 'type-fest';
import type { Plugin, RollupCommonJSOptions } from 'vite';
import { buildPackageJson, bundleServer } from '../base/utils';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const nodeBuild = (): Plugin => {
  let root = '';
  let outDir = '';
  let ssrExternal: string[] | boolean | undefined;
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

      await bundleServer(outDir, join(__dirname, 'entry.ts'), commonjsOptions, ssrExternal);

      const distPkg = buildPackageJson(
        JSON.parse(await readFile(join(root, 'package.json'), 'utf8')) as PackageJson,
        ssrExternal,
      );

      await writeFile(join(outDir, 'package.json'), JSON.stringify(distPkg, null, 2), 'utf8');
    },
  };
};
