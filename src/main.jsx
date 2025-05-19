
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import CSS before App
import App from './App';

// Create a function to ensure all styles are loaded
const ensureStylesLoaded = () => {
  console.log('Ensuring styles are loaded correctly...');
  
  // Check if all CSS variables are loaded
  const checkCssVariables = () => {
    const variables = [
      '--primary-color',
      '--secondary-color',
      '--dark-color',
      '--light-color'
    ];
    
    let allLoaded = true;
    variables.forEach(variable => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
      console.log(`CSS variable ${variable}:`, value);
      if (!value) {
        allLoaded = false;
        console.warn(`Missing CSS variable: ${variable}`);
      }
    });
    
    return allLoaded;
  };
  
  // Force refresh of styles if needed
  setTimeout(() => {
    if (!checkCssVariables()) {
      console.log('Forcing CSS reload...');
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        const url = link.href;
        link.href = url + (url.includes('?') ? '&' : '?') + 'refresh=' + new Date().getTime();
      });
      
      // Add CSS variables directly if still missing
      document.documentElement.style.setProperty('--primary-color', '#00843D');
      document.documentElement.style.setProperty('--secondary-color', '#FFCD00');
      document.documentElement.style.setProperty('--dark-color', '#1A1F2C');
      document.documentElement.style.setProperty('--light-color', '#ffffff');
    }
  }, 500);
};

// Start monitoring styles
ensureStylesLoaded();

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  
  // Check specifically for CSS-related errors
  if (event.filename && (event.filename.endsWith('.css') || event.message.includes('CSS'))) {
    console.error('CSS error detected:', event.message, 'in', event.filename);
  }
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
