
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
                <li>Deploy from Singapore & Hong Kong</li>
                <li>Leverage APAC trade agreements</li>
                <li>Timezone-aligned support teams</li>
              </ul>
            </div>
            
            <div className="region-feature">
              <h3>{t('regions.ourOffering')}</h3>
              <ul>
                <li>VC introductions</li>
                <li>R&D grant packaging</li>
                <li>Regional expansion planning</li>
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
                <li>Dubai–Melbourne direct investment flows</li>
                <li>Sovereign wealth connections</li>
                <li>Critical infrastructure partnerships</li>
              </ul>
            </div>
            
            <div className="region-feature">
              <h3>{t('regions.ourOffering')}</h3>
              <ul>
                <li>Cybersecurity frameworks</li>
                <li>Expo linkages</li>
                <li>Government innovation program access</li>
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
                <li>AUKUS technology partnerships</li>
                <li>Defense tech procurement fast-track</li>
                <li>US-Australia Free Trade Agreement benefits</li>
              </ul>
            </div>
            
            <div className="region-feature">
              <h3>{t('regions.ourOffering')}</h3>
              <ul>
                <li>AWS/Azure partnerships</li>
                <li>Government cloud pilots</li>
                <li>Security clearance pathways</li>
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
                <li>EU-Australia research collaborations</li>
                <li>Clean tech innovation corridors</li>
                <li>Compatible regulatory frameworks</li>
              </ul>
            </div>
            
            <div className="region-feature">
              <h3>{t('regions.ourOffering')}</h3>
              <ul>
                <li>GDPR & DPA localisation</li>
                <li>SME grants access</li>
                <li>University partnership development</li>
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
