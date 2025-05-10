
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/partners/partner-hero.css';

const PartnerHero = () => {
  return (
    <div className="partners-hero">
      <h1>Strategic Partnerships for Australian Market Success</h1>
      <p>Leverage our network of local partners to accelerate your business growth and market entry</p>
      <div className="hero-cta-buttons">
        <Link to="/contact" className="btn primary">Find Your Partner</Link>
        <Link to="/solutions/partnerships" className="btn secondary">Learn More</Link>
      </div>
    </div>
  );
};

export default PartnerHero;
