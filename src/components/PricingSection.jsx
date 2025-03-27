
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/pricing.css';

// Initialize Stripe with the publishable key
const stripePromise = loadStripe('pk_test_51PD5QJFPBJZkDgtBDQPBY5rO0gHXEXwCGb7aDK12b5OZ5hJXzfFRW7kkMhXvVX2iIBQRNHfEg4nJvV1tzM7uBXjJ00g6e8iAFO');

const PricingSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBuyNow = async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error("Stripe hasn't loaded yet. Please try again in a moment.");
      }
      
      // Call your backend to create a checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_entry_kit', // This would be your actual Price ID from Stripe
          productName: 'Entry Kit',
          amount: 5000, // $5000 in cents
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong with the payment process.');
      }
      
      const session = await response.json();
      
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
      setErrorMessage(error.message || 'There was an error processing your payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookCall = () => {
    window.open('https://calendly.com/tech4humanity/30min', '_blank');
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
          {errorMessage && <div className="error-message">{errorMessage}</div>}
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
          <button onClick={handleBookCall} className="pricing-cta">Book a Call</button>
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
