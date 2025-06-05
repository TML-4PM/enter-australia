
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
  ];

  const getCurrentLanguage = () => {
    const currentLang = languages.find(lang => lang.code === i18n.language);
    return currentLang || languages[0]; // Default to English if not found
  };

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    
    // Update document direction for RTL support
    document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = langCode;
    
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const currentLanguage = getCurrentLanguage();

  return (
    <div className="language-dropdown-wrapper">
      <button
        onClick={toggleDropdown}
        className="language-switcher"
        aria-label="Switch language"
        title="Change language"
      >
        <Globe size={18} />
        <span className="language-text">
          {currentLanguage.nativeName}
        </span>
        <ChevronDown size={14} />
      </button>
      
      {showDropdown && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`language-option ${lang.code === i18n.language ? 'active' : ''}`}
            >
              <span>{lang.nativeName}</span>
              {lang.code === i18n.language && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
