
import React, { useState, useEffect } from 'react';
import { BarChart, PieChart, Target, TrendingUp } from 'lucide-react';

const MarketSizingTool = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [results, setResults] = useState(null);

  const industries = [
    { 
      value: 'technology', 
      label: 'Technology & Software',
      marketSize: 167000000000, // $167B
      growthRate: 8.5,
      opportunities: ['AUKUS digital infrastructure', 'Government modernization', 'Cybersecurity']
    },
    { 
      value: 'defense', 
      label: 'Defense & Aerospace',
      marketSize: 45000000000, // $45B
      growthRate: 12.3,
      opportunities: ['AUKUS submarines', 'Military technology', 'Space programs']
    },
    { 
      value: 'healthcare', 
      label: 'Healthcare & MedTech',
      marketSize: 89000000000, // $89B
      growthRate: 6.8,
      opportunities: ['Digital health', 'Medical devices', 'Pharmaceuticals']
    },
    { 
      value: 'fintech', 
      label: 'Financial Services',
      marketSize: 156000000000, // $156B
      growthRate: 7.2,
      opportunities: ['Open banking', 'RegTech', 'Digital payments']
    },
    { 
      value: 'energy', 
      label: 'Energy & Resources',
      marketSize: 98000000000, // $98B
      growthRate: 9.1,
      opportunities: ['Renewable energy', 'Mining tech', 'Carbon capture']
    },
    { 
      value: 'agriculture', 
      label: 'Agriculture & Food',
      marketSize: 67000000000, // $67B
      growthRate: 5.4,
      opportunities: ['AgTech', 'Food security', 'Export opportunities']
    }
  ];

  const regions = [
    { value: 'sydney', label: 'Sydney', multiplier: 1.0, population: 5367206 },
    { value: 'melbourne', label: 'Melbourne', multiplier: 0.92, population: 5159211 },
    { value: 'brisbane', label: 'Brisbane', multiplier: 0.65, population: 2568927 },
    { value: 'perth', label: 'Perth', multiplier: 0.58, population: 2192229 },
    { value: 'adelaide', label: 'Adelaide', multiplier: 0.45, population: 1402393 },
    { value: 'national', label: 'National Market', multiplier: 1.2, population: 25690000 }
  ];

  const companyTypes = [
    { value: 'startup', label: 'Startup/Scale-up', marketShare: 0.02 },
    { value: 'sme', label: 'Small-Medium Enterprise', marketShare: 0.05 },
    { value: 'enterprise', label: 'Large Enterprise', marketShare: 0.15 },
    { value: 'multinational', label: 'Multinational Corporation', marketShare: 0.25 }
  ];

  useEffect(() => {
    if (selectedIndustry && selectedRegion && companyType) {
      calculateMarketSize();
    }
  }, [selectedIndustry, selectedRegion, companyType]);

  const calculateMarketSize = () => {
    const industry = industries.find(i => i.value === selectedIndustry);
    const region = regions.find(r => r.value === selectedRegion);
    const company = companyTypes.find(c => c.value === companyType);

    if (!industry || !region || !company) return;

    const totalMarketSize = industry.marketSize * region.multiplier;
    const addressableMarket = totalMarketSize * company.marketShare;
    const yearOneTarget = addressableMarket * 0.1; // Conservative 10% in year 1
    const yearThreeProjection = addressableMarket * 0.3; // 30% by year 3

    setResults({
      industry,
      region,
      company,
      totalMarketSize,
      addressableMarket,
      yearOneTarget,
      yearThreeProjection,
      competitorAnalysis: generateCompetitorAnalysis(selectedIndustry),
      entryStrategy: generateEntryStrategy(selectedIndustry, selectedRegion)
    });

    // Track tool usage
    if (window.gtag) {
      window.gtag('event', 'market_sizing_calculated', {
        event_category: 'Interactive Tools',
        event_label: `${selectedIndustry}-${selectedRegion}-${companyType}`
      });
    }
  };

  const generateCompetitorAnalysis = (industry) => {
    const competitors = {
      technology: ['Atlassian', 'Canva', 'SafetyCulture', 'Deputy'],
      defense: ['BAE Systems Australia', 'Lockheed Martin Australia', 'Thales Australia'],
      healthcare: ['CSL', 'ResMed', 'Cochlear', 'Nanosonics'],
      fintech: ['Afterpay', 'Tyro', 'Zip Co', 'Airwallex'],
      energy: ['Fortescue Metals', 'BHP', 'Woodside', 'Origin Energy'],
      agriculture: ['Nutrien', 'GrainCorp', 'Costa Group', 'Select Harvests']
    };
    return competitors[industry] || [];
  };

  const generateEntryStrategy = (industry, region) => {
    const strategies = {
      technology: ['Partner with local accelerators', 'Government tender participation', 'Local talent acquisition'],
      defense: ['AUKUS consortium participation', 'Defense Innovation Hub', 'Security clearance planning'],
      healthcare: ['TGA regulatory pathway', 'Hospital partnership programs', 'Medical advisory boards'],
      fintech: ['APRA consultation', 'Banking partnership', 'Regulatory sandbox participation'],
      energy: ['Resource sector partnerships', 'Government incentive programs', 'ESG compliance'],
      agriculture: ['Export market development', 'Farm partnership programs', 'Sustainability certifications']
    };
    return strategies[industry] || [];
  };

  const formatCurrency = (amount) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4">
          <BarChart size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Australia Market Sizing Tool
        </h2>
        <p className="text-gray-600">
          Analyze your total addressable market and opportunity size in Australia
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Industry Sector
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select industry</option>
              {industries.map(industry => (
                <option key={industry.value} value={industry.value}>
                  {industry.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select region</option>
              {regions.map(region => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Type
            </label>
            <select
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select company type</option>
              {companyTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="lg:col-span-2">
          {results ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <PieChart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Total Market Size</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.totalMarketSize)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {results.industry.growthRate}% annual growth
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Addressable Market</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(results.addressableMarket)}
                  </p>
                  <p className="text-xs text-gray-500">
                    For {results.company.label}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Revenue Projections</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year 1 Target:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(results.yearOneTarget)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year 3 Projection:</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(results.yearThreeProjection)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Opportunities</h4>
                  <ul className="space-y-1">
                    {results.industry.opportunities.map((opp, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {opp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Entry Strategy</h4>
                  <ul className="space-y-1">
                    {results.entryStrategy.map((strategy, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Get Your Detailed Market Analysis
                </h4>
                <p className="text-sm text-yellow-700 mb-3">
                  This is a high-level overview. Get a comprehensive 50-page market analysis 
                  with competitive landscape, regulatory requirements, and go-to-market strategy.
                </p>
                <button
                  onClick={() => {
                    if (window.toggleLeadForm) window.toggleLeadForm();
                  }}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-700 transition-colors"
                >
                  Get Detailed Analysis
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <TrendingUp className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Select your industry, region, and company type to see your market sizing analysis
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketSizingTool;
