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
  
  // Run notification blocker after analytics loads
  runNotificationBlocker();
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
  
  // Premium tiers get higher scores
  if (actions.tier === 'Premium Retainer' || actions.tier === 'Enterprise') {
    score += 15;
  } else if (actions.tier === 'Growth Plan') {
    score += 10;
  }
  
  return score;
};
