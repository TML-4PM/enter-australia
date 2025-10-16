
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../integrations/supabase/client';
import { handleRateLimitError, getRateLimitState, storeRateLimitState, calculateRetryTime } from '../../utils/rateLimitHandler';

const ContactForm = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [rateLimitInfo, setRateLimitInfo] = useState(null);
  
  // Check for existing rate limit on mount
  useEffect(() => {
    const existingLimit = getRateLimitState('contact-form');
    if (existingLimit) {
      setRateLimitInfo(existingLimit);
      setFormStatus({
        type: 'error',
        message: `${t('contact.status.rateLimited')} ${existingLimit.displayText}.`
      });
    }
  }, [t]);

  // Update countdown timer if rate limited
  useEffect(() => {
    if (!rateLimitInfo) return;

    const interval = setInterval(() => {
      const retryInfo = calculateRetryTime(rateLimitInfo.timestamp, rateLimitInfo.retryAfter);
      
      if (retryInfo.canRetry) {
        setRateLimitInfo(null);
        setFormStatus(null);
        clearInterval(interval);
      } else {
        setRateLimitInfo(prev => ({ ...prev, ...retryInfo }));
        setFormStatus({
          type: 'error',
          message: `${t('contact.status.rateLimited')} ${retryInfo.displayText}.`
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [rateLimitInfo, t]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formState.name.trim()) {
      newErrors.name = t('contact.validation.nameRequired');
    }
    
    if (!formState.email.trim()) {
      newErrors.email = t('contact.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = t('contact.validation.emailInvalid');
    }
    
    if (!formState.company.trim()) {
      newErrors.company = t('contact.validation.companyRequired');
    }
    
    if (!formState.service) {
      newErrors.service = t('contact.validation.serviceRequired');
    }
    
    if (!formState.message.trim()) {
      newErrors.message = t('contact.validation.messageRequired');
    } else if (formState.message.trim().length < 10) {
      newErrors.message = t('contact.validation.messageMinLength');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setFormStatus({ type: 'error', message: t('contact.validation.fixErrors') });
      return;
    }
    
    setFormStatus({ type: 'loading', message: t('contact.form.submitting') });
    
    try {
      // Save to Supabase leads table first
      const { error: leadError } = await supabase
        .from('leads')
        .insert({
          name: formState.name,
          email: formState.email,
          company: formState.company,
          service: formState.service,
          message: formState.message,
          source: 'contact_form'
        });
        
      if (leadError) {
        throw new Error(leadError.message);
      }

      // Send email notification via Edge Function
      const { error: emailError } = await supabase.functions.invoke('contact-email', {
        body: {
          name: formState.name,
          email: formState.email,
          company: formState.company,
          service: formState.service,
          message: formState.message
        }
      });

      if (emailError) {
        console.warn('Email sending failed, but lead was saved:', emailError);
        // Check if it's a rate limit error
        const rateLimitError = handleRateLimitError(emailError);
        if (rateLimitError.isRateLimited) {
          storeRateLimitState('contact-form', rateLimitError.retryAfter);
          setRateLimitInfo({
            timestamp: rateLimitError.timestamp,
            retryAfter: rateLimitError.retryAfter
          });
          setFormStatus({ type: 'error', message: rateLimitError.userMessage });
          return;
        }
        // Don't throw error - lead was saved successfully
      }
      
      setFormStatus({ type: 'success', message: t('contact.status.success') });
      setFormState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus({ type: 'error', message: t('contact.status.error') });
    }
  };

  return (
    <div className="contact-form-container">
      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            name="name" 
            placeholder={t('contact.form.namePlaceholder')} 
            required 
            value={formState.name}
            onChange={handleChange}
            className={errors.name ? 'error-input' : ''}
            aria-label={t('contact.aria.name')}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div className="form-group">
          <input 
            type="email" 
            name="email" 
            placeholder={t('contact.form.emailPlaceholder')} 
            required 
            value={formState.email}
            onChange={handleChange}
            className={errors.email ? 'error-input' : ''}
            aria-label={t('contact.aria.email')}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <input 
            type="text" 
            name="company" 
            placeholder={t('contact.form.companyPlaceholder')} 
            required 
            value={formState.company}
            onChange={handleChange}
            className={errors.company ? 'error-input' : ''}
            aria-label={t('contact.aria.company')}
          />
          {errors.company && <p className="error-text">{errors.company}</p>}
        </div>
        <div className="form-group">
          <select 
            name="service" 
            required 
            value={formState.service}
            onChange={handleChange}
            className={errors.service ? 'error-input' : ''}
            aria-label={t('contact.aria.service')}
          >
            <option value="" disabled>{t('contact.form.servicePlaceholder')}</option>
            <option value="entry-kit">{t('contact.services.entryKit')}</option>
            <option value="retainer">{t('contact.services.retainer')}</option>
            <option value="market-entry">{t('contact.services.marketEntry')}</option>
            <option value="govtech">{t('contact.services.govtech')}</option>
            <option value="partnerships">{t('contact.services.partnerships')}</option>
            <option value="compliance">{t('contact.services.compliance')}</option>
            <option value="other">{t('contact.services.other')}</option>
          </select>
          {errors.service && <p className="error-text">{errors.service}</p>}
        </div>
        <div className="form-group">
          <textarea 
            name="message" 
            placeholder={t('contact.form.messagePlaceholder')} 
            required 
            value={formState.message}
            onChange={handleChange}
            className={errors.message ? 'error-input' : ''}
            aria-label={t('contact.aria.message')}
          ></textarea>
          {errors.message && <p className="error-text">{errors.message}</p>}
        </div>
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={formStatus?.type === 'loading' || rateLimitInfo}
          title={rateLimitInfo ? `${t('contact.status.rateLimited')} ${rateLimitInfo.displayText}` : ''}
        >
          {formStatus?.type === 'loading' 
            ? t('contact.form.submitting') 
            : rateLimitInfo 
              ? `${t('contact.form.wait')} ${rateLimitInfo.displayText}` 
              : t('contact.form.submit')
          }
        </button>
        
        {formStatus && (
          <div className={`alert ${formStatus.type === 'success' ? 'success' : 'error'}`}>
            {formStatus.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
