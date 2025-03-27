
/**
 * Initiates a checkout process with Stripe
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
    // Dynamically import Stripe to reduce initial load time
    const { stripePromise } = await import('../config/stripeConfig');
    
    // Load Stripe safely with error handling
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error("Stripe hasn't loaded yet. Please try again in a moment.");
    }
    
    // Call your backend to create a checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        productName: name,
        paymentType: isSubscription ? 'subscription' : 'one-time',
      }),
    });
    
    // Handle server errors with specific messages
    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 429) {
        throw new Error('Too many requests. Please try again in a few minutes.');
      } else if (response.status === 500) {
        throw new Error('Our payment system is temporarily unavailable. Please try again later.');
      } else {
        throw new Error(errorData.error || 'Something went wrong with the payment process.');
      }
    }
    
    // Parse the session data
    const session = await response.json();
    
    if (!session || !session.id) {
      throw new Error('Invalid checkout session received from server.');
    }
    
    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    
    if (result.error) {
      throw new Error(result.error.message);
    }
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
