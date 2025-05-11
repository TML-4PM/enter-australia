
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ toggleLeadForm }) => {
  return (
    <>
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Enter Australia</h1>
          <h2>Your journey to Australian market success starts here</h2>
          <p>We guide innovative businesses through visa processes, market entry strategies, and government contracts with our expert local knowledge.</p>
          <div className="hero-buttons">
            <button onClick={toggleLeadForm} className="btn primary">Get Started</button>
            <Link to="/resources" className="btn secondary">Learn More</Link>
          </div>
        </div>
      </section>

      <section id="services" className="core-services-section">
        <div className="section-container">
          <h2>Our Services</h2>
          <p className="section-intro">Comprehensive solutions to successfully navigate the Australian market</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📋</div>
              <h3>Visa Assistance</h3>
              <p>Expert guidance through complex visa applications, ensuring you select the right visa category and meet all requirements.</p>
              <Link to="/solutions/market-entry" className="service-link">Learn more →</Link>
            </div>
            <div className="service-card">
              <div className="service-icon">💼</div>
              <h3>Job Placement</h3>
              <p>Connect with Australian employers seeking your skills and experience through our extensive network of industry partnerships.</p>
              <Link to="/solutions/partnerships" className="service-link">Learn more →</Link>
            </div>
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Relocation Support</h3>
              <p>Seamless transition to Australia with housing assistance, banking setup, and integration into local communities.</p>
              <Link to="/solutions/market-entry" className="service-link">Learn more →</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className="why-australia-section">
        <div className="section-container">
          <h2>About Us</h2>
          <p className="section-intro">Australia's premier market entry consultancy for global innovators</p>
          
          <div className="about-grid">
            <div className="about-content">
              <p>We're a specialized team of market entry experts who have helped hundreds of businesses successfully establish operations in Australia. Our deep understanding of local regulations, cultural nuances, and industry connections ensures a smooth entry into the Australian market.</p>
              <p>With over 25 years of combined experience working with government agencies and private sector organizations, our consultants provide strategic guidance tailored to your specific industry and goals.</p>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">200+</span>
                  <span className="stat-label">Businesses Helped</span>
                </div>
                <div className="stat">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Success Rate</span>
                </div>
              </div>
              <Link to="/about" className="about-link cta">Learn Our Story</Link>
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
              <div className="region-icon">🌏</div>
              <h3>Asia-Pacific</h3>
              <p>Strategic advantages for APAC innovators entering the Australian market, leveraging regional trade agreements and cultural similarities.</p>
              <Link to="/regions" className="region-link">Explore Asia-Pacific Insights →</Link>
            </div>
            <div className="region-card">
              <div className="region-icon">🏜️</div>
              <h3>Middle East</h3>
              <p>Navigate the Gulf-to-Gippsland corridor with our specialized knowledge of regulations, investment opportunities, and local partnerships.</p>
              <Link to="/regions" className="region-link">Discover Middle East Opportunities →</Link>
            </div>
            <div className="region-card">
              <div className="region-icon">🦅</div>
              <h3>United States</h3>
              <p>Leverage AUKUS partnerships and US-Australia Free Trade benefits for tech companies, defense contractors, and service providers.</p>
              <Link to="/regions" className="region-link">Learn About US Advantages →</Link>
            </div>
            <div className="region-card">
              <div className="region-icon">🇪🇺</div>
              <h3>Europe</h3>
              <p>EU-Australia research collaborations and innovation corridors providing unique opportunities for European businesses in healthcare, renewable energy, and advanced manufacturing.</p>
              <Link to="/regions" className="region-link">View European Pathways →</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing-teaser" className="pricing-teaser-section">
        <div className="section-container">
          <h2>Tailored Solutions for Every Need</h2>
          <p>From market entry assessments to premium retainer services, we have the right plan for your Australian expansion.</p>
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
          <h2>Ready to begin your journey?</h2>
          <p>Take the first step towards Australian market success today.</p>
          <div className="cta-buttons">
            <button onClick={toggleLeadForm} className="cta primary-cta">Get Your Strategy</button>
            <Link to="/contact" className="cta">Contact Our Team</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
