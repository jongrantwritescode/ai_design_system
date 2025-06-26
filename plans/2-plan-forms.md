

**LLM Instructions: Extending Design System with Form Web Components**

**Project Context:**
The `design-system-project` has already been initialized according to previous instructions. This includes:

  * The core project structure (`src/components/`, `src/design_system/`, `src/stories/`, `.storybook/`, `package.json`, `index.html`).
  * Base layout components (`ds-row`, `ds-col`, `ds-page`) are implemented.
  * Storybook is set up and configured for Web Components, with global styles imported.

**Goal of this Prompt:**
Implement a set of essential form-related Web Components following the same design system principles. Each component should:

1.  Wrap its corresponding native HTML form element.
2.  Use the `ds-` prefix (e.g., `ds-text-input` for `<input type="text">`).
3.  Utilize Shadow DOM with `mode: 'open'`.
4.  Load styles from `src/design_system/styles.css` via `@import` in its Shadow DOM.
5.  Pass through standard HTML attributes to the wrapped native element.
6.  Handle specific form attributes (e.g., `value`, `checked`, `placeholder`, `disabled`, `readonly`, `required`, `name`, `rows`, `cols`, `multiple`, `size`).
7.  Correctly propagate or re-dispatch relevant DOM events (`input`, `change`, `click`, `focus`, `blur`).
8.  Ensure accessibility by reflecting `id` attributes and supporting standard label association patterns.
9.  Be fully integrated with Storybook, including dedicated `.stories.js` files with interactive controls (`argTypes`) for all relevant parameters.

**New Components to Create:**

  * `ds-text-input` (wraps `<input type="text" | email | password | number | tel | url | search>`)
  * `ds-button` (wraps `<button>`)
  * `ds-radio` (wraps `<input type="radio">`)
  * `ds-checkbox` (wraps `<input type="checkbox">`)
  * `ds-textarea` (wraps `<textarea>`)
  * `ds-select` (wraps `<select>`)
  * `ds-option` (wraps `<option>`)
  * `ds-label` (wraps `<label>`)
  * `ds-fieldset` (wraps `<fieldset>`)
  * `ds-legend` (wraps `<legend>`)

-----

**General Component Implementation Details (Applies to all new components):**

  * **File Location:** `src/components/ds-[component-name].js`
  * **Structure:**
      * `class Ds[ComponentName] extends HTMLElement { ... }`
      * `constructor()`: `super()`, `attachShadow({ mode: 'open' })`, `innerHTML` for template.
      * **Template Content:** An internal `<div>` or appropriate semantic tag (e.g., `<label>` for `ds-label`, `<fieldset>` for `ds-fieldset`) containing the native HTML element.
        ```html
        <style>
          @import url('/src/design_system/styles.css');
          /* Component specific styles */
          :host { display: block; } /* or inline-block for buttons/inputs */
          .wrapper { /* styles for the wrapper div if needed */ }
        </style>
        <div class="wrapper">
          <slot></slot> </div>
        ```
        *Self-closing elements like `<input>` will not have a slot for content, but their wrapping `div` might.*
      * `static get observedAttributes()`: List all attributes the component should react to.
      * `attributeChangedCallback(name, oldValue, newValue)`: Logic to update the wrapped native element's attributes/properties based on `newValue`.
      * **Property Mirroring:** For `value`, `checked`, etc., implement getters and setters that mirror the property of the internal native element. Example for `ds-text-input`:
        ```javascript
        get value() {
          return this.shadowRoot.querySelector('input').value;
        }
        set value(val) {
          this.shadowRoot.querySelector('input').value = val;
        }
        ```
      * **Event Handling:** Listen for native events (`input`, `change`, `click`, `focus`, `blur`) on the wrapped element and re-dispatch them from the host custom element if needed, or allow them to bubble out of Shadow DOM (which they do by default if `composed: true`). For forms, often just listening to native events and updating properties is sufficient.
      * `customElements.define('ds-[component-name]', Ds[ComponentName]);`

-----

**Detailed Component Specifications (Individual):**

**1. `ds-text-input` (src/components/ds-text-input.js)**

  * **Wraps:** `<input>` element.
  * **Internal Markup:** `<div><input id="input" part="input"><slot></slot></div>` (slot for potential label inside, or placeholder if label is separate). For simplicity, let the slot contain content for `ds-label` and `input` be separate from label internally.
  * **Observable Attributes:** `type` (text, email, password, number, tel, url, search - default `text`), `value`, `placeholder`, `disabled` (boolean), `readonly` (boolean), `required` (boolean), `name`, `id` (maps to internal input's `id`), `aria-label`.
  * **Properties:** `value` (getter/setter mirrors internal input).
  * **Events:** Re-dispatch `input`, `change`, `focus`, `blur` events from the host element.
  * **Accessibility:** Ensure `id` attribute on `ds-text-input` maps to `id` of internal `<input>` for external `for` association or `aria-labelledby`.

**2. `ds-button` (src/components/ds-button.js)**

  * **Wraps:** `<button>` element.
  * **Internal Markup:** `<div><button part="button"><slot></slot></button></div>`
  * **Observable Attributes:** `type` (submit, reset, button - default `button`), `disabled` (boolean), `name`, `value`.
  * **Events:** Re-dispatch `click`, `focus`, `blur`.

**3. `ds-radio` (src/components/ds-radio.js)**

  * **Wraps:** `<input type="radio">` element.
  * **Internal Markup:** `<div><input type="radio" id="radio" part="radio"><slot></slot></div>` (slot for text/label content next to radio).
  * **Observable Attributes:** `name`, `value`, `checked` (boolean), `disabled` (boolean), `readonly` (boolean), `required` (boolean), `id` (for internal input's `id`).
  * **Properties:** `checked` (getter/setter mirrors internal input).
  * **Events:** Re-dispatch `change`, `focus`, `blur`.
  * **Accessibility:** Ensure internal `id` is set for `ds-label` association. The text content for the radio should be in the slot.

**4. `ds-checkbox` (src/components/ds-checkbox.js)**

  * **Wraps:** `<input type="checkbox">` element.
  * **Internal Markup:** `<div><input type="checkbox" id="checkbox" part="checkbox"><slot></slot></div>` (slot for text/label content next to checkbox).
  * **Observable Attributes:** `name`, `value`, `checked` (boolean), `disabled` (boolean), `readonly` (boolean), `required` (boolean), `id` (for internal input's `id`).
  * **Properties:** `checked` (getter/setter mirrors internal input).
  * **Events:** Re-dispatch `change`, `focus`, `blur`.
  * **Accessibility:** Ensure internal `id` is set for `ds-label` association. The text content for the checkbox should be in the slot.

**5. `ds-textarea` (src/components/ds-textarea.js)**

  * **Wraps:** `<textarea>` element.
  * **Internal Markup:** `<div><textarea id="textarea" part="textarea"><slot></slot></textarea></div>` (slot for default content if any, otherwise plain textarea).
  * **Observable Attributes:** `value`, `placeholder`, `rows`, `cols`, `disabled` (boolean), `readonly` (boolean), `required` (boolean), `name`, `id` (maps to internal textarea's `id`).
  * **Properties:** `value` (getter/setter mirrors internal textarea).
  * **Events:** Re-dispatch `input`, `change`, `focus`, `blur`.

**6. `ds-select` (src/components/ds-select.js)**

  * **Wraps:** `<select>` element.
  * **Internal Markup:** `<div><select id="select" part="select"><slot></slot></select></div>` (slot for `ds-option` components).
  * **Observable Attributes:** `value`, `disabled` (boolean), `required` (boolean), `name`, `multiple` (boolean), `size`.
  * **Properties:** `value` (getter/setter mirrors internal select).
  * **Events:** Re-dispatch `change`, `focus`, `blur`.
  * **Crucial:** Needs to correctly project `ds-option` components into its internal `<select>`. The `attributeChangedCallback` should ensure that the `value` of the internal `<select>` updates when `value` attribute on `ds-select` changes.

**7. `ds-option` (src/components/ds-option.js)**

  * **Wraps:** `<option>` element.
  * **Internal Markup:** `<div><option part="option"><slot></slot></option></div>` (slot for option text).
  * **Observable Attributes:** `value`, `disabled` (boolean), `selected` (boolean).
  * **Properties:** `value`, `selected` (getter/setter mirrors internal option).
  * **Note:** This component will primarily be used *inside* a `ds-select`. Its attributes will dictate the behavior of the native `<option>`.

**8. `ds-label` (src/components/ds-label.js)**

  * **Wraps:** `<label>` element.
  * **Internal Markup:** `<div><label part="label"><slot></slot></label></div>` (slot for label text or to wrap an input).
  * **Observable Attributes:** `for` (maps to internal label's `for` attribute).
  * **Accessibility Note:** For `for`/`id` to work across Shadow DOMs, the `id` on the target input element inside *its* Shadow DOM must be unique and exposed. The `ds-label` `for` attribute will map to the internal label's `for`. It's generally simpler if `ds-label` wraps the input: `<ds-label>Label Text <ds-text-input id="my-input"></ds-text-input></ds-label>`. The LLM should prioritize this wrapping pattern or advise on `aria-labelledby` for direct `for`/`id` linking between separate Shadow DOM components if the wrapping pattern isn't desired. For this prompt, assume it will wrap content, and the `for` attribute should be passed through.

**9. `ds-fieldset` (src/components/ds-fieldset.js)**

  * **Wraps:** `<fieldset>` element.
  * **Internal Markup:** `<div><fieldset part="fieldset"><slot></slot></fieldset></div>` (slot for all form elements and `ds-legend`).
  * **No specific observable attributes.** Designed as a semantic wrapper.

**10. `ds-legend` (src/components/ds-legend.js)**

  * **Wraps:** `<legend>` element.
  * **Internal Markup:** `<div><legend part="legend"><slot></slot></legend></div>` (slot for legend text).
  * **No specific observable attributes.** Designed as a semantic wrapper, intended to be a direct child of `ds-fieldset`.

-----

**Storybook Integration for New Components:**

For each new component, create a `src/stories/ds-[component-name].stories.js` file.

  * **Structure:** Follow the pattern established in the previous prompt (`Default export`, `title`, `component`, `tags`, `argTypes`, `Template` function, and named story exports).
  * **`argTypes`:** Define controls for *all* relevant attributes/properties specified for each component. Use appropriate control types (`text`, `number`, `boolean`, `select`).
  * **`Template` Function:**
      * Use `document.createElement('ds-[component-name]')` to create the component instance.
      * Loop through `args` to set attributes on the created element. Handle boolean attributes (`?attr="${args.attr}"` if using Lit's html tag, or `setAttribute(attr, '')`/`removeAttribute(attr)` if not).
      * Set `element.innerHTML = args.content || '...default content...'` for components that use a slot for text/child elements.
  * **Stories to Include:**
      * **Default:** Basic usage with default arguments.
      * **Variations:** `Disabled`, `Readonly`, `Required`, `WithPlaceholder` (for inputs), `Checked` (for radio/checkbox), `Selected` (for select/option), examples demonstrating different `type`s for `ds-text-input`, etc.
      * **Interactive:** A general story that exposes all controls.
  * **Dependencies:** Remember to `import` any child `ds-` components used within a story (e.g., `ds-select.stories.js` will need to import `ds-option.js`).

-----

**Styling Updates (`src/design_system/styles.css`):**

Add global CSS variables and basic styles for the new form components.

  * **Form-Specific Design Tokens:**
    ```css
    :root {
        /* Form Colors */
        --ds-form-border-color: #ccc;
        --ds-form-focus-color: var(--ds-color-primary);
        --ds-form-error-color: #dc3545;
        --ds-form-bg-color: white;
        --ds-form-disabled-bg-color: #e9ecef;
        --ds-form-text-color: var(--ds-color-text);

        /* Form Spacing & Sizing */
        --ds-form-input-padding: 8px 12px;
        --ds-form-border-radius: 4px;
        --ds-form-line-height: 1.5;
    }
    ```
  * **Basic Styles for Form Elements:**
    Apply minimal, consistent styles to the native HTML elements *within the Shadow DOM* using `:host()` selectors combined with classes or parts, or direct element selectors if no wrapping div is used (e.g., `input[part="input"]`, `button[part="button"]`).
      * General input/textarea/select styles (border, padding, font, `box-sizing: border-box`).
      * Focus styles (`:focus`).
      * Disabled/Readonly states.
      * Button styling (padding, background, border, cursor).
      * Radio/Checkbox appearance (minimal, mostly relying on browser defaults or subtle custom styling).
      * Label, Fieldset, Legend basic styling.

-----

**`index.html` Updates:**

  * Add `<script type="module" src="src/components/ds-[new-component-name].js"></script>` imports for all new form components.
  * Include a comprehensive demonstration form using all the new `ds-` form components, showing various attributes and states (e.g., a login form, a registration form fragment).

-----