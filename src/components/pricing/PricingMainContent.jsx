
import React from 'react';
import { PRODUCTS } from '../../config/stripeConfig';
import PricingGrid from '../PricingGrid';
import ComparisonTable from '../ComparisonTable';
import PricingFaq from '../PricingFaq';
import { usePricingContext } from './PricingContext';

const PricingMainContent = () => {
  const {
    isLoading,
    processAction,
    subscriptionStatus,
    getButtonText
  } = usePricingContext();

  return (
    <>
      <PricingGrid
        products={PRODUCTS}
        isLoading={isLoading}
        processAction={processAction}
        getButtonText={getButtonText}
        subscriptionStatus={subscriptionStatus}
      />
      
      <ComparisonTable />
      
      <PricingFaq />
    </>
  );
};

export default PricingMainContent;
