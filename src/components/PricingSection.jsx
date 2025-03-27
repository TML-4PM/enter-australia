
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const PricingSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyNow = async () => {
    setIsLoading(true);
    
    try {
      // Create checkout session with Stripe
      const stripe = await stripePromise;
      
      // Instead of a real backend, we're mocking this for demo purposes
      // In a real implementation, you would call your backend to create a checkout session
      setTimeout(async () => {
        // Simulate a successful checkout session creation
        const session = {
          id: 'cs_test_' + Math.random().toString(36).substr(2, 9)
        };
        
        // Redirect to checkout
        await stripe.redirectToCheckout({
          sessionId: session.id
        });
        
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error initiating checkout:", error);
      setIsLoading(false);
      alert("There was an error processing your payment. Please try again.");
    }
  };

  return (
    <section id="pricing" className="pricing-section">
      <h2>Your Australian Edge, Priced to Win</h2>
      <div className="pricing-grid">
        <div className="pricing-card">
          <div className="price-header">
            <h3>Entry Kit</h3>
            <div className="price">$5K</div>
            <p className="price-period">One-time payment</p>
          </div>
          <p className="price-description">
            One-time payment to establish your Australian presence and get your first government introduction.
          </p>
          <ul className="features">
            <li>Australian Business Number (ABN) registration</li>
            <li>Virtual office in strategic location</li>
            <li>Localized marketing materials</li>
            <li>Introduction to one government department</li>
            <li>Capability brief development</li>
            <li>30-day initial market entry support</li>
            <li>7-10 business days turnaround</li>
          </ul>
          <button 
            onClick={handleBuyNow} 
            className="pricing-cta" 
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Buy Now"}
          </button>
        </div>
        
        <div className="pricing-card featured">
          <div className="popular-badge">POPULAR</div>
          <div className="price-header">
            <h3>Retainer</h3>
            <div className="price">$15K</div>
            <p className="price-period">per month</p>
          </div>
          <p className="price-description">
            Monthly service to actively pursue and win Australian government contracts.
          </p>
          <ul className="features">
            <li>Up to 5 govt department introductions monthly</li>
            <li>Physical office presence when needed</li>
            <li>Up to 4 in-person govt meetings monthly</li>
            <li>Up to 2 tender responses monthly</li>
            <li>Up to 3 local partner coordination</li>
            <li>Tech & cybersecurity compliance support</li>
            <li>Weekly & monthly progress reporting</li>
          </ul>
          <a href="https://calendly.com/enteraustralia" target="_blank" rel="noopener noreferrer" className="pricing-cta">Book a Call</a>
        </div>
      </div>
      
      <div className="comparison">
        <h3>Comparison</h3>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Entry Kit ($5K)</th>
              <th>Retainer ($15K/mo)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ABN Registration</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Office</td>
              <td>Virtual</td>
              <td>Physical (as needed)</td>
            </tr>
            <tr>
              <td>Government Meetings</td>
              <td>1</td>
              <td>Up to 4 monthly</td>
            </tr>
            <tr>
              <td>Tender Support</td>
              <td>Basic</td>
              <td>Full (2 per month)</td>
            </tr>
            <tr>
              <td>Local Partner Connections</td>
              <td>-</td>
              <td>Up to 3</td>
            </tr>
            <tr>
              <td>Compliance Support</td>
              <td>-</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Progress Reporting</td>
              <td>-</td>
              <td>Weekly & Monthly</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PricingSection;
