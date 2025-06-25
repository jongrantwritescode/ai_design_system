/**
 * ds-select - A select component that wraps native select elements
 * Supports multiple selection and option projection
 */
class DsSelect extends HTMLElement {
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
                <select id="select" part="select">
                    <slot></slot>
                </select>
            </div>
        `;
        
        // Append the template's content to the shadow root
        shadowRoot.appendChild(template.content.cloneNode(true));
        
        // Store reference to the internal select for attribute changes
        this.select = shadowRoot.querySelector('select');
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Set up slot change listener to handle option projection
        this.setupSlotListener();
    }
    
    /**
     * Define which attributes should trigger attributeChangedCallback
     */
    static get observedAttributes() {
        return ['value', 'disabled', 'required', 'name', 'multiple', 'size'];
    }
    
    /**
     * React to attribute changes and apply corresponding properties to the internal select
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return; // No change
        
        switch (name) {
            case 'value':
                this.select.value = newValue || '';
                break;
                
            case 'disabled':
                if (this.hasAttribute('disabled')) {
                    this.select.disabled = true;
                } else {
                    this.select.disabled = false;
                }
                break;
                
            case 'required':
                if (this.hasAttribute('required')) {
                    this.select.required = true;
                } else {
                    this.select.required = false;
                }
                break;
                
            case 'name':
                this.select.name = newValue || '';
                break;
                
            case 'multiple':
                if (this.hasAttribute('multiple')) {
                    this.select.multiple = true;
                } else {
                    this.select.multiple = false;
                }
                break;
                
            case 'size':
                this.select.size = newValue || '';
                break;
        }
    }
    
    /**
     * Set up event listeners to re-dispatch events from the host element
     */
    setupEventListeners() {
        const events = ['change', 'focus', 'blur'];
        
        events.forEach(eventType => {
            this.select.addEventListener(eventType, (event) => {
                // Create a new event to dispatch from the host
                const newEvent = new Event(eventType, {
                    bubbles: true,
                    composed: true,
                    cancelable: true
                });
                
                // Copy relevant properties
                if (eventType === 'change') {
                    newEvent.target = this;
                    newEvent.currentTarget = this;
                }
                
                this.dispatchEvent(newEvent);
            });
        });
    }
    
    /**
     * Set up slot listener to handle option projection
     */
    setupSlotListener() {
        const slot = this.shadowRoot.querySelector('slot');
        slot.addEventListener('slotchange', () => {
            this.handleSlotChange();
        });
    }
    
    /**
     * Handle slot changes to project ds-option components into the select
     */
    handleSlotChange() {
        const slot = this.shadowRoot.querySelector('slot');
        const assignedNodes = slot.assignedNodes();
        
        // Clear existing options
        this.select.innerHTML = '';
        
        // Process each assigned node
        assignedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === 'DS-OPTION') {
                    // Create a native option element
                    const option = document.createElement('option');
                    
                    // Copy attributes from ds-option
                    if (node.hasAttribute('value')) {
                        option.value = node.getAttribute('value');
                    }
                    if (node.hasAttribute('disabled')) {
                        option.disabled = true;
                    }
                    if (node.hasAttribute('selected')) {
                        option.selected = true;
                    }
                    
                    // Copy text content
                    option.textContent = node.textContent || node.innerText || '';
                    
                    this.select.appendChild(option);
                } else if (node.tagName === 'OPTION') {
                    // Direct option element, clone it
                    this.select.appendChild(node.cloneNode(true));
                }
            }
        });
    }
    
    /**
     * Property getters and setters to mirror the internal select
     */
    get value() {
        return this.select.value;
    }
    
    set value(val) {
        this.select.value = val;
    }
    
    get disabled() {
        return this.select.disabled;
    }
    
    set disabled(val) {
        this.select.disabled = val;
    }
    
    get required() {
        return this.select.required;
    }
    
    set required(val) {
        this.select.required = val;
    }
    
    get name() {
        return this.select.name;
    }
    
    set name(val) {
        this.select.name = val;
    }
    
    get multiple() {
        return this.select.multiple;
    }
    
    set multiple(val) {
        this.select.multiple = val;
    }
    
    get size() {
        return this.select.size;
    }
    
    set size(val) {
        this.select.size = val;
    }
    
    /**
     * Called when the element is connected to the DOM
     * Apply initial attributes
     */
    connectedCallback() {
        // Apply initial attributes
        this.attributeChangedCallback('value', null, this.getAttribute('value'));
        this.attributeChangedCallback('disabled', null, this.getAttribute('disabled'));
        this.attributeChangedCallback('required', null, this.getAttribute('required'));
        this.attributeChangedCallback('name', null, this.getAttribute('name'));
        this.attributeChangedCallback('multiple', null, this.getAttribute('multiple'));
        this.attributeChangedCallback('size', null, this.getAttribute('size'));
        
        // Handle initial slot content
        this.handleSlotChange();
    }
}

// Register the custom element
customElements.define('ds-select', DsSelect); 