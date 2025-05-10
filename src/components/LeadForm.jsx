
import React, { useState } from 'react';
import { trackFormSubmission } from '../utils/analyticsUtils';

const LeadForm = ({ showLeadForm, toggleLeadForm, handleFormSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [errors, setErrors] = useState({});

  if (!showLeadForm) return null;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Track the form submission
    trackFormSubmission('lead_form', 'Market Assessment');
    
    // Simulate API call with a timeout
    setTimeout(() => {
      handleFormSubmit(e);
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="lead-form-overlay">
      <div className="lead-form-container">
        <button 
          className="close-btn" 
          onClick={toggleLeadForm}
          aria-label="Close form"
        >
          ×
        </button>
        <h2>Get Your Free Market Assessment</h2>
        <form onSubmit={onSubmit} noValidate>
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required 
              value={formData.name}
              onChange={handleChange}
              aria-label="Your name"
              className={errors.name ? 'error-input' : ''}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              required 
              value={formData.email}
              onChange={handleChange}
              aria-label="Your email address"
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input 
              type="text" 
              name="company" 
              placeholder="Company Name" 
              required 
              value={formData.company}
              onChange={handleChange}
              aria-label="Your company name"
              className={errors.company ? 'error-input' : ''}
            />
            {errors.company && <p className="error-text">{errors.company}</p>}
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Get My Free Assessment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
