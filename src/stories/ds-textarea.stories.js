import '../components/ds-textarea.js';

export default {
  title: 'Components/ds-textarea',
  component: 'ds-textarea',
  parameters: {
    docs: {
      description: {
        component: 'A textarea component that wraps native textarea elements with support for multi-line text input.'
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The current value of the textarea'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea'
    },
    rows: {
      control: 'number',
      description: 'Number of visible rows'
    },
    cols: {
      control: 'number',
      description: 'Number of visible columns'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled'
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the textarea is read-only'
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required'
    },
    name: {
      control: 'text',
      description: 'The name attribute for form submission'
    },
    id: {
      control: 'text',
      description: 'The unique identifier for the textarea'
    }
  }
};

const Template = (args) => {
  const element = document.createElement('ds-textarea');
  
  // Set attributes
  if (args.value) {
    element.setAttribute('value', args.value);
  }
  if (args.placeholder) {
    element.setAttribute('placeholder', args.placeholder);
  }
  if (args.rows) {
    element.setAttribute('rows', args.rows);
  }
  if (args.cols) {
    element.setAttribute('cols', args.cols);
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
  
  return element;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter your message here...',
  rows: 4,
  name: 'message'
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: 'This is a pre-filled textarea with some content that demonstrates how the component handles existing text.',
  rows: 4,
  name: 'message'
};

export const Large = Template.bind({});
Large.args = {
  placeholder: 'Enter a longer message...',
  rows: 8,
  cols: 50,
  name: 'long-message'
};

export const Small = Template.bind({});
Small.args = {
  placeholder: 'Short message...',
  rows: 2,
  cols: 30,
  name: 'short-message'
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 'This textarea is disabled and cannot be edited.',
  rows: 4,
  disabled: true,
  name: 'disabled-message'
};

export const Readonly = Template.bind({});
Readonly.args = {
  value: 'This textarea is read-only and cannot be edited.',
  rows: 4,
  readonly: true,
  name: 'readonly-message'
};

export const Required = Template.bind({});
Required.args = {
  placeholder: 'This field is required...',
  rows: 4,
  required: true,
  name: 'required-message'
}; 