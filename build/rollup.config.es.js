import base from './rollup.config.base';

const config = {
  ...base,
  output: {
    file: 'dist/ts-enum.esm.js',
    format: 'es',
    name: 'ts-enum',
  },
};

export default config;
