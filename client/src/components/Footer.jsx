import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Youtube,
  ArrowRight,
  Send
} from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-modern">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              TUJI<span>BAMBE</span>
            </Link>
            <p className="footer-desc">
              Curating elite travel experiences and bespoke expeditions across Africa's most breathtaking landscapes. Join the adventure.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon"><Facebook size={20} /></a>
              <a href="#" className="social-icon"><Twitter size={20} /></a>
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="#" className="social-icon"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="footer-nav-group">
            <div className="footer-col">
              <h4 className="footer-h">Explore</h4>
              <ul className="footer-links">
                <li><Link to="/tours">Tours</Link></li>
                <li><Link to="/adventures">Adventures</Link></li>
                <li><Link to="/car-hire">Car Hire</Link></li>
                <li><Link to="/event-planner">Events</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-h">Company</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/privacy">Privacy</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter / Contact Section */}
          <div className="footer-contact">
            <h4 className="footer-h">Newsletter</h4>
            <p className="footer-subtext">Get the latest updates on expeditions.</p>
            <div className="newsletter-box">
              <input type="email" placeholder="Email address" />
              <button><Send size={18} /></button>
            </div>
            <div className="footer-direct-contact">
              <div className="contact-small">
                <Mail size={14} /> hello@tujibambe.com
              </div>
              <div className="contact-small">
                <Phone size={14} /> +254 113 203 900
              </div>
              <div className="contact-small">
                <Phone size={14} /> +254 726 511 419
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TUJIBAMBE. ALL RIGHTS RESERVED.</p>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
