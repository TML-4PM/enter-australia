
import React from 'react';

const DemoHeader = ({ tierName, onClose }) => {
  return (
    <div className="demo-scheduler-header">
      <h3>Schedule a {tierName} Demo</h3>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
};

export default DemoHeader;
