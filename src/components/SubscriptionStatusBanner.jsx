
import React from 'react';

const SubscriptionStatusBanner = ({ 
  subscriptionStatus, 
  isLoadingPortal, 
  openCustomerPortal 
}) => {
  if (!subscriptionStatus.hasActiveSubscription) {
    return null;
  }

  return (
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
  );
};

export default SubscriptionStatusBanner;
