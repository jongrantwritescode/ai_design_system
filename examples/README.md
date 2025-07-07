# Standards-UI Examples

This directory contains examples demonstrating how to use the `standards-ui` design system package.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Open the examples in your browser:
   - `main.html` - Overview of all examples
   - `login-signup-form/index.html` - Interactive login/signup form

## Examples

### Main Examples Page
- **File**: `main.html`
- **Description**: Overview page showcasing all available examples
- **Features**: Navigation to different example implementations

### Login/Signup Form
- **File**: `login-signup-form/index.html`
- **Description**: Dynamic form that switches between login and signup modes
- **Features**: 
  - Form validation
  - Dynamic field visibility
  - State management
  - Responsive design

## Usage

The examples use the published `standards-ui` npm package. To use in your own projects:

1. Install the package:
   ```bash
   npm install standards-ui
   ```

2. Import the components:
   ```html
   <!-- Import all components -->
   <script type="module" src="node_modules/standards-ui/dist/standards-ui.esm.js"></script>
   
   <!-- Import styles -->
   <link rel="stylesheet" href="node_modules/standards-ui/dist/styles.css">
   ```

3. Use the components in your HTML:
   ```html
   <ds-page>
     <ds-row>
       <ds-col>
         <ds-button>Click me</ds-button>
       </ds-col>
     </ds-row>
   </ds-page>
   ```

## Available Components

- `ds-page` - Page container
- `ds-row` - Flexbox row layout
- `ds-col` - Flexbox column layout
- `ds-button` - Button component
- `ds-text-input` - Text input field
- `ds-textarea` - Multi-line text input
- `ds-select` - Dropdown select
- `ds-option` - Select option
- `ds-radio` - Radio button
- `ds-checkbox` - Checkbox
- `ds-label` - Form label
- `ds-fieldset` - Form fieldset
- `ds-legend` - Fieldset legend

All components are fully accessible and follow ARIA guidelines. 