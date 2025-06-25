# AI Design System - Web Components

A foundational design system built with native Web Components, focusing on essential Flexbox-based layout components (`ds-row`, `ds-col`, `ds-page`). The project demonstrates a "close to HTML spec" approach, uses plain CSS for styling, and prioritizes experimentation/readability.

## 🎯 Project Goal

Create a foundational design system built with native Web Components, focusing on essential Flexbox-based layout components. The project demonstrates a "close to HTML spec" approach, uses plain CSS for styling, and prioritizes experimentation/readability.

## 🏗️ Core Principles

- **Native Web Components:** Use `Custom Elements API`, `Shadow DOM`, and `HTML Templates`
- **Naming Convention:** All custom elements are prefixed with `ds-` (e.g., `<ds-row>`)
- **Attribute Reflection:** Attributes set on the `ds-` component control the internal wrapped element's CSS properties
- **Plain CSS:** All styling managed via external `.css` files, leveraging CSS custom properties (variables)
- **Shadow DOM Mode:** Use `mode: 'open'` for Shadow DOM to facilitate experimentation and debugging

## 📁 Project Structure

```
/design-system-project
├── src/
│   ├── components/
│   │   ├── ds-row.js          # Flexbox container for horizontal layouts
│   │   ├── ds-col.js          # Flexbox item/container for vertical layouts
│   │   └── ds-page.js         # Page wrapper with consistent margins
│   ├── stories/
│   │   ├── ds-row.stories.js  # Storybook stories for ds-row
│   │   ├── ds-col.stories.js  # Storybook stories for ds-col
│   │   └── ds-page.stories.js # Storybook stories for ds-page
│   └── design_system/
│       └── styles.css         # Centralized styles and design tokens
├── .storybook/
│   ├── main.js               # Storybook configuration
│   ├── preview.js            # Storybook preview settings
│   └── manager.js            # Storybook UI configuration
├── package.json              # Project dependencies and scripts
├── index.html               # Demo page showing component usage
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+) and npm
- Modern web browser with Web Components support

### Installation

1. **Clone or download the project**
2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Demo

1. **Open the demo page:**
   ```bash
   # Open index.html in your browser
   open index.html
   ```
   
   Or serve it with a local server:
   ```bash
   npx serve .
   ```

### Running Storybook

1. **Start Storybook development server:**
   ```bash
   npm run storybook
   ```
   
   This will start Storybook on `http://localhost:6006`
   
2. **Build Storybook for production:**
   ```bash
   npm run build-storybook
   ```

## 🧩 Components

### `ds-row`

A Flexbox container for horizontal layouts.

**Observable Attributes:**
- `justify-content`: Controls horizontal alignment (`flex-start`, `center`, `space-between`, etc.)
- `align-items`: Controls vertical alignment (`stretch`, `center`, `flex-start`, etc.)
- `gap`: Spacing between flex items
- `wrap`: Boolean attribute for flex wrapping

**Example Usage:**
```html
<ds-row justify-content="space-between" align-items="center" gap="16px" wrap>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</ds-row>
```

### `ds-col`

A Flexbox item that can also act as a Flexbox container for vertical layouts.

**Flex Item Properties (applied to `:host`):**
- `flex-grow`: How much the item can grow
- `flex-shrink`: How much the item can shrink
- `flex-basis`: Initial size of the flex item
- `align-self`: Alignment within its flex container
- `order`: Order within its flex container

**Flex Container Properties (applied to internal container):**
- `justify-content`: Controls vertical alignment of its children
- `align-items`: Controls horizontal alignment of its children
- `gap`: Spacing between its children
- `wrap`: Boolean attribute for flex wrapping of its children

**Example Usage:**
```html
<ds-col flex-grow="1" align-self="stretch" justify-content="space-around">
    <p>Content Line 1</p>
    <p>Content Line 2</p>
</ds-col>
```

### `ds-page`

A consistent wrapper around application content, handling page-level layout and margins.

**Features:**
- Full viewport height (`min-height: 100vh`)
- Configurable padding via CSS variable `--ds-spacing-page-padding`
- Optional max-width via CSS variable `--ds-page-max-width`
- Flex container for its children

**Example Usage:**
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

## 🎨 Design Tokens

The design system uses CSS custom properties (variables) defined in `src/design_system/styles.css`:

### Spacing
```css
--ds-spacing-xxs: 4px;
--ds-spacing-xs: 8px;
--ds-spacing-sm: 12px;
--ds-spacing-md: 16px;
--ds-spacing-lg: 24px;
--ds-spacing-xl: 32px;
--ds-spacing-xxl: 48px;
--ds-spacing-page-padding: var(--ds-spacing-lg);
```

### Colors
```css
--ds-color-primary: #007bff;
--ds-color-secondary: #6c757d;
--ds-color-text: #333;
--ds-color-background: #f8f9fa;
```

### Typography
```css
--ds-font-family-body: sans-serif;
--ds-font-family-heading: serif;
--ds-font-size-base: 16px;
```

### Page Specific
```css
--ds-page-max-width: 1200px;
```

## 🔧 Development

### Component Structure

Each component follows this pattern:

1. **Class Definition:** Extends `HTMLElement`
2. **Constructor:** Sets up Shadow DOM with `mode: 'open'`
3. **Template:** Contains internal markup and styles
4. **Attribute Observation:** `static get observedAttributes()`
5. **Attribute Changes:** `attributeChangedCallback()` method
6. **Element Registration:** `customElements.define()`

### Adding New Components

1. Create a new `.js` file in `src/components/`
2. Follow the established pattern
3. Add corresponding story file in `src/stories/`
4. Import in `index.html` for testing

### CSS Import Strategy

Components use `@import url('/src/design_system/styles.css');` in their Shadow DOM styles to load the centralized design system styles.

## 🌐 Browser Support

- Modern browsers with Web Components support
- Chrome 67+, Firefox 63+, Safari 10.1+, Edge 79+
- No polyfills required for basic functionality

## 📚 Storybook

Storybook provides:
- Interactive component documentation
- Real-time attribute manipulation
- Visual testing capabilities
- Component usage examples

### Storybook Features

- **Interactive Controls:** Real-time attribute manipulation
- **Multiple Stories:** Various use cases and configurations
- **Documentation:** Component descriptions and usage guidelines
- **Visual Testing:** Screenshot testing capabilities

### Storybook Configuration

The project uses Storybook 9.x with the following configuration:

- **Framework:** `@storybook/web-components`
- **Addons:** Essentials, Interactions, Links
- **Stories:** Located in `src/stories/`
- **Preview:** Global styles and decorators in `.storybook/preview.js`
- **Manager:** UI configuration in `.storybook/manager.js`

## 🤝 Contributing

1. Follow the established component patterns
2. Use the design tokens for consistency
3. Add comprehensive stories for new components
4. Test across different browsers
5. Update documentation as needed

## 📄 License

MIT License - see LICENSE file for details

## 🎯 Future Enhancements

- Additional layout components (`ds-grid`, `ds-stack`)
- Form components (`ds-input`, `ds-button`)
- Typography components (`ds-text`, `ds-heading`)
- Theme switching capabilities
- Build system integration
- TypeScript support 