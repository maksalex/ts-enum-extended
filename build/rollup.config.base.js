import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const config = require('../package.json');

export default {
  input: 'src/index.ts',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    nodeResolve(),
    typescript(),
    cjs({
      exclude: 'src/**',
    }),
    replace({
      VERSION: JSON.stringify(config.version),
    }),
  ],
};
