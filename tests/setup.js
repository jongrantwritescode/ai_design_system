import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock console.warn to capture ARIA validation warnings
global.console.warn = vi.fn();

// Setup for Web Components testing
beforeEach(async () => {
  // Clear console.warn mock
  vi.clearAllMocks();
  
  // Import and register components
  if (!customElements.get('ds-button')) {
    // Import BaseComponent first
    await import('../src/components/base-component.js');
    // Then import ds-button
    await import('../src/components/ds-button.js');
  }
});

// Helper function to create and attach component
export function createComponent(tagName, attributes = {}) {
  const element = document.createElement(tagName);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  document.body.appendChild(element);
  
  // Wait for component to be fully initialized
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(element);
    }, 0);
  });
}

// Helper function to remove component
export function removeComponent(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
} 