import React, { useState, useEffect } from 'react';
import { fetchLinkedInActivity, seedBlogPosts } from '../utils/linkedinUtils';
import '../styles/blog/index.css';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        // First, ensure we have seed data in Supabase
        await seedBlogPosts();
        
        // Fetch blog posts with enhanced LinkedIn activity function
        const fetchedPosts = await fetchLinkedInActivity('theinnovater');
        
        console.log('Fetched blog posts:', fetchedPosts.length);
        
        // Transform posts to ensure consistent format
        const formattedPosts = fetchedPosts.map(post => ({
          id: post.id,
          title: post.title || 'Untitled Post',
          excerpt: post.excerpt || post.content?.substring(0, 150) + '...' || '',
          author: post.author || 'Enter Australia Team',
          date: new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          imageUrl: post.imageUrl || 'https://images.unsplash.com/photo-1483058712412-e9573fc25ebb?auto=format&fit=crop&w=1700&q=80',
          tags: post.tags || ['australia', 'tech'],
          url: post.url || '/blog'
        }));
        
        // Extract unique categories from articles' tags
        const allTags = formattedPosts.flatMap(article => article.tags || []);
        const uniqueCategories = [...new Set(allTags)];
        
        setArticles(formattedPosts);
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again later.");
        setLoading(false);
        
        // If there's an error, we'll fall back to placeholder data
        const placeholderArticles = [
          {
            id: '1',
            title: 'Navigating AUKUS: Tech Opportunities for US Companies',
            excerpt: 'How US tech firms can leverage the AUKUS partnership to secure Australian defence contracts.',
            author: 'Jane Smith',
            date: 'March 15, 2025',
            imageUrl: 'https://images.unsplash.com/photo-1483058712412-e9573fc25ebb?auto=format&fit=crop&w=1700&q=80',
            tags: ['defence', 'aukus', 'technology'],
            url: 'https://www.linkedin.com/in/theinnovater/recent-activity/all/'
          },
          {
            id: '2',
            title: 'The $10B Tech Opportunity in Australian Government',
            excerpt: 'Analysis of upcoming government technology procurement and how foreign companies can position themselves.',
            author: 'David Johnson',
            date: 'February 28, 2025',
            imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1700&q=80',
            tags: ['government', 'procurement', 'strategy'],
            url: 'https://www.linkedin.com/in/theinnovater/recent-activity/all/'
          },
          {
            id: '3',
            title: 'Setting Up Your Australian Business: ABN and Beyond',
            excerpt: 'A step-by-step guide to establishing your business presence in Australia for government contracts.',
            author: 'Sarah Williams',
            date: 'January 10, 2025',
            imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1700&q=80',
            tags: ['business', 'setup', 'compliance'],
            url: 'https://www.linkedin.com/in/theinnovater/recent-activity/all/'
          },
        ];
        setArticles(placeholderArticles);
        setCategories(['defence', 'aukus', 'technology', 'government', 'procurement', 'strategy', 'business', 'setup', 'compliance']);
      }
    };

    fetchArticles();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing categories
  };

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.tags && article.tags.includes(selectedCategory));

  // Paginate articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <section className="blog-section">
        <div className="container">
          <h2>Loading articles...</h2>
          <div className="blog-loader">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-header">
          <h2>Australian Tech Market Insights</h2>
          <p className="blog-intro">
            Expert analysis, market intelligence, and strategic guidance for tech companies targeting the Australian government sector and adjacent markets.
          </p>
        </div>
        
        <div className="blog-categories">
          <button 
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All Topics
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
        
        <div className="blog-grid">
          {currentArticles.length > 0 ? currentArticles.map((article) => (
            <div className="blog-card" key={article.id}>
              <div className="blog-image" style={{ backgroundImage: `url(${article.imageUrl})` }}></div>
              <div className="blog-content">
                <h3>{article.title}</h3>
                <p className="blog-meta">
                  By {article.author} | {article.date}
                </p>
                <p className="blog-excerpt">{article.excerpt}</p>
                <div className="blog-tags">
                  {article.tags?.map((tag) => (
                    <span key={tag} className="blog-tag" onClick={() => handleCategoryChange(tag)}>
                      {tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  ))}
                </div>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Read More</a>
              </div>
            </div>
          )) : (
            <div className="no-articles">
              <p>No articles found for the selected category. Please select another category.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="blog-pagination">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
            
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}

        <div className="blog-cta">
          <h3>Get More Insights</h3>
          <p>Subscribe to our newsletter for weekly Australian market intelligence and tender alerts.</p>
          <div className="cta-buttons">
            <a href="/resources#subscribe" className="btn primary">Subscribe Now</a>
            <a href="/contact" className="btn secondary">Request Custom Research</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
