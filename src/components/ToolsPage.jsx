
import React, { useState } from 'react';
import { Calculator, BarChart, ArrowRight, Target, DollarSign } from 'lucide-react';
import ROICalculator from './tools/ROICalculator';
import MarketSizingTool from './tools/MarketSizingTool';
import PaymentsPlanner from './tools/PaymentsPlanner';

const ToolsPage = () => {
  const [activeTab, setActiveTab] = useState('roi');

  const tools = [
    {
      id: 'roi',
      title: 'ROI Calculator',
      description: 'Calculate your potential return on investment in the Australian market',
      icon: Calculator,
      component: ROICalculator
    },
    {
      id: 'market-sizing',
      title: 'Market Sizing Tool',
      description: 'Analyze your total addressable market and opportunity size in Australia',
      icon: BarChart,
      component: MarketSizingTool
    },
    {
      id: 'payments-planner',
      title: 'Startup Payments Planner',
      description: 'Compare payment models and optimize cash flow for pre-revenue startups',
      icon: DollarSign,
      component: PaymentsPlanner
    }
  ];

  const ActiveComponent = tools.find(tool => tool.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Business Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our free tools to analyze your Australia market opportunity and calculate potential returns
          </p>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-8 justify-center">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === tool.id
                      ? 'bg-white text-green-600 shadow-md'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{tool.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mb-12">
          {ActiveComponent && <ActiveComponent />}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Target className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need More Detailed Analysis?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our tools provide high-level insights. For comprehensive market analysis, 
            competitive intelligence, and custom go-to-market strategies, speak with our experts.
          </p>
          <button
            onClick={() => {
              if (window.toggleLeadForm) window.toggleLeadForm();
            }}
            className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Get Expert Analysis
            <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
