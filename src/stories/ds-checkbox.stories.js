import '../components/ds-checkbox.js';

export default {
  title: 'Components/ds-checkbox',
  component: 'ds-checkbox',
  parameters: {
    docs: {
      description: {
        component: 'A checkbox component that wraps native checkbox input elements with support for individual and grouped checkboxes.'
      }
    }
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'The name attribute for checkbox group association'
    },
    value: {
      control: 'text',
      description: 'The value of the checkbox'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the checkbox is read-only'
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required'
    },
    id: {
      control: 'text',
      description: 'The unique identifier for the checkbox'
    },
    content: {
      control: 'text',
      description: 'The label text for the checkbox'
    }
  }
};

const Template = (args) => {
  const element = document.createElement('ds-checkbox');
  
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
  element.innerHTML = args.content || 'Checkbox Option';
  
  return element;
};

export const Default = Template.bind({});
Default.args = {
  name: 'checkbox-option',
  value: 'option1',
  content: 'Accept terms and conditions'
};

export const Checked = Template.bind({});
Checked.args = {
  name: 'checkbox-option',
  value: 'option2',
  checked: true,
  content: 'Subscribe to newsletter (Checked)'
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: 'checkbox-option',
  value: 'option3',
  disabled: true,
  content: 'Premium feature (Disabled)'
};

export const Required = Template.bind({});
Required.args = {
  name: 'checkbox-option',
  value: 'option4',
  required: true,
  content: 'I agree to the terms (Required)'
};

// Checkbox Group Example
export const CheckboxGroup = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
  
  const checkbox1 = document.createElement('ds-checkbox');
  checkbox1.setAttribute('name', 'interests');
  checkbox1.setAttribute('value', 'technology');
  checkbox1.innerHTML = 'Technology';
  
  const checkbox2 = document.createElement('ds-checkbox');
  checkbox2.setAttribute('name', 'interests');
  checkbox2.setAttribute('value', 'sports');
  checkbox2.setAttribute('checked', '');
  checkbox2.innerHTML = 'Sports';
  
  const checkbox3 = document.createElement('ds-checkbox');
  checkbox3.setAttribute('name', 'interests');
  checkbox3.setAttribute('value', 'music');
  checkbox3.innerHTML = 'Music';
  
  const checkbox4 = document.createElement('ds-checkbox');
  checkbox4.setAttribute('name', 'interests');
  checkbox4.setAttribute('value', 'travel');
  checkbox4.innerHTML = 'Travel';
  
  container.appendChild(checkbox1);
  container.appendChild(checkbox2);
  container.appendChild(checkbox3);
  container.appendChild(checkbox4);
  
  return container;
}; 