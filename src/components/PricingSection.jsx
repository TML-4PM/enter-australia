
import React from 'react';
import { PRODUCTS } from '../config/stripeConfig';
import ErrorMessage from './ErrorMessage';
import PricingHeader from './PricingHeader';
import PricingGrid from './PricingGrid';
import ComparisonTable from './ComparisonTable';
import PricingFaq from './PricingFaq';
import PricingCta from './PricingCta';
import MarketingPosts from './MarketingPosts';
import SubscriptionStatusBanner from './SubscriptionStatusBanner';
import { useSubscription } from '../hooks/useSubscription';
import { usePricing } from '../hooks/usePricing';
import { getButtonText } from '../utils/pricingButtonUtils';
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
        getButtonText={(product) => getButtonText(product, subscriptionStatus, isLoading)}
        subscriptionStatus={subscriptionStatus}
      />
      
      <ComparisonTable />
      
      <PricingFaq />
      
      <PricingCta handleBookCall={handleBookCall} />
      
      <MarketingPosts />
    </section>
  );
};

export default PricingSection;
