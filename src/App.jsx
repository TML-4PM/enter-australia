
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
import { Menu, X } from 'lucide-react';

function App() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
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
            <Link to="/pricing" className="nav-cta desktop-only">Get Started</Link>
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
              <h3>enterAustralia<span style={{ color: '#FF6B00' }}>tech</span></h3>
              <p>Your trusted partner for Australian market entry and government contracts.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/solutions">Solutions</Link></li>
                <li><Link to="/regions">Regions</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/opportunities">Opportunities</Link></li>
                <li><Link to="/resources">Resources</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Email: info@enteraustralia.tech</p>
              <p>Phone: +61 2 1234 5678</p>
            </div>
          </div>
          <div className="copyright">
            <p>© 2025 Enter Australia. All rights reserved. | enteraustralia.tech</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
