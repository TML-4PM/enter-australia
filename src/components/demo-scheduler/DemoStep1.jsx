
import React from 'react';

// Step 1: User Information Form
const DemoStep1 = ({ formData, handleInputChange, nextStep }) => {
  return (
    <div className="scheduler-step">
      <h4>Your Information</h4>
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input 
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your name"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input 
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Your email"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="company">Company Name</label>
        <input 
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Your company"
          required
        />
      </div>
      
      <div className="scheduler-actions">
        <button 
          className="scheduler-btn next"
          onClick={nextStep}
          disabled={!formData.name || !formData.email || !formData.company}
        >
          Continue to Calendar
        </button>
      </div>
    </div>
  );
};

export default DemoStep1;
