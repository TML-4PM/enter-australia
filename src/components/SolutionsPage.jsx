
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/solutions.css';

const SolutionsPage = () => {
  const [activeTab, setActiveTab] = useState("govtech");
  
  return (
    <section id="solutions" className="solutions-page">
      <div className="solutions-hero">
        <h1>Tailored Solutions for Your Industry</h1>
        <p>Customized market-entry strategies for every technology vertical</p>
      </div>
      
      <div className="solutions-tabs">
        <button 
          className={`tab ${activeTab === 'govtech' ? 'active' : ''}`}
          onClick={() => setActiveTab('govtech')}
        >
          GovTech
        </button>
        <button 
          className={`tab ${activeTab === 'fintech' ? 'active' : ''}`}
          onClick={() => setActiveTab('fintech')}
        >
          FinTech
        </button>
        <button 
          className={`tab ${activeTab === 'healthtech' ? 'active' : ''}`}
          onClick={() => setActiveTab('healthtech')}
        >
          HealthTech
        </button>
        <button 
          className={`tab ${activeTab === 'saas' ? 'active' : ''}`}
          onClick={() => setActiveTab('saas')}
        >
          SaaS
        </button>
        <button 
          className={`tab ${activeTab === 'iot' ? 'active' : ''}`}
          onClick={() => setActiveTab('iot')}
        >
          IoT
        </button>
      </div>
      
      <div className="solutions-content">
        <div className={`solution-tab-content ${activeTab === 'govtech' ? 'active' : ''}`}>
          <div className="solution-problem">
            <h3>Pain Points</h3>
            <p>Complex tender processes, high compliance requirements, lengthy procurement cycles.</p>
          </div>
          
          <div className="solution-offer">
            <h3>We Offer</h3>
            <ul>
              <li>RFP response support</li>
              <li>Secure-cloud certification</li>
              <li>Stakeholder introductions</li>
              <li>Project delivery frameworks</li>
            </ul>
          </div>
          
          <div className="solution-case">
            <h3>Success Case</h3>
            <p>"City X digitalized permit applications in 8 weeks, improving processing time by 85%."</p>
          </div>
          
          <div className="solution-cta">
            <Link to="/contact" className="btn primary">Talk to our GovTech Lead</Link>
          </div>
        </div>
        
        <div className={`solution-tab-content ${activeTab === 'fintech' ? 'active' : ''}`}>
          <div className="solution-problem">
            <h3>Pain Points</h3>
            <p>APRA licensing, local-payments integration, regulatory compliance.</p>
          </div>
          
          <div className="solution-offer">
            <h3>We Offer</h3>
            <ul>
              <li>Licensing roadmaps</li>
              <li>PSP partnerships (Visa, Adyen)</li>
              <li>Regulatory sandbox access</li>
              <li>Compliance frameworks</li>
            </ul>
          </div>
          
          <div className="solution-case">
            <h3>Success Case</h3>
            <p>"Neobank Y launched with 150k customers in 3 months with our regulatory fast-track."</p>
          </div>
          
          <div className="solution-cta">
            <Link to="/contact" className="btn primary">Speak with our FinTech Expert</Link>
          </div>
        </div>
        
        <div className={`solution-tab-content ${activeTab === 'healthtech' ? 'active' : ''}`}>
          <div className="solution-problem">
            <h3>Pain Points</h3>
            <p>TGA approvals, My Health Record integration, data security compliance.</p>
          </div>
          
          <div className="solution-offer">
            <h3>We Offer</h3>
            <ul>
              <li>Clinical trials setup</li>
              <li>EHR connectors</li>
              <li>Reimbursement pathways</li>
              <li>Hospital partnership introductions</li>
            </ul>
          </div>
          
          <div className="solution-case">
            <h3>Success Case</h3>
            <p>"MedApp Z scaled to 100 clinics in Q1 through our healthcare accelerator program."</p>
          </div>
          
          <div className="solution-cta">
            <Link to="/contact" className="btn primary">Connect with our HealthTech Team</Link>
          </div>
        </div>
        
        <div className={`solution-tab-content ${activeTab === 'saas' ? 'active' : ''}`}>
          <div className="solution-problem">
            <h3>Pain Points</h3>
            <p>Data sovereignty, local hosting requirements, enterprise sales cycles.</p>
          </div>
          
          <div className="solution-offer">
            <h3>We Offer</h3>
            <ul>
              <li>AWS/Azure partnership facilitation</li>
              <li>Data residency compliance</li>
              <li>Enterprise sales introductions</li>
              <li>ISV partnership development</li>
            </ul>
          </div>
          
          <div className="solution-case">
            <h3>Success Case</h3>
            <p>"B2B platform secured 3 enterprise clients in first quarter after Australian launch."</p>
          </div>
          
          <div className="solution-cta">
            <Link to="/contact" className="btn primary">Talk to our SaaS Specialist</Link>
          </div>
        </div>
        
        <div className={`solution-tab-content ${activeTab === 'iot' ? 'active' : ''}`}>
          <div className="solution-problem">
            <h3>Pain Points</h3>
            <p>Spectrum licensing, hardware certification, supply chain complexity.</p>
          </div>
          
          <div className="solution-offer">
            <h3>We Offer</h3>
            <ul>
              <li>ACMA certification support</li>
              <li>Manufacturing partnerships</li>
              <li>Distribution channel development</li>
              <li>Pilot program management</li>
            </ul>
          </div>
          
          <div className="solution-case">
            <h3>Success Case</h3>
            <p>"Smart city solution deployed across 3 regional councils within 6 months of market entry."</p>
          </div>
          
          <div className="solution-cta">
            <Link to="/contact" className="btn primary">Connect with our IoT Team</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsPage;
