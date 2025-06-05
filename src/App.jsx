
import React from 'react';
import AppProvider from './components/AppProvider';
import AppLayout from './components/AppLayout';
import LanguageSuggestionPrompt from './components/LanguageSuggestionPrompt';
import { useAppState } from './hooks/useAppState';
import { useAppEffects } from './hooks/useAppEffects';
import './i18n';
import './styles/language-enhanced.css';

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
      <LanguageSuggestionPrompt />
    </AppProvider>
  );
}

export default App;
