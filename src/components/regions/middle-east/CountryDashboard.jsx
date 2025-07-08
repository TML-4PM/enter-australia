import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, User, Building, DollarSign, Users, MapPin } from 'lucide-react';
import StrategicNavigator from './StrategicNavigator';
import PartnershipLogos from './PartnershipLogos';
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
        <div className="relative mb-12">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mr-6 shadow-xl" style={{ 
                  background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))',
                  boxShadow: 'var(--shadow-xl)'
                }}>
                  {country.code}
                </div>
                <div>
                  <h1 className="text-5xl font-extrabold mb-3 leading-tight" style={{ 
                    background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {country.name}
                  </h1>
                  <p className="text-xl font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Strategic Partnership Navigator
                  </p>
                </div>
              </div>
              
              {isPrivate && customer && (
                <div className="inline-flex items-center px-6 py-3 rounded-2xl modern-glass-card" style={{ 
                  background: 'linear-gradient(135deg, var(--secondary-light), var(--accent-light))',
                  border: '1px solid var(--secondary-color)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <Lock className="w-5 h-5 mr-3" style={{ color: 'var(--secondary-color)' }} />
                  <div>
                    <div className="font-bold text-lg" style={{ color: 'var(--primary-color)' }}>Private Dashboard</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{customer.name}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Enhanced Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--primary-color))' }}>
                <DollarSign className="w-6 h-6" style={{ color: 'var(--white)' }} />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Gross Domestic Product</h3>
                <p className="text-3xl font-extrabold" style={{ color: 'var(--accent-color)' }}>{country.gdp}</p>
              </div>
            </div>
          </div>
          
          <div className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))' }}>
                <Users className="w-6 h-6" style={{ color: 'var(--white)' }} />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Population</h3>
                <p className="text-3xl font-extrabold" style={{ color: 'var(--secondary-color)' }}>{country.population}</p>
              </div>
            </div>
          </div>
          
          <div className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}>
                <Building className="w-6 h-6" style={{ color: 'var(--white)' }} />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Market Potential</h3>
                <p className="text-3xl font-extrabold" style={{ color: 'var(--primary-color)' }}>{country.marketPotential}</p>
              </div>
            </div>
          </div>
          
          <div className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card">
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                country.priority === 'high' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                country.priority === 'medium' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                'bg-gradient-to-br from-green-500 to-green-600'
              }`}>
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Priority Level</h3>
                <p className={`text-3xl font-extrabold capitalize ${
                  country.priority === 'high' ? 'text-red-600' :
                  country.priority === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {country.priority}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Opportunities Section */}
        <div className="p-8 rounded-3xl mb-12 modern-glass-card" style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
          boxShadow: 'var(--shadow-xl)'
        }}>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}>
              <MapPin className="w-6 h-6" style={{ color: 'var(--white)' }} />
            </div>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Key Market Opportunities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {country.opportunities.map((opportunity, idx) => (
              <div key={idx} className="group p-4 rounded-xl transition-all duration-300 hover:scale-105" style={{ 
                background: 'linear-gradient(135deg, var(--secondary-light), var(--accent-light))',
                border: '1px solid var(--gray-200)',
                boxShadow: 'var(--shadow-md)'
              }}>
                <span className="text-lg font-semibold" style={{ color: 'var(--secondary-color)' }}>
                  {opportunity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Navigator Component */}
        <div className="rounded-3xl overflow-hidden modern-glass-card" style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
          boxShadow: 'var(--shadow-xl)'
        }}>
          <StrategicNavigator 
            country={country}
            isPrivate={isPrivate}
            customer={customer}
          />
        </div>

        {/* Private Dashboard Additional Features */}
        {isPrivate && customer && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl modern-glass-card" style={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))' }}>
                  <User className="w-6 h-6" style={{ color: 'var(--white)' }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Customer Profile</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: 'var(--gray-200)' }}>
                  <span className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>Company Type</span>
                  <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{customer.type}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: 'var(--gray-200)' }}>
                  <span className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>Industry</span>
                  <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{customer.industry}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>Dashboard ID</span>
                  <span className="text-lg font-bold font-mono" style={{ color: 'var(--accent-color)' }}>{customer.id}</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl modern-glass-card" style={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}>
                  <Building className="w-6 h-6" style={{ color: 'var(--white)' }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Customized Insights</h3>
              </div>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  This dashboard is customized for your specific market entry strategy in <span className="font-bold" style={{ color: 'var(--primary-color)' }}>{country.name}</span>.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  All scenarios, initiatives, and recommendations are tailored to your <span className="font-bold" style={{ color: 'var(--secondary-color)' }}>industry</span> and <span className="font-bold" style={{ color: 'var(--accent-color)' }}>business model</span>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Partnership Footer */}
        <PartnershipLogos />
      </div>
    </div>
  );
};

export default CountryDashboard;