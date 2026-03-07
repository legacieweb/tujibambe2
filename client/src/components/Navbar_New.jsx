import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import CurrencySelector from './CurrencySelector';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  return (
    <nav className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="news-bar">
        <div className="news-track">
          <span>TUJIBAMBE — Experience the thrill of Safari Rally Kenya 2026. &nbsp;&nbsp; | &nbsp;&nbsp; </span>
          <span>EPIC FUN TIMES — Join the most vibrant parties and social events across Kenya. &nbsp;&nbsp; | &nbsp;&nbsp; </span>
          <span>TUJIBAMBE — Unforgettable Safaris in the heart of the wild. &nbsp;&nbsp; | &nbsp;&nbsp; </span>
          <span>TUJIBAMBE — Experience the thrill of Safari Rally Kenya 2026. &nbsp;&nbsp; | &nbsp;&nbsp; </span>
        </div>
      </div>
      <div className="navbar-main">
        <div className="nav-container">
          <Link to="/" className="logo">
            TUJIBAMBE<span>.</span>
          </Link>

          <div className={`nav-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>

          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/tours" onClick={() => setIsOpen(false)}>Safaris</Link>
            <Link to="/adventures" onClick={() => setIsOpen(false)}>Adventures</Link>
            <Link to="/epic-fun-times" onClick={() => setIsOpen(false)}>Epic Fun Times</Link>
            <Link to="/car-hire" onClick={() => setIsOpen(false)}>Car Hire</Link>
            <Link to="/event-planner" onClick={() => setIsOpen(false)}>Event Planner</Link>
            <div className="nav-currency-selector">
              <CurrencySelector />
            </div>
            
            <div className="auth-section">
              {user ? (
                <>
                  {/* Desktop User Dropdown */}
                  <div className="user-menu-container">
                    <button 
                      className="user-profile-toggle"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      aria-label="User menu"
                    >
                      <div className="user-avatar">
                        <User size={20} />
                      </div>
                      <span className="user-name-desktop">{user.name?.split(' ')[0]}</span>
                      <ChevronDown size={14} className={userMenuOpen ? 'rotate' : ''} />
                    </button>

                    <div className={`user-dropdown ${userMenuOpen ? 'active' : ''}`}>
                      <div className="dropdown-header">
                        <p className="user-email">{user.email}</p>
                      </div>
                      <Link 
                        to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                        onClick={() => { setUserMenuOpen(false); setIsOpen(false); }}
                        className="dropdown-item"
                      >
                        <User size={18} /> Dashboard
                      </Link>
                      <button 
                        onClick={() => { logout(); setUserMenuOpen(false); setIsOpen(false); }} 
                        className="dropdown-item logout-item"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </div>

                  {/* Mobile Links (remain in sidebar) */}
                  <div className="mobile-auth-links">
                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Link>
                    <button onClick={() => { logout(); setIsOpen(false); }} className="logout-btn-mobile">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="guest-links">
                  <Link to="/login" className="login-link" onClick={() => setIsOpen(false)}>Login</Link>
                  <Link to="/signup" className="signup-btn" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </div>
              )}
            </div>
          </div>

          <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
