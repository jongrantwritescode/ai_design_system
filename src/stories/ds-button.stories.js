import '../components/ds-button.js';

export default {
  title: 'Components/ds-button',
  component: 'ds-button',
  parameters: {
    docs: {
      description: {
        component: 'A button component that wraps native button elements with support for various button types.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The type of button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    name: {
      control: 'text',
      description: 'The name attribute for form submission'
    },
    value: {
      control: 'text',
      description: 'The value attribute for form submission'
    },
    content: {
      control: 'text',
      description: 'The text content of the button'
    }
  }
};

const Template = (args) => {
  const element = document.createElement('ds-button');
  
  // Set attributes
  if (args.type) {
    element.setAttribute('type', args.type);
  }
  if (args.disabled) {
    element.setAttribute('disabled', '');
  }
  if (args.name) {
    element.setAttribute('name', args.name);
  }
  if (args.value) {
    element.setAttribute('value', args.value);
  }
  
  // Set content
  element.innerHTML = args.content || 'Button';
  
  return element;
};

export const Default = Template.bind({});
Default.args = {
  type: 'button',
  content: 'Click me'
};

export const Submit = Template.bind({});
Submit.args = {
  type: 'submit',
  content: 'Submit Form'
};

export const Reset = Template.bind({});
Reset.args = {
  type: 'reset',
  content: 'Reset Form'
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: 'button',
  content: 'Disabled Button',
  disabled: true
};

export const WithValue = Template.bind({});
WithValue.args = {
  type: 'button',
  content: 'Button with Value',
  value: 'button-value',
  name: 'action-button'
};

export const Primary = Template.bind({});
Primary.args = {
  type: 'button',
  content: 'Primary Action'
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'button',
  content: 'Secondary Action'
}; 