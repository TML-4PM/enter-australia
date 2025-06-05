
import React from 'react';
import HeroSection from './home/HeroSection';
import WhyAustraliaSection from './home/WhyAustraliaSection';
import CaseStudySection from './home/CaseStudySection';
import RegionalTeasersSection from './RegionalTeasersSection';
import FooterCtaSection from './home/FooterCtaSection';

const HomePage = ({ toggleLeadForm }) => {
  return (
    <>
      <HeroSection toggleLeadForm={toggleLeadForm} />
      <WhyAustraliaSection />
      <CaseStudySection />
      <RegionalTeasersSection />
      <FooterCtaSection toggleLeadForm={toggleLeadForm} />
    </>
  );
};

export default HomePage;
