/**
 * @file index.d.ts
 * @summary TypeScript declarations for the design system
 */

export interface DesignTokens {
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    text: string;
    background: string;
    success: string;
    error: string;
    warning: string;
    info: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    pagePadding: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
  };
  forms: {
    borderColor: string;
    borderRadius: string;
    textColor: string;
    errorColor: string;
    errorBackground: string;
    errorBorder: string;
    successColor: string;
    successBackground: string;
    successBorder: string;
    infoColor: string;
    infoBackground: string;
    infoBorder: string;
  };
  layout: {
    pageMaxWidth: string;
    containerPadding: string;
  };
  components: {
    button: {
      borderRadius: string;
      padding: string;
    };
    input: {
      borderRadius: string;
      padding: string;
    };
  };
}

export interface InitOptions {
  validate?: boolean;
  injectCSS?: boolean;
  console?: boolean;
}

export interface UpdateOptions {
  injectCSS?: boolean;
}

export interface InitResult {
  success: boolean;
  errors: string[];
  tokens: DesignTokens | null;
  css?: string;
}

export interface UpdateResult {
  success: boolean;
  tokens?: DesignTokens;
  css?: string;
  error?: string;
}

// Component declarations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-page': any;
      'ds-row': any;
      'ds-col': any;
      'ds-button': any;
      'ds-text-input': any;
      'ds-textarea': any;
      'ds-select': any;
      'ds-option': any;
      'ds-checkbox': any;
      'ds-radio': any;
      'ds-label': any;
      'ds-fieldset': any;
      'ds-legend': any;
      'ds-form': any;
    }
  }
}

// Export functions
export declare function init(userTokens?: Partial<DesignTokens>, options?: InitOptions): InitResult;
export declare function updateTokens(newTokens: Partial<DesignTokens>, options?: UpdateOptions): UpdateResult;
export declare function getCurrentTokens(): DesignTokens;
export declare function resetTokens(): InitResult;

// Export default tokens
export declare const DEFAULT_TOKENS: DesignTokens;

// Export component classes
export declare class DsPage extends HTMLElement {}
export declare class DsRow extends HTMLElement {}
export declare class DsCol extends HTMLElement {}
export declare class DsButton extends HTMLElement {}
export declare class DsTextInput extends HTMLElement {}
export declare class DsTextarea extends HTMLElement {}
export declare class DsSelect extends HTMLElement {}
export declare class DsOption extends HTMLElement {}
export declare class DsCheckbox extends HTMLElement {}
export declare class DsRadio extends HTMLElement {}
export declare class DsLabel extends HTMLElement {}
export declare class DsFieldset extends HTMLElement {}
export declare class DsLegend extends HTMLElement {}
export declare class DsForm extends HTMLElement {}
export declare class BaseComponent extends HTMLElement {}

// Version
export declare const VERSION: string; 