
import React from 'react';
import '../../styles/partners/featured-partners.css';

const FeaturedPartners = ({ featuredPartners, isLoading }) => {
  return (
    <div className="featured-partners">
      <h2>Featured Partners</h2>
      <p>Collaborating with industry leaders to deliver exceptional results</p>
      
      <div className="featured-partners-grid">
        {isLoading ? (
          <div className="loading">Loading featured partners...</div>
        ) : (
          featuredPartners.length > 0 ? (
            featuredPartners.map(partner => (
              <div key={partner.id} className="featured-partner-card">
                <div className="partner-logo">
                  <img src={partner.logo_url} alt={`${partner.name} logo`} />
                </div>
                <h3>{partner.name}</h3>
                <p>{partner.description}</p>
                <div className="partner-tags">
                  {partner.industry && <span className="partner-industry">{partner.industry}</span>}
                  {partner.partnership_level && (
                    <span className="partner-level">{partner.partnership_level}</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-partners">No featured partners to display.</div>
          )
        )}
      </div>
    </div>
  );
};

export default FeaturedPartners;
