/**
 * ds-option - An option component that wraps native option elements
 * Primarily used inside ds-select components
 */
class DsOption extends HTMLElement {
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
                    display: none; /* Hidden by default, shown when slotted into select */
                }
            </style>
            <div>
                <option part="option">
                    <slot></slot>
                </option>
            </div>
        `;
        
        // Append the template's content to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to the internal option for attribute changes
        this.option = shadowRoot.querySelector('option');
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Define which attributes should trigger attributeChangedCallback
     */
    static get observedAttributes() {
        return ['value', 'disabled', 'selected'];
    }
    
    /**
     * React to attribute changes and apply corresponding properties to the internal option
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
     * Set up event listeners
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
     * Property getters and setters to mirror the internal option
     */
    get value() {
        return this.option.value;
    }
    
    set value(val) {
        this.option.value = val;
    }
    
    get selected() {
        return this.option.selected;
    }
    
    set selected(val) {
        this.option.selected = val;
    }
    
    get disabled() {
        return this.option.disabled;
    }
    
    set disabled(val) {
        this.option.disabled = val;
    }
    
    /**
     * Called when the element is connected to the DOM
     * Apply initial attributes
     */
    connectedCallback() {
        // Apply initial attributes
        this.attributeChangedCallback('value', null, this.getAttribute('value'));
        this.attributeChangedCallback('disabled', null, this.getAttribute('disabled'));
        this.attributeChangedCallback('selected', null, this.getAttribute('selected'));
    }
}

// Register the custom element
customElements.define('ds-option', DsOption); 