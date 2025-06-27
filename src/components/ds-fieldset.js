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
class DsFieldset extends BaseComponent {
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
                <fieldset part="fieldset">
                    <slot></slot>
                </fieldset>
            </div>
        `;
        
        // Set up the component with template and no observed attributes
        this.setupComponent(template, []);
        
        // Store reference to the internal fieldset for attribute changes
        this.fieldset = this.shadowRoot.querySelector('fieldset');
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Sets up event listeners for the fieldset.
     */
    setupEventListeners() {
        // Fieldsets don't typically have interactive events
        // But we can listen for form-related events if needed
    }
}

// Register the custom element
customElements.define('ds-fieldset', DsFieldset); 