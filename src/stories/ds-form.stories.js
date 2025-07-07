import '../components/ds-form.js';
import '../components/ds-fieldset.js';
import '../components/ds-legend.js';
import '../components/ds-text-input.js';
import '../components/ds-button.js';
import '../components/ds-radio.js';
import '../components/ds-checkbox.js';
import '../components/ds-textarea.js';
import '../components/ds-select.js';
import '../components/ds-option.js';
import '../components/ds-label.js';

export default {
  title: 'Components/ds-form',
  component: 'ds-form',
  parameters: {
    docs: {
      description: {
        component: 'A form component that wraps native form elements with enhanced ARIA support, validation, and error state management.'
      }
    }
  },
  argTypes: {
    action: {
      control: 'text',
      description: 'The URL that processes the form submission'
    },
    method: {
      control: { type: 'select', options: ['get', 'post'] },
      description: 'The HTTP method to use for form submission'
    },
    novalidate: {
      control: 'boolean',
      description: 'Disable browser validation'
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible name for the form'
    }
  }
};

const Template = (args) => {
  const element = document.createElement('ds-form');
  
  // Set attributes
  if (args.action) element.setAttribute('action', args.action);
  if (args.method) element.setAttribute('method', args.method);
  if (args.novalidate) element.setAttribute('novalidate', '');
  if (args['aria-label']) element.setAttribute('aria-label', args['aria-label']);
  
  // Set content
  element.innerHTML = args.content || `
    <ds-fieldset>
      <ds-legend>Basic Form</ds-legend>
      <ds-label for="name">Name</ds-label>
      <ds-text-input id="name" name="name" required></ds-text-input>
    </ds-fieldset>
    <ds-button type="submit">Submit</ds-button>
  `;
  
  return element;
};

export const Default = Template.bind({});
Default.args = {
  action: '/api/submit',
  method: 'post',
  'aria-label': 'Basic form example',
  content: `
    <ds-fieldset>
      <ds-legend>Basic Form</ds-legend>
      <ds-label for="name">Name</ds-label>
      <ds-text-input id="name" name="name" required></ds-text-input>
    </ds-fieldset>
    <ds-button type="submit">Submit</ds-button>
  `
};

// Login Form Example
export const LoginForm = () => {
  const form = document.createElement('ds-form');
  form.setAttribute('action', '/api/login');
  form.setAttribute('method', 'post');
  form.setAttribute('aria-label', 'User login form');
  
  form.innerHTML = `
    <ds-fieldset>
      <ds-legend>Login Information</ds-legend>
      <ds-label for="username">Username</ds-label>
      <ds-text-input id="username" name="username" required></ds-text-input>
      
      <ds-label for="password">Password</ds-label>
      <ds-text-input id="password" name="password" type="password" required></ds-text-input>
    </ds-fieldset>
    <ds-button type="submit" variant="primary">Login</ds-button>
  `;
  
  return form;
};

// Registration Form Example
export const RegistrationForm = () => {
  const form = document.createElement('ds-form');
  form.setAttribute('action', '/api/register');
  form.setAttribute('method', 'post');
  form.setAttribute('aria-label', 'User registration form');
  
  form.innerHTML = `
    <div id="form-instructions">Please fill out all required fields marked with an asterisk (*)</div>
    
    <ds-fieldset>
      <ds-legend>Personal Information</ds-legend>
      <ds-label for="firstName">First Name *</ds-label>
      <ds-text-input id="firstName" name="firstName" required></ds-text-input>
      
      <ds-label for="lastName">Last Name *</ds-label>
      <ds-text-input id="lastName" name="lastName" required></ds-text-input>
      
      <ds-label for="email">Email Address *</ds-label>
      <ds-text-input id="email" name="email" type="email" required></ds-text-input>
    </ds-fieldset>
    
    <ds-fieldset>
      <ds-legend>Account Information</ds-legend>
      <ds-label for="username">Username *</ds-label>
      <ds-text-input id="username" name="username" required></ds-text-input>
      
      <ds-label for="password">Password *</ds-label>
      <ds-text-input id="password" name="password" type="password" required></ds-text-input>
      
      <ds-label for="confirmPassword">Confirm Password *</ds-label>
      <ds-text-input id="confirmPassword" name="confirmPassword" type="password" required></ds-text-input>
    </ds-fieldset>
    
    <ds-fieldset>
      <ds-legend>Preferences</ds-legend>
      <ds-label for="newsletter">Subscribe to newsletter</ds-label>
      <ds-checkbox id="newsletter" name="newsletter" value="yes"></ds-checkbox>
      
      <ds-label for="contactMethod">Preferred Contact Method</ds-label>
      <ds-radio name="contactMethod" value="email" id="contactEmail">Email</ds-radio>
      <ds-radio name="contactMethod" value="phone" id="contactPhone">Phone</ds-radio>
      <ds-radio name="contactMethod" value="mail" id="contactMail">Mail</ds-radio>
    </ds-fieldset>
    
    <ds-button type="submit" variant="primary">Create Account</ds-button>
  `;
  
  return form;
};

// Contact Form Example
export const ContactForm = () => {
  const form = document.createElement('ds-form');
  form.setAttribute('action', '/api/contact');
  form.setAttribute('method', 'post');
  form.setAttribute('aria-label', 'Contact form');
  form.setAttribute('novalidate', '');
  
  form.innerHTML = `
    <ds-fieldset>
      <ds-legend>Contact Information</ds-legend>
      <ds-label for="contactName">Name</ds-label>
      <ds-text-input id="contactName" name="name" required></ds-text-input>
      
      <ds-label for="contactEmail">Email</ds-label>
      <ds-text-input id="contactEmail" name="email" type="email" required></ds-text-input>
      
      <ds-label for="contactPhone">Phone</ds-label>
      <ds-text-input id="contactPhone" name="phone" type="tel"></ds-text-input>
    </ds-fieldset>
    
    <ds-fieldset>
      <ds-legend>Message</ds-legend>
      <ds-label for="subject">Subject</ds-label>
      <ds-select id="subject" name="subject" required>
        <ds-option value="">Select a subject</ds-option>
        <ds-option value="general">General Inquiry</ds-option>
        <ds-option value="support">Technical Support</ds-option>
        <ds-option value="feedback">Feedback</ds-option>
        <ds-option value="other">Other</ds-option>
      </ds-select>
      
      <ds-label for="message">Message</ds-label>
      <ds-textarea id="message" name="message" rows="5" required></ds-textarea>
    </ds-fieldset>
    
    <ds-button type="submit" variant="primary">Send Message</ds-button>
  `;
  
  return form;
};

// Form with Custom Validation
export const FormWithCustomValidation = () => {
  const form = document.createElement('ds-form');
  form.setAttribute('action', '/api/custom-validation');
  form.setAttribute('method', 'post');
  form.setAttribute('aria-label', 'Form with custom validation');
  form.setAttribute('novalidate', '');
  
  form.innerHTML = `
    <ds-fieldset>
      <ds-legend>Custom Validation Example</ds-legend>
      <ds-label for="customEmail">Email (must be from example.com)</ds-label>
      <ds-text-input 
        id="customEmail" 
        name="email" 
        type="email" 
        pattern=".*@example\\.com$"
        title="Email must be from example.com domain"
        required>
      </ds-text-input>
      
      <ds-label for="customPassword">Password (minimum 8 characters)</ds-label>
      <ds-text-input 
        id="customPassword" 
        name="password" 
        type="password" 
        minlength="8"
        required>
      </ds-text-input>
      
      <ds-label for="customAge">Age (must be 18 or older)</ds-label>
      <ds-text-input 
        id="customAge" 
        name="age" 
        type="number" 
        min="18"
        required>
      </ds-text-input>
    </ds-fieldset>
    
    <ds-button type="submit" variant="primary">Submit with Validation</ds-button>
  `;
  
  return form;
};

// Form with ARIA Descriptions
export const FormWithAriaDescriptions = () => {
  const form = document.createElement('ds-form');
  form.setAttribute('action', '/api/aria-example');
  form.setAttribute('method', 'post');
  form.setAttribute('aria-label', 'Form with ARIA descriptions');
  form.setAttribute('aria-describedby', 'form-help');
  
  form.innerHTML = `
    <div id="form-help">
      This form demonstrates proper ARIA usage with descriptions and help text.
      All fields are required unless otherwise noted.
    </div>
    
    <ds-fieldset>
      <ds-legend>Accessibility Example</ds-legend>
      <ds-label for="ariaName">Full Name</ds-label>
      <ds-text-input 
        id="ariaName" 
        name="name" 
        aria-describedby="name-help"
        required>
      </ds-text-input>
      <div id="name-help">Enter your full legal name as it appears on official documents</div>
      
      <ds-label for="ariaEmail">Email Address</ds-label>
      <ds-text-input 
        id="ariaEmail" 
        name="email" 
        type="email"
        aria-describedby="email-help"
        required>
      </ds-text-input>
      <div id="email-help">We'll use this email to send you important updates</div>
    </ds-fieldset>
    
    <ds-button type="submit" variant="primary">Submit</ds-button>
  `;
  
  return form;
}; 