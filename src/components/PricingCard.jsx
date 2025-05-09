
import React from 'react';

const PricingCard = ({ 
  product, 
  isLoading, 
  onAction,
  getButtonText,
  isCurrentPlan = false
}) => {
  const { name, price, period, description, features, featured } = product;

  // Determine if this is a one-time payment or subscription
  const isOneTime = period && period.toLowerCase().includes('one-time');
  
  // Determine if this is the premium plan
  const isPremium = name === 'Premium Retainer';

  return (
    <div className={`pricing-card ${featured ? 'featured' : ''} ${isCurrentPlan ? 'current-plan' : ''} ${isPremium ? 'premium-plan' : ''}`}>
      {featured && <div className="popular-badge">RECOMMENDED</div>}
      {isCurrentPlan && <div className="current-plan-badge">YOUR PLAN</div>}
      
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
        className={`pricing-cta 
          ${isLoading ? 'loading' : ''} 
          ${name === 'Assessment' ? 'free' : ''} 
          ${name === 'Enterprise' || isPremium ? 'enterprise' : ''}
          ${isCurrentPlan ? 'current-plan-btn' : ''}
          ${isPremium ? 'premium-btn' : ''}
        `}
        disabled={isLoading}
      >
        {getButtonText(product)}
      </button>
    </div>
  );
};

export default PricingCard;
