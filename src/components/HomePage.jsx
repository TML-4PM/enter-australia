
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ toggleLeadForm }) => {
  return (
    <>
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Enter Australia</h1>
          <h2>Your front door to the world's third-largest tech market</h2>
          <p>We guide global tech brands through compliance, partnerships & scale—fast, low-risk, guaranteed.</p>
          <button onClick={toggleLeadForm} className="btn primary">Get My Free Market Assessment</button>
          <Link to="/resources" className="btn secondary">Download the Australia Tech Playbook</Link>
        </div>
        <div className="social-proof">
          <p>Trusted by FVEYs firms eying AUKUS, Critical Minerals, Telecommunications, Health, Trade and more</p>
        </div>
      </section>

      <section id="why-australia" className="why-australia-section">
        <h2>Why Australia</h2>
        <div className="icon-bar">
          <div className="icon-item">
            <div className="icon">🦘</div>
            <h3>Regulatory Expertise</h3>
            <p>Skip the red tape.</p>
          </div>
          <div className="icon-item">
            <div className="icon">🏛️</div>
            <h3>Gov't Partnerships</h3>
            <p>Access state & federal contracts.</p>
          </div>
          <div className="icon-item">
            <div className="icon">📊</div>
            <h3>Market Intelligence</h3>
            <p>Data-driven growth insights.</p>
          </div>
          <div className="icon-item">
            <div className="icon">🚀</div>
            <h3>Rapid Onboarding</h3>
            <p>Launch live in weeks.</p>
          </div>
        </div>
      </section>

      <section id="core-services" className="core-services-section">
        <h2>Core Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Compliance & Legal</h3>
            <p>Local IP, data-sovereignty, cybersecurity, ACL, TGA.</p>
          </div>
          <div className="service-card">
            <h3>Go-to-Market & Partnerships</h3>
            <p>Channel sourcing, pilot programs, co-sell with integrators.</p>
          </div>
          <div className="service-card">
            <h3>Scale & Ops Support</h3>
            <p>On-the-ground teams, customer success, 24×7 support.</p>
          </div>
        </div>
      </section>

      <section id="case-study" className="case-study-section">
        <div className="case-study-content">
          <blockquote>
            <p>"With Enter Australia, we closed our first $5M GovTech contract in 6 weeks."</p>
            <cite>— Lisa Tan, CEO, NeoHealth</cite>
          </blockquote>
          <Link to="/resources" className="read-more">Read the full case study →</Link>
        </div>
      </section>

      <section id="regional-teasers" className="regional-teasers-section">
        <h2>Regional Expertise</h2>
        <div className="regions-grid">
          <div className="region-card">
            <h3>Asia-Pac</h3>
            <p>Leverage our Sydney HQ for seamless regional expansion.</p>
            <Link to="/regions" className="region-link">Learn more →</Link>
          </div>
          <div className="region-card">
            <h3>Middle East</h3>
            <p>Perth–Dubai corridor for innovative tech solutions.</p>
            <Link to="/regions" className="region-link">Learn more →</Link>
          </div>
          <div className="region-card">
            <h3>U.S.</h3>
            <p>Tap into Australian cloud procurement with ease.</p>
            <Link to="/regions" className="region-link">Learn more →</Link>
          </div>
        </div>
      </section>

      <section id="footer-cta" className="footer-cta-section">
        <h2>Ready to expand Down Under?</h2>
        <Link to="/contact" className="cta">Book Your Discovery Call →</Link>
      </section>
    </>
  );
};

export default HomePage;
