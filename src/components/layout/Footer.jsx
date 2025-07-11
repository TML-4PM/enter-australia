
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { saveEmailSubscription } from '../../utils/subscriptionUtils';
import aacciLogo from '../../assets/aacci-logo.png';
import idExchangeLogo from '../../assets/id-exchange-logo.jpg';

const Footer = () => {
  const [emailSubscription, setEmailSubscription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  
  const handleFooterSubscribe = async (e) => {
    e.preventDefault();
    if (emailSubscription.trim() === '') return;
    
    setIsSubmitting(true);
    
    try {
      const result = await saveEmailSubscription(emailSubscription, 'footer');
      
      if (result.success) {
        setShowThankYou(true);
        setEmailSubscription('');
        setTimeout(() => setShowThankYou(false), 5000);
      } else {
        console.error('Error saving subscription:', result.error);
        alert('There was an issue with your subscription. Please try again.');
      }
    } catch (err) {
      console.error('Failed to submit subscription:', err);
      alert('Subscription failed. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Your trusted partner for Australian market entry and government contract success. We help global tech businesses navigate regulations and unlock growth.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com/in/theinnovater" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Linkedin size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Instagram size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Youtube size={20} />
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Solutions</h3>
          <ul>
            <li><Link to="/solutions/market-entry">Market Entry</Link></li>
            <li><Link to="/solutions/govtech">GovTech Procurement</Link></li>
            <li><Link to="/solutions/partnerships">Local Partnerships</Link></li>
            <li><Link to="/solutions/compliance">Compliance & Regulations</Link></li>
            <li><Link to="/solutions/grants">Grants & Incentives</Link></li>
            <li><Link to="/pricing">Pricing Plans</Link></li>
            <li><Link to="/opportunities">Current Opportunities</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><Link to="/resources#guides">Guides & Reports</Link></li>
            <li><Link to="/data-apis">Data APIs & Tools</Link></li>
            <li><Link to="/blog">Blog & Insights</Link></li>
            <li><Link to="/webinars">Webinars</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/regions">Regional Insights</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Account</h3>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/success">Order Success</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest market insights, tender alerts and industry updates.</p>
          <div className="footer-subscribe">
            <form className="footer-subscribe-form" onSubmit={handleFooterSubscribe}>
              <input 
                type="email" 
                placeholder="Your email address" 
                required
                value={emailSubscription}
                onChange={(e) => setEmailSubscription(e.target.value)}
                disabled={isSubmitting}
              />
              <button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? '...' : 'Subscribe'}
              </button>
            </form>
            {showThankYou && (
              <p className="thank-you-message">
                Thanks for subscribing! We'll keep you updated.
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="partnership-section">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4 border-b" style={{ borderColor: 'var(--gray-200)' }}>
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              In partnership with
            </span>
            
            <div className="flex items-center gap-6">
              <a 
                href="https://austarab.com.au/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:opacity-80"
              >
                <img 
                  src={aacciLogo} 
                  alt="AACCI - Australian Arab Chamber of Commerce and Industry" 
                  className="h-6 w-auto object-contain opacity-70 group-hover:opacity-90 transition-all duration-300"
                />
              </a>
              
              <div className="w-px h-4" style={{ backgroundColor: 'var(--gray-300)' }}></div>
              
              <a 
                href="https://idexchange.me/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:opacity-80"
              >
                <img 
                  src={idExchangeLogo} 
                  alt="ID Exchange - Strategic Intelligence Platform" 
                  className="h-6 w-auto object-contain opacity-70 group-hover:opacity-90 transition-all duration-300"
                />
              </a>
            </div>
          </div>
        </div>
        
        <div className="copyright">
          <p>© 2025 Enter Australia. All rights reserved. | enteraustralia.tech</p>
        </div>
        
        <div className="footer-legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/cookies">Cookie Policy</Link>
          <Link to="/sitemap">Sitemap</Link>
          <a href="https://tech4humanity.org" target="_blank" rel="noopener noreferrer">Tech 4 Humanity</a>
          <a href="https://holo-org.com" target="_blank" rel="noopener noreferrer">Holo-Org</a>
          <a href="https://augmentedhumanitycoach.com" target="_blank" rel="noopener noreferrer">Augmented Humanity Coach</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
