import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

const CountryMarketIntelligence = ({ country }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
    <div className="p-8 rounded-3xl modern-glass-card" style={{ 
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
      boxShadow: 'var(--shadow-xl)'
    }}>
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}>
          <TrendingUp className="w-6 h-6" style={{ color: 'var(--white)' }} />
        </div>
        <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Market Intelligence</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2">
          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>Business Environment:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
            country.priority === 'high' ? 'bg-green-100 text-green-700' :
            country.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {country.priority === 'high' ? 'Excellent' : country.priority === 'medium' ? 'Good' : 'Developing'}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>Market Status:</span>
          <span className="font-bold capitalize" style={{ color: 'var(--primary-color)' }}>{country.status}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>Key Sectors:</span>
          <span className="font-bold" style={{ color: 'var(--secondary-color)' }}>{country.opportunities.length} Identified</span>
        </div>
      </div>
    </div>

    <div className="p-8 rounded-3xl modern-glass-card" style={{ 
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
      boxShadow: 'var(--shadow-xl)'
    }}>
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))' }}>
          <Calendar className="w-6 h-6" style={{ color: 'var(--white)' }} />
        </div>
        <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Next Steps</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center p-3 rounded-lg" style={{ background: 'var(--gray-50)' }}>
          <div className="w-2 h-2 rounded-full mr-3" style={{ background: 'var(--primary-color)' }}></div>
          <span style={{ color: 'var(--text-primary)' }}>Schedule market entry consultation</span>
        </div>
        <div className="flex items-center p-3 rounded-lg" style={{ background: 'var(--gray-50)' }}>
          <div className="w-2 h-2 rounded-full mr-3" style={{ background: 'var(--secondary-color)' }}></div>
          <span style={{ color: 'var(--text-primary)' }}>Review regulatory requirements</span>
        </div>
        <div className="flex items-center p-3 rounded-lg" style={{ background: 'var(--gray-50)' }}>
          <div className="w-2 h-2 rounded-full mr-3" style={{ background: 'var(--accent-color)' }}></div>
          <span style={{ color: 'var(--text-primary)' }}>Connect with local partners</span>
        </div>
      </div>
    </div>
  </div>
);

export default CountryMarketIntelligence;