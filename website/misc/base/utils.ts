import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'esbuild';
import { join } from 'node:path';
import { rollup } from 'rollup';
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

export const bundleServer = async (
  outDir: string,
  entryPoint: string,
  commonjsOptions: RollupCommonJSOptions,
  ssrExternal: string[],
) => {
  const outfile = join(outDir, 'entry.js');

  await esbuild
    .build({
      outfile: outfile,
      entryPoints: [entryPoint],
      define: {
        'process.env.NODE_ENV': '"production"',
      },
      external: ['./index.js'],
      platform: 'node',
      target: 'node20',
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
        dedupe: ['react', 'react-dom', '@remix-run/react'],
      }),
      commonjs({ ...commonjsOptions, strictRequires: true }),
    ],
    external: [...(ssrExternal ?? [])],
    logLevel: 'silent',
  });

  const bundleFile = join(outDir, 'serve.mjs');

  await bundle.write({
    format: 'esm',
    file: bundleFile,
    inlineDynamicImports: true,
  });

  await bundle.close();

  return bundleFile;
};
