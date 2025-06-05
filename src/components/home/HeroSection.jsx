
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, ArrowRight, Check } from 'lucide-react';

const HeroSection = ({ toggleLeadForm }) => {
  const { t } = useTranslation();

  return (
    <section id="home" className="hero modern">
      <div className="hero-background modern">
        <img 
          src="https://images.unsplash.com/photo-1524293368444-8376ac6cabdc?auto=format&fit=crop&w=1920&q=80" 
          alt="Sydney Opera House, Australia"
          className="hero-bg-image modern"
          onLoad={() => console.log('Hero image loaded successfully')}
          onError={() => console.log('Hero image failed to load')}
        />
      </div>
      <div className="hero-content modern">
        <div className="hero-badge modern">
          <Shield size={16} />
          <span>{t('hero.badge')}</span>
        </div>
        <h1>{t('hero.title')}</h1>
        <p className="hero-subtitle">
          {t('hero.subtitle')}
        </p>
        
        <div className="hero-stats modern">
          <div className="stat modern">
            <strong>95%</strong>
            <span>{t('hero.stats.successRate')}</span>
          </div>
          <div className="stat modern">
            <strong>6 {t('common.months')}</strong>
            <span>{t('hero.stats.marketEntry')}</span>
          </div>
          <div className="stat modern">
            <strong>$2.4M</strong>
            <span>{t('hero.stats.revenue')}</span>
          </div>
        </div>
        
        <div className="hero-buttons modern">
          <button onClick={toggleLeadForm} className="btn primary large pulse">
            {t('hero.buttons.getStrategy')}
            <ArrowRight size={20} />
          </button>
          <Link to="/solutions" className="btn secondary large">
            {t('hero.buttons.exploreServices')}
          </Link>
        </div>
        
        <div className="hero-trust-indicators modern">
          <p>{t('hero.trustText')}</p>
          <div className="trust-logos modern">
            <span>{t('hero.trustLogos.siliconValley')}</span>
            <span>{t('hero.trustLogos.singapore')}</span>
            <span>{t('hero.trustLogos.dubai')}</span>
            <span>{t('hero.trustLogos.berlin')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
