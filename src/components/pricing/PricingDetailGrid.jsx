
import React from 'react';

const PricingDetailGrid = ({ product }) => {
  // Format the deliverables and who-it's-for from product features
  const deliverables = product.features || [];
  const whoItsFor = product.targetAudience || [];
  
  return (
    <div className="pricing-detail-grid">
      <div className="pricing-detail-section">
        <h2>Who It's For</h2>
        <ul className="detail-list">
          {whoItsFor.map((item, index) => (
            <li key={`who-${index}`}>{item}</li>
          ))}
        </ul>
      </div>
      
      <div className="pricing-detail-section">
        <h2>What You Get</h2>
        <ul className="detail-list">
          {deliverables.map((item, index) => (
            <li key={`what-${index}`}>{item}</li>
          ))}
        </ul>
      </div>
      
      <div className="pricing-detail-section">
        <h2>How We Do It</h2>
        <div className="process-timeline">
          {product.process && product.process.map((step, index) => (
            <div key={`process-${index}`} className="process-step">
              <div className="step-timeline">
                <div className="step-number">{index + 1}</div>
                <div className="step-line"></div>
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pricing-detail-section">
        <h2>Support & SLA</h2>
        <p>{product.support || "Email support with standard response times."}</p>
      </div>
      
      <div className="pricing-detail-section">
        <h2>Expected Outcomes</h2>
        <p>{product.outcomes || "Results vary based on your market and specific situation."}</p>
      </div>
      
      <div className="pricing-detail-section">
        <h2>Case Study</h2>
        <div className="case-study-box">
          <p className="case-study-quote">{product.caseStudy || "Customer success stories coming soon."}</p>
        </div>
      </div>
    </div>
  );
};

export default PricingDetailGrid;
