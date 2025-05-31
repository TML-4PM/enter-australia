
import React from 'react';

const DebugPanel = () => {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    location: window.location.href,
    userAgent: navigator.userAgent,
    localStorage: {
      language: localStorage.getItem('i18nextLng'),
      keys: Object.keys(localStorage)
    },
    cssVariables: {
      primary: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
      secondary: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
    },
    components: {
      react: typeof React !== 'undefined',
      router: typeof window.ReactRouterDOM !== 'undefined'
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '1rem',
      borderRadius: '8px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#00ff00' }}>Debug Panel</h3>
      <pre style={{ margin: 0, fontSize: '11px', overflow: 'auto' }}>
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
};

export default DebugPanel;
