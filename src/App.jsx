
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { initializeAnalytics } from './utils/analyticsUtils';
import './i18n';

// Layout components
import Header from './components/layout/Header';
import MainLayout from './components/layout/MainLayout';
import Footer from './components/layout/Footer';
import RouteTracker from './components/routing/RouteTracker';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Initialize app
  useEffect(() => {
    console.log('🚀 App initializing...');
    
    try {
      initializeAnalytics();
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
    }
    
    // Set language direction
    try {
      const savedLanguage = localStorage.getItem('i18nextLng') || 'en';
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLanguage;
    } catch (error) {
      console.warn('Language setup failed:', error);
    }
  }, []);

  // Make toggleLeadForm available globally
  useEffect(() => {
    window.toggleLeadForm = toggleLeadForm;
    return () => {
      delete window.toggleLeadForm;
    };
  }, [showLeadForm]);

  const toggleLeadForm = () => {
    setShowLeadForm(!showLeadForm);
    if (!showLeadForm && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen && showLeadForm) {
      setShowLeadForm(false);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle escape key and outside clicks
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        if (isMenuOpen) closeMenu();
        if (showLeadForm) setShowLeadForm(false);
      }
    };

    const handleOutsideClick = (e) => {
      if (isMenuOpen && !e.target.closest('nav ul') && !e.target.closest('.menu-toggle')) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleOutsideClick);

    // Prevent body scrolling when mobile menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, showLeadForm]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowLeadForm(false);
    alert("Thanks! Your 2025 Bid Forecast has been sent to your email.");
  };

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
