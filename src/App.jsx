
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { initializeAnalytics } from './utils/analyticsUtils';

// Layout components
import Header from './components/layout/Header';
import MainLayout from './components/layout/MainLayout';
import Footer from './components/layout/Footer';
import RouteTracker from './components/routing/RouteTracker';
import LiveChatBot from './components/LiveChatBot';

function App() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Initialize analytics on app mount
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Make toggleLeadForm available globally for components that need it
  useEffect(() => {
    window.toggleLeadForm = toggleLeadForm;
    
    return () => {
      delete window.toggleLeadForm;
    };
  }, [showLeadForm]);

  const toggleLeadForm = () => {
    setShowLeadForm(!showLeadForm);
    // When opening lead form, close mobile menu if it's open
    if (!showLeadForm && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // When opening mobile menu, close lead form if it's open
    if (!isMenuOpen && showLeadForm) {
      setShowLeadForm(false);
    }
  };

  const closeMenu = () => {
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
    e.preventDefault();
    setShowLeadForm(false);
    alert("Thanks! Your 2025 Bid Forecast has been sent to your email.");
  };

  return (
    <AuthProvider>
      <Router>
        {/* Route tracker to log page views */}
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
}

export default App;
