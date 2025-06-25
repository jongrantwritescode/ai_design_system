import '../components/ds-radio.js';

export default {
  title: 'Components/ds-radio',
  component: 'ds-radio',
  parameters: {
    docs: {
      description: {
        component: 'A radio button component that wraps native radio input elements with support for radio groups.'
      }
    }
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'The name attribute for radio group association'
    },
    value: {
      control: 'text',
      description: 'The value of the radio button'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio button is checked'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled'
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the radio button is read-only'
    },
    required: {
      control: 'boolean',
      description: 'Whether the radio button is required'
    },
    id: {
      control: 'text',
      description: 'The unique identifier for the radio button'
    },
    content: {
      control: 'text',
      description: 'The label text for the radio button'
    }
  }
};

const Template = (args) => {
  const element = document.createElement('ds-radio');
  
  // Set attributes
  if (args.name) {
    element.setAttribute('name', args.name);
  }
  if (args.value) {
    element.setAttribute('value', args.value);
  }
  if (args.checked) {
    element.setAttribute('checked', '');
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
  if (args.id) {
    element.setAttribute('id', args.id);
  }
  
  // Set content
  element.innerHTML = args.content || 'Radio Option';
  
  return element;
};

export const Default = Template.bind({});
Default.args = {
  name: 'radio-group',
  value: 'option1',
  content: 'Option 1'
};

export const Checked = Template.bind({});
Checked.args = {
  name: 'radio-group',
  value: 'option2',
  checked: true,
  content: 'Option 2 (Checked)'
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: 'radio-group',
  value: 'option3',
  disabled: true,
  content: 'Option 3 (Disabled)'
};

export const Required = Template.bind({});
Required.args = {
  name: 'radio-group',
  value: 'option4',
  required: true,
  content: 'Option 4 (Required)'
};

// Radio Group Example
export const RadioGroup = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
  
  const radio1 = document.createElement('ds-radio');
  radio1.setAttribute('name', 'preferences');
  radio1.setAttribute('value', 'light');
  radio1.innerHTML = 'Light Theme';
  
  const radio2 = document.createElement('ds-radio');
  radio2.setAttribute('name', 'preferences');
  radio2.setAttribute('value', 'dark');
  radio2.setAttribute('checked', '');
  radio2.innerHTML = 'Dark Theme';
  
  const radio3 = document.createElement('ds-radio');
  radio3.setAttribute('name', 'preferences');
  radio3.setAttribute('value', 'auto');
  radio3.innerHTML = 'Auto (System)';
  
  container.appendChild(radio1);
  container.appendChild(radio2);
  container.appendChild(radio3);
  
  return container;
}; 