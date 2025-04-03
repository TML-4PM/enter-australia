
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
      <h2>Your Australian Edge, Priced to Win</h2>
      
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
      
      <ComparisonTable />
    </section>
  );
};

export default PricingSection;
