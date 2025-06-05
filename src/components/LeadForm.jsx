
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { trackFormSubmission } from '../utils/analyticsUtils';

const LeadForm = ({ showLeadForm, toggleLeadForm, handleFormSubmit }) => {
  const { t } = useTranslation();
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
      newErrors.name = t('leadForm.validation.nameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('leadForm.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('leadForm.validation.emailInvalid');
    }
    
    if (!formData.company.trim()) {
      newErrors.company = t('leadForm.validation.companyRequired');
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
          aria-label={t('leadForm.aria.close')}
        >
          ×
        </button>
        <h2>{t('leadForm.title')}</h2>
        <form onSubmit={onSubmit} noValidate>
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              placeholder={t('leadForm.form.name')} 
              required 
              value={formData.name}
              onChange={handleChange}
              aria-label={t('leadForm.aria.name')}
              className={errors.name ? 'error-input' : ''}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              placeholder={t('leadForm.form.email')} 
              required 
              value={formData.email}
              onChange={handleChange}
              aria-label={t('leadForm.aria.email')}
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input 
              type="text" 
              name="company" 
              placeholder={t('leadForm.form.company')} 
              required 
              value={formData.company}
              onChange={handleChange}
              aria-label={t('leadForm.aria.company')}
              className={errors.company ? 'error-input' : ''}
            />
            {errors.company && <p className="error-text">{errors.company}</p>}
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('leadForm.form.submitting') : t('leadForm.form.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
