
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/solution-detail.css';

const ComplianceSolution = () => {
  return (
    <div className="solution-detail-page">
      {/* Hero & Hook */}
      <section id="hero" className="solution-hero">
        <div className="solution-hero-content">
          <h1>Stay audit-ready—no surprises, no fines</h1>
          <p className="hero-subtext">Full regulatory posture in 60 days, across cybersecurity, data, export controls & more.</p>
          <Link to="/contact" className="btn primary">Learn About Compliance →</Link>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" className="solution-section problem-statement">
        <div className="container">
          <h2>The Problem</h2>
          <p>Non-compliance can cost you millions in penalties, reputational damage, and deal losses.</p>
        </div>
      </section>

      {/* Features & Benefits */}
      <section id="features" className="solution-section features-benefits">
        <div className="container">
          <h2>Features & Benefits</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Regulatory Gap Analysis</h3>
              <p>ASIC, ACCC, Privacy Act, Export Controls & custom industry regs</p>
            </div>
            <div className="feature-card">
              <h3>Policy & Procedure Templates</h3>
              <p>Data handling, incident response, governance frameworks</p>
            </div>
            <div className="feature-card">
              <h3>Certification Roadmap</h3>
              <p>ISO27001, IRAP, Essential Eight alignment, grant-backed audits</p>
            </div>
            <div className="feature-card">
              <h3>Regulator Liaison</h3>
              <p>We draft submissions & coordinate with agency contacts</p>
            </div>
            <div className="feature-card">
              <h3>Quarterly Compliance Health Check</h3>
              <p>Ongoing risk scoring & action plan</p>
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
                <h3>Audit & Score (Weeks 1–2)</h3>
                <p>You share docs; we deliver a gap report.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Policy Build (Weeks 3–4)</h3>
                <p>We customize templates & train your team.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Certification Prep (Weeks 5–8)</h3>
                <p>We guide you through audits & evidence.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Continuous Monitoring</h3>
                <p>Quarterly reviews + updates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section id="case-study" className="solution-section case-study">
        <div className="container">
          <h2>Case Study: "FinServCorp"</h2>
          <div className="case-study-content">
            <div className="case-study-point">
              <h4>Challenge:</h4>
              <p>IRAP readiness for Top Secret cloud workloads.</p>
            </div>
            <div className="case-study-point">
              <h4>Solution:</h4>
              <p>8-week program with evidence gathering & audit support.</p>
            </div>
            <div className="case-study-point">
              <h4>Result:</h4>
              <p>Achieved IRAP PROTECTED in under 10 weeks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimonial" className="solution-section testimonial">
        <div className="container">
          <div className="testimonial-content">
            <blockquote>
              "Their compliance team feels like an extension of ours—no more audit sleepless nights."
            </blockquote>
            <cite>—Mark Davis, Head of Security at FinServCorp</cite>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="solution-section cta">
        <div className="container">
          <h2>Ready to get started?</h2>
          <div className="cta-buttons">
            <a href="/resources" className="btn secondary">Download the Compliance PDF</a>
            <Link to="/contact" className="btn primary">Book a Compliance Audit</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="solution-section faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can you handle multi-jurisdictional regs?</h4>
              <p>Yes—Australia, NZ, Singapore and more.</p>
            </div>
            <div className="faq-item">
              <h4>What's included in the quarterly health check?</h4>
              <p>Updated risk score, new recommendations, policy refresh.</p>
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

export default ComplianceSolution;
