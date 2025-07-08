/**
 * @file init.js
 * @summary Design system initialization and configuration module
 * @description
 * Provides a way to initialize and configure the design system with custom
 * design tokens, themes, and settings. This allows developers to customize
 * the appearance and behavior of all components without modifying the core code.
 */

/**
 * @typedef {Object} DesignTokens
 * @property {Object} colors - Color palette configuration
 * @property {string} colors.primary - Primary brand color
 * @property {string} colors.primaryDark - Darker shade of primary color
 * @property {string} colors.secondary - Secondary brand color
 * @property {string} colors.text - Main text color
 * @property {string} colors.background - Main background color
 * @property {string} colors.success - Success state color
 * @property {string} colors.error - Error state color
 * @property {string} colors.warning - Warning state color
 * @property {string} colors.info - Info state color
 * @property {Object} spacing - Spacing scale configuration
 * @property {string} spacing.xs - Extra small spacing
 * @property {string} spacing.sm - Small spacing
 * @property {string} spacing.md - Medium spacing
 * @property {string} spacing.lg - Large spacing
 * @property {string} spacing.xl - Extra large spacing
 * @property {string} spacing.pagePadding - Page-level padding
 * @property {Object} typography - Typography configuration
 * @property {string} typography.fontFamily - Primary font family
 * @property {string} typography.fontSize - Base font size
 * @property {string} typography.lineHeight - Base line height
 * @property {Object} forms - Form-specific configuration
 * @property {string} forms.borderColor - Form border color
 * @property {string} forms.borderRadius - Form border radius
 * @property {string} forms.textColor - Form text color
 * @property {string} forms.errorColor - Form error color
 * @property {string} forms.errorBackground - Form error background
 * @property {string} forms.errorBorder - Form error border
 * @property {string} forms.successColor - Form success color
 * @property {string} forms.successBackground - Form success background
 * @property {string} forms.successBorder - Form success border
 * @property {string} forms.infoColor - Form info color
 * @property {string} forms.infoBackground - Form info background
 * @property {string} forms.infoBorder - Form info border
 * @property {Object} layout - Layout configuration
 * @property {string} layout.pageMaxWidth - Maximum page width
 * @property {string} layout.containerPadding - Container padding
 * @property {Object} components - Component-specific overrides
 * @property {Object} components.button - Button component configuration
 * @property {string} components.button.borderRadius - Button border radius
 * @property {string} components.button.padding - Button padding
 * @property {Object} components.input - Input component configuration
 * @property {string} components.input.borderRadius - Input border radius
 * @property {string} components.input.padding - Input padding
 */

/**
 * Default design tokens for the design system
 * @type {DesignTokens}
 */
const DEFAULT_TOKENS = {
    colors: {
        primary: '#007bff',
        primaryDark: '#0056b3',
        secondary: '#6c757d',
        text: '#212529',
        background: '#ffffff',
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        pagePadding: '20px'
    },
    typography: {
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '16px',
        lineHeight: '1.5'
    },
    forms: {
        borderColor: '#ced4da',
        borderRadius: '4px',
        textColor: '#495057',
        errorColor: '#dc3545',
        errorBackground: '#f8d7da',
        errorBorder: '#f5c6cb',
        successColor: '#155724',
        successBackground: '#d4edda',
        successBorder: '#c3e6cb',
        infoColor: '#0c5460',
        infoBackground: '#d1ecf1',
        infoBorder: '#bee5eb'
    },
    layout: {
        pageMaxWidth: '1200px',
        containerPadding: '20px'
    },
    components: {
        button: {
            borderRadius: '4px',
            padding: '8px 16px'
        },
        input: {
            borderRadius: '4px',
            padding: '8px 12px'
        }
    }
};

/**
 * Merges user tokens with defaults, handling nested objects
 * @param {Object} defaults - Default tokens
 * @param {Object} userTokens - User-provided tokens
 * @returns {Object} Merged tokens
 */
function deepMerge(defaults, userTokens) {
    const result = { ...defaults };
    
    for (const key in userTokens) {
        if (userTokens.hasOwnProperty(key)) {
            if (typeof userTokens[key] === 'object' && userTokens[key] !== null && !Array.isArray(userTokens[key])) {
                result[key] = deepMerge(defaults[key] || {}, userTokens[key]);
            } else {
                result[key] = userTokens[key];
            }
        }
    }
    
    return result;
}

/**
 * Converts design tokens to CSS custom properties
 * @param {DesignTokens} tokens - Design tokens object
 * @returns {string} CSS custom properties string
 */
function tokensToCSS(tokens) {
    const cssProperties = [];
    
    // Convert colors
    for (const [key, value] of Object.entries(tokens.colors)) {
        cssProperties.push(`--ds-color-${key}: ${value};`);
    }
    
    // Convert spacing
    for (const [key, value] of Object.entries(tokens.spacing)) {
        cssProperties.push(`--ds-spacing-${key}: ${value};`);
    }
    
    // Convert typography
    for (const [key, value] of Object.entries(tokens.typography)) {
        cssProperties.push(`--ds-font-${key}: ${value};`);
    }
    
    // Convert forms
    for (const [key, value] of Object.entries(tokens.forms)) {
        cssProperties.push(`--ds-form-${key}: ${value};`);
    }
    
    // Convert layout
    for (const [key, value] of Object.entries(tokens.layout)) {
        cssProperties.push(`--ds-${key}: ${value};`);
    }
    
    // Convert component-specific tokens
    for (const [component, config] of Object.entries(tokens.components)) {
        for (const [key, value] of Object.entries(config)) {
            cssProperties.push(`--ds-${component}-${key}: ${value};`);
        }
    }
    
    return cssProperties.join('\n  ');
}

/**
 * Injects CSS custom properties into the document
 * @param {string} css - CSS custom properties string
 */
function injectCSS(css) {
    const styleId = 'ds-design-tokens';
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = `:root {\n  ${css}\n}`;
}

/**
 * Validates design tokens for required properties and correct types
 * @param {DesignTokens} tokens - Design tokens to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
function validateTokens(tokens) {
    const errors = [];
    
    // Validate colors
    if (tokens.colors) {
        const requiredColors = ['primary', 'text', 'background'];
        for (const color of requiredColors) {
            if (!tokens.colors[color]) {
                errors.push(`Missing required color: ${color}`);
            }
        }
    } else {
        errors.push('Missing colors configuration');
    }
    
    // Validate spacing
    if (tokens.spacing) {
        const requiredSpacing = ['xs', 'sm', 'md', 'lg'];
        for (const space of requiredSpacing) {
            if (!tokens.spacing[space]) {
                errors.push(`Missing required spacing: ${space}`);
            }
        }
    } else {
        errors.push('Missing spacing configuration');
    }
    
    // Validate typography
    if (tokens.typography) {
        if (!tokens.typography.fontFamily) {
            errors.push('Missing required typography.fontFamily');
        }
    } else {
        errors.push('Missing typography configuration');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Initializes the design system with custom tokens
 * @param {DesignTokens} userTokens - User-provided design tokens
 * @param {Object} options - Initialization options
 * @param {boolean} options.validate - Whether to validate tokens (default: true)
 * @param {boolean} options.injectCSS - Whether to inject CSS into document (default: true)
 * @param {boolean} options.console - Whether to log initialization info (default: true)
 * @returns {Object} Initialization result
 */
export function init(userTokens = {}, options = {}) {
    const {
        validate = true,
        injectCSS: shouldInjectCSS = true,
        console: shouldLog = true
    } = options;
    
    try {
        // Merge user tokens with defaults
        const tokens = deepMerge(DEFAULT_TOKENS, userTokens);
        
        // Validate tokens if requested
        if (validate) {
            const validation = validateTokens(tokens);
            if (!validation.isValid) {
                const errorMessage = `Design system initialization failed:\n${validation.errors.join('\n')}`;
                if (shouldLog) {
                    console.error(errorMessage);
                }
                return {
                    success: false,
                    errors: validation.errors,
                    tokens: null
                };
            }
        }
        
        // Convert tokens to CSS
        const css = tokensToCSS(tokens);
        
        // Inject CSS if requested and in browser environment
        if (shouldInjectCSS && typeof document !== 'undefined') {
            injectCSS(css);
        }
        
        // Log success if requested
        if (shouldLog) {
            console.log('🎨 Design system initialized successfully');
            console.log('📦 Tokens applied:', tokens);
        }
        
        return {
            success: true,
            errors: [],
            tokens,
            css
        };
        
    } catch (error) {
        const errorMessage = `Design system initialization failed: ${error.message}`;
        if (shouldLog) {
            console.error(errorMessage);
        }
        return {
            success: false,
            errors: [error.message],
            tokens: null
        };
    }
}

/**
 * Updates design tokens after initialization
 * @param {DesignTokens} newTokens - New design tokens
 * @param {Object} options - Update options
 * @param {boolean} options.injectCSS - Whether to inject updated CSS (default: true)
 * @returns {Object} Update result
 */
export function updateTokens(newTokens, options = {}) {
    const { injectCSS: shouldInjectCSS = true } = options;
    
    try {
        // Merge with current tokens (stored in CSS custom properties)
        const currentTokens = getCurrentTokens();
        const tokens = deepMerge(currentTokens, newTokens);
        
        // Convert to CSS and inject
        const css = tokensToCSS(tokens);
        if (shouldInjectCSS && typeof document !== 'undefined') {
            injectCSS(css);
        }
        
        console.log('🎨 Design tokens updated successfully');
        
        return {
            success: true,
            tokens,
            css
        };
        
    } catch (error) {
        console.error(`Failed to update design tokens: ${error.message}`);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Gets current design tokens from CSS custom properties
 * @returns {Object} Current design tokens
 */
export function getCurrentTokens() {
    if (typeof document === 'undefined') {
        return DEFAULT_TOKENS;
    }
    
    const style = getComputedStyle(document.documentElement);
    const tokens = { ...DEFAULT_TOKENS };
    
    // Extract colors
    for (const key of Object.keys(DEFAULT_TOKENS.colors)) {
        const value = style.getPropertyValue(`--ds-color-${key}`).trim();
        if (value) {
            tokens.colors[key] = value;
        }
    }
    
    // Extract spacing
    for (const key of Object.keys(DEFAULT_TOKENS.spacing)) {
        const value = style.getPropertyValue(`--ds-spacing-${key}`).trim();
        if (value) {
            tokens.spacing[key] = value;
        }
    }
    
    // Extract typography
    for (const key of Object.keys(DEFAULT_TOKENS.typography)) {
        const value = style.getPropertyValue(`--ds-font-${key}`).trim();
        if (value) {
            tokens.typography[key] = value;
        }
    }
    
    // Extract forms
    for (const key of Object.keys(DEFAULT_TOKENS.forms)) {
        const value = style.getPropertyValue(`--ds-form-${key}`).trim();
        if (value) {
            tokens.forms[key] = value;
        }
    }
    
    return tokens;
}

/**
 * Resets design tokens to defaults
 * @returns {Object} Reset result
 */
export function resetTokens() {
    return init({}, { validate: false, console: false });
}

// Export default tokens for reference
export { DEFAULT_TOKENS }; 