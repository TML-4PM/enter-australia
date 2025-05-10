
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
