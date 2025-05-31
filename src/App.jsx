
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { initializeAnalytics } from './utils/analyticsUtils';
import './i18n'; // Initialize i18n

// Layout components
import Header from './components/layout/Header';
import MainLayout from './components/layout/MainLayout';
import Footer from './components/layout/Footer';
import RouteTracker from './components/routing/RouteTracker';

function App() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState({});
  
  // Debug logging
  useEffect(() => {
    console.log('🚀 App component mounting...');
    console.log('Environment:', {
      hostname: window.location.hostname,
      pathname: window.location.pathname,
      userAgent: navigator.userAgent
    });
    
    try {
      initializeAnalytics();
      console.log('✅ Analytics initialized successfully');
    } catch (error) {
      console.error('❌ Analytics initialization failed:', error);
    }
    
    // Set initial document direction and language
    try {
      const savedLanguage = localStorage.getItem('i18nextLng') || 'en';
      console.log('🌐 Setting language to:', savedLanguage);
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLanguage;
      console.log('✅ Language and direction set successfully');
    } catch (error) {
      console.error('❌ Language setup failed:', error);
    }
    
    setDebugInfo({
      mounted: true,
      timestamp: new Date().toISOString(),
      language: localStorage.getItem('i18nextLng') || 'en'
    });
  }, []);

  // Make toggleLeadForm available globally for components that need it
  useEffect(() => {
    window.toggleLeadForm = toggleLeadForm;
    
    return () => {
      delete window.toggleLeadForm;
    };
  }, [showLeadForm]);

  const toggleLeadForm = () => {
    console.log('🔄 Toggling lead form from:', showLeadForm, 'to:', !showLeadForm);
    setShowLeadForm(!showLeadForm);
    // When opening lead form, close mobile menu if it's open
    if (!showLeadForm && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    console.log('🔄 Toggling menu from:', isMenuOpen, 'to:', !isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
    // When opening mobile menu, close lead form if it's open
    if (!isMenuOpen && showLeadForm) {
      setShowLeadForm(false);
    }
  };

  const closeMenu = () => {
    console.log('🔄 Closing menu');
    setIsMenuOpen(false);
  };

  // Handle menu keyboard and click events
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        if (isMenuOpen) {
          closeMenu();
        }
        if (showLeadForm) {
          setShowLeadForm(false);
        }
      }
    };

    const handleOutsideClick = (e) => {
      // Close mobile menu when clicking outside
      if (isMenuOpen && !e.target.closest('nav ul') && !e.target.closest('.menu-toggle')) {
        closeMenu();
      }
      
      // Close user dropdown when clicking outside
      if (!e.target.closest('.user-menu-wrapper') && !e.target.closest('.user-dropdown')) {
        const userMenus = document.querySelectorAll('.user-dropdown');
        if (userMenus.length > 0) {
          // There might be a user menu open that needs to be closed
          // We don't directly manipulate state here to avoid unnecessary rerenders
          // This is handled by the Navigation component itself
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleOutsideClick);

    // Prevent body scrolling when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'auto'; // Reset on unmount
    };
  }, [isMenuOpen, showLeadForm]);

  const handleFormSubmit = (e) => {
    console.log('📝 Form submitted');
    e.preventDefault();
    setShowLeadForm(false);
    alert("Thanks! Your 2025 Bid Forecast has been sent to your email.");
  };

  // Error boundary fallback
  const renderWithErrorBoundary = () => {
    try {
      return (
        <AuthProvider>
          <Router>
            <RouteTracker />
            
            <div className="app">
              <Header 
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                closeMenu={closeMenu}
              />

              <MainLayout 
                showLeadForm={showLeadForm}
                toggleLeadForm={toggleLeadForm}
                handleFormSubmit={handleFormSubmit}
              />

              <Footer />
            </div>
          </Router>
        </AuthProvider>
      );
    } catch (error) {
      console.error('💥 App render error:', error);
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          maxWidth: '600px',
          margin: '2rem auto'
        }}>
          <h1 style={{ color: '#e53e3e' }}>Application Error</h1>
          <p>The application encountered an error. Please check the console for details.</p>
          <pre style={{ 
            background: '#f7fafc', 
            padding: '1rem', 
            borderRadius: '4px',
            textAlign: 'left',
            overflow: 'auto'
          }}>
            {error.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              background: '#00843D',
              color: 'white',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
  };

  console.log('🎨 App rendering with debug info:', debugInfo);
  
  return renderWithErrorBoundary();
}

export default App;
