import common from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { rollup } from 'rollup';
import type { PackageJson } from 'type-fest';
import type { Plugin, RollupCommonJSOptions } from 'vite';

export const deployBuild = ({ entryPoints }: { entryPoints: string[] }): Plugin => {
  let root = '';
  let outDir = '';
  let ssrExternal: string[] | undefined;
  let commonjsOptions: RollupCommonJSOptions;

  // noinspection JSUnusedGlobalSymbols
  return {
    name: 'vite-plugin-build',
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
      const outfile = join(outDir, 'entry.js');

      await esbuild
        .build({
          outfile: outfile,
          entryPoints: entryPoints,
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

      const bundle = await rollup({
        input: outfile,
        plugins: [
          json(),
          nodeResolve({
            preferBuiltins: true,
            exportConditions: ['node'],
          }),
          common({ strictRequires: true, ...commonjsOptions }),
        ],
        external: [...(ssrExternal ?? [])],
        logLevel: 'silent',
      });

      await bundle.write({
        format: 'esm',
        file: join(outDir, 'serve.mjs'),
        inlineDynamicImports: true,
      });

      await bundle.close();

      const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as PackageJson;

      const distPkg = {
        name: pkg.name,
        type: pkg.type,
        scripts: {
          postinstall: pkg.scripts?.postinstall ?? '',
        },
        dependencies: {
          ...Object.keys(pkg.dependencies ?? {})
            .filter((key) => ssrExternal?.includes(key))
            .reduce((obj: Record<string, string>, key) => {
              obj[key] = pkg.dependencies?.[key] ?? '';

              return obj;
            }, {}),
          ...Object.keys(pkg.devDependencies ?? {})
            .filter((key) => ssrExternal?.includes(key))
            .reduce((obj: Record<string, string>, key) => {
              obj[key] = pkg.devDependencies?.[key] ?? '';

              return obj;
            }, {}),
        },
      };

      writeFileSync(join(outDir, 'package.json'), JSON.stringify(distPkg, null, 2), 'utf8');
    },
  };
};
