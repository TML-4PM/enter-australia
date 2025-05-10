
import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

// Solution detail pages
import MarketEntrySolution from '../solutions/MarketEntrySolution';
import GovTechSolution from '../solutions/GovTechSolution';
import PartnershipsSolution from '../solutions/PartnershipsSolution';
import ComplianceSolution from '../solutions/ComplianceSolution';
import GrantsSolution from '../solutions/GrantsSolution';

const MainLayout = ({ showLeadForm, toggleLeadForm, handleFormSubmit }) => {
  return (
    <main>
      <Routes>
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
        <Route path="/" element={
          <HomePage 
            toggleLeadForm={toggleLeadForm} 
            showLeadForm={showLeadForm} 
            handleFormSubmit={handleFormSubmit} 
          />
        } />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/market-entry" element={<MarketEntrySolution />} />
        <Route path="/solutions/govtech" element={<GovTechSolution />} />
        <Route path="/solutions/partnerships" element={<PartnershipsSolution />} />
        <Route path="/solutions/compliance" element={<ComplianceSolution />} />
        <Route path="/solutions/grants" element={<GrantsSolution />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/regions" element={<RegionsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/data-apis" element={<DataApisPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/opportunities" element={<OpportunitiesSection />} />
        <Route path="/pricing" element={<PricingSection />} />
        <Route path="/pricing/:tierSlug" element={<PricingDetail />} />
        <Route path="/webinars" element={<WebinarPage />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pre-deployment-check" element={<PreDeploymentCheck />} />
      </Routes>

      <LeadForm 
        showLeadForm={showLeadForm} 
        toggleLeadForm={toggleLeadForm} 
        handleFormSubmit={handleFormSubmit} 
      />
    </main>
  );
};

export default MainLayout;
