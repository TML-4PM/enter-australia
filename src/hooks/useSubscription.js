
import { useState, useEffect } from 'react';

export const useSubscription = () => {
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    loading: true,
    hasActiveSubscription: false,
    subscriptionData: null
  });

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

  return {
    isLoadingPortal,
    errorMessage,
    subscriptionStatus,
    setErrorMessage,
    openCustomerPortal
  };
};
