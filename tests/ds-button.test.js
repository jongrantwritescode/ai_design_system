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
    it('should create a button with shadow root', async () => {
      button = await createComponent('ds-button');
      expect(button.shadowRoot).toBeDefined();
    });

    it('should have internal button element', async () => {
      button = await createComponent('ds-button');
      expect(button.shadowRoot.querySelector('button')).toBeDefined();
    });

    it('should have wrapper div', async () => {
      button = await createComponent('ds-button');
      expect(button.shadowRoot.querySelector('.wrapper')).toBeDefined();
    });

    it('should set button type correctly', async () => {
      button = await createComponent('ds-button', { 'type': 'submit' });
      const internalButton = button.shadowRoot.querySelector('button');
      expect(internalButton.type).toBe('submit');
    });

    it('should set type property correctly', async () => {
      button = await createComponent('ds-button', { 'type': 'submit' });
      expect(button.type).toBe('submit');
    });

    it('should handle disabled state', async () => {
      button = await createComponent('ds-button', { 'disabled': '' });
      const internalButton = button.shadowRoot.querySelector('button');
      expect(internalButton.disabled).toBe(true);
    });

    it('should set disabled property correctly', async () => {
      button = await createComponent('ds-button', { 'disabled': '' });
      expect(button.disabled).toBe(true);
    });

    it('should set name attribute correctly', async () => {
      button = await createComponent('ds-button', { 'name': 'test-button' });
      const internalButton = button.shadowRoot.querySelector('button');
      expect(internalButton.name).toBe('test-button');
    });

    it('should set name property correctly', async () => {
      button = await createComponent('ds-button', { 'name': 'test-button' });
      expect(button.name).toBe('test-button');
    });

    it('should set value attribute correctly', async () => {
      button = await createComponent('ds-button', { 'value': 'test-value' });
      const internalButton = button.shadowRoot.querySelector('button');
      expect(internalButton.value).toBe('test-value');
    });

    it('should set value property correctly', async () => {
      button = await createComponent('ds-button', { 'value': 'test-value' });
      expect(button.value).toBe('test-value');
    });

    it('should apply primary variant class', async () => {
      button = await createComponent('ds-button', { 'variant': 'primary' });
      const internalButton = button.shadowRoot.querySelector('button');
      expect(internalButton.classList.contains('primary')).toBe(true);
    });

    it('should remove old variant when changing to secondary', async () => {
      button = await createComponent('ds-button', { 'variant': 'primary' });
      button.setAttribute('variant', 'secondary');
      const internalButton = button.shadowRoot.querySelector('button');
      expect(internalButton.classList.contains('primary')).toBe(false);
    });

    it('should add new variant when changing to secondary', async () => {
      button = await createComponent('ds-button', { 'variant': 'primary' });
      button.setAttribute('variant', 'secondary');
      const internalButton = button.shadowRoot.querySelector('button');
      expect(internalButton.classList.contains('secondary')).toBe(true);
    });

    it('should handle type property changes', async () => {
      button = await createComponent('ds-button');
      button.type = 'reset';
      const internalButton = button.shadowRoot.querySelector('button');
      expect(internalButton.type).toBe('reset');
    });

    it('should handle disabled property changes', async () => {
      button = await createComponent('ds-button');
      button.disabled = true;
      const internalButton = button.shadowRoot.querySelector('button');
      expect(internalButton.disabled).toBe(true);
    });

    it('should handle name property changes', async () => {
      button = await createComponent('ds-button');
      button.name = 'new-name';
      const internalButton = button.shadowRoot.querySelector('button');
      expect(internalButton.name).toBe('new-name');
    });

    it('should handle value property changes', async () => {
      button = await createComponent('ds-button');
      button.value = 'new-value';
      const internalButton = button.shadowRoot.querySelector('button');
      expect(internalButton.value).toBe('new-value');
    });

    it('should handle variant property changes', async () => {
      button = await createComponent('ds-button');
      button.variant = 'danger';
      const internalButton = button.shadowRoot.querySelector('button');
      expect(internalButton.classList.contains('danger')).toBe(true);
    });

    it('should re-dispatch click events', async () => {
      button = await createComponent('ds-button');
      const clickSpy = vi.fn();
      button.addEventListener('click', clickSpy);
      const internalButton = button.shadowRoot.querySelector('button');
      internalButton.click();
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should re-dispatch focus events', async () => {
      button = await createComponent('ds-button');
      const focusSpy = vi.fn();
      button.addEventListener('focus', focusSpy);
      const internalButton = button.shadowRoot.querySelector('button');
      internalButton.focus();
      expect(focusSpy).toHaveBeenCalled();
    });

    it('should re-dispatch blur events', async () => {
      button = await createComponent('ds-button');
      const blurSpy = vi.fn();
      button.addEventListener('blur', blurSpy);
      const internalButton = button.shadowRoot.querySelector('button');
      
      // Focus the button first, then blur it
      internalButton.focus();
      internalButton.blur();
      
      expect(blurSpy).toHaveBeenCalled();
    });
  });

  describe('ARIA', () => {
    describe('Static and Dynamic ARIA Attributes', () => {
      it('should apply static role of button', async () => {
        button = await createComponent('ds-button', { 'role': 'link' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('role', 'button');
      });

      it('should apply aria-label attribute', async () => {
        button = await createComponent('ds-button', { 'aria-label': 'Test Button' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-label', 'Test Button');
      });

      it('should apply aria-describedby attribute', async () => {
        button = await createComponent('ds-button', { 'aria-describedby': 'description' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-describedby', 'description');
      });

      it('should apply aria-pressed attribute', async () => {
        button = await createComponent('ds-button', { 'aria-pressed': 'false' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-pressed', 'false');
      });

      it('should apply aria-label via property accessor', async () => {
        button = await createComponent('ds-button', { 'aria-label': 'Property Set Button' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-label', 'Property Set Button');
      });

      it('should get aria-label via property accessor', async () => {
        button = await createComponent('ds-button', { 'aria-label': 'Property Set Button' });
        expect(button.ariaLabel).toBe('Property Set Button');
      });

      it('should apply aria-pressed via property accessor', async () => {
        button = await createComponent('ds-button', { 'aria-pressed': 'true' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-pressed', 'true');
      });

      it('should get aria-pressed via property accessor', async () => {
        button = await createComponent('ds-button', { 'aria-pressed': 'true' });
        expect(button.ariaPressed).toBe('true');
      });

      it('should apply aria-expanded via property accessor', async () => {
        button = await createComponent('ds-button', { 'aria-expanded': 'true' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-expanded', 'true');
      });

      it('should get aria-expanded via property accessor', async () => {
        button = await createComponent('ds-button', { 'aria-expanded': 'true' });
        expect(button.ariaExpanded).toBe('true');
      });

      it('should apply aria-haspopup via property accessor', async () => {
        button = await createComponent('ds-button', { 'aria-haspopup': 'menu' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-haspopup', 'menu');
      });

      it('should get aria-haspopup via property accessor', async () => {
        button = await createComponent('ds-button', { 'aria-haspopup': 'menu' });
        expect(button.ariaHasPopup).toBe('menu');
      });

      it('should apply aria-describedby via property accessor', async () => {
        button = await createComponent('ds-button', { 'aria-describedby': 'help-text' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-describedby', 'help-text');
      });

      it('should get aria-describedby via property accessor', async () => {
        button = await createComponent('ds-button', { 'aria-describedby': 'help-text' });
        expect(button.ariaDescribedBy).toBe('help-text');
      });

      it('should update aria-label when attribute changes', async () => {
        button = await createComponent('ds-button');
        button.setAttribute('aria-label', 'Updated Label');
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-label', 'Updated Label');
      });

      it('should remove aria-label when attribute is removed', async () => {
        button = await createComponent('ds-button', { 'aria-label': 'Test' });
        button.removeAttribute('aria-label');
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).not.toHaveAttribute('aria-label');
      });

      it('should handle null aria-label via property accessor', async () => {
        button = await createComponent('ds-button', { 'aria-label': 'Test' });
        button.ariaLabel = null;
        expect(button.ariaLabel).toBeNull();
      });
    });

    describe('Accessible Name Validation', () => {
      it('should warn when no accessible name is provided', async () => {
        button = await createComponent('ds-button');
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('[DsButton] ARIA validation: Button has no accessible name')
        );
      });

      it('should not warn when text content is provided', async () => {
        const element = document.createElement('ds-button');
        element.textContent = 'Button Text';
        document.body.appendChild(element);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(console.warn).not.toHaveBeenCalledWith(
          expect.stringContaining('[DsButton] ARIA validation: Button has no accessible name')
        );
        button = element;
      });

      it('should not warn when aria-label is provided', async () => {
        button = await createComponent('ds-button', { 'aria-label': 'Accessible Button' });
        expect(console.warn).not.toHaveBeenCalledWith(
          expect.stringContaining('[DsButton] ARIA validation: Button has no accessible name')
        );
      });

      it('should not warn when aria-labelledby is provided', async () => {
        const labelElement = document.createElement('div');
        labelElement.id = 'button-label';
        labelElement.textContent = 'Labelled By Text';
        document.body.appendChild(labelElement);
        
        button = await createComponent('ds-button', {
          'aria-labelledby': 'button-label'
        });
        expect(console.warn).not.toHaveBeenCalledWith(
          expect.stringContaining('[DsButton] ARIA validation: Button has no accessible name')
        );
        
        document.body.removeChild(labelElement);
      });
    });

    describe('Token Validation', () => {
      it('should accept false as aria-haspopup token', async () => {
        button = await createComponent('ds-button', { 'aria-haspopup': 'false' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-haspopup', 'false');
      });

      it('should accept true as aria-haspopup token', async () => {
        button = await createComponent('ds-button', { 'aria-haspopup': 'true' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-haspopup', 'true');
      });

      it('should accept menu as aria-haspopup token', async () => {
        button = await createComponent('ds-button', { 'aria-haspopup': 'menu' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-haspopup', 'menu');
      });

      it('should accept listbox as aria-haspopup token', async () => {
        button = await createComponent('ds-button', { 'aria-haspopup': 'listbox' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-haspopup', 'listbox');
      });

      it('should accept tree as aria-haspopup token', async () => {
        button = await createComponent('ds-button', { 'aria-haspopup': 'tree' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-haspopup', 'tree');
      });

      it('should accept grid as aria-haspopup token', async () => {
        button = await createComponent('ds-button', { 'aria-haspopup': 'grid' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-haspopup', 'grid');
      });

      it('should accept dialog as aria-haspopup token', async () => {
        button = await createComponent('ds-button', { 'aria-haspopup': 'dialog' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-haspopup', 'dialog');
      });

      it('should warn for invalid aria-haspopup token', async () => {
        button = await createComponent('ds-button', { 'aria-haspopup': 'invalid' });
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('Invalid value')
        );
      });

      it('should accept false as aria-pressed token', async () => {
        button = await createComponent('ds-button', { 'aria-pressed': 'false' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-pressed', 'false');
      });

      it('should accept true as aria-pressed token', async () => {
        button = await createComponent('ds-button', { 'aria-pressed': 'true' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-pressed', 'true');
      });

      it('should accept mixed as aria-pressed token', async () => {
        button = await createComponent('ds-button', { 'aria-pressed': 'mixed' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-pressed', 'mixed');
      });

      it('should accept undefined as aria-pressed token', async () => {
        button = await createComponent('ds-button', { 'aria-pressed': 'undefined' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-pressed', 'undefined');
      });

      it('should warn for invalid aria-pressed token', async () => {
        button = await createComponent('ds-button', { 'aria-pressed': 'invalid' });
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('Invalid aria-pressed value')
        );
      });

      it('should accept false as aria-expanded token', async () => {
        button = await createComponent('ds-button', { 'aria-expanded': 'false' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-expanded', 'false');
      });

      it('should accept true as aria-expanded token', async () => {
        button = await createComponent('ds-button', { 'aria-expanded': 'true' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-expanded', 'true');
      });

      it('should accept undefined as aria-expanded token', async () => {
        button = await createComponent('ds-button', { 'aria-expanded': 'undefined' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-expanded', 'undefined');
      });

      it('should validate ARIA reference attributes', async () => {
        button = await createComponent('ds-button', { 'aria-describedby': 'non-existent-id' });
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('does not exist in the document')
        );
      });
    });

    describe('BaseComponent Integration', () => {
      it('should apply aria-label from BaseComponent', async () => {
        button = await createComponent('ds-button', { 'aria-label': 'Test Button' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-label', 'Test Button');
      });

      it('should apply aria-describedby from BaseComponent', async () => {
        button = await createComponent('ds-button', { 'aria-describedby': 'button-help' });
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('aria-describedby', 'button-help');
      });

      it('should apply role from BaseComponent', async () => {
        button = await createComponent('ds-button');
        const internalButton = button.shadowRoot.querySelector('button');
        expect(internalButton).toHaveAttribute('role', 'button');
      });

      it('should have validateAriaTokens method', async () => {
        button = await createComponent('ds-button');
        expect(typeof button.validateAriaTokens).toBe('function');
      });

      it('should have checkAriaReferences method', async () => {
        button = await createComponent('ds-button');
        expect(typeof button.checkAriaReferences).toBe('function');
      });

      it('should have validateARIA method', async () => {
        button = await createComponent('ds-button');
        expect(typeof button.validateARIA).toBe('function');
      });
    });
  });
}); 