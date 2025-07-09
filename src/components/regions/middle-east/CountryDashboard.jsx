import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Users, MapPin, TrendingUp, Calendar, Phone, Mail, ExternalLink } from 'lucide-react';
import { countries } from '../../../data/regions/middle-east/countries.json';

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

        {/* Key Metrics Grid */}
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

        {/* Key Opportunities Section */}
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

        {/* Market Intelligence Brief */}
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

        {/* Call to Action Section */}
        <div className="p-12 rounded-3xl text-center modern-glass-card" style={{ 
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color))',
          boxShadow: 'var(--shadow-2xl)'
        }}>
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Enter the {country.name} Market?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            Get personalized market entry strategy, regulatory guidance, and local partnership connections to ensure your success in {country.name}.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => navigate('/demo-scheduler')}
              className="group flex items-center px-8 py-4 bg-white text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ color: 'var(--primary-color)' }}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Free Consultation
            </button>
            
            <button 
              onClick={() => navigate('/contact')}
              className="group flex items-center px-8 py-4 border-2 border-white text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 text-white hover:bg-white/10"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Our Experts
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-white/80">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">+61 (0) 123 456 789</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm">expert@enteraustralia.tech</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDashboard;