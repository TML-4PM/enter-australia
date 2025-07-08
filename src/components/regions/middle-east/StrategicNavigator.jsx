import React, { useState } from 'react';
import { ChevronRight, ChevronDown, AlertTriangle, TrendingUp, Users, DollarSign, Globe, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const StrategicNavigator = ({ country, isPrivate = false, customer = null }) => {
  const [activeView, setActiveView] = useState('overview');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [showTradeoffs, setShowTradeoffs] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Dynamic scenarios based on country data
  const scenarios = [
    {
      id: 'conservative',
      name: 'Heritage First',
      description: `Focus on traditional knowledge preservation with minimal technology integration in ${country.name}`,
      omanBenefit: 95,
      australiaBenefit: 45,
      politicalRisk: 20,
      investment: '$15B',
      timeline: '15 years',
      pros: ['Low political risk', 'High cultural authenticity', 'Manageable investment'],
      cons: ['Limited global impact', 'Lower revenue potential', 'Reduced Australian engagement'],
      keyRisks: ['May not achieve economic transformation', 'Limited technology transfer']
    },
    {
      id: 'balanced',
      name: 'Heritage-Tech Balance',
      description: `Strategic integration of technology with heritage preservation in ${country.name}`,
      omanBenefit: 85,
      australiaBenefit: 80,
      politicalRisk: 45,
      investment: '$45B',
      timeline: '25 years',
      pros: ['Balanced value creation', 'Sustainable approach', 'Strong partnership foundation'],
      cons: ['Higher complexity', 'Longer timeline', 'Moderate political challenges'],
      keyRisks: ['Technology integration challenges', 'Cultural preservation concerns']
    },
    {
      id: 'aggressive',
      name: 'Innovation Accelerator',
      description: `Rapid technology deployment with heritage as foundation in ${country.name}`,
      omanBenefit: 75,
      australiaBenefit: 95,
      politicalRisk: 75,
      investment: '$75B',
      timeline: '20 years',
      pros: ['Maximum global impact', 'Fastest revenue generation', 'Technology leadership'],
      cons: ['High political risk', 'Cultural authenticity concerns', 'Massive investment'],
      keyRisks: ['Cultural backlash', 'Overextension', 'Dependency on Australia']
    }
  ];

  // Dynamic initiatives based on country opportunities
  const getInitiatives = () => {
    const baseInitiatives = [
      {
        id: 'primary',
        name: country.opportunities[0] || 'Primary Initiative',
        omanValue: { political: 85, economic: 70, cultural: 90 },
        australiaValue: { political: 60, economic: 85, cultural: 40 },
        complexity: 'High',
        timeline: '5-7 years',
        investment: '$8B',
        tradeoffs: {
          oman: [`High strategic value for ${country.name} but requires foreign technology`, 'Economic benefits take time to materialize'],
          australia: ['Major technology export opportunity but limited direct benefits', 'Relevant expertise highly applicable']
        },
        criticalSuccess: ['Local stakeholder engagement', 'Regulatory framework development', 'Technology transfer protocols']
      },
      {
        id: 'secondary',
        name: country.opportunities[1] || 'Secondary Initiative',
        omanValue: { political: 70, economic: 85, cultural: 75 },
        australiaValue: { political: 80, economic: 90, cultural: 70 },
        complexity: 'Medium',
        timeline: '3-5 years',
        investment: '$25B',
        tradeoffs: {
          oman: [`High revenue potential in ${country.name} but requires adaptation`, 'May require significant infrastructure'],
          australia: ['Strong sector expertise application', 'Limited unique competitive advantage']
        },
        criticalSuccess: ['Market readiness assessment', 'Partnership structure', 'Local capacity building']
      },
      {
        id: 'tertiary',
        name: country.opportunities[2] || 'Innovation Cities',
        omanValue: { political: 60, economic: 90, cultural: 80 },
        australiaValue: { political: 50, economic: 70, cultural: 30 },
        complexity: 'Very High',
        timeline: '10-15 years',
        investment: '$20B',
        tradeoffs: {
          oman: [`Massive economic transformation potential in ${country.name} but highest political risk`, 'Long-term commitment required'],
          australia: ['Limited direct role except consulting', 'Technology export opportunities']
        },
        criticalSuccess: ['Government alignment', 'International standards', 'Sustainability framework']
      }
    ];
    return baseInitiatives;
  };

  const initiatives = getInitiatives();

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
            {initiative.tradeoffs.oman.map((item, idx) => (
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
            <ValueCard title="Total Investment" value="$45B" color="text-green-600" icon={DollarSign} />
            <ValueCard title="Timeline" value="25 years" color="text-blue-600" icon={Clock} />
            <ValueCard title="Revenue Potential" value="$50B/year" color="text-purple-600" icon={TrendingUp} />
            <ValueCard title="Global Impact" value="High" color="text-orange-600" icon={Globe} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Strategic Choice Framework for {country.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">Heritage First</div>
                <div className="text-sm text-gray-600">Low risk, authentic approach</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">Balanced</div>
                <div className="text-sm text-gray-600">Strategic integration</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">Innovation</div>
                <div className="text-sm text-gray-600">High impact, high risk</div>
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
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${scenario.omanBenefit}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{scenario.omanBenefit}%</span>
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
                      <span>Political: {initiative.omanValue.political}% | Economic: {initiative.omanValue.economic}% | Cultural: {initiative.omanValue.cultural}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(initiative.omanValue.political + initiative.omanValue.economic + initiative.omanValue.cultural) / 3}%` }}></div>
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