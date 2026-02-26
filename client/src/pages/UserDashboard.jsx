import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  Calendar, Users, DollarSign, MapPin, Ticket, 
  Compass, Armchair, Share2, LogOut, LayoutDashboard, 
  Settings, User as UserIcon, Bell, ChevronRight, Menu, X
} from 'lucide-react';
import '../styles/Dashboard.css';

const UserDashboard = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://tujibambe2.onrender.com/api/bookings/my-bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const totalSpent = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) return (
    <div className="modern-loading-container full-page">
      <div className="loading-pulse"></div>
      <p>Initializing your travel dashboard...</p>
    </div>
  );

  return (
    <div className={`dashboard-wrapper ${isSidebarOpen ? 'sidebar-active' : ''}`}>
      {/* Mobile Header */}
      <header className="mobile-dashboard-header">
        <div className="mobile-logo">
          <Compass size={24} />
          <span>Tujibambe</span>
        </div>
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Compass size={32} />
            <span>Tujibambe</span>
          </div>
          <button className="close-sidebar-mobile" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="user-profile-section">
          <div className="avatar-circle large">{user?.name.charAt(0)}</div>
          <div className="user-info">
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
          </div>
          <div className="welcome-badge">
            Ready for your next adventure, {user?.name.split(' ')[0]}?
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="nav-item" onClick={() => navigate('/tours')}>
            <MapPin size={20} /> Browse Tours
          </button>
          <button className="nav-item">
            <Bell size={20} /> Notifications
          </button>
          <button className="nav-item">
            <UserIcon size={20} /> Profile
          </button>
          <button className="nav-item">
            <Settings size={20} /> Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Main Content Area */}
      <main className="dashboard-main-content">
        <header className="main-content-header">
          <div className="header-greeting">
            <h1>Welcome back, {user?.name.split(' ')[0]}!</h1>
            <p>Your next journey is just around the corner.</p>
          </div>
          <div className="header-actions">
            <button className="icon-action-btn"><Bell size={20} /></button>
            <div className="header-user-mini">
              <div className="avatar-circle small">{user?.name.charAt(0)}</div>
            </div>
          </div>
        </header>

        <div className="dashboard-scrollable-content">
          <div className="dashboard-grid-layout">
            {/* Header Stats */}
            <div className="stats-strip">
              <div className="mini-stat-card">
                <div className="stat-icon-box orange"><Ticket size={24} /></div>
                <div className="stat-val">
                  <strong>{bookings.length}</strong>
                  <span>Total Bookings</span>
                </div>
              </div>
              <div className="mini-stat-card">
                <div className="stat-icon-box green"><DollarSign size={24} /></div>
                <div className="stat-val">
                  <strong>${totalSpent.toLocaleString()}</strong>
                  <span>Total Spent</span>
                </div>
              </div>
              <div className="mini-stat-card">
                <div className="stat-icon-box blue"><Compass size={24} /></div>
                <div className="stat-val">
                  <strong>{bookings.filter(b => b.status === 'active' || b.status === 'confirmed').length}</strong>
                  <span>Active Trips</span>
                </div>
              </div>
            </div>

            <div className="content-columns">
              {/* Primary List */}
              <section className="itinerary-section">
                <div className="section-head">
                  <h2><Calendar size={20} /> Your Travel Itinerary</h2>
                  <button className="text-btn" onClick={() => navigate('/tours')}>Discover New Tours</button>
                </div>

                <div className="itinerary-list">
                  {bookings.length === 0 ? (
                    <div className="empty-dashboard-state glass-panel">
                      <Compass size={48} />
                      <h3>Your itinerary is empty</h3>
                      <p>Discover breathtaking destinations and start planning your next getaway.</p>
                      <button className="btn-modern-sm" onClick={() => navigate('/tours')} style={{width: 'auto', padding: '0.75rem 2rem'}}>Explore Tours</button>
                    </div>
                  ) : (
                    bookings.map(booking => (
                      <div 
                        key={booking._id} 
                        className="itinerary-item glass-panel"
                        onClick={() => navigate(`/dashboard/booking/${booking._id}`)}
                      >
                        <div className="trip-preview-img">
                          <img 
                            src={booking.tour?.photo || booking.tour?.image || 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                            alt={booking.tour?.title || 'Tour Image'} 
                          />
                        </div>
                        <div className="trip-info-main">
                          <div className="trip-header">
                            <h3>{booking.tour?.title || 'Tour details unavailable'}</h3>
                            <span className={`status-pill ${booking.status}`}>{booking.status}</span>
                          </div>
                          <div className="trip-meta-row">
                            <span><Calendar size={14} /> {new Date(booking.bookingDate).toLocaleDateString()}</span>
                            <span><Users size={14} /> {booking.numberOfPeople} traveler{booking.numberOfPeople > 1 ? 's' : ''}</span>
                            <span><MapPin size={14} /> {booking.tour?.location || 'Location pending'}</span>
                          </div>
                        </div>
                        <div className="trip-action-area">
                          <div className="trip-cost">{booking.currency === 'KES' ? 'KSh' : '$'}{booking.totalPrice.toLocaleString()}</div>
                          <button className="arrow-nav-btn"><ChevronRight size={18} /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* Sidebar Widgets */}
              <aside className="dashboard-widgets">
                <div className="widget-card glass-panel">
                  <h3><Share2 size={18} /> Active Groups</h3>
                  <div className="widget-list">
                    {bookings.filter(b => b.trip).length > 0 ? (
                      bookings.filter(b => b.trip).slice(0, 3).map(b => (
                        <div key={b._id} className="widget-item">
                          <div className="group-circle">{b.trip.inviteCode.slice(0, 2)}</div>
                          <div className="group-info">
                            <strong>{b.tour?.title || 'Tour details'}</strong>
                            <small>Code: {b.trip.inviteCode}</small>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="empty-text">No active group trips yet.</p>
                    )}
                  </div>
                </div>

                <div className="widget-card glass-panel promo-widget">
                  <div className="promo-content">
                    <Compass size={40} className="promo-icon" />
                    <h3>Adventure Club</h3>
                    <p>Unlock exclusive seasonal Safari Rally packages and member-only rewards.</p>
                    <button className="btn-modern-primary sm">Join Now</button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
