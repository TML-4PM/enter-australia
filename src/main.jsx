
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import CSS before App
import App from './App';

// Add console log for debugging CSS loading
console.log('Main JavaScript file loaded, CSS should be applied');

// Add debug to check if CSS is loaded
const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
console.log('Found', linkElements.length, 'stylesheet links');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
