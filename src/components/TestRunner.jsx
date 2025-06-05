
import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { runEnhancedPreDeploymentTests } from '../utils/tests/enhancedPreDeploymentTests';

const TestRunner = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [currentTest, setCurrentTest] = useState('');

  useEffect(() => {
    // Auto-run tests on component mount
    runTests();
  }, []);

  const runTests = async () => {
    setIsRunning(true);
    setResults(null);
    setCurrentTest('Initializing tests...');

    try {
      const testResults = await runEnhancedPreDeploymentTests();
      setResults(testResults);
      setCurrentTest('');
    } catch (error) {
      console.error('Test execution failed:', error);
      setResults({
        summary: {
          passedTests: 0,
          totalTests: 0,
          warningTests: 0,
          failedTests: 1,
          passRate: 0,
          deploymentReady: false,
          timestamp: new Date().toISOString()
        },
        details: {
          testExecutionError: {
            status: 'fail',
            message: `Test execution failed: ${error.message}`
          }
        },
        deploymentReadiness: {
          level: 'NEEDS_FIXES',
          criticalTestsPassed: false,
          recommendedTestsPassedCount: 0,
          recommendedTestsTotal: 4,
          recommendations: ['🚨 Fix test execution errors before deployment']
        }
      });
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warn':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getReadinessColor = (level) => {
    switch (level) {
      case 'PRODUCTION_READY':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'DEPLOYMENT_READY':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'NEEDS_FIXES':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Multilingual Deployment Test Suite
        </h1>
        <p className="text-gray-600 mb-6">
          Comprehensive testing for multilingual features, SEO optimization, and production readiness.
        </p>
        
        <button
          onClick={runTests}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          {isRunning ? 'Running Tests...' : 'Run Tests Again'}
        </button>
      </div>

      {isRunning && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-800">
              {currentTest || 'Running comprehensive tests...'}
            </span>
          </div>
        </div>
      )}

      {results && (
        <div className="space-y-8">
          {/* Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Test Summary</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {results.summary.passedTests}
                </div>
                <div className="text-sm text-green-700">Passed</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {results.summary.warningTests}
                </div>
                <div className="text-sm text-yellow-700">Warnings</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {results.summary.failedTests}
                </div>
                <div className="text-sm text-red-700">Failed</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {results.summary.passRate}%
                </div>
                <div className="text-sm text-blue-700">Pass Rate</div>
              </div>
            </div>

            <div className={`inline-block px-4 py-2 rounded-lg border font-semibold ${getReadinessColor(results.deploymentReadiness.level)}`}>
              {results.deploymentReadiness.level.replace('_', ' ')}
            </div>
          </div>

          {/* Deployment Readiness */}
          {results.deploymentReadiness && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Deployment Readiness</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Critical Tests</h3>
                  <div className={`flex items-center gap-2 ${results.deploymentReadiness.criticalTestsPassed ? 'text-green-600' : 'text-red-600'}`}>
                    {results.deploymentReadiness.criticalTestsPassed ? 
                      <CheckCircle className="w-4 h-4" /> : 
                      <XCircle className="w-4 h-4" />
                    }
                    <span>
                      {results.deploymentReadiness.criticalTestsPassed ? 'All critical tests passed' : 'Critical tests failed'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Recommended Tests</h3>
                  <div className="text-blue-600">
                    {results.deploymentReadiness.recommendedTestsPassedCount} of {results.deploymentReadiness.recommendedTestsTotal} passed
                  </div>
                </div>
              </div>

              {results.deploymentReadiness.recommendations.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {results.deploymentReadiness.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Detailed Results */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Detailed Test Results</h2>
            
            <div className="grid gap-4">
              {Object.entries(results.details).map(([testName, result]) => (
                <div 
                  key={testName}
                  className={`p-4 rounded-lg border-l-4 ${
                    result.status === 'pass' ? 'border-green-500 bg-green-50' :
                    result.status === 'warn' ? 'border-yellow-500 bg-yellow-50' :
                    'border-red-500 bg-red-50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(result.status)}
                    <h3 className="font-medium capitalize">
                      {testName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h3>
                  </div>
                  <p className={`text-sm ${
                    result.status === 'pass' ? 'text-green-700' :
                    result.status === 'warn' ? 'text-yellow-700' :
                    'text-red-700'
                  }`}>
                    {result.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Test Timestamp */}
          <div className="text-center text-gray-500 text-sm">
            Tests completed at: {new Date(results.summary.timestamp).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestRunner;
