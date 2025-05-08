
import React from 'react';

const PricingCard = ({ 
  product, 
  isLoading, 
  onCheckout,
  getButtonText
}) => {
  const { name, price, period, description, features, featured } = product;

  return (
    <div className={`pricing-card ${featured ? 'featured' : ''}`}>
      {featured && <div className="popular-badge">POPULAR</div>}
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
        onClick={() => onCheckout(product)} 
        className={`pricing-cta ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {getButtonText(product)}
      </button>
    </div>
  );
};

export default PricingCard;
