
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/solution-detail.css';

const GovTechSolution = () => {
  return (
    <div className="solution-detail-page">
      {/* Hero & Hook */}
      <section id="hero" className="solution-hero">
        <div className="solution-hero-content">
          <h1>Win government contracts—no more 80% rejections</h1>
          <p className="hero-subtext">Submit compliant, compelling bids that boost your shortlist rate by 30%.</p>
          <Link to="/contact" className="btn primary">See Procurement Details →</Link>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" className="solution-section problem-statement">
        <div className="container">
          <h2>The Problem</h2>
          <p>Government RFTs are labyrinthine: missing one clause or format rule and your proposal is dead on arrival.</p>
        </div>
      </section>

      {/* Features & Benefits */}
      <section id="features" className="solution-section features-benefits">
        <div className="container">
          <h2>Features & Benefits</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>RFT Intelligence Alerts</h3>
              <p>Daily notifications on matched tenders & grants</p>
            </div>
            <div className="feature-card">
              <h3>Bid Health Check</h3>
              <p>Compliance audit & gap-analysis within 48 hrs</p>
            </div>
            <div className="feature-card">
              <h3>Proposal Coaching</h3>
              <p>Executive summary, pricing model & evaluation criteria workshops</p>
            </div>
            <div className="feature-card">
              <h3>Warm Introductions</h3>
              <p>Facilitated intros to decision-makers in up to 5 departments</p>
            </div>
            <div className="feature-card">
              <h3>Post-Submission Support</h3>
              <p>Debrief call + lessons-learned report</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="solution-section how-it-works">
        <div className="container">
          <h2>How It Works (5-Step Process)</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Match & Alert</h3>
                <p>We sync to GovTech scanner for your RFTs.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Audit & Strategy</h3>
                <p>48-hr compliance audit + pricing workshop.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Draft & Review</h3>
                <p>You draft; we review & refine your bid.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Submission & Follow-up</h3>
                <p>We lodge on your behalf + chase status.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Debrief & Next Steps</h3>
                <p>Lessons, tweaks & pipeline planning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section id="case-study" className="solution-section case-study">
        <div className="container">
          <h2>Case Study: "HealthWorks"</h2>
          <div className="case-study-content">
            <div className="case-study-point">
              <h4>Challenge:</h4>
              <p>Chronic rejections on state tenders.</p>
            </div>
            <div className="case-study-point">
              <h4>Solution:</h4>
              <p>Compliance workshop + intro to NSW Health.</p>
            </div>
            <div className="case-study-point">
              <h4>Result:</h4>
              <p>Shortlisted in 2/3 bids; $450K contract secured.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimonial" className="solution-section testimonial">
        <div className="container">
          <div className="testimonial-content">
            <blockquote>
              "After 6 failed bids, we turned to Enter-Australia. We're now on track for A$1M in gov revenue this FY."
            </blockquote>
            <cite>—Raj Patel, CTO of HealthWorks</cite>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="solution-section cta">
        <div className="container">
          <h2>Ready to get started?</h2>
          <div className="cta-buttons">
            <a href="/resources" className="btn secondary">Download the GovTech PDF</a>
            <Link to="/contact" className="btn primary">Request a Bid Health Check</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="solution-section faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Do you handle federal & state tenders?</h4>
              <p>Yes—across all major departments and grant bodies.</p>
            </div>
            <div className="faq-item">
              <h4>Can you help with grant proposals?</h4>
              <p>Absolutely—we bundle grants under our Procurement service.</p>
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

export default GovTechSolution;
