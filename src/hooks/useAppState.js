import { useState } from 'react';

export const useAppState = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowLeadForm(false);
    alert("Thanks! Your 2025 Bid Forecast has been sent to your email.");
  };

  return {
    showLeadForm,
    setShowLeadForm,
    isMenuOpen,
    setIsMenuOpen,
    toggleLeadForm,
    toggleMenu,
    closeMenu,
    handleFormSubmit
  };
};
