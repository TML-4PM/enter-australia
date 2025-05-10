
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = ({ isMenuOpen, toggleMenu, closeMenu }) => {
  return (
    <nav>
      <div className="logo">enterAustralia<span>tech</span></div>
      <ul className={isMenuOpen ? 'active' : ''}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/solutions" onClick={closeMenu}>Solutions</Link></li>
        <li><Link to="/partners" onClick={closeMenu}>Partners</Link></li>
        <li><Link to="/regions" onClick={closeMenu}>Regions</Link></li>
        <li><Link to="/pricing" onClick={closeMenu}>Pricing</Link></li>
        <li><Link to="/opportunities" onClick={closeMenu}>Opportunities</Link></li>
        <li><Link to="/webinars" onClick={closeMenu}>Webinars</Link></li>
        <li><Link to="/resources" onClick={closeMenu}>Resources</Link></li>
        <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
        <li><Link to="/faq" onClick={closeMenu}>FAQ</Link></li>
        {isMenuOpen && (
          <li className="visible-mobile">
            <Link to="/pricing" className="nav-cta mobile" onClick={closeMenu}>
              Get Started
            </Link>
          </li>
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
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/pricing" className="nav-cta">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navigation;
