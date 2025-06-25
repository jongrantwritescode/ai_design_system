# Instructions: Adding Examples Folder and Login/Sign Up Form

This document provides instructions for extending your design-system-project by adding an examples directory. This directory will host static web pages that demonstrate the practical application of your custom Web Components. The first example will be a dynamic "Login / Sign Up Form".

## Assumption

You have already successfully run the previous prompts, and your project includes the basic layout components (`ds-row`, `ds-col`, `ds-page`), form components (`ds-text-input`, `ds-button`, `ds-radio`, `ds-checkbox`, `ds-textarea`, `ds-select`, `ds-option`, `ds-label`, `ds-fieldset`, `ds-legend`), Storybook integration, and the shared `src/design_system/styles.css`.

## 1. Project Structure Updates

We will add a new top-level directory `/examples` to your project:

```
/design-system-project
├── examples/
│   ├── main.html         <-- New: Main examples listing page
│   └── login-signup-form/  <-- New: Folder for the first example
│       └── index.html    <-- New: The login/signup form page
├── src/                  <-- Existing design system source
│   ├── components/
│   ├── stories/
│   └── design_system/
├── .storybook/           <-- Existing Storybook config
├── package.json          <-- Existing npm config
└── index.html            <-- Existing root demo page
```

## 2. examples/main.html - Examples Listing Page

This will be a simple HTML page that serves as an entry point to all your example applications.

**File Location:** `/design-system-project/examples/main.html`

**Content:**

- Basic HTML5 boilerplate.
- Import your design system components (`ds-page`, `ds-row`, `ds-col`) using `<script type="module" src="../src/components/..."></script>`. Ensure the paths are correct relative to `examples/main.html`.
- Use `ds-page`, `ds-row`, and `ds-col` to create a clean layout.
- Include a header (e.g., using `<h1>`) and a list (e.g., using `<ul>` and `<li>` within `ds-col`) of links to the individual examples.
- The first link should point to `login-signup-form/index.html`.

## 3. examples/login-signup-form/index.html - Login / Sign Up Form Example

This page will showcase a dynamic form that switches between login and sign-up states, implements client-side validation, and uses your `ds-` components extensively.

**File Location:** `/design-system-project/examples/login-signup-form/index.html`

### HTML Structure:

- Basic HTML5 boilerplate.
- Import all necessary design system components (all `ds-` components, especially the form ones: `ds-text-input`, `ds-button`, `ds-label`, `ds-fieldset`, `ds-legend`, etc.). Adjust paths as `../src/components/...`.
- Import the main design system stylesheet: `<link rel="stylesheet" href="../../src/design_system/styles.css">`.
- Use `ds-page`, `ds-row`, `ds-col` to structure the form visually in the center of the page.
- The form itself should use `ds-fieldset` and `ds-legend`.
- Include a `div` or similar container for displaying general form errors (e.g., "Login failed").

**For input fields:**
- A username input (`ds-text-input`).
- A password input (`ds-text-input` with `type="password"`).
- An email input (`ds-text-input` with `type="email"`) that is conditionally shown only for "Sign Up" state.
- A `ds-button` for submission.
- A button or link to toggle between "Login" and "Sign Up" states.

**Error Message Placeholder:** For each input, include a `<span>` or `<p>` element immediately after the `ds-text-input` that will display validation errors. Initially, these should be hidden (e.g., `display: none;` or `visibility: hidden;`).

### JavaScript Logic (within `<script>` tags on the page):

#### State Management:

- A JavaScript variable (e.g., `isSignUpMode`) to track the current form state (`true` for sign-up, `false` for login).
- A function to update the UI based on `isSignUpMode`:
  - Change the legend text (Sign Up vs Login).
  - Toggle the visibility of the email input and its associated error message element.
  - Change the primary button text (Sign Up vs Login).
  - Clear all input values and error messages when switching modes.

#### Input References:
Get references to all `ds-text-input` elements and the submit `ds-button`.

#### Event Listeners:

- Attach `input` and `change` event listeners to `ds-text-input` elements to clear individual error messages as the user types.
- Attach a `click` event listener to the submit `ds-button`.
- Attach a `click` event listener to the "toggle mode" button/link.

#### Validation Function:

A function (e.g., `validateForm()`) that runs when the form is submitted.

**Checks for:**
- **Username:** Not empty.
- **Password:** Not empty.
- **Email:** If in "Sign Up" mode, email must not be empty and must be a valid email format (use a simple regex or check for `@` and `.` characters).

Updates the visibility and content of the error message placeholders next to each invalid input.

Returns `true` if all validations pass, `false` otherwise.

#### Submission Handler:

If `validateForm()` returns `true`:

1. Collect the input values.
2. `console.log` a stubbed API call, for example:

```javascript
if (isSignUpMode) {
    console.log('Stubbed Sign Up API Call:', { 
        username: username.value, 
        email: email.value, 
        password: password.value 
    });
    alert('Sign Up successful! Check console for details.');
} else {
    console.log('Stubbed Login API Call:', { 
        username: username.value, 
        password: password.value 
    });
    alert('Login successful! Check console for details.');
}
// Clear the form fields after successful submission (optional)
username.value = '';
password.value = '';
if (email) email.value = '';
```

**Important:** Use `alert()` here as requested for user feedback, acknowledging it's normally replaced by custom UI.

If `validateForm()` returns `false`, ensure error messages are displayed.

### Styling (within `<style>` tag or link to external CSS):

- Basic styling for the form container (e.g., `max-width`, `margin`, `padding`, `box-shadow`, `border-radius`).
- Styles for error messages (e.g., `color: var(--ds-form-error-color); font-size: 0.85em;`).
- Hide the email input by default, and reveal it via JavaScript when `isSignUpMode` is `true`.

## 4. Update Storybook Components (If Needed)

Review the existing `ds-text-input`, `ds-button`, `ds-radio`, `ds-checkbox`, `ds-textarea`, `ds-select`, `ds-option`, `ds-label`, `ds-fieldset`, `ds-legend` components and their `.stories.js` files.

**No changes are required** to the `.js` component files themselves based on the current design. The components are wrappers that pass through attributes and re-dispatch events, which is sufficient for this example. The form logic (validation, error display) is handled at the application level (`index.html`'s script), not within the `ds-` components themselves.

**Verify `.stories.js` files:** Ensure all relevant attributes (e.g., `required`, `disabled`, `type`, `placeholder` for `ds-text-input`) have corresponding `argTypes` definitions with appropriate control types in their respective `stories.js` files. This ensures they are fully testable in Storybook. If any were missed in the previous prompt, add them now.

## LLM Execution Guidance:

1. **Create the `examples/main.html` file** as specified.
2. **Create the `examples/login-signup-form/index.html` file**, implementing all HTML structure, JavaScript logic (state, validation, submission), and basic inline/linked CSS for the form.
3. **Do not modify** the existing `src/components/*.js` or `src/stories/*.js` files unless a specific missing `argType` or core component functionality is identified based on the requirements of the login/signup form.