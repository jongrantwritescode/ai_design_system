/**
 * ds-row - A Flexbox container for horizontal layouts
 * Observable attributes: justify-content, align-items, gap, wrap
 */
class DsRow extends HTMLElement {
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
                }
                
                .row-container {
                    display: flex;
                    flex-direction: row;
                    /* Default flex-wrap will be controlled by attribute */
                }
            </style>
            <div class="row-container">
                <slot></slot>
            </div>
        `;
        
        // Append the template's content to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to the internal container for attribute changes
        this.rowContainer = shadowRoot.querySelector('.row-container');
    }
    
    /**
     * Define which attributes should trigger attributeChangedCallback
     */
    static get observedAttributes() {
        return ['justify-content', 'align-items', 'gap', 'wrap'];
    }
    
    /**
     * React to attribute changes and apply corresponding styles
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return; // No change
        
        switch (name) {
            case 'justify-content':
                this.rowContainer.style.justifyContent = newValue || '';
                break;
                
            case 'align-items':
                this.rowContainer.style.alignItems = newValue || '';
                break;
                
            case 'gap':
                this.rowContainer.style.gap = newValue || '';
                break;
                
            case 'wrap':
                // Boolean attribute - check if present
                if (this.hasAttribute('wrap')) {
                    this.rowContainer.style.flexWrap = 'wrap';
                } else {
                    this.rowContainer.style.flexWrap = 'nowrap';
                }
                break;
        }
    }
    
    /**
     * Called when the element is connected to the DOM
     * Apply initial styles based on current attributes
     */
    connectedCallback() {
        // Apply initial styles for all observed attributes
        this.attributeChangedCallback('justify-content', null, this.getAttribute('justify-content'));
        this.attributeChangedCallback('align-items', null, this.getAttribute('align-items'));
        this.attributeChangedCallback('gap', null, this.getAttribute('gap'));
        this.attributeChangedCallback('wrap', null, this.getAttribute('wrap'));
    }
}

// Register the custom element
customElements.define('ds-row', DsRow); 