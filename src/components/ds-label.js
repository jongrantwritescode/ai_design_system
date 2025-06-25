/**
 * ds-label - A label component that wraps native label elements
 * Supports for/id association patterns
 */
class DsLabel extends HTMLElement {
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
                <label part="label">
                    <slot></slot>
                </label>
            </div>
        `;
        
        // Append the template's content to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to the internal label for attribute changes
        this.label = shadowRoot.querySelector('label');
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Define which attributes should trigger attributeChangedCallback
     */
    static get observedAttributes() {
        return ['for'];
    }
    
    /**
     * React to attribute changes and apply corresponding properties to the internal label
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return; // No change
        
        switch (name) {
            case 'for':
                this.label.setAttribute('for', newValue || '');
                break;
        }
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Labels don't typically have interactive events, but we can listen for clicks
        this.label.addEventListener('click', (event) => {
            const newEvent = new Event('click', {
                bubbles: true,
                composed: true,
                cancelable: true
            });
            this.dispatchEvent(newEvent);
        });
    }
    
    /**
     * Property getters and setters to mirror the internal label
     */
    get htmlFor() {
        return this.label.htmlFor;
    }
    
    set htmlFor(val) {
        this.label.htmlFor = val;
    }
    
    /**
     * Called when the element is connected to the DOM
     * Apply initial attributes
     */
    connectedCallback() {
        // Apply initial attributes
        this.attributeChangedCallback('for', null, this.getAttribute('for'));
    }
}

// Register the custom element
customElements.define('ds-label', DsLabel); 