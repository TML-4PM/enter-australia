
import React from 'react';
import '../styles/pricing-cta.css';

const PricingCta = ({ handleBookCall }) => {
  return (
    <div className="pricing-cta-section">
      <h3>Ready to unlock your Australian opportunity?</h3>
      <p>Not sure which plan is right for you? Our team is here to help you find the perfect fit for your business.</p>
      <button onClick={handleBookCall} className="book-call-btn">Book a Discovery Call</button>
    </div>
  );
};

export default PricingCta;
