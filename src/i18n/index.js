
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';
import zhTranslations from './locales/zh.json';
import hiTranslations from './locales/hi.json';
import koTranslations from './locales/ko.json';

import { initializeLanguage, checkMissingTranslations } from '../utils/i18nUtils';

const resources = {
  en: {
    translation: enTranslations
  },
  ar: {
    translation: arTranslations
  },
  zh: {
    translation: zhTranslations
  },
  hi: {
    translation: hiTranslations
  },
  ko: {
    translation: koTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  }, () => {
    // Initialize language based on user preference
    initializeLanguage(i18n);
    
    // Check for missing translations in development environment
    if (process.env.NODE_ENV === 'development') {
      const missingTranslations = checkMissingTranslations(i18n, true);
      console.info('Missing translations report:', missingTranslations);
    }
  });

export default i18n;
