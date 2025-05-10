
import React from 'react';

// Step 5: Success
const DemoSuccess = ({ formData, onClose }) => {
  return (
    <div className="scheduler-step success">
      <div className="success-icon">✓</div>
      <h4>Demo Scheduled!</h4>
      <p>Your demo has been scheduled successfully.</p>
      <p>We've sent a calendar invitation to {formData.email}.</p>
      <p>A confirmation email with details has also been sent.</p>
      
      <div className="scheduler-actions">
        <button className="scheduler-btn close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DemoSuccess;
