
/**
 * Ensures all translation keys from the default language (en) are present in other language files
 * Useful for debugging missing translations during development
 * 
 * @param {Object} i18n - The i18next instance
 * @param {boolean} logMissing - Whether to log missing keys (defaults to false)
 * @returns {Object} Object with keys for each language and the number of missing translations
 */
export const checkMissingTranslations = (i18n, logMissing = false) => {
  // Get all language codes
  const languages = Object.keys(i18n.options.resources);
  
  // Get default language resources (typically English)
  const defaultLang = i18n.options.fallbackLng;
  const defaultResources = i18n.options.resources[defaultLang].translation;
  
  // Result object to track missing translations
  const result = {};
  
  // Function to recursively check keys
  const checkKeysRecursively = (baseObj, comparedObj, currentPath = '') => {
    let missingKeys = [];
    
    Object.keys(baseObj).forEach(key => {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      
      if (typeof baseObj[key] === 'object' && baseObj[key] !== null) {
        // It's a nested object, recurse deeper
        if (!comparedObj[key] || typeof comparedObj[key] !== 'object') {
          missingKeys.push(newPath);
        } else {
          // Check nested keys
          const nestedMissing = checkKeysRecursively(baseObj[key], comparedObj[key], newPath);
          missingKeys = [...missingKeys, ...nestedMissing];
        }
      } else {
        // It's a leaf node (string value)
        if (!comparedObj || comparedObj[key] === undefined) {
          missingKeys.push(newPath);
        }
      }
    });
    
    return missingKeys;
  };
  
  // Check each language against the default language
  languages.forEach(langCode => {
    if (langCode === defaultLang) return; // Skip default language
    
    const langResources = i18n.options.resources[langCode].translation;
    const missingKeys = checkKeysRecursively(defaultResources, langResources);
    
    result[langCode] = {
      missingCount: missingKeys.length,
      missingKeys: missingKeys
    };
    
    if (logMissing && missingKeys.length > 0) {
      console.warn(`Language ${langCode} is missing ${missingKeys.length} translation keys:`, missingKeys);
    }
  });
  
  return result;
};

/**
 * Initialize language based on user preference or browser settings
 * 
 * @param {Object} i18n - The i18next instance
 */
export const initializeLanguage = (i18n) => {
  // Get the stored language preference
  const storedLang = localStorage.getItem('i18nextLng');
  
  if (storedLang) {
    // Use stored language preference
    changeLanguage(i18n, storedLang);
  } else {
    // No stored preference, use browser language if supported
    const browserLang = navigator.language.split('-')[0];
    const supportedLanguages = Object.keys(i18n.options.resources);
    
    if (supportedLanguages.includes(browserLang)) {
      changeLanguage(i18n, browserLang);
    } else {
      // Default to English if browser language not supported
      changeLanguage(i18n, 'en');
    }
  }
};

/**
 * Change the application language and handle RTL/LTR direction
 * 
 * @param {Object} i18n - The i18next instance
 * @param {string} langCode - The language code to change to
 */
export const changeLanguage = (i18n, langCode) => {
  i18n.changeLanguage(langCode);
  
  // Set HTML direction attribute for RTL languages
  document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = langCode;
  
  // Store the language preference
  localStorage.setItem('i18nextLng', langCode);
};
