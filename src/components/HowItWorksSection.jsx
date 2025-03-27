
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HowItWorksSection = () => {
  const [activeStory, setActiveStory] = useState(0);
  
  const successStories = [
    {
      company: "Red 6",
      description: "$5K got them RAAF-ready; $15K aims for $20M combat training simulation contract with the Royal Australian Air Force.",
    },
    {
      company: "Shield AI",
      description: "From zero presence to a $35M autonomous systems contract with the Australian Army in 90 days.",
    },
    {
      company: "Anduril",
      description: "Leveraged our $5K Entry Kit to establish presence and won a $150M drone contract within 6 months.",
    },
    {
      company: "Palantir",
      description: "Used our Premium Retainer to navigate complex agency relationships, resulting in a $75M data integration project.",
    }
  ];
  
  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % successStories.length);
  };
  
  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  return (
    <section id="how-it-works" className="how-it-works-section">
      <h2>From Zero to Aussie Wins in 30 Days</h2>
      <div className="steps-grid">
        <div className="step-card">
          <div className="step-number">1</div>
          <h3>Sign Up</h3>
          <p>$5K Kit—ABN, virtual office, intro pitch, capability brief development.</p>
          <ul className="feature-list">
            <li>Australian Business Number registration</li>
            <li>Virtual office in strategic location</li>
            <li>Localized marketing materials</li>
            <li>30-day initial market entry support</li>
          </ul>
        </div>
        <div className="step-card">
          <div className="step-number">2</div>
          <h3>Launch</h3>
          <p>We pitch Defence, ASIO, or Space Command with your capabilities.</p>
          <ul className="feature-list">
            <li>Introduction to your first government department</li>
            <li>Capability brief development tailored to Australian requirements</li>
            <li>Strategic guidance on positioning</li>
            <li>7-10 business days turnaround</li>
          </ul>
        </div>
        <div className="step-card">
          <div className="step-number">3</div>
          <h3>Win</h3>
          <p>Upgrade to $15K/month—lock in the contract with ongoing support.</p>
          <ul className="feature-list">
            <li>Up to 5 government department introductions monthly</li>
            <li>Physical office presence when needed</li>
            <li>In-person government meetings</li>
            <li>Tender response support</li>
          </ul>
        </div>
      </div>
      
      <div className="success-stories-container">
        <h3>Success Stories</h3>
        <div className="success-story-carousel">
          <button className="carousel-btn prev-btn" onClick={prevStory} aria-label="Previous story">
            &lt;
          </button>
          
          <div className="success-story">
            <h4>{successStories[activeStory].company}</h4>
            <p>{successStories[activeStory].description}</p>
            <div className="story-indicator">
              {successStories.map((_, index) => (
                <span 
                  key={index} 
                  className={`indicator ${index === activeStory ? 'active' : ''}`}
                  onClick={() => setActiveStory(index)}
                ></span>
              ))}
            </div>
          </div>
          
          <button className="carousel-btn next-btn" onClick={nextStory} aria-label="Next story">
            &gt;
          </button>
        </div>
      </div>
      
      <Link to="/pricing" className="cta">Start Now – $5K</Link>
    </section>
  );
};

export default HowItWorksSection;
