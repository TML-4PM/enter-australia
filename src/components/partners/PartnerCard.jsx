
import React from 'react';
import { LinkIcon } from 'lucide-react';
import '../../styles/partners/partner-card.css';

const PartnerCard = ({ partner }) => {
  return (
    <div className="partner-card">
      <div className="partner-logo">
        <img src={partner.logo_url} alt={`${partner.name} logo`} />
      </div>
      <h3>{partner.name}</h3>
      <div className="partner-category">{partner.category}</div>
      <p>{partner.description}</p>
      <div className="partner-details">
        <div className="partner-tags">
          {partner.industry && <span className="partner-industry">{partner.industry}</span>}
          {partner.specialty && <span className="partner-specialty">{partner.specialty}</span>}
        </div>
        {partner.website && (
          <a href={partner.website} target="_blank" rel="noopener noreferrer" className="partner-website">
            <LinkIcon size={16} /> Website
          </a>
        )}
      </div>
    </div>
  );
};

export default PartnerCard;
