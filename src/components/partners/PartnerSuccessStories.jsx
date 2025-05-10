
import React from 'react';
import '../../styles/partners/success-stories.css';

const PartnerSuccessStories = () => {
  return (
    <div className="partner-success-stories">
      <h2>Partnership Success Stories</h2>
      <p>Real results achieved through our strategic partnerships</p>
      
      <div className="stories-container">
        <div className="success-story">
          <h3>Government Technology Integration</h3>
          <p>
            A US-based cybersecurity firm partnered with a local systems integrator 
            through our network to secure a major government contract worth $8.5M.
          </p>
        </div>
        <div className="success-story">
          <h3>Healthcare Innovation Alliance</h3>
          <p>
            We facilitated a partnership between a European medtech company and an 
            Australian healthcare provider, reducing market entry time by 65%.
          </p>
        </div>
        <div className="success-story">
          <h3>Cross-Border Technology Transfer</h3>
          <p>
            A Canadian SaaS provider leveraged our partner network to establish 
            local credibility, increasing sales by 210% within 18 months.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerSuccessStories;
