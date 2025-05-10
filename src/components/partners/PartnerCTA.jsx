
import React from 'react';
import { Link } from 'react-router-dom';

const PartnerCTA = () => {
  return (
    <div className="partners-cta">
      <h2>Become a Partner</h2>
      <p>Join our network of innovative companies shaping the future of technology in Australia</p>
      <div className="cta-buttons">
        <Link to="/contact" className="btn primary">Apply to Partner With Us</Link>
        <Link to="/solutions" className="btn secondary">Explore Other Solutions</Link>
      </div>
    </div>
  );
};

export default PartnerCTA;
