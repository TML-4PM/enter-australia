
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { translationCache } from '../utils/i18nCache';
import { changeLanguage } from '../utils/i18nUtils';

/**
 * Enhanced language switching hook with loading states and smooth transitions
 */
export const useLanguageSwitch = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingLanguage, setLoadingLanguage] = useState(null);

  const switchLanguage = useCallback(async (newLanguage) => {
    if (newLanguage === i18n.language) return;

    setIsLoading(true);
    setLoadingLanguage(newLanguage);

    try {
      // Load translations first
      await translationCache.getTranslations(newLanguage);
      
      // Add small delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Change language
      changeLanguage(i18n, newLanguage);
      
      // Track language switch for analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'language_switch', {
          previous_language: i18n.language,
          new_language: newLanguage,
          switch_method: 'manual'
        });
      }
    } catch (error) {
      console.error('Failed to switch language:', error);
      // Still attempt the switch even if preloading failed
      changeLanguage(i18n, newLanguage);
    } finally {
      setIsLoading(false);
      setLoadingLanguage(null);
    }
  }, [i18n]);

  return {
    currentLanguage: i18n.language,
    switchLanguage,
    isLoading,
    loadingLanguage
  };
};
