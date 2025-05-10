
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/solution-detail.css';

const MarketEntrySolution = () => {
  return (
    <div className="solution-detail-page">
      {/* Hero & Hook */}
      <section id="hero" className="solution-hero">
        <div className="solution-hero-content">
          <h1>Launch in Australia—zero guesswork, zero red tape</h1>
          <p className="hero-subtext">Get legal, operational & strategic market readiness in 30 days.</p>
          <Link to="/contact" className="btn primary">Start Your Free Assessment →</Link>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" className="solution-section problem-statement">
        <div className="container">
          <h2>The Problem</h2>
          <p>Most foreign tech companies waste months and tens of thousands on legal fees, compliance delays and mis-targeted marketing—only to discover they've built for the wrong audience.</p>
        </div>
      </section>

      {/* Features & Benefits */}
      <section id="features" className="solution-section features-benefits">
        <div className="container">
          <h2>Features & Benefits</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Opportunity Assessment Report</h3>
              <p>15-page deep dive on demand drivers, competitors & pricing</p>
            </div>
            <div className="feature-card">
              <h3>ABN & Entity Setup</h3>
              <p>End-to-end registration, tax onboarding & bank liaison</p>
            </div>
            <div className="feature-card">
              <h3>Virtual Office & Mail Forwarding</h3>
              <p>Prestigious address, local phone number & mail handling</p>
            </div>
            <div className="feature-card">
              <h3>Go-to-Market Blueprint</h3>
              <p>Channel strategy, pricing benchmarks & 90-day roadmap</p>
            </div>
            <div className="feature-card">
              <h3>Kick-off Workshop</h3>
              <p>60-min session to align your execs on market entry</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="solution-section how-it-works">
        <div className="container">
          <h2>How It Works (4-Step Process)</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Intake & Discovery (Days 1–2)</h3>
                <p>You complete a brief form; we map your goals.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Research & Blueprint (Days 3–5)</h3>
                <p>We build your custom report + roadmap.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Setup & Launch (Days 6–20)</h3>
                <p>ABN, office, compliance checklists, kick-off workshop.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Review & Optimize (Days 21–30)</h3>
                <p>Final strategy call, handover of all assets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section id="case-study" className="solution-section case-study">
        <div className="container">
          <h2>Case Study: "CloudX"</h2>
          <div className="case-study-content">
            <div className="case-study-point">
              <h4>Challenge:</h4>
              <p>SaaS platform lacked local entity and credibility.</p>
            </div>
            <div className="case-study-point">
              <h4>Solution:</h4>
              <p>We delivered all setup in 14 days + 1st gov intro in 21 days.</p>
            </div>
            <div className="case-study-point">
              <h4>Result:</h4>
              <p>2x demo requests in month 1; first paid pilot in month 2.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimonial" className="solution-section testimonial">
        <div className="container">
          <div className="testimonial-content">
            <blockquote>
              "Enter-Australia took us live in 3 weeks—and our first meeting with DFAT led to a $120K contract. Game-changer."
            </blockquote>
            <cite>—Sarah Liu, CEO of CloudX</cite>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="solution-section cta">
        <div className="container">
          <h2>Ready to get started?</h2>
          <div className="cta-buttons">
            <a href="/resources" className="btn secondary">Download the Market Entry PDF</a>
            <Link to="/contact" className="btn primary">Book a Strategy Call</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="solution-section faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>How long does ABN registration take?</h4>
              <p>We fast-track your ABN in 3–5 business days.</p>
            </div>
            <div className="faq-item">
              <h4>Is there any commitment after the free assessment?</h4>
              <p>None—keep the report and templates whether you continue or not.</p>
            </div>
            <div className="faq-item">
              <h4>What happens after the 30 days?</h4>
              <p>You'll be fully operational with all legal and setup complete. Optional ongoing support is available.</p>
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

export default MarketEntrySolution;
