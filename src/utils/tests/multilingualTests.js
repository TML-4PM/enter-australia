
/**
 * Multilingual testing utilities
 */

import { testConfig } from './testConfig';

/**
 * Test translation completeness across all languages
 */
export function testTranslationCompleteness() {
  const issues = [];
  const supportedLanguages = ['en', 'ko', 'zh', 'hi', 'ar'];
  
  // Check if i18n is properly initialized
  if (!window.i18n || !window.i18n.options.resources) {
    issues.push('i18n not properly initialized');
    return {
      status: 'fail',
      message: `Translation system not initialized: ${issues.join('; ')}`
    };
  }

  const resources = window.i18n.options.resources;
  const defaultLang = 'en';
  
  if (!resources[defaultLang]) {
    issues.push(`Default language ${defaultLang} not found`);
    return {
      status: 'fail',
      message: `Missing default language: ${issues.join('; ')}`
    };
  }

  const defaultKeys = getAllTranslationKeys(resources[defaultLang].translation);
  
  supportedLanguages.forEach(lang => {
    if (lang === defaultLang) return;
    
    if (!resources[lang]) {
      issues.push(`Language ${lang} not loaded`);
      return;
    }
    
    const langKeys = getAllTranslationKeys(resources[lang].translation);
    const missingKeys = defaultKeys.filter(key => !langKeys.includes(key));
    
    if (missingKeys.length > 0) {
      issues.push(`Language ${lang} missing ${missingKeys.length} keys: ${missingKeys.slice(0, 3).join(', ')}${missingKeys.length > 3 ? '...' : ''}`);
    }
  });

  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'All translations complete' 
      : `Translation issues: ${issues.join('; ')}`
  };
}

/**
 * Test RTL layout for Arabic
 */
export function testRTLLayout() {
  const issues = [];
  const htmlElement = document.documentElement;
  
  // Check if RTL direction is supported
  if (!htmlElement.dir) {
    issues.push('HTML dir attribute not set');
  }
  
  // Check for RTL-specific CSS
  const rtlElements = document.querySelectorAll('[dir="rtl"]');
  const hasRTLStyles = Array.from(document.styleSheets).some(sheet => {
    try {
      return Array.from(sheet.cssRules || []).some(rule => 
        rule.cssText && rule.cssText.includes('rtl')
      );
    } catch (e) {
      return false;
    }
  });

  // Check for proper text alignment in RTL mode
  if (htmlElement.dir === 'rtl') {
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
    let improperTextAlignment = 0;
    
    textElements.forEach(el => {
      const style = window.getComputedStyle(el);
      if (el.innerText && el.innerText.trim() && style.textAlign === 'left') {
        improperTextAlignment++;
      }
    });
    
    if (improperTextAlignment > 5) {
      issues.push(`${improperTextAlignment} elements with improper RTL text alignment`);
    }
  }

  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'RTL layout properly configured' 
      : `RTL issues: ${issues.join('; ')}`
  };
}

/**
 * Test language switching performance
 */
export async function testLanguageSwitchingPerformance() {
  const issues = [];
  
  if (!window.i18n) {
    return {
      status: 'fail',
      message: 'i18n not available for testing'
    };
  }

  const testLanguages = ['ko', 'zh', 'ar'];
  const currentLang = window.i18n.language;
  const performanceResults = [];

  for (const lang of testLanguages) {
    const startTime = performance.now();
    
    try {
      await window.i18n.changeLanguage(lang);
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      performanceResults.push({ language: lang, duration });
      
      if (duration > 500) {
        issues.push(`Language switch to ${lang} took ${Math.round(duration)}ms (>500ms)`);
      }
    } catch (error) {
      issues.push(`Failed to switch to ${lang}: ${error.message}`);
    }
  }

  // Switch back to original language
  try {
    await window.i18n.changeLanguage(currentLang);
  } catch (error) {
    console.warn('Failed to restore original language:', error);
  }

  const avgDuration = performanceResults.length > 0 
    ? performanceResults.reduce((sum, result) => sum + result.duration, 0) / performanceResults.length 
    : 0;

  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? `Language switching performance good (avg: ${Math.round(avgDuration)}ms)` 
      : `Performance issues: ${issues.join('; ')}`
  };
}

/**
 * Test mobile language switcher usability
 */
export function testMobileLanguageSwitcher() {
  const issues = [];
  
  // Check if language switcher exists
  const languageSwitcher = document.querySelector('.language-switcher');
  if (!languageSwitcher) {
    issues.push('Language switcher not found');
    return {
      status: 'fail',
      message: 'Language switcher missing'
    };
  }

  // Check touch target size
  const rect = languageSwitcher.getBoundingClientRect();
  if (rect.width < 44 || rect.height < 44) {
    issues.push(`Touch target too small: ${Math.round(rect.width)}x${Math.round(rect.height)}px (minimum 44x44px)`);
  }

  // Check if dropdown is mobile-friendly
  const dropdown = document.querySelector('.language-dropdown');
  if (dropdown) {
    const dropdownRect = dropdown.getBoundingClientRect();
    if (dropdownRect.width < 200) {
      issues.push('Language dropdown too narrow for mobile');
    }
  }

  // Check for mobile-specific styling
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    const style = window.getComputedStyle(languageSwitcher);
    if (parseFloat(style.fontSize) < 16) {
      issues.push('Font size too small for mobile accessibility');
    }
  }

  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'Mobile language switcher usability good' 
      : `Mobile usability issues: ${issues.join('; ')}`
  };
}

/**
 * Helper function to get all translation keys recursively
 */
function getAllTranslationKeys(obj, prefix = '') {
  let keys = [];
  
  Object.keys(obj).forEach(key => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllTranslationKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  });
  
  return keys;
}
