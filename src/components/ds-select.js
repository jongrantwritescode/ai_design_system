/**
 * @file ds-select.js
 * @summary A custom Web Component that wraps a native `<select>` element.
 * @description
 * The `ds-select` component provides a styled and functional select dropdown.
 * It supports both single and multiple selection, and can work with both native
 * `<option>` elements and custom `<ds-option>` components.
 *
 * @element ds-select
 * @extends BaseComponent
 *
 * @attr {string} value - The currently selected option's value.
 * @attr {boolean} disabled - If present, the select cannot be interacted with.
 * @attr {boolean} required - If present, a selection must be made before form submission.
 * @attr {string} name - The name of the select, used when submitting form data.
 * @attr {boolean} multiple - If present, allows multiple options to be selected.
 * @attr {string} size - The number of visible options in the dropdown (for multiple selection).
 *
 * @property {string} value - Gets or sets the currently selected option's value.
 * @property {boolean} disabled - Gets or sets the disabled state of the select.
 * @property {boolean} required - Gets or sets the required state of the select.
 * @property {string} name - Gets or sets the name of the select.
 * @property {boolean} multiple - Gets or sets the multiple selection state.
 * @property {number} size - Gets or sets the number of visible options.
 *
 * @fires change - Fired when the selection changes.
 * @fires focus - Fired when the select receives focus.
 * @fires blur - Fired when the select loses focus.
 *
 * @slot - Renders `<option>` or `<ds-option>` elements as select options.
 *
 * @example
 * <!-- Basic select with native options -->
 * <ds-select name="country">
 *   <option value="us">United States</option>
 *   <option value="ca">Canada</option>
 *   <option value="uk">United Kingdom</option>
 * </ds-select>
 *
 * @example
 * <!-- Select with custom ds-option components -->
 * <ds-select name="category" required>
 *   <ds-option value="electronics">Electronics</ds-option>
 *   <ds-option value="clothing">Clothing</ds-option>
 *   <ds-option value="books">Books</ds-option>
 * </ds-select>
 *
 * @example
 * <!-- Multiple selection select -->
 * <ds-select name="interests" multiple size="4">
 *   <ds-option value="sports">Sports</ds-option>
 *   <ds-option value="music">Music</ds-option>
 *   <ds-option value="reading">Reading</ds-option>
 *   <ds-option value="travel">Travel</ds-option>
 * </ds-select>
 */
class DsSelect extends BaseComponent {
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
                <select id="select" part="select">
                    <slot></slot>
                </select>
            </div>
        `;
        
        // Set up the component with template and observed attributes
        this.setupComponent(template, ['value', 'disabled', 'required', 'name', 'multiple', 'size']);
        
        // Store reference to the internal select for attribute changes
        this.select = this.shadowRoot.querySelector('select');
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Set up slot change listener to handle option projection
        this.setupSlotListener();
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
                this.select.value = newValue || '';
                break;
                
            case 'disabled':
                if (this.hasAttribute('disabled')) {
                    this.select.disabled = true;
                } else {
                    this.select.disabled = false;
                }
                break;
                
            case 'required':
                if (this.hasAttribute('required')) {
                    this.select.required = true;
                } else {
                    this.select.required = false;
                }
                break;
                
            case 'name':
                this.select.name = newValue || '';
                break;
                
            case 'multiple':
                if (this.hasAttribute('multiple')) {
                    this.select.multiple = true;
                } else {
                    this.select.multiple = false;
                }
                break;
                
            case 'size':
                this.select.size = newValue || '';
                break;
        }
    }
    
    /**
     * Sets up event listeners to re-dispatch events from the host element.
     */
    setupEventListeners() {
        const events = ['change', 'focus', 'blur'];
        
        events.forEach(eventType => {
            this.select.addEventListener(eventType, (event) => {
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
     * Sets up slot listener to handle option projection.
     */
    setupSlotListener() {
        const slot = this.shadowRoot.querySelector('slot');
        slot.addEventListener('slotchange', () => {
            this.handleSlotChange();
        });
    }
    
    /**
     * Handles slot changes to project ds-option components into the select.
     */
    handleSlotChange() {
        const slot = this.shadowRoot.querySelector('slot');
        const assignedNodes = slot.assignedNodes();
        
        // Clear existing options
        this.select.innerHTML = '';
        
        // Process each assigned node
        assignedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === 'DS-OPTION') {
                    // Create a native option element
                    const option = document.createElement('option');
                    
                    // Copy attributes from ds-option
                    if (node.hasAttribute('value')) {
                        option.value = node.getAttribute('value');
                    }
                    if (node.hasAttribute('disabled')) {
                        option.disabled = true;
                    }
                    if (node.hasAttribute('selected')) {
                        option.selected = true;
                    }
                    
                    // Copy text content
                    option.textContent = node.textContent || node.innerText || '';
                    
                    this.select.appendChild(option);
                } else if (node.tagName === 'OPTION') {
                    // Direct option element, clone it
                    this.select.appendChild(node.cloneNode(true));
                }
            }
        });
    }
    
    /**
     * Gets the currently selected option's value.
     * @returns {string} The selected option's value.
     */
    get value() {
        return this.select.value;
    }
    
    /**
     * Sets the currently selected option's value.
     * @param {string} val - The value to select.
     */
    set value(val) {
        this.select.value = val;
    }
    
    /**
     * Gets the disabled state of the select.
     * @returns {boolean} Whether the select is disabled.
     */
    get disabled() {
        return this.select.disabled;
    }
    
    /**
     * Sets the disabled state of the select.
     * @param {boolean} val - Whether to disable the select.
     */
    set disabled(val) {
        this.select.disabled = val;
    }
    
    /**
     * Gets the required state of the select.
     * @returns {boolean} Whether the select is required.
     */
    get required() {
        return this.select.required;
    }
    
    /**
     * Sets the required state of the select.
     * @param {boolean} val - Whether to make the select required.
     */
    set required(val) {
        this.select.required = val;
    }
    
    /**
     * Gets the name of the select.
     * @returns {string} The select's name.
     */
    get name() {
        return this.select.name;
    }
    
    /**
     * Sets the name of the select.
     * @param {string} val - The new name to set.
     */
    set name(val) {
        this.select.name = val;
    }
    
    /**
     * Gets the multiple selection state.
     * @returns {boolean} Whether multiple selection is enabled.
     */
    get multiple() {
        return this.select.multiple;
    }
    
    /**
     * Sets the multiple selection state.
     * @param {boolean} val - Whether to enable multiple selection.
     */
    set multiple(val) {
        this.select.multiple = val;
    }
    
    /**
     * Gets the number of visible options.
     * @returns {number} The number of visible options.
     */
    get size() {
        return this.select.size;
    }
    
    /**
     * Sets the number of visible options.
     * @param {number} val - The number of visible options to set.
     */
    set size(val) {
        this.select.size = val;
    }
}

// Register the custom element
customElements.define('ds-select', DsSelect); 