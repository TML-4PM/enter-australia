
/**
 * Accessibility testing utilities
 */

/**
 * Test accessibility
 */
export async function testAccessibility() {
  const issues = [];
  
  // Check for basic accessibility issues
  
  // 1. Check for alt text on images
  const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
  if (imagesWithoutAlt.length > 0) {
    issues.push(`${imagesWithoutAlt.length} images missing alt text`);
  }
  
  // 2. Check for form labels
  const inputsWithoutLabels = Array.from(document.querySelectorAll('input, select, textarea'))
    .filter(input => {
      const hasLabel = Array.from(document.querySelectorAll('label')).some(label => 
        label.htmlFor === input.id
      );
      const hasAriaLabel = input.getAttribute('aria-label') || input.getAttribute('aria-labelledby');
      return !hasLabel && !hasAriaLabel && input.type !== 'hidden' && input.type !== 'submit' && input.type !== 'button';
    });
  
  if (inputsWithoutLabels.length > 0) {
    issues.push(`${inputsWithoutLabels.length} form inputs without proper labels`);
  }
  
  // 3. Check for contrast (simplified)
  // A full implementation would use a color contrast algorithm
  const isDark = (color) => {
    // Simple check if background color is likely dark
    return color && (color.includes('black') || color.includes('#00') || color.includes('rgb(0') || color.includes('rgba(0'));
  };
  
  const elements = Array.from(document.querySelectorAll('*'));
  let potentialContrastIssues = 0;
  
  elements.forEach(el => {
    const style = window.getComputedStyle(el);
    const bgColor = style.backgroundColor;
    const textColor = style.color;
    
    // Very simplified check - a real implementation would use proper color contrast calculation
    if ((isDark(bgColor) && isDark(textColor)) || (!isDark(bgColor) && !isDark(textColor))) {
      if (el.innerText && el.innerText.trim()) {
        potentialContrastIssues++;
      }
    }
  });
  
  if (potentialContrastIssues > 5) {
    issues.push(`${potentialContrastIssues} elements with potential contrast issues`);
  }
  
  // 4. Check for heading hierarchy
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const headingLevels = headings.map(h => parseInt(h.tagName.substring(1)));
  
  for (let i = 0; i < headingLevels.length - 1; i++) {
    if (headingLevels[i+1] > headingLevels[i] + 1) {
      issues.push('Heading hierarchy is not sequential');
      break;
    }
  }
  
  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'No obvious accessibility issues found' 
      : `Accessibility issues: ${issues.join('; ')}`
  };
}
