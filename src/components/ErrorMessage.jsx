
import React from 'react';
import '../styles/error-message.css';

const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;
  
  return (
    <div className="error-message-container">
      <div className="error-message">
        <div className="error-content">
          <strong>Payment Error:</strong> {message}
          <div className="error-help">
            If this error persists, please refresh the page or contact our support team.
          </div>
        </div>
        <button onClick={onDismiss} className="error-dismiss" aria-label="Dismiss error">×</button>
      </div>
    </div>
  );
};

export default ErrorMessage;
