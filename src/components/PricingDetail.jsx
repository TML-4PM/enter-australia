
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../config/stripeConfig';
import { useSubscription } from '../hooks/useSubscription';
import { usePricing } from '../hooks/usePricing';
import { getButtonText } from '../utils/pricingButtonUtils';
import { trackPageView, trackCtaClick } from '../utils/analyticsUtils';
import ErrorMessage from './ErrorMessage';
import PdfDownloadButton from './PdfDownloadButton';
import EmailDripSignup from './EmailDripSignup';
import LiveChatBot from './LiveChatBot';
import '../styles/pricing-detail.css';

const PricingDetail = () => {
  const { tierSlug } = useParams();
  
  // Find the product that matches the slug
  const product = Object.values(PRODUCTS).find(
    p => p.name.toLowerCase().replace(/\s+/g, '-') === tierSlug
  );
  
  // Get subscription-related state and functions
  const {
    isLoadingPortal,
    errorMessage,
    subscriptionStatus,
    setErrorMessage,
    openCustomerPortal
  } = useSubscription();

  // Get pricing-related state and functions
  const {
    isLoading,
    handleBookCall,
    processAction
  } = usePricing(setErrorMessage);
  
  // Track page view on component mount
  useEffect(() => {
    if (product) {
      trackPageView(`/pricing/${tierSlug}`);
    }
  }, [tierSlug, product]);
  
  // Track CTA clicks
  const handleCtaClick = () => {
    if (product) {
      trackCtaClick(getButtonText(product, subscriptionStatus, isLoading), product.name);
      processAction(product);
    }
  };
  
  // If no matching product is found
  if (!product) {
    return (
      <div className="pricing-detail-container">
        <h2>Pricing Tier Not Found</h2>
        <p>The requested pricing tier does not exist.</p>
        <Link to="/pricing" className="back-to-pricing">Back to Pricing</Link>
      </div>
    );
  }

  // Format the deliverables and who-it's-for from product features
  const deliverables = product.features || [];
  const whoItsFor = product.targetAudience || [];
  
  const isCurrentPlan = subscriptionStatus.hasActiveSubscription && 
    subscriptionStatus.subscriptionData?.priceId === product.priceId;

  return (
    <div className="pricing-detail-container">
      <div className="pricing-detail-header">
        <Link to="/pricing" className="back-to-pricing">← Back to All Plans</Link>
        <h1>{product.name} Plan</h1>
        <p className="pricing-detail-tagline">{product.tagline || product.description}</p>
        
        <div className="pricing-detail-price-container">
          <span className="pricing-detail-price">{product.price}</span>
          {product.period && <span className="pricing-detail-period">{product.period}</span>}
        </div>
        
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
        
        {/* PDF Download button */}
        <div className="pdf-btn-container">
          <PdfDownloadButton tierName={product.name} setErrorMessage={setErrorMessage} />
        </div>
      </div>
      
      <ErrorMessage 
        message={errorMessage} 
        onDismiss={() => setErrorMessage('')} 
      />
      
      <div className="pricing-detail-grid">
        <div className="pricing-detail-section">
          <h2>Who It's For</h2>
          <ul className="detail-list">
            {whoItsFor.map((item, index) => (
              <li key={`who-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="pricing-detail-section">
          <h2>What You Get</h2>
          <ul className="detail-list">
            {deliverables.map((item, index) => (
              <li key={`what-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="pricing-detail-section">
          <h2>How We Do It</h2>
          <div className="process-timeline">
            {product.process && product.process.map((step, index) => (
              <div key={`process-${index}`} className="process-step">
                <div className="step-timeline">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-line"></div>
                </div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pricing-detail-section">
          <h2>Support & SLA</h2>
          <p>{product.support || "Email support with standard response times."}</p>
        </div>
        
        <div className="pricing-detail-section">
          <h2>Expected Outcomes</h2>
          <p>{product.outcomes || "Results vary based on your market and specific situation."}</p>
        </div>
        
        <div className="pricing-detail-section">
          <h2>Case Study</h2>
          <div className="case-study-box">
            <p className="case-study-quote">{product.caseStudy || "Customer success stories coming soon."}</p>
          </div>
        </div>
      </div>
      
      {/* Email Drip Campaign Signup */}
      <EmailDripSignup tierName={product.name} setErrorMessage={setErrorMessage} />
      
      <div className="pricing-detail-cta-section">
        <h2>Ready to Get Started?</h2>
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
        <p className="pricing-detail-contact">
          Have questions? <Link to="/contact">Contact our team</Link> or <button onClick={handleBookCall} className="book-call-link">book a consultation call</button>.
        </p>
      </div>
      
      {/* Live Chat Bot */}
      <LiveChatBot />
    </div>
  );
};

export default PricingDetail;
