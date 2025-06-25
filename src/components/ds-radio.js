/**
 * ds-radio - A radio button component that wraps native radio input elements
 */
class DsRadio extends HTMLElement {
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
                <input type="radio" id="radio" part="radio">
                <slot></slot>
            </div>
        `;
        
        // Append the template's content to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to the internal radio for attribute changes
        this.radio = shadowRoot.querySelector('input[type="radio"]');
        
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
     * React to attribute changes and apply corresponding properties to the internal radio
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
     * Set up event listeners to re-dispatch events from the host element
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
     * Property getters and setters to mirror the internal radio
     */
    get checked() {
        return this.radio.checked;
    }
    
    set checked(val) {
        this.radio.checked = val;
    }
    
    get value() {
        return this.radio.value;
    }
    
    set value(val) {
        this.radio.value = val;
    }
    
    get name() {
        return this.radio.name;
    }
    
    set name(val) {
        this.radio.name = val;
    }
    
    get disabled() {
        return this.radio.disabled;
    }
    
    set disabled(val) {
        this.radio.disabled = val;
    }
    
    get readonly() {
        return this.radio.readOnly;
    }
    
    set readonly(val) {
        this.radio.readOnly = val;
    }
    
    get required() {
        return this.radio.required;
    }
    
    set required(val) {
        this.radio.required = val;
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
customElements.define('ds-radio', DsRadio); 