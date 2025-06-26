/**
 * @file ds-legend.js
 * @summary A custom Web Component that wraps a native `<legend>` element.
 * @description
 * The `ds-legend` component provides a styled and functional legend element
 * for providing a caption or title for a fieldset. It should be used within
 * `<ds-fieldset>` components to describe the group of form controls.
 *
 * @element ds-legend
 * @extends HTMLElement
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
class DsLegend extends HTMLElement {
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
                <legend part="legend">
                    <slot></slot>
                </legend>
            </div>
        `;
        
        // Append the template's content to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to the internal legend for attribute changes
        this.legend = shadowRoot.querySelector('legend');
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Defines which attributes the component observes for changes.
     * @returns {Array<string>} An array of attribute names to observe.
     */
    static get observedAttributes() {
        return []; // No specific attributes for legend
    }
    
    /**
     * Sets up event listeners for the legend.
     */
    setupEventListeners() {
        // Legends don't typically have interactive events
        // But we can listen for form-related events if needed
    }
    
    /**
     * Called when the element is connected to the DOM.
     * Applies any initial setup if needed.
     */
    connectedCallback() {
        // No specific initialization needed for legend
        // It's designed to be a simple wrapper
    }
}

// Register the custom element
customElements.define('ds-legend', DsLegend); 