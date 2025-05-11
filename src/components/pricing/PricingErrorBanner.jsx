
import React from 'react';
import ErrorMessage from '../ErrorMessage';
import { usePricingContext } from './PricingContext';

const PricingErrorBanner = () => {
  const { errorMessage, setErrorMessage } = usePricingContext();
  
  return (
    <ErrorMessage 
      message={errorMessage} 
      onDismiss={() => setErrorMessage('')} 
    />
  );
};

export default PricingErrorBanner;
