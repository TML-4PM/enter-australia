
// Enhanced analytics utilities for exit intent, interactive tools, and conversion tracking
export const trackExitIntent = (offer, action) => {
  if (window.gtag) {
    window.gtag('event', 'exit_intent_interaction', {
      event_category: 'Exit Intent',
      event_label: offer,
      custom_parameters: {
        action: action,
        timestamp: new Date().toISOString(),
        page_path: window.location.pathname
      }
    });
  }
};

export const trackToolUsage = (toolName, step, data = {}) => {
  if (window.gtag) {
    window.gtag('event', 'tool_interaction', {
      event_category: 'Interactive Tools',
      event_label: `${toolName}_${step}`,
      custom_parameters: {
        tool: toolName,
        step: step,
        ...data
      }
    });
  }
};

export const trackConversionFunnel = (stage, source, value = null) => {
  if (window.gtag) {
    window.gtag('event', 'conversion_funnel', {
      event_category: 'Conversion',
      event_label: stage,
      value: value,
      custom_parameters: {
        funnel_stage: stage,
        traffic_source: source,
        session_id: getSessionId()
      }
    });
  }
};

export const trackMicroConversion = (action, category, label) => {
  if (window.gtag) {
    window.gtag('event', 'micro_conversion', {
      event_category: category,
      event_label: label,
      custom_parameters: {
        micro_action: action,
        page_depth: getPageDepth(),
        time_on_site: getTimeOnSite()
      }
    });
  }
};

export const trackHeatmapEvents = (elementType, elementId, action) => {
  // This would integrate with a heatmap service like Hotjar or FullStory
  if (window.gtag) {
    window.gtag('event', 'user_interaction', {
      event_category: 'Heatmap',
      event_label: `${elementType}_${action}`,
      custom_parameters: {
        element_id: elementId,
        element_type: elementType,
        action: action,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`
      }
    });
  }
};

// Helper functions
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

const getPageDepth = () => {
  return parseInt(sessionStorage.getItem('page_depth') || '1');
};

const getTimeOnSite = () => {
  const startTime = sessionStorage.getItem('session_start_time');
  if (startTime) {
    return Math.floor((Date.now() - parseInt(startTime)) / 1000);
  }
  return 0;
};

// Initialize session tracking
export const initializeSessionTracking = () => {
  if (!sessionStorage.getItem('session_start_time')) {
    sessionStorage.setItem('session_start_time', Date.now().toString());
  }
  
  const currentDepth = getPageDepth();
  sessionStorage.setItem('page_depth', (currentDepth + 1).toString());
};

// A/B testing utilities
export const getABTestVariant = (testName, variants) => {
  const userId = localStorage.getItem('user_id') || 'anonymous_' + Date.now();
  const hash = hashCode(userId + testName);
  const variantIndex = Math.abs(hash) % variants.length;
  return variants[variantIndex];
};

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};
