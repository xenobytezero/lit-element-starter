//import { plugins, rules } from '../scripts/rules.webpack';
const sharedWebpack = require('../scripts/rules.webpack');

module.exports = {
  stories: ['../src/*.stories.(js|mdx)'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-docs',
    '@storybook/addon-actions/register'
  ],


  webpackFinal: async config => {

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        { loader: require.resolve('ts-loader')},
        // Optional
        { loader: require.resolve('react-docgen-typescript-loader')},
      ],
    });

    sharedWebpack.rules.forEach(r => config.module.rules.push(r));

    sharedWebpack.plugins.forEach(p => config.plugins.push(p));

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  }

};
