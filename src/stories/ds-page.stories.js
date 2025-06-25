import '../components/ds-page.js';
import '../components/ds-row.js';
import '../components/ds-col.js';
import '../components/ds-button.js';
import '../components/ds-text-input.js';
import '../components/ds-textarea.js';
import '../components/ds-label.js';

export default {
  title: 'Components/ds-page',
  component: 'ds-page',
  parameters: {
    docs: {
      description: {
        component: 'A consistent wrapper around application content, handling page-level layout and margins.'
      }
    }
  }
};

export const Default = () => {
  const element = document.createElement('ds-page');
  element.innerHTML = `
    <header style="background: var(--ds-color-primary); color: white; padding: 16px; text-align: center;">
      <h1>My Application</h1>
    </header>
    
    <ds-row justify-content="space-between" align-items="flex-start" gap="24px" style="margin: 24px 0;">
      <ds-col flex-grow="1" style="background: white; padding: 16px; border-radius: 8px;">
        <h2>Main Content Area</h2>
        <p>This is the main content area that grows to fill available space.</p>
        <p>It can contain any content and will expand to fill the remaining space.</p>
      </ds-col>
      
      <ds-col flex-basis="250px" style="background: white; padding: 16px; border-radius: 8px;">
        <h3>Sidebar</h3>
        <p>This sidebar has a fixed width of 250px.</p>
        <ul>
          <li>Navigation item 1</li>
          <li>Navigation item 2</li>
          <li>Navigation item 3</li>
        </ul>
      </ds-col>
    </ds-row>
    
    <footer style="background: var(--ds-color-secondary); color: white; padding: 16px; text-align: center;">
      <p>&copy; 2025 My Application</p>
    </footer>
  `;
  return element;
};

export const ComplexLayout = () => {
  const element = document.createElement('ds-page');
  element.innerHTML = `
    <header style="background: var(--ds-color-primary); color: white; padding: 16px;">
      <ds-row justify-content="space-between" align-items="center">
        <h1>Complex Layout Example</h1>
        <nav>
          <ds-row gap="16px">
            <a href="#" style="color: white; text-decoration: none;">Home</a>
            <a href="#" style="color: white; text-decoration: none;">About</a>
            <a href="#" style="color: white; text-decoration: none;">Contact</a>
          </ds-row>
        </nav>
      </ds-row>
    </header>
    
    <ds-row gap="24px" style="margin: 24px 0;">
      <ds-col flex-grow="1">
        <ds-row gap="16px" wrap>
          <ds-col flex-basis="300px" style="background: white; padding: 16px; border-radius: 8px;">
            <h3>Card 1</h3>
            <p>This card demonstrates responsive behavior.</p>
          </ds-col>
          <ds-col flex-basis="300px" style="background: white; padding: 16px; border-radius: 8px;">
            <h3>Card 2</h3>
            <p>Cards will wrap to new lines on smaller screens.</p>
          </ds-col>
          <ds-col flex-basis="300px" style="background: white; padding: 16px; border-radius: 8px;">
            <h3>Card 3</h3>
            <p>Each card maintains its minimum width.</p>
          </ds-col>
        </ds-row>
      </ds-col>
    </ds-row>
    
    <footer style="background: var(--ds-color-secondary); color: white; padding: 16px; text-align: center;">
      <p>&copy; 2025 Complex Layout Example</p>
    </footer>
  `;
  return element;
};

export const SimpleContent = () => {
  const element = document.createElement('ds-page');
  element.innerHTML = `
    <ds-row justify-content="center" align-items="center" style="min-height: 60vh;">
      <ds-col style="text-align: center; max-width: 600px;">
        <h1>Welcome to the Design System</h1>
        <p style="font-size: 1.2em; margin: 24px 0;">
          This is a simple example showing how ds-page can be used to create clean, centered content layouts.
        </p>
        <ds-row justify-content="center" gap="16px">
          <ds-button type="button">Get Started</ds-button>
          <ds-button type="button">Learn More</ds-button>
        </ds-row>
      </ds-col>
    </ds-row>
  `;
  return element;
};

export const FormLayout = () => {
  const element = document.createElement('ds-page');
  element.innerHTML = `
    <ds-row justify-content="center" style="margin: 24px 0;">
      <ds-col flex-basis="500px" style="background: white; padding: 32px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="text-align: center; margin-bottom: 24px;">Contact Form</h2>
        
        <ds-col gap="16px">
          <div>
            <ds-label for="name-input">Name</ds-label>
            <ds-text-input id="name-input" type="text" name="name"></ds-text-input>
          </div>
          
          <div>
            <ds-label for="email-input">Email</ds-label>
            <ds-text-input id="email-input" type="email" name="email"></ds-text-input>
          </div>
          
          <div>
            <ds-label for="message-textarea">Message</ds-label>
            <ds-textarea id="message-textarea" name="message" rows="4"></ds-textarea>
          </div>
          
          <ds-row justify-content="center" style="margin-top: 24px;">
            <ds-button type="submit">Send Message</ds-button>
          </ds-row>
        </ds-col>
      </ds-col>
    </ds-row>
  `;
  return element;
}; 