
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="not-found-actions">
            <Link to="/" className="btn primary">
              <Home size={20} />
              Go Home
            </Link>
            <Link to="/about" className="btn secondary">
              <Search size={20} />
              Learn More
            </Link>
          </div>
          
          <div className="helpful-links">
            <h3>Popular Pages</h3>
            <ul>
              <li><Link to="/solutions">Solutions</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/resources">Resources</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
