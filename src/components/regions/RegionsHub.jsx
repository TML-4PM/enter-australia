import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, MapPin, Users, TrendingUp, BarChart3, ChevronRight, Zap, Shield, Target, ArrowRight } from 'lucide-react';
import middleEastImage from '../../assets/middle-east-region.jpg';
import asiaPacificImage from '../../assets/asia-pacific-region.jpg';
import europeImage from '../../assets/europe-region.jpg';
import americasImage from '../../assets/americas-region.jpg';

const RegionsHub = () => {
  const navigate = useNavigate();

  const regions = [
    {
      id: 'middle-east',
      name: 'Middle East',
      countries: 22,
      status: 'active',
      description: 'Strategic partnerships across 22 countries with comprehensive market intelligence',
      image: middleEastImage,
      route: '/regions/middle-east'
    },
    {
      id: 'asia-pacific',
      name: 'Asia Pacific',
      countries: 15,
      status: 'coming-soon',
      description: 'Technology-driven market entry strategies across emerging Asian markets',
      image: asiaPacificImage,
      route: null
    },
    {
      id: 'europe',
      name: 'Europe',
      countries: 30,
      status: 'coming-soon',
      description: 'European compliance and regulatory expertise for seamless market entry',
      image: europeImage,
      route: null
    },
    {
      id: 'americas',
      name: 'Americas',
      countries: 12,
      status: 'coming-soon',
      description: 'North and South American business development and partnership networks',
      image: americasImage,
      route: null
    }
  ];

  const handleRegionClick = (region) => {
    if (region.status === 'active' && region.route) {
      navigate(region.route);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--gray-50), var(--light-color))' }}>
      {/* Background Elements */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--gray-50), var(--light-color))' }}></div>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))' }}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-15" style={{ background: 'linear-gradient(135deg, var(--accent-color), var(--primary-color))' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(90deg, var(--secondary-light), var(--accent-light))' }}>
            <Globe className="w-4 h-4 mr-2" style={{ color: 'var(--secondary-color)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--primary-color)' }}>Global Intelligence Network</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight" style={{ 
            background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Regional Intelligence
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Navigate global markets with region-specific intelligence, strategic partnerships, and comprehensive market insights
          </p>
        </div>

        {/* Regional Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {regions.map((region) => (
            <div
              key={region.id}
              onClick={() => handleRegionClick(region)}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-300 modern-glass-card ${
                region.status === 'active' 
                  ? 'cursor-pointer hover:scale-[1.02] hover:shadow-xl' 
                  : 'opacity-80'
              }`}
              style={{ 
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
                boxShadow: 'var(--shadow-lg)',
                minHeight: '400px'
              }}
            >
              {/* Region Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={region.image} 
                  alt={`${region.name} region`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  {region.status === 'active' ? (
                    <div className="flex items-center px-3 py-1 rounded-full text-white text-xs font-bold" style={{ 
                      background: 'linear-gradient(135deg, var(--accent-color), var(--secondary-color))'
                    }}>
                      <Zap className="w-3 h-3 mr-1" />
                      ACTIVE
                    </div>
                  ) : (
                    <div className="px-3 py-1 rounded-full text-xs font-medium" style={{ 
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: 'var(--text-secondary)'
                    }}>
                      Coming Soon
                    </div>
                  )}
                </div>

                {/* Region Title Overlay */}
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{region.name}</h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{region.countries} Countries</span>
                  </div>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {region.description}
                </p>
                
                {region.status === 'active' ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Live Intelligence Hub</span>
                    </div>
                    <div className="flex items-center font-bold transition-all duration-300 group-hover:translate-x-1" style={{ color: 'var(--secondary-color)' }}>
                      <span className="mr-2">Explore Platform</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--gray-400)' }}></div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Platform in Development</span>
                    </div>
                    <div className="flex items-center font-medium" style={{ color: 'var(--text-muted)' }}>
                      <span>Notify Me</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Hover Gradient Overlay */}
              {region.status === 'active' && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                     style={{ background: 'linear-gradient(135deg, var(--secondary-light)/10, transparent, var(--accent-light)/10)' }}>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionsHub;