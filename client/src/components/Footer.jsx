import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">TUJIBAMBE</h2>
          <p>Unforgettable adventures and luxury travel experiences across the heart of Africa. Explore the wild with comfort and style.</p>
          <div className="social-links">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Adventures</h3>
          <ul>
            <li><Link to="/tours">Hiking Mt. Kenya</Link></li>
            <li><Link to="/tours">Maasai Mara Safari</Link></li>
            <li><Link to="/tours">Diani Beach Tours</Link></li>
            <li><Link to="/tours">Balloon Safaris</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/event-planner">Event Planner</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><MapPin size={18} /> 123 Adventure Lane, Nairobi</p>
          <p><Phone size={18} /> +254 (000) 111-222</p>
          <p><Mail size={18} /> hello@tujibambe.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 TUJIBAMBE ADVENTURES. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default Footer;
