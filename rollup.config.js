/** @format */

import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import pkg from './package.json' assert { type: 'json' };
const onwarn = (warning) => {
  // Silence circular dependency warning for moment package
  if (warning.code === 'CIRCULAR_DEPENDENCY') {
    return;
  }

  console.warn(`(!) ${warning.message}`);
};
export default defineConfig({
  input: 'src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  plugins: [typescript(), json()],
});
