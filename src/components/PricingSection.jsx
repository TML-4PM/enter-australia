
import React, { useState } from 'react';
import { PRODUCTS } from '../config/stripeConfig';
import { handleCheckout } from '../utils/stripeUtils';
import PricingCard from './PricingCard';
import ComparisonTable from './ComparisonTable';
import ErrorMessage from './ErrorMessage';
import PricingHeader from './PricingHeader';
import PricingSolutions from './PricingSolutions';
import PricingCta from './PricingCta';
import PricingFaq from './PricingFaq';
import '../styles/pricing-section.css';

const PricingSection = () => {
  const [isLoading, setIsLoading] = useState(
    Object.values(PRODUCTS).reduce((acc, product) => {
      if (product.priceId) {
        acc[product.priceId] = false;
      }
      return acc;
    }, {})
  );
  const [errorMessage, setErrorMessage] = useState('');

  // Helper function to render the button text based on loading state
  const getButtonText = (product) => {
    if (product.name === 'Assessment') {
      return "Start Your Free Assessment";
    }
    
    if (product.name === 'Enterprise') {
      return "Contact Sales";
    }
    
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
  
  const handleFreeAssessment = () => {
    // Open the lead form or redirect to assessment page
    window.scrollTo({
      top: document.querySelector('.lead-form-overlay') ? 0 : 0,
      behavior: 'smooth'
    });
    // If there's a lead form toggler in the parent component
    if (window.toggleLeadForm) {
      window.toggleLeadForm();
    }
  };
  
  const handleContactSales = () => {
    window.location.href = '/contact';
  };

  // Process checkout wrapped in a handler for this component
  const processAction = (product) => {
    // Clear any previous errors when starting a new action
    setErrorMessage('');
    
    if (product.name === 'Assessment') {
      handleFreeAssessment();
      return;
    }
    
    if (product.name === 'Enterprise') {
      handleContactSales();
      return;
    }
    
    handleCheckout(product, setIsLoading, setErrorMessage);
  };

  return (
    <section id="pricing" className="pricing-section">
      <PricingHeader />
      
      <ErrorMessage 
        message={errorMessage} 
        onDismiss={() => setErrorMessage('')} 
      />
      
      <div className="pricing-grid">
        {Object.values(PRODUCTS).map(product => (
          <PricingCard
            key={product.name}
            product={product}
            isLoading={product.priceId ? isLoading[product.priceId] : false}
            onAction={processAction}
            getButtonText={getButtonText}
          />
        ))}
      </div>
      
      <ComparisonTable />
      
      <PricingFaq />
      
      <PricingCta handleBookCall={handleBookCall} />
    </section>
  );
};

export default PricingSection;
