import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lightbulb, 
  Users, 
  Zap, 
  Globe,
  Brain,
  Heart,
  Wifi,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  Monitor,
  Smartphone
} from 'lucide-react';
import { countries } from '../../data/regions/middle-east/countries.json';

const Tech4HumanityDashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Calculate Tech4Humanity specific metrics
  const techMetrics = {
    digitalTransformation: countries.filter(c => 
      c.opportunities.some(op => op.toLowerCase().includes('tech') || op.toLowerCase().includes('digital'))
    ).length,
    capacityBuilding: countries.filter(c => 
      c.opportunities.some(op => op.toLowerCase().includes('education') || op.toLowerCase().includes('healthcare'))
    ).length,
    innovationHubs: countries.filter(c => c.status === 'active' && c.priority === 'high').length,
    totalBeneficiaries: countries.reduce((sum, c) => {
      return sum + parseFloat(c.population.replace('M', ''));
    }, 0)
  };

  // Technology impact areas
  const impactAreas = [
    {
      title: 'Digital Infrastructure',
      description: 'Building connected communities across the Middle East',
      countries: 18,
      beneficiaries: '420M',
      projects: 45,
      icon: Wifi,
      color: 'blue',
      impact: 'High'
    },
    {
      title: 'Educational Technology',
      description: 'Transforming learning through Australian ed-tech solutions',
      countries: 16,
      beneficiaries: '89M',
      projects: 32,
      icon: GraduationCap,
      color: 'green',
      impact: 'Very High'
    },
    {
      title: 'Healthcare Innovation',
      description: 'Advancing medical care with smart health technologies',
      countries: 14,
      beneficiaries: '125M',
      projects: 28,
      icon: Heart,
      color: 'red',
      impact: 'Critical'
    },
    {
      title: 'Smart Cities',
      description: 'Creating sustainable urban environments for the future',
      countries: 12,
      beneficiaries: '67M',
      projects: 23,
      icon: Monitor,
      color: 'purple',
      impact: 'High'
    },
    {
      title: 'AgTech Solutions',
      description: 'Revolutionizing agriculture through technology innovation',
      countries: 15,
      beneficiaries: '156M',
      projects: 19,
      icon: Brain,
      color: 'orange',
      impact: 'High'
    },
    {
      title: 'Mobile Innovation',
      description: 'Expanding access through mobile-first technologies',
      countries: 20,
      beneficiaries: '380M',
      projects: 52,
      icon: Smartphone,
      color: 'teal',
      impact: 'Very High'
    }
  ];

  // Success stories from different countries
  const successStories = [
    {
      country: 'UAE',
      project: 'Smart Dubai Initiative',
      impact: '9.9M citizens connected',
      technology: 'IoT & AI Integration',
      partnership: 'Australia-UAE Tech Alliance'
    },
    {
      country: 'Saudi Arabia',
      project: 'NEOM Digital Twin',
      impact: 'Next-gen city planning',
      technology: 'Digital Twin Technology',
      partnership: 'Vision 2030 Collaboration'
    },
    {
      country: 'Egypt',
      project: 'New Capital EdTech',
      impact: '15M students reached',
      technology: 'Virtual Learning Platforms',
      partnership: 'Australia-Egypt Education MOU'
    },
    {
      country: 'Morocco',
      project: 'Renewable Energy Grid',
      impact: '37M people powered',
      technology: 'Smart Grid Technology',
      partnership: 'Morocco-Australia Energy Partnership'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 text-blue-900 bg-blue-50 border-blue-200',
      green: 'from-green-500 to-green-600 text-green-900 bg-green-50 border-green-200',
      red: 'from-red-500 to-red-600 text-red-900 bg-red-50 border-red-200',
      purple: 'from-purple-500 to-purple-600 text-purple-900 bg-purple-50 border-purple-200',
      orange: 'from-orange-500 to-orange-600 text-orange-900 bg-orange-50 border-orange-200',
      teal: 'from-teal-500 to-teal-600 text-teal-900 bg-teal-50 border-teal-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto p-6">
        {/* Tech4Humanity Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Tech4Humanity Middle East Initiative
              </h1>
              <p className="text-xl text-gray-600">Transforming Lives Through Australian Technology Innovation</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-500 mb-1">Impact Category</div>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="all">All Technologies</option>
                <option value="digital">Digital Infrastructure</option>
                <option value="health">Healthcare</option>
                <option value="education">Education</option>
                <option value="cities">Smart Cities</option>
              </select>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Total Beneficiaries</div>
                <div className="text-3xl font-bold text-gray-900">{techMetrics.totalBeneficiaries.toFixed(0)}M</div>
                <div className="text-sm text-green-600 font-medium">People Impacted</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Active Projects</div>
                <div className="text-3xl font-bold text-gray-900">199</div>
                <div className="text-sm text-blue-600 font-medium">Across 22 Countries</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Innovation Hubs</div>
                <div className="text-3xl font-bold text-gray-900">{techMetrics.innovationHubs}</div>
                <div className="text-sm text-orange-600 font-medium">Strategic Centers</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Global Reach</div>
                <div className="text-3xl font-bold text-gray-900">22</div>
                <div className="text-sm text-teal-600 font-medium">Countries Connected</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Technology Impact Areas */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Technology Impact Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactAreas.map((area, idx) => {
              const colorClass = getColorClasses(area.color);
              return (
                <div
                  key={idx}
                  className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center mr-4`}>
                      <area.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{area.title}</h3>
                      <div className={`text-sm font-medium px-2 py-1 rounded-full ${colorClass}`}>
                        {area.impact} Impact
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">{area.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-gray-900">{area.countries}</div>
                      <div className="text-xs text-gray-500">Countries</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{area.beneficiaries}</div>
                      <div className="text-xs text-gray-500">People</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{area.projects}</div>
                      <div className="text-xs text-gray-500">Projects</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-xl mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {successStories.map((story, idx) => (
              <div key={idx} className="p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{story.project}</h3>
                  <div className="text-sm font-medium text-blue-600">{story.country}</div>
                </div>
                <p className="text-gray-600 mb-3">{story.impact}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-purple-600 font-medium">{story.technology}</span>
                  <span className="text-gray-500">{story.partnership}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className="group bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-purple-700/10 p-8 rounded-3xl border border-purple-200/50 cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            onClick={() => navigate('/regions/central-reporting')}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-900">Impact Analytics</h3>
            </div>
            <p className="text-purple-700 leading-relaxed">Detailed performance metrics and outcome measurements across all projects</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-blue-700/10 p-8 rounded-3xl border border-blue-200/50">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900">Innovation Lab</h3>
            </div>
            <p className="text-blue-700 leading-relaxed mb-4">Access to cutting-edge Australian technologies and pilot programs</p>
            <div className="inline-block text-xs text-blue-700 bg-blue-200/80 px-3 py-1 rounded-full font-medium">Partner Access</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 via-green-600/5 to-green-700/10 p-8 rounded-3xl border border-green-200/50">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-900">Capacity Building</h3>
            </div>
            <p className="text-green-700 leading-relaxed mb-4">Training programs and knowledge transfer initiatives</p>
            <div className="inline-block text-xs text-green-700 bg-green-200/80 px-3 py-1 rounded-full font-medium">35 Programs Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tech4HumanityDashboard;