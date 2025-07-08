import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, User, Building } from 'lucide-react';
import StrategicNavigator from './StrategicNavigator';
import { countries } from '../../../data/regions/middle-east/countries.json';

const CountryDashboard = () => {
  const { countrySlug, customerId } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const foundCountry = countries.find(c => c.slug === countrySlug);
    setCountry(foundCountry);
    
    // Check if this is a private customer dashboard
    if (customerId) {
      setIsPrivate(true);
      // In a real app, fetch customer data from Supabase
      setCustomer({
        id: customerId,
        name: 'Confidential Client',
        type: 'Enterprise',
        industry: 'Technology'
      });
    }
  }, [countrySlug, customerId]);

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
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/regions/middle-east')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Middle East Hub
        </button>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg mr-4">
              {country.code}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{country.name}</h1>
              <p className="text-gray-600">Strategic Partnership Navigator</p>
            </div>
          </div>
          
          {isPrivate && customer && (
            <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
              <Lock className="w-4 h-4 text-blue-600 mr-2" />
              <div className="text-sm">
                <div className="font-medium text-blue-900">Private Dashboard</div>
                <div className="text-blue-600">{customer.name}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Country Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2">GDP</h3>
          <p className="text-2xl font-bold text-green-600">{country.gdp}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2">Population</h3>
          <p className="text-2xl font-bold text-blue-600">{country.population}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2">Market Potential</h3>
          <p className="text-2xl font-bold text-purple-600">{country.marketPotential}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2">Priority Level</h3>
          <p className={`text-2xl font-bold capitalize ${
            country.priority === 'high' ? 'text-red-600' :
            country.priority === 'medium' ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            {country.priority}
          </p>
        </div>
      </div>

      {/* Key Opportunities */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-bold mb-4">Key Market Opportunities</h2>
        <div className="flex flex-wrap gap-2">
          {country.opportunities.map((opportunity, idx) => (
            <span key={idx} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
              {opportunity}
            </span>
          ))}
        </div>
      </div>

      {/* Strategic Navigator Component */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <StrategicNavigator 
          country={country}
          isPrivate={isPrivate}
          customer={customer}
        />
      </div>

      {/* Private Dashboard Additional Features */}
      {isPrivate && customer && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold">Customer Profile</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Company Type:</span>
                <span className="font-medium">{customer.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Industry:</span>
                <span className="font-medium">{customer.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dashboard ID:</span>
                <span className="font-medium font-mono text-sm">{customer.id}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <Building className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="text-lg font-bold">Customized Insights</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                This dashboard is customized for your specific market entry strategy in {country.name}.
              </p>
              <p className="text-gray-600">
                All scenarios, initiatives, and recommendations are tailored to your industry and business model.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDashboard;