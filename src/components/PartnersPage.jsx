
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { Search, Briefcase, Handshake, Users, Building, LinkIcon } from 'lucide-react';
import '../styles/partners.css';

const PartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [featuredPartners, setFeaturedPartners] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch partners from Supabase
  useEffect(() => {
    const fetchPartners = async () => {
      setIsLoading(true);
      try {
        // Get all partners
        let query = supabase
          .from('partners')
          .select('*')
          .eq('is_active', true);
          
        const { data: partnersData, error: partnersError } = await query;

        if (partnersError) throw partnersError;

        // Get featured partners
        const { data: featuredData, error: featuredError } = await supabase
          .from('partners')
          .select('*')
          .eq('is_active', true)
          .eq('is_featured', true)
          .limit(4);

        if (featuredError) throw featuredError;

        setPartners(partnersData || []);
        setFeaturedPartners(featuredData || []);
      } catch (err) {
        console.error('Error fetching partners:', err);
        setError('Failed to load partners directory. Please try again later.');
        // For demo purposes, let's add some sample data if fetching fails
        setPartners(samplePartners);
        setFeaturedPartners(samplePartners.filter(p => p.is_featured));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Filter partners based on search, category, and industry
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = 
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (partner.industry && partner.industry.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (partner.specialty && partner.specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || partner.category === selectedCategory;
    const matchesIndustry = selectedIndustry === 'all' || partner.industry === selectedIndustry;
    
    return matchesSearch && matchesCategory && matchesIndustry;
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(partners.map(partner => partner.category))];
  
  // Get unique industries for filter
  const industries = ['all', ...new Set(partners.filter(partner => partner.industry).map(partner => partner.industry))];

  return (
    <section className="partners-page">
      {/* Hero Section */}
      <div className="partners-hero">
        <h1>Strategic Partnerships for Australian Market Success</h1>
        <p>Leverage our network of local partners to accelerate your business growth and market entry</p>
      </div>

      {/* Partnership Value Proposition */}
      <div className="partnership-value">
        <div className="value-container">
          <div className="value-text">
            <h2>Partnerships: Your Strategic Entry Point</h2>
            <p>
              Contracting and partnering is often the most effective strategy for entering the Australian market. 
              By leveraging established local relationships, you can rapidly expand your footprint while minimizing risk.
            </p>
            <p>
              Our partnership network becomes an extension of your organization – effectively your APAC or Australian 
              leadership team – providing local expertise and credibility from day one.
            </p>
          </div>
          <div className="value-cards">
            <div className="value-card">
              <Handshake size={36} />
              <h3>Strategic Alliances</h3>
              <p>Form strategic partnerships that open doors to new opportunities and markets</p>
            </div>
            <div className="value-card">
              <Users size={36} />
              <h3>Force Multiplier</h3>
              <p>Multiply your capabilities through complementary skills and networks</p>
            </div>
            <div className="value-card">
              <Building size={36} />
              <h3>Local Expertise</h3>
              <p>Access deep industry knowledge and established relationships in the Australian market</p>
            </div>
            <div className="value-card">
              <Briefcase size={36} />
              <h3>Global Best Practices</h3>
              <p>Fill RFTs and opportunities with best-in-class solutions and expertise</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Partners Section */}
      <div className="featured-partners">
        <h2>Featured Partners</h2>
        <p>Collaborating with industry leaders to deliver exceptional results</p>
        
        <div className="featured-partners-grid">
          {isLoading ? (
            <div className="loading">Loading featured partners...</div>
          ) : (
            featuredPartners.length > 0 ? (
              featuredPartners.map(partner => (
                <div key={partner.id} className="featured-partner-card">
                  <div className="partner-logo">
                    <img src={partner.logo_url} alt={`${partner.name} logo`} />
                  </div>
                  <h3>{partner.name}</h3>
                  <p>{partner.description}</p>
                  <div className="partner-tags">
                    {partner.industry && <span className="partner-industry">{partner.industry}</span>}
                    {partner.partnership_level && (
                      <span className="partner-level">{partner.partnership_level}</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-partners">No featured partners to display.</div>
            )
          )}
        </div>
      </div>
      
      {/* Partner Directory Section */}
      <div className="partner-directory">
        <h2>Partner Ecosystem</h2>
        <p>Browse our extensive network of 250+ partners across various industries and specialties</p>
        
        {/* Search and Filters */}
        <div className="directory-filters">
          <div className="search-box">
            <Search size={20} />
            <input 
              type="text"
              placeholder="Search partners by name, industry, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="filter-controls">
            <div className="filter-group">
              <label>Category:</label>
              <div className="category-filter">
                {categories.map((category) => (
                  <button 
                    key={category}
                    className={selectedCategory === category ? 'active' : ''}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <label>Industry:</label>
              <div className="industry-filter">
                {industries.map((industry) => (
                  <button 
                    key={industry}
                    className={selectedIndustry === industry ? 'active' : ''}
                    onClick={() => setSelectedIndustry(industry)}
                  >
                    {industry === 'all' ? 'All Industries' : industry}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Partners List */}
        <div className="partners-grid">
          {isLoading ? (
            <div className="loading">Loading partners directory...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            filteredPartners.length > 0 ? (
              filteredPartners.map(partner => (
                <div key={partner.id} className="partner-card">
                  <div className="partner-logo">
                    <img src={partner.logo_url} alt={`${partner.name} logo`} />
                  </div>
                  <h3>{partner.name}</h3>
                  <div className="partner-category">{partner.category}</div>
                  <p>{partner.description}</p>
                  <div className="partner-details">
                    <div className="partner-tags">
                      {partner.industry && <span className="partner-industry">{partner.industry}</span>}
                      {partner.specialty && <span className="partner-specialty">{partner.specialty}</span>}
                    </div>
                    {partner.website && (
                      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="partner-website">
                        <LinkIcon size={16} /> Website
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-partners">No partners found matching your search criteria.</div>
            )
          )}
        </div>
      </div>
      
      {/* Partnership Process */}
      <div className="partnership-process">
        <h2>How We Integrate as Your Australian Leadership Team</h2>
        <p>We function as an extension of your organization in the Australian market</p>
        
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Skill Mapping</h3>
            <p>We identify complementary skills and capabilities between partners</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Opportunity Alignment</h3>
            <p>We match partners with relevant market opportunities</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Force Multiplication</h3>
            <p>We leverage collective strengths to amplify impact and reach</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Seamless Integration</h3>
            <p>We function as your local Australian leadership team</p>
          </div>
        </div>
      </div>
      
      {/* Case Studies/Success Stories */}
      <div className="partner-success-stories">
        <h2>Partnership Success Stories</h2>
        <p>Real results achieved through our strategic partnerships</p>
        
        <div className="stories-container">
          <div className="success-story">
            <h3>Government Technology Integration</h3>
            <p>
              A US-based cybersecurity firm partnered with a local systems integrator 
              through our network to secure a major government contract worth $8.5M.
            </p>
          </div>
          <div className="success-story">
            <h3>Healthcare Innovation Alliance</h3>
            <p>
              We facilitated a partnership between a European medtech company and an 
              Australian healthcare provider, reducing market entry time by 65%.
            </p>
          </div>
          <div className="success-story">
            <h3>Cross-Border Technology Transfer</h3>
            <p>
              A Canadian SaaS provider leveraged our partner network to establish 
              local credibility, increasing sales by 210% within 18 months.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="partners-cta">
        <h2>Become a Partner</h2>
        <p>Join our network of innovative companies shaping the future of technology in Australia</p>
        <div className="cta-buttons">
          <Link to="/contact" className="btn primary">Apply to Partner With Us</Link>
          <Link to="/solutions" className="btn secondary">Explore Other Solutions</Link>
        </div>
      </div>
    </section>
  );
};

// Sample partners data for demo or in case of API error
const samplePartners = [
  {
    id: 1,
    name: "TechSys Solutions",
    category: "integrator",
    industry: "IT Services",
    specialty: "Government Systems",
    description: "Leading systems integrator specializing in government and enterprise solutions.",
    logo_url: "https://placehold.co/200x100/00843D/FFFFFF?text=TechSys",
    website: "https://example.com",
    partnership_level: "Premier",
    is_featured: true,
    is_active: true
  },
  {
    id: 2,
    name: "DataPoint Analytics",
    category: "technology",
    industry: "Data & Analytics",
    specialty: "AI/ML Solutions",
    description: "Advanced analytics and data engineering partner for decision intelligence.",
    logo_url: "https://placehold.co/200x100/0A3161/FFFFFF?text=DataPoint",
    website: "https://example.com",
    partnership_level: "Gold",
    is_featured: true,
    is_active: true
  },
  {
    id: 3,
    name: "SoftWave Consulting",
    category: "consultant",
    industry: "Software Development",
    specialty: "Enterprise Architecture",
    description: "Software engineering and architecture specialists with deep enterprise experience.",
    logo_url: "https://placehold.co/200x100/FFCD00/000000?text=SoftWave",
    website: "https://example.com",
    partnership_level: "Silver",
    is_featured: false,
    is_active: true
  },
  {
    id: 4,
    name: "SecurePath Cyber",
    category: "technology",
    industry: "Cybersecurity",
    specialty: "Compliance & Risk Management",
    description: "Comprehensive cybersecurity services and compliance for regulated industries.",
    logo_url: "https://placehold.co/200x100/E9483F/FFFFFF?text=SecurePath",
    website: "https://example.com",
    partnership_level: "Gold",
    is_featured: true,
    is_active: true
  },
  {
    id: 5,
    name: "CloudMatrix Systems",
    category: "integrator",
    industry: "Cloud Infrastructure",
    specialty: "Multi-cloud Management",
    description: "Cloud migration and infrastructure modernization experts for AWS and Azure.",
    logo_url: "https://placehold.co/200x100/8BA58F/FFFFFF?text=CloudMatrix",
    website: "https://example.com",
    partnership_level: "Silver",
    is_featured: false,
    is_active: true
  },
  {
    id: 6,
    name: "HealthTech Solutions",
    category: "technology",
    industry: "Healthcare",
    specialty: "EMR Systems",
    description: "Specialized healthcare technology solutions for hospitals and clinics.",
    logo_url: "https://placehold.co/200x100/00843D/FFFFFF?text=HealthTech",
    website: "https://example.com",
    partnership_level: "Silver",
    is_featured: false,
    is_active: true
  },
  {
    id: 7,
    name: "GovConnect",
    category: "reseller",
    industry: "Government",
    specialty: "Tender Response",
    description: "Premier government procurement and tender response specialists.",
    logo_url: "https://placehold.co/200x100/0A3161/FFFFFF?text=GovConnect",
    website: "https://example.com",
    partnership_level: "Premier",
    is_featured: true,
    is_active: true
  },
  {
    id: 8,
    name: "FinSmart Technologies",
    category: "technology",
    industry: "Financial Services",
    specialty: "Payments & Compliance",
    description: "Fintech solutions provider specializing in payment systems and compliance.",
    logo_url: "https://placehold.co/200x100/FFCD00/000000?text=FinSmart",
    website: "https://example.com",
    partnership_level: "Gold",
    is_featured: false,
    is_active: true
  }
];

export default PartnersPage;
