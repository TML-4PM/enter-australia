
import React, { useState } from 'react';

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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ type: 'loading', message: 'Sending your message...' });
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ type: 'success', message: 'Message sent successfully! We will contact you shortly.' });
      setFormState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Ready to Crack Australia? Let's Talk</h2>
      <p className="contact-intro">Fill out the form below, and our team will get back to you within 24 hours.</p>
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
      <div className="contact-details">
        <p>Email: info@enteraustralia.tech</p>
        <p>Phone: +61 2 1234 5678</p>
        <p>Twitter: @EnterAustralia</p>
      </div>
    </section>
  );
};

export default ContactSection;
