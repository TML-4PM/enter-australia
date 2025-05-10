
/**
 * SEO testing utilities
 */

/**
 * Test SEO elements
 */
export function testSeo() {
  const issues = [];
  
  // Check for title
  const title = document.title;
  if (!title || title.length < 5) {
    issues.push('Missing or very short page title');
  }
  
  // Check for meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription || !metaDescription.content) {
    issues.push('Missing meta description');
  } else if (metaDescription.content.length < 50) {
    issues.push('Meta description is too short (< 50 chars)');
  } else if (metaDescription.content.length > 160) {
    issues.push('Meta description is too long (> 160 chars)');
  }
  
  // Check for heading structure
  const h1s = document.querySelectorAll('h1');
  if (h1s.length === 0) {
    issues.push('No H1 heading found');
  } else if (h1s.length > 1) {
    issues.push(`Multiple H1 headings found (${h1s.length})`);
  }
  
  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'SEO elements look good' 
      : `SEO issues: ${issues.join('; ')}`
  };
}

/**
 * Test analytics setup
 */
export function testAnalytics() {
  // Check if Google Analytics or similar is set up
  const hasGoogleAnalytics = window.gtag || window.ga || window.dataLayer;
  const hasAnalyticsScript = Array.from(document.querySelectorAll('script'))
    .some(script => script.src && (
      script.src.includes('google-analytics.com') || 
      script.src.includes('googletagmanager.com') ||
      script.src.includes('analytics')
    ));
  
  if (!hasGoogleAnalytics && !hasAnalyticsScript) {
    return {
      status: 'warn',
      message: 'No analytics detected on page'
    };
  }
  
  return {
    status: 'pass',
    message: 'Analytics setup detected'
  };
}
