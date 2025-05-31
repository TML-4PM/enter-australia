
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Globe, Briefcase, Award } from 'lucide-react';
import '../styles/sections/regional-teasers.css';

const RegionalTeasersSection = () => {
  const regions = [
    {
      id: 'asia',
      title: 'Asia-Pacific Gateway',
      description: 'Leverage Singapore & Hong Kong as your launchpad into the dynamic Australian market with strategic trade partnerships.',
      icon: <Globe className="text-primary" />,
      features: ['VC Introductions', 'R&D Grant Access', 'Timezone Alignment'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'middleeast',
      title: 'Gulf-Gippsland Corridor', 
      description: 'Connect Dubai\'s innovation ecosystem with Melbourne\'s tech hub through sovereign wealth partnerships.',
      icon: <Award className="text-secondary" />,
      features: ['Sovereign Wealth Access', 'Expo Connections', 'Infrastructure Partnerships'],
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'us',
      title: 'Silicon Valley Bridge',
      description: 'Fast-track your AUKUS technology partnerships with defense procurement and cloud infrastructure access.',
      icon: <Briefcase className="text-accent" />,
      features: ['AUKUS Tech Access', 'AWS/Azure Partnerships', 'Security Clearance'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'europe',
      title: 'EU Innovation Alliance',
      description: 'Navigate GDPR compliance while accessing clean tech corridors and university research partnerships.',
      icon: <MapPin className="text-eucalyptus" />,
      features: ['GDPR Compliance', 'Clean Tech Focus', 'University Partnerships'],
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="regional-teasers-section">
      <div className="section-container">
        <h2>Your Regional Gateway to Australia</h2>
        <p className="section-intro">
          Strategic pathways from your region to Australian market success
        </p>
        
        <div className="regions-grid">
          {regions.map((region) => (
            <div key={region.id} className="region-card hover-card">
              <div className="region-image-container">
                <img 
                  src={region.image} 
                  alt={region.title}
                  className="region-image"
                />
                <div className="region-overlay">
                  <div className="region-icon">
                    {region.icon}
                  </div>
                </div>
              </div>
              
              <div className="region-content">
                <h3>{region.title}</h3>
                <p>{region.description}</p>
                
                <div className="region-features">
                  {region.features.map((feature, index) => (
                    <span key={index} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <Link to="/regions" className="region-link">
                  Explore Pathway
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cta-section">
          <h3>Ready to Connect Your Region?</h3>
          <p>Schedule a consultation to map your optimal market entry strategy</p>
          <Link to="/contact" className="btn primary large">
            Book Strategic Session
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegionalTeasersSection;
