
import React from 'react';

const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;
  
  return (
    <div className="error-message-container">
      <div className="error-message">
        <strong>Payment Error:</strong> {message}
        <button onClick={onDismiss} className="error-dismiss">×</button>
      </div>
    </div>
  );
};

export default ErrorMessage;
