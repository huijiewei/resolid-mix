import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import type { RollupOptions } from 'rollup';
import type { PackageJson } from 'type-fest';
import type { RollupCommonJSOptions } from 'vite';

export const buildPackageJson = (pkg: PackageJson, ssrExternal: string[]): PackageJson => {
  return {
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
  } as PackageJson;
};

export const buildRollupConfig = (
  outfile: string,
  commonjsOptions: RollupCommonJSOptions,
  ssrExternal: string[],
): RollupOptions => {
  return {
    input: outfile,
    plugins: [
      json(),
      nodeResolve({
        preferBuiltins: true,
        exportConditions: ['node'],
        dedupe: ['react', 'react-dom', '@remix-run/react'],
      }),
      commonjs({ ...commonjsOptions, strictRequires: true }),
    ],
    external: [...(ssrExternal ?? [])],
    logLevel: 'silent',
  };
};
