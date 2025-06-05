
/**
 * Advanced language detection and user preference management
 */

/**
 * Detect user's preferred language based on multiple factors
 */
export const detectUserLanguage = () => {
  // Priority order: stored preference > browser language > default
  const storedLang = localStorage.getItem('i18nextLng');
  if (storedLang && isLanguageSupported(storedLang)) {
    return storedLang;
  }

  // Browser language detection
  const browserLang = getBrowserLanguage();
  if (browserLang && isLanguageSupported(browserLang)) {
    return browserLang;
  }

  // Default fallback
  return 'en';
};

/**
 * Get browser language with fallback handling
 */
export const getBrowserLanguage = () => {
  const languages = [
    navigator.language,
    navigator.userLanguage,
    ...(navigator.languages || [])
  ].filter(Boolean);

  for (const lang of languages) {
    const primaryLang = lang.split('-')[0].toLowerCase();
    if (isLanguageSupported(primaryLang)) {
      return primaryLang;
    }
  }

  return null;
};

/**
 * Check if a language is supported
 */
export const isLanguageSupported = (langCode) => {
  const supportedLanguages = ['en', 'ko', 'zh', 'hi', 'ar'];
  return supportedLanguages.includes(langCode);
};

/**
 * Get language suggestions based on user's context
 */
export const getLanguageSuggestions = () => {
  const browserLang = getBrowserLanguage();
  const storedLang = localStorage.getItem('i18nextLng');
  
  const suggestions = [];
  
  // Suggest browser language if different from stored
  if (browserLang && browserLang !== storedLang) {
    suggestions.push({
      code: browserLang,
      reason: 'browser',
      priority: 1
    });
  }

  // Regional suggestions based on time zone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timeZone) {
    const regionalSuggestions = getRegionalLanguageSuggestions(timeZone);
    suggestions.push(...regionalSuggestions);
  }

  return suggestions.sort((a, b) => b.priority - a.priority);
};

/**
 * Get language suggestions based on timezone/region
 */
const getRegionalLanguageSuggestions = (timeZone) => {
  const suggestions = [];
  
  // Asia-Pacific region
  if (timeZone.includes('Asia/') || timeZone.includes('Pacific/')) {
    if (timeZone.includes('Seoul') || timeZone.includes('Pyongyang')) {
      suggestions.push({ code: 'ko', reason: 'region', priority: 0.8 });
    }
    if (timeZone.includes('Shanghai') || timeZone.includes('Beijing') || timeZone.includes('Hong_Kong')) {
      suggestions.push({ code: 'zh', reason: 'region', priority: 0.8 });
    }
    if (timeZone.includes('Kolkata') || timeZone.includes('Delhi')) {
      suggestions.push({ code: 'hi', reason: 'region', priority: 0.8 });
    }
  }
  
  // Middle East region
  if (timeZone.includes('Asia/Dubai') || timeZone.includes('Asia/Riyadh') || timeZone.includes('Asia/Kuwait')) {
    suggestions.push({ code: 'ar', reason: 'region', priority: 0.7 });
  }

  return suggestions;
};

/**
 * Track language usage patterns
 */
export const trackLanguageUsage = (language, action = 'use') => {
  try {
    const key = 'language_usage_stats';
    const stats = JSON.parse(localStorage.getItem(key) || '{}');
    
    if (!stats[language]) {
      stats[language] = { count: 0, lastUsed: null, actions: {} };
    }
    
    stats[language].count += 1;
    stats[language].lastUsed = new Date().toISOString();
    stats[language].actions[action] = (stats[language].actions[action] || 0) + 1;
    
    localStorage.setItem(key, JSON.stringify(stats));
  } catch (error) {
    console.warn('Failed to track language usage:', error);
  }
};

/**
 * Get user's language usage patterns
 */
export const getLanguageUsageStats = () => {
  try {
    const stats = JSON.parse(localStorage.getItem('language_usage_stats') || '{}');
    return Object.entries(stats)
      .map(([lang, data]) => ({ language: lang, ...data }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    console.warn('Failed to get language usage stats:', error);
    return [];
  }
};
