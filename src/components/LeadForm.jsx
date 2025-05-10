
import React from 'react';

const LeadForm = ({ showLeadForm, toggleLeadForm, handleFormSubmit }) => {
  if (!showLeadForm) return null;
  
  return (
    <div className="lead-form-overlay">
      <div className="lead-form-container">
        <button className="close-btn" onClick={toggleLeadForm}>×</button>
        <h2>Get Your Free Market Assessment</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <input type="text" name="company" placeholder="Company Name" required />
          </div>
          <button type="submit" className="submit-btn">Get My Free Assessment</button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
