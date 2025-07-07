/**
 * @file ds-option.js
 * @summary A custom Web Component that wraps a native `<option>` element.
 * @description
 * The `ds-option` component provides a styled and functional option element
 * for use within `<ds-select>` components. It maintains proper option behavior
 * and can be used as an alternative to native `<option>` elements.
 *
 * @element ds-option
 * @extends BaseComponent
 *
 * @attr {string} value - The value of the option when selected.
 * @attr {boolean} disabled - If present, the option cannot be selected.
 * @attr {boolean} selected - If present, the option is pre-selected.
 *
 * @property {string} value - Gets or sets the value of the option.
 * @property {boolean} selected - Gets or sets the selected state of the option.
 * @property {boolean} disabled - Gets or sets the disabled state of the option.
 *
 * @fires change - Fired when the option selection changes.
 *
 * @slot - Renders the option text content.
 *
 * @example
 * <!-- Basic option -->
 * <ds-option value="option1">Option 1</ds-option>
 *
 * @example
 * <!-- Pre-selected option -->
 * <ds-option value="default" selected>Default Option</ds-option>
 *
 * @example
 * <!-- Disabled option -->
 * <ds-option value="disabled" disabled>Disabled Option</ds-option>
 *
 * @example
 * <!-- Usage within ds-select -->
 * <ds-select name="category">
 *   <ds-option value="electronics">Electronics</ds-option>
 *   <ds-option value="clothing">Clothing</ds-option>
 *   <ds-option value="books">Books</ds-option>
 * </ds-select>
 */
import BaseComponent from './base-component.js';

class DsOption extends BaseComponent {
    constructor() {
        // ARIA config for ds-option
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
                    display: none; /* Hidden by default, shown when slotted into select */
                }
            </style>
            <div>
                <option part="option">
                    <slot></slot>
                </option>
            </div>
        `;
        
        super({
            template: template.innerHTML,
            targetSelector: 'option',
            ariaConfig,
            events: [],
            observedAttributes: ['value', 'disabled', 'selected']
        });
        
        this.option = this.shadowRoot.querySelector('option');
    }
    
    static get observedAttributes() {
        return ['value', 'disabled', 'selected', 'aria-label', 'aria-describedby'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (oldValue === newValue) return;
        switch (name) {
            case 'value':
                this.option.value = newValue || '';
                break;
            case 'disabled':
                this.option.disabled = this.hasAttribute('disabled');
                break;
            case 'selected':
                this.option.selected = this.hasAttribute('selected');
                break;
        }
    }
    get value() {
        return this.option.value;
    }
    set value(val) {
        this.option.value = val;
    }
    get selected() {
        return this.option.selected;
    }
    set selected(val) {
        this.option.selected = val;
    }
    get disabled() {
        return this.option.disabled;
    }
    set disabled(val) {
        this.option.disabled = val;
    }
    // ARIA property accessors
    get ariaLabel() { 
        const value = this.option.getAttribute('aria-label');
        return value === null ? null : value;
    }
    set ariaLabel(val) { 
        if (val === null || val === undefined) {
            this.option.removeAttribute('aria-label');
        } else {
            this.option.setAttribute('aria-label', val);
        }
    }
    get ariaDescribedBy() { 
        const value = this.option.getAttribute('aria-describedby');
        return value === null ? null : value;
    }
    set ariaDescribedBy(val) { 
        if (val === null || val === undefined) {
            this.option.removeAttribute('aria-describedby');
        } else {
            this.option.setAttribute('aria-describedby', val);
        }
    }
    // Override validateARIA for option-specific checks
    validateARIA() {
        const errors = super.validateARIA ? super.validateARIA() : [];
        // Accessible name check: must have text or aria-label
        const optionText = this.textContent.trim();
        const ariaLabel = this.option.getAttribute('aria-label');
        if (!optionText && !ariaLabel) {
            errors.push('Option has no accessible name (text or aria-label required)');
        }
        return errors;
    }
}

// Register the custom element
customElements.define('ds-option', DsOption); 