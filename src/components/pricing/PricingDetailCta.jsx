
import React from 'react';
import { Link } from 'react-router-dom';
import { getButtonText } from '../../utils/pricingButtonUtils';

const PricingDetailCta = ({
  product,
  isLoading,
  subscriptionStatus,
  processAction,
  handleScheduleDemo,
  handleBookCall,
  isCurrentPlan
}) => {
  const handleCtaClick = () => {
    processAction(product);
  };
  
  return (
    <div className="pricing-detail-cta-section">
      <h2>Ready to Get Started?</h2>
      <div className="pricing-detail-cta-buttons">
        <button 
          onClick={handleCtaClick} 
          className={`pricing-detail-cta-large 
            ${isLoading[product.priceId] ? 'loading' : ''} 
            ${product.name === 'Assessment' ? 'free' : ''} 
            ${product.name === 'Enterprise' || product.name === 'Premium Retainer' ? 'enterprise' : ''}
            ${isCurrentPlan ? 'current-plan-btn' : ''}
          `}
          disabled={isLoading[product.priceId] || isCurrentPlan}
        >
          {getButtonText(product, subscriptionStatus, isLoading)}
        </button>
        
        <button 
          onClick={handleScheduleDemo}
          className="schedule-demo-cta"
        >
          Schedule a Demo
        </button>
      </div>
      <p className="pricing-detail-contact">
        Have questions? <Link to="/contact">Contact our team</Link> or <button onClick={handleBookCall} className="book-call-link">book a consultation call</button>.
      </p>
    </div>
  );
};

export default PricingDetailCta;
