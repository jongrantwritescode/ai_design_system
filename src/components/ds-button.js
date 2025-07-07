/**
 * @file ds-button.js
 * @summary A custom Web Component that wraps a native `<button>` element.
 * @description
 * The `ds-button` component provides a styled and functional button element.
 * It supports various button types and variants while maintaining accessibility
 * and proper event handling.
 *
 * @element ds-button
 * @extends BaseComponent
 *
 * @attr {string} [type="button"] - The type of button (e.g., `button`, `submit`, `reset`).
 * @attr {boolean} disabled - If present, the button cannot be interacted with.
 * @attr {string} name - The name of the button, used when submitting form data.
 * @attr {string} value - The value of the button, used when submitting form data.
 * @attr {string} [variant] - The visual variant of the button (e.g., `primary`, `secondary`, `danger`).
 *
 * @property {string} type - Gets or sets the type of the button.
 * @property {boolean} disabled - Gets or sets the disabled state of the button.
 * @property {string} name - Gets or sets the name of the button.
 * @property {string} value - Gets or sets the value of the button.
 * @property {string} variant - Gets or sets the variant of the button.
 *
 * @fires click - Fired when the button is clicked.
 * @fires focus - Fired when the button receives focus.
 * @fires blur - Fired when the button loses focus.
 *
 * @example
 * <!-- Basic button -->
 * <ds-button>Click me</ds-button>
 *
 * @example
 * <!-- Submit button with variant -->
 * <ds-button type="submit" variant="primary">Submit Form</ds-button>
 *
 * @example
 * <!-- Disabled button -->
 * <ds-button disabled variant="secondary">Disabled Button</ds-button>
 */
import BaseComponent from './base-component.js';

class DsButton extends BaseComponent {
    constructor() {
        // ARIA config for ds-button
        const ariaConfig = {
            staticAriaAttributes: { role: 'button' },
            dynamicAriaAttributes: [
                'aria-label',
                'aria-describedby',
                'aria-pressed',
                'aria-expanded',
                'aria-haspopup'
            ],
            requiredAriaAttributes: [], // none required, but warn about missing labels
            referenceAttributes: ['aria-describedby'],
            tokenValidation: {
                'aria-haspopup': ['false', 'true', 'menu', 'listbox', 'tree', 'grid', 'dialog'],
                'aria-pressed': ['false', 'true', 'mixed', 'undefined'],
                'aria-expanded': ['false', 'true', 'undefined']
            }
        };
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                @import url('/src/styles/styles.css');
                :host { display: inline-block; }
                .wrapper { width: 100%; }
            </style>
            <div class="wrapper">
                <button part="button" type="button">
                    <slot></slot>
                </button>
            </div>
        `;
        super({
            template: template.innerHTML,
            targetSelector: 'button',
            ariaConfig,
            events: ['click', 'focus', 'blur'],
            observedAttributes: ['type', 'disabled', 'name', 'value', 'variant']
        });
        this.button = this.shadowRoot.querySelector('button');
    }
    
    /**
     * Defines which attributes the component observes for changes.
     * @returns {Array<string>} An array of attribute names to observe.
     */
    static get observedAttributes() {
        return ['type', 'disabled', 'name', 'value', 'variant', 'aria-label', 'aria-describedby', 'aria-pressed', 'aria-expanded', 'aria-haspopup'];
    }
    
    /**
     * Called when one of the component's observed attributes is added, removed, or changed.
     * @param {string} name - The name of the attribute that changed.
     * @param {string|null} oldValue - The attribute's old value.
     * @param {string|null} newValue - The attribute's new value.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        // Call parent method first
        super.attributeChangedCallback(name, oldValue, newValue);
        
        if (oldValue === newValue) return; // No change
        
        switch (name) {
            case 'type':
                this.button.type = newValue || 'button';
                break;
                
            case 'disabled':
                if (this.hasAttribute('disabled')) {
                    this.button.disabled = true;
                } else {
                    this.button.disabled = false;
                }
                break;
                
            case 'name':
                this.button.name = newValue || '';
                break;
                
            case 'value':
                this.button.value = newValue || '';
                break;
                
            case 'variant':
                // Remove existing variant classes
                this.button.classList.remove('primary', 'secondary', 'danger');
                // Add new variant class if specified
                if (newValue) {
                    this.button.classList.add(newValue);
                }
                break;
        }
    }
    
    /**
     * Gets the type of the button.
     * @returns {string} The button's type.
     */
    get type() {
        return this.button.type;
    }
    
    /**
     * Sets the type of the button.
     * @param {string} val - The new type to set.
     */
    set type(val) {
        this.button.type = val;
    }
    
    /**
     * Gets the disabled state of the button.
     * @returns {boolean} Whether the button is disabled.
     */
    get disabled() {
        return this.button.disabled;
    }
    
    /**
     * Sets the disabled state of the button.
     * @param {boolean} val - Whether to disable the button.
     */
    set disabled(val) {
        this.button.disabled = val;
    }
    
    /**
     * Gets the name of the button.
     * @returns {string} The button's name.
     */
    get name() {
        return this.button.name;
    }
    
    /**
     * Sets the name of the button.
     * @param {string} val - The new name to set.
     */
    set name(val) {
        this.button.name = val;
    }
    
    /**
     * Gets the value of the button.
     * @returns {string} The button's value.
     */
    get value() {
        return this.button.value;
    }
    
    /**
     * Sets the value of the button.
     * @param {string} val - The new value to set.
     */
    set value(val) {
        this.button.value = val;
    }
    
    /**
     * Gets the variant of the button.
     * @returns {string} The button's variant.
     */
    get variant() {
        return this.getAttribute('variant');
    }
    
    /**
     * Sets the variant of the button.
     * @param {string} val - The new variant to set.
     */
    set variant(val) {
        if (val) {
            this.setAttribute('variant', val);
        } else {
            this.removeAttribute('variant');
        }
    }

    // ARIA property accessors
    get ariaLabel() { 
        const value = this.button.getAttribute('aria-label');
        return value === null ? null : value;
    }
    set ariaLabel(val) { 
        if (val === null || val === undefined) {
            this.button.removeAttribute('aria-label');
        } else {
            this.button.setAttribute('aria-label', val);
        }
    }
    get ariaDescribedBy() { 
        const value = this.button.getAttribute('aria-describedby');
        return value === null ? null : value;
    }
    set ariaDescribedBy(val) { 
        if (val === null || val === undefined) {
            this.button.removeAttribute('aria-describedby');
        } else {
            this.button.setAttribute('aria-describedby', val);
        }
    }
    get ariaPressed() { 
        const value = this.button.getAttribute('aria-pressed');
        return value === null ? null : value;
    }
    set ariaPressed(val) { 
        if (val === null || val === undefined) {
            this.button.removeAttribute('aria-pressed');
        } else {
            this.button.setAttribute('aria-pressed', val);
        }
    }
    get ariaExpanded() { 
        const value = this.button.getAttribute('aria-expanded');
        return value === null ? null : value;
    }
    set ariaExpanded(val) { 
        if (val === null || val === undefined) {
            this.button.removeAttribute('aria-expanded');
        } else {
            this.button.setAttribute('aria-expanded', val);
        }
    }
    get ariaHasPopup() { 
        const value = this.button.getAttribute('aria-haspopup');
        return value === null ? null : value;
    }
    set ariaHasPopup(val) { 
        if (val === null || val === undefined) {
            this.button.removeAttribute('aria-haspopup');
        } else {
            this.button.setAttribute('aria-haspopup', val);
        }
    }

    // Override validateARIA for button-specific checks
    validateARIA() {
        const errors = super.validateARIA ? super.validateARIA() : [];
        
        // Accessible name check - check host element's text content and ARIA attributes
        const hostTextContent = this.textContent.trim();
        const hostAriaLabel = this.getAttribute('aria-label');
        const hostAriaLabelledBy = this.getAttribute('aria-labelledby');
        const buttonAriaLabel = this.button.getAttribute('aria-label');
        const buttonAriaLabelledBy = this.button.getAttribute('aria-labelledby');
        
        const hasName = hostTextContent || hostAriaLabel || hostAriaLabelledBy || buttonAriaLabel || buttonAriaLabelledBy;
        
        if (!hasName) {
            errors.push('Button has no accessible name (text, aria-label, or aria-labelledby required)');
        }
        
        // aria-pressed state management
        if (this.button.hasAttribute('aria-pressed')) {
            const val = this.button.getAttribute('aria-pressed');
            if (!['true', 'false', 'mixed', 'undefined'].includes(val)) {
                errors.push(`Invalid aria-pressed value: ${val}`);
            }
        }
        
        // aria-expanded/controls
        if (this.button.hasAttribute('aria-expanded')) {
            // Optionally check for controlled element
            // Could add logic to check for aria-controls
        }
        
        // aria-describedby references
        if (this.button.hasAttribute('aria-describedby')) {
            const refError = this.checkAriaReferences('aria-describedby', this.button.getAttribute('aria-describedby'));
            if (refError) errors.push(refError);
        }
        
        return errors;
    }
}

// Register the custom element
customElements.define('ds-button', DsButton); 