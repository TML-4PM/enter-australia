
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = ({ isMenuOpen, toggleMenu, closeMenu }) => {
  return (
    <nav>
      <Link to="/" className="logo" onClick={closeMenu}>Enter Australia</Link>
      <ul className={isMenuOpen ? 'active' : ''}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
        {isMenuOpen && (
          <li className="visible-mobile">
            <Link to="/contact" className="nav-cta mobile" onClick={closeMenu}>
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
        <Link to="/contact" className="nav-cta">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navigation;
