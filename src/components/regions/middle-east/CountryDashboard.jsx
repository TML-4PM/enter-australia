import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { countries } from '../../../data/regions/middle-east/countries.json';
import CountryHero from './CountryHero';
import CountryMetrics from './CountryMetrics';
import CountryOpportunities from './CountryOpportunities';
import CountryMarketIntelligence from './CountryMarketIntelligence';
import CountryCTA from './CountryCTA';

const CountryDashboard = () => {
  const { countrySlug } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const foundCountry = countries.find(c => c.slug === countrySlug);
    setCountry(foundCountry);
  }, [countrySlug]);

  if (!country) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Country Not Found</h2>
          <p className="text-gray-600 mb-6">The requested country could not be found.</p>
          <button 
            onClick={() => navigate('/regions/middle-east')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Middle East Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--gray-50), var(--light-color))' }}>
      {/* Background Elements */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--gray-50), var(--light-color))' }}></div>
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))' }}></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-15" style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--primary-color))' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/regions/middle-east')}
            className="group flex items-center px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 modern-glass-card"
            style={{ color: 'var(--secondary-color)' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Middle East Hub</span>
          </button>
        </div>

        {/* Hero Section */}
        <CountryHero country={country} />

        {/* Key Metrics Grid */}
        <CountryMetrics country={country} />

        {/* Key Opportunities Section */}
        <CountryOpportunities country={country} />

        {/* Market Intelligence Brief */}
        <CountryMarketIntelligence country={country} />

        {/* Call to Action Section */}
        <CountryCTA country={country} navigate={navigate} />
      </div>
    </div>
  );
};

export default CountryDashboard;