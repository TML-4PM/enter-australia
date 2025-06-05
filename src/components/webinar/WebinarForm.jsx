
import React from 'react';
import { useTranslation } from 'react-i18next';
import { trackFormSubmission } from '../../utils/analyticsUtils';

const WebinarForm = ({ formState, handleChange, handleCheckboxChange, handleSubmit, isSubmitting, webinarTopics, timeSlots }) => {
  const { t } = useTranslation();
  
  return (
    <form onSubmit={handleSubmit} className="webinar-registration-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">{t('contact.form.name')}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            placeholder={t('contact.form.namePlaceholder')}
            aria-label={t('contact.aria.name')}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">{t('contact.form.email')}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            placeholder={t('contact.form.emailPlaceholder')}
            aria-label={t('contact.aria.email')}
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="company">{t('contact.form.company')}</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formState.company}
            onChange={handleChange}
            required
            placeholder={t('contact.form.companyPlaceholder')}
            aria-label={t('contact.aria.company')}
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
        <label htmlFor="message">{t('contact.form.message')}</label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          placeholder={t('contact.form.messagePlaceholder')}
          rows={3}
          aria-label={t('contact.aria.message')}
        />
      </div>
      
      <button 
        type="submit" 
        className="webinar-submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('contact.form.submitting') : 'Register for Webinar'}
      </button>
    </form>
  );
};

export default WebinarForm;
