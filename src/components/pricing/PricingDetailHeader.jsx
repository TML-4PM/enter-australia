
import React from 'react';
import { Link } from 'react-router-dom';
import PdfDownloadButton from '../PdfDownloadButton';
import { getButtonText } from '../../utils/pricingButtonUtils';
import { trackCtaClick } from '../../utils/analyticsUtils';

const PricingDetailHeader = ({
  product,
  isLoading,
  subscriptionStatus,
  processAction,
  handleScheduleDemo,
  setErrorMessage,
  isCurrentPlan
}) => {
  // Track CTA clicks
  const handleCtaClick = () => {
    if (product) {
      trackCtaClick(getButtonText(product, subscriptionStatus, isLoading), product.name);
      processAction(product);
    }
  };
  
  return (
    <div className="pricing-detail-header">
      <Link to="/pricing" className="back-to-pricing">← Back to All Plans</Link>
      <h1>{product.name} Plan</h1>
      <p className="pricing-detail-tagline">{product.tagline || product.description}</p>
      
      <div className="pricing-detail-price-container">
        <span className="pricing-detail-price">{product.price}</span>
        {product.period && <span className="pricing-detail-period">{product.period}</span>}
      </div>
      
      <div className="pricing-detail-button-group">
        <button 
          onClick={handleCtaClick} 
          className={`pricing-detail-cta 
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
          className="schedule-demo-btn"
        >
          Schedule Demo
        </button>
      </div>
      
      {/* PDF Download button */}
      <div className="pdf-btn-container">
        <PdfDownloadButton tierName={product.name} setErrorMessage={setErrorMessage} />
      </div>
    </div>
  );
};

export default PricingDetailHeader;
