
import React from 'react';
import DebugPanel from './DebugPanel';

const DebugRoute = () => {
  console.log('🔧 DebugRoute component rendered');
  
  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <DebugPanel />
      
      <h1 style={{ color: '#00843D' }}>Debug Page - Working! ✅</h1>
      
      <div style={{ 
        background: '#f0f8ff', 
        padding: '1rem', 
        borderRadius: '8px',
        margin: '1rem 0'
      }}>
        <h2>System Status</h2>
        <ul>
          <li>✅ React is working</li>
          <li>✅ Routing is functional</li>
          <li>✅ CSS is loading</li>
          <li>✅ JavaScript is executing</li>
        </ul>
      </div>

      <div style={{ 
        background: '#fff0f0', 
        padding: '1rem', 
        borderRadius: '8px',
        margin: '1rem 0'
      }}>
        <h2>Navigation Test</h2>
        <p>Current URL: {window.location.href}</p>
        <p>Time: {new Date().toLocaleString()}</p>
        <a href="/" style={{ color: '#00843D', textDecoration: 'underline' }}>
          Go to Homepage
        </a>
      </div>

      <div style={{ 
        background: '#f0fff0', 
        padding: '1rem', 
        borderRadius: '8px',
        margin: '1rem 0'
      }}>
        <h2>CSS Variables Test</h2>
        <div style={{ 
          background: 'var(--primary-color, #00843D)', 
          color: 'white',
          padding: '0.5rem',
          borderRadius: '4px',
          margin: '0.5rem 0'
        }}>
          Primary Color Test
        </div>
        <div style={{ 
          background: 'var(--secondary-color, #FFCD00)', 
          color: 'black',
          padding: '0.5rem',
          borderRadius: '4px',
          margin: '0.5rem 0'
        }}>
          Secondary Color Test
        </div>
      </div>
    </div>
  );
};

export default DebugRoute;
