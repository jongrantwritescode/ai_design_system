/**
 * ds-textarea - A textarea component that wraps native textarea elements
 */
class DsTextarea extends HTMLElement {
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
                <textarea id="textarea" part="textarea">
                    <slot></slot>
                </textarea>
            </div>
        `;
        
        // Append the template's content to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to the internal textarea for attribute changes
        this.textarea = shadowRoot.querySelector('textarea');
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Define which attributes should trigger attributeChangedCallback
     */
    static get observedAttributes() {
        return ['value', 'placeholder', 'rows', 'cols', 'disabled', 'readonly', 'required', 'name', 'id'];
    }
    
    /**
     * React to attribute changes and apply corresponding properties to the internal textarea
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
     * Set up event listeners to re-dispatch events from the host element
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
     * Property getters and setters to mirror the internal textarea
     */
    get value() {
        return this.textarea.value;
    }
    
    set value(val) {
        this.textarea.value = val;
    }
    
    get placeholder() {
        return this.textarea.placeholder;
    }
    
    set placeholder(val) {
        this.textarea.placeholder = val;
    }
    
    get rows() {
        return this.textarea.rows;
    }
    
    set rows(val) {
        this.textarea.rows = val;
    }
    
    get cols() {
        return this.textarea.cols;
    }
    
    set cols(val) {
        this.textarea.cols = val;
    }
    
    get disabled() {
        return this.textarea.disabled;
    }
    
    set disabled(val) {
        this.textarea.disabled = val;
    }
    
    get readonly() {
        return this.textarea.readOnly;
    }
    
    set readonly(val) {
        this.textarea.readOnly = val;
    }
    
    get required() {
        return this.textarea.required;
    }
    
    set required(val) {
        this.textarea.required = val;
    }
    
    get name() {
        return this.textarea.name;
    }
    
    set name(val) {
        this.textarea.name = val;
    }
    
    /**
     * Called when the element is connected to the DOM
     * Apply initial attributes
     */
    connectedCallback() {
        // Apply initial attributes
        this.attributeChangedCallback('value', null, this.getAttribute('value'));
        this.attributeChangedCallback('placeholder', null, this.getAttribute('placeholder'));
        this.attributeChangedCallback('rows', null, this.getAttribute('rows'));
        this.attributeChangedCallback('cols', null, this.getAttribute('cols'));
        this.attributeChangedCallback('disabled', null, this.getAttribute('disabled'));
        this.attributeChangedCallback('readonly', null, this.getAttribute('readonly'));
        this.attributeChangedCallback('required', null, this.getAttribute('required'));
        this.attributeChangedCallback('name', null, this.getAttribute('name'));
        this.attributeChangedCallback('id', null, this.getAttribute('id'));
    }
}

// Register the custom element
customElements.define('ds-textarea', DsTextarea); 