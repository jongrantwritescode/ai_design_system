import '../components/ds-legend.js';

export default {
  title: 'Components/ds-legend',
  component: 'ds-legend',
  parameters: {
    docs: {
      description: {
        component: 'A legend component that wraps native legend elements, used within ds-fieldset components to provide a caption.'
      }
    }
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The text content of the legend'
    }
  }
};

const Template = (args) => {
  const element = document.createElement('ds-legend');
  
  // Set content
  element.innerHTML = args.content || 'Legend';
  
  return element;
};

export const Default = Template.bind({});
Default.args = {
  content: 'Form Section'
};

export const LongText = Template.bind({});
LongText.args = {
  content: 'This is a very long legend that demonstrates how the component handles text wrapping and overflow'
};

export const WithSpecialCharacters = Template.bind({});
WithSpecialCharacters.args = {
  content: 'Section 1: Personal Information *'
};

export const Required = Template.bind({});
Required.args = {
  content: 'Required Fields *'
};

// Legend in Context Example
export const InContext = () => {
  const fieldset = document.createElement('fieldset');
  fieldset.style.cssText = 'border: 1px solid #ccc; border-radius: 4px; padding: 16px; margin: 16px 0;';
  
  const legend = document.createElement('ds-legend');
  legend.innerHTML = 'Contact Information';
  fieldset.appendChild(legend);
  
  const content = document.createElement('div');
  content.innerHTML = '<p>This shows how a legend appears within a fieldset context.</p>';
  fieldset.appendChild(content);
  
  return fieldset;
}; 