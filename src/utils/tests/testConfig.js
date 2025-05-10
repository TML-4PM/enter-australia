
/**
 * Pre-deployment testing configuration
 */

export const testConfig = {
  // Add important pages to test
  pagesToTest: ['/', '/blog', '/solutions', '/pricing', '/contact'],
  // Add key links that should be working
  criticalLinks: [
    { path: '/', linkText: 'Get My Free Market Assessment' },
    { path: '/blog', linkText: 'Read More' },
    { path: '/', linkText: 'Download the Australia Tech Playbook' },
  ],
  // Form selectors to test
  forms: {
    lead: '.lead-form-container form',
    contact: '#contact-form',
    subscribe: '.email-drip-form',
  },
  // Expected response times (ms)
  performance: {
    maxPageLoadTime: 3000,
    maxApiResponseTime: 1000,
  }
};
