const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next-router',
  ],
  framework: '@storybook/react',
  webpackFinal: config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          '~': path.join('..', 'src'),
        },
      },
    }
  },
}
