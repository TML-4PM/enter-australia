
import React from 'react';
import '../styles/pricing-solutions.css';

const PricingSolutions = () => {
  return (
    <div className="pricing-solutions">
      <h3>Streamlined Success</h3>
      <div className="solutions-grid">
        <div className="solution-card">
          <img src="/lovable-uploads/166b7ecb-a311-4c2b-9dc9-e455b95db13c.png" alt="Entry kit" className="solution-image" />
          <h4>Entry Kit</h4>
          <p>Unlock your potential with our comprehensive $5K Entry Kit.</p>
          <a href="#pricing" className="learn-more">Learn more</a>
        </div>
        <div className="solution-card">
          <img src="/lovable-uploads/dd141c59-78d3-40da-974d-074867ce8906.png" alt="Ongoing support" className="solution-image" />
          <h4>Ongoing Support</h4>
          <p>Stay ahead with our tailored $15K/month ongoing support.</p>
          <a href="#pricing" className="learn-more">Learn more</a>
        </div>
      </div>
    </div>
  );
};

export default PricingSolutions;
