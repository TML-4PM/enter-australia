
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Award, ArrowRight, Check } from 'lucide-react';

const FooterCtaSection = ({ toggleLeadForm }) => {
  const { t } = useTranslation();

  return (
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
  );
};

export default FooterCtaSection;
