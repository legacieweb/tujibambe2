import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';
import CurrencySelector from './CurrencySelector';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="news-bar">
        <div className="news-track">
          <span>Adventure Awaits in the Heart of Africa — Embark on a soul-stirring journey through the golden plains of Maasai Mara and the turquoise waters of Diani Beach. &nbsp;&nbsp; | &nbsp;&nbsp; </span>
          <span>Adventure Awaits in the Heart of Africa — Embark on a soul-stirring journey through the golden plains of Maasai Mara and the turquoise waters of Diani Beach. &nbsp;&nbsp; | &nbsp;&nbsp; </span>
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
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/tours" onClick={() => setIsOpen(false)}>Safaris</Link>
            <Link to="/event-planner" onClick={() => setIsOpen(false)}>Events</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <div className="nav-currency-selector">
              <CurrencySelector />
            </div>
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="logout-btn">
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="login-link" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/signup" className="signup-btn" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </>
            )}
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
