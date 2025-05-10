
import React from 'react';

const WebinarSuccess = ({ setSubmitted }) => {
  return (
    <div className="webinar-success">
      <div className="webinar-success-icon">✓</div>
      <h3>Registration Successful!</h3>
      <p>Thank you for your interest in our webinar. You'll receive a confirmation email shortly with details about your scheduled demonstration.</p>
      <p>Our team will contact you within one business day to confirm your preferred time slot.</p>
      <button 
        className="register-another-btn" 
        onClick={() => setSubmitted(false)}
      >
        Register for Another Webinar
      </button>
    </div>
  );
};

export default WebinarSuccess;
