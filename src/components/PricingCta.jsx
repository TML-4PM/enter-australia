
import React from 'react';
import '../styles/pricing-cta.css';

const PricingCta = ({ handleBookCall }) => {
  return (
    <div className="pricing-cta-section">
      <h3>Ready to unlock your Australian opportunity?</h3>
      <button onClick={handleBookCall} className="book-call-btn">Book a Call</button>
    </div>
  );
};

export default PricingCta;
