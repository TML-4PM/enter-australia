
import React from 'react';
import PricingCard from './PricingCard';

const PricingGrid = ({ 
  products, 
  isLoading, 
  processAction, 
  getButtonText, 
  subscriptionStatus 
}) => {
  return (
    <div className="pricing-grid">
      {Object.values(products).map(product => (
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
  );
};

export default PricingGrid;
