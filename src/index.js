/**
 * @file index.js
 * @summary Main entry point for the standards-ui design system
 * @description Exports all web components and provides a convenient way to import the entire design system
 */

// Import all components
import './components/ds-page.js';
import './components/ds-row.js';
import './components/ds-col.js';
import './components/ds-text-input.js';
import './components/ds-button.js';
import './components/ds-radio.js';
import './components/ds-checkbox.js';
import './components/ds-textarea.js';
import './components/ds-select.js';
import './components/ds-option.js';
import './components/ds-label.js';
import './components/ds-fieldset.js';
import './components/ds-legend.js';

// Export component classes for advanced usage
export { default as DsPage } from './components/ds-page.js';
export { default as DsRow } from './components/ds-row.js';
export { default as DsCol } from './components/ds-col.js';
export { default as DsTextInput } from './components/ds-text-input.js';
export { default as DsButton } from './components/ds-button.js';
export { default as DsRadio } from './components/ds-radio.js';
export { default as DsCheckbox } from './components/ds-checkbox.js';
export { default as DsTextarea } from './components/ds-textarea.js';
export { default as DsSelect } from './components/ds-select.js';
export { default as DsOption } from './components/ds-option.js';
export { default as DsLabel } from './components/ds-label.js';
export { default as DsFieldset } from './components/ds-fieldset.js';
export { default as DsLegend } from './components/ds-legend.js';

// Export the base component for custom component development
export { default as BaseComponent } from './components/base-component.js';

// Version info
export const VERSION = '1.0.0'; 