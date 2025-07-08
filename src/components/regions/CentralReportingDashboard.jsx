import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  DollarSign, 
  Users, 
  AlertTriangle,
  Target,
  MapPin,
  Calendar,
  Filter
} from 'lucide-react';
import { countries } from '../../data/regions/middle-east/countries.json';

const CentralReportingDashboard = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('middle-east');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [timeRange, setTimeRange] = useState('current');

  // Calculate aggregate metrics
  const totalCountries = countries.length;
  const activeCountries = countries.filter(c => c.status === 'active').length;
  const highPriorityCountries = countries.filter(c => c.priority === 'high').length;
  const totalGDP = countries.reduce((sum, country) => {
    const gdpValue = parseFloat(country.gdp.replace(/[$B]/g, ''));
    return sum + gdpValue;
  }, 0);

  const regionStats = {
    gcc: countries.filter(c => c.category === 'gcc'),
    levant: countries.filter(c => c.category === 'levant'),
    northAfrica: countries.filter(c => c.category === 'north-africa'),
    other: countries.filter(c => c.category === 'other')
  };

  const priorityDistribution = {
    high: countries.filter(c => c.priority === 'high').length,
    medium: countries.filter(c => c.priority === 'medium').length,
    low: countries.filter(c => c.priority === 'low').length
  };

  const statusDistribution = {
    active: countries.filter(c => c.status === 'active').length,
    developing: countries.filter(c => c.status === 'developing').length,
    monitoring: countries.filter(c => c.status === 'monitoring').length
  };

  const MetricCard = ({ title, value, subtitle, icon: Icon, color, onClick }) => (
    <div 
      className={`group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${color.replace('text-', 'from-').replace('-600', '-500')} to-${color.replace('text-', '').replace('-600', '-600')} rounded-xl flex items-center justify-center mr-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-600 mb-1">{title}</h3>
          <div className="text-2xl font-bold text-slate-900">{value}</div>
          {subtitle && <div className="text-sm text-slate-500 mt-1">{subtitle}</div>}
        </div>
      </div>
    </div>
  );

  const RegionCard = ({ name, countries, totalGDP, activeCount }) => (
    <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-white/50 shadow-md hover:shadow-lg transition-all">
      <h4 className="font-bold text-slate-900 mb-3 text-lg">{name}</h4>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Countries</span>
          <span className="font-bold text-slate-900 text-lg">{countries.length}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Active</span>
          <span className="font-semibold text-emerald-600">{activeCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Combined GDP</span>
          <span className="font-semibold text-blue-600">${totalGDP.toFixed(0)}B</span>
        </div>
      </div>
    </div>
  );

  const TopCountryCard = ({ country, rank }) => (
    <div 
      className="group bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={() => navigate(`/regions/middle-east/${country.slug}`)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-sm mr-3 shadow-lg">
            {rank}
          </div>
          <div>
            <h4 className="font-bold text-slate-900">{country.name}</h4>
            <div className="text-sm text-slate-600">{country.capital}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-slate-500">GDP</span>
          <div className="font-bold text-blue-600">{country.gdp}</div>
        </div>
        <div>
          <span className="text-slate-500">Population</span>
          <div className="font-semibold text-slate-700">{country.population}</div>
        </div>
        <div>
          <span className="text-slate-500">Priority</span>
          <div className={`font-bold capitalize ${
            country.priority === 'high' ? 'text-red-600' :
            country.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {country.priority}
          </div>
        </div>
        <div>
          <span className="text-slate-500">Status</span>
          <div className="font-semibold text-emerald-600 capitalize">{country.status}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full mb-4">
            <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Live Intelligence</span>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Central Intelligence Dashboard
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">Global strategic intelligence and cross-regional analytics</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="relative">
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="appearance-none bg-white/80 backdrop-blur-sm px-6 py-3 pr-10 border border-white/50 rounded-xl shadow-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            >
              <option value="middle-east">Middle East</option>
              <option value="asia-pacific" disabled>Asia Pacific (Coming Soon)</option>
              <option value="europe" disabled>Europe (Coming Soon)</option>
              <option value="americas" disabled>Americas (Coming Soon)</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>

          <div className="relative">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-white/80 backdrop-blur-sm px-6 py-3 pr-10 border border-white/50 rounded-xl shadow-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            >
              <option value="current">Current Period</option>
              <option value="ytd">Year to Date</option>
              <option value="quarterly">Quarterly</option>
            </select>
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>

          <div className="relative">
            <select 
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="appearance-none bg-white/80 backdrop-blur-sm px-6 py-3 pr-10 border border-white/50 rounded-xl shadow-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            >
              <option value="all">All Metrics</option>
              <option value="economic">Economic</option>
              <option value="political">Political</option>
              <option value="market">Market Potential</option>
            </select>
            <BarChart3 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>
        </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Countries"
          value={totalCountries}
          subtitle="Middle East Region"
          icon={Globe}
          color="text-blue-600"
        />
        <MetricCard
          title="Active Markets"
          value={activeCountries}
          subtitle={`${Math.round((activeCountries/totalCountries)*100)}% coverage`}
          icon={Target}
          color="text-green-600"
        />
        <MetricCard
          title="Combined GDP"
          value={`$${totalGDP.toFixed(1)}T`}
          subtitle="Total addressable market"
          icon={DollarSign}
          color="text-purple-600"
        />
        <MetricCard
          title="High Priority"
          value={highPriorityCountries}
          subtitle="Strategic focus markets"
          icon={TrendingUp}
          color="text-amber-600"
        />
      </div>

        {/* Regional Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Regional Distribution</h2>
            <div className="grid grid-cols-2 gap-6">
              <RegionCard 
                name="GCC"
                countries={regionStats.gcc}
                totalGDP={regionStats.gcc.reduce((sum, c) => sum + parseFloat(c.gdp.replace(/[$B]/g, '')), 0)}
                activeCount={regionStats.gcc.filter(c => c.status === 'active').length}
              />
              <RegionCard 
                name="Levant"
                countries={regionStats.levant}
                totalGDP={regionStats.levant.reduce((sum, c) => sum + parseFloat(c.gdp.replace(/[$B]/g, '')), 0)}
                activeCount={regionStats.levant.filter(c => c.status === 'active').length}
              />
              <RegionCard 
                name="North Africa"
                countries={regionStats.northAfrica}
                totalGDP={regionStats.northAfrica.reduce((sum, c) => sum + parseFloat(c.gdp.replace(/[$B]/g, '')), 0)}
                activeCount={regionStats.northAfrica.filter(c => c.status === 'active').length}
              />
              <RegionCard 
                name="Other"
                countries={regionStats.other}
                totalGDP={regionStats.other.reduce((sum, c) => sum + parseFloat(c.gdp.replace(/[$B]/g, '')), 0)}
                activeCount={regionStats.other.filter(c => c.status === 'active').length}
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Market Analytics</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-4 text-lg text-slate-800">Priority Distribution</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">High Priority</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-slate-200 rounded-full h-3 mr-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full shadow-sm" style={{ width: `${(priorityDistribution.high/totalCountries)*100}%` }}></div>
                      </div>
                      <span className="text-sm font-bold text-slate-900 min-w-[2rem]">{priorityDistribution.high}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">Medium Priority</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-slate-200 rounded-full h-3 mr-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full shadow-sm" style={{ width: `${(priorityDistribution.medium/totalCountries)*100}%` }}></div>
                      </div>
                      <span className="text-sm font-bold text-slate-900 min-w-[2rem]">{priorityDistribution.medium}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">Low Priority</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-slate-200 rounded-full h-3 mr-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full shadow-sm" style={{ width: `${(priorityDistribution.low/totalCountries)*100}%` }}></div>
                      </div>
                      <span className="text-sm font-bold text-slate-900 min-w-[2rem]">{priorityDistribution.low}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4 text-lg text-slate-800">Market Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">Active</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-slate-200 rounded-full h-3 mr-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full shadow-sm" style={{ width: `${(statusDistribution.active/totalCountries)*100}%` }}></div>
                      </div>
                      <span className="text-sm font-bold text-slate-900 min-w-[2rem]">{statusDistribution.active}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">Developing</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-slate-200 rounded-full h-3 mr-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm" style={{ width: `${(statusDistribution.developing/totalCountries)*100}%` }}></div>
                      </div>
                      <span className="text-sm font-bold text-slate-900 min-w-[2rem]">{statusDistribution.developing}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">Monitoring</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-slate-200 rounded-full h-3 mr-3 overflow-hidden">
                        <div className="bg-gradient-to-r from-slate-500 to-slate-600 h-3 rounded-full shadow-sm" style={{ width: `${(statusDistribution.monitoring/totalCountries)*100}%` }}></div>
                      </div>
                      <span className="text-sm font-bold text-slate-900 min-w-[2rem]">{statusDistribution.monitoring}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-xl mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Top Strategic Markets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {countries
              .filter(c => c.priority === 'high' && c.status === 'active')
              .sort((a, b) => parseFloat(b.gdp.replace(/[$B]/g, '')) - parseFloat(a.gdp.replace(/[$B]/g, '')))
              .slice(0, 5)
              .map((country, idx) => (
                <TopCountryCard key={country.id} country={country} rank={idx + 1} />
              ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className="group bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-blue-700/10 p-8 rounded-3xl border border-blue-200/50 cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            onClick={() => navigate('/regions/middle-east')}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900">Explore Middle East</h3>
            </div>
            <p className="text-blue-700 leading-relaxed">Access individual country strategic navigators and detailed market analysis</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-purple-700/10 p-8 rounded-3xl border border-purple-200/50">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-900">Advanced Analytics</h3>
            </div>
            <p className="text-purple-700 leading-relaxed mb-4">Cross-country comparisons, market modeling, and predictive insights</p>
            <div className="inline-block text-xs text-purple-700 bg-purple-200/80 px-3 py-1 rounded-full font-medium">Coming Soon</div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-600/5 to-emerald-700/10 p-8 rounded-3xl border border-emerald-200/50">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-emerald-900">Customer Portal</h3>
            </div>
            <p className="text-emerald-700 leading-relaxed mb-4">Access private dashboards and customized strategic intelligence</p>
            <div className="inline-block text-xs text-emerald-700 bg-emerald-200/80 px-3 py-1 rounded-full font-medium">Private Access</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentralReportingDashboard;