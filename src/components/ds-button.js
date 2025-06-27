/**
 * @file ds-button.js
 * @summary A custom Web Component that wraps a native `<button>` element.
 * @description
 * The `ds-button` component provides a styled and functional button element.
 * It supports various button types and variants while maintaining accessibility
 * and proper event handling.
 *
 * @element ds-button
 * @extends BaseComponent
 *
 * @attr {string} [type="button"] - The type of button (e.g., `button`, `submit`, `reset`).
 * @attr {boolean} disabled - If present, the button cannot be interacted with.
 * @attr {string} name - The name of the button, used when submitting form data.
 * @attr {string} value - The value of the button, used when submitting form data.
 * @attr {string} [variant] - The visual variant of the button (e.g., `primary`, `secondary`, `danger`).
 *
 * @property {string} type - Gets or sets the type of the button.
 * @property {boolean} disabled - Gets or sets the disabled state of the button.
 * @property {string} name - Gets or sets the name of the button.
 * @property {string} value - Gets or sets the value of the button.
 * @property {string} variant - Gets or sets the variant of the button.
 *
 * @fires click - Fired when the button is clicked.
 * @fires focus - Fired when the button receives focus.
 * @fires blur - Fired when the button loses focus.
 *
 * @example
 * <!-- Basic button -->
 * <ds-button>Click me</ds-button>
 *
 * @example
 * <!-- Submit button with variant -->
 * <ds-button type="submit" variant="primary">Submit Form</ds-button>
 *
 * @example
 * <!-- Disabled button -->
 * <ds-button disabled variant="secondary">Disabled Button</ds-button>
 */
class DsButton extends BaseComponent {
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
                    width: 100%;
                }
            </style>
            <div class="wrapper">
                <button part="button" type="button">
                    <slot></slot>
                </button>
            </div>
        `;
        
        // Set up the component with template and observed attributes
        this.setupComponent(template, ['type', 'disabled', 'name', 'value', 'variant']);
        
        // Store reference to the internal button for attribute changes
        this.button = this.shadowRoot.querySelector('button');
        
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
                this.button.type = newValue || 'button';
                break;
                
            case 'disabled':
                if (this.hasAttribute('disabled')) {
                    this.button.disabled = true;
                } else {
                    this.button.disabled = false;
                }
                break;
                
            case 'name':
                this.button.name = newValue || '';
                break;
                
            case 'value':
                this.button.value = newValue || '';
                break;
                
            case 'variant':
                // Remove existing variant classes
                this.button.classList.remove('primary', 'secondary', 'danger');
                // Add new variant class if specified
                if (newValue) {
                    this.button.classList.add(newValue);
                }
                break;
        }
    }
    
    /**
     * Sets up event listeners to re-dispatch events from the host element.
     */
    setupEventListeners() {
        const events = ['click', 'focus', 'blur'];
        
        events.forEach(eventType => {
            this.button.addEventListener(eventType, (event) => {
                // Create a new event to dispatch from the host
                const newEvent = new Event(eventType, {
                    bubbles: true,
                    composed: true,
                    cancelable: true
                });
                
                this.dispatchEvent(newEvent);
            });
        });
    }
    
    /**
     * Gets the type of the button.
     * @returns {string} The button's type.
     */
    get type() {
        return this.button.type;
    }
    
    /**
     * Sets the type of the button.
     * @param {string} val - The new type to set.
     */
    set type(val) {
        this.button.type = val;
    }
    
    /**
     * Gets the disabled state of the button.
     * @returns {boolean} Whether the button is disabled.
     */
    get disabled() {
        return this.button.disabled;
    }
    
    /**
     * Sets the disabled state of the button.
     * @param {boolean} val - Whether to disable the button.
     */
    set disabled(val) {
        this.button.disabled = val;
    }
    
    /**
     * Gets the name of the button.
     * @returns {string} The button's name.
     */
    get name() {
        return this.button.name;
    }
    
    /**
     * Sets the name of the button.
     * @param {string} val - The new name to set.
     */
    set name(val) {
        this.button.name = val;
    }
    
    /**
     * Gets the value of the button.
     * @returns {string} The button's value.
     */
    get value() {
        return this.button.value;
    }
    
    /**
     * Sets the value of the button.
     * @param {string} val - The new value to set.
     */
    set value(val) {
        this.button.value = val;
    }
    
    /**
     * Gets the variant of the button.
     * @returns {string} The button's variant.
     */
    get variant() {
        return this.getAttribute('variant');
    }
    
    /**
     * Sets the variant of the button.
     * @param {string} val - The new variant to set.
     */
    set variant(val) {
        if (val) {
            this.setAttribute('variant', val);
        } else {
            this.removeAttribute('variant');
        }
    }
}

// Register the custom element
customElements.define('ds-button', DsButton); 