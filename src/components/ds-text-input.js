/**
 * ds-text-input - A text input component that wraps native input elements
 * Supports: text, email, password, number, tel, url, search
 */
class DsTextInput extends HTMLElement {
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
        
        // Append the template's content to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to the internal input for attribute changes
        this.input = shadowRoot.querySelector('input');
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Define which attributes should trigger attributeChangedCallback
     */
    static get observedAttributes() {
        return ['type', 'value', 'placeholder', 'disabled', 'readonly', 'required', 'name', 'id', 'aria-label'];
    }
    
    /**
     * React to attribute changes and apply corresponding properties to the internal input
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
     * Set up event listeners to re-dispatch events from the host element
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
     * Property getters and setters to mirror the internal input
     */
    get value() {
        return this.input.value;
    }
    
    set value(val) {
        this.input.value = val;
    }
    
    get type() {
        return this.input.type;
    }
    
    set type(val) {
        this.input.type = val;
    }
    
    get disabled() {
        return this.input.disabled;
    }
    
    set disabled(val) {
        this.input.disabled = val;
    }
    
    get readonly() {
        return this.input.readOnly;
    }
    
    set readonly(val) {
        this.input.readOnly = val;
    }
    
    get required() {
        return this.input.required;
    }
    
    set required(val) {
        this.input.required = val;
    }
    
    /**
     * Called when the element is connected to the DOM
     * Apply initial attributes
     */
    connectedCallback() {
        // Apply initial attributes
        this.attributeChangedCallback('type', null, this.getAttribute('type'));
        this.attributeChangedCallback('value', null, this.getAttribute('value'));
        this.attributeChangedCallback('placeholder', null, this.getAttribute('placeholder'));
        this.attributeChangedCallback('disabled', null, this.getAttribute('disabled'));
        this.attributeChangedCallback('readonly', null, this.getAttribute('readonly'));
        this.attributeChangedCallback('required', null, this.getAttribute('required'));
        this.attributeChangedCallback('name', null, this.getAttribute('name'));
        this.attributeChangedCallback('id', null, this.getAttribute('id'));
        this.attributeChangedCallback('aria-label', null, this.getAttribute('aria-label'));
    }
}

// Register the custom element
customElements.define('ds-text-input', DsTextInput); 