# Design System - Web Components

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Storybook-blue?style=flat-square)](https://jongrantwritescode.github.io/ai_design_system/storybook)

A comprehensive design system built with native Web Components, featuring layout components and form elements with consistent styling and behavior.

## Features

- **Native Web Components**: Built using vanilla JavaScript and Web Components standards
- **Shadow DOM**: Encapsulated styling with `mode: 'open'` for experimentation
- **CSS Custom Properties**: Design tokens for consistent theming
- **Flexbox Layout**: Responsive layout system with `ds-row` and `ds-col`
- **Form Components**: Complete set of form elements with accessibility support
- **Customizable Design Tokens**: Initialize with your own brand colors, spacing, and typography
- **Theme Switching**: Dynamic theme switching with runtime token updates
- **TypeScript Support**: Full TypeScript declarations for type safety
- **Storybook Integration**: Interactive documentation and testing
- **JSDoc Documentation**: Comprehensive API documentation
- **No Dependencies**: Pure vanilla JavaScript implementation

## Components

### Layout Components
- `ds-page` - Page container with consistent max-width and padding
- `ds-row` - Flexbox row container with configurable alignment and spacing
- `ds-col` - Flexbox column container with configurable growth and alignment

### Form Components
- `ds-form` - Form container with validation and accessibility support
- `ds-text-input` - Text input with support for various input types
- `ds-button` - Button component with variants and types
- `ds-radio` - Radio button for single selection within groups
- `ds-checkbox` - Checkbox for individual or grouped selections
- `ds-textarea` - Multi-line text input
- `ds-select` - Dropdown select with single/multiple selection
- `ds-option` - Select option component
- `ds-label` - Form label with association support
- `ds-fieldset` - Form grouping container
- `ds-legend` - Fieldset caption/title

## Installation

```bash
npm install standards-ui
```

## Quick Start

### 1. Initialize the Design System

```javascript
import { init } from 'standards-ui';

// Initialize with default tokens
init();

// Or customize with your own tokens
init({
  colors: {
    primary: '#your-brand-color',
    secondary: '#your-secondary-color'
  },
  spacing: {
    md: '20px'
  }
});
```

### 2. Use Components

Include the design system styles and components in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="src/styles/styles.css">
</head>
<body>
    <!-- Import components -->
    <script type="module" src="src/components/ds-page.js"></script>
    <script type="module" src="src/components/ds-row.js"></script>
    <script type="module" src="src/components/ds-col.js"></script>
    <script type="module" src="src/components/ds-text-input.js"></script>
    <!-- Import other components as needed -->
    
    <ds-page>
        <ds-row>
            <ds-col>
                <h1>My Application</h1>
            </ds-col>
        </ds-row>
    </ds-page>
</body>
</html>
```

## Documentation

- **[Storybook](https://jongrantwritescode.github.io/ai_design_system/storybook/)**: Interactive component documentation and testing
- **[Examples](./examples/)**: Example implementations and use cases
- **[JSDoc Documentation](./docs-output/)**: Comprehensive API documentation
- **[Documentation](./docs/)**: Additional documentation in the docs folder

## Design Tokens

The design system uses CSS custom properties for consistent theming:


## Browser Support

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Development

### Project Structure

```
ai_design_system/
├── src/                     # Source code and components
│   ├── components/          # Web Components
│   ├── design_system/       # Design tokens and base styles
│   └── stories/             # Storybook stories
├── docs/                    # Documentation
├── plans/                   # Development plans and specifications
├── tests/                   # Test files
├── examples/                # Example implementations
├── .storybook/              # Storybook configuration
├── .github/                 # GitHub workflows and templates
├── docs-output/             # JSDoc documentation output
├── storybook-static/        # Built Storybook files
├── node_modules/            # Dependencies
└── README.md
```

### Available Scripts

- `npm start`: Start development server
- `npm run storybook`: Start Storybook
- `npm run build-storybook`: Build Storybook for production
- `npm run generate-docs`: Generate JSDoc documentation
- `npm run serve-docs`: Generate docs and serve locally
- `npm test`: Run tests (if configured)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 