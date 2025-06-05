
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import RouteTracker from './routing/RouteTracker';
import ErrorBoundary from './ErrorBoundary';

const AppProvider = ({ children }) => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <RouteTracker />
          {children}
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default AppProvider;
