
import React from 'react';
import '../styles/pricing-faq.css';

const PricingFaq = () => {
  return (
    <div className="pricing-faq">
      <h3>Frequently Asked Questions</h3>
      <div className="faq-grid">
        <div className="faq-item">
          <h4>Can I upgrade/downgrade anytime?</h4>
          <p>Yes, you can change your plan at any time. Changes are prorated based on your billing cycle.</p>
        </div>
        <div className="faq-item">
          <h4>Is there a setup fee?</h4>
          <p>There's no setup fee for our Assessment, Launch, Growth, or Scale packages. Enterprise plans may include a one-time setup fee based on your specific requirements.</p>
        </div>
        <div className="faq-item">
          <h4>What ROI can I expect?</h4>
          <p>Our clients typically see 3× pipeline growth within 6 months on Growth tier or higher plans.</p>
        </div>
        <div className="faq-item">
          <h4>How long is the commitment?</h4>
          <p>All subscription plans are month-to-month with no long-term contract required.</p>
        </div>
      </div>
    </div>
  );
};

export default PricingFaq;
