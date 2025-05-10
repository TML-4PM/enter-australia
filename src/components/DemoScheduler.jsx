import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { trackFormSubmission } from '../utils/analyticsUtils';
import '../styles/demo-scheduler/index.css';

const DemoScheduler = ({ tierName = 'Product', setErrorMessage, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    date: '',
    timeSlot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Generate available dates (next 14 business days)
  const getAvailableDates = () => {
    const dates = [];
    const currentDate = new Date();
    
    while (dates.length < 14) {
      currentDate.setDate(currentDate.getDate() + 1);
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        dates.push(new Date(currentDate));
      }
    }
    
    return dates;
  };
  
  const availableDates = getAvailableDates();
  
  // Time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', 
    '03:00 PM', '04:00 PM'
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleDateSelect = (date) => {
    setFormData({
      ...formData,
      date: date.toISOString().split('T')[0]
    });
  };
  
  const handleTimeSelect = (time) => {
    setFormData({
      ...formData,
      timeSlot: time
    });
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Track form submission
      trackFormSubmission('demo_scheduling', tierName);
      
      // In a real implementation, we would send this data to a calendar API
      console.log('Demo scheduled:', { ...formData, tier: tierName });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      nextStep();
    } catch (error) {
      console.error('Error scheduling demo:', error);
      setErrorMessage('Failed to schedule your demo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-AU', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="demo-scheduler">
      <div className="demo-scheduler-header">
        <h3>Schedule a {tierName} Demo</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="demo-scheduler-content">
        {step === 1 && (
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
        )}
        
        {step === 2 && (
          <div className="scheduler-step">
            <h4>Select a Date <Calendar size={16} /></h4>
            <div className="date-selector">
              {availableDates.map((date, index) => (
                <button
                  key={index}
                  className={`date-option ${formData.date === date.toISOString().split('T')[0] ? 'selected' : ''}`}
                  onClick={() => handleDateSelect(date)}
                >
                  {date.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })}
                </button>
              ))}
            </div>
            
            <div className="scheduler-actions">
              <button className="scheduler-btn back" onClick={prevStep}>
                Back
              </button>
              <button 
                className="scheduler-btn next"
                onClick={nextStep}
                disabled={!formData.date}
              >
                Select Time
              </button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="scheduler-step">
            <h4>Select a Time <Clock size={16} /></h4>
            <p className="selected-date">Date: {formatDate(formData.date)}</p>
            <div className="time-selector">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  className={`time-option ${formData.timeSlot === time ? 'selected' : ''}`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            
            <div className="scheduler-actions">
              <button className="scheduler-btn back" onClick={prevStep}>
                Back
              </button>
              <button 
                className="scheduler-btn next"
                onClick={nextStep}
                disabled={!formData.timeSlot}
              >
                Review
              </button>
            </div>
          </div>
        )}
        
        {step === 4 && (
          <div className="scheduler-step">
            <h4>Confirm Your Demo</h4>
            <div className="demo-summary">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Company:</strong> {formData.company}</p>
              <p><strong>Date:</strong> {formatDate(formData.date)}</p>
              <p><strong>Time:</strong> {formData.timeSlot} AEST</p>
              <p><strong>Package:</strong> {tierName}</p>
            </div>
            
            <div className="scheduler-actions">
              <button className="scheduler-btn back" onClick={prevStep}>
                Back
              </button>
              <button 
                className="scheduler-btn confirm"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Scheduling...' : 'Confirm Demo'}
              </button>
            </div>
          </div>
        )}
        
        {step === 5 && (
          <div className="scheduler-step success">
            <div className="success-icon">✓</div>
            <h4>Demo Scheduled!</h4>
            <p>Your demo has been scheduled successfully.</p>
            <p>We've sent a calendar invitation to {formData.email}.</p>
            <p>A confirmation email with details has also been sent.</p>
            
            <div className="scheduler-actions">
              <button className="scheduler-btn close" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoScheduler;
