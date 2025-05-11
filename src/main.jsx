
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import CSS before App
import App from './App';

// More comprehensive debugging
console.log('Main JavaScript file loaded, beginning app initialization');

// Create a function to monitor for styling issues
const monitorStyles = () => {
  // Check if CSS is loaded properly
  setTimeout(() => {
    const body = document.body;
    const computedStyle = window.getComputedStyle(body);
    console.log('Body font-family:', computedStyle.fontFamily);
    console.log('Body color:', computedStyle.color);
    console.log('Body background:', computedStyle.backgroundColor);
    
    console.log('App rendering complete, checking for errors...');
    if (document.querySelector('.error')) {
      console.error('Error elements found in the DOM');
    } else {
      console.log('No visible error elements in the DOM');
    }
  }, 1000);
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        console.log('Class change detected on:', mutation.target);
      }
    });
  });
  
  // Start observing once the DOM is loaded
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded, starting style observer');
    
    const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    console.log('Found', linkElements.length, 'stylesheet links');
    
    observer.observe(document.body, { 
      attributes: true, 
      childList: true, 
      subtree: true,
      attributeFilter: ['class', 'style']
    });
  });
};

// Start monitoring
monitorStyles();

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

console.log('Creating React root and rendering app...');
try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React render call complete');
} catch (error) {
  console.error('Failed to render React application:', error);
}
