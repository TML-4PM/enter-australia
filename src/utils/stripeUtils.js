
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
    
    console.log(`Creating checkout session for: ${name} (${isSubscription ? 'subscription' : 'one-time payment'})`);
    
    // Call our serverless function to create a checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        productName: name,
        paymentType: isSubscription ? 'subscription' : 'one-time',
        // Original user email is tracked in metadata but actual recipient is Troy
        recipientEmail: 'troy@tech4humanity.com.au'
      }),
    });
    
    // First check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      if (contentType && contentType.includes('text/html')) {
        const htmlResponse = await response.text();
        console.error('API returned HTML instead of JSON:', htmlResponse);
        
        // Check if this is a Stripe API key error
        if (htmlResponse.includes("Invalid API key provided") || 
            htmlResponse.includes("API key") || 
            htmlResponse.includes("authentication")) {
          throw new Error('Invalid Stripe API key. Please check your configuration.');
        } else {
          throw new Error('API endpoint returned HTML instead of JSON. The server may be misconfigured or unavailable.');
        }
      } else {
        throw new Error(`Invalid response format: ${contentType}. Expected JSON.`);
      }
    }
    
    // Handle server errors with specific messages
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error response:', errorData);
      if (response.status === 429) {
        throw new Error('Too many requests. Please try again in a few minutes.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key or insufficient permissions. Please check your Stripe configuration.');
      } else if (response.status === 500) {
        throw new Error('Our payment system is temporarily unavailable. Please try again later.');
      } else {
        throw new Error(errorData.error || 'Something went wrong with the payment process.');
      }
    }
    
    // Parse the session data
    const session = await response.json();
    console.log("Session received:", session);
    
    if (!session || !session.id) {
      throw new Error('Invalid checkout session received from server.');
    }
    
    // Redirect to Stripe Checkout
    if (session.url) {
      // Direct redirect to Checkout URL if available (preferred method)
      window.location.href = session.url;
    } else {
      // Fallback to redirectToCheckout method
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (result.error) {
        throw new Error(result.error.message);
      }
    }
  } catch (error) {
    console.error("Error initiating checkout:", error);
    
    // Check if error is related to API connection issues
    if (error.message && error.message.includes('<!DOCTYPE')) {
      setErrorMessage('API connection error. The service might be unavailable or misconfigured.');
    } else if (error.message && error.message.includes('HTML instead of JSON')) {
      setErrorMessage('Payment service is not properly configured. Please contact support.');
    } else if (error.message && error.message.includes('API key')) {
      setErrorMessage('Invalid Stripe API key configuration. Please check your configuration.');
    } else {
      // Show user-friendly error message
      setErrorMessage(
        error.message || 
        'There was an error processing your payment. Please try again or contact support.'
      );
    }
    
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
