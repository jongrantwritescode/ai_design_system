/**
 * @file ds-text-input.js
 * @summary A custom Web Component that wraps a native `<input>` element for text-based inputs.
 * @description
 * The `ds-text-input` component provides a styled and functional text input field.
 * It mirrors common `<input>` attributes and properties, making it easy to use
 * within forms while leveraging the design system's styling.
 *
 * @element ds-text-input
 * @extends BaseComponent
 *
 * @attr {string} [type="text"] - The type of input (e.g., `text`, `email`, `password`, `number`, `tel`, `url`, `search`).
 * @attr {string} value - The current value of the input.
 * @attr {string} placeholder - A hint to the user of what can be entered in the input.
 * @attr {boolean} disabled - If present, the input cannot be interacted with.
 * @attr {boolean} readonly - If present, the input cannot be modified by the user.
 * @attr {boolean} required - If present, the input must have a value before form submission.
 * @attr {string} name - The name of the input, used when submitting form data.
 * @attr {string} id - A unique identifier for the input, useful for associating with labels.
 * @attr {string} [aria-label] - Defines a string value that labels the current element for accessibility purposes.
 *
 * @property {string} value - Gets or sets the current value of the input.
 * @property {string} type - Gets or sets the type of the input.
 * @property {boolean} disabled - Gets or sets the disabled state of the input.
 * @property {boolean} readonly - Gets or sets the readonly state of the input.
 * @property {boolean} required - Gets or sets the required state of the input.
 *
 * @fires input - Fired when the value of the input changes.
 * @fires change - Fired when the value of the input is committed.
 * @fires focus - Fired when the input receives focus.
 * @fires blur - Fired when the input loses focus.
 *
 * @example
 * <!-- Basic text input -->
 * <ds-text-input placeholder="Enter your name" id="username-input"></ds-text-input>
 * <ds-label for="username-input">Username</ds-label>
 *
 * @example
 * <!-- Password input that is required -->
 * <ds-text-input type="password" required placeholder="Your password"></ds-text-input>
 *
 * @example
 * <!-- Disabled email input with a pre-filled value -->
 * <ds-text-input type="email" value="example@domain.com" disabled></ds-text-input>
 */
import BaseComponent from './base-component.js';

class DsTextInput extends BaseComponent {
    constructor() {
        // ARIA config for ds-text-input
        const ariaConfig = {
            staticAriaAttributes: {},
            dynamicAriaAttributes: [
                'aria-label',
                'aria-describedby',
                'aria-required',
                'aria-invalid',
                'aria-autocomplete',
                'aria-controls',
                'aria-activedescendant'
            ],
            requiredAriaAttributes: [],
            referenceAttributes: ['aria-describedby', 'aria-controls', 'aria-activedescendant'],
            tokenValidation: {
                'aria-autocomplete': ['inline', 'list', 'both', 'none'],
                'aria-invalid': ['grammar', 'false', 'spelling', 'true']
            }
        };
        
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                @import url('/src/styles/styles.css');
                
                :host {
                    display: block;
                }
                
                .wrapper {
                    width: 100%;
                }
            </style>
            <div class="wrapper">
                <input id="input" part="input" type="text">
                <slot></slot>
            </div>
        `;
        
        super({
            template: template.innerHTML,
            targetSelector: 'input',
            ariaConfig,
            events: ['input', 'change', 'focus', 'blur'],
            observedAttributes: ['type', 'value', 'placeholder', 'disabled', 'readonly', 'required', 'name', 'id']
        });
        
        this.input = this.shadowRoot.querySelector('input');
    }
    
    static get observedAttributes() {
        return ['type', 'value', 'placeholder', 'disabled', 'readonly', 'required', 'name', 'id', 'aria-label', 'aria-describedby', 'aria-required', 'aria-invalid', 'aria-autocomplete', 'aria-controls', 'aria-activedescendant'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (oldValue === newValue) return;
        switch (name) {
            case 'type':
                this.input.type = newValue || 'text';
                break;
            case 'value':
                this.input.value = newValue || '';
                break;
            case 'placeholder':
                this.input.placeholder = newValue || '';
                break;
            case 'disabled':
                this.input.disabled = this.hasAttribute('disabled');
                break;
            case 'readonly':
                this.input.readOnly = this.hasAttribute('readonly');
                break;
            case 'required':
                this.input.required = this.hasAttribute('required');
                break;
            case 'name':
                this.input.name = newValue || '';
                break;
            case 'id':
                this.input.id = newValue || '';
                break;
        }
    }
    
    get value() {
        return this.input.value;
    }
    set value(val) {
        this.input.value = val;
    }
    get type() {
        return this.input.type;
    }
    set type(val) {
        this.input.type = val;
    }
    get disabled() {
        return this.input.disabled;
    }
    set disabled(val) {
        this.input.disabled = val;
    }
    get readonly() {
        return this.input.readOnly;
    }
    set readonly(val) {
        this.input.readOnly = val;
    }
    get required() {
        return this.input.required;
    }
    set required(val) {
        this.input.required = val;
    }
    // ARIA property accessors
    get ariaLabel() { 
        const value = this.input.getAttribute('aria-label');
        return value === null ? null : value;
    }
    set ariaLabel(val) { 
        if (val === null || val === undefined) {
            this.input.removeAttribute('aria-label');
        } else {
            this.input.setAttribute('aria-label', val);
        }
    }
    get ariaDescribedBy() { 
        const value = this.input.getAttribute('aria-describedby');
        return value === null ? null : value;
    }
    set ariaDescribedBy(val) { 
        if (val === null || val === undefined) {
            this.input.removeAttribute('aria-describedby');
        } else {
            this.input.setAttribute('aria-describedby', val);
        }
    }
    get ariaRequired() { 
        const value = this.input.getAttribute('aria-required');
        return value === null ? null : value;
    }
    set ariaRequired(val) { 
        if (val === null || val === undefined) {
            this.input.removeAttribute('aria-required');
        } else {
            this.input.setAttribute('aria-required', val);
        }
    }
    get ariaInvalid() { 
        const value = this.input.getAttribute('aria-invalid');
        return value === null ? null : value;
    }
    set ariaInvalid(val) { 
        if (val === null || val === undefined) {
            this.input.removeAttribute('aria-invalid');
        } else {
            this.input.setAttribute('aria-invalid', val);
        }
    }
    get ariaAutocomplete() { 
        const value = this.input.getAttribute('aria-autocomplete');
        return value === null ? null : value;
    }
    set ariaAutocomplete(val) { 
        if (val === null || val === undefined) {
            this.input.removeAttribute('aria-autocomplete');
        } else {
            this.input.setAttribute('aria-autocomplete', val);
        }
    }
    get ariaControls() { 
        const value = this.input.getAttribute('aria-controls');
        return value === null ? null : value;
    }
    set ariaControls(val) { 
        if (val === null || val === undefined) {
            this.input.removeAttribute('aria-controls');
        } else {
            this.input.setAttribute('aria-controls', val);
        }
    }
    get ariaActiveDescendant() { 
        const value = this.input.getAttribute('aria-activedescendant');
        return value === null ? null : value;
    }
    set ariaActiveDescendant(val) { 
        if (val === null || val === undefined) {
            this.input.removeAttribute('aria-activedescendant');
        } else {
            this.input.setAttribute('aria-activedescendant', val);
        }
    }
    // Override validateARIA for text input–specific checks
    validateARIA() {
        const errors = super.validateARIA ? super.validateARIA() : [];
        // Accessible name check - check host element's text content and ARIA attributes
        const hostAriaLabel = this.getAttribute('aria-label');
        const hostAriaLabelledBy = this.getAttribute('aria-labelledby');
        const inputAriaLabel = this.input.getAttribute('aria-label');
        const inputAriaLabelledBy = this.input.getAttribute('aria-labelledby');
        const hasName = hostAriaLabel || hostAriaLabelledBy || inputAriaLabel || inputAriaLabelledBy;
        if (!hasName) {
            errors.push('Text input has no accessible name (aria-label or aria-labelledby required)');
        }
        // aria-invalid state management
        if (this.input.hasAttribute('aria-invalid')) {
            const val = this.input.getAttribute('aria-invalid');
            if (!['true', 'false', 'grammar', 'spelling'].includes(val)) {
                errors.push(`Invalid aria-invalid value: ${val}`);
            }
        }
        // aria-describedby references
        if (this.input.hasAttribute('aria-describedby')) {
            const refError = this.checkAriaReferences('aria-describedby', this.input.getAttribute('aria-describedby'));
            if (refError) errors.push(refError);
        }
        return errors;
    }
}

// Register the custom element
customElements.define('ds-text-input', DsTextInput); 