
# Analytics and Tracking Implementation

## Overview

Comprehensive analytics implementation covering user behavior, conversion tracking, A/B testing, and performance monitoring across the Tech4Humanity Australia platform.

## Analytics Stack

### Core Analytics
- **Google Analytics 4**: Primary analytics platform
- **Enhanced Ecommerce**: Conversion tracking
- **Custom Events**: Business-specific metrics
- **Real-time Analytics**: Live user monitoring

### Additional Tracking
- **Exit Intent Detection**: User engagement optimization
- **Interactive Tools Analytics**: Tool usage and completion rates
- **Multi-language Analytics**: Language-specific insights
- **Performance Monitoring**: Technical performance metrics

## Implementation Architecture

### Base Analytics Setup (`src/utils/analyticsUtils.js`)

```javascript
// Google Analytics 4 initialization
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined' && !window.gtag) {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: document.title,
      page_location: window.location.href
    });
  }
};
```

### Enhanced Analytics (`src/utils/enhancedAnalyticsUtils.js`)

```javascript
// Exit intent tracking
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

// Interactive tools tracking
export const trackToolUsage = (toolName, step, data = {}) => {
  if (window.gtag) {
    window.gtag('event', 'tool_interaction', {
      event_category: 'Interactive Tools',
      event_label: `${toolName}_${step}`,
      custom_parameters: {
        tool: toolName,
        step: step,
        session_id: getSessionId(),
        ...data
      }
    });
  }
};

// Conversion funnel tracking
export const trackConversionFunnel = (stage, source, value = null) => {
  if (window.gtag) {
    window.gtag('event', 'conversion_funnel', {
      event_category: 'Conversion',
      event_label: stage,
      value: value,
      custom_parameters: {
        funnel_stage: stage,
        traffic_source: source,
        session_id: getSessionId(),
        user_journey_stage: getUserJourneyStage()
      }
    });
  }
};
```

## Event Categories and Tracking

### User Engagement Events

```javascript
// Page view tracking with enhanced data
export const trackPageView = (pagePath, pageTitle) => {
  if (window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: pagePath,
      page_title: pageTitle,
      custom_map: {
        custom_parameter_1: 'user_language',
        custom_parameter_2: 'user_segment'
      }
    });
  }
};

// CTA button clicks
export const trackCtaClick = (buttonText, location, context = {}) => {
  if (window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'User Engagement',
      event_label: buttonText,
      custom_parameters: {
        button_location: location,
        page_section: context.section,
        user_intent: context.intent,
        timestamp: new Date().toISOString()
      }
    });
  }
};

// Form interactions
export const trackFormInteraction = (formName, action, fieldName = null) => {
  if (window.gtag) {
    window.gtag('event', 'form_interaction', {
      event_category: 'Forms',
      event_label: `${formName}_${action}`,
      custom_parameters: {
        form_name: formName,
        action: action,
        field_name: fieldName,
        completion_rate: calculateFormCompletion(formName)
      }
    });
  }
};
```

### Interactive Tools Analytics

```javascript
// ROI Calculator tracking
export const trackROICalculator = (step, data) => {
  const steps = {
    start: () => trackToolUsage('roi_calculator', 'started'),
    input_revenue: (value) => trackToolUsage('roi_calculator', 'revenue_entered', { revenue: value }),
    input_costs: (value) => trackToolUsage('roi_calculator', 'costs_entered', { costs: value }),
    calculate: (results) => trackToolUsage('roi_calculator', 'calculated', {
      roi_percentage: results.roiPercentage,
      payback_months: results.paybackMonths,
      net_profit: results.netProfit
    }),
    complete: (leadCaptured) => trackToolUsage('roi_calculator', 'completed', {
      lead_captured: leadCaptured,
      completion_time: getToolCompletionTime('roi_calculator')
    })
  };
  
  if (steps[step]) {
    steps[step](data);
  }
};

// Market Sizing Tool tracking
export const trackMarketSizing = (step, data) => {
  const events = {
    industry_selected: (industry) => trackToolUsage('market_sizing', 'industry_selected', { industry }),
    region_selected: (region) => trackToolUsage('market_sizing', 'region_selected', { region }),
    parameters_set: (params) => trackToolUsage('market_sizing', 'parameters_configured', params),
    results_generated: (results) => trackToolUsage('market_sizing', 'results_generated', {
      total_market_size: results.totalMarketSize,
      addressable_market: results.addressableMarket,
      target_segment: results.targetSegment
    })
  };
  
  if (events[step]) {
    events[step](data);
  }
};
```

### Conversion Tracking

```javascript
// Lead generation tracking
export const trackLeadGeneration = (source, leadData) => {
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'Conversion',
      value: 50, // Assign value to lead
      currency: 'AUD',
      custom_parameters: {
        lead_source: source,
        lead_quality: assessLeadQuality(leadData),
        company_size: leadData.companySize,
        industry: leadData.industry,
        urgency: leadData.urgency
      }
    });
  }
};

// Consultation booking tracking
export const trackConsultationBooking = (consultationType, bookingData) => {
  if (window.gtag) {
    window.gtag('event', 'book_consultation', {
      event_category: 'Conversion',
      value: 300, // Consultation value
      currency: 'AUD',
      custom_parameters: {
        consultation_type: consultationType,
        booking_source: bookingData.source,
        selected_time: bookingData.timeSlot,
        lead_score: calculateLeadScore(bookingData)
      }
    });
  }
};

// Payment conversion tracking
export const trackPaymentConversion = (product, amount, currency = 'AUD') => {
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: generateTransactionId(),
      value: amount,
      currency: currency,
      items: [{
        item_id: product.id,
        item_name: product.name,
        category: product.category,
        quantity: 1,
        price: amount
      }]
    });
  }
};
```

## A/B Testing Implementation

### Exit Intent A/B Testing

```javascript
// src/components/ExitIntentPopup.jsx
useEffect(() => {
  // A/B test for different offers
  const offers = [
    {
      id: 'free-assessment',
      title: 'Wait! Get Your FREE Market Entry Assessment',
      testVariant: 'A'
    },
    {
      id: 'strategy-guide',
      title: 'Download Our Complete AUKUS Strategy Guide',
      testVariant: 'B'
    },
    {
      id: 'consultation',
      title: 'Book a FREE 30-Minute Strategy Call',
      testVariant: 'C'
    }
  ];

  const selectedOffer = getABTestVariant('exit_intent_offer', offers);
  setOffer(selectedOffer);

  // Track A/B test exposure
  if (window.gtag) {
    window.gtag('event', 'ab_test_exposure', {
      experiment_id: 'exit_intent_offer',
      variant_id: selectedOffer.testVariant,
      custom_parameters: {
        offer_type: selectedOffer.id,
        user_segment: getUserSegment()
      }
    });
  }
}, []);
```

### A/B Testing Utilities

```javascript
// src/utils/enhancedAnalyticsUtils.js
export const getABTestVariant = (testName, variants) => {
  const userId = localStorage.getItem('user_id') || 'anonymous_' + Date.now();
  const hash = hashCode(userId + testName);
  const variantIndex = Math.abs(hash) % variants.length;
  
  // Store variant for consistency
  localStorage.setItem(`ab_test_${testName}`, variants[variantIndex].testVariant);
  
  return variants[variantIndex];
};

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
};
```

## Performance Analytics

### Page Performance Tracking

```javascript
// Performance monitoring
export const trackPerformanceMetrics = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        
        if (window.gtag && perfData) {
          window.gtag('event', 'timing_complete', {
            name: 'page_load_time',
            value: Math.round(perfData.loadEventEnd - perfData.fetchStart)
          });
          
          window.gtag('event', 'timing_complete', {
            name: 'dom_content_loaded',
            value: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)
          });
          
          window.gtag('event', 'timing_complete', {
            name: 'first_contentful_paint',
            value: Math.round(perfData.responseEnd - perfData.fetchStart)
          });
        }
      }, 0);
    });
  }
};

// Core Web Vitals tracking
export const trackCoreWebVitals = () => {
  if ('web-vital' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    });
  }
};

const sendToAnalytics = (metric) => {
  if (window.gtag) {
    window.gtag('event', 'web_vital', {
      event_category: 'Performance',
      event_label: metric.name,
      value: Math.round(metric.value),
      custom_parameters: {
        metric_delta: metric.delta,
        metric_id: metric.id
      }
    });
  }
};
```

## Error Tracking

```javascript
// Error tracking and reporting
export const trackError = (error, context) => {
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
      custom_parameters: {
        error_context: context,
        stack_trace: error.stack,
        user_agent: navigator.userAgent,
        page_url: window.location.href
      }
    });
  }
};

// JavaScript error boundary tracking
window.addEventListener('error', (event) => {
  trackError(event.error, 'javascript_error');
});

window.addEventListener('unhandledrejection', (event) => {
  trackError(new Error(event.reason), 'unhandled_promise_rejection');
});
```

## Multi-language Analytics

```javascript
// Language-specific tracking
export const trackLanguageSpecificEngagement = (action, content, language) => {
  if (window.gtag) {
    window.gtag('event', 'language_engagement', {
      event_category: 'Internationalization',
      event_label: `${action}_${language}`,
      custom_parameters: {
        content_type: content,
        user_language: language,
        browser_language: navigator.language,
        content_effectiveness: measureContentEffectiveness(content, language)
      }
    });
  }
};

// Language switching analytics
export const trackLanguageSwitch = (fromLanguage, toLanguage, method = 'manual') => {
  if (window.gtag) {
    window.gtag('event', 'language_switch', {
      event_category: 'User Preference',
      custom_parameters: {
        from_language: fromLanguage,
        to_language: toLanguage,
        switch_method: method,
        session_language_switches: getSessionLanguageSwitches()
      }
    });
  }
};
```

## Analytics Dashboard Integration

### Custom Metrics Setup

```javascript
// Custom dimensions for GA4
const customDimensions = {
  user_segment: 'custom_dimension_1',
  lead_quality: 'custom_dimension_2',
  tool_completion_rate: 'custom_dimension_3',
  language_preference: 'custom_dimension_4',
  traffic_source_detail: 'custom_dimension_5'
};

// Send custom dimensions
export const setCustomDimensions = (dimensions) => {
  if (window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      custom_map: dimensions
    });
  }
};
```

### Real-time Analytics

```javascript
// Real-time user activity tracking
export const trackUserActivity = () => {
  let activityTimer;
  let isActive = true;
  
  const trackActivity = () => {
    if (window.gtag && isActive) {
      window.gtag('event', 'user_activity', {
        event_category: 'Engagement',
        custom_parameters: {
          time_on_page: getTimeOnPage(),
          scroll_depth: getScrollDepth(),
          interactions_count: getInteractionsCount()
        }
      });
    }
  };
  
  // Track activity every 30 seconds
  activityTimer = setInterval(trackActivity, 30000);
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(activityTimer);
    trackActivity(); // Final activity ping
  });
};
```

## Privacy and Compliance

### GDPR Compliance

```javascript
// Cookie consent tracking
export const trackCookieConsent = (consentData) => {
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: consentData.analytics ? 'granted' : 'denied',
      ad_storage: consentData.marketing ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted'
    });
  }
};

// Data retention settings
export const configureDataRetention = () => {
  if (window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
  }
};
```

## Reporting and Insights

### Custom Reports Generation

```javascript
// Generate analytics reports
export const generateAnalyticsReport = async (dateRange, metrics) => {
  const reportData = {
    pageViews: await getPageViews(dateRange),
    conversions: await getConversions(dateRange),
    toolUsage: await getToolUsage(dateRange),
    languageDistribution: await getLanguageDistribution(dateRange),
    userJourney: await getUserJourneyData(dateRange)
  };
  
  return formatReportData(reportData);
};

// Key performance indicators
export const calculateKPIs = (data) => {
  return {
    conversionRate: (data.conversions / data.visitors) * 100,
    toolCompletionRate: (data.toolCompletions / data.toolStarts) * 100,
    averageSessionDuration: data.totalSessionTime / data.sessions,
    bounceRate: (data.singlePageSessions / data.totalSessions) * 100,
    leadQualityScore: assessLeadQuality(data.leads)
  };
};
```

This comprehensive analytics implementation provides detailed insights into user behavior, conversion optimization opportunities, and business performance metrics across all aspects of the Tech4Humanity Australia platform.
