
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, ArrowRight } from 'lucide-react';

const HeroSection = ({ toggleLeadForm }) => {
  const { t } = useTranslation();

  return (
    <section className="hero-split">
      <div className="hero-image-section">
        <img 
          src="https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?auto=format&fit=crop&w=1920&q=80" 
          alt="Sydney Harbour Bridge, Australia"
          className="hero-image"
        />
        <div className="hero-image-overlay"></div>
      </div>
      
      <div className="hero-content-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Shield size={16} />
            <span>{t('hero.badge')}</span>
          </div>
          
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          
          <div className="hero-buttons">
            <button onClick={toggleLeadForm} className="btn-primary">
              {t('hero.buttons.getStrategy')}
              <ArrowRight size={20} />
            </button>
            <Link to="/solutions" className="btn-secondary">
              {t('hero.buttons.exploreServices')}
            </Link>
          </div>
          
          <div className="hero-trust">
            <p>{t('hero.trustText')}</p>
            <div className="trust-badges">
              <span>{t('hero.trustLogos.siliconValley')}</span>
              <span>{t('hero.trustLogos.singapore')}</span>
              <span>{t('hero.trustLogos.dubai')}</span>
              <span>{t('hero.trustLogos.berlin')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
