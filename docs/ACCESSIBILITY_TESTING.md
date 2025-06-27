# Accessibility Testing Guide

## Overview

This guide provides comprehensive testing procedures for ensuring the accessibility of design system components. It covers automated testing, manual testing with screen readers, keyboard navigation, and validation tools.

## Automated Testing

### Running ARIA Tests

The design system includes automated ARIA validation tests built with Vitest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:ui

# Run tests once
npm run test:run
```

### Test Coverage

The automated tests cover:

1. **Static ARIA Attributes**
   - Default roles are applied correctly
   - Static attributes cannot be overridden
   - Component initialization applies ARIA properly

2. **Dynamic ARIA Attributes**
   - HTML attributes are properly applied
   - JavaScript properties work correctly
   - Attribute changes trigger updates
   - Attribute removal works properly

3. **Validation System**
   - Required attributes are checked
   - Token values are validated
   - ID references are verified
   - Console warnings are generated

4. **Component-Specific Features**
   - Button accessible name calculation
   - ARIA property accessors
   - Component-specific validation rules

## Manual Testing Procedures

### Screen Reader Testing

#### NVDA (Windows)

1. **Installation**
   - Download from [nvaccess.org](https://www.nvaccess.org/)
   - Install and restart computer

2. **Testing Procedure**
   ```bash
   # Start Storybook
   npm run storybook
   ```
   - Navigate to component stories
   - Use Tab key to move between elements
   - Listen for proper announcements
   - Test all interactive elements

3. **What to Listen For**
   - Element name and role
   - State information (pressed, expanded, etc.)
   - Description text when provided
   - Proper focus announcements

#### JAWS (Windows)

1. **Installation**
   - Download trial from [freedomscientific.com](https://www.freedomscientific.com/)
   - Install and configure

2. **Testing Procedure**
   - Use Tab for navigation
   - Use JAWS key + Space for virtual cursor
   - Test keyboard shortcuts
   - Verify ARIA attributes are announced

#### VoiceOver (macOS)

1. **Enable VoiceOver**
   - System Preferences > Accessibility > VoiceOver
   - Or press Cmd + F5

2. **Testing Commands**
   - VO + Right/Left: Navigate elements
   - VO + Space: Activate elements
   - VO + Shift + Down: Enter element
   - VO + Shift + Up: Exit element

3. **Testing Procedure**
   - Navigate through all components
   - Test interactive elements
   - Verify announcements match expectations

#### TalkBack (Android)

1. **Enable TalkBack**
   - Settings > Accessibility > TalkBack
   - Turn on TalkBack

2. **Testing Procedure**
   - Use touch navigation
   - Test gesture controls
   - Verify ARIA attributes are announced

### Keyboard Navigation Testing

#### Tab Navigation

1. **Test Tab Order**
   ```html
   <!-- Navigate through this order -->
   <ds-button>First</ds-button>
   <ds-text-input>Second</ds-text-input>
   <ds-checkbox>Third</ds-checkbox>
   ```

2. **Check Focus Indicators**
   - Focus should be clearly visible
   - Focus ring should be high contrast
   - Focus should not be lost during interactions

#### Enter/Space Activation

1. **Button Testing**
   - Press Enter on buttons
   - Press Space on buttons
   - Verify both work correctly

2. **Form Controls**
   - Test Enter on form inputs
   - Test Space on checkboxes/radio buttons
   - Verify proper activation

#### Arrow Key Navigation

1. **Radio Button Groups**
   ```html
   <ds-radio name="option" value="1">Option 1</ds-radio>
   <ds-radio name="option" value="2">Option 2</ds-radio>
   <ds-radio name="option" value="3">Option 3</ds-radio>
   ```
   - Use arrow keys to navigate
   - Verify selection changes
   - Check ARIA states update

2. **Dropdown/Select**
   - Use arrow keys to open
   - Navigate options with arrows
   - Use Enter to select
   - Use Escape to close

### Focus Management Testing

#### Modal/Dialog Testing

1. **Open Modal**
   - Focus should move to modal
   - Focus should be trapped inside modal
   - Tab should cycle within modal only

2. **Close Modal**
   - Focus should return to trigger
   - Focus should not be lost
   - Background should be properly hidden

#### Dynamic Content

1. **Content Updates**
   - Focus should be maintained during updates
   - New content should be announced
   - Focus should not jump unexpectedly

2. **Error States**
   - Error messages should be announced
   - Focus should move to error if appropriate
   - ARIA invalid state should be set

## Validation Tools

### axe-core Integration

1. **Installation**
   ```bash
   npm install axe-core
   ```

2. **Usage in Tests**
   ```javascript
   import axe from 'axe-core';

   it('should pass accessibility tests', async () => {
     const results = await axe.run();
     expect(results.violations).toEqual([]);
   });
   ```

3. **Manual Testing**
   ```javascript
   // In browser console
   axe.run((err, results) => {
     if (results.violations.length > 0) {
       console.log('Accessibility violations:', results.violations);
     }
   });
   ```

### Lighthouse Accessibility Audit

1. **Run Audit**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Check "Accessibility" category
   - Generate report

2. **Review Results**
   - Check for ARIA violations
   - Review color contrast issues
   - Verify semantic HTML usage

### WAVE Web Accessibility Evaluator

1. **Browser Extension**
   - Install WAVE extension
   - Navigate to your page
   - Click WAVE icon to analyze

2. **Online Tool**
   - Go to [wave.webaim.org](https://wave.webaim.org/)
   - Enter URL or upload file
   - Review accessibility report

## Testing Checklist

### Component Testing Checklist

For each component, verify:

- [ ] **Accessible Name**
  - [ ] Has visible text or aria-label
  - [ ] Screen reader announces name correctly
  - [ ] Name is descriptive and clear

- [ ] **Role and State**
  - [ ] Correct ARIA role is applied
  - [ ] States are announced (pressed, expanded, etc.)
  - [ ] State changes are announced

- [ ] **Keyboard Navigation**
  - [ ] Can be reached with Tab
  - [ ] Can be activated with Enter/Space
  - [ ] Arrow keys work if applicable
  - [ ] Focus is visible and clear

- [ ] **ARIA Attributes**
  - [ ] Required attributes are present
  - [ ] Token values are valid
  - [ ] ID references exist
  - [ ] No console warnings

### Page-Level Testing Checklist

- [ ] **Document Structure**
  - [ ] Proper heading hierarchy
  - [ ] Landmark regions defined
  - [ ] Skip links available

- [ ] **Navigation**
  - [ ] Tab order is logical
  - [ ] Focus management works
  - [ ] No keyboard traps

- [ ] **Content**
  - [ ] Images have alt text
  - [ ] Links are descriptive
  - [ ] Color is not the only indicator

## Common Issues and Solutions

### Issue: "Button has no accessible name"

**Solution:**
```html
<!-- Add visible text -->
<ds-button>Save</ds-button>

<!-- Or add aria-label -->
<ds-button aria-label="Save changes">💾</ds-button>
```

### Issue: "Invalid ARIA token value"

**Solution:**
```html
<!-- Use valid values -->
<ds-button aria-haspopup="menu">Options</ds-button>
<ds-button aria-pressed="false">Toggle</ds-button>
```

### Issue: "Element referenced does not exist"

**Solution:**
```html
<!-- Ensure referenced element exists -->
<ds-button aria-describedby="help-text">Submit</ds-button>
<div id="help-text">This will submit your form</div>
```

### Issue: Focus not visible

**Solution:**
```css
/* Add focus styles */
:focus {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}
```

## Reporting Issues

When reporting accessibility issues:

1. **Include Context**
   - Component name and version
   - Browser and screen reader used
   - Steps to reproduce

2. **Provide Details**
   - Expected vs actual behavior
   - Console warnings/errors
   - Screenshots if helpful

3. **Test Multiple Tools**
   - Check with multiple screen readers
   - Verify with validation tools
   - Test keyboard navigation

## Resources

- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [NVDA Documentation](https://www.nvaccess.org/about-nvda/)
- [VoiceOver Guide](https://support.apple.com/guide/voiceover/welcome/vo) 