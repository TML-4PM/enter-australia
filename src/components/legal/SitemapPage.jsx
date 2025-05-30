
import React from 'react';
import { Link } from 'react-router-dom';

const SitemapPage = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Sitemap</h1>
        <p>Find all the pages and resources available on Enter Australia</p>
        
        <div className="sitemap-content">
          <div className="sitemap-section">
            <h2>Main Pages</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          <div className="sitemap-section">
            <h2>Solutions</h2>
            <ul>
              <li><Link to="/solutions">All Solutions</Link></li>
              <li><Link to="/solutions/market-entry">Market Entry</Link></li>
              <li><Link to="/solutions/govtech">GovTech Procurement</Link></li>
              <li><Link to="/solutions/partnerships">Local Partnerships</Link></li>
              <li><Link to="/solutions/compliance">Compliance & Regulations</Link></li>
              <li><Link to="/solutions/grants">Grants & Incentives</Link></li>
            </ul>
          </div>

          <div className="sitemap-section">
            <h2>Resources</h2>
            <ul>
              <li><Link to="/resources">Resource Hub</Link></li>
              <li><Link to="/data-apis">Data APIs & Tools</Link></li>
              <li><Link to="/webinars">Webinars</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          <div className="sitemap-section">
            <h2>Business</h2>
            <ul>
              <li><Link to="/partners">Partners</Link></li>
              <li><Link to="/regions">Regions</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/opportunities">Current Opportunities</Link></li>
            </ul>
          </div>

          <div className="sitemap-section">
            <h2>Account</h2>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to="/success">Success</Link></li>
            </ul>
          </div>

          <div className="sitemap-section">
            <h2>Legal</h2>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
