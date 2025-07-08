import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, MapPin, Users, TrendingUp } from 'lucide-react';

const RegionsHub = () => {
  const navigate = useNavigate();

  const regions = [
    {
      id: 'middle-east',
      name: 'Middle East',
      countries: 22,
      status: 'active',
      description: 'Strategic partnerships across the Middle East region',
      color: 'bg-amber-500',
      textColor: 'text-amber-600'
    },
    {
      id: 'asia-pacific',
      name: 'Asia Pacific',
      countries: 15,
      status: 'coming-soon',
      description: 'Expanding into Asia-Pacific markets',
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      id: 'europe',
      name: 'Europe',
      countries: 30,
      status: 'coming-soon',
      description: 'European market entry strategies',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      id: 'americas',
      name: 'Americas',
      countries: 12,
      status: 'coming-soon',
      description: 'North and South American partnerships',
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  const handleRegionClick = (region) => {
    if (region.status === 'active') {
      navigate(`/regions/${region.id}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Global Strategic Intelligence</h1>
        <p className="text-gray-600">Regional market entry and partnership platforms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <Globe className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Global Reach</h3>
              <p className="text-sm text-gray-600">79 Countries</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Active Clients</h3>
              <p className="text-sm text-gray-600">150+ Companies</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Market Value</h3>
              <p className="text-sm text-gray-600">$2.5T+ Addressed</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <MapPin className="w-8 h-8 text-amber-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Success Rate</h3>
              <p className="text-sm text-gray-600">94% Entry Success</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regions.map((region) => (
          <div
            key={region.id}
            onClick={() => handleRegionClick(region)}
            className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all ${
              region.status === 'active' 
                ? 'cursor-pointer hover:shadow-md hover:border-gray-300' 
                : 'opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${region.color} mr-3`}></div>
                <h3 className="text-xl font-bold">{region.name}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{region.countries} countries</span>
                {region.status === 'coming-soon' && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{region.description}</p>
            {region.status === 'active' && (
              <div className="flex justify-end">
                <button className={`${region.textColor} font-medium text-sm hover:underline`}>
                  Explore Region →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionsHub;