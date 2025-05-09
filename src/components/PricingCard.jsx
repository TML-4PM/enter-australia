
import React from 'react';
import { Link } from 'react-router-dom';

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

  // Create a URL-friendly slug from the product name
  const productSlug = name.toLowerCase().replace(/\s+/g, '-');
  
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
        {features.slice(0, 4).map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
        {features.length > 4 && (
          <li className="more-features">
            <Link to={`/pricing/${productSlug}`} className="view-more-link">+ {features.length - 4} more features</Link>
          </li>
        )}
      </ul>
      
      <div className="pricing-card-actions">
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
        
        <Link to={`/pricing/${productSlug}`} className="learn-more-link">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
