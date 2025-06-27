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
    it('should create a component with shadow DOM', async () => {
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

    it('should re-dispatch events', async () => {
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
      it('should apply static ARIA attributes on component initialization', async () => {
        // Create a test component that extends BaseComponent with static ARIA
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                staticAriaAttributes: { role: 'test', 'aria-label': 'Static Label' }
              }
            });
          }
        }
        
        if (!customElements.get('test-component')) {
          customElements.define('test-component', TestComponent);
        }
        
        component = await createComponent('test-component');
        const targetElement = component.shadowRoot.querySelector('#target');
        
        expect(targetElement).toHaveAttribute('role', 'test');
        expect(targetElement).toHaveAttribute('aria-label', 'Static Label');
      });

      it('should not allow static attributes to be overridden by dynamic attributes', async () => {
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
        
        // Static role should still be 'test' even if we try to set it to 'different'
        expect(targetElement).toHaveAttribute('role', 'test');
      });

      it('should set default roles correctly', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                staticAriaAttributes: { role: 'button' }
              }
            });
          }
        }
        
        if (!customElements.get('test-component-role')) {
          customElements.define('test-component-role', TestComponent);
        }
        
        component = await createComponent('test-component-role');
        const targetElement = component.shadowRoot.querySelector('#target');
        
        expect(targetElement).toHaveAttribute('role', 'button');
      });
    });

    describe('Dynamic ARIA Attributes', () => {
      it('should set dynamic ARIA attributes via HTML attributes', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target',
              ariaConfig: {
                dynamicAriaAttributes: ['aria-label', 'aria-describedby', 'aria-pressed']
              }
            });
          }
        }
        
        if (!customElements.get('test-component-dynamic')) {
          customElements.define('test-component-dynamic', TestComponent);
        }
        
        component = await createComponent('test-component-dynamic', {
          'aria-label': 'Test Component',
          'aria-describedby': 'description',
          'aria-pressed': 'false'
        });
        const targetElement = component.shadowRoot.querySelector('#target');
        
        expect(targetElement).toHaveAttribute('aria-label', 'Test Component');
        expect(targetElement).toHaveAttribute('aria-describedby', 'description');
        expect(targetElement).toHaveAttribute('aria-pressed', 'false');
      });

      it('should trigger proper updates when attributes change', async () => {
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
        
        component.setAttribute('aria-label', 'Initial Label');
        expect(targetElement).toHaveAttribute('aria-label', 'Initial Label');
        
        component.setAttribute('aria-label', 'Updated Label');
        expect(targetElement).toHaveAttribute('aria-label', 'Updated Label');
      });

      it('should properly remove ARIA attributes', async () => {
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
        
        expect(targetElement).toHaveAttribute('aria-label', 'Test');
        
        component.removeAttribute('aria-label');
        expect(targetElement).not.toHaveAttribute('aria-label');
      });
    });

    describe('ARIA Validation System', () => {
      it('should call console.warn for missing required attributes', async () => {
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
        
        // Should warn about missing required aria-label
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('Missing required ARIA attribute: aria-label')
        );
      });

      it('should validate ARIA token values', async () => {
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
        
        // Should warn about invalid aria-haspopup value
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('Invalid value')
        );
      });

      it('should validate ARIA ID references', async () => {
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
        
        // Should warn about non-existent ID reference
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('does not exist in the document')
        );
      });

      it('should include helpful messaging and component context', async () => {
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
    });

    describe('ARIA Helper Methods', () => {
      it('should validate ARIA tokens correctly', async () => {
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
        const invalidResult = component.validateAriaTokens('aria-expanded', 'invalid', allowedTokens);
        
        expect(validResult).toBeNull();
        expect(invalidResult).toContain('Invalid value');
      });

      it('should check ARIA references correctly', async () => {
        class TestComponent extends BaseComponent {
          constructor() {
            super({
              template: '<div id="target">Test</div>',
              targetSelector: '#target'
            });
          }
        }
        
        if (!customElements.get('test-component-refs')) {
          customElements.define('test-component-refs', TestComponent);
        }
        
        component = await createComponent('test-component-refs');
        
        // Add a test element to the document
        const testElement = document.createElement('div');
        testElement.id = 'test-ref';
        document.body.appendChild(testElement);
        
        const validResult = component.checkAriaReferences('aria-describedby', 'test-ref');
        const invalidResult = component.checkAriaReferences('aria-describedby', 'non-existent');
        
        expect(validResult).toBeNull();
        expect(invalidResult).toContain('does not exist in the document');
        
        // Clean up
        document.body.removeChild(testElement);
      });
    });
  });
}); 