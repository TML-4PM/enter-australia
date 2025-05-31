
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/regions.css';

const RegionsPage = () => {
  const [activeRegion, setActiveRegion] = useState("asia");
  const { t } = useTranslation();
  
  return (
    <section id="regions" className="regions-page">
      <div className="regions-hero">
        <h1>{t('regions.title')}</h1>
        <p>{t('regions.subtitle')}</p>
      </div>
      
      <div className="regions-tabs">
        <button 
          className={`tab ${activeRegion === 'asia' ? 'active' : ''}`}
          onClick={() => setActiveRegion('asia')}
        >
          {t('regions.asia')}
        </button>
        <button 
          className={`tab ${activeRegion === 'middleeast' ? 'active' : ''}`}
          onClick={() => setActiveRegion('middleeast')}
        >
          {t('regions.middleEast')}
        </button>
        <button 
          className={`tab ${activeRegion === 'us' ? 'active' : ''}`}
          onClick={() => setActiveRegion('us')}
        >
          {t('regions.us')}
        </button>
        <button 
          className={`tab ${activeRegion === 'europe' ? 'active' : ''}`}
          onClick={() => setActiveRegion('europe')}
        >
          {t('regions.europe')}
        </button>
      </div>
      
      <div className="regions-content">
        <div className={`region-tab-content ${activeRegion === 'asia' ? 'active' : ''}`}>
          <h2>{t('regions.asiaPac')}</h2>
          
          <div className="region-details">
            <div className="region-feature">
              <h3>{t('regions.strategicAdvantages')}</h3>
              <ul>
                <li>{t('regions.asiaAdvantage1')}</li>
                <li>{t('regions.asiaAdvantage2')}</li>
                <li>{t('regions.asiaAdvantage3')}</li>
              </ul>
            </div>
            
            <div className="region-feature">
              <h3>{t('regions.ourOffering')}</h3>
              <ul>
                <li>{t('regions.asiaOffering1')}</li>
                <li>{t('regions.asiaOffering2')}</li>
                <li>{t('regions.asiaOffering3')}</li>
              </ul>
            </div>
          </div>
          
          <div className="region-cta">
            <Link to="/contact" className="btn primary">{t('regions.speakWithTeam')}</Link>
          </div>
        </div>
        
        <div className={`region-tab-content ${activeRegion === 'middleeast' ? 'active' : ''}`}>
          <h2>{t('regions.gulfGippsland')}</h2>
          
          <div className="region-details">
            <div className="region-feature">
              <h3>{t('regions.strategicAdvantages')}</h3>
              <ul>
                <li>{t('regions.meAdvantage1')}</li>
                <li>{t('regions.meAdvantage2')}</li>
                <li>{t('regions.meAdvantage3')}</li>
              </ul>
            </div>
            
            <div className="region-feature">
              <h3>{t('regions.ourOffering')}</h3>
              <ul>
                <li>{t('regions.meOffering1')}</li>
                <li>{t('regions.meOffering2')}</li>
                <li>{t('regions.meOffering3')}</li>
              </ul>
            </div>
          </div>
          
          <div className="region-cta">
            <Link to="/contact" className="btn primary">{t('regions.connectDubai')}</Link>
          </div>
        </div>
        
        <div className={`region-tab-content ${activeRegion === 'us' ? 'active' : ''}`}>
          <h2>{t('regions.siliconValley')}</h2>
          
          <div className="region-details">
            <div className="region-feature">
              <h3>{t('regions.strategicAdvantages')}</h3>
              <ul>
                <li>{t('regions.usAdvantage1')}</li>
                <li>{t('regions.usAdvantage2')}</li>
                <li>{t('regions.usAdvantage3')}</li>
              </ul>
            </div>
            
            <div className="region-feature">
              <h3>{t('regions.ourOffering')}</h3>
              <ul>
                <li>{t('regions.usOffering1')}</li>
                <li>{t('regions.usOffering2')}</li>
                <li>{t('regions.usOffering3')}</li>
              </ul>
            </div>
          </div>
          
          <div className="region-cta">
            <Link to="/contact" className="btn primary">{t('regions.talkToUS')}</Link>
          </div>
        </div>
        
        <div className={`region-tab-content ${activeRegion === 'europe' ? 'active' : ''}`}>
          <h2>{t('regions.euInnovators')}</h2>
          
          <div className="region-details">
            <div className="region-feature">
              <h3>{t('regions.strategicAdvantages')}</h3>
              <ul>
                <li>{t('regions.euAdvantage1')}</li>
                <li>{t('regions.euAdvantage2')}</li>
                <li>{t('regions.euAdvantage3')}</li>
              </ul>
            </div>
            
            <div className="region-feature">
              <h3>{t('regions.ourOffering')}</h3>
              <ul>
                <li>{t('regions.euOffering1')}</li>
                <li>{t('regions.euOffering2')}</li>
                <li>{t('regions.euOffering3')}</li>
              </ul>
            </div>
          </div>
          
          <div className="region-cta">
            <Link to="/contact" className="btn primary">{t('regions.chatEU')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionsPage;
