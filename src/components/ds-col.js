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
import BaseComponent from './base-component.js';

class DsCol extends BaseComponent {
    constructor() {
        // ARIA config for ds-col (none required, but allow aria-label/aria-describedby)
        const ariaConfig = {
            staticAriaAttributes: {},
            dynamicAriaAttributes: [
                'aria-label',
                'aria-describedby'
            ],
            requiredAriaAttributes: [],
            referenceAttributes: ['aria-describedby'],
        };
        
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                @import url('/src/styles/styles.css');
                :host {
                    display: block; /* Custom elements are inline by default */
                }
                .col-container {
                    display: flex; /* Make it a flex container for its own children */
                    flex-direction: column;
                }
            </style>
            <div class="col-container">
                <slot></slot>
            </div>
        `;
        
        super({
            template: template.innerHTML,
            targetSelector: '.col-container',
            ariaConfig,
            events: [],
            observedAttributes: [
                'flex-grow', 'flex-shrink', 'flex-basis', 'align-self', 'order',
                'justify-content', 'align-items', 'gap', 'wrap',
                'aria-label', 'aria-describedby'
            ]
        });
        
        this.colContainer = this.shadowRoot.querySelector('.col-container');
    }
    
    static get observedAttributes() {
        return [
            'flex-grow', 'flex-shrink', 'flex-basis', 'align-self', 'order',
            'justify-content', 'align-items', 'gap', 'wrap',
            'aria-label', 'aria-describedby'
        ];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (oldValue === newValue) return;
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
                if (this.hasAttribute('wrap')) {
                    this.colContainer.style.flexWrap = 'wrap';
                } else {
                    this.colContainer.style.flexWrap = 'nowrap';
                }
                break;
        }
    }
    // ARIA property accessors
    get ariaLabel() { 
        const value = this.colContainer.getAttribute('aria-label');
        return value === null ? null : value;
    }
    set ariaLabel(val) { 
        if (val === null || val === undefined) {
            this.colContainer.removeAttribute('aria-label');
        } else {
            this.colContainer.setAttribute('aria-label', val);
        }
    }
    get ariaDescribedBy() { 
        const value = this.colContainer.getAttribute('aria-describedby');
        return value === null ? null : value;
    }
    set ariaDescribedBy(val) { 
        if (val === null || val === undefined) {
            this.colContainer.removeAttribute('aria-describedby');
        } else {
            this.colContainer.setAttribute('aria-describedby', val);
        }
    }
    // Optionally override validateARIA if needed
}

// Register the custom element
customElements.define('ds-col', DsCol); 