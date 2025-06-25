/** @type { import('@storybook/web-components').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [

  ],

  framework: {
    name: '@storybook/web-components-webpack5',
    options: {}
  },

  core: {
    disableTelemetry: true
  }
};

export default config; 