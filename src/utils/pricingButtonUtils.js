
/**
 * Utility function to determine the button text for pricing cards
 * based on the subscription status and product details
 */
export const getButtonText = (product, subscriptionStatus, isLoading) => {
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
