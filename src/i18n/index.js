
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations directly for immediate availability
import enTranslations from './locales/en.json';
import koTranslations from './locales/ko.json';
import zhTranslations from './locales/zh.json';
import arTranslations from './locales/ar.json';

import { initializeLanguage, checkMissingTranslations } from '../utils/i18nUtils';
import { initializeTranslationCache, translationCache } from '../utils/i18nCache';
import { detectUserLanguage, trackLanguageUsage } from '../utils/languageDetection';
import { i18nPerformanceMonitor, timeI18nOperation } from '../utils/i18nPerformance';

// Enhanced language detection with fallback
const detectedLanguage = detectUserLanguage();

// Initialize with all translations immediately available
const resources = {
  en: { translation: enTranslations },
  ko: { translation: koTranslations },
  zh: { translation: zhTranslations },
  ar: { translation: arTranslations }
};

// Create and export the initialization promise immediately
export const i18nInitPromise = new Promise((resolve, reject) => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',
      
      interpolation: {
        escapeValue: false
      },
      
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
        lookupLocalStorage: 'i18nextLng'
      }
    }, async (err, t) => {
      if (err) {
        console.error('i18n initialization error:', err);
        reject(err);
        return;
      }

      try {
        // Initialize translation cache after basic setup
        await initializeTranslationCache();
        
        // Track initial language usage
        trackLanguageUsage(detectedLanguage, 'initial_load');
        
        // Initialize language based on user preference
        initializeLanguage(i18n);
        
        // Check for missing translations in development environment
        if (process.env.NODE_ENV === 'development') {
          const missingTranslations = checkMissingTranslations(i18n, true);
          console.info('Missing translations report:', missingTranslations);
        }
        
        resolve(i18n);
      } catch (error) {
        console.error('Failed to initialize enhanced i18n features:', error);
        // Continue with basic functionality
        resolve(i18n);
      }
    });
});

// Enhanced language change handler
const originalChangeLanguage = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = async (language, callback) => {
  const timer = timeI18nOperation('language_switch', language);
  timer.start();
  
  try {
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
