
import React from 'react';
import PricingCta from '../PricingCta';
import MarketingPosts from '../MarketingPosts';
import { usePricingContext } from './PricingContext';

const PricingBottom = () => {
  const { handleBookCall } = usePricingContext();
  
  return (
    <>
      <PricingCta handleBookCall={handleBookCall} />
      <MarketingPosts />
    </>
  );
};

export default PricingBottom;
