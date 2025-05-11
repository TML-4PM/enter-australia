
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ toggleLeadForm }) => {
  return (
    <>
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Enter Australia</h1>
          <h2>Your journey to Australia starts here.</h2>
          <p>We guide you through visa applications, job placement, and relocation with ease.</p>
          <button onClick={toggleLeadForm} className="btn primary">Get Started</button>
          <Link to="/resources" className="btn secondary">Learn More</Link>
        </div>
      </section>

      <section id="services" className="core-services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Visa Assistance</h3>
            <p>Expert help with visa applications.</p>
          </div>
          <div className="service-card">
            <h3>Job Placement</h3>
            <p>Connect with Australian employers.</p>
          </div>
          <div className="service-card">
            <h3>Relocation Support</h3>
            <p>Seamless transition to Australia.</p>
          </div>
        </div>
      </section>

      <section id="regional-expertise" className="regional-teasers-section">
        <h2>Regional Expertise</h2>
        <div className="regions-grid">
          <div className="region-card">
            <h3>Asia-Pacific</h3>
            <p>Strategic advantages for APAC innovators entering the Australian market.</p>
            <Link to="/regions" className="region-link">Explore Asia-Pacific Insights →</Link>
          </div>
          <div className="region-card">
            <h3>Middle East</h3>
            <p>Navigate the Gulf-to-Gippsland corridor with our specialized knowledge.</p>
            <Link to="/regions" className="region-link">Discover Middle East Opportunities →</Link>
          </div>
          <div className="region-card">
            <h3>United States</h3>
            <p>Leverage AUKUS partnerships and US-Australia Free Trade benefits.</p>
            <Link to="/regions" className="region-link">Learn About US Advantages →</Link>
          </div>
          <div className="region-card">
            <h3>Europe</h3>
            <p>EU-Australia research collaborations and innovation corridors.</p>
            <Link to="/regions" className="region-link">View European Pathways →</Link>
          </div>
        </div>
      </section>

      <section id="pricing-teaser" className="pricing-teaser-section">
        <h2>Tailored Solutions for Every Need</h2>
        <p>From market entry assessments to premium retainer services, we have the right plan for your Australian expansion.</p>
        <Link to="/pricing" className="cta">View Pricing Plans</Link>
      </section>

      <section id="about-us" className="why-australia-section">
        <h2>About Us</h2>
        <p>We're a team dedicated to helping you enter Australia with ease.</p>
      </section>

      <section id="footer-cta" className="footer-cta-section">
        <h2>Ready to begin your journey?</h2>
        <Link to="/contact" className="cta">Contact Us</Link>
      </section>
    </>
  );
};

export default HomePage;
