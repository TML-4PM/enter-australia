
import React from 'react';
import Navigation from './Navigation';

const Header = ({ isMenuOpen, toggleMenu, closeMenu }) => {
  return (
    <header>
      <Navigation 
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
      />
    </header>
  );
};

export default Header;
