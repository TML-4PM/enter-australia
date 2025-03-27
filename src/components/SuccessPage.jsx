
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../styles/success.css';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a production environment, you would verify the session with Stripe
    // For now, we'll just simulate success
    const getOrderDetails = async () => {
      try {
        setLoading(true);
        
        // For demonstration purposes, we're setting dummy data
        // In production, you would call your API to verify the session
        setTimeout(() => {
          setOrderDetails({
            success: true,
            product: sessionId?.includes('sub') ? 'Retainer' : 'Entry Kit',
            customerEmail: 'customer@example.com',
          });
          setLoading(false);
        }, 1500);
        
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    if (sessionId) {
      getOrderDetails();
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="success-container">
        <div className="success-card loading">
          <div className="loading-spinner"></div>
          <h2>Processing Your Order...</h2>
          <p>Please wait while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  if (!sessionId || !orderDetails?.success) {
    return (
      <div className="success-container">
        <div className="success-card error">
          <h2>Something Went Wrong</h2>
          <p>We couldn't find details for your order. Please contact our support team for assistance.</p>
          <Link to="/pricing" className="back-button">Return to Pricing</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h2>Thank You for Your Order!</h2>
        <p>Your payment was successful and your order has been processed.</p>
        
        <div className="order-details">
          <h3>Order Details</h3>
          <p><strong>Product:</strong> {orderDetails.product}</p>
          <p><strong>Order ID:</strong> {sessionId.substring(0, 8)}...</p>
        </div>
        
        <p>Our team will reach out to you shortly to get started with your {orderDetails.product}.</p>
        
        <div className="next-steps">
          <h3>Next Steps</h3>
          <ol>
            <li>Check your email for a receipt and confirmation.</li>
            <li>Our team will contact you within 1 business day to set up an onboarding call.</li>
            <li>Get ready to enter the Australian market with our support!</li>
          </ol>
        </div>
        
        <Link to="/" className="back-button">Return to Home</Link>
      </div>
    </div>
  );
};

export default SuccessPage;
