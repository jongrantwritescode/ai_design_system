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
class DsTextInput extends BaseComponent {
    constructor() {
        super();
        
        // Define the template with internal markup and styles
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                @import url('/src/design_system/styles.css');
                
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
        
        // Set up the component with template and observed attributes
        this.setupComponent(template, ['type', 'value', 'placeholder', 'disabled', 'readonly', 'required', 'name', 'id', 'aria-label']);
        
        // Store reference to the internal input for attribute changes
        this.input = this.shadowRoot.querySelector('input');
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Called when one of the component's observed attributes is added, removed, or changed.
     * @param {string} name - The name of the attribute that changed.
     * @param {string|null} oldValue - The attribute's old value.
     * @param {string|null} newValue - The attribute's new value.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return; // No change
        
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
                if (this.hasAttribute('disabled')) {
                    this.input.disabled = true;
                } else {
                    this.input.disabled = false;
                }
                break;
                
            case 'readonly':
                if (this.hasAttribute('readonly')) {
                    this.input.readOnly = true;
                } else {
                    this.input.readOnly = false;
                }
                break;
                
            case 'required':
                if (this.hasAttribute('required')) {
                    this.input.required = true;
                } else {
                    this.input.required = false;
                }
                break;
                
            case 'name':
                this.input.name = newValue || '';
                break;
                
            case 'id':
                this.input.id = newValue || '';
                break;
                
            case 'aria-label':
                this.input.setAttribute('aria-label', newValue || '');
                break;
        }
    }
    
    /**
     * Sets up event listeners to re-dispatch events from the host element.
     */
    setupEventListeners() {
        const events = ['input', 'change', 'focus', 'blur'];
        
        events.forEach(eventType => {
            this.input.addEventListener(eventType, (event) => {
                // Create a new event to dispatch from the host
                const newEvent = new Event(eventType, {
                    bubbles: true,
                    composed: true,
                    cancelable: true
                });
                
                // Copy relevant properties
                if (eventType === 'input' || eventType === 'change') {
                    newEvent.target = this;
                    newEvent.currentTarget = this;
                }
                
                this.dispatchEvent(newEvent);
            });
        });
    }
    
    /**
     * Gets the current value of the input.
     * @returns {string} The input's current value.
     */
    get value() {
        return this.input.value;
    }
    
    /**
     * Sets the value of the input.
     * @param {string} val - The new value to set.
     */
    set value(val) {
        this.input.value = val;
    }
    
    /**
     * Gets the type of the input.
     * @returns {string} The input's type.
     */
    get type() {
        return this.input.type;
    }
    
    /**
     * Sets the type of the input.
     * @param {string} val - The new type to set.
     */
    set type(val) {
        this.input.type = val;
    }
    
    /**
     * Gets the disabled state of the input.
     * @returns {boolean} Whether the input is disabled.
     */
    get disabled() {
        return this.input.disabled;
    }
    
    /**
     * Sets the disabled state of the input.
     * @param {boolean} val - Whether to disable the input.
     */
    set disabled(val) {
        this.input.disabled = val;
    }
    
    /**
     * Gets the readonly state of the input.
     * @returns {boolean} Whether the input is readonly.
     */
    get readonly() {
        return this.input.readOnly;
    }
    
    /**
     * Sets the readonly state of the input.
     * @param {boolean} val - Whether to make the input readonly.
     */
    set readonly(val) {
        this.input.readOnly = val;
    }
    
    /**
     * Gets the required state of the input.
     * @returns {boolean} Whether the input is required.
     */
    get required() {
        return this.input.required;
    }
    
    /**
     * Sets the required state of the input.
     * @param {boolean} val - Whether to make the input required.
     */
    set required(val) {
        this.input.required = val;
    }
}

// Register the custom element
customElements.define('ds-text-input', DsTextInput); 