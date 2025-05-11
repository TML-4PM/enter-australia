
import React, { createContext, useContext } from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { usePricing } from '../../hooks/usePricing';
import { getButtonText } from '../../utils/pricingButtonUtils';

// Create context
const PricingContext = createContext(null);

// Custom hook to use the pricing context
export const usePricingContext = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricingContext must be used within a PricingProvider');
  }
  return context;
};

// Provider component
export const PricingProvider = ({ children }) => {
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

  // Context value
  const value = {
    isLoading,
    isLoadingPortal,
    errorMessage,
    subscriptionStatus,
    setErrorMessage,
    openCustomerPortal,
    handleBookCall,
    processAction,
    getButtonText: (product) => getButtonText(product, subscriptionStatus, isLoading)
  };

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
};
