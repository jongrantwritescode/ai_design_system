import '../components/ds-select.js';
import '../components/ds-option.js';

export default {
  title: 'Components/ds-select',
  component: 'ds-select',
  parameters: {
    docs: {
      description: {
        component: 'A select component that wraps native select elements with support for single and multiple selection.'
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The currently selected value'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required'
    },
    name: {
      control: 'text',
      description: 'The name attribute for form submission'
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple options can be selected'
    },
    size: {
      control: 'number',
      description: 'Number of visible options'
    }
  }
};

const Template = (args) => {
  const element = document.createElement('ds-select');
  
  // Set attributes
  if (args.value) {
    element.setAttribute('value', args.value);
  }
  if (args.disabled) {
    element.setAttribute('disabled', '');
  }
  if (args.required) {
    element.setAttribute('required', '');
  }
  if (args.name) {
    element.setAttribute('name', args.name);
  }
  if (args.multiple) {
    element.setAttribute('multiple', '');
  }
  if (args.size) {
    element.setAttribute('size', args.size);
  }
  
  return element;
};

export const Default = Template.bind({});
Default.args = {
  name: 'country-select'
};

export const WithOptions = () => {
  const select = document.createElement('ds-select');
  select.setAttribute('name', 'country-select');
  
  const option1 = document.createElement('ds-option');
  option1.setAttribute('value', 'us');
  option1.innerHTML = 'United States';
  
  const option2 = document.createElement('ds-option');
  option2.setAttribute('value', 'ca');
  option2.setAttribute('selected', '');
  option2.innerHTML = 'Canada';
  
  const option3 = document.createElement('ds-option');
  option3.setAttribute('value', 'uk');
  option3.innerHTML = 'United Kingdom';
  
  const option4 = document.createElement('ds-option');
  option4.setAttribute('value', 'au');
  option4.innerHTML = 'Australia';
  
  select.appendChild(option1);
  select.appendChild(option2);
  select.appendChild(option3);
  select.appendChild(option4);
  
  return select;
};

export const Disabled = () => {
  const select = document.createElement('ds-select');
  select.setAttribute('name', 'disabled-select');
  select.setAttribute('disabled', '');
  
  const option1 = document.createElement('ds-option');
  option1.setAttribute('value', 'option1');
  option1.innerHTML = 'Option 1';
  
  const option2 = document.createElement('ds-option');
  option2.setAttribute('value', 'option2');
  option2.innerHTML = 'Option 2';
  
  select.appendChild(option1);
  select.appendChild(option2);
  
  return select;
};

export const Required = () => {
  const select = document.createElement('ds-select');
  select.setAttribute('name', 'required-select');
  select.setAttribute('required', '');
  
  const option1 = document.createElement('ds-option');
  option1.setAttribute('value', '');
  option1.innerHTML = 'Please select an option...';
  
  const option2 = document.createElement('ds-option');
  option2.setAttribute('value', 'option1');
  option2.innerHTML = 'Option 1';
  
  const option3 = document.createElement('ds-option');
  option3.setAttribute('value', 'option2');
  option3.innerHTML = 'Option 2';
  
  select.appendChild(option1);
  select.appendChild(option2);
  select.appendChild(option3);
  
  return select;
};

export const Multiple = () => {
  const select = document.createElement('ds-select');
  select.setAttribute('name', 'multiple-select');
  select.setAttribute('multiple', '');
  select.setAttribute('size', '4');
  
  const option1 = document.createElement('ds-option');
  option1.setAttribute('value', 'red');
  option1.innerHTML = 'Red';
  
  const option2 = document.createElement('ds-option');
  option2.setAttribute('value', 'green');
  option2.setAttribute('selected', '');
  option2.innerHTML = 'Green';
  
  const option3 = document.createElement('ds-option');
  option3.setAttribute('value', 'blue');
  option3.setAttribute('selected', '');
  option3.innerHTML = 'Blue';
  
  const option4 = document.createElement('ds-option');
  option4.setAttribute('value', 'yellow');
  option4.innerHTML = 'Yellow';
  
  select.appendChild(option1);
  select.appendChild(option2);
  select.appendChild(option3);
  select.appendChild(option4);
  
  return select;
}; 