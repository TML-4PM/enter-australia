
/**
 * SEO testing utilities for multilingual content
 */

/**
 * Test hreflang implementation
 */
export function testHreflangTags() {
  const issues = [];
  const supportedLanguages = ['en', 'ko', 'zh', 'hi', 'ar'];
  
  // Check for hreflang meta tags
  const hreflangTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
  
  if (hreflangTags.length === 0) {
    issues.push('No hreflang tags found');
  } else {
    const hreflangLanguages = Array.from(hreflangTags).map(tag => tag.getAttribute('hreflang'));
    
    // Check if all supported languages have hreflang tags
    supportedLanguages.forEach(lang => {
      if (!hreflangLanguages.includes(lang)) {
        issues.push(`Missing hreflang for language: ${lang}`);
      }
    });
    
    // Check for x-default hreflang
    if (!hreflangLanguages.includes('x-default')) {
      issues.push('Missing x-default hreflang tag');
    }
  }

  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'Hreflang tags properly configured' 
      : `Hreflang issues: ${issues.join('; ')}`
  };
}

/**
 * Test language-specific meta tags
 */
export function testLanguageSpecificMeta() {
  const issues = [];
  const currentLang = document.documentElement.lang || 'en';
  
  // Check language attribute on html element
  if (!document.documentElement.lang) {
    issues.push('HTML lang attribute not set');
  }
  
  // Check meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && metaDescription.content) {
    // Very basic check for language-appropriate content
    const content = metaDescription.content;
    
    // Check if description seems appropriate for the current language
    if (currentLang === 'ar' && !/[\u0600-\u06FF]/.test(content)) {
      issues.push('Meta description not in Arabic for ar language');
    } else if (currentLang === 'zh' && !/[\u4e00-\u9fff]/.test(content)) {
      issues.push('Meta description not in Chinese for zh language');
    } else if (currentLang === 'ko' && !/[\uac00-\ud7af]/.test(content)) {
      issues.push('Meta description not in Korean for ko language');
    } else if (currentLang === 'hi' && !/[\u0900-\u097F]/.test(content)) {
      issues.push('Meta description not in Hindi for hi language');
    }
  }
  
  // Check Open Graph language tags
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (!ogLocale) {
    issues.push('Missing og:locale meta tag');
  } else {
    const locale = ogLocale.content;
    const expectedLocale = getOpenGraphLocale(currentLang);
    if (locale !== expectedLocale) {
      issues.push(`og:locale mismatch: expected ${expectedLocale}, got ${locale}`);
    }
  }

  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'Language-specific meta tags properly configured' 
      : `Meta tag issues: ${issues.join('; ')}`
  };
}

/**
 * Test canonical URLs for language variants
 */
export function testCanonicalUrls() {
  const issues = [];
  
  // Check for canonical link
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    issues.push('Missing canonical URL');
  } else {
    const canonicalUrl = canonical.href;
    const currentUrl = window.location.href;
    const currentLang = document.documentElement.lang || 'en';
    
    // Check if canonical URL includes language parameter/path
    if (currentLang !== 'en' && !canonicalUrl.includes(currentLang)) {
      issues.push(`Canonical URL should include language parameter for ${currentLang}`);
    }
  }

  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'Canonical URLs properly configured' 
      : `Canonical URL issues: ${issues.join('; ')}`
  };
}

/**
 * Helper function to get Open Graph locale
 */
function getOpenGraphLocale(language) {
  const localeMap = {
    'en': 'en_US',
    'ko': 'ko_KR',
    'zh': 'zh_CN',
    'hi': 'hi_IN',
    'ar': 'ar_SA'
  };
  
  return localeMap[language] || 'en_US';
}
