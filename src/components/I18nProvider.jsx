import React, { useState, useEffect } from 'react';
import { i18nInitPromise } from '../i18n';

const I18nProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    i18nInitPromise
      .then(() => {
        setIsReady(true);
      })
      .catch((err) => {
        console.error('Failed to initialize i18n:', err);
        setError(err);
        // Still set ready to true to show the app with fallback language
        setIsReady(true);
      });
  }, []);

  if (error) {
    console.warn('i18n initialization error, using fallback language');
  }

  if (!isReady) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default I18nProvider;
