
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, X } from 'lucide-react';
import { getLanguageSuggestions } from '../utils/languageDetection';
import { useLanguageSwitch } from '../hooks/useLanguageSwitch';

const LanguageSuggestionPrompt = () => {
  const { t, i18n } = useTranslation();
  const { switchLanguage } = useLanguageSwitch();
  const [suggestion, setSuggestion] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed suggestions
    const dismissedSuggestions = JSON.parse(localStorage.getItem('dismissed_language_suggestions') || '[]');
    
    // Only show suggestion on first visit or if language has changed
    const isFirstVisit = !localStorage.getItem('i18nextLng');
    const suggestions = getLanguageSuggestions();
    
    if (suggestions.length > 0 && !dismissed && (isFirstVisit || Math.random() < 0.3)) {
      const topSuggestion = suggestions[0];
      
      // Don't suggest if already dismissed this language
      if (!dismissedSuggestions.includes(topSuggestion.code)) {
        setSuggestion(topSuggestion);
      }
    }
  }, [dismissed]);

  const handleAcceptSuggestion = async () => {
    if (suggestion) {
      await switchLanguage(suggestion.code);
      setSuggestion(null);
    }
  };

  const handleDismiss = () => {
    if (suggestion) {
      // Remember dismissal for this language
      const dismissed = JSON.parse(localStorage.getItem('dismissed_language_suggestions') || '[]');
      dismissed.push(suggestion.code);
      localStorage.setItem('dismissed_language_suggestions', JSON.stringify(dismissed));
    }
    
    setSuggestion(null);
    setDismissed(true);
  };

  if (!suggestion || suggestion.code === i18n.language) {
    return null;
  }

  const languageNames = {
    en: 'English',
    ko: '한국어',
    zh: '中文',
    hi: 'हिन्दी',
    ar: 'العربية'
  };

  const reasonText = {
    browser: 'Based on your browser settings',
    region: 'Based on your location',
    usage: 'Based on your usage patterns'
  };

  return (
    <div className="language-suggestion-prompt">
      <div className="suggestion-content">
        <Globe size={20} className="suggestion-icon" />
        <div className="suggestion-text">
          <p className="suggestion-title">
            Would you like to switch to {languageNames[suggestion.code]}?
          </p>
          <p className="suggestion-reason">
            {reasonText[suggestion.reason] || 'Recommended for you'}
          </p>
        </div>
        <div className="suggestion-actions">
          <button 
            onClick={handleAcceptSuggestion}
            className="btn-accept"
          >
            Switch
          </button>
          <button 
            onClick={handleDismiss}
            className="btn-dismiss"
            aria-label="Dismiss suggestion"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSuggestionPrompt;
