/**
 * Performance monitoring and optimization utilities for i18n
 */

class I18nPerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.startTimes = new Map();
  }

  /**
   * Start timing a language operation
   */
  startTiming(operation, language) {
    const key = `${operation}_${language}`;
    this.startTimes.set(key, performance.now());
  }

  /**
   * End timing and record metric
   */
  endTiming(operation, language) {
    const key = `${operation}_${language}`;
    const startTime = this.startTimes.get(key);
    
    if (startTime) {
      const duration = performance.now() - startTime;
      
      if (!this.metrics.has(operation)) {
        this.metrics.set(operation, new Map());
      }
      
      const operationMetrics = this.metrics.get(operation);
      if (!operationMetrics.has(language)) {
        operationMetrics.set(language, []);
      }
      
      operationMetrics.get(language).push(duration);
      this.startTimes.delete(key);
      
      // Keep only last 10 measurements per operation/language
      const measurements = operationMetrics.get(language);
      if (measurements.length > 10) {
        measurements.shift();
      }
    }
  }

  /**
   * Get performance statistics
   */
  getStats() {
    const stats = {};
    
    for (const [operation, languageMap] of this.metrics.entries()) {
      stats[operation] = {};
      
      for (const [language, measurements] of languageMap.entries()) {
        const avg = measurements.reduce((a, b) => a + b, 0) / measurements.length;
        const min = Math.min(...measurements);
        const max = Math.max(...measurements);
        
        stats[operation][language] = {
          average: Math.round(avg * 100) / 100,
          min: Math.round(min * 100) / 100,
          max: Math.round(max * 100) / 100,
          samples: measurements.length
        };
      }
    }
    
    return stats;
  }

  /**
   * Get performance recommendations
   */
  getRecommendations() {
    const recommendations = [];
    const stats = this.getStats();
    
    // Check for slow language switches
    if (stats.language_switch) {
      for (const [language, metrics] of Object.entries(stats.language_switch)) {
        if (metrics.average > 500) {
          recommendations.push({
            type: 'performance',
            severity: 'high',
            message: `Language switch to ${language} is slow (${metrics.average}ms avg)`,
            suggestion: 'Consider preloading this language or optimizing translation files'
          });
        }
      }
    }
    
    // Check for translation loading times
    if (stats.translation_load) {
      for (const [language, metrics] of Object.entries(stats.translation_load)) {
        if (metrics.average > 200) {
          recommendations.push({
            type: 'performance',
            severity: 'medium',
            message: `Translation loading for ${language} is slow (${metrics.average}ms avg)`,
            suggestion: 'Consider splitting large translation files or improving caching'
          });
        }
      }
    }
    
    return recommendations;
  }

  /**
   * Clear all metrics
   */
  clearMetrics() {
    this.metrics.clear();
    this.startTimes.clear();
  }
}

// Singleton instance
export const i18nPerformanceMonitor = new I18nPerformanceMonitor();

/**
 * Decorator for timing i18n operations
 */
export const timeI18nOperation = (operation, language) => {
  return {
    start: () => i18nPerformanceMonitor.startTiming(operation, language),
    end: () => i18nPerformanceMonitor.endTiming(operation, language)
  };
};

/**
 * Performance-optimized translation loading
 */
export const optimizedTranslationLoad = async (language) => {
  const timer = timeI18nOperation('translation_load', language);
  timer.start();
  
  try {
    // Use the translation cache for loading
    const { translationCache } = await import('./i18nCache');
    const result = await translationCache.getTranslations(language);
    timer.end();
    return result;
  } catch (error) {
    timer.end();
    throw error;
  }
};
