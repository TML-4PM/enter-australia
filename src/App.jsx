
import React from 'react';
import AppProvider from './components/AppProvider';
import AppLayout from './components/AppLayout';
import { useAppState } from './hooks/useAppState';
import { useAppEffects } from './hooks/useAppEffects';
import './i18n';

function App() {
  const {
    showLeadForm,
    setShowLeadForm,
    isMenuOpen,
    toggleLeadForm,
    toggleMenu,
    closeMenu,
    handleFormSubmit
  } = useAppState();

  useAppEffects(toggleLeadForm, isMenuOpen, showLeadForm, closeMenu, setShowLeadForm);

  return (
    <AppProvider>
      <AppLayout
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        showLeadForm={showLeadForm}
        toggleLeadForm={toggleLeadForm}
        handleFormSubmit={handleFormSubmit}
      />
    </AppProvider>
  );
}

export default App;
