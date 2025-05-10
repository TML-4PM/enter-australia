
import React from 'react';
import '../../styles/partners/partner-directory.css';

const PartnerSearchFilters = ({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedIndustry, 
  setSelectedIndustry,
  categories,
  industries
}) => {
  return (
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
  );
};

export default PartnerSearchFilters;
