/**
 * ds-page - A consistent wrapper around application content, handling page-level layout and margins
 * No specific observable attributes beyond standard HTML attributes
 */
class DsPage extends HTMLElement {
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
                    display: block; /* Custom elements are inline by default */
                    width: 100%;
                    min-height: 100vh; /* Ensures it takes full viewport height */
                    box-sizing: border-box; /* Include padding/border in element's total width/height */
                }
                
                .page-container {
                    display: flex; /* Makes the main element a flex container for its children */
                    flex-direction: column; /* Stacks children vertically by default */
                    width: 100%;
                    padding: var(--ds-spacing-page-padding, 20px); /* Default padding, can be overridden by CSS variable */
                    margin: 0 auto; /* Center content if width is limited */
                    max-width: var(--ds-page-max-width, 1200px); /* Optional max-width for content */
                }
            </style>
            <main class="page-container">
                <slot></slot>
            </main>
        `;
        
        // Append the template's content to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to the internal container
        this.pageContainer = shadowRoot.querySelector('.page-container');
    }
    
    /**
     * No specific observable attributes for ds-page
     * It's designed to be a simple, opinionated page wrapper
     */
    static get observedAttributes() {
        return []; // No specific attributes to observe
    }
    
    /**
     * Called when the element is connected to the DOM
     * Apply any initial setup if needed
     */
    connectedCallback() {
        // No specific initialization needed for ds-page
        // It's designed to be a simple wrapper
    }
}

// Register the custom element
customElements.define('ds-page', DsPage); 