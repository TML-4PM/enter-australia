
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WebinarRegistration from './WebinarRegistration';
import ErrorMessage from './ErrorMessage';
import { trackPageView } from '../utils/analyticsUtils';
import { fetchLinkedInActivity } from '../utils/linkedinUtils';
import '../styles/webinar/index.css';

const WebinarPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [linkedInActivity, setLinkedInActivity] = useState([]);
  const [isCheckingLinkedIn, setIsCheckingLinkedIn] = useState(false);
  
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

  // Past webinars data
  const pastWebinars = [
    {
      id: 'pastweb001',
      title: 'Navigating Digital ID Requirements in Australia',
      date: 'April 18, 2025',
      time: '10:00 AM AEST',
      presenter: 'David Chen, Compliance Expert',
      description: 'Understanding the latest Digital ID framework and how it affects tech companies entering the Australian market.',
      recordingUrl: 'https://youtu.be/example-recording-1'
    },
    {
      id: 'pastweb002',
      title: 'R&D Tax Incentives for Tech Companies',
      date: 'March 25, 2025',
      time: '2:00 PM AEST',
      presenter: 'Emma Watson, Finance Specialist',
      description: 'Learn how to leverage Australia\'s generous R&D tax incentives to offset your market entry costs.',
      recordingUrl: 'https://youtu.be/example-recording-2'
    },
    {
      id: 'pastweb003',
      title: 'AUKUS Tech Opportunities Beyond Defense',
      date: 'February 12, 2025',
      time: '11:00 AM AEST',
      presenter: 'Dr. James Wilson, Strategic Advisor',
      description: 'Explore opportunities for tech companies in the AUKUS ecosystem beyond traditional defense applications.',
      recordingUrl: 'https://youtu.be/example-recording-3'
    },
    {
      id: 'pastweb004',
      title: 'Data Sovereignty Requirements for Government Contracts',
      date: 'January 28, 2025',
      time: '3:00 PM AEST',
      presenter: 'Sophie Martinez, Data Governance Expert',
      description: 'Understanding Australia\'s data sovereignty laws and how to structure your cloud infrastructure for compliance.',
      recordingUrl: 'https://youtu.be/example-recording-4'
    },
    {
      id: 'pastweb005',
      title: 'Critical Minerals Tech Stack Opportunities',
      date: 'December 10, 2024',
      time: '10:00 AM AEST',
      presenter: 'Robert Zhang, Industry Analyst',
      description: 'How tech companies can position their solutions to tap into Australia\'s $2B Critical Minerals Strategy.',
      recordingUrl: 'https://youtu.be/example-recording-5'
    }
  ];

  const checkLinkedInActivity = async () => {
    setIsCheckingLinkedIn(true);
    try {
      const activity = await fetchLinkedInActivity('theinnovater');
      setLinkedInActivity(activity);
    } catch (error) {
      console.error("Error fetching LinkedIn activity:", error);
      setErrorMessage("Failed to fetch LinkedIn activity. Please try again later.");
    } finally {
      setIsCheckingLinkedIn(false);
    }
  };

  // Check if a webinar has engagement based on LinkedIn activity
  const hasLinkedInEngagement = (webinarId) => {
    if (!linkedInActivity.length) return false;
    return linkedInActivity.some(activity => 
      activity.content && activity.content.includes(webinarId)
    );
  };

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
                  {hasLinkedInEngagement(webinar.id) && (
                    <span className="linkedin-engagement">
                      LinkedIn connection found
                    </span>
                  )}
                </div>
                <div className="webinar-card-actions">
                  <a href="#register" className="webinar-register-btn">Register Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="webinar-linkedin-section">
          <button 
            className="linkedin-check-btn" 
            onClick={checkLinkedInActivity}
            disabled={isCheckingLinkedIn}
          >
            {isCheckingLinkedIn ? 'Checking LinkedIn...' : 'Check LinkedIn Activity'}
          </button>
          <p className="linkedin-info">
            See if your LinkedIn connections have engaged with our webinars
          </p>
        </div>
        
        <div className="webinar-section past-webinars-section">
          <h2>Past Webinars</h2>
          <div className="webinar-list">
            {pastWebinars.map(webinar => (
              <div key={webinar.id} className="webinar-card past-webinar-card">
                <div className="webinar-card-content">
                  <h3>{webinar.title}</h3>
                  <div className="webinar-meta">
                    <span className="webinar-date">{webinar.date}</span>
                    <span className="webinar-time">{webinar.time}</span>
                  </div>
                  <p className="webinar-presenter">Presented by: {webinar.presenter}</p>
                  <p className="webinar-description">{webinar.description}</p>
                  {hasLinkedInEngagement(webinar.id) && (
                    <span className="linkedin-engagement">
                      LinkedIn connection found
                    </span>
                  )}
                </div>
                <div className="webinar-card-actions">
                  <a href={webinar.recordingUrl} target="_blank" rel="noopener noreferrer" className="webinar-recording-btn">Watch Recording</a>
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
