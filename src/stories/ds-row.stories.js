import '../components/ds-row.js';

export default {
  title: 'Components/ds-row',
  component: 'ds-row',
  parameters: {
    docs: {
      description: {
        component: 'A Flexbox container for horizontal layouts with configurable alignment, spacing, and wrapping.'
      }
    }
  },
  argTypes: {
    'justify-content': {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: 'Controls horizontal alignment of flex items'
    },
    'align-items': {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      description: 'Controls vertical alignment of flex items'
    },
    'gap': {
      control: 'text',
      description: 'Spacing between flex items'
    },
    'wrap': {
      control: 'boolean',
      description: 'Whether flex items should wrap to new lines'
    }
  }
};

const Template = (args) => {
  const element = document.createElement('ds-row');
  
  if (args['justify-content']) {
    element.setAttribute('justify-content', args['justify-content']);
  }
  if (args['align-items']) {
    element.setAttribute('align-items', args['align-items']);
  }
  if (args.gap) {
    element.setAttribute('gap', args.gap);
  }
  if (args.wrap) {
    element.setAttribute('wrap', '');
  }
  
  element.innerHTML = `
    <div style="background: var(--ds-color-primary); color: white; padding: 8px; border-radius: 4px;">Item 1</div>
    <div style="background: var(--ds-color-secondary); color: white; padding: 8px; border-radius: 4px;">Item 2</div>
    <div style="background: var(--ds-color-primary); color: white; padding: 8px; border-radius: 4px;">Item 3</div>
  `;
  
  return element;
};

export const Default = Template.bind({});
Default.args = {
  'justify-content': 'flex-start',
  'align-items': 'stretch',
  gap: '16px',
  wrap: false
};

export const Centered = Template.bind({});
Centered.args = {
  'justify-content': 'center',
  'align-items': 'center',
  gap: '24px',
  wrap: false
};

export const SpaceBetween = Template.bind({});
SpaceBetween.args = {
  'justify-content': 'space-between',
  'align-items': 'center',
  gap: '16px',
  wrap: false
};

export const Wrapped = Template.bind({});
Wrapped.args = {
  'justify-content': 'flex-start',
  'align-items': 'flex-start',
  gap: '12px',
  wrap: true
};

// Additional examples
export const AlignEnd = Template.bind({});
AlignEnd.args = {
  'justify-content': 'flex-end',
  'align-items': 'flex-end',
  gap: '16px',
  wrap: false
};

export const SpaceAround = Template.bind({});
SpaceAround.args = {
  'justify-content': 'space-around',
  'align-items': 'center',
  gap: '20px',
  wrap: false
}; 