
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/pricing.css';

// Initialize Stripe with the publishable key
const stripePromise = loadStripe('pk_live_51QdfYbD6fFdhmypR798NoSCJ4G9TGCkqw9QTuiDTkyvmn9tSrhey2n3cTHxjFG6GYDlcoBClLWsDN5Mgjb0tIfII00oVKQ67in');

// Define the product IDs and details in a constant to avoid repetition
const PRODUCTS = {
  ENTRY_KIT: {
    priceId: 'price_1R6NDED6fFdhmypRzqX57oPS',
    name: 'Entry Kit',
    isSubscription: false
  },
  GROWTH_PLAN: {
    priceId: 'price_1R7DVLD6fFdhmypRyEkK3z52',
    name: 'Growth Plan',
    isSubscription: true
  },
  PREMIUM_RETAINER: {
    priceId: 'price_1R6NEHD6fFdhmypRg6CN1BuQ',
    name: 'Premium Retainer',
    isSubscription: true
  }
};

const PricingSection = () => {
  const [isLoading, setIsLoading] = useState({
    [PRODUCTS.ENTRY_KIT.priceId]: false,
    [PRODUCTS.GROWTH_PLAN.priceId]: false,
    [PRODUCTS.PREMIUM_RETAINER.priceId]: false
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckout = async (product) => {
    const { priceId, name, isSubscription } = product;
    
    // Clear any previous errors
    setErrorMessage('');
    
    // Set loading state for the specific button
    setIsLoading(prev => ({ ...prev, [priceId]: true }));
    
    try {
      // Load Stripe safely with error handling
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
          priceId,
          productName: name,
          paymentType: isSubscription ? 'subscription' : 'one-time',
        }),
      });
      
      // Handle server errors with specific messages
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          throw new Error('Too many requests. Please try again in a few minutes.');
        } else if (response.status === 500) {
          throw new Error('Our payment system is temporarily unavailable. Please try again later.');
        } else {
          throw new Error(errorData.error || 'Something went wrong with the payment process.');
        }
      }
      
      // Parse the session data
      const session = await response.json();
      
      if (!session || !session.id) {
        throw new Error('Invalid checkout session received from server.');
      }
      
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
      // Show user-friendly error message
      setErrorMessage(
        error.message || 
        'There was an error processing your payment. Please try again or contact support.'
      );
      
      // Scroll to the error message to ensure it's visible
      setTimeout(() => {
        const errorElement = document.querySelector('.error-message');
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } finally {
      // Reset loading state for the specific button
      setIsLoading(prev => ({ ...prev, [priceId]: false }));
    }
  };

  const handleBookCall = () => {
    window.open('https://calendly.com/tech4humanity/30min', '_blank');
  };

  // Helper function to render the button text based on loading state
  const getButtonText = (product) => {
    if (isLoading[product.priceId]) {
      return "Processing...";
    }
    
    if (product.isSubscription) {
      return "Subscribe Now";
    }
    
    return "Buy Now";
  };

  return (
    <section id="pricing" className="pricing-section">
      <h2>Your Australian Edge, Priced to Win</h2>
      
      {/* Display error message prominently if there is one */}
      {errorMessage && (
        <div className="error-message-container">
          <div className="error-message">
            <strong>Payment Error:</strong> {errorMessage}
            <button onClick={() => setErrorMessage('')} className="error-dismiss">×</button>
          </div>
        </div>
      )}
      
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
            onClick={() => handleCheckout(PRODUCTS.ENTRY_KIT)} 
            className="pricing-cta" 
            disabled={isLoading[PRODUCTS.ENTRY_KIT.priceId]}
          >
            {getButtonText(PRODUCTS.ENTRY_KIT)}
          </button>
        </div>
        
        <div className="pricing-card">
          <div className="price-header">
            <h3>Growth Plan</h3>
            <div className="price">$5K</div>
            <p className="price-period">per month</p>
          </div>
          <p className="price-description">
            Monthly service to develop your Australian market presence with targeted government introductions.
          </p>
          <ul className="features">
            <li>Up to 2 govt department introductions monthly</li>
            <li>Virtual office in premium location</li>
            <li>Up to 2 in-person govt meetings monthly</li>
            <li>1 tender response support monthly</li>
            <li>1 local partner coordination</li>
            <li>Basic compliance guidance</li>
            <li>Monthly progress reporting</li>
          </ul>
          <button 
            onClick={() => handleCheckout(PRODUCTS.GROWTH_PLAN)} 
            className="pricing-cta"
            disabled={isLoading[PRODUCTS.GROWTH_PLAN.priceId]}
          >
            {getButtonText(PRODUCTS.GROWTH_PLAN)}
          </button>
        </div>
        
        <div className="pricing-card featured">
          <div className="popular-badge">POPULAR</div>
          <div className="price-header">
            <h3>Premium Retainer</h3>
            <div className="price">$15K</div>
            <p className="price-period">per month</p>
          </div>
          <p className="price-description">
            Comprehensive monthly service to actively pursue and win Australian government contracts.
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
          <button 
            onClick={() => handleCheckout(PRODUCTS.PREMIUM_RETAINER)} 
            className="pricing-cta"
            disabled={isLoading[PRODUCTS.PREMIUM_RETAINER.priceId]}
          >
            {getButtonText(PRODUCTS.PREMIUM_RETAINER)}
          </button>
        </div>
      </div>
      
      {/* Comparison table */}
      <div className="comparison">
        <h3>Comparison</h3>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Entry Kit ($5K)</th>
              <th>Growth Plan ($5K/mo)</th>
              <th>Premium Retainer ($15K/mo)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ABN Registration</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Office</td>
              <td>Virtual</td>
              <td>Virtual Premium</td>
              <td>Physical (as needed)</td>
            </tr>
            <tr>
              <td>Government Meetings</td>
              <td>1</td>
              <td>Up to 2 monthly</td>
              <td>Up to 4 monthly</td>
            </tr>
            <tr>
              <td>Tender Support</td>
              <td>Basic</td>
              <td>1 per month</td>
              <td>Up to 2 per month</td>
            </tr>
            <tr>
              <td>Local Partner Connections</td>
              <td>-</td>
              <td>1</td>
              <td>Up to 3</td>
            </tr>
            <tr>
              <td>Compliance Support</td>
              <td>-</td>
              <td>Basic</td>
              <td>Comprehensive</td>
            </tr>
            <tr>
              <td>Progress Reporting</td>
              <td>-</td>
              <td>Monthly</td>
              <td>Weekly & Monthly</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PricingSection;
