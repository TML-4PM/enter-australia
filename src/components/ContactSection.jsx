
import React from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';
import CalendlyEmbed from './contact/CalendlyEmbed';
import '../styles/contact.css';

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="contact-section">
      <h2>{t('contact.title')}</h2>
      <p className="contact-intro">{t('contact.subtitle')}</p>
      
      <div className="contact-container">
        <ContactForm />
        
        <div className="contact-info-container">
          <CalendlyEmbed />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
