
/**
 * AI response caching utilities to avoid duplicate expensive API calls
 */

const CACHE_PREFIX = 'ai_cache_';
const CACHE_EXPIRY_HOURS = 24;

/**
 * Generate cache key from prompt and parameters
 */
const generateCacheKey = (prompt, params = {}) => {
  const normalizedPrompt = prompt.toLowerCase().trim();
  const paramString = Object.keys(params)
    .sort()
    .map(key => `${key}:${params[key]}`)
    .join('|');
  
  // Simple hash function for cache key
  let hash = 0;
  const str = normalizedPrompt + paramString;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return `${CACHE_PREFIX}${Math.abs(hash)}`;
};

/**
 * Get cached AI response
 */
export const getCachedResponse = (prompt, params = {}) => {
  try {
    const cacheKey = generateCacheKey(prompt, params);
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) return null;
    
    const data = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache has expired
    if (now - data.timestamp > CACHE_EXPIRY_HOURS * 60 * 60 * 1000) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    // Track cache hit
    if (window.gtag) {
      window.gtag('event', 'ai_cache_hit', {
        'event_category': 'AI Cache',
        'event_label': 'cache_hit'
      });
    }
    
    return data.response;
  } catch (error) {
    console.error('Error getting cached response:', error);
    return null;
  }
};

/**
 * Cache AI response
 */
export const setCachedResponse = (prompt, response, params = {}) => {
  try {
    const cacheKey = generateCacheKey(prompt, params);
    const data = {
      response,
      timestamp: Date.now(),
      prompt: prompt.substring(0, 100), // Store truncated prompt for debugging
      params
    };
    
    localStorage.setItem(cacheKey, JSON.stringify(data));
    
    // Track cache set
    if (window.gtag) {
      window.gtag('event', 'ai_cache_set', {
        'event_category': 'AI Cache',
        'event_label': 'cache_set'
      });
    }
  } catch (error) {
    console.error('Error setting cached response:', error);
  }
};

/**
 * Clear expired cache entries
 */
export const clearExpiredCache = () => {
  try {
    const now = Date.now();
    const keysToRemove = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        const cached = localStorage.getItem(key);
        if (cached) {
          const data = JSON.parse(cached);
          if (now - data.timestamp > CACHE_EXPIRY_HOURS * 60 * 60 * 1000) {
            keysToRemove.push(key);
          }
        }
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    return keysToRemove.length;
  } catch (error) {
    console.error('Error clearing expired cache:', error);
    return 0;
  }
};

/**
 * Get cache statistics
 */
export const getCacheStats = () => {
  try {
    let totalEntries = 0;
    let totalSize = 0;
    let oldestEntry = Date.now();
    let newestEntry = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        totalEntries++;
        const cached = localStorage.getItem(key);
        if (cached) {
          totalSize += cached.length;
          const data = JSON.parse(cached);
          oldestEntry = Math.min(oldestEntry, data.timestamp);
          newestEntry = Math.max(newestEntry, data.timestamp);
        }
      }
    }
    
    return {
      totalEntries,
      totalSizeKB: Math.round(totalSize / 1024),
      oldestEntryAge: totalEntries > 0 ? Date.now() - oldestEntry : 0,
      newestEntryAge: totalEntries > 0 ? Date.now() - newestEntry : 0
    };
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return { totalEntries: 0, totalSizeKB: 0, oldestEntryAge: 0, newestEntryAge: 0 };
  }
};
