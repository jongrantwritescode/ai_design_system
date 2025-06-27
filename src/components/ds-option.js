/**
 * @file ds-option.js
 * @summary A custom Web Component that wraps a native `<option>` element.
 * @description
 * The `ds-option` component provides a styled and functional option element
 * for use within `<ds-select>` components. It maintains proper option behavior
 * and can be used as an alternative to native `<option>` elements.
 *
 * @element ds-option
 * @extends BaseComponent
 *
 * @attr {string} value - The value of the option when selected.
 * @attr {boolean} disabled - If present, the option cannot be selected.
 * @attr {boolean} selected - If present, the option is pre-selected.
 *
 * @property {string} value - Gets or sets the value of the option.
 * @property {boolean} selected - Gets or sets the selected state of the option.
 * @property {boolean} disabled - Gets or sets the disabled state of the option.
 *
 * @fires change - Fired when the option selection changes.
 *
 * @slot - Renders the option text content.
 *
 * @example
 * <!-- Basic option -->
 * <ds-option value="option1">Option 1</ds-option>
 *
 * @example
 * <!-- Pre-selected option -->
 * <ds-option value="default" selected>Default Option</ds-option>
 *
 * @example
 * <!-- Disabled option -->
 * <ds-option value="disabled" disabled>Disabled Option</ds-option>
 *
 * @example
 * <!-- Usage within ds-select -->
 * <ds-select name="category">
 *   <ds-option value="electronics">Electronics</ds-option>
 *   <ds-option value="clothing">Clothing</ds-option>
 *   <ds-option value="books">Books</ds-option>
 * </ds-select>
 */
class DsOption extends BaseComponent {
    constructor() {
        super();
        
        // Define the template with internal markup and styles
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                @import url('/src/design_system/styles.css');
                
                :host {
                    display: none; /* Hidden by default, shown when slotted into select */
                }
            </style>
            <div>
                <option part="option">
                    <slot></slot>
                </option>
            </div>
        `;
        
        // Set up the component with template and observed attributes
        this.setupComponent(template, ['value', 'disabled', 'selected']);
        
        // Store reference to the internal option for attribute changes
        this.option = this.shadowRoot.querySelector('option');
        
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
                this.option.value = newValue || '';
                break;
                
            case 'disabled':
                if (this.hasAttribute('disabled')) {
                    this.option.disabled = true;
                } else {
                    this.option.disabled = false;
                }
                break;
                
            case 'selected':
                if (this.hasAttribute('selected')) {
                    this.option.selected = true;
                } else {
                    this.option.selected = false;
                }
                break;
        }
    }
    
    /**
     * Sets up event listeners for the option.
     */
    setupEventListeners() {
        // Options don't typically have interactive events, but we can listen for changes
        this.option.addEventListener('change', (event) => {
            const newEvent = new Event('change', {
                bubbles: true,
                composed: true,
                cancelable: true
            });
            this.dispatchEvent(newEvent);
        });
    }
    
    /**
     * Gets the value of the option.
     * @returns {string} The option's value.
     */
    get value() {
        return this.option.value;
    }
    
    /**
     * Sets the value of the option.
     * @param {string} val - The new value to set.
     */
    set value(val) {
        this.option.value = val;
    }
    
    /**
     * Gets the selected state of the option.
     * @returns {boolean} Whether the option is selected.
     */
    get selected() {
        return this.option.selected;
    }
    
    /**
     * Sets the selected state of the option.
     * @param {boolean} val - Whether to select the option.
     */
    set selected(val) {
        this.option.selected = val;
    }
    
    /**
     * Gets the disabled state of the option.
     * @returns {boolean} Whether the option is disabled.
     */
    get disabled() {
        return this.option.disabled;
    }
    
    /**
     * Sets the disabled state of the option.
     * @param {boolean} val - Whether to disable the option.
     */
    set disabled(val) {
        this.option.disabled = val;
    }
}

// Register the custom element
customElements.define('ds-option', DsOption); 