
/**
 * Performance testing utilities
 */

import { testConfig } from './testConfig';

/**
 * Test performance
 */
export async function testPerformance() {
  const issues = [];
  
  // Check page load time
  if (window.performance) {
    const pageLoadTime = performance.now();
    if (pageLoadTime > testConfig.performance.maxPageLoadTime) {
      issues.push(`Page load time (${Math.round(pageLoadTime)}ms) exceeds maximum (${testConfig.performance.maxPageLoadTime}ms)`);
    }
  }
  
  // Check for large DOM
  const domSize = document.querySelectorAll('*').length;
  if (domSize > 1500) {
    issues.push(`Large DOM size: ${domSize} elements`);
  }
  
  // Check for render-blocking resources
  if (document.querySelectorAll('script:not([async]):not([defer])').length > 3) {
    issues.push('Multiple render-blocking scripts detected');
  }
  
  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'Performance looks good' 
      : `Performance issues: ${issues.join('; ')}`
  };
}
