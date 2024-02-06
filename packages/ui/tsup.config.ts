import { defineConfig } from 'tsup';
import { dependencies, devDependencies, peerDependencies } from './package.json';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'es2022',
  external: [...Object.keys(peerDependencies), ...Object.keys(devDependencies)],
  noExternal: Object.keys(dependencies),
  dts: true,
  minify: true,
  treeshake: true,
  clean: true,
});
