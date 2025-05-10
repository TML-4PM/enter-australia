import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WebinarRegistration from './WebinarRegistration';
import ErrorMessage from './ErrorMessage';
import { trackPageView } from '../utils/analyticsUtils';
import '../styles/webinar/index.css';

const WebinarPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  
  // Track page view on component mount
  useEffect(() => {
    trackPageView('/webinars');
  }, []);

  // Upcoming webinars data
  const upcomingWebinars = [
    {
      id: 'web001',
      title: 'Australian GovTech Market Entry Masterclass',
      date: 'June 15, 2025',
      time: '10:00 AM AEST',
      presenter: 'Sarah Johnson, Market Entry Specialist',
      description: 'Learn the ins and outs of navigating the Australian government technology procurement landscape and positioning your solution effectively.'
    },
    {
      id: 'web002',
      title: 'Compliance Essentials for Foreign Tech Companies',
      date: 'June 22, 2025',
      time: '2:00 PM AEST',
      presenter: 'Michael Wong, Compliance Director',
      description: 'Understand the critical compliance requirements for international technology companies entering the Australian market.'
    },
    {
      id: 'web003',
      title: 'Building Successful Local Partnerships',
      date: 'July 8, 2025',
      time: '11:00 AM AEST',
      presenter: 'Jennifer Martinez, Partnership Manager',
      description: 'Discover strategies for identifying and developing powerful local partnerships to accelerate your growth in Australia.'
    }
  ];

  return (
    <div className="webinar-page">
      <div className="webinar-hero">
        <h1>Live Demonstrations & Webinars</h1>
        <p>Get personalized insights on Australian market entry from our experts</p>
      </div>
      
      <ErrorMessage 
        message={errorMessage} 
        onDismiss={() => setErrorMessage('')} 
      />
      
      <div className="webinar-content">
        <div className="webinar-section">
          <h2>Upcoming Webinars</h2>
          <div className="webinar-list">
            {upcomingWebinars.map(webinar => (
              <div key={webinar.id} className="webinar-card">
                <div className="webinar-card-content">
                  <h3>{webinar.title}</h3>
                  <div className="webinar-meta">
                    <span className="webinar-date">{webinar.date}</span>
                    <span className="webinar-time">{webinar.time}</span>
                  </div>
                  <p className="webinar-presenter">Presented by: {webinar.presenter}</p>
                  <p className="webinar-description">{webinar.description}</p>
                </div>
                <div className="webinar-card-actions">
                  <a href="#register" className="webinar-register-btn">Register Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div id="register" className="webinar-registration-section">
          <WebinarRegistration setErrorMessage={setErrorMessage} />
        </div>
        
        <div className="webinar-faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="webinar-faq-list">
            <div className="webinar-faq-item">
              <h3>How long are the demonstrations?</h3>
              <p>Our live demonstrations typically last 30-45 minutes, including time for Q&A.</p>
            </div>
            <div className="webinar-faq-item">
              <h3>Will I receive a recording if I can't attend?</h3>
              <p>Yes, we'll send a recording to all registered participants who couldn't attend live.</p>
            </div>
            <div className="webinar-faq-item">
              <h3>Is there a cost to attend webinars?</h3>
              <p>No, all our webinars and demonstrations are complimentary.</p>
            </div>
            <div className="webinar-faq-item">
              <h3>Can I request a private demonstration?</h3>
              <p>Absolutely! Select your preferred time slot in the registration form, and our team will arrange a private session for you.</p>
            </div>
          </div>
        </div>
        
        <div className="webinar-cta">
          <h2>Not sure which plan is right for you?</h2>
          <p>Compare our packages or schedule a consultation call to discuss your specific needs.</p>
          <div className="webinar-cta-buttons">
            <Link to="/pricing" className="primary-btn">View Pricing Plans</Link>
            <a href="#register" className="secondary-btn">Book a Consultation</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarPage;
