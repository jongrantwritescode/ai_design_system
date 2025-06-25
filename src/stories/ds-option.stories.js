import '../components/ds-option.js';

export default {
  title: 'Components/ds-option',
  component: 'ds-option',
  parameters: {
    docs: {
      description: {
        component: 'An option component that wraps native option elements, primarily used within ds-select components.'
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The value of the option'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the option is disabled'
    },
    selected: {
      control: 'boolean',
      description: 'Whether the option is selected'
    },
    content: {
      control: 'text',
      description: 'The text content of the option'
    }
  }
};

const Template = (args) => {
  const element = document.createElement('ds-option');
  
  // Set attributes
  if (args.value) {
    element.setAttribute('value', args.value);
  }
  if (args.disabled) {
    element.setAttribute('disabled', '');
  }
  if (args.selected) {
    element.setAttribute('selected', '');
  }
  
  // Set content
  element.innerHTML = args.content || 'Option';
  
  return element;
};

export const Default = Template.bind({});
Default.args = {
  value: 'option1',
  content: 'Option 1'
};

export const Selected = Template.bind({});
Selected.args = {
  value: 'option2',
  selected: true,
  content: 'Option 2 (Selected)'
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 'option3',
  disabled: true,
  content: 'Option 3 (Disabled)'
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: 'custom-value',
  content: 'Custom Option'
};

// Option Group Example
export const OptionGroup = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
  
  const option1 = document.createElement('ds-option');
  option1.setAttribute('value', 'apple');
  option1.innerHTML = 'Apple';
  
  const option2 = document.createElement('ds-option');
  option2.setAttribute('value', 'banana');
  option2.setAttribute('selected', '');
  option2.innerHTML = 'Banana';
  
  const option3 = document.createElement('ds-option');
  option3.setAttribute('value', 'orange');
  option3.innerHTML = 'Orange';
  
  const option4 = document.createElement('ds-option');
  option4.setAttribute('value', 'grape');
  option4.setAttribute('disabled', '');
  option4.innerHTML = 'Grape (Disabled)';
  
  container.appendChild(option1);
  container.appendChild(option2);
  container.appendChild(option3);
  container.appendChild(option4);
  
  return container;
}; 