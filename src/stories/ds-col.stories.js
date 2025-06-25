import { html } from 'lit';
import '../components/ds-col.js';

export default {
  title: 'Components/ds-col',
  component: 'ds-col',
  parameters: {
    docs: {
      description: {
        component: 'A Flexbox item that can also act as a Flexbox container for vertical layouts.'
      }
    }
  },
  argTypes: {
    // Flex Item Properties
    'flex-grow': {
      control: 'number',
      description: 'How much the item can grow relative to other flex items'
    },
    'flex-shrink': {
      control: 'number',
      description: 'How much the item can shrink relative to other flex items'
    },
    'flex-basis': {
      control: 'text',
      description: 'Initial size of the flex item'
    },
    'align-self': {
      control: 'select',
      options: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      description: 'Alignment of this item within its flex container'
    },
    'order': {
      control: 'number',
      description: 'Order of this item within its flex container'
    },
    // Flex Container Properties
    'justify-content': {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: 'Controls vertical alignment of flex items within this column'
    },
    'align-items': {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      description: 'Controls horizontal alignment of flex items within this column'
    },
    'gap': {
      control: 'text',
      description: 'Spacing between flex items within this column'
    },
    'wrap': {
      control: 'boolean',
      description: 'Whether flex items within this column should wrap'
    }
  }
};

const Template = (args) => html`
  <div style="display: flex; height: 200px; background: #f0f0f0; padding: 16px;">
    <ds-col
      flex-grow="${args['flex-grow']}"
      flex-shrink="${args['flex-shrink']}"
      flex-basis="${args['flex-basis']}"
      align-self="${args['align-self']}"
      order="${args.order}"
      justify-content="${args['justify-content']}"
      align-items="${args['align-items']}"
      gap="${args.gap}"
      ?wrap="${args.wrap}"
      style="background: white; padding: 16px; border-radius: 8px;"
    >
      <div style="background: var(--ds-color-primary); color: white; padding: 8px; border-radius: 4px;">Content 1</div>
      <div style="background: var(--ds-color-secondary); color: white; padding: 8px; border-radius: 4px;">Content 2</div>
      <div style="background: var(--ds-color-primary); color: white; padding: 8px; border-radius: 4px;">Content 3</div>
    </ds-col>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  'flex-grow': 1,
  'flex-shrink': 1,
  'flex-basis': 'auto',
  'align-self': 'stretch',
  'order': 0,
  'justify-content': 'flex-start',
  'align-items': 'stretch',
  'gap': '8px',
  'wrap': false
};

export const GrowingColumn = Template.bind({});
GrowingColumn.args = {
  'flex-grow': 2,
  'flex-shrink': 1,
  'flex-basis': 'auto',
  'align-self': 'stretch',
  'order': 0,
  'justify-content': 'space-around',
  'align-items': 'center',
  'gap': '16px',
  'wrap': false
};

export const FixedWidth = Template.bind({});
FixedWidth.args = {
  'flex-grow': 0,
  'flex-shrink': 0,
  'flex-basis': '200px',
  'align-self': 'flex-start',
  'order': 0,
  'justify-content': 'center',
  'align-items': 'center',
  'gap': '12px',
  'wrap': false
};

export const CenteredContent = Template.bind({});
CenteredContent.args = {
  'flex-grow': 1,
  'flex-shrink': 1,
  'flex-basis': 'auto',
  'align-self': 'center',
  'order': 0,
  'justify-content': 'center',
  'align-items': 'center',
  'gap': '20px',
  'wrap': false
};

export const Reordered = Template.bind({});
Reordered.args = {
  'flex-grow': 1,
  'flex-shrink': 1,
  'flex-basis': 'auto',
  'align-self': 'stretch',
  'order': 2,
  'justify-content': 'space-between',
  'align-items': 'stretch',
  'gap': '8px',
  'wrap': false
}; 