# Adding JSDoc to Web Components and Generating Documentation

This document provides instructions for integrating JSDoc into your design-system-project to generate comprehensive API documentation for your custom Web Components. This involves adding JSDoc annotations directly to your JavaScript component files and configuring JSDoc to generate HTML documentation.

**Assumption**: Your design-system-project is set up as per previous instructions, including the `src/components/` directory containing all your `ds-` Web Component `.js` files. The detailed component specifications are available in `docs/specification.md`.

## 1. Project Structure Updates

We will add a JSDoc configuration file at the root level and specify an output directory for the generated documentation:

```
/design-system-project
├── docs/
│   └── specification.md
├── examples/
├── src/
│   ├── components/
│   │   ├── ds-row.js           <-- Will be updated with JSDoc
│   │   ├── ds-col.js           <-- Will be updated with JSDoc
│   │   ├── ds-page.js          <-- Will be updated with JSDoc
│   │   ├── ds-text-input.js    <-- Will be updated with JSDoc
│   │   ├── ds-button.js        <-- Will be updated with JSDoc
│   │   ├── ds-radio.js         <-- Will be updated with JSDoc
│   │   ├── ds-checkbox.js      <-- Will be updated with JSDoc
│   │   ├── ds-textarea.js      <-- Will be updated with JSDoc
│   │   ├── ds-select.js        <-- Will be updated with JSDoc
│   │   ├── ds-option.js        <-- Will be updated with JSDoc
│   │   ├── ds-label.js         <-- Will be updated with JSDoc
│   │   ├── ds-fieldset.js      <-- Will be updated with JSDoc
│   │   └── ds-legend.js        <-- Will be updated with JSDoc
│   ├── stories/
│   └── design_system/
├── .storybook/
├── jsdoc.json            <-- New: JSDoc configuration file
├── package.json          <-- Will be updated with JSDoc script
└── index.html
└── docs-output/          <-- New: Directory for generated JSDoc (will be created by JSDoc)
```

## 2. Install JSDoc

First, install JSDoc as a development dependency:

```bash
npm install --save-dev jsdoc
```

## 3. Update package.json with JSDoc Script

Add a new script to your `package.json` to easily generate the documentation:

```json
// /design-system-project/package.json
{
  // ... existing content ...
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "generate-docs": "jsdoc -c jsdoc.json"  <-- Add this line
  },
  // ... existing content ...
  "devDependencies": {
    // ... existing dev dependencies ...
    "jsdoc": "^4.x.x"                     <-- Ensure this is present and up-to-date
  }
}
```

## 4. jsdoc.json - JSDoc Configuration File

This file configures how JSDoc will parse your files and where it will output the documentation.

**File Location**: `/design-system-project/jsdoc.json`

**Content**:

```json
{
  "source": {
    "include": ["src/components"],
    "includePattern": ".js$",
    "excludePattern": "(node_modules/|docs-output/)"
  },
  "plugins": [],
  "templates": {
    "cleverLinks": false,
    "monospaceLinks": false,
    "default": {
      "outputSourceFiles": true
    }
  },
  "opts": {
    "encoding": "utf8",
    "destination": "./docs-output/",
    "recurse": true,
    "verbose": true
  }
}
```

## 5. Add JSDoc Annotations to Component Files

For each `.js` file in `src/components/`, add comprehensive JSDoc comments. Refer to `docs/specification.md` for specific attributes, properties, and purposes of each component.

### General JSDoc Principles for Web Components:

- **@class** and **@extends**: For the main component class.
- **@fires**: For custom events dispatched by the component.
- **@property**: For JavaScript properties exposed by the component (especially getters/setters).
- **@attribute**: For HTML attributes that the component observes via `observedAttributes`.
- **@param**: For parameters in `attributeChangedCallback`.
- **@summary**: A brief, one-line description.
- **@description**: A more detailed explanation.
- **@example**: HTML usage examples.

Here are examples for a few components. Apply similar detailed annotations to all your `ds-` components.

### a. src/components/ds-row.js

```javascript
/**
 * @file ds-row.js
 * @summary A custom Web Component for a Flexbox container for horizontal layouts.
 * @description
 * The `ds-row` component provides a flexible container for arranging items in a row.
 * It leverages CSS Flexbox properties, exposing them as attributes for easy configuration.
 *
 * @element ds-row
 * @extends HTMLElement
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
class DsRow extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        @import url('/src/design_system/styles.css');

        :host {
          display: block;
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
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Defines which attributes the component observes for changes.
   * @returns {Array<string>} An array of attribute names to observe.
   */
  static get observedAttributes() {
    return ['justify-content', 'align-items', 'gap', 'wrap'];
  }

  /**
   * Called when one of the component's observed attributes is added, removed, or changed.
   * @param {string} name - The name of the attribute that changed.
   * @param {string|null} oldValue - The attribute's old value.
   * @param {string|null} newValue - The attribute's new value.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    const container = this.shadowRoot.querySelector('.row-container');
    if (!container) return;

    switch (name) {
      case 'justify-content':
        container.style.justifyContent = newValue;
        break;
      case 'align-items':
        container.style.alignItems = newValue;
        break;
      case 'gap':
        container.style.gap = newValue;
        break;
      case 'wrap':
        container.style.flexWrap = this.hasAttribute('wrap') ? 'wrap' : 'nowrap';
        break;
    }
  }
}

customElements.define('ds-row', DsRow);
```

### b. src/components/ds-text-input.js

```javascript
/**
 * @file ds-text-input.js
 * @summary A custom Web Component that wraps a native `<input>` element for text-based inputs.
 * @description
 * The `ds-text-input` component provides a styled and functional text input field.
 * It mirrors common `<input>` attributes and properties, making it easy to use
 * within forms while leveraging the design system's styling.
 *
 * @element ds-text-input
 * @extends HTMLElement
 *
 * @attr {string} [type="text"] - The type of input (e.g., `text`, `email`, `password`, `number`, `tel`, `url`, `search`).
 * @attr {string} value - The current value of the input.
 * @attr {string} placeholder - A hint to the user of what can be entered in the input.
 * @attr {boolean} disabled - If present, the input cannot be interacted with.
 * @attr {boolean} readonly - If present, the input cannot be modified by the user.
 * @attr {boolean} required - If present, the input must have a value before form submission.
 * @attr {string} name - The name of the input, used when submitting form data.
 * @attr {string} id - A unique identifier for the input, useful for associating with labels.
 * @attr {string} [aria-label] - Defines a string value that labels the current element for accessibility purposes.
 *
 * @property {string} value - Gets or sets the current value of the input.
 *
 * @fires input - Fired when the value of the input changes.
 * @fires change - Fired when the value of the input is committed.
 * @fires focus - Fired when the input receives focus.
 * @fires blur - Fired when the input loses focus.
 *
 * @example
 * <!-- Basic text input -->
 * <ds-text-input placeholder="Enter your name" id="username-input"></ds-text-input>
 * <ds-label for="username-input">Username</ds-label>
 *
 * @example
 * <!-- Password input that is required -->
 * <ds-text-input type="password" required placeholder="Your password"></ds-text-input>
 *
 * @example
 * <!-- Disabled email input with a pre-filled value -->
 * <ds-text-input type="email" value="example@domain.com" disabled></ds-text-input>
 */
class DsTextInput extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        @import url('/src/design_system/styles.css');

        :host {
          display: block;
          margin-bottom: var(--ds-spacing-md);
        }

        .wrapper {
          display: flex;
          flex-direction: column; /* Allows for easy stacking with potential error messages */
        }

        input {
          padding: var(--ds-form-input-padding);
          border: 1px solid var(--ds-form-border-color);
          border-radius: var(--ds-form-border-radius);
          font-size: var(--ds-font-size-base);
          line-height: var(--ds-form-line-height);
          box-sizing: border-box; /* Ensures padding doesn't add to overall width/height */
          width: 100%;
          color: var(--ds-form-text-color);
          background-color: var(--ds-form-bg-color);
        }

        input:focus {
          outline: none;
          border-color: var(--ds-form-focus-color);
          box-shadow: 0 0 0 2px rgba(var(--ds-form-focus-color-rgb), 0.2); /* Assuming RGB var for focus color */
        }

        input:disabled {
          background-color: var(--ds-form-disabled-bg-color);
          cursor: not-allowed;
        }

        input:read-only {
          background-color: var(--ds-form-disabled-bg-color);
          cursor: default;
        }
      </style>
      <div class="wrapper">
        <input id="input" part="input">
      </div>
    `;
    shadowRoot.appendChild(template.content.cloneNode(true));

    this._input = this.shadowRoot.querySelector('input');

    // Attach event listeners to internal input and re-dispatch from host
    this._input.addEventListener('input', (e) => this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, detail: e.target.value })));
    this._input.addEventListener('change', (e) => this.dispatchEvent(new Event('change', { bubbles: true, composed: true })));
    this._input.addEventListener('focus', (e) => this.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true })));
    this._input.addEventListener('blur', (e) => this.dispatchEvent(new FocusEvent('blur', { bubbles: true, composed: true })));
  }

  /**
   * Defines which attributes the component observes for changes.
   * @returns {Array<string>} An array of attribute names to observe.
   */
  static get observedAttributes() {
    return ['type', 'value', 'placeholder', 'disabled', 'readonly', 'required', 'name', 'id', 'aria-label'];
  }

  /**
   * Called when one of the component's observed attributes is added, removed, or changed.
   * @param {string} name - The name of the attribute that changed.
   * @param {string|null} oldValue - The attribute's old value.
   * @param {string|null} newValue - The attribute's new value.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._input) return; // Ensure input element is ready

    switch (name) {
      case 'value':
        this._input.value = newValue === null ? '' : newValue;
        break;
      case 'disabled':
      case 'readonly':
      case 'required':
        this._input.toggleAttribute(name, this.hasAttribute(name));
        break;
      case 'type':
      case 'placeholder':
      case 'name':
      case 'aria-label':
        if (newValue === null) {
          this._input.removeAttribute(name);
        } else {
          this._input.setAttribute(name, newValue);
        }
        break;
      case 'id':
        // Map the host's ID to the internal input's ID for label association
        if (newValue === null) {
          this._input.removeAttribute('id');
        } else {
          this._input.setAttribute('id', newValue);
        }
        break;
    }
  }

  /**
   * Gets the current value of the input.
   * @returns {string} The input's current value.
   */
  get value() {
    return this._input.value;
  }

  /**
   * Sets the value of the input.
   * @param {string} val - The new value to set.
   */
  set value(val) {
    this._input.value = val;
  }

  /**
   * Focuses the internal input element.
   */
  focus() {
    this._input.focus();
  }

  /**
   * Blurs the internal input element.
   */
  blur() {
    this._input.blur();
  }
}

customElements.define('ds-text-input', DsTextInput);
```

## 6. Generate Documentation

After all JSDoc annotations are added to your component files, you can generate the documentation by running:

```bash
npm run generate-docs
```

This command will:

- Parse your JavaScript files.
- Generate HTML documentation in the `docs-output/` directory at your project root.

You can then open `docs-output/index.html` in your browser to view the generated documentation.

## LLM Execution Guidance

1. **Confirm JSDoc Installation**: Verify that `jsdoc` is installed as a dev dependency in `package.json`. If not, perform `npm install --save-dev jsdoc`.

2. **Update package.json**: Add the `generate-docs` script to `package.json` as specified.

3. **Create jsdoc.json**: Create the `jsdoc.json` file in the project root with the exact content provided.

4. **Add JSDoc Comments**: For each `.js` file in `src/components/`, inject comprehensive JSDoc comments into the class definition, `observedAttributes` getter, `attributeChangedCallback`, and any custom getters/setters (like `value`, `checked`, `selected`).

5. **Ensure Accuracy**: Make sure the JSDoc comments are accurate and detailed, reflecting the component's purpose, attributes, properties, and events as described in `docs/specification.md`.

6. **Follow Examples**: The provided `ds-row.js` and `ds-text-input.js` examples demonstrate the level of detail required for all components.

**Note**: Do not generate the `docs-output/` directory directly; it will be generated by the JSDoc tool when the user runs the `npm run generate-docs` command.