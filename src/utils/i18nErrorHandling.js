/**
 * Enhanced error handling and fallback utilities for i18n
 */

import { translationCache } from './i18nCache';

class I18nErrorHandler {
  constructor() {
    this.errors = [];
    this.fallbackChain = ['en', 'ko', 'zh'];
    this.maxRetries = 3;
    this.retryDelay = 1000;
  }

  /**
   * Handle translation loading errors with fallback
   */
  async handleTranslationError(language, error, retryCount = 0) {
    console.warn(`Translation loading failed for ${language}:`, error);
    
    this.logError({
      type: 'translation_load_error',
      language,
      error: error.message,
      retryCount,
      timestamp: new Date().toISOString()
    });

    // Try fallback languages
    for (const fallbackLang of this.fallbackChain) {
      if (fallbackLang !== language) {
        try {
          console.log(`Attempting fallback to ${fallbackLang}`);
          const fallbackTranslations = await translationCache.getTranslations(fallbackLang);
          
          this.logError({
            type: 'fallback_success',
            originalLanguage: language,
            fallbackLanguage: fallbackLang,
            timestamp: new Date().toISOString()
          });
          
          return fallbackTranslations;
        } catch (fallbackError) {
          console.warn(`Fallback to ${fallbackLang} also failed:`, fallbackError);
        }
      }
    }

    // If all fallbacks fail, return minimal emergency translations
    this.logError({
      type: 'all_fallbacks_failed',
      language,
      timestamp: new Date().toISOString()
    });

    return this.getEmergencyTranslations();
  }

  /**
   * Handle language switching errors
   */
  async handleLanguageSwitchError(language, error) {
    console.error(`Language switch to ${language} failed:`, error);
    
    this.logError({
      type: 'language_switch_error',
      language,
      error: error.message,
      timestamp: new Date().toISOString()
    });

    // Try to recover by switching to a working language
    const workingLanguage = await this.findWorkingLanguage();
    if (workingLanguage) {
      try {
        if (window.i18n) {
          await window.i18n.changeLanguage(workingLanguage);
          console.log(`Recovered by switching to ${workingLanguage}`);
          return workingLanguage;
        }
      } catch (recoveryError) {
        console.error('Failed to recover language switch:', recoveryError);
      }
    }

    return null;
  }

  /**
   * Find a working language from the fallback chain
   */
  async findWorkingLanguage() {
    for (const lang of this.fallbackChain) {
      try {
        await translationCache.getTranslations(lang);
        return lang;
      } catch (error) {
        console.warn(`Language ${lang} not working:`, error);
      }
    }
    return null;
  }

  /**
   * Get emergency translations for critical UI elements
   */
  getEmergencyTranslations() {
    return {
      common: {
        loading: 'Loading...',
        error: 'Error',
        submit: 'Submit',
        cancel: 'Cancel',
        close: 'Close'
      },
      nav: {
        home: 'Home',
        solutions: 'Solutions',
        contact: 'Contact'
      }
    };
  }

  /**
   * Test offline behavior
   */
  testOfflineBehavior() {
    const issues = [];
    
    // Check if service worker is registered for caching
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        if (registrations.length === 0) {
          issues.push('No service worker registered for offline support');
        }
      });
    } else {
      issues.push('Service worker not supported');
    }

    // Check if translation cache has data
    const cacheStats = translationCache.getStats();
    if (cacheStats.cacheSize === 0) {
      issues.push('No translations cached for offline use');
    }

    return {
      status: issues.length === 0 ? 'pass' : 'warn',
      message: issues.length === 0 
        ? 'Offline behavior properly configured' 
        : `Offline issues: ${issues.join('; ')}`
    };
  }

  /**
   * Log errors for monitoring
   */
  logError(errorData) {
    this.errors.push(errorData);
    
    // Keep only last 50 errors
    if (this.errors.length > 50) {
      this.errors = this.errors.slice(-50);
    }
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'i18n_error', {
        error_type: errorData.type,
        language: errorData.language,
        custom_parameter: errorData.error || errorData.fallbackLanguage
      });
    }
  }

  /**
   * Get error statistics
   */
  getErrorStats() {
    const stats = {
      totalErrors: this.errors.length,
      errorTypes: {},
      languageErrors: {},
      recentErrors: this.errors.slice(-10)
    };

    this.errors.forEach(error => {
      // Count by error type
      stats.errorTypes[error.type] = (stats.errorTypes[error.type] || 0) + 1;
      
      // Count by language
      if (error.language) {
        stats.languageErrors[error.language] = (stats.languageErrors[error.language] || 0) + 1;
      }
    });

    return stats;
  }

  /**
   * Clear error log
   */
  clearErrors() {
    this.errors = [];
  }
}

// Singleton instance
export const i18nErrorHandler = new I18nErrorHandler();

/**
 * Enhanced error boundary for i18n components
 */
export class I18nErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('i18n Error Boundary caught an error:', error, errorInfo);
    
    i18nErrorHandler.logError({
      type: 'component_error',
      error: error.message,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });

    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="i18n-error-fallback">
          <h2>Translation Error</h2>
          <p>Something went wrong with the translation system.</p>
          <button onClick={() => this.setState({ hasError: false, errorInfo: null })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
