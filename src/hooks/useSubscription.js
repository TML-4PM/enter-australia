
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { handleRateLimitError } from '../utils/rateLimitHandler';

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
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error checking subscription:', error);
        const rateLimitError = handleRateLimitError(error);
        if (rateLimitError.isRateLimited) {
          console.warn('Rate limited checking subscription:', rateLimitError.userMessage);
        }
        return;
      }
      
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
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        const rateLimitError = handleRateLimitError(error);
        if (rateLimitError.isRateLimited) {
          throw new Error(rateLimitError.userMessage);
        }
        throw new Error(error.message || 'Failed to open customer portal');
      }
      
      // Redirect to the customer portal
      window.location.href = data.url;
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
