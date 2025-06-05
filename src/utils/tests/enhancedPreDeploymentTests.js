/**
 * Enhanced pre-deployment testing with comprehensive multilingual support
 */

import { testConfig } from './testConfig';
import { testBrowserCompatibility, testResponsiveness } from './browserTests';
import { testContent, testImageOptimization } from './contentTests';
import { testFormValidation } from './formTests';
import { testLinks } from './linkTests';
import { testSeo, testAnalytics } from './seoTests';
import { testPerformance } from './performanceTests';
import { testAccessibility } from './accessibilityTests';
import { testErrorHandling, testLoadingStates } from './errorHandlingTests';
import { 
  testTranslationCompleteness, 
  testRTLLayout, 
  testLanguageSwitchingPerformance,
  testMobileLanguageSwitcher 
} from './multilingualTests';
import { 
  testHreflangTags, 
  testLanguageSpecificMeta, 
  testCanonicalUrls 
} from './seoMultilingualTests';
import { i18nErrorHandler } from '../i18nErrorHandling';

/**
 * Run enhanced pre-deployment tests with multilingual support
 */
export const runEnhancedPreDeploymentTests = async () => {
  console.log('🧪 Running enhanced pre-deployment tests with multilingual support...');
  
  const results = {
    // Existing tests
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
    
    // New multilingual tests
    translationCompleteness: testTranslationCompleteness(),
    rtlLayout: testRTLLayout(),
    languageSwitchingPerformance: await testLanguageSwitchingPerformance(),
    mobileLanguageSwitcher: testMobileLanguageSwitcher(),
    hreflangTags: testHreflangTags(),
    languageSpecificMeta: testLanguageSpecificMeta(),
    canonicalUrls: testCanonicalUrls(),
    offlineBehavior: i18nErrorHandler.testOfflineBehavior(),
  };

  // Generate enhanced summary
  const passedTests = Object.values(results).filter(r => r.status === 'pass').length;
  const totalTests = Object.keys(results).length;
  const warningTests = Object.values(results).filter(r => r.status === 'warn').length;
  const failedTests = Object.values(results).filter(r => r.status === 'fail').length;
  const passRate = Math.floor((passedTests / totalTests) * 100);

  console.log(`✅ ${passedTests}/${totalTests} checks passed (${passRate}%)`);
  
  if (warningTests > 0) {
    console.log(`⚠️ ${warningTests} warnings`);
  }
  
  if (failedTests > 0) {
    console.log(`❌ ${failedTests} failures`);
    Object.entries(results)
      .filter(([_, result]) => result.status === 'fail')
      .forEach(([test, result]) => {
        console.log(`- ${test}: ${result.message}`);
      });
  }

  // Generate deployment readiness report
  const deploymentReadiness = generateDeploymentReadiness(results);

  return {
    summary: {
      passedTests,
      totalTests,
      warningTests,
      failedTests,
      passRate,
      deploymentReady: failedTests === 0,
      timestamp: new Date().toISOString()
    },
    details: results,
    deploymentReadiness
  };
};

/**
 * Generate deployment readiness assessment
 */
function generateDeploymentReadiness(results) {
  const criticalTests = [
    'browserCompatibility',
    'translationCompleteness',
    'performance',
    'accessibility'
  ];

  const recommendedTests = [
    'rtlLayout',
    'languageSwitchingPerformance',
    'hreflangTags',
    'seo'
  ];

  const criticalPassed = criticalTests.every(test => 
    results[test] && results[test].status === 'pass'
  );

  const recommendedPassed = recommendedTests.filter(test => 
    results[test] && results[test].status === 'pass'
  ).length;

  const readinessLevel = criticalPassed ? 
    (recommendedPassed >= 3 ? 'PRODUCTION_READY' : 'DEPLOYMENT_READY') : 
    'NEEDS_FIXES';

  return {
    level: readinessLevel,
    criticalTestsPassed: criticalPassed,
    recommendedTestsPassedCount: recommendedPassed,
    recommendedTestsTotal: recommendedTests.length,
    recommendations: generateRecommendations(results, readinessLevel)
  };
}

/**
 * Generate specific recommendations based on test results
 */
function generateRecommendations(results, readinessLevel) {
  const recommendations = [];

  if (readinessLevel === 'NEEDS_FIXES') {
    recommendations.push('🚨 Critical issues must be fixed before deployment');
  }

  // Translation-specific recommendations
  if (results.translationCompleteness?.status !== 'pass') {
    recommendations.push('📝 Complete missing translations before launch');
  }

  if (results.rtlLayout?.status !== 'pass') {
    recommendations.push('🔄 Fix RTL layout issues for Arabic users');
  }

  if (results.languageSwitchingPerformance?.status !== 'pass') {
    recommendations.push('⚡ Optimize language switching performance');
  }

  if (results.hreflangTags?.status !== 'pass') {
    recommendations.push('🌐 Implement hreflang tags for better SEO');
  }

  // Performance recommendations
  if (results.performance?.status !== 'pass') {
    recommendations.push('🚀 Optimize page load performance');
  }

  // Accessibility recommendations
  if (results.accessibility?.status !== 'pass') {
    recommendations.push('♿ Address accessibility issues');
  }

  if (readinessLevel === 'PRODUCTION_READY') {
    recommendations.push('🎉 All systems ready for production deployment!');
  }

  return recommendations;
}

/**
 * Test specific language functionality
 */
export const testLanguageSpecific = async (language) => {
  console.log(`Testing language-specific functionality for: ${language}`);
  
  const results = {};
  
  // Switch to target language
  if (window.i18n) {
    try {
      await window.i18n.changeLanguage(language);
      
      // Run language-specific tests
      results.translationLoading = { status: 'pass', message: 'Translations loaded successfully' };
      results.rtlLayout = language === 'ar' ? testRTLLayout() : { status: 'pass', message: 'RTL not applicable' };
      results.metaTags = testLanguageSpecificMeta();
      
    } catch (error) {
      results.translationLoading = { status: 'fail', message: `Failed to load ${language}: ${error.message}` };
    }
  } else {
    results.translationLoading = { status: 'fail', message: 'i18n system not available' };
  }
  
  return results;
};
