import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  FileText,
  BarChart3
} from 'lucide-react';
import { countries } from '../../data/regions/middle-east/countries.json';

const CountryReportPage = () => {
  const { countrySlug } = useParams();
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('comprehensive');
  
  const country = countries.find(c => c.slug === countrySlug);
  
  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Country Not Found</h1>
          <button 
            onClick={() => navigate('/regions/central-reporting')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Calculate country-specific metrics
  const gdpValue = parseFloat(country.gdp.replace(/[$B]/g, ''));
  const populationValue = parseFloat(country.population.replace('M', ''));
  
  const metrics = {
    economicData: {
      gdpPerCapita: Math.round((gdpValue * 1000) / populationValue),
      tradeVolume: Math.round(gdpValue * 0.05 * 100) / 100,
      investmentPotential: Math.round(gdpValue * 0.02 * 100) / 100,
      marketSize: country.marketPotential
    },
    riskAssessment: {
      political: country.status === 'active' ? 'Low' : country.status === 'developing' ? 'Medium' : 'High',
      economic: country.priority === 'high' ? 'Low' : country.priority === 'medium' ? 'Medium' : 'High',
      regulatory: country.category === 'gcc' ? 'Low' : country.category === 'levant' ? 'High' : 'Medium'
    },
    opportunities: country.opportunities.map((opp, idx) => ({
      name: opp,
      priority: idx === 0 ? 'High' : idx === 1 ? 'Medium' : 'Standard',
      timeline: idx === 0 ? '2-3 years' : idx === 1 ? '3-5 years' : '5-7 years',
      investment: `$${(gdpValue * 0.01 * (3 - idx)).toFixed(1)}B`
    }))
  };

  const reportSections = [
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      icon: FileText,
      content: `Strategic analysis of ${country.name}'s market potential and partnership opportunities with Australia. Current GDP of ${country.gdp} with ${country.population} population represents significant opportunities in ${country.opportunities.slice(0, 3).join(', ')}.`
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis',
      icon: BarChart3,
      content: `${country.name} demonstrates ${country.marketPotential.toLowerCase()} market potential with ${country.status} partnership status. Key growth sectors include ${country.opportunities.join(', ')}.`
    },
    {
      id: 'risk-assessment',
      title: 'Risk Assessment',
      icon: AlertTriangle,
      content: `Political risk: ${metrics.riskAssessment.political}, Economic risk: ${metrics.riskAssessment.economic}, Regulatory risk: ${metrics.riskAssessment.regulatory}. Overall risk profile suitable for ${country.priority} priority engagement.`
    },
    {
      id: 'recommendations',
      title: 'Strategic Recommendations',
      icon: CheckCircle,
      content: `Recommend immediate focus on ${country.opportunities[0]} with estimated $${metrics.opportunities[0].investment} investment potential. Secondary opportunities in ${country.opportunities.slice(1, 3).join(' and ')}.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/regions/central-reporting')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{country.name} Strategic Report</h1>
              <p className="text-gray-600">{country.capital} • {country.category.toUpperCase()} • {country.status} Status</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select 
              value={reportType} 
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="comprehensive">Comprehensive Report</option>
              <option value="executive">Executive Summary</option>
              <option value="financial">Financial Analysis</option>
              <option value="risk">Risk Assessment</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">GDP per Capita</div>
                <div className="text-2xl font-bold text-gray-900">${metrics.economicData.gdpPerCapita.toLocaleString()}</div>
                <div className="text-sm text-green-600 font-medium">{country.marketPotential} Potential</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Trade Volume</div>
                <div className="text-2xl font-bold text-gray-900">${metrics.economicData.tradeVolume}B</div>
                <div className="text-sm text-orange-600 font-medium">Annual with Australia</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Investment Pipeline</div>
                <div className="text-2xl font-bold text-gray-900">${metrics.economicData.investmentPotential}B</div>
                <div className="text-sm text-purple-600 font-medium">Potential Projects</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Population</div>
                <div className="text-2xl font-bold text-gray-900">{country.population}</div>
                <div className="text-sm text-teal-600 font-medium">Market Size</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Report Sections */}
          <div className="lg:col-span-2 space-y-6">
            {reportSections.map((section) => (
              <div key={section.id} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center mr-3">
                    <section.icon className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Priority Opportunities */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Priority Opportunities</h3>
              <div className="space-y-4">
                {metrics.opportunities.slice(0, 3).map((opp, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{opp.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        opp.priority === 'High' ? 'bg-red-100 text-red-700' :
                        opp.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {opp.priority}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>Timeline: {opp.timeline}</div>
                      <div>Investment: {opp.investment}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Dashboard */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Risk Assessment</h3>
              <div className="space-y-3">
                {Object.entries(metrics.riskAssessment).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">{key} Risk</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      value === 'Low' ? 'bg-green-100 text-green-700' :
                      value === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate(`/regions/middle-east/${country.slug}`)}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <span className="text-sm font-medium">Strategic Navigator</span>
                  <MapPin className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <span className="text-sm font-medium">Schedule Meeting</span>
                  <Calendar className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <span className="text-sm font-medium">Export Data</span>
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryReportPage;