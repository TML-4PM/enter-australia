
import React from 'react';
import { Linkedin, Instagram, Facebook, Mail, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactInfo = () => {
  const { t } = useTranslation();

  // Social media link handler
  const handleSocialClick = (platform) => {
    // These URLs would be replaced with actual social media profiles
    const socialUrls = {
      linkedin: 'https://www.linkedin.com/company/enteraustralia-tech',
      instagram: 'https://www.instagram.com/enteraustralia.tech',
      facebook: 'https://www.facebook.com/enteraustralia.tech',
      twitter: 'https://twitter.com/enteraustralia',
    };
    
    if (socialUrls[platform]) {
      window.open(socialUrls[platform], '_blank');
    }
  };

  return (
    <div className="contact-details">
      <div className="contact-item">
        <Mail size={20} className="contact-icon" />
        <p>{t('contact.meeting.email')}</p>
      </div>
      <div className="social-links">
        <button onClick={() => handleSocialClick('linkedin')} aria-label="LinkedIn">
          <Linkedin size={24} />
        </button>
        <button onClick={() => handleSocialClick('instagram')} aria-label="Instagram">
          <Instagram size={24} />
        </button>
        <button onClick={() => handleSocialClick('facebook')} aria-label="Facebook">
          <Facebook size={24} />
        </button>
        <button onClick={() => handleSocialClick('twitter')} aria-label="Twitter">
          <Twitter size={24} />
        </button>
      </div>
    </div>
  );
};

export default ContactInfo;
