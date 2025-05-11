import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Building, RefreshCcw, Globe, Flag, Award, MapPin, Map, Check } from 'lucide-react';

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

      {/* Removed core-services-section as requested */}

      {/* Removed why-australia-section as requested */}

      {/* Removed regional-teasers-section as requested */}

      {/* Removed pricing-teaser-section as requested */}

      <section id="footer-cta" className="footer-cta-section">
        <div className="circle-bg-1"></div>
        <div className="circle-bg-2"></div>
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
