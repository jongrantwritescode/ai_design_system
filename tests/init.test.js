/**
 * @file init.test.js
 * @summary Tests for the design system initialization module
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { init, updateTokens, getCurrentTokens, resetTokens, DEFAULT_TOKENS } from '../src/init.js';

describe('Design System Initialization', () => {
    beforeEach(() => {
        // Clean up any existing style elements
        const existingStyle = document.getElementById('ds-design-tokens');
        if (existingStyle) {
            existingStyle.remove();
        }
    });

    afterEach(() => {
        // Clean up after each test
        const existingStyle = document.getElementById('ds-design-tokens');
        if (existingStyle) {
            existingStyle.remove();
        }
    });

    describe('init function', () => {
        it('should initialize with default tokens', () => {
            const result = init();
            
            expect(result.success).toBe(true);
            expect(result.errors).toEqual([]);
            expect(result.tokens).toEqual(DEFAULT_TOKENS);
            expect(result.css).toBeDefined();
        });

        it('should initialize with custom tokens', () => {
            const customTokens = {
                colors: {
                    primary: '#ff0000',
                    secondary: '#00ff00'
                },
                spacing: {
                    md: '20px'
                }
            };
            
            const result = init(customTokens);
            
            expect(result.success).toBe(true);
            expect(result.tokens.colors.primary).toBe('#ff0000');
            expect(result.tokens.colors.secondary).toBe('#00ff00');
            expect(result.tokens.spacing.md).toBe('20px');
            // Should merge with defaults
            expect(result.tokens.colors.text).toBe(DEFAULT_TOKENS.colors.text);
        });

        it('should inject CSS when injectCSS is true', () => {
            init({}, { injectCSS: true });
            
            const styleElement = document.getElementById('ds-design-tokens');
            expect(styleElement).toBeTruthy();
            expect(styleElement.tagName).toBe('STYLE');
        });

        it('should not inject CSS when injectCSS is false', () => {
            init({}, { injectCSS: false });
            
            const styleElement = document.getElementById('ds-design-tokens');
            expect(styleElement).toBeFalsy();
        });

        it('should validate tokens when validate is true', () => {
            const invalidTokens = {
                colors: {
                    // Missing required colors
                }
            };
            
            const result = init(invalidTokens, { validate: true });
            
            expect(result.success).toBe(false);
            expect(result.errors.length).toBeGreaterThan(0);
            expect(result.errors).toContain('Missing required color: primary');
        });

        it('should skip validation when validate is false', () => {
            const invalidTokens = {
                colors: {
                    // Missing required colors
                }
            };
            
            const result = init(invalidTokens, { validate: false });
            
            expect(result.success).toBe(true);
            expect(result.errors).toEqual([]);
        });

        it('should log to console when console is true', () => {
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
            
            init({}, { console: true });
            
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });

        it('should not log to console when console is false', () => {
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
            
            init({}, { console: false });
            
            expect(consoleSpy).not.toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });

    describe('updateTokens function', () => {
        beforeEach(() => {
            // Initialize with defaults first
            init();
        });

        it('should update existing tokens', () => {
            const newTokens = {
                colors: {
                    primary: '#ff0000'
                },
                spacing: {
                    md: '24px'
                }
            };
            
            const result = updateTokens(newTokens);
            
            expect(result.success).toBe(true);
            expect(result.tokens.colors.primary).toBe('#ff0000');
            expect(result.tokens.spacing.md).toBe('24px');
        });

        it('should preserve existing tokens not being updated', () => {
            const originalTokens = getCurrentTokens();
            const newTokens = {
                colors: {
                    primary: '#ff0000'
                }
            };
            
            updateTokens(newTokens);
            const updatedTokens = getCurrentTokens();
            
            expect(updatedTokens.colors.primary).toBe('#ff0000');
            expect(updatedTokens.colors.secondary).toBe(originalTokens.colors.secondary);
            expect(updatedTokens.spacing.md).toBe(originalTokens.spacing.md);
        });
    });

    describe('getCurrentTokens function', () => {
        it('should return default tokens when no initialization has occurred', () => {
            const tokens = getCurrentTokens();
            expect(tokens).toEqual(DEFAULT_TOKENS);
        });

        it('should return current tokens after initialization', () => {
            const customTokens = {
                colors: {
                    primary: '#ff0000'
                }
            };
            
            init(customTokens);
            const tokens = getCurrentTokens();
            
            expect(tokens.colors.primary).toBe('#ff0000');
        });
    });

    describe('resetTokens function', () => {
        it('should reset to default tokens', () => {
            // Initialize with custom tokens
            init({
                colors: {
                    primary: '#ff0000'
                }
            });
            
            // Reset to defaults
            const result = resetTokens();
            
            expect(result.success).toBe(true);
            expect(result.tokens).toEqual(DEFAULT_TOKENS);
        });
    });

    describe('DEFAULT_TOKENS', () => {
        it('should have required color properties', () => {
            expect(DEFAULT_TOKENS.colors.primary).toBeDefined();
            expect(DEFAULT_TOKENS.colors.text).toBeDefined();
            expect(DEFAULT_TOKENS.colors.background).toBeDefined();
        });

        it('should have required spacing properties', () => {
            expect(DEFAULT_TOKENS.spacing.xs).toBeDefined();
            expect(DEFAULT_TOKENS.spacing.sm).toBeDefined();
            expect(DEFAULT_TOKENS.spacing.md).toBeDefined();
            expect(DEFAULT_TOKENS.spacing.lg).toBeDefined();
        });

        it('should have required typography properties', () => {
            expect(DEFAULT_TOKENS.typography.fontFamily).toBeDefined();
            expect(DEFAULT_TOKENS.typography.fontSize).toBeDefined();
            expect(DEFAULT_TOKENS.typography.lineHeight).toBeDefined();
        });

        it('should have form properties', () => {
            expect(DEFAULT_TOKENS.forms.borderColor).toBeDefined();
            expect(DEFAULT_TOKENS.forms.borderRadius).toBeDefined();
            expect(DEFAULT_TOKENS.forms.textColor).toBeDefined();
        });
    });

    describe('CSS Generation', () => {
        it('should generate CSS custom properties', () => {
            const result = init();
            
            expect(result.css).toContain('--ds-color-primary:');
            expect(result.css).toContain('--ds-spacing-md:');
            expect(result.css).toContain('--ds-font-family:');
            expect(result.css).toContain('--ds-form-borderRadius:');
        });

        it('should inject CSS with correct format', () => {
            init();
            
            const styleElement = document.getElementById('ds-design-tokens');
            const cssContent = styleElement.textContent;
            
            expect(cssContent).toContain(':root {');
            expect(cssContent).toContain('--ds-color-primary:');
            expect(cssContent).toContain('--ds-spacing-md:');
        });
    });

    describe('Error Handling', () => {
        it('should handle invalid token structure gracefully', () => {
            const invalidTokens = {
                colors: null,
                spacing: 'invalid'
            };
            
            const result = init(invalidTokens, { validate: false });
            
            expect(result.success).toBe(true);
            // Should fall back to defaults for invalid properties
            expect(result.tokens.colors).toEqual(DEFAULT_TOKENS.colors);
        });

        it('should handle missing document gracefully', () => {
            // Mock document as undefined (Node.js environment)
            const originalDocument = global.document;
            global.document = undefined;
            
            const result = init({}, { injectCSS: true });
            
            expect(result.success).toBe(true);
            
            // Restore document
            global.document = originalDocument;
        });
    });
}); 