
import React from 'react';
import { useDemoScheduler } from '../../hooks/useDemoScheduler';
import DemoHeader from './DemoHeader';
import DemoStep1 from './DemoStep1';
import DemoStep2 from './DemoStep2';
import DemoStep3 from './DemoStep3';
import DemoStep4 from './DemoStep4';
import DemoSuccess from './DemoSuccess';

const DemoScheduler = ({ tierName = 'Product', setErrorMessage, onClose }) => {
  const {
    step,
    formData,
    isSubmitting,
    availableDates,
    timeSlots,
    handleInputChange,
    handleDateSelect,
    handleTimeSelect,
    nextStep,
    prevStep,
    handleSubmit,
    formatDate
  } = useDemoScheduler(tierName, setErrorMessage, onClose);

  return (
    <div className="demo-scheduler">
      <DemoHeader tierName={tierName} onClose={onClose} />
      
      <div className="demo-scheduler-content">
        {step === 1 && (
          <DemoStep1 
            formData={formData} 
            handleInputChange={handleInputChange} 
            nextStep={nextStep} 
          />
        )}
        
        {step === 2 && (
          <DemoStep2 
            formData={formData}
            availableDates={availableDates}
            handleDateSelect={handleDateSelect}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        
        {step === 3 && (
          <DemoStep3 
            formData={formData}
            timeSlots={timeSlots}
            formatDate={formatDate}
            handleTimeSelect={handleTimeSelect}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        
        {step === 4 && (
          <DemoStep4 
            formData={formData}
            tierName={tierName}
            formatDate={formatDate}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
          />
        )}
        
        {step === 5 && (
          <DemoSuccess formData={formData} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default DemoScheduler;
