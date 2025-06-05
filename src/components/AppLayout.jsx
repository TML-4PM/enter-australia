
import React from 'react';
import Header from './layout/Header';
import MainLayout from './layout/MainLayout';
import Footer from './layout/Footer';

const AppLayout = ({ 
  isMenuOpen, 
  toggleMenu, 
  closeMenu, 
  showLeadForm, 
  toggleLeadForm, 
  handleFormSubmit 
}) => {
  return (
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
  );
};

export default AppLayout;
