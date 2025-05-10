
import React from 'react';
import { webinarTopics, timeSlots } from './webinar/constants';
import { useWebinarRegistration } from '../hooks/useWebinarRegistration';
import WebinarHeader from './webinar/WebinarHeader';
import WebinarForm from './webinar/WebinarForm';
import WebinarSuccess from './webinar/WebinarSuccess';
import '../styles/webinar-registration.css';

const WebinarRegistration = ({ setErrorMessage }) => {
  const {
    formState,
    isSubmitting,
    submitted,
    setSubmitted,
    handleChange,
    handleCheckboxChange,
    handleSubmit
  } = useWebinarRegistration(setErrorMessage);
  
  return (
    <div className="webinar-registration-container">
      <WebinarHeader />
      
      {!submitted ? (
        <WebinarForm 
          formState={formState}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          webinarTopics={webinarTopics}
          timeSlots={timeSlots}
        />
      ) : (
        <WebinarSuccess setSubmitted={setSubmitted} />
      )}
    </div>
  );
};

export default WebinarRegistration;
