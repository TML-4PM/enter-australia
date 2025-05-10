
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import CSS before App
import App from './App';

// More comprehensive CSS debugging
console.log('Main JavaScript file loaded, CSS should be applied');

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
    
    // Check button styles
    const buttons = document.querySelectorAll('.btn');
    if (buttons.length > 0) {
      console.log('Found', buttons.length, 'buttons');
      const btnStyle = window.getComputedStyle(buttons[0]);
      console.log('Button background:', btnStyle.backgroundColor);
    } else {
      console.log('No buttons found yet');
    }
  }, 500);
};

// Run the check
checkCSSLoading();

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
