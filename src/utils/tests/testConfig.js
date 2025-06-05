
/**
 * Enhanced pre-deployment testing configuration with multilingual support
 */

export const testConfig = {
  // Add important pages to test
  pagesToTest: ['/', '/blog', '/solutions', '/pricing', '/contact'],
  
  // Add key links that should be working
  criticalLinks: [
    { path: '/', linkText: 'Get My Free Market Assessment' },
    { path: '/blog', linkText: 'Read More' },
    { path: '/', linkText: 'Download the Australia Tech Playbook' },
  ],
  
  // Form selectors to test
  forms: {
    lead: '.lead-form-container form',
    contact: '#contact-form',
    subscribe: '.email-drip-form',
  },
  
  // Expected response times (ms)
  performance: {
    maxPageLoadTime: 3000,
    maxApiResponseTime: 1000,
    maxLanguageSwitchTime: 500,
    maxTranslationLoadTime: 200,
  },
  
  // Multilingual testing configuration
  multilingual: {
    supportedLanguages: ['en', 'ko', 'zh', 'hi', 'ar'],
    rtlLanguages: ['ar'],
    defaultLanguage: 'en',
    fallbackChain: ['en', 'ko', 'zh'],
    
    // Critical translation keys that must exist
    criticalKeys: [
      'nav.home',
      'nav.solutions',
      'nav.contact',
      'common.loading',
      'common.error',
      'common.submit',
      'contact.form.submit',
      'leadForm.form.submit'
    ],
    
    // SEO requirements
    seo: {
      requireHreflang: true,
      requireCanonical: true,
      requireLanguageSpecificMeta: true,
      requireOpenGraphLocale: true
    },
    
    // Performance thresholds
    performance: {
      maxLanguageSwitchTime: 500,
      maxTranslationLoadTime: 200,
      maxCacheSize: 10,
      minCachedLanguages: 2
    },
    
    // Accessibility requirements
    accessibility: {
      minTouchTargetSize: 44, // pixels
      minFontSize: 16, // pixels for mobile
      requireAriaLabels: true,
      requireLanguageAttributes: true
    }
  },
  
  // Testing environments
  environments: {
    development: {
      enablePerformanceTests: true,
      enableAccessibilityTests: true,
      enableMultilingualTests: true,
      logLevel: 'verbose'
    },
    staging: {
      enablePerformanceTests: true,
      enableAccessibilityTests: true,
      enableMultilingualTests: true,
      enableSEOTests: true,
      logLevel: 'normal'
    },
    production: {
      enablePerformanceTests: false,
      enableAccessibilityTests: false,
      enableMultilingualTests: false,
      enableSEOTests: false,
      logLevel: 'minimal'
    }
  }
};

/**
 * Get configuration for current environment
 */
export const getCurrentEnvironmentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return testConfig.environments[env] || testConfig.environments.development;
};

/**
 * Check if a test should run in current environment
 */
export const shouldRunTest = (testType) => {
  const config = getCurrentEnvironmentConfig();
  
  switch (testType) {
    case 'performance':
      return config.enablePerformanceTests;
    case 'accessibility':
      return config.enableAccessibilityTests;
    case 'multilingual':
      return config.enableMultilingualTests;
    case 'seo':
      return config.enableSEOTests;
    default:
      return true;
  }
};
