
import React, { useState, useEffect } from 'react';
import { runPreDeploymentTests } from '../utils/preDeploymentTests';
import '../styles/pre-deployment-check.css';

const PreDeploymentCheck = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const handleRunTests = async () => {
    setIsRunning(true);
    setResults(null);
    
    try {
      const testResults = await runPreDeploymentTests();
      setResults(testResults);
    } catch (error) {
      console.error('Error running tests:', error);
      setResults({
        summary: {
          passedTests: 0,
          totalTests: 0,
          passRate: 0,
          timestamp: new Date().toISOString()
        },
        details: {
          error: {
            status: 'error',
            message: `Test execution failed: ${error.message}`
          }
        }
      });
    } finally {
      setIsRunning(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return '✅';
      case 'warn':
        return '⚠️';
      case 'error':
      default:
        return '❌';
    }
  };

  return (
    <div className="pre-deployment-check">
      <div className="check-header">
        <h1>Pre-Deployment Checks</h1>
        <p>Run these tests before publishing your site to ensure everything is working correctly.</p>
        <button 
          onClick={handleRunTests} 
          disabled={isRunning}
          className="run-tests-btn"
        >
          {isRunning ? 'Running Tests...' : 'Run Tests'}
        </button>
      </div>

      {isRunning && (
        <div className="running-tests">
          <div className="spinner"></div>
          <p>Running tests, please wait...</p>
        </div>
      )}

      {results && (
        <div className="test-results">
          <div className="results-summary">
            <h2>Test Results</h2>
            <div className="summary-bar">
              <div 
                className="progress-bar" 
                style={{ width: `${results.summary.passRate}%` }}
              >
                {results.summary.passRate}%
              </div>
            </div>
            <p>
              {results.summary.passedTests} of {results.summary.totalTests} tests passed
            </p>
            <p className="timestamp">
              Tests run at: {new Date(results.summary.timestamp).toLocaleString()}
            </p>
          </div>

          <div className="results-details">
            <h3>Details</h3>
            {Object.entries(results.details).map(([test, result]) => (
              <div 
                key={test} 
                className={`test-item ${result.status}`}
                onClick={() => toggleSection(test)}
              >
                <div className="test-header">
                  <span className="status-icon">{getStatusIcon(result.status)}</span>
                  <h4>{test.charAt(0).toUpperCase() + test.slice(1).replace(/([A-Z])/g, ' $1')}</h4>
                  <span className="expand-icon">
                    {expandedSections[test] ? '▼' : '▶'}
                  </span>
                </div>
                {expandedSections[test] && (
                  <div className="test-details">
                    <p>{result.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="test-actions">
            <button onClick={handleRunTests} className="rerun-btn">
              Run Tests Again
            </button>
            <button 
              onClick={() => window.print()} 
              className="print-btn"
            >
              Print Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreDeploymentCheck;
