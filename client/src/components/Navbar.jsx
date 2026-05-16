import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { Menu, X, User, LogOut, ChevronDown, Globe, Coins } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { currency, setCurrency } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          TUJI<span>BAMBE</span>
        </Link>

        <div className="navbar-links-desktop">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/tours" className="nav-item">Tours</Link>
          <Link to="/adventures" className="nav-item">Adventures</Link>
          <Link to="/car-hire" className="nav-item">Car Hire</Link>
          <Link to="/event-planner" className="nav-item">Events</Link>
        </div>

        <div className="navbar-actions">
          <div className="currency-selector-minimal">
            <button 
              className={`curr-btn ${currency === 'USD' ? 'active' : ''}`}
              onClick={() => setCurrency('USD')}
            >
              USD
            </button>
            <button 
              className={`curr-btn ${currency === 'KES' ? 'active' : ''}`}
              onClick={() => setCurrency('KES')}
            >
              KES
            </button>
          </div>

          {user ? (
            <div className="user-actions">
              <Link to={user.role === 'admin' ? "/admin" : "/dashboard"} className="profile-link">
                <User size={20} />
              </Link>
              <button onClick={handleLogout} className="logout-icon-btn">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="login-btn-clean">Login</Link>
            </div>
          )}

          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar & Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(false)}
      ></div>

      <div className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header-minimal">
          <button className="close-sidebar-modern" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="sidebar-content">
          <div className="sidebar-nav">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/tours" onClick={() => setIsOpen(false)}>Tours</Link>
            <Link to="/adventures" onClick={() => setIsOpen(false)}>Adventures</Link>
            <Link to="/car-hire" onClick={() => setIsOpen(false)}>Car Hire</Link>
            <Link to="/event-planner" onClick={() => setIsOpen(false)}>Events</Link>
          </div>

          <div className="sidebar-currency-section">
            <span className="sidebar-label">Currency</span>
            <div className="sidebar-currency-grid">
              <button 
                className={`sidebar-curr-item ${currency === 'USD' ? 'active' : ''}`}
                onClick={() => setCurrency('USD')}
              >
                <span className="curr-code">USD</span>
                <span className="curr-name">US Dollar</span>
              </button>
              <button 
                className={`sidebar-curr-item ${currency === 'KES' ? 'active' : ''}`}
                onClick={() => setCurrency('KES')}
              >
                <span className="curr-code">KES</span>
                <span className="curr-name">Kenyan Shilling</span>
              </button>
            </div>
          </div>
          
          <div className="sidebar-footer">
            {user ? (
              <div className="sidebar-auth-grid">
                <Link to={user.role === 'admin' ? "/admin" : "/dashboard"} onClick={() => setIsOpen(false)} className="sidebar-btn-primary">Dashboard</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="sidebar-logout-btn">Logout</button>
              </div>
            ) : (
              <div className="sidebar-auth-grid">
                <Link to="/login" onClick={() => setIsOpen(false)} className="sidebar-btn-primary">Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
