
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Building, RefreshCcw, Globe, Flag, Award, MapPin, Map, Check, ArrowRight, Zap, Shield } from 'lucide-react';
import RegionalTeasersSection from './RegionalTeasersSection';

const HomePage = ({ toggleLeadForm }) => {
  return (
    <>
      <section id="home" className="hero modern">
        <div className="hero-background modern">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80" 
            alt="Sydney Harbour Bridge"
            className="hero-bg-image modern"
          />
        </div>
        <div className="hero-content modern">
          <div className="hero-badge modern">
            <Shield size={16} />
            <span>Trusted by 200+ International Companies</span>
          </div>
          <h1>Enter the Australian Market with Confidence</h1>
          <p className="hero-subtitle">
            Strategic guidance and local expertise to accelerate your business expansion into Australia's $1.9 trillion economy
          </p>
          
          <div className="hero-stats modern">
            <div className="stat modern">
              <strong>95%</strong>
              <span>Success Rate</span>
            </div>
            <div className="stat modern">
              <strong>6 Months</strong>
              <span>Avg. Market Entry</span>
            </div>
            <div className="stat modern">
              <strong>$2.4M</strong>
              <span>Avg. First Year Revenue</span>
            </div>
          </div>
          
          <div className="hero-buttons modern">
            <button onClick={toggleLeadForm} className="btn primary large pulse">
              Get Your 2025 Strategy
              <ArrowRight size={20} />
            </button>
            <Link to="/solutions" className="btn secondary large">
              Explore Services
            </Link>
          </div>
          
          <div className="hero-trust-indicators modern">
            <p>Trusted by companies from:</p>
            <div className="trust-logos modern">
              <span>Silicon Valley</span>
              <span>Singapore</span>
              <span>Dubai</span>
              <span>Berlin</span>
            </div>
          </div>
        </div>
      </section>

      <section id="why-australia" className="modern-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Why Australia? Why Now?</h2>
            <p className="text-lead">
              Australia represents one of the world's most stable and profitable markets for international expansion
            </p>
          </div>
          
          <div className="features-grid">
            <div className="modern-card feature-card">
              <div className="feature-icon">
                <BarChart3 size={24} />
              </div>
              <h3>$1.9T Economy</h3>
              <p>14th largest economy globally with strong GDP growth and political stability</p>
            </div>
            
            <div className="modern-card feature-card">
              <div className="feature-icon">
                <Globe size={24} />
              </div>
              <h3>Gateway to Asia-Pacific</h3>
              <p>Strategic location connecting Western businesses to the fastest-growing economic region</p>
            </div>
            
            <div className="modern-card feature-card">
              <div className="feature-icon">
                <Zap size={24} />
              </div>
              <h3>Innovation Hub</h3>
              <p>World-class infrastructure, skilled workforce, and government support for innovation</p>
            </div>
          </div>
        </div>
      </section>

      <section id="case-study" className="case-study-section modern">
        <div className="section-container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p className="text-lead">See how we've helped companies like yours succeed in Australia</p>
          </div>
          
          <div className="case-studies-grid modern">
            <div className="modern-card case-study-card featured">
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
            
            <div className="modern-card case-study-card">
              <h3>FinTech Scale-Up</h3>
              <p>"Secured $5M in Australian funding within 8 months of market entry"</p>
              <div className="case-study-tags">
                <span>Financial Services</span>
                <span>Series A</span>
              </div>
            </div>
            
            <div className="modern-card case-study-card">
              <h3>GovTech Pioneer</h3>
              <p>"First international contract worth $2.1M with NSW Government"</p>
              <div className="case-study-tags">
                <span>Government</span>
                <span>B2G</span>
              </div>
            </div>
          </div>
          
          <div className="section-cta">
            <Link to="/partners" className="btn ghost">
              Read all success stories
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <RegionalTeasersSection />

      <section id="footer-cta" className="footer-cta-section modern">
        <div className="section-container">
          <div className="modern-card dark cta-content">
            <div className="cta-icon">
              <Award size={48} />
            </div>
            <h2>Ready to Enter the Australian Market?</h2>
            <p>Join 200+ successful companies who chose Enter Australia as their market entry partner</p>
            <div className="urgency-indicator">
              <span>🔥 Limited spots available for Q1 2025 cohort</span>
            </div>
            <div className="cta-buttons">
              <button onClick={toggleLeadForm} className="btn accent large">
                Get Your Strategy
                <ArrowRight size={20} />
              </button>
              <Link to="/contact" className="btn ghost">
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
