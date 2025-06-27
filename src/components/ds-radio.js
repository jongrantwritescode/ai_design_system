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
class DsRadio extends BaseComponent {
    constructor() {
        super();
        
        // Define the template with internal markup and styles
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
        
        // Set up the component with template and observed attributes
        this.setupComponent(template, ['name', 'value', 'checked', 'disabled', 'readonly', 'required', 'id']);
        
        // Store reference to the internal radio for attribute changes
        this.radio = this.shadowRoot.querySelector('input[type="radio"]');
        
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
     * Sets up event listeners to re-dispatch events from the host element.
     */
    setupEventListeners() {
        const events = ['change', 'focus', 'blur'];
        
        events.forEach(eventType => {
            this.radio.addEventListener(eventType, (event) => {
                // Create a new event to dispatch from the host
                const newEvent = new Event(eventType, {
                    bubbles: true,
                    composed: true,
                    cancelable: true
                });
                
                // Copy relevant properties
                if (eventType === 'change') {
                    newEvent.target = this;
                    newEvent.currentTarget = this;
                }
                
                this.dispatchEvent(newEvent);
            });
        });
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
}

// Register the custom element
customElements.define('ds-radio', DsRadio); 