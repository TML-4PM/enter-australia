
import React, { useState } from 'react';
import { Linkedin, Instagram, Facebook, Mail, Phone } from 'lucide-react';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState(null);
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: 'loading', message: 'Sending your message...' });
    
    try {
      // Send email to troy@tech4humanity.com.au
      // This would typically be done through a server API
      // For demo purposes, we're simulating a successful submission
      console.log('Sending email to: troy@tech4humanity.com.au');
      console.log('Form data:', formState);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({ type: 'success', message: 'Message sent successfully! We will contact you shortly.' });
      setFormState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    }
  };

  // Social media link handler
  const handleSocialClick = (platform) => {
    // These URLs would be replaced with actual social media profiles
    const socialUrls = {
      linkedin: 'https://www.linkedin.com/company/enteraustralia-tech',
      instagram: 'https://www.instagram.com/enteraustralia.tech',
      facebook: 'https://www.facebook.com/enteraustralia.tech'
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
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                required 
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                name="company" 
                placeholder="Company Name" 
                required 
                value={formState.company}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <select 
                name="service" 
                required 
                value={formState.service}
                onChange={handleChange}
              >
                <option value="" disabled>Interested In</option>
                <option value="entry-kit">Entry Kit ($5K)</option>
                <option value="retainer">Retainer ($15K/month)</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <textarea 
                name="message" 
                placeholder="Your Message" 
                required 
                value={formState.message}
                onChange={handleChange}
              ></textarea>
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
              <p>Email: <a href="mailto:troy@tech4humanity.com.au">troy@tech4humanity.com.au</a></p>
            </div>
            <div className="contact-item">
              <Phone size={20} className="contact-icon" />
              <p>Phone: +61 2 1234 5678</p>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
