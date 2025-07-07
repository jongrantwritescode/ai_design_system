/**
 * @file ds-page.js
 * @summary A custom Web Component that provides a consistent wrapper around application content.
 * @description
 * The `ds-page` component handles page-level layout and margins, providing a consistent
 * foundation for application pages. It uses CSS custom properties for customization
 * and ensures proper viewport handling.
 *
 * @element ds-page
 * @extends BaseComponent
 *
 * @slot - Renders the main page content inside the page container.
 *
 * @example
 * <!-- Basic page wrapper -->
 * <ds-page>
 *   <h1>Welcome to My App</h1>
 *   <p>This content is wrapped in a consistent page layout.</p>
 * </ds-page>
 *
 * @example
 * <!-- Page with nested layout components -->
 * <ds-page>
 *   <ds-row justify-content="space-between" align-items="center">
 *     <ds-col>
 *       <h1>Page Title</h1>
 *     </ds-col>
 *     <ds-col>
 *       <ds-button>Action</ds-button>
 *     </ds-col>
 *   </ds-row>
 *   <ds-row>
 *     <ds-col>
 *       <p>Main content area</p>
 *     </ds-col>
 *   </ds-row>
 * </ds-page>
 */
class DsPage extends BaseComponent {
    constructor() {
        super();
        
        // Define the template with internal markup and styles
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                @import url('/src/styles/styles.css');
                
                :host {
                    display: block; /* Custom elements are inline by default */
                    width: 100%;
                    min-height: 100vh; /* Ensures it takes full viewport height */
                    box-sizing: border-box; /* Include padding/border in element's total width/height */
                }
                
                .page-container {
                    display: flex; /* Makes the main element a flex container for its children */
                    flex-direction: column; /* Stacks children vertically by default */
                    width: 100%;
                    padding: var(--ds-spacing-page-padding, 20px); /* Default padding, can be overridden by CSS variable */
                    margin: 0 auto; /* Center content if width is limited */
                    max-width: var(--ds-page-max-width, 1200px); /* Optional max-width for content */
                }
            </style>
            <main class="page-container">
                <slot></slot>
            </main>
        `;
        
        // Set up the component with template and no observed attributes
        this.setupComponent(template, []);
        
        // Store reference to the internal container
        this.pageContainer = this.shadowRoot.querySelector('.page-container');
    }
}

// Register the custom element
customElements.define('ds-page', DsPage); 