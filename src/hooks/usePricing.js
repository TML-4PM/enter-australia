
import { useState } from 'react';
import { handleCheckout } from '../utils/stripeUtils';

export const usePricing = (setErrorMessage) => {
  const [isLoading, setIsLoading] = useState(
    Object.values(PRODUCTS).reduce((acc, product) => {
      if (product.priceId) {
        acc[product.priceId] = false;
      }
      return acc;
    }, {})
  );

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
    
    // Check if this is a free assessment
    if (product.name === 'Assessment') {
      handleFreeAssessment();
      return;
    }
    
    // Check if this is a contact sales product
    if (product.name === 'Enterprise' || product.name === 'Premium Retainer') {
      handleContactSales();
      return;
    }
    
    // Handle checkout for purchasable products
    handleCheckout(product, setIsLoading, setErrorMessage);
  };

  return {
    isLoading,
    handleBookCall,
    processAction
  };
};

// Make sure PRODUCTS is available in this module
import { PRODUCTS } from '../config/stripeConfig';
