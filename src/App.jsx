import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { saveEmailSubscription } from './utils/subscriptionUtils';
import { initializeAnalytics, trackPageView } from './utils/analyticsUtils';
import BlogPage from './components/BlogPage';
import HomePage from './components/HomePage';
import PricingSection from './components/PricingSection';
import PricingDetail from './components/PricingDetail';
import HowItWorksSection from './components/HowItWorksSection';
import OpportunitiesSection from './components/OpportunitiesSection';
import ContactSection from './components/ContactSection';
import SuccessPage from './components/SuccessPage';
import SolutionsPage from './components/SolutionsPage';
import RegionsPage from './components/RegionsPage';
import ResourcesPage from './components/ResourcesPage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import WebinarPage from './components/WebinarPage';
import LiveChatBot from './components/LiveChatBot';
import FAQPage from './components/FAQPage';

// Solution detail pages
import MarketEntrySolution from './components/solutions/MarketEntrySolution';
import GovTechSolution from './components/solutions/GovTechSolution';
import PartnershipsSolution from './components/solutions/PartnershipsSolution';
import ComplianceSolution from './components/solutions/ComplianceSolution';
import GrantsSolution from './components/solutions/GrantsSolution';

import { Menu, X, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

// Route tracker component
const RouteTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  
  return null;
};

function App() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [emailSubscription, setEmailSubscription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // Initialize analytics on app mount
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Make toggleLeadForm available globally for components that need it
  useEffect(() => {
    window.toggleLeadForm = toggleLeadForm;
    
    return () => {
      delete window.toggleLeadForm;
    };
  }, [showLeadForm]);

  const toggleLeadForm = () => {
    setShowLeadForm(!showLeadForm);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    const handleOutsideClick = (e) => {
      if (isMenuOpen && !e.target.closest('nav ul') && !e.target.closest('.menu-toggle')) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleOutsideClick);

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowLeadForm(false);
    alert("Thanks! Your 2025 Bid Forecast has been sent to your email.");
  };

  const handleFooterSubscribe = async (e) => {
    e.preventDefault();
    if (emailSubscription.trim() === '') return;
    
    setIsSubmitting(true);
    
    try {
      const result = await saveEmailSubscription(emailSubscription, 'footer');
      
      if (result.success) {
        setShowThankYou(true);
        setEmailSubscription('');
        setTimeout(() => setShowThankYou(false), 5000);
      } else {
        console.error('Error saving subscription:', result.error);
        alert('There was an issue with your subscription. Please try again.');
      }
    } catch (err) {
      console.error('Failed to submit subscription:', err);
      alert('Subscription failed. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthProvider>
      <Router>
        {/* Route tracker to log page views */}
        <RouteTracker />
        
        <div className="app">
          <header>
            <nav>
              <div className="logo">enterAustralia<span>tech</span></div>
              <ul className={isMenuOpen ? 'active' : ''}>
                <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/solutions" onClick={closeMenu}>Solutions</Link></li>
                <li><Link to="/regions" onClick={closeMenu}>Regions</Link></li>
                <li><Link to="/pricing" onClick={closeMenu}>Pricing</Link></li>
                <li><Link to="/opportunities" onClick={closeMenu}>Opportunities</Link></li>
                <li><Link to="/webinars" onClick={closeMenu}>Webinars</Link></li>
                <li><Link to="/resources" onClick={closeMenu}>Resources</Link></li>
                <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
                <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
                <li><Link to="/faq" onClick={closeMenu}>FAQ</Link></li>
                {isMenuOpen && (
                  <li className="visible-mobile">
                    <Link to="/pricing" className="nav-cta mobile" onClick={closeMenu}>
                      Get Started
                    </Link>
                  </li>
                )}
              </ul>
              <button 
                className="menu-toggle" 
                aria-label="Toggle menu"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="nav-actions desktop-only">
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/pricing" className="nav-cta">Get Started</Link>
              </div>
            </nav>
          </header>

          <main>
            <Routes>
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
              <Route path="/regions" element={<RegionsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
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
            </Routes>

            {showLeadForm && (
              <div className="lead-form-overlay">
                <div className="lead-form-container">
                  <button className="close-btn" onClick={toggleLeadForm}>×</button>
                  <h2>Get Your Free Market Assessment</h2>
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <input type="text" name="name" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                      <input type="email" name="email" placeholder="Your Email" required />
                    </div>
                    <div className="form-group">
                      <input type="text" name="company" placeholder="Company Name" required />
                    </div>
                    <button type="submit" className="submit-btn">Get My Free Assessment</button>
                  </form>
                </div>
              </div>
            )}
          </main>

          <footer>
            <div className="footer-content">
              <div className="footer-section">
                <h3>About Us</h3>
                <p>Your trusted partner for Australian market entry and government contract success. We help global tech businesses navigate regulations and unlock growth.</p>
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Facebook size={20} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Twitter size={20} />
                  </a>
                  <a href="https://linkedin.com/in/theinnovater" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Instagram size={20} />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
              
              <div className="footer-section">
                <h3>Solutions</h3>
                <ul>
                  <li><Link to="/solutions/market-entry">Market Entry</Link></li>
                  <li><Link to="/solutions/govtech">GovTech Procurement</Link></li>
                  <li><Link to="/solutions/partnerships">Local Partnerships</Link></li>
                  <li><Link to="/solutions/compliance">Compliance & Regulations</Link></li>
                  <li><Link to="/solutions/grants">Grants & Incentives</Link></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3>Resources</h3>
                <ul>
                  <li><Link to="/resources#guides">Guides & Reports</Link></li>
                  <li><a href="https://data.gov.au/search" target="_blank" rel="noopener noreferrer">Data APIs & Tools</a></li>
                  <li><Link to="/blog">Blog & Insights</Link></li>
                  <li><Link to="/resources#webinars">Webinars</Link></li>
                  <li><Link to="/faq">FAQs</Link></li>
                  <li><Link to="/contact">Request Custom Research</Link></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3>Stay Updated</h3>
                <p>Subscribe to our newsletter for the latest market insights, tender alerts and industry updates.</p>
                <div className="footer-subscribe">
                  <form className="footer-subscribe-form" onSubmit={handleFooterSubscribe}>
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      required
                      value={emailSubscription}
                      onChange={(e) => setEmailSubscription(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? '...' : 'Subscribe'}
                    </button>
                  </form>
                  {showThankYou && (
                    <p className="thank-you-message">
                      Thanks for subscribing! We'll keep you updated.
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <div className="copyright">
                <p>© 2025 Enter Australia. All rights reserved. | enteraustralia.tech</p>
              </div>
              
              <div className="footer-legal">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/cookies">Cookie Policy</Link>
                <Link to="/sitemap">Sitemap</Link>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
