/**
 * ds-col - A Flexbox item that can also act as a Flexbox container for vertical layouts
 * Observable attributes: flex-grow, flex-shrink, flex-basis, align-self, order (flex item properties)
 *                      justify-content, align-items, gap, wrap (flex container properties)
 */
class DsCol extends HTMLElement {
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
                    /* Flex item properties will be applied by ds-row parent's context */
                }
                
                .col-container {
                    display: flex; /* Make it a flex container for its own children */
                    flex-direction: column;
                    /* Default flex-wrap for its own children */
                }
            </style>
            <div class="col-container">
                <slot></slot>
            </div>
        `;
        
        // Append the template's content to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to the internal container for attribute changes
        this.colContainer = shadowRoot.querySelector('.col-container');
    }
    
    /**
     * Define which attributes should trigger attributeChangedCallback
     */
    static get observedAttributes() {
        return [
            // Flex Item Properties (applied to :host)
            'flex-grow', 'flex-shrink', 'flex-basis', 'align-self', 'order',
            // Flex Container Properties (applied to .col-container)
            'justify-content', 'align-items', 'gap', 'wrap'
        ];
    }
    
    /**
     * React to attribute changes and apply corresponding styles
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return; // No change
        
        switch (name) {
            // Flex Item Properties (applied to :host)
            case 'flex-grow':
                this.style.flexGrow = newValue || '';
                break;
                
            case 'flex-shrink':
                this.style.flexShrink = newValue || '';
                break;
                
            case 'flex-basis':
                this.style.flexBasis = newValue || '';
                break;
                
            case 'align-self':
                this.style.alignSelf = newValue || '';
                break;
                
            case 'order':
                this.style.order = newValue || '';
                break;
                
            // Flex Container Properties (applied to .col-container)
            case 'justify-content':
                this.colContainer.style.justifyContent = newValue || '';
                break;
                
            case 'align-items':
                this.colContainer.style.alignItems = newValue || '';
                break;
                
            case 'gap':
                this.colContainer.style.gap = newValue || '';
                break;
                
            case 'wrap':
                // Boolean attribute - check if present
                if (this.hasAttribute('wrap')) {
                    this.colContainer.style.flexWrap = 'wrap';
                } else {
                    this.colContainer.style.flexWrap = 'nowrap';
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
        this.attributeChangedCallback('flex-grow', null, this.getAttribute('flex-grow'));
        this.attributeChangedCallback('flex-shrink', null, this.getAttribute('flex-shrink'));
        this.attributeChangedCallback('flex-basis', null, this.getAttribute('flex-basis'));
        this.attributeChangedCallback('align-self', null, this.getAttribute('align-self'));
        this.attributeChangedCallback('order', null, this.getAttribute('order'));
        this.attributeChangedCallback('justify-content', null, this.getAttribute('justify-content'));
        this.attributeChangedCallback('align-items', null, this.getAttribute('align-items'));
        this.attributeChangedCallback('gap', null, this.getAttribute('gap'));
        this.attributeChangedCallback('wrap', null, this.getAttribute('wrap'));
    }
}

// Register the custom element
customElements.define('ds-col', DsCol); 