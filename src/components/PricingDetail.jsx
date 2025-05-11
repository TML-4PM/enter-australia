
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../config/stripeConfig';
import { useSubscription } from '../hooks/useSubscription';
import { usePricing } from '../hooks/usePricing';
import { trackPageView, trackCtaClick } from '../utils/analyticsUtils';
import ErrorMessage from './ErrorMessage';
import EmailDripSignup from './EmailDripSignup';
import LiveChatBot from './LiveChatBot';
import DemoScheduler from './DemoScheduler';
import PricingDetailHeader from './pricing/PricingDetailHeader';
import PricingDetailGrid from './pricing/PricingDetailGrid';
import PricingDetailCta from './pricing/PricingDetailCta';
import PricingNotFound from './pricing/PricingNotFound';
import '../styles/pricing-detail.css';

const PricingDetail = () => {
  const { tierSlug } = useParams();
  const [showDemoScheduler, setShowDemoScheduler] = useState(false);
  
  // Find the product that matches the slug
  const product = Object.values(PRODUCTS).find(
    p => p.name.toLowerCase().replace(/\s+/g, '-') === tierSlug
  );
  
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
  
  // Track page view on component mount
  useEffect(() => {
    if (product) {
      trackPageView(`/pricing/${tierSlug}`);
    }
  }, [tierSlug, product]);
  
  const handleScheduleDemo = () => {
    setShowDemoScheduler(true);
    if (product) {
      trackCtaClick('Schedule Demo', product.name);
    }
  };
  
  // If no matching product is found
  if (!product) {
    return <PricingNotFound />;
  }
  
  const isCurrentPlan = subscriptionStatus.hasActiveSubscription && 
    subscriptionStatus.subscriptionData?.priceId === product.priceId;

  return (
    <div className="pricing-detail-container">
      <PricingDetailHeader 
        product={product}
        isLoading={isLoading}
        subscriptionStatus={subscriptionStatus}
        processAction={processAction}
        handleScheduleDemo={handleScheduleDemo}
        setErrorMessage={setErrorMessage}
        isCurrentPlan={isCurrentPlan}
      />
      
      <ErrorMessage 
        message={errorMessage} 
        onDismiss={() => setErrorMessage('')} 
      />
      
      {showDemoScheduler && (
        <div className="demo-scheduler-overlay">
          <DemoScheduler 
            tierName={product.name}
            setErrorMessage={setErrorMessage}
            onClose={() => setShowDemoScheduler(false)}
          />
        </div>
      )}
      
      <PricingDetailGrid product={product} />
      
      {/* Email Drip Campaign Signup */}
      <EmailDripSignup tierName={product.name} setErrorMessage={setErrorMessage} />
      
      <PricingDetailCta
        product={product}
        isLoading={isLoading}
        subscriptionStatus={subscriptionStatus}
        processAction={processAction}
        handleScheduleDemo={handleScheduleDemo}
        handleBookCall={handleBookCall}
        isCurrentPlan={isCurrentPlan}
      />
      
      {/* Live Chat Bot */}
      <LiveChatBot />
    </div>
  );
};

export default PricingDetail;
