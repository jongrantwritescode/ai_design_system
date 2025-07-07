/**
 * @file ds-legend.js
 * @summary A custom Web Component that wraps a native `<legend>` element.
 * @description
 * The `ds-legend` component provides a styled and functional legend element
 * for providing a caption or title for a fieldset. It should be used within
 * `<ds-fieldset>` components to describe the group of form controls.
 *
 * @element ds-legend
 * @extends BaseComponent
 *
 * @slot - Renders the legend text content.
 *
 * @example
 * <!-- Basic legend within fieldset -->
 * <ds-fieldset>
 *   <ds-legend>Contact Information</ds-legend>
 *   <ds-label for="email">Email</ds-label>
 *   <ds-text-input type="email" id="email" name="email"></ds-text-input>
 * </ds-fieldset>
 *
 * @example
 * <!-- Legend with form controls -->
 * <ds-fieldset>
 *   <ds-legend>Shipping Address</ds-legend>
 *   <ds-label for="street">Street Address</ds-label>
 *   <ds-text-input id="street" name="street"></ds-text-input>
 *   <ds-label for="city">City</ds-label>
 *   <ds-text-input id="city" name="city"></ds-text-input>
 *   <ds-label for="zip">ZIP Code</ds-label>
 *   <ds-text-input id="zip" name="zip"></ds-text-input>
 * </ds-fieldset>
 *
 * @example
 * <!-- Legend with radio button group -->
 * <ds-fieldset>
 *   <ds-legend>Preferred Contact Method</ds-legend>
 *   <ds-radio name="contact" value="email" id="contact-email">Email</ds-radio>
 *   <ds-radio name="contact" value="phone" id="contact-phone">Phone</ds-radio>
 *   <ds-radio name="contact" value="mail" id="contact-mail">Mail</ds-radio>
 * </ds-fieldset>
 */
import BaseComponent from './base-component.js';

class DsLegend extends BaseComponent {
    constructor() {
        // ARIA config for ds-legend
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
                    display: block;
                }
                
                .wrapper {
                    width: 100%;
                }
            </style>
            <div class="wrapper">
                <legend part="legend">
                    <slot></slot>
                </legend>
            </div>
        `;
        
        super({
            template: template.innerHTML,
            targetSelector: 'legend',
            ariaConfig,
            events: [],
            observedAttributes: []
        });
        
        this.legend = this.shadowRoot.querySelector('legend');
    }
    
    static get observedAttributes() {
        return ['aria-label', 'aria-describedby'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (oldValue === newValue) return;
    }
    // ARIA property accessors
    get ariaLabel() { 
        const value = this.legend.getAttribute('aria-label');
        return value === null ? null : value;
    }
    set ariaLabel(val) { 
        if (val === null || val === undefined) {
            this.legend.removeAttribute('aria-label');
        } else {
            this.legend.setAttribute('aria-label', val);
        }
    }
    get ariaDescribedBy() { 
        const value = this.legend.getAttribute('aria-describedby');
        return value === null ? null : value;
    }
    set ariaDescribedBy(val) { 
        if (val === null || val === undefined) {
            this.legend.removeAttribute('aria-describedby');
        } else {
            this.legend.setAttribute('aria-describedby', val);
        }
    }
    // Override validateARIA for legend-specific checks
    validateARIA() {
        const errors = super.validateARIA ? super.validateARIA() : [];
        // Accessible name check: must have text or aria-label
        const legendText = this.textContent.trim();
        const ariaLabel = this.legend.getAttribute('aria-label');
        if (!legendText && !ariaLabel) {
            errors.push('Legend has no accessible name (text or aria-label required)');
        }
        return errors;
    }
}

// Register the custom element
customElements.define('ds-legend', DsLegend);

// Export for use in other modules
export default DsLegend; 