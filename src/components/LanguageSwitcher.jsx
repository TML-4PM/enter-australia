
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
  ];

  const getCurrentLanguageIndex = () => {
    return languages.findIndex(lang => lang.code === i18n.language);
  };

  const getNextLanguage = () => {
    const currentIndex = getCurrentLanguageIndex();
    const nextIndex = (currentIndex + 1) % languages.length;
    return languages[nextIndex];
  };

  const toggleLanguage = () => {
    const nextLang = getNextLanguage();
    i18n.changeLanguage(nextLang.code);
    
    // Update document direction for RTL support
    document.documentElement.dir = nextLang.code === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLang.code;
  };

  const getCurrentLanguage = () => {
    const currentIndex = getCurrentLanguageIndex();
    return currentIndex >= 0 ? languages[currentIndex] : languages[0];
  };

  const nextLanguage = getNextLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="language-switcher"
      aria-label="Switch language"
      title={`Switch to ${nextLanguage.name}`}
    >
      <Globe size={18} />
      <span className="language-text">
        {getCurrentLanguage().nativeName}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
