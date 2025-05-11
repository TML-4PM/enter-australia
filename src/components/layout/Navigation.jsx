
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

const Navigation = ({ isMenuOpen, toggleMenu, closeMenu }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <nav>
      <Link to="/" className="logo" onClick={closeMenu}>Enter Australia</Link>
      <ul className={isMenuOpen ? 'active' : ''}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li className="has-dropdown">
          <Link to="/solutions" onClick={closeMenu}>Solutions</Link>
          <ul className="nav-dropdown">
            <li><Link to="/solutions/market-entry" onClick={closeMenu}>Market Entry</Link></li>
            <li><Link to="/solutions/govtech" onClick={closeMenu}>GovTech</Link></li>
            <li><Link to="/solutions/partnerships" onClick={closeMenu}>Partnerships</Link></li>
            <li><Link to="/solutions/compliance" onClick={closeMenu}>Compliance</Link></li>
            <li><Link to="/solutions/grants" onClick={closeMenu}>Grants</Link></li>
          </ul>
        </li>
        <li><Link to="/partners" onClick={closeMenu}>Partners</Link></li>
        <li><Link to="/regions" onClick={closeMenu}>Regions</Link></li>
        <li><Link to="/pricing" onClick={closeMenu}>Pricing</Link></li>
        <li className="has-dropdown">
          <Link to="/resources" onClick={closeMenu}>Resources</Link>
          <ul className="nav-dropdown">
            <li><Link to="/resources" onClick={closeMenu}>Resource Hub</Link></li>
            <li><Link to="/webinars" onClick={closeMenu}>Webinars</Link></li>
            <li><Link to="/faq" onClick={closeMenu}>FAQs</Link></li>
            <li><Link to="/data-apis" onClick={closeMenu}>Data APIs</Link></li>
          </ul>
        </li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        {isMenuOpen && (
          <>
            <li className="visible-mobile">
              <Link to="/login" className="nav-secondary" onClick={closeMenu}>Log In</Link>
            </li>
            <li className="visible-mobile">
              <Link to="/register" className="nav-secondary" onClick={closeMenu}>Register</Link>
            </li>
            <li className="visible-mobile">
              <Link to="/contact" className="nav-cta mobile" onClick={closeMenu}>
                Get Started
              </Link>
            </li>
          </>
        )}
      </ul>
      <button 
        className="menu-toggle" 
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className="nav-actions desktop-only">
        <div className="user-menu-wrapper">
          <button 
            className="user-menu-toggle"
            onClick={toggleUserMenu}
            aria-label="User menu"
          >
            <User size={20} />
          </button>
          {showUserMenu && (
            <div className="user-dropdown">
              <Link to="/login" onClick={() => setShowUserMenu(false)}>Log In</Link>
              <Link to="/register" onClick={() => setShowUserMenu(false)}>Register</Link>
              <Link to="/profile" onClick={() => setShowUserMenu(false)}>Profile</Link>
            </div>
          )}
        </div>
        <Link to="/contact" className="nav-cta">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navigation;
