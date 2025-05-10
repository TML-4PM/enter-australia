
import React from 'react';
import { trackFormSubmission } from '../../utils/analyticsUtils';

const WebinarForm = ({ formState, handleChange, handleCheckboxChange, handleSubmit, isSubmitting, webinarTopics, timeSlots }) => {
  return (
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
  );
};

export default WebinarForm;
