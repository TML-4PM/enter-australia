
import React, { useState, useEffect } from 'react';
import { Monitor, Globe, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { i18nPerformanceMonitor } from '../utils/i18nPerformance';
import { i18nErrorHandler } from '../utils/i18nErrorHandling';
import { translationCache } from '../utils/i18nCache';
import { runEnhancedPreDeploymentTests } from '../utils/tests/enhancedPreDeploymentTests';

const I18nMonitoringDashboard = () => {
  const [performanceStats, setPerformanceStats] = useState(null);
  const [errorStats, setErrorStats] = useState(null);
  const [cacheStats, setCacheStats] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [isRunningTests, setIsRunningTests] = useState(false);

  useEffect(() => {
    refreshStats();
    const interval = setInterval(refreshStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const refreshStats = () => {
    setPerformanceStats(i18nPerformanceMonitor.getStats());
    setErrorStats(i18nErrorHandler.getErrorStats());
    setCacheStats(translationCache.getStats());
  };

  const runTests = async () => {
    setIsRunningTests(true);
    try {
      const results = await runEnhancedPreDeploymentTests();
      setTestResults(results);
    } catch (error) {
      console.error('Test run failed:', error);
    }
    setIsRunningTests(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass': return 'text-green-600';
      case 'warn': return 'text-yellow-600';
      case 'fail': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-4 h-4" />;
      case 'warn': return <AlertTriangle className="w-4 h-4" />;
      case 'fail': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="i18n-monitoring-dashboard">
      <div className="dashboard-header">
        <h2><Monitor className="w-6 h-6" /> i18n Monitoring Dashboard</h2>
        <button 
          onClick={refreshStats}
          className="btn-secondary"
        >
          Refresh Stats
        </button>
      </div>

      <div className="dashboard-grid">
        {/* Performance Stats */}
        <div className="dashboard-card">
          <h3><TrendingUp className="w-5 h-5" /> Performance</h3>
          {performanceStats ? (
            <div className="stats-grid">
              {Object.entries(performanceStats).map(([operation, languages]) => (
                <div key={operation} className="stat-item">
                  <h4>{operation.replace('_', ' ')}</h4>
                  {Object.entries(languages).map(([lang, metrics]) => (
                    <div key={lang} className="language-stat">
                      <span className="lang-code">{lang}</span>
                      <span className={`stat-value ${metrics.average > 200 ? 'text-red-600' : 'text-green-600'}`}>
                        {metrics.average}ms avg
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p>No performance data available</p>
          )}
        </div>

        {/* Error Stats */}
        <div className="dashboard-card">
          <h3><AlertTriangle className="w-5 h-5" /> Errors</h3>
          {errorStats ? (
            <div className="error-stats">
              <div className="error-summary">
                <span className="total-errors">Total Errors: {errorStats.totalErrors}</span>
              </div>
              
              {Object.keys(errorStats.errorTypes).length > 0 && (
                <div className="error-types">
                  <h4>Error Types</h4>
                  {Object.entries(errorStats.errorTypes).map(([type, count]) => (
                    <div key={type} className="error-type">
                      <span>{type.replace('_', ' ')}</span>
                      <span className="error-count">{count}</span>
                    </div>
                  ))}
                </div>
              )}

              {errorStats.recentErrors.length > 0 && (
                <div className="recent-errors">
                  <h4>Recent Errors</h4>
                  {errorStats.recentErrors.map((error, index) => (
                    <div key={index} className="recent-error">
                      <span className="error-type">{error.type}</span>
                      <span className="error-time">{new Date(error.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-green-600">No errors recorded</p>
          )}
        </div>

        {/* Cache Stats */}
        <div className="dashboard-card">
          <h3><Globe className="w-5 h-5" /> Translation Cache</h3>
          {cacheStats ? (
            <div className="cache-stats">
              <div className="cache-summary">
                <div className="cache-stat">
                  <span>Cached Languages:</span>
                  <span className="stat-value">{cacheStats.cacheSize}</span>
                </div>
                <div className="cache-stat">
                  <span>Loading:</span>
                  <span className="stat-value">{cacheStats.loadingCount}</span>
                </div>
              </div>
              
              {cacheStats.cachedLanguages.length > 0 && (
                <div className="cached-languages">
                  <h4>Cached Languages</h4>
                  <div className="language-list">
                    {cacheStats.cachedLanguages.map(lang => (
                      <span key={lang} className="language-badge">{lang}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>No cache data available</p>
          )}
        </div>

        {/* Test Results */}
        <div className="dashboard-card full-width">
          <div className="card-header">
            <h3><CheckCircle className="w-5 h-5" /> Test Results</h3>
            <button 
              onClick={runTests}
              disabled={isRunningTests}
              className="btn-primary"
            >
              {isRunningTests ? 'Running Tests...' : 'Run Tests'}
            </button>
          </div>
          
          {testResults ? (
            <div className="test-results">
              <div className="test-summary">
                <div className="summary-stats">
                  <span className="stat">
                    <strong>{testResults.summary.passedTests}</strong> passed
                  </span>
                  <span className="stat warning">
                    <strong>{testResults.summary.warningTests}</strong> warnings
                  </span>
                  <span className="stat error">
                    <strong>{testResults.summary.failedTests}</strong> failed
                  </span>
                  <span className="stat">
                    <strong>{testResults.summary.passRate}%</strong> pass rate
                  </span>
                </div>
                
                <div className={`readiness-badge ${testResults.deploymentReadiness.level.toLowerCase()}`}>
                  {testResults.deploymentReadiness.level.replace('_', ' ')}
                </div>
              </div>

              <div className="test-grid">
                {Object.entries(testResults.details).map(([testName, result]) => (
                  <div key={testName} className={`test-item ${result.status}`}>
                    <div className="test-header">
                      <span className={getStatusColor(result.status)}>
                        {getStatusIcon(result.status)}
                      </span>
                      <span className="test-name">{testName.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                    <p className="test-message">{result.message}</p>
                  </div>
                ))}
              </div>

              {testResults.deploymentReadiness.recommendations.length > 0 && (
                <div className="recommendations">
                  <h4>Recommendations</h4>
                  <ul>
                    {testResults.deploymentReadiness.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p>Click "Run Tests" to see comprehensive test results</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default I18nMonitoringDashboard;
