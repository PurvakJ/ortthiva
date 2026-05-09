import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const phoneNumber = '+917696329012';
  const whatsappNumber = '917696329012';
  const whatsappMessage = encodeURIComponent("Hello Ortthiva, I'm interested in your premium mattresses. I'd like to know more about your products and consultation services.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
          <div className="logo-icon">
  <img 
    src="https://i.postimg.cc/Zngg1dfs/Whats-App-Image-2026-05-09-at-19-23-32-removebg-preview.png" 
    alt="Ortthiva Logo" 
  />
</div>
            <h3>Ortthiva</h3>
          </div>
          <p className="brand-tagline">Better Alignment. Better Sleep. Better You.</p>
          <p className="brand-description">Premium mattress manufacturing brand dedicated to engineering sleep solutions that merge orthopedic precision with luxurious comfort. Proudly made in India.</p>
          <div className="trust-badges">
            <span>🇮🇳 Made in India</span>
            <span>🩺 Doctor Recommended</span>
            <span>🛡️ 5+ Year Warranty</span>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Our Mattresses</Link></li>
            <li><Link to="/about">About Ortthiva</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/book-appointment">Book Consultation</Link></li>
            <li><Link to="/reviews">Customer Reviews</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Our Products</h3>
          <ul>
            <li><Link to="/products?category=orthopedic">🩺 Orthopedic Mattress</Link></li>
            <li><Link to="/products?category=memory-foam">🌀 Memory Foam Mattress</Link></li>
            <li><Link to="/products?category=latex">🌿 Natural Latex</Link></li>
            <li><Link to="/products?category=hybrid">✨ Hybrid Mattress</Link></li>
            <li><Link to="/products?category=accessories">🛌 Mattress Accessories</Link></li>
            <li><Link to="/products">View All Products</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Visit Our Experience Center</h3>
          <ul className="contact-info">
            <li>
              <span className="contact-icon">📍</span>
              <span>Jawaharke Road, Sadar Mansa Near Ganga Oil Mill, Mansa (151505)<br />Distt. Mansa (151505)<br />Punjab, India</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>
                <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
              </span>
            </li>
            <li>
              <span className="contact-icon">💬</span>
              <span>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </span>
            </li>
            <li>
              <span className="contact-icon">🕒</span>
              <span>Monday - Saturday: 10:00 AM - 7:00 PM<br />Sunday: By Appointment Only</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Ortthiva. All rights reserved.</p>
          <p className="footer-tagline">✨ Premium Mattresses | Orthopedic Support | Better Sleep ✨</p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;