
import React from 'react';

const TermsPage = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: January 30, 2025</p>
        
        <div className="legal-content">
          <section>
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using Enter Australia's services, you accept and agree to be 
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2>Services</h2>
            <p>
              Enter Australia provides market entry consulting, government contract assistance, 
              and business advisory services for international companies seeking to enter the 
              Australian market.
            </p>
          </section>

          <section>
            <h2>User Responsibilities</h2>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Use our services in accordance with applicable laws</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2>Payment Terms</h2>
            <p>
              Payment terms are specified in individual service agreements. All fees are 
              non-refundable unless otherwise stated in writing.
            </p>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>
              Enter Australia shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages resulting from your use of our services.
            </p>
          </section>

          <section>
            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Service, contact us at{' '}
              <a href="mailto:info@enteraustralia.tech">info@enteraustralia.tech</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
