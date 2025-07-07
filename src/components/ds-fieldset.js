/**
 * @file ds-fieldset.js
 * @summary A custom Web Component that wraps a native `<fieldset>` element.
 * @description
 * The `ds-fieldset` component provides a styled and functional fieldset element
 * for grouping related form controls together. It creates a visual and semantic
 * grouping that improves form organization and accessibility.
 *
 * @element ds-fieldset
 * @extends BaseComponent
 *
 * @slot - Renders form controls and other content within the fieldset.
 *
 * @example
 * <!-- Basic fieldset -->
 * <ds-fieldset>
 *   <ds-legend>Personal Information</ds-legend>
 *   <ds-label for="first-name">First Name</ds-label>
 *   <ds-text-input id="first-name" name="firstName"></ds-text-input>
 *   <ds-label for="last-name">Last Name</ds-label>
 *   <ds-text-input id="last-name" name="lastName"></ds-text-input>
 * </ds-fieldset>
 *
 * @example
 * <!-- Fieldset with radio buttons -->
 * <ds-fieldset>
 *   <ds-legend>Gender</ds-legend>
 *   <ds-radio name="gender" value="male" id="male">Male</ds-radio>
 *   <ds-radio name="gender" value="female" id="female">Female</ds-radio>
 *   <ds-radio name="gender" value="other" id="other">Other</ds-radio>
 * </ds-fieldset>
 *
 * @example
 * <!-- Fieldset with checkboxes -->
 * <ds-fieldset>
 *   <ds-legend>Interests</ds-legend>
 *   <ds-checkbox name="interests" value="sports" id="sports">Sports</ds-checkbox>
 *   <ds-checkbox name="interests" value="music" id="music">Music</ds-checkbox>
 *   <ds-checkbox name="interests" value="reading" id="reading">Reading</ds-checkbox>
 * </ds-fieldset>
 */
import BaseComponent from './base-component.js';

class DsFieldset extends BaseComponent {
    constructor() {
        // ARIA config for ds-fieldset
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
                <fieldset part="fieldset">
                    <slot></slot>
                </fieldset>
            </div>
        `;
        
        super({
            template: template.innerHTML,
            targetSelector: 'fieldset',
            ariaConfig,
            events: [],
            observedAttributes: []
        });
        
        this.fieldset = this.shadowRoot.querySelector('fieldset');
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
        const value = this.fieldset.getAttribute('aria-label');
        return value === null ? null : value;
    }
    set ariaLabel(val) { 
        if (val === null || val === undefined) {
            this.fieldset.removeAttribute('aria-label');
        } else {
            this.fieldset.setAttribute('aria-label', val);
        }
    }
    get ariaDescribedBy() { 
        const value = this.fieldset.getAttribute('aria-describedby');
        return value === null ? null : value;
    }
    set ariaDescribedBy(val) { 
        if (val === null || val === undefined) {
            this.fieldset.removeAttribute('aria-describedby');
        } else {
            this.fieldset.setAttribute('aria-describedby', val);
        }
    }
    // Override validateARIA for fieldset-specific checks
    validateARIA() {
        const errors = super.validateARIA ? super.validateARIA() : [];
        // Accessible name check: must have a legend or aria-label
        const legend = this.fieldset.querySelector('legend,ds-legend');
        const ariaLabel = this.fieldset.getAttribute('aria-label');
        if (!legend && !ariaLabel) {
            errors.push('Fieldset has no accessible name (legend or aria-label required)');
        }
        return errors;
    }
}

// Register the custom element
customElements.define('ds-fieldset', DsFieldset);

// Export for use in other modules
export default DsFieldset; 