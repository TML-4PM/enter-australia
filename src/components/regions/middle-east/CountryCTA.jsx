import React from 'react';
import { Calendar, Mail, Phone } from 'lucide-react';

const CountryCTA = ({ country, navigate }) => (
  <div className="p-12 rounded-3xl text-center modern-glass-card" style={{ 
    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color))',
    boxShadow: 'var(--shadow-2xl)'
  }}>
    <h2 className="text-4xl font-bold mb-6 text-white">
      Ready to Enter the {country.name} Market?
    </h2>
    <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
      Get personalized market entry strategy, regulatory guidance, and local partnership connections to ensure your success in {country.name}.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button 
        onClick={() => navigate('/demo-scheduler')}
        className="group flex items-center px-8 py-4 bg-white text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
        style={{ color: 'var(--primary-color)' }}
      >
        <Calendar className="w-5 h-5 mr-2" />
        Schedule Free Consultation
      </button>
      
      <button 
        onClick={() => navigate('/contact')}
        className="group flex items-center px-8 py-4 border-2 border-white text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 text-white hover:bg-white/10"
      >
        <Mail className="w-5 h-5 mr-2" />
        Contact Our Experts
      </button>
    </div>
    
    <div className="mt-8 flex items-center justify-center space-x-6 text-white/80">
      <div className="flex items-center">
        <Phone className="w-4 h-4 mr-2" />
        <span className="text-sm">+61 (0) 123 456 789</span>
      </div>
      <div className="flex items-center">
        <Mail className="w-4 h-4 mr-2" />
        <span className="text-sm">expert@enteraustralia.tech</span>
      </div>
    </div>
  </div>
);

export default CountryCTA;