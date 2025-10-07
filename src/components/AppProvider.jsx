
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import RouteTracker from './routing/RouteTracker';
import ErrorBoundary from './ErrorBoundary';
import I18nProvider from './I18nProvider';

const AppProvider = ({ children }) => {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <AuthProvider>
          <Router>
            <RouteTracker />
            {children}
          </Router>
        </AuthProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
};

export default AppProvider;
