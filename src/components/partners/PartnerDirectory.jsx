import React from 'react';
import { Search } from 'lucide-react';
import PartnerSearchFilters from './PartnerSearchFilters';
import PartnerCard from './PartnerCard';
import '../../styles/partners/partner-directory.css';

const PartnerDirectory = ({ 
  partners, 
  isLoading, 
  error, 
  searchQuery, 
  setSearchQuery, 
  selectedCategory,
  setSelectedCategory,
  selectedIndustry,
  setSelectedIndustry,
  categories,
  industries
}) => {
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

  return (
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
        
        <PartnerSearchFilters 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          categories={categories}
          industries={industries}
        />
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
              <PartnerCard key={partner.id} partner={partner} />
            ))
          ) : (
            <div className="no-partners">No partners found matching your search criteria.</div>
          )
        )}
      </div>
    </div>
  );
};

export default PartnerDirectory;
