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
      className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-2">
            <Icon className={`w-5 h-5 mr-2 ${color}`} />
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
        </div>
      </div>
    </div>
  );

  const RegionCard = ({ name, countries, totalGDP, activeCount }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h4 className="font-semibold text-gray-900 mb-2">{name}</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Countries:</span>
          <span className="font-medium">{countries.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Active:</span>
          <span className="font-medium">{activeCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Combined GDP:</span>
          <span className="font-medium">${totalGDP.toFixed(0)}B</span>
        </div>
      </div>
    </div>
  );

  const TopCountryCard = ({ country, rank }) => (
    <div 
      className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md"
      onClick={() => navigate(`/regions/middle-east/${country.slug}`)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
            {rank}
          </div>
          <div>
            <h4 className="font-semibold">{country.name}</h4>
            <div className="text-sm text-gray-600">{country.capital}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-500">GDP:</span>
          <span className="font-medium ml-1">{country.gdp}</span>
        </div>
        <div>
          <span className="text-gray-500">Pop:</span>
          <span className="font-medium ml-1">{country.population}</span>
        </div>
        <div>
          <span className="text-gray-500">Priority:</span>
          <span className={`font-medium ml-1 capitalize ${
            country.priority === 'high' ? 'text-red-600' :
            country.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {country.priority}
          </span>
        </div>
        <div>
          <span className="text-gray-500">Status:</span>
          <span className="font-medium ml-1 capitalize">{country.status}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Central Intelligence Dashboard</h1>
        <p className="text-gray-600">Global strategic intelligence and cross-regional analytics</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select 
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="middle-east">Middle East</option>
          <option value="asia-pacific" disabled>Asia Pacific (Coming Soon)</option>
          <option value="europe" disabled>Europe (Coming Soon)</option>
          <option value="americas" disabled>Americas (Coming Soon)</option>
        </select>

        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="current">Current Period</option>
          <option value="ytd">Year to Date</option>
          <option value="quarterly">Quarterly</option>
        </select>

        <select 
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Metrics</option>
          <option value="economic">Economic</option>
          <option value="political">Political</option>
          <option value="market">Market Potential</option>
        </select>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Regional Distribution</h2>
          <div className="grid grid-cols-2 gap-4">
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

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Market Analytics</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Priority Distribution</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">High Priority</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(priorityDistribution.high/totalCountries)*100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{priorityDistribution.high}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Medium Priority</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(priorityDistribution.medium/totalCountries)*100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{priorityDistribution.medium}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Low Priority</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(priorityDistribution.low/totalCountries)*100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{priorityDistribution.low}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Market Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(statusDistribution.active/totalCountries)*100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{statusDistribution.active}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Developing</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(statusDistribution.developing/totalCountries)*100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{statusDistribution.developing}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Monitoring</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-gray-500 h-2 rounded-full" style={{ width: `${(statusDistribution.monitoring/totalCountries)*100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{statusDistribution.monitoring}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Countries */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-bold mb-4">Top Strategic Markets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 cursor-pointer hover:shadow-md"
          onClick={() => navigate('/regions/middle-east')}
        >
          <div className="flex items-center mb-3">
            <MapPin className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-blue-900">Explore Middle East</h3>
          </div>
          <p className="text-blue-700 text-sm">Access individual country strategic navigators and detailed market analysis</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center mb-3">
            <BarChart3 className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="text-lg font-semibold text-purple-900">Advanced Analytics</h3>
          </div>
          <p className="text-purple-700 text-sm">Cross-country comparisons, market modeling, and predictive insights</p>
          <div className="mt-2 text-xs text-purple-600 bg-purple-200 px-2 py-1 rounded">Coming Soon</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <div className="flex items-center mb-3">
            <Users className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-green-900">Customer Portal</h3>
          </div>
          <p className="text-green-700 text-sm">Access private dashboards and customized strategic intelligence</p>
          <div className="mt-2 text-xs text-green-600 bg-green-200 px-2 py-1 rounded">Private Access</div>
        </div>
      </div>
    </div>
  );
};

export default CentralReportingDashboard;