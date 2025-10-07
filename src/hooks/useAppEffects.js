import { useEffect } from 'react';
import { initializeAnalytics } from '../utils/analyticsUtils';

export const useAppEffects = (toggleLeadForm, isMenuOpen, showLeadForm, closeMenu, setShowLeadForm) => {
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
  }, [showLeadForm, toggleLeadForm]);

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
  }, [isMenuOpen, showLeadForm, closeMenu, setShowLeadForm]);
};
