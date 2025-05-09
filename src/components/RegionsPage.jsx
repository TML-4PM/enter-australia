
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/regions.css';

const RegionsPage = () => {
  const [activeRegion, setActiveRegion] = useState("asia");
  
  return (
    <section id="regions" className="regions-page">
      <div className="regions-hero">
        <h1>Local Insights, Global Scale</h1>
        <p>Tailored market entry strategies by region of origin</p>
      </div>
      
      <div className="regions-tabs">
        <button 
          className={`tab ${activeRegion === 'asia' ? 'active' : ''}`}
          onClick={() => setActiveRegion('asia')}
        >
          Asia
        </button>
        <button 
          className={`tab ${activeRegion === 'middleeast' ? 'active' : ''}`}
          onClick={() => setActiveRegion('middleeast')}
        >
          Middle East
        </button>
        <button 
          className={`tab ${activeRegion === 'us' ? 'active' : ''}`}
          onClick={() => setActiveRegion('us')}
        >
          U.S.
        </button>
        <button 
          className={`tab ${activeRegion === 'europe' ? 'active' : ''}`}
          onClick={() => setActiveRegion('europe')}
        >
          Europe
        </button>
      </div>
      
      <div className="regions-content">
        <div className={`region-tab-content ${activeRegion === 'asia' ? 'active' : ''}`}>
          <h2>Asia-Pac Innovators</h2>
          
          <div className="region-details">
            <div className="region-feature">
              <h3>Strategic Advantages</h3>
              <ul>
                <li>Deploy from Singapore & Hong Kong</li>
                <li>Leverage APAC trade agreements</li>
                <li>Timezone-aligned support teams</li>
              </ul>
            </div>
            
            <div className="region-feature">
              <h3>Our Offering</h3>
              <ul>
                <li>VC introductions</li>
                <li>R&D grant packaging</li>
                <li>Regional expansion planning</li>
              </ul>
            </div>
          </div>
          
          <div className="region-cta">
            <Link to="/contact" className="btn primary">Speak with APAC Team</Link>
          </div>
        </div>
        
        <div className={`region-tab-content ${activeRegion === 'middleeast' ? 'active' : ''}`}>
          <h2>Gulf-to-Gippsland Corridor</h2>
          
          <div className="region-details">
            <div className="region-feature">
              <h3>Strategic Advantages</h3>
              <ul>
                <li>Dubai–Melbourne direct investment flows</li>
                <li>Sovereign wealth connections</li>
                <li>Critical infrastructure partnerships</li>
              </ul>
            </div>
            
            <div className="region-feature">
              <h3>Our Offering</h3>
              <ul>
                <li>Cybersecurity frameworks</li>
                <li>Expo linkages</li>
                <li>Government innovation program access</li>
              </ul>
            </div>
          </div>
          
          <div className="region-cta">
            <Link to="/contact" className="btn primary">Connect with our Dubai Office</Link>
          </div>
        </div>
        
        <div className={`region-tab-content ${activeRegion === 'us' ? 'active' : ''}`}>
          <h2>Silicon Valley to Sydney</h2>
          
          <div className="region-details">
            <div className="region-feature">
              <h3>Strategic Advantages</h3>
              <ul>
                <li>AUKUS technology partnerships</li>
                <li>Defense tech procurement fast-track</li>
                <li>US-Australia Free Trade Agreement benefits</li>
              </ul>
            </div>
            
            <div className="region-feature">
              <h3>Our Offering</h3>
              <ul>
                <li>AWS/Azure partnerships</li>
                <li>Government cloud pilots</li>
                <li>Security clearance pathways</li>
              </ul>
            </div>
          </div>
          
          <div className="region-cta">
            <Link to="/contact" className="btn primary">Talk to our U.S. Team</Link>
          </div>
        </div>
        
        <div className={`region-tab-content ${activeRegion === 'europe' ? 'active' : ''}`}>
          <h2>EU Innovators</h2>
          
          <div className="region-details">
            <div className="region-feature">
              <h3>Strategic Advantages</h3>
              <ul>
                <li>EU-Australia research collaborations</li>
                <li>Clean tech innovation corridors</li>
                <li>Compatible regulatory frameworks</li>
              </ul>
            </div>
            
            <div className="region-feature">
              <h3>Our Offering</h3>
              <ul>
                <li>GDPR & DPA localisation</li>
                <li>SME grants access</li>
                <li>University partnership development</li>
              </ul>
            </div>
          </div>
          
          <div className="region-cta">
            <Link to="/contact" className="btn primary">Chat with our EU Desk</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionsPage;
