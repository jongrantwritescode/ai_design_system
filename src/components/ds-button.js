/**
 * ds-button - A button component that wraps native button elements
 * Supports: submit, reset, button types
 */
class DsButton extends HTMLElement {
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
                    width: 100%;
                }
            </style>
            <div class="wrapper">
                <button part="button" type="button">
                    <slot></slot>
                </button>
            </div>
        `;
        
        // Append the template's content to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to the internal button for attribute changes
        this.button = shadowRoot.querySelector('button');
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Define which attributes should trigger attributeChangedCallback
     */
    static get observedAttributes() {
        return ['type', 'disabled', 'name', 'value', 'variant'];
    }
    
    /**
     * React to attribute changes and apply corresponding properties to the internal button
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
     * Set up event listeners to re-dispatch events from the host element
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
     * Property getters and setters to mirror the internal button
     */
    get type() {
        return this.button.type;
    }
    
    set type(val) {
        this.button.type = val;
    }
    
    get disabled() {
        return this.button.disabled;
    }
    
    set disabled(val) {
        this.button.disabled = val;
    }
    
    get name() {
        return this.button.name;
    }
    
    set name(val) {
        this.button.name = val;
    }
    
    get value() {
        return this.button.value;
    }
    
    set value(val) {
        this.button.value = val;
    }
    
    get variant() {
        return this.getAttribute('variant');
    }
    
    set variant(val) {
        if (val) {
            this.setAttribute('variant', val);
        } else {
            this.removeAttribute('variant');
        }
    }
    
    /**
     * Called when the element is connected to the DOM
     * Apply initial attributes
     */
    connectedCallback() {
        // Apply initial attributes
        this.attributeChangedCallback('type', null, this.getAttribute('type'));
        this.attributeChangedCallback('disabled', null, this.getAttribute('disabled'));
        this.attributeChangedCallback('name', null, this.getAttribute('name'));
        this.attributeChangedCallback('value', null, this.getAttribute('value'));
        this.attributeChangedCallback('variant', null, this.getAttribute('variant'));
    }
}

// Register the custom element
customElements.define('ds-button', DsButton); 