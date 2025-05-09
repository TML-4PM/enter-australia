
import React, { useState, useEffect } from 'react';
import { fetchLinkedInActivity } from '../utils/linkedinUtils';
import '../styles/blog.css';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        // Fetch LinkedIn activity first
        const linkedinPosts = await fetchLinkedInActivity('theinnovater');
        
        // Transform LinkedIn posts into article format
        const articlesFromLinkedIn = linkedinPosts.map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.content,
          author: post.author,
          date: new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          imageUrl: post.imageUrl,
          tags: ['linkedin', 'tech', 'australia'], // Default tags
          url: post.url
        }));
        
        // Extract unique categories from articles' tags
        const allTags = articlesFromLinkedIn.flatMap(article => article.tags || []);
        const uniqueCategories = [...new Set(allTags)];
        
        console.log('Fetched LinkedIn articles:', articlesFromLinkedIn.length);
        console.log('Unique categories:', uniqueCategories);
        
        setArticles(articlesFromLinkedIn);
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again later.");
        setLoading(false);
        
        // If there's an error, we'll fall back to placeholder data
        setArticles([
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
        ]);
        setCategories(['defence', 'aukus', 'technology', 'government', 'procurement', 'strategy', 'business', 'setup', 'compliance']);
      }
    };

    fetchArticles();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <section className="blog-section">
        <div className="container">
          <h2>Loading articles...</h2>
        </div>
      </section>
    );
  }

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.tags && article.tags.includes(selectedCategory));

  return (
    <section className="blog-section">
      <div className="container">
        <h2>Australian Government Tech Insights</h2>
        <p className="blog-intro">
          Expert analysis, market insights, and strategies for tech companies targeting the Australian government sector.
          Content sourced from <a href="https://www.linkedin.com/in/theinnovater/recent-activity/all/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
        </p>
        
        <div className="blog-categories">
          <button 
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="blog-grid">
          {filteredArticles.length > 0 ? filteredArticles.map((article) => (
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
                      {tag}
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
      </div>
    </section>
  );
};

export default BlogPage;
