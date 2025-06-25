import '../components/ds-label.js';
import '../components/ds-text-input.js';

export default {
  title: 'Components/ds-label',
  component: 'ds-label',
  parameters: {
    docs: {
      description: {
        component: 'A label component that wraps native label elements with support for form control association.'
      }
    }
  },
  argTypes: {
    for: {
      control: 'text',
      description: 'The ID of the associated form control'
    },
    content: {
      control: 'text',
      description: 'The text content of the label'
    }
  }
};

const Template = (args) => {
  const element = document.createElement('ds-label');
  
  // Set attributes
  if (args.for) {
    element.setAttribute('for', args.for);
  }
  
  // Set content
  element.innerHTML = args.content || 'Label';
  
  return element;
};

export const Default = Template.bind({});
Default.args = {
  content: 'Username'
};

export const WithFor = Template.bind({});
WithFor.args = {
  for: 'username-input',
  content: 'Username'
};

export const Required = Template.bind({});
Required.args = {
  content: 'Email Address *'
};

export const LongText = Template.bind({});
LongText.args = {
  content: 'This is a very long label that demonstrates how the component handles text wrapping and overflow'
};

// Label with Input Example
export const WithInput = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
  
  const label = document.createElement('ds-label');
  label.setAttribute('for', 'example-input');
  label.innerHTML = 'Example Input:';
  
  const input = document.createElement('ds-text-input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'example-input');
  input.setAttribute('placeholder', 'Enter text here...');
  
  container.appendChild(label);
  container.appendChild(input);
  
  return container;
}; 