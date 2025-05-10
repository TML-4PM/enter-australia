
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/solution-detail.css';

const PartnershipsSolution = () => {
  return (
    <div className="solution-detail-page">
      {/* Hero & Hook */}
      <section id="hero" className="solution-hero">
        <div className="solution-hero-content">
          <h1>Multiply your reach—partner with Australia's top channels</h1>
          <p className="hero-subtext">Build co-sell deals and reseller networks that accelerate your sales cycle.</p>
          <Link to="/contact" className="btn primary">Explore Partnership Services →</Link>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" className="solution-section problem-statement">
        <div className="container">
          <h2>The Problem</h2>
          <p>Without trusted local partners, you'll struggle to gain credibility and scale past pilot projects.</p>
        </div>
      </section>

      {/* Features & Benefits */}
      <section id="features" className="solution-section features-benefits">
        <div className="container">
          <h2>Features & Benefits</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Partner Ecosystem Mapping</h3>
              <p>Top 10 integrators, resellers & service providers by sector</p>
            </div>
            <div className="feature-card">
              <h3>Co-sell Playbooks</h3>
              <p>Joint value props, revenue-share models, marketing templates</p>
            </div>
            <div className="feature-card">
              <h3>Intro & Alignment Calls</h3>
              <p>We handle outreach, scheduling & agenda prep</p>
            </div>
            <div className="feature-card">
              <h3>Channel Enablement Workshops</h3>
              <p>Quarterly training, share best-practice case studies</p>
            </div>
            <div className="feature-card">
              <h3>Performance Dashboard</h3>
              <p>Track partner-sourced leads, pipeline & revenue</p>
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
                <h3>Discovery & Mapping</h3>
                <p>Identify best-fit partners (Week 1)</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Intro & Pilots</h3>
                <p>Run 2–3 discovery pilots (Weeks 2–4)</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Scale & Enable</h3>
                <p>Formalize co-sell programs & quarterly reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section id="case-study" className="solution-section case-study">
        <div className="container">
          <h2>Case Study: "AgriTechCo"</h2>
          <div className="case-study-content">
            <div className="case-study-point">
              <h4>Challenge:</h4>
              <p>No local distribution in ag-tech.</p>
            </div>
            <div className="case-study-point">
              <h4>Solution:</h4>
              <p>We onboarded 3 ag-tech specialists & launched a pilot.</p>
            </div>
            <div className="case-study-point">
              <h4>Result:</h4>
              <p>50 leads in 60 days; 2 co-sell deals signed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimonial" className="solution-section testimonial">
        <div className="container">
          <div className="testimonial-content">
            <blockquote>
              "Their network is gold—our partner deals now outpace direct sales 3:1."
            </blockquote>
            <cite>—Emily Wong, VP Partnerships at AgriTechCo</cite>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="solution-section cta">
        <div className="container">
          <h2>Ready to get started?</h2>
          <div className="cta-buttons">
            <Link to="/resources" className="btn secondary">Download the Partnerships PDF</Link>
            <Link to="/contact" className="btn primary">Start Partner Mapping</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="solution-section faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>How many partners do you recommend?</h4>
              <p>We start with 3–5 strategic partners, then scale to 10–15.</p>
            </div>
            <div className="faq-item">
              <h4>Do you negotiate commercial terms?</h4>
              <p>Yes—we'll help set margins, SLAs and co-sell SLAs.</p>
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

export default PartnershipsSolution;
