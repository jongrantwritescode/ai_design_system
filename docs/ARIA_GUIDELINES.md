# ARIA Guidelines for Design System Components

## Overview

This document provides comprehensive guidelines for implementing and using ARIA (Accessible Rich Internet Applications) attributes across the design system components. All components in this design system are built with accessibility in mind and include built-in ARIA validation and warnings.

## Component ARIA Requirements

### ds-button

**Required ARIA Attributes:** None (but accessible name is required)

**Supported ARIA Attributes:**
- `aria-label` - Provides accessible name when no visible text is present
- `aria-describedby` - References description elements
- `aria-pressed` - Indicates toggle button state (`true`, `false`, `mixed`, `undefined`)
- `aria-expanded` - Indicates expanded state for dropdown/menu buttons (`true`, `false`, `undefined`)
- `aria-haspopup` - Indicates popup type (`false`, `true`, `menu`, `listbox`, `tree`, `grid`, `dialog`)

**Static ARIA Attributes:**
- `role="button"` (applied automatically)

**Usage Examples:**

```html
<!-- Basic button with accessible name -->
<ds-button>Submit Form</ds-button>

<!-- Button with aria-label -->
<ds-button aria-label="Close dialog">×</ds-button>

<!-- Toggle button -->
<ds-button aria-pressed="false">Mute</ds-button>

<!-- Dropdown button -->
<ds-button aria-expanded="false" aria-haspopup="menu">
  Options ▼
</ds-button>

<!-- Button with description -->
<ds-button aria-describedby="button-help">Save</ds-button>
<div id="button-help">Saves your changes to the server</div>
```

### Future Components

#### Form Inputs
- `aria-invalid` - Indicates validation state
- `aria-required` - Indicates required field
- `aria-describedby` - References error messages or help text

#### Select/Dropdown
- `aria-expanded` - Indicates dropdown state
- `aria-haspopup` - Indicates popup type
- `aria-owns` - References owned elements

#### Checkbox/Radio
- `aria-checked` - Indicates checked state
- `aria-describedby` - References help text

#### Tabs
- `aria-selected` - Indicates selected tab
- `aria-controls` - References controlled panel
- `role="tab"` - Semantic role

#### Dialog/Modal
- `aria-modal` - Indicates modal behavior
- `aria-labelledby` - References dialog title
- `aria-describedby` - References dialog description

## ARIA Usage Patterns

### 1. Accessible Names

Every interactive element must have an accessible name. This can be provided through:

1. **Visible text content** (preferred)
2. **aria-label** attribute
3. **aria-labelledby** attribute (references another element)

```html
<!-- Good: Visible text -->
<ds-button>Save Changes</ds-button>

<!-- Good: aria-label for icon buttons -->
<ds-button aria-label="Close dialog">×</ds-button>

<!-- Good: aria-labelledby for complex labels -->
<ds-button aria-labelledby="button-title button-subtitle">
  <span id="button-title">Save</span>
  <span id="button-subtitle">All changes</span>
</ds-button>
```

### 2. Descriptions and Help Text

Use `aria-describedby` to provide additional context:

```html
<ds-button aria-describedby="save-help">Save</ds-button>
<div id="save-help">Saves your work to the cloud</div>
```

### 3. State Management

For interactive components, manage ARIA states properly:

```html
<!-- Toggle button with proper state management -->
<ds-button 
  aria-pressed="false" 
  onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed') === 'true' ? 'false' : 'true')">
  Mute
</ds-button>
```

## Testing ARIA Implementation

### Automated Testing

The design system includes built-in ARIA validation that will:

1. **Warn about missing accessible names**
2. **Validate ARIA token values**
3. **Check ID references exist**
4. **Provide helpful error messages**

### Manual Testing

#### Screen Reader Testing

1. **NVDA (Windows)**
   - Install NVDA
   - Navigate to components using Tab key
   - Listen for proper announcements

2. **JAWS (Windows)**
   - Install JAWS
   - Test keyboard navigation
   - Verify ARIA attributes are announced

3. **VoiceOver (macOS)**
   - Enable VoiceOver (Cmd + F5)
   - Navigate with VO + arrow keys
   - Check for proper announcements

4. **TalkBack (Android)**
   - Enable TalkBack in accessibility settings
   - Test touch navigation
   - Verify ARIA attributes

#### Keyboard Navigation Testing

1. **Tab Navigation**
   - All interactive elements should be reachable via Tab
   - Tab order should be logical
   - Focus indicators should be visible

2. **Enter/Space Activation**
   - Buttons should activate with Enter or Space
   - Focus should be managed properly

3. **Arrow Key Navigation**
   - Radio buttons and checkboxes should use arrow keys
   - Dropdowns should support arrow key selection

### Accessibility Validation Tools

1. **axe-core**
   ```bash
   npm install axe-core
   ```

2. **Lighthouse Accessibility Audit**
   - Run in Chrome DevTools
   - Check for ARIA violations

3. **WAVE Web Accessibility Evaluator**
   - Browser extension or online tool
   - Comprehensive accessibility testing

## Console Warnings

The design system provides helpful console warnings for ARIA issues:

```
[DsButton] ARIA validation: Button has no accessible name (text, aria-label, or aria-labelledby required)
[DsButton] ARIA validation: Invalid value 'invalid' for aria-haspopup. Allowed: false, true, menu, listbox, tree, grid, dialog
[DsButton] ARIA validation: Element referenced by aria-describedby ('help-text') does not exist in the document.
```

## Best Practices

### 1. Use Semantic HTML

Prefer semantic HTML elements over ARIA when possible:

```html
<!-- Good: Native button -->
<ds-button>Submit</ds-button>

<!-- Avoid: Div with button role -->
<div role="button">Submit</div>
```

### 2. Test with Screen Readers

Always test your components with actual screen readers, not just validation tools.

### 3. Manage Focus

Ensure proper focus management for interactive components:

```javascript
// Example: Focus management for modal
function openModal() {
  modal.show();
  modal.querySelector('[data-focus]').focus();
}

function closeModal() {
  modal.hide();
  triggerButton.focus(); // Return focus to trigger
}
```

### 4. Provide Context

Use ARIA to provide additional context when needed:

```html
<ds-button 
  aria-label="Delete user account"
  aria-describedby="delete-warning">
  Delete
</ds-button>
<div id="delete-warning">This action cannot be undone</div>
```

## Resources

- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
- [MDN ARIA Documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)

## Support

For questions about ARIA implementation in this design system:

1. Check the console for validation warnings
2. Review this documentation
3. Test with screen readers
4. Consult the ARIA Authoring Practices Guide 