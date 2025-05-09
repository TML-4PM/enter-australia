
import React from 'react';
import { PRODUCTS } from '../config/stripeConfig';
import ErrorMessage from './ErrorMessage';
import PricingHeader from './PricingHeader';
import PricingGrid from './PricingGrid';
import ComparisonTable from './ComparisonTable';
import PricingFaq from './PricingFaq';
import PricingCta from './PricingCta';
import SubscriptionStatusBanner from './SubscriptionStatusBanner';
import { useSubscription } from '../hooks/useSubscription';
import { usePricing } from '../hooks/usePricing';
import '../styles/pricing-section.css';

const PricingSection = () => {
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

  // Helper function to render the button text based on loading state
  const getButtonText = (product) => {
    // If we have an active subscription with the same price ID
    if (
      subscriptionStatus.hasActiveSubscription && 
      subscriptionStatus.subscriptionData?.priceId === product.priceId
    ) {
      return "Current Plan";
    }
    
    if (product.name === 'Assessment') {
      return "Start Your Free Assessment";
    }
    
    if (product.name === 'Enterprise' || product.name === 'Premium Retainer') {
      return "Contact Sales";
    }
    
    if (isLoading[product.priceId]) {
      return "Processing...";
    }
    
    if (subscriptionStatus.hasActiveSubscription) {
      return product.isSubscription ? "Change Plan" : "Buy Now";
    }
    
    if (product.isSubscription) {
      return "Subscribe Now";
    }
    
    return "Buy Now";
  };

  return (
    <section id="pricing" className="pricing-section">
      <PricingHeader />
      
      <ErrorMessage 
        message={errorMessage} 
        onDismiss={() => setErrorMessage('')} 
      />
      
      <SubscriptionStatusBanner 
        subscriptionStatus={subscriptionStatus}
        isLoadingPortal={isLoadingPortal}
        openCustomerPortal={openCustomerPortal}
      />
      
      <PricingGrid
        products={PRODUCTS}
        isLoading={isLoading}
        processAction={processAction}
        getButtonText={getButtonText}
        subscriptionStatus={subscriptionStatus}
      />
      
      <ComparisonTable />
      
      <PricingFaq />
      
      <PricingCta handleBookCall={handleBookCall} />
    </section>
  );
};

export default PricingSection;
