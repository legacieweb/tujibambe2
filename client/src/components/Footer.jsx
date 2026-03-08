import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import '../styles/Footer.css';

const TikTokIcon = ({ size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://tujibambe2.onrender.com';

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });

    try {
      const res = await axios.post(`${API_BASE_URL}/api/contact/subscribe`, { email });
      setStatus({ loading: false, message: res.data.message, type: 'success' });
      setEmail('');
      // Don't auto-reset success message immediately to let user see the transformation
    } catch (err) {
      setStatus({ 
        loading: false, 
        message: err.response?.data?.message || 'Failed to subscribe', 
        type: 'error' 
      });
      setTimeout(() => setStatus({ loading: false, message: '', type: '' }), 5000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-newsletter-refined">
            <div className="newsletter-content">
              <div className="newsletter-badge">
                <Sparkles size={16} />
                <span>VIP ACCESS</span>
              </div>
              <h3>Unlock <span className="elegant-highlight">Premium Adventures</span></h3>
              <p>Get exclusive wilderness insights, early access to private tours, and insider tips from our expert guides. Join Kenya's elite adventure community.</p>
            </div>
            
            <div className="newsletter-action-area">
              {status.type === 'success' ? (
                <div className="newsletter-success-modern">
                  <div className="success-check-pulse">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="success-info">
                    <h4>You're on the list!</h4>
                    <p>{status.message}</p>
                  </div>
                  <button 
                    onClick={() => setStatus({ loading: false, message: '', type: '' })}
                    className="btn-done-modern"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form-modern">
                  <div className="input-with-icon">
                    <Mail size={20} className="mail-icon" />
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-subscribe-modern" disabled={status.loading}>
                    {status.loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                  {status.message && status.type === 'error' && (
                    <div className="newsletter-error-mini">{status.message}</div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-container footer-main">
        <div className="footer-brand">
          <h2 className="footer-logo">TUJIBAMBE</h2>
          <p>Unforgettable adventures and luxury travel experiences across the heart of Africa. Explore the wild with comfort and style.</p>
          <div className="social-links">
            <a href="https://www.facebook.com/tujibambe.co.ke" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
            <a href="https://www.instagram.com/tujibambe.co.ke" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
            <a href="https://www.twitter.com/tujibambe.co.ke" target="_blank" rel="noopener noreferrer"><Twitter size={20} /></a>
            <a href="https://www.tiktok.com/@tujibambe.co.ke" target="_blank" rel="noopener noreferrer"><TikTokIcon size={20} /></a>
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
          <p><Phone size={18} /> +254 (726) 511-419</p>
          <p><Mail size={18} /> hello@iyonicorp.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 TUJIBAMBE. ALL RIGHTS RESERVED.</p>
        <p className="powered-by">
          Powered by <a href="https://iyonicorp.com" target="_blank" rel="noopener noreferrer">iyonicorp</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
