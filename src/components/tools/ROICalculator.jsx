
import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Target } from 'lucide-react';
import { trackCtaClick } from '../../utils/analyticsUtils';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    companySize: '',
    currentRevenue: '',
    marketingBudget: '',
    targetGrowth: '',
    timeframe: '12'
  });
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const companySizes = [
    { value: 'startup', label: 'Startup (1-10 employees)', multiplier: 1.2 },
    { value: 'small', label: 'Small Business (11-50 employees)', multiplier: 1.5 },
    { value: 'medium', label: 'Medium Business (51-200 employees)', multiplier: 2.0 },
    { value: 'large', label: 'Large Enterprise (200+ employees)', multiplier: 3.0 }
  ];

  const calculateROI = () => {
    const revenue = parseFloat(inputs.currentRevenue) || 0;
    const budget = parseFloat(inputs.marketingBudget) || 0;
    const growth = parseFloat(inputs.targetGrowth) || 0;
    const timeframe = parseInt(inputs.timeframe) || 12;
    
    const sizeMultiplier = companySizes.find(size => size.value === inputs.companySize)?.multiplier || 1;
    
    // Calculate potential Australia market revenue
    const australiaMarketPotential = revenue * (growth / 100) * sizeMultiplier;
    const projectedRevenue = australiaMarketPotential * (timeframe / 12);
    
    // Calculate our service investment (typical 10-15% of target revenue)
    const ourServiceCost = projectedRevenue * 0.12;
    const totalInvestment = budget + ourServiceCost;
    
    // Calculate ROI
    const netGain = projectedRevenue - totalInvestment;
    const roiPercentage = totalInvestment > 0 ? (netGain / totalInvestment) * 100 : 0;
    
    return {
      projectedRevenue,
      totalInvestment,
      netGain,
      roiPercentage,
      ourServiceCost,
      paybackPeriod: totalInvestment > 0 ? (totalInvestment / (projectedRevenue / timeframe)) : 0
    };
  };

  useEffect(() => {
    if (Object.values(inputs).every(value => value !== '')) {
      const calculatedResults = calculateROI();
      setResults(calculatedResults);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Track calculator usage
    if (window.gtag) {
      window.gtag('event', 'roi_calculator_input', {
        event_category: 'Interactive Tools',
        event_label: field
      });
    }
  };

  const handleGetStrategy = () => {
    trackCtaClick('Get My Custom Strategy', 'roi_calculator');
    if (window.toggleLeadForm) {
      window.toggleLeadForm();
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4">
          <Calculator size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Australia Market ROI Calculator
        </h2>
        <p className="text-gray-600">
          Calculate your potential return on investment in the Australian market
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Size
            </label>
            <select
              value={inputs.companySize}
              onChange={(e) => handleInputChange('companySize', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select company size</option>
              {companySizes.map(size => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Annual Revenue (AUD)
            </label>
            <input
              type="number"
              value={inputs.currentRevenue}
              onChange={(e) => handleInputChange('currentRevenue', e.target.value)}
              placeholder="e.g., 1000000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Marketing Budget (AUD)
            </label>
            <input
              type="number"
              value={inputs.marketingBudget}
              onChange={(e) => handleInputChange('marketingBudget', e.target.value)}
              placeholder="e.g., 100000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Growth in Australia (%)
            </label>
            <input
              type="number"
              value={inputs.targetGrowth}
              onChange={(e) => handleInputChange('targetGrowth', e.target.value)}
              placeholder="e.g., 25"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Timeframe (months)
            </label>
            <select
              value={inputs.timeframe}
              onChange={(e) => handleInputChange('timeframe', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="18">18 months</option>
              <option value="24">24 months</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          {showResults && results ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Your ROI Projection
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Projected Revenue</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(results.projectedRevenue)}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">ROI</p>
                  <p className="text-xl font-bold text-blue-600">
                    {results.roiPercentage.toFixed(0)}%
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Investment:</span>
                  <span className="font-semibold">{formatCurrency(results.totalInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Gain:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(results.netGain)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payback Period:</span>
                  <span className="font-semibold">{results.paybackPeriod.toFixed(1)} months</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={handleGetStrategy}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Get My Custom Strategy
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Based on your calculations, get a personalized market entry strategy
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                Fill in the details to see your ROI projection
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
