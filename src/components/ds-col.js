/**
 * @file ds-col.js
 * @summary A custom Web Component for a Flexbox item that can also act as a Flexbox container for vertical layouts.
 * @description
 * The `ds-col` component serves dual purposes: as a flex item within a row and as a flex container for its own children.
 * It exposes both flex item properties (for positioning within parent rows) and flex container properties (for its own children).
 *
 * @element ds-col
 * @extends BaseComponent
 *
 * @attr {string} flex-grow - Controls how much the item can grow relative to other flex items. Accepts CSS `flex-grow` values.
 * @attr {string} flex-shrink - Controls how much the item can shrink relative to other flex items. Accepts CSS `flex-shrink` values.
 * @attr {string} flex-basis - Sets the initial main size of the flex item. Accepts CSS `flex-basis` values (e.g., "200px", "50%").
 * @attr {string} align-self - Overrides the parent's align-items value for this item. Accepts CSS `align-self` values.
 * @attr {string} order - Controls the order of the flex item. Accepts CSS `order` values.
 * @attr {string} justify-content - Aligns content along the main axis of the column. Accepts CSS `justify-content` values.
 * @attr {string} align-items - Aligns content along the cross axis of the column. Accepts CSS `align-items` values.
 * @attr {string} gap - Sets the spacing between flex items within the column. Accepts CSS `gap` values.
 * @attr {boolean} wrap - If present, allows items within the column to wrap onto multiple lines.
 *
 * @slot - Renders child elements inside the column container.
 *
 * @example
 * <!-- A basic column with default flex properties -->
 * <ds-row>
 *   <ds-col>
 *     <div>Content 1</div>
 *     <div>Content 2</div>
 *   </ds-col>
 * </ds-row>
 *
 * @example
 * <!-- A column that takes up 2/3 of available space with centered content -->
 * <ds-row>
 *   <ds-col flex-grow="2" justify-content="center" align-items="center">
 *     <div>Main Content</div>
 *   </ds-col>
 *   <ds-col flex-grow="1">
 *     <div>Sidebar</div>
 *   </ds-col>
 * </ds-row>
 *
 * @example
 * <!-- A column with specific width and gap between items -->
 * <ds-col flex-basis="300px" gap="16px">
 *   <div>Item A</div>
 *   <div>Item B</div>
 *   <div>Item C</div>
 * </ds-col>
 */
class DsCol extends BaseComponent {
    constructor() {
        super();
        
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
        
        // Set up the component with template and observed attributes
        this.setupComponent(template, [
            // Flex Item Properties (applied to :host)
            'flex-grow', 'flex-shrink', 'flex-basis', 'align-self', 'order',
            // Flex Container Properties (applied to .col-container)
            'justify-content', 'align-items', 'gap', 'wrap'
        ]);
        
        // Store reference to the internal container for attribute changes
        this.colContainer = this.shadowRoot.querySelector('.col-container');
    }
    
    /**
     * Called when one of the component's observed attributes is added, removed, or changed.
     * @param {string} name - The name of the attribute that changed.
     * @param {string|null} oldValue - The attribute's old value.
     * @param {string|null} newValue - The attribute's new value.
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
}

// Register the custom element
customElements.define('ds-col', DsCol); 