import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, MapPin, Users, TrendingUp, BarChart3, ChevronRight, Zap, Shield, Target } from 'lucide-react';

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
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--gray-50), var(--light-color))' }}>
      {/* Background Elements */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--gray-50), var(--light-color))' }}></div>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))' }}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-15" style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--primary-color))' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(90deg, var(--secondary-light), var(--accent-light))' }}>
            <Shield className="w-4 h-4 mr-2" style={{ color: 'var(--secondary-color)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--primary-color)' }}>Trusted by Global Leaders</span>
          </div>
          <h1 className="text-6xl font-extrabold mb-6 leading-tight" style={{ 
            background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Global Strategic
            <br />
            <span style={{ color: 'var(--secondary-color)' }}>Intelligence Platform</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Unlock cross-regional market insights, strategic partnerships, and data-driven intelligence 
            to accelerate your global expansion with confidence.
          </p>
        </div>

        {/* Central Dashboard CTA */}
        <div className="mb-16">
          <div 
            onClick={() => navigate('/regions/central-reporting')}
            className="group relative cursor-pointer"
          >
            <div className="absolute inset-0 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}></div>
            <div className="relative p-8 rounded-2xl transition-all duration-300 transform group-hover:scale-[1.02]" style={{ 
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <BarChart3 className="w-8 h-8" style={{ color: 'var(--white)' }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--white)' }}>Central Intelligence Dashboard</h2>
                    <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Real-time analytics, strategic insights, and comprehensive market intelligence</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-all" style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))' }}>
                <Globe className="w-6 h-6" style={{ color: 'var(--white)' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Global Reach</h3>
                <p className="text-2xl font-extrabold" style={{ color: 'var(--secondary-color)' }}>79</p>
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
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Active Clients</h3>
                <p className="text-2xl font-extrabold" style={{ color: 'var(--accent-color)' }}>150+</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Companies</p>
              </div>
            </div>
          </div>
          
          <div className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}>
                <TrendingUp className="w-6 h-6" style={{ color: 'var(--white)' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Market Value</h3>
                <p className="text-2xl font-extrabold" style={{ color: 'var(--primary-color)' }}>$2.5T+</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Addressed</p>
              </div>
            </div>
          </div>
          
          <div className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105 modern-glass-card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--secondary-color))' }}>
                <Target className="w-6 h-6" style={{ color: 'var(--white)' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Success Rate</h3>
                <p className="text-2xl font-extrabold" style={{ color: 'var(--accent-color)' }}>94%</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Entry Success</p>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regions.map((region) => (
            <div
              key={region.id}
              onClick={() => handleRegionClick(region)}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-300 modern-glass-card ${
                region.status === 'active' 
                  ? 'cursor-pointer hover:scale-[1.02]' 
                  : 'opacity-70'
              }`}
            >
              {/* Gradient overlay for active regions */}
              {region.status === 'active' && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, var(--secondary-light), transparent, var(--accent-light))' }}></div>
              )}
              
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full mr-4" style={{ backgroundColor: 'var(--secondary-color)', boxShadow: 'var(--shadow-md)' }}></div>
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{region.name}</h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Countries</div>
                      <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{region.countries}</div>
                    </div>
                    {region.status === 'coming-soon' && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ 
                        background: 'linear-gradient(90deg, var(--gray-100), var(--gray-200))',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--gray-300)'
                      }}>
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{region.description}</p>
                
                {region.status === 'active' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                      <span className="text-sm font-medium" style={{ color: 'var(--accent-color)' }}>Active Platform</span>
                    </div>
                    <div className="flex items-center font-semibold transition-colors" style={{ color: 'var(--secondary-color)' }}>
                      <span className="mr-2">Explore Intelligence</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionsHub;