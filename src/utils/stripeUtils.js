
import { supabase } from './supabaseClient';

/**
 * Initiates a checkout process with Stripe via Supabase Edge Functions
 * @param {Object} product - Product details including priceId, name, and isSubscription
 * @param {Function} setIsLoading - State setter for loading state
 * @param {Function} setErrorMessage - State setter for error messages
 * @returns {Promise<void>}
 */
export const handleCheckout = async (product, setIsLoading, setErrorMessage) => {
  const { priceId, name, isSubscription } = product;
  
  // Clear any previous errors
  setErrorMessage('');
  
  // Set loading state for the specific button
  setIsLoading(prev => ({ ...prev, [priceId]: true }));
  
  try {
    console.log('Starting checkout process', { product: name, priceId, isSubscription });
    
    // Dynamically import Stripe to reduce initial load time
    const { stripePromise } = await import('../config/stripeConfig');
    
    // Load Stripe safely with error handling
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error("Stripe hasn't loaded yet. Please try again in a moment.");
    }
    
    console.log(`Creating checkout session for: ${name} (${isSubscription ? 'subscription' : 'one-time payment'})`);
    
    // Use Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        priceId,
        productName: name,
        paymentType: isSubscription ? 'subscription' : 'one-time',
        // Original user email is tracked in metadata but actual recipient is Troy
        recipientEmail: 'troy@enteraustralia.tech'
      }
    });
    
    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(error.message || 'Failed to create checkout session');
    }
    
    console.log('Checkout session created:', data);
    
    if (!data || !data.url) {
      throw new Error('Invalid checkout session received from server.');
    }
    
    // Redirect to Stripe Checkout
    console.log('Redirecting to Stripe Checkout URL:', data.url);
    window.location.href = data.url;
    
  } catch (error) {
    console.error("Error initiating checkout:", error);
    
    // Show user-friendly error message
    setErrorMessage(
      error.message || 
      'There was an error processing your payment. Please try again or contact support.'
    );
    
    // Scroll to the error message to ensure it's visible
    setTimeout(() => {
      const errorElement = document.querySelector('.error-message');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  } finally {
    // Reset loading state for the specific button
    setIsLoading(prev => ({ ...prev, [priceId]: false }));
  }
};
