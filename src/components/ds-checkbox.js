/**
 * ds-checkbox - A checkbox component that wraps native checkbox input elements
 */
class DsCheckbox extends HTMLElement {
    constructor() {
        super();
        
        // Attach shadow root with open mode for experimentation
        const shadowRoot = this.attachShadow({ mode: 'open' });
        
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
                <input type="checkbox" id="checkbox" part="checkbox">
                <slot></slot>
            </div>
        `;
        
        // Append the template's content to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to the internal checkbox for attribute changes
        this.checkbox = shadowRoot.querySelector('input[type="checkbox"]');
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Define which attributes should trigger attributeChangedCallback
     */
    static get observedAttributes() {
        return ['name', 'value', 'checked', 'disabled', 'readonly', 'required', 'id'];
    }
    
    /**
     * React to attribute changes and apply corresponding properties to the internal checkbox
     */
    attributeChangedCallback(name, oldValue, newValue) {
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
     * Set up event listeners to re-dispatch events from the host element
     */
    setupEventListeners() {
        const events = ['change', 'focus', 'blur'];
        
        events.forEach(eventType => {
            this.checkbox.addEventListener(eventType, (event) => {
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
     * Property getters and setters to mirror the internal checkbox
     */
    get checked() {
        return this.checkbox.checked;
    }
    
    set checked(val) {
        this.checkbox.checked = val;
    }
    
    get value() {
        return this.checkbox.value;
    }
    
    set value(val) {
        this.checkbox.value = val;
    }
    
    get name() {
        return this.checkbox.name;
    }
    
    set name(val) {
        this.checkbox.name = val;
    }
    
    get disabled() {
        return this.checkbox.disabled;
    }
    
    set disabled(val) {
        this.checkbox.disabled = val;
    }
    
    get readonly() {
        return this.checkbox.readOnly;
    }
    
    set readonly(val) {
        this.checkbox.readOnly = val;
    }
    
    get required() {
        return this.checkbox.required;
    }
    
    set required(val) {
        this.checkbox.required = val;
    }
    
    /**
     * Called when the element is connected to the DOM
     * Apply initial attributes
     */
    connectedCallback() {
        // Apply initial attributes
        this.attributeChangedCallback('name', null, this.getAttribute('name'));
        this.attributeChangedCallback('value', null, this.getAttribute('value'));
        this.attributeChangedCallback('checked', null, this.getAttribute('checked'));
        this.attributeChangedCallback('disabled', null, this.getAttribute('disabled'));
        this.attributeChangedCallback('readonly', null, this.getAttribute('readonly'));
        this.attributeChangedCallback('required', null, this.getAttribute('required'));
        this.attributeChangedCallback('id', null, this.getAttribute('id'));
    }
}

// Register the custom element
customElements.define('ds-checkbox', DsCheckbox); 