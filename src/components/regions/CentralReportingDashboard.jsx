import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  DollarSign, 
  Users, 
  Target,
  MapPin,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { countries } from '../../data/regions/middle-east/countries.json';
import MetricCard from './dashboard/MetricCard';
import RegionCard from './dashboard/RegionCard';
import TopCountryCard from './dashboard/TopCountryCard';
import DashboardFilters from './dashboard/DashboardFilters';
import DashboardHero from './dashboard/DashboardHero';

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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto p-6">
        <DashboardHero />

        <DashboardFilters 
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
        />

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
                <TopCountryCard 
                  key={country.id} 
                  country={country} 
                  rank={idx + 1}
                  onClick={() => navigate(`/regions/country-report/${country.slug}`)}
                />
              ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div 
            className="group bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-blue-700/10 p-6 rounded-2xl border border-blue-200/50 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            onClick={() => navigate('/regions/middle-east')}
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-blue-900">Country Explorer</h3>
            </div>
            <p className="text-blue-700 text-sm leading-relaxed">Navigate individual country strategic intelligence</p>
          </div>

          <div 
            className="group bg-gradient-to-br from-green-500/10 via-green-600/5 to-green-700/10 p-6 rounded-2xl border border-green-200/50 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            onClick={() => navigate('/regions/aacci-dashboard')}
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-green-900">AACCI Dashboard</h3>
            </div>
            <p className="text-green-700 text-sm leading-relaxed">Arab-Australian Chamber commerce intelligence</p>
          </div>

          <div 
            className="group bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-purple-700/10 p-6 rounded-2xl border border-purple-200/50 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            onClick={() => navigate('/regions/tech4humanity-dashboard')}
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-purple-900">Tech4Humanity</h3>
            </div>
            <p className="text-purple-700 text-sm leading-relaxed">Technology impact and transformation metrics</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-orange-700/10 p-6 rounded-2xl border border-orange-200/50">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-orange-900">Advanced Analytics</h3>
            </div>
            <p className="text-orange-700 text-sm leading-relaxed mb-3">Predictive modeling and market forecasting</p>
            <div className="inline-block text-xs text-orange-700 bg-orange-200/80 px-2 py-1 rounded-full font-medium">Coming Soon</div>
          </div>

          <div className="bg-gradient-to-br from-teal-500/10 via-teal-600/5 to-teal-700/10 p-6 rounded-2xl border border-teal-200/50">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-teal-900">Global Insights</h3>
            </div>
            <p className="text-teal-700 text-sm leading-relaxed mb-3">International benchmarking and comparisons</p>
            <div className="inline-block text-xs text-teal-700 bg-teal-200/80 px-2 py-1 rounded-full font-medium">Beta Access</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentralReportingDashboard;