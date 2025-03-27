
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogPage from './components/BlogPage';
import HomePage from './components/HomePage';
import PricingSection from './components/PricingSection';
import HowItWorksSection from './components/HowItWorksSection';
import OpportunitiesSection from './components/OpportunitiesSection';
import ContactSection from './components/ContactSection';

function App() {
  const [showLeadForm, setShowLeadForm] = useState(false);

  const toggleLeadForm = () => {
    setShowLeadForm(!showLeadForm);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    setShowLeadForm(false);
    alert("Thanks! Your 2025 Bid Forecast has been sent to your email.");
  };

  return (
    <Router>
      <div className="app">
        <header>
          <nav>
            <div className="logo">enterAustralia<span style={{ color: '#FF6B00' }}>tech</span></div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/opportunities">Opportunities</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
            <button className="menu-toggle" aria-label="Toggle menu">☰</button>
            <Link to="/pricing" className="nav-cta">Get Started – $5K</Link>
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
            <Route path="/how-it-works" element={<HowItWorksSection />} />
            <Route path="/opportunities" element={<OpportunitiesSection />} />
            <Route path="/pricing" element={<PricingSection />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactSection />} />
          </Routes>

          {showLeadForm && (
            <div className="lead-form-overlay">
              <div className="lead-form-container">
                <button className="close-btn" onClick={toggleLeadForm}>×</button>
                <h2>Download 2025 Bid Forecast</h2>
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
                  <button type="submit" className="submit-btn">Get Access Now</button>
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
                <li><Link to="/how-it-works">How It Works</Link></li>
                <li><Link to="/opportunities">Opportunities</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/blog">Blog</Link></li>
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
