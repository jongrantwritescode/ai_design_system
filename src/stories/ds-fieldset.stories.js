import '../components/ds-fieldset.js';
import '../components/ds-legend.js';
import '../components/ds-text-input.js';
import '../components/ds-radio.js';
import '../components/ds-checkbox.js';

export default {
  title: 'Components/ds-fieldset',
  component: 'ds-fieldset',
  parameters: {
    docs: {
      description: {
        component: 'A fieldset component that wraps native fieldset elements for grouping related form controls.'
      }
    }
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The content inside the fieldset'
    }
  }
};

const Template = (args) => {
  const element = document.createElement('ds-fieldset');
  
  // Set content
  element.innerHTML = args.content || '<ds-legend>Fieldset Legend</ds-legend>';
  
  return element;
};

export const Default = Template.bind({});
Default.args = {
  content: '<ds-legend>Personal Information</ds-legend>'
};

// Fieldset with Form Controls Example
export const WithFormControls = () => {
  const fieldset = document.createElement('ds-fieldset');
  
  const legend = document.createElement('ds-legend');
  legend.innerHTML = 'Contact Information';
  fieldset.appendChild(legend);
  
  const nameInput = document.createElement('ds-text-input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('placeholder', 'Enter your name');
  nameInput.setAttribute('name', 'name');
  
  const emailInput = document.createElement('ds-text-input');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('placeholder', 'Enter your email');
  emailInput.setAttribute('name', 'email');
  
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
  container.appendChild(nameInput);
  container.appendChild(emailInput);
  
  fieldset.appendChild(container);
  
  return fieldset;
};

// Fieldset with Radio Buttons Example
export const WithRadioButtons = () => {
  const fieldset = document.createElement('ds-fieldset');
  
  const legend = document.createElement('ds-legend');
  legend.innerHTML = 'Select your preferred contact method';
  fieldset.appendChild(legend);
  
  const radio1 = document.createElement('ds-radio');
  radio1.setAttribute('name', 'contact-method');
  radio1.setAttribute('value', 'email');
  radio1.innerHTML = 'Email';
  
  const radio2 = document.createElement('ds-radio');
  radio2.setAttribute('name', 'contact-method');
  radio2.setAttribute('value', 'phone');
  radio2.setAttribute('checked', '');
  radio2.innerHTML = 'Phone';
  
  const radio3 = document.createElement('ds-radio');
  radio3.setAttribute('name', 'contact-method');
  radio3.setAttribute('value', 'mail');
  radio3.innerHTML = 'Mail';
  
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
  container.appendChild(radio1);
  container.appendChild(radio2);
  container.appendChild(radio3);
  
  fieldset.appendChild(container);
  
  return fieldset;
};

// Fieldset with Checkboxes Example
export const WithCheckboxes = () => {
  const fieldset = document.createElement('ds-fieldset');
  
  const legend = document.createElement('ds-legend');
  legend.innerHTML = 'Select your interests';
  fieldset.appendChild(legend);
  
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
  
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
  container.appendChild(checkbox1);
  container.appendChild(checkbox2);
  container.appendChild(checkbox3);
  container.appendChild(checkbox4);
  
  fieldset.appendChild(container);
  
  return fieldset;
}; 