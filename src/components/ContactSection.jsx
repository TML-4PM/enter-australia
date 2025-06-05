
import React, { useState } from 'react';
import { Linkedin, Instagram, Facebook, Mail, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../utils/supabaseClient';
import '../styles/contact.css';

const ContactSection = () => {
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
      // Always use troy@tech4humanity.com.au as the recipient
      // but store info@enteraustralia.tech as the target for display
      const actualRecipientEmail = 'troy@tech4humanity.com.au';
      const displayEmail = 'info@enteraustralia.tech';
      
      // Save to Supabase leads table with original user email for tracking
      const { error } = await supabase
        .from('leads')
        .insert({
          name: formState.name,
          email: formState.email, // Store user's input for tracking
          target_email: actualRecipientEmail, // Store actual recipient
          display_email: displayEmail, // Store display email
          company: formState.company,
          service: formState.service,
          message: formState.message,
          source: 'contact_form'
        });
        
      if (error) {
        throw new Error(error.message);
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

  // Social media link handler
  const handleSocialClick = (platform) => {
    // These URLs would be replaced with actual social media profiles
    const socialUrls = {
      linkedin: 'https://www.linkedin.com/company/enteraustralia-tech',
      instagram: 'https://www.instagram.com/enteraustralia.tech',
      facebook: 'https://www.facebook.com/enteraustralia.tech',
      twitter: 'https://twitter.com/enteraustralia',
    };
    
    if (socialUrls[platform]) {
      window.open(socialUrls[platform], '_blank');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2>{t('contact.title')}</h2>
      <p className="contact-intro">{t('contact.subtitle')}</p>
      
      <div className="contact-container">
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
            <button type="submit" className="submit-btn" disabled={formStatus?.type === 'loading'}>
              {formStatus?.type === 'loading' ? t('contact.form.submitting') : t('contact.form.submit')}
            </button>
            
            {formStatus && (
              <div className={`alert ${formStatus.type === 'success' ? 'success' : 'error'}`}>
                {formStatus.message}
              </div>
            )}
          </form>
        </div>
        
        <div className="contact-info-container">
          <div className="calendly-container">
            <h3>{t('contact.meeting.title')}</h3>
            <div className="calendly-embed">
              <iframe 
                src="https://calendly.com/tech4humanity/30min" 
                width="100%" 
                height="650" 
                frameBorder="0"
                title="Calendly Scheduling"
              ></iframe>
            </div>
          </div>
          
          <div className="contact-details">
            <div className="contact-item">
              <Mail size={20} className="contact-icon" />
              <p>{t('contact.meeting.email')}</p>
            </div>
            <div className="social-links">
              <button onClick={() => handleSocialClick('linkedin')} aria-label="LinkedIn">
                <Linkedin size={24} />
              </button>
              <button onClick={() => handleSocialClick('instagram')} aria-label="Instagram">
                <Instagram size={24} />
              </button>
              <button onClick={() => handleSocialClick('facebook')} aria-label="Facebook">
                <Facebook size={24} />
              </button>
              <button onClick={() => handleSocialClick('twitter')} aria-label="Twitter">
                <Twitter size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
