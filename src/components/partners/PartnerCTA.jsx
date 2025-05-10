
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/partners/partner-cta.css';

const PartnerCTA = () => {
  // Inline styles as a fallback
  const ctaStyles = {
    container: {
      padding: '3rem 2rem',
      textAlign: 'center',
      borderRadius: '10px',
      backgroundColor: '#f5f5f5',
      margin: '4rem auto',
      maxWidth: '1200px'
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '1rem',
      color: '#00843D'
    },
    paragraph: {
      marginBottom: '2rem',
      maxWidth: '800px',
      margin: '0 auto 2rem'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap'
    }
  };

  return (
    <div className="partners-cta" style={ctaStyles.container}>
      <h2 style={ctaStyles.heading}>Become a Partner</h2>
      <p style={ctaStyles.paragraph}>Join our network of innovative companies shaping the future of technology in Australia</p>
      <div className="cta-buttons" style={ctaStyles.buttonContainer}>
        <Link to="/contact" className="btn primary">Apply to Partner With Us</Link>
        <Link to="/solutions/partnerships" className="btn secondary">Explore Partnership Solutions</Link>
      </div>
    </div>
  );
};

export default PartnerCTA;
