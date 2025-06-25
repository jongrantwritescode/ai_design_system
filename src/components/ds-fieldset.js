/**
 * ds-fieldset - A fieldset component that wraps native fieldset elements
 * Used for grouping form elements
 */
class DsFieldset extends HTMLElement {
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
                <fieldset part="fieldset">
                    <slot></slot>
                </fieldset>
            </div>
        `;
        
        // Append the template's content to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to the internal fieldset for attribute changes
        this.fieldset = shadowRoot.querySelector('fieldset');
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Define which attributes should trigger attributeChangedCallback
     */
    static get observedAttributes() {
        return []; // No specific attributes for fieldset
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Fieldsets don't typically have interactive events
        // But we can listen for form-related events if needed
    }
    
    /**
     * Called when the element is connected to the DOM
     * Apply any initial setup if needed
     */
    connectedCallback() {
        // No specific initialization needed for fieldset
        // It's designed to be a simple wrapper
    }
}

// Register the custom element
customElements.define('ds-fieldset', DsFieldset); 