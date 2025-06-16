
import React, { useState } from 'react';
import HeroSection from './home/HeroSection';
import WhyAustraliaSection from './home/WhyAustraliaSection';
import CaseStudySection from './home/CaseStudySection';
import RegionalTeasersSection from './RegionalTeasersSection';
import FooterCtaSection from './home/FooterCtaSection';
import ExitIntentPopup from './ExitIntentPopup';
import SchemaMarkup from './seo/SchemaMarkup';

const HomePage = ({ toggleLeadForm }) => {
  const [showExitIntent, setShowExitIntent] = useState(false);

  return (
    <>
      <SchemaMarkup 
        type="WebSite" 
        data={{
          breadcrumbs: [
            { name: "Home", url: "https://tech4humanity.com.au/" }
          ]
        }}
      />
      <SchemaMarkup type="Organization" />
      <SchemaMarkup type="LocalBusiness" />
      
      <HeroSection toggleLeadForm={toggleLeadForm} />
      <WhyAustraliaSection />
      <CaseStudySection />
      <RegionalTeasersSection />
      <FooterCtaSection toggleLeadForm={toggleLeadForm} />
      
      <ExitIntentPopup 
        onClose={() => setShowExitIntent(false)}
      />
    </>
  );
};

export default HomePage;
