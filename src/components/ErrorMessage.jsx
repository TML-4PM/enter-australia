
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/error-message.css';

const ErrorMessage = ({ message, onDismiss }) => {
  const { t } = useTranslation();
  
  if (!message) return null;
  
  return (
    <div className="error-message-container">
      <div className="error-message">
        <div className="error-content">
          <strong>{t('common.error')}:</strong> {message}
          <div className="error-help">
            If this error persists, please refresh the page or contact our support team.
          </div>
        </div>
        <button onClick={onDismiss} className="error-dismiss" aria-label={t('common.close')}>×</button>
      </div>
    </div>
  );
};

export default ErrorMessage;
