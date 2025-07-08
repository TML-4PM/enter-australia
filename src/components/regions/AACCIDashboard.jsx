import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HandHeart, 
  TrendingUp, 
  Users, 
  Building,
  ArrowRight,
  FileText,
  Calendar,
  Award,
  Handshake,
  Target
} from 'lucide-react';
import { countries } from '../../data/regions/middle-east/countries.json';

const AACCIDashboard = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('2024');

  // Filter Arab countries (exclude Israel, Cyprus, Turkey)
  const arabCountries = countries.filter(c => 
    !['israel', 'cyprus', 'turkey'].includes(c.id)
  );

  // Calculate AACCI-specific metrics
  const aacciMetrics = {
    memberCountries: arabCountries.filter(c => c.status === 'active').length,
    totalTradeValue: arabCountries.reduce((sum, c) => {
      const gdp = parseFloat(c.gdp.replace(/[$B]/g, ''));
      return sum + (gdp * 0.05); // Assume 5% trade with Australia
    }, 0),
    activePartnerships: arabCountries.filter(c => c.priority === 'high').length,
    potentialInvestment: arabCountries.reduce((sum, c) => {
      const gdp = parseFloat(c.gdp.replace(/[$B]/g, ''));
      return sum + (gdp * 0.02); // 2% potential Australian investment
    }, 0)
  };

  // Top performing partnerships
  const topPartnerships = arabCountries
    .filter(c => c.status === 'active' && c.priority === 'high')
    .sort((a, b) => parseFloat(b.gdp.replace(/[$B]/g, '')) - parseFloat(a.gdp.replace(/[$B]/g, '')))
    .slice(0, 6);

  // Regional focus areas for AACCI
  const focusAreas = [
    {
      title: 'Energy Transition',
      countries: arabCountries.filter(c => 
        c.opportunities.some(op => op.toLowerCase().includes('energy') || op.toLowerCase().includes('oil'))
      ).length,
      value: '$127B',
      trend: '+23%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Infrastructure Development',
      countries: arabCountries.filter(c => 
        c.opportunities.some(op => op.toLowerCase().includes('infrastructure') || op.toLowerCase().includes('cities'))
      ).length,
      value: '$89B',
      trend: '+18%',
      icon: Building,
      color: 'text-blue-600'
    },
    {
      title: 'Technology Transfer',
      countries: arabCountries.filter(c => 
        c.opportunities.some(op => op.toLowerCase().includes('tech') || op.toLowerCase().includes('digital'))
      ).length,
      value: '$45B',
      trend: '+34%',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      title: 'Healthcare & Education',
      countries: arabCountries.filter(c => 
        c.opportunities.some(op => op.toLowerCase().includes('health') || op.toLowerCase().includes('education'))
      ).length,
      value: '$32B',
      trend: '+15%',
      icon: HandHeart,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-400/20 to-red-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto p-6">
        {/* AACCI Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Arab Australian Chamber of Commerce & Industry
              </h1>
              <p className="text-xl text-gray-600">Strategic Partnership Dashboard & Intelligence Hub</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-500 mb-1">Reporting Period</div>
              <select 
                value={selectedTimeframe} 
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="2024">2024 YTD</option>
                <option value="2023">2023 Full Year</option>
                <option value="Q4-2024">Q4 2024</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key AACCI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Member Countries</div>
                <div className="text-3xl font-bold text-gray-900">{aacciMetrics.memberCountries}</div>
                <div className="text-sm text-green-600 font-medium">Active Partnerships</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Handshake className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Trade Value</div>
                <div className="text-3xl font-bold text-gray-900">${aacciMetrics.totalTradeValue.toFixed(0)}B</div>
                <div className="text-sm text-green-600 font-medium">+12% YoY</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Investment Pipeline</div>
                <div className="text-3xl font-bold text-gray-900">${aacciMetrics.potentialInvestment.toFixed(0)}B</div>
                <div className="text-sm text-orange-600 font-medium">Under Review</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Active Projects</div>
                <div className="text-3xl font-bold text-gray-900">{aacciMetrics.activePartnerships * 3}</div>
                <div className="text-sm text-blue-600 font-medium">Across {aacciMetrics.activePartnerships} Countries</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Strategic Focus Areas</h2>
            <div className="space-y-6">
              {focusAreas.map((area, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                      <area.icon className={`w-5 h-5 ${area.color}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{area.title}</div>
                      <div className="text-sm text-gray-600">{area.countries} countries involved</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{area.value}</div>
                    <div className={`text-sm font-medium ${area.color}`}>{area.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Top Strategic Partnerships</h2>
            <div className="space-y-4">
              {topPartnerships.map((country, idx) => (
                <div 
                  key={country.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/regions/middle-east/${country.slug}`)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{country.name}</div>
                      <div className="text-sm text-gray-600">{country.gdp} GDP • {country.marketPotential} Potential</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium text-blue-600">View Details</div>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Items & Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className="group bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-blue-700/10 p-8 rounded-3xl border border-blue-200/50 cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            onClick={() => navigate('/regions/central-reporting')}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900">Full Regional Report</h3>
            </div>
            <p className="text-blue-700 leading-relaxed">Access comprehensive analytics across all 22 Middle Eastern countries</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 via-green-600/5 to-green-700/10 p-8 rounded-3xl border border-green-200/50">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-900">Upcoming Events</h3>
            </div>
            <p className="text-green-700 leading-relaxed mb-4">AACCI Annual Conference, Trade Missions, and Business Forums</p>
            <div className="inline-block text-xs text-green-700 bg-green-200/80 px-3 py-1 rounded-full font-medium">3 Events This Month</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-purple-700/10 p-8 rounded-3xl border border-purple-200/50">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-900">Member Portal</h3>
            </div>
            <p className="text-purple-700 leading-relaxed mb-4">Exclusive access to trade opportunities and partnership networks</p>
            <div className="inline-block text-xs text-purple-700 bg-purple-200/80 px-3 py-1 rounded-full font-medium">Members Only</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AACCIDashboard;