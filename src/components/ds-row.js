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
import BaseComponent from './base-component.js';

class DsRow extends BaseComponent {
    constructor() {
        // ARIA config for ds-row (none required, but allow aria-label/aria-describedby)
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
                .row-container {
                    display: flex;
                    flex-direction: row;
                }
            </style>
            <div class="row-container">
                <slot></slot>
            </div>
        `;
        
        super({
            template: template.innerHTML,
            targetSelector: '.row-container',
            ariaConfig,
            events: [],
            observedAttributes: ['justify-content', 'align-items', 'gap', 'wrap']
        });
        
        this.rowContainer = this.shadowRoot.querySelector('.row-container');
    }
    
    static get observedAttributes() {
        return ['justify-content', 'align-items', 'gap', 'wrap', 'aria-label', 'aria-describedby'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (oldValue === newValue) return;
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
                if (this.hasAttribute('wrap')) {
                    this.rowContainer.style.flexWrap = 'wrap';
                } else {
                    this.rowContainer.style.flexWrap = 'nowrap';
                }
                break;
        }
    }
    // ARIA property accessors
    get ariaLabel() { 
        const value = this.rowContainer.getAttribute('aria-label');
        return value === null ? null : value;
    }
    set ariaLabel(val) { 
        if (val === null || val === undefined) {
            this.rowContainer.removeAttribute('aria-label');
        } else {
            this.rowContainer.setAttribute('aria-label', val);
        }
    }
    get ariaDescribedBy() { 
        const value = this.rowContainer.getAttribute('aria-describedby');
        return value === null ? null : value;
    }
    set ariaDescribedBy(val) { 
        if (val === null || val === undefined) {
            this.rowContainer.removeAttribute('aria-describedby');
        } else {
            this.rowContainer.setAttribute('aria-describedby', val);
        }
    }
    // Optionally override validateARIA if needed
}

// Register the custom element
customElements.define('ds-row', DsRow); 