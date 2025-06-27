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
class DsTextarea extends BaseComponent {
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
                <textarea id="textarea" part="textarea">
                    <slot></slot>
                </textarea>
            </div>
        `;
        
        // Set up the component with template and observed attributes
        this.setupComponent(template, ['value', 'placeholder', 'rows', 'cols', 'disabled', 'readonly', 'required', 'name', 'id']);
        
        // Store reference to the internal textarea for attribute changes
        this.textarea = this.shadowRoot.querySelector('textarea');
        
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
                if (this.hasAttribute('disabled')) {
                    this.textarea.disabled = true;
                } else {
                    this.textarea.disabled = false;
                }
                break;
                
            case 'readonly':
                if (this.hasAttribute('readonly')) {
                    this.textarea.readOnly = true;
                } else {
                    this.textarea.readOnly = false;
                }
                break;
                
            case 'required':
                if (this.hasAttribute('required')) {
                    this.textarea.required = true;
                } else {
                    this.textarea.required = false;
                }
                break;
                
            case 'name':
                this.textarea.name = newValue || '';
                break;
                
            case 'id':
                this.textarea.id = newValue || '';
                break;
        }
    }
    
    /**
     * Sets up event listeners to re-dispatch events from the host element.
     */
    setupEventListeners() {
        const events = ['input', 'change', 'focus', 'blur'];
        
        events.forEach(eventType => {
            this.textarea.addEventListener(eventType, (event) => {
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
     * Gets the current value of the textarea.
     * @returns {string} The textarea's current value.
     */
    get value() {
        return this.textarea.value;
    }
    
    /**
     * Sets the value of the textarea.
     * @param {string} val - The new value to set.
     */
    set value(val) {
        this.textarea.value = val;
    }
    
    /**
     * Gets the placeholder text of the textarea.
     * @returns {string} The textarea's placeholder.
     */
    get placeholder() {
        return this.textarea.placeholder;
    }
    
    /**
     * Sets the placeholder text of the textarea.
     * @param {string} val - The new placeholder to set.
     */
    set placeholder(val) {
        this.textarea.placeholder = val;
    }
    
    /**
     * Gets the number of rows in the textarea.
     * @returns {number} The textarea's row count.
     */
    get rows() {
        return this.textarea.rows;
    }
    
    /**
     * Sets the number of rows in the textarea.
     * @param {number} val - The new row count to set.
     */
    set rows(val) {
        this.textarea.rows = val;
    }
    
    /**
     * Gets the number of columns in the textarea.
     * @returns {number} The textarea's column count.
     */
    get cols() {
        return this.textarea.cols;
    }
    
    /**
     * Sets the number of columns in the textarea.
     * @param {number} val - The new column count to set.
     */
    set cols(val) {
        this.textarea.cols = val;
    }
    
    /**
     * Gets the disabled state of the textarea.
     * @returns {boolean} Whether the textarea is disabled.
     */
    get disabled() {
        return this.textarea.disabled;
    }
    
    /**
     * Sets the disabled state of the textarea.
     * @param {boolean} val - Whether to disable the textarea.
     */
    set disabled(val) {
        this.textarea.disabled = val;
    }
    
    /**
     * Gets the readonly state of the textarea.
     * @returns {boolean} Whether the textarea is readonly.
     */
    get readonly() {
        return this.textarea.readOnly;
    }
    
    /**
     * Sets the readonly state of the textarea.
     * @param {boolean} val - Whether to make the textarea readonly.
     */
    set readonly(val) {
        this.textarea.readOnly = val;
    }
    
    /**
     * Gets the required state of the textarea.
     * @returns {boolean} Whether the textarea is required.
     */
    get required() {
        return this.textarea.required;
    }
    
    /**
     * Sets the required state of the textarea.
     * @param {boolean} val - Whether to make the textarea required.
     */
    set required(val) {
        this.textarea.required = val;
    }
    
    /**
     * Gets the name of the textarea.
     * @returns {string} The textarea's name.
     */
    get name() {
        return this.textarea.name;
    }
    
    /**
     * Sets the name of the textarea.
     * @param {string} val - The new name to set.
     */
    set name(val) {
        this.textarea.name = val;
    }
}

// Register the custom element
customElements.define('ds-textarea', DsTextarea); 