import React from 'react';
import aacciLogo from '../../../assets/aacci-logo.png';
import idExchangeLogo from '../../../assets/id-exchange-logo.jpg';

const PartnershipLogos = () => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl modern-glass-card" style={{ 
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div className="text-center mb-4 sm:mb-0">
          <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
            Strategic Intelligence Partners
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a 
            href="https://austarab.com.au/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group transition-all duration-300 hover:scale-105"
          >
            <img 
              src={aacciLogo} 
              alt="AACCI - Australian Arab Chamber of Commerce and Industry" 
              className="h-12 w-auto object-contain filter group-hover:brightness-110 transition-all duration-300"
            />
          </a>
          
          <div className="w-px h-8 hidden sm:block" style={{ backgroundColor: 'var(--gray-300)' }}></div>
          
          <a 
            href="https://idexchange.me/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group transition-all duration-300 hover:scale-105"
          >
            <img 
              src={idExchangeLogo} 
              alt="ID Exchange - Strategic Intelligence Platform" 
              className="h-12 w-auto object-contain filter group-hover:brightness-110 transition-all duration-300"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PartnershipLogos;