/**
 * @file base-component.js
 * @summary Base class for design system Web Components.
 * @description
 * Provides common functionality for all design system components including
 * shadow DOM setup, event handling, and attribute management.
 *
 * @abstract
 */
class BaseComponent extends HTMLElement {
    /**
     * Creates a new base component.
     * @param {Object} options - Configuration options
     * @param {string} options.template - HTML template string
     * @param {string} options.display - CSS display value for :host
     * @param {Array<string>} options.observedAttributes - Attributes to observe
     * @param {Object} options.attributeHandlers - Attribute change handlers
     * @param {Array<string>} options.events - Events to re-dispatch
     * @param {string} options.targetSelector - CSS selector for the target element
     */
    constructor(options = {}) {
        super();
        
        this.options = {
            display: 'block',
            observedAttributes: [],
            attributeHandlers: {},
            events: [],
            targetSelector: null,
            ...options
        };
        
        this.setupShadowDOM();
        this.setupEventListeners();
    }
    
    /**
     * Sets up the shadow DOM with the provided template.
     */
    setupShadowDOM() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                @import url('/src/design_system/styles.css');
                
                :host {
                    display: ${this.options.display};
                }
            </style>
            ${this.options.template || '<slot></slot>'}
        `;
        
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to target element if selector is provided
        if (this.options.targetSelector) {
            this.targetElement = shadowRoot.querySelector(this.options.targetSelector);
        }
    }
    
    /**
     * Sets up event listeners to re-dispatch events from the host element.
     */
    setupEventListeners() {
        if (!this.options.events.length || !this.targetElement) return;
        
        this.options.events.forEach(eventType => {
            this.targetElement.addEventListener(eventType, (event) => {
                const newEvent = new Event(eventType, {
                    bubbles: true,
                    composed: true,
                    cancelable: true
                });
                
                // Copy relevant properties for form events
                if (eventType === 'input' || eventType === 'change') {
                    newEvent.target = this;
                    newEvent.currentTarget = this;
                }
                
                this.dispatchEvent(newEvent);
            });
        });
    }
    
    /**
     * Defines which attributes the component observes for changes.
     * @returns {Array<string>} An array of attribute names to observe.
     */
    static get observedAttributes() {
        return this.prototype.options?.observedAttributes || [];
    }
    
    /**
     * Called when one of the component's observed attributes is added, removed, or changed.
     * @param {string} name - The name of the attribute that changed.
     * @param {string|null} oldValue - The attribute's old value.
     * @param {string|null} newValue - The attribute's new value.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return; // No change
        
        const handler = this.options.attributeHandlers[name];
        if (handler) {
            handler.call(this, newValue);
        }
    }
    
    /**
     * Called when the element is connected to the DOM.
     * Applies initial attributes.
     */
    connectedCallback() {
        // Apply initial attributes
        this.options.observedAttributes.forEach(attr => {
            this.attributeChangedCallback(attr, null, this.getAttribute(attr));
        });
    }
    
    /**
     * Creates a standard attribute handler for boolean attributes.
     * @param {string} propertyName - The property name to set
     * @param {string} attributeName - The attribute name to check
     * @returns {Function} The attribute handler function
     */
    static createBooleanHandler(propertyName, attributeName) {
        return function(newValue) {
            if (this.targetElement) {
                this.targetElement[propertyName] = this.hasAttribute(attributeName);
            }
        };
    }
    
    /**
     * Creates a standard attribute handler for string attributes.
     * @param {string} propertyName - The property name to set
     * @param {string} defaultValue - Default value if attribute is null
     * @returns {Function} The attribute handler function
     */
    static createStringHandler(propertyName, defaultValue = '') {
        return function(newValue) {
            if (this.targetElement) {
                this.targetElement[propertyName] = newValue || defaultValue;
            }
        };
    }
    
    /**
     * Creates a standard attribute handler for setAttribute.
     * @param {string} attributeName - The attribute name to set
     * @returns {Function} The attribute handler function
     */
    static createSetAttributeHandler(attributeName) {
        return function(newValue) {
            if (this.targetElement) {
                if (newValue === null) {
                    this.targetElement.removeAttribute(attributeName);
                } else {
                    this.targetElement.setAttribute(attributeName, newValue);
                }
            }
        };
    }
    
    /**
     * Creates a standard getter/setter pair for a property.
     * @param {string} propertyName - The property name
     * @returns {Object} Object with get and set functions
     */
    createPropertyAccessor(propertyName) {
        return {
            get: () => this.targetElement?.[propertyName],
            set: (val) => {
                if (this.targetElement) {
                    this.targetElement[propertyName] = val;
                }
            }
        };
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseComponent;
} 