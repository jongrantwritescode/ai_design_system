import { html } from 'lit';
import '../components/ds-page.js';
import '../components/ds-row.js';
import '../components/ds-col.js';

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

export const Default = () => html`
  <ds-page>
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
  </ds-page>
`;

export const ComplexLayout = () => html`
  <ds-page>
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
  </ds-page>
`;

export const SimpleContent = () => html`
  <ds-page>
    <ds-row justify-content="center" align-items="center" style="min-height: 60vh;">
      <ds-col style="text-align: center; max-width: 600px;">
        <h1>Welcome to the Design System</h1>
        <p style="font-size: 1.2em; margin: 24px 0;">
          This is a simple example showing how ds-page can be used to create clean, centered content layouts.
        </p>
        <ds-row justify-content="center" gap="16px">
          <button style="background: var(--ds-color-primary); color: white; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer;">
            Get Started
          </button>
          <button style="background: var(--ds-color-secondary); color: white; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer;">
            Learn More
          </button>
        </ds-row>
      </ds-col>
    </ds-row>
  </ds-page>
`;

export const FormLayout = () => html`
  <ds-page>
    <ds-row justify-content="center" style="margin: 24px 0;">
      <ds-col flex-basis="500px" style="background: white; padding: 32px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="text-align: center; margin-bottom: 24px;">Contact Form</h2>
        
        <ds-col gap="16px">
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: bold;">Name</label>
            <input type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: bold;">Email</label>
            <input type="email" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: bold;">Message</label>
            <textarea rows="4" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; resize: vertical;"></textarea>
          </div>
          
          <ds-row justify-content="center" style="margin-top: 24px;">
            <button style="background: var(--ds-color-primary); color: white; border: none; padding: 12px 32px; border-radius: 4px; cursor: pointer; font-size: 16px;">
              Send Message
            </button>
          </ds-row>
        </ds-col>
      </ds-col>
    </ds-row>
  </ds-page>
`; 