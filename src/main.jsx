
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import CSS before App
import App from './App';

// More comprehensive debugging
console.log('Main JavaScript file loaded, beginning app initialization');

// Function to check if CSS is loaded properly
const checkCSSLoading = () => {
  const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
  console.log('Found', linkElements.length, 'stylesheet links');
  
  // Check if critical styles are applied
  setTimeout(() => {
    const body = document.body;
    const computedStyle = window.getComputedStyle(body);
    console.log('Body font-family:', computedStyle.fontFamily);
    console.log('Body color:', computedStyle.color);
    console.log('Body background:', computedStyle.backgroundColor);
    
    // Check page layout
    const header = document.querySelector('header');
    if (header) {
      console.log('Header element found');
    } else {
      console.error('Header element not found - possible rendering issue');
    }
    
    const main = document.querySelector('main');
    if (main) {
      console.log('Main element found');
    } else {
      console.error('Main element not found - possible rendering issue');
    }
    
    // Check route rendering
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      console.log('Hero section found - home page rendering');
    }
    
    console.log('App rendering complete, checking for errors...');
    if (document.querySelector('.error')) {
      console.error('Error elements found in the DOM');
    } else {
      console.log('No visible error elements in the DOM');
    }
  }, 1000);
};

// Create a function to monitor for styling issues
const monitorStyles = () => {
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
    observer.observe(document.body, { 
      attributes: true, 
      childList: true, 
      subtree: true,
      attributeFilter: ['class', 'style']
    });
    
    // Check if the application loaded correctly
    checkCSSLoading();
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
