import base from './rollup.config.base';

const config = {
  ...base,
  output: {
    file: 'dist/ts-enum.umd.js',
    format: 'umd',
    name: 'ts-enum',
  },
};

export default config;
