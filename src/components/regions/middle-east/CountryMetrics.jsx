import React from 'react';
import { DollarSign, Users, TrendingUp } from 'lucide-react';

const CountryMetrics = ({ country }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
    <div className="group p-8 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card text-center">
      <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--primary-color))' }}>
        <DollarSign className="w-8 h-8" style={{ color: 'var(--white)' }} />
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>GDP</h3>
      <p className="text-4xl font-extrabold mb-2" style={{ color: 'var(--accent-color)' }}>{country.gdp}</p>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Annual Economic Output</p>
    </div>
    
    <div className="group p-8 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card text-center">
      <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))' }}>
        <Users className="w-8 h-8" style={{ color: 'var(--white)' }} />
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Population</h3>
      <p className="text-4xl font-extrabold mb-2" style={{ color: 'var(--secondary-color)' }}>{country.population}</p>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total Market Size</p>
    </div>
    
    <div className="group p-8 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card text-center">
      <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}>
        <TrendingUp className="w-8 h-8" style={{ color: 'var(--white)' }} />
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Market Potential</h3>
      <p className="text-4xl font-extrabold mb-2" style={{ color: 'var(--primary-color)' }}>{country.marketPotential}</p>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Growth Opportunity</p>
    </div>
  </div>
);

export default CountryMetrics;