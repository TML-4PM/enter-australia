
import React from 'react';

const PricingCard = ({ 
  product, 
  isLoading, 
  onAction,
  getButtonText
}) => {
  const { name, price, period, description, features, featured } = product;

  // Determine if this is a one-time payment or subscription
  const isOneTime = period && period.toLowerCase().includes('one-time');

  return (
    <div className={`pricing-card ${featured ? 'featured' : ''}`}>
      {featured && <div className="popular-badge">RECOMMENDED</div>}
      <div className="price-header">
        <h3>{name}</h3>
        <div className="price">{price}</div>
        <p className="price-period">{period}</p>
      </div>
      <p className="price-description">{description}</p>
      <ul className="features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button 
        onClick={() => onAction(product)} 
        className={`pricing-cta ${isLoading ? 'loading' : ''} ${name === 'Assessment' ? 'free' : ''} ${name === 'Enterprise' ? 'enterprise' : ''}`}
        disabled={isLoading}
      >
        {getButtonText(product)}
      </button>
    </div>
  );
};

export default PricingCard;
