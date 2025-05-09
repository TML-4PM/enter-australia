
import React, { useState, useEffect } from 'react';
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
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    loading: true,
    hasActiveSubscription: false,
    subscriptionData: null
  });
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);

  // Check subscription status on component mount
  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  // Helper function to check subscription status
  const checkSubscriptionStatus = async () => {
    try {
      const response = await fetch('/api/check-subscription');
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error checking subscription:', errorData);
        return;
      }
      
      const data = await response.json();
      setSubscriptionStatus({
        loading: false,
        hasActiveSubscription: data.hasActiveSubscription,
        subscriptionData: data.subscriptionData
      });
    } catch (error) {
      console.error('Error checking subscription status:', error);
      setSubscriptionStatus(prev => ({ ...prev, loading: false }));
    }
  };

  // Open the customer portal for subscription management
  const openCustomerPortal = async () => {
    setIsLoadingPortal(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to open customer portal');
      }
      
      const { url } = await response.json();
      
      // Redirect to the customer portal
      window.location.href = url;
    } catch (error) {
      console.error('Error opening customer portal:', error);
      setErrorMessage(
        error.message || 
        'Failed to open subscription management. Please try again later.'
      );
    } finally {
      setIsLoadingPortal(false);
    }
  };

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
    
    // Check if this is the current subscription
    if (
      subscriptionStatus.hasActiveSubscription && 
      subscriptionStatus.subscriptionData?.priceId === product.priceId
    ) {
      // Open customer portal to manage current subscription
      openCustomerPortal();
      return;
    }
    
    if (product.name === 'Assessment') {
      handleFreeAssessment();
      return;
    }
    
    if (product.name === 'Enterprise' || product.name === 'Premium Retainer') {
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
      
      {subscriptionStatus.hasActiveSubscription && (
        <div className="subscription-status-banner">
          <p>
            You have an active {subscriptionStatus.subscriptionData?.planName} subscription.{' '}
            {subscriptionStatus.subscriptionData?.cancelAtPeriodEnd 
              ? `Your subscription will end on ${new Date(subscriptionStatus.subscriptionData.currentPeriodEnd).toLocaleDateString()}.` 
              : `Your next billing date is ${new Date(subscriptionStatus.subscriptionData.currentPeriodEnd).toLocaleDateString()}.`
            }
          </p>
          <button 
            onClick={openCustomerPortal} 
            className="manage-subscription-btn"
            disabled={isLoadingPortal}
          >
            {isLoadingPortal ? 'Loading...' : 'Manage Subscription'}
          </button>
        </div>
      )}
      
      <div className="pricing-grid">
        {Object.values(PRODUCTS).map(product => (
          <PricingCard
            key={product.name}
            product={product}
            isLoading={product.priceId ? isLoading[product.priceId] : false}
            onAction={processAction}
            getButtonText={getButtonText}
            isCurrentPlan={
              subscriptionStatus.hasActiveSubscription && 
              subscriptionStatus.subscriptionData?.priceId === product.priceId
            }
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
