
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Building, RefreshCcw, Globe, Flag, Award, MapPin, Map } from 'lucide-react';

const HomePage = ({ toggleLeadForm }) => {
  return (
    <>
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Market Entry Specialists for Australia</h1>
          <h2>Strategic guidance for businesses expanding into the Australian market</h2>
          <p>We navigate regulatory complexities, establish local partnerships, and create tailored market entry strategies that accelerate your growth in Australia.</p>
          <div className="hero-buttons">
            <button onClick={toggleLeadForm} className="btn primary">Start Your Strategy</button>
            <Link to="/solutions" className="btn secondary">Explore Services</Link>
          </div>
        </div>
      </section>

      <section id="services" className="core-services-section">
        <div className="circle-bg-1"></div>
        <div className="circle-bg-2"></div>
        <div className="section-container">
          <h2>Our Core Solutions</h2>
          <p className="section-intro">End-to-end market entry support for global businesses</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <BarChart3 size={32} color="#00843D" />
              </div>
              <h3>Market Entry Strategy</h3>
              <p>Comprehensive market research, regulatory analysis, and strategic planning to position your business for sustainable success in Australia.</p>
              <Link to="/solutions/market-entry" className="service-link">Learn more</Link>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <Building size={32} color="#00843D" />
              </div>
              <h3>Government Relations</h3>
              <p>Navigate government procurement, build relationships with key agencies, and access grants and incentives to accelerate your market entry.</p>
              <Link to="/solutions/govtech" className="service-link">Learn more</Link>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <RefreshCcw size={32} color="#00843D" />
              </div>
              <h3>Business Integration</h3>
              <p>Seamless establishment of your Australian operations, including entity setup, local hiring, office space, and operational infrastructure.</p>
              <Link to="/solutions/market-entry" className="service-link">Learn more</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className="why-australia-section">
        <div className="circle-bg-1"></div>
        <div className="circle-bg-2"></div>
        <div className="section-container">
          <h2>Australia's Market Entry Experts</h2>
          <p className="section-intro">Strategic guidance for successful expansion into the Australian market</p>
          
          <div className="about-grid">
            <div className="about-content">
              <p>Our team combines industry expertise and government experience to help international businesses successfully enter and thrive in the Australian market. With strategic insights and local connections, we've guided over 200 businesses to successful market entry.</p>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">200+</span>
                  <span className="stat-label">Successful Market Entries</span>
                </div>
                <div className="stat">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Client Satisfaction</span>
                </div>
              </div>
              <div className="about-link-container">
                <Link to="/about" className="about-link">Learn Our Story</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="regional-expertise" className="regional-teasers-section">
        <div className="section-container">
          <h2>Regional Expertise</h2>
          <p className="section-intro">Specialized knowledge to help businesses from across the globe</p>
          <div className="regions-grid">
            <div className="region-card">
              <div className="region-icon">
                <Globe size={32} color="#00843D" />
              </div>
              <h3>Asia-Pacific</h3>
              <p>Strategic advantages for APAC businesses entering Australia, leveraging regional trade agreements and established market channels.</p>
              <Link to="/regions" className="region-link">Explore Asia-Pacific Insights</Link>
            </div>
            <div className="region-card">
              <div className="region-icon">
                <MapPin size={32} color="#00843D" />
              </div>
              <h3>Middle East</h3>
              <p>Strategic pathways for Gulf region businesses to establish Australian operations in energy, education, and infrastructure sectors.</p>
              <Link to="/regions" className="region-link">Discover Middle East Opportunities</Link>
            </div>
            <div className="region-card">
              <div className="region-icon">
                <Flag size={32} color="#00843D" />
              </div>
              <h3>North America</h3>
              <p>Leveraging AUKUS and Free Trade benefits for tech companies and defense contractors entering the Australian market.</p>
              <Link to="/regions" className="region-link">Learn About US Advantages</Link>
            </div>
            <div className="region-card">
              <div className="region-icon">
                <Map size={32} color="#00843D" />
              </div>
              <h3>Europe</h3>
              <p>EU-Australia partnerships creating unique opportunities in renewable energy, healthcare, and advanced manufacturing.</p>
              <Link to="/regions" className="region-link">View European Pathways</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing-teaser" className="pricing-teaser-section">
        <div className="circle-bg-1"></div>
        <div className="circle-bg-2"></div>
        <div className="section-container">
          <h2>Tailored Entry Solutions</h2>
          <p>From initial market assessments to comprehensive entry management, our services scale with your business needs.</p>
          <div className="pricing-benefits">
            <div className="benefit">
              <span className="benefit-check">✓</span>
              <span>Customized strategy</span>
            </div>
            <div className="benefit">
              <span className="benefit-check">✓</span>
              <span>Flexible payment options</span>
            </div>
            <div className="benefit">
              <span className="benefit-check">✓</span>
              <span>Transparent pricing</span>
            </div>
          </div>
          <Link to="/pricing" className="cta">View Pricing Plans</Link>
        </div>
      </section>

      <section id="footer-cta" className="footer-cta-section">
        <div className="section-container">
          <h2>Ready to Enter the Australian Market?</h2>
          <p>Take the first step towards successful expansion today.</p>
          <div className="cta-buttons">
            <button onClick={toggleLeadForm} className="cta primary-cta">Get Your Strategy</button>
            <Link to="/contact" className="cta">Schedule a Consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
