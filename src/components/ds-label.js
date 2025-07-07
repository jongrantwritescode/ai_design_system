/**
 * @file ds-label.js
 * @summary A custom Web Component that wraps a native `<label>` element.
 * @description
 * The `ds-label` component provides a styled and functional label element
 * for associating text with form controls. It supports the `for` attribute
 * to create explicit associations with form elements.
 *
 * @element ds-label
 * @extends BaseComponent
 *
 * @attr {string} for - The ID of the form control this label is associated with.
 *
 * @property {string} htmlFor - Gets or sets the ID of the associated form control.
 *
 * @fires click - Fired when the label is clicked.
 *
 * @slot - Renders the label text content.
 *
 * @example
 * <!-- Basic label -->
 * <ds-label>Username</ds-label>
 *
 * @example
 * <!-- Label with explicit association -->
 * <ds-label for="username-input">Username</ds-label>
 * <ds-text-input id="username-input"></ds-text-input>
 *
 * @example
 * <!-- Label with form control -->
 * <ds-label for="email-field">Email Address</ds-label>
 * <ds-text-input type="email" id="email-field" required></ds-text-input>
 *
 * @example
 * <!-- Label with checkbox -->
 * <ds-label for="agree-terms">I agree to the terms and conditions</ds-label>
 * <ds-checkbox id="agree-terms" name="agree" value="yes"></ds-checkbox>
 */
import BaseComponent from './base-component.js';

class DsLabel extends BaseComponent {
    constructor() {
        // ARIA config for ds-label
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
                <label part="label">
                    <slot></slot>
                </label>
            </div>
        `;
        
        super({
            template: template.innerHTML,
            targetSelector: 'label',
            ariaConfig,
            events: ['click'],
            observedAttributes: ['for']
        });
        
        this.label = this.shadowRoot.querySelector('label');
    }
    
    static get observedAttributes() {
        return ['for', 'aria-label', 'aria-describedby'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (oldValue === newValue) return;
        switch (name) {
            case 'for':
                this.label.setAttribute('for', newValue || '');
                break;
        }
    }
    
    get htmlFor() {
        return this.label.htmlFor;
    }
    set htmlFor(val) {
        this.label.htmlFor = val;
    }
    // ARIA property accessors
    get ariaLabel() { 
        const value = this.label.getAttribute('aria-label');
        return value === null ? null : value;
    }
    set ariaLabel(val) { 
        if (val === null || val === undefined) {
            this.label.removeAttribute('aria-label');
        } else {
            this.label.setAttribute('aria-label', val);
        }
    }
    get ariaDescribedBy() { 
        const value = this.label.getAttribute('aria-describedby');
        return value === null ? null : value;
    }
    set ariaDescribedBy(val) { 
        if (val === null || val === undefined) {
            this.label.removeAttribute('aria-describedby');
        } else {
            this.label.setAttribute('aria-describedby', val);
        }
    }
    // Override validateARIA for label-specific checks
    validateARIA() {
        const errors = super.validateARIA ? super.validateARIA() : [];
        // Check for accessible association
        const forAttr = this.label.getAttribute('for');
        if (forAttr && !document.getElementById(forAttr)) {
            errors.push(`Label 'for' attribute references missing element: ${forAttr}`);
        }
        // Accessible name check
        const labelText = this.textContent.trim();
        const ariaLabel = this.label.getAttribute('aria-label');
        if (!labelText && !ariaLabel) {
            errors.push('Label has no accessible name (text or aria-label required)');
        }
        return errors;
    }
}

// Register the custom element
customElements.define('ds-label', DsLabel); 