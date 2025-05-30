
import { useState } from 'react';
import { handleCheckout } from '../utils/stripeUtils';
import { PRODUCTS } from '../config/stripeConfig';

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
    // Scroll to lead form section if it exists
    const leadFormElement = document.querySelector('.lead-form-overlay');
    if (leadFormElement) {
      window.scrollTo({
        top: leadFormElement.offsetTop,
        behavior: 'smooth'
      });
    } else {
      // Scroll to top if lead form not found
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    // Try to toggle lead form if the function exists in parent component
    if (typeof window.toggleLeadForm === 'function') {
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
