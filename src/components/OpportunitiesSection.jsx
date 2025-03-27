import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/opportunities.css';

const OpportunitiesSection = () => {
  const [activeTab, setActiveTab] = useState("defence");
  
  const opportunities = {
    defence: [
      {
        title: "$200M AUKUS autonomy program",
        timing: "Q3 2025",
        description: "Joint US-UK-Australia autonomous systems development for underwater surveillance and maritime defense capabilities."
      },
      {
        title: "$30M ADF simulation platform",
        timing: "Q4 2025",
        description: "Advanced training simulation software for Australian Defence Force personnel with VR/AR integration requirements."
      }
    ],
    cyber: [
      {
        title: "$50M ASIO data analytics",
        timing: "Q2 2025",
        description: "Big data analytics and AI solution for national security intelligence processing and threat detection."
      },
      {
        title: "$25M ADF AI defensive systems",
        timing: "Q4 2025",
        description: "Machine learning systems for cyber threat detection and automated response for defense networks."
      }
    ],
    training: [
      {
        title: "$20M RAAF AR training system",
        timing: "Q3 2025",
        description: "Augmented reality training system for Royal Australian Air Force technical maintenance and operations."
      },
      {
        title: "$30M Space Command GIS integration",
        timing: "Q2 2025",
        description: "Geographic information systems with space domain awareness capabilities for Australian Space Command."
      }
    ]
  };

  return (
    <section id="opportunities" className="opportunities-section">
      <h2>Your Tech + Australia's 2025 Tenders = Millions</h2>
      <div className="opportunity-tabs">
        <button 
          className={`tab ${activeTab === 'defence' ? 'active' : ''}`}
          onClick={() => setActiveTab('defence')}
        >
          Defence
        </button>
        <button 
          className={`tab ${activeTab === 'cyber' ? 'active' : ''}`}
          onClick={() => setActiveTab('cyber')}
        >
          Cyber/AI
        </button>
        <button 
          className={`tab ${activeTab === 'training' ? 'active' : ''}`}
          onClick={() => setActiveTab('training')}
        >
          Training/Sim
        </button>
      </div>
      <div className="opportunity-content">
        <div className={`opportunity-tab-content ${activeTab === 'defence' ? 'active' : ''}`}>
          {opportunities.defence.map((opp, index) => (
            <div className="opportunity-card" key={index}>
              <h3>{opp.title}</h3>
              <p className="timing">{opp.timing}</p>
              <p className="description">{opp.description}</p>
            </div>
          ))}
        </div>
        
        <div className={`opportunity-tab-content ${activeTab === 'cyber' ? 'active' : ''}`}>
          {opportunities.cyber.map((opp, index) => (
            <div className="opportunity-card" key={index}>
              <h3>{opp.title}</h3>
              <p className="timing">{opp.timing}</p>
              <p className="description">{opp.description}</p>
            </div>
          ))}
        </div>
        
        <div className={`opportunity-tab-content ${activeTab === 'training' ? 'active' : ''}`}>
          {opportunities.training.map((opp, index) => (
            <div className="opportunity-card" key={index}>
              <h3>{opp.title}</h3>
              <p className="timing">{opp.timing}</p>
              <p className="description">{opp.description}</p>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => document.getElementById('lead-form').scrollIntoView()} className="secondary-cta">Get Full 2025 Forecast</button>
      <Link to="/pricing" className="cta">Claim Your Spot – $5K</Link>
    </section>
  );
};

export default OpportunitiesSection;
