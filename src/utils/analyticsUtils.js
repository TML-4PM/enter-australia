/**
 * Utility functions for tracking analytics events
 */

// Initialize Google Analytics (with proper GA ID)
export const initializeAnalytics = () => {
  // Add Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=G-XYZ12345AB`; // Updated to a proper GA ID format
  document.head.appendChild(script);
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-XYZ12345AB'); // Updated to match the ID above
  
  // Make gtag available globally
  window.gtag = gtag;
  
  // Initialize enhanced analytics tracking
  initializeEnhancedTracking();
  
  // Run notification blocker after analytics loads
  runNotificationBlocker();
  
  // Initialize AI analytics
  initializeAIAnalytics();
};

// NEW: Initialize enhanced tracking features
const initializeEnhancedTracking = () => {
  // Import enhanced analytics utilities
  try {
    const { initializeSessionTracking } = require('./enhancedAnalyticsUtils');
    initializeSessionTracking();
  } catch (error) {
    console.log('Enhanced analytics utilities not available');
  }
  
  // Set up conversion funnel tracking
  setupConversionTracking();
  
  // Initialize heat mapping event listeners
  setupHeatmapTracking();
};

// NEW: Setup conversion funnel tracking
const setupConversionTracking = () => {
  // Track page views with enhanced data
  const originalPushState = history.pushState;
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(() => {
      trackEnhancedPageView();
    }, 100);
  };
  
  // Track initial page load
  trackEnhancedPageView();
};

// NEW: Enhanced page view tracking
const trackEnhancedPageView = () => {
  if (window.gtag) {
    window.gtag('event', 'enhanced_page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      custom_parameters: {
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        referrer: document.referrer
      }
    });
  }
};

// NEW: Setup heatmap and user interaction tracking
const setupHeatmapTracking = () => {
  // Track scroll depth
  let maxScrollDepth = 0;
  window.addEventListener('scroll', () => {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollDepth > maxScrollDepth && scrollDepth % 25 === 0) {
      maxScrollDepth = scrollDepth;
      if (window.gtag) {
        window.gtag('event', 'scroll_depth', {
          event_category: 'Engagement',
          event_label: `${scrollDepth}%`,
          value: scrollDepth
        });
      }
    }
  });
  
  // Track time on page milestones
  const timeOnPageMilestones = [30, 60, 120, 300]; // seconds
  timeOnPageMilestones.forEach(seconds => {
    setTimeout(() => {
      if (window.gtag) {
        window.gtag('event', 'time_on_page', {
          event_category: 'Engagement',
          event_label: `${seconds}s`,
          value: seconds
        });
      }
    }, seconds * 1000);
  });
};

// Initialize AI-specific analytics
const initializeAIAnalytics = () => {
  // Clear expired AI cache entries on startup
  try {
    const { clearExpiredCache } = require('./aiCacheUtils');
    const clearedEntries = clearExpiredCache();
    console.log(`Cleared ${clearedEntries} expired AI cache entries`);
  } catch (error) {
    console.log('AI cache utilities not available');
  }
  
  // Set up periodic AI analytics reporting
  setInterval(() => {
    try {
      const { getAIUsageAnalytics } = require('./aiAnalyticsUtils');
      const analytics = getAIUsageAnalytics();
      
      if (analytics.todayInteractions > 0) {
        if (window.gtag) {
          window.gtag('event', 'ai_daily_summary', {
            'event_category': 'AI Analytics',
            'event_label': 'daily_summary',
            'custom_parameters': analytics
          });
        }
      }
    } catch (error) {
      console.log('AI analytics utilities not available');
    }
  }, 24 * 60 * 60 * 1000); // Daily reporting
};

// Track page views
export const trackPageView = (path) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path
    });
  }
};

// Extra function to block update notifications
const runNotificationBlocker = () => {
  const selectors = [
    '[data-testid="update-project-notification"]',
    '[data-testid="update-project-button"]',
    'div[role="alert"][data-testid]',
    'button[data-testid*="update"]',
    '.notification-update',
    '.lovable-update-banner'
  ];
  
  // Remove elements immediately
  const removeElements = () => {
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    });
  };
  
  // Run immediately
  removeElements();
  
  // Set up observer
  try {
    const observer = new MutationObserver(() => {
      removeElements();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Also run periodically
    setInterval(removeElements, 500);
  } catch (err) {
    console.log("Observer setup failed, falling back to interval only");
    setInterval(removeElements, 200);
  }
};

// Track PDF downloads
export const trackPdfDownload = (tierName) => {
  if (window.gtag) {
    window.gtag('event', 'download', {
      event_category: 'PDF',
      event_label: tierName,
      value: 1
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formType, tierName) => {
  if (window.gtag) {
    window.gtag('event', 'form_submit', {
      event_category: formType,
      event_label: tierName,
      value: 1
    });
  }
};

// Track CTA clicks
export const trackCtaClick = (ctaText, tierName) => {
  if (window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'Engagement',
      event_label: `${ctaText} - ${tierName}`,
      value: 1
    });
  }
};

// Track marketing post actions
export const trackMarketingAction = (actionType, postTitle) => {
  if (window.gtag) {
    window.gtag('event', actionType, {
      event_category: 'Marketing',
      event_label: postTitle,
      value: 1
    });
  }
};

// Lead scoring helper - will integrate with CRM
export const scoreLead = (actions) => {
  let score = 0;
  
  // Assign points based on actions
  if (actions.downloadedPdf) score += 10;
  if (actions.subscribedToEmails) score += 5;
  if (actions.viewedPricing) score += 3;
  if (actions.sharedContent) score += 7; // New: award points for content sharing
  if (actions.usedAIFeatures) score += 15; // New: AI feature usage is high value
  if (actions.providedAIFeedback) score += 8; // New: feedback indicates engagement
  
  // Premium tiers get higher scores
  if (actions.tier === 'Premium Retainer' || actions.tier === 'Enterprise') {
    score += 15;
  } else if (actions.tier === 'Growth Plan') {
    score += 10;
  }
  
  return score;
};

// New: Track AI-specific events (re-export from aiAnalyticsUtils)
export const trackAIInteraction = (interactionType, details = {}) => {
  try {
    const { trackAIInteraction: aiTrack } = require('./aiAnalyticsUtils');
    aiTrack(interactionType, details);
  } catch (error) {
    console.log('AI analytics not available, using basic tracking');
    if (window.gtag) {
      window.gtag('event', 'ai_interaction_fallback', {
        'event_category': 'AI Usage',
        'event_label': interactionType
      });
    }
  }
};

// New: Track AI feedback
export const trackAIFeedback = (responseId, feedback, details = {}) => {
  try {
    const { trackAIFeedback: aiFeedback } = require('./aiAnalyticsUtils');
    aiFeedback(responseId, feedback, details);
  } catch (error) {
    console.log('AI feedback tracking not available, using basic tracking');
    if (window.gtag) {
      window.gtag('event', 'ai_feedback_fallback', {
        'event_category': 'AI Quality',
        'event_label': feedback
      });
    }
  }
};
