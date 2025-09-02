import React, { useState } from 'react';
import { saveCalculatorResult } from '../../utils/supabaseClient';

const PaymentsPlanner = () => {
  const [inputs, setInputs] = useState({
    monthlyBudget: '',
    projectDuration: '6',
    paymentModel: 'deferred',
    deferredMonths: '3',
    revenueSharePercent: '20',
    milestoneCount: '3',
    usageThreshold: '10000',
    email: ''
  });

  const [results, setResults] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const calculatePayments = () => {
    const budget = parseFloat(inputs.monthlyBudget) || 0;
    const duration = parseInt(inputs.projectDuration) || 6;
    const totalProjectCost = budget * duration;

    let cashFlowSchedule = [];
    let totalPaidUpfront = 0;

    switch (inputs.paymentModel) {
      case 'deferred':
        const deferredMonths = parseInt(inputs.deferredMonths) || 3;
        // Pay nothing for deferred period, then spread remaining payments
        for (let i = 0; i < duration; i++) {
          if (i < deferredMonths) {
            cashFlowSchedule.push(0);
          } else {
            const remainingMonths = duration - deferredMonths;
            cashFlowSchedule.push(totalProjectCost / remainingMonths);
          }
        }
        break;

      case 'revenue_share':
        // Lower upfront, pay percentage of revenue later
        const upfrontPercent = 0.3;
        totalPaidUpfront = totalProjectCost * upfrontPercent;
        for (let i = 0; i < duration; i++) {
          cashFlowSchedule.push(i === 0 ? totalPaidUpfront : 0);
        }
        break;

      case 'milestone':
        const milestoneCount = parseInt(inputs.milestoneCount) || 3;
        const paymentPerMilestone = totalProjectCost / milestoneCount;
        // Spread milestones across duration
        for (let i = 0; i < duration; i++) {
          const milestoneMonth = Math.floor(((i + 1) / duration) * milestoneCount);
          const prevMilestoneMonth = Math.floor((i / duration) * milestoneCount);
          cashFlowSchedule.push(milestoneMonth > prevMilestoneMonth ? paymentPerMilestone : 0);
        }
        break;

      case 'usage_based':
        // Pay 50% upfront, rest based on usage
        totalPaidUpfront = totalProjectCost * 0.5;
        for (let i = 0; i < duration; i++) {
          cashFlowSchedule.push(i === 0 ? totalPaidUpfront : 0);
        }
        break;

      default: // standard
        for (let i = 0; i < duration; i++) {
          cashFlowSchedule.push(budget);
        }
    }

    const monthlyStandard = Array(duration).fill(budget);
    const totalCashSaved = monthlyStandard.reduce((sum, payment, i) => {
      return sum + (payment - (cashFlowSchedule[i] || 0));
    }, 0);

    setResults({
      totalProjectCost,
      cashFlowSchedule,
      monthlyStandard,
      totalCashSaved,
      runwayExtension: Math.floor(totalCashSaved / budget),
      paymentModel: inputs.paymentModel
    });
  };

  const saveResults = async () => {
    if (!results || !inputs.email) return;
    
    setIsSaving(true);
    try {
      await saveCalculatorResult({
        calculator_type: 'payments_planner',
        inputs: inputs,
        results: results,
        email: inputs.email,
        created_at: new Date().toISOString()
      });
      alert('Results saved successfully!');
    } catch (error) {
      console.error('Error saving results:', error);
      alert('Error saving results. Please try again.');
    } finally {
      setIsSaving(false);
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
    <div className="payments-planner">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Project Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Budget (Standard Rate)
              </label>
              <input
                type="number"
                name="monthlyBudget"
                value={inputs.monthlyBudget}
                onChange={handleInputChange}
                placeholder="e.g., 10000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Duration (Months)
              </label>
              <select
                name="projectDuration"
                value={inputs.projectDuration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="9">9 months</option>
                <option value="12">12 months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Model
              </label>
              <select
                name="paymentModel"
                value={inputs.paymentModel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="standard">Standard Monthly</option>
                <option value="deferred">Deferred Payment</option>
                <option value="revenue_share">Revenue Share</option>
                <option value="milestone">Milestone-Based</option>
                <option value="usage_based">Usage-Based</option>
              </select>
            </div>

            {/* Conditional inputs based on payment model */}
            {inputs.paymentModel === 'deferred' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deferred Period (Months)
                </label>
                <input
                  type="number"
                  name="deferredMonths"
                  value={inputs.deferredMonths}
                  onChange={handleInputChange}
                  min="1"
                  max={inputs.projectDuration}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            )}

            {inputs.paymentModel === 'revenue_share' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Revenue Share % (Future)
                </label>
                <input
                  type="number"
                  name="revenueSharePercent"
                  value={inputs.revenueSharePercent}
                  onChange={handleInputChange}
                  min="1"
                  max="50"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            )}

            {inputs.paymentModel === 'milestone' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Milestones
                </label>
                <input
                  type="number"
                  name="milestoneCount"
                  value={inputs.milestoneCount}
                  onChange={handleInputChange}
                  min="2"
                  max="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            )}

            <button
              onClick={calculatePayments}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Calculate Payment Plan
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Cash Flow Analysis</h3>
          
          {results ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Total Project Cost</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(results.totalProjectCost)}
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Cash Saved</div>
                  <div className="text-lg font-semibold text-green-600">
                    {formatCurrency(results.totalCashSaved)}
                  </div>
                </div>
              </div>

              {results.runwayExtension > 0 && (
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Runway Extension</div>
                  <div className="text-lg font-semibold text-blue-600">
                    +{results.runwayExtension} months
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Monthly Cash Flow Comparison</h4>
                <div className="space-y-2">
                  {results.cashFlowSchedule.map((payment, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>Month {index + 1}:</span>
                      <div className="flex gap-4">
                        <span className="text-gray-500">
                          Standard: {formatCurrency(results.monthlyStandard[index])}
                        </span>
                        <span className={payment < results.monthlyStandard[index] ? 'text-green-600' : 'text-gray-900'}>
                          {results.paymentModel}: {formatCurrency(payment)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (to save results)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <button
                  onClick={saveResults}
                  disabled={!inputs.email || isSaving}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  {isSaving ? 'Saving...' : 'Save Results'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Enter your project details and click "Calculate Payment Plan" to see your cash flow analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsPlanner;