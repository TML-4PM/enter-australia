
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import LeadForm from '../LeadForm';

// Debug component
import DebugRoute from '../DebugRoute';

// Temporarily comment out complex components for debugging
import HomePage from '../HomePage';
// import BlogPage from '../BlogPage';
// import SolutionsPage from '../SolutionsPage';
// import PartnersPage from '../partners/PartnersPage';
// import RegionsPage from '../RegionsPage';
// import ResourcesPage from '../ResourcesPage';
// import FAQPage from '../FAQPage';
// import AboutPage from '../AboutPage';
// import OpportunitiesSection from '../OpportunitiesSection';
// import PricingSection from '../PricingSection';
// import PricingDetail from '../PricingDetail';
// import WebinarPage from '../WebinarPage';
// import ContactSection from '../ContactSection';
// import SuccessPage from '../SuccessPage';
// import LoginPage from '../LoginPage';
// import RegisterPage from '../RegisterPage';
// import ProfilePage from '../ProfilePage';
// import PreDeploymentCheck from '../PreDeploymentCheck';
// import DataApisPage from '../DataApisPage';
import NotFoundPage from '../NotFoundPage';

// Legal pages
// import PrivacyPolicyPage from '../legal/PrivacyPolicyPage';
// import TermsPage from '../legal/TermsPage';
// import CookiePolicyPage from '../legal/CookiePolicyPage';
// import SitemapPage from '../legal/SitemapPage';

// Solution detail pages
// import MarketEntrySolution from '../solutions/MarketEntrySolution';
// import GovTechSolution from '../solutions/GovTechSolution';
// import PartnershipsSolution from '../solutions/PartnershipsSolution';
// import ComplianceSolution from '../solutions/ComplianceSolution';
// import GrantsSolution from '../solutions/GrantsSolution';

const MainLayout = ({ showLeadForm, toggleLeadForm, handleFormSubmit }) => {
  console.log('🏗️ MainLayout rendering with props:', { showLeadForm });

  return (
    <main>
      <ErrorBoundary>
        <Routes>
          {/* Debug route - always available */}
          <Route path="/debug" element={<DebugRoute />} />
          
          {/* Emergency minimal routes */}
          <Route path="/" element={
            <HomePage 
              toggleLeadForm={toggleLeadForm} 
              showLeadForm={showLeadForm} 
              handleFormSubmit={handleFormSubmit} 
            />
          } />
          
          {/* Temporary simple routes for debugging */}
          <Route path="/test" element={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>Test Route Working! ✅</h1>
              <p>If you can see this, routing is functional.</p>
              <a href="/debug" style={{ color: '#00843D' }}>Go to Debug Page</a>
            </div>
          } />
          
          {/* Temporarily comment out complex routes */}
          {/*
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/data-apis" element={<DataApisPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/webinars" element={<WebinarPage />} />
          
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/market-entry" element={<MarketEntrySolution />} />
          <Route path="/solutions/govtech" element={<GovTechSolution />} />
          <Route path="/solutions/partnerships" element={<PartnershipsSolution />} />
          <Route path="/solutions/compliance" element={<ComplianceSolution />} />
          <Route path="/solutions/grants" element={<GrantsSolution />} />
          
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/regions" element={<RegionsPage />} />
          
          <Route path="/opportunities" element={<OpportunitiesSection />} />
          <Route path="/pricing" element={<PricingSection />} />
          <Route path="/pricing/:tierSlug" element={<PricingDetail />} />
          
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          
          <Route path="/pre-deployment-check" element={<PreDeploymentCheck />} />
          */}
          
          {/* 404 catch-all route - must be last */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <LeadForm 
          showLeadForm={showLeadForm} 
          toggleLeadForm={toggleLeadForm} 
          handleFormSubmit={handleFormSubmit} 
        />
      </ErrorBoundary>
    </main>
  );
};

export default MainLayout;
