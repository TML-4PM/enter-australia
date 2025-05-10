
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackPageView } from '../utils/analyticsUtils';
import { Search } from 'lucide-react';
import '../styles/data-apis.css';

const DataApisPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Track page view on component mount
  useEffect(() => {
    trackPageView('/data-apis');
  }, []);

  // API categories
  const apiCategories = [
    { id: 'all', name: 'All APIs' },
    { id: 'government', name: 'Government APIs' },
    { id: 'financial', name: 'Financial Data' },
    { id: 'industry', name: 'Industry-specific' },
    { id: 'environmental', name: 'Environmental' }
  ];

  // API data
  const apiData = [
    {
      id: 'data-gov-au',
      name: 'data.gov.au API',
      category: 'government',
      description: 'Australia\'s central data catalog with thousands of government datasets spanning numerous agencies and departments.',
      url: 'https://data.gov.au/data/api/3/action/help_show?name=api',
      status: 'active',
      tags: ['open-data', 'government', 'datasets'],
      documentation: 'https://data.gov.au/dataset/api'
    },
    {
      id: 'abs-api',
      name: 'Australian Bureau of Statistics API',
      category: 'government',
      description: 'Access official Australian statistics including census data, economic indicators, and demographic information.',
      url: 'https://api.data.abs.gov.au/',
      status: 'active',
      tags: ['statistics', 'census', 'demographics', 'economics'],
      documentation: 'https://api.data.abs.gov.au/docs'
    },
    {
      id: 'rba-api',
      name: 'Reserve Bank of Australia API',
      category: 'financial',
      description: 'Financial and economic data including interest rates, exchange rates, and other monetary policy statistics.',
      url: 'https://www.rba.gov.au/statistics/tables/',
      status: 'active',
      tags: ['finance', 'economics', 'exchange-rates', 'interest-rates'],
      documentation: 'https://www.rba.gov.au/statistics/tables/'
    },
    {
      id: 'asx-api',
      name: 'ASX Market Data API',
      category: 'financial',
      description: 'Real-time and historical data for Australian Securities Exchange (ASX) listed companies.',
      url: 'https://www.asxonline.com/marketdata/services/',
      status: 'active',
      tags: ['stocks', 'market-data', 'finance', 'securities'],
      documentation: 'https://www.asxonline.com/developers/'
    },
    {
      id: 'bom-api',
      name: 'Bureau of Meteorology API',
      category: 'environmental',
      description: 'Weather data, forecasts, warnings, and climate information for all of Australia.',
      url: 'http://www.bom.gov.au/catalogue/data-feeds.shtml',
      status: 'active',
      tags: ['weather', 'climate', 'forecasts'],
      documentation: 'http://www.bom.gov.au/catalogue/data-feeds.shtml'
    },
    {
      id: 'geoscience-api',
      name: 'Geoscience Australia API',
      category: 'environmental',
      description: 'Spatial and geological data including elevation, boundaries, imagery, and natural hazard information.',
      url: 'https://www.ga.gov.au/data-pubs',
      status: 'active',
      tags: ['geology', 'maps', 'elevation', 'spatial-data'],
      documentation: 'https://www.ga.gov.au/data-pubs/web-services'
    },
    {
      id: 'agriculture-api',
      name: 'Department of Agriculture API',
      category: 'industry',
      description: 'Agricultural data including production statistics, biosecurity information, and export requirements.',
      url: 'https://www.agriculture.gov.au/abares/research-topics/agricultural-data',
      status: 'active',
      tags: ['agriculture', 'farming', 'exports', 'biosecurity'],
      documentation: 'https://www.agriculture.gov.au/abares/research-topics/agricultural-data'
    },
    {
      id: 'energy-api',
      name: 'Australian Energy Market Operator API',
      category: 'industry',
      description: 'Energy market data including electricity generation, pricing, and demand forecasts.',
      url: 'https://aemo.com.au/en/energy-systems/electricity/national-electricity-market-nem/data-nem',
      status: 'active',
      tags: ['energy', 'electricity', 'market-data', 'forecasting'],
      documentation: 'https://aemo.com.au/en/energy-systems/electricity/national-electricity-market-nem/data-nem/nedde-api'
    },
    {
      id: 'nbn-api',
      name: 'NBN Service Health API',
      category: 'industry',
      description: 'National Broadband Network service availability and performance data.',
      url: 'https://www.nbnco.com.au/develop',
      status: 'maintenance',
      tags: ['broadband', 'telecommunications', 'infrastructure'],
      documentation: 'https://www.nbnco.com.au/develop/technical-resources'
    },
    {
      id: 'patent-api',
      name: 'IP Australia API',
      category: 'government',
      description: 'Patent, trademark, and design data for intellectual property research.',
      url: 'https://www.ipaustralia.gov.au/tools-resources/api-information',
      status: 'active',
      tags: ['patents', 'trademarks', 'intellectual-property'],
      documentation: 'https://www.ipaustralia.gov.au/tools-resources/api-information'
    },
    {
      id: 'anzlic-api',
      name: 'ANZLIC Spatial Information API',
      category: 'government',
      description: 'Spatial data from the Australia New Zealand Land Information Council.',
      url: 'https://www.anzlic.gov.au/resources/spatial-information-resources',
      status: 'active',
      tags: ['spatial', 'geodata', 'mapping'],
      documentation: 'https://www.anzlic.gov.au/resources'
    },
    {
      id: 'tourism-api',
      name: 'Tourism Research Australia API',
      category: 'industry',
      description: 'Tourism statistics and visitor data for Australian tourism industry.',
      url: 'https://www.tra.gov.au/data-and-research',
      status: 'active',
      tags: ['tourism', 'visitors', 'accommodation'],
      documentation: 'https://www.tra.gov.au/data-and-research'
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

  return (
    <div className="data-apis-page">
      <div className="data-apis-hero">
        <h1>Australian Data APIs & Tools</h1>
        <p>Comprehensive collection of data sources and APIs for enhancing your applications with Australian market insights</p>
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
                <span className={`api-status ${api.status}`}>{api.status}</span>
              </div>
              <p className="api-description">{api.description}</p>
              <div className="api-tags">
                {api.tags.map(tag => (
                  <span key={`${api.id}-${tag}`} className="api-tag">{tag}</span>
                ))}
              </div>
              <div className="api-links">
                <a href={api.url} target="_blank" rel="noopener noreferrer" className="api-link">Access API</a>
                <a href={api.documentation} target="_blank" rel="noopener noreferrer" className="api-doc-link">Documentation</a>
              </div>
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
