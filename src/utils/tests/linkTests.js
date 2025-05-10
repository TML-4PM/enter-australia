
/**
 * Link testing utilities
 */

import { testConfig } from './testConfig';

/**
 * Test links for common issues
 */
export async function testLinks() {
  const links = Array.from(document.querySelectorAll('a'));
  const issues = [];
  
  if (links.length === 0) {
    return {
      status: 'warn',
      message: 'No links found on page'
    };
  }

  // Check for empty links
  const emptyLinks = links.filter(link => !link.href || link.href === '#' || link.href === 'javascript:void(0)');
  if (emptyLinks.length > 0) {
    issues.push(`${emptyLinks.length} empty or javascript: links found`);
  }
  
  // Check for missing rel attributes on external links
  const externalLinks = links.filter(link => 
    link.href && link.href.startsWith('http') && 
    !link.href.includes(window.location.hostname));
  
  const externalWithoutRel = externalLinks.filter(link => 
    !link.rel || (!link.rel.includes('noopener') && !link.rel.includes('noreferrer')));
  
  if (externalWithoutRel.length > 0) {
    issues.push(`${externalWithoutRel.length} external links missing rel="noopener noreferrer"`);
  }

  // Test critical links (implementation could be enhanced)
  
  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'All links appear valid' 
      : `Link issues: ${issues.join('; ')}`
  };
}
