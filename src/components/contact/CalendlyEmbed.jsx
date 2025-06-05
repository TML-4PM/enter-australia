
import React from 'react';
import { useTranslation } from 'react-i18next';

const CalendlyEmbed = () => {
  const { t } = useTranslation();

  return (
    <div className="calendly-container">
      <h3>{t('contact.meeting.title')}</h3>
      <div className="calendly-embed">
        <iframe 
          src="https://calendly.com/tech4humanity/30min" 
          width="100%" 
          height="650" 
          frameBorder="0"
          title="Calendly Scheduling"
        ></iframe>
      </div>
    </div>
  );
};

export default CalendlyEmbed;
