
import React, { useState } from 'react';
import { saveEmailSubscription } from '../utils/subscriptionUtils';
import '../styles/email-drip.css';

const EmailDripSignup = ({ tierName, setErrorMessage }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleEmailSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    try {
      const result = await saveEmailSubscription(email, `pricing_drip_${tierName.toLowerCase().replace(/\s+/g, '_')}`);
      
      if (result.success) {
        // Track the subscription event
        if (window.gtag) {
          window.gtag('event', 'email_subscribe', {
            'event_category': 'Lead Capture',
            'event_label': `${tierName} Drip Campaign`,
            'value': 1
          });
        }
        
        setShowSuccess(true);
        setEmail('');
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setErrorMessage('There was a problem with your subscription. Please try again.');
      }
    } catch (err) {
      console.error('Failed to submit subscription:', err);
      setErrorMessage('Subscription failed. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="email-drip-container">
      <div className="email-drip-content">
        <h3>Get Updates & Exclusive Insights</h3>
        <p>Subscribe to our {tierName} insights series - including case studies, implementation tips, and exclusive offers.</p>
        
        {!showSuccess ? (
          <form onSubmit={handleEmailSubscribe} className="email-drip-form">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="email-drip-btn"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        ) : (
          <div className="email-drip-success">
            <div className="checkmark">✓</div>
            <p>You're all set! Check your inbox for a welcome email.</p>
          </div>
        )}
        
        <p className="email-drip-privacy">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default EmailDripSignup;
