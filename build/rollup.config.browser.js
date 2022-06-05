import base from './rollup.config.base';
import { terser } from "rollup-plugin-terser";

const config = {
  ...base,
  output: {
    file: 'dist/ts-enum.min.js',
    format: 'iife',
    name: 'TsEnum',
  },
};

config.plugins.push(terser());

export default config;
