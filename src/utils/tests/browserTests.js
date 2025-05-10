
/**
 * Browser compatibility tests
 */

/**
 * Test browser compatibility
 */
export async function testBrowserCompatibility() {
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
export function testResponsiveness() {
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
