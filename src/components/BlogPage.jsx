
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWuFUDXKfLNdqJGTk8jJLLXXLrwX0L55A",
  authDomain: "enteraustralia-tech.firebaseapp.com",
  projectId: "enteraustralia-tech",
  storageBucket: "enteraustralia-tech.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let articlesQuery;
        
        if (selectedCategory && selectedCategory !== 'all') {
          articlesQuery = query(
            collection(db, 'articles'),
            where('tags', 'array-contains', selectedCategory)
          );
        } else {
          articlesQuery = collection(db, 'articles');
        }
        
        const querySnapshot = await getDocs(articlesQuery);
        const articlesData = [];
        
        querySnapshot.forEach((doc) => {
          articlesData.push({ id: doc.id, ...doc.data() });
        });
        
        // Extract unique categories from articles' tags
        const allTags = articlesData.flatMap(article => article.tags || []);
        const uniqueCategories = [...new Set(allTags)];
        
        setArticles(articlesData);
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again later.");
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory]);

  // For demo purposes, let's create some placeholder articles if Firebase has no data
  useEffect(() => {
    if (!loading && articles.length === 0 && !error) {
      const placeholderArticles = [
        {
          id: '1',
          title: 'Navigating AUKUS: Tech Opportunities for US Companies',
          excerpt: 'How US tech firms can leverage the AUKUS partnership to secure Australian defence contracts.',
          author: 'Jane Smith',
          date: 'March 15, 2025',
          imageUrl: 'https://images.unsplash.com/photo-1483058712412-e9573fc25ebb?auto=format&fit=crop&w=1700&q=80',
          tags: ['defence', 'aukus', 'technology']
        },
        {
          id: '2',
          title: 'The $10B Tech Opportunity in Australian Government',
          excerpt: 'Analysis of upcoming government technology procurement and how foreign companies can position themselves.',
          author: 'David Johnson',
          date: 'February 28, 2025',
          imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1700&q=80',
          tags: ['government', 'procurement', 'strategy']
        },
        {
          id: '3',
          title: 'Setting Up Your Australian Business: ABN and Beyond',
          excerpt: 'A step-by-step guide to establishing your business presence in Australia for government contracts.',
          author: 'Sarah Williams',
          date: 'January 10, 2025',
          imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1700&q=80',
          tags: ['business', 'setup', 'compliance']
        },
      ];
      
      setArticles(placeholderArticles);
      setCategories(['defence', 'aukus', 'technology', 'government', 'procurement', 'strategy', 'business', 'setup', 'compliance']);
    }
  }, [loading, articles, error]);

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

  if (error) {
    return (
      <section className="blog-section">
        <div className="container">
          <h2>Blog</h2>
          <div className="error-message">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-section">
      <div className="container">
        <h2>Australian Government Tech Insights</h2>
        <p className="blog-intro">
          Expert analysis, market insights, and strategies for tech companies targeting the Australian government sector.
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
          {articles.map((article) => (
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
                <a href={`/blog/${article.id}`} className="read-more">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
