
import { useState } from 'react';
import { trackFormSubmission } from '../utils/analyticsUtils';

export const useDemoScheduler = (tierName, setErrorMessage, onClose) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    date: '',
    timeSlot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Generate available dates (next 14 business days)
  const getAvailableDates = () => {
    const dates = [];
    const currentDate = new Date();
    
    while (dates.length < 14) {
      currentDate.setDate(currentDate.getDate() + 1);
      
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        dates.push(new Date(currentDate));
      }
    }
    
    return dates;
  };
  
  const availableDates = getAvailableDates();
  
  // Time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', 
    '03:00 PM', '04:00 PM'
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleDateSelect = (date) => {
    setFormData({
      ...formData,
      date: date.toISOString().split('T')[0]
    });
  };
  
  const handleTimeSelect = (time) => {
    setFormData({
      ...formData,
      timeSlot: time
    });
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-AU', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Track form submission
      trackFormSubmission('demo_scheduling', tierName);
      
      // In a real implementation, we would send this data to a calendar API
      console.log('Demo scheduled:', { ...formData, tier: tierName });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      nextStep();
    } catch (error) {
      console.error('Error scheduling demo:', error);
      setErrorMessage('Failed to schedule your demo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
};
