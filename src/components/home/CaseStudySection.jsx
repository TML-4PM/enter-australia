
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

const CaseStudySection = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default CaseStudySection;
