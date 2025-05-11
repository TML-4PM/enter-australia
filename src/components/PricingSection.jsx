
import React from 'react';
import PricingHeader from './PricingHeader';
import SubscriptionStatusBanner from './SubscriptionStatusBanner';
import { PricingProvider, usePricingContext } from './pricing/PricingContext';
import PricingErrorBanner from './pricing/PricingErrorBanner';
import PricingMainContent from './pricing/PricingMainContent';
import PricingBottom from './pricing/PricingBottom';
import '../styles/pricing-section.css';

const PricingSection = () => {
  return (
    <section id="pricing" className="pricing-section">
      <PricingHeader />
      
      <PricingProvider>
        <PricingErrorBanner />
        
        <SubscriptionStatusBannerContainer />
        
        <PricingMainContent />
        
        <PricingBottom />
      </PricingProvider>
    </section>
  );
};

// Subscription Banner uses the context
const SubscriptionStatusBannerContainer = () => {
  const { subscriptionStatus, isLoadingPortal, openCustomerPortal } = usePricingContext();

  return (
    <SubscriptionStatusBanner 
      subscriptionStatus={subscriptionStatus}
      isLoadingPortal={isLoadingPortal}
      openCustomerPortal={openCustomerPortal}
    />
  );
};

export default PricingSection;
