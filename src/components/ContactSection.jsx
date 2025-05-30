
import React, { useState } from 'react';
import { Linkedin, Instagram, Facebook, Mail, Twitter } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import '../styles/contact.css';

const ContactSection = () => {
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
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formState.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formState.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setFormStatus({ type: 'error', message: 'Please fix the errors above and try again.' });
      return;
    }
    
    setFormStatus({ type: 'loading', message: 'Sending your message...' });
    
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
      
      setFormStatus({ type: 'success', message: 'Message sent successfully! We will contact you within 24 hours.' });
      setFormState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus({ type: 'error', message: 'Failed to send message. Please try again or email us directly at info@enteraustralia.tech' });
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
      <h2>Ready to Crack Australia? Let's Talk</h2>
      <p className="contact-intro">Fill out the form below, and our team will get back to you within 24 hours.</p>
      
      <div className="contact-container">
        <div className="contact-form-container">
          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                required 
                value={formState.name}
                onChange={handleChange}
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
                value={formState.email}
                onChange={handleChange}
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
                value={formState.company}
                onChange={handleChange}
                className={errors.company ? 'error-input' : ''}
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
              >
                <option value="" disabled>Interested In</option>
                <option value="entry-kit">Entry Kit ($5K)</option>
                <option value="retainer">Retainer ($15K/month)</option>
                <option value="market-entry">Market Entry Strategy</option>
                <option value="govtech">Government Contracts</option>
                <option value="partnerships">Local Partnerships</option>
                <option value="compliance">Compliance & Regulations</option>
                <option value="other">Other</option>
              </select>
              {errors.service && <p className="error-text">{errors.service}</p>}
            </div>
            <div className="form-group">
              <textarea 
                name="message" 
                placeholder="Tell us about your Australian market goals and timeline" 
                required 
                value={formState.message}
                onChange={handleChange}
                className={errors.message ? 'error-input' : ''}
              ></textarea>
              {errors.message && <p className="error-text">{errors.message}</p>}
            </div>
            <button type="submit" className="submit-btn" disabled={formStatus?.type === 'loading'}>
              {formStatus?.type === 'loading' ? 'Sending...' : 'Send Message'}
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
            <h3>Schedule a Meeting</h3>
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
              <p>Email: <a href="mailto:info@enteraustralia.tech">info@enteraustralia.tech</a></p>
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
