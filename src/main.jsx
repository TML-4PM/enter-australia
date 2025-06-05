
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Simple error handler
window.addEventListener('error', (event) => {
  console.error('Application error:', event.error);
});

console.log('Starting React application...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
