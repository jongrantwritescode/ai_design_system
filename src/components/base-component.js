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
        
        // ARIA config defaults
        const ariaConfig = options.ariaConfig || {};
        this.ariaConfig = {
            requiredAriaAttributes: ariaConfig.requiredAriaAttributes || [],
            staticAriaAttributes: ariaConfig.staticAriaAttributes || {},
            dynamicAriaAttributes: ariaConfig.dynamicAriaAttributes || [],
            ...ariaConfig
        };

        // Merge ARIA attributes into observedAttributes
        const ariaObserved = [
            ...this.ariaConfig.dynamicAriaAttributes || [],
            ...this.ariaConfig.requiredAriaAttributes || []
        ];
        this.options = {
            display: options.display || 'block',
            observedAttributes: Array.from(new Set([...(options.observedAttributes || []), ...ariaObserved])),
            attributeHandlers: { ...(options.attributeHandlers || {}) },
            events: options.events || [],
            targetSelector: options.targetSelector || null,
            template: options.template,
        };
        
        // Add ARIA attribute handlers
        this.addAriaAttributeHandlers();
        this.setupShadowDOM();
        this.setupARIA();
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
        // If ARIA attribute, re-validate
        if ((this.ariaConfig.dynamicAriaAttributes || []).includes(name) || (this.ariaConfig.requiredAriaAttributes || []).includes(name)) {
            this.warnMissingARIA();
        }
    }
    
    /**
     * Called when the element is connected to the DOM.
     * Applies initial attributes and ensures styles are applied.
     */
    connectedCallback() {
        // Force a reflow to ensure styles are applied
        this.offsetHeight;
        
        // Apply initial attributes
        this.options.observedAttributes.forEach(attr => {
            this.attributeChangedCallback(attr, null, this.getAttribute(attr));
        });
        // Warn about missing/invalid ARIA
        this.warnMissingARIA();
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

    setupARIA() {
        // Apply static ARIA attributes
        if (this.targetElement && this.ariaConfig.staticAriaAttributes) {
            Object.entries(this.ariaConfig.staticAriaAttributes).forEach(([attr, value]) => {
                this.targetElement.setAttribute(attr, value);
            });
        }
    }

    addAriaAttributeHandlers() {
        if (!this.options.attributeHandlers) this.options.attributeHandlers = {};
        const allAria = [
            ...(this.ariaConfig.dynamicAriaAttributes || []),
            ...(this.ariaConfig.requiredAriaAttributes || [])
        ];
        allAria.forEach(attr => {
            if (!this.options.attributeHandlers[attr]) {
                this.options.attributeHandlers[attr] = BaseComponent.createAriaAttributeHandler(attr);
            }
        });
    }

    static createAriaAttributeHandler(attributeName) {
        return function(newValue) {
            // Ensure targetElement is available
            if (!this.targetElement) {
                this.targetElement = this.shadowRoot?.querySelector(this.options.targetSelector);
            }
            
            if (this.targetElement) {
                // Don't override static attributes
                if (this.ariaConfig.staticAriaAttributes && this.ariaConfig.staticAriaAttributes[attributeName]) {
                    return;
                }
                
                if (newValue === null || newValue === undefined) {
                    this.targetElement.removeAttribute(attributeName);
                } else {
                    this.targetElement.setAttribute(attributeName, newValue);
                }
            }
        };
    }

    static createAriaPropertyHandler(propertyName) {
        return {
            get() { return this.targetElement?.getAttribute(propertyName); },
            set(val) {
                if (this.targetElement) {
                    if (val === null || val === undefined) {
                        this.targetElement.removeAttribute(propertyName);
                    } else {
                        this.targetElement.setAttribute(propertyName, val);
                    }
                }
            }
        };
    }

    static createAriaStateHandler(stateName) {
        return function(newValue) {
            if (this.targetElement) {
                if (newValue === null || newValue === undefined) {
                    this.targetElement.removeAttribute(stateName);
                } else {
                    this.targetElement.setAttribute(stateName, newValue);
                }
            }
        };
    }

    validateAriaTokens(attributeName, value, allowedTokens) {
        if (!allowedTokens.includes(value)) {
            return `Invalid value '${value}' for ${attributeName}. Allowed: ${allowedTokens.join(', ')}`;
        }
        return null;
    }

    checkAriaReferences(attributeName, value) {
        if (!value) return null;
        const ids = value.split(/\s+/);
        for (const id of ids) {
            if (!document.getElementById(id)) {
                return `Element referenced by ${attributeName} ('${id}') does not exist in the document.`;
            }
        }
        return null;
    }

    validateARIA() {
        const errors = [];
        // Check required ARIA attributes
        (this.ariaConfig.requiredAriaAttributes || []).forEach(attr => {
            if (!this.hasAttribute(attr) && !this.targetElement?.hasAttribute(attr)) {
                errors.push(`Missing required ARIA attribute: ${attr}`);
            }
        });
        // Validate ARIA tokens (if any)
        if (this.ariaConfig.tokenValidation) {
            Object.entries(this.ariaConfig.tokenValidation).forEach(([attr, allowedTokens]) => {
                const val = this.getAttribute(attr) || this.targetElement?.getAttribute(attr);
                if (val && !allowedTokens.includes(val)) {
                    errors.push(this.validateAriaTokens(attr, val, allowedTokens));
                }
            });
        }
        // Validate ARIA references
        (this.ariaConfig.referenceAttributes || []).forEach(attr => {
            const val = this.getAttribute(attr) || this.targetElement?.getAttribute(attr);
            const refError = this.checkAriaReferences(attr, val);
            if (refError) errors.push(refError);
        });
        return errors;
    }

    warnMissingARIA() {
        const errors = this.validateARIA();
        errors.forEach(msg => {
            console.warn(`[${this.constructor.name}] ARIA validation: ${msg}`);
        });
    }

    /**
     * Defines which attributes the component observes for changes.
     * @returns {Array<string>} An array of attribute names to observe.
     */
    static get observedAttributes() {
        // This will be overridden by subclasses
        return [];
    }
}

// Export for use in other components
export default BaseComponent;