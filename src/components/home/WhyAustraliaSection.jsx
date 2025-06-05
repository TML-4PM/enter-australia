
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart3, Globe, Zap } from 'lucide-react';

const WhyAustraliaSection = () => {
  const { t } = useTranslation();

  return (
    <section id="why-australia" className="modern-section">
      <div className="section-container">
        <div className="section-header">
          <h2>{t('whyAustralia.title')}</h2>
          <p className="text-lead">
            {t('whyAustralia.subtitle')}
          </p>
        </div>
        
        <div className="features-grid">
          <div className="modern-card feature-card">
            <div className="feature-icon">
              <BarChart3 size={24} />
            </div>
            <h3>{t('whyAustralia.economy.title')}</h3>
            <p>{t('whyAustralia.economy.description')}</p>
          </div>
          
          <div className="modern-card feature-card">
            <div className="feature-icon">
              <Globe size={24} />
            </div>
            <h3>{t('whyAustralia.gateway.title')}</h3>
            <p>{t('whyAustralia.gateway.description')}</p>
          </div>
          
          <div className="modern-card feature-card">
            <div className="feature-icon">
              <Zap size={24} />
            </div>
            <h3>{t('whyAustralia.innovation.title')}</h3>
            <p>{t('whyAustralia.innovation.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAustraliaSection;
