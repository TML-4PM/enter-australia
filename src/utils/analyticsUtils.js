
/**
 * Utility functions for tracking analytics events
 */

// Initialize Google Analytics (replace with actual GA ID in production)
export const initializeAnalytics = () => {
  // Add Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`; // Replace with actual GA ID
  document.head.appendChild(script);
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX'); // Replace with actual GA ID
  
  // Make gtag available globally
  window.gtag = gtag;
};

// Track page views
export const trackPageView = (path) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path
    });
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

// Lead scoring helper - will integrate with CRM
export const scoreLead = (actions) => {
  let score = 0;
  
  // Assign points based on actions
  if (actions.downloadedPdf) score += 10;
  if (actions.subscribedToEmails) score += 5;
  if (actions.viewedPricing) score += 3;
  
  // Premium tiers get higher scores
  if (actions.tier === 'Premium Retainer' || actions.tier === 'Enterprise') {
    score += 15;
  } else if (actions.tier === 'Growth Plan') {
    score += 10;
  }
  
  return score;
};
