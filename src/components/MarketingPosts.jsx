
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Share2 } from 'lucide-react';
import { trackMarketingAction } from '../utils/analyticsUtils';
import '../styles/marketing-posts.css';

const MarketingPosts = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  // Marketing posts data with improved URLs
  const marketingPosts = [
    {
      id: 1,
      title: 'Launch Announcement',
      day: 'Day 1',
      content: `🔍 Deep Dive Now Live: From Free Assessment to Enterprise Scale
We've just published fully detailed blueprint pages & downloadable PDFs for all five Enter Australia packages—so you can see exactly what you get, how we deliver it, and the ROI you can expect.
👉 Assessment: Zero-cost market report & compliance toolkit
👉 Entry Kit (A$5 K): ABN setup, virtual office, your first gov intro
👉 Growth Plan (A$5 K/mo): 2× dept intros, 2 meetings, 1 tender + roadmap
👉 Premium Retainer (A$15 K/mo): 5 intros, 4 meetings, multiple tenders & on-demand support
👉 Enterprise (Custom): Unlimited scale, 24/7 SLA & dedicated team
👀 Explore the full details & download your PDF:
https://enteraustralia.tech/pricing?utm_source=linkedin&utm_medium=social&utm_campaign=launch
#MarketEntry #GovTech #Australia`,
      url: '/pricing'
    },
    {
      id: 2,
      title: 'Growth Plan Spotlight',
      day: 'Day 3',
      content: `🚀 Scale with Confidence: A$5 K/mo Growth Plan
Your Expansion Engine—it delivers:
• 2× Gov Dept Intros/mo (warm, pre-qualified)
• 2× In-person Meetings/mo (strategic locations)
• 1× Tender Response Support (end-to-end)
• Local Partner Coordination & Monthly Roadmap
Clients see 10–15% pipeline growth each month.
📥 Download the Growth Plan PDF to see the full process, SLAs & case study:
https://enteraustralia.tech/pricing/growth?utm_source=linkedin&utm_medium=social&utm_campaign=growth_spotlight
#ScaleUp #GovContracts #Expansion`,
      url: '/pricing/growth'
    },
    {
      id: 3,
      title: 'Premium & Enterprise Push',
      day: 'Day 5',
      content: `🏆 High-Touch or Fully Custom—Your Call
Premium Retainer (A$15 K/mo):
• 5× Dept Intros, 4× Meetings, 2× Tenders & 24/5 Slack/phone support (4 hr SLA)
• Monthly Exec Review + on-demand training
Enterprise (Custom):
• Unlimited intros/meetings/tenders + 24/7 dedicated team (<1 hr critical SLA)
• Weekly sprints, quarterly summits & bespoke integrations
📄 Grab your Premium PDF: https://enteraustralia.tech/pricing/premium-retainer?utm_source=linkedin&utm_medium=social&utm_campaign=premium
🤝 Enquire about Enterprise: https://enteraustralia.tech/pricing/enterprise?utm_source=linkedin&utm_medium=social&utm_campaign=enterprise
#Enterprise #MarketLeadership #GovTech`,
      url: '/pricing/premium-retainer'
    }
  ];

  // Handle copy to clipboard
  const handleCopy = (index) => {
    navigator.clipboard.writeText(marketingPosts[index].content);
    setCopiedIndex(index);
    
    // Track copy action
    trackMarketingAction('post_copy', marketingPosts[index].title);
    
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Handle social share
  const handleShare = (post) => {
    // Track share action
    trackMarketingAction('post_share', post.title);
    
    // Create the share URL (LinkedIn)
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://enteraustralia.tech${post.url}`)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  // Handle page view
  const handleView = (post) => {
    trackMarketingAction('post_page_view', post.title);
  };

  return (
    <div className="marketing-posts-container">
      <h2>Marketing Campaign Plan</h2>
      <p className="marketing-intro">Use these pre-written posts to promote your packages on social media.</p>
      
      <div className="limited-time-offer">
        <span className="offer-badge">Limited Time Offer</span>
        <p>Sign up before June 30th and receive a complimentary market positioning workshop (valued at A$2,500)</p>
      </div>
      
      <div className="posts-grid">
        {marketingPosts.map((post, index) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <h3>{post.title}</h3>
              <span className="post-day">{post.day}</span>
            </div>
            
            <div className="post-content">
              <pre>{post.content}</pre>
            </div>
            
            <div className="post-actions">
              <button 
                className="post-action-btn"
                onClick={() => handleCopy(index)}
                aria-label="Copy post content"
              >
                <Copy size={18} />
                <span>{copiedIndex === index ? 'Copied!' : 'Copy'}</span>
              </button>
              
              <button 
                className="post-action-btn share"
                onClick={() => handleShare(post)}
                aria-label="Share post"
              >
                <Share2 size={18} />
                <span>Share on LinkedIn</span>
              </button>
              
              <Link 
                to={post.url} 
                className="post-action-btn view"
                onClick={() => handleView(post)}
              >
                View Page
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="marketing-tips">
        <h3>Tips for Maximum Engagement</h3>
        <ul>
          <li>Use these posts across all your social channels (LinkedIn, Twitter, Facebook)</li>
          <li>Add relevant images to increase engagement (company logo, blueprint PDFs)</li>
          <li>Tag industry influencers to expand reach</li>
          <li>Respond promptly to comments and questions</li>
          <li>Track clicks with the included UTM parameters</li>
        </ul>
      </div>
      
      <div className="social-proof">
        <h3>Client Success Stories</h3>
        <div className="testimonial">
          "Using Enter Australia's Growth Plan, we secured our first government contract within 90 days of market entry."
          <span className="testimonial-source">— CTO, Leading UK Cybersecurity Firm</span>
        </div>
      </div>
    </div>
  );
};

export default MarketingPosts;
