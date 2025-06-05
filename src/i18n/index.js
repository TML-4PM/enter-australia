
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { initializeLanguage, checkMissingTranslations } from '../utils/i18nUtils';
import { initializeTranslationCache, translationCache } from '../utils/i18nCache';
import { detectUserLanguage, trackLanguageUsage } from '../utils/languageDetection';
import { i18nPerformanceMonitor, timeI18nOperation } from '../utils/i18nPerformance';

// Enhanced language detection with fallback
const detectedLanguage = detectUserLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Start with minimal resources - load dynamically
    resources: {},
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },

    // Enhanced backend configuration for dynamic loading
    backend: {
      loadPath: (languages, namespaces) => {
        // This will be handled by our translation cache
        return null;
      }
    }
  }, async (err, t) => {
    if (err) {
      console.error('i18n initialization error:', err);
    }

    try {
      // Initialize translation cache and preload common languages
      await initializeTranslationCache();
      
      // Load initial language
      const initialLanguage = detectedLanguage;
      const timer = timeI18nOperation('language_switch', initialLanguage);
      timer.start();
      
      const translations = await translationCache.getTranslations(initialLanguage);
      
      // Add resources dynamically
      i18n.addResourceBundle(initialLanguage, 'translation', translations, true, true);
      
      // Change to detected language
      await i18n.changeLanguage(initialLanguage);
      
      timer.end();
      
      // Track initial language usage
      trackLanguageUsage(initialLanguage, 'initial_load');
      
      // Initialize language based on user preference
      initializeLanguage(i18n);
      
      // Check for missing translations in development environment
      if (process.env.NODE_ENV === 'development') {
        const missingTranslations = checkMissingTranslations(i18n, true);
        console.info('Missing translations report:', missingTranslations);
        
        // Log performance stats
        setTimeout(() => {
          console.info('i18n Performance Stats:', i18nPerformanceMonitor.getStats());
          const recommendations = i18nPerformanceMonitor.getRecommendations();
          if (recommendations.length > 0) {
            console.info('Performance Recommendations:', recommendations);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to initialize enhanced i18n:', error);
      // Fallback to basic initialization
      const enTranslations = await import('./locales/en.json');
      i18n.addResourceBundle('en', 'translation', enTranslations.default, true, true);
    }
  });

// Enhanced language change handler
const originalChangeLanguage = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = async (language, callback) => {
  const timer = timeI18nOperation('language_switch', language);
  timer.start();
  
  try {
    // Load translations if not already loaded
    if (!i18n.hasResourceBundle(language, 'translation')) {
      const translations = await translationCache.getTranslations(language);
      i18n.addResourceBundle(language, 'translation', translations, true, true);
    }
    
    // Track language usage
    trackLanguageUsage(language, 'manual_switch');
    
    const result = await originalChangeLanguage(language, callback);
    timer.end();
    
    return result;
  } catch (error) {
    timer.end();
    throw error;
  }
};

export default i18n;
