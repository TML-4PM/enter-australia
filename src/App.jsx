
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import BlogPage from './components/BlogPage';
import HomePage from './components/HomePage';
import PricingSection from './components/PricingSection';
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
import { Menu, X, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

function App() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [emailSubscription, setEmailSubscription] = useState('');

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

  const handleFooterSubscribe = (e) => {
    e.preventDefault();
    if (emailSubscription.trim() !== '') {
      alert(`Thank you for subscribing with: ${emailSubscription}`);
      setEmailSubscription('');
    }
  };

  return (
    <AuthProvider>
      <Router>
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
                <li><Link to="/resources" onClick={closeMenu}>Resources</Link></li>
                <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
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
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/regions" element={<RegionsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/opportunities" element={<OpportunitiesSection />} />
              <Route path="/pricing" element={<PricingSection />} />
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
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
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
                  <li><Link to="/solutions#market-entry">Market Entry</Link></li>
                  <li><Link to="/solutions#gov-tech">GovTech Procurement</Link></li>
                  <li><Link to="/solutions#local-partnerships">Local Partnerships</Link></li>
                  <li><Link to="/solutions#compliance">Compliance & Regulations</Link></li>
                  <li><Link to="/solutions#grants">Grants & Incentives</Link></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3>Resources</h3>
                <ul>
                  <li><Link to="/resources#guides">Guides & Reports</Link></li>
                  <li><Link to="/resources#apis">Data APIs & Tools</Link></li>
                  <li><Link to="/resources#blog">Blog & Insights</Link></li>
                  <li><Link to="/resources#webinars">Webinars</Link></li>
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
                    />
                    <button type="submit">Subscribe</button>
                  </form>
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
