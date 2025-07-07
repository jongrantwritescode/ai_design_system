/**
 * @file ds-form.test.js
 * @summary Tests for the ds-form component
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../src/components/ds-form.js';

describe('DsForm', () => {
    let form;

    beforeEach(() => {
        form = document.createElement('ds-form');
        document.body.appendChild(form);
    });

    afterEach(() => {
        if (form && form.parentNode) {
            form.parentNode.removeChild(form);
        }
    });

    describe('Basic Functionality', () => {
        it('should create a form element', () => {
            expect(form).toBeInstanceOf(HTMLElement);
            expect(form.tagName.toLowerCase()).toBe('ds-form');
        });

        it('should have a native form element inside', () => {
            const nativeForm = form.shadowRoot.querySelector('form');
            expect(nativeForm).toBeTruthy();
        });

        it('should have a live region for accessibility', () => {
            const liveRegion = form.shadowRoot.querySelector('[part="live-region"]');
            expect(liveRegion).toBeTruthy();
            expect(liveRegion.getAttribute('aria-live')).toBe('polite');
            expect(liveRegion.getAttribute('aria-atomic')).toBe('true');
        });
    });

    describe('Form Attributes', () => {
        it('should set action attribute', () => {
            form.action = '/api/test';
            expect(form.form.action).toContain('/api/test');
        });

        it('should set method attribute', () => {
            form.method = 'post';
            expect(form.form.method).toBe('post');
        });

        it('should set enctype attribute', () => {
            form.enctype = 'multipart/form-data';
            expect(form.form.enctype).toBe('multipart/form-data');
        });

        it('should set target attribute', () => {
            form.target = '_blank';
            expect(form.form.target).toBe('_blank');
        });

        it('should set novalidate attribute', () => {
            form.novalidate = true;
            expect(form.form.hasAttribute('novalidate')).toBe(true);
        });

        it('should set autocomplete attribute', () => {
            form.autocomplete = 'off';
            expect(form.form.autocomplete).toBe('off');
        });
    });

    describe('ARIA Support', () => {
        it('should set aria-label', () => {
            form.ariaLabel = 'Test form';
            expect(form.form.getAttribute('aria-label')).toBe('Test form');
        });

        it('should set aria-describedby', () => {
            form.ariaDescribedBy = 'help-text';
            expect(form.form.getAttribute('aria-describedby')).toBe('help-text');
        });

        it('should set aria-labelledby', () => {
            form.ariaLabelledBy = 'form-title';
            expect(form.form.getAttribute('aria-labelledby')).toBe('form-title');
        });

        it('should have role="form" by default', () => {
            expect(form.form.getAttribute('role')).toBe('form');
        });
    });

    describe('Form Validation', () => {
        beforeEach(() => {
            form.innerHTML = `
                <ds-text-input id="test-input" name="test" required></ds-text-input>
                <ds-button type="submit">Submit</ds-button>
            `;
        });

        it('should check form validity', () => {
            // The form should be valid by default since we're not checking native form validity
            // but our custom validation logic
            expect(typeof form.checkValidity()).toBe('boolean');
        });

        it('should report form validity', () => {
            const result = form.reportValidity();
            expect(typeof result).toBe('boolean');
        });

        it('should track validation errors', () => {
            const input = form.querySelector('ds-text-input');
            form.validateInput(input);
            expect(form.formState.hasValidationErrors).toBe(true);
        });

        it('should clear validation errors when input becomes valid', () => {
            const input = form.querySelector('ds-text-input');
            input.value = 'test value';
            form.validateInput(input);
            expect(form.formState.hasValidationErrors).toBe(false);
        });
    });

    describe('Form Submission', () => {
        beforeEach(() => {
            form.innerHTML = `
                <ds-text-input id="test-input" name="test" required></ds-text-input>
                <ds-button type="submit">Submit</ds-button>
            `;
        });

        it('should prevent submission when form is invalid', () => {
            // Add a required field to make form invalid
            const requiredInput = document.createElement('ds-text-input');
            requiredInput.setAttribute('required', '');
            requiredInput.setAttribute('name', 'required-field');
            form.appendChild(requiredInput);
            
            const submitEvent = new Event('submit', { cancelable: true });
            form.form.dispatchEvent(submitEvent);
            expect(submitEvent.defaultPrevented).toBe(true);
        });

        it('should allow submission when form is valid', () => {
            const input = form.querySelector('ds-text-input');
            input.value = 'test value';
            
            const submitEvent = new Event('submit', { cancelable: true });
            form.form.dispatchEvent(submitEvent);
            expect(submitEvent.defaultPrevented).toBe(false);
        });

        it('should announce successful submission to screen reader', () => {
            const input = form.querySelector('ds-text-input');
            input.value = 'test value';
            
            const submitEvent = new Event('submit', { cancelable: true });
            form.form.dispatchEvent(submitEvent);
            
            const liveRegion = form.shadowRoot.querySelector('[part="live-region"]');
            expect(liveRegion.textContent).toContain('submitted successfully');
        });
    });

    describe('Form Reset', () => {
        beforeEach(() => {
            form.innerHTML = `
                <ds-text-input id="test-input" name="test" value="initial value"></ds-text-input>
                <ds-button type="reset">Reset</ds-button>
            `;
        });

        it('should reset form state', () => {
            form.reset();
            expect(form.formState.submitted).toBe(false);
            expect(form.formState.valid).toBe(true);
            expect(form.formState.errors.size).toBe(0);
        });

        it('should announce reset to screen reader', () => {
            form.reset();
            const liveRegion = form.shadowRoot.querySelector('[part="live-region"]');
            expect(liveRegion.textContent).toContain('reset');
        });
    });

    describe('Form Data', () => {
        beforeEach(() => {
            form.innerHTML = `
                <ds-text-input id="name" name="name" value="John Doe"></ds-text-input>
                <ds-text-input id="email" name="email" value="john@example.com"></ds-text-input>
                <ds-checkbox id="newsletter" name="newsletter" value="yes" checked></ds-checkbox>
            `;
            
            // Ensure the inputs are properly initialized
            const nameInput = form.querySelector('#name');
            const emailInput = form.querySelector('#email');
            const newsletterInput = form.querySelector('#newsletter');
            
            // Set values programmatically to ensure they're accessible
            if (nameInput) nameInput.value = 'John Doe';
            if (emailInput) emailInput.value = 'john@example.com';
            if (newsletterInput) newsletterInput.checked = true;
        });

        it('should get form data as FormData object', () => {
            const formData = form.getFormData();
            expect(formData).toBeInstanceOf(FormData);
            expect(formData.get('name')).toBe('John Doe');
            expect(formData.get('email')).toBe('john@example.com');
            expect(formData.get('newsletter')).toBe('yes');
        });

        it('should get form data as plain object', () => {
            const data = form.getFormDataAsObject();
            expect(data).toEqual({
                name: 'John Doe',
                email: 'john@example.com',
                newsletter: 'yes'
            });
        });
    });

    describe('Live Region Management', () => {
        it('should announce messages to screen reader', () => {
            form.announceToScreenReader('Test message', 'info');
            const liveRegion = form.shadowRoot.querySelector('[part="live-region"]');
            expect(liveRegion.textContent).toBe('Test message');
            expect(liveRegion.getAttribute('data-type')).toBe('info');
            expect(liveRegion.hidden).toBe(false);
        });

        it('should clear live region', () => {
            form.announceToScreenReader('Test message');
            form.clearLiveRegion();
            const liveRegion = form.shadowRoot.querySelector('[part="live-region"]');
            expect(liveRegion.textContent).toBe('');
            expect(liveRegion.hidden).toBe(true);
        });

        it('should update live region with validation errors', () => {
            const input = document.createElement('ds-text-input');
            input.name = 'test';
            form.appendChild(input);
            
            form.formState.errors.set(input, 'This field is required');
            form.updateLiveRegion();
            
            const liveRegion = form.shadowRoot.querySelector('[part="live-region"]');
            expect(liveRegion.textContent).toContain('This field is required');
            expect(liveRegion.getAttribute('data-type')).toBe('error');
        });
    });

    describe('ARIA Validation', () => {
        it('should validate form has accessible name', () => {
            // Clear any existing aria attributes
            form.removeAttribute('aria-label');
            form.removeAttribute('aria-labelledby');
            form.innerHTML = ''; // Remove any headings
            
            const errors = form.validateARIA();
            expect(errors).toContain('Form should have an accessible name');
        });

        it('should pass validation with aria-label', () => {
            form.ariaLabel = 'Test form';
            const errors = form.validateARIA();
            expect(errors).not.toContain('Form should have an accessible name');
        });

        it('should pass validation with heading', () => {
            form.innerHTML = '<h2>Form Title</h2><ds-text-input name="test"></ds-text-input>';
            const errors = form.validateARIA();
            expect(errors).not.toContain('Form should have an accessible name');
        });

        it('should validate form has form controls', () => {
            form.innerHTML = '<div>No form controls</div>';
            const errors = form.validateARIA();
            expect(errors).toContain('Form should contain form controls');
        });
    });

    describe('Event Handling', () => {
        it('should handle input changes', () => {
            const input = document.createElement('ds-text-input');
            input.name = 'test';
            form.appendChild(input);
            
            const inputEvent = new Event('input', { bubbles: true });
            input.dispatchEvent(inputEvent);
            
            // Should not throw errors
            expect(true).toBe(true);
        });

        it('should handle invalid events', () => {
            const input = document.createElement('ds-text-input');
            input.name = 'test';
            input.required = true;
            form.appendChild(input);
            
            const invalidEvent = new Event('invalid', { bubbles: true, cancelable: true });
            input.dispatchEvent(invalidEvent);
            
            expect(invalidEvent.defaultPrevented).toBe(true);
        });
    });

    describe('Form State Management', () => {
        it('should track form validity', () => {
            form.updateFormValidity();
            expect(typeof form.formState.valid).toBe('boolean');
        });

        it('should set aria-invalid when form has errors', () => {
            form.formState.hasValidationErrors = true;
            form.updateFormValidity();
            expect(form.form.getAttribute('aria-invalid')).toBe('true');
        });

        it('should remove aria-invalid when form is valid', () => {
            form.form.setAttribute('aria-invalid', 'true');
            form.formState.hasValidationErrors = false;
            form.updateFormValidity();
            expect(form.form.hasAttribute('aria-invalid')).toBe(false);
        });
    });
}); 