import '../components/ds-card.js';

export default {
  title: 'Components/ds-card',
  component: 'ds-card',
  parameters: {
    docs: {
      description: {
        component: 'A card container component for grouping content, using design system tokens for color, border, radius, and shadow. Accessible and keyboard focusable.'
      }
    },
    controls: { hideNoControlsWarning: true }
  }
};

export const Default = () => `
  <ds-card>
    <h2>Default Card</h2>
    <p>This is a simple card using the design system.</p>
  </ds-card>
`;

export const WithCustomContent = () => `
  <ds-card>
    <h2>Card with Custom Content</h2>
    <ul>
      <li>List item one</li>
      <li>List item two</li>
      <li>List item three</li>
    </ul>
    <button>Native Button</button>
  </ds-card>
`;

export const FocusAndHover = () => `
  <ds-card tabindex="0">
    <h2>Focusable Card</h2>
    <p>Use Tab to focus this card and see the focus style.</p>
  </ds-card>
`;

Default.storyName = 'Default';
WithCustomContent.storyName = 'With custom content';
FocusAndHover.storyName = 'Focus & Hover States'; 