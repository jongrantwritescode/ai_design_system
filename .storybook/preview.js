import '../src/design_system/styles.css';

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
  },
  decorators: [
    (story) => {
      // Ensure Web Components are properly registered before rendering
      return story();
    }
  ]
};

export default preview; 