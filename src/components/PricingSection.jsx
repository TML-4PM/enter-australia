
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../config/stripeConfig';
import { handleCheckout } from '../utils/stripeUtils';
import PricingCard from './PricingCard';
import ComparisonTable from './ComparisonTable';
import ErrorMessage from './ErrorMessage';
import '../styles/pricing.css';

const PricingSection = () => {
  const [isLoading, setIsLoading] = useState(
    Object.values(PRODUCTS).reduce((acc, product) => {
      acc[product.priceId] = false;
      return acc;
    }, {})
  );
  const [errorMessage, setErrorMessage] = useState('');

  // Helper function to render the button text based on loading state
  const getButtonText = (product) => {
    if (isLoading[product.priceId]) {
      return "Processing...";
    }
    
    if (product.isSubscription) {
      return "Subscribe Now";
    }
    
    return "Buy Now";
  };

  const handleBookCall = () => {
    window.open('https://calendly.com/tech4humanity/30min', '_blank');
  };

  // Process checkout wrapped in a handler for this component
  const processCheckout = (product) => {
    // Clear any previous errors when starting a new checkout
    setErrorMessage('');
    handleCheckout(product, setIsLoading, setErrorMessage);
  };

  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-header">
        <span className="pricing-tagline">EMPOWERING TECH FIRMS</span>
        <h2>Unlock Australian Government Contracts</h2>
        <p className="pricing-intro">
          enterAustralia.tech specializes in helping small global tech companies in defense, AI, cyber, and simulation 
          secure Australian government contracts without the need for a local presence. Based in Sydney, we provide a 
          streamlined approach that establishes your legitimacy with our $5K Entry Kit, followed by ongoing support 
          with our $15K/month retainer.
        </p>
      </div>
      
      <ErrorMessage 
        message={errorMessage} 
        onDismiss={() => setErrorMessage('')} 
      />
      
      <div className="pricing-grid">
        {Object.values(PRODUCTS).map(product => (
          <PricingCard
            key={product.priceId}
            product={product}
            isLoading={isLoading[product.priceId]}
            onCheckout={processCheckout}
            getButtonText={getButtonText}
          />
        ))}
      </div>
      
      <div className="pricing-solutions">
        <h3>Streamlined Success</h3>
        <div className="solutions-grid">
          <div className="solution-card">
            <img src="/lovable-uploads/166b7ecb-a311-4c2b-9dc9-e455b95db13c.png" alt="Entry kit" className="solution-image" />
            <h4>Entry Kit</h4>
            <p>Unlock your potential with our comprehensive $5K Entry Kit.</p>
            <a href="#pricing" className="learn-more">Learn more</a>
          </div>
          <div className="solution-card">
            <img src="/lovable-uploads/dd141c59-78d3-40da-974d-074867ce8906.png" alt="Ongoing support" className="solution-image" />
            <h4>Ongoing Support</h4>
            <p>Stay ahead with our tailored $15K/month ongoing support.</p>
            <a href="#pricing" className="learn-more">Learn more</a>
          </div>
        </div>
      </div>
      
      <ComparisonTable />
      
      <div className="pricing-cta-section">
        <h3>Ready to unlock your Australian opportunity?</h3>
        <button onClick={handleBookCall} className="book-call-btn">Book a Call</button>
      </div>
    </section>
  );
};

export default PricingSection;
