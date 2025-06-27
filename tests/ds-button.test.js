import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createComponent, removeComponent } from './setup.js';

describe('ds-button Tests', () => {
  let button;

  afterEach(() => {
    if (button) {
      removeComponent(button);
    }
  });

  describe('Basic Functionality', () => {
    it('should create a button with proper structure', async () => {
      button = await createComponent('ds-button');
      
      expect(button.shadowRoot).toBeDefined();
      expect(button.shadowRoot.querySelector('button')).toBeDefined();
      expect(button.shadowRoot.querySelector('.wrapper')).toBeDefined();
    });

    it('should set button type correctly', async () => {
      button = await createComponent('ds-button', { 'type': 'submit' });
      const internalButton = button.shadowRoot.querySelector('button');
      
      expect(internalButton.type).toBe('submit');
      expect(button.type).toBe('submit');
    });

    it('should handle disabled state', async () => {
      button = await createComponent('ds-button', { 'disabled': '' });
      const internalButton = button.shadowRoot.querySelector('button');
      
      expect(internalButton.disabled).toBe(true);
      expect(button.disabled).toBe(true);
    });

    it('should set name and value attributes', async () => {
      button = await createComponent('ds-button', { 
        'name': 'test-button',
        'value': 'test-value'
      });
      const internalButton = button.shadowRoot.querySelector('button');
      
      expect(internalButton.name).toBe('test-button');
      expect(internalButton.value).toBe('test-value');
      expect(button.name).toBe('test-button');
      expect(button.value).toBe('test-value');
    });

    it('should apply variant classes', async () => {
      button = await createComponent('ds-button', { 'variant': 'primary' });
      const internalButton = button.shadowRoot.querySelector('button');
      
      expect(internalButton.classList.contains('primary')).toBe(true);
    });

    it('should remove old variant when changing variants', async () => {
      button = await createComponent('ds-button', { 'variant': 'primary' });
      const internalButton = button.shadowRoot.querySelector('button');
      
      expect(internalButton.classList.contains('primary')).toBe(true);
      
      button.setAttribute('variant', 'secondary');
      expect(internalButton.classList.contains('primary')).toBe(false);
      expect(internalButton.classList.contains('secondary')).toBe(true);
    });

    it('should re-dispatch click events', async () => {
      button = await createComponent('ds-button');
      
      const clickSpy = vi.fn();
      button.addEventListener('click', clickSpy);
      
      const internalButton = button.shadowRoot.querySelector('button');
      internalButton.click();
      
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should re-dispatch focus and blur events', async () => {
      button = await createComponent('ds-button');
      
      const focusSpy = vi.fn();
      const blurSpy = vi.fn();
      button.addEventListener('focus', focusSpy);
      button.addEventListener('blur', blurSpy);
      
      const internalButton = button.shadowRoot.querySelector('button');
      internalButton.focus();
      internalButton.blur();
      
      expect(focusSpy).toHaveBeenCalled();
      expect(blurSpy).toHaveBeenCalled();
    });

    it('should handle property setters correctly', async () => {
      button = await createComponent('ds-button');
      
      button.type = 'reset';
      button.disabled = true;
      button.name = 'new-name';
      button.value = 'new-value';
      button.variant = 'danger';
      
      const internalButton = button.shadowRoot.querySelector('button');
      
      expect(internalButton.type).toBe('reset');
      expect(internalButton.disabled).toBe(true);
      expect(internalButton.name).toBe('new-name');
      expect(internalButton.value).toBe('new-value');
      expect(internalButton.classList.contains('danger')).toBe(true);
    });
  });

  describe('ARIA', () => {
    describe('Static ARIA Attributes', () => {
      it('should apply static ARIA attributes on component initialization', async () => {
        button = await createComponent('ds-button');
        const internalButton = button.shadowRoot.querySelector('button');
        
        expect(internalButton).toHaveAttribute('role', 'button');
      });

      it('should not allow static attributes to be overridden by dynamic attributes', async () => {
        button = await createComponent('ds-button', { 'role': 'link' });
        const internalButton = button.shadowRoot.querySelector('button');
        
        // Static role should still be 'button' even if we try to set it to 'link'
        expect(internalButton).toHaveAttribute('role', 'button');
      });

      it('should set default roles correctly', async () => {
        button = await createComponent('ds-button');
        const internalButton = button.shadowRoot.querySelector('button');
        
        expect(internalButton).toHaveAttribute('role', 'button');
      });
    });

    describe('Dynamic ARIA Attributes', () => {
      it('should set dynamic ARIA attributes via HTML attributes', async () => {
        button = await createComponent('ds-button', {
          'aria-label': 'Test Button',
          'aria-describedby': 'description',
          'aria-pressed': 'false'
        });
        const internalButton = button.shadowRoot.querySelector('button');
        
        expect(internalButton).toHaveAttribute('aria-label', 'Test Button');
        expect(internalButton).toHaveAttribute('aria-describedby', 'description');
        expect(internalButton).toHaveAttribute('aria-pressed', 'false');
      });

      it('should set dynamic ARIA attributes via JavaScript properties', async () => {
        button = await createComponent('ds-button');
        const internalButton = button.shadowRoot.querySelector('button');
        
        button.ariaLabel = 'Property Set Button';
        button.ariaPressed = 'true';
        
        expect(internalButton).toHaveAttribute('aria-label', 'Property Set Button');
        expect(internalButton).toHaveAttribute('aria-pressed', 'true');
      });

      it('should trigger proper updates when attributes change', async () => {
        button = await createComponent('ds-button');
        const internalButton = button.shadowRoot.querySelector('button');
        
        button.setAttribute('aria-label', 'Initial Label');
        expect(internalButton).toHaveAttribute('aria-label', 'Initial Label');
        
        button.setAttribute('aria-label', 'Updated Label');
        expect(internalButton).toHaveAttribute('aria-label', 'Updated Label');
      });

      it('should properly remove ARIA attributes', async () => {
        button = await createComponent('ds-button', { 'aria-label': 'Test' });
        const internalButton = button.shadowRoot.querySelector('button');
        
        expect(internalButton).toHaveAttribute('aria-label', 'Test');
        
        button.removeAttribute('aria-label');
        expect(internalButton).not.toHaveAttribute('aria-label');
      });
    });

    describe('Button-Specific ARIA Validation', () => {
      it('should warn when button has no accessible name', async () => {
        // Create button without accessible name
        button = await createComponent('ds-button');
        
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('Button has no accessible name')
        );
      });

      it('should not warn when button has text content', async () => {
        button = await createComponent('ds-button');
        button.textContent = 'Button Text';
        
        // Should not warn about missing accessible name
        expect(console.warn).not.toHaveBeenCalledWith(
          expect.stringContaining('Button has no accessible name')
        );
      });

      it('should not warn when button has aria-label', async () => {
        button = await createComponent('ds-button', { 'aria-label': 'Accessible Button' });
        
        expect(console.warn).not.toHaveBeenCalledWith(
          expect.stringContaining('Button has no accessible name')
        );
      });

      it('should validate aria-pressed values', async () => {
        button = await createComponent('ds-button', { 'aria-pressed': 'invalid-value' });
        
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('Invalid aria-pressed value')
        );
      });

      it('should accept valid aria-pressed values', async () => {
        button = await createComponent('ds-button', { 'aria-pressed': 'true' });
        const internalButton = button.shadowRoot.querySelector('button');
        
        expect(internalButton).toHaveAttribute('aria-pressed', 'true');
        expect(console.warn).not.toHaveBeenCalledWith(
          expect.stringContaining('Invalid aria-pressed value')
        );
      });

      it('should validate aria-describedby references', async () => {
        button = await createComponent('ds-button', { 'aria-describedby': 'non-existent-id' });
        
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('does not exist in the document')
        );
      });
    });

    describe('ARIA Property Accessors', () => {
      it('should allow setting and getting ariaLabel', async () => {
        button = await createComponent('ds-button');
        
        button.ariaLabel = 'Test Label';
        expect(button.ariaLabel).toBe('Test Label');
        
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-label', 'Test Label');
      });

      it('should allow setting and getting ariaDescribedBy', async () => {
        button = await createComponent('ds-button');
        
        button.ariaDescribedBy = 'help-text';
        expect(button.ariaDescribedBy).toBe('help-text');
        
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-describedby', 'help-text');
      });

      it('should allow setting and getting ariaPressed', async () => {
        button = await createComponent('ds-button');
        
        button.ariaPressed = 'true';
        expect(button.ariaPressed).toBe('true');
        
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-pressed', 'true');
      });

      it('should allow setting and getting ariaExpanded', async () => {
        button = await createComponent('ds-button');
        
        button.ariaExpanded = 'true';
        expect(button.ariaExpanded).toBe('true');
        
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-expanded', 'true');
      });

      it('should allow setting and getting ariaHasPopup', async () => {
        button = await createComponent('ds-button');
        
        button.ariaHasPopup = 'menu';
        expect(button.ariaHasPopup).toBe('menu');
        
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-haspopup', 'menu');
      });

      it('should handle null/undefined values in property accessors', async () => {
        button = await createComponent('ds-button', { 'aria-label': 'Test' });
        
        // Set to null/undefined should remove the attribute
        button.ariaLabel = null;
        expect(button.ariaLabel).toBeNull();
        
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).not.toHaveAttribute('aria-label');
      });
    });

    describe('Accessible Name Calculation', () => {
      it('should prioritize aria-labelledby over aria-label', async () => {
        // Add a labelledby element to the document
        const labelElement = document.createElement('div');
        labelElement.id = 'button-label';
        labelElement.textContent = 'Labelled By Text';
        document.body.appendChild(labelElement);
        
        button = await createComponent('ds-button', {
          'aria-label': 'Aria Label Text',
          'aria-labelledby': 'button-label'
        });
        
        // Should not warn about missing accessible name
        expect(console.warn).not.toHaveBeenCalledWith(
          expect.stringContaining('Button has no accessible name')
        );
        
        // Clean up
        document.body.removeChild(labelElement);
      });

      it('should prioritize aria-label over text content', async () => {
        button = await createComponent('ds-button');
        button.textContent = 'Button Text';
        button.ariaLabel = 'Aria Label Text';
        
        // Should not warn about missing accessible name
        expect(console.warn).not.toHaveBeenCalledWith(
          expect.stringContaining('Button has no accessible name')
        );
      });

      it('should use text content as fallback', async () => {
        button = await createComponent('ds-button');
        button.textContent = 'Button Text';
        
        // Should not warn about missing accessible name
        expect(console.warn).not.toHaveBeenCalledWith(
          expect.stringContaining('Button has no accessible name')
        );
      });
    });

    describe('Token Validation', () => {
      it('should validate aria-haspopup tokens', async () => {
        const validTokens = ['false', 'true', 'menu', 'listbox', 'tree', 'grid', 'dialog'];
        
        for (const token of validTokens) {
          button = await createComponent('ds-button', { 'aria-haspopup': token });
          const internalButton = button.shadowRoot.querySelector('button');
          expect(internalButton).toHaveAttribute('aria-haspopup', token);
        }
        
        // Test invalid token
        button = await createComponent('ds-button', { 'aria-haspopup': 'invalid' });
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('Invalid value')
        );
      });

      it('should validate aria-pressed tokens', async () => {
        const validTokens = ['false', 'true', 'mixed', 'undefined'];
        
        for (const token of validTokens) {
          button = await createComponent('ds-button', { 'aria-pressed': token });
          const internalButton = button.shadowRoot.querySelector('button');
          expect(internalButton).toHaveAttribute('aria-pressed', token);
        }
        
        // Test invalid token
        button = await createComponent('ds-button', { 'aria-pressed': 'invalid' });
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('Invalid aria-pressed value')
        );
      });

      it('should validate aria-expanded tokens', async () => {
        const validTokens = ['false', 'true', 'undefined'];
        
        for (const token of validTokens) {
          button = await createComponent('ds-button', { 'aria-expanded': token });
          const internalButton = button.shadowRoot.querySelector('button');
          expect(internalButton).toHaveAttribute('aria-expanded', token);
        }
      });
    });

    describe('Integration with BaseComponent', () => {
      it('should inherit BaseComponent ARIA functionality', async () => {
        button = await createComponent('ds-button', {
          'aria-label': 'Test Button',
          'aria-describedby': 'button-help'
        });
        
        const internalButton = button.shadowRoot.querySelector('button');
        
        // Should have all ARIA attributes applied
        expect(internalButton).toHaveAttribute('aria-label', 'Test Button');
        expect(internalButton).toHaveAttribute('aria-describedby', 'button-help');
        expect(internalButton).toHaveAttribute('role', 'button');
      });

      it('should use BaseComponent validation methods', async () => {
        button = await createComponent('ds-button');
        
        // Should have access to BaseComponent validation methods
        expect(typeof button.validateAriaTokens).toBe('function');
        expect(typeof button.checkAriaReferences).toBe('function');
        expect(typeof button.validateARIA).toBe('function');
      });
    });
  });
}); 