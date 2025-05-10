
import { useState } from 'react';
import { trackFormSubmission } from '../utils/analyticsUtils';
import { initialFormState } from '../components/webinar/constants';

export const useWebinarRegistration = (setErrorMessage) => {
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormState(prev => {
      if (checked) {
        return { ...prev, interests: [...prev.interests, value] };
      } else {
        return { ...prev, interests: prev.interests.filter(interest => interest !== value) };
      }
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Track form submission
      trackFormSubmission('webinar_registration', 'Webinar Demo');
      
      // In a real implementation, we would send this data to the backend
      console.log('Webinar registration submitted:', formState);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      
      // Reset form after successful submission
      setFormState(initialFormState);
      
    } catch (error) {
      console.error('Error submitting webinar registration:', error);
      setErrorMessage('Failed to submit your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState,
    isSubmitting,
    submitted,
    setSubmitted,
    handleChange,
    handleCheckboxChange,
    handleSubmit
  };
};
