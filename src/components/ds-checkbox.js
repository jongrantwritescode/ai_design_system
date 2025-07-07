/**
 * @file ds-checkbox.js
 * @summary A custom Web Component that wraps a native checkbox input element.
 * @description
 * The `ds-checkbox` component provides a styled and functional checkbox.
 * It supports both single checkboxes and groups of checkboxes for multiple selections.
 *
 * @element ds-checkbox
 * @extends BaseComponent
 *
 * @attr {string} name - The name of the checkbox, used when submitting form data.
 * @attr {string} value - The value of the checkbox when checked.
 * @attr {boolean} checked - If present, the checkbox is selected.
 * @attr {boolean} disabled - If present, the checkbox cannot be interacted with.
 * @attr {boolean} readonly - If present, the checkbox cannot be modified by the user.
 * @attr {boolean} required - If present, the checkbox must be checked before form submission.
 * @attr {string} id - A unique identifier for the checkbox, useful for associating with labels.
 *
 * @property {boolean} checked - Gets or sets the checked state of the checkbox.
 * @property {string} value - Gets or sets the value of the checkbox.
 * @property {string} name - Gets or sets the name of the checkbox.
 * @property {boolean} disabled - Gets or sets the disabled state of the checkbox.
 * @property {boolean} readonly - Gets or sets the readonly state of the checkbox.
 * @property {boolean} required - Gets or sets the required state of the checkbox.
 *
 * @fires change - Fired when the checkbox selection changes.
 * @fires focus - Fired when the checkbox receives focus.
 * @fires blur - Fired when the checkbox loses focus.
 *
 * @example
 * <!-- Basic checkbox -->
 * <ds-checkbox name="agree" value="yes" id="agree-terms">I agree to the terms</ds-checkbox>
 *
 * @example
 * <!-- Checkbox with default selection -->
 * <ds-checkbox name="newsletter" value="subscribe" checked>Subscribe to newsletter</ds-checkbox>
 *
 * @example
 * <!-- Multiple checkboxes for preferences -->
 * <ds-checkbox name="preferences" value="email">Email notifications</ds-checkbox>
 * <ds-checkbox name="preferences" value="sms">SMS notifications</ds-checkbox>
 * <ds-checkbox name="preferences" value="push">Push notifications</ds-checkbox>
 */
import BaseComponent from './base-component.js';

class DsCheckbox extends BaseComponent {
    constructor() {
        // ARIA config for ds-checkbox
        const ariaConfig = {
            staticAriaAttributes: { role: 'checkbox' },
            dynamicAriaAttributes: [
                'aria-label',
                'aria-describedby',
                'aria-required',
                'aria-invalid',
                'aria-checked'
            ],
            requiredAriaAttributes: [], // none required, but warn about missing labels
            referenceAttributes: ['aria-describedby'],
            tokenValidation: {
                'aria-checked': ['true', 'false', 'mixed', 'undefined'],
                'aria-invalid': ['true', 'false', 'grammar', 'spelling']
            }
        };
        
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                @import url('/src/styles/styles.css');
                
                :host {
                    display: inline-block;
                }
                
                .wrapper {
                    display: flex;
                    align-items: center;
                }
            </style>
            <div class="wrapper">
                <input type="checkbox" id="checkbox" part="checkbox">
                <slot></slot>
            </div>
        `;
        
        super({
            template: template.innerHTML,
            targetSelector: 'input[type="checkbox"]',
            ariaConfig,
            events: ['change', 'focus', 'blur'],
            observedAttributes: ['name', 'value', 'checked', 'disabled', 'readonly', 'required', 'id']
        });
        
        this.checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    }
    
    /**
     * Defines which attributes the component observes for changes.
     * @returns {Array<string>} An array of attribute names to observe.
     */
    static get observedAttributes() {
        return ['name', 'value', 'checked', 'disabled', 'readonly', 'required', 'id', 'aria-label', 'aria-describedby', 'aria-required', 'aria-invalid', 'aria-checked'];
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
            case 'name':
                this.checkbox.name = newValue || '';
                break;
                
            case 'value':
                this.checkbox.value = newValue || '';
                break;
                
            case 'checked':
                if (this.hasAttribute('checked')) {
                    this.checkbox.checked = true;
                } else {
                    this.checkbox.checked = false;
                }
                break;
                
            case 'disabled':
                if (this.hasAttribute('disabled')) {
                    this.checkbox.disabled = true;
                } else {
                    this.checkbox.disabled = false;
                }
                break;
                
            case 'readonly':
                if (this.hasAttribute('readonly')) {
                    this.checkbox.readOnly = true;
                } else {
                    this.checkbox.readOnly = false;
                }
                break;
                
            case 'required':
                if (this.hasAttribute('required')) {
                    this.checkbox.required = true;
                } else {
                    this.checkbox.required = false;
                }
                break;
                
            case 'id':
                this.checkbox.id = newValue || '';
                break;
        }
    }
    
    /**
     * Gets the checked state of the checkbox.
     * @returns {boolean} Whether the checkbox is checked.
     */
    get checked() {
        return this.checkbox.checked;
    }
    
    /**
     * Sets the checked state of the checkbox.
     * @param {boolean} val - Whether to check the checkbox.
     */
    set checked(val) {
        this.checkbox.checked = val;
    }
    
    /**
     * Gets the value of the checkbox.
     * @returns {string} The checkbox's value.
     */
    get value() {
        return this.checkbox.value;
    }
    
    /**
     * Sets the value of the checkbox.
     * @param {string} val - The new value to set.
     */
    set value(val) {
        this.checkbox.value = val;
    }
    
    /**
     * Gets the name of the checkbox.
     * @returns {string} The checkbox's name.
     */
    get name() {
        return this.checkbox.name;
    }
    
    /**
     * Sets the name of the checkbox.
     * @param {string} val - The new name to set.
     */
    set name(val) {
        this.checkbox.name = val;
    }
    
    /**
     * Gets the disabled state of the checkbox.
     * @returns {boolean} Whether the checkbox is disabled.
     */
    get disabled() {
        return this.checkbox.disabled;
    }
    
    /**
     * Sets the disabled state of the checkbox.
     * @param {boolean} val - Whether to disable the checkbox.
     */
    set disabled(val) {
        this.checkbox.disabled = val;
    }
    
    /**
     * Gets the readonly state of the checkbox.
     * @returns {boolean} Whether the checkbox is readonly.
     */
    get readonly() {
        return this.checkbox.readOnly;
    }
    
    /**
     * Sets the readonly state of the checkbox.
     * @param {boolean} val - Whether to make the checkbox readonly.
     */
    set readonly(val) {
        this.checkbox.readOnly = val;
    }
    
    /**
     * Gets the required state of the checkbox.
     * @returns {boolean} Whether the checkbox is required.
     */
    get required() {
        return this.checkbox.required;
    }
    
    /**
     * Sets the required state of the checkbox.
     * @param {boolean} val - Whether to make the checkbox required.
     */
    set required(val) {
        this.checkbox.required = val;
    }

    // ARIA property accessors
    get ariaLabel() { 
        const value = this.checkbox.getAttribute('aria-label');
        return value === null ? null : value;
    }
    set ariaLabel(val) { 
        if (val === null || val === undefined) {
            this.checkbox.removeAttribute('aria-label');
        } else {
            this.checkbox.setAttribute('aria-label', val);
        }
    }
    get ariaDescribedBy() { 
        const value = this.checkbox.getAttribute('aria-describedby');
        return value === null ? null : value;
    }
    set ariaDescribedBy(val) { 
        if (val === null || val === undefined) {
            this.checkbox.removeAttribute('aria-describedby');
        } else {
            this.checkbox.setAttribute('aria-describedby', val);
        }
    }
    get ariaRequired() { 
        const value = this.checkbox.getAttribute('aria-required');
        return value === null ? null : value;
    }
    set ariaRequired(val) { 
        if (val === null || val === undefined) {
            this.checkbox.removeAttribute('aria-required');
        } else {
            this.checkbox.setAttribute('aria-required', val);
        }
    }
    get ariaInvalid() { 
        const value = this.checkbox.getAttribute('aria-invalid');
        return value === null ? null : value;
    }
    set ariaInvalid(val) { 
        if (val === null || val === undefined) {
            this.checkbox.removeAttribute('aria-invalid');
        } else {
            this.checkbox.setAttribute('aria-invalid', val);
        }
    }
    get ariaChecked() { 
        const value = this.checkbox.getAttribute('aria-checked');
        return value === null ? null : value;
    }
    set ariaChecked(val) { 
        if (val === null || val === undefined) {
            this.checkbox.removeAttribute('aria-checked');
        } else {
            this.checkbox.setAttribute('aria-checked', val);
        }
    }

    // Override validateARIA for checkbox-specific checks
    validateARIA() {
        const errors = super.validateARIA ? super.validateARIA() : [];
        
        // Accessible name check - check host element's text content and ARIA attributes
        const hostTextContent = this.textContent.trim();
        const hostAriaLabel = this.getAttribute('aria-label');
        const hostAriaLabelledBy = this.getAttribute('aria-labelledby');
        const checkboxAriaLabel = this.checkbox.getAttribute('aria-label');
        const checkboxAriaLabelledBy = this.checkbox.getAttribute('aria-labelledby');
        
        const hasName = hostTextContent || hostAriaLabel || hostAriaLabelledBy || checkboxAriaLabel || checkboxAriaLabelledBy;
        
        if (!hasName) {
            errors.push('Checkbox has no accessible name (text, aria-label, or aria-labelledby required)');
        }
        
        // aria-checked state management
        if (this.checkbox.hasAttribute('aria-checked')) {
            const val = this.checkbox.getAttribute('aria-checked');
            if (!['true', 'false', 'mixed', 'undefined'].includes(val)) {
                errors.push(`Invalid aria-checked value: ${val}`);
            }
        }
        
        // aria-describedby references
        if (this.checkbox.hasAttribute('aria-describedby')) {
            const refError = this.checkAriaReferences('aria-describedby', this.checkbox.getAttribute('aria-describedby'));
            if (refError) errors.push(refError);
        }
        
        return errors;
    }
}

// Register the custom element
customElements.define('ds-checkbox', DsCheckbox); 