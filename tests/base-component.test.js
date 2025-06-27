import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createComponent, removeComponent } from './setup.js';
import BaseComponent from '../src/components/base-component.js';

describe('BaseComponent Tests', () => {
  let component;

  afterEach(() => {
    if (component) {
      removeComponent(component);
    }
  });

  describe('Basic Functionality', () => {
    it('should create a component with shadow root', async () => {
      class TestComponent extends BaseComponent {
        constructor() {
          super({
            template: '<div id="target">Test</div>',
            targetSelector: '#target'
          });
        }
      }
      
      if (!customElements.get('test-component-basic')) {
        customElements.define('test-component-basic', TestComponent);
      }
      
      component = await createComponent('test-component-basic');
      expect(component.shadowRoot).toBeDefined();
    });

    it('should have target element in shadow root', async () => {
      class TestComponent extends BaseComponent {
        constructor() {
          super({
            template: '<div id="target">Test</div>',
            targetSelector: '#target'
          });
        }
      }
      
      if (!customElements.get('test-component-target')) {
        customElements.define('test-component-target', TestComponent);
      }
      
      component = await createComponent('test-component-target');
      expect(component.shadowRoot.querySelector('#target')).toBeDefined();
    });

    it('should apply custom display style', async () => {
      class TestComponent extends BaseComponent {
        constructor() {
          super({
            template: '<div>Test</div>',
            display: 'inline-block'
          });

        }
      }
      
      if (!customElements.get('test-component-display')) {
        customElements.define('test-component-display', TestComponent);
      }
      
      component = await createComponent('test-component-display');
      const computedStyle = getComputedStyle(component);
      console.log(computedStyle)
      expect(computedStyle.display).toBe('inline-block');
    });

    it('should handle observed attributes', async () => {
      class TestComponent extends BaseComponent {
        constructor() {
          super({
            template: '<div id="target">Test</div>',
            targetSelector: '#target',
            observedAttributes: ['data-test'],
            attributeHandlers: {
              'data-test': (value) => {
                this.targetElement.setAttribute('data-handled', value);
              }
            }
          });
        }
      }
      
      if (!customElements.get('test-component-attributes')) {
        customElements.define('test-component-attributes', TestComponent);
      }
      
      component = await createComponent('test-component-attributes', { 'data-test': 'value' });
      const targetElement = component.shadowRoot.querySelector('#target');
      expect(targetElement).toHaveAttribute('data-handled', 'value');
    });

    it('should re-dispatch click events', async () => {
      class TestComponent extends BaseComponent {
        constructor() {
          super({
            template: '<button id="target">Click me</button>',
            targetSelector: '#target',
            events: ['click']
          });
        }
      }
      
      if (!customElements.get('test-component-events')) {
        customElements.define('test-component-events', TestComponent);
      }
      
      component = await createComponent('test-component-events');
      const clickSpy = vi.fn();
      component.addEventListener('click', clickSpy);
      
      const button = component.shadowRoot.querySelector('#target');
      button.click();
      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('ARIA', () => {
    describe('Static ARIA Attributes', () => {
      it('should apply static role attribute', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                staticAriaAttributes: { role: 'test' }
              }
            });
          }
        }
        
        if (!customElements.get('test-component-static-role')) {
          customElements.define('test-component-static-role', TestComponent);
        }
        
        component = await createComponent('test-component-static-role');
        const targetElement = component.shadowRoot.querySelector('#target');
        expect(targetElement).toHaveAttribute('role', 'test');
      });

      it('should apply static aria-label attribute', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                staticAriaAttributes: { 'aria-label': 'Static Label' }
              }
            });
          }
        }
        
        if (!customElements.get('test-component-static-label')) {
          customElements.define('test-component-static-label', TestComponent);
        }
        
        component = await createComponent('test-component-static-label');
        const targetElement = component.shadowRoot.querySelector('#target');
        expect(targetElement).toHaveAttribute('aria-label', 'Static Label');
      });

      it('should not allow static role to be overridden', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                staticAriaAttributes: { role: 'test' },
                dynamicAriaAttributes: ['role']
              }
            });
          }
        }
        
        if (!customElements.get('test-component-override')) {
          customElements.define('test-component-override', TestComponent);
        }
        
        component = await createComponent('test-component-override', { 'role': 'different' });
        const targetElement = component.shadowRoot.querySelector('#target');
        expect(targetElement).toHaveAttribute('role', 'test');
      });
    });

    describe('Dynamic ARIA Attributes', () => {
      it('should apply aria-label via HTML attribute', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                dynamicAriaAttributes: ['aria-label']
              }
            });
          }
        }
        
        if (!customElements.get('test-component-dynamic-label')) {
          customElements.define('test-component-dynamic-label', TestComponent);
        }
        
        component = await createComponent('test-component-dynamic-label', {
          'aria-label': 'Test Component'
        });
        const targetElement = component.shadowRoot.querySelector('#target');
        expect(targetElement).toHaveAttribute('aria-label', 'Test Component');
      });

      it('should apply aria-describedby via HTML attribute', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                dynamicAriaAttributes: ['aria-describedby']
              }
            });
          }
        }
        
        if (!customElements.get('test-component-dynamic-describedby')) {
          customElements.define('test-component-dynamic-describedby', TestComponent);
        }
        
        component = await createComponent('test-component-dynamic-describedby', {
          'aria-describedby': 'description'
        });
        const targetElement = component.shadowRoot.querySelector('#target');
        expect(targetElement).toHaveAttribute('aria-describedby', 'description');
      });

      it('should apply aria-pressed via HTML attribute', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                dynamicAriaAttributes: ['aria-pressed']
              }
            });
          }
        }
        
        if (!customElements.get('test-component-dynamic-pressed')) {
          customElements.define('test-component-dynamic-pressed', TestComponent);
        }
        
        component = await createComponent('test-component-dynamic-pressed', {
          'aria-pressed': 'false'
        });
        const targetElement = component.shadowRoot.querySelector('#target');
        expect(targetElement).toHaveAttribute('aria-pressed', 'false');
      });

      it('should update aria-label when attribute changes', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                dynamicAriaAttributes: ['aria-label']
              }
            });
          }
        }
        
        if (!customElements.get('test-component-update')) {
          customElements.define('test-component-update', TestComponent);
        }
        
        component = await createComponent('test-component-update');
        const targetElement = component.shadowRoot.querySelector('#target');
        
        component.setAttribute('aria-label', 'Updated Label');
        expect(targetElement).toHaveAttribute('aria-label', 'Updated Label');
      });

      it('should remove aria-label when attribute is removed', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                dynamicAriaAttributes: ['aria-label']
              }
            });
          }
        }
        
        if (!customElements.get('test-component-remove')) {
          customElements.define('test-component-remove', TestComponent);
        }
        
        component = await createComponent('test-component-remove', { 'aria-label': 'Test' });
        const targetElement = component.shadowRoot.querySelector('#target');
        
        component.removeAttribute('aria-label');
        expect(targetElement).not.toHaveAttribute('aria-label');
      });
    });

    describe('ARIA Validation System', () => {
      it('should warn for missing required aria-label', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                requiredAriaAttributes: ['aria-label']
              }
            });
          }
        }
        
        if (!customElements.get('test-component-required')) {
          customElements.define('test-component-required', TestComponent);
        }
        
        component = await createComponent('test-component-required');
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('Missing required ARIA attribute: aria-label')
        );
      });

      it('should warn for invalid aria-haspopup token', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                dynamicAriaAttributes: ['aria-haspopup'],
                tokenValidation: {
                  'aria-haspopup': ['false', 'true', 'menu', 'listbox']
                }
              }
            });
          }
        }
        
        if (!customElements.get('test-component-tokens')) {
          customElements.define('test-component-tokens', TestComponent);
        }
        
        component = await createComponent('test-component-tokens', { 'aria-haspopup': 'invalid-value' });
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('Invalid value')
        );
      });

      it('should warn for non-existent ID reference', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                dynamicAriaAttributes: ['aria-describedby'],
                referenceAttributes: ['aria-describedby']
              }
            });
          }
        }
        
        if (!customElements.get('test-component-references')) {
          customElements.define('test-component-references', TestComponent);
        }
        
        component = await createComponent('test-component-references', { 'aria-describedby': 'non-existent-id' });
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('does not exist in the document')
        );
      });

      it('should include component name in warning message', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                dynamicAriaAttributes: ['aria-haspopup'],
                tokenValidation: {
                  'aria-haspopup': ['false', 'true', 'menu']
                }
              }
            });
          }
        }
        
        if (!customElements.get('test-component-context')) {
          customElements.define('test-component-context', TestComponent);
        }
        
        component = await createComponent('test-component-context', { 'aria-haspopup': 'invalid' });
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('[TestComponent] ARIA validation:')
        );
      });

      it('should validate token values when attributes change', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                dynamicAriaAttributes: ['aria-haspopup'],
                tokenValidation: {
                  'aria-haspopup': ['false', 'true', 'menu']
                }
              }
            });
          }
        }
        
        if (!customElements.get('test-component-change-validation')) {
          customElements.define('test-component-change-validation', TestComponent);
        }
        
        component = await createComponent('test-component-change-validation', { 'aria-haspopup': 'true' });
        
        // Clear previous warnings
        vi.clearAllMocks();
        
        // Change to invalid value
        component.setAttribute('aria-haspopup', 'invalid');
        
        // Should warn about invalid token
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('Invalid value')
        );
      });

      it('should validate references when attributes change', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                dynamicAriaAttributes: ['aria-describedby'],
                referenceAttributes: ['aria-describedby']
              }
            });
          }
        }
        
        if (!customElements.get('test-component-change-refs')) {
          customElements.define('test-component-change-refs', TestComponent);
        }
        
        // Add a valid reference element
        const validElement = document.createElement('div');
        validElement.id = 'valid-ref';
        document.body.appendChild(validElement);
        
        component = await createComponent('test-component-change-refs', { 'aria-describedby': 'valid-ref' });
        
        // Clear previous warnings
        vi.clearAllMocks();
        
        // Change to invalid reference
        component.setAttribute('aria-describedby', 'invalid-ref');
        
        // Should warn about invalid reference
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('does not exist in the document')
        );
        
        // Clean up
        document.body.removeChild(validElement);
      });

      it('should not validate static attributes when they change', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                staticAriaAttributes: { 'aria-label': 'Static Label' },
                dynamicAriaAttributes: ['aria-label']
              }
            });
          }
        }
        
        if (!customElements.get('test-component-static-change')) {
          customElements.define('test-component-static-change', TestComponent);
        }
        
        component = await createComponent('test-component-static-change');
        
        // Clear previous warnings
        vi.clearAllMocks();
        
        // Try to change static attribute
        component.setAttribute('aria-label', 'New Label');
        
        // Should warn because static attributes are protected
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining("Cannot override static ARIA attribute 'aria-label' with value 'New Label'. Static value 'Static Label' will be preserved.")
        );
        
        // The static value should remain
        const targetElement = component.shadowRoot.querySelector('#target');
        expect(targetElement).toHaveAttribute('aria-label', 'Static Label');
      });
    });

    describe('ARIA Helper Methods', () => {
      it('should return null for valid ARIA token', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target'
            });
          }
        }
        
        if (!customElements.get('test-component-helpers')) {
          customElements.define('test-component-helpers', TestComponent);
        }
        
        component = await createComponent('test-component-helpers');
        
        const allowedTokens = ['true', 'false', 'menu'];
        const validResult = component.validateAriaTokens('aria-expanded', 'true', allowedTokens);
        expect(validResult).toBeNull();
      });

      it('should return error message for invalid ARIA token', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target'
            });
          }
        }
        
        if (!customElements.get('test-component-helpers-invalid')) {
          customElements.define('test-component-helpers-invalid', TestComponent);
        }
        
        component = await createComponent('test-component-helpers-invalid');
        
        const allowedTokens = ['true', 'false', 'menu'];
        const invalidResult = component.validateAriaTokens('aria-expanded', 'invalid', allowedTokens);
        expect(invalidResult).toContain('Invalid value');
      });

      it('should return null for valid ARIA reference', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target'
            });
          }
        }
        
        if (!customElements.get('test-component-refs-valid')) {
          customElements.define('test-component-refs-valid', TestComponent);
        }
        
        component = await createComponent('test-component-refs-valid');
        
        // Add a test element to the document
        const testElement = document.createElement('div');
        testElement.id = 'test-ref';
        document.body.appendChild(testElement);
        
        const validResult = component.checkAriaReferences('aria-describedby', 'test-ref');
        expect(validResult).toBeNull();
        
        // Clean up
        document.body.removeChild(testElement);
      });

      it('should return error message for invalid ARIA reference', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target'
            });
          }
        }
        
        if (!customElements.get('test-component-refs-invalid')) {
          customElements.define('test-component-refs-invalid', TestComponent);
        }
        
        component = await createComponent('test-component-refs-invalid');
        
        const invalidResult = component.checkAriaReferences('aria-describedby', 'non-existent');
        expect(invalidResult).toContain('does not exist in the document');
      });
    });
  });
}); 