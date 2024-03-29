/** @format */

import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

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
    { file: 'lib/mini-vue.cjs.js', format: 'cjs' },
    { file: 'lib/mini-vue.esm.js', format: 'esm' },
  ],
  plugins: [typescript()],
});
