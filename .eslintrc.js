module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'no-return-assign': 'off',
    'no-extend-native': 'warn',
    semi: ['warn', 'always'],
  },
};
