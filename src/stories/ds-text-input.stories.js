import '../components/ds-text-input.js';

export default {
  title: 'Components/ds-text-input',
  component: 'ds-text-input',
  parameters: {
    docs: {
      description: {
        component: 'A text input component that wraps native input elements with support for various input types.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'The type of input field'
    },
    value: {
      control: 'text',
      description: 'The current value of the input'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled'
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is read-only'
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required'
    },
    name: {
      control: 'text',
      description: 'The name attribute for form submission'
    },
    id: {
      control: 'text',
      description: 'The unique identifier for the input'
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label for the input'
    }
  }
};

const Template = (args) => {
  const element = document.createElement('ds-text-input');
  
  // Set attributes
  if (args.type) {
    element.setAttribute('type', args.type);
  }
  if (args.value) {
    element.setAttribute('value', args.value);
  }
  if (args.placeholder) {
    element.setAttribute('placeholder', args.placeholder);
  }
  if (args.disabled) {
    element.setAttribute('disabled', '');
  }
  if (args.readonly) {
    element.setAttribute('readonly', '');
  }
  if (args.required) {
    element.setAttribute('required', '');
  }
  if (args.name) {
    element.setAttribute('name', args.name);
  }
  if (args.id) {
    element.setAttribute('id', args.id);
  }
  if (args['aria-label']) {
    element.setAttribute('aria-label', args['aria-label']);
  }
  
  return element;
};

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  placeholder: 'Enter text here...',
  name: 'text-input'
};

export const Email = Template.bind({});
Email.args = {
  type: 'email',
  placeholder: 'Enter your email...',
  name: 'email-input',
  required: true
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  placeholder: 'Enter your password...',
  name: 'password-input',
  required: true
};

export const Number = Template.bind({});
Number.args = {
  type: 'number',
  placeholder: 'Enter a number...',
  name: 'number-input'
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: 'text',
  value: 'This input is disabled',
  disabled: true,
  name: 'disabled-input'
};

export const Readonly = Template.bind({});
Readonly.args = {
  type: 'text',
  value: 'This input is read-only',
  readonly: true,
  name: 'readonly-input'
};

export const WithValue = Template.bind({});
WithValue.args = {
  type: 'text',
  value: 'Pre-filled value',
  name: 'value-input'
};

export const Required = Template.bind({});
Required.args = {
  type: 'text',
  placeholder: 'This field is required...',
  required: true,
  name: 'required-input'
}; 