
import React from 'react';
import { Link } from 'react-router-dom';

const PricingNotFound = () => {
  return (
    <div className="pricing-detail-container">
      <h2>Pricing Tier Not Found</h2>
      <p>The requested pricing tier does not exist.</p>
      <Link to="/pricing" className="back-to-pricing">Back to Pricing</Link>
    </div>
  );
};

export default PricingNotFound;
