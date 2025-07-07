/**
 * @file ds-textarea.js
 * @summary A custom Web Component that wraps a native `<textarea>` element.
 * @description
 * The `ds-textarea` component provides a styled and functional textarea for multi-line text input.
 * It supports various textarea attributes and properties while maintaining accessibility
 * and proper event handling.
 *
 * @element ds-textarea
 * @extends BaseComponent
 *
 * @attr {string} value - The current value of the textarea.
 * @attr {string} placeholder - A hint to the user of what can be entered in the textarea.
 * @attr {string} rows - The number of visible text lines in the textarea.
 * @attr {string} cols - The visible width of the textarea in average character widths.
 * @attr {boolean} disabled - If present, the textarea cannot be interacted with.
 * @attr {boolean} readonly - If present, the textarea cannot be modified by the user.
 * @attr {boolean} required - If present, the textarea must have a value before form submission.
 * @attr {string} name - The name of the textarea, used when submitting form data.
 * @attr {string} id - A unique identifier for the textarea, useful for associating with labels.
 *
 * @property {string} value - Gets or sets the current value of the textarea.
 * @property {string} placeholder - Gets or sets the placeholder text of the textarea.
 * @property {number} rows - Gets or sets the number of rows in the textarea.
 * @property {number} cols - Gets or sets the number of columns in the textarea.
 * @property {boolean} disabled - Gets or sets the disabled state of the textarea.
 * @property {boolean} readonly - Gets or sets the readonly state of the textarea.
 * @property {boolean} required - Gets or sets the required state of the textarea.
 * @property {string} name - Gets or sets the name of the textarea.
 *
 * @fires input - Fired when the value of the textarea changes.
 * @fires change - Fired when the value of the textarea is committed.
 * @fires focus - Fired when the textarea receives focus.
 * @fires blur - Fired when the textarea loses focus.
 *
 * @example
 * <!-- Basic textarea -->
 * <ds-textarea placeholder="Enter your message" rows="4" cols="50"></ds-textarea>
 *
 * @example
 * <!-- Required textarea with pre-filled value -->
 * <ds-textarea value="Default text" required rows="6">Enter description</ds-textarea>
 *
 * @example
 * <!-- Disabled textarea -->
 * <ds-textarea value="Read-only content" disabled rows="3"></ds-textarea>
 */
import BaseComponent from './base-component.js';

class DsTextarea extends BaseComponent {
    constructor() {
        // ARIA config for ds-textarea
        const ariaConfig = {
            staticAriaAttributes: {},
            dynamicAriaAttributes: [
                'aria-label',
                'aria-describedby',
                'aria-required',
                'aria-invalid'
            ],
            requiredAriaAttributes: [],
            referenceAttributes: ['aria-describedby'],
            tokenValidation: {
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
                <textarea id="textarea" part="textarea">
                    <slot></slot>
                </textarea>
            </div>
        `;
        
        super({
            template: template.innerHTML,
            targetSelector: 'textarea',
            ariaConfig,
            events: ['input', 'change', 'focus', 'blur'],
            observedAttributes: ['value', 'placeholder', 'rows', 'cols', 'disabled', 'readonly', 'required', 'name', 'id']
        });
        
        this.textarea = this.shadowRoot.querySelector('textarea');
    }
    
    static get observedAttributes() {
        return ['value', 'placeholder', 'rows', 'cols', 'disabled', 'readonly', 'required', 'name', 'id', 'aria-label', 'aria-describedby', 'aria-required', 'aria-invalid'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (oldValue === newValue) return;
        switch (name) {
            case 'value':
                this.textarea.value = newValue || '';
                break;
            case 'placeholder':
                this.textarea.placeholder = newValue || '';
                break;
            case 'rows':
                this.textarea.rows = newValue || '';
                break;
            case 'cols':
                this.textarea.cols = newValue || '';
                break;
            case 'disabled':
                this.textarea.disabled = this.hasAttribute('disabled');
                break;
            case 'readonly':
                this.textarea.readOnly = this.hasAttribute('readonly');
                break;
            case 'required':
                this.textarea.required = this.hasAttribute('required');
                break;
            case 'name':
                this.textarea.name = newValue || '';
                break;
            case 'id':
                this.textarea.id = newValue || '';
                break;
        }
    }
    
    get value() {
        return this.textarea.value;
    }
    set value(val) {
        this.textarea.value = val;
    }
    get placeholder() {
        return this.textarea.placeholder;
    }
    set placeholder(val) {
        this.textarea.placeholder = val;
    }
    get rows() {
        return this.textarea.rows;
    }
    set rows(val) {
        this.textarea.rows = val;
    }
    get cols() {
        return this.textarea.cols;
    }
    set cols(val) {
        this.textarea.cols = val;
    }
    get disabled() {
        return this.textarea.disabled;
    }
    set disabled(val) {
        this.textarea.disabled = val;
    }
    get readonly() {
        return this.textarea.readOnly;
    }
    set readonly(val) {
        this.textarea.readOnly = val;
    }
    get required() {
        return this.textarea.required;
    }
    set required(val) {
        this.textarea.required = val;
    }
    get name() {
        return this.textarea.name;
    }
    set name(val) {
        this.textarea.name = val;
    }
    // ARIA property accessors
    get ariaLabel() { 
        const value = this.textarea.getAttribute('aria-label');
        return value === null ? null : value;
    }
    set ariaLabel(val) { 
        if (val === null || val === undefined) {
            this.textarea.removeAttribute('aria-label');
        } else {
            this.textarea.setAttribute('aria-label', val);
        }
    }
    get ariaDescribedBy() { 
        const value = this.textarea.getAttribute('aria-describedby');
        return value === null ? null : value;
    }
    set ariaDescribedBy(val) { 
        if (val === null || val === undefined) {
            this.textarea.removeAttribute('aria-describedby');
        } else {
            this.textarea.setAttribute('aria-describedby', val);
        }
    }
    get ariaRequired() { 
        const value = this.textarea.getAttribute('aria-required');
        return value === null ? null : value;
    }
    set ariaRequired(val) { 
        if (val === null || val === undefined) {
            this.textarea.removeAttribute('aria-required');
        } else {
            this.textarea.setAttribute('aria-required', val);
        }
    }
    get ariaInvalid() { 
        const value = this.textarea.getAttribute('aria-invalid');
        return value === null ? null : value;
    }
    set ariaInvalid(val) { 
        if (val === null || val === undefined) {
            this.textarea.removeAttribute('aria-invalid');
        } else {
            this.textarea.setAttribute('aria-invalid', val);
        }
    }
    // Override validateARIA for textarea-specific checks
    validateARIA() {
        const errors = super.validateARIA ? super.validateARIA() : [];
        const hostAriaLabel = this.getAttribute('aria-label');
        const hostAriaLabelledBy = this.getAttribute('aria-labelledby');
        const textareaAriaLabel = this.textarea.getAttribute('aria-label');
        const textareaAriaLabelledBy = this.textarea.getAttribute('aria-labelledby');
        const hasName = hostAriaLabel || hostAriaLabelledBy || textareaAriaLabel || textareaAriaLabelledBy;
        if (!hasName) {
            errors.push('Textarea has no accessible name (aria-label or aria-labelledby required)');
        }
        if (this.textarea.hasAttribute('aria-invalid')) {
            const val = this.textarea.getAttribute('aria-invalid');
            if (!['true', 'false', 'grammar', 'spelling'].includes(val)) {
                errors.push(`Invalid aria-invalid value: ${val}`);
            }
        }
        if (this.textarea.hasAttribute('aria-describedby')) {
            const refError = this.checkAriaReferences('aria-describedby', this.textarea.getAttribute('aria-describedby'));
            if (refError) errors.push(refError);
        }
        return errors;
    }
}

// Register the custom element
customElements.define('ds-textarea', DsTextarea);

// Export for use in other modules
export default DsTextarea; 