
// Constants for the webinar registration form

export const webinarTopics = [
  { id: 'market-entry', label: 'Market Entry Strategy' },
  { id: 'govt-procurement', label: 'Government Procurement' },
  { id: 'compliance', label: 'Regulatory Compliance' },
  { id: 'partnerships', label: 'Local Partnerships' }
];

export const timeSlots = [
  { value: 'morning', label: 'Morning (9AM - 12PM AEST)' },
  { value: 'afternoon', label: 'Afternoon (1PM - 5PM AEST)' },
  { value: 'evening', label: 'Evening (6PM - 8PM AEST)' }
];

export const initialFormState = {
  name: '',
  email: '',
  company: '',
  interests: [],
  timePreference: '',
  message: ''
};
