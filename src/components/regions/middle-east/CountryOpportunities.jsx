import React from 'react';

const CountryOpportunities = ({ country }) => (
  <div className="p-10 rounded-3xl mb-16 modern-glass-card" style={{ 
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
    boxShadow: 'var(--shadow-xl)'
  }}>
    <div className="text-center mb-10">
      <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Strategic Market Opportunities</h2>
      <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
        Identified high-potential sectors for Australian businesses entering the {country.name} market
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {country.opportunities.map((opportunity, idx) => (
        <div key={idx} className="group p-6 rounded-xl transition-all duration-300 hover:scale-105 text-center" style={{ 
          background: 'linear-gradient(135deg, var(--secondary-light), var(--accent-light))',
          border: '1px solid var(--gray-200)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ 
            background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))'
          }}>
            <span className="text-white font-bold text-lg">{idx + 1}</span>
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--secondary-color)' }}>
            {opportunity}
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Strategic partnership opportunity
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default CountryOpportunities;