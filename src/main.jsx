
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import CSS before App
import App from './App';

// Create a function to monitor for styling issues
const monitorStyles = () => {
  // Check if CSS is loaded properly
  setTimeout(() => {
    const body = document.body;
    const computedStyle = window.getComputedStyle(body);
    console.log('Body font-family:', computedStyle.fontFamily);
    console.log('Body color:', computedStyle.color);
    console.log('Body background:', computedStyle.backgroundColor);
    
    // Log CSS variables to ensure they're loaded
    console.log('--primary-color:', getComputedStyle(document.documentElement).getPropertyValue('--primary-color'));
    console.log('--secondary-color:', getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'));
    
    console.log('App rendering complete, checking for errors...');
    if (document.querySelector('.error')) {
      console.error('Error elements found in the DOM');
    } else {
      console.log('No visible error elements in the DOM');
    }
    
    // Additional logging to debug homepage-specific elements
    if (document.querySelector('.hero')) {
      console.log('Hero section found - home page rendering');
    }
    
    if (document.querySelector('header')) {
      console.log('Header element found');
    }
    
    if (document.querySelector('main')) {
      console.log('Main element found');
    }

    // Force a refresh of CSS classes if needed
    document.body.classList.add('css-loaded');
    setTimeout(() => {
      document.body.classList.remove('css-loaded');
    }, 100);
  }, 1000);
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
