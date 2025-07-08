/**
 * @file ds-form.js
 * @summary A custom Web Component that wraps a native `<form>` element with enhanced ARIA support.
 * @description
 * The `ds-form` component provides a styled and functional form element with enhanced
 * accessibility features, validation support, and error state management. It wraps a
 * native form element to maintain full HTML form semantics while adding design system
 * styling and ARIA compliance features.
 *
 * @element ds-form
 * @extends BaseComponent
 *
 * @slot - Renders form controls and other content within the form.
 *
 * @example
 * <!-- Basic form -->
 * <ds-form action="/api/login" method="post">
 *   <ds-fieldset>
 *     <ds-legend>Login Information</ds-legend>
 *     <ds-label for="username">Username</ds-label>
 *     <ds-text-input id="username" name="username" required></ds-text-input>
 *     <ds-label for="password">Password</ds-label>
 *     <ds-text-input id="password" name="password" type="password" required></ds-text-input>
 *   </ds-fieldset>
 *   <ds-button type="submit">Login</ds-button>
 * </ds-form>
 *
 * @example
 * <!-- Form with ARIA attributes -->
 * <ds-form 
 *   action="/api/register" 
 *   method="post" 
 *   aria-label="User registration form"
 *   aria-describedby="form-instructions">
 *   <div id="form-instructions">Please fill out all required fields marked with an asterisk (*)</div>
 *   <ds-fieldset>
 *     <ds-legend>Personal Information</ds-legend>
 *     <ds-label for="firstName">First Name *</ds-label>
 *     <ds-text-input id="firstName" name="firstName" required></ds-text-input>
 *   </ds-fieldset>
 *   <ds-button type="submit">Register</ds-button>
 * </ds-form>
 *
 * @example
 * <!-- Form with custom validation -->
 * <ds-form 
 *   action="/api/contact" 
 *   method="post"
 *   novalidate
 *   data-validation="custom">
 *   <ds-fieldset>
 *     <ds-legend>Contact Information</ds-legend>
 *     <ds-label for="email">Email Address</ds-label>
 *     <ds-text-input id="email" name="email" type="email" required></ds-text-input>
 *   </ds-fieldset>
 *   <ds-button type="submit">Send Message</ds-button>
 * </ds-form>
 */
import BaseComponent from './base-component.js';

class DsForm extends BaseComponent {
    constructor() {
        // ARIA config for ds-form
        const ariaConfig = {
            staticAriaAttributes: {
                'role': 'form'
            },
            dynamicAriaAttributes: [
                'aria-label',
                'aria-describedby',
                'aria-labelledby'
            ],
            requiredAriaAttributes: [],
            referenceAttributes: ['aria-describedby', 'aria-labelledby']
        };
        
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                @import url('/src/styles/styles.css');
                
                :host {
                    display: block;
                }
                
                .form-wrapper {
                    width: 100%;
                }
                
                form[part="form"] {
                    width: 100%;
                }
                
                .live-region[part="live-region"] {
                    position: absolute;
                    left: -10000px;
                    width: 1px;
                    height: 1px;
                    overflow: hidden;
                }
                
                .live-region[part="live-region"]:not([hidden]) {
                    position: static;
                    width: auto;
                    height: auto;
                    margin-top: var(--ds-spacing-sm);
                    padding: var(--ds-spacing-sm);
                    border-radius: var(--ds-form-border-radius);
                    font-size: 0.9em;
                }
                
                .live-region[part="live-region"][data-type="error"] {
                    background-color: var(--ds-form-error-background);
                    color: var(--ds-form-error-color);
                    border: 1px solid var(--ds-form-error-border);
                }
                
                .live-region[part="live-region"][data-type="success"] {
                    background-color: var(--ds-form-success-background, #d4edda);
                    color: var(--ds-form-success-color, #155724);
                    border: 1px solid var(--ds-form-success-border, #c3e6cb);
                }
                
                .live-region[part="live-region"][data-type="info"] {
                    background-color: var(--ds-form-info-background, #d1ecf1);
                    color: var(--ds-form-info-color, #0c5460);
                    border: 1px solid var(--ds-form-info-border, #bee5eb);
                }
            </style>
            <div class="form-wrapper">
                <form part="form" novalidate>
                    <slot></slot>
                </form>
                <div 
                    part="live-region" 
                    class="live-region"
                    aria-live="polite" 
                    aria-atomic="true" 
                    hidden>
                </div>
            </div>
        `;
        
        super({
            template: template.innerHTML,
            targetSelector: 'form',
            ariaConfig,
            events: ['submit', 'reset', 'input', 'change', 'invalid']
        });
        
        this.form = this.shadowRoot.querySelector('form');
        this.liveRegion = this.shadowRoot.querySelector('[part="live-region"]');
        
        // Form state tracking
        this.formState = {
            submitted: false,
            valid: true,
            errors: new Map(),
            hasValidationErrors: false
        };
        
        // Setup form event handlers
        this.setupFormHandlers();
    }
    
    static get observedAttributes() {
        return [
            'action',
            'method', 
            'enctype',
            'target',
            'novalidate',
            'autocomplete',
            'aria-label',
            'aria-describedby',
            'aria-labelledby'
        ];
    }
    
    /**
     * Sets up form event handlers for validation and accessibility
     */
    setupFormHandlers() {
        // Handle form submission
        this.form.addEventListener('submit', (event) => {
            this.handleFormSubmit(event);
        });
        
        // Handle form reset
        this.form.addEventListener('reset', (event) => {
            this.handleFormReset(event);
        });
        
        // Handle input changes for real-time validation feedback
        this.form.addEventListener('input', (event) => {
            this.handleInputChange(event);
        });
        
        // Handle invalid events for custom validation
        this.form.addEventListener('invalid', (event) => {
            this.handleInvalidEvent(event);
        });
        
        // Handle change events for form state tracking
        this.form.addEventListener('change', (event) => {
            this.handleFormChange(event);
        });
    }
    
    /**
     * Handles form submission with validation and accessibility support
     * @param {Event} event - The submit event
     */
    handleFormSubmit(event) {
        this.formState.submitted = true;
        
        // Check if form is valid using our custom validation
        const formControls = this.querySelectorAll('input, select, textarea, ds-text-input, ds-select, ds-textarea, ds-checkbox, ds-radio');
        let hasErrors = false;
        
        formControls.forEach(control => {
            if (control.hasAttribute('required')) {
                const value = control.value || '';
                if (!value.trim()) {
                    hasErrors = true;
                    this.validateInput(control);
                }
            }
        });
        
        if (hasErrors) {
            event.preventDefault();
            this.handleValidationErrors();
            return;
        }
        
        // Form is valid, allow submission
        this.clearLiveRegion();
        this.announceToScreenReader('Form submitted successfully');
    }
    
    /**
     * Handles form reset
     * @param {Event} event - The reset event
     */
    handleFormReset(event) {
        this.formState = {
            submitted: false,
            valid: true,
            errors: new Map(),
            hasValidationErrors: false
        };
        
        this.clearLiveRegion();
        this.announceToScreenReader('Form has been reset');
    }
    
    /**
     * Handles input changes for real-time validation
     * @param {Event} event - The input event
     */
    handleInputChange(event) {
        const input = event.target;
        
        // Clear previous error for this input
        if (this.formState.errors.has(input)) {
            this.formState.errors.delete(input);
            this.updateLiveRegion();
        }
        
        // If form was previously submitted, validate on input change
        if (this.formState.submitted) {
            this.validateInput(input);
        }
    }
    
    /**
     * Handles invalid events for custom validation
     * @param {Event} event - The invalid event
     */
    handleInvalidEvent(event) {
        event.preventDefault();
        this.validateInput(event.target);
    }
    
    /**
     * Handles form change events
     * @param {Event} event - The change event
     */
    handleFormChange(event) {
        // Track form state changes
        this.updateFormValidity();
    }
    
    /**
     * Validates a single input element
     * @param {HTMLElement} input - The input element to validate
     */
    validateInput(input) {
        let isValid = true;
        let errorMessage = '';
        
        // Handle different types of inputs
        if (input.checkValidity) {
            // Native form elements
            isValid = input.checkValidity();
            errorMessage = input.validationMessage || 'This field is invalid';
        } else if (input.tagName && input.tagName.toLowerCase().includes('ds-')) {
            // Design system components
            const required = input.hasAttribute('required');
            const value = input.value || '';
            
            if (required && !value.trim()) {
                isValid = false;
                errorMessage = 'This field is required';
            } else if (input.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            }
        }
        
        if (!isValid) {
            this.formState.errors.set(input, errorMessage);
            this.formState.hasValidationErrors = true;
        } else {
            this.formState.errors.delete(input);
        }
        
        this.updateFormValidity();
        this.updateLiveRegion();
    }
    
    /**
     * Updates the overall form validity state
     */
    updateFormValidity() {
        this.formState.valid = this.form.checkValidity();
        
        // Update ARIA attributes based on form state
        if (this.formState.hasValidationErrors) {
            this.form.setAttribute('aria-invalid', 'true');
        } else {
            this.form.removeAttribute('aria-invalid');
        }
    }
    
    /**
     * Handles validation errors and announces them to screen readers
     */
    handleValidationErrors() {
        this.formState.hasValidationErrors = true;
        this.formState.valid = false;
        
        // Collect all error messages
        const errorMessages = Array.from(this.formState.errors.values());
        
        if (errorMessages.length > 0) {
            const errorText = `Form has ${errorMessages.length} validation error${errorMessages.length > 1 ? 's' : ''}: ${errorMessages.join('. ')}`;
            this.announceToScreenReader(errorText, 'error');
        }
        
        this.updateLiveRegion();
    }
    
    /**
     * Updates the live region with current form state
     */
    updateLiveRegion() {
        if (this.formState.errors.size === 0) {
            this.clearLiveRegion();
            return;
        }
        
        const errorMessages = Array.from(this.formState.errors.values());
        const errorText = errorMessages.join('. ');
        
        this.liveRegion.textContent = errorText;
        this.liveRegion.setAttribute('data-type', 'error');
        this.liveRegion.hidden = false;
    }
    
    /**
     * Clears the live region
     */
    clearLiveRegion() {
        this.liveRegion.textContent = '';
        this.liveRegion.hidden = true;
        this.liveRegion.removeAttribute('data-type');
    }
    
    /**
     * Announces a message to screen readers
     * @param {string} message - The message to announce
     * @param {string} type - The type of message (error, success, info)
     */
    announceToScreenReader(message, type = 'info') {
        this.liveRegion.textContent = message;
        this.liveRegion.setAttribute('data-type', type);
        this.liveRegion.hidden = false;
        
        // Hide the message after a delay
        setTimeout(() => {
            this.clearLiveRegion();
        }, 5000);
    }
    
    // Form attribute accessors
    get action() { return this.form.action; }
    set action(val) { this.form.action = val; }
    
    get method() { return this.form.method; }
    set method(val) { this.form.method = val; }
    
    get enctype() { return this.form.enctype; }
    set enctype(val) { this.form.enctype = val; }
    
    get target() { return this.form.target; }
    set target(val) { this.form.target = val; }
    
    get novalidate() { return this.form.hasAttribute('novalidate'); }
    set novalidate(val) { 
        if (val) {
            this.form.setAttribute('novalidate', '');
        } else {
            this.form.removeAttribute('novalidate');
        }
    }
    
    get autocomplete() { return this.form.autocomplete; }
    set autocomplete(val) { this.form.autocomplete = val; }
    
    // ARIA property accessors
    get ariaLabel() { 
        const value = this.form.getAttribute('aria-label');
        return value === null ? null : value;
    }
    set ariaLabel(val) { 
        if (val === null || val === undefined) {
            this.form.removeAttribute('aria-label');
        } else {
            this.form.setAttribute('aria-label', val);
        }
    }
    
    get ariaDescribedBy() { 
        const value = this.form.getAttribute('aria-describedby');
        return value === null ? null : value;
    }
    set ariaDescribedBy(val) { 
        if (val === null || val === undefined) {
            this.form.removeAttribute('aria-describedby');
        } else {
            this.form.setAttribute('aria-describedby', val);
        }
    }
    
    get ariaLabelledBy() { 
        const value = this.form.getAttribute('aria-labelledby');
        return value === null ? null : value;
    }
    set ariaLabelledBy(val) { 
        if (val === null || val === undefined) {
            this.form.removeAttribute('aria-labelledby');
        } else {
            this.form.setAttribute('aria-labelledby', val);
        }
    }
    
    /**
     * Submits the form programmatically
     */
    submit() {
        this.form.submit();
    }
    
    /**
     * Resets the form programmatically
     */
    reset() {
        this.form.reset();
        this.handleFormReset(new Event('reset'));
    }
    
    /**
     * Checks if the form is valid
     * @returns {boolean} True if the form is valid
     */
    checkValidity() {
        return this.form.checkValidity();
    }
    
    /**
     * Reports validity of the form
     * @returns {boolean} True if the form is valid
     */
    reportValidity() {
        return this.form.reportValidity();
    }
    
    /**
     * Gets form data as FormData object
     * @returns {FormData} The form data
     */
    getFormData() {
        const formData = new FormData();
        
        // Get all form controls (native and custom)
        const formControls = this.querySelectorAll('input, select, textarea, ds-text-input, ds-select, ds-textarea, ds-checkbox, ds-radio');
        
        formControls.forEach(control => {
            const name = control.name || control.getAttribute('name');
            if (!name) return;
            
            let value = '';
            let isCheckbox = false;
            let isRadio = false;
            let isChecked = false;
            const tag = control.tagName.toLowerCase();
            
            // Native and custom checkboxes/radios
            if (control.type === 'checkbox' || tag === 'ds-checkbox') {
                isCheckbox = true;
                isChecked = control.checked === true || control.hasAttribute('checked');
            } else if (control.type === 'radio' || tag === 'ds-radio') {
                isRadio = true;
                isChecked = control.checked === true || control.hasAttribute('checked');
            }
            
            if (isCheckbox || isRadio) {
                if (isChecked) {
                    // For custom elements, prefer getAttribute('value')
                    if (tag.startsWith('ds-')) {
                        value = control.getAttribute('value') ?? control.value ?? 'on';
                    } else {
                        value = control.value || 'on';
                    }
                    formData.append(name, value);
                }
                // If not checked, do not include in form data
            } else {
                // For text inputs, selects, textareas, and other custom components
                value = control.value || '';
                formData.append(name, value);
            }
        });
        
        return formData;
    }
    
    /**
     * Gets form data as a plain object
     * @returns {Object} The form data as key-value pairs
     */
    getFormDataAsObject() {
        const formData = this.getFormData();
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }
    
    // Override validateARIA for form-specific checks
    validateARIA() {
        const errors = super.validateARIA ? super.validateARIA() : [];
        
        // Check for accessible name (aria-label, aria-labelledby, or form title)
        const ariaLabel = this.form.getAttribute('aria-label');
        const ariaLabelledBy = this.form.getAttribute('aria-labelledby');
        const formTitle = this.querySelector('h1, h2, h3, h4, h5, h6');
        
        if (!ariaLabel && !ariaLabelledBy && !formTitle) {
            errors.push('Form should have an accessible name');
        }
        
        // Check for proper form structure
        const hasFormControls = this.querySelector('input, select, textarea, ds-text-input, ds-select, ds-textarea, ds-checkbox, ds-radio, button[type="submit"]');
        if (!hasFormControls) {
            errors.push('Form should contain form controls');
        }
        
        return errors;
    }
}

// Register the component
customElements.define('ds-form', DsForm);

export default DsForm; 