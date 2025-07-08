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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full mb-6">
            <Shield className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Trusted by Global Leaders</span>
          </div>
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
            Global Strategic
            <br />
            <span className="text-blue-600">Intelligence Platform</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform group-hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-6">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Central Intelligence Dashboard</h2>
                    <p className="text-blue-100 text-lg">Real-time analytics, strategic insights, and comprehensive market intelligence</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Global Reach</h3>
                <p className="text-2xl font-extrabold text-blue-600">79</p>
                <p className="text-sm text-slate-600">Countries</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Active Clients</h3>
                <p className="text-2xl font-extrabold text-emerald-600">150+</p>
                <p className="text-sm text-slate-600">Companies</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Market Value</h3>
                <p className="text-2xl font-extrabold text-purple-600">$2.5T+</p>
                <p className="text-sm text-slate-600">Addressed</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Success Rate</h3>
                <p className="text-2xl font-extrabold text-amber-600">94%</p>
                <p className="text-sm text-slate-600">Entry Success</p>
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
              className={`group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 transition-all duration-300 ${
                region.status === 'active' 
                  ? 'cursor-pointer hover:shadow-2xl hover:scale-[1.02] hover:bg-white/90' 
                  : 'opacity-70'
              }`}
            >
              {/* Gradient overlay for active regions */}
              {region.status === 'active' && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              )}
              
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full ${region.color} mr-4 shadow-md`}></div>
                    <h3 className="text-2xl font-bold text-slate-900">{region.name}</h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Countries</div>
                      <div className="text-lg font-bold text-slate-900">{region.countries}</div>
                    </div>
                    {region.status === 'coming-soon' && (
                      <span className="px-3 py-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-xs font-medium rounded-full border border-slate-300">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">{region.description}</p>
                
                {region.status === 'active' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium text-emerald-700">Active Platform</span>
                    </div>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
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