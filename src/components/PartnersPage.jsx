
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ModularPartnersPage from './partners/PartnersPage';

// This component redirects to the newer modular implementation
const PartnersPage = () => {
  useEffect(() => {
    console.log('Redirecting to modular partners page implementation');
  }, []);

  // We'll just render the modular version directly
  return <ModularPartnersPage />;
};

export default PartnersPage;
