/**
 * @file ds-row.js
 * @summary A custom Web Component for a Flexbox container for horizontal layouts.
 * @description
 * The `ds-row` component provides a flexible container for arranging items in a row.
 * It leverages CSS Flexbox properties, exposing them as attributes for easy configuration.
 *
 * @element ds-row
 * @extends BaseComponent
 *
 * @attr {string} justify-content - Aligns content along the main axis. Accepts CSS `justify-content` values (e.g., `flex-start`, `center`, `space-between`).
 * @attr {string} align-items - Aligns content along the cross axis. Accepts CSS `align-items` values (e.g., `stretch`, `center`, `flex-end`).
 * @attr {string} gap - Sets the spacing between flex items (e.g., "16px", "1rem").
 * @attr {boolean} wrap - If present, sets `flex-wrap: wrap;` allowing items to wrap onto multiple lines.
 *
 * @slot - Renders child elements inside the row container.
 *
 * @example
 * <!-- A basic row with default alignment and spacing -->
 * <ds-row>
 * <div>Item 1</div>
 * <div>Item 2</div>
 * </ds-row>
 *
 * @example
 * <!-- A row with items centered and a specific gap -->
 * <ds-row justify-content="center" align-items="center" gap="20px">
 * <div>Centered Item A</div>
 * <div>Centered Item B</div>
 * </ds-row>
 *
 * @example
 * <!-- A wrapping row with space between items -->
 * <ds-row justify-content="space-between" wrap>
 * <div>Long Item 1</div>
 * <div>Item 2</div>
 * <div>Another Item 3</div>
 * <div>Short Item 4</div>
 * </ds-row>
 */
class DsRow extends BaseComponent {
    constructor() {
        super();
        
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
        
        // Set up the component with template and observed attributes
        this.setupComponent(template, ['justify-content', 'align-items', 'gap', 'wrap']);
        
        // Store reference to the internal container for attribute changes
        this.rowContainer = this.shadowRoot.querySelector('.row-container');
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
}

// Register the custom element
customElements.define('ds-row', DsRow); 