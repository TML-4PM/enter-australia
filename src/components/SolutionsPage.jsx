
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/solutions.css';

const SolutionsPage = () => {
  const { t } = useTranslation();
  
  // Solution cards data
  const solutions = [
    {
      id: 'market-entry',
      title: t('solutions.marketEntry.title'),
      description: t('solutions.marketEntry.description'),
      icon: '🚀',
      link: '/solutions/market-entry'
    },
    {
      id: 'govtech',
      title: t('solutions.govtech.title'),
      description: t('solutions.govtech.description'),
      icon: '🏛️',
      link: '/solutions/govtech'
    },
    {
      id: 'partnerships',
      title: t('solutions.partnerships.title'),
      description: t('solutions.partnerships.description'),
      icon: '🤝',
      link: '/solutions/partnerships'
    },
    {
      id: 'compliance',
      title: t('solutions.compliance.title'),
      description: t('solutions.compliance.description'),
      icon: '📋',
      link: '/solutions/compliance'
    },
    {
      id: 'grants',
      title: t('solutions.grants.title'),
      description: t('solutions.grants.description'),
      icon: '💰',
      link: '/solutions/grants'
    }
  ];
  
  return (
    <section id="solutions" className="solutions-page">
      <div className="solutions-hero">
        <h1>{t('solutions.title')}</h1>
        <p>{t('solutions.subtitle')}</p>
      </div>
      
      <div className="solutions-cards">
        {solutions.map((solution) => (
          <div key={solution.id} className="solution-card">
            <div className="solution-icon">{solution.icon}</div>
            <h3>{solution.title}</h3>
            <p>{solution.description}</p>
            <Link to={solution.link} className="solution-link">
              {t('solutions.learnMore')} <span className="arrow-icon">→</span>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="solutions-cta">
        <h2>{t('solutions.notSure.title')}</h2>
        <p>{t('solutions.notSure.subtitle')}</p>
        <Link to="/contact" className="btn primary">{t('solutions.notSure.button')}</Link>
      </div>
    </section>
  );
};

export default SolutionsPage;
