import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, DollarSign, ArrowLeft } from 'lucide-react';
import { countries } from '../../../data/regions/middle-east/countries.json';

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
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/regions')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Regions
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Middle East Strategic Hub</h1>
        <p className="text-gray-600">Navigate strategic partnerships across 22 Middle Eastern countries</p>
      </div>

      {/* Regional Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <MapPin className="w-6 h-6 text-amber-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">22 Countries</h3>
              <p className="text-sm text-gray-600">Active Markets</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">450M</h3>
              <p className="text-sm text-gray-600">Population</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="w-6 h-6 text-blue-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">$3.8T</h3>
              <p className="text-sm text-gray-600">Combined GDP</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-purple-600 rounded mr-3"></div>
            <div>
              <h3 className="text-lg font-semibold">95%</h3>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search countries or capitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries.map((country) => (
          <div
            key={country.id}
            onClick={() => handleCountryClick(country)}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                  {country.code}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{country.name}</h3>
                  <p className="text-sm text-gray-600">{country.capital}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                country.priority === 'high' ? 'bg-red-100 text-red-700' :
                country.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {country.priority} priority
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">GDP</span>
                <span className="font-medium">{country.gdp}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Population</span>
                <span className="font-medium">{country.population}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Market Potential</span>
                <span className="font-medium">{country.marketPotential}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Key Opportunities:</p>
              <div className="flex flex-wrap gap-1">
                {country.opportunities.slice(0, 3).map((opportunity, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                    {opportunity}
                  </span>
                ))}
                {country.opportunities.length > 3 && (
                  <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded">
                    +{country.opportunities.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  country.status === 'active' ? 'bg-green-500' :
                  country.status === 'developing' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}></div>
                <span className="text-sm text-gray-600 capitalize">{country.status}</span>
              </div>
              <button className="text-blue-600 font-medium text-sm hover:underline">
                Explore →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No countries found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default MiddleEastHub;