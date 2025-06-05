
import React from 'react';
import TestRunner from './TestRunner';
import I18nMonitoringDashboard from './I18nMonitoringDashboard';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <TestRunner />
      </div>
      
      <div className="py-8 border-t border-gray-200">
        <I18nMonitoringDashboard />
      </div>
    </div>
  );
};

export default TestPage;
