
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ toggleLeadForm }) => {
  return (
    <>
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Unlock Australia's <span className="highlight">$10B</span> Government Tech Market—<span className="highlight">$5K</span> Starts It</h1>
          <p>No Aussie office? No problem. We're your boots on the ground for 2025 bids.</p>
          <Link to="/pricing" className="cta">Get Started – $5K Entry Kit</Link>
          <button onClick={toggleLeadForm} className="secondary-cta">Download 2025 Bid Forecast</button>
        </div>
        <div className="social-proof">
          <p>Trusted by US tech firms eyeing AUKUS</p>
          <div className="logo-placeholder">
            <img 
              src="/lovable-uploads/640fedd1-d972-4339-8918-915a2df69bf6.png" 
              alt="Tech procurement process flowchart" 
              className="flowchart-image"
            />
          </div>
        </div>
      </section>

      <section id="value-props" className="value-props-section">
        <div className="value-grid">
          <div className="value-card">
            <h3>Person</h3>
            <p>Your pitch to Defence in 30 days.</p>
          </div>
          <div className="value-card">
            <h3>Place</h3>
            <p>Office + ABN, instant legitimacy.</p>
          </div>
          <div className="value-card">
            <h3>Kill</h3>
            <p>Win tenders—$20M RAAF, $200M AUKUS.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
