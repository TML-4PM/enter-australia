
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveEmailSubscription } from '../utils/subscriptionUtils';
import { fetchLinkedInActivity } from '../utils/linkedinUtils';
import '../styles/resources.css';

const ResourcesPage = () => {
  const [email, setEmail] = React.useState('');
  const [showThankYou, setShowThankYou] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [blogPosts, setBlogPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await fetchLinkedInActivity();
        setBlogPosts(posts);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load blog posts:', err);
        setError('Failed to load blog content. Please try again later.');
        setIsLoading(false);
      }
    };
    
    loadBlogPosts();
  }, []);
  
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await saveEmailSubscription(email, 'resources_page');
      
      if (result.success) {
        setShowThankYou(true);
        setEmail('');
        setTimeout(() => setShowThankYou(false), 5000);
      } else {
        alert("There was an error subscribing. Please try again.");
        console.error(result.error);
      }
    } catch (err) {
      console.error('Error in subscription:', err);
      alert("Subscription failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
          <h2>Blog & Insights from LinkedIn</h2>
          <div className="blog-grid">
            {isLoading ? (
              <div className="blog-loading">Loading latest insights...</div>
            ) : error ? (
              <div className="blog-error">{error}</div>
            ) : (
              blogPosts.map(post => (
                <div className="blog-card" key={post.id}>
                  <div className="blog-image" style={{ backgroundImage: `url(${post.imageUrl})` }}></div>
                  <div className="blog-content">
                    <span className="blog-date">{new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                    <h3>{post.title}</h3>
                    <p>{post.content.length > 120 ? post.content.substring(0, 120) + '...' : post.content}</p>
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="blog-link">Read More →</a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="resources-subscribe" id="subscribe">
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
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                className={`btn primary ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Subscribe'}
              </button>
            </div>
            {showThankYou && (
              <p className="thank-you-message">
                Thank you for subscribing! You'll receive our weekly insights shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPage;
