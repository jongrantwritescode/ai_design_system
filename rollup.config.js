import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  // ES Module build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/standards-ui.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      nodeResolve(),
      terser()
    ],
    external: []
  },
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/standards-ui.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      nodeResolve(),
      terser()
    ],
    external: []
  }
]; 