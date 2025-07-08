import React, { useState } from 'react';
import { ChevronRight, ChevronDown, AlertTriangle, TrendingUp, Users, DollarSign, Globe, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import PartnershipLogos from './PartnershipLogos';

const StrategicNavigator = ({ country, isPrivate = false, customer = null }) => {
  const [activeView, setActiveView] = useState('overview');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [showTradeoffs, setShowTradeoffs] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Generate country-specific scenarios based on category, priority, and market potential
  const generateScenarios = () => {
    const gdpValue = parseFloat(country.gdp.replace(/[$B]/g, ''));
    const baseInvestment = Math.max(gdpValue * 0.1, 5); // 10% of GDP, minimum $5B
    
    // Adjust benefits based on country characteristics
    const countryBenefit = country.marketPotential === 'Very High' ? 85 : 
                          country.marketPotential === 'High' ? 75 : 
                          country.marketPotential === 'Medium' ? 65 : 55;
    
    const australiaBenefit = country.priority === 'high' ? 85 :
                            country.priority === 'medium' ? 65 : 45;
    
    const politicalRisk = country.status === 'active' ? 25 :
                         country.status === 'developing' ? 45 : 65;

    // Category-specific scenario names and approaches
    const categoryScenarios = {
      'gcc': {
        conservative: 'Heritage Innovation',
        balanced: 'Smart Heritage Cities',
        aggressive: 'Tech Transformation'
      },
      'levant': {
        conservative: 'Reconstruction First',
        balanced: 'Sustainable Development',
        aggressive: 'Innovation Accelerator'
      },
      'north-africa': {
        conservative: 'Agricultural Focus',
        balanced: 'Energy Transition',
        aggressive: 'Industrial Revolution'
      },
      'other': {
        conservative: 'Sector Specialization',
        balanced: 'Strategic Integration',
        aggressive: 'Global Hub Development'
      }
    };

    const scenarios = categoryScenarios[country.category];

    return [
      {
        id: 'conservative',
        name: scenarios.conservative,
        description: `Conservative approach focusing on ${country.name}'s core strengths with gradual modernization`,
        countryBenefit: Math.min(countryBenefit + 15, 95),
        australiaBenefit: australiaBenefit - 20,
        politicalRisk: Math.max(politicalRisk - 20, 10),
        investment: `$${(baseInvestment * 0.5).toFixed(0)}B`,
        timeline: '10-15 years',
        pros: ['Low political risk', 'High local acceptance', 'Manageable investment', 'Cultural preservation'],
        cons: ['Limited scalability', 'Slower revenue generation', 'Lower technology transfer'],
        keyRisks: ['May not achieve transformation goals', 'Competitive disadvantage', 'Limited innovation']
      },
      {
        id: 'balanced',
        name: scenarios.balanced,
        description: `Balanced approach integrating ${country.name}'s priorities with Australian expertise`,
        countryBenefit: countryBenefit,
        australiaBenefit: australiaBenefit,
        politicalRisk: politicalRisk,
        investment: `$${baseInvestment.toFixed(0)}B`,
        timeline: '15-20 years',
        pros: ['Sustainable growth', 'Balanced value creation', 'Strong partnership', 'Risk management'],
        cons: ['Complex implementation', 'Longer timelines', 'Resource coordination'],
        keyRisks: ['Implementation complexity', 'Stakeholder alignment', 'Market changes']
      },
      {
        id: 'aggressive',
        name: scenarios.aggressive,
        description: `Accelerated development leveraging ${country.name}'s market potential for maximum impact`,
        countryBenefit: Math.max(countryBenefit - 15, 50),
        australiaBenefit: Math.min(australiaBenefit + 15, 95),
        politicalRisk: Math.min(politicalRisk + 25, 85),
        investment: `$${(baseInvestment * 2).toFixed(0)}B`,
        timeline: '10-25 years',
        pros: ['Maximum market impact', 'Rapid technology deployment', 'First-mover advantage', 'High returns'],
        cons: ['High political risk', 'Massive investment', 'Cultural resistance', 'Implementation complexity'],
        keyRisks: ['Political backlash', 'Overextension', 'Cultural disruption', 'Technology dependence']
      }
    ];
  };

  const scenarios = generateScenarios();

  // Generate country-specific initiatives based on opportunities and characteristics
  const generateInitiatives = () => {
    const gdpValue = parseFloat(country.gdp.replace(/[$B]/g, ''));
    const baseInvestment = Math.max(gdpValue * 0.05, 2); // 5% of GDP for initiatives
    
    // Adjust values based on country characteristics
    const countryPolitical = country.status === 'active' ? 80 : country.status === 'developing' ? 65 : 50;
    const countryEconomic = country.marketPotential === 'Very High' ? 90 : 
                           country.marketPotential === 'High' ? 80 : 
                           country.marketPotential === 'Medium' ? 70 : 60;
    const countryCultural = country.category === 'gcc' ? 85 : 
                          country.category === 'levant' ? 70 : 
                          country.category === 'north-africa' ? 75 : 80;

    const australiaPolitical = country.priority === 'high' ? 75 : country.priority === 'medium' ? 60 : 45;
    const australiaEconomic = country.priority === 'high' ? 85 : country.priority === 'medium' ? 70 : 55;
    const australiaCultural = 50; // Baseline cultural value for Australia

    // Generate initiatives from opportunities
    const initiatives = country.opportunities.slice(0, 5).map((opportunity, index) => {
      const complexityLevels = ['High', 'Medium', 'High', 'Very High', 'Medium'];
      const timelines = ['5-7 years', '3-5 years', '7-10 years', '10-15 years', '4-6 years'];
      
      // Category-specific trade-offs
      const getTradeoffs = (opportunity, category) => {
        const categoryTradeoffs = {
          'gcc': {
            country: [`Strategic value for ${country.name}'s diversification goals`, 'Requires significant technology transfer', 'May challenge traditional approaches'],
            australia: ['High-value technology export opportunity', 'Strong mining/energy sector alignment', 'Limited cultural connectivity']
          },
          'levant': {
            country: [`Critical for ${country.name}'s reconstruction and development`, 'Requires substantial infrastructure investment', 'Political stability considerations'],
            australia: ['Humanitarian and development expertise application', 'Limited direct economic returns', 'Strong educational/technical alignment']
          },
          'north-africa': {
            country: [`Leverages ${country.name}'s geographic and resource advantages`, 'Requires modernization of traditional sectors', 'Environmental sustainability focus needed'],
            australia: ['Natural resource expertise highly relevant', 'Agricultural and mining technology transfer', 'Moderate political risk exposure']
          },
          'other': {
            country: [`Aligns with ${country.name}'s unique market position`, 'Requires specialized expertise and technology', 'Strategic partnership dependencies'],
            australia: ['Niche market opportunities', 'Technology and services export potential', 'Variable risk-return profile']
          }
        };
        return categoryTradeoffs[category] || categoryTradeoffs.other;
      };

      const tradeoffs = getTradeoffs(opportunity, country.category);

      return {
        id: `initiative-${index}`,
        name: opportunity,
        countryValue: { 
          political: countryPolitical + (index === 0 ? 5 : index === 1 ? 0 : -5), 
          economic: countryEconomic + (index <= 1 ? 5 : 0), 
          cultural: countryCultural - (index * 5) 
        },
        australiaValue: { 
          political: australiaPolitical - (index * 5), 
          economic: australiaEconomic + (index === 1 ? 10 : 0), 
          cultural: australiaCultural 
        },
        complexity: complexityLevels[index] || 'Medium',
        timeline: timelines[index] || '3-5 years',
        investment: `$${(baseInvestment * (1 + index * 0.5)).toFixed(0)}B`,
        tradeoffs: {
          country: tradeoffs.country,
          australia: tradeoffs.australia
        },
        criticalSuccess: [
          `${country.name} government alignment and support`,
          'Regulatory framework development',
          'Technology transfer and capacity building',
          'Local stakeholder engagement',
          'Risk management and mitigation'
        ].slice(0, 3 + index % 2)
      };
    });

    // Ensure at least 3 initiatives
    while (initiatives.length < 3) {
      initiatives.push({
        id: `initiative-${initiatives.length}`,
        name: 'Strategic Development Initiative',
        countryValue: { political: countryPolitical, economic: countryEconomic - 10, cultural: countryCultural },
        australiaValue: { political: australiaPolitical - 10, economic: australiaEconomic - 10, cultural: australiaCultural },
        complexity: 'Medium',
        timeline: '5-8 years',
        investment: `$${(baseInvestment * 2).toFixed(0)}B`,
        tradeoffs: {
          country: [`Development opportunity for ${country.name}`, 'Requires foreign partnership and expertise'],
          australia: ['Technology and services export opportunity', 'Moderate risk-return profile']
        },
        criticalSuccess: ['Partnership framework', 'Local capacity building', 'Risk management']
      });
    }

    return initiatives;
  };

  const initiatives = generateInitiatives();

  const implementationSteps = [
    {
      phase: 'Foundation',
      duration: '6-12 months',
      description: `Establish partnership framework and initial agreements in ${country.name}`,
      criticalTasks: ['Government MOU signing', 'Local authority engagement', 'Initial feasibility studies'],
      politicalRequirements: ['Government approval', 'Regulatory consultation', 'Australian government alignment'],
      risks: ['Cultural resistance', 'Political opposition', 'Regulatory challenges']
    },
    {
      phase: 'Pilot Projects',
      duration: '12-18 months',
      description: 'Launch 2-3 small-scale demonstration projects',
      criticalTasks: ['Pilot implementation', 'Local knowledge integration', 'Technology integration testing'],
      politicalRequirements: ['Public communication strategy', 'Success metrics definition', 'International engagement'],
      risks: ['Pilot project failures', 'Cultural authenticity concerns', 'Technical challenges']
    },
    {
      phase: 'Scale Decision',
      duration: '6 months',
      description: 'Evaluate pilot results and commit to full-scale implementation',
      criticalTasks: ['Performance review', 'Investment commitment', 'Partnership structure finalization'],
      politicalRequirements: ['Legislative approval', 'Budget allocation', 'International treaty negotiation'],
      risks: ['Political change', 'Budget constraints', 'Partnership disagreements']
    },
    {
      phase: 'Full Implementation',
      duration: '15-25 years',
      description: `Execute complete strategic partnership in ${country.name}`,
      criticalTasks: ['Infrastructure development', 'Technology deployment', 'Revenue generation'],
      politicalRequirements: ['Sustained political support', 'Regular progress reporting', 'International coordination'],
      risks: ['Economic changes', 'Technology obsolescence', 'Partnership tensions']
    }
  ];

  const ValueCard = ({ title, value, color, icon: Icon }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        <div className={`text-lg font-bold ${color}`}>{value}</div>
      </div>
    </div>
  );

  const TradeoffAnalysis = ({ initiative }) => (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold mb-3 flex items-center">
        <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
        Critical Trade-offs
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-medium text-green-700 mb-2">{country.name} Considerations</h5>
          <ul className="text-sm space-y-1">
            {initiative.tradeoffs.country.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-medium text-blue-700 mb-2">Australia Considerations</h5>
          <ul className="text-sm space-y-1">
            {initiative.tradeoffs.australia.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Partnership Logos */}
      <PartnershipLogos />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Australia-{country.name} Strategic Partnership Navigator
          {isPrivate && customer && (
            <span className="ml-3 text-lg font-normal text-blue-600">
              (Private Dashboard for {customer.name})
            </span>
          )}
        </h1>
        <p className="text-gray-600">Interactive framework for evaluating partnership scenarios, trade-offs, and implementation pathways</p>
      </div>

      {/* Navigation */}
      <div className="mb-6">
        <div className="flex space-x-4 border-b border-gray-200">
          {['overview', 'scenarios', 'initiatives', 'implementation'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-4 py-2 font-medium capitalize ${
                activeView === view
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Overview */}
      {activeView === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <ValueCard title="Total Investment" value={scenarios[1].investment} color="text-green-600" icon={DollarSign} />
            <ValueCard title="Timeline" value={scenarios[1].timeline} color="text-blue-600" icon={Clock} />
            <ValueCard title="Revenue Potential" value={`$${Math.round(parseFloat(country.gdp.replace(/[$B]/g, '')) * 0.6)}B/year`} color="text-purple-600" icon={TrendingUp} />
            <ValueCard title="Market Potential" value={country.marketPotential} color="text-orange-600" icon={Globe} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Strategic Choice Framework for {country.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">{scenarios[0].name}</div>
                <div className="text-sm text-gray-600">Low risk, gradual approach</div>
                <div className="text-xs text-green-700 mt-2">Investment: {scenarios[0].investment}</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">{scenarios[1].name}</div>
                <div className="text-sm text-gray-600">Balanced integration</div>
                <div className="text-xs text-blue-700 mt-2">Investment: {scenarios[1].investment}</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">{scenarios[2].name}</div>
                <div className="text-sm text-gray-600">High impact, accelerated</div>
                <div className="text-xs text-purple-700 mt-2">Investment: {scenarios[2].investment}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scenarios */}
      {activeView === 'scenarios' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className={`bg-white p-6 rounded-lg shadow-sm border-2 cursor-pointer transition-all ${
                  selectedScenario === scenario.id ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedScenario(selectedScenario === scenario.id ? null : scenario.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold">{scenario.name}</h3>
                  {selectedScenario === scenario.id ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </div>
                <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{country.name} Benefit</span>
                    <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${scenario.countryBenefit}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{scenario.countryBenefit}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Australia Benefit</span>
                    <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${scenario.australiaBenefit}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{scenario.australiaBenefit}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Political Risk</span>
                    <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${scenario.politicalRisk}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{scenario.politicalRisk}%</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between text-sm">
                  <span><strong>Investment:</strong> {scenario.investment}</span>
                  <span><strong>Timeline:</strong> {scenario.timeline}</span>
                </div>

                {selectedScenario === scenario.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Advantages
                        </h4>
                        <ul className="text-sm space-y-1">
                          {scenario.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <XCircle className="w-4 h-4 mr-2 text-red-500" />
                          Challenges
                        </h4>
                        <ul className="text-sm space-y-1">
                          {scenario.cons.map((con, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
                        Key Risks
                      </h4>
                      <ul className="text-sm space-y-1">
                        {scenario.keyRisks.map((risk, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Initiatives */}
      {activeView === 'initiatives' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initiatives.map((initiative) => (
              <div
                key={initiative.id}
                className={`bg-white p-6 rounded-lg shadow-sm border-2 cursor-pointer transition-all ${
                  selectedInitiative === initiative.id ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedInitiative(selectedInitiative === initiative.id ? null : initiative.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold">{initiative.name}</h3>
                  {selectedInitiative === initiative.id ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span><strong>Investment:</strong> {initiative.investment}</span>
                    <span><strong>Timeline:</strong> {initiative.timeline}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span><strong>Complexity:</strong> {initiative.complexity}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{country.name} Value</span>
                      <span>Political: {initiative.countryValue.political}% | Economic: {initiative.countryValue.economic}% | Cultural: {initiative.countryValue.cultural}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(initiative.countryValue.political + initiative.countryValue.economic + initiative.countryValue.cultural) / 3}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Australia Value</span>
                      <span>Political: {initiative.australiaValue.political}% | Economic: {initiative.australiaValue.economic}% | Cultural: {initiative.australiaValue.cultural}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(initiative.australiaValue.political + initiative.australiaValue.economic + initiative.australiaValue.cultural) / 3}%` }}></div>
                    </div>
                  </div>
                </div>

                {selectedInitiative === initiative.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Critical Success Factors</h4>
                      <ul className="text-sm space-y-1">
                        {initiative.criticalSuccess.map((factor, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <TradeoffAnalysis initiative={initiative} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Implementation */}
      {activeView === 'implementation' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Implementation Pathway for {country.name}</h2>
            <div className="space-y-6">
              {implementationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`border-l-4 pl-6 pb-6 ${
                    idx === currentStep ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        idx === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{step.phase}</h3>
                        <p className="text-sm text-gray-600">{step.duration}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentStep(idx)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{step.description}</p>
                  
                  {idx === currentStep && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Critical Tasks</h4>
                        <ul className="text-sm space-y-1">
                          {step.criticalTasks.map((task, taskIdx) => (
                            <li key={taskIdx} className="flex items-start">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Political Requirements</h4>
                        <ul className="text-sm space-y-1">
                          {step.politicalRequirements.map((req, reqIdx) => (
                            <li key={reqIdx} className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Key Risks</h4>
                        <ul className="text-sm space-y-1">
                          {step.risks.map((risk, riskIdx) => (
                            <li key={riskIdx} className="flex items-start">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategicNavigator;