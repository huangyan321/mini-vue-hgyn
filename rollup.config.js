/** @format */

import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
export default defineConfig({
  input: 'src/index.ts',
  output: [
    { file: 'lib/mini-vue.cjs.js', format: 'cjs' },
    { file: 'lib/mini-vue.esm.js', format: 'esm' },
  ],
  plugins: [typescript()],
});
