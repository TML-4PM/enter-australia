
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/solution-detail.css';

const GrantsSolution = () => {
  return (
    <div className="solution-detail-page">
      {/* Hero & Hook */}
      <section id="hero" className="solution-hero">
        <div className="solution-hero-content">
          <h1>Fund your expansion—unlock non-dilutive capital</h1>
          <p className="hero-subtext">Navigate A$5 billion+ in grants, R&D tax offsets & state rebates—without the paperwork headache.</p>
          <Link to="/contact" className="btn primary">See Grants & Incentives →</Link>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" className="solution-section problem-statement">
        <div className="container">
          <h2>The Problem</h2>
          <p>Government funding is a huge boost—but 80% of applications fail due to technicalities and poor budgets.</p>
        </div>
      </section>

      {/* Features & Benefits */}
      <section id="features" className="solution-section features-benefits">
        <div className="container">
          <h2>Features & Benefits</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Grant & Incentive Scan</h3>
              <p>Curated dashboard of federal, state & local programs</p>
            </div>
            <div className="feature-card">
              <h3>Eligibility Fast-Track</h3>
              <p>48-hr screening vs. your business model & roadmap</p>
            </div>
            <div className="feature-card">
              <h3>End-to-End Application Prep</h3>
              <p>Budgets, attachments, narrative & compliance checks</p>
            </div>
            <div className="feature-card">
              <h3>Post-Award Reporting</h3>
              <p>Templates, milestone tracking & compliance submissions</p>
            </div>
            <div className="feature-card">
              <h3>Grant Success Workshop</h3>
              <p>90-min session on maximizing future approvals</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="solution-section how-it-works">
        <div className="container">
          <h2>How It Works (3-Phase Process)</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Discovery (Week 1)</h3>
                <p>Match to 5–7 top programs.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Apply (Weeks 2–4)</h3>
                <p>Draft, review & submit.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Manage (Ongoing)</h3>
                <p>Reporting, milestone checks & next-round prep.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section id="case-study" className="solution-section case-study">
        <div className="container">
          <h2>Case Study: "HealthFlow"</h2>
          <div className="case-study-content">
            <div className="case-study-point">
              <h4>Challenge:</h4>
              <p>Needed funding for pilot of real-time care platform.</p>
            </div>
            <div className="case-study-point">
              <h4>Solution:</h4>
              <p>Secured A$250K state grant + A$150K R&D offset.</p>
            </div>
            <div className="case-study-point">
              <h4>Result:</h4>
              <p>Covered 60% of dev costs; launched pilot in 90 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimonial" className="solution-section testimonial">
        <div className="container">
          <div className="testimonial-content">
            <blockquote>
              "They got us A$400K in non-dilutive funds in under 6 weeks—game-changer for our runway."
            </blockquote>
            <cite>—Dr. Neha Singh, Founder of HealthFlow</cite>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="solution-section cta">
        <div className="container">
          <h2>Ready to get started?</h2>
          <div className="cta-buttons">
            <a href="/resources" className="btn secondary">Download the Grants PDF</a>
            <Link to="/contact" className="btn primary">Start Your Eligibility Check</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="solution-section faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>What grants fit hardware-focused startups?</h4>
              <p>We target both R&D tax and industry-specific invention grants.</p>
            </div>
            <div className="faq-item">
              <h4>Do you handle reporting requirements?</h4>
              <p>Yes—we prepare templates and guide you through each milestone.</p>
            </div>
          </div>
          <div className="faq-more">
            <Link to="/faq" className="link-with-arrow">View all FAQs</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GrantsSolution;
