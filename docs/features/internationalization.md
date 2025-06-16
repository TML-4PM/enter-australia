# Internationalization (i18n) Implementation

## Overview

Tech4Humanity Australia supports 5 languages with advanced features including smart detection, performance optimization, and comprehensive analytics tracking.

## Supported Languages

| Language | Code | Script | RTL Support |
|----------|------|--------|-------------|
| English  | en   | Latin  | No          |
| Korean   | ko   | Hangul | No          |
| Chinese  | zh   | Han    | No          |
| Arabic   | ar   | Arabic | Yes         |
| Hindi    | hi   | Devanagari | No      |

## Implementation Architecture

### Core Configuration (`src/i18n/index.js`)

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Direct import for immediate availability
import enTranslations from './locales/en.json';
import koTranslations from './locales/ko.json';
// ... other languages

const resources = {
  en: { translation: enTranslations },
  ko: { translation: koTranslations },
  zh: { translation: zhTranslations },
  ar: { translation: arTranslations },
  hi: { translation: hiTranslations }
};
```

### Language Detection Strategy

1. **localStorage**: Saved user preference
2. **navigator.language**: Browser language
3. **HTML lang attribute**: Document language
4. **Fallback**: English (en)

### Translation File Structure

```json
// src/i18n/locales/en.json
{
  "navigation": {
    "home": "Home",
    "tools": "Interactive Tools",
    "solutions": "Solutions",
    "about": "About"
  },
  "hero": {
    "title": "Expert Australia Market Entry",
    "subtitle": "Join 50+ international companies..."
  },
  "buttons": {
    "getStarted": "Get Started",
    "learnMore": "Learn More",
    "calculate": "Calculate ROI"
  },
  "tools": {
    "roiCalculator": {
      "title": "ROI Calculator",
      "description": "Calculate your potential return...",
      "fields": {
        "revenue": "Annual Revenue",
        "costs": "Entry Costs"
      }
    }
  }
}
```

## Advanced Features

### Smart Language Switching

```javascript
// src/hooks/useLanguageSwitch.js
export const useLanguageSwitch = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const switchLanguage = useCallback(async (newLanguage) => {
    if (newLanguage === i18n.language) return;

    setIsLoading(true);
    
    try {
      // Preload translations
      await translationCache.getTranslations(newLanguage);
      
      // Smooth transition
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Change language
      changeLanguage(i18n, newLanguage);
      
      // Analytics tracking
      trackLanguageSwitch(i18n.language, newLanguage);
    } finally {
      setIsLoading(false);
    }
  }, [i18n]);

  return { switchLanguage, isLoading };
};
```

### Performance Optimization

#### Translation Caching

```javascript
// src/utils/i18nCache.js
class TranslationCache {
  constructor() {
    this.cache = new Map();
    this.preloadQueue = new Set();
  }

  async getTranslations(language) {
    if (this.cache.has(language)) {
      return this.cache.get(language);
    }

    const translations = await this.loadTranslations(language);
    this.cache.set(language, translations);
    return translations;
  }

  async preloadLanguages(languages) {
    const promises = languages.map(lang => this.getTranslations(lang));
    await Promise.all(promises);
  }
}
```

#### Performance Monitoring

```javascript
// src/utils/i18nPerformance.js
export const timeI18nOperation = (operation, language) => {
  const startTime = performance.now();
  
  return {
    start: () => {
      console.time(`i18n_${operation}_${language}`);
    },
    end: () => {
      const duration = performance.now() - startTime;
      console.timeEnd(`i18n_${operation}_${language}`);
      
      // Track performance metrics
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: `i18n_${operation}`,
          value: Math.round(duration),
          custom_parameters: { language }
        });
      }
    }
  };
};
```

### RTL (Right-to-Left) Support

```css
/* src/styles/rtl.css */
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

[dir="rtl"] .flex {
  flex-direction: row-reverse;
}

[dir="rtl"] .ml-4 {
  margin-left: 0;
  margin-right: 1rem;
}
```

### Component Usage Patterns

#### Basic Translation

```javascript
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
};
```

#### Interpolation and Pluralization

```javascript
// Translation with variables
const WelcomeMessage = ({ userName, count }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <p>{t('welcome.message', { name: userName })}</p>
      <p>{t('opportunities.count', { count })}</p>
    </div>
  );
};

// JSON structure
{
  "welcome": {
    "message": "Welcome back, {{name}}!"
  },
  "opportunities": {
    "count_one": "{{count}} opportunity available",
    "count_other": "{{count}} opportunities available"
  }
}
```

#### Conditional Rendering

```javascript
const LanguageSpecificContent = () => {
  const { i18n } = useTranslation();
  
  return (
    <div>
      {i18n.language === 'ar' && (
        <div className="rtl-specific-layout">
          {/* Arabic-specific content */}
        </div>
      )}
      
      {['ko', 'zh'].includes(i18n.language) && (
        <AsianMarketContent />
      )}
    </div>
  );
};
```

## Language Switcher Component

```javascript
// src/components/LanguageSwitcher.jsx
const LanguageSwitcher = () => {
  const { switchLanguage, isLoading } = useLanguageSwitch();
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
  ];

  return (
    <div className="language-switcher">
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => switchLanguage(lang.code)}
          className={`language-option ${
            i18n.language === lang.code ? 'active' : ''
          }`}
          disabled={isLoading}
        >
          <span className="flag">{lang.flag}</span>
          <span className="name">{lang.name}</span>
        </button>
      ))}
    </div>
  );
};
```

## SEO Considerations

### Language-Specific URLs

```javascript
// Route structure for SEO
const routes = {
  en: '/tools/roi-calculator',
  ko: '/ko/tools/roi-calculator',
  zh: '/zh/tools/roi-calculator',
  ar: '/ar/tools/roi-calculator',
  hi: '/hi/tools/roi-calculator'
};
```

### Meta Tags and Schema

```javascript
const SEOWrapper = ({ children }) => {
  const { i18n, t } = useTranslation();
  
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = t('meta.description');
    }
  }, [i18n.language, t]);
  
  return children;
};
```

## Analytics and Tracking

### Language Usage Analytics

```javascript
// src/utils/languageDetection.js
export const trackLanguageUsage = (language, source) => {
  if (window.gtag) {
    window.gtag('event', 'language_interaction', {
      event_category: 'Internationalization',
      event_label: language,
      custom_parameters: {
        detection_source: source,
        browser_language: navigator.language,
        previous_language: localStorage.getItem('i18nextLng')
      }
    });
  }
};
```

### Content Engagement by Language

```javascript
export const trackLocalizedEngagement = (action, language, content) => {
  if (window.gtag) {
    window.gtag('event', 'localized_engagement', {
      event_category: 'Content',
      event_label: `${action}_${language}`,
      custom_parameters: {
        content_type: content,
        language_preference: language
      }
    });
  }
};
```

## Error Handling and Fallbacks

### Missing Translation Handling

```javascript
// src/utils/i18nErrorHandling.js
export const handleMissingTranslation = (key, language, fallbackValue) => {
  console.warn(`Missing translation: ${key} for language: ${language}`);
  
  // Track missing translations in development
  if (process.env.NODE_ENV === 'development') {
    const missingTranslations = JSON.parse(
      localStorage.getItem('missingTranslations') || '{}'
    );
    
    if (!missingTranslations[language]) {
      missingTranslations[language] = [];
    }
    
    if (!missingTranslations[language].includes(key)) {
      missingTranslations[language].push(key);
      localStorage.setItem('missingTranslations', JSON.stringify(missingTranslations));
    }
  }
  
  return fallbackValue || key;
};
```

### Graceful Degradation

```javascript
const SafeTranslation = ({ i18nKey, fallback, ...props }) => {
  const { t, ready } = useTranslation();
  
  if (!ready) {
    return <span {...props}>{fallback}</span>;
  }
  
  try {
    const translation = t(i18nKey);
    return <span {...props}>{translation}</span>;
  } catch (error) {
    console.error('Translation error:', error);
    return <span {...props}>{fallback}</span>;
  }
};
```

## Best Practices

### 1. Key Naming Convention
- Use nested structure: `section.component.element`
- Be descriptive: `tools.roiCalculator.fields.annualRevenue`
- Consistent casing: camelCase for nested objects

### 2. Content Management
- Keep translations synchronized across all languages
- Use professional translation services for accuracy
- Regular review and updates

### 3. Performance Optimization
- Preload frequently used languages
- Implement translation caching
- Monitor i18n performance metrics

### 4. User Experience
- Persist language selection
- Smooth transitions between languages
- Clear language indicators

### 5. Testing Strategy
- Test all languages in staging
- Validate RTL layouts
- Check character encoding
- Verify cultural appropriateness
