
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { trackFormSubmission } from '../utils/analyticsUtils';
import '../styles/webinar-registration.css';

const WebinarRegistration = ({ setErrorMessage }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    interests: [],
    timePreference: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const webinarTopics = [
    { id: 'market-entry', label: 'Market Entry Strategy' },
    { id: 'govt-procurement', label: 'Government Procurement' },
    { id: 'compliance', label: 'Regulatory Compliance' },
    { id: 'partnerships', label: 'Local Partnerships' }
  ];
  
  const timeSlots = [
    { value: 'morning', label: 'Morning (9AM - 12PM AEST)' },
    { value: 'afternoon', label: 'Afternoon (1PM - 5PM AEST)' },
    { value: 'evening', label: 'Evening (6PM - 8PM AEST)' }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormState(prev => {
      if (checked) {
        return { ...prev, interests: [...prev.interests, value] };
      } else {
        return { ...prev, interests: prev.interests.filter(interest => interest !== value) };
      }
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Track form submission
      trackFormSubmission('webinar_registration', 'Webinar Demo');
      
      // In a real implementation, we would send this data to the backend
      console.log('Webinar registration submitted:', formState);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      
      // Reset form after successful submission
      setFormState({
        name: '',
        email: '',
        company: '',
        interests: [],
        timePreference: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting webinar registration:', error);
      setErrorMessage('Failed to submit your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="webinar-registration-container">
      <div className="webinar-registration-header">
        <Calendar className="webinar-icon" />
        <h3>Register for a Live Demonstration</h3>
        <p>Join our product specialists for a personalized walkthrough of our services and how they can help your business enter the Australian market.</p>
      </div>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="webinar-registration-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formState.company}
                onChange={handleChange}
                required
                placeholder="Your Company"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="timePreference">Preferred Time</label>
              <select
                id="timePreference"
                name="timePreference"
                value={formState.timePreference}
                onChange={handleChange}
                required
              >
                <option value="">Select a time slot</option>
                {timeSlots.map(slot => (
                  <option key={slot.value} value={slot.value}>{slot.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Topics of Interest (select all that apply)</label>
            <div className="checkbox-group">
              {webinarTopics.map(topic => (
                <div key={topic.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={topic.id}
                    name="interests"
                    value={topic.id}
                    checked={formState.interests.includes(topic.id)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={topic.id}>{topic.label}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Questions or Notes</label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Let us know any specific questions or topics you'd like covered"
              rows={3}
            />
          </div>
          
          <button 
            type="submit" 
            className="webinar-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register for Webinar'}
          </button>
        </form>
      ) : (
        <div className="webinar-success">
          <div className="webinar-success-icon">✓</div>
          <h3>Registration Successful!</h3>
          <p>Thank you for your interest in our webinar. You'll receive a confirmation email shortly with details about your scheduled demonstration.</p>
          <p>Our team will contact you within one business day to confirm your preferred time slot.</p>
          <button 
            className="register-another-btn" 
            onClick={() => setSubmitted(false)}
          >
            Register for Another Webinar
          </button>
        </div>
      )}
    </div>
  );
};

export default WebinarRegistration;
