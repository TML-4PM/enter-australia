import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BarChart3, Building, RefreshCcw, Globe, Flag, Award, MapPin, Map, Check, ArrowRight, Zap, Shield } from 'lucide-react';
import RegionalTeasersSection from './RegionalTeasersSection';

const HomePage = ({ toggleLeadForm }) => {
  const { t } = useTranslation();

  return (
    <>
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

      <section id="case-study" className="case-study-section modern">
        <div className="section-container">
          <div className="section-header">
            <h2>{t('caseStudy.title')}</h2>
            <p className="text-lead">{t('caseStudy.subtitle')}</p>
          </div>
          
          <div className="case-studies-grid modern">
            <div className="modern-card case-study-card featured">
              <div className="case-study-image">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=400&q=80" 
                  alt="Tech company office"
                />
              </div>
              <div className="case-study-content">
                <blockquote>
                  "{t('caseStudy.featured.quote')}"
                  <cite>— {t('caseStudy.featured.author')}</cite>
                </blockquote>
                <div className="case-study-metrics">
                  <div className="metric">
                    <strong>300%</strong>
                    <span>{t('caseStudy.featured.revenueGrowth')}</span>
                  </div>
                  <div className="metric">
                    <strong>4 {t('common.months')}</strong>
                    <span>{t('caseStudy.featured.timeToMarket')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modern-card case-study-card">
              <h3>{t('caseStudy.fintech.title')}</h3>
              <p>"{t('caseStudy.fintech.description')}"</p>
              <div className="case-study-tags">
                <span>{t('caseStudy.fintech.tags.financial')}</span>
                <span>{t('caseStudy.fintech.tags.seriesA')}</span>
              </div>
            </div>
            
            <div className="modern-card case-study-card">
              <h3>{t('caseStudy.govtech.title')}</h3>
              <p>"{t('caseStudy.govtech.description')}"</p>
              <div className="case-study-tags">
                <span>{t('caseStudy.govtech.tags.government')}</span>
                <span>{t('caseStudy.govtech.tags.b2g')}</span>
              </div>
            </div>
          </div>
          
          <div className="section-cta">
            <Link to="/partners" className="btn ghost">
              {t('caseStudy.readMore')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <RegionalTeasersSection />

      <section id="footer-cta" className="footer-cta-section modern">
        <div className="section-container">
          <div className="modern-card dark cta-content">
            <div className="cta-icon">
              <Award size={48} />
            </div>
            <h2>{t('footerCta.title')}</h2>
            <p>{t('footerCta.subtitle')}</p>
            <div className="urgency-indicator">
              <span>{t('footerCta.urgency')}</span>
            </div>
            <div className="cta-buttons">
              <button onClick={toggleLeadForm} className="btn accent large">
                {t('footerCta.buttons.getStrategy')}
                <ArrowRight size={20} />
              </button>
              <Link to="/contact" className="btn ghost">
                {t('footerCta.buttons.schedule')}
              </Link>
            </div>
            <div className="guarantee">
              <Check size={16} />
              <span>{t('footerCta.guarantee')}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
