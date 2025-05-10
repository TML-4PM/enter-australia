
import React from 'react';

// Step 4: Confirmation
const DemoStep4 = ({ formData, tierName, formatDate, handleSubmit, prevStep, isSubmitting }) => {
  return (
    <div className="scheduler-step">
      <h4>Confirm Your Demo</h4>
      <div className="demo-summary">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Company:</strong> {formData.company}</p>
        <p><strong>Date:</strong> {formatDate(formData.date)}</p>
        <p><strong>Time:</strong> {formData.timeSlot} AEST</p>
        <p><strong>Package:</strong> {tierName}</p>
      </div>
      
      <div className="scheduler-actions">
        <button className="scheduler-btn back" onClick={prevStep}>
          Back
        </button>
        <button 
          className="scheduler-btn confirm"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Scheduling...' : 'Confirm Demo'}
        </button>
      </div>
    </div>
  );
};

export default DemoStep4;
