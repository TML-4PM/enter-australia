
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown, Loader2 } from 'lucide-react';
import { useLanguageSwitch } from '../hooks/useLanguageSwitch';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentLanguage, switchLanguage, isLoading, loadingLanguage } = useLanguageSwitch();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
  ];

  const getCurrentLanguage = () => {
    const currentLang = languages.find(lang => lang.code === currentLanguage);
    return currentLang || languages[0];
  };

  const handleLanguageChange = async (langCode) => {
    await switchLanguage(langCode);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-dropdown-wrapper')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showDropdown]);

  const currentLang = getCurrentLanguage();

  return (
    <div className="language-dropdown-wrapper">
      <button
        onClick={toggleDropdown}
        className={`language-switcher ${isLoading ? 'loading' : ''}`}
        aria-label="Switch language"
        title="Change language"
        disabled={isLoading}
      >
        <Globe size={18} />
        <span className="language-text">
          {currentLang.flag} {currentLang.nativeName}
        </span>
        {isLoading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <ChevronDown size={14} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
        )}
      </button>
      
      {showDropdown && (
        <div className="language-dropdown animate-fade-in">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`language-option ${lang.code === currentLanguage ? 'active' : ''} ${loadingLanguage === lang.code ? 'loading' : ''}`}
              disabled={isLoading}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.nativeName}</span>
              {loadingLanguage === lang.code && (
                <Loader2 size={14} className="animate-spin" />
              )}
              {lang.code === currentLanguage && !isLoading && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
