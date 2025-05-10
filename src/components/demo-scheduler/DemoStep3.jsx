
import React from 'react';
import { Clock } from 'lucide-react';

// Step 3: Time Selection
const DemoStep3 = ({ formData, timeSlots, formatDate, handleTimeSelect, nextStep, prevStep }) => {
  return (
    <div className="scheduler-step">
      <h4>Select a Time <Clock size={16} /></h4>
      <p className="selected-date">Date: {formatDate(formData.date)}</p>
      <div className="time-selector">
        {timeSlots.map((time, index) => (
          <button
            key={index}
            className={`time-option ${formData.timeSlot === time ? 'selected' : ''}`}
            onClick={() => handleTimeSelect(time)}
          >
            {time}
          </button>
        ))}
      </div>
      
      <div className="scheduler-actions">
        <button className="scheduler-btn back" onClick={prevStep}>
          Back
        </button>
        <button 
          className="scheduler-btn next"
          onClick={nextStep}
          disabled={!formData.timeSlot}
        >
          Review
        </button>
      </div>
    </div>
  );
};

export default DemoStep3;
