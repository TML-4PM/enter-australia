
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/resources.css';

const ResourcesPage = () => {
  const [email, setEmail] = React.useState('');
  const [showThankYou, setShowThankYou] = React.useState(false);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // In a real app, you would submit to an API
    console.log('Subscribed:', email);
    setShowThankYou(true);
    setEmail('');
    setTimeout(() => setShowThankYou(false), 3000);
  };
  
  return (
    <section id="resources" className="resources-page">
      <div className="resources-hero">
        <h1>Market Intelligence & Playbooks</h1>
        <p>Expert guides and insights to help you navigate the Australian tech market</p>
      </div>
      
      <div className="resources-container">
        <div className="resources-guides">
          <h2>Gated Guides</h2>
          <div className="guides-grid">
            <div className="guide-card">
              <div className="guide-icon">📕</div>
              <h3>Australia Tech Playbook</h3>
              <p>Your complete roadmap to Australian market entry and growth</p>
              <Link to="#lead-form" onClick={() => window.scrollTo(0, document.getElementById('lead-form').offsetTop)} className="guide-link">Download PDF →</Link>
            </div>
            
            <div className="guide-card">
              <div className="guide-icon">📗</div>
              <h3>GovTech Procurement Handbook</h3>
              <p>Navigate the complexities of government tech purchasing</p>
              <Link to="#lead-form" onClick={() => window.scrollTo(0, document.getElementById('lead-form').offsetTop)} className="guide-link">Download PDF →</Link>
            </div>
            
            <div className="guide-card">
              <div className="guide-icon">📘</div>
              <h3>R&D Grants Primer</h3>
              <p>Maximize your innovation funding in Australia</p>
              <Link to="#lead-form" onClick={() => window.scrollTo(0, document.getElementById('lead-form').offsetTop)} className="guide-link">Download PDF →</Link>
            </div>
          </div>
        </div>
        
        <div className="resources-webinars">
          <h2>Webinars</h2>
          <div className="webinar-card">
            <div className="webinar-image">
              <span className="webinar-date">May 15, 2025</span>
            </div>
            <div className="webinar-content">
              <h3>Scaling in APAC: Lessons from 50+ Tech Expansions</h3>
              <p>Learn from tech leaders who've successfully scaled across the Asia-Pacific region</p>
              <Link to="/contact" className="webinar-link">Register Now →</Link>
            </div>
          </div>
        </div>
        
        <div className="resources-blog">
          <h2>Blog</h2>
          <div className="blog-grid">
            <div className="blog-card">
              <div className="blog-image"></div>
              <div className="blog-content">
                <span className="blog-date">April 28, 2025</span>
                <h3>Why Australian Data-Sovereignty Matters</h3>
                <p>How local data storage requirements impact your tech expansion strategy</p>
                <Link to="#" className="blog-link">Read More →</Link>
              </div>
            </div>
            
            <div className="blog-card">
              <div className="blog-image"></div>
              <div className="blog-content">
                <span className="blog-date">April 15, 2025</span>
                <h3>Top 5 Cloud Trends in 2025</h3>
                <p>How Australia's cloud adoption is evolving for enterprise and government</p>
                <Link to="#" className="blog-link">Read More →</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="resources-subscribe">
          <h2>Stay Informed</h2>
          <p>Get weekly insights on Australian tech opportunities</p>
          <form onSubmit={handleSubscribe}>
            <div className="subscribe-form">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                required 
              />
              <button type="submit" className="btn primary">Subscribe</button>
            </div>
            {showThankYou && <p className="thank-you-message">Thank you for subscribing!</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPage;
