# Design System - Web Components

A comprehensive design system built with native Web Components, featuring layout components and form elements with consistent styling and behavior.

## Features

- **Native Web Components**: Built using vanilla JavaScript and Web Components standards
- **Shadow DOM**: Encapsulated styling with `mode: 'open'` for experimentation
- **CSS Custom Properties**: Design tokens for consistent theming
- **Flexbox Layout**: Responsive layout system with `ds-row` and `ds-col`
- **Form Components**: Complete set of form elements with accessibility support
- **Storybook Integration**: Interactive documentation and testing
- **No Dependencies**: Pure vanilla JavaScript implementation

## Components

### Layout Components

#### `ds-page`
A page container component that provides consistent max-width and padding.

```html
<ds-page>
  <!-- Page content -->
</ds-page>
```

#### `ds-row`
A flexbox row container with configurable alignment and spacing.

```html
<ds-row justify-content="center" align-items="center" gap="16px">
  <!-- Row content -->
</ds-row>
```

**Attributes:**
- `justify-content`: flex-start, center, flex-end, space-between, space-around
- `align-items`: stretch, flex-start, center, flex-end, baseline
- `gap`: CSS gap value (e.g., "8px", "1rem")
- `wrap`: Enable flex wrapping

#### `ds-col`
A flexbox column container with configurable growth and alignment.

```html
<ds-col flex-grow="2" justify-content="center" align-items="center">
  <!-- Column content -->
</ds-col>
```

**Attributes:**
- `flex-grow`: CSS flex-grow value
- `flex-basis`: CSS flex-basis value
- `justify-content`: flex-start, center, flex-end, space-between, space-around
- `align-items`: stretch, flex-start, center, flex-end, baseline
- `align-self`: auto, flex-start, center, flex-end, stretch, baseline
- `gap`: CSS gap value

### Form Components

#### `ds-text-input`
A text input component that wraps native input elements.

```html
<ds-text-input 
  type="email" 
  placeholder="Enter your email" 
  required 
  name="email">
</ds-text-input>
```

**Supported Types:** text, email, password, number, tel, url, search

**Attributes:**
- `type`: Input type (default: "text")
- `value`: Current input value
- `placeholder`: Placeholder text
- `disabled`: Disable the input
- `readonly`: Make the input read-only
- `required`: Mark as required
- `name`: Form field name
- `id`: Unique identifier
- `aria-label`: Accessibility label

#### `ds-button`
A button component that wraps native button elements.

```html
<ds-button type="submit" disabled>
  Submit Form
</ds-button>
```

**Attributes:**
- `type`: button, submit, reset (default: "button")
- `disabled`: Disable the button
- `name`: Form field name
- `value`: Button value

#### `ds-radio`
A radio button component for single selection within a group.

```html
<ds-radio name="preference" value="option1" checked>
  Option 1
</ds-radio>
```

**Attributes:**
- `name`: Radio group name (required for grouping)
- `value`: Radio button value
- `checked`: Mark as selected
- `disabled`: Disable the radio button
- `readonly`: Make read-only
- `required`: Mark as required
- `id`: Unique identifier

#### `ds-checkbox`
A checkbox component for individual or grouped selections.

```html
<ds-checkbox name="interests" value="technology" checked>
  Technology
</ds-checkbox>
```

**Attributes:**
- `name`: Checkbox name
- `value`: Checkbox value
- `checked`: Mark as selected
- `disabled`: Disable the checkbox
- `readonly`: Make read-only
- `required`: Mark as required
- `id`: Unique identifier

#### `ds-textarea`
A textarea component for multi-line text input.

```html
<ds-textarea 
  placeholder="Enter your message" 
  rows="4" 
  name="message">
</ds-textarea>
```

**Attributes:**
- `value`: Current textarea value
- `placeholder`: Placeholder text
- `rows`: Number of visible rows
- `cols`: Number of visible columns
- `disabled`: Disable the textarea
- `readonly`: Make read-only
- `required`: Mark as required
- `name`: Form field name
- `id`: Unique identifier

#### `ds-select`
A select dropdown component with support for single and multiple selection.

```html
<ds-select name="country" required>
  <ds-option value="">Please select...</ds-option>
  <ds-option value="us">United States</ds-option>
  <ds-option value="ca" selected>Canada</ds-option>
</ds-select>
```

**Attributes:**
- `value`: Currently selected value
- `disabled`: Disable the select
- `required`: Mark as required
- `name`: Form field name
- `multiple`: Enable multiple selection
- `size`: Number of visible options

#### `ds-option`
An option component for use within `ds-select` elements.

```html
<ds-option value="option1" selected disabled>
  Option 1
</ds-option>
```

**Attributes:**
- `value`: Option value
- `disabled`: Disable the option
- `selected`: Mark as selected

#### `ds-label`
A label component for form control association.

```html
<ds-label for="input-id">
  Field Label
</ds-label>
```

**Attributes:**
- `for`: ID of the associated form control

#### `ds-fieldset`
A fieldset component for grouping related form controls.

```html
<ds-fieldset>
  <ds-legend>Personal Information</ds-legend>
  <!-- Form controls -->
</ds-fieldset>
```

#### `ds-legend`
A legend component for providing captions to fieldsets.

```html
<ds-legend>
  Section Title
</ds-legend>
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd design-system-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open Storybook for interactive documentation:
```bash
npm run storybook
```

## Usage

### Basic Setup

Include the design system styles and components in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="src/design_system/styles.css">
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

### Form Example

```html
<form>
    <ds-fieldset>
        <ds-legend>Contact Information</ds-legend>
        
        <ds-row>
            <ds-col>
                <ds-label for="name">Full Name</ds-label>
                <ds-text-input id="name" name="name" required></ds-text-input>
            </ds-col>
            <ds-col>
                <ds-label for="email">Email</ds-label>
                <ds-text-input id="email" type="email" name="email" required></ds-text-input>
            </ds-col>
        </ds-row>
        
        <ds-fieldset>
            <ds-legend>Preferences</ds-legend>
            
            <ds-radio name="contact" value="email" checked>Email</ds-radio>
            <ds-radio name="contact" value="phone">Phone</ds-radio>
            
            <ds-checkbox name="newsletter" value="subscribe" checked>Subscribe to newsletter</ds-checkbox>
        </ds-fieldset>
        
        <ds-button type="submit">Submit</ds-button>
    </ds-fieldset>
</form>
```

## Design Tokens

The design system uses CSS custom properties for consistent theming:

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
    
    /* Colors */
    --ds-color-primary: #007bff;
    --ds-color-secondary: #6c757d;
    --ds-color-text: #333;
    --ds-color-background: #f8f9fa;
    
    /* Typography */
    --ds-font-family-body: sans-serif;
    --ds-font-family-heading: serif;
    --ds-font-size-base: 16px;
    
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

## Browser Support

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Development

### Project Structure

```
design-system-project/
├── src/
│   ├── components/          # Web Components
│   │   ├── ds-page.js
│   │   ├── ds-row.js
│   │   ├── ds-col.js
│   │   ├── ds-text-input.js
│   │   ├── ds-button.js
│   │   ├── ds-radio.js
│   │   ├── ds-checkbox.js
│   │   ├── ds-textarea.js
│   │   ├── ds-select.js
│   │   ├── ds-option.js
│   │   ├── ds-label.js
│   │   ├── ds-fieldset.js
│   │   └── ds-legend.js
│   ├── design_system/
│   │   └── styles.css       # Design tokens and base styles
│   └── stories/             # Storybook stories
│       ├── ds-page.stories.js
│       ├── ds-row.stories.js
│       ├── ds-col.stories.js
│       ├── ds-text-input.stories.js
│       ├── ds-button.stories.js
│       ├── ds-radio.stories.js
│       ├── ds-checkbox.stories.js
│       ├── ds-textarea.stories.js
│       ├── ds-select.stories.js
│       ├── ds-option.stories.js
│       ├── ds-label.stories.js
│       ├── ds-fieldset.stories.js
│       └── ds-legend.stories.js
├── .storybook/              # Storybook configuration
├── index.html               # Demo page
├── package.json
└── README.md
```

### Available Scripts

- `npm start`: Start development server
- `npm run storybook`: Start Storybook
- `npm run build-storybook`: Build Storybook for production
- `npm test`: Run tests (if configured)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 