import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const phoneNumber = '+917696329012';
  const whatsappNumber = '917696329012';
  const whatsappMessage = encodeURIComponent("Hello Ortthiva, I'm interested in your premium mattresses. I'd like to know more about your products.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
        <div className="logo-icon">
  <img 
    src="https://i.postimg.cc/Zngg1dfs/Whats-App-Image-2026-05-09-at-19-23-32-removebg-preview.png" 
    alt="Ortthiva Logo" 
  />
</div>
          <div className="logo-text">
            <span className="logo-main">ORTTHIVA</span>
            <span className="logo-sub">Premium Mattresses</span>
          </div>
        </Link>
        
        <button 
          className={`menu-toggle ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={`nav-links ${isOpen ? 'mobile-open' : ''}`}>
          <li><NavLink to="/" onClick={closeMenu} end>Home</NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/products" onClick={closeMenu}>Mattresses</NavLink></li>
          <li><NavLink to="/reviews" onClick={closeMenu}>Reviews</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
          <li className="mobile-contact">
            <a href={`tel:${phoneNumber}`} className="mobile-phone-btn">
              📞 {phoneNumber}
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mobile-wa-btn">
              💬 WhatsApp
            </a>
          </li>
        </ul>
        
        <div className="nav-contact">
          <a href={`tel:${phoneNumber}`} className="phone-btn">
            📞 {phoneNumber}
          </a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="WhatsApp">
            💬
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;