import React from 'react';
import aacciLogo from '../../../assets/aacci-logo.png';
import idExchangeLogo from '../../../assets/id-exchange-logo.jpg';

const PartnershipLogos = () => {
  return (
    <footer className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--gray-200)' }}>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-6">
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          In partnership with
        </span>
        
        <div className="flex items-center gap-6">
          <a 
            href="https://austarab.com.au/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group transition-all duration-300 hover:opacity-80"
          >
            <img 
              src={aacciLogo} 
              alt="AACCI - Australian Arab Chamber of Commerce and Industry" 
              className="h-8 w-auto object-contain opacity-70 group-hover:opacity-90 transition-all duration-300"
            />
          </a>
          
          <div className="w-px h-6" style={{ backgroundColor: 'var(--gray-300)' }}></div>
          
          <a 
            href="https://idexchange.me/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group transition-all duration-300 hover:opacity-80"
          >
            <img 
              src={idExchangeLogo} 
              alt="ID Exchange - Strategic Intelligence Platform" 
              className="h-8 w-auto object-contain opacity-70 group-hover:opacity-90 transition-all duration-300"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default PartnershipLogos;