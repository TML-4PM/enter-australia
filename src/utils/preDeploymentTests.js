
/**
 * Pre-deployment testing utility
 * Checks key aspects of the site before deployment
 */
import { supabase } from './supabaseClient';

// Test configuration
const config = {
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

/**
 * Run all tests and generate a report
 * @returns {Promise<Object>} Test results
 */
export const runPreDeploymentTests = async () => {
  console.log('🧪 Running pre-deployment tests...');
  
  const results = {
    browserCompatibility: await testBrowserCompatibility(),
    responsiveness: testResponsiveness(),
    contentCheck: await testContent(),
    imagesOptimization: await testImageOptimization(),
    formValidation: testFormValidation(),
    links: await testLinks(),
    seo: testSeo(),
    analytics: testAnalytics(),
    performance: await testPerformance(),
    accessibility: await testAccessibility(),
    errorHandling: testErrorHandling(),
    loadingStates: testLoadingStates(),
  };

  // Generate summary
  const passedTests = Object.values(results).filter(r => r.status === 'pass').length;
  const totalTests = Object.keys(results).length;
  const passRate = Math.floor((passedTests / totalTests) * 100);

  console.log(`✅ ${passedTests}/${totalTests} checks passed (${passRate}%)`);
  
  if (passRate < 100) {
    console.log('❌ Failed tests:');
    Object.entries(results)
      .filter(([_, result]) => result.status !== 'pass')
      .forEach(([test, result]) => {
        console.log(`- ${test}: ${result.message}`);
      });
  }

  return {
    summary: {
      passedTests,
      totalTests,
      passRate,
      timestamp: new Date().toISOString()
    },
    details: results
  };
};

/**
 * Test browser compatibility
 */
async function testBrowserCompatibility() {
  // In a real implementation, this would use browser detection or a service like BrowserStack
  // Here we're just checking for common browser compatibility issues in the code
  
  try {
    // Check for use of modern JS features without polyfills
    const modernFeatures = [
      { feature: 'CSS Grid', test: () => CSS && CSS.supports && CSS.supports('display', 'grid') },
      { feature: 'Fetch API', test: () => typeof fetch === 'function' },
      { feature: 'Flexbox', test: () => CSS && CSS.supports && CSS.supports('display', 'flex') },
      { feature: 'Custom Properties', test: () => CSS && CSS.supports && CSS.supports('--custom-property', 'value') }
    ];

    const unsupportedFeatures = modernFeatures
      .filter(item => !item.test())
      .map(item => item.feature);

    return {
      status: unsupportedFeatures.length === 0 ? 'pass' : 'warn',
      message: unsupportedFeatures.length === 0 
        ? 'All browser features appear to be supported' 
        : `Potential compatibility issues with: ${unsupportedFeatures.join(', ')}`
    };
  } catch (e) {
    return { 
      status: 'error', 
      message: `Error testing browser compatibility: ${e.message}` 
    };
  }
}

/**
 * Test responsive design
 */
function testResponsiveness() {
  // Check for responsive CSS and viewport meta tag
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  const hasResponsiveCSS = document.styleSheets && 
    Array.from(document.styleSheets).some(sheet => {
      try {
        return Array.from(sheet.cssRules).some(rule => 
          rule.media && rule.media.mediaText.includes('max-width'));
      } catch (e) {
        // CORS error when accessing cross-origin stylesheets
        return false;
      }
    });

  if (!viewportMeta) {
    return { 
      status: 'warn', 
      message: 'Viewport meta tag is missing' 
    };
  }

  return {
    status: hasResponsiveCSS ? 'pass' : 'warn',
    message: hasResponsiveCSS 
      ? 'Responsive CSS detected' 
      : 'No media queries detected - site may not be responsive'
  };
}

/**
 * Test content for common issues
 */
async function testContent() {
  const issues = [];
  
  // Check for placeholder text
  const placeholderTerms = ['lorem ipsum', 'placeholder', 'XXX', 'TODO', 'FIXME'];
  const bodyText = document.body.innerText.toLowerCase();
  
  placeholderTerms.forEach(term => {
    if (bodyText.includes(term.toLowerCase())) {
      issues.push(`Found "${term}" in page content`);
    }
  });

  // Check for very short or very long paragraphs
  const paragraphs = document.querySelectorAll('p');
  for (const p of paragraphs) {
    const text = p.innerText.trim();
    if (text.length > 0 && text.length < 10) {
      issues.push(`Very short paragraph found: "${text}"`);
    }
    if (text.length > 500) {
      issues.push(`Very long paragraph found (${text.length} chars)`);
    }
  }

  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'No obvious content issues found' 
      : `Content issues: ${issues.join('; ')}`
  };
}

/**
 * Test image optimization
 */
async function testImageOptimization() {
  const issues = [];
  const images = Array.from(document.querySelectorAll('img'));
  
  if (images.length === 0) {
    return {
      status: 'warn',
      message: 'No images found on page'
    };
  }

  // Check for missing alt text
  const missingAltCount = images.filter(img => !img.alt).length;
  if (missingAltCount > 0) {
    issues.push(`${missingAltCount} images missing alt text`);
  }

  // Check for large images
  let largeImages = 0;
  for (const img of images) {
    if (img.complete) {
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const renderedWidth = img.width;
      const renderedHeight = img.height;
      
      // Image is more than twice as large as it's being displayed
      if (imgWidth > renderedWidth * 2 && imgHeight > renderedHeight * 2) {
        largeImages++;
      }
    }
  }
  
  if (largeImages > 0) {
    issues.push(`${largeImages} oversized images found`);
  }

  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'All images appear to be optimized' 
      : `Image issues: ${issues.join('; ')}`
  };
}

/**
 * Test form validation
 */
function testFormValidation() {
  const issues = [];
  
  Object.entries(config.forms).forEach(([formName, selector]) => {
    const form = document.querySelector(selector);
    if (!form) {
      issues.push(`Form "${formName}" not found on page`);
      return;
    }
    
    // Check for required fields and validation attributes
    const inputs = form.querySelectorAll('input, textarea, select');
    let hasRequiredFields = false;
    
    inputs.forEach(input => {
      if (input.hasAttribute('required')) {
        hasRequiredFields = true;
      }
      
      if (input.type === 'email' && !input.pattern && !input.hasAttribute('required')) {
        issues.push(`Email input in "${formName}" form is not required and has no pattern validation`);
      }
    });
    
    if (!hasRequiredFields) {
      issues.push(`Form "${formName}" has no required fields`);
    }
  });
  
  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'Form validation looks good' 
      : `Form issues: ${issues.join('; ')}`
  };
}

/**
 * Test links for common issues
 */
async function testLinks() {
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

  // Test critical links
  // Note: This could be enhanced to actually check if these links exist on the pages
  
  return {
    status: issues.length === 0 ? 'pass' : 'warn',
    message: issues.length === 0 
      ? 'All links appear valid' 
      : `Link issues: ${issues.join('; ')}`
  };
}

/**
 * Test SEO elements
 */
function testSeo() {
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
function testAnalytics() {
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

/**
 * Test performance
 */
async function testPerformance() {
  const issues = [];
  
  // Check page load time
  if (window.performance) {
    const pageLoadTime = performance.now();
    if (pageLoadTime > config.performance.maxPageLoadTime) {
      issues.push(`Page load time (${Math.round(pageLoadTime)}ms) exceeds maximum (${config.performance.maxPageLoadTime}ms)`);
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

/**
 * Test accessibility
 */
async function testAccessibility() {
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

/**
 * Test error handling
 */
function testErrorHandling() {
  // Check if there are error handlers for forms
  const forms = document.querySelectorAll('form');
  let hasErrorHandling = false;
  
  // Look for common error handling patterns
  const errorElements = document.querySelectorAll('.error, .alert, .alert-error, .form-error, [role="alert"]');
  hasErrorHandling = errorElements.length > 0;
  
  // Also check for catch blocks in any inline scripts
  const scripts = document.querySelectorAll('script:not([src])');
  for (const script of scripts) {
    if (script.innerText.includes('catch') || script.innerText.includes('try')) {
      hasErrorHandling = true;
      break;
    }
  }
  
  return {
    status: hasErrorHandling ? 'pass' : 'warn',
    message: hasErrorHandling 
      ? 'Error handling detected' 
      : 'No visible error handling found - verify manually'
  };
}

/**
 * Test loading states
 */
function testLoadingStates() {
  // Check for loading indicators
  const loadingElements = document.querySelectorAll(
    '.loading, .spinner, .loader, [role="progressbar"], .blog-loader'
  );
  
  const hasLoadingStates = loadingElements.length > 0;
  
  return {
    status: hasLoadingStates ? 'pass' : 'warn',
    message: hasLoadingStates 
      ? 'Loading indicators detected' 
      : 'No visible loading indicators found - verify manually'
  };
}
