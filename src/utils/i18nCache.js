
/**
 * Translation caching utilities for improved performance
 */

class TranslationCache {
  constructor() {
    this.cache = new Map();
    this.loadingPromises = new Map();
    this.lastAccessed = new Map();
    this.maxCacheSize = 10; // Maximum number of languages to keep in memory
    this.cacheExpiry = 1000 * 60 * 30; // 30 minutes
  }

  /**
   * Get cached translation or load it
   */
  async getTranslations(language) {
    const cacheKey = language;
    const now = Date.now();

    // Check if we have valid cached data
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (now - cached.timestamp < this.cacheExpiry) {
        this.lastAccessed.set(cacheKey, now);
        return cached.data;
      } else {
        // Expired cache
        this.cache.delete(cacheKey);
        this.lastAccessed.delete(cacheKey);
      }
    }

    // Check if we're already loading this language
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey);
    }

    // Load the translation
    const loadPromise = this.loadTranslation(language);
    this.loadingPromises.set(cacheKey, loadPromise);

    try {
      const data = await loadPromise;
      
      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: now
      });
      this.lastAccessed.set(cacheKey, now);
      
      // Clean up loading promise
      this.loadingPromises.delete(cacheKey);
      
      // Cleanup old cache entries if needed
      this.cleanupCache();
      
      return data;
    } catch (error) {
      this.loadingPromises.delete(cacheKey);
      throw error;
    }
  }

  /**
   * Dynamically load translation file
   */
  async loadTranslation(language) {
    try {
      let translationModule;
      
      switch (language) {
        case 'en':
          translationModule = await import('../i18n/locales/en.json');
          break;
        case 'ar':
          translationModule = await import('../i18n/locales/ar.json');
          break;
        case 'zh':
          translationModule = await import('../i18n/locales/zh.json');
          break;
        case 'hi':
          translationModule = await import('../i18n/locales/hi.json');
          break;
        case 'ko':
          translationModule = await import('../i18n/locales/ko.json');
          break;
        default:
          // Fallback to English
          translationModule = await import('../i18n/locales/en.json');
      }
      
      return translationModule.default || translationModule;
    } catch (error) {
      console.error(`Failed to load translations for ${language}:`, error);
      // Return English as fallback
      const fallback = await import('../i18n/locales/en.json');
      return fallback.default || fallback;
    }
  }

  /**
   * Preload commonly used languages
   */
  async preloadLanguages(languages = ['en', 'ko', 'zh']) {
    const preloadPromises = languages.map(lang => 
      this.getTranslations(lang).catch(err => 
        console.warn(`Failed to preload ${lang}:`, err)
      )
    );
    
    await Promise.allSettled(preloadPromises);
  }

  /**
   * Clean up old cache entries based on LRU
   */
  cleanupCache() {
    if (this.cache.size <= this.maxCacheSize) return;

    // Sort by last accessed time
    const entries = Array.from(this.lastAccessed.entries())
      .sort((a, b) => a[1] - b[1]);

    // Remove oldest entries
    const toRemove = entries.slice(0, entries.length - this.maxCacheSize);
    toRemove.forEach(([key]) => {
      this.cache.delete(key);
      this.lastAccessed.delete(key);
    });
  }

  /**
   * Clear all cached translations
   */
  clearCache() {
    this.cache.clear();
    this.lastAccessed.clear();
    this.loadingPromises.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      cacheSize: this.cache.size,
      loadingCount: this.loadingPromises.size,
      cachedLanguages: Array.from(this.cache.keys())
    };
  }
}

// Singleton instance
export const translationCache = new TranslationCache();

/**
 * Preload translations based on user preferences and browser language
 */
export const initializeTranslationCache = async () => {
  const browserLang = navigator.language.split('-')[0];
  const storedLang = localStorage.getItem('i18nextLng');
  
  const languagesToPreload = new Set(['en']); // Always preload English
  
  if (storedLang) languagesToPreload.add(storedLang);
  if (browserLang) languagesToPreload.add(browserLang);
  
  // Add common languages for better UX
  languagesToPreload.add('ko');
  languagesToPreload.add('zh');
  
  await translationCache.preloadLanguages(Array.from(languagesToPreload));
};
