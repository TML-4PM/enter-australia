
import React from 'react';
import { Calendar } from 'lucide-react';

// Step 2: Date Selection
const DemoStep2 = ({ formData, availableDates, handleDateSelect, nextStep, prevStep }) => {
  return (
    <div className="scheduler-step">
      <h4>Select a Date <Calendar size={16} /></h4>
      <div className="date-selector">
        {availableDates.map((date, index) => (
          <button
            key={index}
            className={`date-option ${formData.date === date.toISOString().split('T')[0] ? 'selected' : ''}`}
            onClick={() => handleDateSelect(date)}
          >
            {date.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })}
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
          disabled={!formData.date}
        >
          Select Time
        </button>
      </div>
    </div>
  );
};

export default DemoStep2;
