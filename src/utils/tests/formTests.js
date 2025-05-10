
/**
 * Form validation tests
 */

import { testConfig } from './testConfig';

/**
 * Test form validation
 */
export function testFormValidation() {
  const issues = [];
  
  Object.entries(testConfig.forms).forEach(([formName, selector]) => {
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
