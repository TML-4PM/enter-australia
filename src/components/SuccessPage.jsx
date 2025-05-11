
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../styles/success.css';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({
    steps: [],
    sessionId: sessionId || 'Not provided'
  });

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        setLoading(true);
        addDebugStep('Starting session verification');
        
        if (!sessionId) {
          throw new Error('No session ID provided');
        }
        
        addDebugStep(`Fetching session details for ID: ${sessionId.substring(0, 8)}...`);
        // Update to use Netlify function endpoint
        const response = await fetch(`/.netlify/functions/verify-session?session_id=${sessionId}`);
        
        addDebugStep(`Response status: ${response.status}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          addDebugStep(`Error response: ${JSON.stringify(errorData)}`);
          throw new Error(errorData.error || 'Failed to verify session');
        }
        
        const data = await response.json();
        addDebugStep(`Session verified successfully: ${JSON.stringify(data, null, 2)}`);
        setOrderDetails(data);
        
      } catch (error) {
        console.error('Error fetching order details:', error);
        addDebugStep(`Error: ${error.message}`);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      getOrderDetails();
    } else {
      setLoading(false);
      addDebugStep('No session ID provided in URL');
    }
  }, [sessionId]);

  const addDebugStep = (step) => {
    setDebugInfo(prev => ({
      ...prev,
      steps: [...prev.steps, `${new Date().toISOString().split('T')[1].split('.')[0]} - ${step}`]
    }));
  };

  if (loading) {
    return (
      <div className="success-container">
        <div className="success-card loading">
          <div className="loading-spinner"></div>
          <h2>Processing Your Order...</h2>
          <p>Please wait while we confirm your payment.</p>
          <div className="debug-info">
            <h4>Debug Information:</h4>
            <p><strong>Session ID:</strong> {debugInfo.sessionId}</p>
            <ul>
              {debugInfo.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!sessionId || error || !orderDetails?.success) {
    return (
      <div className="success-container">
        <div className="success-card error">
          <h2>Something Went Wrong</h2>
          <p>{error || "We couldn't find details for your order. Please contact our support team for assistance."}</p>
          <Link to="/pricing" className="back-button">Return to Pricing</Link>
          
          <div className="debug-info">
            <h4>Debug Information:</h4>
            <p><strong>Session ID:</strong> {debugInfo.sessionId}</p>
            <ul>
              {debugInfo.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Format the amount with currency symbol
  const formatAmount = () => {
    const amount = orderDetails.amount;
    const currency = orderDetails.currency || 'usd';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    });
    
    return formatter.format(amount);
  };
  
  // Format the payment type description
  const getPaymentDescription = () => {
    if (orderDetails.isSubscription) {
      return `${formatAmount()}/${orderDetails.interval || 'month'} subscription`;
    } else {
      return `${formatAmount()} one-time payment`;
    }
  };

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h2>Thank You for Your Order!</h2>
        <p>Your payment was successful and your order has been processed.</p>
        
        <div className="order-details">
          <h3>Order Details</h3>
          <p><strong>Product:</strong> {orderDetails.productName}</p>
          <p><strong>Amount:</strong> {getPaymentDescription()}</p>
          {orderDetails.isSubscription && (
            <p><strong>Billing:</strong> Recurring {orderDetails.interval || 'monthly'}</p>
          )}
          <p><strong>Status:</strong> <span className="status-paid">{orderDetails.paymentStatus}</span></p>
          <p><strong>Order ID:</strong> {sessionId.substring(0, 8)}...</p>
        </div>
        
        <p>Our team will reach out to you shortly to get started with your {orderDetails.productName} service.</p>
        
        <div className="next-steps">
          <h3>Next Steps</h3>
          <ol>
            <li>Check your email for a receipt and confirmation.</li>
            <li>Our team will contact you within 1 business day to set up an onboarding call.</li>
            <li>Get ready to enter the Australian market with our support!</li>
          </ol>
        </div>
        
        {orderDetails.isSubscription && (
          <div className="subscription-note">
            <p>As a subscriber, you'll receive priority support and regular updates on your Australian market entry progress.</p>
          </div>
        )}
        
        <div className="action-buttons">
          <Link to="/" className="back-button primary">Return to Home</Link>
          <Link to="/pricing" className="back-button secondary">View Other Plans</Link>
        </div>
        
        <div className="debug-info collapsible">
          <details>
            <summary>Debug Information (Click to expand)</summary>
            <p><strong>Session ID:</strong> {debugInfo.sessionId}</p>
            <p><strong>Response Data:</strong></p>
            <pre>{JSON.stringify(orderDetails, null, 2)}</pre>
            <h4>Process Steps:</h4>
            <ul>
              {debugInfo.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
