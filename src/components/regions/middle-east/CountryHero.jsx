import React from 'react';
import { MapPin } from 'lucide-react';

const CountryHero = ({ country }) => (
  <div className="text-center mb-16">
    <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(90deg, var(--secondary-light), var(--accent-light))' }}>
      <MapPin className="w-4 h-4 mr-2" style={{ color: 'var(--secondary-color)' }} />
      <span className="text-sm font-medium" style={{ color: 'var(--primary-color)' }}>Market Entry Specialist</span>
    </div>
    
    <div className="flex items-center justify-center mb-6">
      <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mr-6 shadow-xl" style={{ 
        background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))',
        boxShadow: 'var(--shadow-xl)'
      }}>
        {country.code}
      </div>
      <div className="text-left">
        <h1 className="text-6xl font-extrabold mb-3 leading-tight" style={{ 
          background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color))`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {country.name}
        </h1>
        <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
          {country.capital} • Market Entry Hub
        </p>
      </div>
    </div>
    
    <p className="text-xl max-w-4xl mx-auto leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
      Unlock strategic partnerships and government contracts in {country.name} with our comprehensive market entry solutions and local expertise.
    </p>
  </div>
);

export default CountryHero;