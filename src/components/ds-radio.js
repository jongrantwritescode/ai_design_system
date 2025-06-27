/**
 * @file ds-radio.js
 * @summary A custom Web Component that wraps a native radio input element.
 * @description
 * The `ds-radio` component provides a styled and functional radio button.
 * It maintains proper radio button behavior where only one option in a group can be selected.
 *
 * @element ds-radio
 * @extends BaseComponent
 *
 * @attr {string} name - The name of the radio button group. All radio buttons with the same name form a group.
 * @attr {string} value - The value of the radio button when selected.
 * @attr {boolean} checked - If present, the radio button is selected.
 * @attr {boolean} disabled - If present, the radio button cannot be interacted with.
 * @attr {boolean} readonly - If present, the radio button cannot be modified by the user.
 * @attr {boolean} required - If present, one radio button in the group must be selected.
 * @attr {string} id - A unique identifier for the radio button, useful for associating with labels.
 *
 * @property {boolean} checked - Gets or sets the checked state of the radio button.
 * @property {string} value - Gets or sets the value of the radio button.
 * @property {string} name - Gets or sets the name of the radio button.
 * @property {boolean} disabled - Gets or sets the disabled state of the radio button.
 * @property {boolean} readonly - Gets or sets the readonly state of the radio button.
 * @property {boolean} required - Gets or sets the required state of the radio button.
 *
 * @fires change - Fired when the radio button selection changes.
 * @fires focus - Fired when the radio button receives focus.
 * @fires blur - Fired when the radio button loses focus.
 *
 * @example
 * <!-- Basic radio button group -->
 * <ds-radio name="gender" value="male" id="male">Male</ds-radio>
 * <ds-radio name="gender" value="female" id="female">Female</ds-radio>
 * <ds-radio name="gender" value="other" id="other">Other</ds-radio>
 *
 * @example
 * <!-- Radio button with default selection -->
 * <ds-radio name="preference" value="option1" checked>Option 1</ds-radio>
 * <ds-radio name="preference" value="option2">Option 2</ds-radio>
 *
 * @example
 * <!-- Disabled radio button -->
 * <ds-radio name="status" value="inactive" disabled>Inactive</ds-radio>
 */
import BaseComponent from './base-component.js';

class DsRadio extends BaseComponent {
    constructor() {
        // ARIA config for ds-radio
        const ariaConfig = {
            staticAriaAttributes: { role: 'radio' },
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
                @import url('/src/design_system/styles.css');
                
                :host {
                    display: inline-block;
                }
                
                .wrapper {
                    display: flex;
                    align-items: center;
                }
            </style>
            <div class="wrapper">
                <input type="radio" id="radio" part="radio">
                <slot></slot>
            </div>
        `;
        
        super({
            template: template.innerHTML,
            targetSelector: 'input[type="radio"]',
            ariaConfig,
            events: ['change', 'focus', 'blur'],
            observedAttributes: ['name', 'value', 'checked', 'disabled', 'readonly', 'required', 'id']
        });
        
        this.radio = this.shadowRoot.querySelector('input[type="radio"]');
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
                this.radio.name = newValue || '';
                break;
                
            case 'value':
                this.radio.value = newValue || '';
                break;
                
            case 'checked':
                if (this.hasAttribute('checked')) {
                    this.radio.checked = true;
                } else {
                    this.radio.checked = false;
                }
                break;
                
            case 'disabled':
                if (this.hasAttribute('disabled')) {
                    this.radio.disabled = true;
                } else {
                    this.radio.disabled = false;
                }
                break;
                
            case 'readonly':
                if (this.hasAttribute('readonly')) {
                    this.radio.readOnly = true;
                } else {
                    this.radio.readOnly = false;
                }
                break;
                
            case 'required':
                if (this.hasAttribute('required')) {
                    this.radio.required = true;
                } else {
                    this.radio.required = false;
                }
                break;
                
            case 'id':
                this.radio.id = newValue || '';
                break;
        }
    }
    
    /**
     * Gets the checked state of the radio button.
     * @returns {boolean} Whether the radio button is checked.
     */
    get checked() {
        return this.radio.checked;
    }
    
    /**
     * Sets the checked state of the radio button.
     * @param {boolean} val - Whether to check the radio button.
     */
    set checked(val) {
        this.radio.checked = val;
    }
    
    /**
     * Gets the value of the radio button.
     * @returns {string} The radio button's value.
     */
    get value() {
        return this.radio.value;
    }
    
    /**
     * Sets the value of the radio button.
     * @param {string} val - The new value to set.
     */
    set value(val) {
        this.radio.value = val;
    }
    
    /**
     * Gets the name of the radio button.
     * @returns {string} The radio button's name.
     */
    get name() {
        return this.radio.name;
    }
    
    /**
     * Sets the name of the radio button.
     * @param {string} val - The new name to set.
     */
    set name(val) {
        this.radio.name = val;
    }
    
    /**
     * Gets the disabled state of the radio button.
     * @returns {boolean} Whether the radio button is disabled.
     */
    get disabled() {
        return this.radio.disabled;
    }
    
    /**
     * Sets the disabled state of the radio button.
     * @param {boolean} val - Whether to disable the radio button.
     */
    set disabled(val) {
        this.radio.disabled = val;
    }
    
    /**
     * Gets the readonly state of the radio button.
     * @returns {boolean} Whether the radio button is readonly.
     */
    get readonly() {
        return this.radio.readOnly;
    }
    
    /**
     * Sets the readonly state of the radio button.
     * @param {boolean} val - Whether to make the radio button readonly.
     */
    set readonly(val) {
        this.radio.readOnly = val;
    }
    
    /**
     * Gets the required state of the radio button.
     * @returns {boolean} Whether the radio button is required.
     */
    get required() {
        return this.radio.required;
    }
    
    /**
     * Sets the required state of the radio button.
     * @param {boolean} val - Whether to make the radio button required.
     */
    set required(val) {
        this.radio.required = val;
    }

    // ARIA property accessors
    get ariaLabel() { 
        const value = this.radio.getAttribute('aria-label');
        return value === null ? null : value;
    }
    set ariaLabel(val) { 
        if (val === null || val === undefined) {
            this.radio.removeAttribute('aria-label');
        } else {
            this.radio.setAttribute('aria-label', val);
        }
    }
    get ariaDescribedBy() { 
        const value = this.radio.getAttribute('aria-describedby');
        return value === null ? null : value;
    }
    set ariaDescribedBy(val) { 
        if (val === null || val === undefined) {
            this.radio.removeAttribute('aria-describedby');
        } else {
            this.radio.setAttribute('aria-describedby', val);
        }
    }
    get ariaRequired() { 
        const value = this.radio.getAttribute('aria-required');
        return value === null ? null : value;
    }
    set ariaRequired(val) { 
        if (val === null || val === undefined) {
            this.radio.removeAttribute('aria-required');
        } else {
            this.radio.setAttribute('aria-required', val);
        }
    }
    get ariaInvalid() { 
        const value = this.radio.getAttribute('aria-invalid');
        return value === null ? null : value;
    }
    set ariaInvalid(val) { 
        if (val === null || val === undefined) {
            this.radio.removeAttribute('aria-invalid');
        } else {
            this.radio.setAttribute('aria-invalid', val);
        }
    }
    get ariaChecked() { 
        const value = this.radio.getAttribute('aria-checked');
        return value === null ? null : value;
    }
    set ariaChecked(val) { 
        if (val === null || val === undefined) {
            this.radio.removeAttribute('aria-checked');
        } else {
            this.radio.setAttribute('aria-checked', val);
        }
    }

    // Override validateARIA for radio-specific checks
    validateARIA() {
        const errors = super.validateARIA ? super.validateARIA() : [];
        
        // Accessible name check - check host element's text content and ARIA attributes
        const hostTextContent = this.textContent.trim();
        const hostAriaLabel = this.getAttribute('aria-label');
        const hostAriaLabelledBy = this.getAttribute('aria-labelledby');
        const radioAriaLabel = this.radio.getAttribute('aria-label');
        const radioAriaLabelledBy = this.radio.getAttribute('aria-labelledby');
        
        const hasName = hostTextContent || hostAriaLabel || hostAriaLabelledBy || radioAriaLabel || radioAriaLabelledBy;
        
        if (!hasName) {
            errors.push('Radio has no accessible name (text, aria-label, or aria-labelledby required)');
        }
        
        // aria-checked state management
        if (this.radio.hasAttribute('aria-checked')) {
            const val = this.radio.getAttribute('aria-checked');
            if (!['true', 'false', 'mixed', 'undefined'].includes(val)) {
                errors.push(`Invalid aria-checked value: ${val}`);
            }
        }
        
        // aria-describedby references
        if (this.radio.hasAttribute('aria-describedby')) {
            const refError = this.checkAriaReferences('aria-describedby', this.radio.getAttribute('aria-describedby'));
            if (refError) errors.push(refError);
        }
        
        return errors;
    }
}

// Register the custom element
customElements.define('ds-radio', DsRadio); 