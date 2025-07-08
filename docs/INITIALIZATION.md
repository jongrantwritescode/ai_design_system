# Design System Initialization

The design system provides a flexible initialization system that allows you to customize design tokens, themes, and component behavior without modifying the core code.

## Quick Start

```javascript
import { init } from 'standards-ui';

// Initialize with custom tokens
const result = init({
  colors: {
    primary: '#your-brand-color',
    secondary: '#your-secondary-color'
  },
  spacing: {
    md: '20px'
  }
});

if (result.success) {
  console.log('Design system initialized successfully!');
} else {
  console.error('Initialization failed:', result.errors);
}
```

## Design Tokens Structure

The design system uses a comprehensive token structure that covers all aspects of the UI:

### Colors
```javascript
colors: {
  primary: '#007bff',        // Primary brand color
  primaryDark: '#0056b3',    // Darker shade of primary
  secondary: '#6c757d',      // Secondary brand color
  text: '#212529',           // Main text color
  background: '#ffffff',     // Main background color
  success: '#28a745',        // Success state color
  error: '#dc3545',          // Error state color
  warning: '#ffc107',        // Warning state color
  info: '#17a2b8'            // Info state color
}
```

### Spacing
```javascript
spacing: {
  xs: '4px',                 // Extra small spacing
  sm: '8px',                 // Small spacing
  md: '16px',                // Medium spacing
  lg: '24px',                // Large spacing
  xl: '32px',                // Extra large spacing
  pagePadding: '20px'        // Page-level padding
}
```

### Typography
```javascript
typography: {
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  fontSize: '16px',
  lineHeight: '1.5'
}
```

### Forms
```javascript
forms: {
  borderColor: '#ced4da',    // Form border color
  borderRadius: '4px',       // Form border radius
  textColor: '#495057',      // Form text color
  errorColor: '#dc3545',     // Form error color
  errorBackground: '#f8d7da', // Form error background
  errorBorder: '#f5c6cb',    // Form error border
  successColor: '#155724',   // Form success color
  successBackground: '#d4edda', // Form success background
  successBorder: '#c3e6cb',  // Form success border
  infoColor: '#0c5460',      // Form info color
  infoBackground: '#d1ecf1', // Form info background
  infoBorder: '#bee5eb'      // Form info border
}
```

### Layout
```javascript
layout: {
  pageMaxWidth: '1200px',    // Maximum page width
  containerPadding: '20px'   // Container padding
}
```

### Components
```javascript
components: {
  button: {
    borderRadius: '4px',     // Button border radius
    padding: '8px 16px'      // Button padding
  },
  input: {
    borderRadius: '4px',     // Input border radius
    padding: '8px 12px'      // Input padding
  }
}
```

## Initialization Options

The `init` function accepts an options object as the second parameter:

```javascript
init(tokens, {
  validate: true,      // Validate tokens (default: true)
  injectCSS: true,     // Inject CSS into document (default: true)
  console: true        // Log initialization info (default: true)
});
```

### Options

- **`validate`** (boolean): Whether to validate the provided tokens for required properties
- **`injectCSS`** (boolean): Whether to inject the CSS custom properties into the document
- **`console`** (boolean): Whether to log initialization information to the console

## Token Validation

The system validates tokens to ensure all required properties are present:

```javascript
const result = init({
  colors: {
    // Missing required colors will cause validation to fail
  }
});

if (!result.success) {
  console.error('Validation errors:', result.errors);
  // Output: ["Missing required color: primary", "Missing required color: text", ...]
}
```

## Updating Tokens

You can update tokens after initialization:

```javascript
import { updateTokens } from 'standards-ui';

// Update specific tokens
const result = updateTokens({
  colors: {
    primary: '#new-primary-color'
  },
  spacing: {
    md: '24px'
  }
});

if (result.success) {
  console.log('Tokens updated successfully!');
}
```

## Getting Current Tokens

Retrieve the currently applied tokens:

```javascript
import { getCurrentTokens } from 'standards-ui';

const currentTokens = getCurrentTokens();
console.log('Current primary color:', currentTokens.colors.primary);
```

## Resetting to Defaults

Reset all tokens to their default values:

```javascript
import { resetTokens } from 'standards-ui';

const result = resetTokens();
if (result.success) {
  console.log('Tokens reset to defaults');
}
```

## Theme Switching Example

Here's a complete example of theme switching:

```javascript
import { init, updateTokens } from 'standards-ui';

const themes = {
  light: {
    colors: {
      primary: '#007bff',
      text: '#212529',
      background: '#ffffff'
    }
  },
  dark: {
    colors: {
      primary: '#0d6efd',
      text: '#f8f9fa',
      background: '#212529'
    },
    forms: {
      borderColor: '#495057',
      textColor: '#f8f9fa'
    }
  }
};

let currentTheme = 'light';

function switchTheme(themeName) {
  const theme = themes[themeName];
  const result = updateTokens(theme);
  
  if (result.success) {
    currentTheme = themeName;
    console.log(`Switched to ${themeName} theme`);
  }
}

// Initialize with light theme
init(themes.light);

// Switch to dark theme
switchTheme('dark');
```

## CSS Custom Properties

The system automatically generates CSS custom properties from your tokens:

```css
:root {
  --ds-color-primary: #007bff;
  --ds-color-text: #212529;
  --ds-spacing-md: 16px;
  --ds-font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --ds-form-borderRadius: 4px;
  /* ... and many more */
}
```

These properties are used throughout the component styles and can be referenced in your own CSS.

## TypeScript Support

The design system includes TypeScript declarations for full type safety:

```typescript
import { init, DesignTokens } from 'standards-ui';

const tokens: Partial<DesignTokens> = {
  colors: {
    primary: '#your-color'
  }
};

const result = init(tokens);
```

## Best Practices

1. **Initialize Early**: Call `init()` as early as possible in your application lifecycle
2. **Validate in Development**: Keep validation enabled during development to catch token issues
3. **Use Partial Tokens**: Only override the tokens you need to customize
4. **Test Theme Switching**: Ensure your application works with different token configurations
5. **Document Your Tokens**: Keep a record of your custom token values for consistency

## Examples

See the `examples/custom-tokens/` directory for a complete working example that demonstrates:
- Theme switching
- Token customization
- Real-time token preview
- Component rendering with custom tokens

## Troubleshooting

### Common Issues

1. **Tokens not applying**: Ensure `injectCSS: true` in your init options
2. **Validation errors**: Check that all required properties are provided
3. **CSS not updating**: Verify that the style element with id `ds-design-tokens` is present in the document head

### Debug Mode

Enable console logging to debug initialization issues:

```javascript
init(tokens, { console: true });
```

This will log detailed information about the initialization process, including the generated CSS and any validation errors. 