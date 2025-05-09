
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/about.css';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former Deputy Secretary at Australia's Department of Industry. 15 years experience in tech policy and international expansion.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Michael Wong",
      role: "Head of APAC Relations",
      bio: "Previously led Singapore's tech investment fund. Specialist in cross-border technology partnerships across the Asia-Pacific region.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Alex Rivera",
      role: "GovTech Partnerships Lead",
      bio: "10+ years in Australian government procurement. Expert in navigating complex tender processes for technology solutions.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Priya Patel",
      role: "FinTech & Regulatory Specialist",
      bio: "Former APRA regulator with deep experience in navigating compliance for digital banking and financial technology solutions.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
  ];
  
  const partners = [
    { name: "AWS", logo: "🔷" },
    { name: "Google Cloud", logo: "🔶" },
    { name: "Atlassian", logo: "🔵" },
    { name: "Microsoft", logo: "🟦" },
    { name: "Salesforce", logo: "☁️" },
    { name: "Deloitte", logo: "🔘" },
  ];
  
  return (
    <section id="about" className="about-page">
      <div className="about-hero">
        <h1>About enterAustralia</h1>
        <p>Making Australian market entry seamless for global tech innovators</p>
      </div>
      
      <div className="about-mission">
        <h2>Our Mission</h2>
        <p>Democratize Australian market entry by providing tech companies with the local knowledge, connections, and compliance expertise they need to succeed in one of the world's most stable and innovative economies.</p>
      </div>
      
      <div className="about-values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Trust</h3>
            <p>We build lasting relationships through transparency and delivers results.</p>
          </div>
          <div className="value-card">
            <h3>Speed</h3>
            <p>We move at tech pace, not government pace, accelerating your time-to-market.</p>
          </div>
          <div className="value-card">
            <h3>Local Expertise</h3>
            <p>Our team's deep understanding of the Australian tech ecosystem provides you with insider knowledge.</p>
          </div>
        </div>
      </div>
      
      <div className="about-team">
        <h2>Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="about-partners">
        <h2>Our Partners</h2>
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-logo">
              <span className="partner-icon">{partner.logo}</span>
              <span className="partner-name">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="about-cta">
        <h2>Ready to explore the Australian market?</h2>
        <Link to="/contact" className="btn primary">Get in Touch</Link>
      </div>
    </section>
  );
};

export default AboutPage;
