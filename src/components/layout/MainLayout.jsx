
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import LeadForm from '../LeadForm';
import HomePage from '../HomePage';
import BlogPage from '../BlogPage';
import SolutionsPage from '../SolutionsPage';
import PartnersPage from '../partners/PartnersPage';
import RegionsPage from '../RegionsPage';
import ResourcesPage from '../ResourcesPage';
import FAQPage from '../FAQPage';
import AboutPage from '../AboutPage';
import OpportunitiesSection from '../OpportunitiesSection';
import PricingSection from '../PricingSection';
import PricingDetail from '../PricingDetail';
import WebinarPage from '../WebinarPage';
import ContactSection from '../ContactSection';
import SuccessPage from '../SuccessPage';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import ProfilePage from '../ProfilePage';
import PreDeploymentCheck from '../PreDeploymentCheck';
import DataApisPage from '../DataApisPage';
import NotFoundPage from '../NotFoundPage';

// Legal pages
import PrivacyPolicyPage from '../legal/PrivacyPolicyPage';
import TermsPage from '../legal/TermsPage';
import CookiePolicyPage from '../legal/CookiePolicyPage';
import SitemapPage from '../legal/SitemapPage';

// Solution detail pages
import MarketEntrySolution from '../solutions/MarketEntrySolution';
import GovTechSolution from '../solutions/GovTechSolution';
import PartnershipsSolution from '../solutions/PartnershipsSolution';
import ComplianceSolution from '../solutions/ComplianceSolution';
import GrantsSolution from '../solutions/GrantsSolution';

const MainLayout = ({ showLeadForm, toggleLeadForm, handleFormSubmit }) => {
  return (
    <main>
      <ErrorBoundary>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={
            <HomePage 
              toggleLeadForm={toggleLeadForm} 
              showLeadForm={showLeadForm} 
              handleFormSubmit={handleFormSubmit} 
            />
          } />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/data-apis" element={<DataApisPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/webinars" element={<WebinarPage />} />
          
          {/* Solutions routes */}
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/market-entry" element={<MarketEntrySolution />} />
          <Route path="/solutions/govtech" element={<GovTechSolution />} />
          <Route path="/solutions/partnerships" element={<PartnershipsSolution />} />
          <Route path="/solutions/compliance" element={<ComplianceSolution />} />
          <Route path="/solutions/grants" element={<GrantsSolution />} />
          
          {/* Partners routes */}
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/regions" element={<RegionsPage />} />
          
          {/* Pricing routes */}
          <Route path="/opportunities" element={<OpportunitiesSection />} />
          <Route path="/pricing" element={<PricingSection />} />
          <Route path="/pricing/:tierSlug" element={<PricingDetail />} />
          
          {/* Authentication routes */}
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Legal routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          
          {/* Utility routes */}
          <Route path="/pre-deployment-check" element={<PreDeploymentCheck />} />
          
          {/* Debug route that will render even if other routes fail */}
          <Route path="/debug" element={
            <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
              <h1>Debug Page</h1>
              <p>If you can see this, routing is working correctly!</p>
              <p>Time now: {new Date().toLocaleString()}</p>
              <p>
                <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                  Go to homepage
                </a>
              </p>
            </div>
          } />
          
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
