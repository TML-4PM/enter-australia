import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, DollarSign, ArrowLeft } from 'lucide-react';
import { countries } from '../../../data/regions/middle-east/countries.json';
import PartnershipLogos from './PartnershipLogos';

const MiddleEastHub = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         country.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || country.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Countries', count: countries.length },
    { id: 'gcc', name: 'GCC States', count: countries.filter(c => c.category === 'gcc').length },
    { id: 'levant', name: 'Levant', count: countries.filter(c => c.category === 'levant').length },
    { id: 'north-africa', name: 'North Africa', count: countries.filter(c => c.category === 'north-africa').length }
  ];

  const handleCountryClick = (country) => {
    navigate(`/regions/middle-east/${country.slug}`);
  };

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
            onClick={() => navigate('/regions')}
            className="group flex items-center px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 modern-glass-card"
            style={{ color: 'var(--secondary-color)' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Regions</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(90deg, var(--secondary-light), var(--accent-light))' }}>
            <MapPin className="w-4 h-4 mr-2" style={{ color: 'var(--secondary-color)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--primary-color)' }}>Strategic Intelligence Hub</span>
          </div>
          <h1 className="text-6xl font-extrabold mb-6 leading-tight" style={{ 
            background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Middle East
            <br />
            <span style={{ color: 'var(--secondary-color)' }}>Strategic Hub</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Navigate strategic partnerships across 22 Middle Eastern countries with comprehensive market intelligence and data-driven insights.
          </p>
        </div>

        {/* Partnership Logos */}
        <PartnershipLogos />

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))' }}>
                <MapPin className="w-6 h-6" style={{ color: 'var(--white)' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Active Markets</h3>
                <p className="text-3xl font-extrabold" style={{ color: 'var(--secondary-color)' }}>22</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Countries</p>
              </div>
            </div>
          </div>
          
          <div className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--primary-color))' }}>
                <Users className="w-6 h-6" style={{ color: 'var(--white)' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Total Population</h3>
                <p className="text-3xl font-extrabold" style={{ color: 'var(--accent-color)' }}>450M</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>People</p>
              </div>
            </div>
          </div>
          
          <div className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}>
                <DollarSign className="w-6 h-6" style={{ color: 'var(--white)' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Combined GDP</h3>
                <p className="text-3xl font-extrabold" style={{ color: 'var(--primary-color)' }}>$3.8T</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>USD</p>
              </div>
            </div>
          </div>
          
          <div className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--secondary-color))' }}>
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: 'var(--white)' }}></div>
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Success Rate</h3>
                <p className="text-3xl font-extrabold" style={{ color: 'var(--accent-color)' }}>95%</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Entry Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search countries or capitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 text-lg rounded-2xl modern-glass-card transition-all duration-300 focus:scale-[1.02]"
                style={{ 
                  border: '2px solid var(--gray-200)',
                  color: 'var(--text-primary)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'text-white shadow-lg'
                    : 'modern-glass-card hover:shadow-md'
                }`}
                style={selectedCategory === category.id ? {
                  background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))',
                  boxShadow: 'var(--shadow-xl)'
                } : {
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--gray-200)'
                }}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Countries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              onClick={() => handleCountryClick(country)}
              className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02] modern-glass-card"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
                boxShadow: 'var(--shadow-lg)',
                minHeight: '320px'
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ 
                background: 'linear-gradient(135deg, var(--secondary-light), transparent, var(--accent-light))' 
              }}></div>
              
              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg" style={{ 
                      background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))'
                    }}>
                      {country.code}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{country.name}</h3>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{country.capital}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-xl text-xs font-bold ${
                    country.priority === 'high' ? 'bg-red-100 text-red-700' :
                    country.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {country.priority.toUpperCase()}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold" style={{ color: 'var(--accent-color)' }}>{country.gdp}</div>
                    <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>GDP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold" style={{ color: 'var(--secondary-color)' }}>{country.population}</div>
                    <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Population</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold" style={{ color: 'var(--primary-color)' }}>{country.marketPotential}</div>
                    <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Market</div>
                  </div>
                </div>

                {/* Opportunities */}
                <div className="mb-6">
                  <p className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Key Opportunities</p>
                  <div className="flex flex-wrap gap-2">
                    {country.opportunities.slice(0, 2).map((opportunity, idx) => (
                      <span key={idx} className="px-3 py-1 text-xs font-medium rounded-lg" style={{ 
                        background: 'linear-gradient(90deg, var(--secondary-light), var(--accent-light))',
                        color: 'var(--secondary-color)'
                      }}>
                        {opportunity}
                      </span>
                    ))}
                    {country.opportunities.length > 2 && (
                      <span className="px-3 py-1 text-xs font-medium rounded-lg" style={{ 
                        background: 'var(--gray-100)',
                        color: 'var(--text-muted)'
                      }}>
                        +{country.opportunities.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status and CTA */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      country.status === 'active' ? 'bg-green-500' :
                      country.status === 'developing' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}></div>
                    <span className="text-sm font-medium capitalize" style={{ color: 'var(--text-secondary)' }}>{country.status}</span>
                  </div>
                  <div className="flex items-center font-bold group-hover:translate-x-1 transition-transform" style={{ color: 'var(--secondary-color)' }}>
                    <span className="mr-2">Explore</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-6">
              <Search className="w-16 h-16 mx-auto" style={{ color: 'var(--text-muted)' }} />
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>No countries found</h3>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiddleEastHub;