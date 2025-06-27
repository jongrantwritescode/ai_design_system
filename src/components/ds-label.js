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
class DsLabel extends BaseComponent {
    constructor() {
        super();
        
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
                <label part="label">
                    <slot></slot>
                </label>
            </div>
        `;
        
        // Set up the component with template and observed attributes
        this.setupComponent(template, ['for']);
        
        // Store reference to the internal label for attribute changes
        this.label = this.shadowRoot.querySelector('label');
        
        // Set up event listeners
        this.setupEventListeners();
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
            case 'for':
                this.label.setAttribute('for', newValue || '');
                break;
        }
    }
    
    /**
     * Sets up event listeners for the label.
     */
    setupEventListeners() {
        // Labels don't typically have interactive events, but we can listen for clicks
        this.label.addEventListener('click', (event) => {
            const newEvent = new Event('click', {
                bubbles: true,
                composed: true,
                cancelable: true
            });
            this.dispatchEvent(newEvent);
        });
    }
    
    /**
     * Gets the ID of the associated form control.
     * @returns {string} The ID of the associated form control.
     */
    get htmlFor() {
        return this.label.htmlFor;
    }
    
    /**
     * Sets the ID of the associated form control.
     * @param {string} val - The ID of the form control to associate with.
     */
    set htmlFor(val) {
        this.label.htmlFor = val;
    }
}

// Register the custom element
customElements.define('ds-label', DsLabel); 