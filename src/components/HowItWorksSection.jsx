
import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <h2>From Zero to Aussie Wins in 30 Days</h2>
      <div className="steps-grid">
        <div className="step-card">
          <div className="step-number">1</div>
          <h3>Sign Up</h3>
          <p>$5K Kit—ABN, virtual office, intro pitch, capability brief development.</p>
          <ul className="feature-list">
            <li>Australian Business Number registration</li>
            <li>Virtual office in strategic location</li>
            <li>Localized marketing materials</li>
            <li>30-day initial market entry support</li>
          </ul>
        </div>
        <div className="step-card">
          <div className="step-number">2</div>
          <h3>Launch</h3>
          <p>We pitch Defence, ASIO, or Space Command with your capabilities.</p>
          <ul className="feature-list">
            <li>Introduction to your first government department</li>
            <li>Capability brief development tailored to Australian requirements</li>
            <li>Strategic guidance on positioning</li>
            <li>7-10 business days turnaround</li>
          </ul>
        </div>
        <div className="step-card">
          <div className="step-number">3</div>
          <h3>Win</h3>
          <p>Upgrade to $15K/month—lock in the contract with ongoing support.</p>
          <ul className="feature-list">
            <li>Up to 5 government department introductions monthly</li>
            <li>Physical office presence when needed</li>
            <li>In-person government meetings</li>
            <li>Tender response support</li>
          </ul>
        </div>
      </div>
      <div className="example-box">
        <h3>Success Story</h3>
        <p>Red 6: $5K got them RAAF-ready; $15K aims for $20M combat training simulation contract with the Royal Australian Air Force.</p>
      </div>
      <Link to="/pricing" className="cta">Start Now – $5K</Link>
    </section>
  );
};

export default HowItWorksSection;
