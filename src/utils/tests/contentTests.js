
/**
 * Content quality tests
 */

/**
 * Test content for common issues
 */
export async function testContent() {
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
export async function testImageOptimization() {
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
