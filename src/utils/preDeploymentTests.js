
/**
 * Pre-deployment testing utility
 * Checks key aspects of the site before deployment
 */
import { supabase } from './supabaseClient';
import { testConfig } from './tests/testConfig';
import { testBrowserCompatibility, testResponsiveness } from './tests/browserTests';
import { testContent, testImageOptimization } from './tests/contentTests';
import { testFormValidation } from './tests/formTests';
import { testLinks } from './tests/linkTests';
import { testSeo, testAnalytics } from './tests/seoTests';
import { testPerformance } from './tests/performanceTests';
import { testAccessibility } from './tests/accessibilityTests';
import { testErrorHandling, testLoadingStates } from './tests/errorHandlingTests';

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
