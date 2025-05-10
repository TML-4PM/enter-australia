
import React from 'react';
import '../../styles/partners/partnership-process.css';

const PartnershipProcess = () => {
  return (
    <div className="partnership-process">
      <h2>How We Integrate as Your Australian Leadership Team</h2>
      <p>We function as an extension of your organization in the Australian market</p>
      
      <div className="process-steps">
        <div className="process-step">
          <div className="step-number">1</div>
          <h3>Skill Mapping</h3>
          <p>We identify complementary skills and capabilities between partners</p>
        </div>
        <div className="process-step">
          <div className="step-number">2</div>
          <h3>Opportunity Alignment</h3>
          <p>We match partners with relevant market opportunities</p>
        </div>
        <div className="process-step">
          <div className="step-number">3</div>
          <h3>Force Multiplication</h3>
          <p>We leverage collective strengths to amplify impact and reach</p>
        </div>
        <div className="process-step">
          <div className="step-number">4</div>
          <h3>Seamless Integration</h3>
          <p>We function as your local Australian leadership team</p>
        </div>
      </div>
    </div>
  );
};

export default PartnershipProcess;
