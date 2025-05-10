
import React, { useState } from 'react';
import '../styles/faq-page.css';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const faqCategories = [
    { id: 'all', name: 'All FAQs' },
    { id: 'market-entry', name: 'Market Entry' },
    { id: 'govtech', name: 'GovTech Procurement' },
    { id: 'partnerships', name: 'Local Partnerships' },
    { id: 'compliance', name: 'Compliance & Regulations' },
    { id: 'grants', name: 'Grants & Incentives' },
  ];
  
  const faqs = [
    {
      id: 1,
      category: 'market-entry',
      question: 'How long does ABN registration take?',
      answer: 'We fast-track your ABN in 3–5 business days.'
    },
    {
      id: 2,
      category: 'market-entry',
      question: 'Is there any commitment after the free assessment?',
      answer: 'None—keep the report and templates whether you continue or not.'
    },
    {
      id: 3,
      category: 'market-entry',
      question: 'What happens after the 30 days?',
      answer: "You'll be fully operational with all legal and setup complete. Optional ongoing support is available."
    },
    {
      id: 4,
      category: 'govtech',
      question: 'Do you handle federal & state tenders?',
      answer: 'Yes—across all major departments and grant bodies.'
    },
    {
      id: 5,
      category: 'govtech',
      question: 'Can you help with grant proposals?',
      answer: 'Absolutely—we bundle grants under our Procurement service.'
    },
    {
      id: 6,
      category: 'partnerships',
      question: 'How many partners do you recommend?',
      answer: 'We start with 3–5 strategic partners, then scale to 10–15.'
    },
    {
      id: 7,
      category: 'partnerships',
      question: 'Do you negotiate commercial terms?',
      answer: "Yes—we'll help set margins, SLAs and co-sell SLAs."
    },
    {
      id: 8,
      category: 'compliance',
      question: 'Can you handle multi-jurisdictional regs?',
      answer: 'Yes—Australia, NZ, Singapore and more.'
    },
    {
      id: 9,
      category: 'compliance',
      question: 'What's included in the quarterly health check?',
      answer: 'Updated risk score, new recommendations, policy refresh.'
    },
    {
      id: 10,
      category: 'grants',
      question: 'What grants fit hardware-focused startups?',
      answer: 'We target both R&D tax and industry-specific invention grants.'
    },
    {
      id: 11,
      category: 'grants',
      question: 'Do you handle reporting requirements?',
      answer: 'Yes—we prepare templates and guide you through each milestone.'
    },
    {
      id: 12,
      category: 'market-entry',
      question: 'Do you provide ongoing support after market entry?',
      answer: 'Yes, we offer flexible retainer options to support your continued growth in the Australian market.'
    },
    {
      id: 13,
      category: 'govtech',
      question: 'What's your success rate with government tenders?',
      answer: 'Our clients experience a 65% shortlisting rate, compared to the industry average of 20%.'
    },
    {
      id: 14,
      category: 'partnerships',
      question: 'How do you vet potential partners?',
      answer: 'We have a 7-point assessment framework covering technical capabilities, market presence, financial stability, and cultural alignment.'
    },
    {
      id: 15,
      category: 'compliance',
      question: 'How often do Australian regulations change?',
      answer: 'Major regulatory frameworks typically update annually, with minor changes quarterly. Our monitoring ensures you stay compliant.'
    }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about entering and thriving in the Australian tech market.</p>
      </div>
      
      <div className="faq-container">
        <div className="faq-sidebar">
          <h3>Categories</h3>
          <ul className="category-list">
            {faqCategories.map(category => (
              <li key={category.id}>
                <button 
                  className={activeCategory === category.id ? 'active' : ''}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="faq-contact">
            <h3>Need more help?</h3>
            <p>We're here to answer your specific questions about the Australian market.</p>
            <a href="/contact" className="btn primary">Contact Us</a>
          </div>
        </div>
        
        <div className="faq-content">
          <h2>{activeCategory === 'all' ? 'All FAQs' : faqCategories.find(c => c.id === activeCategory).name}</h2>
          
          <div className="faq-list">
            {filteredFAQs.map(faq => (
              <div className="faq-item" key={faq.id}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
          
          {filteredFAQs.length === 0 && (
            <div className="no-faqs">
              <p>No FAQs found in this category.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="faq-cta">
        <h2>Still have questions?</h2>
        <p>Our team is ready to help you navigate the Australian tech market.</p>
        <div className="cta-buttons">
          <a href="/resources" className="btn secondary">Browse Resources</a>
          <a href="/contact" className="btn primary">Get In Touch</a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
