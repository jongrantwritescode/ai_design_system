**LLM Instructions: Design System Web Components Project**

**Project Goal:** Create a foundational design system built with native Web Components, focusing on essential Flexbox-based layout components (`ds-row`, `ds-col`, `ds-page`). The project should demonstrate a "close to HTML spec" approach, use plain CSS for styling, and prioritize experimentation/readability.

**Core Principles:**

  * **Native Web Components:** Use `Custom Elements API`, `Shadow DOM`, and `HTML Templates`.
  * **Naming Convention:** All custom elements will be prefixed with `ds-` (e.g., `<ds-div>`).
  * **Attribute Reflection:** Attributes set on the `ds-` component should primarily control the internal wrapped element's CSS properties or behavior, as defined below.
  * **Plain CSS:** All styling will be managed via external `.css` files, leveraging CSS custom properties (variables) for design tokens.
  * **Shadow DOM Mode:** Use `mode: 'open'` for Shadow DOM to facilitate experimentation and debugging. (Note: Environment-based switching for Shadow DOM mode typically involves build-time configurations or server-side rendering, which is beyond the scope of this initial pure Web Component setup.)

-----

**Project Structure:**

```
/design-system-project
├── src/
│   ├── components/
│   │   ├── ds-row.js
│   │   ├── ds-col.js
│   │   └── ds-page.js
│   ├── stories/
│   │   ├── ds-row.stories.js
│   │   ├── ds-col.stories.js
│   │   └── ds-page.stories.js
│   └── design_system/
│       └── styles.css
├── .storybook/
│   ├── main.js
│   └── preview.js
├── package.json
└── index.html
```

-----

**Prerequisites & Installation:**

  * **Node.js & npm:** Ensure Node.js (v16+) and npm are installed on the system.
  * **Storybook Installation:** Run `npx storybook@latest init` to initialize Storybook in the project.
  * **Web Components Addon:** Install `@storybook/addon-web-components` for proper Web Component support: `npm install --save-dev @storybook/addon-web-components`.

-----

**Storybook Configuration:**

**1. `.storybook/main.js`**

  * **Purpose:** Configure Storybook to work with Web Components and locate story files.
  * **Content:**
    ```javascript
    /** @type { import('@storybook/web-components').StorybookConfig } */
    const config = {
      stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
      addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-web-components'
      ],
      framework: {
        name: '@storybook/web-components-webpack5',
        options: {}
      },
      docs: {
        autodocs: 'tag'
      }
    };
    export default config;
    ```

**2. `.storybook/preview.js`**

  * **Purpose:** Set up global decorators, parameters, and ensure design system styles are loaded.
  * **Content:**
    ```javascript
    import '../src/design_system/styles.css';

    /** @type { import('@storybook/web-components').Preview } */
    const preview = {
      parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
          matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
          },
        },
      },
      decorators: [
        (story) => {
          // Ensure Web Components are properly registered before rendering
          return story();
        }
      ]
    };

    export default preview;
    ```

-----

**Story Specifications:**

**1. `src/stories/ds-row.stories.js`**

  * **Purpose:** Demonstrate `ds-row` component with various attribute combinations and interactive controls.
  * **Stories to include:**
      * **Default:** Basic row with default styling
      * **Justify Content:** Examples of different `justify-content` values
      * **Align Items:** Examples of different `align-items` values
      * **Gap Variations:** Different gap sizes
      * **Wrap Examples:** With and without `wrap` attribute
      * **Interactive:** Full controls for all attributes
  * **Example Story Structure:**
    ```javascript
    import { html } from 'lit';
    import '../components/ds-row.js';

    export default {
      title: 'Components/ds-row',
      component: 'ds-row',
      parameters: {
        docs: {
          description: {
            component: 'A Flexbox container for horizontal layouts with configurable alignment, spacing, and wrapping.'
          }
        }
      },
      argTypes: {
        'justify-content': {
          control: 'select',
          options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
          description: 'Controls horizontal alignment of flex items'
        },
        'align-items': {
          control: 'select',
          options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
          description: 'Controls vertical alignment of flex items'
        },
        'gap': {
          control: 'text',
          description: 'Spacing between flex items'
        },
        'wrap': {
          control: 'boolean',
          description: 'Whether flex items should wrap to new lines'
        }
      }
    };

    const Template = (args) => html`
      <ds-row
        justify-content="${args['justify-content']}"
        align-items="${args['align-items']}"
        gap="${args.gap}"
        ?wrap="${args.wrap}"
      >
        <div style="background: var(--ds-color-primary); color: white; padding: 8px; border-radius: 4px;">Item 1</div>
        <div style="background: var(--ds-color-secondary); color: white; padding: 8px; border-radius: 4px;">Item 2</div>
        <div style="background: var(--ds-color-primary); color: white; padding: 8px; border-radius: 4px;">Item 3</div>
      </ds-row>
    `;

    export const Default = Template.bind({});
    Default.args = {
      'justify-content': 'flex-start',
      'align-items': 'stretch',
      gap: '16px',
      wrap: false
    };

    export const Centered = Template.bind({});
    Centered.args = {
      'justify-content': 'center',
      'align-items': 'center',
      gap: '24px',
      wrap: false
    };

    export const SpaceBetween = Template.bind({});
    SpaceBetween.args = {
      'justify-content': 'space-between',
      'align-items': 'center',
      gap: '16px',
      wrap: false
    };

    export const Wrapped = Template.bind({});
    Wrapped.args = {
      'justify-content': 'flex-start',
      'align-items': 'flex-start',
      gap: '12px',
      wrap: true
    };
    ```

**2. `src/stories/ds-col.stories.js`**

  * **Purpose:** Demonstrate `ds-col` component with flex item and flex container properties.
  * **Stories to include:**
      * **Default:** Basic column with default styling
      * **Flex Item Properties:** Examples of `flex-grow`, `flex-shrink`, `flex-basis`
      * **Flex Container Properties:** Examples of `justify-content`, `align-items`, `gap`
      * **Alignment Examples:** Different `align-self` values
      * **Interactive:** Full controls for all attributes
  * **Example Story Structure:**
    ```javascript
    import { html } from 'lit';
    import '../components/ds-col.js';

    export default {
      title: 'Components/ds-col',
      component: 'ds-col',
      parameters: {
        docs: {
          description: {
            component: 'A Flexbox item that can also act as a Flexbox container for vertical layouts.'
          }
        }
      },
      argTypes: {
        // Flex Item Properties
        'flex-grow': {
          control: 'number',
          description: 'How much the item can grow relative to other flex items'
        },
        'flex-shrink': {
          control: 'number',
          description: 'How much the item can shrink relative to other flex items'
        },
        'flex-basis': {
          control: 'text',
          description: 'Initial size of the flex item'
        },
        'align-self': {
          control: 'select',
          options: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
          description: 'Alignment of this item within its flex container'
        },
        'order': {
          control: 'number',
          description: 'Order of this item within its flex container'
        },
        // Flex Container Properties
        'justify-content': {
          control: 'select',
          options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
          description: 'Controls vertical alignment of flex items within this column'
        },
        'align-items': {
          control: 'select',
          options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
          description: 'Controls horizontal alignment of flex items within this column'
        },
        'gap': {
          control: 'text',
          description: 'Spacing between flex items within this column'
        },
        'wrap': {
          control: 'boolean',
          description: 'Whether flex items within this column should wrap'
        }
      }
    };

    const Template = (args) => html`
      <div style="display: flex; height: 200px; background: #f0f0f0; padding: 16px;">
        <ds-col
          flex-grow="${args['flex-grow']}"
          flex-shrink="${args['flex-shrink']}"
          flex-basis="${args['flex-basis']}"
          align-self="${args['align-self']}"
          order="${args.order}"
          justify-content="${args['justify-content']}"
          align-items="${args['align-items']}"
          gap="${args.gap}"
          ?wrap="${args.wrap}"
          style="background: white; padding: 16px; border-radius: 8px;"
        >
          <div style="background: var(--ds-color-primary); color: white; padding: 8px; border-radius: 4px;">Content 1</div>
          <div style="background: var(--ds-color-secondary); color: white; padding: 8px; border-radius: 4px;">Content 2</div>
          <div style="background: var(--ds-color-primary); color: white; padding: 8px; border-radius: 4px;">Content 3</div>
        </ds-col>
      </div>
    `;

    export const Default = Template.bind({});
    Default.args = {
      'flex-grow': 1,
      'flex-shrink': 1,
      'flex-basis': 'auto',
      'align-self': 'stretch',
      'order': 0,
      'justify-content': 'flex-start',
      'align-items': 'stretch',
      'gap': '8px',
      'wrap': false
    };

    export const GrowingColumn = Template.bind({});
    GrowingColumn.args = {
      'flex-grow': 2,
      'flex-shrink': 1,
      'flex-basis': 'auto',
      'align-self': 'stretch',
      'order': 0,
      'justify-content': 'space-around',
      'align-items': 'center',
      'gap': '16px',
      'wrap': false
    };
    ```

**3. `src/stories/ds-page.stories.js`**

  * **Purpose:** Demonstrate `ds-page` component as a page wrapper with various content layouts.
  * **Stories to include:**
      * **Default:** Basic page with header, content, and footer
      * **Complex Layout:** Page with multiple rows and columns
      * **Responsive Example:** Layout that adapts to different screen sizes
      * **Content Examples:** Different types of content within the page
  * **Example Story Structure:**
    ```javascript
    import { html } from 'lit';
    import '../components/ds-page.js';
    import '../components/ds-row.js';
    import '../components/ds-col.js';

    export default {
      title: 'Components/ds-page',
      component: 'ds-page',
      parameters: {
        docs: {
          description: {
            component: 'A consistent wrapper around application content, handling page-level layout and margins.'
          }
        }
      }
    };

    export const Default = () => html`
      <ds-page>
        <header style="background: var(--ds-color-primary); color: white; padding: 16px; text-align: center;">
          <h1>My Application</h1>
        </header>
        
        <ds-row justify-content="space-between" align-items="flex-start" gap="24px" style="margin: 24px 0;">
          <ds-col flex-grow="1" style="background: white; padding: 16px; border-radius: 8px;">
            <h2>Main Content Area</h2>
            <p>This is the main content area that grows to fill available space.</p>
            <p>It can contain any content and will expand to fill the remaining space.</p>
          </ds-col>
          
          <ds-col flex-basis="250px" style="background: white; padding: 16px; border-radius: 8px;">
            <h3>Sidebar</h3>
            <p>This sidebar has a fixed width of 250px.</p>
            <ul>
              <li>Navigation item 1</li>
              <li>Navigation item 2</li>
              <li>Navigation item 3</li>
            </ul>
          </ds-col>
        </ds-row>
        
        <footer style="background: var(--ds-color-secondary); color: white; padding: 16px; text-align: center;">
          <p>&copy; 2025 My Application</p>
        </footer>
      </ds-page>
    `;

    export const ComplexLayout = () => html`
      <ds-page>
        <header style="background: var(--ds-color-primary); color: white; padding: 16px;">
          <ds-row justify-content="space-between" align-items="center">
            <h1>Complex Layout Example</h1>
            <nav>
              <ds-row gap="16px">
                <a href="#" style="color: white; text-decoration: none;">Home</a>
                <a href="#" style="color: white; text-decoration: none;">About</a>
                <a href="#" style="color: white; text-decoration: none;">Contact</a>
              </ds-row>
            </nav>
          </ds-row>
        </header>
        
        <ds-row gap="24px" style="margin: 24px 0;">
          <ds-col flex-grow="1">
            <ds-row gap="16px" wrap>
              <ds-col flex-basis="300px" style="background: white; padding: 16px; border-radius: 8px;">
                <h3>Card 1</h3>
                <p>This card demonstrates responsive behavior.</p>
              </ds-col>
              <ds-col flex-basis="300px" style="background: white; padding: 16px; border-radius: 8px;">
                <h3>Card 2</h3>
                <p>Cards will wrap to new lines on smaller screens.</p>
              </ds-col>
              <ds-col flex-basis="300px" style="background: white; padding: 16px; border-radius: 8px;">
                <h3>Card 3</h3>
                <p>Each card maintains its minimum width.</p>
              </ds-col>
            </ds-row>
          </ds-col>
        </ds-row>
        
        <footer style="background: var(--ds-color-secondary); color: white; padding: 16px; text-align: center;">
          <p>&copy; 2025 Complex Layout Example</p>
        </footer>
      </ds-page>
    `;
    ```

-----

**Storybook Usage Instructions:**

  * **Starting Storybook:** Run `npm run storybook` to start the development server.
  * **Building Storybook:** Run `npm run build-storybook` to create a static build for deployment.
  * **Component Documentation:** Each component will have its own section in Storybook with:
      * Interactive examples
      * Attribute controls for real-time manipulation
      * Usage documentation
      * Code examples
  * **Testing:** Use Storybook's built-in testing capabilities for visual regression testing.

-----

**Detailed Component Specifications:**

For each `.js` component file:

  * Define a `class` extending `HTMLElement`.
  * Implement `constructor()`:
      * Call `super()`.
      * Attach `shadowRoot` with `mode: 'open'`.
      * Define an `HTMLTemplateElement` containing the internal markup (a `div` or `main`) and a `<style>` tag.
      * The `<style>` tag should use `@import url('/src/design_system/styles.css');` to load the external stylesheet.
      * Append the template's content to the `shadowRoot`.
      * Include a `<slot></slot>` element inside the internal `div` for content projection.
  * Implement `static get observedAttributes()` to list attributes that trigger `attributeChangedCallback`.
  * Implement `attributeChangedCallback(name, oldValue, newValue)` to react to attribute changes and apply corresponding styles or properties to the internal element.
  * Register the custom element using `customElements.define()`.

-----

**1. `ds-row.js` (src/components/ds-row.js)**

  * **Purpose:** A Flexbox container for horizontal layouts.

  * **Internal Markup:** Wraps a `div`.

  * **Default Shadow DOM Styles:**

    ```css
    :host {
        display: block; /* Custom elements are inline by default */
    }
    .row-container {
        display: flex;
        flex-direction: row;
        /* Default flex-wrap if not specified or via attribute */
    }
    ```

  * **Observable Attributes & Mapping to `.row-container`:**

      * `justify-content`: Maps to `justify-content` CSS property.
      * `align-items`: Maps to `align-items` CSS property.
      * `gap`: Maps to `gap` CSS property.
      * `wrap`: Boolean attribute. If present (`<ds-row wrap>`), sets `flex-wrap: wrap;`. If not present, `flex-wrap: nowrap;`.

  * **Example Usage:**

    ```html
    <ds-row justify-content="space-between" align-items="center" gap="16px" wrap>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
    </ds-row>
    ```

-----

**2. `ds-col.js` (src/components/ds-col.js)**

  * **Purpose:** A Flexbox item that can also act as a Flexbox container for vertical layouts.

  * **Internal Markup:** Wraps a `div`.

  * **Default Shadow DOM Styles:**

    ```css
    :host {
        display: block; /* Custom elements are inline by default */
        /* Flex item properties will be applied by ds-row parent's context */
    }
    .col-container {
        display: flex; /* Make it a flex container for its own children */
        flex-direction: column;
        /* Default flex-wrap for its own children */
    }
    ```

  * **Observable Attributes & Mapping to `.col-container` (for its own children) or `:host` (for its flex item properties):**

      * **Flex Item Properties (applied to `:host` to affect how it behaves within its parent `ds-row`):**
          * `flex-grow`: Maps to `flex-grow` CSS property.
          * `flex-shrink`: Maps to `flex-shrink` CSS property.
          * `flex-basis`: Maps to `flex-basis` CSS property.
          * `align-self`: Maps to `align-self` CSS property.
          * `order`: Maps to `order` CSS property.
      * **Flex Container Properties (applied to `.col-container` for its children):**
          * `justify-content`: Maps to `justify-content` CSS property.
          * `align-items`: Maps to `align-items` CSS property.
          * `gap`: Maps to `gap` CSS property.
          * `wrap`: Boolean attribute. If present (`<ds-col wrap>`), sets `flex-wrap: wrap;` for its children. If not present, `flex-wrap: nowrap;`.

  * **Example Usage:**

    ```html
    <ds-col flex-grow="1" align-self="stretch" justify-content="space-around">
        <p>Content Line 1</p>
        <p>Content Line 2</p>
    </ds-col>
    ```

-----

**3. `ds-page.js` (src/components/ds-page.js)**

  * **Purpose:** A consistent wrapper around application content, handling page-level layout and margins.

  * **Internal Markup:** Wraps a `main` element (semantically appropriate for main page content).

  * **Default Shadow DOM Styles:**

    ```css
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
    ```

  * **No specific observable attributes beyond standard HTML attributes.** It's designed to be a simple, opinionated page wrapper.

  * **Example Usage:**

    ```html
    <ds-page>
        <header><h1>My Application</h1></header>
        <ds-row>
            <ds-col flex-grow="1">Main Content Area</ds-col>
            <ds-col flex-basis="200px">Sidebar</ds-col>
        </ds-row>
        <footer><p>&copy; 2025</p></footer>
    </ds-page>
    ```

-----

**4. `src/design_system/styles.css`**

  * **Purpose:** Centralized stylesheet for all components, containing global design tokens (CSS variables) and common utility styles.
  * **Content:**
      * **CSS Reset/Normalization:** A small, opinionated reset (e.g., `* { box-sizing: border-box; margin: 0; padding: 0; }`).
      * **Design Tokens (CSS Variables):**
        ```css
        :root {
            /* Spacing */
            --ds-spacing-xxs: 4px;
            --ds-spacing-xs: 8px;
            --ds-spacing-sm: 12px;
            --ds-spacing-md: 16px;
            --ds-spacing-lg: 24px;
            --ds-spacing-xl: 32px;
            --ds-spacing-xxl: 48px;
            --ds-spacing-page-padding: var(--ds-spacing-lg); /* Default page padding */

            /* Colors */
            --ds-color-primary: #007bff;
            --ds-color-secondary: #6c757d;
            --ds-color-text: #333;
            --ds-color-background: #f8f9fa;

            /* Typography */
            --ds-font-family-body: sans-serif;
            --ds-font-family-heading: serif;
            --ds-font-size-base: 16px;

            /* Page specific */
            --ds-page-max-width: 1200px;
        }
        ```
      * **Global base styles (optional):** For `body`, `html` (outside Shadow DOM), etc.
      * **Utility classes (optional):** For example, `.ds-text-center { text-align: center; }`.

-----

**5. `index.html`**

  * **Purpose:** A simple HTML file to demonstrate the usage of the custom elements.
  * **Content:**
      * Basic HTML5 boilerplate.
      * Import all `.js` component files using `<script type="module" src="src/components/ds-row.js"></script>` etc., in the `<head>` or before the closing `</body>` tag.
      * Include a `<ds-page>` element containing examples of `<ds-row>` and `<ds-col>` components, demonstrating various attribute combinations.

-----

**LLM Execution Guidance:**

  * Generate each file completely as specified.
  * Ensure all attributes listed for `ds-row` and `ds-col` are properly observed in `static get observedAttributes()` and handled in `attributeChangedCallback` to apply the corresponding styles to their internal `div` element. For boolean attributes like `wrap`, check `this.hasAttribute('wrap')`.
  * Maintain semantic HTML where possible (e.g., `main` for `ds-page`).
  * Add comments where necessary to explain the code.

-----