
import React from 'react';
import { Handshake, Users, Building, Briefcase } from 'lucide-react';

const PartnershipValue = () => {
  return (
    <div className="partnership-value">
      <div className="value-container">
        <div className="value-text">
          <h2>Partnerships: Your Strategic Entry Point</h2>
          <p>
            Contracting and partnering is often the most effective strategy for entering the Australian market. 
            By leveraging established local relationships, you can rapidly expand your footprint while minimizing risk.
          </p>
          <p>
            Our partnership network becomes an extension of your organization – effectively your APAC or Australian 
            leadership team – providing local expertise and credibility from day one.
          </p>
        </div>
        <div className="value-cards">
          <div className="value-card">
            <Handshake size={36} />
            <h3>Strategic Alliances</h3>
            <p>Form strategic partnerships that open doors to new opportunities and markets</p>
          </div>
          <div className="value-card">
            <Users size={36} />
            <h3>Force Multiplier</h3>
            <p>Multiply your capabilities through complementary skills and networks</p>
          </div>
          <div className="value-card">
            <Building size={36} />
            <h3>Local Expertise</h3>
            <p>Access deep industry knowledge and established relationships in the Australian market</p>
          </div>
          <div className="value-card">
            <Briefcase size={36} />
            <h3>Global Best Practices</h3>
            <p>Fill RFTs and opportunities with best-in-class solutions and expertise</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipValue;
