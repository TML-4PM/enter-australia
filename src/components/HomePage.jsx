
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Building, RefreshCcw, Globe, Flag, Award, MapPin, Map, Check } from 'lucide-react';
import RegionalTeasersSection from './RegionalTeasersSection';

const HomePage = ({ toggleLeadForm }) => {
  return (
    <>
      <section id="home" className="hero">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80" 
            alt="Sydney Harbour Bridge"
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <Flag size={16} />
            <span>Trusted by 200+ International Companies</span>
          </div>
          <h1>Market Entry Specialists for Australia</h1>
          <h2>Strategic guidance for businesses expanding into the Australian market</h2>
          <p>We navigate regulatory complexities, establish local partnerships, and create tailored market entry strategies that accelerate your growth in Australia.</p>
          
          <div className="hero-stats">
            <div className="stat">
              <strong>95%</strong>
              <span>Success Rate</span>
            </div>
            <div className="stat">
              <strong>6 Months</strong>
              <span>Avg. Market Entry</span>
            </div>
            <div className="stat">
              <strong>$2.4M</strong>
              <span>Avg. First Year Revenue</span>
            </div>
          </div>
          
          <div className="hero-buttons">
            <button onClick={toggleLeadForm} className="btn primary large pulse">
              Get Your 2025 Strategy
            </button>
            <Link to="/solutions" className="btn secondary large">
              Explore Services
            </Link>
          </div>
          
          <div className="hero-trust-indicators">
            <p>Trusted by companies from:</p>
            <div className="trust-logos">
              <span>🇺🇸 Silicon Valley</span>
              <span>🇸🇬 Singapore</span>
              <span>🇦🇪 Dubai</span>
              <span>🇩🇪 Berlin</span>
            </div>
          </div>
        </div>
      </section>

      <section id="case-study" className="case-study-section">
        <div className="section-container">
          <h2>Success Stories</h2>
          <div className="case-studies-grid">
            <div className="case-study-card featured">
              <div className="case-study-image">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=400&q=80" 
                  alt="Tech company office"
                />
              </div>
              <div className="case-study-content">
                <blockquote>
                  "Enter Australia guided us through every step of our Australian market entry. Their strategic approach and local connections helped us establish our presence faster than we ever expected."
                  <cite>— Sarah Chen, CEO of TechGrowth Solutions</cite>
                </blockquote>
                <div className="case-study-metrics">
                  <div className="metric">
                    <strong>300%</strong>
                    <span>Revenue Growth</span>
                  </div>
                  <div className="metric">
                    <strong>4 Months</strong>
                    <span>Time to Market</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="case-study-card">
              <h3>FinTech Scale-Up</h3>
              <p>"Secured $5M in Australian funding within 8 months of market entry"</p>
              <div className="case-study-tags">
                <span>Financial Services</span>
                <span>Series A</span>
              </div>
            </div>
            
            <div className="case-study-card">
              <h3>GovTech Pioneer</h3>
              <p>"First international contract worth $2.1M with NSW Government"</p>
              <div className="case-study-tags">
                <span>Government</span>
                <span>B2G</span>
              </div>
            </div>
          </div>
          <Link to="/partners" className="read-more">
            Read all success stories →
          </Link>
        </div>
      </section>

      <RegionalTeasersSection />

      <section id="footer-cta" className="footer-cta-section">
        <div className="circle-bg-1"></div>
        <div className="circle-bg-2"></div>
        <div className="section-container">
          <div className="cta-content">
            <div className="cta-icon">
              <Award size={48} />
            </div>
            <h2>Ready to Enter the Australian Market?</h2>
            <p>Join 200+ successful companies who chose Enter Australia as their market entry partner</p>
            <div className="urgency-indicator">
              <span>🔥 Limited spots available for Q1 2025 cohort</span>
            </div>
            <div className="cta-buttons">
              <button onClick={toggleLeadForm} className="cta primary-cta">
                Get Your Strategy
              </button>
              <Link to="/contact" className="cta secondary-cta">
                Schedule Consultation
              </Link>
            </div>
            <div className="guarantee">
              <Check size={16} />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
