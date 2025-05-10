
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/solutions.css';

const SolutionsPage = () => {
  // Solution cards data
  const solutions = [
    {
      id: 'market-entry',
      title: 'Market Entry',
      description: 'Launch in Australia—zero guesswork, zero red tape. Get legal, operational & strategic market readiness in 30 days.',
      icon: '🚀',
      link: '/solutions/market-entry'
    },
    {
      id: 'govtech',
      title: 'GovTech Procurement',
      description: 'Win government contracts—no more 80% rejections. Submit compliant, compelling bids that boost your shortlist rate by 30%.',
      icon: '🏛️',
      link: '/solutions/govtech'
    },
    {
      id: 'partnerships',
      title: 'Local Partnerships',
      description: 'Multiply your reach—partner with Australia\'s top channels. Build co-sell deals and reseller networks that accelerate your sales cycle.',
      icon: '🤝',
      link: '/solutions/partnerships'
    },
    {
      id: 'compliance',
      title: 'Compliance & Regulations',
      description: 'Stay audit-ready—no surprises, no fines. Full regulatory posture in 60 days, across cybersecurity, data, export controls & more.',
      icon: '📋',
      link: '/solutions/compliance'
    },
    {
      id: 'grants',
      title: 'Grants & Incentives',
      description: 'Fund your expansion—unlock non-dilutive capital. Navigate A$5 billion+ in grants, R&D tax offsets & state rebates.',
      icon: '💰',
      link: '/solutions/grants'
    }
  ];
  
  return (
    <section id="solutions" className="solutions-page">
      <div className="solutions-hero">
        <h1>Tailored Solutions for Your Industry</h1>
        <p>Customized market-entry strategies for every technology vertical</p>
      </div>
      
      <div className="solutions-cards">
        {solutions.map((solution) => (
          <div key={solution.id} className="solution-card">
            <div className="solution-icon">{solution.icon}</div>
            <h3>{solution.title}</h3>
            <p>{solution.description}</p>
            <Link to={solution.link} className="solution-link">
              Learn more <span className="arrow-icon">→</span>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="solutions-cta">
        <h2>Not sure which solution is right for you?</h2>
        <p>Book a free consultation and our experts will guide you through the options.</p>
        <Link to="/contact" className="btn primary">Book a Free Consultation</Link>
      </div>
    </section>
  );
};

export default SolutionsPage;
