
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackPageView } from '../utils/analyticsUtils';
import { Search, Heart, Code, ExternalLink, Shield, Clock, Database } from 'lucide-react';
import '../styles/data-apis.css';

const DataApisPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('api-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCodeExample, setShowCodeExample] = useState(null);

  // Track page view on component mount
  useEffect(() => {
    trackPageView('/data-apis');
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('api-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (apiId) => {
    setFavorites(prev => 
      prev.includes(apiId) 
        ? prev.filter(id => id !== apiId)
        : [...prev, apiId]
    );
  };

  // Enhanced API categories
  const apiCategories = [
    { id: 'all', name: 'All APIs' },
    { id: 'government', name: 'Government APIs' },
    { id: 'financial', name: 'Financial Data' },
    { id: 'industry', name: 'Industry-specific' },
    { id: 'environmental', name: 'Environmental' },
    { id: 'health', name: 'Health & Social' },
    { id: 'transport', name: 'Transport & Infrastructure' }
  ];

  // Enhanced and expanded API data with 20 essential Australian APIs
  const apiData = [
    // Government APIs
    {
      id: 'data-gov-au',
      name: 'data.gov.au API',
      category: 'government',
      description: 'Australia\'s central data catalog with thousands of government datasets spanning numerous agencies and departments.',
      url: 'https://data.gov.au/data/api/3/action/help_show?name=api',
      status: 'active',
      tags: ['open-data', 'government', 'datasets'],
      documentation: 'https://data.gov.au/dataset/api',
      auth: 'API Key',
      rateLimit: '1000/hour',
      format: 'JSON, CSV, XML',
      responseTime: '~200ms'
    },
    {
      id: 'abs-api',
      name: 'Australian Bureau of Statistics API',
      category: 'government',
      description: 'Access official Australian statistics including census data, economic indicators, and demographic information.',
      url: 'https://api.data.abs.gov.au/',
      status: 'active',
      tags: ['statistics', 'census', 'demographics', 'economics'],
      documentation: 'https://api.data.abs.gov.au/docs',
      auth: 'Public',
      rateLimit: '500/hour',
      format: 'JSON, CSV',
      responseTime: '~300ms'
    },
    {
      id: 'ato-api',
      name: 'Australian Taxation Office API',
      category: 'government',
      description: 'Business registration, ABN lookup, and tax-related data for compliance and verification purposes.',
      url: 'https://abr.business.gov.au/json/',
      status: 'active',
      tags: ['tax', 'abn', 'business-registration', 'compliance'],
      documentation: 'https://api.business.gov.au/docs',
      auth: 'API Key',
      rateLimit: '1000/day',
      format: 'JSON, XML',
      responseTime: '~150ms'
    },
    {
      id: 'patent-api',
      name: 'IP Australia API',
      category: 'government',
      description: 'Patent, trademark, and design data for intellectual property research and due diligence.',
      url: 'https://www.ipaustralia.gov.au/tools-resources/api-information',
      status: 'active',
      tags: ['patents', 'trademarks', 'intellectual-property'],
      documentation: 'https://www.ipaustralia.gov.au/tools-resources/api-information',
      auth: 'OAuth 2.0',
      rateLimit: '200/hour',
      format: 'JSON',
      responseTime: '~400ms'
    },
    {
      id: 'anzlic-api',
      name: 'ANZLIC Spatial Information API',
      category: 'government',
      description: 'Comprehensive spatial data from the Australia New Zealand Land Information Council.',
      url: 'https://www.anzlic.gov.au/resources/spatial-information-resources',
      status: 'active',
      tags: ['spatial', 'geodata', 'mapping'],
      documentation: 'https://www.anzlic.gov.au/resources',
      auth: 'API Key',
      rateLimit: '300/hour',
      format: 'GeoJSON, JSON',
      responseTime: '~250ms'
    },

    // Financial APIs
    {
      id: 'rba-api',
      name: 'Reserve Bank of Australia API',
      category: 'financial',
      description: 'Official financial and economic data including interest rates, exchange rates, and monetary policy statistics.',
      url: 'https://www.rba.gov.au/statistics/tables/',
      status: 'active',
      tags: ['finance', 'economics', 'exchange-rates', 'interest-rates'],
      documentation: 'https://www.rba.gov.au/statistics/tables/',
      auth: 'Public',
      rateLimit: '100/hour',
      format: 'JSON, CSV, Excel',
      responseTime: '~200ms'
    },
    {
      id: 'asx-api',
      name: 'ASX Market Data API',
      category: 'financial',
      description: 'Real-time and historical data for Australian Securities Exchange (ASX) listed companies and market indices.',
      url: 'https://www.asxonline.com/marketdata/services/',
      status: 'active',
      tags: ['stocks', 'market-data', 'finance', 'securities'],
      documentation: 'https://www.asxonline.com/developers/',
      auth: 'API Key + Subscription',
      rateLimit: '1000/minute',
      format: 'JSON, FIX',
      responseTime: '~50ms'
    },
    {
      id: 'austrac-api',
      name: 'AUSTRAC Financial Intelligence API',
      category: 'financial',
      description: 'Anti-money laundering and counter-terrorism financing data for compliance and risk assessment.',
      url: 'https://www.austrac.gov.au/business/how-comply-and-report-guidance-and-resources/reporting/digital-reporting',
      status: 'active',
      tags: ['aml', 'compliance', 'financial-crime', 'reporting'],
      documentation: 'https://www.austrac.gov.au/business/how-comply-and-report-guidance-and-resources',
      auth: 'OAuth 2.0 + Registration',
      rateLimit: '50/hour',
      format: 'JSON, XML',
      responseTime: '~500ms'
    },

    // Environmental APIs
    {
      id: 'bom-api',
      name: 'Bureau of Meteorology API',
      category: 'environmental',
      description: 'Comprehensive weather data, forecasts, warnings, and climate information for all of Australia.',
      url: 'http://www.bom.gov.au/catalogue/data-feeds.shtml',
      status: 'active',
      tags: ['weather', 'climate', 'forecasts'],
      documentation: 'http://www.bom.gov.au/catalogue/data-feeds.shtml',
      auth: 'Public',
      rateLimit: '200/hour',
      format: 'JSON, XML, RSS',
      responseTime: '~300ms'
    },
    {
      id: 'geoscience-api',
      name: 'Geoscience Australia API',
      category: 'environmental',
      description: 'Spatial and geological data including elevation, boundaries, imagery, and natural hazard information.',
      url: 'https://www.ga.gov.au/data-pubs',
      status: 'active',
      tags: ['geology', 'maps', 'elevation', 'spatial-data'],
      documentation: 'https://www.ga.gov.au/data-pubs/web-services',
      auth: 'API Key',
      rateLimit: '500/hour',
      format: 'GeoJSON, WMS, WFS',
      responseTime: '~400ms'
    },

    // Industry APIs
    {
      id: 'agriculture-api',
      name: 'Department of Agriculture API',
      category: 'industry',
      description: 'Agricultural data including production statistics, biosecurity information, and export requirements.',
      url: 'https://www.agriculture.gov.au/abares/research-topics/agricultural-data',
      status: 'active',
      tags: ['agriculture', 'farming', 'exports', 'biosecurity'],
      documentation: 'https://www.agriculture.gov.au/abares/research-topics/agricultural-data',
      auth: 'API Key',
      rateLimit: '300/hour',
      format: 'JSON, CSV',
      responseTime: '~250ms'
    },
    {
      id: 'energy-api',
      name: 'Australian Energy Market Operator API',
      category: 'industry',
      description: 'Energy market data including electricity generation, pricing, demand forecasts, and grid stability metrics.',
      url: 'https://aemo.com.au/en/energy-systems/electricity/national-electricity-market-nem/data-nem',
      status: 'active',
      tags: ['energy', 'electricity', 'market-data', 'forecasting'],
      documentation: 'https://aemo.com.au/en/energy-systems/electricity/national-electricity-market-nem/data-nem/nedde-api',
      auth: 'Registration Required',
      rateLimit: '100/hour',
      format: 'JSON, CSV, XML',
      responseTime: '~350ms'
    },
    {
      id: 'accc-api',
      name: 'ACCC Competition & Consumer API',
      category: 'industry',
      description: 'Consumer protection data, market competition analysis, and regulatory compliance information.',
      url: 'https://www.accc.gov.au/business/business-rights-protections/competition-and-consumer-act',
      status: 'active',
      tags: ['competition', 'consumer-protection', 'regulation'],
      documentation: 'https://www.accc.gov.au/about-us/contact-us/other-ways-to-contact-us/data-request',
      auth: 'API Key + Registration',
      rateLimit: '150/hour',
      format: 'JSON',
      responseTime: '~300ms'
    },
    {
      id: 'tourism-api',
      name: 'Tourism Research Australia API',
      category: 'industry',
      description: 'Tourism statistics, visitor data, and accommodation insights for Australian tourism industry analysis.',
      url: 'https://www.tra.gov.au/data-and-research',
      status: 'active',
      tags: ['tourism', 'visitors', 'accommodation'],
      documentation: 'https://www.tra.gov.au/data-and-research',
      auth: 'Registration Required',
      rateLimit: '200/hour',
      format: 'JSON, Excel',
      responseTime: '~200ms'
    },

    // Transport & Infrastructure APIs
    {
      id: 'nbn-api',
      name: 'NBN Service Health API',
      category: 'transport',
      description: 'National Broadband Network service availability, performance data, and infrastructure status.',
      url: 'https://www.nbnco.com.au/develop',
      status: 'active',
      tags: ['broadband', 'telecommunications', 'infrastructure'],
      documentation: 'https://www.nbnco.com.au/develop/technical-resources',
      auth: 'OAuth 2.0',
      rateLimit: '100/hour',
      format: 'JSON',
      responseTime: '~250ms'
    },
    {
      id: 'transport-nsw-api',
      name: 'Transport for NSW API',
      category: 'transport',
      description: 'Public transport data including real-time arrivals, trip planning, and service disruptions for NSW.',
      url: 'https://opendata.transport.nsw.gov.au/',
      status: 'active',
      tags: ['public-transport', 'real-time', 'trip-planning'],
      documentation: 'https://opendata.transport.nsw.gov.au/documentation',
      auth: 'API Key',
      rateLimit: '500/hour',
      format: 'JSON, GTFS',
      responseTime: '~150ms'
    },
    {
      id: 'vicroads-api',
      name: 'VicRoads Traffic API',
      category: 'transport',
      description: 'Traffic conditions, road closures, and incident data for Victoria state road network.',
      url: 'https://www.vicroads.vic.gov.au/traffic-and-road-use/road-network-and-performance/road-use-and-performance',
      status: 'active',
      tags: ['traffic', 'road-conditions', 'incidents'],
      documentation: 'https://www.vicroads.vic.gov.au/traffic-and-road-use/traffic-management/open-data-platform',
      auth: 'API Key',
      rateLimit: '300/hour',
      format: 'JSON, XML',
      responseTime: '~200ms'
    },

    // Health & Social APIs
    {
      id: 'medicare-api',
      name: 'Medicare Benefits Schedule API',
      category: 'health',
      description: 'Medicare benefits data, provider information, and healthcare service pricing for the Australian healthcare system.',
      url: 'https://www.health.gov.au/resources/apps-and-tools/medicare-benefits-schedule-mbs-online',
      status: 'active',
      tags: ['healthcare', 'medicare', 'benefits', 'providers'],
      documentation: 'https://www.health.gov.au/resources/apps-and-tools',
      auth: 'Registration + OAuth 2.0',
      rateLimit: '100/hour',
      format: 'JSON, XML',
      responseTime: '~400ms'
    },
    {
      id: 'aihw-api',
      name: 'Australian Institute of Health & Welfare API',
      category: 'health',
      description: 'Health statistics, welfare data, and population health indicators for research and policy development.',
      url: 'https://www.aihw.gov.au/reports-data',
      status: 'active',
      tags: ['health-statistics', 'welfare', 'population-health'],
      documentation: 'https://www.aihw.gov.au/reports-data/metadata-online',
      auth: 'API Key',
      rateLimit: '250/hour',
      format: 'JSON, CSV, Excel',
      responseTime: '~350ms'
    },
    {
      id: 'centrelink-api',
      name: 'Services Australia API',
      category: 'health',
      description: 'Centrelink and social services data including payment information and eligibility criteria.',
      url: 'https://www.servicesaustralia.gov.au/organisations/business/services/medicare-provider-services',
      status: 'active',
      tags: ['social-services', 'payments', 'eligibility'],
      documentation: 'https://www.servicesaustralia.gov.au/organisations/business/services',
      auth: 'OAuth 2.0 + Registration',
      rateLimit: '50/hour',
      format: 'JSON',
      responseTime: '~500ms'
    }
  ];

  // Filter APIs based on search query and active category
  const filteredApis = apiData.filter(api => {
    const matchesSearch = api.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         api.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         api.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
                         
    const matchesCategory = activeCategory === 'all' || api.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCodeExample = (api) => {
    return `// ${api.name} Integration Example
const API_KEY = 'your_api_key_here';
const BASE_URL = '${api.url}';

// Fetch data from ${api.name}
async function fetch${api.name.replace(/[^a-zA-Z0-9]/g, '')}Data() {
  try {
    const response = await fetch(\`\${BASE_URL}/endpoint\`, {
      headers: {
        'Authorization': 'Bearer \${API_KEY}',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Usage
fetch${api.name.replace(/[^a-zA-Z0-9]/g, '')}Data()
  .then(data => {
    // Process your data here
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Failed to fetch data:', error);
  });`;
  };

  return (
    <div className="data-apis-page">
      <div className="data-apis-hero">
        <h1>Australian Data APIs & Tools</h1>
        <p>Comprehensive collection of 20 essential data sources and APIs for enhancing your applications with Australian market insights</p>
      </div>
      
      <div className="data-apis-content">
        <div className="data-apis-controls">
          <div className="data-apis-search">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search APIs by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="data-apis-categories">
            {apiCategories.map(category => (
              <button
                key={category.id}
                className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="data-apis-grid">
          {filteredApis.map(api => (
            <div key={api.id} className="api-card">
              <div className="api-card-header">
                <h3>{api.name}</h3>
                <div className="api-card-actions">
                  <button
                    className={`favorite-btn ${favorites.includes(api.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(api.id)}
                    title={favorites.includes(api.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart size={16} fill={favorites.includes(api.id) ? 'currentColor' : 'none'} />
                  </button>
                  <span className={`api-status ${api.status}`}>{api.status}</span>
                </div>
              </div>
              
              <p className="api-description">{api.description}</p>
              
              <div className="api-meta">
                <div className="api-meta-item">
                  <Shield size={14} />
                  <span>Auth: {api.auth}</span>
                </div>
                <div className="api-meta-item">
                  <Clock size={14} />
                  <span>Rate: {api.rateLimit}</span>
                </div>
                <div className="api-meta-item">
                  <Database size={14} />
                  <span>Format: {api.format}</span>
                </div>
                <div className="api-meta-item">
                  <span className="response-time">~{api.responseTime}</span>
                </div>
              </div>
              
              <div className="api-tags">
                {api.tags.map(tag => (
                  <span key={`${api.id}-${tag}`} className="api-tag">{tag}</span>
                ))}
              </div>
              
              <div className="api-links">
                <a href={api.url} target="_blank" rel="noopener noreferrer" className="api-link">
                  <ExternalLink size={14} />
                  Access API
                </a>
                <a href={api.documentation} target="_blank" rel="noopener noreferrer" className="api-doc-link">
                  Documentation
                </a>
                <button 
                  className="code-example-btn"
                  onClick={() => setShowCodeExample(showCodeExample === api.id ? null : api.id)}
                >
                  <Code size={14} />
                  {showCodeExample === api.id ? 'Hide Code' : 'Code Example'}
                </button>
              </div>
              
              {showCodeExample === api.id && (
                <div className="code-example">
                  <pre><code>{getCodeExample(api)}</code></pre>
                </div>
              )}
            </div>
          ))}
          
          {filteredApis.length === 0 && (
            <div className="no-results">
              <h3>No APIs Found</h3>
              <p>Try adjusting your search query or category filter</p>
            </div>
          )}
        </div>
        
        <div className="data-apis-info">
          <h2>Using Australian Data APIs</h2>
          <p>
            These APIs provide valuable data sources for companies entering the Australian market. 
            They can help with market research, compliance requirements, and product localization.
          </p>
          <div className="data-apis-tips">
            <div className="tip">
              <h3>Authentication</h3>
              <p>Most government APIs require registration and API key authentication. Some may require additional verification for sensitive data.</p>
            </div>
            <div className="tip">
              <h3>Rate Limiting</h3>
              <p>Be aware of rate limits on these APIs. Government APIs typically have more stringent limits than commercial ones.</p>
            </div>
            <div className="tip">
              <h3>Data Licensing</h3>
              <p>Check the licensing terms for each API. Many Australian government datasets are under Creative Commons licensing.</p>
            </div>
            <div className="tip">
              <h3>Integration Support</h3>
              <p>Use our code examples as starting points. Each API has different authentication and response formats.</p>
            </div>
          </div>
        </div>
        
        <div className="data-apis-cta">
          <h2>Need Help Integrating Australian Data?</h2>
          <p>Our consultants can help you identify the most relevant data sources and integrate them into your applications.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="primary-btn">Request Consultation</Link>
            <Link to="/resources" className="secondary-btn">View More Resources</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataApisPage;
